import { useNavigate } from "react-router-dom";
import { Ship, Clock, Anchor, CheckCircle2 } from "lucide-react";
import { KpiCard } from "@/components/ui";
import { useOperational } from "@/features/operational/hooks/useOperational";
import {
  OperationalFilterBar,
  OperationalTable,
  UpdateRkbmModal,
  CompleteLoadingModal,
} from "@/features/operational/components";

export const OperationalPage = () => {
  const navigate = useNavigate();
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedOrderForRkbm,
    setSelectedOrderForRkbm,
    selectedOrderForComplete,
    setSelectedOrderForComplete,
    stats,
    filteredOrders,
    handleSaveRkbm,
    handleCompleteLoading,
  } = useOperational();

  return (
    <div className="space-y-6">
      {/* 1. Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Ship className="w-6 h-6 text-red-600" />
            <span>Job Operational</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pengurusan izin RKBM Inaportnet, plotting armada kapal, dan
            monitoring realisasi muat & bongkar operasional.
          </p>
        </div>
      </div>

      {/* 2. KPI Cards Operasional */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Operasional"
          value={stats.total}
          subtitle="Order aktif & selesai"
          icon={Ship}
        />
        <KpiCard
          title="Menunggu Izin RKBM"
          value={stats.pendingRkbm}
          subtitle="Belum ada nomor persetujuan KSOP"
          icon={Clock}
          variant="warning"
        />
        <KpiCard
          title="Sedang Proses Ops"
          value={stats.loading}
          subtitle="Muat / bongkar aktif di jetty / anchorage"
          icon={Anchor}
          variant="info"
        />
        <KpiCard
          title="Selesai Ops (Ready Bill)"
          value={stats.completed}
          subtitle="DSR final diteruskan ke Finance"
          icon={CheckCircle2}
          variant="success"
        />
      </div>

      {/* 3. Filter Tab & Pencarian */}
      <OperationalFilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        stats={stats}
      />

      {/* 4. Tabel Data Operasional */}
      <OperationalTable
        orders={filteredOrders}
        onUpdateOps={setSelectedOrderForRkbm}
        onCompleteLoading={setSelectedOrderForComplete}
        onViewDetail={(id) => navigate(`/jobs/${id}/edit`)}
      />

      {/* 5. Modal Perizinan RKBM & Plotting Armada */}
      <UpdateRkbmModal
        isOpen={Boolean(selectedOrderForRkbm)}
        order={selectedOrderForRkbm}
        onClose={() => setSelectedOrderForRkbm(null)}
        onSave={handleSaveRkbm}
      />

      {/* 6. Modal Konfirmasi Selesai Muat / Bongkar */}
      <CompleteLoadingModal
        isOpen={Boolean(selectedOrderForComplete)}
        order={selectedOrderForComplete}
        onClose={() => setSelectedOrderForComplete(null)}
        onComplete={handleCompleteLoading}
      />
    </div>
  );
};
