import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Send, Rss, PlayCircle, MapPin, Mail, Phone, ShieldCheck, Award } from "lucide-react";
import { FoxIcon } from "./Navbar";
import { VISA_COUNTRIES } from "../data/visaCountries";

const socials = [
  { icon: Globe, label: "Website" },
  { icon: Send, label: "Telegram" },
  { icon: Rss, label: "RSS Feed" },
  { icon: PlayCircle, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="ios-glass border-t border-slate-200/60 dark:border-white/10 mt-16 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <FoxIcon size={30} />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Fox<span className="text-orange-500">ico</span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-orange-500 -mt-1">
                  Global Visa & Travel Concierge
                </span>
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              Accredited international visa processing and boutique expedition agency. Connecting global travelers with hassle-free electronic entry permits across 120+ countries.
            </p>
            <div className="space-y-2 mb-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-orange-500" />
                <span>1 Consular Square, Central Embassy District, London & Tokyo</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-orange-500" />
                <span>consular@foxico.travel</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-orange-500" />
                <span>+1 (800) 369-4261 (24/7 Priority Consular Line)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Official Consular Partner • ISO 27001 Data Security
              </span>
            </div>
          </div>

          {/* Country Visa Hub Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              Country Visa Hub
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              {VISA_COUNTRIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/visa/${c.slug}`}
                    className="hover:text-orange-500 transition-colors flex items-center gap-1.5"
                  >
                    <span>{c.flag}</span>
                    <span>{c.name} Visa</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              Explore & Travel
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/destinations" className="hover:text-orange-500 transition-colors">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-orange-500 transition-colors">
                  Border Policy Radar
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-orange-500 transition-colors">
                  Traveler Journals
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500 transition-colors">
                  Consular Consultations
                </Link>
              </li>
              <li>
                <Link to="/dashboard/user" className="hover:text-orange-500 transition-colors">
                  Document Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Portals */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              Consular Consoles
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/dashboard/user" className="hover:text-orange-500 transition-colors">
                  Traveler Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/admin" className="hover:text-orange-500 transition-colors">
                  Consular Review Desk
                </Link>
              </li>
              <li>
                <Link to="/dashboard/super" className="hover:text-orange-500 transition-colors">
                  Super Admin Governance
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-orange-500 transition-colors">
                  Account Sign In / Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} Foxico Global Visa & Travel Ltd. All international rights reserved.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-orange-500 cursor-pointer">Privacy & GDPR</span>
            <span>•</span>
            <span className="hover:text-orange-500 cursor-pointer">Terms of Consular Filing</span>
            <span>•</span>
            <span className="hover:text-orange-500 cursor-pointer">Security Certifications</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
