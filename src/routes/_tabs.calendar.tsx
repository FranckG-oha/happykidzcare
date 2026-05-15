import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, X, MapPin, Clock } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { calendar, meals, children, type CalEvent } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Digital Sanctuary" },
      { name: "description", content: "Upcoming events, RSVP, and the weekly meal menu." },
    ],
  }),
  component: CalendarPage,
});

const colorMap = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  warning: "bg-warning text-warning-foreground",
  destructive: "bg-destructive text-destructive-foreground",
} as const;

const filters = ["All", "Léa", "Noah", "School"] as const;
const tabs = ["Events", "Menu"] as const;

function CalendarPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [tab, setTab] = useState<(typeof tabs)[number]>("Events");
  const eventDays = new Set(calendar.filter((e) => e.date.startsWith("Apr")).map((e) => e.day));
  const events = calendar.filter((e) => {
    if (filter === "All") return true;
    if (filter === "School") return !e.location?.includes("Léa") && !e.location?.includes("Noah");
    return e.location?.includes(filter) || e.location?.includes("Both");
  });

  return (
    <>
      <AppHeader action="bell" />

      <section className="px-6 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Schedule</p>
        <h1 className="mt-1 font-display text-4xl font-extrabold leading-tight text-foreground">
          April 2025<span className="text-primary">.</span>
        </h1>
      </section>

      {/* Tab pills */}
      <nav className="mt-5 flex gap-2 px-6">
        {tabs.map((t) => {
          const sel = tab === t;
          return (
            <motion.button key={t} whileTap={{ scale: 0.95 }} onClick={() => setTab(t)}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${sel ? "bg-primary text-primary-foreground" : "bg-surface-low text-foreground"}`}>
              {t}
            </motion.button>
          );
        })}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {tab === "Events" ? (
            <>
              {/* Month grid */}
              <section className="mx-6 mt-5 rounded-[1.75rem] bg-card p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => <div key={d} className="py-1">{d}</div>)}
                </div>
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {/* April 2025 starts Tuesday */}
                  {Array.from({ length: 1 }).map((_, i) => <div key={`pad-${i}`} />)}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const has = eventDays.has(day);
                    const today = day === 15;
                    return (
                      <motion.button key={day} whileTap={{ scale: 0.9 }}
                        className={`relative flex aspect-square items-center justify-center rounded-xl text-xs font-semibold transition-colors ${
                          today ? "bg-primary text-primary-foreground" : has ? "bg-primary-container text-primary" : "text-foreground hover:bg-surface-low"
                        }`}>
                        {day}
                        {has && !today && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />}
                      </motion.button>
                    );
                  })}
                </div>
              </section>

              {/* Filter chips */}
              <nav className="mt-5 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {filters.map((f) => {
                  const sel = filter === f;
                  return (
                    <motion.button key={f} whileTap={{ scale: 0.94 }} onClick={() => setFilter(f)}
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${sel ? "bg-foreground text-background" : "bg-surface-low text-foreground"}`}>
                      {f}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Upcoming */}
              <section className="mt-4 space-y-3 px-6 pb-2">
                <p className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Upcoming</p>
                {events.map((e, i) => <EventCard key={e.id} e={e} delay={i * 0.06} />)}
                {events.length === 0 && <p className="py-6 text-center text-xs text-muted-foreground">No events for this filter.</p>}
              </section>
            </>
          ) : (
            <MenuView />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function EventCard({ e, delay }: { e: CalEvent; delay: number }) {
  return (
    <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="overflow-hidden rounded-3xl bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
      <div className="flex items-start gap-4 p-4">
        <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl ${colorMap[e.color]}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{e.date.split(" ")[0]}</span>
          <span className="font-display text-xl font-extrabold leading-none">{e.date.split(" ")[1]}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{e.tag}</p>
          <h3 className="mt-0.5 font-display text-base font-bold text-foreground">{e.title}</h3>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            {e.time && <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>}
            {e.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.location}</span>}
          </div>
        </div>
      </div>
      {e.rsvp === "needed" && (
        <div className="flex gap-2 border-t border-border bg-surface-low/40 px-4 py-3">
          <motion.button whileTap={{ scale: 0.96 }} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">
            <Check className="h-3.5 w-3.5" /> Confirm
          </motion.button>
          <motion.button whileTap={{ scale: 0.96 }} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-card px-4 py-2 text-xs font-bold text-foreground">
            <X className="h-3.5 w-3.5" /> Decline
          </motion.button>
        </div>
      )}
      {e.rsvp === "going" && (
        <div className="flex items-center gap-2 border-t border-border bg-success/10 px-4 py-2.5 text-xs font-bold text-success-foreground">
          <Check className="h-3.5 w-3.5" /> RSVP confirmed — Going
        </div>
      )}
    </motion.article>
  );
}

function MenuView() {
  return (
    <section className="mt-5 px-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Nutrition & Wellness</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold leading-tight text-foreground">Weekly meal menu</h2>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Week of Apr 23</p>
          <div className="mt-1 flex -space-x-2">
            {children.map((c) => (
              <img key={c.id} src={c.avatar} alt="" width={24} height={24} className="h-6 w-6 rounded-full object-cover ring-2 ring-background" />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {meals.map((m) => (
          <article key={m.day} className={`rounded-3xl p-5 ${m.today ? "bg-primary-container" : "bg-surface-low"}`}>
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full ${m.today ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`}>
                <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">{m.day}</span>
                <span className="font-display text-sm font-extrabold leading-none">{m.date}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`font-display text-lg font-bold ${m.today ? "text-primary" : "text-foreground"}`}>{m.title}</h3>
                <p className={`mt-1 text-sm ${m.today ? "text-primary/80" : "text-muted-foreground"}`}>{m.body}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.tags.map((t) => {
                    const allergy = t.toLowerCase().includes("allergy") || t.toLowerCase().includes("dairy") || t.toLowerCase().includes("nut");
                    return (
                      <span key={t} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        allergy ? "bg-destructive/15 text-destructive" : "bg-card text-foreground"
                      }`}>
                        {allergy && <AlertTriangle className="h-3 w-3" />} {t}
                      </span>
                    );
                  })}
                </div>
                <p className="mt-3 border-t border-border pt-3 text-xs font-semibold text-muted-foreground">
                  🍎 Snack: <span className="text-foreground">{m.snack}</span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="h-4" />
    </section>
  );
}
