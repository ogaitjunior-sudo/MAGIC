import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Heart,
  RefreshCw,
  Trash2,
  Shuffle,
  PlayCircle,
  Sparkles,
  Volume2,
  VolumeX,
  Stars,
  Gauge,
  Wand2,
} from "lucide-react";
import { CATEGORIES, EFFECTS, type Effect } from "@/lib/effects";
import { EFFECT_RENDERERS } from "@/components/EffectRenderers";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useFavorites } from "@/hooks/useFavorites";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magic Effects Showcase — Interactive Animation Lab" },
      {
        name: "description",
        content:
          "A premium interactive animation gallery with 55+ effects: Thumbs Up, Leprechaun, Flowers, and magical mixed combos. Click any button to play.",
      },
      { property: "og:title", content: "Magic Effects Showcase" },
      {
        property: "og:description",
        content: "55+ playful, magical, premium animation effects you can trigger instantly.",
      },
    ],
  }),
  component: ShowcasePage,
});

type Filter = (typeof CATEGORIES)[number]["id"];

const CATEGORY_GRADIENTS: Record<string, string> = {
  thumbs: "linear-gradient(135deg, oklch(0.78 0.15 230), oklch(0.7 0.22 310))",
  leprechaun: "linear-gradient(135deg, oklch(0.7 0.2 150), oklch(0.82 0.17 85))",
  flowers: "linear-gradient(135deg, oklch(0.78 0.18 0), oklch(0.7 0.22 310))",
  love: "linear-gradient(135deg, oklch(0.78 0.2 10), oklch(0.7 0.22 350))",
  cosmic: "linear-gradient(135deg, oklch(0.55 0.2 280), oklch(0.78 0.18 230))",
  minimal: "linear-gradient(135deg, oklch(0.85 0.02 250), oklch(0.7 0.04 250))",
  festive: "linear-gradient(135deg, oklch(0.78 0.2 50), oklch(0.72 0.22 350))",
  mixed:
    "conic-gradient(from 0deg, oklch(0.7 0.22 310), oklch(0.7 0.2 150), oklch(0.82 0.17 85), oklch(0.78 0.18 0), oklch(0.7 0.22 310))",
};

const CATEGORY_GLOW: Record<string, string> = {
  thumbs: "var(--shadow-glow-violet)",
  leprechaun: "var(--shadow-glow-emerald)",
  flowers: "var(--shadow-glow-rose)",
  love: "var(--shadow-glow-rose)",
  cosmic: "var(--shadow-glow-violet)",
  minimal: "0 0 20px oklch(0.8 0.03 250 / 0.4)",
  festive: "0 0 30px oklch(0.78 0.2 50 / 0.5)",
  mixed: "var(--shadow-glow-gold)",
};

