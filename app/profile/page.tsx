"use client";
import { ProfileHeader } from "../Components/Profile/ProfileHeader";
import { EventCard } from "../Components/Profile/EventCard";
import { BadgeCard } from "../Components/Profile/BadgeCard";
import { useProfileData } from "../../hooks/useProfileData";
import { GridBackground } from "../Components/Reusables/GridBackground";
// ---------- MAIN COMPONENT ----------

export default function ProfilePage() {
  const { user, events, badges, loading, error } = useProfileData();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-transparent font-sans">

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {loading && (
          <div className="text-center text-neutral-500 py-10">
            Loading profile...
          </div>
        )}

        {error && !loading && (
          <div className="text-center text-red-500 py-10">{error}</div>
        )}

        {!loading && !error && user && (
          <>
            {/* 1. Header Section */}
            <section className="mb-12">
              <ProfileHeader user={user} />
            </section>

            {/* 2. Grid Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Events */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                      My Events
                    </h2>
                  </div>
                  <button className="text-sm text-neutral-500 hover:text-blue-600 font-medium">
                    View All &gt;
                  </button>
                </div>

                {events.length === 0 ? (
                  <p className="text-sm text-neutral-500">
                    You haven&apos;t registered for any events yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Badges */}
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-2 border-l-4 border-purple-600 pl-3 mb-2">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                    My Badges
                  </h2>
                </div>

                <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800">
                  {badges.length === 0 ? (
                    <p className="text-sm text-neutral-500">
                      No badges yet. Participate in events to earn some!
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {badges.map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
