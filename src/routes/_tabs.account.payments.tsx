import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Check, FileText } from "lucide-react";
import { SubPageHeader } from "@/components/SubPageHeader";
import { billing } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/account/payments")({
  head: () => ({
    meta: [
      { title: "Payment Hub — Digital Sanctuary" },
      { name: "description", content: "Family tuition, activity fees, and transaction history." },
    ],
  }),
  component: PaymentsPage,
});

function PaymentsPage() {
  return (
    <>
      <SubPageHeader title="Payment Hub" />
      <section className="px-6 pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Family invoice</p>
        <h1 className="mt-1 font-display text-[2.5rem] font-extrabold leading-[1.05] text-foreground">
          Payment Hub<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          One family invoice for both children, with a clear per-child breakdown.
        </p>
      </section>

      {/* Invoice card */}
      <section className="mx-6 mt-6 overflow-hidden rounded-[2rem] bg-card p-6" style={{ boxShadow: "var(--shadow-soft)" }}>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">Current invoice — April 2025</p>
        <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-foreground">
          €{billing.invoice}
          <span className="text-2xl text-muted-foreground">.00</span>
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" /> Due {billing.due}
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-float)" }}
        >
          Pay now <ArrowRight className="h-4 w-4" />
        </motion.button>
      </section>

      {/* Breakdown */}
      <section className="mt-8 px-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Breakdown</h2>
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
          <div className="flex justify-between rounded-3xl bg-primary-container p-5">
            <span className="font-display text-base font-bold text-primary">Total due</span>
            <span className="font-display text-xl font-extrabold text-primary">€{billing.invoice}.00</span>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="mx-6 mt-6 rounded-[2rem] bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-foreground">Recent history</h2>
          <button className="text-sm font-semibold text-primary">View all</button>
        </div>
        <ul className="mt-4 space-y-3">
          {billing.history.map((h) => (
            <li key={h.id} className="flex items-center gap-3 rounded-2xl bg-surface-low p-3">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${h.late ? "bg-warning/25 text-warning-foreground" : "bg-success/25 text-success-foreground"}`}>
                <Check className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{h.label}</p>
                <p className="text-xs text-muted-foreground">{h.date}</p>
              </div>
              <span className="font-display text-sm font-bold text-foreground">€{h.amount}.00</span>
              <motion.button whileTap={{ scale: 0.92 }} className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary" aria-label="Download receipt">
                <FileText className="h-4 w-4" />
              </motion.button>
            </li>
          ))}
        </ul>
      </section>

      <div className="h-6" />
    </>
  );
}
