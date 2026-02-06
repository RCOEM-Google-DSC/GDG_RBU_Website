import React from "react";
import { Check, Mail, User, Users } from "lucide-react";
import { THEME } from "./utils";
import { NeoBrutalism } from "@/components/ui/neo-brutalism";

interface TeamMemberMessageProps {
  info: {
    leaderName: string;
    leaderEmail: string;
    teamName: string;
  };
}

export default function TeamMemberMessage({ info }: TeamMemberMessageProps) {
  const { leaderName, leaderEmail, teamName } = info;

  return (
    <div className="text-center py-8">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="p-4 bg-[#34A853] rounded-full text-white">
          <Check size={32} strokeWidth={3} />
        </div>
        <h3 className={`${THEME.fonts.heading} text-2xl`}>Already Registered!</h3>
      </div>

      <p className="font-mono text-base mb-8 max-w-md mx-auto">
        You are already registered with team{" "}
        <span className="font-bold bg-yellow-200 px-1">{teamName}</span>.
      </p>

      <div className="text-left bg-gray-50 p-6 border-2 border-dashed border-gray-300 rounded-lg inline-block max-w-lg w-full">
        <h4 className={`${THEME.fonts.heading} text-sm mb-4 text-gray-500`}>
          Team Leader Details
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <User className="mt-1 text-black" size={20} />
            <div>
              <div className="font-bold text-lg">{leaderName}</div>
              <div className="text-xs text-gray-500 font-mono">Team Leader</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="mt-1 text-black" size={20} />
            <div>
              <div className="font-bold text-lg break-all">{leaderEmail}</div>
              <div className="text-xs text-gray-500 font-mono">Contact Email</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Users className="mt-1 text-black" size={20} />
            <div>
               <div className="font-mono text-sm">
                  Contact your team leader for further details about the event.
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
