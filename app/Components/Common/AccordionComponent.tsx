"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { motion } from "framer-motion";

const AccordionComponent = ({
  trigger,
  content,
  color,
}: {
  trigger: string;
  content: string;
  color: "red" | "green" | "blue" | "yellow";
}) => {
  const variants = {
    open: { opacity: 1, height: "auto", transition: { duration: 1 } },
    closed: { opacity: 0, height: 0, transition: { duration: 1 } },
  };

  const colorMap: Record<
    "red" | "green" | "blue" | "yellow",
    { arrow: string; border: string }
  > = {
    red: { arrow: "text-red-500", border: "bg-red-500" },
    green: { arrow: "text-green-600", border: "bg-green-600" },
    blue: { arrow: "text-blue-500", border: "bg-blue-500" },
    yellow: { arrow: "text-yellow-400", border: "bg-yellow-400" },
  };

  const arrowClass = colorMap[color].arrow;
  const borderClass = colorMap[color].border;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0 }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="space-y-3 border-b-0">
            <AccordionTrigger
            className={`w-full max-w-3xl mx-auto border-4 sm:border-8 text-foreground font-bold text-lg sm:text-xl md:text-2xl text-center rounded-full px-4 py-4 sm:px-6 sm:py-5 ${color} ${
              "border-gray-300 dark:border-complementary/60 bg-card hover:border-gray-400 dark:hover:border-complementary/80 hover:shadow-lg dark:hover:shadow-complementary/20 transition-all duration-300"
            } hover:no-underline`}
            color={arrowClass}
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
              <div className="max-w-3xl mx-auto my-3 flex">
                {/* Left border */}
                <div className={`w-[9px] rounded-l-full ${borderClass}`}></div>

                {/* Outer container with text */}
                <div className="flex-1 border-4 sm:border-8p rounded-r-4xl p-4 sm:p-5 bg-accordion-bg text-foreground text-sm leading-relaxed font-sans border-gray-300 dark:border-complementary/60 hover:border-gray-400 dark:hover:border-complementary/80 transition-colors duration-300">
                  <p className="text-muted-foreground text-base sm:text-[18px] font-medium">
                    {content}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </motion.div>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default AccordionComponent;
