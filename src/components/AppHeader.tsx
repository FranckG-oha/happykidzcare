import { Search, Bell, MessageSquare } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { parent } from "@/lib/mock";

export function AppHeader({ action = "search" as "search" | "bell", badge = 3 }: { action?: "search" | "bell"; badge?: number }) {
  const Icon = action === "search" ? Search : Bell;
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between px-6 pt-6"
    >
      <Link to="/account" className="flex items-center gap-3 group">
        <motion.img
          whileTap={{ scale: 0.92 }}
          src={parent.avatar}
          alt={parent.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-card"
        />
        <span className="font-display text-lg font-bold text-primary tracking-tight">
          Digital Sanctuary
        </span>
      </Link>
      <div className="flex items-center gap-1">
        <Link
          to="/messages"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-low"
          aria-label="Messages"
        >
          <motion.span whileTap={{ scale: 0.85 }} className="flex">
            <MessageSquare className="h-5 w-5" strokeWidth={2.2} />
          </motion.span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.45 }}
            className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[9px] font-bold text-secondary-foreground ring-2 ring-background"
          >
            2
          </motion.span>
        </Link>
        <Link
          to="/updates"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-low"
          aria-label={action}
        >
          <motion.span whileTap={{ scale: 0.85 }} whileHover={{ rotate: action === "bell" ? -10 : 0 }} className="flex">
            <Icon className="h-5 w-5" strokeWidth={2.2} />
          </motion.span>
          {action === "bell" && badge ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.4 }}
              className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[9px] font-bold text-secondary-foreground ring-2 ring-background"
            >
              {badge}
            </motion.span>
          ) : null}
        </Link>
      </div>
    </motion.header>
  );
}
