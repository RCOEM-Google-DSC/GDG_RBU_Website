"use client";
import AccordionComponent from "../Common/AccordionComponent";
import { motion } from "framer-motion";

const questions = [
  {
    q: "What is GDG RBU?",
    a: "GDG RBU is the official Google Developer Group of RBU, focused on empowering students through hands-on workshops, tech talks, hackathons, and real-world project collaboration.",
    color: "purple",
  },
  {
    q: "How to join GDG?",
    a: "We conduct an annual team recruitment process. The details of recruitment are posted online a few weeks prior. It’s a two step process involving task submission and personal interview. Students acing both rounds are selected to be the part of the core team.",
    color: "green",
  },
  {
    q: "What does a GDG Lead do?",
    a: "A GDG Lead works with the university to build the community, recruit the core team, organize events and workshops, and collaborate with industry and local partners.",
    color: "blue",
  },
  {
    q: "How is GDG related to Google?",
    a: "GDG chapters are independent community groups supported by Google Developers. While GDGs operate independently, they receive guidance, resources, and opportunities from Google to help developers grow and connect.",
    color: "yellow",
  },
  {
    q: "How to reach us?",
    a: (
      <span>
        Mail us at{" "}
        <a href="mailto:dsc.rknec@gmail.com" className="underline">
          gdsc@rknec.edu
        </a>
      </span>
    ),
    color: "red",
  },
];

const Faq = () => {
  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center pt-0 pb-12 sm:pt-0 sm:pb-14  text-foreground px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
    >
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold my-6 sm:my-10 font-retron">
        FAQs
      </h1>
      <div className="w-full max-w-3xl space-y-4">
        {questions.map((item, index) => (
          <AccordionComponent
            key={index}
            trigger={item.q}
            content={item.a as any}
            color={item.color as "red" | "green" | "blue" | "yellow"}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Faq;
