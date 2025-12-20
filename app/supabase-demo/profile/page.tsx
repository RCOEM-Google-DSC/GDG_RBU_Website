"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Calendar, Clock, Shield, Key, LogOut, Loader2, CheckCircle2, AlertCircle, RefreshCw, Edit3, Save, X } from "lucide-react";
import { supabase, getSession, getCurrentUserId, getUserRegistrations } from "@/supabase/supabase";

export default function ProfileDemoPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [session, setSession] = useState<any>(null);
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ full_name: "", avatar_url: "" });

    useEffect(() => {
        (async () => {
            try {
                const sess = await getSession();
                if (sess) {
                    setSession(sess);
                    setUser(sess.user);
                    setEditData({ full_name: sess.user?.user_metadata?.full_name || "", avatar_url: sess.user?.user_metadata?.avatar_url || "" });
                    try { setRegistrations(await getUserRegistrations() || []); } catch { }
                }
            } catch (err) { console.error(err); }
            finally { setIsLoading(false); }
        })();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, sess) => {
            setSession(sess);
            setUser(sess?.user ?? null);
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const { error } = await supabase.auth.updateUser({ data: editData });
            if (error) throw error;
            setMessage({ type: "success", text: "Profile updated!" });
            setIsEditing(false);
            const sess = await getSession();
            if (sess) setUser(sess.user);
        } catch (err: any) { setMessage({ type: "error", text: err.message }); }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/supabase-demo/auth");
    };

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="text-purple-500 animate-spin" size={32} /></div>;

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <button onClick={() => router.push("/supabase-demo")} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"><ArrowLeft size={16} /> Back</button>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs"><User size={12} /> Profile Demo</div>
                </div>
            </nav>

            <main className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
                {!user ? (
                    <div className="text-center py-20 bg-[#0F0F0F] rounded-2xl border border-white/10">
                        <User className="text-gray-600 mx-auto mb-4" size={48} />
                        <h3 className="text-gray-400 font-medium mb-2">Not Signed In</h3>
                        <p className="text-gray-600 text-sm mb-6">Sign in to view your profile</p>
                        <button onClick={() => router.push("/supabase-demo/auth")} className="px-6 py-2 bg-purple-600 rounded-lg text-sm font-medium">Go to Auth</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="lg:col-span-1 bg-[#0F0F0F] rounded-2xl border border-white/10 p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 via-pink-500 to-red-500"></div>

                            <div className="text-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center border-2 border-purple-500/30 mx-auto mb-4">
                                    {user.user_metadata?.avatar_url ? <img src={user.user_metadata.avatar_url} alt="" className="w-full h-full rounded-full object-cover" /> : <User className="text-purple-400" size={32} />}
                                </div>
                                <h2 className="text-xl font-bold">{user.user_metadata?.full_name || "Anonymous"}</h2>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 py-2 border-b border-white/5"><Key size={14} className="text-gray-500" /><span className="text-gray-500">ID:</span><span className="text-gray-400 truncate text-xs font-mono ml-auto">{user.id.slice(0, 12)}...</span></div>
                                <div className="flex items-center gap-3 py-2 border-b border-white/5"><Shield size={14} className="text-gray-500" /><span className="text-gray-500">Provider:</span><span className="text-gray-400 ml-auto">{user.app_metadata?.provider || "email"}</span></div>
                                <div className="flex items-center gap-3 py-2 border-b border-white/5"><Calendar size={14} className="text-gray-500" /><span className="text-gray-500">Created:</span><span className="text-gray-400 ml-auto text-xs">{new Date(user.created_at).toLocaleDateString()}</span></div>
                                <div className="flex items-center gap-3 py-2"><Clock size={14} className="text-gray-500" /><span className="text-gray-500">Last Sign In:</span><span className="text-gray-400 ml-auto text-xs">{new Date(user.last_sign_in_at).toLocaleString()}</span></div>
                            </div>

                            <div className="flex gap-2 mt-6">
                                <button onClick={() => setIsEditing(!isEditing)} className="flex-1 py-2 bg-[#151515] border border-white/10 rounded-lg text-sm flex items-center justify-center gap-2 hover:border-purple-500/50"><Edit3 size={14} /> Edit</button>
                                <button onClick={handleLogout} className="py-2 px-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20"><LogOut size={14} /></button>
                            </div>
                        </div>

                        {/* Edit / Registrations */}
                        <div className="lg:col-span-2 space-y-6">
                            {message && <div className={`p-4 rounded-xl flex items-center gap-3 text-sm ${message.type === "success" ? "bg-green-500/10 border border-green-500/30 text-green-300" : "bg-red-500/10 border border-red-500/30 text-red-300"}`}>{message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />} {message.text}</div>}

                            {isEditing && (
                                <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-6">
                                    <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
                                    <div className="space-y-4">
                                        <div><label className="text-xs text-gray-500 uppercase mb-1.5 block">Full Name</label><input type="text" value={editData.full_name} onChange={(e) => setEditData({ ...editData, full_name: e.target.value })} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" /></div>
                                        <div><label className="text-xs text-gray-500 uppercase mb-1.5 block">Avatar URL</label><input type="text" value={editData.avatar_url} onChange={(e) => setEditData({ ...editData, avatar_url: e.target.value })} placeholder="https://..." className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-sm" /></div>
                                        <div className="flex gap-3">
                                            <button onClick={handleUpdateProfile} className="flex-1 py-2 bg-purple-600 rounded-lg text-sm font-medium flex items-center justify-center gap-2"><Save size={14} /> Save</button>
                                            <button onClick={() => setIsEditing(false)} className="py-2 px-4 bg-[#151515] border border-white/10 rounded-lg text-gray-400"><X size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Registrations */}
                            <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Calendar size={18} className="text-orange-400" /> My Registrations</h3>
                                {registrations.length === 0 ? <p className="text-gray-500 text-sm py-8 text-center">No registrations yet</p> : (
                                    <div className="space-y-3">
                                        {registrations.map((reg: any) => (
                                            <div key={reg.id} className="bg-[#151515] rounded-lg p-4 flex items-center justify-between">
                                                <div>
                                                    <p className="text-white font-medium">{reg.events?.title || "Event"}</p>
                                                    <p className="text-gray-500 text-xs mt-1">{new Date(reg.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs rounded ${reg.team_name ? "bg-orange-500/10 text-orange-400" : "bg-blue-500/10 text-blue-400"}`}>{reg.team_name || "Individual"}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Session Info */}
                            <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Shield size={18} className="text-blue-400" /> Session Details</h3>
                                <div className="bg-[#151515] rounded-lg p-4 space-y-2 text-xs">
                                    <div className="flex justify-between"><span className="text-gray-500">Token Type:</span><span className="text-gray-400">{session?.token_type}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Expires:</span><span className="text-gray-400">{session?.expires_at && new Date(session.expires_at * 1000).toLocaleString()}</span></div>
                                    <div className="mt-3 pt-3 border-t border-white/5"><span className="text-gray-500">Access Token:</span><code className="block text-gray-600 mt-1 break-all text-[10px]">{session?.access_token?.slice(0, 80)}...</code></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
