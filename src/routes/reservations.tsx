import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Calendar, Clock, Users, User, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { MagneticButton } from "@/components/site/magnetic-button";
import { IMAGES, SITE } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — lowercase cafe" },
      { name: "description", content: "Reserve a table at lowercase cafe. Small parties to full-room bookings." },
      { property: "og:title", content: "Reservations — lowercase cafe" },
      { property: "og:description", content: "Reserve your table in seconds." },
    ],
  }),
  component: ReservationsPage,
});

type Data = {
  date: string;
  time: string;
  party: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const TIMES = ["8:00 AM", "9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "5:30 PM", "7:00 PM", "8:30 PM"];
const STEPS = ["When", "How many", "Who", "Confirm"] as const;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function ReservationsPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<Data>({
    date: today(), time: "", party: 2, name: "", email: "", phone: "", notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});

  const validate = (s: number): boolean => {
    const e: typeof errors = {};
    if (s === 0) {
      if (!data.date) e.date = "Pick a date";
      else if (data.date < today()) e.date = "Date must be today or later";
      if (!data.time) e.time = "Choose a time";
    }
    if (s === 1) {
      if (data.party < 1 || data.party > 20) e.party = "Between 1 and 20 guests";
    }
    if (s === 2) {
      if (!data.name.trim()) e.name = "Your name please";
      else if (data.name.trim().length < 2) e.name = "That's a very short name";
      if (!data.email.trim()) e.email = "We'll send confirmation here";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "That email looks off";
      if (!data.phone.trim()) e.phone = "In case we need to reach you";
      else if (data.phone.replace(/\D/g, "").length < 7) e.phone = "Phone looks too short";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = () => {
    if (validate(2)) {
      setDone(true);
    }
  };

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="sticky top-28">
              <SectionHeading eyebrow="Reservations" title={<>Save a seat.<br/>We'll save the light.</>} subtitle="Tables held for 15 minutes past your reservation time. Parties of 8+ get in touch first." />
              <div className="mt-10 overflow-hidden rounded-3xl border border-primary/10 shadow-soft">
                <img src={IMAGES.interior1} alt="A cozy corner of lowercase cafe with a leather armchair" className="h-72 w-full object-cover" loading="lazy" />
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
                <div><dt className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Hours</dt><dd className="mt-1 font-serif text-lg text-primary">7:30 AM – 10 PM</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Kitchen</dt><dd className="mt-1 font-serif text-lg text-primary">Until 9:15 PM</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Address</dt><dd className="mt-1 font-serif text-lg text-primary">{SITE.address.split(",")[0]}</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Phone</dt><dd className="mt-1 font-serif text-lg text-primary">{SITE.phone}</dd></div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-primary/10 bg-white/60 p-6 shadow-soft sm:p-10">
              {done ? (
                <SuccessState data={data} onReset={() => { setDone(false); setStep(0); setData({ date: today(), time: "", party: 2, name: "", email: "", phone: "", notes: "" }); }} />
              ) : (
                <>
                  <ol className="flex items-center gap-2" aria-label="Progress">
                    {STEPS.map((s, i) => (
                      <li key={s} className="flex flex-1 items-center gap-2">
                        <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-medium transition-colors",
                          i < step ? "border-[color:var(--olive)] bg-[color:var(--olive)] text-white"
                          : i === step ? "border-primary bg-primary text-primary-foreground"
                          : "border-primary/20 text-muted-foreground")}
                        >
                          {i < step ? <Check className="h-4 w-4" /> : i + 1}
                        </span>
                        <span className={cn("hidden text-xs uppercase tracking-[0.2em] sm:inline", i === step ? "text-primary" : "text-muted-foreground")}>{s}</span>
                        {i < STEPS.length - 1 && <span className={cn("h-px flex-1", i < step ? "bg-[color:var(--olive)]" : "bg-primary/15")} />}
                      </li>
                    ))}
                  </ol>

                  <div className="mt-10 min-h-[380px]">
                    {step === 0 && (
                      <div className="space-y-6 animate-reveal-up">
                        <Field label="Date" icon={<Calendar className="h-4 w-4" />} error={errors.date}>
                          <input type="date" min={today()} value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className={inputCls(!!errors.date)} />
                        </Field>
                        <Field label="Time" icon={<Clock className="h-4 w-4" />} error={errors.time}>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {TIMES.map((t) => (
                              <button key={t} type="button" onClick={() => setData({ ...data, time: t })} className={cn("rounded-xl border px-3 py-2.5 text-sm transition-all",
                                data.time === t ? "border-primary bg-primary text-primary-foreground" : "border-primary/15 bg-white/40 text-primary/80 hover:border-primary/40")}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </Field>
                      </div>
                    )}
                    {step === 1 && (
                      <div className="space-y-6 animate-reveal-up">
                        <Field label="Party size" icon={<Users className="h-4 w-4" />} error={errors.party}>
                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                              <button key={n} type="button" onClick={() => setData({ ...data, party: n })} className={cn("h-12 min-w-12 rounded-full border px-4 text-sm font-medium transition-all",
                                data.party === n ? "border-primary bg-primary text-primary-foreground" : "border-primary/15 text-primary/80 hover:border-primary/40")}>
                                {n}
                              </button>
                            ))}
                            <input type="number" min={1} max={20} value={data.party} onChange={(e) => setData({ ...data, party: Number(e.target.value) })} className={cn(inputCls(!!errors.party), "w-24")} aria-label="Custom party size" />
                          </div>
                        </Field>
                        <Field label="Anything we should know?" error={undefined}>
                          <textarea value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} rows={4} placeholder="Allergies, occasions, quiet-corner requests…" className={cn(inputCls(false), "resize-none")} />
                        </Field>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="space-y-6 animate-reveal-up">
                        <Field label="Full name" icon={<User className="h-4 w-4" />} error={errors.name}>
                          <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className={inputCls(!!errors.name)} placeholder="Elena Marquez" />
                        </Field>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Email" error={errors.email}>
                            <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className={inputCls(!!errors.email)} placeholder="you@domain.com" />
                          </Field>
                          <Field label="Phone" error={errors.phone}>
                            <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className={inputCls(!!errors.phone)} placeholder="(415) 555 0000" />
                          </Field>
                        </div>
                      </div>
                    )}
                    {step === 3 && <ReviewStep data={data} />}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <button type="button" onClick={back} disabled={step === 0} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary disabled:opacity-30">
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    {step < STEPS.length - 1 ? (
                      <MagneticButton onClick={next}>Continue <ChevronRight className="h-4 w-4" /></MagneticButton>
                    ) : (
                      <MagneticButton onClick={submit}>Confirm reservation <Check className="h-4 w-4" /></MagneticButton>
                    )}
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function inputCls(err: boolean) {
  return cn(
    "w-full rounded-xl border bg-white/60 px-4 py-3 text-primary placeholder:text-muted-foreground focus:outline-none transition-colors",
    err ? "border-destructive focus:border-destructive" : "border-primary/15 focus:border-primary/40",
  );
}

function Field({ label, children, icon, error }: { label: string; children: React.ReactNode; icon?: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
        {icon} {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function ReviewStep({ data }: { data: Data }) {
  const rows: [string, string][] = [
    ["Date", new Date(data.date).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })],
    ["Time", data.time],
    ["Guests", `${data.party}`],
    ["Name", data.name || "—"],
    ["Email", data.email || "—"],
    ["Phone", data.phone || "—"],
  ];
  return (
    <div className="animate-reveal-up">
      <h3 className="font-serif text-2xl text-primary">Almost there</h3>
      <p className="mt-2 text-sm text-muted-foreground">Give this a look — we'll send confirmation as soon as you press the button.</p>
      <dl className="mt-6 divide-y divide-primary/10 rounded-2xl border border-primary/10 bg-white/40">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[130px_1fr] gap-4 px-5 py-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{k}</dt>
            <dd className="font-serif text-lg text-primary">{v}</dd>
          </div>
        ))}
        {data.notes && (
          <div className="grid grid-cols-[130px_1fr] gap-4 px-5 py-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Notes</dt>
            <dd className="text-sm text-primary/80">{data.notes}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

function SuccessState({ data, onReset }: { data: Data; onReset: () => void }) {
  return (
    <div className="py-6 text-center animate-reveal-up">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[color:var(--olive)] text-white shadow-soft">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h3 className="mt-6 font-serif text-4xl text-primary">A table, held for you.</h3>
      <p className="mt-3 text-muted-foreground">Reservation for <strong>{data.party}</strong> on <strong>{new Date(data.date).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</strong> at <strong>{data.time}</strong>.</p>
      <p className="mt-2 text-sm text-muted-foreground">We sent details to {data.email}. See you soon, {data.name.split(" ")[0]}.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <MagneticButton variant="outline" onClick={onReset}>Make another</MagneticButton>
      </div>
    </div>
  );
}