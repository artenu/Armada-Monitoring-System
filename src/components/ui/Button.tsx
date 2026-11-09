import type { ButtonHTMLAttributes } from "react";
import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "outline"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-xs focus:ring-red-200",
  secondary:
    "bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-xs focus:ring-slate-300",
  success:
    "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xs focus:ring-emerald-200",
  danger:
    "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 focus:ring-red-100",
  outline:
    "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-200",
  ghost:
    "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-100",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1 text-xs rounded-lg gap-1.5",
  md: "px-3.5 py-2 text-xs sm:text-sm rounded-xl gap-2",
  lg: "px-5 py-2.5 text-sm sm:text-base rounded-xl gap-2.5",
};

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-bold transition-all outline-none focus:ring-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!isLoading && RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
    </button>
  );
};
