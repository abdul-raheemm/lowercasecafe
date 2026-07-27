import { createFileRoute } from "@tanstack/react-router";
import { IMAGES } from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our story — lowercase cafe" },
      { name: "description", content: "A small café in Banjara Hills with three tables and a stubborn idea about slow coffee. This is how it grew." },
      { property: "og:title", content: "Our story — lowercase cafe" },
      { property: "og:description", content: "How a small room in Banjara Hills became lowercase cafe." },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { year: "2020", title: "Three tables in Banjara Hills", body: "We open with a used La Marzocco, a bag of Ethiopian micro-lot beans, and Elena behind the bar every morning at 6 AM." },
  { year: "2022", title: "Bakery joins the room", body: "Rafael arrives from a Barcelona bakery. Sourdough on Wednesdays becomes sourdough every day." },
  { year: "2024", title: "The little roastery", body: "We take over the shop next door and start roasting every bean we pour. Three lots become twenty-two." },
  { year: "2025", title: "Kitchen expansion", body: "Full breakfast, lunch, and small-plates evening menu. The wine & brew list arrives quietly one Tuesday." },
  { year: "2026", title: "You, here, now", body: "Same room. Same idea. Better tart." },
];

const TEAM = [
  { name: "Elena Marquez", role: "Founder & head barista", img: IMAGES.barista },
  { name: "Rafael Ortiz", role: "Head baker", img: IMAGES.pastries },
  { name: "Nia Sato", role: "Kitchen lead", img: IMAGES.food1 },
  { name: "Amir Hassan", role: "Head roaster", img: IMAGES.beans },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10" style={{ backgroundImage: `url(${IMAGES.exterior})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(28,20,14,0.7),rgba(28,20,14,0.4)_40%,var(--cream))]" />
        <div className="container-x pt-40 pb-24 md:pt-56 md:pb-32">
          <Reveal>
            <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[color:var(--charcoal)]">Our story</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-[color:var(--charcoal)] sm:text-6xl md:text-7xl text-balance drop-shadow-md">
              A small room, six years, ten thousand mornings.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[color:var(--charcoal)]/80 drop-shadow">
              lowercase cafe started with a stubborn idea: that coffee is worth taking longer over. This is how a room in Banjara Hills became the place you're reading about.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-x grid gap-14 md:grid-cols-2 md:gap-20 items-center">
          <Reveal>
            <div className="arch overflow-hidden shadow-soft">
              <img src={IMAGES.interior1} alt="A cozy reading corner" className="h-[560px] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="Why we opened" title={<>Because the good places were disappearing.</>} subtitle="Not the fancy ones. The unhurried ones. The rooms where you could stay for four hours and no one made you feel like the table wasn't yours." />
            <div className="mt-6 space-y-4 text-primary/80">
              <p>Elena spent a decade behind other people's bars before she opened her own. She kept a notebook of everything she'd change: the light, the music, the way the milk was steamed, whether the plates felt heavy or light in your hand.</p>
              <p>lowercase is that notebook, made real. It's a small room. It's meant to feel that way.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--cream)] py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Timeline" title={<>Seven years, in five short scenes.</>} align="center" />
          <ol className="mx-auto mt-16 max-w-3xl">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 80}>
                <li className="relative grid grid-cols-[80px_1fr] gap-6 pb-12">
                  <div className="text-right">
                    <p className="font-serif text-2xl text-[color:var(--olive)]">{t.year}</p>
                  </div>
                  <div className="relative border-l border-primary/15 pl-8">
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[color:var(--amber-glow)] shadow-[0_0_0_4px_var(--cream)]" />
                    <h3 className="font-serif text-2xl text-primary">{t.title}</h3>
                    <p className="mt-2 text-muted-foreground">{t.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="The team" title={<>Small crew.<br/>Long shifts.<br/>Deep pride.</>} />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <figure className="group">
                  <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-soft">
                    <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
                  </div>
                  <figcaption className="mt-4">
                    <p className="font-serif text-xl text-primary">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}