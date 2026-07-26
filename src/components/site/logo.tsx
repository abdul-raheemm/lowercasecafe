import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`} aria-label="lowercase cafe — home">
      <span aria-hidden className="relative grid h-9 w-9 place-items-center rounded-full border border-primary/20 bg-[color:var(--cream)]">
        <span className="absolute inset-1 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--amber-glow),transparent_60%)] opacity-80 animate-bulb" />
        <span className="relative font-serif text-[13px] font-semibold text-primary">l.</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg tracking-tight text-primary">lowercase</span>
        <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">cafe · est. 2018</span>
      </span>
    </Link>
  );
}