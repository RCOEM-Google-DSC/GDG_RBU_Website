"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/supabase/supabase";
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
import { useRBAC } from "@/hooks/useRBAC";

type TeamMember = {
  id: string;
  name: string | null;
  email: string | null;
  domain: string | null;
  created_at: string;
  userid: string;
};

export default function TeamMembersPage() {
  const { canManageUsers } = useRBAC();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Domain change warning dialog state
  const [domainChangeDialogOpen, setDomainChangeDialogOpen] = useState(false);
  const [pendingDomainChange, setPendingDomainChange] = useState<{
    userId: string;
    newDomain: string;
    oldDomain: string | null;
  } | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      // Fetch users with role 'member' and join with team_members table
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("id, name, email, created_at")
        .eq("role", "member")
        .order("created_at", { ascending: false });

      if (usersError) {
        toast.error("Failed to fetch team members");
        console.error(usersError);
        return;
      }

      // Fetch team_members data
      const { data: teamMembersData, error: teamMembersError } = await supabase
        .from("team_members")
        .select("userid, domain");

      if (teamMembersError) {
        toast.error("Failed to fetch team member details");
        console.error(teamMembersError);
        return;
      }

      // Merge the data
      const merged = (usersData || []).map((user) => {
        const teamMemberData = teamMembersData?.find(
          (tm) => tm.userid === user.id,
        );
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          domain: teamMemberData?.domain || null,
          created_at: user.created_at,
          userid: user.id,
        };
      });

      setTeamMembers(merged);
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDomainChange = (userId: string, newDomain: string) => {
    const member = teamMembers.find((m) => m.userid === userId);
    if (!member) return;

    setPendingDomainChange({
      userId,
      newDomain,
      oldDomain: member.domain,
    });
    setDomainChangeDialogOpen(true);
  };

  const updateDomain = async (userId: string, domain: string) => {
    try {
      // Handle 'unassigned' by setting domain to null
      const domainValue = domain === "unassigned" ? null : domain;

      // Check if team_member record exists
      const { data: existingRecord } = await supabase
        .from("team_members")
        .select("id")
        .eq("userid", userId)
        .single();

      if (existingRecord) {
        // Update existing record
        const { error } = await supabase
          .from("team_members")
          .update({ domain: domainValue })
          .eq("userid", userId);

        if (error) {
          toast.error("Failed to update domain");
          console.error(error);
          return;
        }
      } else {
        // Insert new record
        const { error } = await supabase
          .from("team_members")
          .insert({ userid: userId, domain: domainValue });

        if (error) {
          toast.error("Failed to assign domain");
          console.error(error);
          return;
        }
      }

      // Update local state
      setTeamMembers((prev) =>
        prev.map((m) =>
          m.userid === userId ? { ...m, domain: domainValue } : m,
        ),
      );
      toast.success("Domain updated successfully");
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    }
  };

  const confirmDomainChange = () => {
    if (pendingDomainChange) {
      updateDomain(pendingDomainChange.userId, pendingDomainChange.newDomain);
      setPendingDomainChange(null);
      setDomainChangeDialogOpen(false);
    }
  };

  const cancelDomainChange = () => {
    setPendingDomainChange(null);
    setDomainChangeDialogOpen(false);
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
      header: "Domain",
      accessorKey: "domain",
      cell: ({ row }: any) => {
        const member = row.original;
        return (
          <Select
            value={member.domain || "unassigned"}
            onValueChange={(value) => handleDomainChange(member.userid, value)}
            disabled={!canManageUsers}
          >
            <SelectTrigger className="w-40">
              <SelectValue>
                {member.domain ? (
                  <span className="capitalize">{member.domain}</span>
                ) : (
                  <span className="text-muted-foreground">Unassigned</span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned" className="cursor-pointer">
                <span className="text-muted-foreground">Unassigned</span>
              </SelectItem>
              <SelectItem value="web" className="cursor-pointer">
                <span className="capitalize">Web</span>
              </SelectItem>
              <SelectItem value="mac" className="cursor-pointer">
                <span className="capitalize">MAC</span>
              </SelectItem>
              <SelectItem value="design" className="cursor-pointer">
                <span className="capitalize">Design</span>
              </SelectItem>
              <SelectItem value="management" className="cursor-pointer">
                <span className="capitalize">Management</span>
              </SelectItem>
              <SelectItem value="socials" className="cursor-pointer">
                <span className="capitalize">Socials</span>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "Joined",
      accessorKey: "created_at",
      cell: ({ row }: any) => {
        const date = new Date(row.original.created_at);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading team members...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <p className="text-muted-foreground mt-1">
          Manage team member domains and assignments
        </p>
      </div>

      <DataTable data={teamMembers} columns={columns} />

      {/* Domain Change Warning Dialog */}
      <ConfirmDialog
        open={domainChangeDialogOpen}
        onOpenChange={setDomainChangeDialogOpen}
        title="Confirm Domain Change"
        description={
          <>
            You are about to change the domain assignment
            {pendingDomainChange?.oldDomain && (
              <>
                {" "}
                from{" "}
                <span className="font-semibold text-foreground capitalize">
                  {pendingDomainChange.oldDomain}
                </span>
              </>
            )}{" "}
            to{" "}
            <span className="font-semibold text-foreground capitalize">
              {pendingDomainChange?.newDomain === "unassigned"
                ? "Unassigned"
                : pendingDomainChange?.newDomain}
            </span>
            .
            <br />
            <br />
            Are you sure you want to proceed with this change?
          </>
        }
        onConfirm={confirmDomainChange}
        onCancel={cancelDomainChange}
        confirmText="Confirm Change"
        confirmClassName="bg-blue-600 hover:bg-blue-700 focus:ring-blue-600"
        icon={<AlertTriangle className="w-5 h-5 text-blue-500" />}
      />
    </div>
  );
}
