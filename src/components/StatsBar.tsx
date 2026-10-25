import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Users, Award, Compass } from "lucide-react";

const stats = [
  { icon: Globe, value: "120+", label: "Destinations", color: "#f97316" },
  { icon: Users, value: "50K+", label: "Happy Travelers", color: "#3b82f6" },
  { icon: Award, value: "98%", label: "Satisfaction Rate", color: "#10b981" },
  { icon: Compass, value: "12+", label: "Years Experience", color: "#8b5cf6" },
];

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative z-10 -mt-16 mx-6 lg:mx-10 xl:mx-auto xl:max-w-5xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass-dark rounded-2xl px-6 py-5 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {stats.map(({ icon: Icon, value, label, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-center gap-3.5 px-5 py-2 group cursor-default"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: color + "20", border: `1px solid ${color}30` }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <div className="text-white font-black text-xl leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {value}
              </div>
              <div className="text-white/45 text-xs font-medium mt-0.5">{label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
