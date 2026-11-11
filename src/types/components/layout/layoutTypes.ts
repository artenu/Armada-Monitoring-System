import type { HTMLAttributes } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

////////////////////////////////////////////////////////////////

export interface FooterProps {
  className?: string;
}

////////////////////////////////////////////////////////////////

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: "sm" | "md" | "lg";
}

////////////////////////////////////////////////////////////////

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: ReactNode;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
