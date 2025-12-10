"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { Event, Registration } from "@/lib/types";
import GridBackground from "@/app/Components/Reusables/grid";
import { Header } from "../_components/SharedComponents";

type RegistrationWithUser = Registration & {
  users?: {
    name: string | null;
    email: string | null;
  } | null;
};

export default function RegistrationsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<RegistrationWithUser[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("events")
      .select("id,title,date,venue,image_url")
      .then(({ data }) => setEvents(data || []));
  }, []);

  const loadRegistrations = async (event: Event) => {
    setSelectedEvent(event);

    const { data } = await supabase
      .from("registrations")
      .select("*, users(name,email)")
      .eq("event_id", event.id);

    setRegistrations(data || []);
  };

  const filteredUsers = registrations.filter((r) =>
    `${r.users?.name} ${r.users?.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <GridBackground>
        <div className="max-w-6xl mx-auto">
          <Header title="Registrations" />

          {/* EVENT CARDS */}
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((e) => (
              <button
                key={e.id}
                onClick={() => loadRegistrations(e)}
                className="text-left bg-white shadow rounded-lg overflow-hidden hover:scale-[1.02] transition"
              >
                {e.image_url && (
                  <img
                    src={e.image_url}
                    className="h-36 w-full object-cover"
                    alt={e.title}
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="text-xs mt-1">
                    {e.date} — {e.venue}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* USERS LIST */}
          {selectedEvent && (
            <div className="mt-10">
              <h3 className="text-lg font-bold mb-3">
                Registered Users — {selectedEvent.title}
              </h3>

              <input
                className="mb-3 w-full border p-2 rounded text-sm border-black"
                placeholder="Search registered users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {filteredUsers.length === 0 && (
                <p className="text-sm text-neutral-500">
                  No registrations found.
                </p>
              )}

              {filteredUsers.map((r, i) => (
                <div key={i} className="bg-white border rounded p-3 mb-2">
                  <p className="font-medium">{r.users?.name || "No name"}</p>
                  <p className="text-sm text-gray-600">{r.users?.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Status: {r.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </GridBackground>
    </div>
  );
}
