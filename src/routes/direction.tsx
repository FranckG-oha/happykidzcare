import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  Users,
  GraduationCap,
  MessageSquare,
  BarChart3,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  TrendingUp,
  TrendingDown,
  Mail,
  Send,
  Plus,
  Search,
  CalendarDays,
  Receipt,
  CircleDollarSign,
} from "lucide-react";

export const Route = createFileRoute("/direction")({
  component: DirectionApp,
  head: () => ({
    meta: [
      { title: "Direction · Sanctuary" },
      { name: "description", content: "Direction dashboard — school management cockpit." },
    ],
  }),
});

type TabKey = "overview" | "educators" | "parents" | "analytics" | "budget";

const TABS: { key: TabKey; label: string; icon: typeof Users }[] = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "educators", label: "Staff", icon: GraduationCap },
  { key: "parents", label: "Parents", icon: MessageSquare },
  { key: "analytics", label: "Analytics", icon: TrendingUp },
  { key: "budget", label: "Budget", icon: Wallet },
];

// ---------- Mock data ----------
const kpis = [
  { label: "Children present", value: "82", total: "/ 96", delta: "+4", trend: "up" as const, accent: "primary" as const },
  { label: "Staff on duty", value: "14", total: "/ 16", delta: "2 absent", trend: "down" as const, accent: "warning" as const },
  { label: "Reports today", value: "76", total: "/ 82", delta: "93%", trend: "up" as const, accent: "primary" as const },
  { label: "Open incidents", value: "2", total: "", delta: "needs review", trend: "down" as const, accent: "destructive" as const },
];

const alerts = [
  { id: 1, level: "alert" as const, title: "Incident — Sunflower Room", body: "Minor knee scrape · Léa B. (Cycle 0) — parent informed", time: "11:42" },
  { id: 2, level: "warn" as const, title: "Late daily report", body: "Buttercup Class — 6 reports still pending", time: "16:55" },
  { id: 3, level: "info" as const, title: "Vaccination deadline", body: "4 children due before May 02", time: "today" },
];

const classes = [
  { name: "Sunflower Room", cycle: "Cycle 0", present: 14, total: 16, lead: "Mme Johnson", reports: "14/14" },
  { name: "Buttercup Class", cycle: "Cycle 1", present: 22, total: 24, lead: "M. Diallo", reports: "18/22" },
  { name: "Tulip Group", cycle: "Cycle 0", present: 12, total: 14, lead: "Mme Sané", reports: "12/12" },
  { name: "Poppy Class", cycle: "Cycle 1", present: 18, total: 20, lead: "M. Bamba", reports: "16/18" },
  { name: "Lily Room", cycle: "Cycle 0", present: 16, total: 22, lead: "Mme Aké", reports: "16/16" },
];

const staff = [
  { id: 1, name: "Mme Johnson", role: "Lead · Sunflower", status: "On duty", since: "07:30", reports: 14, rate: 100 },
  { id: 2, name: "M. Diallo", role: "Lead · Buttercup", status: "On duty", since: "07:45", reports: 18, rate: 82 },
  { id: 3, name: "Mme Sané", role: "Lead · Tulip", status: "On duty", since: "07:30", reports: 12, rate: 100 },
  { id: 4, name: "M. Bamba", role: "Lead · Poppy", status: "Break", since: "12:00", reports: 16, rate: 89 },
  { id: 5, name: "Mme Aké", role: "Lead · Lily", status: "On duty", since: "07:30", reports: 16, rate: 100 },
  { id: 6, name: "Mme Konaté", role: "Assistant", status: "Absent", since: "—", reports: 0, rate: 0 },
];

const announcements = [
  { id: 1, title: "Spring Festival — Friday April 20", audience: "All parents", sent: "Yesterday", reach: "94 read · 96 sent" },
  { id: 2, title: "Menu change Thursday", audience: "Cycle 0 parents", sent: "Apr 14", reach: "38 read · 42 sent" },
  { id: 3, title: "Bus A delay this morning", audience: "Bus A families", sent: "Apr 12", reach: "18 read · 18 sent" },
];

