"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Plus, Edit3, Trash2, MapPin, Users, DollarSign, Loader2, CheckCircle2, AlertCircle, RefreshCw, Database, X } from "lucide-react";
import { supabase, getEvents, createEvent, updateEvent, getCurrentUserId } from "@/supabase/supabase";

interface Event {
    id: string; title: string; description?: string; date: string; time?: string; venue?: string;
    is_paid?: boolean; fee?: number; max_participants?: number; is_team_event?: boolean;
    max_team_size?: number; category?: string; organizer_id?: string;
}

export default function EventsDemoPage() {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState({ title: "", description: "", date: "", time: "", venue: "", is_paid: false, fee: 0, is_team_event: false, max_team_size: 4, category: "workshop" });

    useEffect(() => {
        (async () => {
            setUserId(await getCurrentUserId());
            await loadEvents();
        })();
    }, []);

    const loadEvents = async () => {
        setIsLoading(true);
        try { setEvents(await getEvents() || []); }
        catch (err: any) { setMessage({ type: "error", text: err.message }); }
        finally { setIsLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setIsSubmitting(true); setMessage(null);
        try {
            if (editingEvent) { await updateEvent(editingEvent.id, formData); setMessage({ type: "success", text: "Event updated!" }); }
            else { await createEvent(formData); setMessage({ type: "success", text: "Event created!" }); }
            setShowModal(false); setEditingEvent(null); await loadEvents();
        } catch (err: any) { setMessage({ type: "error", text: err.message }); }
        finally { setIsSubmitting(false); }
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({ title: event.title, description: event.description || "", date: event.date, time: event.time || "", venue: event.venue || "", is_paid: event.is_paid || false, fee: event.fee || 0, is_team_event: event.is_team_event || false, max_team_size: event.max_team_size || 4, category: event.category || "workshop" });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this event?")) return;
        try { await supabase.from("events").delete().eq("id", id); await loadEvents(); setMessage({ type: "success", text: "Deleted!" }); }
        catch (err: any) { setMessage({ type: "error", text: err.message }); }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <button onClick={() => router.push("/supabase-demo")} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"><ArrowLeft size={16} /> Back</button>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs"><Database size={12} /> Events CRUD</div>
                </div>
            </nav>

            <main className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div><h1 className="text-2xl font-bold">Events Database</h1><p className="text-gray-500 text-sm">{events.length} events</p></div>
                    <div className="flex gap-3">
                        <button onClick={loadEvents} disabled={isLoading} className="px-4 py-2 bg-[#151515] border border-white/10 rounded-lg text-sm flex items-center gap-2"><RefreshCw size={14} className={isLoading ? "animate-spin" : ""} /> Refresh</button>
                        <button onClick={() => { setEditingEvent(null); setFormData({ title: "", description: "", date: "", time: "", venue: "", is_paid: false, fee: 0, is_team_event: false, max_team_size: 4, category: "workshop" }); setShowModal(true); }} disabled={!userId} className="px-4 py-2 bg-blue-600 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"><Plus size={16} /> Create</button>
                    </div>
                </div>

                {!userId && <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-300 text-sm flex items-center gap-3"><AlertCircle size={18} /> Sign in to create events</div>}
                {message && <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm ${message.type === "success" ? "bg-green-500/10 border border-green-500/30 text-green-300" : "bg-red-500/10 border border-red-500/30 text-red-300"}`}>{message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />} {message.text}</div>}

                {isLoading ? <div className="flex justify-center py-20"><Loader2 className="text-blue-500 animate-spin" size={32} /></div> : events.length === 0 ? <div className="text-center py-20 bg-[#0F0F0F] rounded-2xl border border-white/10"><Calendar className="text-gray-600 mx-auto mb-4" size={48} /><p className="text-gray-500">No events yet</p></div> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {events.map((e) => (
                            <div key={e.id} className="bg-[#0F0F0F] rounded-xl border border-white/10 p-5 hover:border-white/20 transition-all">
                                <div className="flex justify-between mb-3">
                                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded capitalize">{e.category}</span>
                                    {e.is_paid && <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded flex items-center gap-1"><DollarSign size={10} />₹{e.fee}</span>}
                                </div>
                                <h3 className="text-white font-semibold mb-2">{e.title}</h3>
                                {e.description && <p className="text-gray-500 text-sm mb-3 line-clamp-2">{e.description}</p>}
                                <div className="space-y-1 text-xs text-gray-500 mb-4">
                                    <div className="flex items-center gap-2"><Calendar size={12} />{new Date(e.date).toLocaleDateString()}</div>
                                    {e.venue && <div className="flex items-center gap-2"><MapPin size={12} />{e.venue}</div>}
                                    {e.is_team_event && <div className="flex items-center gap-2"><Users size={12} />Team: max {e.max_team_size}</div>}
                                </div>
                                <div className="flex gap-2 pt-3 border-t border-white/5">
                                    <button onClick={() => handleEdit(e)} className="flex-1 py-2 bg-[#151515] border border-white/10 rounded-lg text-xs hover:border-blue-500/50 flex items-center justify-center gap-1"><Edit3 size={12} /> Edit</button>
                                    <button onClick={() => handleDelete(e.id)} className="py-2 px-3 bg-[#151515] border border-white/10 rounded-lg hover:border-red-500/50 hover:text-red-400"><Trash2 size={12} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-[#0F0F0F] p-5 border-b border-white/10 flex justify-between"><h2 className="text-lg font-semibold">{editingEvent ? "Edit" : "Create"} Event</h2><button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X size={20} /></button></div>
                            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                                <input type="text" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="Event Title *" className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                                <textarea name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" rows={2} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm resize-none" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required className="bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                                    <input type="time" name="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                                </div>
                                <input type="text" name="venue" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} placeholder="Venue" className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                                <select name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm">
                                    <option value="workshop">Workshop</option><option value="hackathon">Hackathon</option><option value="conference">Conference</option><option value="meetup">Meetup</option>
                                </select>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-400"><input type="checkbox" checked={formData.is_paid} onChange={(e) => setFormData({ ...formData, is_paid: e.target.checked })} className="rounded" /> Paid Event</label>
                                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-400"><input type="checkbox" checked={formData.is_team_event} onChange={(e) => setFormData({ ...formData, is_team_event: e.target.checked })} className="rounded" /> Team Event</label>
                                </div>
                                {formData.is_paid && <input type="number" value={formData.fee} onChange={(e) => setFormData({ ...formData, fee: +e.target.value })} placeholder="Fee (₹)" className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />}
                                {formData.is_team_event && <input type="number" value={formData.max_team_size} onChange={(e) => setFormData({ ...formData, max_team_size: +e.target.value })} min={2} max={10} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />}
                                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 disabled:opacity-50 flex items-center justify-center gap-2">{isSubmitting ? <Loader2 className="animate-spin" size={18} /> : editingEvent ? <><Edit3 size={18} /> Update</> : <><Plus size={18} /> Create</>}</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
