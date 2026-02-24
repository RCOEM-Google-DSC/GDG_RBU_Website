"use client";

import { useEffect, useState } from "react";
import PastEvents from "@/app/Components/Admin/PastEvents";
import UpcomingEventAdmin from "@/app/Components/Admin/UpcomingEventAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRBAC } from "@/hooks/useRBAC";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";

type Event = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  date: string;
  time: string;
  venue: string | null;
  registered_count?: number;
  max_participants: number | null;
  status?: string;
};

export default function EventsPage() {
  const { canManageEvents } = useRBAC();
  const [upcomingEventsList, setUpcomingEventsList] = useState<Event[]>([]);
  const [pastEventsList, setPastEventsList] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

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
        .select(
          `
          id,
          title,
          description,
          image_url,
          date,
          time,
          venue,
          max_participants
        `,
        )
        .gte("date", now)
        .order("date", { ascending: true });

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
        }),
      );

      // Fetch past events
      const { data: pastData, error: pastError } = await supabase
        .from("events")
        .select(
          `
          id,
          title,
          description,
          image_url,
          date,
          time,
          venue
        `,
        )
        .lt("date", now)
        .order("date", { ascending: false });

      if (pastError) throw pastError;

      setUpcomingEventsList(upcomingWithCounts as Event[]);
      setPastEventsList(
        (pastData || []).map((e) => ({
          ...e,
          max_participants: null,
          status: "past",
        })) as Event[],
      );
    } catch (error: any) {
      console.error("Error fetching events:", error);
      console.error("Details:", {
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        code: error?.code,
      });
      toast.error(
        `Failed to fetch events: ${error?.message || "Unknown error"}`,
      );
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
            upcomingEventsList.map((event) => (
              <UpcomingEventAdmin
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                image_url={event.image_url || ""}
                date={new Date(event.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                time={event.time || ""}
                venue={event.venue || "TBD"}
                registered_count={event.registered_count}
                capacity={event.max_participants ?? undefined}
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
            {pastEventsList.map((event) => (
              <PastEvents
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                image_url={event.image_url || ""}
                date={new Date(event.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                venue={event.venue || ""}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
