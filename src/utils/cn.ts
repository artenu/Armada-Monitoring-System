import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Menggabungkan class Tailwind secara dinamis dan menyelesaikan konflik class otomatis.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
