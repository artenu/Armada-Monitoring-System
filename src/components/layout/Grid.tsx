import { cn } from "@/utils/cn";
import type { GridProps } from "@/types/components/layout/layoutTypes";

export const Grid = ({
  children,
  cols = 4,
  gap = "md",
  className,
  ...props
}: GridProps) => {
  const colStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
    12: "grid-cols-12",
  };

  const gapStyles = {
    sm: "gap-2.5",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div
      className={cn("grid", colStyles[cols], gapStyles[gap], className)}
      {...props}>
      {children}
    </div>
  );
};
