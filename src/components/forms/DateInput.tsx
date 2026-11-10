import { forwardRef } from "react";
import { Calendar, X } from "lucide-react";
import { cn } from "@/utils/cn";
import type { DateInputProps } from "@/types/components/forms/formsTypes";

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      id,
      required,
      onClear,
      value,
      ...props
    },
    ref,
  ) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            <Calendar className="w-4 h-4" />
          </div>

          <input
            id={inputId}
            ref={ref}
            type="date"
            value={value}
            required={required}
            className={cn(
              "w-full pl-9 pr-8 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-xl",
              "focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all",
              "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
              error &&
                "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className,
            )}
            {...props}
          />

          {Boolean(value) && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-2.5 p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {error ? (
          <p className="text-[11px] font-medium text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

DateInput.displayName = "DateInput";
