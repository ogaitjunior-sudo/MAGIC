import { ParticleStage, type ParticleConfig } from "./ParticleStage";
import {
  GiantReveal,
  PulseRing,
  RainbowArc,
  PortalRing,
  GlowOrb,
  LightningFlash,
  StarField,
  HeartBeat,
} from "./StageOverlays";

const GOLD = "#ffd700";
const EMERALD = "#3ddc84";
const VIOLET = "#c77dff";
const ROSE = "#ff85a1";
const BLUE = "#74c0fc";
const SUNSHINE = "#ffe066";

const THUMB = ["👍"];
const THUMB_MIX = ["👍", "💙", "✨"];
const CONFETTI = ["🎉", "🎊", "✨", "⭐", "👍"];
const CLOVER = ["🍀", "☘️"];
const COIN = ["🪙", "💰"];
const LEPRECHAUN_MIX = ["🍀", "🪙", "✨", "⭐", "🌈"];
const FLOWERS = ["🌸", "🌺", "🌷", "🌹", "🌻", "🌼", "💐"];
const PETALS = ["🌸", "🌺", "🌷", "💮"];
const ROSE_EMOJIS = ["🌹", "🌷", "💐"];
const DAISIES = ["🌼", "🌻", "💮"];
const SPARKLES = ["✨", "⭐", "💫"];
const MIX_ALL = ["👍", "🍀", "🌸", "🪙", "🌹", "✨", "🌈", "🎉"];

type EffectRenderer = (props: {
  speed: number;
  intensity: number;
  glowOn: boolean;
  seed: number;
}) => React.ReactNode;

function stage(config: ParticleConfig): EffectRenderer {
  return ({ speed, intensity, glowOn, seed }) => (
    <ParticleStage
      config={config}
      speed={speed}
      intensity={intensity}
      glowOn={glowOn}
      seed={seed}
    />
  );
}

function combo(...renderers: EffectRenderer[]): EffectRenderer {
  return (props) => (
    <>
      {renderers.map((r, i) => (
        <div key={i} className="absolute inset-0">
          {r(props)}
        </div>
      ))}
    </>
  );
}

