import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, HeartPulse, Users, Palmtree, MoreHorizontal, Info, CheckCircle2 } from "lucide-react";
import { children } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/absence")({
  head: () => ({
    meta: [
      { title: "Declare Absence — Digital Sanctuary" },
      { name: "description", content: "Notify the school when your child will be absent." },
    ],
  }),
  component: AbsencePage,
});

const reasons = [
  { id: "sick", label: "Sick", icon: HeartPulse },
  { id: "family", label: "Family", icon: Users },
  { id: "vacation", label: "Vacation", icon: Palmtree },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

function AbsencePage() {
  const [child, setChild] = useState(children[0].id);
  const [reason, setReason] = useState("sick");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <motion.header initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-3 px-6 pt-6">
        <Link to="/children" className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-surface-low">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="font-display text-lg font-bold text-primary">Digital Sanctuary</span>
      </motion.header>

      <section className="px-6 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Form P-34 · Leave Management</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-foreground">Declare Absence</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Ensure the safety and scheduling of your child by documenting any upcoming time away from the sanctuary.
        </p>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mt-6 rounded-3xl bg-surface-low p-5"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Users className="h-4 w-4" />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold text-foreground">Student Identity</h2>
        <p className="mt-1 text-xs text-muted-foreground">Select which child will be absent.</p>
        <div className="mt-4 space-y-2">
          {children.map((c) => {
            const sel = child === c.id;
            return (
              <motion.button
                key={c.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setChild(c.id)}
                className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors ${
                  sel ? "bg-card ring-2 ring-primary" : "bg-card/60"
                }`}
                style={sel ? { boxShadow: "var(--shadow-soft)" } : undefined}
              >
                <img src={c.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className={`font-display text-sm font-bold ${sel ? "text-foreground" : "text-foreground/70"}`}>{c.name}</p>
                  <p className="text-xs text-muted-foreground">Class: {c.room}</p>
                </div>
                {sel && <CheckCircle2 className="h-5 w-5 text-primary" />}
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-6 mt-4 flex gap-3 rounded-2xl bg-secondary-container p-4"
      >
        <Info className="h-4 w-4 shrink-0 text-secondary" />
        <div>
          <p className="text-sm font-bold text-secondary">Notice Period</p>
          <p className="mt-0.5 text-xs leading-snug text-secondary/90">
            Absence declarations for vacations should ideally be submitted 48 hours in advance.
          </p>
        </div>
      </motion.div>

      <section className="mx-6 mt-4 rounded-3xl bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="From" />
          <Field label="To" />
        </div>

        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Primary Reason</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {reasons.map((r) => {
            const sel = reason === r.id;
            return (
              <motion.button
                key={r.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setReason(r.id)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl py-4 transition-colors ${
                  sel ? "bg-primary text-primary-foreground" : "bg-surface-low text-foreground"
                }`}
              >
                <r.icon className="h-4 w-4" />
                <span className="text-xs font-bold">{r.label}</span>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Additional Notes (Optional)</p>
        <textarea
          rows={4}
          placeholder="Briefly describe any specific instructions or context…"
          className="mt-2 w-full resize-none rounded-2xl bg-surface-low p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
          onClick={() => setSubmitted(true)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-float)" }}
        >
          Submit Absence <ArrowRight className="h-4 w-4" />
        </motion.button>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          By submitting, you notify the lead educator and management immediately.
        </p>
      </section>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-md sm:items-center"
            onClick={() => setSubmitted(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[440px] rounded-t-[2rem] bg-card p-8 text-center sm:rounded-[2rem]"
              style={{ boxShadow: "var(--shadow-float)" }}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.1 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/30 text-success-foreground"
              >
                <CheckCircle2 className="h-8 w-8" />
              </motion.span>
              <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Absence Recorded</h3>
              <p className="mt-2 text-sm text-muted-foreground">The lead educator and director have been notified.</p>
              <button onClick={() => setSubmitted(false)} className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground">
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label }: { label: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <input
        type="date"
        className="mt-1.5 w-full rounded-2xl bg-surface-low px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
