import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Heart, Utensils, Moon, Baby } from "lucide-react";
import { children, todayTimeline, milestones } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/children")({
  head: () => ({
    meta: [
      { title: "Children — Digital Sanctuary" },
      { name: "description", content: "Daily reports, evaluations, and gallery for each of your children." },
    ],
  }),
  component: ChildrenPage,
});

const tabs = ["Today", "Reports", "Gallery", "Evaluations"] as const;

function ChildrenPage() {
  const [child, setChild] = useState(children[0].id);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Today");
  const active = children.find((c) => c.id === child)!;

  return (
    <>
      <AppHeader />

      {/* Child switcher */}
      <section className="mt-3 flex gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children.map((c) => {
          const sel = c.id === child;
          return (
            <button
              key={c.id}
              onClick={() => setChild(c.id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-full p-1.5 pr-4 transition-all ${
                sel ? "bg-primary-container" : "bg-card"
              }`}
            >
              <img src={c.avatar} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
              <div className="text-left">
                <div className="font-display text-sm font-bold leading-tight text-foreground">{c.name}</div>
                <div className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground">{c.cycle}</div>
              </div>
            </button>
          );
        })}
      </section>

      {/* Tabs */}
      <nav className="mt-4 flex gap-1 px-6">
        {tabs.map((t) => {
          const sel = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                sel ? "bg-primary-container text-primary" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          );
        })}
      </nav>

      {tab === "Today" && <TodayView />}
      {tab === "Reports" && <ReportsView childName={active.name} />}
      {tab === "Gallery" && <GalleryQuickView />}
      {tab === "Evaluations" && <EvaluationsView />}
    </>
  );
}

function TodayView() {
  return (
    <>
      {/* Reminder */}
      <div className="mx-6 mt-5 flex items-start gap-3 rounded-2xl bg-secondary-container/60 p-4">
        <span className="mt-0.5 text-secondary">●</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">Important Reminder</p>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary/80">Just now</span>
          </div>
          <p className="mt-1 text-sm leading-snug text-foreground">
            Please pack extra wipes tomorrow for the scheduled messy play activity.
          </p>
        </div>
      </div>

      {/* Day header */}
      <section className="px-6 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-4xl font-extrabold leading-none text-foreground">Tuesday</h1>
            <p className="mt-1 text-sm text-muted-foreground">October 24, 2023</p>
          </div>
          <span className="rounded-full bg-primary-container px-3 py-1.5 text-xs font-semibold text-primary">
            😊 Happy & Playful
          </span>
        </div>
      </section>

      {/* Teacher note */}
      <article className="mx-6 mt-5 rounded-3xl bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">
          <Heart className="h-3.5 w-3.5 fill-destructive text-destructive" /> Teacher's Note
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground">
          "Léa was very enthusiastic during morning story time. She actively participated and even helped hand out
          the picture books to her friends!"
        </p>
        <div className="mt-4 flex items-center gap-2">
          <img src={milestones.teacher.avatar} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
          <span className="text-xs font-semibold text-muted-foreground">Marie D.</span>
        </div>
      </article>

      {/* Care grid */}
      <section className="mx-6 mt-4 grid grid-cols-2 gap-3">
        <CareTile icon={<Utensils className="h-4 w-4" />} label="Meals">
          <div className="mt-3 flex gap-1">
            {[1, 1, 1, 0].map((on, i) => (
              <span key={i} className={`h-2 flex-1 rounded-full ${on ? "bg-primary" : "bg-primary/15"}`} />
            ))}
          </div>
          <p className="mt-2 text-xs font-semibold text-foreground">Ate well today</p>
        </CareTile>
        <CareTile icon={<Moon className="h-4 w-4" />} label="Nap">
          <p className="mt-3 font-display text-2xl font-extrabold text-foreground">1h 45m</p>
          <p className="text-[11px] font-semibold text-muted-foreground">12:30 — 14:15</p>
        </CareTile>
        <CareTile icon={<Baby className="h-4 w-4" />} label="Diapers">
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-container px-2.5 py-1 text-xs font-semibold text-primary">
            <span className="font-display text-base">3</span> Changes today
          </div>
        </CareTile>
        <CareTile icon={<Heart className="h-4 w-4" />} label="Mood">
          <p className="mt-3 font-display text-lg font-bold text-foreground">Energetic</p>
          <p className="text-[11px] text-muted-foreground">Smiled often, eager to engage</p>
        </CareTile>
      </section>

      {/* Today's activities */}
      <section className="mt-6 px-6">
        <h2 className="font-display text-xl font-bold text-foreground">Today's Activities</h2>
        <div className="mt-3 space-y-3">
          {todayTimeline.filter((t) => !t.important).map((t) => (
            <article key={t.id} className="overflow-hidden rounded-3xl bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
              {t.image && <img src={t.image} alt="" loading="lazy" className="h-44 w-full object-cover" />}
              <div className="p-4">
                <span className="inline-block rounded-full bg-secondary-container px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary">
                  {t.tag}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-foreground">{t.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function CareTile({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {icon}
      </div>
      {children}
    </div>
  );
}

function ReportsView({ childName }: { childName: string }) {
  return (
    <div className="px-6 py-8 text-center text-sm text-muted-foreground">
      Weekly reports for <strong className="text-foreground">{childName}</strong> coming soon.
    </div>
  );
}

function GalleryQuickView() {
  return (
    <div className="px-6 py-8 text-center text-sm text-muted-foreground">
      Visit the <Link to="/updates" className="font-semibold text-primary">Updates tab</Link> for the full gallery.
    </div>
  );
}

function EvaluationsView() {
  const m = milestones;
  return (
    <>
      <section className="mt-5 px-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{m.period}</p>
          <button className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">↓ PDF</button>
        </div>

        <div className="relative mt-4">
          <img src={m.child.avatar} alt={m.child.name} width={400} height={400}
            className="aspect-square w-full rounded-[2rem] object-cover" style={{ boxShadow: "var(--shadow-soft)" }} />
          <div className="absolute -bottom-3 left-4 rounded-2xl bg-secondary-container px-3 py-2">
            <p className="font-display text-xl font-extrabold text-secondary leading-none">{m.overall}%</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-secondary">Overall progress</p>
          </div>
        </div>

        <h2 className="mt-8 font-display text-3xl font-extrabold leading-tight text-foreground">
          Spring Growth <span className="text-primary">&</span> Discovery<span className="text-primary">.</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.intro}</p>

        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-primary-container px-3 py-1.5 text-xs font-semibold text-primary">March 2025</span>
          <span className="rounded-full bg-primary-container px-3 py-1.5 text-xs font-semibold text-primary">Mme Johnson's Class</span>
        </div>
      </section>

      <section className="mt-6 space-y-4 px-6">
        {m.domains.map((d) => (
          <div key={d.n} className="rounded-3xl bg-surface-low p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Domain {d.n}</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-foreground">{d.name}</h3>
            <div className="mt-4 space-y-2.5">
              {d.items.map((it) => (
                <div key={it.title} className="flex items-center justify-between rounded-2xl bg-card p-3.5">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{it.title}</p>
                    <p className="text-xs text-muted-foreground">{it.body}</p>
                  </div>
                  <StatusPill status={it.status} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-6 mt-6 rounded-3xl bg-surface-low p-6">
        <p className="text-3xl text-primary leading-none">"</p>
        <h3 className="mt-2 font-display text-xl font-bold text-foreground">Overall Reflection</h3>
        <p className="mt-3 text-[15px] italic leading-relaxed text-foreground">{m.reflection}</p>
        <div className="mt-5 flex items-center gap-3">
          <img src={m.teacher.avatar} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="text-sm font-bold text-foreground">{m.teacher.name}</p>
            <p className="text-xs text-muted-foreground">{m.teacher.role}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function StatusPill({ status }: { status: "Achieved" | "Developing" | "Emerging" }) {
  const styles = {
    Achieved: "bg-success/25 text-success-foreground",
    Developing: "bg-primary-container text-primary",
    Emerging: "bg-secondary-container text-secondary",
  } as const;
  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${styles[status]}`}>
      {status}
    </span>
  );
}
