import { Users, UserCheck, Shield } from "lucide-react";
import { KpiCard } from "@/components/ui";
import type { UserStats } from "@/types";

interface UserKpiCardsProps {
  stats: UserStats;
}

export const UserKpiCards = ({ stats }: UserKpiCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        title="Total Pengguna"
        value={stats.total}
        subtitle="Seluruh akun terdaftar"
        icon={Users}
      />
      <KpiCard
        title="Pengguna Aktif"
        value={stats.active}
        subtitle="Status akun aktif"
        icon={UserCheck}
        variant="success"
      />
      <KpiCard
        title="Divisi Operasional"
        value={stats.ops}
        subtitle="Staf lapangan & RKBM"
        icon={Shield}
        variant="info"
      />
      <KpiCard
        title="Sales & Finance"
        value={stats.salesFinance}
        subtitle="Order & penagihan"
        icon={Shield}
        variant="warning"
      />
    </div>
  );
};
