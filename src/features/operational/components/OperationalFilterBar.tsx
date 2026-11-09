import { Search } from "lucide-react";
import type { OperationalFilterBarProps } from "@/types";
import { OPERATIONAL_TAB_CONFIGS } from "@/data/operational-data";

export const OperationalFilterBar = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  stats,
}: OperationalFilterBarProps) => {
  const countMap = {
    all: stats.total,
    pending_rkbm: stats.pendingRkbm,
    loading: stats.loading,
    completed: stats.completed,
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
      {/* List Tab Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {OPERATIONAL_TAB_CONFIGS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = countMap[tab.id];

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}>
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Input Pencarian */}
      <div className="relative w-full sm:w-64">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari kapal, armada, RKBM..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-600 focus:bg-white transition-all"
        />
      </div>
    </div>
  );
};
