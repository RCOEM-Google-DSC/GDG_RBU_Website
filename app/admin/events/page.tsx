"use client";

import PastEvents from "@/app/Components/Admin/PastEvents";
import UpcomingEventAdmin from "@/app/Components/Admin/UpcomingEventAdmin";
import { pastEvents, events } from "@/db/mockdata";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRBAC } from "@/hooks/useRBAC";

export default function EventsPage() {
  const { canManageEvents } = useRBAC();

  // Filter upcoming and past events from mock data
  const upcomingEventsList = events.filter(e => e.status === "upcoming");
  const pastEventsList = pastEvents;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Events Management</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingEventsList.length > 0 ? (
            upcomingEventsList.map((event: any) => (
              <UpcomingEventAdmin
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                image_url={event.image_url}
                date={new Date(event.event_time).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                time={new Date(event.event_time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                venue={event.location || "TBD"}
                registered_count={event.registered_count}
                capacity={event.capacity}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No upcoming events
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {pastEventsList.map((event: any) => (
              <PastEvents
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                image_url={event.image}
                date={event.date}
                venue=""
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
