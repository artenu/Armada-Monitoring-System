import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "white" | "slate" | "blue";
  label?: string;
  className?: string;
}

export const Spinner = ({
  size = "md",
  variant = "primary",
  label,
  className,
}: SpinnerProps) => {
  const sizeStyles = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const variantStyles = {
    primary: "text-red-600",
    white: "text-white",
    slate: "text-slate-500",
    blue: "text-blue-600",
  };

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <Loader2
        className={cn(
          "animate-spin shrink-0",
          sizeStyles[size],
          variantStyles[variant],
        )}
      />
      {label && (
        <span className="text-xs font-medium text-slate-600 select-none">
          {label}
        </span>
      )}
    </div>
  );
};
