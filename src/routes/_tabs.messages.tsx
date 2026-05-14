import { createFileRoute } from "@tanstack/react-router";
import { Search, Edit3 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { messages } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Digital Sanctuary" },
      { name: "description", content: "Direct conversations with educators, the director, and school staff." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  return (
    <>
      <AppHeader />
      <section className="flex items-end justify-between px-6 pt-6">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-none text-foreground">Messages</h1>
          <p className="mt-2 text-sm text-muted-foreground">Direct line to the Sanctuary</p>
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
          style={{ boxShadow: "var(--shadow-float)", background: "var(--gradient-primary)" }}
        >
          <Edit3 className="h-4 w-4" />
        </button>
      </section>

      <div className="relative mx-6 mt-5">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search messages…"
          className="h-12 w-full rounded-full bg-surface-low pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <ul className="mt-4 space-y-1 px-3">
        {messages.map((m) => (
          <li key={m.id}>
            <button className="flex w-full items-start gap-3 rounded-3xl px-3 py-3 text-left transition-colors hover:bg-surface-low">
              <img src={m.avatar} alt="" width={48} height={48} className="h-12 w-12 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-display text-sm font-bold text-foreground">{m.from}</span>
                  <span className={`shrink-0 text-[11px] font-semibold ${m.unread ? "text-primary" : "text-muted-foreground"}`}>
                    {m.time}
                  </span>
                </div>
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{m.role}</p>
                <p className={`mt-1 line-clamp-2 text-sm leading-snug ${m.unread ? "text-foreground" : "text-muted-foreground"}`}>
                  {m.preview}
                </p>
              </div>
              {m.unread && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
