import React from "react";
import { nb } from "@/components/ui/neo-brutalism";
import { THEME } from "./utils";

export const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  name,
  icon: Icon,
  disabled = false,
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
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={nb({
          border: 2,
          shadow: "md",
          className: `w-full py-4 ${Icon ? "pl-12" : "pl-4"} pr-4 ${
            THEME.colors.surface
          } text-black outline-none focus:bg-[#E8F0FE] focus:border-[#4285F4] placeholder:text-gray-400 ${
            THEME.fonts.body
          }`,
        })}
        required={required}
      />
    </div>
  </div>
);
