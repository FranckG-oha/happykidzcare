import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, UserPlus, QrCode, MoreVertical, ShieldCheck, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { authorizedContacts } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/security")({
  head: () => ({
    meta: [
      { title: "Security & Pickup — Digital Sanctuary" },
      { name: "description", content: "Manage trusted individuals authorized to pick up your children." },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  const [showCode, setShowCode] = useState<string | null>(null);
  const active = authorizedContacts.find((c) => c.id === showCode);

  return (
    <>
      <motion.header initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-3 px-6 pt-6">
        <Link to="/account" className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-surface-low">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="font-display text-lg font-bold text-primary">Digital Sanctuary</span>
      </motion.header>

      <section className="px-6 pt-4">
        <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground">Security & Pickup</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Manage the trusted individuals authorized to pick up your children.
        </p>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mt-6 flex items-center justify-between gap-3 rounded-3xl bg-card p-4"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <div className="min-w-0">
          <p className="font-display text-base font-bold text-foreground">Add New Contact</p>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">Authorize a new family member or caregiver.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.94 }}
          whileHover={{ y: -2 }}
          className="flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-xs font-bold text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-float)" }}
        >
          <UserPlus className="h-4 w-4" /> Add Person
        </motion.button>
      </motion.section>

      <section className="mt-8 px-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Active Authorizations</h2>
        <div className="mt-4 space-y-4">
          {authorizedContacts.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="rounded-3xl bg-surface-low p-4"
            >
              <div className="flex items-center gap-3">
                <img src={c.avatar} alt={c.name} width={56} height={56} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-bold text-foreground">{c.name}</p>
                  <span className="mt-1 inline-block rounded-full bg-secondary-container px-2.5 py-0.5 text-[11px] font-bold text-secondary">
                    {c.relation}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowCode(c.id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-card py-3 text-sm font-bold text-primary"
                >
                  <QrCode className="h-4 w-4" /> Show Code
                </motion.button>
                <motion.button whileTap={{ scale: 0.92 }} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card text-muted-foreground">
                  <MoreVertical className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-6 mt-6 flex gap-3 rounded-3xl bg-primary-container p-5"
      >
        <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-display text-sm font-bold text-foreground">Security Protocols</p>
          <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">
            Authorized persons must present their personal QR code upon arrival. IDs may still be requested for unfamiliar individuals to ensure the highest safety standards.
          </p>
        </div>
      </motion.section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCode(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-[2rem] bg-card p-6 text-center"
              style={{ boxShadow: "var(--shadow-float)" }}
            >
              <button onClick={() => setShowCode(null)} className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-surface-low text-foreground">
                <X className="h-4 w-4" />
              </button>
              <img src={active.avatar} alt="" width={72} height={72} className="mx-auto h-18 w-18 rounded-full object-cover" />
              <p className="mt-3 font-display text-2xl font-bold text-foreground">{active.name}</p>
              <p className="text-xs font-semibold text-secondary">{active.relation}</p>
              <div className="mx-auto mt-5 grid h-44 w-44 grid-cols-8 grid-rows-8 gap-0.5 rounded-2xl bg-foreground p-3">
                {Array.from({ length: 64 }).map((_, i) => (
                  <span key={i} className="rounded-[2px]" style={{ background: Math.random() > 0.5 ? "var(--background)" : "transparent" }} />
                ))}
              </div>
              <p className="mt-4 font-mono text-sm font-bold tracking-widest text-foreground">{active.code}</p>
              <p className="mt-1 text-xs text-muted-foreground">Personal access code</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
