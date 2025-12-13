"use client"
import { useEffect, useRef } from "react"
import UpcomingEvent from "./Components/Common/UpcomingEvent";
import { upcomingEvents } from "@/db/mockdata";
import EventTicket from "./Components/Common/UpcomingEvent";

import Faq from "./Components/LandingPage/FAQ";
import MeetOurTeam from "./Components/LandingPage/MeetOurTeam";
import Footer from "./Components/LandingPage/Footer";
import Hero from "./Components/LandingPage/Hero";
export default function Home() {
  return (
    <div className=" ">
      {/* hero section */}
      <section className="min-w-full">
        <Hero/>.
      </section>

      {/* upcoming events section */}
      <section className="p-10 mt-10">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold my-6 sm:my-10 self-start ml-40">Upcoming Event</h2>
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
      <section className="mt-10 p-10">
        <MeetOurTeam />
      </section>

      {/* faq section */}
      <section>
        <Faq />
      </section>

      {/* footer */}
      <Footer/>
    </div>
  );
}