export const EFFECT_RENDERERS: Record<string, EffectRenderer> = {
  // ---------------- THUMBS UP ----------------
  "floating-thumbs": stage({
    emojis: THUMB,
    count: 24,
    motion: "float-up",
    glow: BLUE,
    size: [36, 64],
    duration: [3, 5],
  }),
  "thumbs-burst": stage({
    emojis: THUMB,
    count: 28,
    motion: "burst",
    glow: BLUE,
    size: [28, 52],
    duration: [1.4, 2.2],
  }),
  "bounce-thumbs": stage({
    emojis: THUMB,
    count: 22,
    motion: "bounce",
    glow: BLUE,
    size: [40, 64],
    duration: [1.4, 2.4],
  }),
  "like-rain": stage({
    emojis: THUMB,
    count: 50,
    motion: "rain",
    glow: BLUE,
    size: [24, 44],
    duration: [2, 4],
  }),
  "like-storm": stage({
    emojis: THUMB,
    count: 90,
    motion: "swirl",
    glow: VIOLET,
    size: [22, 40],
    duration: [2, 3.5],
  }),
  "giant-thumbs": (props) => (
    <>
      <GlowOrb color={BLUE} size="40vmin" />
      <GiantReveal emoji="👍" color={BLUE} />
      {stage({
        emojis: SPARKLES,
        count: 30,
        motion: "burst",
        glow: SUNSHINE,
        size: [20, 36],
        duration: [1.5, 2.5],
      })(props)}
    </>
  ),
  "thumbs-pulse": (props) => (
    <>
      <PulseRing color={BLUE} />
      <GiantReveal emoji="👍" color={BLUE} />
      {stage({
        emojis: SPARKLES,
        count: 16,
        motion: "pop",
        glow: BLUE,
        size: [20, 32],
        duration: [1.4, 2],
      })(props)}
    </>
  ),
  "thumb-trail": stage({
    emojis: THUMB,
    count: 18,
    motion: "trail",
    glow: VIOLET,
    size: [32, 56],
    duration: [2, 3.2],
  }),
  "thumbs-orbit": stage({
    emojis: THUMB,
    count: 14,
    motion: "orbit",
    glow: BLUE,
    size: [32, 50],
    duration: [2.4, 3.2],
  }),
  "thumbs-spiral": stage({
    emojis: THUMB,
    count: 24,
    motion: "spiral",
    glow: VIOLET,
    size: [28, 48],
    duration: [2, 3],
  }),
  "confetti-pop": (props) => (
    <>
      <GiantReveal emoji="👍" color={BLUE} />
      {stage({
        emojis: CONFETTI,
        count: 40,
        motion: "burst",
        glow: SUNSHINE,
        size: [20, 40],
        duration: [1.4, 2.4],
      })(props)}
    </>
  ),
  "firework-likes": stage({
    emojis: THUMB,
    count: 32,
    motion: "firework",
    glow: SUNSHINE,
    size: [22, 40],
    duration: [1.8, 2.6],
  }),
  "soft-like-float": stage({
    emojis: THUMB_MIX,
    count: 16,
    motion: "float-up",
    glow: VIOLET,
    size: [40, 70],
    duration: [4, 7],
    opacity: [0.5, 0.85],
  }),
  "thumbs-chain": stage({
    emojis: THUMB,
    count: 32,
    motion: "explosion-chain",
    glow: BLUE,
    size: [24, 44],
    duration: [1.4, 2],
  }),
  "ultimate-thumbs": (props) => (
    <>
      <PulseRing color={BLUE} />
      <GlowOrb color={VIOLET} size="50vmin" />
      <GiantReveal emoji="👍" color={BLUE} />
      {stage({
        emojis: THUMB,
        count: 30,
        motion: "burst",
        glow: BLUE,
        size: [24, 44],
        duration: [1.6, 2.4],
      })(props)}
      {stage({
        emojis: CONFETTI,
        count: 40,
        motion: "firework",
        glow: SUNSHINE,
        size: [20, 36],
        duration: [2, 3],
      })(props)}
      {stage({
        emojis: SPARKLES,
        count: 30,
        motion: "float-up",
        glow: VIOLET,
        size: [18, 32],
        duration: [3, 5],
      })(props)}
    </>
  ),

  // ---------------- LEPRECHAUN ----------------
  "magic-glow": (props) => (
    <>
      <GlowOrb color={EMERALD} size="50vmin" />
      {stage({
        emojis: LEPRECHAUN_MIX,
        count: 30,
        motion: "burst",
        glow: EMERALD,
        size: [24, 44],
        duration: [1.6, 2.4],
      })(props)}
    </>
  ),
  "clover-swirl": stage({
    emojis: CLOVER,
    count: 30,
    motion: "swirl",
    glow: EMERALD,
    size: [28, 48],
    duration: [2.2, 3.4],
  }),
  "pot-of-gold": (props) => (
    <>
      <GlowOrb color={GOLD} size="35vmin" />
      <GiantReveal emoji="🪙" color={GOLD} />
      {stage({
        emojis: COIN,
        count: 30,
        motion: "firework",
        glow: GOLD,
        size: [24, 44],
        duration: [2, 2.8],
      })(props)}
    </>
  ),
  "rainbow-entrance": (props) => (
    <>
      <RainbowArc />
      {stage({
        emojis: SPARKLES,
        count: 28,
        motion: "rainbow-arc",
        glow: GOLD,
        size: [22, 38],
        duration: [1.6, 2.4],
      })(props)}
    </>
  ),
  "lucky-coin-burst": stage({
    emojis: COIN,
    count: 36,
    motion: "burst",
    glow: GOLD,
    size: [28, 48],
    duration: [1.6, 2.4],
  }),
  "spark-field": stage({
    emojis: ["✨", "⭐", "🍀", "🪙"],
    count: 60,
    motion: "pop",
    glow: EMERALD,
    size: [18, 32],
    duration: [1.6, 2.6],
  }),
  "shamrock-rain": stage({
    emojis: CLOVER,
    count: 50,
    motion: "rain",
    glow: EMERALD,
    size: [22, 40],
    duration: [2.4, 4],
  }),
  "leprechaun-portal": (props) => (
    <>
      <PortalRing color1={EMERALD} color2={GOLD} />
      {stage({
        emojis: LEPRECHAUN_MIX,
        count: 36,
        motion: "portal",
        glow: EMERALD,
        size: [22, 40],
        duration: [2, 3],
      })(props)}
    </>
  ),
  "gold-rush": stage({
    emojis: COIN,
    count: 70,
    motion: "rain",
    glow: GOLD,
    size: [24, 44],
    duration: [1.6, 3],
  }),
  "lucky-pulse": (props) => (
    <>
      <PulseRing color={EMERALD} />
      <GiantReveal emoji="🍀" color={EMERALD} />
    </>
  ),
  "rainbow-spiral": stage({
    emojis: ["🌈", "✨", "⭐", "💫"],
    count: 30,
    motion: "spiral",
    glow: GOLD,
    size: [22, 38],
    duration: [2.2, 3.2],
  }),
  "green-fire": (props) => (
    <>
      <GlowOrb color={EMERALD} size="60vmin" />
      {stage({
        emojis: ["🔥", "✨", "🍀"],
        count: 36,
        motion: "float-up",
        glow: EMERALD,
        size: [28, 50],
        duration: [2, 3.5],
      })(props)}
    </>
  ),
  "hat-pop": (props) => (
    <>
      <GiantReveal emoji="🎩" color={EMERALD} />
      {stage({
        emojis: ["🍀", "🪙", "✨"],
        count: 40,
        motion: "firework",
        glow: GOLD,
        size: [22, 40],
        duration: [1.8, 2.6],
      })(props)}
    </>
  ),
  "lucky-star": stage({
    emojis: ["⭐", "🍀", "✨", "🪙"],
    count: 40,
    motion: "burst",
    glow: GOLD,
    size: [26, 46],
    duration: [1.6, 2.4],
  }),
  "ultimate-leprechaun": (props) => (
    <>
      <RainbowArc />
      <PortalRing color1={EMERALD} color2={GOLD} />
      {stage({
        emojis: COIN,
        count: 36,
        motion: "firework",
        glow: GOLD,
        size: [22, 40],
        duration: [1.8, 2.6],
      })(props)}
      {stage({
        emojis: CLOVER,
        count: 30,
        motion: "rain",
        glow: EMERALD,
        size: [22, 40],
        duration: [2.4, 4],
      })(props)}
      {stage({
        emojis: SPARKLES,
        count: 30,
        motion: "swirl",
        glow: SUNSHINE,
        size: [18, 32],
        duration: [2.2, 3],
      })(props)}
    </>
  ),

  // ---------------- FLOWERS ----------------
  "bloom-in": stage({
    emojis: FLOWERS,
    count: 18,
    motion: "pop",
    glow: ROSE,
    size: [36, 60],
    duration: [1.6, 2.6],
  }),
  "petal-wind": stage({
    emojis: PETALS,
    count: 36,
    motion: "wind-drift",
    glow: ROSE,
    size: [20, 36],
    duration: [4, 7],
  }),
  "flower-burst": stage({
    emojis: PETALS,
    count: 36,
    motion: "burst",
    glow: ROSE,
    size: [22, 44],
    duration: [1.6, 2.4],
  }),
  "floral-spiral": stage({
    emojis: FLOWERS,
    count: 24,
    motion: "spiral",
    glow: ROSE,
    size: [26, 46],
    duration: [2, 3],
  }),
  "growing-garden": stage({
    emojis: FLOWERS,
    count: 22,
    motion: "grow-up",
    glow: EMERALD,
    size: [40, 70],
    duration: [2.2, 3.2],
  }),
  "floating-blossoms": stage({
    emojis: PETALS,
    count: 26,
    motion: "float-up",
    glow: ROSE,
    size: [28, 50],
    duration: [3.5, 6],
  }),
  "petal-rain": stage({
    emojis: PETALS,
    count: 60,
    motion: "rain",
    glow: ROSE,
    size: [18, 36],
    duration: [2.4, 4],
  }),
  "flower-orbit": stage({
    emojis: FLOWERS,
    count: 14,
    motion: "orbit",
    glow: ROSE,
    size: [30, 50],
    duration: [2.6, 3.6],
  }),
  "bloom-wave": stage({
    emojis: FLOWERS,
    count: 20,
    motion: "wave",
    glow: SUNSHINE,
    size: [30, 50],
    duration: [2, 2.8],
  }),
  "floral-glow": (props) => (
    <>
      <PulseRing color={ROSE} />
      {stage({
        emojis: FLOWERS,
        count: 16,
        motion: "pop",
        glow: ROSE,
        size: [36, 56],
        duration: [2, 3],
      })(props)}
    </>
  ),
  "rose-explosion": (props) => (
    <>
      <GiantReveal emoji="🌹" color={ROSE} />
      {stage({
        emojis: ROSE_EMOJIS,
        count: 36,
        motion: "burst",
        glow: ROSE,
        size: [22, 42],
        duration: [1.6, 2.6],
      })(props)}
    </>
  ),
  "daisy-pop": stage({
    emojis: DAISIES,
    count: 24,
    motion: "pop",
    glow: SUNSHINE,
    size: [32, 54],
    duration: [1.4, 2.4],
  }),
  "garden-sparkle": (props) => (
    <>
      {stage({
        emojis: FLOWERS,
        count: 18,
        motion: "pop",
        glow: ROSE,
        size: [32, 52],
        duration: [1.8, 2.8],
      })(props)}
      {stage({
        emojis: SPARKLES,
        count: 36,
        motion: "float-up",
        glow: SUNSHINE,
        size: [16, 28],
        duration: [3, 5],
      })(props)}
    </>
  ),
  "flower-trail": stage({
    emojis: FLOWERS,
    count: 20,
    motion: "trail",
    glow: ROSE,
    size: [28, 48],
    duration: [2.4, 3.6],
  }),
  "ultimate-floral": (props) => (
    <>
      <PulseRing color={ROSE} />
      {stage({
        emojis: FLOWERS,
        count: 24,
        motion: "grow-up",
        glow: EMERALD,
        size: [36, 60],
        duration: [2.4, 3.4],
      })(props)}
      {stage({
        emojis: PETALS,
        count: 50,
        motion: "rain",
        glow: ROSE,
        size: [18, 34],
        duration: [2.4, 4],
      })(props)}
      {stage({
        emojis: SPARKLES,
        count: 30,
        motion: "float-up",
        glow: SUNSHINE,
        size: [16, 28],
        duration: [3, 5],
      })(props)}
    </>
  ),

  // ---------------- MIXED ----------------
  "thumbs-flowers": (props) => (
    <>
      {stage({
        emojis: THUMB,
        count: 18,
        motion: "burst",
        glow: BLUE,
        size: [28, 48],
        duration: [1.6, 2.4],
      })(props)}
      {stage({
        emojis: FLOWERS,
        count: 18,
        motion: "pop",
        glow: ROSE,
        size: [28, 48],
        duration: [1.8, 2.8],
      })(props)}
    </>
  ),
  "leprechaun-flowers": (props) => (
    <>
      <RainbowArc />
      {stage({
        emojis: CLOVER,
        count: 24,
        motion: "swirl",
        glow: EMERALD,
        size: [22, 40],
        duration: [2, 3],
      })(props)}
      {stage({
        emojis: FLOWERS,
        count: 22,
        motion: "pop",
        glow: ROSE,
        size: [26, 46],
        duration: [1.8, 2.8],
      })(props)}
    </>
  ),
  "thumbs-leprechaun": (props) => (
    <>
      {stage({
        emojis: THUMB,
        count: 22,
        motion: "burst",
        glow: GOLD,
        size: [28, 48],
        duration: [1.6, 2.4],
      })(props)}
      {stage({
        emojis: ["🍀", "🪙"],
        count: 26,
        motion: "firework",
        glow: EMERALD,
        size: [22, 40],
        duration: [1.8, 2.6],
      })(props)}
    </>
  ),
  "flowers-thumbs-rain": (props) => (
    <>
      {stage({
        emojis: PETALS,
        count: 40,
        motion: "rain",
        glow: ROSE,
        size: [18, 34],
        duration: [2.4, 4],
      })(props)}
      {stage({
        emojis: THUMB,
        count: 30,
        motion: "rain",
        glow: BLUE,
        size: [22, 38],
        duration: [2, 3.4],
      })(props)}
    </>
  ),
  "rainbow-bloom": (props) => (
    <>
      <RainbowArc />
      {stage({
        emojis: FLOWERS,
        count: 20,
        motion: "pop",
        glow: ROSE,
        size: [30, 52],
        duration: [1.8, 2.8],
      })(props)}
      {stage({
        emojis: SPARKLES,
        count: 24,
        motion: "float-up",
        glow: SUNSHINE,
        size: [16, 28],
        duration: [3, 5],
      })(props)}
    </>
  ),
  "gold-garden": (props) => (
    <>
      {stage({
        emojis: FLOWERS,
        count: 20,
        motion: "grow-up",
        glow: EMERALD,
        size: [36, 60],
        duration: [2.4, 3.4],
      })(props)}
      {stage({
        emojis: COIN,
        count: 28,
        motion: "rain",
        glow: GOLD,
        size: [22, 38],
        duration: [2, 3.2],
      })(props)}
      {stage({
        emojis: SPARKLES,
        count: 24,
        motion: "pop",
        glow: GOLD,
        size: [16, 28],
        duration: [1.8, 2.8],
      })(props)}
    </>
  ),
  "lucky-like-burst": (props) => (
    <>
      <GlowOrb color={EMERALD} size="40vmin" />
      {stage({
        emojis: CLOVER,
        count: 18,
        motion: "burst",
        glow: EMERALD,
        size: [22, 40],
        duration: [1.4, 2.2],
      })(props)}
      {stage({
        emojis: THUMB,
        count: 24,
        motion: "burst",
        glow: GOLD,
        size: [26, 46],
        duration: [1.6, 2.4],
      })(props)}
    </>
  ),
  "floral-coin-shower": (props) => (
    <>
      {stage({
        emojis: COIN,
        count: 40,
        motion: "rain",
        glow: GOLD,
        size: [22, 38],
        duration: [2, 3.2],
      })(props)}
      {stage({
        emojis: PETALS,
        count: 40,
        motion: "rain",
        glow: ROSE,
        size: [18, 34],
        duration: [2.4, 4],
      })(props)}
    </>
  ),
  "magic-reaction": (props) => (
    <>
      <GlowOrb color={VIOLET} size="50vmin" />
      {stage({
        emojis: MIX_ALL,
        count: 50,
        motion: "burst",
        glow: VIOLET,
        size: [22, 42],
        duration: [1.6, 2.6],
      })(props)}
      {stage({
        emojis: SPARKLES,
        count: 30,
        motion: "firework",
        glow: SUNSHINE,
        size: [16, 30],
        duration: [1.8, 2.8],
      })(props)}
    </>
  ),
  "ultimate-finale": (props) => (
    <>
      <RainbowArc />
      <PortalRing color1={VIOLET} color2={GOLD} />
      <PulseRing color={ROSE} />
      {stage({
        emojis: THUMB,
        count: 24,
        motion: "firework",
        glow: BLUE,
        size: [22, 40],
        duration: [1.8, 2.6],
      })(props)}
      {stage({
        emojis: CLOVER,
        count: 30,
        motion: "swirl",
        glow: EMERALD,
        size: [22, 38],
        duration: [2, 3],
      })(props)}
      {stage({
        emojis: COIN,
        count: 30,
        motion: "rain",
        glow: GOLD,
        size: [22, 38],
        duration: [2, 3.2],
      })(props)}
      {stage({
        emojis: PETALS,
        count: 36,
        motion: "rain",
        glow: ROSE,
        size: [18, 32],
        duration: [2.4, 4],
      })(props)}
      {stage({
        emojis: SPARKLES,
        count: 36,
        motion: "float-up",
        glow: SUNSHINE,
        size: [16, 28],
        duration: [3, 5],
      })(props)}
      {stage({
        emojis: ["🎉", "🎊"],
        count: 24,
        motion: "burst",
        glow: VIOLET,
        size: [22, 38],
        duration: [1.6, 2.4],
      })(props)}
    </>
  ),

  // ---------------- COSMIC ----------------
  "galaxy-spiral": (props) => (
    <>
      <StarField count={40} />
      {stage({
        emojis: ["⭐", "✨", "💫", "🌟"],
        count: 40,
        motion: "galaxy",
        glow: VIOLET,
        size: [16, 36],
        duration: [3, 4.5],
      })(props)}
    </>
  ),
  "shooting-stars": (props) => (
    <>
      <StarField count={30} />
      {stage({
        emojis: ["🌠", "⭐", "✨"],
        count: 18,
        motion: "shooting-star",
        glow: SUNSHINE,
        size: [28, 50],
        duration: [1.4, 2.4],
      })(props)}
    </>
  ),
  "starry-night": () => <StarField count={120} />,
  "black-hole-pull": (props) => (
    <>
      <GlowOrb color={VIOLET} size="20vmin" />
      {stage({
        emojis: ["✨", "⭐", "💫", "🌟"],
        count: 40,
        motion: "black-hole",
        glow: VIOLET,
        size: [18, 34],
        duration: [2.4, 3.4],
      })(props)}
    </>
  ),
  "cosmic-shockwave": (props) => (
    <>
      <LightningFlash color={VIOLET} />
      <GlowOrb color={SUNSHINE} size="30vmin" />
      {stage({
        emojis: ["💫", "✨", "⭐"],
        count: 36,
        motion: "shockwave",
        glow: SUNSHINE,
        size: [22, 42],
        duration: [1.6, 2.4],
      })(props)}
    </>
  ),
  "infinity-loop": (props) => (
    <>
      {stage({
        emojis: ["✨", "⭐", "💫"],
        count: 30,
        motion: "infinity",
        glow: VIOLET,
        size: [22, 38],
        duration: [3, 4],
      })(props)}
    </>
  ),
  "matrix-rain": stage({
    emojis: ["✨", "⭐", "💫", "🌟"],
    count: 48,
    motion: "matrix",
    glow: EMERALD,
    size: [16, 30],
    duration: [2.4, 4],
  }),
  supernova: (props) => (
    <>
      <LightningFlash color={SUNSHINE} />
      <GlowOrb color={SUNSHINE} size="60vmin" />
      <GiantReveal emoji="💥" color={SUNSHINE} />
      {stage({
        emojis: ["⭐", "✨", "💫", "🌟"],
        count: 60,
        motion: "shockwave",
        glow: SUNSHINE,
        size: [20, 42],
        duration: [1.8, 2.6],
      })(props)}
    </>
  ),

  // ---------------- LOVE ----------------
  "heart-beat": (props) => (
    <>
      <PulseRing color={ROSE} />
      <HeartBeat color={ROSE} />
      {stage({
        emojis: ["💖", "💕", "✨"],
        count: 20,
        motion: "float-up",
        glow: ROSE,
        size: [22, 38],
        duration: [3, 5],
      })(props)}
    </>
  ),
  "heart-formation": stage({
    emojis: ["❤️", "💖", "💕", "💗"],
    count: 30,
    motion: "heart-shape",
    glow: ROSE,
    size: [22, 40],
    duration: [2.4, 3.4],
  }),
  "love-rain": stage({
    emojis: ["❤️", "💖", "💕", "💗", "💝"],
    count: 50,
    motion: "rain",
    glow: ROSE,
    size: [22, 42],
    duration: [2.4, 4],
  }),
  "kiss-burst": (props) => (
    <>
      <GiantReveal emoji="💋" color={ROSE} />
      {stage({
        emojis: ["💋", "💕", "✨"],
        count: 30,
        motion: "burst",
        glow: ROSE,
        size: [24, 44],
        duration: [1.6, 2.4],
      })(props)}
    </>
  ),
  "cupid-arrow": (props) => (
    <>
      {stage({
        emojis: ["🏹", "💘"],
        count: 8,
        motion: "trail",
        glow: ROSE,
        size: [36, 56],
        duration: [1.6, 2.4],
      })(props)}
      {stage({
        emojis: ["❤️", "💖"],
        count: 26,
        motion: "burst",
        glow: ROSE,
        size: [22, 38],
        duration: [1.8, 2.6],
      })(props)}
    </>
  ),
  "love-storm": stage({
    emojis: ["❤️", "💖", "💕", "💗"],
    count: 40,
    motion: "tornado",
    glow: ROSE,
    size: [20, 38],
    duration: [2.4, 3.4],
  }),
  "ultimate-love": (props) => (
    <>
      <PulseRing color={ROSE} />
      <HeartBeat color={ROSE} />
      {stage({
        emojis: ["❤️", "💖"],
        count: 30,
        motion: "heart-shape",
        glow: ROSE,
        size: [22, 40],
        duration: [2.4, 3.4],
      })(props)}
      {stage({
        emojis: ["💕", "💗", "💝"],
        count: 30,
        motion: "rain",
        glow: ROSE,
        size: [20, 36],
        duration: [2.4, 4],
      })(props)}
      {stage({
        emojis: ["✨"],
        count: 30,
        motion: "float-up",
        glow: SUNSHINE,
        size: [16, 28],
        duration: [3, 5],
      })(props)}
    </>
  ),

  // ---------------- EXTRA THUMBS / LEPRECHAUN / FLOWERS ----------------
  "thumbs-helix": stage({
    emojis: THUMB,
    count: 28,
    motion: "helix",
    glow: BLUE,
    size: [26, 46],
    duration: [2.4, 3.4],
  }),
  "thumbs-zigzag": stage({
    emojis: THUMB,
    count: 24,
    motion: "zigzag",
    glow: VIOLET,
    size: [28, 48],
    duration: [2.2, 3.4],
  }),
  "lightning-likes": (props) => (
    <>
      <LightningFlash color={SUNSHINE} />
      {stage({
        emojis: THUMB,
        count: 32,
        motion: "burst",
        glow: SUNSHINE,
        size: [24, 44],
        duration: [1.4, 2],
      })(props)}
      {stage({
        emojis: ["⚡"],
        count: 16,
        motion: "pop",
        glow: SUNSHINE,
        size: [28, 46],
        duration: [1.4, 2.2],
      })(props)}
    </>
  ),
  "clover-tornado": stage({
    emojis: CLOVER,
    count: 36,
    motion: "tornado",
    glow: EMERALD,
    size: [22, 40],
    duration: [2.4, 3.4],
  }),
  "gold-shockwave": (props) => (
    <>
      <LightningFlash color={GOLD} />
      {stage({
        emojis: COIN,
        count: 32,
        motion: "shockwave",
        glow: GOLD,
        size: [24, 44],
        duration: [1.6, 2.4],
      })(props)}
    </>
  ),
  "petal-tornado": stage({
    emojis: PETALS,
    count: 40,
    motion: "tornado",
    glow: ROSE,
    size: [20, 38],
    duration: [2.4, 3.4],
  }),
  "flower-heart": stage({
    emojis: FLOWERS,
    count: 30,
    motion: "heart-shape",
    glow: ROSE,
    size: [24, 42],
    duration: [2.4, 3.4],
  }),
  "garden-quake": stage({
    emojis: FLOWERS,
    count: 26,
    motion: "earthquake",
    glow: EMERALD,
    size: [32, 54],
    duration: [1.8, 2.6],
  }),

  // ---------------- MINIMAL ----------------
  "simple-thumb": stage({
    emojis: ["👍"],
    count: 1,
    motion: "soft-fade",
    glow: BLUE,
    size: [120, 140],
    duration: [2.4, 2.4],
    opacity: [0.9, 0.95],
  }),
  "simple-heart": stage({
    emojis: ["❤️"],
    count: 1,
    motion: "soft-fade",
    glow: ROSE,
    size: [120, 140],
    duration: [2.4, 2.4],
    opacity: [0.9, 0.95],
  }),
  "simple-clover": stage({
    emojis: ["🍀"],
    count: 1,
    motion: "soft-fade",
    glow: EMERALD,
    size: [120, 140],
    duration: [2.4, 2.4],
    opacity: [0.9, 0.95],
  }),
  "simple-flower": stage({
    emojis: ["🌸"],
    count: 1,
    motion: "soft-fade",
    glow: ROSE,
    size: [120, 140],
    duration: [2.4, 2.4],
    opacity: [0.9, 0.95],
  }),
  "simple-star": stage({
    emojis: ["⭐"],
    count: 1,
    motion: "soft-fade",
    glow: SUNSHINE,
    size: [120, 140],
    duration: [2.4, 2.4],
    opacity: [0.9, 0.95],
  }),
  "minimal-dots": stage({
    emojis: ["✨"],
    count: 6,
    motion: "soft-fade",
    glow: SUNSHINE,
    size: [28, 36],
    duration: [2.4, 3.2],
    opacity: [0.6, 0.9],
  }),
  "minimal-rain": stage({
    emojis: ["👍"],
    count: 10,
    motion: "rain",
    glow: BLUE,
    size: [22, 30],
    duration: [3, 4.2],
    opacity: [0.6, 0.85],
  }),
  "minimal-petals": stage({
    emojis: ["🌸", "💮"],
    count: 8,
    motion: "wind-drift",
    glow: ROSE,
    size: [22, 30],
    duration: [4, 6],
    opacity: [0.55, 0.85],
  }),
  "minimal-hearts": stage({
    emojis: ["💕", "💖"],
    count: 7,
    motion: "float-up",
    glow: ROSE,
    size: [24, 34],
    duration: [4, 5.5],
    opacity: [0.6, 0.85],
  }),
  "minimal-clovers": stage({
    emojis: ["🍀", "☘️"],
    count: 8,
    motion: "rain",
    glow: EMERALD,
    size: [22, 30],
    duration: [3.2, 4.4],
    opacity: [0.6, 0.85],
  }),
  "minimal-pulse": () => <PulseRing color={ROSE} />,
  "minimal-pop": stage({
    emojis: ["👍"],
    count: 5,
    motion: "pop",
    glow: BLUE,
    size: [40, 56],
    duration: [1.8, 2.4],
    opacity: [0.7, 0.95],
  }),
  "minimal-bloom": stage({
    emojis: ["🌷", "🌸", "🌼"],
    count: 3,
    motion: "pop",
    glow: ROSE,
    size: [70, 90],
    duration: [2.2, 2.6],
    opacity: [0.85, 1],
  }),
  "minimal-sparkle-line": stage({
    emojis: ["✨"],
    count: 5,
    motion: "trail",
    glow: SUNSHINE,
    size: [22, 30],
    duration: [2.4, 3],
    opacity: [0.6, 0.9],
  }),

  // ---------------- FESTIVE ----------------
  "birthday-bash": (props) => (
    <>
      <GiantReveal emoji="🎂" color={ROSE} />
      {stage({
        emojis: ["🎈", "🎁", "🎉", "🎊"],
        count: 36,
        motion: "burst",
        glow: ROSE,
        size: [24, 44],
        duration: [1.6, 2.6],
      })(props)}
      {stage({
        emojis: ["✨", "⭐"],
        count: 24,
        motion: "float-up",
        glow: SUNSHINE,
        size: [16, 28],
        duration: [3, 5],
      })(props)}
    </>
  ),
  "balloon-rise": stage({
    emojis: ["🎈", "🎀"],
    count: 24,
    motion: "float-up",
    glow: ROSE,
    size: [40, 64],
    duration: [4, 6.5],
  }),
  "confetti-cannon": (props) => (
    <>
      {stage({
        emojis: ["🎉", "🎊", "✨", "⭐", "💫"],
        count: 70,
        motion: "firework",
        glow: SUNSHINE,
        size: [20, 38],
        duration: [1.8, 2.8],
      })(props)}
      {stage({
        emojis: ["🎊", "🎉"],
        count: 30,
        motion: "burst",
        glow: VIOLET,
        size: [22, 40],
        duration: [1.6, 2.4],
      })(props)}
    </>
  ),
  "new-year-fireworks": (props) => (
    <>
      <LightningFlash color={SUNSHINE} />
      {stage({
        emojis: ["🎆", "✨", "⭐", "💫"],
        count: 50,
        motion: "firework",
        glow: SUNSHINE,
        size: [22, 42],
        duration: [2, 3],
      })(props)}
      {stage({
        emojis: ["🎇"],
        count: 20,
        motion: "burst",
        glow: ROSE,
        size: [28, 48],
        duration: [1.8, 2.6],
      })(props)}
    </>
  ),
  "champagne-pop": (props) => (
    <>
      <GiantReveal emoji="🍾" color={SUNSHINE} />
      {stage({
        emojis: ["🥂", "✨", "⭐", "💫"],
        count: 36,
        motion: "firework",
        glow: SUNSHINE,
        size: [22, 40],
        duration: [1.8, 2.6],
      })(props)}
    </>
  ),
  snowfall: stage({
    emojis: ["❄️", "❅", "❆"],
    count: 60,
    motion: "rain",
    glow: BLUE,
    size: [18, 34],
    duration: [3.5, 6],
    opacity: [0.7, 1],
  }),
  "christmas-magic": (props) => (
    <>
      {stage({
        emojis: ["❄️"],
        count: 50,
        motion: "rain",
        glow: BLUE,
        size: [16, 28],
        duration: [3.5, 6],
        opacity: [0.7, 1],
      })(props)}
      {stage({
        emojis: ["🎄", "🎁", "⭐"],
        count: 18,
        motion: "pop",
        glow: EMERALD,
        size: [36, 56],
        duration: [2, 3],
      })(props)}
      {stage({
        emojis: ["✨"],
        count: 24,
        motion: "float-up",
        glow: SUNSHINE,
        size: [16, 28],
        duration: [3, 5],
      })(props)}
    </>
  ),
  "gift-shower": stage({
    emojis: ["🎁", "🎀"],
    count: 28,
    motion: "rain",
    glow: ROSE,
    size: [28, 48],
    duration: [2.4, 4],
  }),
  "halloween-spooks": (props) => (
    <>
      {stage({
        emojis: ["🎃"],
        count: 18,
        motion: "pop",
        glow: "#ff8c2a",
        size: [32, 54],
        duration: [2, 2.8],
      })(props)}
      {stage({
        emojis: ["👻"],
        count: 14,
        motion: "float-up",
        glow: VIOLET,
        size: [32, 50],
        duration: [3.5, 5],
      })(props)}
      {stage({
        emojis: ["🦇"],
        count: 18,
        motion: "zigzag",
        glow: VIOLET,
        size: [22, 38],
        duration: [2.4, 3.4],
      })(props)}
    </>
  ),
  "ghost-float": stage({
    emojis: ["👻"],
    count: 18,
    motion: "float-up",
    glow: VIOLET,
    size: [36, 60],
    duration: [4, 6],
    opacity: [0.6, 0.9],
  }),
  "bat-swarm": stage({
    emojis: ["🦇"],
    count: 30,
    motion: "zigzag",
    glow: VIOLET,
    size: [22, 40],
    duration: [2.2, 3.4],
  }),
  "party-popper": (props) => (
    <>
      <GiantReveal emoji="🎉" color={SUNSHINE} />
      {stage({
        emojis: ["🎉", "🎊", "✨", "⭐"],
        count: 50,
        motion: "burst",
        glow: SUNSHINE,
        size: [22, 42],
        duration: [1.6, 2.4],
      })(props)}
    </>
  ),
  "trophy-celebration": (props) => (
    <>
      <GlowOrb color={GOLD} size="40vmin" />
      <GiantReveal emoji="🏆" color={GOLD} />
      {stage({
        emojis: ["⭐", "✨", "🪙"],
        count: 36,
        motion: "firework",
        glow: GOLD,
        size: [22, 40],
        duration: [1.8, 2.6],
      })(props)}
    </>
  ),
  "ultimate-party": (props) => (
    <>
      <LightningFlash color={SUNSHINE} />
      <PulseRing color={ROSE} />
      {stage({
        emojis: ["🎂", "🎁", "🎈"],
        count: 18,
        motion: "pop",
        glow: ROSE,
        size: [32, 54],
        duration: [2, 3],
      })(props)}
      {stage({
        emojis: ["🎉", "🎊"],
        count: 40,
        motion: "firework",
        glow: SUNSHINE,
        size: [22, 40],
        duration: [1.8, 2.6],
      })(props)}
      {stage({
        emojis: ["✨", "⭐", "💫"],
        count: 40,
        motion: "burst",
        glow: VIOLET,
        size: [18, 34],
        duration: [1.6, 2.4],
      })(props)}
      {stage({
        emojis: ["🎆"],
        count: 20,
        motion: "rainbow-arc",
        glow: ROSE,
        size: [22, 38],
        duration: [2, 2.8],
      })(props)}
    </>
  ),
};

// silence unused (combo helper kept for future expansion)
void combo;
