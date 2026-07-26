import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, X, Check } from "lucide-react";
import { EVENTS } from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { MagneticButton } from "@/components/site/magnetic-button";
import { TiltCard } from "@/components/site/tilt-card";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — lowercase cafe" },
      { name: "description", content: "Cupping sessions, vinyl Sundays, latte-art throwdowns and seasonal supper clubs." },
      { property: "og:title", content: "Events — lowercase cafe" },
      { property: "og:description", content: "Cupping sessions, vinyl Sundays, supper clubs." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [rsvpId, setRsvpId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<{ name?: string; email?: string }>({});

  const event = EVENTS.find((e) => e.id === rsvpId);

  const submitRsvp = () => {
    const e: typeof err = {};
    if (!name.trim()) e.name = "Your name please";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "That email looks off";
    setErr(e);
    if (Object.keys(e).length) return;
    if (rsvpId) setConfirmed((s) => new Set(s).add(rsvpId));
    setRsvpId(null); setName(""); setEmail("");
  };

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="What's on" title={<>Small evenings, worth showing up for.</>} subtitle="Cupping sessions, vinyl Sundays, latte-art throwdowns and the occasional supper club. RSVP keeps a seat." />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {EVENTS.map((e, i) => {
            const d = new Date(e.date);
            const isConfirmed = confirmed.has(e.id);
            return (
              <Reveal key={e.id} delay={i * 80}>
                <TiltCard>
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white/60 shadow-soft">
                    <div className="relative h-64 overflow-hidden">
                      <img src={e.image} alt={e.title} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute left-5 top-5 grid h-16 w-16 place-items-center rounded-2xl bg-[color:var(--cream)] text-primary shadow-soft">
                        <div className="text-center leading-tight">
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{d.toLocaleDateString(undefined, { month: "short" })}</p>
                          <p className="font-serif text-2xl">{d.getDate()}</p>
                        </div>
                      </div>
                      <span className="absolute right-5 top-5 rounded-full bg-[color:var(--amber-glow)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--charcoal)]">{e.tag}</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <h3 className="font-serif text-2xl text-primary">{e.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {d.toLocaleDateString(undefined, { weekday: "long" })}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {e.time}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{e.description}</p>
                      <div className="mt-auto pt-2">
                        {isConfirmed ? (
                          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--olive)]/30 bg-[color:var(--olive)]/10 px-4 py-2 text-sm text-[color:var(--olive)]">
                            <Check className="h-4 w-4" /> You're on the list
                          </div>
                        ) : (
                          <MagneticButton size="sm" onClick={() => setRsvpId(e.id)}>RSVP</MagneticButton>
                        )}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* RSVP Modal */}
      {event && (
        <div role="dialog" aria-modal="true" aria-label={`RSVP for ${event.title}`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[color:var(--charcoal)]/80 p-4 backdrop-blur-sm"
          onClick={() => setRsvpId(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md overflow-hidden rounded-3xl border border-primary/10 bg-[color:var(--cream)] shadow-soft animate-reveal-up">
            <div className="relative h-40">
              <img src={event.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button onClick={() => setRsvpId(null)} aria-label="Close" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30">
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-5 text-[color:var(--cream)]">
                <p className="text-xs uppercase tracking-[0.24em]">{new Date(event.date).toDateString()} · {event.time}</p>
                <h3 className="font-serif text-2xl">{event.title}</h3>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-[0.22em] text-muted-foreground">Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} className={`w-full rounded-xl border bg-white/60 px-4 py-2.5 text-primary focus:outline-none ${err.name ? "border-destructive" : "border-primary/15 focus:border-primary/40"}`} />
                {err.name && <span className="mt-1 block text-xs text-destructive">{err.name}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-[0.22em] text-muted-foreground">Email</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full rounded-xl border bg-white/60 px-4 py-2.5 text-primary focus:outline-none ${err.email ? "border-destructive" : "border-primary/15 focus:border-primary/40"}`} />
                {err.email && <span className="mt-1 block text-xs text-destructive">{err.email}</span>}
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setRsvpId(null)} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-primary">Cancel</button>
                <MagneticButton size="sm" onClick={submitRsvp}>Confirm RSVP</MagneticButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}