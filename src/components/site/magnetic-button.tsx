import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChildTag?: "a";
  href?: string;
}

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, variant = "primary", size = "md", ...rest }, _ref) => {
    const wrap = useRef<HTMLSpanElement | null>(null);

    const onMove = (e: React.MouseEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
    };
    const reset = () => {
      if (wrap.current) wrap.current.style.transform = "translate(0,0)";
    };

    const base =
      "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    }[size];
    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:bg-[color:var(--walnut)] shadow-soft",
      ghost:
        "bg-transparent text-primary hover:bg-primary/5",
      outline:
        "border border-primary/25 text-primary hover:border-primary hover:bg-primary/5",
    }[variant];

    return (
      <button
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={cn(base, sizes, variants, "group overflow-hidden", className)}
        {...rest}
      >
        <span ref={wrap} className="inline-flex items-center gap-2 transition-transform duration-300 ease-out">
          {children}
        </span>
      </button>
    );
  },
);
MagneticButton.displayName = "MagneticButton";