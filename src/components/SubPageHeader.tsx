import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export function SubPageHeader({ title, back = "/account", action }: { title: string; back?: string; action?: React.ReactNode }) {
  return (
    <div
      className="sticky top-0 z-30 flex items-center justify-between bg-background/80 px-4 py-3 backdrop-blur-xl"
      style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <motion.div whileTap={{ scale: 0.92 }}>
        <Link
          to={back as never}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-low text-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      </motion.div>
      <p className="font-display text-base font-bold text-foreground">{title}</p>
      <div className="flex h-10 w-10 items-center justify-center">{action}</div>
    </div>
  );
}
