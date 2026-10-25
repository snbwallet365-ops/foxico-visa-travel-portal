import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";

const trendingSpots = [
  {
    id: 1,
    title: "Santorini, Greece",
    category: "Islands",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80&fit=crop",
    tag: "Trending",
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "Machu Picchu, Peru",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80&fit=crop",
    tag: "Adventure",
    color: "#10b981",
  },
  {
    id: 3,
    title: "Kyoto, Japan",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80&fit=crop",
    tag: "Cultural",
    color: "#f97316",
  },
  {
    id: 4,
    title: "Maldives",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80&fit=crop",
    tag: "Luxury",
    color: "#8b5cf6",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export default function FeaturedSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 px-6 lg:px-10 bg-[#080d17] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-orange-500" />
              <span className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase">
                Trending Now
              </span>
            </div>
            <h2
              className="text-5xl lg:text-6xl font-black text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Popular
              <br />
              <span className="text-transparent bg-clip-text"
                style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}>
                Destinations
              </span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden sm:flex items-center gap-2 text-white/60 hover:text-orange-400 transition-colors duration-300 text-sm font-medium group"
          >
            View all destinations
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={16} className="group-hover:text-orange-400" />
            </motion.span>
          </motion.button>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {trendingSpots.map((spot) => (
            <motion.div
              key={spot.id}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ height: "320px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <motion.img
                src={spot.image}
                alt={spot.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${spot.id + 10}/400/320`;
                }}
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: spot.color + "cc", backdropFilter: "blur(8px)" }}
                >
                  {spot.tag}
                </span>
              </div>

              {/* Hover Explore Button */}
              <motion.div
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowRight size={15} className="text-white" />
              </motion.div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-white/50 text-[11px] font-semibold tracking-widest uppercase mb-1.5 block">
                  {spot.category}
                </span>
                <h3
                  className="text-white font-bold text-lg leading-tight group-hover:text-orange-100 transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {spot.title}
                </h3>

                {/* Animated underline */}
                <motion.div
                  className="mt-2 h-0.5 rounded-full"
                  style={{ backgroundColor: spot.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "40px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>

              {/* Border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1"
                style={{ boxShadow: `inset 0 0 0 1px ${spot.color}44` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter / CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 glass rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3
              className="text-3xl lg:text-4xl font-black text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to Explore the World?
            </h3>
            <p className="text-white/60 text-base">
              Get exclusive travel deals and hidden gem destinations delivered to your inbox.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 lg:w-64 bg-white/10 border border-white/15 rounded-full px-5 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-orange-500/60 transition-colors"
            />
            <motion.button
              className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-7 py-3 rounded-full text-sm transition-all duration-300 shadow-lg shadow-orange-500/30 flex-shrink-0"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
