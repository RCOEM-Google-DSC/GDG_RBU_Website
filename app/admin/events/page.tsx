"use client";

import { useEffect, useState } from "react";
import PastEvents from "@/app/Components/Admin/PastEvents";
import UpcomingEventAdmin from "@/app/Components/Admin/UpcomingEventAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRBAC } from "@/hooks/useRBAC";
import { supabase } from "@/supabase/supabase";
import { toast } from "sonner";

type Event = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  event_time: string;
  location: string | null;
  registered_count?: number;
  capacity: number | null;
  status?: string;
};

export default function EventsPage() {
  const { canManageEvents } = useRBAC();
  const [upcomingEventsList, setUpcomingEventsList] = useState<Event[]>([]);
  const [pastEventsList, setPastEventsList] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const now = new Date().toISOString();

      // Fetch upcoming events
      const { data: upcomingData, error: upcomingError } = await supabase
        .from("events")
        .select(`
          id,
          title,
          description,
          image_url,
          event_time,
          location,
          capacity
        `)
        .gte("event_time", now)
        .order("event_time", { ascending: true });

      if (upcomingError) throw upcomingError;

      // Get registration counts for upcoming events
      const upcomingWithCounts = await Promise.all(
        (upcomingData || []).map(async (event) => {
          const { count } = await supabase
            .from("registrations")
            .select("*", { count: "exact", head: true })
            .eq("event_id", event.id);

          return {
            ...event,
            registered_count: count || 0,
            status: "upcoming",
          };
        })
      );

      // Fetch past events
      const { data: pastData, error: pastError } = await supabase
        .from("events")
        .select(`
          id,
          title,
          description,
          image_url,
          event_time,
          location
        `)
        .lt("event_time", now)
        .order("event_time", { ascending: false });

      if (pastError) throw pastError;

      setUpcomingEventsList(upcomingWithCounts);
      setPastEventsList(
        (pastData || []).map((e) => ({ ...e, capacity: null, status: "past" }))
      );
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

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
                image_url={event.image_url}
                date={new Date(event.event_time).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                venue={event.location || ""}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
