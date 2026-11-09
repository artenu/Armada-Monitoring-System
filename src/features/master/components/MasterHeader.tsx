import { Database, Plus } from "lucide-react";
import { Button } from "@/components/ui";
import type { MasterConfig } from "@/types/master/master-data";

interface MasterHeaderProps {
  isTarifTab: boolean;
  currentConfig: MasterConfig;
  onAdd: () => void;
}

export const MasterHeader = ({
  isTarifTab,
  currentConfig,
  onAdd,
}: MasterHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-red-600" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {isTarifTab ? "Master Data Tarif Kontrak" : "Master Data"}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          {isTarifTab
            ? "Kelola tarif jasa PBM per ton, biaya dokumen RKBM (Muat/Bongkar), dan jasa kepabeanan per customer."
            : "Kelola referensi armada kapal, customer, kontak PIC, agen, dan jetty bongkar muat."}
        </p>
      </div>

      <Button variant="primary" leftIcon={Plus} onClick={onAdd}>
        {isTarifTab ? "Tambah Tarif Kontrak" : `Tambah ${currentConfig.label}`}
      </Button>
    </div>
  );
};
