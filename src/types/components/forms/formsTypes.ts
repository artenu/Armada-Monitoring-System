import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

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

//////////////////////////////////////////////////////////////////////////

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  description?: string;
  card?: boolean;
}

//////////////////////////////////////////////////////////////////////////

export interface DateInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
  helperText?: string;
  onClear?: () => void;
}

//////////////////////////////////////////////////////////////////////////

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: LucideIcon;
  badgeText?: string;
}

//////////////////////////////////////////////////////////////////////////

export interface SearchableOption {
  value: string;
  label: string;
  subLabel?: string;
}

export interface SearchableSelectProps {
  label?: string;
  startIcon?: LucideIcon;
  options?: (string | SearchableOption)[];
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  name?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

//////////////////////////////////////////////////////////////////////////

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  shortcutHint?: string;
}

//////////////////////////////////////////////////////////////////////////
