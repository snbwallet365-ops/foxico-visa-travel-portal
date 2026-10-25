import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User as UserIcon, Eye, EyeOff, Plane, ShieldCheck, Crown, Compass, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { dashboardPath, FoxIcon } from "../components/Navbar";

type Mode = "login" | "register";

const demoAccounts = [
  { label: "Traveler Demo", email: "anney@foxico.com", password: "demo123", icon: Compass, color: "#3b82f6", desc: "Japan eVisa, Vault & Trips" },
  { label: "Consular Admin", email: "admin@foxico.com", password: "admin123", icon: ShieldCheck, color: "#10b981", desc: "Visa Review & Adjudication" },
  { label: "Super Admin", email: "super@foxico.com", password: "super123", icon: Crown, color: "#f97316", desc: "Platform RBAC & Rules" },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, settings, toast } = useApp();
  const from = (location.state as { from?: string } | null)?.from;

  const [mode, setMode] = useState<Mode>("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (form.name.trim().length < 3) return setError("Please enter your full legal name.");
      if (form.password.length < 6) return setError("Password must be at least 6 characters.");
      if (form.password !== form.confirm) return setError("Passwords do not match.");
    }

    setLoading(true);
    setTimeout(() => {
      const result =
        mode === "login"
          ? login(form.email, form.password)
          : register(form.name, form.email, form.password);
      setLoading(false);
      if (!result.ok || !result.user) {
        setError(result.error ?? "Something went wrong.");
        return;
      }
      toast(mode === "login" ? "Welcome back, traveler!" : "Account created — welcome aboard!");
      navigate(from ?? dashboardPath(result.user.role), { replace: true });
    }, 600);
  };

  const quickLogin = (email: string, password: string) => {
    setMode("login");
    setForm({ name: "", email, password, confirm: "" });
    setError("");
    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.ok && res.user) {
        toast("Signed in with demo role!");
        navigate(from ?? dashboardPath(res.user.role), { replace: true });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen pt-28 pb-28 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <FoxIcon size={34} />
            <span className="font-extrabold text-2xl text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Fox<span className="text-orange-500">ico</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {mode === "login" ? "Sign in to Consular Hub" : "Create Traveler Dossier"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === "login" ? "Access your eVisas, Document Vault, and trip bookings." : "Register to track visa applications and receive border alerts."}
          </p>
        </div>

        {/* 1-Click Quick Demo Switchers */}
        <div className="ios-glass-card rounded-3xl p-4 border border-white/80 dark:border-white/10 mb-5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2 text-center">
            Instant 1-Click Demo Logins
          </span>
          <div className="grid grid-cols-3 gap-2">
            {demoAccounts.map((d) => (
              <button
                key={d.label}
                type="button"
                onClick={() => quickLogin(d.email, d.password)}
                className="p-2.5 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/10 hover:border-orange-500/50 transition-all text-center flex flex-col items-center group"
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${d.color}20`, color: d.color }}
                >
                  <d.icon size={14} />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-white block leading-tight truncate w-full">
                  {d.label.split(" ")[0]}
                </span>
                <span className="text-[8px] text-slate-400 truncate w-full">
                  {d.label.split(" ")[1] || "Role"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Auth Form Card */}
        <div className="ios-glass-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 shadow-2xl">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-900/60 rounded-2xl mb-5 text-xs font-bold">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`py-2 rounded-xl transition-all ${mode === "login" ? "bg-white dark:bg-slate-800 text-orange-500 shadow-sm" : "text-slate-500"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className={`py-2 rounded-xl transition-all ${mode === "register" ? "bg-white dark:bg-slate-800 text-orange-500 shadow-sm" : "text-slate-500"}`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-600 dark:text-rose-400 text-xs font-semibold mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {mode === "register" && (
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Legal Name</label>
                <div className="relative">
                  <UserIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Anney Rora"
                    className="w-full ios-glass-pill pl-9 pr-4 py-2.5 rounded-2xl text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="anney@foxico.com"
                  className="w-full ios-glass-pill pl-9 pr-4 py-2.5 rounded-2xl text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full ios-glass-pill pl-9 pr-10 py-2.5 rounded-2xl text-slate-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    placeholder="••••••••"
                    className="w-full ios-glass-pill pl-9 pr-4 py-2.5 rounded-2xl text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 text-white font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/25 transition-all mt-4"
            >
              <span>{loading ? "Processing..." : mode === "login" ? "Sign In to Dashboard" : "Create Account"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
