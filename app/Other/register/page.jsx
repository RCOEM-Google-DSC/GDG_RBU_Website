"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Upload,
  Github,
  Code2,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Copy,
  ChevronDown,
  Check,
  Info,
  User,
  Mail,
  Phone,
  BookOpen,
  Layers,
  Hash,
  Users,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Shuffle,
  UserPlus,
  Loader2,
} from "lucide-react";
import {
  supabase,
  registerForEvent,
  getSession,
  getCurrentUserId,
} from "@/supabase/supabase";

// --- Custom Components (Defined outside to prevent re-renders) ---

const CustomSelect = ({
  options,
  value,
  onChange,
  name,
  placeholder,
  icon: Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative h-full group/select" ref={wrapperRef}>
      {/* Trigger Area */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full bg-[#151515] border ${
          isOpen
            ? "border-blue-500 ring-1 ring-blue-500/20"
            : "border-white/10 hover:border-white/20"
        } rounded-lg pl-10 pr-8 py-2.5 text-white cursor-pointer flex items-center transition-all select-none`}
      >
        <span
          className={`text-sm font-medium truncate ${
            selectedOption ? "text-white" : "text-gray-600"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      </div>

      {/* Left Icon */}
      <div
        className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
          isOpen
            ? "text-blue-400"
            : "text-gray-500 group-hover/select:text-gray-400"
        }`}
      >
        <Icon size={16} />
      </div>

      {/* Right Chevron */}
      <div
        className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 ${
          isOpen ? "text-blue-400 rotate-180" : "text-gray-500 rotate-0"
        }`}
      >
        <ChevronDown size={14} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-150 origin-top">
          <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
            {options.map((opt, idx) => {
              if (opt.disabled) return null; // Skip placeholder/disabled options in list

              const isSelected = opt.value === value;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onChange({ target: { name, value: opt.value } });
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors mx-1 rounded-md ${
                    isSelected
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                  {isSelected && <Check size={14} />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({
  label,
  icon: Icon,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  options = null,
}) => (
  <div className="space-y-1.5 group h-full flex flex-col">
    <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wide group-focus-within:text-blue-400 transition-colors ml-1">
      {label}
    </label>
    <div className="relative flex-grow">
      {options ? (
        <CustomSelect
          options={options}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder || options[0]?.label}
          icon={Icon}
        />
      ) : (
        <>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full h-full bg-[#151515] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-gray-600 text-sm font-medium hover:border-white/20"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors pointer-events-none">
            <Icon size={16} />
          </div>
        </>
      )}
    </div>
  </div>
);

const RegistrationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  // Auth state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Toggle this to see the "Paid Event" UI variations
  const [isPaidEvent, setIsPaidEvent] = useState(true);
  // Default to Team Registration as requested
  const [isTeamRegistration, setIsTeamRegistration] = useState(true);
  const [wantsRandomTeam, setWantsRandomTeam] = useState(false);
  const [isOpenToAlliances, setIsOpenToAlliances] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    branch: "",
    section: "",
    year: "",
    github: "",
    leetcode: "",
    teamName: "",
    teamMembers: [""], // Start with one empty slot for a teammate
  });

  // Check auth state on mount using supabase.auth.getSession()
  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          // Pre-fill email from auth if available
          setFormData((prev) => ({
            ...prev,
            email: session.user.email || prev.email,
            fullName: session.user.user_metadata?.full_name || prev.fullName,
          }));
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle form submission - sets user_id = auth.uid() via registerForEvent
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate auth state
    const userId = await getCurrentUserId();
    if (!userId) {
      setError("Please sign in to register for this event.");
      return;
    }

    if (!eventId) {
      setError("No event selected. Please go back and select an event.");
      return;
    }

    setIsSubmitting(true);

    try {
      // registerForEvent sets user_id = auth.uid() as required by RLS
      await registerForEvent(eventId, {
        team_name: isTeamRegistration ? formData.teamName : undefined,
        team_members: isTeamRegistration
          ? formData.teamMembers.filter((m) => m.trim())
          : undefined,
        is_team_registration: isTeamRegistration,
        wants_random_team: wantsRandomTeam,
        is_open_to_alliances: isOpenToAlliances,
      });

      setSuccess(true);
      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push("/completed?registration=success");
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Team Registration Toggle Handler
  const toggleTeamRegistration = () => {
    const newState = !isTeamRegistration;
    setIsTeamRegistration(newState);
    if (newState) {
      setWantsRandomTeam(false); // Reset random team preference if registering a specific team
    }
  };

  // Team Member Handlers
  const handleTeamMemberChange = (index, value) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = value;
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 4) {
      // Limit team size to 4
      setFormData({ ...formData, teamMembers: [...formData.teamMembers, ""] });
    }
  };

  const removeTeamMember = (index) => {
    const updatedMembers = formData.teamMembers.filter((_, i) => i !== index);
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  // Reused Navbar for consistency
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-blue-500 font-bold text-xl">{`<`}</span>
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
              <span className="text-green-500 font-bold text-xl">{`>`}</span>
            </div>
            <span className="text-white font-medium text-lg tracking-tight ml-2">
              GDG RBU
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              Need Help?
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group text-sm">
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Events
        </button>

        {/* Centered Registration Container - Scaled Down */}
        <div className="max-w-3xl mx-auto">
          {/* REMOVED overflow-hidden to allow dropdowns to pop out */}
          <div className="bg-[#0F0F0F] rounded-3xl border border-white/10 p-6 md:p-8 relative">
            {/* Decorative Glow - Wrapped in clipped div to maintain rounded corners */}
            <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></div>
            </div>

            <div className="mb-8">
              {/* Event Context Card */}
              <div className="bg-[#151515] border border-blue-500/30 rounded-2xl p-5 flex items-center gap-5 shadow-lg shadow-blue-900/10 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>
                <div className="absolute left-0 top-0 w-1 h-full bg-blue-500"></div>

                <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Calendar className="text-blue-400" size={28} />
                </div>
                <div>
                  <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-1">
                    Event Registration
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    Cloud Next Extended 2025
                  </h2>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Attendee Details</h1>
              <p className="text-gray-400 text-sm">
                Fill in your details below to secure your spot at the
                conference.
              </p>
            </div>

            {/* Integrated Important Note */}
            <div className="mb-8 bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-3 flex gap-3 items-start">
              <Info className="text-yellow-500 shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="text-sm font-semibold text-white mb-0.5">
                  Important Details
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Please ensure your name and email are correct. Certificates
                  will be issued exactly as entered here.
                </p>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle
                  className="text-red-400 shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2
                  className="text-green-400 shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-sm text-green-300">
                  Registration successful! Redirecting...
                </p>
              </div>
            )}
            {!user && !isLoading && (
              <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
                <Info className="text-blue-400 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-blue-300">
                  Please sign in to register for this event.
                </p>
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Section 1: Personal Info */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <span className="font-bold text-xs">1</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-9">
                  <div className="md:col-span-2">
                    <InputField
                      label="Full Name"
                      icon={User}
                      name="fullName"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <InputField
                    label="Email Address"
                    icon={Mail}
                    type="email"
                    name="email"
                    placeholder="john@student.rbu.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Phone Number"
                    icon={Phone}
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </section>

              {/* Section 2: Academic Info */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                    <span className="font-bold text-xs">2</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Academic Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-0 md:pl-9">
                  <InputField
                    label="Branch"
                    icon={BookOpen}
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    options={[
                      { label: "Select Branch", value: "", disabled: true },
                      { label: "CSE", value: "cse" },
                      { label: "AI & ML", value: "aiml" },
                      { label: "IT", value: "it" },
                      { label: "ECE", value: "ece" },
                    ]}
                  />
                  <InputField
                    label="Year"
                    icon={Layers}
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    options={[
                      { label: "Select Year", value: "", disabled: true },
                      { label: "1st Year", value: "1" },
                      { label: "2nd Year", value: "2" },
                      { label: "3rd Year", value: "3" },
                      { label: "4th Year", value: "4" },
                    ]}
                  />
                  <InputField
                    label="Section"
                    icon={Hash}
                    name="section"
                    placeholder="e.g. A"
                    value={formData.section}
                    onChange={handleInputChange}
                  />
                </div>
              </section>

              {/* Section 3: Team Details (Optional) */}
              <section>
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                        <span className="font-bold text-xs">3</span>
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Team Details
                      </h3>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={toggleTeamRegistration}
                      className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      {isTeamRegistration ? (
                        <>
                          <span className="text-orange-400 font-medium">
                            Register Individually?
                          </span>
                          <ToggleRight size={28} className="text-orange-500" />
                        </>
                      ) : (
                        <>
                          <span>Register as Team?</span>
                          <ToggleLeft size={28} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Random Team Option (Visible when NOT registering as team) */}
                  {!isTeamRegistration && (
                    <div className="pl-0 md:pl-9 animate-in fade-in slide-in-from-top-2">
                      <div
                        onClick={() => setWantsRandomTeam(!wantsRandomTeam)}
                        className={`flex items-start md:items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${
                          wantsRandomTeam
                            ? "bg-orange-500/10 border-orange-500/50"
                            : "bg-[#151515] border-white/5 hover:border-white/10 hover:bg-[#1A1A1A]"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 mt-0.5 md:mt-0 ${
                            wantsRandomTeam
                              ? "bg-orange-500 border-orange-500"
                              : "border-gray-600 group-hover:border-orange-400/50"
                          }`}
                        >
                          {wantsRandomTeam && (
                            <CheckCircle2 size={12} className="text-black" />
                          )}
                        </div>
                        <div>
                          <h4
                            className={`text-sm font-semibold transition-colors ${
                              wantsRandomTeam
                                ? "text-white"
                                : "text-gray-300 group-hover:text-white"
                            }`}
                          >
                            I need a team (Random Allocation)
                          </h4>
                          <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                            Check this box if you don't have a team yet. We will
                            assign you to a random team.
                          </p>
                        </div>
                        <div className="ml-auto text-gray-600 group-hover:text-orange-400 transition-colors hidden md:block">
                          <Shuffle size={18} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {isTeamRegistration && (
                  <div className="pl-0 md:pl-9 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-[#151515] border border-white/10 rounded-xl p-5 space-y-5">
                      <InputField
                        label="Team Name"
                        icon={Users}
                        name="teamName"
                        placeholder="e.g. The Cloud Ninjas"
                        value={formData.teamName}
                        onChange={handleInputChange}
                      />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                            Team Members
                          </label>
                          <span className="text-[10px] text-gray-600">
                            Max 4 members
                          </span>
                        </div>

                        {formData.teamMembers.map((member, index) => (
                          <div key={index} className="flex gap-2">
                            <div className="flex-grow">
                              <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                  <User size={16} />
                                </div>
                                <input
                                  type="text"
                                  value={member}
                                  onChange={(e) =>
                                    handleTeamMemberChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                  placeholder={`Teammate ${index + 1} Name`}
                                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all placeholder:text-gray-600 text-sm"
                                />
                              </div>
                            </div>
                            {formData.teamMembers.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeTeamMember(index)}
                                className="p-2 bg-[#1A1A1A] text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg border border-white/10 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        ))}

                        <div className="flex items-center justify-between pt-1">
                          {formData.teamMembers.length < 4 && (
                            <button
                              type="button"
                              onClick={addTeamMember}
                              className="flex items-center gap-1.5 text-xs text-orange-400 font-medium hover:text-orange-300 transition-colors"
                            >
                              <Plus size={14} /> Add another member
                            </button>
                          )}
                        </div>

                        {/* Alliance / Open to Random Prompt */}
                        {formData.teamMembers.length < 4 && (
                          <div className="mt-4 pt-4 border-t border-white/5 animate-in fade-in">
                            <div
                              onClick={() =>
                                setIsOpenToAlliances(!isOpenToAlliances)
                              }
                              className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                                isOpenToAlliances
                                  ? "bg-blue-500/10 border-blue-500/30"
                                  : "bg-[#1A1A1A] border-white/5 hover:border-white/10"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                                  isOpenToAlliances
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-gray-600"
                                }`}
                              >
                                {isOpenToAlliances && (
                                  <CheckCircle2
                                    size={10}
                                    className="text-white"
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4
                                    className={`text-xs font-semibold ${
                                      isOpenToAlliances
                                        ? "text-blue-200"
                                        : "text-gray-300"
                                    }`}
                                  >
                                    Open to Alliances?
                                  </h4>
                                  <UserPlus
                                    size={14}
                                    className={
                                      isOpenToAlliances
                                        ? "text-blue-400"
                                        : "text-gray-600"
                                    }
                                  />
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1">
                                  We have {4 - formData.teamMembers.length}{" "}
                                  slots left. Allow individual participants to
                                  join our team?
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Section 4: Professional Profiles (Optional) */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                    <span className="font-bold text-xs">4</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-base font-bold text-white">
                      Coding Profiles
                    </h3>
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                      Optional
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-9">
                  <InputField
                    label="GitHub Profile"
                    icon={Github}
                    name="github"
                    placeholder="github.com/username"
                    value={formData.github}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="LeetCode / LC Profile"
                    icon={Code2}
                    name="leetcode"
                    placeholder="leetcode.com/username"
                    value={formData.leetcode}
                    onChange={handleInputChange}
                  />
                </div>
              </section>

              {/* Section 5: Payment Details (Conditional) */}
              {isPaidEvent && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <span className="font-bold text-xs">5</span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      Payment Details
                    </h3>
                  </div>

                  <div className="pl-0 md:pl-9">
                    <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        {/* 1. QR Code - Tall Vertical Tile (Row Span 2) */}
                        <div className="md:col-span-2 md:row-span-2 bg-[#1A1A1A] border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center relative group overflow-hidden min-h-[180px]">
                          <QrCode
                            size={50}
                            className="mb-3 text-gray-500 opacity-50"
                          />
                          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                            QR Code Here
                          </span>
                        </div>

                        {/* 2. Registration Fee - Wide Tile */}
                        <div className="md:col-span-4 bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex flex-col justify-center relative overflow-hidden h-[80px]">
                          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-wide mb-1">
                            Total Payable
                          </p>
                          <div className="flex items-end justify-between">
                            <h4 className="text-2xl font-bold text-white">
                              ₹150.00
                            </h4>
                            <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                              Tax Inclusive
                            </span>
                          </div>
                        </div>

                        {/* 3. UPI ID - Wide Tile */}
                        <div className="md:col-span-4 bg-[#1A1A1A] border border-white/10 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:border-white/20 transition-all h-[80px]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                              <CreditCard size={18} />
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-500 font-bold uppercase">
                                UPI ID
                              </p>
                              <p className="text-white font-mono text-sm">
                                gdg@okaxis
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                          >
                            <Copy size={18} />
                          </button>
                        </div>

                        {/* 4. Screenshot Upload - Full Width */}
                        <div className="md:col-span-6">
                          <div className="bg-[#1A1A1A] border border-dashed border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all h-full min-h-[80px] group">
                            <Upload
                              className="text-gray-500 group-hover:text-blue-400 mb-1.5 transition-colors"
                              size={18}
                            />
                            <p className="text-[10px] font-medium text-gray-400 group-hover:text-gray-300">
                              Upload Payment Screenshot
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/5">
                <button
                  type="submit"
                  disabled={isSubmitting || !user || success}
                  className={`w-full text-base font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    isSubmitting || !user || success
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />{" "}
                      Processing...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle2 size={18} /> Registration Complete!
                    </>
                  ) : !user ? (
                    <>Sign In Required</>
                  ) : (
                    <>
                      Confirm Registration <CheckCircle2 size={18} />
                    </>
                  )}
                </button>
                <p className="text-center text-gray-500 text-[10px] mt-3">
                  By registering, you agree to GDG RBU's Code of Conduct and
                  Event Terms.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-6 text-center text-gray-500 text-xs">
        <p>© 2025 GDG RBU. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Wrap in Suspense as required by Next.js 16 for useSearchParams
export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      }
    >
      <RegistrationPage />
    </Suspense>
  );
}
