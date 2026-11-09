import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export type KpiVariant = "default" | "success" | "warning" | "info";

export interface KpiCardProps {
  title?: string;
  label?: string; // alias untuk title
  value: string | number;
  subtitle?: string;
  description?: string; // alias untuk subtitle
  icon: LucideIcon;
  variant?: KpiVariant;
  className?: string;
}

const variantStyles: Record<
  KpiVariant,
  { card: string; title: string; iconBox: string; value: string; sub: string }
> = {
  default: {
    card: "border-slate-200/80",
    title: "text-slate-500",
    iconBox: "bg-slate-100 text-slate-700",
    value: "text-slate-900",
    sub: "text-slate-400",
  },
  success: {
    card: "border-emerald-200/80",
    title: "text-emerald-700",
    iconBox: "bg-emerald-50 text-emerald-600",
    value: "text-emerald-700",
    sub: "text-emerald-600/80",
  },
  warning: {
    card: "border-amber-200/80",
    title: "text-amber-700",
    iconBox: "bg-amber-50 text-amber-600",
    value: "text-amber-700",
    sub: "text-amber-600/80",
  },
  info: {
    card: "border-blue-200/80",
    title: "text-blue-700",
    iconBox: "bg-blue-50 text-blue-600",
    value: "text-blue-700",
    sub: "text-blue-600/80",
  },
};

export const KpiCard = ({
  title,
  label,
  value,
  subtitle,
  description,
  icon: Icon,
  variant = "default",
  className,
}: KpiCardProps) => {
  const effectiveTitle = title || label || "";
  const effectiveSubtitle = subtitle || description;
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "bg-white p-4 rounded-2xl border shadow-xs transition-shadow hover:shadow-sm",
        styles.card,
        className,
      )}>
      <div className="flex items-center justify-between">
        <span className={cn("text-xs font-semibold", styles.title)}>
          {effectiveTitle}
        </span>
        <div className={cn("p-2 rounded-xl", styles.iconBox)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p
        className={cn(
          "text-2xl font-black mt-2 font-mono tracking-tight",
          styles.value,
        )}>
        {value}
      </p>
      {effectiveSubtitle && (
        <span className={cn("text-[11px] mt-0.5 block", styles.sub)}>
          {effectiveSubtitle}
        </span>
      )}
    </div>
  );
};
