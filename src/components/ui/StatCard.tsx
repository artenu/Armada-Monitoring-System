import type { ReactNode } from "react";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/utils/cn";

export interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "info" | "purple";
  trend?: {
    value: number | string;
    isPositive?: boolean;
    label?: string;
  };
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const StatCard = ({
  label,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
  trend,
  badge,
  children,
  className,
}: StatCardProps) => {
  const variantStyles = {
    default: {
      card: "border-slate-200/80 hover:border-slate-300",
      icon: "bg-slate-100 text-slate-700",
      val: "text-slate-900",
    },
    success: {
      card: "border-emerald-200/80 hover:border-emerald-300",
      icon: "bg-emerald-50 text-emerald-600",
      val: "text-emerald-700",
    },
    warning: {
      card: "border-amber-200/80 hover:border-amber-300",
      icon: "bg-amber-50 text-amber-600",
      val: "text-amber-700",
    },
    info: {
      card: "border-blue-200/80 hover:border-blue-300",
      icon: "bg-blue-50 text-blue-600",
      val: "text-blue-700",
    },
    purple: {
      card: "border-purple-200/80 hover:border-purple-300",
      icon: "bg-purple-50 text-purple-600",
      val: "text-purple-700",
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <div
      className={cn(
        "bg-white p-5 rounded-2xl border shadow-xs transition-all hover:shadow-md flex flex-col justify-between",
        currentVariant.card,
        className,
      )}>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {label}
          </span>
          <div className={cn("p-2.5 rounded-xl shrink-0", currentVariant.icon)}>
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span
            className={cn(
              "text-2xl sm:text-3xl font-extrabold tracking-tight font-mono",
              currentVariant.val,
            )}>
            {value}
          </span>
          {badge}
        </div>

        {trend && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
            {trend.isPositive ? (
              <span className="inline-flex items-center gap-0.5 text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5" />+{trend.value}%
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-red-600">
                <TrendingDown className="w-3.5 h-3.5" />-{trend.value}%
              </span>
            )}
            {trend.label && (
              <span className="text-slate-400 font-normal">{trend.label}</span>
            )}
          </div>
        )}

        {subtitle && (
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="mt-4 pt-3 border-t border-slate-100">{children}</div>
      )}
    </div>
  );
};
