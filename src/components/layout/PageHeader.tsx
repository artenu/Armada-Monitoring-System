import { cn } from "@/utils/cn";
import type { PageHeaderProps } from "@/types/components/layout/layoutTypes";

export const PageHeader = ({
  title,
  description,
  icon: Icon,
  badge,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-100",
        className,
      )}>
      <div>
        {breadcrumbs && <div className="mb-1.5">{breadcrumbs}</div>}
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-2 bg-red-50 text-red-600 rounded-xl shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {title}
              </h1>
              {badge}
            </div>
            {description && (
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
};
