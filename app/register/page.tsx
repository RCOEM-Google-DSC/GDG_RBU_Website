import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, ArrowLeft, Upload, 
  Github, Code2, CreditCard, CheckCircle2, AlertCircle, 
  QrCode, Copy, ChevronRight, Info,
  User, Mail, Phone, BookOpen, Layers, Hash, DollarSign,
  Users, Plus, Trash2, ToggleLeft, ToggleRight, Shuffle
} from 'lucide-react';

const RegistrationPage = () => {
  // Toggle this to see the "Paid Event" UI variations
  const [isPaidEvent, setIsPaidEvent] = useState(true);
  // Default to Team Registration as requested
  const [isTeamRegistration, setIsTeamRegistration] = useState(true);
  const [wantsRandomTeam, setWantsRandomTeam] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    branch: '',
    section: '',
    year: '',
    github: '',
    leetcode: '',
    transactionId: '',
    teamName: '',
    teamMembers: [''] // Start with one empty slot for a teammate
  });

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
    if (formData.teamMembers.length < 3) { // Limit team size if needed
        setFormData({ ...formData, teamMembers: [...formData.teamMembers, ''] });
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
            <span className="text-white font-medium text-lg tracking-tight ml-2">GDG RBU</span>
          </div>
          <div className="flex items-center gap-4">
             <button className="text-sm text-gray-400 hover:text-white transition-colors">Need Help?</button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Helper component for consistent input styling
  const InputField = ({ label, icon: Icon, type = "text", name, placeholder, value, onChange, options = null }) => (
    <div className="space-y-2 group">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide group-focus-within:text-blue-400 transition-colors">
        {label}
      </label>
      <div className="relative">
        {/* Render Input/Select FIRST so the Icon renders ON TOP (z-order) */}
        {options ? (
          <div className="relative">
            <select
              name={name}
              value={value}
              onChange={onChange}
              className="w-full bg-[#151515] border border-white/10 rounded-xl pl-12 pr-10 py-3.5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all appearance-none cursor-pointer text-sm font-medium hover:border-white/20"
            >
              {options.map((opt, idx) => (
                <option key={idx} value={opt.value} disabled={opt.disabled} className="bg-[#1A1A1A]">
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <ChevronRight size={16} className="rotate-90" />
            </div>
          </div>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-[#151515] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all placeholder:text-gray-600 text-sm font-medium hover:border-white/20"
          />
        )}
        
        {/* Icon placed here to sit on top of the input background */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors pointer-events-none">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </button>

        {/* Centered Registration Container */}
        <div className="max-w-4xl mx-auto">
            <div className="bg-[#0F0F0F] rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden">
                 {/* Decorative Glow */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></div>

                 <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20">
                            Registering for: Cloud Next Extended 2025
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Attendee Registration</h1>
                    <p className="text-gray-400">Fill in your details below to secure your spot at the conference.</p>
                 </div>

                 {/* Integrated Important Note */}
                 <div className="mb-10 bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4 flex gap-4 items-start">
                    <Info className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-1">Important Details</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Please ensure your name and email are correct. Certificates will be issued exactly as entered here.
                        </p>
                    </div>
                 </div>

                 <form className="space-y-12">
                    {/* Section 1: Personal Info */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                <span className="font-bold text-sm">1</span>
                            </div>
                            <h3 className="text-lg font-bold text-white">Personal Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-11">
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
                         <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                                <span className="font-bold text-sm">2</span>
                            </div>
                            <h3 className="text-lg font-bold text-white">Academic Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-0 md:pl-11">
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
                                    { label: "ECE", value: "ece" }
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
                                    { label: "4th Year", value: "4" }
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
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                                        <span className="font-bold text-sm">3</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Team Details</h3>
                                </div>
                                
                                {/* Toggle Switch */}
                                <button 
                                    type="button"
                                    onClick={toggleTeamRegistration}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    {isTeamRegistration ? (
                                        <>
                                            <span className="text-orange-400 font-medium">Enabled</span>
                                            <ToggleRight size={32} className="text-orange-500" />
                                        </>
                                    ) : (
                                        <>
                                            <span>Register as Team?</span>
                                            <ToggleLeft size={32} />
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Random Team Option (Visible when NOT registering as team) */}
                            {!isTeamRegistration && (
                                <div className="pl-0 md:pl-11 animate-in fade-in slide-in-from-top-2">
                                    <div 
                                        onClick={() => setWantsRandomTeam(!wantsRandomTeam)}
                                        className={`flex items-start md:items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${
                                            wantsRandomTeam 
                                                ? 'bg-orange-500/10 border-orange-500/50' 
                                                : 'bg-[#151515] border-white/5 hover:border-white/10 hover:bg-[#1A1A1A]'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors shrink-0 mt-0.5 md:mt-0 ${
                                            wantsRandomTeam 
                                                ? 'bg-orange-500 border-orange-500' 
                                                : 'border-gray-600 group-hover:border-orange-400/50'
                                        }`}>
                                            {wantsRandomTeam && <CheckCircle2 size={14} className="text-black" />}
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-semibold transition-colors ${wantsRandomTeam ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                                I need a team (Random Allocation)
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                Check this box if you don't have a team yet. We will assign you to a random team with other individual participants.
                                            </p>
                                        </div>
                                        <div className="ml-auto text-gray-600 group-hover:text-orange-400 transition-colors hidden md:block">
                                            <Shuffle size={20} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {isTeamRegistration && (
                            <div className="pl-0 md:pl-11 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 space-y-6">
                                    
                                    <InputField 
                                        label="Team Name" 
                                        icon={Users} 
                                        name="teamName" 
                                        placeholder="e.g. The Cloud Ninjas"
                                        value={formData.teamName}
                                        onChange={handleInputChange}
                                    />

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                                Team Members
                                            </label>
                                            <span className="text-xs text-gray-600">Max 4 members</span>
                                        </div>
                                       
                                        {formData.teamMembers.map((member, index) => (
                                            <div key={index} className="flex gap-3">
                                                <div className="flex-grow">
                                                     <div className="relative">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                                            <User size={18} />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={member}
                                                            onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                                                            placeholder={`Teammate ${index + 1} Name`}
                                                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all placeholder:text-gray-600 text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                {formData.teamMembers.length > 1 && (
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeTeamMember(index)}
                                                        className="p-3 bg-[#1A1A1A] text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl border border-white/10 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {formData.teamMembers.length < 3 && (
                                            <button 
                                                type="button"
                                                onClick={addTeamMember}
                                                className="flex items-center gap-2 text-sm text-orange-400 font-medium hover:text-orange-300 transition-colors px-2 py-1"
                                            >
                                                <Plus size={16} /> Add another member
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Section 4: Professional Profiles (Optional) */}
                    <section>
                         <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                                <span className="font-bold text-sm">4</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-lg font-bold text-white">Coding Profiles</h3>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Optional</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-11">
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
                        <section className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 border-b border-blue-500/10 pb-6 mb-6">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 shadow-lg shadow-blue-500/10">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Payment Details</h3>
                                    <p className="text-blue-200/60 text-sm">Registration Fee: ₹150.00</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8">
                                {/* QR Code Area */}
                                <div className="flex-shrink-0 flex flex-col items-center justify-center space-y-3 bg-white p-6 rounded-2xl max-w-[220px] mx-auto md:mx-0 shadow-xl">
                                    <QrCode size={140} className="text-black" />
                                    <span className="text-black text-xs font-bold font-mono tracking-wider bg-gray-100 px-2 py-1 rounded">UPI: gdg@okaxis</span>
                                </div>

                                {/* Transaction Input */}
                                <div className="flex-grow space-y-6 flex flex-col justify-center">
                                    <InputField 
                                        label="Transaction ID / UTR" 
                                        icon={DollarSign} 
                                        name="transactionId" 
                                        placeholder="Enter 12-digit ID"
                                        value={formData.transactionId}
                                        onChange={handleInputChange}
                                    />
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                            Payment Screenshot
                                        </label>
                                        <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group bg-[#151515]">
                                            <Upload className="mx-auto text-gray-500 group-hover:text-blue-400 mb-3 transition-colors" size={24} />
                                            <p className="text-sm text-gray-400 group-hover:text-gray-300 font-medium">Click to upload screenshot</p>
                                            <p className="text-xs text-gray-600 mt-1">JPG, PNG up to 5MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-white/5">
                        <button type="button" className="w-full bg-white text-black text-lg font-bold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0">
                            Confirm Registration <CheckCircle2 size={20} />
                        </button>
                        <p className="text-center text-gray-500 text-xs mt-4">
                            By registering, you agree to GDG RBU's Code of Conduct and Event Terms.
                        </p>
                    </div>

                 </form>
            </div>
        </div>

      </main>

      {/* Simplified Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-8 text-center text-gray-500 text-sm">
        <p>© 2025 GDG RBU. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RegistrationPage;