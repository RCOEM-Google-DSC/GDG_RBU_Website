"use client";

import { useEffect, useState } from "react";
import { supabase, getCurrentUserId } from "@/supabase/supabase";
import { Event, Partner } from "@/lib/types";
import PastEvents from "@/app/Components/Admin/PastEvents";
import UpcomingEventAdmin from "@/app/Components/Admin/UpcomingEventAdmin";
import { pastEvents, upcomingEvents, events } from "@/db/mockdata";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRBAC } from "@/hooks/useRBAC";

export default function EventsPage() {
  const { canManageEvents } = useRBAC();
  const [dbEvents, setDbEvents] = useState<Event[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const emptyForm = {
    title: "",
    description: "",
    venue: "",
    image_url: "",
    date: "",
    time: "",
    event_time: "",
    is_paid: false,
    fee: "",
    max_participants: "",
    is_team_event: false,
    max_team_size: "",
    category: "",
    status: "",
    partner_id: "",
  };

  const [form, setForm] = useState<any>(emptyForm);

  useEffect(() => {
    supabase
      .from("events")
      .select("*, partners(*)")
      .then(({ data }) => setDbEvents(data || []));
    supabase.from("partners").select("*").then(({ data }) => setPartners(data || []));
  }, []);

  const uploadImageIfNeeded = async () => {
    if (!imageFile) return form.image_url || null;
    const fd = new FormData();
    fd.append("file", imageFile);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async () => {
    const image_url = await uploadImageIfNeeded();

    const payload: any = {
      ...form,
      image_url,
      fee: form.fee ? Number(form.fee) : null,
      max_participants: form.max_participants
        ? Number(form.max_participants)
        : null,
      max_team_size: form.max_team_size ? Number(form.max_team_size) : null,
      is_paid: !!form.is_paid,
      is_team_event: !!form.is_team_event,
    };

    if (!payload.category) payload.category = null;
    if (!payload.status) delete payload.status;
    if (!payload.partner_id) payload.partner_id = null;

    if (editingEvent) {
      await supabase.from("events").update(payload).eq("id", editingEvent.id);
    } else {
      const organizer_id = await getCurrentUserId();
      await supabase.from("events").insert({
        ...payload,
        organizer_id,
      });
    }

    const { data } = await supabase.from("events").select("*, partners(*)");
    setDbEvents(data || []);
    setOpen(false);
    setEditingEvent(null);
    setForm(emptyForm);
    setImageFile(null);
  };

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
