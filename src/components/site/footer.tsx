import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-primary/10 bg-[color:var(--walnut)] text-[color:var(--cream)]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="[&_.text-primary]:!text-[color:var(--cream)] [&_.text-muted-foreground]:!text-[color:var(--cream)]/60 [&_.border-primary\/20]:border-[color:var(--cream)]/20 [&_.bg-\[color\:var\(--cream\)\]]:bg-transparent">
            <Logo />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[color:var(--cream)]/70">
            A small room on a slow street, serving hand-crafted coffee, seasonal food, and unhurried evenings since 2018.
          </p>
          <div className="flex gap-3 pt-2">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--cream)]/15 text-[color:var(--cream)]/70 transition-all hover:border-[color:var(--amber-glow)] hover:text-[color:var(--amber-glow)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-xs uppercase tracking-[0.28em] text-[color:var(--amber-glow)]">Visit</h3>
          <ul className="space-y-3 text-sm text-[color:var(--cream)]/75">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />42 Kiln Lane, Old Quarter</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" />+1 (415) 555 0182</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" />hello@lowercase.cafe</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-xs uppercase tracking-[0.28em] text-[color:var(--amber-glow)]">Explore</h3>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/menu", label: "Menu" },
              { to: "/reservations", label: "Reservations" },
              { to: "/events", label: "Events" },
              { to: "/blog", label: "Journal" },
              { to: "/about", label: "Our story" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-[color:var(--cream)]/75 transition-colors hover:text-[color:var(--amber-glow)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--cream)]/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-[color:var(--cream)]/50 sm:flex-row">
          <p>© {new Date().getFullYear()} lowercase cafe. All rights reserved.</p>
          <p>Brewed slowly. Served warm.</p>
        </div>
      </div>
    </footer>
  );
}