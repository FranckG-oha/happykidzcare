import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bell, Globe, Mail, MessageSquare, Moon, Smartphone, Sun } from "lucide-react";
import { SubPageHeader } from "@/components/SubPageHeader";
import { children } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/account/preferences")({
  head: () => ({ meta: [{ title: "Preferences — Digital Sanctuary" }] }),
  component: PreferencesPage,
});

function PreferencesPage() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [perChild, setPerChild] = useState<Record<string, boolean>>(
    Object.fromEntries(children.map((c) => [c.id, true])),
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <>
      <SubPageHeader title="Preferences" />
      <section className="px-6 pt-2">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground">
          Stay in control<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose how, when, and for which child you'd like to be notified.
        </p>
      </section>

      <Section title="Channels">
        <Row icon={Smartphone} title="Push notifications" subtitle="Real-time alerts" on={push} onChange={setPush} />
        <Row icon={Mail} title="Email digest" subtitle="Daily 8 PM summary" on={email} onChange={setEmail} />
        <Row icon={MessageSquare} title="SMS" subtitle="Emergency only" on={sms} onChange={setSms} />
      </Section>

      <Section title="Per child">
        {children.map((c) => (
          <Row
            key={c.id}
            avatar={c.avatar}
            title={`Notifications for ${c.name}`}
            subtitle={c.room}
            on={perChild[c.id]}
            onChange={(v) => setPerChild((s) => ({ ...s, [c.id]: v }))}
          />
        ))}
      </Section>

      <Section title="Quiet hours">
        <div className="rounded-2xl bg-surface-low p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Mute non-urgent alerts</p>
              <p className="text-[11px] text-muted-foreground">From 21:00 to 07:00</p>
            </div>
            <Bell className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Section>

      <Section title="Appearance">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-surface-low p-2">
          {(["light", "dark"] as const).map((t) => (
            <motion.button
              key={t}
              whileTap={{ scale: 0.96 }}
              onClick={() => setTheme(t)}
              className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors ${
                theme === t ? "bg-card text-foreground" : "text-muted-foreground"
              }`}
              style={theme === t ? { boxShadow: "var(--shadow-soft)" } : undefined}
            >
              {t === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {t === "light" ? "Light" : "Dark"}
            </motion.button>
          ))}
        </div>
      </Section>

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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 px-6">
      <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Row({
  icon: Icon,
  avatar,
  title,
  subtitle,
  on,
  onChange,
}: {
  icon?: typeof Bell;
  avatar?: string;
  title: string;
  subtitle: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="flex w-full items-center gap-3 rounded-2xl bg-surface-low px-4 py-3 text-left"
    >
      {avatar ? (
        <img src={avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary">
          {Icon && <Icon className="h-4 w-4" />}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
      <motion.span layout className={`flex h-7 w-12 items-center rounded-full p-0.5 ${on ? "bg-primary" : "bg-border"}`}>
        <motion.span layout className="h-6 w-6 rounded-full bg-card" style={{ marginLeft: on ? "auto" : 0 }} />
      </motion.span>
    </button>
  );
}
