import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppHeader } from "@/components/AppHeader";
import { Heart, MessageCircle, AlertTriangle, Pill, FileText, Download, ChevronRight, Activity, Camera, Mic, Play, Pause, Languages } from "lucide-react";
import { children, dailyReports, pastReports, healthData, gallery, evaluationList } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/children")({
  head: () => ({
    meta: [
      { title: "My Children — Digital Sanctuary" },
      { name: "description", content: "Today's report, gallery, evaluations and health for each of your children." },
    ],
  }),
  component: ChildrenPage,
});

const tabs = ["Today", "Reports", "Gallery", "Evaluations", "Health"] as const;
type Tab = (typeof tabs)[number];

function ChildrenPage() {
  const [child, setChild] = useState(children[0].id);
  const [tab, setTab] = useState<Tab>("Today");
  const active = children.find((c) => c.id === child)!;

  return (
    <>
      <AppHeader />

      {/* Child switcher with photo cards */}
      <section className="mt-3 flex gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children.map((c) => {
          const sel = c.id === child;
          return (
            <motion.button
              key={c.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setChild(c.id)}
              className={`relative flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2 transition-colors ${
                sel ? "bg-primary-container" : "bg-surface-low"
              }`}
            >
              <img src={c.avatar} alt="" className="h-11 w-11 rounded-xl object-cover" />
              <div className="text-left">
                <div className={`font-display text-sm font-bold leading-tight ${sel ? "text-primary" : "text-foreground"}`}>{c.name}</div>
                <div className="text-[10px] font-semibold tracking-[0.06em] text-muted-foreground">{c.room} · {c.age}</div>
              </div>
              {sel && (
                <motion.span layoutId="child-underline" className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-primary" />
              )}
            </motion.button>
          );
        })}
      </section>

      {/* Sub-tabs */}
      <nav className="mt-3 flex gap-1 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => {
          const sel = tab === t;
          return (
            <motion.button
              key={t}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                sel ? "bg-primary-container text-primary" : "text-muted-foreground"
              }`}
            >
              {t}
            </motion.button>
          );
        })}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${child}-${tab}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
        >
          {tab === "Today" && <TodayView childId={child} />}
          {tab === "Reports" && <ReportsView childId={child} />}
          {tab === "Gallery" && <GalleryView childName={active.name} />}
          {tab === "Evaluations" && <EvaluationsView childId={child} />}
          {tab === "Health" && <HealthView childId={child} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

/* ---------- TODAY ---------- */

function TodayView({ childId }: { childId: string }) {
  const r = dailyReports[childId];
  if (!r) return <Empty>No report yet today.</Empty>;
  return (
    <>
      <section className="mx-6 mt-5 rounded-[1.75rem] bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">Daily Report · {r.date}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Sent at {r.sentAt} by {r.by}</p>
          </div>
          <div className="flex gap-1.5">
            <motion.button whileTap={{ scale: 0.9 }} className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 text-destructive" aria-label="React">
              <Heart className="h-4 w-4" />
            </motion.button>
            <Link to="/conversation" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary" aria-label="Ask a question">
              <MessageCircle className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Meals */}
      <Block title="Meals" icon="🍽">
        <div className="space-y-2.5">
          {r.meals.map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <span className="w-20 text-xs font-semibold text-muted-foreground">{m.label}</span>
              <div className="flex flex-1 gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`h-2 flex-1 rounded-full ${i < m.level ? "bg-primary" : "bg-primary/15"}`} />
                ))}
              </div>
              <span className="w-24 text-right text-[11px] font-semibold text-foreground">
                {m.level === 4 ? "Ate well" : m.level >= 2 ? "Ate some" : m.level >= 1 ? "A little" : "Refused"}
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* Nap */}
      <Block title="Nap" icon="😴">
        <p className="text-sm font-semibold text-foreground">{r.nap.start} → {r.nap.end} · {r.nap.duration}</p>
        <p className="text-xs text-muted-foreground">Quality: {r.nap.quality}</p>
      </Block>

      {/* Diapers (CYCLE_0 only) */}
      {r.diapers && (
        <Block title="Diapers" icon="🧷">
          <p className="text-sm font-semibold text-foreground">{r.diapers.count} changes · last at {r.diapers.lastAt}</p>
        </Block>
      )}

      {/* Health */}
      <Block title="Health" icon="🌡">
        <p className="text-sm font-semibold text-foreground">Temperature: {r.health.temperature} · {r.health.status}</p>
      </Block>

      {/* Mood */}
      <Block title="Mood" icon="😊">
        <div className="flex gap-3 text-sm">
          <span className="rounded-full bg-surface-low px-3 py-1 text-foreground">Morning: {r.mood.morning}</span>
          <span className="rounded-full bg-surface-low px-3 py-1 text-foreground">Afternoon: {r.mood.afternoon}</span>
        </div>
      </Block>

      {/* Activities */}
      <Block title="Activities" icon="🎨">
        <div className="flex flex-wrap gap-2">
          {r.activities.map((a) => (
            <span key={a} className="rounded-full bg-primary-container px-3 py-1 text-xs font-semibold text-primary">{a}</span>
          ))}
        </div>
      </Block>

      {/* Educator note */}
      <Block title="Educator note" icon="💬">
        <p className="text-sm italic leading-relaxed text-foreground">"{r.note}"</p>
        <p className="mt-2 text-[11px] text-muted-foreground">— {r.by}</p>
      </Block>

      {/* Voice note */}
      {r.voiceNote && <VoiceNoteBlock note={r.voiceNote} by={r.by} />}

      <div className="h-4" />
    </>
  );
}

function VoiceNoteBlock({ note, by }: { note: import("@/lib/mock").VoiceNote; by: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    const onEnd = () => { setPlaying(false); setProgress(0); };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => { a.removeEventListener("timeupdate", onTime); a.removeEventListener("ended", onEnd); };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); } else { a.play(); setPlaying(true); }
  };

  if (!note) return null;

  return (
    <section className="mx-6 mt-3 rounded-[1.5rem] bg-primary-container/60 p-4">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
        <Mic className="h-3.5 w-3.5" /> Voice note from {by}
      </p>

      <audio ref={audioRef} src={note.url} preload="metadata" />

      <div className="flex items-center gap-3 rounded-2xl bg-card p-3" style={{ boxShadow: "var(--shadow-soft)" }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggle}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </motion.button>
        <div className="min-w-0 flex-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-primary/15">
            <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] font-semibold text-muted-foreground">
            <span>{note.duration}</span>
            <span className="flex items-center gap-1"><Languages className="h-3 w-3" /> {note.language}</span>
          </div>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowTranscript((s) => !s)}
        className="mt-3 flex w-full items-center justify-between rounded-full bg-card/70 px-4 py-2 text-xs font-semibold text-foreground"
      >
        <span>{showTranscript ? "Hide transcript" : "Show transcript"}</span>
        <ChevronRight className={`h-3.5 w-3.5 transition-transform ${showTranscript ? "rotate-90" : ""}`} />
      </motion.button>

      <AnimatePresence initial={false}>
        {showTranscript && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden text-sm leading-relaxed text-foreground"
          >
            {note.transcript}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}


function Block({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="mx-6 mt-3 rounded-[1.5rem] bg-surface-low p-4">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        <span className="text-base">{icon}</span> {title}
      </p>
      {children}
    </section>
  );
}

/* ---------- REPORTS ---------- */

function ReportsView({ childId }: { childId: string }) {
  const list = pastReports.filter((r) => r.childId === childId);
  return (
    <section className="mt-5 space-y-3 px-6">
      <p className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Past daily reports</p>
      {list.length === 0 && <Empty>No past reports.</Empty>}
      {list.map((r, i) => (
        <motion.article
          key={r.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-center gap-3 rounded-3xl bg-card p-4"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-container text-primary">
            <FileText className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{r.date}</p>
            <p className="font-display text-sm font-bold text-foreground">{r.title}</p>
            <p className="truncate text-xs text-muted-foreground">{r.summary}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </motion.article>
      ))}
    </section>
  );
}

/* ---------- GALLERY ---------- */

function GalleryView({ childName }: { childName: string }) {
  const [filter, setFilter] = useState<"only" | "all">("all");
  const items = gallery.filter((g) => filter === "all" ? true : (g.child === childName || g.children?.includes(childName)));

  return (
    <>
      <section className="px-6 pt-5">
        <div className="flex gap-2 rounded-full bg-surface-low p-1">
          {(["only", "all"] as const).map((k) => (
            <motion.button key={k} whileTap={{ scale: 0.95 }} onClick={() => setFilter(k)}
              className={`flex-1 rounded-full py-2 text-xs font-semibold transition-colors ${filter === k ? "bg-card text-foreground" : "text-muted-foreground"}`}
              style={filter === k ? { boxShadow: "var(--shadow-soft)" } : undefined}>
              {k === "only" ? `Only ${childName}` : "All class photos"}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-2 px-6">
        {items.map((g, i) => (
          <motion.div key={g.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="overflow-hidden rounded-2xl bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
            <img src={g.src} alt="" className="aspect-square w-full object-cover" />
            <div className="p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{g.date}</p>
              <p className="text-xs font-semibold text-foreground">{g.tag}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="px-6 pt-5">
        <motion.button whileTap={{ scale: 0.97 }} className="flex w-full items-center justify-center gap-2 rounded-full bg-surface-low px-6 py-3 text-sm font-semibold text-foreground">
          <Download className="h-4 w-4" /> Download all ({items.length})
        </motion.button>
      </section>
    </>
  );
}

/* ---------- EVALUATIONS ---------- */

function EvaluationsView({ childId }: { childId: string }) {
  const list = evaluationList.filter((e) => e.childId === childId);
  return (
    <section className="mt-5 space-y-3 px-6">
      <p className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Developmental milestones</p>
      {list.map((e, i) => {
        const card = (
          <motion.article
            key={e.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`rounded-3xl bg-card p-5 ${e.status === "pending" ? "opacity-60" : ""}`}
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-base font-bold text-foreground">{e.period}</p>
              {e.status === "published" ? (
                <span className="rounded-full bg-success/20 px-2.5 py-1 text-[10px] font-bold text-success-foreground">Published</span>
              ) : (
                <span className="rounded-full bg-surface-low px-2.5 py-1 text-[10px] font-bold text-muted-foreground">Pending</span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {e.status === "published" ? `Published ${e.publishedAt}` : "Not yet available"}
            </p>
            <p className="mt-2 text-sm text-foreground">{e.summary}</p>
          </motion.article>
        );
        return e.status === "published" ? (
          <Link key={e.id} to="/evaluation/$id" params={{ id: e.id }}>{card}</Link>
        ) : <div key={e.id}>{card}</div>;
      })}
    </section>
  );
}

/* ---------- HEALTH ---------- */

function HealthView({ childId }: { childId: string }) {
  const h = healthData[childId];
  const sevColor: Record<string, string> = {
    HIGH: "bg-destructive/15 text-destructive border-destructive/40",
    MEDIUM: "bg-warning/25 text-warning-foreground border-warning/50",
    LOW: "bg-surface-low text-muted-foreground border-border",
  };
  return (
    <>
      {/* Allergies banner */}
      <section className="mx-6 mt-5">
        <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Allergies</p>
        <div className="rounded-[1.5rem] border-2 border-destructive/30 bg-destructive/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-xs font-bold uppercase tracking-wider">Allergy alert</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {h.allergies.map((a) => (
              <span key={a.name} className={`rounded-full border px-3 py-1 text-xs font-semibold ${sevColor[a.severity]}`}>
                {a.name} · {a.severity}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Health events */}
      <section className="mx-6 mt-5">
        <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Recent health events</p>
        <ul className="space-y-2.5">
          {h.events.map((e, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-2xl bg-card p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                e.level === "alert" ? "bg-destructive/15 text-destructive" : e.level === "warn" ? "bg-warning/25 text-warning-foreground" : "bg-success/20 text-success-foreground"
              }`}>
                <Activity className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{e.date} · {e.type}</p>
                <p className="text-sm text-foreground">{e.detail}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Vaccinations */}
      <section className="mx-6 mt-5">
        <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Vaccinations</p>
        <div className="space-y-2">
          {h.vaccinations.map((v, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-surface-low p-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary">
                <Pill className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{v.name}</p>
                <p className="text-[11px] text-muted-foreground">{v.date}{v.due ? ` · ${v.due}` : ""}</p>
              </div>
              {v.due && <span className="rounded-full bg-warning/25 px-2.5 py-1 text-[10px] font-bold text-warning-foreground">Due</span>}
            </div>
          ))}
        </div>
      </section>

      <div className="h-4" />
    </>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-8 text-center text-sm text-muted-foreground">{children}</div>;
}
