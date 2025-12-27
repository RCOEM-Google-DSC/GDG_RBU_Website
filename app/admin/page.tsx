"use client";

import { Users } from "lucide-react";
import InfoCard from "../Components/Admin/InfoCard";

const data = [
  { title: "Total Users", data: 1200, icon: Users },
  { title: "Event Registrations", data: 850, icon: Users },
  { title: "Team Members", data: 150, icon: Users },
];

export default function AdminPage() {
  return (
    <div className="relative">
      {/* info card grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {data.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            data={item.data}
            icon={<item.icon />}
          />
        ))}
      </div>

      {/* logs */}
      <div>
        <h2 className="text-2xl">Logs</h2>
        <p>in work</p>
      </div>
    </div>
  );
}
