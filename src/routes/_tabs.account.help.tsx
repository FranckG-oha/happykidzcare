import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";
import { SubPageHeader } from "@/components/SubPageHeader";

const faqs = [
  {
    q: "How do I switch between Léa and Noah?",
    a: "Open the My Children tab. Two cards appear at the top — tap the other child's card to instantly switch. Their reports, gallery, and messages stay isolated.",
  },
  {
    q: "Why do I see one invoice for both children?",
    a: "Digital Sanctuary issues a single family invoice every month. The breakdown shows exactly which charges belong to each child.",
  },
  {
    q: "Who can pick up my child?",
    a: "Only the people listed in Authorized Pickup. Each contact gets a unique 4-digit code shown to the educator at pickup time.",
  },
  {
    q: "How do I declare an absence?",
    a: "Account → Declare an absence. Pick one or both children, the date and a reason. Educators are notified instantly.",
  },
  {
    q: "Can I export my invoices?",
    a: "Yes — open Payment Hub, tap any past invoice and use the share icon to download the PDF receipt.",
  },
];

export const Route = createFileRoute("/_tabs/account/help")({
  head: () => ({ meta: [{ title: "Help & support — Digital Sanctuary" }] }),
  component: HelpPage,
});

function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <SubPageHeader title="Help & support" />
      <section className="px-6 pt-2">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground">
          We're here<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Quick answers, or reach the Sanctuary team directly.
        </p>
      </section>

      <section className="mt-6 grid grid-cols-3 gap-2 px-6">
        <Contact icon={MessageCircle} label="Chat" hint="< 5 min" />
        <Contact icon={Mail} label="Email" hint="24h" />
        <Contact icon={Phone} label="Call" hint="9–18h" />
      </section>

      <section className="mt-7 px-6">
        <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">FAQ</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                layout
                className="overflow-hidden rounded-2xl bg-surface-low"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left"
                >
                  <span className="font-display text-xs font-bold text-primary">0{i + 1}</span>
                  <span className="flex-1 text-sm font-semibold text-foreground">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      <p className="mt-8 text-center text-[11px] text-muted-foreground">Digital Sanctuary · v1.0.0 · build 2026.05</p>
      <div className="h-6" />
    </>
  );
}

function Contact({ icon: Icon, label, hint }: { icon: typeof Mail; label: string; hint: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="flex flex-col items-center gap-1 rounded-2xl bg-card p-4"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="mt-1 text-sm font-bold text-foreground">{label}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{hint}</span>
    </motion.button>
  );
}
