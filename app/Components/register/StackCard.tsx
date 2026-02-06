import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nb } from "@/components/ui/neo-brutalism";
import { Trash2 } from "lucide-react";
import { THEME } from "./utils";

export function StackCard({
  title,
  expanded,
  children,
  onDelete,
  onHeaderClick,
}: {
  title: string;
  expanded: boolean;
  children?: React.ReactNode;
  onDelete?: () => void;
  onHeaderClick?: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35 }}
      className={nb({
        border: 2,
        shadow: "md",
        className: `bg-white overflow-hidden`,
      })}
    >
      <div
        className="flex justify-between items-center px-6 py-3"
        onClick={() => onHeaderClick && onHeaderClick()}
        style={{ cursor: onHeaderClick ? "pointer" : "default" }}
      >
        <h3 className={`${THEME.fonts.heading} text-base`}>{title}</h3>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="delete member"
            title="Remove member"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.33 }}
            className="px-6 pb-6"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
