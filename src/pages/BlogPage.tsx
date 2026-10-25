import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PenLine, Search, Tag, ChevronRight, User as UserIcon, BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Japan's 6-Month Digital Nomad Visa: Realities & Application Walkthrough",
    excerpt: "Everything foreign remote professionals need to know about navigating the 10 million yen foreign income threshold, health insurance stipulations, and living between Tokyo and Kyoto.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80&fit=crop",
    author: "Claire Dupont",
    role: "Senior Consular Officer",
    date: "October 23, 2026",
    category: "Visa Guides",
    readTime: "7 min read",
    link: "/visa/japan",
    featured: true,
  },
  {
    id: 2,
    title: "How to Avoid Schengen Visa Denials: 5 Deadly Mistakes on Bank Statements",
    excerpt: "Consular officers scrutinize lump-sum unverified deposits and closing balances. Learn how to format your 90-day bank dossiers to guarantee approval.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80&fit=crop",
    author: "Victoria Chen",
    role: "Consular Director",
    date: "October 19, 2026",
    category: "Documentation",
    readTime: "5 min read",
    link: "/visa/france-schengen",
  },
  {
    id: 3,
    title: "Bali B211A vs Tourist e-VoA: Which Indonesian Permit is Right for Your Stay?",
    excerpt: "Comparing stay extensions, local Balinese sponsorship requirements, and electronic re-entry rules for long-term island visitors and surfers.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&fit=crop",
    author: "Takeshi Mori",
    role: "Immigration Counsel",
    date: "October 14, 2026",
    category: "Comparisons",
    readTime: "4 min read",
    link: "/visa/indonesia",
  },
  {
    id: 4,
    title: "10 Days in the Swiss Alps: Scenic Train Passes & Consular Altitude Rescue",
    excerpt: "From the Glacier Express to Zermatt's Matterhorn viewings, how to combine panoramic rail journeys with comprehensive alpine rescue policies.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&fit=crop",
    author: "Marcus Campbell",
    role: "Expedition Designer",
    date: "October 10, 2026",
    category: "Itineraries",
    readTime: "6 min read",
    link: "/destinations",
  },
  {
    id: 5,
    title: "Thailand DTV 500,000 THB Asset Proof: How We Verified Our Portfolio",
    excerpt: "A step-by-step breakdown of acceptable financial securities, mutual funds, and digital banking letters accepted by the Royal Thai Embassy.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80&fit=crop",
    author: "Liam Carter",
    role: "Remote Architect",
    date: "October 06, 2026",
    category: "Visa Guides",
    readTime: "5 min read",
    link: "/visa/thailand",
  },
  {
    id: 6,
    title: "Dubai Without Bureaucracy: Emirates ID, Medical Test & Stamping in 72h",
    excerpt: "How our VIP airport-to-residency service expedites biometric fingerprinting and health fitness screening in the UAE.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop",
    author: "Priya Sharma",
    role: "Gulf Operations Lead",
    date: "October 01, 2026",
    category: "Relocation",
    readTime: "8 min read",
    link: "/visa/uae-dubai",
  }
];

const categories = ["All", "Visa Guides", "Documentation", "Comparisons", "Itineraries", "Relocation"];

export default function BlogPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchCat = selectedCat === "All" || p.category === selectedCat;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCat, search]);

  const featured = filtered[0] || blogPosts[0];
  const listItems = filtered.slice(1);

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
            <BookOpen size={14} /> Travel Journal & Expert Field Notes
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Foxico <span className="text-orange-500">Expedition Journal</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl">
            In-depth visa walkthroughs, packing architectures, and insider advice written by former consular attachés and seasoned international travelers.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                  selectedCat === c
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles & guides..."
              className="w-full ios-glass-pill pl-9 pr-4 py-2 text-xs rounded-full text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>
        </div>

        {/* Featured Journal */}
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
              <span className="absolute top-4 left-4 ios-glass text-white text-[9px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/40">
                {featured.category}
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
                  <span>{featured.date}</span>
                  <span>•</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {featured.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-white/10 text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{featured.author}</span>
                  <span className="text-[10px] text-slate-400">{featured.role}</span>
                </div>
                <span className="text-orange-500 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listItems.map((p) => (
            <Link
              key={p.id}
              to={p.link}
              className="ios-glass-card rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 card-hover-ios flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 ios-glass text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-white/40">
                  {p.category}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2">
                    <span>{p.date}</span>
                    <span>•</span>
                    <span>{p.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {p.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-white/10 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{p.author}</span>
                  <span className="font-bold text-orange-500">Read article →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
