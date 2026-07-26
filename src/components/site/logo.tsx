import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className = "", transparent = false }: { className?: string; transparent?: boolean }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`} aria-label="lowercase cafe — home">
      <span aria-hidden className="relative grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-[color:var(--cream)]">
        <span className="absolute inset-1 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--amber-glow),transparent_60%)] opacity-80 animate-bulb" />
        <span className="relative font-serif text-[13px] font-semibold text-primary">l.</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-lg tracking-tight transition-colors", transparent ? "text-white" : "text-primary")}>lowercase</span>
        <span className={cn("text-[10px] uppercase tracking-[0.28em] transition-colors", transparent ? "text-white/60" : "text-muted-foreground")}>cafe · est. 2026</span>
      </span>
    </Link>
  );
}