import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { POSTS } from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — lowercase cafe" },
      { name: "description", content: "Notes on coffee, seasonal food, design, and the small rituals of a café day." },
      { property: "og:title", content: "Journal — lowercase cafe" },
      { property: "og:description", content: "Notes on coffee, food, and design." },
    ],
  }),
  component: BlogLayout,
});

function BlogLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/blog/$slug");
  if (isChild) return <Outlet />;
  return <BlogIndex />;
}

function BlogIndex() {
  const [feature, ...rest] = POSTS;
  return (
    <div className="pt-32 pb-24 md:pt-40">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="The journal" title={<>Notes from the counter.</>} subtitle="Slow reads about coffee, seasonal cooking, and the small rituals that keep a café running." />
        </Reveal>

        <Reveal delay={120}>
          <Link to="/blog/$slug" params={{ slug: feature.slug }} className="group mt-14 grid gap-8 overflow-hidden rounded-3xl border border-primary/10 bg-white/60 shadow-soft md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
              <img src={feature.cover} alt="" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" loading="lazy" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Featured · {feature.category}</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-primary sm:text-4xl md:text-5xl">{feature.title}</h2>
              <p className="mt-4 text-muted-foreground">{feature.excerpt}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {feature.author} · {new Date(feature.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} · {feature.readTime}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm text-primary group-hover:text-[color:var(--olive)]">Read post <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white/60 shadow-soft transition-transform hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.cover} alt="" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--olive)]">{p.category}</p>
                  <h3 className="font-serif text-2xl leading-tight text-primary">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-auto pt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">{p.author} · {p.readTime}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}