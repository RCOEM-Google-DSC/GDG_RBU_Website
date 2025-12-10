"use client";

import { useEffect } from "react";
import { X, Upload } from "lucide-react";

/* ========= SHARED ========= */

export function Pagination({ page, totalPages, setPage }: any) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-6 flex justify-center gap-2 text-sm">
      <button
        onClick={() => setPage((p: number) => p - 1)}
        disabled={page === 1}
        className="border px-3 py-1 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button
        onClick={() => setPage((p: number) => p + 1)}
        disabled={page === totalPages}
        className="border px-3 py-1 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

/* ========= UI HELPERS ========= */

export function Header({ title, action, onAction }: any) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {action && (
        <button
          onClick={onAction}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {action}
        </button>
      )}
    </div>
  );
}

export function Modal({ title, children, onClose }: any) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl shadow-lg w-[600px] max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <X onClick={onClose} className="cursor-pointer hover:text-gray-600" />
        </div>
        {children}
      </div>
    </div>
  );
}

export function FormInput({ label, value, onChange, type = "text" }: any) {
  return (
    <div className="mb-3">
      <label className="text-sm font-medium block mb-1">{label}</label>
      <input
        className="w-full border p-2 rounded"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
    </div>
  );
}

export function FormTextarea({ label, value, onChange }: any) {
  return (
    <div className="mb-3">
      <label className="text-sm font-medium block mb-1">{label}</label>
      <textarea
        className="w-full border p-2 rounded min-h-[100px]"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function PrimaryButton({ children, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">
      {children}
    </button>
  );
}

/* ========= EVENT MODAL ========= */

export function EventModal({
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

      <div className="mb-3">
        <label className="text-sm font-medium block mb-1">Image</label>
        <label className="flex items-center gap-2 border border-dashed p-3 rounded cursor-pointer text-sm hover:bg-gray-50">
          <Upload className="h-4 w-4" />
          {imageFile ? imageFile.name : "Upload image"}
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      <FormInput
        label="Date"
        type="date"
        value={form.date}
        onChange={(v: string) => setForm({ ...form, date: v })}
      />

      <FormInput
        label="Time"
        type="time"
        value={form.time}
        onChange={(v: string) => setForm({ ...form, time: v })}
      />

      <FormInput
        label="Event Time (Full)"
        type="datetime-local"
        value={form.event_time}
        onChange={(v: string) => setForm({ ...form, event_time: v })}
      />

      <div className="mb-3">
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

      <FormInput
        label="Max Participants"
        type="number"
        value={form.max_participants}
        onChange={(v: string) =>
          setForm({ ...form, max_participants: v })
        }
      />

      <div className="mb-3">
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

      <FormInput
        label="Category"
        value={form.category}
        onChange={(v: string) => setForm({ ...form, category: v })}
      />

      <FormInput
        label="Status"
        value={form.status}
        onChange={(v: string) => setForm({ ...form, status: v })}
      />

      <div className="mb-3">
        <label className="text-sm font-medium block mb-1">Partner</label>
        <select
          className="w-full border p-2 rounded"
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
