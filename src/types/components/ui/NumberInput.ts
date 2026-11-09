import type { LucideIcon } from "lucide-react";

export interface NumberInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: LucideIcon;
  prefix?: string;
  suffix?: string;
  badgeText?: string;
  placeholder?: string;
  value?: number | null | undefined;
  onChange: (val: number | undefined) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}
