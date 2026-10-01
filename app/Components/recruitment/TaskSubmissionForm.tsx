"use client";

import React from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import { nb } from "@/components/ui/neo-brutalism";
import { toast } from "sonner";
import { TaskSubmissionData } from "./constants";

interface TaskSubmissionFormProps {
  form: TaskSubmissionData;
  setForm: (f: TaskSubmissionData) => void;
  collapsed: boolean;
  onToggle: () => void;
  onSubmit: () => void;
  submitting: boolean;
  personalSubmitted: boolean;
}

export default function TaskSubmissionForm({
  form,
  setForm,
  collapsed,
  onToggle,
  onSubmit,
  submitting,
  personalSubmitted,
}: TaskSubmissionFormProps) {
  const updateLink = (index: number, value: string) => {
    const links = [...form.task_links];
    links[index] = value;
    setForm({ ...form, task_links: links });
  };

  const addLink = () => {
    if (form.task_links.length >= 5) {
      toast.error("Maximum 5 links allowed");
      return;
    }
    setForm({ ...form, task_links: [...form.task_links, ""] });
  };

  const removeLink = (index: number) => {
    if (form.task_links.length <= 1) {
      toast.error("At least one link is required");
      return;
    }
    const links = form.task_links.filter((_, i) => i !== index);
    setForm({ ...form, task_links: links });
  };

  const validate = () => {
    if (!personalSubmitted) {
      toast.error("Submit your personal details first");
      return;
    }
    const validLinks = form.task_links.filter((l) => l.trim());
    if (validLinks.length === 0) {
      toast.error("At least one task link is required");
      return;
    }
    onSubmit();
  };

  const handleToggle = () => {
    if (!personalSubmitted) {
      toast.error("Submit your personal details first");
      return;
    }
    onToggle();
  };

  return (
    <div className={nb({ border: 3, shadow: "lg", className: "bg-white overflow-hidden" })}>
      {/* Header */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#34A853] text-white font-black uppercase tracking-wider text-sm hover:bg-[#2d9148] transition-colors"
      >
        <span className="flex items-center gap-2">
          <LinkIcon size={18} />
          Task Submission — {form.task_domain || "Select a domain"}
        </span>
        {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>

      {/* Form Body */}
      {!collapsed && (
        <div className="p-6 md:p-8 space-y-5">
          {!personalSubmitted && (
            <div className="bg-yellow-50 border-2 border-yellow-400 p-3 font-mono text-xs text-yellow-800">
              Submit your personal details above to unlock task submission.
            </div>
          )}
          <p className="font-mono text-xs text-gray-500 mb-4">
            Upload your completed task work. Add Google Drive links, GitHub repos, or any relevant URLs.
          </p>

          {/* Links */}
          <div className="space-y-3">
            <label className="font-sans font-black uppercase tracking-tight text-xs flex items-center gap-1.5">
              Task Links <span className="text-[#EA4335]">*</span>
              <span className="font-mono font-normal text-gray-400 normal-case text-[10px]">
                (at least 1 required, max 5)
              </span>
            </label>

            {form.task_links.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none">
                    <LinkIcon size={16} strokeWidth={2.5} />
                  </div>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => updateLink(i, e.target.value)}
                    placeholder={`Link ${i + 1} — Google Drive, GitHub, etc.`}
                    className={nb({
                      border: 2,
                      shadow: "md",
                      className:
                        "w-full py-3 pl-11 pr-4 bg-white text-black outline-none focus:bg-[#E8F0FE] focus:border-[#4285F4] font-mono text-sm placeholder:text-gray-400",
                    })}
                  />
                </div>
                {form.task_links.length > 1 && (
                  <button
                    onClick={() => removeLink(i)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Remove link"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            {form.task_links.length < 5 && (
              <button
                onClick={addLink}
                className="flex items-center gap-2 text-sm font-mono font-bold text-[#4285F4] hover:text-[#3b78e0] py-1"
              >
                <Plus size={14} />
                Add another link
              </button>
            )}
          </div>

          {/* Placeholder for future task-specific fields */}
          {/* 
            TODO: Add domain-specific task fields here.
            Use form.task_details (JSONB) to store any additional data.
          */}

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={validate}
              disabled={submitting}
              className={nb({
                border: 3,
                shadow: "md",
                hover: "lift",
                active: "push",
                className:
                  "flex items-center gap-2 bg-[#34A853] text-white px-8 py-3 font-bold uppercase tracking-wider text-sm disabled:opacity-60",
              })}
            >
              {submitting ? "Submitting..." : "Review & Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
