import { motion } from "framer-motion";
import { Bookmark, MapPin } from "lucide-react";
import { SideCard as SideCardType } from "../data/destinations";

interface SideCardProps {
  card: SideCardType;
  index: number;
}

export default function SideCard({ card, index }: SideCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.9 }}
      transition={{
        duration: 0.55,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group cursor-pointer rounded-xl overflow-hidden flex-shrink-0"
      style={{ height: "118px" }}
    >
      {/* Background Image with hover zoom */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <motion.img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://picsum.photos/seed/${card.id.replace(/\W/g, "")}/400/200`;
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 group-hover:from-black/90 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Tag */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <span className="text-[9px] font-bold tracking-[0.15em] uppercase bg-orange-500/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
          {card.tag}
        </span>
      </div>

      {/* Bookmark button */}
      <motion.button
        className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-orange-400 transition-colors duration-300"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Bookmark size={11} />
      </motion.button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5 z-10">
        <h3 className="text-white font-bold text-[13px] leading-snug mb-0.5 group-hover:text-orange-100 transition-colors duration-300 line-clamp-1">
          {card.title}
        </h3>
        <div className="flex items-center gap-1">
          <MapPin size={9} className="text-orange-400 flex-shrink-0" />
          <span className="text-white/55 text-[10px] font-medium truncate">{card.subtitle}</span>
        </div>
      </div>

      {/* Hover ring */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-orange-500/30 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}
