import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Check, ChevronRight, FileText, MessageSquare, Settings, LogOut, ShieldCheck, CalendarOff } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { billing, parent } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/account")({
  head: () => ({
    meta: [
      { title: "Account — Digital Sanctuary" },
      { name: "description", content: "Manage tuition, payments, and your family's account settings." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <>
      <AppHeader />
      <section className="px-6 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Hi {parent.name}</p>
        <h1 className="mt-1 font-display text-[2.75rem] font-extrabold leading-[1.02] text-foreground">
          Payments Hub<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Manage your family's tuition, activity fees, and view your transaction history securely.
        </p>
      </section>

      {/* Invoice card */}
      <section className="mx-6 mt-6 overflow-hidden rounded-[2rem] bg-card p-6" style={{ boxShadow: "var(--shadow-soft)" }}>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">Current Invoice</p>
        <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-foreground">
          €{billing.invoice}
          <span className="text-2xl text-muted-foreground">.00</span>
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" /> Due {billing.due}
        </p>
        <button
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-float)" }}
        >
          Pay Now <ArrowRight className="h-4 w-4" />
        </button>
      </section>

      {/* Breakdown */}
      <section className="mt-8 px-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Tuition Breakdown</h2>
        <div className="mt-4 space-y-3">
          {billing.breakdown.map((b) => (
            <div key={b.child} className="rounded-3xl bg-surface-low p-5">
              <div className="flex items-center gap-3">
                <img src={b.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="font-display text-base font-bold text-foreground">{b.child}</p>
                  <p className="text-xs text-muted-foreground">{b.program}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                {b.lines.map((l) => (
                  <div key={l.label} className="flex justify-between">
                    <span className="text-muted-foreground">{l.label}</span>
                    <span className="font-semibold text-foreground">€{l.amount}.00</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3">
                <span className="text-sm font-bold text-foreground">Subtotal</span>
                <span className="font-display text-base font-bold text-foreground">€{b.subtotal}.00</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="mx-6 mt-6 rounded-[2rem] bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-foreground">Recent History</h2>
          <button className="text-sm font-semibold text-primary">View All</button>
        </div>
        <ul className="mt-4 space-y-4">
          {billing.history.map((h) => (
            <li key={h.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success/25 text-success-foreground">
                <Check className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{h.label}</p>
                <p className="text-xs text-muted-foreground">{h.date}</p>
              </div>
              <span className="font-display text-sm font-bold text-foreground">€{h.amount}.00</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Account links */}
      <section className="mt-8 px-6">
        <h2 className="font-display text-xl font-bold text-foreground">Account</h2>
        <div className="mt-4 overflow-hidden rounded-3xl bg-surface-low">
          {[
            { icon: FileText, label: "Annual Feedback 2025", hint: "New" },
            { icon: MessageSquare, label: "Communication preferences" },
            { icon: Settings, label: "Family details & emergency contacts" },
            { icon: LogOut, label: "Sign out" },
          ].map((item, i, arr) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-card ${
                i < arr.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <item.icon className="h-4 w-4 text-primary" />
              <span className="flex-1 text-sm font-semibold text-foreground">{item.label}</span>
              {item.hint && <span className="rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">{item.hint}</span>}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
