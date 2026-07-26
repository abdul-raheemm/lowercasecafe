import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Coffee, Quote, Star } from "lucide-react";
import { IMAGES, MENU, TESTIMONIALS, GALLERY } from "@/lib/site-data";
import { MagneticButton } from "@/components/site/magnetic-button";
import { TiltCard } from "@/components/site/tilt-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Lightbox } from "@/components/site/lightbox";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "lowercase cafe — coffee, kitchen & slow evenings" },
      { name: "description", content: "A vintage-rustic café for hand-crafted coffee, seasonal food, and warm evenings under Edison-light glow." },
      { property: "og:title", content: "lowercase cafe" },
      { property: "og:description", content: "Hand-crafted coffee, seasonal kitchen, cozy Edison-lit rooms." },
    ],
  }),
  component: Home,
});

function Home() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featured = MENU.filter((m) => m.featured);
  const [filter, setFilter] = useState<"All" | "Coffee" | "Food" | "Desserts">("All");
  const filtered = filter === "All" ? featured : featured.filter((m) => m.category === filter);

  const galleryImages = GALLERY.slice(0, 6);
  const [lb, setLb] = useState<number | null>(null);

  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIdx((i) => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${IMAGES.heroCafe})`,
            backgroundSize: "cover",
            backgroundPosition: `center ${50 + scrollY * 0.03}%`,
            transform: `translateY(${scrollY * 0.15}px) scale(1.05)`,
          }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(28,20,14,0.55),rgba(28,20,14,0.35)_40%,rgba(244,236,216,0.9)_92%,var(--cream))]" />
        <div aria-hidden className="absolute inset-0 -z-10 grain" />

        <div className="container-x flex min-h-[92vh] flex-col justify-end pb-16 pt-40 md:pb-24 md:pt-48">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--cream)]/25 bg-black/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-[color:var(--cream)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--amber-glow)] animate-bulb" />
              Est. 2018 · Old Quarter
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-[color:var(--cream)] sm:text-6xl md:text-7xl lg:text-[88px] text-balance">
              Slow coffee.<br/>
              <em className="not-italic text-[color:var(--amber-glow)]">Warm</em> rooms.<br/>
              Better mornings.
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--cream)]/85">
              A small café on Kiln Lane, pouring single-origin coffee, seasonal food, and honest hospitality — every day from 7:30 to late.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/reservations">
                <MagneticButton size="lg">Reserve a table <ArrowRight className="h-4 w-4" /></MagneticButton>
              </Link>
              <Link to="/menu">
                <MagneticButton size="lg" variant="outline" className="!border-[color:var(--cream)]/30 !text-[color:var(--cream)] hover:!bg-[color:var(--cream)]/10">
                  View menu
                </MagneticButton>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-[color:var(--cream)]/15 pt-8 text-[color:var(--cream)]/90">
              {[
                { k: "07", v: "years pouring" },
                { k: "22", v: "single-origin lots" },
                { k: "4.9★", v: "1.2k reviews" },
              ].map((s) => (
                <div key={s.v}>
                  <p className="font-serif text-3xl md:text-4xl">{s.k}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--cream)]/60">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="relative bg-background py-24 md:py-32">
        <div className="container-x grid gap-14 md:grid-cols-2 md:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="arch overflow-hidden shadow-soft">
                <img src={IMAGES.barista} alt="Barista pouring milk into an espresso" className="h-[560px] w-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden max-w-[220px] rounded-2xl border border-primary/10 bg-[color:var(--cream)] p-4 shadow-soft md:block">
                <p className="font-serif text-primary">"Coffee is patience with better output."</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">— Elena, head barista</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Our story"
              title={<>A small room, poured one cup at a time.</>}
              subtitle="We opened lowercase in 2018 with three tables, one espresso machine, and a stubborn idea: that coffee is worth taking a little longer over. Seven years later, the machine is bigger, but the idea hasn't changed."
            />
            <div className="mt-8 space-y-4 text-primary/80">
              <p>We roast every bean in-house, bake our own bread on Wednesdays, and pour Chemex by hand until the last order at 9:15 PM.</p>
            </div>
            <div className="mt-8">
              <Link to="/about">
                <MagneticButton variant="outline">Read our story <ArrowUpRight className="h-4 w-4" /></MagneticButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED MENU */}
      <section className="relative bg-[color:var(--cream)] py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="From the menu" title={<>Small menu.<br/>Everything picked twice.</>} />
            <div className="flex flex-wrap gap-2">
              {(["All", "Coffee", "Food", "Desserts"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-all",
                    filter === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-primary/15 text-primary/70 hover:border-primary/40 hover:text-primary",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m, i) => (
              <Reveal key={m.id} delay={i * 80}>
                <TiltCard>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white/60 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-16px_rgba(58,34,20,0.35)]">
                    <div className="relative h-56 overflow-hidden">
                      {m.image ? (
                        <img src={m.image} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className="grid h-full w-full place-items-center bg-[color:var(--walnut)] text-[color:var(--cream)]">
                          <Coffee className="h-14 w-14 opacity-60" />
                        </div>
                      )}
                      <div className="absolute left-3 top-3 rounded-full bg-[color:var(--cream)]/85 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary backdrop-blur">
                        {m.category}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-serif text-2xl text-primary">{m.name}</h3>
                        <p className="whitespace-nowrap font-serif text-lg text-[color:var(--olive)]">${m.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground opacity-0 -translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        {m.description}
                      </p>
                      <div className="mt-auto pt-6 text-xs uppercase tracking-[0.24em] text-[color:var(--olive)]">
                        {m.tags?.[0] ?? "House"}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/menu">
              <MagneticButton variant="outline">See the full menu <ArrowRight className="h-4 w-4" /></MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CAFÉ EXPERIENCE STORY */}
      <section className="relative overflow-hidden bg-[color:var(--walnut)] py-28 text-[color:var(--cream)] md:py-40">
        <div aria-hidden className="absolute inset-0 grain opacity-40" />
        <div className="container-x grid gap-16 md:grid-cols-12 md:gap-10 items-center">
          <Reveal className="md:col-span-5">
            <SectionHeading
              eyebrow="The experience"
              title={<span className="text-[color:var(--cream)]">A room that slows the clock.</span>}
              subtitle={<span className="text-[color:var(--cream)]/70">Reclaimed oak. Concrete floors. Edison bulbs on brass sconces we found at a market in Ghent. Every surface picked for how it holds light.</span>}
            />
            <ul className="mt-10 space-y-6 text-[color:var(--cream)]/80">
              {[
                { n: "01", t: "Morning", d: "Chemex pours, warm croissants, the paper still folded." },
                { n: "02", t: "Afternoon", d: "Long lunches, wifi that works, tables you can stay at." },
                { n: "03", t: "Evening", d: "Vinyl on the shelf, natural wine, the room turns golden." },
              ].map((s) => (
                <li key={s.n} className="grid grid-cols-[auto_1fr] gap-5 border-t border-[color:var(--cream)]/10 pt-5">
                  <span className="font-serif text-2xl text-[color:var(--amber-glow)]">{s.n}</span>
                  <div>
                    <p className="font-serif text-xl">{s.t}</p>
                    <p className="mt-1 text-sm text-[color:var(--cream)]/60">{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-7" delay={140}>
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[560px]">
              <div className="col-span-4 row-span-4 overflow-hidden rounded-3xl shadow-soft">
                <img src={IMAGES.interior2} alt="Café interior with arched windows and Edison bulbs" className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105" loading="lazy" />
              </div>
              <div className="col-span-2 row-span-3 overflow-hidden rounded-3xl shadow-soft">
                <img src={IMAGES.beans} alt="Roasted coffee beans" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="col-span-2 row-span-3 overflow-hidden rounded-3xl shadow-soft">
                <img src={IMAGES.pastries} alt="Pastries on display" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="col-span-6 row-span-2 overflow-hidden rounded-3xl shadow-soft">
                <img src={IMAGES.interior1} alt="Cozy reading corner in the café" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Photo journal" title={<>A closer look.</>} />
            <Link to="/gallery" className="story-link text-sm text-[color:var(--olive)]">Open full gallery</Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryImages.map((img, i) => (
              <Reveal key={img.src} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => setLb(i)}
                  className={cn(
                    "group relative block w-full overflow-hidden rounded-2xl shadow-soft transition-transform duration-500 hover:-translate-y-1",
                    i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-[4/3]" : "aspect-square",
                  )}
                  aria-label={`Open image: ${img.alt}`}
                >
                  <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" loading="lazy" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
        <Lightbox images={galleryImages} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
      </section>

      {/* TESTIMONIALS */}
      <section className="relative overflow-hidden bg-[color:var(--cream)] py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Kind words" title={<>Regulars, mostly.</>} align="center" />
          <div className="mt-14 mx-auto max-w-3xl">
            <Reveal>
              <div className="relative rounded-3xl border border-primary/10 bg-white/60 p-8 shadow-soft sm:p-12 min-h-[280px]">
                <Quote className="absolute -top-4 left-8 h-10 w-10 rounded-full bg-[color:var(--amber-glow)] p-2 text-primary shadow-soft" />
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={t.name}
                    className={cn(
                      "transition-all duration-700 ease-out",
                      i === tIdx ? "opacity-100" : "pointer-events-none absolute inset-0 p-8 opacity-0 sm:p-12",
                    )}
                    aria-hidden={i !== tIdx}
                  >
                    <p className="font-serif text-2xl leading-snug text-primary sm:text-3xl text-balance">"{t.quote}"</p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground font-serif">
                        {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-primary">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5 text-[color:var(--amber-glow)]">
                        {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="mt-6 flex justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={cn("h-1.5 rounded-full transition-all", i === tIdx ? "w-8 bg-primary" : "w-2 bg-primary/25")}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT PREVIEW / CTA */}
      <section className="relative bg-background py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[36px] bg-[color:var(--walnut)] p-10 text-[color:var(--cream)] shadow-soft md:p-16">
              <div aria-hidden className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[color:var(--amber-glow)]/25 blur-3xl" />
              <div aria-hidden className="absolute inset-0 grain opacity-40" />
              <div className="relative grid gap-10 md:grid-cols-2 md:items-end">
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.32em] text-[color:var(--amber-glow)]">Come sit</p>
                  <h2 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
                    A quiet table. <br/>A better morning.
                  </h2>
                </div>
                <div className="space-y-5 md:pl-8">
                  <p className="text-[color:var(--cream)]/80">Book a table for two, four, or the whole group. Walk-ins welcome — reservations kinder to your morning.</p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/reservations">
                      <MagneticButton className="!bg-[color:var(--amber-glow)] !text-[color:var(--charcoal)] hover:!bg-[color:var(--cream)]">Reserve a table</MagneticButton>
                    </Link>
                    <Link to="/contact">
                      <MagneticButton variant="outline" className="!border-[color:var(--cream)]/30 !text-[color:var(--cream)] hover:!bg-[color:var(--cream)]/10">Get directions</MagneticButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
