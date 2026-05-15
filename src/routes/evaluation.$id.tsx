import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft, Download } from "lucide-react";
import { evaluationDetail, children } from "@/lib/mock";

export const Route = createFileRoute("/evaluation/$id")({
  head: () => ({ meta: [{ title: "Evaluation — Digital Sanctuary" }] }),
  loader: ({ params }) => {
    const ev = evaluationDetail[params.id];
    if (!ev) throw notFound();
    return { ev };
  },
  component: EvaluationPage,
  notFoundComponent: () => (
    <div className="p-6 text-center">
      <p className="font-display text-lg font-bold text-foreground">Evaluation not found</p>
      <Link to="/children" className="mt-2 inline-block text-sm font-semibold text-primary">Back to children</Link>
    </div>
  ),
});

const dotForStatus: Record<string, string> = {
  Achieved: "● Achieved",
  Developing: "◑ Developing",
  Emerging: "◐ Emerging",
  NotYet: "○ Not yet",
};
const dotColor: Record<string, string> = {
  Achieved: "text-success-foreground",
  Developing: "text-primary",
  Emerging: "text-secondary",
  NotYet: "text-muted-foreground",
};

function EvaluationPage() {
  const { ev } = Route.useLoaderData();
  const child = children.find((c) => c.id === ev.childId);
  return (
    <div className="mx-auto min-h-screen w-full max-w-[440px] bg-background pb-12">
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 px-4 py-3 backdrop-blur-xl"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}>
        <motion.div whileTap={{ scale: 0.92 }}>
          <Link to="/children" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-low text-foreground">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </motion.div>
        <p className="font-display text-base font-bold text-foreground">{ev.period} · {child?.name}</p>
        <motion.button whileTap={{ scale: 0.92 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Download className="h-4 w-4" />
        </motion.button>
      </div>

      <section className="px-6 pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Progress evaluation</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight text-foreground">
          {ev.period}<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Published {ev.publishedAt} · {ev.educator}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
          {(["Achieved", "Developing", "Emerging", "NotYet"] as const).map((s) => (
            <span key={s} className={`rounded-full bg-surface-low px-3 py-1 font-semibold ${dotColor[s]}`}>{dotForStatus[s]}</span>
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-4 px-6">
        {ev.domains.map((d, i) => (
          <motion.div key={d.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="rounded-3xl bg-surface-low p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Domain {i + 1}</p>
            <h3 className="mt-1 font-display text-xl font-bold text-foreground">{d.name}</h3>
            <div className="mt-4 space-y-2">
              {d.skills.map((s) => (
                <div key={s.title} className="flex items-center justify-between gap-3 rounded-2xl bg-card p-3.5">
                  <p className="min-w-0 truncate text-sm font-semibold text-foreground">{s.title}</p>
                  <span className={`shrink-0 text-xs font-bold ${dotColor[s.status]}`}>{dotForStatus[s.status]}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 rounded-xl bg-card/60 p-3 text-xs italic text-muted-foreground">
              <span className="font-semibold text-foreground">Educator:</span> "{d.comment}"
            </p>
          </motion.div>
        ))}
      </section>

      <section className="mx-6 mt-6 rounded-3xl bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">General comment</p>
        <p className="mt-2 text-[15px] italic leading-relaxed text-foreground">"{ev.generalComment}"</p>
        <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <p>— {ev.educator}</p>
          <p className="mt-0.5">Validated by: <span className="font-semibold text-foreground">{ev.validatedBy}</span></p>
        </div>
      </section>
    </div>
  );
}
