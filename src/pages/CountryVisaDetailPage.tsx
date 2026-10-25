import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, ShieldCheck, CheckCircle2, Clock, DollarSign, Calendar, FileText,
  MapPin, Star, AlertCircle, ChevronDown, ChevronRight, Upload, X, ArrowRight,
  Plane, Sparkles, Building, Phone, Mail, Award, Check, HelpCircle, User, Zap
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { VISA_COUNTRIES, getCountryBySlug, VisaCountry, VisaTypeDetail } from "../data/visaCountries";

export default function CountryVisaDetailPage() {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  const { currentUser, createVisaApplication, toast } = useApp();

  const country: VisaCountry = useMemo(() => {
    return getCountryBySlug(countryId || "japan") || VISA_COUNTRIES[0];
  }, [countryId]);

  const [selectedVisaType, setSelectedVisaType] = useState<VisaTypeDetail>(country.visaTypes[0] || country.visaTypes[0]);
  const [processingSpeed, setProcessingSpeed] = useState<"Standard (5 Days)" | "Express (48h)" | "Super-Rush (24h)">("Standard (5 Days)");
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeConcierge, setIncludeConcierge] = useState(true);
  const [documentChecked, setDocumentChecked] = useState<Record<string, boolean>>({});
  const [simulatedUploaded, setSimulatedUploaded] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openInterview, setOpenInterview] = useState<number | null>(0);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState(country.jurisdictions[0]?.city || "");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [appForm, setAppForm] = useState({
    applicantName: currentUser?.name || "Anney Rora",
    passportNumber: currentUser?.passportNumber || "P982341109",
    passportCountry: currentUser?.country || "United States",
    travelDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    stayDuration: selectedVisaType?.stayDuration || "90 Days",
  });

  // Calculate pricing
  const speedMarkup = processingSpeed === "Super-Rush (24h)" ? 45 : processingSpeed === "Express (48h)" ? 25 : 0;
  const insuranceFee = includeInsurance ? 29 : 0;
  const conciergeFee = includeConcierge ? selectedVisaType.conciergeFee : 0;
  const totalCost = selectedVisaType.governmentFee + conciergeFee + speedMarkup + insuranceFee;

  const toggleDoc = (title: string) => {
    setDocumentChecked((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleSimulatedUpload = (title: string) => {
    setSimulatedUploaded((prev) => ({ ...prev, [title]: true }));
    setDocumentChecked((prev) => ({ ...prev, [title]: true }));
    toast(`Document "${title}" uploaded and verified by AI scanner!`);
  };

  const handleStartApplication = () => {
    if (!currentUser) {
      navigate("/auth", { state: { from: `/visa/${country.slug}` } });
      return;
    }
    setModalStep(1);
    setModalOpen(true);
  };

  const handleSubmitApplication = () => {
    const created = createVisaApplication({
      userId: currentUser?.id || "u1",
      applicantName: appForm.applicantName,
      passportNumber: appForm.passportNumber,
      passportCountry: appForm.passportCountry,
      destinationCountry: country.name,
      destinationCountryId: country.slug,
      visaType: selectedVisaType.name,
      stayDuration: selectedVisaType.stayDuration,
      processingSpeed: processingSpeed,
      fee: totalCost,
      estimatedDecisionDate: new Date(Date.now() + (processingSpeed.includes("24h") ? 1 : processingSpeed.includes("48h") ? 2 : 4) * 86400000).toISOString().slice(0, 10),
      documents: country.requiredDocuments.map((doc) => ({
        name: doc.title,
        type: doc.title.toLowerCase().includes("passport") ? "passport" : doc.title.toLowerCase().includes("statement") ? "bank_statement" : "photo",
        status: "verified",
      })),
    });

    setModalOpen(false);
    navigate("/dashboard/user");
  };

  return (
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* ═════════ BREADCRUMB & REGION BAR ═════════ */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/destinations" className="hover:text-orange-500 transition-colors">Country Visa Hub</Link>
          <ChevronRight size={12} />
          <span className="text-orange-500 font-bold">{country.name} Visa Guide</span>
        </div>

        {/* ═════════ HERO BANNER WITH LIQUID GLASS OVERLAYS ═════════ */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/60 dark:border-white/10">
          <div className="h-[360px] sm:h-[440px] lg:h-[500px] relative">
            <img
              src={country.heroImage}
              alt={country.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-900/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
          </div>

          {/* Floating Hero Content */}
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 lg:p-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-3xl sm:text-4xl">{country.flag}</span>
                <span className="ios-glass-pill px-3.5 py-1.5 rounded-full text-xs font-extrabold text-orange-600 dark:text-orange-400 border border-orange-500/30 flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Official Consular Clearance: {country.visaDifficulty}
                </span>
                <span className="ios-glass-pill px-3 py-1.5 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <CheckCircle2 size={13} /> {country.approvalRate}% Approval Rate
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {country.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Visa Requirements</span>
              </h1>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-none max-w-2xl mb-6 font-normal">
                {country.description}
              </p>

              {/* Key Quick Facts Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-2xl">
                <div className="ios-glass rounded-2xl p-3 border border-white/40 text-white">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Processing</span>
                  <span className="text-sm sm:text-base font-extrabold">{country.averageProcessingTime}</span>
                </div>
                <div className="ios-glass rounded-2xl p-3 border border-white/40 text-white">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Government Fee</span>
                  <span className="text-sm sm:text-base font-extrabold">From ${country.startingPrice} USD</span>
                </div>
                <div className="ios-glass rounded-2xl p-3 border border-white/40 text-white">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Stay Period</span>
                  <span className="text-sm sm:text-base font-extrabold">{country.visaTypes[0]?.stayDuration}</span>
                </div>
                <div className="ios-glass rounded-2xl p-3 border border-white/40 text-white">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Entry Mode</span>
                  <span className="text-sm sm:text-base font-extrabold">Digital e-Gate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═════════ MAIN CONTENT + STICKY SIDEBAR GRID ═════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Deep Visa Documentation (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-10">

            {/* 1. VISA CATEGORY SELECTOR & DETAILS */}
            <div className="ios-glass-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div>
                  <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                    Select Visa Category
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Available Entry Pathways
                  </h2>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {country.visaTypes.length} Visa Options
                </span>
              </div>

              {/* Visa Type Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
                {country.visaTypes.map((type) => {
                  const isSelected = selectedVisaType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedVisaType(type)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 flex-shrink-0 flex items-center gap-2 ${
                        isSelected
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                          : "ios-glass text-slate-700 dark:text-slate-300 hover:text-orange-500 border border-white/60 dark:border-white/10"
                      }`}
                    >
                      <span>{type.name}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isSelected ? "bg-white/20 text-white" : "bg-orange-500/10 text-orange-500"
                      }`}>
                        {type.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Visa Specification Box */}
              <div className="bg-white/60 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-200/60 dark:border-white/10">
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {selectedVisaType.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedVisaType.recommendedFor}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Government Fee</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      ${selectedVisaType.governmentFee} USD
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-200/60 dark:border-white/10 mb-5 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Stay Duration</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedVisaType.stayDuration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Validity</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedVisaType.validity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Entry Type</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedVisaType.entryType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Standard Speed</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedVisaType.processingDaysStandard} Working Days</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Mandatory Eligibility & Inclusions
                  </h4>
                  <ul className="space-y-2">
                    {selectedVisaType.requirements.map((req, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 text-xs text-orange-700 dark:text-orange-300">
                  <strong>Consular Advisory:</strong> {selectedVisaType.eligibilityNotes}
                </div>
              </div>
            </div>

            {/* 2. INTERACTIVE DOCUMENT CHECKLIST & INSTANT AI UPLOADER */}
            <div className="ios-glass-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                    Pre-Screening Verification
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Mandatory Document Checklist
                  </h2>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <ShieldCheck size={14} /> 100% Guaranteed Compliance Check
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Click to verify documents you have prepared, or click "Upload & Verify" to run our instant simulated AI resolution scanner.
              </p>

              <div className="space-y-3">
                {country.requiredDocuments.map((doc, idx) => {
                  const isChecked = !!documentChecked[doc.title];
                  const isUploaded = !!simulatedUploaded[doc.title];
                  return (
                    <div
                      key={doc.title}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isChecked
                          ? "bg-emerald-500/5 border-emerald-500/30"
                          : "bg-white/50 dark:bg-slate-900/30 border-slate-200/60 dark:border-white/10 hover:border-orange-500/40"
                      }`}
                    >
                      <div className="flex items-start gap-3.5 flex-1">
                        <button
                          onClick={() => toggleDoc(doc.title)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                            isChecked
                              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                              : "border-2 border-slate-300 dark:border-white/20 text-transparent hover:border-orange-500"
                          }`}
                        >
                          <Check size={14} />
                        </button>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {doc.title}
                            </h4>
                            {doc.isMandatory && (
                              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                                Required
                              </span>
                            )}
                            {isUploaded && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <Check size={10} /> Verified by AI
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                            {doc.description}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Specification: {doc.format}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                        <button
                          onClick={() => handleSimulatedUpload(doc.title)}
                          className="flex items-center gap-1.5 ios-glass-pill hover:bg-orange-500 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/60 dark:border-white/10 transition-all"
                        >
                          <Upload size={13} />
                          <span>{isUploaded ? "Re-upload" : "Upload & Verify"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. STEP-BY-STEP CONSULAR APPLICATION TIMELINE */}
            <div className="ios-glass-card rounded-3xl p-6 sm:p-8">
              <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                Transparent Execution Roadmap
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Step-by-Step Consular Pathway
              </h2>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-orange-500/30 space-y-8">
                {country.consularSteps.map((step) => (
                  <div key={step.step} className="relative group">
                    {/* Step Icon Node */}
                    <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-extrabold text-xs flex items-center justify-center shadow-lg shadow-orange-500/30">
                      {step.step}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {step.title}
                        </h4>
                        <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. EMBASSY JURISDICTIONS & CONSULAR LOCATOR */}
            <div className="ios-glass-card rounded-3xl p-6 sm:p-8">
              <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                Official Representations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Consular Jurisdictions & Embassy Locator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Locate accredited consular offices and visa application centers (VAC) handling applications for your jurisdiction.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {country.jurisdictions.map((j) => (
                  <button
                    key={j.city}
                    onClick={() => setSelectedJurisdiction(j.city)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      selectedJurisdiction === j.city
                        ? "bg-orange-500/10 border-orange-500/40 shadow-sm"
                        : "bg-white/40 dark:bg-slate-900/30 border-slate-200/60 dark:border-white/10 hover:border-orange-500/20"
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">{j.city}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{j.country}</div>
                    <div className="mt-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      ⚡ Next appointment: {j.appointmentWaitDays} day(s) wait
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Jurisdiction Card */}
              {(() => {
                const j = country.jurisdictions.find((x) => x.city === selectedJurisdiction) || country.jurisdictions[0];
                if (!j) return null;
                return (
                  <div className="bg-white/60 dark:bg-slate-900/40 rounded-2xl p-5 border border-slate-200/60 dark:border-white/10 text-xs">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400 font-bold text-[10px] uppercase block mb-1">Address</span>
                        <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-start gap-1.5">
                          <MapPin size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                          <span>{j.address}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold text-[10px] uppercase block mb-1">Contact & Support</span>
                        <div className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Phone size={13} className="text-blue-500" /> {j.phone}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Mail size={13} className="text-purple-500" /> {j.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
                      <strong>Jurisdiction coverage:</strong> {j.jurisdictionCovers}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 5. CONSULAR INTERVIEW PREP & COMMON QUESTIONS */}
            <div className="ios-glass-card rounded-3xl p-6 sm:p-8">
              <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                Insider Knowledge
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Embassy Interview Simulator & Tips
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Top questions asked by consular officers and how to answer with 100% confidence.
              </p>

              <div className="space-y-3">
                {country.interviewTips.map((tip, idx) => (
                  <div key={idx} className="bg-white/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-white/10 overflow-hidden">
                    <button
                      onClick={() => setOpenInterview(openInterview === idx ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 dark:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-500 text-xs flex items-center justify-center font-bold">
                          Q
                        </span>
                        {tip.question}
                      </span>
                      <ChevronDown size={15} className={`text-slate-400 transition-transform ${openInterview === idx ? "rotate-180 text-orange-500" : ""}`} />
                    </button>
                    {openInterview === idx && (
                      <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-white/10 pt-3">
                        <strong className="text-orange-600 dark:text-orange-400 block mb-1">Recommended Response Strategy:</strong>
                        {tip.advice}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 6. COUNTRY FAQS */}
            <div className="ios-glass-card rounded-3xl p-6 sm:p-8">
              <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                Frequently Asked
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {country.name} Visa FAQs
              </h2>

              <div className="space-y-3">
                {country.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-white/10 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 dark:text-white"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown size={15} className={`text-slate-400 transition-transform ${openFaq === idx ? "rotate-180 text-orange-500" : ""}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-white/10 pt-3 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 7. VERIFIED TRAVELER REVIEWS */}
            <div className="ios-glass-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div>
                  <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                    Verified Customer Feedback
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Recent Approvals for {country.name}
                  </h2>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  <Star size={13} className="fill-amber-500" /> 4.96 / 5.0 (1,240+ reviews)
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {country.travelerReviews.map((rev, idx) => (
                  <div key={idx} className="bg-white/50 dark:bg-slate-900/40 rounded-2xl p-5 border border-slate-200/60 dark:border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.author}</span>
                        <div className="flex gap-0.5 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={11} className="fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 mb-3">
                        Passport: {rev.passportOrigin} • {rev.visaApproved}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic mb-4">
                        "{rev.comment}"
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-200/60 dark:border-white/10">
                      <span>Turnaround: {rev.processingTimeTaken}</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Fee Calculator & Action Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="ios-glass-card rounded-3xl p-6 shadow-2xl border border-white/80 dark:border-white/10">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 mb-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500">
                    Pricing & Calculator
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Instant Cost Estimate
                  </h3>
                </div>
                <span className="text-2xl">{country.flag}</span>
              </div>

              {/* Processing Speed Switcher */}
              <div className="mb-5">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  Select Processing Speed
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-2xl">
                  {(["Standard (5 Days)", "Express (48h)", "Super-Rush (24h)"] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setProcessingSpeed(spd)}
                      className={`py-2 px-1 text-center rounded-xl text-[10px] font-bold transition-all ${
                        processingSpeed === spd
                          ? "bg-white dark:bg-slate-800 text-orange-500 shadow-sm"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                      }`}
                    >
                      {spd.split(" ")[0]}
                      <span className="block text-[8px] opacity-75">{spd.split(" ")[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Add-on Toggles */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/10 cursor-pointer text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-white block">Travel Medical Insurance</span>
                    <span className="text-[10px] text-slate-400">€30k / $50k Consular policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">+$29</span>
                    <input
                      type="checkbox"
                      checked={includeInsurance}
                      onChange={(e) => setIncludeInsurance(e.target.checked)}
                      className="w-4 h-4 accent-orange-500 rounded"
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/10 cursor-pointer text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-white block">Legal Concierge Pre-Screen</span>
                    <span className="text-[10px] text-slate-400">100% rejection protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">+${selectedVisaType.conciergeFee}</span>
                    <input
                      type="checkbox"
                      checked={includeConcierge}
                      onChange={(e) => setIncludeConcierge(e.target.checked)}
                      className="w-4 h-4 accent-orange-500 rounded"
                    />
                  </div>
                </label>
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-2 py-4 border-t border-slate-200/60 dark:border-white/10 text-xs mb-6">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Official Government Fee</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">${selectedVisaType.governmentFee} USD</span>
                </div>
                {includeConcierge && (
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Foxico Legal Review & Filing</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">${selectedVisaType.conciergeFee} USD</span>
                  </div>
                )}
                {speedMarkup > 0 && (
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>{processingSpeed} Surcharge</span>
                    <span className="font-semibold text-orange-500">+${speedMarkup} USD</span>
                  </div>
                )}
                {includeInsurance && (
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Schengen/Consular Insurance</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">+$29 USD</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200/60 dark:border-white/10">
                  <span>Estimated Total</span>
                  <span className="text-xl text-orange-500">${totalCost} USD</span>
                </div>
              </div>

              {/* Primary Call to Action */}
              <motion.button
                onClick={handleStartApplication}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 text-sm transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap size={16} />
                <span>Start Visa Application Now</span>
              </motion.button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>Encrypted 256-bit TLS • Bank-Grade Security</span>
              </div>
            </div>

            {/* Quick Live Tracking Simulation Widget */}
            <div className="ios-glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white mb-2">
                <Plane size={14} className="text-orange-500" /> Live Application Status Demo
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                Current active applicants for {country.name} can track progress in real time.
              </p>
              <div className="p-3 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-white/10 text-xs">
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-800 dark:text-white">Sample Code: VISA-{country.countryCode}-8821</span>
                  <span className="text-emerald-500 font-extrabold">Active</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-emerald-500 h-full w-3/4 rounded-full" />
                </div>
                <div className="text-[10px] text-slate-400">
                  Stage: Embassy Review & Biometric Cross-Match (75%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════ MULTI-STEP VISA APPLICATION MODAL ═════════ */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-slate-950/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="ios-glass-card w-full max-w-xl rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                    Step {modalStep} of 3
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Apply for {country.name} Visa
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-9 h-9 rounded-full ios-glass-pill flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Step 1: Personal & Passport Details */}
              {modalStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Full Legal Name (as written on passport)
                    </label>
                    <input
                      type="text"
                      value={appForm.applicantName}
                      onChange={(e) => setAppForm({ ...appForm, applicantName: e.target.value })}
                      className="w-full bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g. Johnathan Alexander Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Passport Number
                      </label>
                      <input
                        type="text"
                        value={appForm.passportNumber}
                        onChange={(e) => setAppForm({ ...appForm, passportNumber: e.target.value })}
                        className="w-full bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="P12345678"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Citizenship / Issuing Country
                      </label>
                      <input
                        type="text"
                        value={appForm.passportCountry}
                        onChange={(e) => setAppForm({ ...appForm, passportCountry: e.target.value })}
                        className="w-full bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Intended Travel Date
                    </label>
                    <input
                      type="date"
                      value={appForm.travelDate}
                      onChange={(e) => setAppForm({ ...appForm, travelDate: e.target.value })}
                      className="w-full bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setModalStep(2)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/25"
                    >
                      Next: Document Upload <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Instant Document Upload Simulator */}
              {modalStep === 2 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Upload your digital files for consular verification. Our system verifies resolution, border alignment, and biometric specs.
                  </p>

                  <div className="space-y-3">
                    {country.requiredDocuments.slice(0, 3).map((d) => (
                      <div key={d.title} className="p-3 bg-white/60 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-800 dark:text-white">{d.title}</div>
                          <div className="text-[10px] text-slate-400">{d.format}</div>
                        </div>
                        <button
                          onClick={() => handleSimulatedUpload(d.title)}
                          className="ios-glass-pill px-3 py-1.5 rounded-xl font-bold text-xs hover:bg-orange-500 hover:text-white transition-all flex items-center gap-1"
                        >
                          <Upload size={12} />
                          <span>{simulatedUploaded[d.title] ? "Ready ✓" : "Upload File"}</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setModalStep(1)}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-white font-bold text-xs"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setModalStep(3)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/25"
                    >
                      Next: Review & Confirm <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit to User Dashboard */}
              {modalStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-white/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200/60 dark:border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Applicant:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{appForm.applicantName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Destination:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{country.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Visa Category:</span>
                      <span className="font-bold text-orange-500">{selectedVisaType.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Processing Tier:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{processingSpeed}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200/60 dark:border-white/10 font-black text-sm">
                      <span className="text-slate-900 dark:text-white">Total Amount:</span>
                      <span className="text-orange-500">${totalCost} USD</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 size={16} className="flex-shrink-0" />
                    <span>Your application will be submitted directly to our consular liaison and tracked in your Traveler Dashboard.</span>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setModalStep(2)}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-white font-bold text-xs"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmitApplication}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 text-white font-extrabold px-8 py-3.5 rounded-2xl text-xs flex items-center gap-2 shadow-xl shadow-orange-500/30"
                    >
                      <Zap size={14} />
                      <span>Confirm & Track in Dashboard</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
