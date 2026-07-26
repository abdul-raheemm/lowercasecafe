import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { MagneticButton } from "./magnetic-button";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-primary/10 bg-[color:var(--cream)]/80 backdrop-blur-xl shadow-soft"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo transparent={!scrolled} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "relative text-sm tracking-wide transition-colors",
                  scrolled
                    ? active ? "text-primary" : "text-muted-foreground hover:text-primary"
                    : active ? "text-[color:var(--amber-glow)]" : "text-white/90 hover:text-white",
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--amber-glow)] transition-transform duration-500",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <Link to="/reservations">
            <MagneticButton size="sm" className={cn(!scrolled && "!border-white/40 !text-white hover:!bg-white/15")}>
              Reserve a table
            </MagneticButton>
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full border transition-colors lg:hidden",
            scrolled
              ? "border-primary/15 text-primary"
              : "border-white/30 text-white",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-b border-primary/10 bg-[color:var(--cream)]/95 backdrop-blur-xl transition-[max-height,opacity] duration-500",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
          {LINKS.map((l, i) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 font-serif text-2xl transition-colors",
                  active ? "bg-primary/5 text-primary" : "text-primary/70 hover:bg-primary/5 hover:text-primary",
                )}
              >
                {l.label}
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            );
          })}
          <Link to="/reservations" className="mt-3">
            <MagneticButton className="w-full">Reserve a table</MagneticButton>
          </Link>
        </nav>
      </div>
    </header>
  );
}