import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Smile, Bell, MessageSquare, Calendar, User } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";

type Tab = { to: string; label: string; icon: typeof Home; exact?: boolean; badge?: number };
const tabs: Tab[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/children", label: "Children", icon: Smile },
  { to: "/updates", label: "Updates", icon: Bell, badge: 3 },
  { to: "/messages", label: "Messages", icon: MessageSquare, badge: 2 },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/account", label: "Account", icon: User },
];

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.05 }}
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[440px] -translate-x-1/2 px-3 pb-3 pt-2"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <LayoutGroup id="bottom-nav">
        <div
          className="flex items-center justify-between rounded-3xl bg-card/85 px-2 py-2 backdrop-blur-xl"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          {tabs.map(({ to, label, icon: Icon, exact, badge }) => {
            const active = exact ? path === to : path.startsWith(to);
            return (
              <Link
                key={to}
                to={to as never}
                className="group relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-1.5"
              >
                <motion.span
                  whileTap={{ scale: 0.85 }}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                    active ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="relative h-[18px] w-[18px]" strokeWidth={2.2} />
                  {badge ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.3 }}
                      className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[9px] font-bold text-secondary-foreground ring-2 ring-card"
                    >
                      {badge}
                    </motion.span>
                  ) : null}
                </motion.span>
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
      </LayoutGroup>
    </motion.nav>
  );
}
