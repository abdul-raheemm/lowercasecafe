import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const start = Date.now();
    let dismissTimer: ReturnType<typeof setTimeout> | undefined;

    const dismiss = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 1000 - elapsed);
      dismissTimer = setTimeout(() => setFading(true), remaining);
    };

    window.addEventListener("hero-video-ready", dismiss);
    window.addEventListener("load", dismiss);
    const fallback = setTimeout(dismiss, 1200);

    return () => {
      window.removeEventListener("hero-video-ready", dismiss);
      window.removeEventListener("load", dismiss);
      clearTimeout(fallback);
      if (dismissTimer) clearTimeout(dismissTimer);
    };
  }, []);

  useEffect(() => {
    if (!fading) return;
    const id = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(id);
  }, [fading]);

  if (!visible) return null;

  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[color:var(--cream)]"
      style={{ pointerEvents: fading ? "none" : "auto" }}
      aria-hidden={fading}
      aria-label="Loading"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center px-6 text-center"
      >
        <span className="relative grid h-16 w-16 place-items-center rounded-full border border-primary/20 bg-[color:var(--cream)] shadow-soft">
          <span className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--amber-glow),transparent_60%)] opacity-80" />
          <span className="relative font-serif text-2xl font-semibold text-primary">l.</span>
        </span>
        <span className="mt-5 flex flex-col leading-none">
          <span className="font-serif text-2xl tracking-tight text-primary">lowercase</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">cafe · est. 2026</span>
        </span>
        <p className="mt-8 font-serif text-sm text-[color:var(--walnut)]/70">Brewing your experience…</p>
        <div className="mt-5 flex gap-2" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-[color:var(--amber-glow)] animate-typing-dot"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
