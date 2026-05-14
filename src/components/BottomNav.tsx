import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Smile, Bell, MessageSquare, Calendar, User } from "lucide-react";

type Tab = { to: string; label: string; icon: typeof Home; exact?: boolean };
const tabs: Tab[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/children", label: "Children", icon: Smile },
  { to: "/updates", label: "Updates", icon: Bell },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/account", label: "Account", icon: User },
];

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[440px] -translate-x-1/2 px-3 pb-3 pt-2"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div
        className="flex items-center justify-between rounded-3xl bg-card/85 px-2 py-2 backdrop-blur-xl"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        {tabs.map(({ to, label, icon: Icon, exact }) => {
          const active = exact ? path === to : path.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="group flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-1.5 transition-colors"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              <span
                className={`text-[10px] font-semibold tracking-[0.08em] ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label.toUpperCase()}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
