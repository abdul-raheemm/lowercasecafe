import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GALLERY } from "@/lib/site-data";
import { Lightbox } from "@/components/site/lightbox";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — lowercase cafe" },
      { name: "description", content: "A photo journal of the room, the food, the light. Filter by interior, exterior, and food." },
      { property: "og:title", content: "Gallery — lowercase cafe" },
      { property: "og:description", content: "Photos of the café, the food, and the light." },
    ],
  }),
  component: GalleryPage,
});

const CATS = ["All", "Interior", "Exterior", "Food"] as const;

function GalleryPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const images = useMemo(() => cat === "All" ? GALLERY : GALLERY.filter((g) => g.category === cat), [cat]);
  const [lb, setLb] = useState<number | null>(null);

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Photo journal" title={<>Room, plate, light.</>} subtitle="A slow scroll through the café. Click any image for a larger view." />
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("rounded-full border px-5 py-2.5 text-sm transition-all",
              cat === c ? "border-primary bg-primary text-primary-foreground" : "border-primary/15 text-primary/70 hover:border-primary/40 hover:text-primary")}>
              {c}
              <span className="ml-2 text-xs opacity-60">
                {c === "All" ? GALLERY.length : GALLERY.filter((g) => g.category === c).length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-12">
          {images.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-white/40 p-16 text-center">
              <p className="font-serif text-2xl text-primary">No photos in this category yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">We're always shooting — try another filter.</p>
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
              {images.map((img, i) => (
                <Reveal key={img.src} delay={Math.min(i, 6) * 50}>
                  <button type="button" onClick={() => setLb(i)}
                    className="group relative block w-full overflow-hidden rounded-2xl shadow-soft transition-transform hover:-translate-y-1"
                    aria-label={`Open image: ${img.alt}`}>
                    <img src={img.src} alt={img.alt} className="w-full transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-xs uppercase tracking-[0.22em] text-[color:var(--cream)]">{img.category}</span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <Lightbox images={images} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
      </div>
    </div>
  );
}