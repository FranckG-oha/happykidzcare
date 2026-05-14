import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Phone, MoreVertical, Plus, Smile, Mic, Send, Download } from "lucide-react";
import { conversation } from "@/lib/mock";

export const Route = createFileRoute("/conversation")({
  head: () => ({
    meta: [
      { title: "Conversation — Digital Sanctuary" },
      { name: "description", content: "Direct chat with your child's educator." },
    ],
  }),
  component: ConversationPage,
});

function ConversationPage() {
  const { educator, thread, typing } = conversation;
  const [draft, setDraft] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background">
        <motion.header
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 px-4 pt-6"
        >
          <Link to="/messages" className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-low">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-1 items-center gap-3 rounded-full bg-card px-3 py-2" style={{ boxShadow: "var(--shadow-soft)" }}>
            <div className="relative">
              <img src={educator.avatar} alt={educator.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              {educator.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success ring-2 ring-card" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-bold text-foreground">{educator.name}</p>
              <p className="flex items-center gap-1 text-[11px] font-semibold text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> {educator.role}
              </p>
            </div>
            <motion.button whileTap={{ scale: 0.9 }} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-primary">
              <Phone className="h-4 w-4" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-primary">
              <MoreVertical className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.header>

        <div className="mt-6 flex-1 space-y-4 px-5 pb-32">
          <div className="flex justify-center">
            <span className="rounded-full bg-card px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Today, Oct 24</span>
          </div>

          <AnimatePresence initial={false}>
            {thread.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 380, damping: 28 }}
                className={`flex ${m.who === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] ${m.who === "me" ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
                  <div className={`rounded-3xl px-4 py-3 text-sm leading-relaxed ${
                    m.who === "me"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-surface-low text-foreground"
                  }`}>
                    {m.text}
                  </div>
                  {m.image && (
                    <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-3xl bg-card p-2" style={{ boxShadow: "var(--shadow-soft)" }}>
                      <img src={m.image} alt="" loading="lazy" className="h-56 w-full rounded-2xl object-cover" />
                      <div className="flex items-center gap-2 px-2 pt-2">
                        <Download className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-semibold text-foreground">{m.fileName}</span>
                      </div>
                    </motion.div>
                  )}
                  <span className={`flex items-center gap-1 text-[11px] font-semibold ${m.who === "me" ? "text-muted-foreground" : "text-muted-foreground"}`}>
                    {m.time}
                    {m.who === "me" && <span className="text-primary">✓✓</span>}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <div className="flex gap-1 rounded-full bg-surface-low px-3 py-2.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                  />
                ))}
              </div>
              <span className="text-xs italic text-muted-foreground">{educator.name} is typing…</span>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }}
          className="fixed bottom-0 left-1/2 w-full max-w-[440px] -translate-x-1/2 px-4 pb-5 pt-3 backdrop-blur-xl"
          style={{ background: "linear-gradient(to top, var(--background) 70%, transparent)" }}
        >
          <div className="flex items-center gap-2 rounded-full bg-card px-2 py-2" style={{ boxShadow: "var(--shadow-soft)" }}>
            <motion.button whileTap={{ scale: 0.9 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-low text-foreground">
              <Plus className="h-4 w-4" />
            </motion.button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 bg-transparent px-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground"><Smile className="h-4 w-4" /></button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground"><Mic className="h-4 w-4" /></button>
            <motion.button
              whileTap={{ scale: 0.85 }}
              animate={{ rotate: draft ? 0 : -20, scale: draft ? 1 : 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
