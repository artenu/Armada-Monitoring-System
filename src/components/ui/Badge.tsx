import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export type BadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  icon?: LucideIcon;
  dot?: boolean;
  className?: string;
  title?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
};

const dotStyles: Record<BadgeVariant, string> = {
  neutral: "bg-slate-400",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  purple: "bg-purple-500",
};

export const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  icon: Icon,
  dot = false,
  className,
  title,
}: BadgeProps) => {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center border font-bold rounded-full select-none",
        size === "sm"
          ? "px-2 py-0.5 text-[10px] gap-1"
          : "px-2.5 py-0.5 text-[11px] gap-1.5",
        variantStyles[variant],
        className,
      )}>
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            dotStyles[variant],
          )}
        />
      )}
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
