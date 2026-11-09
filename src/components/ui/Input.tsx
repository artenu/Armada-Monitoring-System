import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: LucideIcon;
  badgeText?: string;
}

export const Input = ({
  label,
  error,
  helperText,
  startIcon: StartIcon,
  badgeText,
  type = "text",
  required,
  className,
  id,
  ...props
}: InputProps) => {
  const isPasswordInput = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPasswordInput
    ? showPassword
      ? "text"
      : "password"
    : type;

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

      <div className="relative">
        <input
          id={id}
          type={inputType}
          required={required}
          className={cn(
            "w-full px-3 py-2 text-xs sm:text-sm bg-white text-slate-900 border rounded-xl outline-none transition-all placeholder:text-slate-400",
            type === "number" &&
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            StartIcon && !label && "pl-9",
            isPasswordInput && "pr-10",
            error
              ? "border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-100",
            props.readOnly && "bg-slate-100 text-slate-700 cursor-not-allowed",
            className,
          )}
          {...props}
        />

        {isPasswordInput && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
            title={showPassword ? "Sembunyikan password" : "Lihat password"}>
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-slate-600" />
            ) : (
              <Eye className="w-4 h-4 text-slate-400" />
            )}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-[11px] text-red-600 font-semibold">{error}</p>
      ) : helperText ? (
        <p className="text-[10.5px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};
