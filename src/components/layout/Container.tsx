import { cn } from "@/utils/cn";
import type { ContainerProps } from "@/types/components/layout/layoutTypes";

export const Container = ({
  children,
  size = "xl",
  className,
  ...props
}: ContainerProps) => {
  const sizeStyles = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6",
        sizeStyles[size],
        className,
      )}
      {...props}>
      {children}
    </div>
  );
};
