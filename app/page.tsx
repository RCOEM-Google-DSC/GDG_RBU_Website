"use client"
import UpcomingEvent from "./Components/Common/UpcomingEvent";
import { upcomingEvents } from "@/db/mockdata";
import EventTicket from "./Components/Common/UpcomingEvent";

import Faq from "./Components/Landing/FAQ";
import MeetOurTeam from "./Components/Landing/MeetOurTeam";
import Footer from "./Components/Landing/Footer";
import Hero from "./Components/Landing/Hero";
import Footer1 from "./Components/Landing/Footer1";
export default function Home() {
  return (
    <div className="w-full">
      {/* hero section */}
      <section className="w-full">
        <Hero />
      </section>

      {/* upcoming events section */}
      <section className="w-full px-6 md:px-10 lg:px-20 py-10">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold my-6 sm:my-10 self-start">Upcoming Event</h2>
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
      </section>

      {/* team section */}
      <section className="w-full px-6 md:px-10 lg:px-20 py-10">
        <MeetOurTeam />
      </section>

      {/* faq section */}
      <section className="w-full">
        <Faq />
      </section>

      {/* footer */}
      <Footer1 />
      {/* <Footer /> */}
    </div>
  );
}

