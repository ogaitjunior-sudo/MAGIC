import { motion } from "framer-motion";

/** Static visual elements that overlay the particle stage for special effects */

export function GiantReveal({ emoji, color }: { emoji: string; color: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: [0, 1.6, 1.2], rotate: 0, opacity: [0, 1, 1] }}
        transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          fontSize: "30vmin",
          filter: `drop-shadow(0 0 60px ${color}) drop-shadow(0 0 120px ${color})`,
        }}
      >
        {emoji}
      </motion.div>
    </div>
  );
}

export function PulseRing({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ border: `3px solid ${color}`, boxShadow: `0 0 40px ${color}` }}
          initial={{ width: 50, height: 50, opacity: 0.8 }}
          animate={{ width: 600, height: 600, opacity: 0 }}
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function RainbowArc() {
  const bands = [
    { c: "#ff5e5e", r: 38 },
    { c: "#ffa94d", r: 36 },
    { c: "#ffe066", r: 34 },
    { c: "#69db7c", r: 32 },
    { c: "#4dabf7", r: 30 },
    { c: "#9775fa", r: 28 },
    { c: "#e599f7", r: 26 },
  ];
  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
      <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
        {bands.map((b, i) => (
          <motion.path
            key={i}
            d={`M ${50 - b.r} 60 A ${b.r} ${b.r} 0 0 1 ${50 + b.r} 60`}
            fill="none"
            stroke={b.c}
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.6, delay: i * 0.08, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${b.c})` }}
          />
        ))}
      </svg>
    </div>
  );
}

export function PortalRing({ color1, color2 }: { color1: string; color2: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "40vmin",
          height: "40vmin",
          background: `conic-gradient(from 0deg, ${color1}, ${color2}, ${color1})`,
          filter: "blur(8px)",
          opacity: 0.7,
        }}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: [0, 1.2, 1], rotate: 360 }}
        transition={{
          duration: 2,
          ease: "easeOut",
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "30vmin",
          height: "30vmin",
          background: `radial-gradient(circle, transparent 30%, ${color1} 70%)`,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
    </div>
  );
}

export function GlowOrb({ color, size = "20vmin" }: { color: string; size?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          filter: "blur(8px)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1.2], opacity: [0, 1, 0.7] }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
    </div>
  );
}

export function LightningFlash({ color = "#fff8c4" }: { color?: string }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background: `radial-gradient(circle at 50% 40%, ${color}, transparent 60%)` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.9, 0, 0.6, 0, 0.4, 0] }}
      transition={{ duration: 1.4, times: [0, 0.05, 0.15, 0.25, 0.4, 0.55, 1], ease: "easeOut" }}
    />
  );
}

export function StarField({ count = 60 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const x = (i * 37.5) % 100;
        const y = (i * 53.7) % 100;
        const size = 1 + (i % 3);
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              background: "white",
              boxShadow: "0 0 6px white",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1, 0], scale: [0, 1.4, 1] }}
            transition={{
              duration: 2 + (i % 5) * 0.3,
              delay: (i % 10) * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

export function HeartBeat({ color = "#ff5d8f" }: { color?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        style={{
          fontSize: "28vmin",
          filter: `drop-shadow(0 0 40px ${color}) drop-shadow(0 0 80px ${color})`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1, 1.15, 1, 1.15, 1], opacity: [0, 1, 1, 1, 1, 1, 0.9] }}
        transition={{ duration: 2.2, ease: "easeOut", times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] }}
      >
        ❤️
      </motion.div>
    </div>
  );
}
