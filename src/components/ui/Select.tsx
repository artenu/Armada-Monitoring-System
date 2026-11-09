import type { SelectHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: LucideIcon;
  options?: SelectOption[];
}

export const Select = ({
  label,
  error,
  helperText,
  startIcon: StartIcon,
  options,
  children,
  required,
  className,
  id,
  ...props
}: SelectProps) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
          {StartIcon && <StartIcon className="w-3.5 h-3.5 text-slate-500" />}
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        id={id}
        required={required}
        className={cn(
          "w-full px-3 py-2 text-xs sm:text-sm bg-white text-slate-900 border rounded-xl outline-none transition-all cursor-pointer font-medium",
          error
            ? "border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100"
            : "border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-100",
          className,
        )}
        {...props}>
        {options
          ? options.map((opt) => (
              <option key={String(opt.value)} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>

      {error ? (
        <p className="text-[11px] text-red-600 font-semibold">{error}</p>
      ) : helperText ? (
        <p className="text-[10.5px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};
