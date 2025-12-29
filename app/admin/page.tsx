"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import InfoCard from "../Components/Admin/InfoCard";
import { createClient } from "@/utils/supabase/client";

const staticData = [
  { title: "Total Users", data: 1200, icon: Users },
  { title: "Event Registrations", data: 850, icon: Users },
  { title: "Team Members", data: 150, icon: Users },
];

export default function AdminPage() {
  const supabase = createClient();
  const [stats, setStats] = useState(staticData);

  // Placeholder for real data fetching
  useEffect(() => {
    const fetchStats = async () => {
      // Example of how you will fetch real data safely:
      // const { count } = await supabase.from('users').select('*', { count: 'exact', head: true });
      // Update state here...
    };
    fetchStats();
  }, [supabase]);

  return (
    <div className="relative p-6">
      <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter">Admin Dashboard</h1>
      
      {/* info card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            data={item.data}
            icon={<item.icon className="w-6 h-6" />}
          />
        ))}
      </div>

      {/* logs section */}
      <div className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
        <h2 className="text-2xl font-black mb-4 uppercase">System Logs</h2>
        <div className="flex items-center gap-3 p-4 bg-yellow-100 border-2 border-black border-dashed">
           <span className="animate-pulse">⚠️</span>
           <p className="font-bold">Module "Logs" is currently in development.</p>
        </div>
      </div>
    </div>
  );
}
