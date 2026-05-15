import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bus, Calendar, Cloud, FileText, Image as ImageIcon, MessageSquare, Receipt, Thermometer, Utensils } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { activityFeed, bus, children, parent, todayHighlights } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/")({
  head: () => ({
    meta: [
      { title: "Home — Digital Sanctuary" },
      { name: "description", content: "Your daily window into your child's day at the Sanctuary." },
    ],
  }),
  component: HomePage,
});

const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

const iconMap = {
  utensils: Utensils,
  image: ImageIcon,
  "file-text": FileText,
  thermometer: Thermometer,
  calendar: Calendar,
  message: MessageSquare,
  receipt: Receipt,
} as const;

function HomePage() {
  return (
    <>
      <AppHeader action="bell" />

      <section className="px-6 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Good morning</p>
        <h1 className="mt-1 font-display text-[2.75rem] font-extrabold leading-[1.02] text-foreground">
          {parent.name}.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{today}</p>
      </section>

      {/* Children status cards (horizontal scroll) */}
      <section className="mt-6 flex gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
        {children.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="snap-start"
          >
            <Link to="/children" className="block min-w-[280px] overflow-hidden rounded-3xl"
              style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="relative h-40 overflow-hidden">
                <img src={c.avatar} alt={c.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-display text-xl font-extrabold leading-tight">{c.name} Dupont</p>
                  <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    {c.status} · {c.arrivedAt}
                  </p>
                  <p className="mt-0.5 text-[11px] opacity-90">{c.room}</p>
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur">
                  See report →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Today's highlights chips */}
      <section className="mt-2 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {todayHighlights.map((h) => {
          const Icon = iconMap[h.icon as keyof typeof iconMap];
          const tone = h.child === "lea" ? "bg-secondary-container text-secondary" : "bg-primary-container text-primary";
          return (
            <Link key={h.id} to={h.to as never}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${tone}`}>
              <Icon className="h-3.5 w-3.5" />
              {h.text}
            </Link>
          );
        })}
      </section>

      {/* Bus tracking */}
      {bus.enabled && (
        <section className="mx-6 mt-4 overflow-hidden rounded-[1.75rem] p-5"
          style={{ background: "var(--gradient-primary)", color: "var(--primary-foreground)" }}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Bus className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{bus.route} · {bus.child}</p>
              <p className="font-display text-base font-bold">{bus.status} at {bus.stop}</p>
              <p className="text-[11px] opacity-90">ETA at school: {bus.eta}</p>
            </div>
          </div>
        </section>
      )}

      {/* Activity feed */}
      <section className="mx-6 mt-5 rounded-[2rem] bg-surface-low p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground">Today's feed</h2>
          <Link to="/updates" className="text-sm font-semibold text-primary">All updates</Link>
        </div>
        <ul className="mt-4 space-y-2">
          {activityFeed.map((a, i) => {
            const Icon = iconMap[a.icon as keyof typeof iconMap] ?? FileText;
            const child = children.find((c) => c.id === a.child);
            return (
              <motion.li key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={a.to as never}
                  className="flex items-center gap-3 rounded-2xl bg-card p-3 transition-colors hover:bg-card/70">
                  {child ? (
                    <img src={child.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground">{a.time}</p>
                  </div>
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {/* Weather */}
      <section className="mx-6 mt-5 rounded-[2rem] bg-card p-6 text-center" style={{ boxShadow: "var(--shadow-soft)" }}>
        <Cloud className="mx-auto h-7 w-7 text-primary" />
        <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground">25°C</p>
        <p className="text-sm text-muted-foreground">Warm day — Light clothing for outdoor time</p>
      </section>

      <div className="h-4" />
    </>
  );
}
