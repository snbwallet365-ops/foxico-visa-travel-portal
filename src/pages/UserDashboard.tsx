import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShieldCheck, Plane, Heart, User as UserIcon, MapPin, Star,
  Globe2, TrendingUp, Sparkles, Calendar, ArrowRight, Upload, Download, Trash2,
  CheckCircle2, Clock, FileText, MessageSquare, Send, QrCode, CreditCard,
  AlertCircle, ChevronRight, X, ExternalLink
} from "lucide-react";
import { useApp, VisaApplication, VaultDocument } from "../context/AppContext";
import { DashboardShell, StatCard, SectionCard, StatusBadge, EmptyState, MiniBarChart } from "../components/dashboard/shared";

const menu = [
  { key: "overview", label: "Hub Overview", icon: LayoutDashboard },
  { key: "visas", label: "My Visa Applications", icon: ShieldCheck },
  { key: "bookings", label: "My Trips & Bookings", icon: Plane },
  { key: "vault", label: "Document Vault", icon: FileText },
  { key: "appointments", label: "Appointments & Biometrics", icon: Calendar },
  { key: "chat", label: "Visa Concierge Chat", icon: MessageSquare },
  { key: "invoices", label: "Billing & Invoices", icon: CreditCard },
  { key: "profile", label: "Traveler Profile", icon: UserIcon },
];

const MONTHS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

