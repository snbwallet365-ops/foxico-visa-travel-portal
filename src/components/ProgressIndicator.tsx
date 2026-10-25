import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export default function ProgressIndicator({ total, current, onSelect }: ProgressIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        const isPast = i < current;

        return (
          <motion.button
            key={i}
            onClick={() => onSelect(i)}
            className="relative flex flex-col items-center group"
            style={{ height: i < total - 1 ? "52px" : "24px" }}
          >
            {/* Dot */}
            <motion.div
              className="relative z-10 flex items-center justify-center rounded-full transition-all duration-300"
              animate={{
                width: isActive ? 28 : 22,
                height: isActive ? 28 : 22,
                backgroundColor: isActive
                  ? "#f97316"
                  : isPast
                  ? "rgba(249,115,22,0.4)"
                  : "rgba(255,255,255,0.12)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Pulse ring for active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-orange-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <span
                className={`text-[10px] font-bold transition-colors duration-300 ${
                  isActive ? "text-white" : isPast ? "text-orange-400" : "text-white/40"
                }`}
              >
                {i + 1}
              </span>
            </motion.div>

            {/* Connecting line */}
            {i < total - 1 && (
              <div className="relative w-0.5 flex-1 mt-1 overflow-hidden" style={{ height: "24px" }}>
                <div className="absolute inset-0 bg-white/10 rounded-full" />
                <motion.div
                  className="absolute top-0 left-0 right-0 rounded-full"
                  style={{
                    background: "linear-gradient(to bottom, #f97316, rgba(249,115,22,0.3))",
                  }}
                  animate={{
                    height: isPast ? "100%" : isActive ? "50%" : "0%",
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
