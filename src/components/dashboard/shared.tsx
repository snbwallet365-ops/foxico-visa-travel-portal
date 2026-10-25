import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, Home, Inbox, Sun, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FoxIcon } from "../Navbar";
import { useApp } from "../../context/AppContext";

/* ═════════ MENU ITEM TYPE ═════════ */
export interface MenuItem {
  key: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

/* ═════════ DASHBOARD SHELL ═════════ */
interface ShellProps {
  title: string;
  subtitle: string;
  menu: MenuItem[];
  active: string;
  onNavigate: (key: string) => void;
  accent?: string;
  children: ReactNode;
}

export function DashboardShell({ title, subtitle, menu, active, onNavigate, accent = "#f97316", children }: ShellProps) {
  const [drawer, setDrawer] = useState(false);
  const { currentUser, logout, toast, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast("Signed out. See you soon!", "info");
    navigate("/");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white/60 dark:bg-[#0a0f1a] backdrop-blur-2xl">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2.5 px-5 py-6 border-b border-slate-200/60 dark:border-white/8">
        <FoxIcon size={30} />
        <div>
          <span className="font-extrabold text-xl block leading-none text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Fox<span className="text-orange-500">ico</span>
          </span>
          <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase" style={{ color: accent }}>
            {title}
          </span>
        </div>
      </Link>

      {/* Menu */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-1 overflow-y-auto scrollbar-hide">
        {menu.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => { onNavigate(item.key); setDrawer(false); }}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 text-left ${
                isActive
                  ? "text-white shadow-md shadow-orange-500/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="dash-active"
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)`, boxShadow: `0 4px 16px ${accent}33` }}
                  transition={{ duration: 0.25 }}
                />
              )}
              <item.icon size={17} className="relative flex-shrink-0" style={{ color: isActive ? "#ffffff" : undefined }} />
              <span className="relative flex-1 truncate">{item.label}</span>
              {item.badge ? (
                <span
                  className="relative text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: isActive ? "rgba(255,255,255,0.25)" : accent + "20",
                    color: isActive ? "#ffffff" : accent,
                  }}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Bottom controls */}
      <div className="px-3 pb-5 flex flex-col gap-1 border-t border-slate-200/60 dark:border-white/8 pt-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-white/5 transition-all"
        >
          <span className="flex items-center gap-2.5">
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} className="text-amber-400" />}
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </span>
          <span className="text-[10px] font-mono opacity-60 uppercase">{theme}</span>
        </button>

        <Link
          to="/"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-white/5 transition-all"
        >
          <Home size={16} />
          <span>Back to Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-all text-left"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070b13] flex transition-colors duration-400">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[260px] flex-shrink-0 border-r border-slate-200/60 dark:border-white/8 sticky top-0 h-screen z-30">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[80] lg:hidden"
              onClick={() => setDrawer(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-0 bottom-0 w-[280px] z-[90] lg:hidden shadow-2xl"
            >
              <button
                onClick={() => setDrawer(false)}
                className="absolute top-5 right-4 w-8 h-8 rounded-full ios-glass-pill flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X size={15} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content body */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 ios-glass border-b border-slate-200/60 dark:border-white/8 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setDrawer(true)}
              className="lg:hidden w-10 h-10 rounded-2xl ios-glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 flex-shrink-0"
              aria-label="Open navigation"
            >
              <Menu size={18} />
            </button>
            <div className="min-w-0">
              <h1 className="text-slate-900 dark:text-white font-black text-lg sm:text-2xl truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                {subtitle}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs hidden sm:block">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden sm:block text-right">
                <div className="text-slate-900 dark:text-white text-xs font-bold">{currentUser.name}</div>
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: accent }}>
                  {currentUser.role === "superadmin" ? "Super Admin" : currentUser.role === "admin" ? "Consular Admin" : "Verified Traveler"}
                </div>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md"
                style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
              >
                {currentUser.name.charAt(0)}
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 px-4 sm:px-8 py-7 max-w-[1280px] w-full mx-auto pb-24 md:pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ═════════ STAT CARD ═════════ */
interface StatProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  deltaUp?: boolean;
  color: string;
  delay?: number;
}

export function StatCard({ icon: Icon, label, value, delta, deltaUp = true, color, delay = 0 }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="ios-glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 card-hover-ios"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: color + "1a", border: `1px solid ${color}30` }}
        >
          <Icon size={19} style={{ color }} />
        </div>
        {delta && (
          <span
            className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: (deltaUp ? "#10b981" : "#f43f5e") + "15",
              color: deltaUp ? "#059669" : "#e11d48",
            }}
          >
            {delta}
          </span>
        )}
      </div>
      <div className="text-slate-900 dark:text-white font-black text-2xl mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
        {value}
      </div>
      <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold">{label}</div>
    </motion.div>
  );
}

/* ═════════ MINI BAR CHART ═════════ */
export function MiniBarChart({ data, labels, color = "#f97316", height = 120 }: { data: number[]; labels?: string[]; color?: string; height?: number }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-2 sm:gap-3" style={{ height: height + 24 }}>
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
          <div className="relative w-full flex items-end justify-center" style={{ height }}>
            <motion.div
              className="w-full max-w-[38px] rounded-t-xl relative group/bar"
              style={{
                background: `linear-gradient(to top, ${color}33, ${color})`,
                boxShadow: `0 0 16px ${color}20`,
              }}
              initial={{ height: 0 }}
              animate={{ height: `${Math.max((v / max) * 100, 6)}%` }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                {v.toLocaleString()}
              </div>
            </motion.div>
          </div>
          {labels && <span className="text-slate-400 text-[10px] font-bold truncate w-full text-center">{labels[i]}</span>}
        </div>
      ))}
    </div>
  );
}

/* ═════════ DONUT CHART ═════════ */
export function Donut({ segments, size = 150, thickness = 14 }: { segments: { value: number; color: string; label: string }[]; size?: number; thickness?: number }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-6 flex-wrap">
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth={thickness} />
          {segments.map((seg, i) => {
            const pct = seg.value / total;
            const dash = pct * circ;
            const el = (
              <motion.circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={thickness}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circ - dash}`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                initial={{ strokeDashoffset: -offset }}
                animate={{ strokeDashoffset: -offset }}
                style={{ strokeDashoffset: -offset }}
              />
            );
            offset += dash;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-slate-900 dark:text-white font-black text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            {total.toLocaleString()}
          </span>
          <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Total</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-slate-600 dark:text-slate-300 text-xs font-semibold">{seg.label}</span>
            <span className="text-slate-900 dark:text-white font-bold text-xs ml-auto pl-3">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═════════ STATUS BADGE ═════════ */
export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    approved: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25",
    docs_review: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25",
    embassy_processing: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/25",
    action_required: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25",
    cancelled: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25",
    rejected: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25",
    active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    suspended: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25",
    hidden: "bg-slate-200 dark:bg-white/10 text-slate-500 border-slate-300 dark:border-white/15",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${styles[status] ?? styles.pending}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.replace(/_/g, " ")}
    </span>
  );
}

/* ═════════ SECTION CARD ═════════ */
export function SectionCard({ title, action, children, delay = 0 }: { title: string; action?: ReactNode; children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="ios-glass-card rounded-3xl p-6 border border-white/80 dark:border-white/10"
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <h3 className="text-slate-900 dark:text-white font-black text-base sm:text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </motion.div>
  );
}

/* ═════════ EMPTY STATE ═════════ */
export function EmptyState({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="text-center py-12 px-6">
      <Inbox size={36} className="text-slate-300 dark:text-white/20 mx-auto mb-3" />
      <div className="text-slate-800 dark:text-white font-bold text-base mb-1">{title}</div>
      <div className="text-slate-500 dark:text-slate-400 text-xs mb-5">{subtitle}</div>
      {action}
    </div>
  );
}