const parentThreads = [
  { id: 1, parent: "Mme Bamba", child: "Léa", topic: "Allergy form follow-up", unread: 2, time: "10m" },
  { id: 2, parent: "M. Koffi", child: "Noah", topic: "Pickup change tomorrow", unread: 1, time: "1h" },
  { id: 3, parent: "Mme Yao", child: "Aïcha", topic: "Thank you note", unread: 0, time: "3h" },
];

const analyticsCards = [
  { label: "Average attendance", value: "92%", delta: "+3% vs last month", trend: "up" as const },
  { label: "Daily reports rate", value: "94%", delta: "+1% vs last month", trend: "up" as const },
  { label: "Parent satisfaction", value: "4.7", total: "/5", delta: "127 ratings", trend: "up" as const },
  { label: "Incidents (30d)", value: "6", delta: "−2 vs prev.", trend: "down" as const },
];

const attendanceWeek = [
  { d: "Mon", v: 88 },
  { d: "Tue", v: 92 },
  { d: "Wed", v: 90 },
  { d: "Thu", v: 95 },
  { d: "Fri", v: 86 },
];

const budgetSummary = {
  collected: 24800,
  expected: 28600,
  overdue: 1240,
  payouts: 18200,
  currency: "€",
};

const invoices = [
  { id: "INV-0421", family: "Famille Bamba", amount: 320, status: "Paid" as const, date: "Apr 28" },
  { id: "INV-0422", family: "Famille Koffi", amount: 280, status: "Pending" as const, date: "Apr 30" },
  { id: "INV-0423", family: "Famille Yao", amount: 410, status: "Overdue" as const, date: "Apr 15" },
  { id: "INV-0424", family: "Famille Touré", amount: 290, status: "Paid" as const, date: "Apr 27" },
  { id: "INV-0425", family: "Famille N'Guessan", amount: 320, status: "Pending" as const, date: "May 02" },
];

const expenseLines = [
  { label: "Salaries", value: 12400, pct: 68 },
  { label: "Supplies & meals", value: 3200, pct: 18 },
  { label: "Maintenance", value: 1400, pct: 8 },
  { label: "Other", value: 1200, pct: 6 },
];

// ---------- Component ----------
function DirectionApp() {
  const [tab, setTab] = useState<TabKey>("overview");

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto min-h-screen w-full max-w-[440px] bg-background pb-24">
        <Header />
        <Tabs current={tab} onChange={setTab} />

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "overview" && <Overview />}
          {tab === "educators" && <EducatorsTab />}
          {tab === "parents" && <ParentsTab />}
          {tab === "analytics" && <AnalyticsTab />}
          {tab === "budget" && <BudgetTab />}
        </motion.div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div
      className="sticky top-0 z-30 bg-background/85 px-5 pb-3 pt-3 backdrop-blur-xl"
      style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-low text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">Direction</p>
          <p className="font-display text-base font-bold text-foreground">Sanctuary · Cocody</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
          K
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Tuesday, April 15 · <span className="font-semibold text-foreground">Good afternoon, Mme Koné</span>
      </p>
    </div>
  );
}

