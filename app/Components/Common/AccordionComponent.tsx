"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React from "react";

const AccordionComponent = ({
  trigger,
  content,
  color,
}: {
  trigger: string;
  content: string;
  color: "red" | "green" | "blue" | "yellow";
}) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const variants = {
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0 }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger
            className="w-full max-w-3xl mx-auto font-geist-mono font-bold text-base sm:text-lg md:text-xl text-left px-5 py-4 sm:px-6 sm:py-5 hover:no-underline transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
            style={{
              backgroundColor: isDark ? "#ffffff" : "#ffffff",
              border: "4px solid #000000",
              boxShadow: "6px 6px 0px #000000",
              color: "#000000",
            }}
          >
            {trigger}
          </AccordionTrigger>
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
          >
            <AccordionContent>
              <div
                className="max-w-3xl mx-auto mt-3 p-5 sm:p-6"
                style={{
                  backgroundColor: isDark ? "#f3f4f6" : "#f9fafb",
                  border: "4px solid #000000",
                  boxShadow: "6px 6px 0px #000000",
                }}
              >
                <p
                  className="text-sm sm:text-base leading-relaxed font-medium"
                  style={{ color: "#000000" }}
                >
                  {content}
                </p>
              </div>
            </AccordionContent>
          </motion.div>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default AccordionComponent;
