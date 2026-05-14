import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Cloud, Heart, Image as ImageIcon, FileText, Utensils, Palette, AlertTriangle } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { children, parent, todayTimeline } from "@/lib/mock";

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

function HomePage() {
  return (
    <>
      <AppHeader action="search" />

      <section className="px-6 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Good morning</p>
        <h1 className="mt-1 font-display text-[2.75rem] font-extrabold leading-[1.02] text-foreground">
          {parent.name}.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{today}</p>
      </section>

      {/* Children quick switcher */}
      <section className="mt-6 flex gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {children.map((c) => (
          <Link
            key={c.id}
            to="/children"
            className="flex min-w-[260px] items-center gap-3 rounded-3xl bg-card p-3 pr-5"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <img src={c.avatar} alt={c.name} width={56} height={56} className="h-14 w-14 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <div className="font-display text-base font-bold text-foreground">{c.name}</div>
              <div className="truncate text-xs text-muted-foreground">{c.room}</div>
              <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-success-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {c.status}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-primary" />
          </Link>
        ))}
      </section>

      {/* Quick chips */}
      <section className="mt-2 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip icon={<Utensils className="h-3.5 w-3.5" />}>Lunch: Ate well</Chip>
        <Chip icon={<ImageIcon className="h-3.5 w-3.5" />}>2 new photos</Chip>
        <Chip icon={<FileText className="h-3.5 w-3.5" />} accent>Daily report ready</Chip>
      </section>

      {/* Today timeline */}
      <section className="mx-6 mt-5 rounded-[2rem] bg-surface-low p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground">Today</h2>
          <Link to="/children" className="text-sm font-semibold text-primary">View Full Day</Link>
        </div>

        <div className="mt-4 space-y-3">
          {todayTimeline.map((e) => (
            <article
              key={e.id}
              className={`rounded-2xl bg-card p-4 ${e.important ? "border-l-4 border-secondary" : ""}`}
              style={{ boxShadow: e.important ? undefined : "0 1px 3px rgba(36,50,79,0.04)" }}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    e.important ? "bg-secondary-container text-secondary" : "bg-primary-container text-primary"
                  }`}
                >
                  {e.icon === "palette" && <Palette className="h-4 w-4" />}
                  {e.icon === "utensils" && <Utensils className="h-4 w-4" />}
                  {e.icon === "alert" && <AlertTriangle className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${e.important ? "text-secondary" : "text-muted-foreground"}`}>
                    {e.time} · {e.tag}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold text-foreground">{e.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
                  {e.image && (
                    <img src={e.image} alt="" loading="lazy" className="mt-3 h-24 w-24 rounded-xl object-cover" />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Health snapshot */}
      <section className="mx-6 mt-5 rounded-[2rem] bg-surface-low p-5">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
          <Heart className="h-4 w-4 fill-destructive text-destructive" /> Health Snapshot
        </h2>
        <div className="mt-3 space-y-2.5 text-sm">
          <Row label="Last Nap" value="1:15 PM (45m)" />
          <Row label="Mood" value="Energetic" />
          <Row label="Diapers" value="3 changes today" />
        </div>
      </section>

      {/* Weather */}
      <section
        className="mx-6 mt-5 rounded-[2rem] p-6 text-center"
        style={{ background: "var(--gradient-primary)", color: "var(--primary-foreground)" }}
      >
        <Cloud className="mx-auto h-7 w-7 opacity-90" />
        <p className="mt-2 font-display text-4xl font-extrabold tracking-tight">68°F</p>
        <p className="text-sm opacity-90">Partly Cloudy</p>
        <p className="mx-auto mt-3 max-w-[16rem] text-xs leading-relaxed opacity-80">
          Perfect weather for afternoon outdoor play in the sensory garden.
        </p>
      </section>
    </>
  );
}

function Chip({ children, icon, accent }: { children: React.ReactNode; icon: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
        accent ? "bg-secondary-container text-secondary" : "bg-card text-foreground"
      }`}
      style={{ boxShadow: "0 1px 2px rgba(36,50,79,0.04)" }}
    >
      {icon}
      {children}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
