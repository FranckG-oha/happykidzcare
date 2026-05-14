import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, MessageSquare, Users, CalendarDays, Receipt } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { notifications, type NotifKind } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Digital Sanctuary" },
      { name: "description", content: "All your alerts: reports, messages, events and payments." },
    ],
  }),
  component: NotificationsPage,
});

const filters = ["All", "My Children", "School", "Payments"] as const;

const iconMap: Record<NotifKind, typeof FileText> = {
  report: FileText,
  message: MessageSquare,
  event: Users,
  schedule: CalendarDays,
  payment: Receipt,
};

function NotificationsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const grouped = notifications.reduce<Record<string, typeof notifications>>((a, n) => {
    (a[n.group] ||= []).push(n);
    return a;
  }, {});

  return (
    <>
      <AppHeader action="search" />

      <section className="px-6 pt-6">
        <h1 className="font-display text-4xl font-extrabold leading-none text-foreground">Notifications</h1>
      </section>

      <nav className="mt-5 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((f) => {
          const sel = filter === f;
          return (
            <motion.button
              key={f}
              whileTap={{ scale: 0.94 }}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                sel ? "bg-primary text-primary-foreground" : "bg-surface-low text-foreground"
              }`}
            >
              {f}
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-6 space-y-6 px-6 pb-4">
        {Object.entries(grouped).map(([group, items]) => (
          <section key={group}>
            <h2 className="mb-3 text-sm font-bold text-muted-foreground">{group}</h2>
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {items.map((n, i) => {
                  const Icon = iconMap[n.kind];
                  const accent = n.accent === "secondary";
                  return (
                    <motion.li
                      key={n.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="relative overflow-hidden rounded-3xl bg-card p-4"
                      style={{ boxShadow: "var(--shadow-soft)" }}
                    >
                      {n.unread && (
                        <span className={`absolute left-0 top-4 h-12 w-1 rounded-r-full ${accent ? "bg-secondary" : "bg-primary"}`} />
                      )}
                      <div className="flex items-start gap-3">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          accent ? "bg-secondary-container text-secondary" : "bg-primary-container text-primary"
                        }`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="font-display text-base font-bold text-foreground">{n.title}</p>
                            <span className={`shrink-0 text-[11px] font-semibold ${n.unread ? (accent ? "text-secondary" : "text-primary") : "text-muted-foreground"}`}>{n.time}</span>
                          </div>
                          <p className="mt-1 text-sm leading-snug text-muted-foreground">{n.body}</p>
                          {(n.action || n.actor) && (
                            <div className="mt-3 flex items-center gap-2">
                              {n.actor && <img src={n.actor} alt="" width={24} height={24} className="h-6 w-6 rounded-full object-cover" />}
                              {n.action && (
                                <motion.button whileTap={{ scale: 0.95 }} className={`text-xs font-bold ${accent ? "text-secondary" : "text-primary"}`}>
                                  {n.action} →
                                </motion.button>
                              )}
                            </div>
                          )}
                          {n.rsvp && (
                            <div className="mt-3 flex gap-2">
                              <motion.button whileTap={{ scale: 0.95 }} className="flex-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">Accept</motion.button>
                              <motion.button whileTap={{ scale: 0.95 }} className="flex-1 rounded-full bg-surface-low px-4 py-2 text-xs font-bold text-foreground">Decline</motion.button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
