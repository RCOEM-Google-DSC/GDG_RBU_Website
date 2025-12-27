"use client";
import { ProfileHeader } from "../Components/Profile/ProfileHeader";
import { EventCard } from "../Components/Profile/EventCard";
import { useProfileData } from "../../hooks/useProfileData";

export default function ProfilePage() {
  const { user, events, badges, loading, error } = useProfileData();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#fdfcf8] font-sans">
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {loading && (
          <div className="text-center text-neutral-800 py-10 text-lg font-bold">
            Loading profile...
          </div>
        )}

        {error && !loading && (
          <div className="relative">
            <div className="absolute bg-black h-full w-full rounded-xl top-1.5 left-1.5" />
            <div className="relative bg-[#ff5050] border-2 border-black rounded-xl p-6 text-center">
              <p className="text-black font-bold">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && user && (
          <>
            {/* 1. Header Section */}
            <section className="mb-10">
              <ProfileHeader user={user} />
            </section>

            {/* 2. Grid Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Events (8 columns) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Section Header with Neo-Brutalism */}
                <div className="relative">
                  <div className="absolute bg-black h-full w-full rounded-xl top-1.5 left-1.5" />
                  <div className="relative bg-[#4284ff] border-[3px] border-black rounded-xl px-6 py-4 ">
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">
                        MY EVENTS
                      </h2>
                    </div>
                  </div>
                </div>

                {events.length === 0 ? (
                  <div className="relative">
                    <div className="absolute bg-black h-full w-full rounded-xl top-1.5 left-1.5" />
                    <div className="relative bg-white border-[3px] border-black rounded-xl p-10 text-center min-h-[180px] flex flex-col items-center justify-center">
                      <p className="text-neutral-700 font-bold text-lg mb-2">
                        No Events Yet
                      </p>
                      <p className="text-neutral-500 font-medium text-sm">
                        You haven&apos;t registered for any events yet.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Badges Section (4 columns) */}
                              <div className="lg:col-span-4 space-y-6">
                {/* Badges Header */}
                <div className="relative">
                  <div className="absolute bg-black h-full w-full rounded-xl top-1.5 left-1.5" />
                  <div className="relative bg-[#ff5050] border-[3px] border-black rounded-xl px-5 py-4">
                    <h2 className="text-xl font-black text-white tracking-tight">
                      BADGES
                    </h2>
                  </div>
                </div>

                {/* Badges Content */}
                <div className="relative">
                  <div className="absolute bg-black h-full w-full rounded-xl top-1.5 left-1.5" />
                  <div className="relative h-45 bg-white border-[3px] border-black rounded-xl p-6">
                    {badges.length === 0 ? (
                      <div className="text-center min-h-[180px] flex flex-col items-center justify-center">
                        <p className="text-neutral-700 font-bold text-lg mb-2">
                          No Badges Yet
                        </p>
                        <p className="text-neutral-500 font-medium text-sm">
                          Participate in events to earn badges!
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {badges.map((badge) => (
                          <div key={badge.id} className="relative">
                            <div className="absolute bg-black h-full w-full rounded-lg top-1 left-1" />
                            <div className="relative bg-[#ffd23d] border-2 border-black rounded-lg p-3 text-center">
                              <div className="text-3xl mb-1">🏅</div>
                              <p className="text-xs font-bold text-black truncate">
                                {badge.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
