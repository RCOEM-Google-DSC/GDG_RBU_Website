"use client";
import UpcomingEvent from "./Components/Common/UpcomingEvent";
import { upcomingEvents } from "@/db/mockdata";
import EventTicket from "./Components/Common/UpcomingEvent";
import { motion } from "framer-motion";
import Faq from "./Components/Landing/FAQ";
import MeetOurTeam from "./Components/Landing/MeetOurTeam";
import Footer from "./Components/Landing/Footer";
import Hero from "./Components/Landing/Hero";
export default function Home() {
  return (
    <div className="w-full ">
      {/* hero section */}
      <section className="w-full">
        <Hero />
      </section>

      {/* upcoming events section */}
      <section className="w-full px-6 md:px-10 lg:px-20 py-10">
        <motion.div
          className="w-full flex flex-col items-center justify-center pt-0 pb-12 sm:pt-0 sm:pb-14 bg-background text-foreground px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold my-6 sm:my-10 self-start">
            Upcoming Event
          </h2>
          {upcomingEvents.map((event) => (
            <EventTicket
              key={event.id}
              id={event.id}
              title={event.title}
              date={new Date(event.date)}
              time={event.time}
              image={event.image}
              tags={event.tags}
              tagColor={event.tagColor}
              description={event.description}
            />
          ))}
        </motion.div>
      </section>

      {/* team section */}
      <section className="w-full  sm:px-6 md:px-10 lg:px-20 py-8 max-h-screen/20 sm:py-10 md:py-12 lg:py-16">
        <MeetOurTeam />
      </section>

      {/* faq section */}
      <section className="w-full">
        <Faq />
      </section>

      {/* footer */}
      <Footer />
      {/* <Footer /> */}
    </div>
  );
}
