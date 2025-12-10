"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Handshake,
  ClipboardList,
  Users as UsersIcon,
  Plus,
  X,
  Trash2,
  Upload,
} from "lucide-react";

import GridBackground from "../Components/Reusables/grid";
import { supabase, getCurrentUserId } from "../../supabase/supabase";

/* ========= TYPES ========= */

type Partner = {
  id: string;
  name: string;
  website: string;
  logo_url: string;
};

type Event = {
  id: string;
  title: string;
  description: string;
  venue: string;
  image_url: string;
  date: string;
  time?: string;
  event_time?: string;
  is_paid?: boolean;
  fee?: number | null;
  max_participants?: number | null;
  is_team_event?: boolean;
  max_team_size?: number | null;
  category?: string;
  status?: string;
  partner_id?: string | null;
  partners?: Partner | null;
};

type Registration = {
  users?: { name: string; email: string } | null;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "user" | null;
};

const PAGE_SIZE = 6;

/* ========= MAIN PAGE ========= */

export default function AdminPage() {
  const [tab, setTab] = useState<
    "events" | "partners" | "registrations" | "users"
  >("events");

  return (
<div className="relative flex h-[calc(100vh-96px)] bg-white">


      <aside className="relative z-40 w-64 border-r bg-white p-4 space-y-3">
        <SidebarButton
          icon={Calendar}
          active={tab === "events"}
          label="Events"
          onClick={() => setTab("events")}
        />
        <SidebarButton
          icon={Handshake}
          active={tab === "partners"}
          label="Partners"
          onClick={() => setTab("partners")}
        />
        <SidebarButton
          icon={ClipboardList}
          active={tab === "registrations"}
          label="Registrations"
          onClick={() => setTab("registrations")}
        />
        <SidebarButton
          icon={UsersIcon}
          active={tab === "users"}
          label="Users"
          onClick={() => setTab("users")}
        />
      </aside>

      <main className="relative z-10 flex-1 overflow-y-auto">
        <GridBackground>
          <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {tab === "events" && <EventsView />}
            {tab === "partners" && <PartnersView />}
            {tab === "registrations" && <RegistrationsView />}
            {tab === "users" && <UsersView />}
          </div>
        </GridBackground>
      </main>
    </div>
  );
}

/* ========= SIDEBAR ========= */

