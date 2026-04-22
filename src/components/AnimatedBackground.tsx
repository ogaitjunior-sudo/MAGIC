import { useMemo } from "react";

interface Props {
  enabled: boolean;
}

export function AnimatedBackground({ enabled }: Props) {
  const dots = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        i,
        size: 2 + Math.random() * 4,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 12,
        hue: Math.random() * 360,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient blobs */}
      <div
        className="absolute -top-40 -left-40 rounded-full opacity-40 blur-3xl"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, oklch(0.7 0.22 310 / 0.6), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 rounded-full opacity-40 blur-3xl"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, oklch(0.7 0.2 150 / 0.5), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 rounded-full opacity-25 blur-3xl"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, oklch(0.82 0.17 85 / 0.5), transparent 70%)",
        }}
      />

      {enabled && (
        <>
          {dots.map((d) => (
            <div
              key={d.i}
              className="absolute rounded-full"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: d.size,
                height: d.size,
                background: `hsl(${d.hue}, 80%, 75%)`,
                boxShadow: `0 0 ${d.size * 4}px hsl(${d.hue}, 80%, 70%)`,
                animation: `float-slow ${d.duration}s ease-in-out ${d.delay}s infinite, pulse-glow ${d.duration / 2}s ease-in-out ${d.delay}s infinite`,
                opacity: 0.6,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
