import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Universal particle stage. Each effect is described by a config:
 * - emojis: list of emojis to use
 * - count: number of particles
 * - motion: how each particle moves
 * - palette: optional glow colors
 */

export type MotionPreset =
  | "float-up"
  | "rain"
  | "burst"
  | "bounce"
  | "swirl"
  | "orbit"
  | "spiral"
  | "firework"
  | "trail"
  | "wind-drift"
  | "grow-up"
  | "wave"
  | "pop"
  | "spin"
  | "portal"
  | "rainbow-arc"
  | "explosion-chain"
  | "reveal"
  | "galaxy"
  | "heart-shape"
  | "tornado"
  | "helix"
  | "zigzag"
  | "matrix"
  | "black-hole"
  | "shockwave"
  | "infinity"
  | "shooting-star"
  | "earthquake"
  | "soft-fade";

export interface ParticleConfig {
  emojis: string[];
  count: number;
  motion: MotionPreset;
  size?: [number, number]; // [min, max] in px
  duration?: [number, number];
  glow?: string; // CSS color
  opacity?: [number, number];
}

interface Props {
  config: ParticleConfig;
  speed: number;
  intensity: number;
  glowOn: boolean;
  seed: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function ParticleStage({ config, speed, intensity, glowOn, seed }: Props) {
  const particles = useMemo(() => {
    const count = Math.max(1, Math.round(config.count * intensity));
    const [sMin, sMax] = config.size ?? [28, 56];
    const [dMin, dMax] = config.duration ?? [2, 5];
    const [oMin, oMax] = config.opacity ?? [0.7, 1];
    return Array.from({ length: count }).map((_, i) => ({
      i,
      emoji: config.emojis[i % config.emojis.length],
      size: rand(sMin, sMax),
      duration: rand(dMin, dMax) / speed,
      delay: rand(0, 0.8),
      x: rand(0, 100),
      y: rand(0, 100),
      rotate: rand(-180, 180),
      opacity: rand(oMin, oMax),
      hue: rand(0, 360),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, speed, intensity, seed]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <ParticleItem
          key={p.i}
          p={p}
          preset={config.motion}
          glow={glowOn ? config.glow : undefined}
        />
      ))}
    </div>
  );
}

function ParticleItem({
  p,
  preset,
  glow,
}: {
  p: {
    i: number;
    emoji: string;
    size: number;
    duration: number;
    delay: number;
    x: number;
    y: number;
    rotate: number;
    opacity: number;
    hue: number;
  };
  preset: MotionPreset;
  glow?: string;
}) {
  const baseStyle: React.CSSProperties = {
    position: "absolute",
    fontSize: p.size,
    lineHeight: 1,
    filter: glow ? `drop-shadow(0 0 12px ${glow}) drop-shadow(0 0 24px ${glow})` : undefined,
    willChange: "transform, opacity",
    userSelect: "none",
  };

  const common = {
    style: baseStyle,
    children: p.emoji,
  };

  switch (preset) {
    case "float-up":
      return (
        <motion.div
          {...common}
          initial={{ left: `${p.x}%`, top: "100%", opacity: 0, rotate: 0 }}
          animate={{ top: "-10%", opacity: [0, p.opacity, p.opacity, 0], rotate: p.rotate / 4 }}
          transition={{ duration: p.duration * 1.6, delay: p.delay, ease: "easeOut" }}
        />
      );
    case "rain":
      return (
        <motion.div
          {...common}
          initial={{ left: `${p.x}%`, top: "-10%", opacity: 0, rotate: p.rotate / 6 }}
          animate={{ top: "110%", opacity: [0, p.opacity, p.opacity, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        />
      );
    case "burst": {
      const angle = (p.i / 24) * Math.PI * 2 + p.delay;
      const dist = 35 + (p.i % 5) * 6;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 1 }}
          animate={{
            x: `calc(-50% + ${tx}vmin)`,
            y: `calc(-50% + ${ty}vmin)`,
            scale: [0, 1.4, 1, 0.6],
            opacity: [1, 1, 0.6, 0],
            rotate: p.rotate,
          }}
          transition={{ duration: p.duration, delay: p.delay * 0.3, ease: "easeOut" }}
        />
      );
    }
    case "bounce": {
      const fromX = p.i % 2 === 0 ? -30 : 130;
      const fromY = p.i % 3 === 0 ? -20 : 120;
      return (
        <motion.div
          {...common}
          initial={{ left: `${fromX}%`, top: `${fromY}%`, opacity: 0, scale: 0.5 }}
          animate={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: [0, p.opacity, p.opacity, 0],
            scale: [0.5, 1.2, 1, 0.8],
            rotate: p.rotate,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: [0.34, 1.56, 0.64, 1] }}
        />
      );
    }
    case "swirl": {
      const angle = (p.i / 30) * Math.PI * 4;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
          animate={{
            x: [
              `-50%`,
              `calc(-50% + ${Math.cos(angle) * 40}vmin)`,
              `calc(-50% + ${Math.cos(angle + Math.PI) * 60}vmin)`,
            ],
            y: [
              `-50%`,
              `calc(-50% + ${Math.sin(angle) * 40}vmin)`,
              `calc(-50% + ${Math.sin(angle + Math.PI) * 60}vmin)`,
            ],
            opacity: [0, p.opacity, 0],
            rotate: 720,
            scale: [0, 1, 0.6],
          }}
          transition={{ duration: p.duration, delay: p.delay * 0.2, ease: "easeInOut" }}
        />
      );
    }
    case "orbit": {
      const angle = (p.i / 12) * Math.PI * 2;
      const radius = 25 + (p.i % 3) * 5;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0 }}
          animate={{
            x: [
              "-50%",
              `calc(-50% + ${Math.cos(angle) * radius}vmin)`,
              `calc(-50% + ${Math.cos(angle + Math.PI * 2) * radius}vmin)`,
              `calc(-50% + ${Math.cos(angle) * 80}vmin)`,
            ],
            y: [
              "-50%",
              `calc(-50% + ${Math.sin(angle) * radius}vmin)`,
              `calc(-50% + ${Math.sin(angle + Math.PI * 2) * radius}vmin)`,
              `calc(-50% + ${Math.sin(angle) * 80}vmin)`,
            ],
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: p.duration * 1.4, delay: p.delay * 0.1, ease: "easeInOut" }}
        />
      );
    }
    case "spiral": {
      const angle = (p.i / 20) * Math.PI * 2;
      const startR = 60;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{
            x: `calc(-50% + ${Math.cos(angle) * startR}vmin)`,
            y: `calc(-50% + ${Math.sin(angle) * startR}vmin)`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: ["", `calc(-50% + ${Math.cos(angle + Math.PI * 2) * 20}vmin)`, "-50%"],
            y: ["", `calc(-50% + ${Math.sin(angle + Math.PI * 2) * 20}vmin)`, "-50%"],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1.2, 0],
            rotate: 720,
          }}
          transition={{ duration: p.duration * 1.5, delay: p.delay * 0.15, ease: "easeIn" }}
        />
      );
    }
    case "firework": {
      const angle = (p.i / 18) * Math.PI * 2;
      const dist = 40 + (p.i % 4) * 8;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 1 }}
          animate={{
            x: ["-50%", "-50%", `calc(-50% + ${Math.cos(angle) * dist}vmin)`],
            y: ["-50%", "10vmin", `calc(-50% + ${Math.sin(angle) * dist}vmin)`],
            scale: [0.4, 1.2, 0],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, times: [0, 0.4, 1], ease: "easeOut" }}
        />
      );
    }
    case "trail":
      return (
        <motion.div
          {...common}
          initial={{ left: "-10%", top: `${p.y}%`, opacity: 0, scale: 0.6 }}
          animate={{
            left: "110%",
            opacity: [0, p.opacity, p.opacity * 0.5, 0],
            scale: [0.6, 1.2, 1, 0.6],
          }}
          transition={{ duration: p.duration, delay: p.delay * 0.3, ease: "easeInOut" }}
        />
      );
    case "wind-drift":
      return (
        <motion.div
          {...common}
          initial={{ left: "-10%", top: `${p.y}%`, opacity: 0, rotate: 0 }}
          animate={{
            left: "110%",
            top: [`${p.y}%`, `${p.y + 15}%`, `${p.y - 10}%`, `${p.y + 5}%`],
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: p.rotate * 2,
          }}
          transition={{ duration: p.duration * 1.4, delay: p.delay, ease: "easeInOut" }}
        />
      );
    case "grow-up":
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: `${p.x}%`, bottom: "-5%" }}
          initial={{ scale: 0, y: 0, opacity: 0 }}
          animate={{ scale: [0, 1.1, 1], y: [0, -100, -150], opacity: [0, 1, 0.9] }}
          transition={{ duration: p.duration * 1.2, delay: p.delay, ease: "easeOut" }}
        />
      );
    case "wave":
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: `${(p.i / 20) * 100}%`, top: "50%" }}
          initial={{ scale: 0, opacity: 0, y: "-50%" }}
          animate={{ scale: [0, 1.3, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: (p.i / 20) * 1.2, ease: "easeOut" }}
        />
      );
    case "pop":
      return (
        <motion.div
          {...common}
          initial={{ left: `${p.x}%`, top: `${p.y}%`, scale: 0, opacity: 0, rotate: 0 }}
          animate={{ scale: [0, 1.4, 1, 0], opacity: [0, 1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: [0.34, 1.56, 0.64, 1] }}
        />
      );
    case "spin":
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0, rotate: 0, opacity: 0 }}
          animate={{
            x: `calc(-50% + ${Math.cos((p.i / 15) * Math.PI * 2) * 30}vmin)`,
            y: `calc(-50% + ${Math.sin((p.i / 15) * Math.PI * 2) * 30}vmin)`,
            scale: [0, 1, 1, 0],
            rotate: 1080,
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: p.duration * 1.4, delay: p.delay * 0.2, ease: "linear" }}
        />
      );
    case "portal": {
      const angle = (p.i / 25) * Math.PI * 2;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
          animate={{
            x: [`-50%`, `calc(-50% + ${Math.cos(angle) * 50}vmin)`],
            y: [`-50%`, `calc(-50% + ${Math.sin(angle) * 50}vmin)`],
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            rotate: 540,
          }}
          transition={{ duration: p.duration * 1.6, delay: p.delay * 0.3, ease: "easeOut" }}
        />
      );
    }
    case "rainbow-arc": {
      const t = p.i / 30;
      const arcX = t * 100;
      const arcY = 60 - Math.sin(t * Math.PI) * 50;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: `${arcX}%`, top: `${arcY}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
          transition={{ duration: p.duration, delay: t * 1.2, ease: "easeOut" }}
        />
      );
    }
    case "explosion-chain": {
      const stage = Math.floor(p.i / 8);
      const angle = ((p.i % 8) / 8) * Math.PI * 2;
      const dist = 20 + stage * 15;
      const cx = 30 + stage * 15;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: `${cx}%`, top: "50%" }}
          initial={{ x: 0, y: "-50%", scale: 0, opacity: 0 }}
          animate={{
            x: `${Math.cos(angle) * dist}vmin`,
            y: `calc(-50% + ${Math.sin(angle) * dist}vmin)`,
            scale: [0, 1.4, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1.2 / 1, delay: stage * 0.4 + p.delay * 0.1, ease: "easeOut" }}
        />
      );
    }
    case "reveal":
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: [0, 1.4, 1.2, 1], opacity: [0, 1, 1, 1], rotate: 0 }}
          transition={{ duration: 1.2, delay: p.delay * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        />
      );
    case "galaxy": {
      const arm = p.i % 3;
      const t = (p.i / 30) * Math.PI * 4 + arm * ((Math.PI * 2) / 3);
      const r = 10 + (p.i % 10) * 5;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
          animate={{
            x: [
              `-50%`,
              `calc(-50% + ${Math.cos(t) * r}vmin)`,
              `calc(-50% + ${Math.cos(t + Math.PI) * (r + 20)}vmin)`,
            ],
            y: [
              `-50%`,
              `calc(-50% + ${Math.sin(t) * r}vmin)`,
              `calc(-50% + ${Math.sin(t + Math.PI) * (r + 20)}vmin)`,
            ],
            scale: [0, 1, 0.6],
            opacity: [0, 1, 0],
            rotate: 720,
          }}
          transition={{ duration: p.duration * 1.6, delay: p.delay * 0.2, ease: "easeInOut" }}
        />
      );
    }
    case "heart-shape": {
      const t = (p.i / 30) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
          animate={{
            x: `calc(-50% + ${hx * 1.6}vmin)`,
            y: `calc(-50% + ${hy * 1.6}vmin)`,
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: p.duration * 1.4, delay: p.delay * 0.3, ease: "easeOut" }}
        />
      );
    }
    case "tornado": {
      const t = (p.i / 30) * Math.PI * 6;
      const r = 8 + (p.i % 12) * 2.5;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "100%" }}
          initial={{ x: "-50%", y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: [
              `-50%`,
              `calc(-50% + ${Math.cos(t) * r}vmin)`,
              `calc(-50% + ${Math.cos(t + Math.PI * 2) * (r * 0.4)}vmin)`,
            ],
            y: [0, `-${30 + (p.i % 5) * 10}vmin`, `-${70 + (p.i % 5) * 8}vmin`],
            scale: [0, 1, 0.4],
            opacity: [0, p.opacity, 0],
            rotate: 1080,
          }}
          transition={{ duration: p.duration * 1.5, delay: p.delay * 0.2, ease: "easeOut" }}
        />
      );
    }
    case "helix": {
      const t = (p.i / 24) * Math.PI * 4;
      const side = p.i % 2 === 0 ? 1 : -1;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: `calc(-50% + 40vmin)`, opacity: 0, scale: 0 }}
          animate={{
            x: [
              `calc(-50% + ${side * 5}vmin)`,
              `calc(-50% + ${Math.cos(t) * 25 * side}vmin)`,
              `calc(-50% + ${Math.cos(t + Math.PI) * 25 * side}vmin)`,
            ],
            y: [`calc(-50% + 40vmin)`, `-50%`, `calc(-50% - 40vmin)`],
            opacity: [0, p.opacity, 0],
            scale: [0, 1.1, 0.6],
            rotate: 540,
          }}
          transition={{ duration: p.duration * 1.5, delay: p.delay * 0.15, ease: "easeInOut" }}
        />
      );
    }
    case "zigzag":
      return (
        <motion.div
          {...common}
          initial={{ left: `${p.x}%`, top: "-10%", opacity: 0 }}
          animate={{
            left: [`${p.x}%`, `${p.x + 12}%`, `${p.x - 12}%`, `${p.x + 8}%`, `${p.x}%`],
            top: "110%",
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: [0, 30, -30, 20, 0],
          }}
          transition={{ duration: p.duration * 1.2, delay: p.delay, ease: "easeIn" }}
        />
      );
    case "matrix": {
      const col = (p.i % 16) * (100 / 16);
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: `${col}%`, top: "-10%" }}
          initial={{ y: 0, opacity: 0, scale: 0.8 }}
          animate={{ y: "120vh", opacity: [0, 1, 1, 0.6, 0], scale: 1 }}
          transition={{
            duration: p.duration * 1.4,
            delay: (p.i % 16) * 0.08 + p.delay * 0.4,
            ease: "linear",
          }}
        />
      );
    }
    case "black-hole": {
      const angle = (p.i / 30) * Math.PI * 2;
      const r = 50;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{
            x: `calc(-50% + ${Math.cos(angle) * r}vmin)`,
            y: `calc(-50% + ${Math.sin(angle) * r}vmin)`,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: ["", `calc(-50% + ${Math.cos(angle + Math.PI * 4) * 5}vmin)`, "-50%"],
            y: ["", `calc(-50% + ${Math.sin(angle + Math.PI * 4) * 5}vmin)`, "-50%"],
            scale: [1, 0.6, 0],
            opacity: [1, 1, 0],
            rotate: 1080,
          }}
          transition={{ duration: p.duration * 1.4, delay: p.delay * 0.2, ease: "easeIn" }}
        />
      );
    }
    case "shockwave": {
      const angle = (p.i / 24) * Math.PI * 2;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0.4, opacity: 0 }}
          animate={{
            x: `calc(-50% + ${Math.cos(angle) * 70}vmin)`,
            y: `calc(-50% + ${Math.sin(angle) * 70}vmin)`,
            scale: [0.4, 1.6, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay * 0.05, ease: "easeOut" }}
        />
      );
    }
    case "infinity": {
      const t = (p.i / 30) * Math.PI * 2;
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const ix = (30 * Math.cos(t)) / denom;
      const iy = (30 * Math.sin(t) * Math.cos(t)) / denom;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
          animate={{
            x: `calc(-50% + ${ix}vmin)`,
            y: `calc(-50% + ${iy}vmin)`,
            scale: [0, 1.2, 1, 0],
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{ duration: p.duration * 1.6, delay: (p.i / 30) * 1.2, ease: "easeInOut" }}
        />
      );
    }
    case "shooting-star": {
      const startSide = p.i % 2;
      const fromX = startSide === 0 ? -10 : 110;
      const toX = startSide === 0 ? 110 : -10;
      return (
        <motion.div
          {...common}
          initial={{
            left: `${fromX}%`,
            top: `${p.y * 0.4}%`,
            opacity: 0,
            scale: 0.4,
            rotate: startSide === 0 ? 25 : -25,
          }}
          animate={{
            left: `${toX}%`,
            top: `${p.y * 0.4 + 50}%`,
            opacity: [0, 1, 1, 0],
            scale: [0.4, 1.3, 0.8],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        />
      );
    }
    case "earthquake":
      return (
        <motion.div
          {...common}
          initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0, scale: 0 }}
          animate={{
            left: [`${p.x}%`, `${p.x + 1}%`, `${p.x - 1}%`, `${p.x + 0.5}%`, `${p.x}%`],
            top: [`${p.y}%`, `${p.y - 1}%`, `${p.y + 1}%`, `${p.y}%`],
            opacity: [0, p.opacity, p.opacity, 0],
            scale: [0, 1.3, 1, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay * 0.2, ease: "easeInOut", repeat: 1 }}
        />
      );
    case "soft-fade": {
      // Calm centered fade, slight scale + drift. Single or few particles.
      const offsetX = ((p.i % 5) - 2) * 8;
      const offsetY = (((p.i * 13) % 5) - 2) * 6;
      return (
        <motion.div
          {...common}
          style={{ ...baseStyle, left: "50%", top: "50%" }}
          initial={{
            x: `calc(-50% + ${offsetX}vmin)`,
            y: `calc(-50% + ${offsetY + 4}vmin)`,
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            x: `calc(-50% + ${offsetX}vmin)`,
            y: `calc(-50% + ${offsetY - 4}vmin)`,
            scale: [0.8, 1, 1, 0.95],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay * 0.3, ease: "easeInOut" }}
        />
      );
    }
  }
}
