import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  HelpCircle,
  LifeBuoy,
  LogOut,
  Pencil,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { billing, children, parent } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/account/")({
  head: () => ({
    meta: [
      { title: "Account — Digital Sanctuary" },
      { name: "description", content: "Your family dashboard: profile, linked children, payments, security and preferences." },
    ],
  }),
  component: AccountDashboard,
});

function AccountDashboard() {
  return (
    <>
      <AppHeader />

      {/* Profile hero */}
      <section className="px-6 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Your account</p>
        <h1 className="mt-1 font-display text-[2.5rem] font-extrabold leading-[1.05] text-foreground">
          Hi {parent.name}<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A quick overview of your family, your billing, and the settings that keep everyone in sync.
        </p>

        <div
          className="mt-5 flex items-center gap-4 rounded-[1.75rem] bg-card p-4"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <img src={parent.avatar} alt="" className="h-14 w-14 rounded-2xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-bold text-foreground">{parent.name} Dupont</p>
            <p className="truncate text-xs text-muted-foreground">marie.dupont@mail.com · Primary guardian</p>
          </div>
          <motion.div whileTap={{ scale: 0.94 }}>
            <Link
              to="/account/profile"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <Pencil className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="mt-6 grid grid-cols-2 gap-3 px-6">
        <StatCard
          tone="primary"
          label="Next invoice"
          value={`€${billing.invoice}`}
          hint={`Due ${billing.due}`}
          icon={Wallet}
          to="/account/payments"
        />
        <StatCard
          tone="secondary"
          label="Linked children"
          value={`${children.length}`}
          hint="Léa & Noah"
          icon={Users}
          to="/account/children"
        />
        <StatCard
          tone="success"
          label="Notifications"
          value="On"
          hint="Push · email"
          icon={Bell}
          to="/account/preferences"
        />
        <StatCard
          tone="warning"
          label="Security"
          value="Strong"
          hint="Face ID active"
          icon={ShieldCheck}
          to="/account/security"
        />
      </section>

      {/* Family card */}
      <section className="mx-6 mt-6 overflow-hidden rounded-[1.75rem] bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">Family</p>
            <h2 className="mt-1 font-display text-xl font-bold text-foreground">Linked children</h2>
          </div>
          <motion.div whileTap={{ scale: 0.94 }}>
            <Link to="/account/children" className="text-xs font-semibold text-primary inline-flex items-center gap-1">
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>
        </div>
        <div className="mt-4 flex gap-3">
          {children.map((c) => (
            <div key={c.id} className="flex-1 rounded-2xl bg-surface-low p-3">
              <img src={c.avatar} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <p className="mt-2 font-display text-sm font-bold text-foreground">{c.name}</p>
              <p className="text-[11px] text-muted-foreground">{c.room}</p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/20 px-2 py-0.5 text-[10px] font-semibold text-success-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Sub-pages — Family & Safety */}
      <Group title="Family & Safety">
        <Row to="/account/children" icon={Users} label="Linked children" hint="2 children" />
        <Row to="/account/security" icon={ShieldCheck} label="Authorized pickup" hint="2 contacts" />
      </Group>

      {/* Sub-pages — Billing */}
      <Group title="Billing">
        <Row to="/account/payments" icon={CreditCard} label="Payment Hub" hint={`€${billing.invoice} due`} accent />
        <Row to="/account/payments" icon={FileText} label="Invoice history" />
      </Group>

      {/* Sub-pages — Preferences */}
      <Group title="Preferences & support">
        <Row to="/account/preferences" icon={Bell} label="Notification preferences" />
        <Row to="/account/security" icon={ShieldCheck} label="Account security" />
        <Row to="/account/help" icon={HelpCircle} label="Help & support" />
      </Group>

      {/* Demo: alternate interfaces */}
      <section className="mt-7 px-6">
        <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Demo · other roles</h2>
        <div className="grid grid-cols-2 gap-3">
          <motion.div whileTap={{ scale: 0.97 }}>
            <Link
              to="/educator/report"
              className="block rounded-2xl bg-card p-4"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                <Pencil className="h-4 w-4" />
              </span>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Educator</p>
              <p className="mt-1 font-display text-base font-extrabold text-foreground">Voice report</p>
              <p className="text-[11px] text-muted-foreground">Record & transcribe</p>
            </Link>
          </motion.div>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Link
              to="/direction"
              className="block rounded-2xl bg-card p-4"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Direction</p>
              <p className="mt-1 font-display text-base font-extrabold text-foreground">Cockpit</p>
              <p className="text-[11px] text-muted-foreground">Staff · parents · budget</p>
            </Link>
          </motion.div>
        </div>
      </section>



      {/* Sign out */}
      <section className="px-6 pt-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-surface-low px-6 py-4 text-sm font-semibold text-destructive"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </motion.button>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">Digital Sanctuary · v1.0.0</p>
      </section>
    </>
  );
}

function StatCard({
  tone,
  label,
  value,
  hint,
  icon: Icon,
  to,
}: {
  tone: "primary" | "secondary" | "success" | "warning";
  label: string;
  value: string;
  hint: string;
  icon: typeof LifeBuoy;
  to: string;
}) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/15 text-secondary",
    success: "bg-success/20 text-success-foreground",
    warning: "bg-warning/20 text-warning-foreground",
  };
  return (
    <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }}>
      <Link
        to={to as never}
        className="block rounded-2xl bg-card p-4"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-2xl font-extrabold text-foreground">{value}</p>
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      </Link>
    </motion.div>
  );
}

function Group({ title, children: kids }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7 px-6">
      <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h2>
      <div className="overflow-hidden rounded-3xl bg-surface-low">{kids}</div>
    </section>
  );
}

function Row({
  to,
  icon: Icon,
  label,
  hint,
  badge,
  accent,
}: {
  to: string;
  icon: typeof LifeBuoy;
  label: string;
  hint?: string;
  badge?: string;
  accent?: boolean;
}) {
  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Link
        to={to as never}
        className="flex w-full items-center gap-3 border-b border-border px-5 py-4 last:border-b-0 transition-colors hover:bg-card"
      >
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            accent ? "bg-primary text-primary-foreground" : "bg-card text-primary"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="flex-1 text-sm font-semibold text-foreground">{label}</span>
        {hint && <span className="text-[11px] font-semibold text-muted-foreground">{hint}</span>}
        {badge && (
          <span className="rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
            {badge}
          </span>
        )}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </motion.div>
  );
}
