import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "muted" | "flat";
  hoverable?: boolean;
}

export const Card = ({
  children,
  className,
  variant = "default",
  hoverable = false,
  ...props
}: CardProps) => {
  const variantStyles = {
    default: "bg-white border-slate-200/80 shadow-xs",
    muted: "bg-slate-50/70 border-slate-200/60 shadow-none",
    flat: "bg-white border-transparent shadow-none",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200",
        variantStyles[variant],
        hoverable && "hover:shadow-md hover:border-slate-300",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-5 pb-3 border-b border-slate-100 flex items-center justify-between gap-3",
      className,
    )}
    {...props}>
    {children}
  </div>
);

export const CardTitle = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-sm font-bold text-slate-900 tracking-tight", className)}
    {...props}>
    {children}
  </h3>
);

export const CardDescription = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-xs text-slate-400 mt-0.5", className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-5", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 rounded-b-2xl flex items-center justify-between text-xs text-slate-500",
      className,
    )}
    {...props}>
    {children}
  </div>
);
