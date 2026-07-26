import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { POSTS } from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }) => {
    const p = loaderData as { title: string; excerpt: string } | undefined;
    if (!p) return { meta: [{ title: "Post not found — lowercase cafe" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.title} — lowercase journal` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  loader: ({ params }) => {
    const p = POSTS.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  component: PostPage,
});

function PostPage() {
  const p = Route.useLoaderData();
  const idx = POSTS.findIndex((x) => x.slug === p.slug);
  const next = POSTS[(idx + 1) % POSTS.length];

  return (
    <article className="pt-32 pb-24 md:pt-36">
      <div className="container-x max-w-3xl">
        <Reveal>
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to journal
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">{p.category}</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-primary sm:text-5xl md:text-6xl text-balance">{p.title}</h1>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {p.author} · {new Date(p.date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })} · {p.readTime}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 overflow-hidden rounded-3xl shadow-soft">
            <img src={p.cover} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="prose mt-12 max-w-none space-y-6 text-lg leading-relaxed text-primary/85">
            {p.content.map((para, i) => (
              <p key={i} className={i === 0 ? "first-letter:font-serif first-letter:text-6xl first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:text-[color:var(--olive)]" : ""}>
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 border-t border-primary/10 pt-10">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Read next</p>
          <Link to="/blog/$slug" params={{ slug: next.slug }} className="mt-3 block font-serif text-3xl text-primary hover:text-[color:var(--olive)]">
            {next.title} →
          </Link>
        </div>
      </div>
    </article>
  );
}