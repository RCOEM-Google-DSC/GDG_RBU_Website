"use client";

import { useEffect, useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
// ✅ Import the request-scoped browser client factory
import { createClient } from "@/utils/supabase/client";
import DataTable from "@/app/Components/Reusables/DataTable";
import ConfirmDialog from "@/app/Components/Reusables/ConfirmDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRBAC } from "@/hooks/useRBAC";

type UserListItem = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  created_at: string;
};

export default function UsersPage() {
  // ✅ Initialize the client locally inside the component
  const supabase = createClient();
  const { canManageUsers } = useRBAC();
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // Role change warning dialog state
  const [roleChangeDialogOpen, setRoleChangeDialogOpen] = useState(false);
  const [pendingRoleChange, setPendingRoleChange] = useState<{
    userId: string;
    newRole: string;
    oldRole: string;
  } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [supabase]); // Added supabase to dependency array for safety

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id,name,email,role,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } else {
      setUsers(data || []);
    }
  };

  const filtered = users.filter((u) => {
    const matchesSearch = `${u.name} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRole = roleFilter ? u.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (userId: string, newRole: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    // Check if changing from "user" to "admin" or "member"
    if (user.role === "user" && (newRole === "admin" || newRole === "member")) {
      setPendingRoleChange({
        userId,
        newRole,
        oldRole: user.role,
      });
      setRoleChangeDialogOpen(true);
    } else {
      // Direct update for other role changes
      updateRole(userId, newRole);
    }
  };

  const updateRole = async (id: string, role: string) => {
    const { error } = await supabase
      .from("users")
      .update({ role })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update role");
      console.error(error);
    } else {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: role as any } : u)),
      );
      toast.success("Role updated successfully");
    }
  };

  const confirmRoleChange = () => {
    if (pendingRoleChange) {
      updateRole(pendingRoleChange.userId, pendingRoleChange.newRole);
      setPendingRoleChange(null);
      setRoleChangeDialogOpen(false);
    }
  };

  const cancelRoleChange = () => {
    setPendingRoleChange(null);
    setRoleChangeDialogOpen(false);
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", userToDelete);

      if (error) {
        toast.error("Failed to delete user: " + error.message);
        console.error("Delete error:", error);
      } else {
        setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
        toast.success("User deleted successfully");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Delete exception:", err);
    } finally {
      setUserToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
    setDeleteDialogOpen(false);
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }: any) => {
        const user = row.original;
        return (
          <Select
            value={user.role}
            onValueChange={(value) => handleRoleChange(user.id, value)}
            disabled={!canManageUsers}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue>
                <span className="flex items-center gap-2">{user.role}</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user" className="cursor-pointer">
                <span className="flex items-center gap-2">user</span>
              </SelectItem>
              <SelectItem value="member" className="cursor-pointer">
                <span className="flex items-center gap-2">member</span>
              </SelectItem>
              <SelectItem value="admin" className="cursor-pointer">
                <span className="flex items-center gap-2">admin</span>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: any) => {
        const user = row.original;
        return (
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => handleDeleteClick(user.id)}
            disabled={!canManageUsers}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable data={filtered} columns={columns} />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete the user account and remove their data from the server."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Delete"
        confirmClassName="bg-red-600 hover:bg-red-700 focus:ring-red-600"
      />

      {/* Role Change Warning Dialog */}
      <ConfirmDialog
        open={roleChangeDialogOpen}
        onOpenChange={setRoleChangeDialogOpen}
        title="Confirm Permission Change"
        description={
          <>
            You are about to change a normal user's permissions to{" "}
            <span className="font-semibold text-foreground">
              {pendingRoleChange?.newRole}
            </span>
            . This will grant them elevated access and privileges.
            <br />
            <br />
            Are you sure you want to proceed with this change?
          </>
        }
        onConfirm={confirmRoleChange}
        onCancel={cancelRoleChange}
        confirmText="Confirm Change"
        confirmClassName="bg-amber-600 hover:bg-amber-700 focus:ring-amber-600"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      />
    </div>
  );
}
