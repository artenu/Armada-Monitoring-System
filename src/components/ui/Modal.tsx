import type { ReactNode } from "react";
import { X, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  children: ReactNode;
}

const widthStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  icon: Icon,
  maxWidth = "lg",
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={cn(
          "bg-white w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col",
          widthStyles[maxWidth],
        )}>
        {/* Header Modal */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className="p-2 bg-red-50 text-red-600 rounded-xl border border-red-100 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {title}
              </h3>
              {description && (
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {description}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg cursor-pointer transition-colors"
            aria-label="Tutup modal">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body dengan Auto-scroll */}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
