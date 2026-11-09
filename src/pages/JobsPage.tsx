import { useNavigate } from "react-router-dom";
import { Plus, Ship, Clock, Anchor, CheckCircle2 } from "lucide-react";
import { Button, KpiCard } from "@/components/ui";
import { useJobs } from "@/features/jobs/hooks/useJobs";
import {
  JobSearchBar,
  JobTable,
  CreateOrderModal,
} from "@/features/jobs/components";

export const JobsPage = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    stats,
    filteredOrders,
    handleDeleteOrder,
    handleSendToOperational,
    handleSaveOrder,
  } = useJobs();

  return (
    <div className="space-y-6">
      {/* 1. Header Responsif */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Ship className="w-6 h-6 text-red-600" />
            <span>Job Sales & Order Muat</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitoring pergerakan tongkang batubara dan pengurusan awal izin
            RKBM.
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={Plus}
          onClick={() => setIsModalOpen(true)}>
          Orderan Baru
        </Button>
      </div>

      {/* 2. Kartu Metrik KPI Cepat */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard
          title="Total Order"
          value={stats.total}
          subtitle="Seluruh order terdaftar"
          icon={Ship}
        />
        <KpiCard
          title="Siap Ditagihkan"
          value={stats.readyToBill}
          subtitle="Menunggu penerbitan invoice"
          icon={Clock}
          variant="warning"
        />
        <KpiCard
          title="Proses Muat / Ops"
          value={stats.loading}
          subtitle="Armada aktif di lapangan"
          icon={Anchor}
          variant="info"
        />
        <KpiCard
          title="Selesai / Lunas"
          value={stats.completed}
          subtitle="Pembayaran telah diterima"
          icon={CheckCircle2}
          variant="success"
        />
      </div>

      {/* 3. Bar Pencarian */}
      <JobSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* 4. Tabel Responsif */}
      <JobTable
        orders={filteredOrders}
        onSendToOperational={handleSendToOperational}
        onEdit={(id) => navigate(`/jobs/${id}/edit`)}
        onDelete={handleDeleteOrder}
      />

      {/* 5. Modal Tambah Order Baru */}
      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleSaveOrder}
      />
    </div>
  );
};
