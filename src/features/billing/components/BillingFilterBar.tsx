import { Search } from "lucide-react";
import type { BillingTab, BillingFilterBarProps } from "@/types";
import { BILLING_TAB_CONFIGS } from "@/data/billing-data";

export const BillingFilterBar = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  totalCount,
  stats,
}: BillingFilterBarProps) => {
  // Mapping jumlah count per tab ID
  const countMap: Record<BillingTab, number> = {
    all: totalCount,
    ready_to_bill: stats.readyToBillCount,
    sent: stats.sentCount,
    received: stats.receivedCount,
    paid: stats.paidCount,
    pending_payment: 0,
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
      {/* Tab Filter Tombol dari data config */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {BILLING_TAB_CONFIGS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = countMap[tab.id] ?? 0;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                isActive ? tab.activeClass : "text-slate-600 hover:bg-slate-100"
              }`}>
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Input Pencarian */}
      <div className="relative min-w-[240px]">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari customer, kapal, no. invoice..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
        />
      </div>
    </div>
  );
};
