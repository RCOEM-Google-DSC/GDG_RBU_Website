"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users, Calendar, UserPlus, Shield, Loader2, CheckCircle2, AlertCircle, RefreshCw, User, Trash2, Eye, Lock } from "lucide-react";
import { supabase, registerForEvent, getUserRegistrations, getCurrentUserId, getEvents } from "@/supabase/supabase";

export default function RegistrationsDemoPage() {
    const router = useRouter();
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [formData, setFormData] = useState({ team_name: "", is_team_registration: false, wants_random_team: false });

    useEffect(() => {
        (async () => {
            try {
                const uid = await getCurrentUserId();
                setUserId(uid);
                if (uid) { setRegistrations(await getUserRegistrations() || []); }
                setEvents(await getEvents() || []);
            } catch (err) { console.error(err); }
            finally { setIsLoading(false); }
        })();
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEvent || !userId) return;
        setIsSubmitting(true); setMessage(null);
        try {
            await registerForEvent(selectedEvent, formData);
            setMessage({ type: "success", text: "Registration successful! user_id was auto-set to your auth.uid()" });
            setRegistrations(await getUserRegistrations() || []);
            setSelectedEvent(""); setFormData({ team_name: "", is_team_registration: false, wants_random_team: false });
        } catch (err: any) { setMessage({ type: "error", text: err.message }); }
        finally { setIsSubmitting(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this registration?")) return;
        try {
            await supabase.from("registrations").delete().eq("id", id);
            setMessage({ type: "success", text: "Registration deleted!" });
            setRegistrations(await getUserRegistrations() || []);
        } catch (err: any) { setMessage({ type: "error", text: err.message }); }
    };

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="text-orange-500 animate-spin" size={32} /></div>;

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <button onClick={() => router.push("/supabase-demo")} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"><ArrowLeft size={16} /> Back</button>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs"><Users size={12} /> Registrations Demo</div>
                </div>
            </nav>

            <main className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Register Form */}
                    <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 via-red-500 to-pink-500"></div>
                        <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><UserPlus size={20} className="text-orange-400" /> Register for Event</h2>
                        <p className="text-gray-500 text-sm mb-6">Tests RLS policy: user_id is auto-set to auth.uid()</p>

                        {!userId ? (
                            <div className="text-center py-8 bg-[#151515] rounded-xl border border-yellow-500/20">
                                <Lock className="text-yellow-400 mx-auto mb-3" size={32} />
                                <p className="text-yellow-300 font-medium mb-2">Authentication Required</p>
                                <p className="text-gray-500 text-sm mb-4">Sign in to register for events</p>
                                <button onClick={() => router.push("/supabase-demo/auth")} className="px-4 py-2 bg-yellow-600 rounded-lg text-sm font-medium">Sign In</button>
                            </div>
                        ) : (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase mb-1.5 block">Select Event *</label>
                                    <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} required className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm">
                                        <option value="">Choose an event...</option>
                                        {events.map((ev) => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
                                    </select>
                                </div>

                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-400">
                                        <input type="checkbox" checked={formData.is_team_registration} onChange={(e) => setFormData({ ...formData, is_team_registration: e.target.checked })} className="rounded" />
                                        Team Registration
                                    </label>
                                    {!formData.is_team_registration && (
                                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-400">
                                            <input type="checkbox" checked={formData.wants_random_team} onChange={(e) => setFormData({ ...formData, wants_random_team: e.target.checked })} className="rounded" />
                                            Random Team
                                        </label>
                                    )}
                                </div>

                                {formData.is_team_registration && (
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase mb-1.5 block">Team Name</label>
                                        <input type="text" value={formData.team_name} onChange={(e) => setFormData({ ...formData, team_name: e.target.value })} placeholder="Enter team name" className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                                    </div>
                                )}

                                {/* RLS Info */}
                                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                                    <h4 className="text-blue-400 text-sm font-medium flex items-center gap-2 mb-2"><Shield size={14} /> RLS Policy Active</h4>
                                    <p className="text-gray-500 text-xs">When you submit, <code className="text-blue-400">user_id</code> is automatically set to <code className="text-blue-400">auth.uid()</code> via the registerForEvent helper.</p>
                                    <p className="text-gray-600 text-xs mt-2">Your ID: <code className="text-gray-400">{userId.slice(0, 16)}...</code></p>
                                </div>

                                <button type="submit" disabled={isSubmitting || !selectedEvent} className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-500 disabled:opacity-50 flex items-center justify-center gap-2">
                                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <><UserPlus size={18} /> Register</>}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* My Registrations */}
                    <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2"><Calendar size={20} className="text-blue-400" /> My Registrations</h2>
                            <span className="text-xs text-gray-500">{registrations.length} total</span>
                        </div>

                        {message && <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${message.type === "success" ? "bg-green-500/10 border border-green-500/30 text-green-300" : "bg-red-500/10 border border-red-500/30 text-red-300"}`}>{message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />} {message.text}</div>}

                        {!userId ? (
                            <p className="text-gray-500 text-sm py-8 text-center">Sign in to view registrations</p>
                        ) : registrations.length === 0 ? (
                            <div className="text-center py-12 bg-[#151515] rounded-xl">
                                <Users className="text-gray-600 mx-auto mb-3" size={40} />
                                <p className="text-gray-500 text-sm">No registrations yet</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                {registrations.map((reg) => (
                                    <div key={reg.id} className="bg-[#151515] rounded-lg p-4 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${reg.team_name ? "bg-orange-500/10 text-orange-400" : "bg-blue-500/10 text-blue-400"}`}>
                                                {reg.team_name ? <Users size={18} /> : <User size={18} />}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium text-sm">{reg.events?.title || "Event"}</p>
                                                <p className="text-gray-500 text-xs mt-0.5">{reg.team_name || "Individual"} • {new Date(reg.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete(reg.id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* How RLS Works */}
                <div className="mt-8 bg-[#0F0F0F] rounded-2xl border border-white/10 p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Shield size={20} className="text-green-400" /> How RLS Works Here</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-[#151515] rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">1. Insert Policy</h4>
                            <p className="text-gray-500 text-xs">Users can only create registrations where <code className="text-green-400">user_id = auth.uid()</code></p>
                        </div>
                        <div className="bg-[#151515] rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">2. Select Policy</h4>
                            <p className="text-gray-500 text-xs">Users can only view their own registrations where <code className="text-green-400">user_id = auth.uid()</code></p>
                        </div>
                        <div className="bg-[#151515] rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">3. Delete Policy</h4>
                            <p className="text-gray-500 text-xs">Users can only delete their own registrations where <code className="text-green-400">user_id = auth.uid()</code></p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
