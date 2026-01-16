"use client";
import { ProfileHeader } from "../Components/Profile/ProfileHeader";
import { EventCard } from "../Components/Profile/EventCard";
import { useProfileData } from "../../hooks/useProfileData";
import { NeoBrutalism } from "@/components/ui/neo-brutalism";

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
          <NeoBrutalism
            border={2}
            shadow="md"
            className="bg-[#ff5050] p-6 text-center"
          >
            <p className="text-black font-bold">{error}</p>
          </NeoBrutalism>
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
                <NeoBrutalism
                  border={3}
                  shadow="md"
                  className="bg-[#4284ff] px-6 py-4"
                >
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      MY EVENTS
                    </h2>
                  </div>
                </NeoBrutalism>

                {events.length === 0 ? (
                  <NeoBrutalism
                    border={3}
                    shadow="md"
                    className="bg-white p-10 text-center min-h-[180px] flex flex-col items-center justify-center"
                  >
                    <p className="text-neutral-700 font-bold text-lg mb-2">
                      No Events Yet
                    </p>
                    <p className="text-neutral-500 font-medium text-sm">
                      You haven&apos;t registered for any events yet.
                    </p>
                  </NeoBrutalism>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Badges Section (4 columns) */}


            </div>
          </>
        )}
      </div>
    </div>
  );
}