function SidebarButton({ icon: Icon, active, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition ${
        active ? "bg-black text-white" : "text-neutral-600 hover:bg-neutral-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

/* ========= EVENTS ========= */

function EventsView() {
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
      // convert numeric-ish fields
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
    <>
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
        className="mb-4 w-full rounded p-2 text-sm border-1 border-black"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((e) => (
          <div key={e.id} className="bg-white shadow rounded-lg overflow-hidden">
            {e.image_url && (
              <img src={e.image_url} className="h-40 w-full object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-semibold">{e.title}</h3>

              {e.partners?.logo_url && (
                <img src={e.partners.logo_url} className="h-8 mt-2" />
              )}

              <p className="text-sm mt-1">{e.venue}</p>
              <button
                className="mt-2 text-s text-white rounded border-2 border-black bg-black"
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
    </>
  );
}

/* ========= PARTNERS ========= */

function PartnersView() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", website: "", logo_url: "" });

  useEffect(() => {
    supabase
      .from("partners")
      .select("*")
      .then(({ data }) => setPartners(data || []));
  }, []);

  const uploadLogo = async () => {
    if (!logoFile) return form.logo_url || null;
    const fd = new FormData();
    fd.append("file", logoFile);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url;
  };

  const savePartner = async () => {
    const logo_url = await uploadLogo();

    if (editing) {
      await supabase
        .from("partners")
        .update({ ...form, logo_url })
        .eq("id", editing.id);
    } else {
      await supabase.from("partners").insert({ ...form, logo_url });
    }

    const { data } = await supabase.from("partners").select("*");
    setPartners(data || []);
    setOpen(false);
    setEditing(null);
    setLogoFile(null);
  };

  const deletePartner = async (id: string) => {
    if (!confirm("Delete partner?")) return;
    await supabase.from("partners").delete().eq("id", id);
    setPartners((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <Header
        title="Partners"
        action="Add Partner"
        onAction={() => {
          setEditing(null);
          setForm({ name: "", website: "", logo_url: "" });
          setLogoFile(null);
          setOpen(true);
        }}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {partners.map((p) => (
          <div key={p.id} className="bg-white shadow p-4 rounded">
            {p.logo_url && <img src={p.logo_url} className="h-10 mb-2" />}
            <h3 className="font-semibold">{p.name}</h3>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setEditing(p);
                  setForm({
                    name: p.name || "",
                    website: p.website || "",
                    logo_url: p.logo_url || "",
                  });
                  setLogoFile(null);
                  setOpen(true);
                }}
              >
                Edit
              </button>
              <button onClick={() => deletePartner(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal
          title={editing ? "Edit Partner" : "Add Partner"}
          onClose={() => {
            setOpen(false);
            setEditing(null);
            setLogoFile(null);
          }}
        >
          <FormInput
            label="Name"
            value={form.name}
            onChange={(v: string) => setForm({ ...form, name: v })}
          />
          <FormInput
            label="Website"
            value={form.website}
            onChange={(v: string) => setForm({ ...form, website: v })}
          />

          <label className="flex items-center gap-2 border border-dashed p-3 rounded cursor-pointer text-sm">
            <Upload className="h-4 w-4" />
            {logoFile ? logoFile.name : "Upload logo"}
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
            />
          </label>

          <PrimaryButton onClick={savePartner}>
            {editing ? "Save Changes" : "Add Partner"}
          </PrimaryButton>
        </Modal>
      )}
    </>
  );
}

/* ========= REGISTRATIONS ========= */

function RegistrationsView() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
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
      .select("users(name,email)")
      .eq("event_id", event.id);

    setRegistrations(data || []);
  };

  const filteredUsers = registrations.filter((r) =>
    `${r.users?.name} ${r.users?.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
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
              {r.users?.name} ({r.users?.email})
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ========= USERS ========= */

function UsersView() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    supabase
      .from("users")
      .select("id,name,email,role")
      .order("created_at", { ascending: false })
      .then(({ data }) => setUsers(data || []));
  }, []);

  const filtered = users.filter((u) => {
    const matchesSearch = `${u.name} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRole = roleFilter ? u.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateRole = async (id: string, role: string) => {
    await supabase.from("users").update({ role }).eq("id", id);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: role as any } : u))
    );
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await supabase.from("users").delete().eq("id", id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <>
      <Header title="Users" />

      <input
        className="mb-3 w-full border border-black rounded p-2 text-sm"
        placeholder="Search users..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <select
        className="mb-4 w-full border border-black p-2 text-sm"
        value={roleFilter}
        onChange={(e) => {
          setRoleFilter(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="member">Member</option>
        <option value="user">User</option>
      </select>

      <div className="space-y-3">
        {paginated.map((u) => (
          <div
            key={u.id}
            className="bg-white shadow rounded p-3 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{u.name || "No name"}</p>
              <p className="text-xs text-neutral-500">{u.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={u.role || "user"}
                onChange={(e) => updateRole(u.id, e.target.value)}
                className="border rounded p-1 text-xs"
              >
                <option value="user">User</option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={() => deleteUser(u.id)}
                className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
}

/* ========= SHARED ========= */

function Pagination({ page, totalPages, setPage }: any) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-6 flex justify-center gap-2 text-sm">
      <button
        onClick={() => setPage((p: number) => p - 1)}
        disabled={page === 1}
        className="border px-3 py-1 rounded"
      >
        Prev
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button
        onClick={() => setPage((p: number) => p + 1)}
        disabled={page === totalPages}
        className="border px-3 py-1 rounded"
      >
        Next
      </button>
    </div>
  );
}

/* ========= UI HELPERS ========= */

function Header({ title, action, onAction }: any) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {action && (
        <button
          onClick={onAction}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {action}
        </button>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: any) {
  useEffect(() => {
    // lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      // restore scroll when modal closes
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl shadow-lg w-[600px] max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        {children}
      </div>
    </div>
  );
}



function FormInput({ label, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input
        className="w-full border p-2 rounded mt-1"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
    </div>
  );
}

function FormTextarea({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <textarea
        className="w-full border p-2 rounded mt-1"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function PrimaryButton({ children, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full bg-black text-white p-2 rounded">
      {children}
    </button>
  );
}

/* ========= EVENT MODAL ========= */

function EventModal({
  editingEvent,
  partners,
  form,
  setForm,
  imageFile,
  setImageFile,
  onClose,
  onSubmit,
}: any) {
  return (
    <Modal
      title={editingEvent ? "Edit Event" : "Create Event"}
      onClose={onClose}
    >
      <FormInput
        label="Title"
        value={form.title}
        onChange={(v: string) => setForm({ ...form, title: v })}
      />

      <FormTextarea
        label="Description"
        value={form.description}
        onChange={(v: string) => setForm({ ...form, description: v })}
      />

      <FormInput
        label="Venue"
        value={form.venue}
        onChange={(v: string) => setForm({ ...form, venue: v })}
      />

      {/* IMAGE UPLOAD */}
      <label className="text-sm">Image</label>
      <label className="flex items-center gap-2 border border-dashed p-3 rounded cursor-pointer text-sm">
        <Upload className="h-4 w-4" />
        {imageFile ? imageFile.name : "Upload image"}
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </label>

      {/* DATE */}
      <FormInput
        label="Date"
        type="date"
        value={form.date}
        onChange={(v: string) => setForm({ ...form, date: v })}
      />

      {/* TIME (text/time field) */}
      <FormInput
        label="Time"
        type="time"
        value={form.time}
        onChange={(v: string) => setForm({ ...form, time: v })}
      />

      {/* EVENT TIME (timestamp) */}
      <FormInput
        label="Event Time (Full)"
        type="datetime-local"
        value={form.event_time}
        onChange={(v: string) => setForm({ ...form, event_time: v })}
      />

      {/* PAID / FEE */}
      <div className="mt-3">
        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!form.is_paid}
            onChange={(e) =>
              setForm({ ...form, is_paid: e.target.checked })
            }
          />
          Paid event
        </label>
      </div>

      {form.is_paid && (
        <FormInput
          label="Fee"
          type="number"
          value={form.fee}
          onChange={(v: string) => setForm({ ...form, fee: v })}
        />
      )}

      {/* MAX PARTICIPANTS */}
      <FormInput
        label="Max Participants"
        type="number"
        value={form.max_participants}
        onChange={(v: string) =>
          setForm({ ...form, max_participants: v })
        }
      />

      {/* TEAM EVENT */}
      <div className="mt-3">
        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!form.is_team_event}
            onChange={(e) =>
              setForm({ ...form, is_team_event: e.target.checked })
            }
          />
          Team event
        </label>
      </div>

      {form.is_team_event && (
        <FormInput
          label="Max Team Size"
          type="number"
          value={form.max_team_size}
          onChange={(v: string) => setForm({ ...form, max_team_size: v })}
        />
      )}

      {/* CATEGORY */}
      <FormInput
        label="Category"
        value={form.category}
        onChange={(v: string) => setForm({ ...form, category: v })}
      />

      {/* STATUS (free text, since enum values are defined in DB) */}
      <FormInput
        label="Status"
        value={form.status}
        onChange={(v: string) => setForm({ ...form, status: v })}
      />

      {/* PARTNER DROPDOWN */}
      <div className="mb-3 mt-3">
        <label className="text-sm">Partner</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={form.partner_id}
          onChange={(e) =>
            setForm({ ...form, partner_id: e.target.value })
          }
        >
          <option value="">No Partner</option>
          {partners.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <PrimaryButton onClick={onSubmit}>
        {editingEvent ? "Save Changes" : "Create"}
      </PrimaryButton>
    </Modal>
  );
}
