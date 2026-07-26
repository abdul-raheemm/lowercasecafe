import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">
          <span className="h-px w-8 bg-[color:var(--olive)]/60" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl leading-[1.05] text-primary sm:text-5xl md:text-6xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}