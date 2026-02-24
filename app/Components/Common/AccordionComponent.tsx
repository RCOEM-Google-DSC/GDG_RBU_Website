"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NeoBrutalism, nb } from "@/components/ui/neo-brutalism";

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
            className={nb({
              border: 4,
              shadow: "lg",
              className: "w-full max-w-3xl mx-auto font-geist-mono font-bold text-base sm:text-lg md:text-xl text-left px-5 py-4 sm:px-6 sm:py-5 hover:no-underline transition-all duration-200 hover:translate-x-1 hover:translate-y-1 bg-white text-black"
            })}
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
              <NeoBrutalism
                border={4}
                shadow="lg"
                className={`max-w-3xl mx-auto mt-3 p-5 sm:p-6 ${isDark ? "bg-gray-100" : "bg-gray-50"}`}
              >
                <p
                  className="text-sm sm:text-base leading-relaxed font-medium"
                  style={{ color: "#000000" }}
                >
                  {content}
                </p>
              </NeoBrutalism>
            </AccordionContent>
          </motion.div>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default AccordionComponent;
