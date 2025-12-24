'use client';

import React, { useEffect, useState } from 'react'
import EventTicket from '../Components/Common/UpcomingEvent'
import PastEvent from '../Components/Common/PastEvent'
import { getUpcomingEvents, getPastEvents } from '@/supabase/supabase'

type Event = {
    id: string;
    title: string;
    description: string;
    event_time: string;
    image_url: string;
    venue: string;
    date?: string;
    time?: string;
    status: string;
}

const EventsPage = () => {
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const [upcoming, past] = await Promise.all([
                getUpcomingEvents(),
                getPastEvents()
            ]);
            setUpcomingEvents(upcoming || []);
            setPastEvents(past || []);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to load events. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#FDFCF8]">
                <div className="text-lg text-gray-600">Loading events...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#FDFCF8]">
                <div className="text-lg text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-[#FDFCF8] min-h-screen">
            {/* upcoming event */}
            <div className='w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8'>Upcoming Event</h1>
                    {upcomingEvents.length === 0 ? (
                        <div className="text-gray-500 text-center py-12">
                            No upcoming events at the moment. Check back soon!
                        </div>
                    ) : (
                        <div className='space-y-6'>
                            {upcomingEvents.map((event) => (
                                <EventTicket
                                    key={event.id}
                                    id={event.id}
                                    title={event.title}
                                    date={event.date ? new Date(event.date) : new Date(event.event_time)}
                                    time={event.time || new Date(event.event_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    image={event.image_url}
                                    tags={[event.status]}
                                    tagColor="#FBBC04"
                                    description={event.description}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* past events */}
            <section className='bg-gray-50 py-8 lg:py-12'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8'>Past Events</h1>
                    {pastEvents.length === 0 ? (
                        <div className="text-gray-500 text-center py-12">
                            No past events to display.
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
                            {pastEvents.map((event) => (
                                <PastEvent
                                    key={event.id}
                                    id={event.id}
                                    title={event.title}
                                    date={event.date || new Date(event.event_time).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                                    image={event.image_url}
                                    tags={[event.status]}
                                    tagColor="#4285F4"
                                    description={event.description}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default EventsPage
