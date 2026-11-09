import { Search } from "lucide-react";
import type { JobSearchBarProps } from "@/types";

export const JobSearchBar = ({
  searchQuery,
  onSearchChange,
  placeholder = "Cari nama Mother Vessel, Customer, atau Tongkang...",
}: JobSearchBarProps) => {
  return (
    <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-2xs">
      <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full text-xs sm:text-sm outline-none placeholder:text-slate-400 bg-transparent"
      />
    </div>
  );
};