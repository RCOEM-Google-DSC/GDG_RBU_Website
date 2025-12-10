"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "@/supabase/supabase";
import { SupabaseUserRow } from "@/lib/types";
import GridBackground from "@/app/Components/Reusables/grid";
import { Header, Pagination } from "../_components/SharedComponents";

const PAGE_SIZE = 6;

export default function UsersPage() {
  const [users, setUsers] = useState<SupabaseUserRow[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    supabase
      .from("users")
      .select("id,name,email,role,created_at")
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
    <div className="relative">
      <GridBackground>
        <div className="max-w-6xl mx-auto">
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
            className="mb-4 w-full border border-black p-2 text-sm rounded"
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
        </div>
      </GridBackground>
    </div>
  );
}