export default function UserDashboard() {
  const {
    currentUser, bookings, destinations, visaApplications, vaultDocuments,
    appointments, chatMessages, invoices, cancelBooking, updateProfile,
    uploadVaultDocument, deleteVaultDocument, sendChatMessage, cancelAppointment,
    toast,
  } = useApp();

  const [tab, setTab] = useState("overview");
  const [visaFilter, setVisaFilter] = useState<string>("all");
  const [selectedCertificate, setSelectedCertificate] = useState<VisaApplication | null>(null);
  const [chatInput, setChatInput] = useState("");
  
  // Document Upload Form Modal
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [docType, setDocType] = useState<VaultDocument["type"]>("passport");
  const [docExpiry, setDocExpiry] = useState("2030-12-31");

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name ?? "",
    country: currentUser?.country ?? "",
    phone: currentUser?.phone ?? "",
    passportNumber: currentUser?.passportNumber ?? "",
    passportExpiry: currentUser?.passportExpiry ?? "",
    password: "",
  });

  const myVisas = useMemo(
    () => visaApplications.filter((v) => v.userId === currentUser?.id),
    [visaApplications, currentUser]
  );

  const myBookings = useMemo(
    () => bookings.filter((b) => b.userId === currentUser?.id),
    [bookings, currentUser]
  );

  const stats = useMemo(() => {
    const approvedVisas = myVisas.filter((v) => v.status === "approved").length;
    const pendingVisas = myVisas.filter((v) => v.status !== "approved" && v.status !== "rejected").length;
    const activeTrips = myBookings.filter((b) => b.status !== "cancelled").length;
    const totalSpent = myBookings.reduce((s, b) => s + b.total, 0) + myVisas.reduce((s, v) => s + v.fee, 0);
    const vaultCount = vaultDocuments.filter((d) => d.userId === currentUser?.id).length;
    return { approvedVisas, pendingVisas, activeTrips, totalSpent, vaultCount };
  }, [myVisas, myBookings, vaultDocuments, currentUser]);

  const filteredVisas = useMemo(() => {
    if (visaFilter === "all") return myVisas;
    return myVisas.filter((v) => v.status === visaFilter);
  }, [myVisas, visaFilter]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput("");
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      toast("Please provide a document title", "error");
      return;
    }
    uploadVaultDocument({
      userId: currentUser?.id || "u1",
      title: docTitle.trim(),
      type: docType,
      fileName: `${docTitle.trim().replace(/\s+/g, "_")}.pdf`,
      expiryDate: docExpiry,
      fileSize: "1.4 MB",
    });
    setDocTitle("");
    setUploadModalOpen(false);
  };

  return (
    <DashboardShell
      title="Traveler Hub"
      subtitle={menu.find((m) => m.key === tab)?.label || "Traveler Dashboard"}
      menu={menu}
      active={tab}
      onNavigate={setTab}
      accent="#f97316"
    >
      {/* ═════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW
      ═════════════════════════════════════════════════════════════ */}
      {tab === "overview" && (
        <div className="flex flex-col gap-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={ShieldCheck} label="Approved Visas" value={String(stats.approvedVisas)} delta="100% compliant" color="#10b981" />
            <StatCard icon={Clock} label="Applications in Flight" value={String(stats.pendingVisas)} delta={stats.pendingVisas > 0 ? "Under review" : "Up to date"} color="#f97316" delay={0.05} />
            <StatCard icon={Plane} label="Upcoming Adventures" value={String(stats.activeTrips)} delta="Confirmed" color="#3b82f6" delay={0.1} />
            <StatCard icon={FileText} label="Vault Documents" value={`${stats.vaultCount} files`} delta="Encrypted" color="#8b5cf6" delay={0.15} />
          </div>

          {/* Active Visa Tracker Showcase */}
          {myVisas.length > 0 && (
            <SectionCard
              title="Active Visa Dossier Tracker"
              action={
                <button onClick={() => setTab("visas")} className="text-orange-500 text-xs font-bold hover:underline">
                  View All Dossiers →
                </button>
              }
            >
              <div className="space-y-4">
                {myVisas.slice(0, 2).map((app) => (
                  <div key={app.id} className="p-5 bg-white/60 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-white/10">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{app.destinationCountry}</span>
                        <span className="text-xs text-slate-400">• {app.visaType}</span>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                      Reference: <span className="font-mono text-slate-700 dark:text-slate-300">{app.embassyReference}</span> • Decision Est: {app.estimatedDecisionDate}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full transition-all duration-700"
                        style={{ width: `${app.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px] italic truncate max-w-md">
                        {app.consularOfficerNote || "Dossier under formal adjudication."}
                      </span>
                      {app.status === "approved" && (
                        <button
                          onClick={() => setSelectedCertificate(app)}
                          className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 hover:bg-emerald-500/25 transition-all"
                        >
                          <Download size={12} /> View e-Visa Pass
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Quick Shortcuts Grid */}
          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => setTab("vault")}
              className="p-5 ios-glass-card rounded-3xl border border-white/80 dark:border-white/10 text-left card-hover-ios"
            >
              <FileText size={20} className="text-purple-500 mb-2" />
              <div className="font-bold text-sm text-slate-900 dark:text-white">Document Vault</div>
              <div className="text-xs text-slate-500">Manage passports & bank statements</div>
            </button>
            <button
              onClick={() => setTab("appointments")}
              className="p-5 ios-glass-card rounded-3xl border border-white/80 dark:border-white/10 text-left card-hover-ios"
            >
              <Calendar size={20} className="text-blue-500 mb-2" />
              <div className="font-bold text-sm text-slate-900 dark:text-white">Appointments & Biometrics</div>
              <div className="text-xs text-slate-500">Consular slots & QR passes</div>
            </button>
            <button
              onClick={() => setTab("chat")}
              className="p-5 ios-glass-card rounded-3xl border border-white/80 dark:border-white/10 text-left card-hover-ios"
            >
              <MessageSquare size={20} className="text-orange-500 mb-2" />
              <div className="font-bold text-sm text-slate-900 dark:text-white">Consular Desk Chat</div>
              <div className="text-xs text-slate-500">Direct line to your visa officer</div>
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 2: MY VISA APPLICATIONS
      ═════════════════════════════════════════════════════════════ */}
      {tab === "visas" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {["all", "docs_review", "embassy_processing", "approved"].map((f) => (
                <button
                  key={f}
                  onClick={() => setVisaFilter(f)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold capitalize transition-all ${
                    visaFilter === f
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                      : "ios-glass text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {f.replace(/_/g, " ")}
                </button>
              ))}
            </div>

            <Link
              to="/destinations"
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-5 py-2.5 rounded-2xl text-xs shadow-md shadow-orange-500/25 flex items-center gap-1.5"
            >
              <span>+ Apply for New Visa</span>
            </Link>
          </div>

          {filteredVisas.length === 0 ? (
            <EmptyState
              title="No Visa Applications Found"
              subtitle="You don't have any visa applications matching this filter."
              action={
                <Link to="/destinations" className="bg-orange-500 text-white font-bold px-5 py-2.5 rounded-2xl text-xs inline-block">
                  Explore Country Visas
                </Link>
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredVisas.map((app) => (
                <div key={app.id} className="ios-glass-card rounded-3xl p-6 border border-white/80 dark:border-white/10 space-y-4">
                  <div className="flex items-start justify-between flex-wrap gap-3 pb-3 border-b border-slate-200/50 dark:border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-black text-slate-900 dark:text-white">{app.destinationCountry}</h4>
                        <span className="text-xs text-slate-400 font-mono">({app.id})</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {app.visaType} • {app.stayDuration} • Tier: {app.processingSpeed}
                      </div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Submitted</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{app.submittedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Estimated Grant</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{app.estimatedDecisionDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Fee</span>
                      <span className="font-bold text-slate-900 dark:text-white">${app.fee} USD</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Consular Reference</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300 truncate block">{app.embassyReference}</span>
                    </div>
                  </div>

                  {/* Note box */}
                  {app.consularOfficerNote && (
                    <div className="p-3 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                      <ShieldCheck size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Consular Case Note:</strong> {app.consularOfficerNote}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                    <span className="text-xs text-slate-400">
                      {app.documents.length} verified documents attached to dossier
                    </span>
                    <div className="flex items-center gap-2">
                      {app.status === "approved" ? (
                        <button
                          onClick={() => setSelectedCertificate(app)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/25"
                        >
                          <Download size={13} />
                          <span>Download Official e-Visa</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setTab("chat")}
                          className="ios-glass-pill hover:bg-orange-500 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                        >
                          Message Case Officer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 3: MY TRIPS & BOOKINGS
      ═════════════════════════════════════════════════════════════ */}
      {tab === "bookings" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{myBookings.length} Total Bookings</span>
            <Link to="/destinations" className="text-xs font-bold text-orange-500 hover:underline">
              + Discover New Trips
            </Link>
          </div>

          {myBookings.length === 0 ? (
            <EmptyState
              title="No Trips Booked Yet"
              subtitle="Browse our curated destination packages and start planning your next journey."
              action={
                <Link to="/destinations" className="bg-orange-500 text-white font-bold px-5 py-2.5 rounded-2xl text-xs inline-block">
                  Browse Destinations
                </Link>
              }
            />
          ) : (
            <div className="space-y-4">
              {myBookings.map((b) => (
                <div key={b.id} className="ios-glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={b.image} alt={b.destinationName} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{b.destinationName}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">({b.id})</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Date: {b.date} • {b.guests} guest(s) • Booked on {b.createdAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-base font-black text-slate-900 dark:text-white">${b.total.toLocaleString()}</span>
                      <StatusBadge status={b.status} />
                    </div>
                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="text-xs text-rose-500 hover:bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20 font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 4: DOCUMENT VAULT
      ═════════════════════════════════════════════════════════════ */}
      {tab === "vault" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Encrypted Document Vault</h3>
              <p className="text-xs text-slate-500">ISO 27001 certified zero-knowledge secure storage for travel dossiers.</p>
            </div>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/25"
            >
              <Upload size={14} />
              <span>Upload New Document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vaultDocuments.map((doc) => (
              <div key={doc.id} className="ios-glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500">
                      {doc.type.replace(/_/g, " ")}
                    </span>
                    <button
                      onClick={() => deleteVaultDocument(doc.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{doc.title}</h4>
                  <div className="text-[11px] text-slate-400 font-mono mb-2">{doc.fileName}</div>
                  <div className="text-[10px] text-slate-500">Expires: {doc.expiryDate} • {doc.fileSize}</div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-emerald-500 font-bold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                  <button
                    onClick={() => toast(`Downloading ${doc.fileName}...`)}
                    className="text-orange-500 font-bold hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <Download size={11} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 5: APPOINTMENTS & BIOMETRICS
      ═════════════════════════════════════════════════════════════ */}
      {tab === "appointments" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Scheduled Consular Appointments</h3>
            <p className="text-xs text-slate-500">Biometric enrollment sessions and consular verification meetings.</p>
          </div>

          <div className="space-y-4">
            {appointments.map((app) => (
              <div key={app.id} className="ios-glass-card rounded-3xl p-6 border border-white/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{app.type}</span>
                    <span className="text-xs text-slate-400 font-mono">({app.id})</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Calendar size={13} className="text-orange-500" />
                    <span>{app.date} at {app.time}</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <MapPin size={13} className="text-blue-500" />
                    <span>{app.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center text-center p-1">
                    <QrCode size={24} />
                    <span className="text-[8px] font-mono mt-0.5">PASS</span>
                  </div>
                  <button
                    onClick={() => cancelAppointment(app.id)}
                    className="text-xs text-rose-500 hover:bg-rose-500/10 px-3 py-2 rounded-xl border border-rose-500/20 font-semibold"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 6: LIVE CONCIERGE CHAT
      ═════════════════════════════════════════════════════════════ */}
      {tab === "chat" && (
        <div className="ios-glass-card rounded-3xl border border-white/80 dark:border-white/10 overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="p-4 bg-white/70 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
                CD
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Claire Dupont</h4>
                <div className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Senior Consular Officer • Online</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Case ID: VISA-JP-8821</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                  <span className="text-[10px] text-slate-400 mb-1">{msg.senderName} • {msg.time}</span>
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-xs"
                        : "bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/60 dark:border-white/10"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendChat} className="p-3 bg-white/70 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-white/10 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask your consular officer about requirements, processing or passport..."
              className="flex-1 ios-glass-pill rounded-2xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-2xl shadow-md transition-transform active:scale-95"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 7: BILLING & INVOICES
      ═════════════════════════════════════════════════════════════ */}
      {tab === "invoices" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Billing & Payment Receipts</h3>
            <p className="text-xs text-slate-500">Official tax invoices for consular fees and concierge clearances.</p>
          </div>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="ios-glass-card rounded-2xl p-4 border border-white/80 dark:border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white mb-0.5">{inv.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Invoice #{inv.id} • {inv.date} • {inv.method}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-black text-sm text-slate-900 dark:text-white">${inv.amount} USD</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">
                    {inv.status}
                  </span>
                  <button
                    onClick={() => toast(`Generating official receipt PDF for ${inv.id}...`)}
                    className="ios-glass-pill px-3 py-1.5 rounded-xl font-bold hover:text-orange-500"
                  >
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 8: TRAVELER PROFILE & PASSPORT DOSSIER
      ═════════════════════════════════════════════════════════════ */}
      {tab === "profile" && currentUser && (
        <div className="grid lg:grid-cols-3 gap-6">
          <SectionCard title="Passport Dossier">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-extrabold text-2xl flex items-center justify-center mb-3 shadow-lg shadow-orange-500/25">
                {currentUser.name.charAt(0)}
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">{currentUser.name}</h4>
              <p className="text-xs text-slate-400 mb-3">{currentUser.email}</p>
              <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                Verified Global Traveler
              </span>
              <div className="w-full mt-6 pt-6 border-t border-slate-200/50 dark:border-white/10 text-xs text-left space-y-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Passport Number</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{currentUser.passportNumber || "P982341109"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Passport Expiry</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser.passportExpiry || "2031-08-14"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Registered Country</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser.country || "United States"}</span>
                </div>
              </div>
            </div>
          </SectionCard>

          <div className="lg:col-span-2">
            <SectionCard title="Update Profile Details">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateProfile({
                    name: profileForm.name || currentUser.name,
                    country: profileForm.country,
                    phone: profileForm.phone,
                    passportNumber: profileForm.passportNumber,
                    passportExpiry: profileForm.passportExpiry,
                    ...(profileForm.password ? { password: profileForm.password } : {}),
                  });
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full ios-glass-pill rounded-2xl px-4 py-2.5 text-xs text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full ios-glass-pill rounded-2xl px-4 py-2.5 text-xs text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Passport Number</label>
                    <input
                      type="text"
                      value={profileForm.passportNumber}
                      onChange={(e) => setProfileForm({ ...profileForm, passportNumber: e.target.value })}
                      className="w-full ios-glass-pill rounded-2xl px-4 py-2.5 text-xs text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Passport Expiry Date</label>
                    <input
                      type="date"
                      value={profileForm.passportExpiry}
                      onChange={(e) => setProfileForm({ ...profileForm, passportExpiry: e.target.value })}
                      className="w-full ios-glass-pill rounded-2xl px-4 py-2.5 text-xs text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-md shadow-orange-500/25"
                  >
                    Save Dossier Updates
                  </button>
                </div>
              </form>
            </SectionCard>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          OFFICIAL E-VISA CERTIFICATE MODAL
      ═════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border-4 border-emerald-500"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                <X size={16} />
              </button>

              <div className="text-center pb-4 border-b border-slate-200 mb-5">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase tracking-widest mb-2">
                  Official Electronic Visa (eVisa)
                </div>
                <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {selectedCertificate.destinationCountry} Consular Entry Permit
                </h3>
                <span className="text-xs font-mono text-emerald-700 font-bold block mt-1">
                  Permit No: {selectedCertificate.evisaNumber || "EV-JP-2026-X991"}
                </span>
              </div>

              <div className="space-y-2 text-xs mb-6">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Applicant Legal Name:</span>
                  <span className="font-bold text-slate-900">{selectedCertificate.applicantName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Passport Number:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedCertificate.passportNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Nationality:</span>
                  <span className="font-bold text-slate-900">{selectedCertificate.passportCountry}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Visa Classification:</span>
                  <span className="font-bold text-orange-600">{selectedCertificate.visaType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Max Permitted Stay:</span>
                  <span className="font-bold text-slate-900">{selectedCertificate.stayDuration}</span>
                </div>
              </div>

              {/* Barcode & Seal */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
                <div className="font-mono text-lg tracking-[0.3em] font-black">
                  ||| |||| | |||||| || |||||
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  AUTHENTICATION HASH: 98AF-44C1-E810-779D
                </div>
                <div className="text-[10px] text-emerald-700 font-bold">
                  ✓ Scannable at international border inspection gates & e-Gates.
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => toast("Added to Apple Wallet successfully!")}
                  className="flex-1 bg-slate-900 text-white font-bold py-3 rounded-2xl text-xs hover:bg-slate-800"
                >
                  Add to Apple Wallet
                </button>
                <button
                  onClick={() => toast("Printing PDF certificate...")}
                  className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-2xl text-xs hover:bg-emerald-700"
                >
                  Print Certificate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═════════════════════════════════════════════════════════════
          UPLOAD VAULT DOCUMENT MODAL
      ═════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {uploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setUploadModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="ios-glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 mb-5">
                <h3 className="font-black text-lg text-slate-900 dark:text-white">Save File to Vault</h3>
                <button onClick={() => setUploadModalOpen(false)} className="text-slate-400 hover:text-slate-800">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Document Title</label>
                  <input
                    type="text"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="e.g. 2026 Bank Balance Certificate"
                    className="w-full ios-glass-pill rounded-2xl px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Document Category</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="w-full ios-glass-pill rounded-2xl px-4 py-2.5 text-xs text-slate-800 dark:text-white cursor-pointer"
                  >
                    <option value="passport">Passport Bio-Page</option>
                    <option value="bank_statement">Bank Balance Statement</option>
                    <option value="photo">Biometric Portrait Photo</option>
                    <option value="insurance">Travel Medical Insurance</option>
                    <option value="flight">Flight Ticket Itinerary</option>
                    <option value="hotel">Hotel / Villa Booking</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Expiration Date</label>
                  <input
                    type="date"
                    value={docExpiry}
                    onChange={(e) => setDocExpiry(e.target.value)}
                    className="w-full ios-glass-pill rounded-2xl px-4 py-2.5 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-orange-500/25"
                  >
                    Encrypt & Save Document
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}
