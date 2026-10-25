import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Star, Clock, Heart, ArrowRight, X, Calendar,
  Users, ChevronDown, Plane, ShieldCheck, Globe
} from "lucide-react";
import { useApp, Destination } from "../context/AppContext";
import { VISA_COUNTRIES } from "../data/visaCountries";

const categories = ["All", "Beach", "Island", "Mountain", "City", "Culture", "Nature"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function DestinationsPage() {
  const navigate = useNavigate();
  const { destinations, currentUser, isFavorite, toggleFavorite, createBooking } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [bookingDest, setBookingDest] = useState<Destination | null>(null);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);

  const filtered = useMemo(() => {
    let list = destinations.filter((d) => d.status === "active");
    if (category !== "All") list = list.filter((d) => d.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-low": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-high": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [destinations, search, category, sort]);

  const handleFavorite = (id: string) => {
    if (!currentUser) {
      navigate("/auth", { state: { from: "/destinations" } });
      return;
    }
    toggleFavorite(id);
  };

  const openBooking = (d: Destination) => {
    if (!currentUser) {
      navigate("/auth", { state: { from: "/destinations" } });
      return;
    }
    setBookingDest(d);
    setDate(new Date().toISOString().slice(0, 10));
    setGuests(2);
  };

  const confirmBooking = () => {
    if (!bookingDest) return;
    const b = createBooking(bookingDest.id, date, guests);
    if (b) {
      setBookingDest(null);
      navigate("/dashboard/user");
    }
  };

  // Helper to map country to visa slug
  const getVisaSlugForCountry = (countryName: string) => {
    const match = VISA_COUNTRIES.find((c) =>
      countryName.toLowerCase().includes(c.name.toLowerCase()) ||
      c.name.toLowerCase().includes(countryName.toLowerCase())
    );
    return match ? match.slug : "japan";
  };

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
          <span className="text-orange-500 text-[10px] font-extrabold tracking-[0.3em] uppercase block mb-2">
            Curated Global Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            All <span className="text-orange-500">Destinations & Expeditions</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl">
            Boutique travel itineraries paired with certified electronic visa processing across {destinations.length}+ world wonders.
          </p>
        </motion.div>

        {/* Search & Sort Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6"
        >
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination, city, or country..."
              className="w-full ios-glass-pill pl-10 pr-4 py-3 text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none ios-glass-pill pl-5 pr-10 py-3 text-slate-700 dark:text-slate-200 text-xs sm:text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer font-semibold"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-2 flex-wrap mb-10 scrollbar-hide overflow-x-auto pb-1"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                category === c
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                  : "ios-glass-pill text-slate-600 dark:text-slate-300 hover:text-orange-500"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 ios-glass-card rounded-3xl p-8 max-w-md mx-auto">
            <Plane size={36} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <div className="text-slate-800 dark:text-white font-bold text-base mb-1">No destinations found</div>
            <div className="text-slate-400 text-xs">Try adjusting your search query or category filter.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((d, i) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.3) }}
                className="ios-glass-card rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 card-hover-ios flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {d.featured && (
                    <span className="absolute top-3 left-3 ios-glass text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full border border-white/40">
                      Featured
                    </span>
                  )}
                  
                  <motion.button
                    onClick={() => handleFavorite(d.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full ios-glass flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    aria-label="Favorite"
                  >
                    <Heart
                      size={14}
                      className={isFavorite(d.id) ? "text-rose-500 fill-rose-500" : "text-white/80"}
                    />
                  </motion.button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-bold">
                      <MapPin size={11} className="text-orange-400" /> {d.country}
                    </span>
                    <span className="font-mono text-[11px] opacity-90">{d.duration}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-snug mb-1.5 group-hover:text-orange-500 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {d.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                      {d.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-200/50 dark:border-white/10">
                    {/* Visa link button */}
                    <Link
                      to={`/visa/${getVisaSlugForCountry(d.country)}`}
                      className="flex items-center justify-between p-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-[11px] font-bold transition-colors"
                    >
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={13} /> {d.country} Visa Guide
                      </span>
                      <ArrowRight size={12} />
                    </Link>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-900 dark:text-white font-black text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                          ${d.price.toLocaleString()}
                        </span>
                        <span className="text-slate-400 text-[11px]"> /person</span>
                      </div>
                      <motion.button
                        onClick={() => openBooking(d)}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-orange-500/25"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Trip
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ═══ BOOKING MODAL ═══ */}
      <AnimatePresence>
        {bookingDest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setBookingDest(null)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="ios-glass-card w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-white/10 mb-5">
                <div>
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block">
                    Instant Reservation
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Book {bookingDest.name}
                  </h3>
                </div>
                <button
                  onClick={() => setBookingDest(null)}
                  className="w-8 h-8 rounded-full ios-glass-pill flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Select Travel Departure Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full ios-glass-pill rounded-2xl px-4 py-2.5 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Number of Travelers</label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuests(num)}
                        className={`w-10 h-10 rounded-2xl font-bold transition-all ${
                          guests === num
                            ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                            : "ios-glass-pill text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white/60 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-white/10 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Price per traveler:</span>
                    <span className="font-bold text-slate-800 dark:text-white">${bookingDest.price} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Travelers:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{guests} guest(s)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200/50 dark:border-white/10 text-sm font-black text-slate-900 dark:text-white">
                    <span>Total Amount:</span>
                    <span className="text-orange-500">${(bookingDest.price * guests).toLocaleString()} USD</span>
                  </div>
                </div>

                <button
                  onClick={confirmBooking}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 text-white font-extrabold py-3.5 rounded-2xl text-xs shadow-lg shadow-orange-500/25"
                >
                  Confirm Reservation & Track
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
