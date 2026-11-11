import { Receipt, Send } from "lucide-react";
import { Modal, Button } from "@/components/ui";
import { Input, NumberInput, Checkbox } from "@/components/forms";
import { formatRupiah } from "@/utils/formatters";
import type { ProcessInvoiceModalProps } from "@/types";
import { useProcessInvoiceModal } from "../hooks/useProcessInvoiceModal";

export const ProcessInvoiceModal = (props: ProcessInvoiceModalProps) => {
  const {
    order,
    tonase,
    contract,
    pnbpCalc,
    invoiceNo,
    setInvoiceNo,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    ratePerTon,
    setRatePerTon,
    rkbmFee,
    setRkbmFee,
    kepabeananFee,
    setKepabeananFee,
    cooFee,
    setCooFee,
    includePpn,
    setIncludePpn,
    pnbpBarang,
    setPnbpBarang,
    pnbpPengawasan,
    setPnbpPengawasan,
    accurateNotes,
    setAccurateNotes,
    jasaPbm,
    subtotalJasa,
    ppn,
    totalPnbp,
    grandTotal,
    handleSubmit,
    onClose,
  } = useProcessInvoiceModal(props);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      icon={Receipt}
      title="Proforma Invoice & Sinkronisasi Accurate"
      description={`Order: ${order.id} • ${order.customer} (${order.vessel})`}
      maxWidth="2xl">
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Ringkasan Kontrak & Muatan */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[10.5px]">
              Customer:
            </span>
            <span className="font-bold text-slate-800">{order.customer}</span>
            {contract && (
              <span className="text-[10px] text-emerald-600 block font-semibold mt-0.5">
                ✓ Kontrak Terdaftar
              </span>
            )}
          </div>
          <div>
            <span className="text-slate-400 block text-[10.5px]">
              Realisasi DSR:
            </span>
            <span className="font-bold text-emerald-700 font-mono">
              {tonase.toLocaleString("id-ID")} MT
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10.5px]">
              Jetty / POL:
            </span>
            <span className="font-semibold text-slate-800">
              {order.pol} ({order.polJettyType || "Private"})
            </span>
          </div>
        </div>

        {/* Form Administrasi Nomor & Tanggal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            required
            label="Nomor Invoice"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            className="font-mono"
          />
          <Input
            required
            type="date"
            label="Tanggal Terbit"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
          <Input
            required
            type="date"
            label="Jatuh Tempo (Due Date)"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Pengaturan Jasa PBM & RKBM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <NumberInput
            label="Tarif Jasa PBM (per MT)"
            prefix="Rp"
            badgeText={order.rateType ? `[${order.rateType}]` : undefined}
            value={ratePerTon}
            onChange={(val) => setRatePerTon(val ?? 0)}
          />

          <NumberInput
            label="Fee Dokumen RKBM"
            prefix="Rp"
            badgeText={
              order.polJettyType === "Private"
                ? "(Private Jetty: Rp 0)"
                : undefined
            }
            value={rkbmFee}
            onChange={(val) => setRkbmFee(val ?? 0)}
          />
        </div>

        {/* Jasa Dokumen Kepabeanan & COO (Tampil Otomatis Jika Kontrak Ada) */}
        {(Boolean(contract?.kepabeananFee) ||
          Boolean(contract?.cooFee) ||
          kepabeananFee > 0 ||
          cooFee > 0) && (
          <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-indigo-900 block">
              Jasa Dokumen Kepabeanan & COO (Flat per Dokumen)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <NumberInput
                label="Fee Kepabeanan"
                prefix="Rp"
                value={kepabeananFee}
                onChange={(val) => setKepabeananFee(val ?? 0)}
              />
              <NumberInput
                label="Fee COO (SKA)"
                prefix="Rp"
                value={cooFee}
                onChange={(val) => setCooFee(val ?? 0)}
              />
            </div>
          </div>
        )}

        {/* Opsi PPN 11% (Menggunakan Reusable Checkbox Component) */}
        <Checkbox
          id="include-ppn"
          card
          checked={includePpn}
          onChange={(e) => setIncludePpn(e.target.checked)}
          label="Kenakan PPN 11% pada Total Tagihan Jasa"
          description="Dihitung 11% dari subtotal jasa kena pajak (Jasa PBM, Dokumen RKBM, Kepabeanan & COO)"
        />

        {/* Reimbursement PNBP */}
        <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl space-y-2">
          <span className="text-xs font-bold text-blue-900 block">
            Reimbursement PNBP (Talangan Kas Negara - Non PPN)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <NumberInput
              label={`PNBP Barang (${order.activityType})`}
              prefix="Rp"
              value={pnbpBarang}
              onChange={(val) => setPnbpBarang(val ?? 0)}
            />

            <NumberInput
              label="PNBP Pengawasan Bongkar Muat"
              prefix="Rp"
              value={pnbpPengawasan}
              onChange={(val) => setPnbpPengawasan(val ?? 0)}
            />
          </div>
        </div>

        {/* Catatan Sinkronisasi Accurate */}
        <Input
          label="Catatan Sinkronisasi Software Accurate (Opsional)"
          placeholder="Contoh: No faktur Accurate #2026-0421 / Pembulatan kas"
          value={accurateNotes}
          onChange={(e) => setAccurateNotes(e.target.value)}
        />

        {/* Rekap Total Tagihan: Terpisah Antara Jasa vs PNBP */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
          {/* 1. Rincian Tagihan Jasa (Objek PPN) */}
          <div className="space-y-1.5 pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
              1. Rincian Tagihan Jasa (Objek PPN)
            </span>
            {Boolean(jasaPbm) && (
              <div className="flex justify-between text-slate-600 pl-2">
                <span>
                  • Jasa PBM ({tonase.toLocaleString("id-ID")} MT ×{" "}
                  {formatRupiah(ratePerTon)}):
                </span>
                <span className="font-mono font-medium">
                  {formatRupiah(jasaPbm)}
                </span>
              </div>
            )}
            {Boolean(rkbmFee) && (
              <div className="flex justify-between text-slate-600 pl-2">
                <span>• Fee Dokumen RKBM:</span>
                <span className="font-mono font-medium">
                  {formatRupiah(rkbmFee)}
                </span>
              </div>
            )}
            {Boolean(kepabeananFee) && (
              <div className="flex justify-between text-slate-600 pl-2">
                <span>• Jasa Kepabeanan:</span>
                <span className="font-mono font-medium">
                  {formatRupiah(kepabeananFee)}
                </span>
              </div>
            )}
            {Boolean(cooFee) && (
              <div className="flex justify-between text-slate-600 pl-2">
                <span>• Jasa Penerbitan COO:</span>
                <span className="font-mono font-medium">
                  {formatRupiah(cooFee)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-slate-800 font-semibold pt-1 border-t border-dashed border-slate-200">
              <span>Subtotal Tagihan Jasa:</span>
              <span className="font-mono">{formatRupiah(subtotalJasa)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>PPN 11%:</span>
              <span className="font-mono font-medium text-emerald-700">
                +{formatRupiah(ppn)}
              </span>
            </div>
          </div>

          {/* 2. Rincian Reimbursement PNBP (Non PPN) */}
          <div className="space-y-1.5 pb-2 border-b border-slate-200">
            <span className="font-bold text-blue-900 block text-[11px] uppercase tracking-wider">
              2. Rincian Reimbursement PNBP (Talangan Kas Negara - Non PPN)
            </span>
            <div className="flex justify-between text-slate-600 pl-2">
              <span>
                • PNBP Barang ({order.activityType} @ Rp {pnbpCalc.rateBarang}
                /MT):
              </span>
              <span className="font-mono font-medium text-blue-700">
                {formatRupiah(pnbpBarang)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 pl-2">
              <span>• PNBP Pengawasan Bongkar Muat (@ Rp 54/MT):</span>
              <span className="font-mono font-medium text-blue-700">
                {formatRupiah(pnbpPengawasan)}
              </span>
            </div>
            <div className="flex justify-between text-blue-900 font-semibold pt-1 border-t border-dashed border-blue-200">
              <span>Total Reimbursement PNBP:</span>
              <span className="font-mono">{formatRupiah(totalPnbp)}</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="flex justify-between items-center pt-1 text-sm font-black text-slate-900">
            <span>TOTAL DITAGIHKAN (Jasa + PPN + PNBP):</span>
            <span className="font-mono text-base text-red-600 font-bold">
              {formatRupiah(grandTotal)}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary" type="submit" leftIcon={Send}>
            Terbitkan & Kirim Invoice
          </Button>
        </div>
      </form>
    </Modal>
  );
};
