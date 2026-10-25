import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, ChevronRight, Newspaper, Search, ShieldCheck, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "Japan MOFA Expands Electronic eVisa Network to 24 New Nations Ahead of 2027 Expo",
    excerpt: "In a landmark diplomatic circular, Japan's Ministry of Foreign Affairs confirmed expanded electronic visa issuance. Eligible travelers can now apply 100% online with 48-hour turnarounds.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80&fit=crop",
    category: "Visa & Entry",
    date: "October 24, 2026",
    read: "4 min read",
    country: "Japan",
    link: "/visa/japan",
    featured: true,
  },
  {
    id: 2,
    title: "Thailand Destination Visa (DTV) Crosses 100,000 Issuances for Digital Nomads",
    excerpt: "The Royal Thai Government's 5-year multiple-entry visa for remote workers and cultural enthusiasts has set an international benchmark for flexible residency.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80&fit=crop",
    category: "Remote Work",
    date: "October 22, 2026",
    read: "3 min read",
    country: "Thailand",
    link: "/visa/thailand",
  },
  {
    id: 3,
    title: "European Union Finalizes EES Biometric Border Launch Protocols for Schengen",
    excerpt: "The 29 Schengen member states confirm streamlined automated biometric border kiosks, enabling instantaneous digital fingerprint and facial authentication at all major air hubs.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80&fit=crop",
    category: "Border Security",
    date: "October 20, 2026",
    read: "5 min read",
    country: "France",
    link: "/visa/france-schengen",
  },
  {
    id: 4,
    title: "Bali Introduces 60-Day Digital e-VoA Extension Without Physical Immigration Visits",
    excerpt: "Indonesia's Directorate General of Immigration removes the mandatory physical fingerprint visit for second-month extensions. Everything can now be done via digital portal.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&fit=crop",
    category: "Visa & Entry",
    date: "October 18, 2026",
    read: "3 min read",
    country: "Indonesia",
    link: "/visa/indonesia",
  },
  {
    id: 5,
    title: "UK Electronic Travel Authorisation (ETA) Now Universal for Non-Visa Travelers",
    excerpt: "All travelers previously eligible for visa-free entry to the United Kingdom now secure their £10 digital ETA via smartphone app prior to boarding.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80&fit=crop",
    category: "Policy Update",
    date: "October 15, 2026",
    read: "4 min read",
    country: "United Kingdom",
    link: "/visa/united-kingdom",
  },
  {
    id: 6,
    title: "United Arab Emirates Unveils 10-Year Blue Residency for Environmental & Tech Innovators",
    excerpt: "Dubai expands long-term residency options for international founders and engineers focused on marine conservation, renewable energy, and circular economics.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop",
    category: "Residency",
    date: "October 12, 2026",
    read: "6 min read",
    country: "UAE",
    link: "/visa/uae-dubai",
  },
  {
    id: 7,
    title: "Swiss Alpine Rail Network Integrates Real-Time Consular Health Insurance Passes",
    excerpt: "The Swiss Federal Railways now syncs directly with international consular travel insurance registries, giving foreign passengers immediate mountain rescue dispatch.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&fit=crop",
    category: "Travel Tech",
    date: "October 08, 2026",
    read: "4 min read",
    country: "Switzerland",
    link: "/visa/france-schengen",
  },
  {
    id: 8,
    title: "Peru Implements Timed Digital Permits to Protect Inca Trail Cloud Forest",
    excerpt: "Machu Picchu hikers can now verify environmental trek permits and Andean mountain rescue clearance through unified electronic QR codes.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80&fit=crop",
    category: "Sustainability",
    date: "October 05, 2026",
    read: "5 min read",
    country: "Peru",
    link: "/visa/japan",
  }
];

const categories = ["All", "Visa & Entry", "Remote Work", "Border Security", "Policy Update", "Residency"];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featured = filteredNews[0] || newsItems[0];
  const listItems = filteredNews.slice(1);

  return (
    <div className="min-h-screen pt-28 pb-28 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-orange-500 text-[10px] font-extrabold tracking-[0.3em] uppercase flex items-center gap-1.5 mb-2">
            <Newspaper size={14} /> Consular Intelligence & Dispatch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Global Visa & <span className="text-orange-500">Border Policy News</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl">
            Live updates on diplomatic agreements, e-Visa rollouts, biometric border e-Gates, and consular entry rules across 120+ territories.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                  selectedCategory === c
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25"
                    : "ios-glass-pill text-slate-600 dark:text-slate-300 hover:text-orange-500"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full ios-glass-pill pl-9 pr-4 py-2 text-xs rounded-full text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>
        </div>

        {/* Featured Article */}
        {featured && (
          <Link
            to={featured.link}
            className="ios-glass-card rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 card-hover-ios mb-10 grid grid-cols-1 lg:grid-cols-12 gap-0 group block"
          >
            <div className="lg:col-span-7 relative h-72 sm:h-96 overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 ios-glass text-white text-[9px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/40">
                {featured.category}
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
                  <span>{featured.date}</span>
                  <span>•</span>
                  <span>{featured.read}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {featured.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-white/10 text-xs">
                <span className="text-orange-500 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Dispatch <ChevronRight size={14} />
                </span>
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  Target: {featured.country}
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listItems.map((n) => (
            <Link
              key={n.id}
              to={n.link}
              className="ios-glass-card rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 card-hover-ios flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={n.image}
                  alt={n.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 ios-glass text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-white/40">
                  {n.category}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2">
                    <span>{n.date}</span>
                    <span>•</span>
                    <span>{n.read}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {n.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-white/10 text-xs">
                  <span className="font-bold text-orange-500">Read details →</span>
                  <span className="text-[10px] text-slate-400">{n.country}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
