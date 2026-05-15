import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bell, Globe, Lock, Mail, MessageSquare, Moon, Smartphone, Sun } from "lucide-react";
import { SubPageHeader } from "@/components/SubPageHeader";
import { notifPrefs } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/account/preferences")({
  head: () => ({ meta: [{ title: "Notification preferences — Digital Sanctuary" }] }),
  component: PreferencesPage,
});

type PrefItem = { id: string; label: string; on: boolean; locked?: boolean };

function PreferencesPage() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [essential, setEssential] = useState<PrefItem[]>(notifPrefs.essential);
  const [important, setImportant] = useState<PrefItem[]>(notifPrefs.important);
  const [info, setInfo] = useState<PrefItem[]>(notifPrefs.informational);
  const [quietFrom, setQuietFrom] = useState("21:00");
  const [quietTo, setQuietTo] = useState("07:30");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggle = (setter: React.Dispatch<React.SetStateAction<PrefItem[]>>) => (id: string) =>
    setter((prev) => prev.map((p) => (p.id === id && !p.locked ? { ...p, on: !p.on } : p)));

  return (
    <>
      <SubPageHeader title="Notification preferences" />
      <section className="px-6 pt-2">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground">
          Stay in control<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose how, when, and which alerts you receive. Essential safety alerts are always on.
        </p>
      </section>

      {/* Channels */}
      <Section title="Channels">
        <Row icon={Smartphone} title="Push notifications" subtitle="Real-time alerts" on={push} onChange={setPush} />
        <Row icon={Mail} title="Email digest" subtitle="Daily 8 PM summary" on={email} onChange={setEmail} />
        <Row icon={MessageSquare} title="SMS" subtitle="Emergency only" on={sms} onChange={setSms} />
      </Section>

      {/* Essential */}
      <Section title="Essential" subtitle="Always on — for child safety">
        {essential.map((p) => <Toggle key={p.id} item={p} onToggle={toggle(setEssential)} />)}
      </Section>

      {/* Important */}
      <Section title="Important" subtitle="On by default · can disable">
        {important.map((p) => <Toggle key={p.id} item={p} onToggle={toggle(setImportant)} />)}
      </Section>

      {/* Informational */}
      <Section title="Informational" subtitle="Optional updates">
        {info.map((p) => <Toggle key={p.id} item={p} onToggle={toggle(setInfo)} />)}
      </Section>

      {/* Quiet hours */}
      <Section title="Quiet hours" subtitle="Hold non-urgent push, deliver on wake">
        <div className="rounded-2xl bg-surface-low p-4">
          <div className="grid grid-cols-2 gap-3">
            <TimeField label="From" value={quietFrom} onChange={setQuietFrom} />
            <TimeField label="To" value={quietTo} onChange={setQuietTo} />
          </div>
          <p className="mt-3 inline-flex items-center gap-2 text-[11px] text-muted-foreground">
            <Bell className="h-3 w-3" /> Urgent health alerts always come through.
          </p>
        </div>
      </Section>

      {/* Appearance */}
      <Section title="Appearance">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-surface-low p-2">
          {(["light", "dark"] as const).map((t) => (
            <motion.button key={t} whileTap={{ scale: 0.96 }} onClick={() => setTheme(t)}
              className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors ${
                theme === t ? "bg-card text-foreground" : "text-muted-foreground"
              }`}
              style={theme === t ? { boxShadow: "var(--shadow-soft)" } : undefined}>
              {t === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {t === "light" ? "Light" : "Dark"}
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Language */}
      <Section title="Language">
        <button className="flex w-full items-center gap-3 rounded-2xl bg-surface-low px-4 py-4 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary">
            <Globe className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">English (UK)</p>
            <p className="text-[11px] text-muted-foreground">Tap to change</p>
          </div>
        </button>
      </Section>

      <div className="h-6" />
    </>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 px-6">
      <div className="mb-3 px-1">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h2>
        {subtitle && <p className="mt-0.5 text-[11px] text-muted-foreground/80">{subtitle}</p>}
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Row({ icon: Icon, title, subtitle, on, onChange }: { icon: typeof Bell; title: string; subtitle: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)} className="flex w-full items-center gap-3 rounded-2xl bg-surface-low px-4 py-3 text-left">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
      <Switch on={on} />
    </button>
  );
}

function Toggle({ item, onToggle }: { item: PrefItem; onToggle: (id: string) => void }) {
  return (
    <button onClick={() => onToggle(item.id)} disabled={item.locked}
      className={`flex w-full items-center justify-between gap-3 rounded-2xl bg-surface-low px-4 py-3 text-left ${item.locked ? "opacity-100" : ""}`}>
      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
        {item.locked && <Lock className="h-3 w-3 text-muted-foreground" />}
        {item.label}
      </span>
      <Switch on={item.on} disabled={item.locked} />
    </button>
  );
}

function Switch({ on, disabled }: { on: boolean; disabled?: boolean }) {
  return (
    <motion.span layout className={`flex h-7 w-12 items-center rounded-full p-0.5 ${disabled ? "bg-muted" : on ? "bg-primary" : "bg-border"}`}>
      <motion.span layout className="h-6 w-6 rounded-full bg-card" style={{ marginLeft: on ? "auto" : 0 }} />
    </motion.span>
  );
}

function TimeField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input type="time" value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-semibold text-foreground" />
    </label>
  );
}
