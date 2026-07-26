"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StylishCarouselItem {
  src: string;
  title?: string;
  alt?: string;
}

export interface StylishCarouselProps {
  items: StylishCarouselItem[];
  initialIndex?: number;
  slideSize?: string;
  rotationDegrees?: number;
  inactiveScale?: number;
  yOffsetPercent?: number;
  springBounce?: number;
  springDuration?: number;
  showArrows?: boolean;
  showDots?: boolean;
  clickToNavigate?: boolean;
  autoPlay?: number;
  className?: string;
  onIndexChange?: (index: number) => void;
  borderRadius?: string;
  dotActiveColor?: string;
  dotInactiveColor?: string;
  arrowClassName?: string;
}

const StylishCarousel = ({
  items = [],
  initialIndex = 0,
  slideSize = "clamp(140px, 75vmin, 320px)",
  rotationDegrees = 28,
  inactiveScale = 0.62,
  yOffsetPercent = 48,
  springBounce = 0.15,
  springDuration = 0.8,
  showArrows = true,
  showDots = true,
  clickToNavigate = true,
  autoPlay = 0,
  className,
  onIndexChange,
  borderRadius = "1rem",
  arrowClassName,
}: StylishCarouselProps) => {
  const clampedInitial = Math.max(0, Math.min(initialIndex, items.length - 1));
  const [activeIndex, setActiveIndex] = useState(clampedInitial);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      setActiveIndex(clamped);
      onIndexChange?.(clamped);
    },
    [items.length, onIndexChange]
  );

  const toPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const toNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") toPrev();
      if (e.key === "ArrowRight") toNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toPrev, toNext]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? toNext() : toPrev();
    touchStartX.current = null;
  };

  useEffect(() => {
    if (!autoPlay) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1 >= items.length ? 0 : prev + 1;
        onIndexChange?.(next);
        return next;
      });
    }, autoPlay);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, items.length, onIndexChange]);

  const spring = { type: "spring" as const, bounce: springBounce, duration: springDuration };

  if (!items.length) return null;

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center select-none", className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Stylish Carousel"
      role="region"
    >
      <div style={{ width: slideSize, aspectRatio: "1 / 1" }} className="relative mt-6">
        <motion.div
          className="flex w-fit"
          animate={{ x: `${(-activeIndex * 100) / items.length}%` }}
          transition={spring}
        >
          {items.map((item, i) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;
            return (
              <motion.div
                key={i}
                style={{ width: slideSize, aspectRatio: "1 / 1" }}
                className="flex-shrink-0 flex flex-col items-center gap-2 will-change-transform"
                animate={{
                  rotate: offset * rotationDegrees,
                  scale: isActive ? 1 : inactiveScale,
                  y: `${offset * yOffsetPercent}%`,
                }}
                transition={spring}
              >
                <AnimatePresence>
                  {item.title && (
                    <motion.span
                      key={`title-${i}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs sm:text-sm font-semibold whitespace-nowrap text-foreground/80 tracking-wide"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
                <div className="relative w-full h-full overflow-hidden shadow-2xl" style={{ borderRadius }}>
                  <img
                    src={item.src}
                    alt={item.alt ?? item.title ?? `Slide ${i + 1}`}
                    draggable={false}
                    onClick={() => clickToNavigate && goTo(i)}
                    className={cn(
                      "w-full h-full object-cover transition-[filter] duration-300 will-change-transform",
                      !isActive && "brightness-75",
                      clickToNavigate && !isActive && "cursor-pointer"
                    )}
                    loading="lazy"
                  />
                  {isActive && (
                    <motion.div
                      layoutId="glow-ring"
                      className="absolute inset-0 rounded-[inherit] pointer-events-none"
                      style={{ boxShadow: "0 0 0 3px hsl(var(--primary, 221 83% 53%) / 0.7)", borderRadius }}
                      transition={spring}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="mt-8 flex items-center gap-4 px-3 py-2 rounded-full bg-background/60 border border-border/60 backdrop-blur-md shadow-lg">
        {showArrows && (
          <button
            aria-label="Previous slide"
            onClick={toPrev}
            disabled={activeIndex === 0}
            className={cn("p-2 rounded-full transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed", arrowClassName)}
          >
            <ChevronLeft className="w-4 h-4 text-foreground/80" />
          </button>
        )}
        {showDots && (
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <motion.button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                animate={{ width: activeIndex === i ? 28 : 8, opacity: activeIndex === i ? 1 : 0.35 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                className="h-2 rounded-full bg-foreground cursor-pointer"
                style={{ minWidth: 8 }}
              />
            ))}
          </div>
        )}
        {showArrows && (
          <button
            aria-label="Next slide"
            onClick={toNext}
            disabled={activeIndex === items.length - 1}
            className={cn("p-2 rounded-full transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed", arrowClassName)}
          >
            <ChevronRight className="w-4 h-4 text-foreground/80" />
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground font-medium tabular-nums">
        {activeIndex + 1} / {items.length}
      </p>
    </div>
  );
};

export default StylishCarousel;
