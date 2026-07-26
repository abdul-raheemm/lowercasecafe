import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Instagram, Facebook, Twitter, Check } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { MagneticButton } from "@/components/site/magnetic-button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & visit — lowercase cafe" },
      { name: "description", content: `Visit us at ${SITE.address}. Get in touch for private events, press, or a slow question about coffee.` },
      { property: "og:title", content: "Contact — lowercase cafe" },
      { property: "og:description", content: "Directions, hours, and how to reach us." },
    ],
  }),
  component: ContactPage,
});

type Form = { name: string; email: string; subject: string; message: string };

function ContactPage() {
  const [f, setF] = useState<Form>({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const x: typeof err = {};
    if (!f.name.trim()) x.name = "Your name please";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) x.email = "That email looks off";
    if (!f.subject.trim()) x.subject = "Give us a subject line";
    if (f.message.trim().length < 10) x.message = "A bit more detail, please";
    setErr(x);
    if (Object.keys(x).length === 0) setSent(true);
  };

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Say hello" title={<>Come find us.<br/>Or write first.</>} subtitle="We answer every email within a day. For same-day questions, the phone is faster." />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <form onSubmit={submit} className="rounded-3xl border border-primary/10 bg-white/60 p-6 shadow-soft sm:p-10">
              {sent ? (
                <div className="py-8 text-center animate-reveal-up">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--olive)] text-white"><Check className="h-6 w-6" /></div>
                  <h3 className="mt-6 font-serif text-3xl text-primary">Message sent.</h3>
                  <p className="mt-2 text-muted-foreground">We'll get back to you at {f.email} within a day.</p>
                  <MagneticButton variant="outline" className="mt-6" onClick={() => { setSent(false); setF({ name: "", email: "", subject: "", message: "" }); }}>Send another</MagneticButton>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" error={err.name}>
                      <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={inp(!!err.name)} />
                    </Field>
                    <Field label="Email" error={err.email}>
                      <input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={inp(!!err.email)} />
                    </Field>
                  </div>
                  <div className="mt-4">
                    <Field label="Subject" error={err.subject}>
                      <input value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} className={inp(!!err.subject)} placeholder="Private event, press, a question…" />
                    </Field>
                  </div>
                  <div className="mt-4">
                    <Field label="Message" error={err.message}>
                      <textarea rows={6} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className={cn(inp(!!err.message), "resize-none")} />
                    </Field>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <MagneticButton>Send message <Send className="h-4 w-4" /></MagneticButton>
                  </div>
                </>
              )}
            </form>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-6">
              <div className="rounded-3xl border border-primary/10 bg-white/60 p-6 shadow-soft">
                <h3 className="font-serif text-2xl text-primary">Visit</h3>
                <ul className="mt-4 space-y-3 text-sm text-primary/80">
                  <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[color:var(--olive)]" /> {SITE.address}</li>
                  <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 text-[color:var(--olive)]" /> {SITE.phone}</li>
                  <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 text-[color:var(--olive)]" /> {SITE.email}</li>
                </ul>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-primary/10 pt-6 text-sm">
                  <div><dt className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Mon – Fri</dt><dd className="font-serif text-lg text-primary">7:30 – 22:00</dd></div>
                  <div><dt className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Sat – Sun</dt><dd className="font-serif text-lg text-primary">8:00 – 23:00</dd></div>
                </dl>
                <div className="mt-6 flex gap-2">
                  {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <a key={i} href="#" aria-label="Social" className="grid h-10 w-10 place-items-center rounded-full border border-primary/15 text-primary/70 hover:border-[color:var(--olive)] hover:text-[color:var(--olive)]">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-primary/10 shadow-soft">
                <iframe
                  title="Map"
                  className="h-72 w-full"
                  loading="lazy"
                  src={SITE.mapsEmbedUrl}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function inp(err: boolean) {
  return cn(
    "w-full rounded-xl border bg-white/60 px-4 py-3 text-primary placeholder:text-muted-foreground focus:outline-none transition-colors",
    err ? "border-destructive focus:border-destructive" : "border-primary/15 focus:border-primary/40",
  );
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}