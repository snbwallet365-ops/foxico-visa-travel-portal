import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Star, Clock, DollarSign, Wind } from "lucide-react";
import { destinations } from "../data/destinations";
import ProgressIndicator from "./ProgressIndicator";
import SideCard from "./SideCard";

const SLIDE_DURATION = 6000;

const textSlide = {
  enter: { opacity: 0, y: 50, filter: "blur(10px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -30, filter: "blur(6px)" },
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const goTo = useCallback((index: number) => {
    setCurrent((index + destinations.length) % destinations.length);
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1 + destinations.length), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => next(), SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, isPaused, next]);

  useEffect(() => {
    setProgress(0);
    if (isPaused) return;
    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - startTime) / SLIDE_DURATION) * 100, 100));
    }, 40);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current, isPaused]);

  const dest = destinations[current];

  return (
    <section
      className="relative w-full overflow-hidden h-[85svh] sm:h-[92svh] min-h-[580px] max-h-[820px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ══════════ BACKGROUND IMAGES ══════════ */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        >
          {/* Ken-Burns zoom on image */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          >
            <img
              src={dest.heroImage}
              alt={dest.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://picsum.photos/seed/${dest.id}/1920/1080`;
              }}
            />
          </motion.div>

          {/* Layered Overlays */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 38% 55%, transparent 25%, rgba(0,0,0,0.45) 100%)"
          }} />
        </motion.div>
      </AnimatePresence>

      {/* ══════════ ANIMATED PARTICLES / DUST ══════════ */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              left: `${15 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ══════════ PROGRESS INDICATOR (LEFT) ══════════ */}
      <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 hidden sm:flex">
        <ProgressIndicator
          total={destinations.length}
          current={current}
          onSelect={goTo}
        />
      </div>

      {/* ══════════ MAIN LAYOUT ══════════ */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pl-4 sm:pl-24 lg:pl-28">
          <div className="flex items-center justify-between gap-6 xl:gap-12">

            {/* ─── LEFT: Hero Text ─── */}
            <div className="flex-1 min-w-0 max-w-[640px]">

              {/* Breadcrumb / Region tag */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`region-${current}`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.45 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <Wind size={14} className="text-orange-400" />
                  <div className="h-px w-8 bg-orange-500/60" />
                  <span className="text-orange-400 text-[11px] font-semibold tracking-[0.3em] uppercase">
                    {dest.country}
                  </span>
                  <div className="h-px w-4 bg-white/20" />
                  <span className="text-white/40 text-[11px] tracking-widest">
                    {String(current + 1).padStart(2, "0")} / {String(destinations.length).padStart(2, "0")}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* ── TITLE ── */}
              <div className="relative overflow-visible mb-2">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`title-${current}`}
                    variants={textSlide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="font-black leading-[0.95] tracking-tight select-none break-words"
                    style={{
                      fontSize: "clamp(2.5rem, 7.5vw, 7.5rem)",
                      fontFamily: "'Playfair Display', serif",
                      background: "linear-gradient(145deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "none",
                    }}
                  >
                    {dest.name}
                  </motion.h1>
                </AnimatePresence>

                {/* Accent underline bar */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`underline-${current}`}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="origin-left h-1 rounded-full mt-3 mb-5"
                    style={{
                      background: `linear-gradient(90deg, ${dest.accentColor}, transparent)`,
                      width: "min(280px, 65%)",
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* ── STATS ROW ── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`stats-${current}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="flex items-center flex-wrap gap-4 mb-6"
                >
                  <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-bold">{dest.rating}</span>
                    <span className="text-white/40 text-xs">rating</span>
                  </div>
                  <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
                    <Clock size={12} className="text-blue-400" />
                    <span className="text-white/80 text-xs">{dest.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
                    <DollarSign size={12} className="text-green-400" />
                    <span className="text-white/80 text-xs">From {dest.price}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ── DESCRIPTION ── */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${current}`}
                  variants={textSlide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-white/70 text-[15px] leading-[1.75] mb-10 max-w-[480px]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {dest.description}
                </motion.p>
              </AnimatePresence>

              {/* ── CTA BUTTONS ── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cta-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="flex items-center gap-4 flex-wrap"
                >
                  <motion.button
                    onClick={() => navigate("/destinations")}
                    className="group relative flex items-center gap-3 overflow-hidden text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-2xl"
                    style={{
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      boxShadow: "0 8px 32px rgba(37,99,235,0.4)",
                    }}
                    whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(37,99,235,0.55)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                      initial={{ x: "-150%" }}
                      animate={{ x: "150%" }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                    />
                    <span className="relative">Explore</span>
                    <motion.div
                      className="relative w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight size={13} />
                    </motion.div>
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => {
                      const cName = dest.country.toLowerCase();
                      const slug = cName.includes("indo") ? "indonesia" : cName.includes("japan") ? "japan" : cName.includes("greece") || cName.includes("swiss") ? "france-schengen" : "japan";
                      navigate(`/visa/${slug}`);
                    }}
                    className="ios-glass-pill text-white hover:text-orange-400 font-bold px-6 py-4 rounded-full text-sm transition-all duration-300 flex items-center gap-2 border border-white/40 shadow-xl"
                  >
                    <span>{dest.country} Visa Guide</span>
                    <ArrowRight size={14} className="text-orange-400" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ─── RIGHT: Side Cards Panel ─── */}
            <div className="hidden lg:flex flex-col gap-3 w-[270px] xl:w-[295px] flex-shrink-0 mt-4">

              {/* Panel Header */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`ph-${current}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-between px-1 mb-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span className="text-white/50 text-[10px] font-bold tracking-[0.25em] uppercase">
                      Top Spots
                    </span>
                  </div>
                  <button className="text-orange-400/80 hover:text-orange-400 text-[10px] font-semibold tracking-wider uppercase transition-colors">
                    See All →
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cards-${current}`}
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {dest.sideCards.map((card, i) => (
                    <SideCard key={card.id} card={card} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Mini thumbnail strip of other destinations */}
              <motion.div
                className="flex items-center gap-2 mt-3 px-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-white/30 text-[9px] tracking-widest uppercase font-semibold mr-1">More</span>
                {destinations.filter((_, i) => i !== current).map((d) => (
                  <motion.button
                    key={d.id}
                    onClick={() => goTo(d.id - 1)}
                    className="relative w-9 h-9 rounded-lg overflow-hidden ring-1 ring-white/10 hover:ring-orange-500/50 transition-all duration-300 flex-shrink-0"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={d.heroImage}
                      alt={d.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors duration-300" />
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ BOTTOM BAR ══════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Progress line */}
        <motion.div
          className="h-px bg-orange-500/70"
          style={{ width: `${progress}%`, originX: 0 }}
          transition={{ duration: 0 }}
        />

        <div className="px-6 lg:px-10 pb-7 pt-4 pl-16 sm:pl-24 lg:pl-28">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">

            {/* Dot Pagination */}
            <div className="flex items-center gap-2.5">
              {destinations.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative flex items-center"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{
                      width: i === current ? 36 : 8,
                      height: i === current ? 6 : 6,
                      borderRadius: i === current ? "3px" : "50%",
                      backgroundColor: i === current
                        ? "#f97316"
                        : i < current
                        ? "rgba(249,115,22,0.35)"
                        : "rgba(255,255,255,0.25)",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  {/* Fill animation on active */}
                  {i === current && (
                    <motion.div
                      className="absolute top-0 left-0 h-[6px] rounded-sm bg-white/40"
                      style={{ width: `${(progress / 100) * 36}px` }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={prev}
                className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  boxShadow: "0 4px 20px rgba(249,115,22,0.4)",
                }}
                whileHover={{ scale: 1.1, boxShadow: "0 6px 28px rgba(249,115,22,0.55)" }}
                whileTap={{ scale: 0.94 }}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ PAUSE BADGE ══════════ */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            className="absolute top-24 right-8 z-30 glass-dark px-3.5 py-2 rounded-full text-white/60 text-[11px] font-medium flex items-center gap-2"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-orange-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            Auto-play paused
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════ DECORATIVE SIDE GRADIENT ══════════ */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
