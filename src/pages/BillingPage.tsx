import { Receipt, CheckCircle2, Clock, AlertCircle, Inbox } from "lucide-react";
import { KpiCard } from "@/components/ui";
import { formatRupiah } from "@/utils/formatters";
import { useBilling } from "@/features/billing/hooks/useBilling";
import {
  ProcessInvoiceModal,
  InvoiceSlipModal,
  ConfirmPaymentModal,
  BillingFilterBar,
  BillingTable,
} from "@/features/billing/components";

export const BillingPage = () => {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedForInvoice,
    setSelectedForInvoice,
    selectedForPrint,
    setSelectedForPrint,
    selectedForPay,
    setSelectedForPay,
    billingOrders,
    stats,
    filteredOrders,
    updateOrder,
  } = useBilling();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-red-600" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Penagihan & Faktur (Billing)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola pembuatan proforma invoice, reimbursement PNBP, integrasi
            Accurate, dan pelunasan tagihan.
          </p>
        </div>
      </div>

      {/* 2. Kartu KPI Finance */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard
          title="Siap Ditagihkan"
          value={stats.readyToBillCount}
          subtitle="Order selesai belum berinvoice"
          variant="warning"
          icon={AlertCircle}
        />
        <KpiCard
          title="Terkirim / Accurate"
          value={stats.sentCount}
          subtitle={formatRupiah(stats.sentTotal)}
          variant="info"
          icon={Clock}
        />
        <KpiCard
          title="Diterima Customer"
          value={stats.receivedCount}
          subtitle={formatRupiah(stats.receivedTotal)}
          variant="default"
          icon={Inbox}
        />
        <KpiCard
          title="Lunas (Kas Masuk)"
          value={stats.paidCount}
          subtitle={formatRupiah(stats.paidTotal)}
          variant="success"
          icon={CheckCircle2}
        />
      </div>

      {/* 3. Filter Tab & Pencarian */}
      <BillingFilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={billingOrders.length}
        stats={stats}
      />

      {/* 4. Tabel Data Job Finance */}
      <BillingTable
        orders={filteredOrders}
        onSelectForInvoice={setSelectedForInvoice}
        onSelectForPrint={setSelectedForPrint}
        onSelectForPay={setSelectedForPay}
        onMarkAsReceived={(orderId) => {
          void updateOrder(orderId, {
            status: "Diterima",
            receivedDate: new Date().toISOString().split("T")[0],
          });
        }}
      />

      {/* Modal 1: Auto-generate & Form Penyesuaian Accurate */}
      {selectedForInvoice && (
        <ProcessInvoiceModal
          order={selectedForInvoice}
          onClose={() => setSelectedForInvoice(null)}
          onSave={(payload) => {
            void updateOrder(selectedForInvoice.id, {
              ...payload,
              status: "Terkirim",
              sentDate: new Date().toISOString().split("T")[0],
            });
            setSelectedForInvoice(null);
          }}
        />
      )}

      {/* Modal 2: Cetak Faktur Tagihan Resmi */}
      {selectedForPrint && (
        <InvoiceSlipModal
          order={selectedForPrint}
          onClose={() => setSelectedForPrint(null)}
        />
      )}

      {/* Modal 3: Konfirmasi Pelunasan */}
      {selectedForPay && (
        <ConfirmPaymentModal
          order={selectedForPay}
          onClose={() => setSelectedForPay(null)}
          onConfirm={(paymentDate, paymentNotes) => {
            void updateOrder(selectedForPay.id, {
              status: "Lunas",
              paymentDate,
              paymentNotes,
            });
            setSelectedForPay(null);
          }}
        />
      )}
    </div>
  );
};
