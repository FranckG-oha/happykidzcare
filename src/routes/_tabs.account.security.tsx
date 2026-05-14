import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Fingerprint, KeyRound, LogOut, Smartphone } from "lucide-react";
import { SubPageHeader } from "@/components/SubPageHeader";

export const Route = createFileRoute("/_tabs/account/security")({
  head: () => ({ meta: [{ title: "Account security — Digital Sanctuary" }] }),
  component: SecurityPage,
});

function SecurityPage() {
  const [biometric, setBiometric] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <>
      <SubPageHeader title="Account security" />
      <section className="px-6 pt-2">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground">
          Lock it down<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage how you sign in and which devices have access.
        </p>
      </section>

      <section className="mt-6 space-y-3 px-6">
        <Toggle
          icon={Fingerprint}
          title="Face ID / Touch ID"
          subtitle="Sign in with your biometric"
          on={biometric}
          onChange={setBiometric}
        />
        <Toggle
          icon={KeyRound}
          title="Two-factor authentication"
          subtitle="Adds a code on every new device"
          on={twoFA}
          onChange={setTwoFA}
        />
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-between rounded-2xl bg-surface-low px-4 py-4 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary">
              <KeyRound className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Change password</p>
              <p className="text-[11px] text-muted-foreground">Last changed 3 months ago</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-primary">Update</span>
        </motion.button>
      </section>

      <section className="mt-7 px-6">
        <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Active sessions</h2>
        <div className="space-y-2">
          {[
            { name: "iPhone 15 — Marie", current: true, place: "Paris · Now" },
            { name: "MacBook Air — Safari", current: false, place: "Paris · 2 days ago" },
          ].map((d) => (
            <div key={d.name} className="flex items-center gap-3 rounded-2xl bg-surface-low p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary">
                <Smartphone className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{d.name}</p>
                <p className="text-[11px] text-muted-foreground">{d.place}</p>
              </div>
              {d.current ? (
                <span className="rounded-full bg-success/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success-foreground">
                  This device
                </span>
              ) : (
                <button className="text-xs font-semibold text-destructive">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pt-6">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-destructive/10 px-6 py-4 text-sm font-semibold text-destructive"
        >
          <LogOut className="h-4 w-4" /> Sign out from all devices
        </motion.button>
      </section>
    </>
  );
}

function Toggle({
  icon: Icon,
  title,
  subtitle,
  on,
  onChange,
}: {
  icon: typeof KeyRound;
  title: string;
  subtitle: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="flex w-full items-center gap-3 rounded-2xl bg-surface-low px-4 py-4 text-left"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
      <motion.span
        layout
        className={`flex h-7 w-12 items-center rounded-full p-0.5 ${on ? "bg-primary" : "bg-border"}`}
      >
        <motion.span layout className="h-6 w-6 rounded-full bg-card" style={{ marginLeft: on ? "auto" : 0 }} />
      </motion.span>
    </button>
  );
}
