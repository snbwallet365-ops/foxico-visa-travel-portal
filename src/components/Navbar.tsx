import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Menu, X, LayoutDashboard, LogOut, ChevronDown, User as UserIcon,
  Globe, ShieldCheck, Sun, Moon, Compass, Sparkles, FileText
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { VISA_COUNTRIES } from "../data/visaCountries";

export const FoxIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="18" rx="10" ry="9" fill="#f97316" />
    <polygon points="6,18 2,6 10,14" fill="#f97316" />
    <polygon points="26,18 30,6 22,14" fill="#f97316" />
    <polygon points="6,18 2,6 9,16" fill="#ea6a00" />
    <polygon points="26,18 30,6 23,16" fill="#ea6a00" />
    <ellipse cx="16" cy="21" rx="6" ry="5" fill="#fff5e6" />
    <circle cx="12" cy="17" r="2.2" fill="#1a0a00" />
    <circle cx="20" cy="17" r="2.2" fill="#1a0a00" />
    <circle cx="12.7" cy="16.3" r="0.7" fill="white" />
    <circle cx="20.7" cy="16.3" r="0.7" fill="white" />
    <circle cx="16" cy="13.5" r="1.5" fill="#1a0a00" />
  </svg>
);

export function dashboardPath(role?: string) {
  if (role === "superadmin") return "/dashboard/super";
  if (role === "admin") return "/dashboard/admin";
  return "/dashboard/user";
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visaDropdownOpen, setVisaDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, toast, theme, toggleTheme, visaApplications } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const visaDropdownRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setVisaDropdownOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (visaDropdownRef.current && !visaDropdownRef.current.contains(e.target as Node)) {
        setVisaDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    toast("Signed out. Have a safe journey!", "info");
    navigate("/");
  };

  const pendingVisas = visaApplications.filter(
    (a) => a.userId === currentUser?.id && a.status !== "approved" && a.status !== "rejected"
  ).length;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled || !isHome || menuOpen
          ? "ios-glass border-b border-white/60 dark:border-white/10 shadow-lg shadow-black/5"
          : "bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl border-b border-white/60 dark:border-white/10 shadow-sm"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-md group-hover:bg-orange-500/40 transition-all duration-300" />
            <FoxIcon />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Fox<span className="text-orange-500">ico</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-orange-500 -mt-1">
              Global Visa & Travel
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7">
          <Link
            to="/"
            className={`text-sm font-semibold tracking-tight transition-colors ${
              location.pathname === "/"
                ? "text-orange-500 font-bold"
                : "text-slate-700 dark:text-slate-200 hover:text-orange-500"
            }`}
          >
            Home
          </Link>

          {/* Country Visa Hub Dropdown */}
          <div className="relative" ref={visaDropdownRef}>
            <button
              onClick={() => setVisaDropdownOpen(!visaDropdownOpen)}
              className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-colors py-2"
            >
              <Globe size={15} className="text-orange-500" />
              <span>Country Visa Hub</span>
              <ChevronDown size={13} className={`transition-transform duration-300 ${visaDropdownOpen ? "rotate-180 text-orange-500" : ""}`} />
            </button>

            <AnimatePresence>
              {visaDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 w-[420px] ios-glass-card rounded-3xl p-4 shadow-2xl border border-white/80 dark:border-white/10 z-50"
                >
                  <div className="px-3 py-2 border-b border-slate-200/50 dark:border-white/10 flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Popular Visa Destinations
                    </span>
                    <span className="text-[10px] font-bold text-orange-500">Fast-Track eVisas</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 max-h-[340px] overflow-y-auto scrollbar-hide pr-1">
                    {VISA_COUNTRIES.map((country) => (
                      <Link
                        key={country.id}
                        to={`/visa/${country.slug}`}
                        onClick={() => setVisaDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-2xl hover:bg-orange-500/10 dark:hover:bg-white/10 transition-all group"
                      >
                        <span className="text-xl flex-shrink-0">{country.flag}</span>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors truncate">
                            {country.name}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {country.averageProcessingTime} • ${country.startingPrice}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/destinations"
            className={`text-sm font-semibold tracking-tight transition-colors ${
              location.pathname === "/destinations"
                ? "text-orange-500 font-bold"
                : "text-slate-700 dark:text-slate-200 hover:text-orange-500"
            }`}
          >
            All Destinations
          </Link>

          <Link
            to="/news"
            className={`text-sm font-semibold tracking-tight transition-colors ${
              location.pathname === "/news"
                ? "text-orange-500 font-bold"
                : "text-slate-700 dark:text-slate-200 hover:text-orange-500"
            }`}
          >
            News & Alerts
          </Link>

          <Link
            to="/blog"
            className={`text-sm font-semibold tracking-tight transition-colors ${
              location.pathname === "/blog"
                ? "text-orange-500 font-bold"
                : "text-slate-700 dark:text-slate-200 hover:text-orange-500"
            }`}
          >
            Travel Journal
          </Link>

          <Link
            to="/contact"
            className={`text-sm font-semibold tracking-tight transition-colors ${
              location.pathname === "/contact"
                ? "text-orange-500 font-bold"
                : "text-slate-700 dark:text-slate-200 hover:text-orange-500"
            }`}
          >
            Contact & Consular
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-10 h-10 rounded-full ios-glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-colors"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} className="text-amber-400" />}
          </motion.button>

          {/* Quick Search */}
          <div className="relative hidden sm:flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search countries, visas..."
                  className="ios-glass-pill rounded-full px-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 mr-2"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate(`/destinations?q=${encodeURIComponent(searchQuery)}`);
                      setSearchOpen(false);
                    }
                  }}
                />
              )}
            </AnimatePresence>
            <motion.button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-full ios-glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Search"
            >
              <Search size={16} />
            </motion.button>
          </div>

          {/* User Profile or Sign In */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 ios-glass px-3.5 py-2 rounded-full hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-orange-500/30">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                    {currentUser.name.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-orange-500 font-semibold tracking-wider uppercase">
                    {currentUser.role === "superadmin" ? "Super Admin" : currentUser.role === "admin" ? "Consular Admin" : "Traveler"}
                  </span>
                </div>
                {pendingVisas > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
                <ChevronDown size={13} className={`text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 ios-glass-card rounded-3xl p-3 shadow-2xl border border-white/80 dark:border-white/10 z-50"
                  >
                    <div className="p-3 border-b border-slate-200/50 dark:border-white/10">
                      <div className="text-slate-900 dark:text-white font-bold text-sm">{currentUser.name}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-xs truncate">{currentUser.email}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-orange-500/15 text-orange-500 border border-orange-500/30 px-2 py-0.5 rounded-full">
                          {currentUser.role}
                        </span>
                        {currentUser.country && (
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            📍 {currentUser.country}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="py-2 flex flex-col gap-1">
                      <Link
                        to={dashboardPath(currentUser.role)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-orange-500/10 hover:text-orange-500 text-xs font-semibold transition-all"
                      >
                        <LayoutDashboard size={15} className="text-orange-500" />
                        <span>Command Dashboard</span>
                      </Link>

                      <Link
                        to="/dashboard/user"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-orange-500/10 hover:text-orange-500 text-xs font-semibold transition-all"
                      >
                        <ShieldCheck size={15} className="text-emerald-500" />
                        <span>My Visa Applications</span>
                        {pendingVisas > 0 && (
                          <span className="ml-auto text-[9px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded-full">
                            {pendingVisas} active
                          </span>
                        )}
                      </Link>

                      {currentUser.role === "superadmin" && (
                        <Link
                          to="/dashboard/super"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-orange-500/10 hover:text-orange-500 text-xs font-semibold transition-all"
                        >
                          <Sparkles size={15} className="text-purple-500" />
                          <span>Super Admin Console</span>
                        </Link>
                      )}

                      {(currentUser.role === "admin" || currentUser.role === "superadmin") && (
                        <Link
                          to="/dashboard/admin"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-orange-500/10 hover:text-orange-500 text-xs font-semibold transition-all"
                        >
                          <FileText size={15} className="text-blue-500" />
                          <span>Consular Dossier Review</span>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-2xl text-rose-500 hover:bg-rose-500/10 text-xs font-semibold transition-all text-left mt-1 pt-2 border-t border-slate-200/50 dark:border-white/10"
                      >
                        <LogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/auth">
              <motion.span
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-5 py-2.5 rounded-full text-xs shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Sign In
              </motion.span>
            </Link>
          )}

          {/* Mobile menu hamburger */}
          <button
            className="lg:hidden w-10 h-10 rounded-full ios-glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden ios-glass border-t border-white/60 dark:border-white/10 overflow-hidden"
          >
            <div className="px-5 py-6 flex flex-col gap-2 max-h-[75vh] overflow-y-auto">
              <Link to="/" className="text-base font-bold py-2.5 px-3 rounded-2xl text-slate-800 dark:text-white hover:bg-orange-500/10">
                Home
              </Link>

              {/* Country Visa List on Mobile */}
              <div className="py-2 px-3 bg-white/50 dark:bg-black/20 rounded-2xl border border-white/60 dark:border-white/10">
                <div className="text-[11px] font-bold text-orange-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Globe size={13} /> Country Visa Details
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {VISA_COUNTRIES.slice(0, 6).map((c) => (
                    <Link
                      key={c.id}
                      to={`/visa/${c.slug}`}
                      className="text-xs font-semibold text-slate-700 dark:text-slate-200 py-1 flex items-center gap-1.5 hover:text-orange-500"
                    >
                      <span>{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/destinations" className="text-base font-bold py-2.5 px-3 rounded-2xl text-slate-800 dark:text-white hover:bg-orange-500/10">
                All Destinations
              </Link>
              <Link to="/news" className="text-base font-bold py-2.5 px-3 rounded-2xl text-slate-800 dark:text-white hover:bg-orange-500/10">
                News & Border Updates
              </Link>
              <Link to="/blog" className="text-base font-bold py-2.5 px-3 rounded-2xl text-slate-800 dark:text-white hover:bg-orange-500/10">
                Travel Journal
              </Link>
              <Link to="/contact" className="text-base font-bold py-2.5 px-3 rounded-2xl text-slate-800 dark:text-white hover:bg-orange-500/10">
                Contact & Consulates
              </Link>

              <div className="pt-3 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Theme Mode</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 ios-glass-pill px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  {theme === "light" ? <><Moon size={14} /> Dark</> : <><Sun size={14} className="text-amber-400" /> Light</>}
                </button>
              </div>

              {currentUser ? (
                <div className="pt-3 border-t border-slate-200/50 dark:border-white/10 flex flex-col gap-2">
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    Signed in as {currentUser.name}
                  </div>
                  <Link
                    to={dashboardPath(currentUser.role)}
                    className="w-full text-center bg-orange-500 text-white font-bold py-3 rounded-2xl text-xs shadow-md"
                  >
                    Open Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-rose-500 font-semibold py-2 text-xs"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-2xl text-xs shadow-md mt-2"
                >
                  Sign In / Create Account
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
