import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { calendar, meals, children } from "@/lib/mock";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_tabs/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Digital Sanctuary" },
      { name: "description", content: "Upcoming events, deadlines, and the weekly meal menu." },
    ],
  }),
  component: CalendarPage,
});

const colorMap = {
  primary: "bg-primary-container text-primary",
  secondary: "bg-secondary-container text-secondary",
  warning: "bg-warning/30 text-warning-foreground",
  destructive: "bg-destructive/15 text-destructive",
} as const;

function CalendarPage() {
  return (
    <>
      <AppHeader action="bell" />

      <section className="px-6 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Schedule</p>
        <h1 className="mt-1 font-display text-4xl font-extrabold leading-tight text-foreground">
          April<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Upcoming events and reminders</p>
      </section>

      <section className="mt-5 space-y-3 px-6">
        {calendar.map((e) => (
          <article key={e.title} className="flex items-center gap-4 rounded-3xl bg-card p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
            <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl ${colorMap[e.color as keyof typeof colorMap]}`}>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{e.date.split(" ")[0]}</span>
              <span className="font-display text-xl font-extrabold leading-none">{e.date.split(" ")[1]}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{e.tag}</p>
              <h3 className="mt-0.5 font-display text-base font-bold text-foreground">{e.title}</h3>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Nutrition & Wellness</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold leading-tight text-foreground">Weekly Meal Menu</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Week of Oct 23</p>
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
                      const allergy = t.toLowerCase().includes("allergy") || t.toLowerCase().includes("dairy");
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
      </section>
    </>
  );
}
