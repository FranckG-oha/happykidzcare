import { Search, Bell } from "lucide-react";
import { parent } from "@/lib/mock";

export function AppHeader({ action = "search" as "search" | "bell" }) {
  const Icon = action === "search" ? Search : Bell;
  return (
    <header className="flex items-center justify-between px-6 pt-6">
      <div className="flex items-center gap-3">
        <img
          src={parent.avatar}
          alt={parent.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-card"
        />
        <span className="font-display text-lg font-bold text-primary tracking-tight">
          Digital Sanctuary
        </span>
      </div>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-low"
        aria-label={action}
      >
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </button>
    </header>
  );
}
