import { Search } from "lucide-react";
import type { MasterConfig } from "@/types/master/master-data";

interface MasterSearchBarProps {
  isTarifTab: boolean;
  currentConfig: MasterConfig;
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export const MasterSearchBar = ({
  isTarifTab,
  currentConfig,
  searchQuery,
  onSearchChange,
}: MasterSearchBarProps) => {
  return (
    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-2.5">
      <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
      <input
        type="text"
        placeholder={
          isTarifTab
            ? "Cari nama customer, kode, atau catatan tarif kontrak..."
            : `Cari nama, kode, atau detail ${currentConfig.label}...`
        }
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full text-xs sm:text-sm outline-none placeholder:text-slate-400"
      />
    </div>
  );
};
