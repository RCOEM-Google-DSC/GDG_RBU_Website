"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { DataTable, FilterOption } from "@/app/Components/Reusables/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";

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
          className={`text-xs px-2 py-1 rounded-md border ${isCheckedIn
              ? "bg-green-500/20 text-green-400 border-green-500/30"
              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            }`}
        >
          {isCheckedIn ? "Checked In" : "Registered"}
        </span>
      );
    },
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
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [branches, setBranches] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchParticipants();
  }, [id]);

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      // Fetch registrations with user data
      const { data: registrationsData, error: registrationsError } =
        await supabase
          .from("registrations")
          .select(
            `
            id,
            status,
            created_at,
            user_id,
            users (
              id,
              name,
              email,
              branch,
              section,
              phone_number
            )
          `,
          )
          .eq("event_id", id);

      if (registrationsError) throw registrationsError;

      // Map the data to Participant format
      const participantsData: Participant[] = (registrationsData || []).map(
        (reg: any) => ({
          id: reg.id,
          name: reg.users?.name || "Unknown",
          email: reg.users?.email || "",
          branch: reg.users?.branch || "",
          section: reg.users?.section || "",
          phone_number: reg.users?.phone_number || "",
          status: reg.status,
          registered_at: reg.created_at,
        }),
      );

      setParticipants(participantsData);

      // Extract unique branches for filter
      const uniqueBranches = [
        ...new Set(
          participantsData
            .map((p) => p.branch)
            .filter((b): b is string => Boolean(b)),
        ),
      ];
      setBranches(uniqueBranches.map((b) => ({ value: b, label: b })));
    } catch (error) {
      console.error("Error fetching participants:", error);
      toast.error("Failed to fetch participants");
    } finally {
      setLoading(false);
    }
  };

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
      options: branches,
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
