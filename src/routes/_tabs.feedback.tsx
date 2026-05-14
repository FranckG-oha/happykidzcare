import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_tabs/feedback")({
  head: () => ({
    meta: [
      { title: "Annual Feedback — Digital Sanctuary" },
      { name: "description", content: "Share your annual feedback on the school experience." },
    ],
  }),
  component: FeedbackPage,
});

const opts = ["Very Satisfied", "Somewhat Satisfied", "Neutral / Not Sure", "Dissatisfied"];

function FeedbackPage() {
  const [choice, setChoice] = useState<string | null>(null);
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <motion.header initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-3">
          <Link to="/account" className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-surface-low">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="font-display text-lg font-bold text-primary">Digital Sanctuary</span>
        </div>
      </motion.header>

      <section className="px-6 pt-6">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block rounded-full bg-secondary-container px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary"
        >
          Feedback Survey
        </motion.span>
        <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground">
          Annual<br />
          <span className="text-primary">Feedback</span><br />
          2025
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Help us shape the sanctuary where your child grows. Your insights fuel our commitment to excellence.
        </p>
      </section>

      {/* Q1 */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-10 px-6">
        <div className="flex items-start gap-3">
          <span className="font-display text-3xl font-extrabold text-primary/30">01</span>
          <p className="mt-2 font-display text-base font-bold text-foreground">How satisfied are you with school communication?</p>
        </div>
        <div className="mt-4 space-y-2">
          {opts.map((o) => {
            const sel = choice === o;
            return (
              <motion.button
                key={o}
                whileTap={{ scale: 0.98 }}
                onClick={() => setChoice(o)}
                className="flex w-full items-center gap-3 rounded-full bg-card px-4 py-3.5 text-left transition-colors"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full ring-2 ${sel ? "ring-primary bg-primary" : "ring-border"}`}>
                  <AnimatePresence>
                    {sel && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="h-2 w-2 rounded-full bg-card" />
                    )}
                  </AnimatePresence>
                </span>
                <span className="text-sm font-semibold text-foreground">{o}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Q2 */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8 px-6">
        <div className="flex items-start gap-3">
          <span className="font-display text-3xl font-extrabold text-primary/30">02</span>
          <p className="mt-2 font-display text-base font-bold text-foreground">Rate the quality of activities</p>
        </div>
        <div className="mt-4 rounded-3xl bg-surface-low py-8 text-center">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => {
              const filled = (hover || rating) >= n;
              return (
                <motion.button
                  key={n}
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ y: -2 }}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(n)}
                >
                  <Star className={`h-7 w-7 transition-colors ${filled ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
                </motion.button>
              );
            })}
          </div>
          <motion.p key={rating} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-sm font-semibold text-foreground">
            {rating}.0 — {["", "Needs Work", "Fair", "Good", "High Engagement", "Excellent"][rating]}
          </motion.p>
        </div>
      </motion.section>

      {/* Q3 */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-8 px-6">
        <div className="flex items-start gap-3">
          <span className="font-display text-3xl font-extrabold text-primary/30">03</span>
          <p className="mt-2 font-display text-base font-bold text-foreground">Any suggestions?</p>
        </div>
        <div className="relative mt-4">
          <textarea
            rows={5}
            placeholder="Tell us what's on your mind…"
            className="w-full resize-none rounded-3xl bg-surface-low p-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <span className="absolute bottom-3 right-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Optional</span>
        </div>
      </motion.section>

      <section className="px-6 pt-8">
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
          onClick={() => setSubmitted(true)}
          className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-float)" }}
        >
          Submit Feedback <ArrowRight className="h-4 w-4" />
        </motion.button>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Your response will be recorded for the 2024-2025 academic cycle.
        </p>
      </section>

      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-6 backdrop-blur-md"
            onClick={() => setSubmitted(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="w-full max-w-sm rounded-[2rem] bg-card p-8 text-center"
              style={{ boxShadow: "var(--shadow-float)" }}
            >
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.1 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/30 text-success-foreground">
                <CheckCircle2 className="h-8 w-8" />
              </motion.span>
              <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Thank You</h3>
              <p className="mt-2 text-sm text-muted-foreground">Your feedback shapes our sanctuary.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
