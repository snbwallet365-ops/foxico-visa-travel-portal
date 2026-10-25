import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShieldCheck, Plane, Users, Calendar, Plus, Search,
  Edit2, Trash2, CheckCircle2, XCircle, Clock, DollarSign, Globe,
  FileText, Check, X, ChevronRight, AlertCircle, Sparkles, Filter, Download
} from "lucide-react";
import { useApp, VisaApplication, VisaApplicationStatus, BookingStatus } from "../context/AppContext";
import { DashboardShell, StatCard, SectionCard, StatusBadge, EmptyState, MiniBarChart } from "../components/dashboard/shared";

const menu = [
  { key: "overview", label: "Consular Overview", icon: LayoutDashboard },
  { key: "visas", label: "Visa Applications Dossier", icon: ShieldCheck },
  { key: "bookings", label: "Trips & Bookings", icon: Plane },
  { key: "catalog", label: "Country & Visa Catalog", icon: Globe },
  { key: "appointments", label: "Consular Appointments", icon: Calendar },
  { key: "users", label: "Travelers Directory", icon: Users },
  { key: "revenue", label: "Revenue & Consular Fees", icon: DollarSign },
];

export default function AdminDashboard() {
  const {
    visaApplications, updateVisaApplicationStatus, bookings, setBookingStatus,
    destinations, addDestination, updateDestination, deleteDestination,
    users, toggleUserStatus, appointments, invoices, toast
  } = useApp();

  const [tab, setTab] = useState("overview");
  const [visaSearch, setVisaSearch] = useState("");
  const [visaStatusFilter, setVisaStatusFilter] = useState<string>("all");
  
  // Review Drawer State
  const [selectedVisa, setSelectedVisa] = useState<VisaApplication | null>(null);
  const [consularNoteInput, setConsularNoteInput] = useState("");
  const [newStatusInput, setNewStatusInput] = useState<VisaApplicationStatus>("approved");

  // New Destination Form Modal
  const [newDestModal, setNewDestModal] = useState(false);
  const [destForm, setDestForm] = useState({
    name: "", country: "", category: "Culture", image: "", price: 950,
    duration: "7 Days", description: "", featured: false
  });

  const stats = useMemo(() => {
    const totalApps = visaApplications.length;
    const pendingApps = visaApplications.filter((v) => v.status !== "approved" && v.status !== "rejected").length;
    const approvedApps = visaApplications.filter((v) => v.status === "approved").length;
    const totalRevenue = invoices.reduce((s, i) => s + i.amount, 0);
    return { totalApps, pendingApps, approvedApps, totalRevenue };
  }, [visaApplications, invoices]);

  const filteredVisas = useMemo(() => {
    return visaApplications.filter((v) => {
      const matchSearch =
        v.applicantName.toLowerCase().includes(visaSearch.toLowerCase()) ||
        v.destinationCountry.toLowerCase().includes(visaSearch.toLowerCase()) ||
        v.id.toLowerCase().includes(visaSearch.toLowerCase());
      const matchStatus = visaStatusFilter === "all" || v.status === visaStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [visaApplications, visaSearch, visaStatusFilter]);

  const handleOpenReview = (app: VisaApplication) => {
    setSelectedVisa(app);
    setConsularNoteInput(app.consularOfficerNote || "");
    setNewStatusInput(app.status);
  };

  const handleSaveVisaReview = () => {
    if (!selectedVisa) return;
    updateVisaApplicationStatus(selectedVisa.id, newStatusInput, consularNoteInput);
    setSelectedVisa(null);
  };

  const handleAddDestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destForm.name || !destForm.country) {
      toast("Name and country are required", "error");
      return;
    }
    addDestination({
      name: destForm.name,
      country: destForm.country,
      category: destForm.category,
      image: destForm.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
      price: Number(destForm.price) || 800,
      rating: 4.9,
      duration: destForm.duration,
      description: destForm.description,
      status: "active",
      featured: destForm.featured
    });
    setNewDestModal(false);
    setDestForm({ name: "", country: "", category: "Culture", image: "", price: 950, duration: "7 Days", description: "", featured: false });
  };

  return (
    <DashboardShell
      title="Consular Operations"
      subtitle={menu.find((m) => m.key === tab)?.label || "Admin Console"}
      menu={menu}
      active={tab}
      onNavigate={setTab}
      accent="#f97316"
    >
      {/* ═════════════════════════════════════════════════════════════
          TAB 1: CONSULAR OVERVIEW & WORKLOAD
      ═════════════════════════════════════════════════════════════ */}
      {tab === "overview" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Clock} label="Pending Review" value={String(stats.pendingApps)} delta="Consular Queue" color="#f97316" />
            <StatCard icon={ShieldCheck} label="Visas Issued" value={String(stats.approvedApps)} delta="99.4% Rate" color="#10b981" delay={0.05} />
            <StatCard icon={Plane} label="Travel Bookings" value={String(bookings.length)} delta="Active orders" color="#3b82f6" delay={0.1} />
            <StatCard icon={DollarSign} label="Collected Fees" value={`$${stats.totalRevenue.toLocaleString()}`} delta="Total Gross" color="#8b5cf6" delay={0.15} />
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <SectionCard title="Weekly Visa Influx & Processing Volume">
                <MiniBarChart data={[42, 68, 55, 91, 114, 87]} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} color="#f97316" />
              </SectionCard>
            </div>

            <div className="lg:col-span-4">
              <SectionCard title="Urgent Action Required">
                <div className="space-y-3">
                  {visaApplications.filter((v) => v.status === "docs_review" || v.status === "embassy_processing").slice(0, 3).map((v) => (
                    <div key={v.id} className="p-3 bg-white/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-white/10 text-xs">
                      <div className="flex justify-between font-bold text-slate-800 dark:text-white mb-1">
                        <span>{v.destinationCountry}</span>
                        <StatusBadge status={v.status} />
                      </div>
                      <div className="text-[11px] text-slate-500 mb-2">{v.applicantName} ({v.id})</div>
                      <button
                        onClick={() => { setSelectedVisa(v); setNewStatusInput(v.status); setConsularNoteInput(v.consularOfficerNote || ""); }}
                        className="text-[11px] font-bold text-orange-500 hover:underline"
                      >
                        Review Dossier →
                      </button>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 2: VISA APPLICATIONS MANAGEMENT
      ═════════════════════════════════════════════════════════════ */}
      {tab === "visas" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={visaSearch}
                onChange={(e) => setVisaSearch(e.target.value)}
                placeholder="Search applicant, country, or dossier ID..."
                className="w-full ios-glass-pill pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {["all", "docs_review", "embassy_processing", "approved", "rejected"].map((s) => (
                <button
                  key={s}
                  onClick={() => setVisaStatusFilter(s)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    visaStatusFilter === s
                      ? "bg-orange-500 text-white"
                      : "ios-glass text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {s.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredVisas.map((app) => (
              <div key={app.id} className="ios-glass-card rounded-2xl p-5 border border-white/80 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm text-slate-900 dark:text-white">{app.applicantName}</span>
                    <span className="text-xs text-slate-400 font-mono">({app.id})</span>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    Destination: <strong>{app.destinationCountry}</strong> • {app.visaType} • Passport: {app.passportCountry} ({app.passportNumber})
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Submitted: {app.submittedDate} • Ref: {app.embassyReference} • Fee: ${app.fee} USD
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => handleOpenReview(app)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md shadow-orange-500/20"
                  >
                    Adjudicate & Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 3: TRIPS & BOOKINGS
      ═════════════════════════════════════════════════════════════ */}
      {tab === "bookings" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{bookings.length} Total Bookings</span>
          </div>

          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="ios-glass-card rounded-2xl p-4 border border-white/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img src={b.image} alt={b.destinationName} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{b.destinationName} ({b.id})</div>
                    <div className="text-slate-400">Traveler: {b.userName} • Date: {b.date} • {b.guests} guests</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="font-black text-sm text-slate-900 dark:text-white">${b.total}</span>
                  <StatusBadge status={b.status} />
                  {b.status === "pending" && (
                    <button
                      onClick={() => setBookingStatus(b.id, "confirmed")}
                      className="text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-lg font-bold"
                    >
                      Confirm
                    </button>
                  )}
                  {b.status !== "cancelled" && (
                    <button
                      onClick={() => setBookingStatus(b.id, "cancelled")}
                      className="text-rose-500 hover:bg-rose-500/10 px-2 py-1 rounded-lg"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 4: COUNTRY & VISA CATALOG
      ═════════════════════════════════════════════════════════════ */}
      {tab === "catalog" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white">Active Destination & Visa Catalog</h3>
              <p className="text-xs text-slate-500">Manage entry packages, government tariffs, and featured spots.</p>
            </div>
            <button
              onClick={() => setNewDestModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/25"
            >
              <Plus size={14} />
              <span>Add Destination</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinations.map((d) => (
              <div key={d.id} className="ios-glass-card rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 flex flex-col justify-between">
                <div className="relative h-36">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ios-glass text-white">
                    {d.category}
                  </span>
                  <span className="absolute bottom-2 right-2 text-xs font-black text-white px-2 py-0.5 rounded-lg bg-black/60">
                    ${d.price}
                  </span>
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{d.name}</h4>
                    <p className="text-[11px] text-slate-500 mb-2">{d.country} • {d.duration}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">{d.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-white/10 text-xs">
                    <span className="text-amber-500 font-bold">★ {d.rating}</span>
                    <button
                      onClick={() => deleteDestination(d.id)}
                      className="text-rose-500 hover:text-rose-700 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 5: APPOINTMENTS
      ═════════════════════════════════════════════════════════════ */}
      {tab === "appointments" && (
        <div className="space-y-4">
          <h3 className="font-black text-lg text-slate-900 dark:text-white">Consular Interview & Biometric Queue</h3>
          <div className="space-y-3">
            {appointments.map((a) => (
              <div key={a.id} className="ios-glass-card rounded-2xl p-4 border border-white/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{a.type} ({a.id})</div>
                  <div className="text-slate-400">Date: {a.date} at {a.time} • Venue: {a.location}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">
                    {a.status}
                  </span>
                  <button
                    onClick={() => toast(`Confirmed arrival for appointment ${a.id}`)}
                    className="ios-glass-pill px-3 py-1 rounded-lg font-bold hover:text-orange-500"
                  >
                    Check In
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 6: TRAVELERS DIRECTORY
      ═════════════════════════════════════════════════════════════ */}
      {tab === "users" && (
        <div className="space-y-4">
          <h3 className="font-black text-lg text-slate-900 dark:text-white">Registered Travelers</h3>
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="ios-glass-card rounded-2xl p-4 border border-white/80 dark:border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{u.name} ({u.email})</div>
                  <div className="text-slate-400">Passport: {u.passportNumber || "Not recorded"} • Joined {u.joined}</div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={u.status} />
                  <button
                    onClick={() => toggleUserStatus(u.id)}
                    className="ios-glass-pill px-3 py-1 rounded-lg font-bold text-slate-600 hover:text-orange-500"
                  >
                    {u.status === "active" ? "Suspend" : "Reactivate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 7: REVENUE
      ═════════════════════════════════════════════════════════════ */}
      {tab === "revenue" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={DollarSign} label="Gross Consular Collections" value={`$${stats.totalRevenue.toLocaleString()}`} delta="+18.4% vs last mo" color="#10b981" />
            <StatCard icon={ShieldCheck} label="Filing Net Margin" value={`$${Math.round(stats.totalRevenue * 0.42).toLocaleString()}`} delta="42% net margin" color="#f97316" />
            <StatCard icon={FileText} label="Processed Invoices" value={String(invoices.length)} delta="100% reconciled" color="#8b5cf6" />
          </div>

          <SectionCard title="Recent Consular Payment Invoices">
            <div className="space-y-2">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-3 bg-white/50 dark:bg-slate-900/40 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{inv.title}</span>
                    <span className="text-slate-400 block text-[10px]">{inv.id} • {inv.date}</span>
                  </div>
                  <span className="font-black text-slate-900 dark:text-white">${inv.amount} USD</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          REVIEW & ADJUDICATION DRAWER MODAL
      ═════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedVisa && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedVisa(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="ios-glass-card rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 mb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase text-orange-500">Consular Adjudication</span>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">{selectedVisa.destinationCountry} eVisa Review</h3>
                </div>
                <button onClick={() => setSelectedVisa(null)} className="text-slate-400 hover:text-slate-800">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-white/60 dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-white/10 space-y-1">
                  <div><strong>Applicant:</strong> {selectedVisa.applicantName}</div>
                  <div><strong>Passport:</strong> {selectedVisa.passportCountry} ({selectedVisa.passportNumber})</div>
                  <div><strong>Visa Category:</strong> {selectedVisa.visaType}</div>
                  <div><strong>Government Ref:</strong> {selectedVisa.embassyReference}</div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Set Decision Status</label>
                  <select
                    value={newStatusInput}
                    onChange={(e) => setNewStatusInput(e.target.value as any)}
                    className="w-full ios-glass-pill rounded-2xl px-4 py-2 text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
                  >
                    <option value="docs_review">Docs Review (Pre-Screening)</option>
                    <option value="embassy_processing">Embassy Processing (In Consular Review)</option>
                    <option value="action_required">Action Required (Request Re-upload)</option>
                    <option value="approved">Approved (Grant Official eVisa)</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Official Consular Officer Note</label>
                  <textarea
                    rows={3}
                    value={consularNoteInput}
                    onChange={(e) => setConsularNoteInput(e.target.value)}
                    placeholder="Enter notes visible to the traveler..."
                    className="w-full ios-glass-pill rounded-2xl p-3 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedVisa(null)}
                    className="px-4 py-2.5 rounded-xl text-slate-500 font-bold hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveVisaReview}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-orange-500/25"
                  >
                    Save & Notify Applicant
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═════════════════════════════════════════════════════════════
          ADD DESTINATION MODAL
      ═════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {newDestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setNewDestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="ios-glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 mb-4">
                <h3 className="font-black text-lg text-slate-900 dark:text-white">Add New Destination</h3>
                <button onClick={() => setNewDestModal(false)} className="text-slate-400 hover:text-slate-800">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAddDestSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Package Title</label>
                  <input
                    type="text"
                    value={destForm.name}
                    onChange={(e) => setDestForm({ ...destForm, name: e.target.value })}
                    placeholder="e.g. Tokyo Neon & Mount Fuji"
                    className="w-full ios-glass-pill rounded-2xl px-4 py-2 text-slate-800 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Country</label>
                    <input
                      type="text"
                      value={destForm.country}
                      onChange={(e) => setDestForm({ ...destForm, country: e.target.value })}
                      placeholder="Japan"
                      className="w-full ios-glass-pill rounded-2xl px-4 py-2 text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Price ($ USD)</label>
                    <input
                      type="number"
                      value={destForm.price}
                      onChange={(e) => setDestForm({ ...destForm, price: Number(e.target.value) })}
                      className="w-full ios-glass-pill rounded-2xl px-4 py-2 text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={destForm.image}
                    onChange={(e) => setDestForm({ ...destForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full ios-glass-pill rounded-2xl px-4 py-2 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={destForm.description}
                    onChange={(e) => setDestForm({ ...destForm, description: e.target.value })}
                    className="w-full ios-glass-pill rounded-2xl p-2.5 text-slate-800 dark:text-white"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-2xl shadow-md"
                  >
                    Create Package
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
