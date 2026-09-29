import React from "react";
import { Loader2, User, Mail, Phone, Briefcase, GraduationCap, LayoutGrid } from "lucide-react";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

interface SoloRegistrationFormProps {
  user: any;
  setUser: (u: any) => void;
  loading: boolean;
  registerSolo: () => void;
  event: any;
}

const YEAR_OPTIONS = [
  { label: "1st Year", value: 1 },
  { label: "2nd Year", value: 2 },
  { label: "3rd Year", value: 3 },
  { label: "4th Year", value: 4 },
];

export default function SoloRegistrationForm({
  user,
  setUser,
  loading,
  registerSolo,
  event,
}: SoloRegistrationFormProps) {
  return (
    <>
      <div className="space-y-4">
        <InputField
          label="NAME"
          value={user.name || ""}
          onChange={(e: any) => setUser({ ...user, name: e.target.value })}
          icon={User}
          required
          placeholder="e.g. Rahul Sharma"
        />
        <InputField
          label="EMAIL"
          value={user.email || ""}
          onChange={() => {}}
          icon={Mail}
          disabled
        />
        <InputField
          label="PHONE"
          value={user.phone_number || ""}
          onChange={(e: any) =>
            setUser({ ...user, phone_number: e.target.value })
          }
          icon={Phone}
          required
          placeholder="e.g. 9876543210"
        />
        <SelectField
          label="YEAR"
          value={user.year ?? ""}
          onChange={(e: any) => setUser({ ...user, year: Number(e.target.value) })}
          icon={GraduationCap}
          required
          placeholder="Select your year"
          options={YEAR_OPTIONS}
        />
        <InputField
          label="BRANCH"
          value={user.branch || ""}
          onChange={(e: any) => setUser({ ...user, branch: e.target.value })}
          icon={Briefcase}
          required
          placeholder="e.g. CSE"
        />
        <InputField
          label="SECTION"
          value={user.section || ""}
          onChange={(e: any) => setUser({ ...user, section: e.target.value })}
          icon={LayoutGrid}
          required
          placeholder="e.g. A4"
        />
      </div>

      <div className="mt-6 flex">
        <div className="ml-auto">
          <button
            onClick={registerSolo}
            className="py-3 px-6 bg-black text-white"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Confirm RSVP"}
          </button>
        </div>
      </div>

      {event.whatsapp_url && (
        <a
          href={event.whatsapp_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-center underline font-mono text-sm"
        >
          Join WhatsApp Group
        </a>
      )}
    </>
  );
}
