import React from 'react'
import EventTicket from '../Components/Common/UpcomingEvent'
import PastEvent from '../Components/Common/PastEvent'
import { pastEvents, upcomingEvents } from '@/db/mockdata'

const page = () => {
    return (
        <div className="flex flex-col bg-[#FDFCF8] min-h-screen">
            {/* upcoming event */}
            <div className='w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8'>Upcoming Event</h1>
                    <div className='space-y-6'>
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
                </div>
            </div>

            {/* past events */}
            <section className='bg-gray-50 py-8 lg:py-12'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8'>Past Events</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
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
                </div>
            </section>
        </div>
    )
}

export default page