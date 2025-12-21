import React from 'react';
import { notFound } from 'next/navigation';
import { events, pastEvents, upcomingEvents } from '@/db/mockdata';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Image as ImageIcon, Trophy } from 'lucide-react';

interface EventDetailPageProps {
    params: Promise<{
        eventid: string;
    }>;
}

// CheckCircle Icon Component
const CheckCircleIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { eventid } = await params;

    // Find event in all event sources
    const allEvents = [...events, ...pastEvents, ...upcomingEvents];
    const event = allEvents.find((e) => e.id === eventid);

    if (!event) {
        notFound();
    }

    // Determine if event is upcoming or past
    const isUpcoming = upcomingEvents.some((e) => e.id === eventid);
    const isPast = pastEvents.some((e) => e.id === eventid);
    const eventFromMainList = events.find((e) => e.id === eventid);

    // Get event image
    const eventImage = ('image' in event ? event.image : event.image_url) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87';

    // Get event date
    const eventDate: string | null = (() => {
        if ('date' in event && typeof event.date === 'string' && event.date) return event.date;
        if ('event_time' in event && event.event_time) {
            return new Date(event.event_time).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
        return null;
    })();

    // Get event time
    const eventTime: string | null = (() => {
        if ('time' in event && typeof event.time === 'string' && event.time) return event.time;
        if ('event_time' in event && event.event_time) {
            return new Date(event.event_time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return null;
    })();

    // Get location
    const eventLocation = ('location' in event ? event.location : null) || eventFromMainList?.location || 'TBA';

    // Sample gallery images (using Unsplash)
    const galleryImages = [
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2073&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop',
    ];

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans selection:bg-blue-500/30">
            <main>
                {/* Hero Section */}
                <section className="relative h-[55vh] min-h-[450px] w-full overflow-hidden flex flex-col justify-end pb-12">
                    <div className="absolute inset-0">
                        <img
                            src={eventImage}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                        <div className="flex flex-col md:flex-row md:items-end justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    {isUpcoming && (
                                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/90 text-white border border-blue-400/50 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                                            <Clock size={10} /> Upcoming
                                        </span>
                                    )}
                                    {isPast && (
                                        <span className="px-2.5 py-0.5 rounded-full bg-green-500/90 text-white border border-green-400/50 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                                            <CheckCircleIcon size={10} /> Completed
                                        </span>
                                    )}
                                    {event.tags?.map((tag, index) => (
                                        <Badge
                                            key={index}
                                            className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                                            style={{ backgroundColor: ('tagColor' in event ? event.tagColor : event.tag_color) || '#4285F4' }}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white shadow-black drop-shadow-md">
                                    {event.title}
                                </h1>
                                <p className="text-gray-200 text-base max-w-xl shadow-black drop-shadow-sm">
                                    {event.description}
                                </p>
                                <span className="text-gray-300 text-xs shadow-black drop-shadow-md mt-2 inline-block">
                                    {eventDate}
                                </span>
                            </div>

                            {/* Quick Stats */}
                            {eventFromMainList && (
                                <div className="flex gap-6 mt-6 md:mt-0">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white shadow-black drop-shadow-md">
                                            {eventFromMainList.registered_count || 0}
                                        </p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Registered</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white shadow-black drop-shadow-md">
                                            {eventFromMainList.capacity || 'N/A'}
                                        </p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Capacity</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content Container */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
                    {/* Event Details */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="md:col-span-2 prose prose-gray max-w-none">
                            <h2 className="text-3xl font-bold mb-4 text-gray-900">Event Wrap-up</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {event.description}
                            </p>

                            {/* Event Info - Minimalistic */}
                            <div className="grid grid-cols-2 gap-5 mt-6 not-prose rounded-lg shadow-sm border-gray-200 p-5 bg-white">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Date</p>
                                    <p className="text-sm text-gray-900">{eventDate}</p>
                                </div>

                                {eventTime && (
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Time</p>
                                        <p className="text-sm text-gray-900">{eventTime}</p>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Location</p>
                                    <p className="text-sm text-gray-900">{eventLocation}</p>
                                </div>

                                {eventFromMainList?.capacity && (
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Attendance</p>
                                        <p className="text-sm text-gray-900">
                                            {eventFromMainList.registered_count || 0} / {eventFromMainList.capacity}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Highlights Sidebar */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg h-fit">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Highlights</h3>
                            <ul className="space-y-3">
                                {event.tags?.map((tag, index) => (
                                    <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm"></span>
                                        {tag}
                                    </li>
                                ))}
                                {eventFromMainList?.status && (
                                    <li className="flex items-center gap-3 text-sm text-gray-600">
                                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-sm"></span>
                                        Status: {eventFromMainList.status}
                                    </li>
                                )}
                            </ul>

                            {/* Action Button */}
                            {isUpcoming && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <Button className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 text-sm font-bold rounded-xl">
                                        Register Now
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Hall of Fame - Winners Podium */}
                    {isPast && (
                        <section>
                            <div className="flex items-center justify-center gap-3 mb-12">
                                <Trophy className="text-yellow-500" size={24} />
                                <h2 className="text-2xl font-bold text-center text-gray-900">Hall of Fame</h2>
                            </div>

                            {/* Podium Layout */}
                            <div className="flex flex-col md:flex-row items-end justify-center gap-6 max-w-5xl mx-auto">

                                {/* 2nd Place (Left) */}
                                <div className="order-2 md:order-1 w-full md:w-[30%] bg-white rounded-t-2xl rounded-b-lg border border-gray-100 shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow duration-300">
                                    <div className="h-44 overflow-hidden relative">
                                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Team 2" />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-gray-900 mb-1">Team Runner-Up</h3>
                                        <p className="text-xs text-gray-500 mb-3">Outstanding Performance</p>
                                    </div>
                                    {/* Silver Base Line */}
                                    <div className="h-1.5 w-full bg-gray-300"></div>
                                </div>

                                {/* 1st Place (Center - Taller & Elevated) */}
                                <div className="order-1 md:order-2 w-full md:w-[35%] bg-white rounded-t-2xl rounded-b-lg border border-gray-100 shadow-2xl overflow-hidden relative group z-10 transform md:-translate-y-6">
                                    <div className="absolute top-0 w-full h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent"></div>
                                    <div className="h-56 overflow-hidden relative">
                                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Team 1" />
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">Champion Team</h3>
                                        <p className="text-sm text-yellow-600 mb-4 font-medium">Best Overall Project</p>
                                    </div>
                                    {/* Gold Base Line */}
                                    <div className="h-2 w-full bg-yellow-400"></div>
                                </div>

                                {/* 3rd Place (Right) */}
                                <div className="order-3 md:order-3 w-full md:w-[30%] bg-white rounded-t-2xl rounded-b-lg border border-gray-100 shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow duration-300">
                                    <div className="h-40 overflow-hidden relative">
                                        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Team 3" />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-gray-900 mb-1">Team Bronze</h3>
                                        <p className="text-xs text-gray-500 mb-3">Excellent Achievement</p>
                                    </div>
                                    {/* Bronze Base Line */}
                                    <div className="h-1.5 w-full bg-amber-700/60"></div>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* The Crew - Organizing Team */}
                    {isPast && (
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <Users className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">The Crew</h2>
                            </div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                                    alt="Organizing Team"
                                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <h3 className="text-2xl font-bold mb-2">GDG Team 2024</h3>
                                    <p className="text-gray-200 max-w-2xl text-sm">
                                        The passionate individuals who worked behind the scenes to make this event a reality. From logistics to technical support, this team made it happen.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Photo Gallery */}
                    {isPast && (
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <ImageIcon className="text-pink-600" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900">Event Gallery</h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
                                {/* Large Featured Shot */}
                                <div className="md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                                    <img
                                        src={galleryImages[0]}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt="Event Gallery"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                        <span className="text-white text-sm font-semibold">Main Event</span>
                                    </div>
                                </div>

                                {/* Tall Shot */}
                                <div className="md:col-span-1 md:row-span-2 relative group rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                                    <img
                                        src={galleryImages[1]}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt="Event Gallery"
                                    />
                                </div>

                                {/* Standard Shots */}
                                {galleryImages.slice(2).map((img, index) => (
                                    <div
                                        key={index}
                                        className={`relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${index === 2 ? 'md:col-span-2' : ''}`}
                                    >
                                        <img
                                            src={img}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            alt="Event Gallery"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}