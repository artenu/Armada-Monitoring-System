import { Layers, Clock, Receipt, DollarSign } from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { formatRupiah } from "@/utils/formatters";
import type { DashboardMetrics } from "@/types/dashboard/dashboardTypes";

interface DashboardKpiCardsProps {
  metrics: DashboardMetrics;
}

export const DashboardKpiCards = ({ metrics }: DashboardKpiCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* KARTU 1: Sebaran Layanan Kegiatan */}
      <KpiCard
        title="Sebaran Layanan"
        value={`${metrics.totalOrders} Order`}
        subtitle={`PBM: ${metrics.pbmCount} | RKBM: ${metrics.rkbmCount} | Customs: ${metrics.customsCount}`}
        variant="info"
        icon={Layers}
      />

      {/* KARTU 2: Status Pekerjaan Lapangan (Belum Beres vs Beres) */}
      <KpiCard
        title="Status Kegiatan"
        value={`${metrics.activeCount} Belum Beres`}
        subtitle={`Kegiatan Selesai: ${metrics.completedCount} Order`}
        variant="warning"
        icon={Clock}
      />

      {/* KARTU 3: Tagihan Sudah Diterbitkan (Invoiced) */}
      <KpiCard
        title="Sudah Di-Invoice"
        value={formatRupiah(metrics.totalInvoicedAmount)}
        subtitle={`Jumlah Faktur: ${metrics.invoicedCount} Order`}
        variant="default"
        icon={Receipt}
      />

      {/* KARTU 4: Tagihan Sudah Lunas (Kas Masuk) */}
      <KpiCard
        title="Tagihan Sudah Lunas"
        value={formatRupiah(metrics.totalPaidAmount)}
        subtitle={`Kas Masuk: ${metrics.paidCount} Order Lunas`}
        variant="success"
        icon={DollarSign}
      />
    </div>
  );
};
