import { forwardRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/utils/cn";
import type { SearchInputProps } from "@/types/components/forms/formsTypes";

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onClear,
      placeholder = "Cari data...",
      shortcutHint,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative flex items-center w-full", className)}>
        <div className="absolute left-3 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "w-full pl-9 pr-9 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl",
            "placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all",
            "shadow-2xs",
          )}
          {...props}
        />

        {Boolean(value) && onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2.5 p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        ) : shortcutHint ? (
          <kbd className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
            {shortcutHint}
          </kbd>
        ) : null}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
