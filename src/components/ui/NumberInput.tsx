import { type ChangeEvent } from "react";
import { cn } from "@/utils/cn";
import { formatRibuan, parseRibuan } from "@/utils/formatters";
import type { NumberInputProps } from "@/types/components/ui/NumberInput";

export const NumberInput = ({
  label,
  error,
  helperText,
  startIcon: StartIcon,
  prefix,
  suffix,
  badgeText,
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className,
  id,
}: NumberInputProps) => {
  const displayValue =
    value !== undefined && value !== null && !isNaN(value)
      ? formatRibuan(value)
      : "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    const cleanDigits = raw.replace(/\D/g, "");

    if (!cleanDigits) {
      onChange(undefined);
      return;
    }

    const numeric = parseRibuan(cleanDigits);
    onChange(numeric);
  };

  return (
    <div className="w-full space-y-1">
      {label && (
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor={id}
            className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            {StartIcon && <StartIcon className="w-3.5 h-3.5 text-slate-500" />}
            <span>{label}</span>
            {required && <span className="text-red-500">*</span>}
          </label>
          {badgeText && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {badgeText}
            </span>
          )}
        </div>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-xs font-medium text-slate-400 select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          className={cn(
            "w-full py-2 text-xs sm:text-sm bg-white text-slate-900 border rounded-xl outline-none transition-all font-mono",
            // Matikan panah increase/decrease browser
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            prefix ? "pl-9 pr-3" : "px-3",
            suffix && "pr-12",
            error
              ? "border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-100",
            disabled && "bg-slate-50 text-slate-400 cursor-not-allowed",
            className,
          )}
        />
        {suffix && (
          <span className="absolute right-3 text-xs font-medium text-slate-400 select-none">
            {suffix}
          </span>
        )}
      </div>

      {error ? (
        <p className="text-[11px] text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
