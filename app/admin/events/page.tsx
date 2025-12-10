"use client";

import { useEffect, useState } from "react";
import { supabase, getCurrentUserId } from "@/supabase/supabase";
import { Event, Partner } from "@/lib/types";
import GridBackground from "@/app/Components/Reusables/grid";
import { Header, Pagination, EventModal } from "../_components/SharedComponents";

const PAGE_SIZE = 6;

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
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
      .then(({ data }) => setEvents(data || []));
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
    setEvents(data || []);
    setOpen(false);
    setEditingEvent(null);
    setForm(emptyForm);
    setImageFile(null);
  };

  const filtered = events.filter((e) =>
    `${e.title} ${e.venue}`.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="relative">
      <GridBackground>
        <div className="max-w-6xl mx-auto">
          <Header
            title="Events"
            action="Create Event"
            onAction={() => {
              setEditingEvent(null);
              setForm(emptyForm);
              setImageFile(null);
              setOpen(true);
            }}
          />

          <input
            className="mb-4 w-full rounded p-2 text-sm border border-black"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((e) => (
              <div key={e.id} className="bg-white shadow rounded-lg overflow-hidden">
                {e.image_url && (
                  <img src={e.image_url} className="h-40 w-full object-cover" alt={e.title} />
                )}
                <div className="p-4">
                  <h3 className="font-semibold">{e.title}</h3>

                  {e.partners?.logo_url && (
                    <img src={e.partners.logo_url} className="h-8 mt-2" alt="Partner logo" />
                  )}

                  <p className="text-sm mt-1">{e.venue}</p>
                  <button
                    className="mt-2 px-4 py-1 text-sm text-white rounded border-2 border-black bg-black hover:bg-gray-800"
                    onClick={() => {
                      setEditingEvent(e);
                      setForm({
                        title: e.title || "",
                        description: e.description || "",
                        venue: e.venue || "",
                        image_url: e.image_url || "",
                        date: e.date || "",
                        time: e.time || "",
                        event_time: e.event_time || "",
                        is_paid: !!e.is_paid,
                        fee:
                          typeof e.fee === "number" && !isNaN(e.fee)
                            ? String(e.fee)
                            : "",
                        max_participants:
                          typeof e.max_participants === "number" &&
                            !isNaN(e.max_participants)
                            ? String(e.max_participants)
                            : "",
                        is_team_event: !!e.is_team_event,
                        max_team_size:
                          typeof e.max_team_size === "number" &&
                            !isNaN(e.max_team_size)
                            ? String(e.max_team_size)
                            : "",
                        category: e.category || "",
                        status: e.status || "",
                        partner_id: e.partners?.id || e.partner_id || "",
                      });
                      setImageFile(null);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={Math.ceil(filtered.length / PAGE_SIZE)}
            setPage={setPage}
          />

          {open && (
            <EventModal
              editingEvent={editingEvent}
              partners={partners}
              form={form}
              setForm={setForm}
              imageFile={imageFile}
              setImageFile={setImageFile}
              onClose={() => {
                setOpen(false);
                setEditingEvent(null);
                setImageFile(null);
              }}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </GridBackground>
    </div>
  );
}
