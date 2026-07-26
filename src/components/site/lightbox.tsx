import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export function Lightbox({ images, index, onClose, onIndex }: Props) {
  const isOpen = index !== null;

  const prev = useCallback(() => {
    if (index === null) return;
    onIndex((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndex]);

  const next = useCallback(() => {
    if (index === null) return;
    onIndex((index + 1) % images.length);
  }, [index, images.length, onIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, prev, next]);

  if (index === null) return null;
  const img = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[color:var(--charcoal)]/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-[color:var(--cream)]/10 text-[color:var(--cream)] hover:bg-[color:var(--cream)]/20"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-[color:var(--cream)]/10 text-[color:var(--cream)] hover:bg-[color:var(--cream)]/20 sm:left-6"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-[color:var(--cream)]/10 text-[color:var(--cream)] hover:bg-[color:var(--cream)]/20 sm:right-6"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <figure className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={img.src} alt={img.alt} className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl" />
        <figcaption className="mt-3 text-center text-sm text-[color:var(--cream)]/70">
          {img.alt} · {index + 1} / {images.length}
        </figcaption>
      </figure>
    </div>
  );
}