import React from 'react'
import EventTicket from '../Components/Common/UpcomingEvent'
import PastEvent from '../Components/Common/PastEvent'
import { pastEvents, upcomingEvents } from '@/db/mockdata'
const page = () => {
    return (
        <div className="flex flex-col ">
            {/* upcoming event */}
            <div className='p-10'>
                <h1 className='text-4xl ml-40'>Upcoming Event</h1>
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
            </div>

            {/* past events */}
            <section className=' bg-gray-50 py-10'>
                <h1 className='text-4xl ml-40'>Past Events</h1>
                <div className='py-10 px-15 grid grid-cols-4'>
                    {pastEvents.map((event) => (
                        <PastEvent
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            image={event.image}
                            tags={event.tags}
                            tagColor={event.tagColor}
                            description={event.description}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default page