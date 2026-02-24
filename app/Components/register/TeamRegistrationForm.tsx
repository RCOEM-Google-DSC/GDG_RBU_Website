import React from "react";
import { AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { InputField } from "./InputField";
import { StackCard } from "./StackCard";

interface TeamRegistrationFormProps {
  teamName: string;
  setTeamName: (val: string) => void;
  cards: any[];
  toggleCard: (id: string) => void;
  deleteMember: (id: string) => void;
  addMember: () => void;
  validateMember: (id: string) => void;
  onMemberEmailChange: (id: string, email: string) => void;
  user: any;
  setUser: (u: any) => void;
  saveLeaderEditsLocal: () => void;
  loading: boolean;
  registerTeam: () => void;
  event: any;
}

export default function TeamRegistrationForm({
  teamName,
  setTeamName,
  cards,
  toggleCard,
  deleteMember,
  addMember,
  validateMember,
  onMemberEmailChange,
  user,
  setUser,
  saveLeaderEditsLocal,
  loading,
  registerTeam,
  event,
}: TeamRegistrationFormProps) {
  return (
    <>
      <InputField
        label="TEAM NAME"
        value={teamName}
        onChange={(e: any) => setTeamName(e.target.value)}
        placeholder="Your team name (required for team events)"
        icon={User}
      />

      <div className="space-y-4">
        <AnimatePresence>
          {cards.map((card) => (
            <StackCard
              key={card.id}
              title={card.title}
              expanded={card.expanded}
              onDelete={
                card.type === "member" ? () => deleteMember(card.id) : undefined
              }
              onHeaderClick={() => toggleCard(card.id)}
            >
              {card.type === "leader" ? (
                <>
                  <InputField
                    label="NAME"
                    value={user.name || ""}
                    onChange={(e: any) =>
                      setUser({ ...user, name: e.target.value })
                    }
                    icon={User}
                    required
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
                  />
                  <InputField
                    label="SECTION"
                    value={user.section || ""}
                    onChange={(e: any) =>
                      setUser({ ...user, section: e.target.value })
                    }
                    icon={Briefcase}
                  />
                  <InputField
                    label="BRANCH"
                    value={user.branch || ""}
                    onChange={(e: any) =>
                      setUser({ ...user, branch: e.target.value })
                    }
                    icon={Briefcase}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={saveLeaderEditsLocal}
                      className="py-3 px-4 bg-[#4285F4] text-white flex items-center gap-2"
                    >
                      Save Leader
                      {loading && <Loader2 className="animate-spin" />}
                    </button>

                    {/* Fallback if event type switches or allows solo within team flow - keeping logic generic but mainly for team here */}
                    {/* The original code had !event.is_team_event check inside the leader card, but this component IS for team registration. */}
                    {/* Assuming this component is only rendered when event.is_team_event is true. */}
                  </div>
                </>
              ) : (
                <>
                  {!card.validated ? (
                    <>
                      <InputField
                        label="MEMBER EMAIL"
                        value={card.email || ""}
                        onChange={(e: any) =>
                          onMemberEmailChange(card.id, e.target.value)
                        }
                        icon={Mail}
                        placeholder="member@example.com"
                        required
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => validateMember(card.id)}
                          className="py-3 px-4 bg-[#34A853] text-white"
                        >
                          Validate Member
                        </button>
                        <button
                          onClick={() => deleteMember(card.id)}
                          className="py-3 px-4 border-2 border-black ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-3">
                      <div className="font-mono">{card.email}</div>
                      <div className="text-xs text-gray-500">Validated</div>
                    </div>
                  )}
                </>
              )}
            </StackCard>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={addMember} className="underline">
          Add Member
        </button>

        <div className="ml-auto flex gap-3">
          <button
            onClick={registerTeam}
            className="py-3 px-4 bg-black text-white"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Register Team <ArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
