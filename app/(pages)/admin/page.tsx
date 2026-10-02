"use client";
import { MdEventAvailable } from "react-icons/md";

import { useEffect, useState } from "react";
import { UserCog, Users, ClipboardList } from "lucide-react";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import InfoCard from "@/app/Components/Admin/InfoCard";

type StatsData = {
  title: string;
  data: number;
  icon: any;
};

export default function AdminPage() {
  const [stats, setStats] = useState<StatsData[]>([
    { title: "Total Users", data: 0, icon: Users },
    { title: "Event Registrations", data: 0, icon: MdEventAvailable },
    { title: "Team Members", data: 0, icon: UserCog },
    { title: "Recruitment", data: 0, icon: ClipboardList },
  ]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch total users count
      const { count: usersCount, error: usersError } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      if (usersError) throw usersError;

      // Fetch total registrations count
      const { count: registrationsCount, error: registrationsError } =
        await supabase
          .from("registrations")
          .select("*", { count: "exact", head: true });

      if (registrationsError) throw registrationsError;

      // Fetch team members count (users with role 'member' or 'admin')
      const { count: teamMembersCount, error: teamMembersError } =
        await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .in("role", ["member", "admin"]);

      if (teamMembersError) throw teamMembersError;

      // Fetch recruitment counts (split schema: applicants + per-domain tasks).
      // "Recruitment" card shows applicants (personal details submitted).
      const { count: recruitmentCount, error: recruitmentError } =
        await supabase
          .from("recruitment_applicants")
          .select("*", { count: "exact", head: true });

      if (recruitmentError) throw recruitmentError;

      setStats([
        { title: "Total Users", data: usersCount || 0, icon: Users },
        {
          title: "Event Registrations",
          data: registrationsCount || 0,
          icon: MdEventAvailable,
        },
        {
          title: "Team Members",
          data: teamMembersCount || 0,
          icon: UserCog,
        },
        {
          title: "Recruitment",
          data: recruitmentCount || 0,
          icon: ClipboardList,
        },
      ]);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* info card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {stats.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            data={item.data}
            icon={<item.icon />}
          />
        ))}
      </div>

    </div>
  );
}
