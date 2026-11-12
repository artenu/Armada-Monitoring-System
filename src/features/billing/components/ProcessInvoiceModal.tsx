import { Receipt, Upload, ExternalLink } from "lucide-react";
import { Modal, Button } from "@/components/ui";
import { Input } from "@/components/forms";
import { formatRupiah } from "@/utils/formatters";
import type { ProcessInvoiceModalProps } from "@/types";
import { useProcessInvoiceModal } from "../hooks/useProcessInvoiceModal";

export const ProcessInvoiceModal = (props: ProcessInvoiceModalProps) => {
  const {
    order,
    tonase,
    contract,
    isPbm,
    isRkbm,
    isCustoms,
    isPnbpGratis,
    invoiceNo,
    setInvoiceNo,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    invoiceDocUrl,
    invoiceDocName,
    handleFileChange,
    ratePerTon,
    jasaPbm,
    rkbmFee,
    kepabeananFee,
    cooFee,
    subtotalJasa,
    ppn,
    pnbpCalc,
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
      title="Proforma & Upload Invoice Resmi"
      description={`Order: ${order.id} • ${order.customer} (${order.vessel || "Tanpa Kapal"})`}
      maxWidth="2xl">
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* 1. Ringkasan Kontrak & Muatan */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[10.5px]">
              Customer:
            </span>
            <span className="font-bold text-slate-800">{order.customer}</span>
            <span className="text-[10px] text-emerald-600 block font-semibold mt-0.5">
              ✓ {contract?.service || order.service || "Kontrak Aktif"}
            </span>
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
              Lokasi / Pelabuhan:
            </span>
            <span className="font-semibold text-slate-800">
              {order.pol || "Muara Berau"} ({order.polJettyType || "Private"})
            </span>
          </div>
        </div>

        {/* 2. Form Administrasi Nomor & Tanggal */}
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

        {/* 3. Upload Berkas Invoice Resmi (Sesuai MOM 11 Nov 2026) */}
        <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-amber-900">
              Upload Dokumen Invoice Resmi (PDF / Gambar)
            </label>
            <span className="text-[10.5px] text-amber-700 font-medium">
              Wajib untuk merilis ke status Terkirim
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex-1 flex items-center gap-2 px-3.5 py-2.5 border border-dashed border-amber-300 hover:border-amber-500 rounded-lg cursor-pointer bg-white transition-colors">
              <Upload className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs text-slate-700 truncate">
                {invoiceDocName || "Pilih berkas invoice (PDF atau gambar)..."}
              </span>
              <input
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {Boolean(invoiceDocUrl) && (
              <a
                href={invoiceDocUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-amber-800 hover:text-amber-900 bg-amber-100 rounded-lg cursor-pointer transition-colors"
                title="Lihat Pratinjau Dokumen">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* 4. Rincian Biaya & Tagihan Otomatis (Read-Only) */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
          {/* A. Tagihan Jasa Kena Pajak */}
          <div className="space-y-1.5 pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
              1. Rincian Tagihan Jasa (Objek PPN 11%)
            </span>

            {isPbm && (
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

            {isRkbm && (
              <div className="flex justify-between text-slate-600 pl-2">
                <span>• Fee Dokumen RKBM ({order.rkbmType || "Muat"}):</span>
                <span className="font-mono font-medium">
                  {formatRupiah(rkbmFee)}
                </span>
              </div>
            )}

            {isCustoms && (
              <>
                <div className="flex justify-between text-slate-600 pl-2">
                  <span>• Jasa Pengawasan Kepabeanan:</span>
                  <span className="font-mono font-medium">
                    {formatRupiah(kepabeananFee)}
                  </span>
                </div>
                {Boolean(cooFee) && (
                  <div className="flex justify-between text-slate-600 pl-2">
                    <span>• Fee Penerbitan COO:</span>
                    <span className="font-mono font-medium">
                      {formatRupiah(cooFee)}
                    </span>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-between text-slate-800 font-semibold pt-1 border-t border-dashed border-slate-200">
              <span>Subtotal Tagihan Jasa (DPP):</span>
              <span className="font-mono">{formatRupiah(subtotalJasa)}</span>
            </div>

            <div className="flex justify-between text-slate-600 pl-2">
              <span>PPN 11% (Otomatis):</span>
              <span className="font-mono font-medium text-emerald-700">
                +{formatRupiah(ppn)}
              </span>
            </div>
          </div>

          {/* B. Reimbursement PNBP */}
          <div className="space-y-1.5 pb-2 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 block text-[11px] uppercase tracking-wider">
                2. Reimbursement PNBP (Non PPN)
              </span>
              {isPnbpGratis && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  GRATIS (Kontrak Khusus)
                </span>
              )}
            </div>

            {isPnbpGratis ? (
              <div className="text-slate-500 italic pl-2 text-[11px]">
                PNBP Jasa Barang & Pengawasan dibebaskan (Rp 0).
              </div>
            ) : (
              <>
                <div className="flex justify-between text-slate-600 pl-2">
                  <span>
                    • PNBP Barang ({order.activityType || "Domestik"} @ Rp{" "}
                    {pnbpCalc.rateBarang}/MT):
                  </span>
                  <span className="font-mono font-medium text-blue-700">
                    {formatRupiah(pnbpCalc.pnbpBarang)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 pl-2">
                  <span>• PNBP Pengawasan (@ Rp 54/MT):</span>
                  <span className="font-mono font-medium text-blue-700">
                    {formatRupiah(pnbpCalc.pnbpPengawasan)}
                  </span>
                </div>
              </>
            )}

            <div className="flex justify-between text-blue-900 font-semibold pt-1 border-t border-dashed border-blue-200">
              <span>Total PNBP:</span>
              <span className="font-mono">{formatRupiah(totalPnbp)}</span>
            </div>
          </div>

          {/* C. Total Keseluruhan */}
          <div className="flex justify-between items-center pt-1 text-sm font-black text-slate-900">
            <span>TOTAL TAGIHAN:</span>
            <span className="font-mono text-base text-red-600 font-bold">
              {formatRupiah(grandTotal)}
            </span>
          </div>
        </div>

        {/* 5. Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary" type="submit" leftIcon={Upload}>
            Upload Invoice
          </Button>
        </div>
      </form>
    </Modal>
  );
};
