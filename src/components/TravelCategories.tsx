import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Waves, Mountain, Building2, TreePine, Ship, Camera } from "lucide-react";

const categories = [
  { icon: Waves, label: "Beaches", count: 48, color: "#3b82f6", bg: "from-blue-500/20 to-blue-600/5" },
  { icon: Mountain, label: "Mountains", count: 32, color: "#10b981", bg: "from-emerald-500/20 to-emerald-600/5" },
  { icon: Building2, label: "Cities", count: 75, color: "#f97316", bg: "from-orange-500/20 to-orange-600/5" },
  { icon: TreePine, label: "Jungles", count: 24, color: "#84cc16", bg: "from-lime-500/20 to-lime-600/5" },
  { icon: Ship, label: "Cruises", count: 16, color: "#8b5cf6", bg: "from-violet-500/20 to-violet-600/5" },
  { icon: Camera, label: "Cultural", count: 55, color: "#ec4899", bg: "from-pink-500/20 to-pink-600/5" },
];

export default function TravelCategories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 px-6 lg:px-10 bg-[#0a0f1a]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-orange-400 text-[10px] font-bold tracking-[0.3em] uppercase block mb-2">Browse By</span>
            <h2
              className="text-3xl lg:text-4xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Travel Categories
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ icon: Icon, label, count, color, bg }, i) => (
            <motion.button
              key={label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className={`group relative p-5 rounded-2xl bg-gradient-to-br ${bg} border border-white/8 hover:border-white/20 transition-all duration-300 flex flex-col items-center gap-3 cursor-pointer text-center`}
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{ backdropFilter: "blur(8px)" }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: color + "22", border: `1px solid ${color}33` }}
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Icon size={22} style={{ color }} />
              </motion.div>
              <div>
                <div className="text-white font-semibold text-sm mb-0.5">{label}</div>
                <div className="text-white/40 text-[11px]">{count} places</div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `0 0 30px ${color}15`, border: `1px solid ${color}25` }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
