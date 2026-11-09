import { Search } from "lucide-react";
import type { RoleFilter } from "@/types";

interface UserFilterBarProps {
  activeTab: RoleFilter;
  onTabChange: (tab: RoleFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

export const UserFilterBar = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  totalCount,
}: UserFilterBarProps) => {
  const tabs = [
    { id: "all" as const, label: `Semua (${totalCount})` },
    { id: "admin" as const, label: "Admin" },
    { id: "sales" as const, label: "Sales" },
    { id: "operasional" as const, label: "Operasional" },
    { id: "finance" as const, label: "Finance" },
    { id: "nonaktif" as const, label: "Nonaktif" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:w-64">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari staf, email, divisi..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-600 focus:bg-white transition-all"
        />
      </div>
    </div>
  );
};
