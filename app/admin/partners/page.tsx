"use client";

import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { supabase } from "@/supabase/supabase";
import { Partner } from "@/lib/types";
import GridBackground from "@/app/Components/Reusables/grid";
import { useRBAC } from "@/hooks/useRBAC";

export default function PartnersPage() {
  const { canManagePartners } = useRBAC();
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
    <div className="relative">
      <GridBackground>
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-3 gap-6">
            {partners.map((p) => (
              <div key={p.id} className="bg-white shadow p-4 rounded">
                {p.logo_url && <img src={p.logo_url} className="h-10 mb-2" alt={p.name} />}
                <h3 className="font-semibold">{p.name}</h3>
                {p.website && (
                  <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    {p.website}
                  </a>
                )}
                {canManagePartners && (
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800"
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
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      onClick={() => deletePartner(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </GridBackground>
    </div>
  );
}
