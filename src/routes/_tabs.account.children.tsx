import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Cake, ChevronRight, Plus, School } from "lucide-react";
import { SubPageHeader } from "@/components/SubPageHeader";
import { children } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/account/children")({
  head: () => ({ meta: [{ title: "Linked children — Digital Sanctuary" }] }),
  component: LinkedChildrenPage,
});

function LinkedChildrenPage() {
  return (
    <>
      <SubPageHeader title="Linked children" />
      <section className="px-6 pt-2">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground">
          Your family<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You manage {children.length} children under one Digital Sanctuary account.
        </p>
      </section>

      <section className="mt-5 space-y-3 px-6">
        {children.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="overflow-hidden rounded-[1.75rem] bg-card"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center gap-4 p-4">
              <img src={c.avatar} alt="" className="h-16 w-16 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-bold text-foreground">{c.name} Dupont</p>
                <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <School className="h-3 w-3" /> {c.room}
                </p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Cake className="h-3 w-3" /> {c.cycle === "CYCLE_0" ? "Nursery (0–3)" : "Preschool (3–6)"}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-3 border-t border-border text-center">
              <Stat label="Status" value={c.status} />
              <Stat label="Mood" value={c.mood.split(" ")[0]} />
              <Stat label="Educator" value={c.id === "lea" ? "Mme J." : "Mme M."} />
            </div>
          </motion.div>
        ))}

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-surface-low/40 px-5 py-4 text-sm font-semibold text-muted-foreground"
        >
          <Plus className="h-4 w-4" /> Request to add another child
        </motion.button>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-border px-2 py-3 last:border-r-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs font-bold text-foreground">{value}</p>
    </div>
  );
}
