import { ShieldCheck } from "lucide-react";
import { cn } from "@/utils/cn";
import type { FooterProps } from "@/types/components/layout/layoutTypes";

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "mt-auto py-4 px-6 border-t border-slate-200/80 bg-white/60 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2",
        className,
      )}>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-700">
          Armada Monitoring System
        </span>
        <span>&bull;</span>
        <span>PT Gapura Segara Borneo</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-emerald-600 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          Operasional Aktif
        </span>
        <span>&bull;</span>
        <span>Versi 2.2</span>
      </div>
    </footer>
  );
};
