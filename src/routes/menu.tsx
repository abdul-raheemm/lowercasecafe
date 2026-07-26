import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { MENU, type MenuCategory } from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — lowercase cafe" },
      { name: "description", content: "Single-origin coffee, seasonal food and pastries. Everything hand-picked and prepared to order." },
      { property: "og:title", content: "Menu — lowercase cafe" },
      { property: "og:description", content: "Single-origin coffee, seasonal food and pastries." },
    ],
  }),
  component: MenuPage,
});

const TABS: (MenuCategory | "All")[] = ["All", "Coffee", "Food", "Desserts"];

function MenuPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const base = tab === "All" ? MENU : MENU.filter((m) => m.category === tab);
    if (!q.trim()) return base;
    const s = q.toLowerCase();
    return base.filter((m) => m.name.toLowerCase().includes(s) || m.description.toLowerCase().includes(s));
  }, [tab, q]);

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="The menu" title={<>Small, seasonal, thoroughly considered.</>} subtitle="We change what we can, keep what you love. Prices in USD, tax included." />
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Menu categories" className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm transition-all",
                  tab === t ? "border-primary bg-primary text-primary-foreground" : "border-primary/15 text-primary/70 hover:border-primary/40 hover:text-primary",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the menu…"
              aria-label="Search menu"
              className="w-full rounded-full border border-primary/15 bg-white/60 py-2.5 pl-9 pr-9 text-sm text-primary placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none"
            />
            {q && (
              <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-primary">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-14">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-white/40 p-12 text-center">
              <p className="font-serif text-2xl text-primary">Nothing matches "{q}"</p>
              <p className="mt-2 text-sm text-muted-foreground">Try a different word, or clear the filter.</p>
            </div>
          ) : (
            <div className="grid gap-x-12 gap-y-2 md:grid-cols-2">
              {items.map((m, i) => (
                <Reveal key={m.id} delay={Math.min(i, 8) * 40}>
                  <article className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-primary/10 py-6 transition-colors hover:border-primary/40">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-serif text-2xl text-primary">{m.name}</h3>
                        {m.tags?.[0] && (
                          <span className="rounded-full bg-[color:var(--olive)]/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-[color:var(--olive)]">
                            {m.tags[0]}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 max-w-lg text-sm text-muted-foreground">{m.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-xl text-[color:var(--olive)]">${m.price.toFixed(2)}</p>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{m.category}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}