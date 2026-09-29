import React from "react";
import { nb } from "@/components/ui/neo-brutalism";
import { THEME } from "./utils";

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  required = false,
  name,
  icon: Icon,
  placeholder,
}: any) => (
  <div className="flex flex-col gap-2 mb-6">
    <label className={`${THEME.fonts.heading} text-sm flex items-center gap-2`}>
      {label} {required && <span className="text-[#EA4335]">*</span>}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none">
          <Icon size={20} strokeWidth={2.5} />
        </div>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={nb({
          border: 2,
          shadow: "md",
          className: `w-full py-4 ${Icon ? "pl-12" : "pl-4"} pr-4 ${
            THEME.colors.surface
          } text-black outline-none focus:bg-[#E8F0FE] focus:border-[#4285F4] ${
            THEME.fonts.body
          } appearance-none cursor-pointer`,
        })}
        required={required}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt: { label: string; value: string | number }) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Dropdown arrow */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
);
