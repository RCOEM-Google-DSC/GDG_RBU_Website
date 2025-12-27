"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DataTable, FilterOption } from "@/app/Components/Reusables/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { users, registrations } from "@/db/mockdata";
import { CalendarDays, MapPin, Users } from "lucide-react";

// Participant type for the table
interface Participant {
  id: string;
  name: string;
  email: string;
  branch: string;
  section: string;
  phone_number: string;
  status: string;
  registered_at: string;
}

// Props for the component
interface UpcomingEventAdminProps {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string;
  time?: string;
  venue: string;
  registered_count?: number;
  capacity?: number;
}

// Get participants for an event by joining registrations and users
const getEventParticipants = (eventId: string): Participant[] => {
  const eventRegistrations = registrations.filter(
    (r) => r.event_id === eventId,
  );
  return eventRegistrations.map((reg) => {
    const user = users.find((u) => u.id === reg.user_id);
    return {
      id: reg.id,
      name: user?.name || "Unknown",
      email: user?.email || "",
      branch: user?.branch || "",
      section: user?.section || "",
      phone_number: user?.phone_number || "",
      status: reg.status,
      registered_at: reg.created_at,
    };
  });
};

// Get unique branches from users for filter
const getUniqueBranches = (): { value: string; label: string }[] => {
  const branches = [...new Set(users.map((u) => u.branch).filter(Boolean))];
  return branches.map((b) => ({ value: b, label: b }));
};

// Columns for participants table
const participantColumns: ColumnDef<Participant>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => <div className="text-sm">{row.getValue("branch")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "section",
    header: "Section",
    cell: ({ row }) => <div className="text-sm">{row.getValue("section")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isCheckedIn = status === "checked_in";
      return (
        <span
          className={`text-xs px-2 py-1 rounded-md border ${
            isCheckedIn
              ? "bg-green-500/20 text-green-400 border-green-500/30"
              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
          }`}
        >
          {isCheckedIn ? "Checked In" : "Registered"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <Button size="sm" variant="outline" className="h-7 text-xs">
        Verify
      </Button>
    ),
  },
];

const UpcomingEventAdmin = ({
  id,
  title,
  description,
  image_url,
  date,
  time,
  venue,
  registered_count,
  capacity,
}: UpcomingEventAdminProps) => {
  const participants = getEventParticipants(id);

  // Filters for the DataTable
  const filters: FilterOption[] = [
    {
      id: "status",
      label: "Status",
      options: [
        { value: "registered", label: "Registered" },
        { value: "checked_in", label: "Checked In" },
      ],
    },
    {
      id: "branch",
      label: "Branch",
      multiSelect: true,
      options: getUniqueBranches(),
    },
  ];

  return (
    <div className="flex gap-6">
      {/* Event Card */}
      <Card className="flex flex-col w-full max-w-[420px] ">
        <div className="relative h-52 overflow-hidden rounded-t-lg">
          <Image src={image_url} alt={title} fill className="object-cover" />
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>
              {date} {time && `• ${time}`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{venue}</span>
          </div>
          {(registered_count !== undefined || capacity !== undefined) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {registered_count ?? 0} / {capacity ?? "∞"} registered
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Participants Table */}

      <div className="flex-1 min-w-0 p-6 border rounded-lg bg-card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Participants ({participants.length})
          </h3>
        </div>
        <DataTable
          columns={participantColumns}
          data={participants}
          filters={filters}
          showFilters={true}
        />
      </div>
    </div>
  );
};

export default UpcomingEventAdmin;
