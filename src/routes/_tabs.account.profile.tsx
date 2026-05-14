import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Camera, Globe, Mail, Phone, Save, Shield, User } from "lucide-react";
import { SubPageHeader } from "@/components/SubPageHeader";
import { parent } from "@/lib/mock";

export const Route = createFileRoute("/_tabs/account/profile")({
  head: () => ({ meta: [{ title: "My profile — Digital Sanctuary" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <>
      <SubPageHeader title="My profile" />
      <section className="flex flex-col items-center px-6 pt-2">
        <div className="relative">
          <img src={parent.avatar} alt="" className="h-24 w-24 rounded-3xl object-cover" style={{ boxShadow: "var(--shadow-soft)" }} />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            style={{ boxShadow: "var(--shadow-float)" }}
          >
            <Camera className="h-4 w-4" />
          </motion.button>
        </div>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground">{parent.name} Dupont</h1>
        <p className="text-xs text-muted-foreground">Primary guardian</p>
      </section>

      <section className="mt-6 px-6">
        <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Personal info</h2>
        <div className="space-y-3">
          <Field icon={User} label="Full name" value="Marie Dupont" />
          <Field icon={Mail} label="Email" value="marie.dupont@mail.com" />
          <Field icon={Phone} label="Mobile" value="+33 6 12 34 56 78" />
          <Field icon={Globe} label="Language" value="English (UK)" />
          <Field icon={Shield} label="Role" value="Parent · Guardian" readOnly />
        </div>
      </section>

      <section className="px-6 pt-6">
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
          className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-float)" }}
        >
          <Save className="h-4 w-4" /> Save changes
        </motion.button>
      </section>
    </>
  );
}

function Field({ icon: Icon, label, value, readOnly }: { icon: typeof User; label: string; value: string; readOnly?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface-low px-4 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
      {readOnly && <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Locked</span>}
    </div>
  );
}
