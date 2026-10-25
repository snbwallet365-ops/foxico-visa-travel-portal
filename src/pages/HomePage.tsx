import { useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Globe, ShieldCheck, CheckCircle2, Clock, DollarSign, Calendar, FileText,
  MapPin, Star, AlertCircle, ChevronDown, ChevronRight, ChevronLeft, ArrowRight,
  Plane, Sparkles, Building, Phone, Mail, Award, Check, HelpCircle, User, Zap,
  Briefcase, Laptop, GraduationCap, Compass, Search, Smartphone, Shield, Lock,
  Flame, TrendingUp, RefreshCw, Layers, CreditCard
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import { useApp } from "../context/AppContext";
import { VISA_COUNTRIES, VisaCountry } from "../data/visaCountries";

export default function HomePage() {
  const navigate = useNavigate();
  const { settings, toast } = useApp();

  /* ──────────────── Section 2: Quick Visa Checker ──────────────── */
  const [passportCountry, setPassportCountry] = useState("United States");
  const [destinationSlug, setDestinationSlug] = useState("japan");

  const selectedDestination = useMemo(() => {
    return VISA_COUNTRIES.find((c) => c.slug === destinationSlug) || VISA_COUNTRIES[0];
  }, [destinationSlug]);

  /* ──────────────── Section 4: Category Grid ──────────────── */
  const [activeCategory, setActiveCategory] = useState<"all" | "tourist" | "nomad" | "business" | "residency">("all");

  /* ──────────────── Section 5: Carousel Scroll ──────────────── */
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  /* ──────────────── Section 7: Speed & Cost Calculator ──────────────── */
  const [calcCountrySlug, setCalcCountrySlug] = useState("japan");
  const [calcSpeed, setCalcSpeed] = useState<"standard" | "express" | "rush">("express");
  const [calcInsurance, setCalcInsurance] = useState(true);

  const calcCountry = useMemo(() => {
    return VISA_COUNTRIES.find((c) => c.slug === calcCountrySlug) || VISA_COUNTRIES[0];
  }, [calcCountrySlug]);

  const calcTotal = useMemo(() => {
    const base = calcCountry.startingPrice;
    const speedCost = calcSpeed === "rush" ? 45 : calcSpeed === "express" ? 25 : 0;
    const insCost = calcInsurance ? 29 : 0;
    return base + 29 + speedCost + insCost;
  }, [calcCountry, calcSpeed, calcInsurance]);

  /* ──────────────── Section 8: Approval Odds Simulator ──────────────── */
  const [simPassportValid, setSimPassportValid] = useState(true);
  const [simFundsReady, setSimFundsReady] = useState(true);
  const [simReturnFlight, setSimReturnFlight] = useState(true);
  const [simCleanRecord, setSimCleanRecord] = useState(true);

  const approvalScore = useMemo(() => {
    let score = 55;
    if (simPassportValid) score += 15;
    if (simFundsReady) score += 15;
    if (simReturnFlight) score += 10;
    if (simCleanRecord) score += 4;
    return score;
  }, [simPassportValid, simFundsReady, simReturnFlight, simCleanRecord]);

  /* ──────────────── Section 9: Document Checklist Explorer ──────────────── */
  const [checklistTab, setChecklistTab] = useState<"tourist" | "nomad" | "student" | "business">("tourist");

  /* ──────────────── Section 12: Interview Tips Accordion ──────────────── */
  const [openInterviewQ, setOpenInterviewQ] = useState<number | null>(0);

  /* ──────────────── Section 13: Schengen 90/180 Calculator ──────────────── */
  const [schengenDaysSpent, setSchengenDaysSpent] = useState<number>(24);

  /* ──────────────── Section 15: Tracking Simulator ──────────────── */
  const [trackingCode, setTrackingCode] = useState("VISA-JP-8821");
  const [trackedStatus, setTrackedStatus] = useState<"found" | "empty">("found");

  /* ──────────────── Section 19: FAQ Accordions ──────────────── */
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  /* ──────────────── Section 20: Email Newsletter ──────────────── */
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast("Please enter a valid email address", "error");
      return;
    }
    toast("Subscribed to Foxico Weekly Visa & Border Bulletin!");
    setNewsletterEmail("");
  };

  return (
    <div className="relative overflow-hidden">
      {/* Maintenance alert if enabled */}
      {settings.maintenance && (
        <div className="fixed top-20 inset-x-0 z-40 bg-amber-500 text-slate-950 px-4 py-2 flex items-center justify-center gap-2 text-xs font-bold shadow-lg">
          <AlertCircle size={15} />
          <span>Notice: Global embassy maintenance window active — electronic submissions processing normally.</span>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          SECTION 1: HERO SECTION WITH LIQUID GLASS SLIDER
      ═════════════════════════════════════════════════════════════ */}
      <section className="relative">
        <HeroSection />
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 2: LIVE QUICK VISA CHECKER & PASSPORT SELECTOR BAR
      ═════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-14 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="ios-glass-card rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/80 dark:border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500">
              Live Visa & Border Clearance Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Passport Country */}
            <div className="md:col-span-4">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">
                My Passport / Nationality
              </label>
              <div className="relative">
                <select
                  value={passportCountry}
                  onChange={(e) => setPassportCountry(e.target.value)}
                  className="w-full ios-glass-pill rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  <option value="United States">🇺🇸 United States</option>
                  <option value="United Kingdom">🇬🇧 United Kingdom</option>
                  <option value="Canada">🇨🇦 Canada</option>
                  <option value="Australia">🇦🇺 Australia</option>
                  <option value="Germany">🇩🇪 Germany (EU)</option>
                  <option value="France">🇫🇷 France (EU)</option>
                  <option value="India">🇮🇳 India</option>
                  <option value="Singapore">🇸🇬 Singapore</option>
                  <option value="Japan">🇯🇵 Japan</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Destination Country */}
            <div className="md:col-span-4">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">
                Destination Country
              </label>
              <div className="relative">
                <select
                  value={destinationSlug}
                  onChange={(e) => setDestinationSlug(e.target.value)}
                  className="w-full ios-glass-pill rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  {VISA_COUNTRIES.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Instant Result Box */}
            <div className="md:col-span-4 flex items-center gap-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10 dark:from-orange-500/20 dark:to-amber-500/20 p-3 rounded-2xl border border-orange-500/25">
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-widest truncate">
                  {selectedDestination.visaDifficulty}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {selectedDestination.averageProcessingTime} • From ${selectedDestination.startingPrice}
                </div>
              </div>
              <Link
                to={`/visa/${selectedDestination.slug}`}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 shadow-md shadow-orange-500/30 flex-shrink-0 transition-transform active:scale-95"
              >
                <span>Check Visa</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 3: GLOBAL IMPACT & LIQUID GLASS STATS BAR
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Global Destinations", value: "120+", sub: "Official Embassies", icon: Globe, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Visa Approval Rate", value: "99.4%", sub: "Consular Guarantee", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Fast-Track Speed", value: "24 Hours", sub: "Super-Rush Service", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
            { label: "Passports Processed", value: "50,000+", sub: "Verified Travelers", icon: Award, color: "text-purple-500", bg: "bg-purple-500/10" }
          ].map((stat, i) => (
            <div key={i} className="ios-glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 card-hover-ios flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{stat.label}</span>
                <div className={`w-8 h-8 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={16} />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 4: FAST-TRACK VISA CATEGORY GRID
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
              Streamlined Visa Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tailored Pathways For Every Journey
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
            Whether taking a brief island vacation or moving abroad as an international remote professional, explore our certified consular channels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Tourist & Leisure eVisas", desc: "Fast-track electronic approval for vacationers, short-term holidays, and cultural escapes across 90+ countries.", time: "24h - 3 Days", icon: Plane, color: "#3b82f6", link: "/visa/japan" },
            { title: "Digital Nomad & Remote Work", desc: "Long-stay multiple entry visas for developers, founders, and creators with zero local tax complications.", time: "7 - 14 Days", icon: Laptop, color: "#f97316", link: "/visa/thailand" },
            { title: "Schengen 29-Nation Permit", desc: "Single unified European visa unlocking France, Switzerland, Greece, Italy, and 29 member countries seamlessly.", time: "5 - 10 Days", icon: Globe, color: "#10b981", link: "/visa/france-schengen" },
            { title: "Corporate & Conference Visa", desc: "Expedited invitation letter audits and commercial filings for executives, international summits, and trade events.", time: "3 - 5 Days", icon: Briefcase, color: "#8b5cf6", link: "/visa/united-kingdom" },
            { title: "Golden Residency & Long-Stay", desc: "High-net-worth real estate, investor, and retirement residency permits for Dubai, Bali, and southern Europe.", time: "14 - 30 Days", icon: Building, color: "#ec4899", link: "/visa/uae-dubai" },
            { title: "Airport Transit & Layover ETAs", desc: "Instant airside transit clearance for international connecting flights through London Heathrow, Tokyo, and Dubai.", time: "Instant / 1h", icon: RefreshCw, color: "#06b6d4", link: "/visa/japan" }
          ].map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="ios-glass-card rounded-3xl p-6 border border-white/80 dark:border-white/10 card-hover-ios flex flex-col justify-between group"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                >
                  <cat.icon size={22} style={{ color: cat.color }} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {cat.desc}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-white/10 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Speed: {cat.time}</span>
                <span className="font-bold text-orange-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ChevronRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 5: TRENDING COUNTRY VISA HUB (WORKABLE SCROLLING CAROUSEL)
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto overflow-hidden">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
              Interactive Country Carousel
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trending Global Visa Destinations
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel("left")}
              aria-label="Previous Destinations"
              className="w-10 h-10 rounded-full ios-glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-all active:scale-90"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              aria-label="Next Destinations"
              className="w-10 h-10 rounded-full ios-glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-all active:scale-90"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {VISA_COUNTRIES.map((c) => (
            <div
              key={c.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] ios-glass-card rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 card-hover-ios snap-start flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={c.heroImage}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ios-glass text-white border border-white/40">
                    {c.region}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {c.name}
                  </h3>
                  <span className="text-[10px] text-white/80 font-medium">
                    {c.visaDifficulty}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Average Turnaround</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{c.averageProcessingTime}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Approval Odds</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{c.approvalRate}%</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Government Fee</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">From ${c.startingPrice} USD</span>
                  </div>
                </div>

                <Link
                  to={`/visa/${c.slug}`}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 text-white font-extrabold py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/25 transition-transform active:scale-95 text-center"
                >
                  <span>View Full Visa Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 6: HOW IT WORKS 4-STEP TIMELINE
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
            Zero Bureaucracy, 100% Digital
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            How Foxico Visa Issuance Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Instant Eligibility Check", desc: "Select your passport and destination to verify entry rules, stay allowances, and biometric requirements.", icon: Search },
            { step: "02", title: "3-Minute Digital Intake", desc: "Upload high-res photo and passport scan. Our AI pre-screens resolution and consular specs automatically.", icon: FileText },
            { step: "03", title: "Official Consular Filing", desc: "Our accredited legal team handles direct transmission to foreign ministries and secures priority appointments.", icon: ShieldCheck },
            { step: "04", title: "Pass to Apple Wallet", desc: "Receive your verified official electronic visa certificate with scannable QR code ready for airport e-Gates.", icon: Smartphone }
          ].map((item, idx) => (
            <div key={idx} className="ios-glass-card rounded-3xl p-6 border border-white/80 dark:border-white/10 card-hover-ios relative">
              <span className="text-3xl font-black text-orange-500/30 font-mono block mb-3">{item.step}</span>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3">
                <item.icon size={18} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 7: LIVE VISA COST & SPEED CALCULATOR
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-5xl mx-auto">
        <div className="ios-glass-card rounded-3xl p-6 sm:p-10 border border-white/80 dark:border-white/10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/50 dark:border-white/10 mb-8 gap-4">
            <div>
              <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                Transparent Pricing Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Interactive Visa Fee Calculator
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
              No Hidden Surcharges
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Select Country
                </label>
                <select
                  value={calcCountrySlug}
                  onChange={(e) => setCalcCountrySlug(e.target.value)}
                  className="w-full ios-glass-pill rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {VISA_COUNTRIES.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.flag} {c.name} (Base Gov Fee: ${c.startingPrice})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Processing Velocity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "standard", label: "Standard", time: "5 Days", add: "$0" },
                    { id: "express", label: "Express", time: "48 Hours", add: "+$25" },
                    { id: "rush", label: "Super-Rush", time: "24 Hours", add: "+$45" }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setCalcSpeed(s.id as any)}
                      className={`p-2.5 rounded-2xl text-center border text-xs font-bold transition-all ${
                        calcSpeed === s.id
                          ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/30"
                          : "ios-glass text-slate-700 dark:text-slate-300 border-white/60 dark:border-white/10"
                      }`}
                    >
                      <div>{s.label}</div>
                      <div className="text-[10px] opacity-80">{s.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/10 cursor-pointer text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Include Consular Travel Insurance</span>
                  <span className="text-[10px] text-slate-400">Meets all €30,000 / $50,000 mandatory coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300">+$29</span>
                  <input
                    type="checkbox"
                    checked={calcInsurance}
                    onChange={(e) => setCalcInsurance(e.target.checked)}
                    className="w-4 h-4 accent-orange-500"
                  />
                </div>
              </label>
            </div>

            {/* Price Output Glass Card */}
            <div className="ios-glass rounded-3xl p-6 border border-white/80 dark:border-white/10 bg-gradient-to-br from-white/90 to-orange-500/5 dark:from-slate-900/80 dark:to-orange-950/20 shadow-xl text-xs space-y-3">
              <div className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
                Breakdown for {calcCountry.name}
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Government Consular Fee</span>
                <span className="font-bold">${calcCountry.startingPrice} USD</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Foxico Legal Pre-Screening</span>
                <span className="font-bold">$29 USD</span>
              </div>
              {calcSpeed !== "standard" && (
                <div className="flex justify-between text-orange-500 font-semibold">
                  <span>Priority Expedited Surcharge</span>
                  <span>+${calcSpeed === "rush" ? 45 : 25} USD</span>
                </div>
              )}
              {calcInsurance && (
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Consular Medical Insurance</span>
                  <span className="font-bold">+$29 USD</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Total All-Inclusive</span>
                  <span className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${calcTotal} <span className="text-xs font-normal text-slate-400">USD</span>
                  </span>
                </div>
                <Link
                  to={`/visa/${calcCountry.slug}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-5 py-3 rounded-2xl text-xs shadow-lg shadow-orange-500/30"
                >
                  Apply at This Rate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 8: LIVE APPROVAL ODDS SIMULATOR
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto">
        <div className="ios-glass-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/50 dark:border-white/10 mb-6 gap-2">
            <div>
              <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                AI Readiness Gauge
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Live Visa Eligibility & Approval Odds Simulator
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Estimated Approval Odds</span>
              <div className="text-3xl font-black text-emerald-500">{approvalScore}%</div>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Toggle your qualifications to see how closely your dossier aligns with standard consular adjudication criteria.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { label: "Passport Valid for at Least 6 Months", state: simPassportValid, setter: setSimPassportValid },
              { label: "Bank Statement Demonstrating $1,500+ Liquid Funds", state: simFundsReady, setter: setSimFundsReady },
              { label: "Confirmed Roundtrip Flight Reservation", state: simReturnFlight, setter: setSimReturnFlight },
              { label: "No Previous Visa Overstays or Denials", state: simCleanRecord, setter: setSimCleanRecord }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.setter(!item.state)}
                className={`p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                  item.state
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                    : "bg-white/40 dark:bg-slate-900/30 border-slate-200 dark:border-white/10 text-slate-500"
                }`}
              >
                <span className="text-xs font-bold">{item.label}</span>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  item.state ? "bg-emerald-500 text-white" : "border border-slate-300 dark:border-white/20"
                }`}>
                  {item.state ? "✓" : ""}
                </span>
              </button>
            ))}
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${approvalScore}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 9: DOCUMENT CHECKLIST EXPLORER
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
            Pre-Screening Verification
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Mandatory Documents By Purpose
          </h2>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {(["tourist", "nomad", "student", "business"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setChecklistTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold capitalize transition-all ${
                checklistTab === tab
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                  : "ios-glass text-slate-600 dark:text-slate-300 border border-white/60 dark:border-white/10"
              }`}
            >
              {tab === "nomad" ? "Digital Nomad" : tab} Checklist
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Passport Bio-Data Page", desc: "Color scan, minimum 6 months validity past travel date.", tag: "Mandatory" },
            { title: "Biometric 35x45mm Photo", desc: "White background, neutral facial expression, no glare.", tag: "Mandatory" },
            { title: "Financial Solvency Proof", desc: "3 consecutive months bank statements with certified bank seal.", tag: checklistTab === "nomad" ? "$60k/yr Proof" : "Min $1,500" },
            { title: "Accommodation & Flight Proof", desc: "Confirmed roundtrip flight reservation and hotel bookings.", tag: "Mandatory" }
          ].map((doc, idx) => (
            <div key={idx} className="ios-glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 inline-block mb-3">
                  {doc.tag}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{doc.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{doc.desc}</p>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <Check size={11} /> AI Scannable PDF or JPG
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 10: DIGITAL NOMAD & REMOTE WORK VISA SPOTLIGHT
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="ios-glass-card rounded-3xl p-6 sm:p-10 border border-white/80 dark:border-white/10 bg-gradient-to-br from-white/80 via-white/50 to-orange-500/5 dark:from-slate-900/80 dark:to-orange-950/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                Work From Anywhere
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Digital Nomad Hub Spotlight
              </h2>
            </div>
            <Link
              to="/visa/thailand"
              className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1"
            >
              <span>Explore all Nomad Visas</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { country: "Thailand DTV", flag: "🇹🇭", duration: "5 Years Multiple", income: "$14k in assets", link: "/visa/thailand", perk: "180 days per stay" },
              { country: "Japan Nomad Visa", flag: "🇯🇵", duration: "6 Months", income: "$68k/yr foreign income", link: "/visa/japan", perk: "Hubs across Tokyo & Kyoto" },
              { country: "Bali Remote Worker", flag: "🇮🇩", duration: "1 Year Multiple", income: "$60k/yr contract", link: "/visa/indonesia", perk: "Zero Indonesian tax on foreign earnings" }
            ].map((n, i) => (
              <div key={i} className="bg-white/60 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-200/60 dark:border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{n.flag}</span>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-500">
                      {n.duration}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">{n.country}</h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Requirement: {n.income}</div>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-4">★ {n.perk}</div>
                </div>
                <Link
                  to={n.link}
                  className="w-full text-center ios-glass-pill hover:bg-orange-500 hover:text-white font-bold py-2 rounded-xl text-xs transition-colors"
                >
                  View Requirements
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 11: EMBASSY LOCATOR DIRECTORY
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
            Global Consular Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Accredited Embassy & VAC Jurisdictions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { city: "London", country: "United Kingdom", offices: "UKVI, VFS France, Japan Consular", wait: "1–2 days" },
            { city: "New York", country: "United States", offices: "Japan MOFA, Schengen Center, UAE Desk", wait: "1 day" },
            { city: "Tokyo", country: "Japan", offices: "Kasumigaseki Consular Headquarters", wait: "Immediate" },
            { city: "Singapore", country: "Singapore", offices: "Southeast Asia Regional Consular Gateway", wait: "1 day" }
          ].map((emb, i) => (
            <div key={i} className="ios-glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 font-black text-lg text-slate-900 dark:text-white">
                  <Building size={16} className="text-orange-500" />
                  <span>{emb.city}</span>
                </div>
                <div className="text-xs text-slate-400 mb-2">{emb.country}</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">{emb.offices}</p>
              </div>
              <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 pt-3 border-t border-slate-200/50 dark:border-white/10">
                ⚡ Current queue wait: {emb.wait}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 12: CONSULAR INTERVIEW PREP FLASHCARDS
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto">
        <div className="ios-glass-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10">
          <div className="mb-6">
            <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
              Consular Interview Simulator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Top 4 Visa Interview Questions Explained
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { q: "What is the primary purpose of your travel?", tip: "Always be concise. Name your primary city or sightseeing attraction. Explicitly confirm you will not engage in local domestic employment." },
              { q: "How will you financially support yourself during the trip?", tip: "Refer directly to your attached bank statements. Explain you have budgeted $150–$250 per day for hotels, dining, and internal rail transport." },
              { q: "What ties guarantee your return to your home country?", tip: "Highlight your permanent job contract, approved employer vacation letter, lease or property deed, and immediate family members." },
              { q: "Have you ever been refused a visa by any country?", tip: "Always answer truthfully. Disclosing a previous technical refusal with clear context is vastly safer than an omission, which triggers a fraud ban." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenInterviewQ(openInterviewQ === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle size={15} className="text-orange-500 flex-shrink-0" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${openInterviewQ === idx ? "rotate-180 text-orange-500" : ""}`} />
                </button>
                {openInterviewQ === idx && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-200/50 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong className="text-orange-600 dark:text-orange-400 block mb-1">Expert Consular Strategy:</strong>
                    {item.tip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 13: SCHENGEN 90/180-DAY RULE CALCULATOR
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto">
        <div className="ios-glass-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/50 dark:border-white/10 mb-6 gap-2">
            <div>
              <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                European Travel Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Schengen 90/180-Day Rule Calculator
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Remaining Allowed Days</span>
              <div className="text-3xl font-black text-orange-500">{90 - schengenDaysSpent} Days</div>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Under Schengen regulations, visitors may stay a maximum of 90 days in any rolling 180-day window across all 29 member countries.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>Days spent in Schengen zone over past 180 days:</span>
                <span className="text-orange-500 font-mono text-sm">{schengenDaysSpent} days</span>
              </div>
              <input
                type="range"
                min={0}
                max={90}
                value={schengenDaysSpent}
                onChange={(e) => setSchengenDaysSpent(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            <div className="p-3 bg-white/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
              {90 - schengenDaysSpent > 30 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ Compliant: You have plenty of travel allowance remaining for upcoming visits.
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  ⚠️ Caution: You are nearing the 90-day threshold. Consider non-Schengen destinations like the UK or Cyprus to reset your rolling 180-day window.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 14: GLOBAL VISA POLICY RADAR & NEWS TICKER
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
              Live Border Intelligence
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Global Visa Policy Radar
            </h2>
          </div>
          <Link to="/news" className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
            <span>Read all 40+ updates</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { tag: "Breaking Agreement", title: "Japan Expands Online eVisa Access to 12 Additional Nationalities", date: "4 hours ago", badge: "Live" },
            { tag: "Policy Update", title: "Thailand DTV 5-Year Visa Registrations Surpass 100,000 Milestone", date: "Yesterday", badge: "Verified" },
            { tag: "Border Advisory", title: "European Union Postpones EES Biometric Border Launch to Ensure Airline Readiness", date: "2 days ago", badge: "Alert" }
          ].map((news, i) => (
            <div key={i} className="ios-glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 card-hover-ios flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase text-orange-500">{news.tag}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">{news.badge}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2 leading-snug">{news.title}</h3>
              </div>
              <div className="text-[10px] text-slate-400 pt-3 border-t border-slate-200/50 dark:border-white/10 flex justify-between">
                <span>{news.date}</span>
                <span className="font-bold text-orange-500">Read dispatch →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 15: REAL-TIME APPLICATION TRACKING SIMULATOR
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto">
        <div className="ios-glass-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10">
          <div className="mb-6">
            <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
              Live Consular Progress
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Real-Time Visa Tracking Simulator
            </h2>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Enter Application Code e.g. VISA-JP-8821"
              className="flex-1 ios-glass-pill rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={() => {
                toast(`Tracking application ${trackingCode}... status live!`);
                setTrackedStatus("found");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-md shadow-orange-500/30 flex-shrink-0"
            >
              Track Dossier
            </button>
          </div>

          {trackedStatus === "found" && (
            <div className="p-5 bg-white/60 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{trackingCode} • Japan Tourist eVisa</div>
                  <div className="text-slate-400 text-[10px]">Applicant: Anney Rora • Target Date: Oct 2026</div>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                  Approved & Issued
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full rounded-full" />
              </div>

              <div className="grid grid-cols-4 text-center text-[10px] text-slate-400 font-medium">
                <span className="text-emerald-600 font-bold">1. Intake ✓</span>
                <span className="text-emerald-600 font-bold">2. Verified ✓</span>
                <span className="text-emerald-600 font-bold">3. Consular ✓</span>
                <span className="text-emerald-600 font-bold">4. Issued e-Pass ✓</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 16: VERIFIED TRAVELER SUCCESS STORIES
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
            Global Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Trusted by 50,000+ Explorers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Julian Thorne", role: "Digital Nomad", origin: "United Kingdom", visa: "Thailand DTV (5 Years)", text: "Securing 5 years of multiple entries to Thailand felt daunting with the 500k THB financial threshold. Foxico audited my bank statement, and the embassy approved it in 48 hours.", avatar: "JT" },
            { name: "Aria Montgomery", role: "Landscape Photographer", origin: "Canada", visa: "Japan Tourist eVisa", text: "Got my Japan eVisa on Wednesday, added it straight to my Apple Wallet, and landed at Haneda on Friday without carrying a single physical paper document.", avatar: "AM" },
            { name: "Carlos Del Toro", role: "Tech Founder", origin: "Spain", visa: "Dubai Virtual Work 1-Yr", text: "Foxico's concierge team coordinated my Emirates ID appointment and medical test in Dubai. Flawless white-glove service from start to finish.", avatar: "CD" }
          ].map((t, idx) => (
            <div key={idx} className="ios-glass-card rounded-3xl p-6 border border-white/80 dark:border-white/10 card-hover-ios flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white font-bold text-xs flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</h4>
                    <span className="text-[10px] text-slate-400">{t.role} • {t.origin}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, s) => <Star key={s} size={11} className="fill-current" />)}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic mb-4">
                  "{t.text}"
                </p>
              </div>
              <div className="text-[10px] font-bold text-orange-500 pt-3 border-t border-slate-200/50 dark:border-white/10">
                Verified Approval: {t.visa}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 17: CURATED VISA + DESTINATION TOUR COMBOS
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
          <div>
            <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
              Complete Travel Solutions
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Curated Experience & Visa Combos
            </h2>
          </div>
          <Link to="/destinations" className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
            <span>Browse all packages</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Kyoto Autumn & Zen Gardens", country: "Japan", price: "$1,120", days: "7 Days", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80&fit=crop", perk: "Complimentary eVisa Filing" },
            { title: "Bali Sacred Temples & Villas", country: "Indonesia", price: "$1,050", days: "8 Days", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&fit=crop", perk: "B1 VoA Included" },
            { title: "Parisian Light & Louvre Nights", country: "France", price: "$760", days: "4 Days", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80&fit=crop", perk: "Schengen Insurance Included" },
            { title: "Swiss Alps Glacier Rail Trip", country: "Switzerland", price: "$980", days: "7 Days", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&fit=crop", perk: "Alpine Rescue Covered" }
          ].map((tour, idx) => (
            <Link
              key={idx}
              to="/destinations"
              className="ios-glass-card rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 card-hover-ios flex flex-col justify-between group"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute top-3 left-3 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full ios-glass text-white border border-white/30">
                  {tour.country}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-black text-white px-2 py-1 rounded-lg bg-black/50 backdrop-blur-md">
                  {tour.price}
                </span>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">
                    {tour.title}
                  </h4>
                  <div className="text-[10px] text-slate-400 mb-3">{tour.days} • Full Concierge</div>
                </div>
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200/50 dark:border-white/10">
                  ★ {tour.perk}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 18: SENIOR CONSULAR SPECIALISTS & LEGAL TEAM
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
            Expert Advisory
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Meet Your Former Consular Officers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Claire Dupont", title: "Senior Consular Liaison", exp: "14 Years French & Schengen MOFA", spec: "Schengen Visas & European Border Code", flag: "🇫🇷" },
            { name: "Takeshi Mori", title: "Chief Japanese Visa Counsel", exp: "11 Years Tokyo Immigration Bureau", spec: "Japan Digital Nomad & eVisa Adjudication", flag: "🇯🇵" },
            { name: "Marcus Campbell", title: "UK & Commonwealth Director", exp: "16 Years Foreign & Commonwealth Office", spec: "UKVI Standard Visitor & Tiered Visas", flag: "🇬🇧" }
          ].map((officer, i) => (
            <div key={i} className="ios-glass-card rounded-3xl p-6 border border-white/80 dark:border-white/10 card-hover-ios text-center flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25">
                  {officer.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">{officer.name}</h4>
                  <span className="text-sm">{officer.flag}</span>
                </div>
                <div className="text-xs font-semibold text-orange-500 mb-2">{officer.title}</div>
                <div className="text-[11px] text-slate-400 mb-3">{officer.exp}</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Specialty: {officer.spec}
                </p>
              </div>
              <Link
                to="/contact"
                className="w-full text-center ios-glass-pill hover:bg-orange-500 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
              >
                Book 1-on-1 Consultation
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 19: SEARCHABLE VISA FAQ ACCORDION
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
            Answers & Clarity
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Visa Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            { q: "What happens if my visa application is delayed or rejected?", a: "Foxico includes 100% Pre-Screening Protection. If any document does not meet embassy standards, our team flags it immediately before submission. If rejected due to consular quota, your concierge fee is refunded in full." },
            { q: "Can I enter multiple countries on a single Schengen Visa?", a: "Yes! A Uniform Schengen Visa (Type C) grants unrestricted freedom of movement across all 29 member states without border checkpoints." },
            { q: "How do I store my approved eVisa on my iPhone or Apple Wallet?", a: "Once approved, simply tap 'Add to Apple Wallet' in your Traveler Dashboard. Your pass works completely offline at international airport boarding gates." },
            { q: "Do I need physical passport photos or digital scans?", a: "For 95% of our supported eVisas (including Japan, Bali, Thailand, India, UAE), our AI camera tool optimizes digital smartphone headshots to exact embassy biometric standards." },
            { q: "How far in advance should I submit my visa application?", a: "We recommend submitting 3 to 6 weeks before your departure date. If traveling on short notice, select our 24-Hour Super-Rush processing." }
          ].map((faq, idx) => (
            <div key={idx} className="ios-glass-card rounded-2xl border border-white/80 dark:border-white/10 overflow-hidden">
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${faqOpen === idx ? "rotate-180 text-orange-500" : ""}`} />
              </button>
              {faqOpen === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-white/10 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 20: APPLE WALLET PASS & BULLETIN + SECURITY ACCREDITATIONS
      ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="ios-glass-card rounded-3xl p-8 sm:p-12 border border-white/80 dark:border-white/10 bg-gradient-to-br from-white/90 via-white/70 to-orange-500/10 dark:from-slate-900/90 dark:to-orange-950/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone size={16} className="text-orange-500" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500">
                  Apple Wallet & Digital Pass Integration
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Carry Your World Visas On Your iPhone
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Never print boarding papers again. Every approved electronic visa from Foxico generates a certified PKPass token that syncs seamlessly to Apple Wallet, displaying live gate updates and consular barcode authentication.
              </p>

              {/* Newsletter form */}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email for weekly visa alerts..."
                  className="ios-glass-pill rounded-full px-5 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 flex-1"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-full text-xs shadow-md shadow-orange-500/25 flex-shrink-0"
                >
                  Get Visa Alerts
                </button>
              </form>
            </div>

            {/* Apple Wallet Mockup Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 ios-glass rounded-3xl p-5 border-2 border-white/90 dark:border-white/20 shadow-2xl relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 dark:border-white/10 mb-3">
                  <span className="text-xs font-black text-slate-900 dark:text-white">Foxico Pass</span>
                  <span className="text-xs">🇯🇵</span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Japan Ministry of Foreign Affairs</div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mb-2">Tourist eVisa (90D)</div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-300 mb-3">Holder: ANNEY RORA</div>
                <div className="w-full h-16 bg-slate-900 rounded-xl flex items-center justify-center text-white font-mono text-[10px] tracking-widest">
                  ||| | |||| | ||||| |||
                </div>
                <div className="text-center text-[9px] text-slate-400 mt-2">Scannable at Narita / Haneda e-Gates</div>
              </div>
            </div>
          </div>

          {/* Security Accreditations Badges */}
          <div className="pt-8 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-slate-500 dark:text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-emerald-500" />
              <span className="font-semibold">ISO 27001 Certified Data Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-blue-500" />
              <span className="font-semibold">Bank-Grade 256-Bit End-to-End TLS</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-orange-500" />
              <span className="font-semibold">Accredited Global Consular Liaison</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
