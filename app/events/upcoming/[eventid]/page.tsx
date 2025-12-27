import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Award,
  Gift,
  Target,
  CheckCircle2,
  Users,
  Trophy,
  Zap,
  Download,
  Star,
  Info,
  Ticket,
  CreditCard,
  UserPlus,
  Shirt,
  Smile,
  Coffee,
  Book,
} from "lucide-react";
import { events, pastEvents, upcomingEvents } from "@/db/mockdata";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    eventid: string;
  }>;
}

export default async function UpcomingEventDetailPage({ params }: PageProps) {
  const { eventid } = await params;

  const allEvents = [...events, ...pastEvents, ...upcomingEvents];
  const event = allEvents.find((e) => e.id === eventid);

  if (!event) {
    notFound();
  }

  // Fallback data if fields are missing in mockdata
  const eventImage =
    ("image" in event ? event.image : event.image_url) ||
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87";

  const eventDate = (() => {
    if ("date" in event && typeof event.date === "string" && event.date)
      return event.date;
    if ("event_time" in event && event.event_time) {
      return new Date(event.event_time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return "TBA";
  })();

  const eventTime = (() => {
    if ("time" in event && typeof event.time === "string" && event.time)
      return event.time;
    if ("event_time" in event && event.event_time) {
      return new Date(event.event_time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "TBA";
  })();

  const eventLocation = ("location" in event ? event.location : "") || "TBA";
  const eventEntryFee =
    "entry_fee" in event ? ((event as any).entry_fee as string) : "Free"; // Assuming entry_fee key exists or default to Free

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans selection:bg-blue-500/30 text-sm md:text-base">
      <main className="pt-0 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Column */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-wrap items-center gap-3">
                {event.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-xs font-bold uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                {event.title}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-medium">
                {event.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button className="h-12 px-8 rounded-xl bg-gray-900 hover:bg-black text-white text-base font-semibold shadow-xl hover:shadow-2xl flex items-center gap-2">
                  Register Now <ArrowRight size={20} />
                </Button>
                <Button
                  variant="outline"
                  className="h-12 px-8 rounded-xl border-2 border-gray-200 bg-transparent text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
                >
                  <Share2 size={20} /> Share
                </Button>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative isolate group hidden md:block">
              <div className="relative aspect-4/3 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 z-10 transition-transform duration-500 group-hover:scale-[1.01]">
                <img
                  src={eventImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]"></div>
              </div>

              {/* Decorative Background Blobs */}
              <div className="absolute -z-10 top-12 -right-12 w-full h-full bg-gray-200/50 rounded-[2.5rem] rotate-6 transition-transform duration-500 group-hover:rotate-3"></div>
              <div className="absolute -z-20 -top-12 -left-12 w-full h-full bg-blue-50 rounded-[2.5rem] -rotate-3 transition-transform duration-500 group-hover:-rotate-1"></div>
            </div>
          </div>
        </div>

        {/* Key Info Bar */}
        <section className="border-y border-gray-200 bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              <div className="p-4 md:p-6 flex items-center gap-3 group hover:bg-gray-50 transition-colors cursor-default">
                <div className="p-2.5 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                    Date
                  </p>
                  <p className="text-gray-900 font-semibold text-sm">
                    {eventDate}
                  </p>
                </div>
              </div>
              <div className="p-4 md:p-6 flex items-center gap-3 group hover:bg-gray-50 transition-colors cursor-default">
                <div className="p-2.5 rounded-full bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                    Time
                  </p>
                  <p className="text-gray-900 font-semibold text-sm">
                    {eventTime}
                  </p>
                </div>
              </div>
              <div className="p-4 md:p-6 flex items-center gap-3 group hover:bg-gray-50 transition-colors cursor-default">
                <div className="p-2.5 rounded-full bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                    Venue
                  </p>
                  <p
                    className="text-gray-900 font-semibold text-sm truncate max-w-[120px]"
                    title={eventLocation}
                  >
                    {eventLocation}
                  </p>
                </div>
              </div>
              <div className="p-4 md:p-6 flex items-center gap-3 group hover:bg-gray-50 transition-colors cursor-default">
                <div className="p-2.5 rounded-full bg-yellow-100 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                  <Ticket size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                    Entry Fee
                  </p>
                  <p className="text-gray-900 font-semibold text-sm">
                    {eventEntryFee}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* About Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3 text-gray-900">
                About The Event
              </h2>
              <div className="prose prose-gray max-w-none text-gray-600 text-base leading-relaxed space-y-3">
                <p>{event.description}</p>
                <p>
                  Whether you're a beginner exploring cloud concepts or an
                  advanced developer looking to master Kubernetes, this event
                  has something for everyone. We will cover topics ranging from{" "}
                  <span className="text-gray-900 font-semibold">
                    Generative AI, Serverless Architectures, to Big Data
                    Analytics
                  </span>
                  .
                </p>
              </div>
            </div>
            <div className="relative h-56 lg:h-80 min-h-[250px] rounded-3xl overflow-hidden border border-gray-200 group shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2072&auto=format&fit=crop"
                alt="About Visual"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Lighter overlay for light theme */}
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
            </div>
          </section>

          {/* Registration Timeline */}
          <section className="py-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-10 text-center text-gray-900">
                Registration Process
              </h2>

              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-0">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-5 left-12 right-12 h-0.5 bg-linear-to-r from-blue-200 via-blue-400/50 to-blue-200 z-0"></div>

                {/* Connecting Line (Mobile) */}
                <div className="md:hidden absolute left-5 top-6 bottom-6 w-0.5 bg-linear-to-b from-blue-200 via-blue-400/50 to-blue-200 z-0"></div>

                {[
                  {
                    title: "Enter Details",
                    desc: "Fill personal info",
                    step: "1",
                  },
                  {
                    title: "Make Payment",
                    desc: "Secure transaction",
                    step: "2",
                  },
                  {
                    title: "Get Ticket",
                    desc: "Receive QR via email",
                    step: "3",
                  },
                  { title: "Check-in", desc: "Show QR at venue", step: "4" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row md:flex-col items-center gap-5 w-full md:w-auto mb-6 md:mb-0 bg-[#FDFCF8] md:bg-transparent p-2 md:p-0 rounded-xl relative z-10 group cursor-default"
                  >
                    {/* Circle */}
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-900 font-bold flex items-center justify-center shrink-0 shadow-md group-hover:border-blue-500 group-hover:text-blue-500 transition-all duration-300 group-hover:scale-110 text-sm">
                      {item.step}
                    </div>
                    {/* Text */}
                    <div className="text-left md:text-center">
                      <h3 className="text-sm font-bold text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Tasks */}
          <section>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-3">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-gray-900"></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-500/30 hover:shadow-md transition-all">
                <div className="text-3xl font-bold text-blue-500 mb-3">01</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                  Team Up
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Form teams of up to 4 members. Join our Discord to find
                  teammates.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-green-500/30 hover:shadow-md transition-all">
                <div className="text-3xl font-bold text-green-500 mb-3">02</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                  Learn
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Attend at least 3 technical sessions to unlock the "Learner"
                  badge.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-yellow-500/30 hover:shadow-md transition-all">
                <div className="text-3xl font-bold text-yellow-500 mb-3">
                  03
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                  Conquer
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Complete 5 hands-on labs to earn certification & win prizes.
                </p>
              </div>
            </div>
          </section>

          {/* Rewards & Perks */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
              Rewards & Perks
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Certificate Card */}
              <div className="lg:col-span-2 bg-linear-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-500">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <Award size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Official Certification
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm max-w-md leading-relaxed mb-8">
                      Earn a verifiable certificate of completion from Google
                      Developer Groups. Perfect for your LinkedIn profile and
                      professional portfolio.
                    </p>
                  </div>

                  {/* Visual Certificate */}
                  <div className="w-full h-48 md:h-64 bg-white rounded-xl border border-gray-200 relative overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-500">
                    <div className="absolute inset-0 bg-gray-50/50"></div>
                    <div className="absolute inset-4 border-2 border-double border-gray-200 rounded-lg flex flex-col items-center justify-center p-6 text-center">
                      {/* Google G Logo Placeholder */}
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                        <span className="text-blue-600 font-bold text-lg">
                          G
                        </span>
                      </div>
                      <h4 className="text-gray-900 font-serif text-lg tracking-wide mb-1">
                        Certificate of Completion
                      </h4>
                      <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-4">
                        Presented to
                      </p>
                      <span className="text-2xl font-serif text-blue-600 font-bold italic">
                        John Doe
                      </span>
                      <div className="mt-auto w-full flex justify-between items-end opacity-50">
                        <div className="flex flex-col gap-1">
                          <div className="h-0.5 w-16 bg-gray-300"></div>
                          <span className="text-[8px] text-gray-400">
                            Organizer
                          </span>
                        </div>
                        <div className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                          <Award size={12} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Swag List */}
              <div className="lg:col-span-1 flex flex-col h-full">
                <div className="bg-white border border-gray-200 rounded-3xl p-6 relative overflow-hidden h-full flex flex-col shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg text-red-500">
                      <Gift size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Exclusive Swag
                      </h3>
                      <p className="text-xs text-gray-500">
                        For top performers & quiz winners
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 grow justify-center">
                    {[
                      {
                        name: "Diary",
                        icon: Book,
                        color: "text-blue-600",
                        bg: "bg-blue-100",
                      },
                      {
                        name: "T-Shirt",
                        icon: Shirt,
                        color: "text-blue-600",
                        bg: "bg-blue-100",
                      },
                      {
                        name: "Stickers",
                        icon: Smile,
                        color: "text-yellow-600",
                        bg: "bg-yellow-100",
                      },
                      {
                        name: "Badge",
                        icon: Award,
                        color: "text-purple-600",
                        bg: "bg-purple-100",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group/item cursor-default border border-transparent hover:border-gray-100"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center ${item.color} group-hover/item:scale-110 transition-transform`}
                        >
                          <item.icon size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900 transition-colors">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
