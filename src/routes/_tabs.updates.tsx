import { createFileRoute } from "@tanstack/react-router";
import { Calendar as CalIcon, Users } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { gallery } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/updates")({
  head: () => ({
    meta: [
      { title: "Updates — Digital Sanctuary" },
      { name: "description", content: "Photo gallery and everyday moments captured at your child's school." },
    ],
  }),
  component: UpdatesPage,
});

function UpdatesPage() {
  return (
    <>
      <AppHeader />
      <section className="px-6 pt-6">
        <h1 className="font-display text-4xl font-extrabold leading-none text-foreground">Gallery</h1>
        <p className="mt-2 text-sm text-muted-foreground">Capturing everyday moments</p>

        <div className="mt-4 flex gap-2">
          <Filter icon={<CalIcon className="h-3.5 w-3.5" />} active>This week</Filter>
          <Filter icon={<Users className="h-3.5 w-3.5" />}>All children</Filter>
        </div>
      </section>

      <section className="mt-5 space-y-4 px-6">
        {gallery.map((g) => (
          <figure key={g.id} className="relative overflow-hidden rounded-[1.75rem]" style={{ boxShadow: "var(--shadow-soft)" }}>
            <img src={g.src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute right-3 top-3 flex gap-1.5">
              {(g.children ?? [g.child!]).map((name) => (
                <span key={name} className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  {name}
                </span>
              ))}
            </div>
          </figure>
        ))}
      </section>
    </>
  );
}

function Filter({ children, icon, active }: { children: React.ReactNode; icon: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
        active ? "bg-card text-foreground" : "bg-surface-low text-muted-foreground"
      }`}
      style={active ? { boxShadow: "0 1px 3px rgba(36,50,79,0.06)" } : undefined}
    >
      {icon}
      {children}
    </button>
  );
}