function Tabs({ current, onChange }: { current: TabKey; onChange: (k: TabKey) => void }) {
  return (
    <div className="sticky top-[88px] z-20 bg-background/85 px-3 pb-2 backdrop-blur-xl">
      <div className="flex gap-1 overflow-x-auto rounded-full bg-surface-low p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => {
          const active = t.key === current;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${
                active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Overview ----------
function Overview() {
  return (
    <div className="pt-2">
      <section className="grid grid-cols-2 gap-2.5 px-5">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl bg-card p-3.5" style={{ boxShadow: "var(--shadow-soft)" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{k.label}</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-foreground">{k.value}</span>
              {k.total && <span className="text-xs font-semibold text-muted-foreground">{k.total}</span>}
            </div>
            <div
              className={`mt-1 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                k.accent === "destructive"
                  ? "bg-destructive/10 text-destructive"
                  : k.accent === "warning"
                  ? "bg-warning/20 text-warning-foreground"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {k.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {k.delta}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-5 mt-5 rounded-[1.5rem] bg-card p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-bold text-foreground">Alerts & follow-up</p>
          <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">
            {alerts.length} open
          </span>
        </div>
        <div className="mt-3 space-y-2.5">
          {alerts.map((a) => (
            <div key={a.id} className="flex gap-3 rounded-2xl bg-surface-low p-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  a.level === "alert"
                    ? "bg-destructive/15 text-destructive"
                    : a.level === "warn"
                    ? "bg-warning/30 text-warning-foreground"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {a.level === "alert" ? <AlertTriangle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-bold text-foreground">{a.title}</p>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{a.time}</span>
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-5 mt-5">
        <p className="px-1 font-display text-sm font-bold text-foreground">Classes today</p>
        <div className="mt-2 space-y-2">
          {classes.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3 rounded-2xl bg-card p-3"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-xs font-bold text-foreground">{c.name}</p>
                  <span className="text-[10px] font-bold text-muted-foreground">{c.cycle}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {c.lead} · Reports {c.reports}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-base font-extrabold text-foreground">
                  {c.present}
                  <span className="text-[11px] font-semibold text-muted-foreground">/{c.total}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---------- Staff ----------
function EducatorsTab() {
  return (
    <div className="px-5 pt-3">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-surface-low px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search staff" className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground" />
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "On duty", value: 4, color: "bg-primary/10 text-primary" },
          { label: "Break", value: 1, color: "bg-warning/20 text-warning-foreground" },
          { label: "Absent", value: 1, color: "bg-destructive/10 text-destructive" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-2.5 ${s.color}`}>
            <p className="font-display text-xl font-extrabold">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {staff.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-3 rounded-2xl bg-card p-3"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
              {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs font-bold text-foreground">{s.name}</p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    s.status === "On duty"
                      ? "bg-primary/10 text-primary"
                      : s.status === "Break"
                      ? "bg-warning/25 text-warning-foreground"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {s.status}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {s.role} · since {s.since}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-low">
                  <div className="h-full bg-primary" style={{ width: `${s.rate}%` }} />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground">{s.rate}% reports</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Parents (communication) ----------
function ParentsTab() {
  return (
    <div className="px-5 pt-3">
      <section className="rounded-[1.5rem] bg-card p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-sm font-bold text-foreground">Broadcast</p>
            <p className="text-[11px] text-muted-foreground">Push an announcement to families</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
            <Send className="h-3.5 w-3.5" /> New
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {announcements.map((a) => (
            <div key={a.id} className="rounded-2xl bg-surface-low p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-bold text-foreground">{a.title}</p>
                <span className="shrink-0 text-[10px] text-muted-foreground">{a.sent}</span>
              </div>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{a.audience}</p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-primary">
                <Mail className="h-3 w-3" /> {a.reach}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <p className="px-1 font-display text-sm font-bold text-foreground">Parent threads</p>
        <div className="mt-2 space-y-2">
          {parentThreads.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-2xl bg-card p-3"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-bold text-foreground">
                    {t.parent} <span className="font-normal text-muted-foreground">· {t.child}</span>
                  </p>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{t.time}</span>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{t.topic}</p>
              </div>
              {t.unread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">
                  {t.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---------- Analytics ----------
function AnalyticsTab() {
  const max = Math.max(...attendanceWeek.map((d) => d.v));
  return (
    <div className="px-5 pt-3">
      <section className="grid grid-cols-2 gap-2.5">
        {analyticsCards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-card p-3.5" style={{ boxShadow: "var(--shadow-soft)" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{c.label}</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-foreground">{c.value}</span>
              {c.total && <span className="text-xs font-semibold text-muted-foreground">{c.total}</span>}
            </div>
            <div
              className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold ${
                c.trend === "up" ? "text-primary" : "text-secondary"
              }`}
            >
              {c.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {c.delta}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-5 rounded-[1.5rem] bg-card p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-bold text-foreground">Attendance · this week</p>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-4 flex h-32 items-end justify-between gap-2">
          {attendanceWeek.map((d) => (
            <div key={d.d} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-full w-full items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.v / max) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60"
                />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground">{d.d}</span>
              <span className="text-[10px] font-bold text-foreground">{d.v}%</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-[1.5rem] bg-card p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
        <p className="font-display text-sm font-bold text-foreground">Reports completion · per class</p>
        <div className="mt-3 space-y-3">
          {classes.map((c) => {
            const [done, total] = c.reports.split("/").map((n) => parseInt(n, 10));
            const pct = Math.round((done / total) * 100);
            return (
              <div key={c.name}>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-foreground">{c.name}</span>
                  <span className="font-bold text-muted-foreground">{pct}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-low">
                  <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ---------- Budget ----------
function BudgetTab() {
  const pct = Math.round((budgetSummary.collected / budgetSummary.expected) * 100);
  return (
    <div className="px-5 pt-3">
      <section
        className="rounded-[1.5rem] p-4 text-primary-foreground"
        style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dim))" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">April · Collected</p>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-extrabold">
            {budgetSummary.currency}
            {budgetSummary.collected.toLocaleString()}
          </span>
          <span className="text-xs opacity-80">
            / {budgetSummary.currency}
            {budgetSummary.expected.toLocaleString()}
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-primary-foreground/90" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
          <span>{pct}% collected</span>
          <span>
            {budgetSummary.currency}
            {budgetSummary.overdue} overdue
          </span>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-card p-3.5" style={{ boxShadow: "var(--shadow-soft)" }}>
          <CircleDollarSign className="h-4 w-4 text-primary" />
          <p className="mt-1.5 font-display text-xl font-extrabold text-foreground">
            {budgetSummary.currency}
            {budgetSummary.payouts.toLocaleString()}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expenses · April</p>
        </div>
        <div className="rounded-2xl bg-card p-3.5" style={{ boxShadow: "var(--shadow-soft)" }}>
          <Receipt className="h-4 w-4 text-secondary" />
          <p className="mt-1.5 font-display text-xl font-extrabold text-foreground">
            {budgetSummary.currency}
            {(budgetSummary.collected - budgetSummary.payouts).toLocaleString()}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Net cashflow</p>
        </div>
      </section>

      <section className="mt-5 rounded-[1.5rem] bg-card p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
        <p className="font-display text-sm font-bold text-foreground">Expense breakdown</p>
        <div className="mt-3 space-y-2.5">
          {expenseLines.map((e) => (
            <div key={e.label}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-foreground">{e.label}</span>
                <span className="font-bold text-muted-foreground">
                  {budgetSummary.currency}
                  {e.value.toLocaleString()}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-low">
                <div className="h-full bg-secondary" style={{ width: `${e.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between px-1">
          <p className="font-display text-sm font-bold text-foreground">Invoices</p>
          <button className="flex items-center gap-1 text-[11px] font-bold text-primary">
            <FileText className="h-3 w-3" /> Export
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {invoices.map((i) => (
            <div
              key={i.id}
              className="flex items-center gap-3 rounded-2xl bg-card p-3"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  i.status === "Paid"
                    ? "bg-primary/10 text-primary"
                    : i.status === "Overdue"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-warning/25 text-warning-foreground"
                }`}
              >
                {i.status === "Paid" ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-foreground">{i.family}</p>
                <p className="text-[11px] text-muted-foreground">
                  {i.id} · due {i.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-sm font-extrabold text-foreground">
                  {budgetSummary.currency}
                  {i.amount}
                </p>
                <p
                  className={`text-[10px] font-bold ${
                    i.status === "Paid"
                      ? "text-primary"
                      : i.status === "Overdue"
                      ? "text-destructive"
                      : "text-warning-foreground"
                  }`}
                >
                  {i.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
