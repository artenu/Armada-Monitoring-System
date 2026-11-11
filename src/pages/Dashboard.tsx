import { useDashboardMetrics } from "@/features/jobs/hooks/useDashboardMetrics";
import { DashboardKpiCards } from "@/features/dashboard/components/DashboardKpiCards";
import { DashboardOrdersTable } from "@/features/dashboard/components/DashboardOrdersTable";

export const DashboardPage = () => {
  const { metrics, orders } = useDashboardMetrics();

  return (
    <div className="space-y-6">
      {/* Header Dashboard */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Executive Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitoring terpadu sebaran layanan operasional dan status keuangan
          Armada
        </p>
      </div>

      {/* Grid 4 Kartu KPI Ringkasan */}
      <DashboardKpiCards metrics={metrics} />

      {/* Tabel Live Monitoring Armada */}
      <DashboardOrdersTable orders={orders} />
    </div>
  );
};
