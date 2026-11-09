import type {
  HTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
  ReactNode,
} from "react";
import { Ship, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export const TableCard = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs",
      className,
    )}>
    <div className="overflow-x-auto">{children}</div>
  </div>
);

export const Table = ({
  children,
  className,
}: HTMLAttributes<HTMLTableElement>) => (
  <table className={cn("w-full text-left border-collapse text-xs", className)}>
    {children}
  </table>
);

export const THead = ({
  children,
  className,
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className={cn(
      "bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10.5px]",
      className,
    )}>
    {children}
  </thead>
);

export const TBody = ({
  children,
  className,
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("divide-y divide-slate-100", className)}>
    {children}
  </tbody>
);

export const TR = ({
  children,
  className,
}: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn("hover:bg-slate-50/60 transition-colors", className)}>
    {children}
  </tr>
);

export const TH = ({
  children,
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn("py-3 px-4", className)} {...props}>
    {children}
  </th>
);

export const TD = ({
  children,
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("py-3 px-4 whitespace-nowrap", className)} {...props}>
    {children}
  </td>
);

export const EmptyState = ({
  message = "Tidak ada data yang ditemukan.",
  icon: Icon = Ship,
  colSpan = 10,
}: {
  message?: string;
  icon?: LucideIcon;
  colSpan?: number;
  action?: ReactNode;
}) => (
  <tr>
    <td colSpan={colSpan} className="py-12 text-center text-slate-400">
      <Icon className="w-8 h-8 mx-auto mb-2 opacity-30" />
      <p className="font-medium text-xs">{message}</p>
    </td>
  </tr>
);
