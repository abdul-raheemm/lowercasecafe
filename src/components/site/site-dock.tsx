import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, Home, Images, Mail, UtensilsCrossed } from "lucide-react";
import Dock from "@/components/Dock";

export function SiteDock() {
  const navigate = useNavigate();

  const items = [
    {
      icon: <Home className="h-5 w-5 text-[color:var(--cream)]/80" />,
      label: "Home",
      onClick: () => navigate({ to: "/" }),
      className:
        "!bg-[color:var(--charcoal)] !border-[color:var(--walnut)]/40 hover:!border-[color:var(--amber-glow)]/70 hover:!bg-[color:var(--walnut)]",
    },
    {
      icon: <UtensilsCrossed className="h-5 w-5 text-[color:var(--cream)]/80" />,
      label: "Menu",
      onClick: () => navigate({ to: "/menu" }),
      className:
        "!bg-[color:var(--charcoal)] !border-[color:var(--walnut)]/40 hover:!border-[color:var(--amber-glow)]/70 hover:!bg-[color:var(--walnut)]",
    },
    {
      icon: <Images className="h-5 w-5 text-[color:var(--cream)]/80" />,
      label: "Gallery",
      onClick: () => navigate({ to: "/gallery" }),
      className:
        "!bg-[color:var(--charcoal)] !border-[color:var(--walnut)]/40 hover:!border-[color:var(--amber-glow)]/70 hover:!bg-[color:var(--walnut)]",
    },
    {
      icon: <CalendarDays className="h-5 w-5 text-[color:var(--cream)]/80" />,
      label: "Reservations",
      onClick: () => navigate({ to: "/reservations" }),
      className:
        "!bg-[color:var(--charcoal)] !border-[color:var(--walnut)]/40 hover:!border-[color:var(--amber-glow)]/70 hover:!bg-[color:var(--walnut)]",
    },
    {
      icon: <Mail className="h-5 w-5 text-[color:var(--cream)]/80" />,
      label: "Contact",
      onClick: () => navigate({ to: "/contact" }),
      className:
        "!bg-[color:var(--charcoal)] !border-[color:var(--walnut)]/40 hover:!border-[color:var(--amber-glow)]/70 hover:!bg-[color:var(--walnut)]",
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-auto">
        <Dock
          items={items}
          baseItemSize={44}
          magnification={62}
          distance={160}
          panelHeight={56}
          className="!border-[color:var(--walnut)]/50 !bg-[color:var(--charcoal)]/90 backdrop-blur-md shadow-soft"
        />
      </div>
    </div>
  );
}