function ShowcasePage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [seed, setSeed] = useState(0);
  const [runAll, setRunAll] = useState(false);
  const [runAllIndex, setRunAllIndex] = useState(0);

  // Controls
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [glowOn, setGlowOn] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [bgOn, setBgOn] = useState(true);

  const { favorites, toggle, isFav } = useFavorites();

  const filtered = useMemo(() => {
    let list = EFFECTS;
    if (filter === "favorites") list = list.filter((e) => favorites.includes(e.id));
    else if (filter !== "all") list = list.filter((e) => e.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [filter, search, favorites]);

  const simpleEffects = useMemo(() => {
    let list = EFFECTS.filter((e) => e.category === "minimal");
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [search]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: EFFECTS.length, favorites: favorites.length };
    for (const e of EFFECTS) c[e.category] = (c[e.category] ?? 0) + 1;
    return c;
  }, [favorites]);

  const activeEffect = activeId ? (EFFECTS.find((e) => e.id === activeId) ?? null) : null;

  // Audio context for tiny celebration ping
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playPing = useCallback(() => {
    if (!soundOn) return;
    try {
      if (!audioCtxRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // ignore
    }
  }, [soundOn]);

  const playEffect = useCallback(
    (id: string) => {
      setRunAll(false);
      setActiveId(id);
      setSeed((s) => s + 1);
      playPing();
    },
    [playPing],
  );

  const replay = () => {
    if (activeId) {
      setSeed((s) => s + 1);
      playPing();
    }
  };

  const clearStage = () => {
    setActiveId(null);
    setRunAll(false);
  };

  const random = () => {
    const pool = filtered.length ? filtered : EFFECTS;
    const next = pool[Math.floor(Math.random() * pool.length)];
    playEffect(next.id);
  };

  const startRunAll = () => {
    setRunAll(true);
    setRunAllIndex(0);
    setActiveId(EFFECTS[0].id);
    setSeed((s) => s + 1);
    playPing();
  };

  // Auto-advance for run-all
  useEffect(() => {
    if (!runAll) return;
    const t = window.setTimeout(() => {
      const next = (runAllIndex + 1) % EFFECTS.length;
      setRunAllIndex(next);
      setActiveId(EFFECTS[next].id);
      setSeed((s) => s + 1);
      playPing();
    }, 3500 / speed);
    return () => window.clearTimeout(t);
  }, [runAll, runAllIndex, speed, playPing]);

  const Renderer = activeId ? EFFECT_RENDERERS[activeId] : null;

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground enabled={bgOn} />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <header className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-3"
          >
            <Sparkles className="w-4 h-4" style={{ color: "var(--gold)" }} />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Interactive animation laboratory
            </span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="text-gradient-magic">Magic Effects Showcase</span>
          </h1>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base">
            Click any button to trigger an animated effect • {EFFECTS.length} unique effects
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
          {/* === STAGE === */}
          <section className="flex flex-col gap-4">
            <div
              className="relative aspect-[16/10] lg:aspect-auto lg:h-[60vh] rounded-3xl overflow-hidden glass-strong stage-bg"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {/* Stage frame glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{ boxShadow: "inset 0 0 80px oklch(0.7 0.22 310 / 0.15)" }}
              />

              {/* Active effect */}
              <AnimatePresence mode="wait">
                {Renderer && activeEffect ? (
                  <motion.div
                    key={`${activeId}-${seed}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    {Renderer({ speed, intensity, glowOn, seed })}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                  >
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-7xl mb-4"
                    >
                      ✨
                    </motion.div>
                    <p className="text-xl font-semibold text-foreground">Pick an effect to begin</p>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      Browse {EFFECTS.length} hand-crafted animations across thumbs up, leprechaun
                      magic, flowers, and mixed combos.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Effect name overlay */}
              <AnimatePresence>
                {activeEffect && (
                  <motion.div
                    key={activeEffect.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 z-20 pointer-events-none"
                  >
                    <div className="glass-strong rounded-2xl px-4 py-2.5 flex items-center gap-3 max-w-[80%]">
                      <span className="text-2xl">{activeEffect.emoji}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-foreground truncate">
                          {activeEffect.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {activeEffect.description}
                        </div>
                      </div>
                    </div>
                    {runAll && (
                      <div className="glass-strong rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Run All
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stage controls */}
            <div className="glass rounded-2xl p-3 flex flex-wrap items-center gap-2">
              <ControlButton
                onClick={replay}
                disabled={!activeId}
                icon={<RefreshCw className="w-4 h-4" />}
              >
                Replay
              </ControlButton>
              <ControlButton
                onClick={clearStage}
                disabled={!activeId}
                icon={<Trash2 className="w-4 h-4" />}
              >
                Clear
              </ControlButton>
              <ControlButton onClick={random} icon={<Shuffle className="w-4 h-4" />}>
                Random
              </ControlButton>
              <ControlButton
                onClick={startRunAll}
                icon={<PlayCircle className="w-4 h-4" />}
                variant="primary"
              >
                Run All
              </ControlButton>
              {activeEffect && (
                <ControlButton
                  onClick={() => toggle(activeEffect.id)}
                  icon={
                    <Heart
                      className="w-4 h-4"
                      fill={isFav(activeEffect.id) ? "currentColor" : "none"}
                    />
                  }
                  variant={isFav(activeEffect.id) ? "rose" : "default"}
                >
                  Favorite
                </ControlButton>
              )}

              <div className="flex-1" />

              <Toggle
                on={soundOn}
                onClick={() => setSoundOn((v) => !v)}
                icon={soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                label="Sound"
              />
              <Toggle
                on={glowOn}
                onClick={() => setGlowOn((v) => !v)}
                icon={<Stars className="w-4 h-4" />}
                label="Glow"
              />
              <Toggle
                on={bgOn}
                onClick={() => setBgOn((v) => !v)}
                icon={<Wand2 className="w-4 h-4" />}
                label="BG"
              />
            </div>

            {/* Sliders */}
            <div className="glass rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Slider
                label="Speed"
                icon={<Gauge className="w-4 h-4" />}
                value={speed}
                min={0.3}
                max={2.5}
                step={0.1}
                onChange={setSpeed}
                suffix="×"
              />
              <Slider
                label="Intensity"
                icon={<Sparkles className="w-4 h-4" />}
                value={intensity}
                min={0.3}
                max={2}
                step={0.1}
                onChange={setIntensity}
                suffix="×"
              />
            </div>
          </section>

          {/* === SIDE PANEL === */}
          <aside className="flex flex-col gap-4 min-h-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search effects..."
                className="w-full glass rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 transition-all placeholder:text-muted-foreground"
                style={{ "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = filter === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    className="group relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                    style={{
                      background: active
                        ? c.id !== "all" && c.id !== "favorites"
                          ? CATEGORY_GRADIENTS[c.id]
                          : "var(--gradient-magic)"
                        : "oklch(0.25 0.05 280 / 0.5)",
                      color: active ? "oklch(0.15 0.02 280)" : "var(--color-foreground)",
                      boxShadow: active ? "0 4px 20px oklch(0.7 0.22 310 / 0.4)" : undefined,
                      border: active
                        ? "1px solid oklch(1 0 0 / 0.2)"
                        : "1px solid oklch(1 0 0 / 0.06)",
                    }}
                  >
                    {c.label}
                    <span
                      className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold"
                      style={{
                        background: active ? "oklch(0.15 0.02 280 / 0.25)" : "oklch(1 0 0 / 0.08)",
                      }}
                    >
                      {counts[c.id] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Simple effects */}
            {simpleEffects.length > 0 && (
              <section className="glass rounded-2xl p-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <Sparkles className="h-4 w-4" style={{ color: "var(--sunshine)" }} />
                    <span>Simple Effects</span>
                  </div>
                  <button
                    onClick={() => setFilter("minimal")}
                    className="rounded-full border px-2.5 py-1 text-[11px] font-bold transition-colors hover:bg-white/10"
                    style={{ borderColor: "oklch(1 0 0 / 0.1)" }}
                  >
                    {counts.minimal ?? 0}
                  </button>
                </div>
                <div className="grid max-h-[220px] grid-cols-3 gap-2 overflow-y-auto pr-1 scrollbar-thin">
                  {simpleEffects.map((effect) => (
                    <SimpleEffectButton
                      key={effect.id}
                      effect={effect}
                      active={activeId === effect.id}
                      onClick={() => playEffect(effect.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Effect grid */}
            <div
              className="glass rounded-2xl p-3 flex-1 overflow-y-auto scrollbar-thin"
              style={{ maxHeight: "calc(60vh + 180px)" }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  {filter === "favorites"
                    ? "No favorites yet — tap the heart on any active effect to save it."
                    : "No effects match your search."}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filtered.map((e) => (
                    <EffectButton
                      key={e.id}
                      effect={e}
                      active={activeId === e.id}
                      isFav={isFav(e.id)}
                      onClick={() => playEffect(e.id)}
                      onFav={(ev) => {
                        ev.stopPropagation();
                        toggle(e.id);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          {EFFECTS.length} effects • crafted with motion, glow & sparkle
        </footer>
      </div>
    </div>
  );
}

/* ============== UI BITS ============== */

function SimpleEffectButton({
  effect,
  active,
  onClick,
}: {
  effect: Effect;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex min-h-[72px] flex-col items-center justify-center overflow-hidden rounded-xl border px-2 py-2 text-center transition-all duration-300"
      style={{
        background: active
          ? CATEGORY_GRADIENTS.minimal
          : "linear-gradient(180deg, oklch(0.29 0.04 280 / 0.78), oklch(0.21 0.04 280 / 0.78))",
        color: active ? "oklch(0.15 0.02 280)" : "var(--color-foreground)",
        boxShadow: active ? CATEGORY_GLOW.minimal : "var(--shadow-button)",
        borderColor: active ? "oklch(1 0 0 / 0.22)" : "oklch(1 0 0 / 0.07)",
      }}
    >
      <span className="text-2xl leading-none">{effect.emoji}</span>
      <span className="mt-1 w-full truncate text-[10px] font-bold leading-tight">
        {effect.name.replace(/^Simple\s/, "")}
      </span>
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(135deg, oklch(1 0 0 / 0.08), transparent)" }}
      />
    </motion.button>
  );
}

function EffectButton({
  effect,
  active,
  isFav,
  onClick,
  onFav,
}: {
  effect: Effect;
  active: boolean;
  isFav: boolean;
  onClick: () => void;
  onFav: (e: React.MouseEvent) => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group relative text-left rounded-xl p-2.5 overflow-hidden transition-all duration-300"
      style={{
        background: active ? CATEGORY_GRADIENTS[effect.category] : "oklch(0.25 0.05 280 / 0.55)",
        color: active ? "oklch(0.15 0.02 280)" : "var(--color-foreground)",
        boxShadow: active ? CATEGORY_GLOW[effect.category] : "var(--shadow-button)",
        border: active ? "1px solid oklch(1 0 0 / 0.25)" : "1px solid oklch(1 0 0 / 0.06)",
      }}
    >
      {!active && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: CATEGORY_GRADIENTS[effect.category], mixBlendMode: "overlay" }}
        />
      )}
      <div className="relative flex items-start gap-2">
        <span className="text-xl leading-none mt-0.5">{effect.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="text-[12px] font-bold leading-tight truncate">{effect.name}</div>
          <div className="text-[10px] mt-0.5 truncate" style={{ opacity: active ? 0.75 : 0.6 }}>
            {effect.description}
          </div>
        </div>
        <button
          onClick={onFav}
          className="ml-1 p-1 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Favorite"
        >
          <Heart
            className="w-3.5 h-3.5"
            fill={isFav ? "currentColor" : "none"}
            style={{ color: isFav ? "var(--rose)" : "currentColor", opacity: isFav ? 1 : 0.5 }}
          />
        </button>
      </div>
    </motion.button>
  );
}

function ControlButton({
  onClick,
  disabled,
  icon,
  children,
  variant = "default",
}: {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "primary" | "rose";
}) {
  const styles: React.CSSProperties =
    variant === "primary"
      ? {
          background: "var(--gradient-magic)",
          color: "oklch(0.15 0.02 280)",
          boxShadow: "var(--shadow-glow-violet)",
        }
      : variant === "rose"
        ? {
            background: "var(--rose)",
            color: "oklch(0.15 0.02 280)",
            boxShadow: "var(--shadow-glow-rose)",
          }
        : { background: "oklch(0.3 0.05 280 / 0.6)", color: "var(--color-foreground)" };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.04 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed border"
      style={{ ...styles, borderColor: "oklch(1 0 0 / 0.08)" }}
    >
      {icon}
      {children}
    </motion.button>
  );
}

function Toggle({
  on,
  onClick,
  icon,
  label,
}: {
  on: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all border"
      style={{
        background: on ? "var(--gradient-magic)" : "oklch(0.3 0.05 280 / 0.5)",
        color: on ? "oklch(0.15 0.02 280)" : "var(--color-muted-foreground)",
        borderColor: "oklch(1 0 0 / 0.08)",
        boxShadow: on ? "0 0 16px oklch(0.7 0.22 310 / 0.4)" : undefined,
      }}
      title={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );
}

function Slider({
  label,
  icon,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          {icon}
          {label}
        </div>
        <div className="text-xs font-bold text-foreground">
          {value.toFixed(1)}
          {suffix}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-violet-400 cursor-pointer"
        style={{ accentColor: "var(--primary)" }}
      />
    </div>
  );
}
