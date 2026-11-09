import { Printer, FileText } from "lucide-react";
import {
  Modal,
  TableCard,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Button,
} from "@/components/ui";
import { formatRupiah, angkaTerbilang } from "@/utils/formatters";
import type { InvoiceSlipModalProps } from "@/types";

export const InvoiceSlipModal = ({ order, onClose }: InvoiceSlipModalProps) => {
  const tonase = order.finalDsr || order.estimatedTonnage || 0;
  const rate = order.ratePerTon || 250;
  const jasaPbm = Math.round(tonase * rate);
  const rkbmFee = order.rkbmFee || 0;
  const subtotalJasa = order.subtotalJasa || jasaPbm + rkbmFee;
  const ppn =
    order.ppnAmount !== undefined
      ? order.ppnAmount
      : Math.round(subtotalJasa * 0.11);
  const totalPnbp = order.totalPnbpReimbursement || 0;
  const grandTotal = order.totalInvoice || subtotalJasa + ppn + totalPnbp;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      icon={FileText}
      title="Faktur Tagihan Resmi (Invoice Slip)"
      maxWidth="3xl">
      <div className="p-6 space-y-6">
        {/* Tombol Cetak */}
        <div className="flex justify-end gap-2 pb-2 border-b border-slate-100">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={Printer}
            onClick={() => window.print()}>
            Cetak / Print
          </Button>
        </div>

        {/* Lembar Invoice Resmi (Printable Area) */}
        <div
          className="space-y-6 text-slate-800 bg-white"
          id="printable-invoice">
          {/* Kop Surat Perusahaan */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <h2 className="text-lg font-black tracking-wider text-slate-900">
                PT ANTARA MULTI PERKASA
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                PERUSAHAAN BONGKAR MUAT (PBM) & LOGISTIK MARITIM
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Kawasan Muara Berau / Samarinda, Kalimantan Timur
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-slate-900 tracking-tight block">
                PROFORMA INVOICE
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold block mt-0.5">
                {order.invoiceNo || "DRAFT-INVOICE"}
              </span>
            </div>
          </div>

          {/* Info Customer & Tanggal */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">
                Ditujukan Kepada:
              </span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {order.customer}
              </p>
              {order.customerPic && (
                <p className="text-slate-600 mt-0.5">
                  Attn: {order.customerPic}
                </p>
              )}
              <p className="text-slate-500 font-mono mt-0.5">
                Layanan: {order.service}
              </p>
            </div>

            <div className="space-y-1 text-right">
              <div className="flex justify-between sm:justify-end gap-3">
                <span className="text-slate-500">Tanggal Faktur:</span>
                <span className="font-medium">
                  {order.invoiceDate || order.startDate}
                </span>
              </div>
              <div className="flex justify-between sm:justify-end gap-3">
                <span className="text-slate-500">Jatuh Tempo:</span>
                <span className="font-medium text-red-600">
                  {order.dueDate || "-"}
                </span>
              </div>
              <div className="flex justify-between sm:justify-end gap-3">
                <span className="text-slate-500">No. RKBM:</span>
                <span className="font-mono font-medium">
                  {order.rkbmNo || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Rincian Kargo Kapal */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs grid grid-cols-3 gap-3">
            <div>
              <span className="text-slate-400 block text-[10.5px]">
                Mother Vessel:
              </span>
              <span className="font-bold text-slate-800">
                {order.vessel || "-"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10.5px]">
                Armada Tongkang:
              </span>
              <span className="font-medium text-slate-800">
                {order.bargeNomination || "-"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10.5px]">
                Pelabuhan:
              </span>
              <span className="font-medium text-slate-800">
                {order.pol} → {order.pod}
              </span>
            </div>
          </div>

          {/* Tabel Perhitungan Tagihan */}
          <TableCard className="rounded-lg shadow-none">
            <table className="w-full text-xs text-left">
              <THead>
                <tr>
                  <TH className="py-2 px-3">Deskripsi Pekerjaan / Layanan</TH>
                  <TH className="py-2 px-3 text-right">Volume</TH>
                  <TH className="py-2 px-3 text-right">Tarif Satuan</TH>
                  <TH className="py-2 px-3 text-right">Jumlah (Rp)</TH>
                </tr>
              </THead>
              <TBody className="divide-y divide-slate-100 font-mono">
                <TR className="hover:bg-transparent">
                  <TD className="py-2.5 px-3 font-sans">
                    Jasa Bongkar Muat Batubara (PBM) - DSR Sucofindo
                  </TD>
                  <TD className="py-2.5 px-3 text-right">
                    {tonase.toLocaleString("id-ID")} MT
                  </TD>
                  <TD className="py-2.5 px-3 text-right">
                    {formatRupiah(rate)}
                  </TD>
                  <TD className="py-2.5 px-3 text-right font-semibold">
                    {formatRupiah(jasaPbm)}
                  </TD>
                </TR>

                {Boolean(order.rkbmFee) && (
                  <TR className="hover:bg-transparent">
                    <TD className="py-2.5 px-3 font-sans">
                      Fee Pengurusan Dokumen RKBM{" "}
                      {order.rkbmType ? `(${order.rkbmType})` : ""}
                    </TD>
                    <TD className="py-2.5 px-3 text-right">
                      {order.rkbmType === "Muat & Bongkar" ? "2 Dok" : "1 Dok"}
                    </TD>
                    <TD className="py-2.5 px-3 text-right">
                      {order.rkbmType === "Muat & Bongkar"
                        ? formatRupiah(Math.round((order.rkbmFee || 0) / 2))
                        : formatRupiah(order.rkbmFee)}
                    </TD>
                    <TD className="py-2.5 px-3 text-right font-semibold">
                      {formatRupiah(order.rkbmFee)}
                    </TD>
                  </TR>
                )}

                {Boolean(order.pnbpBarangAmount) && (
                  <TR className="text-slate-600 hover:bg-transparent">
                    <TD className="py-2 px-3 font-sans italic">
                      Reimbursement: PNBP Barang ({order.activityType})
                    </TD>
                    <TD className="py-2.5 px-3 text-right">
                      {tonase.toLocaleString("id-ID")} MT
                    </TD>
                    <TD className="py-2.5 px-3 text-right">-</TD>
                    <TD className="py-2.5 px-3 text-right">
                      {formatRupiah(order.pnbpBarangAmount)}
                    </TD>
                  </TR>
                )}

                {Boolean(order.pnbpPengawasanAmount) && (
                  <TR className="text-slate-600 hover:bg-transparent">
                    <TD className="py-2 px-3 font-sans italic">
                      Reimbursement: PNBP Pengawasan Bongkar Muat (@ Rp 54/MT)
                    </TD>
                    <TD className="py-2 px-3 text-right">
                      {tonase.toLocaleString("id-ID")} MT
                    </TD>
                    <TD className="py-2 px-3 text-right">-</TD>
                    <TD className="py-2 px-3 text-right">
                      {formatRupiah(order.pnbpPengawasanAmount)}
                    </TD>
                  </TR>
                )}

                {/* Baris Jasa Kepabeanan */}
                {Boolean(order.kepabeananFee) && (
                  <TR className="hover:bg-transparent">
                    <TD className="py-2.5 px-3 font-sans">
                      Jasa Pengurusan Dokumen Kepabeanan (Customs Clearance)
                    </TD>
                    <TD className="py-2.5 px-3 text-right">1 Dokumen</TD>
                    <TD className="py-2.5 px-3 text-right">
                      {formatRupiah(order.kepabeananFee)}
                    </TD>
                    <TD className="py-2.5 px-3 text-right font-semibold">
                      {formatRupiah(order.kepabeananFee)}
                    </TD>
                  </TR>
                )}

                {/* Baris Jasa COO */}
                {Boolean(order.cooFee) && (
                  <TR className="hover:bg-transparent">
                    <TD className="py-2.5 px-3 font-sans">
                      Jasa Pengurusan Certificate of Origin (COO / SKA)
                    </TD>
                    <TD className="py-2.5 px-3 text-right">1 Dokumen</TD>
                    <TD className="py-2.5 px-3 text-right">
                      {formatRupiah(order.cooFee)}
                    </TD>
                    <TD className="py-2.5 px-3 text-right font-semibold">
                      {formatRupiah(order.cooFee)}
                    </TD>
                  </TR>
                )}
              </TBody>
            </table>
          </TableCard>

          {/* Rekap Total & Terbilang */}
          <div className="space-y-3">
            <div className="flex justify-end">
              {/* Di kotak rekap total bawah InvoiceSlipModal.tsx */}
              <div className="w-80 space-y-2 text-xs font-mono">
                <div className="p-2 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal Jasa:</span>
                    <span>{formatRupiah(subtotalJasa)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>PPN 11%:</span>
                    <span>{formatRupiah(ppn)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-800 pt-1 border-t border-slate-200">
                    <span>Total Jasa & Pajak:</span>
                    <span>{formatRupiah(subtotalJasa + ppn)}</span>
                  </div>
                </div>

                <div className="p-2 bg-blue-50/60 rounded border border-blue-200 space-y-1 text-blue-900">
                  <div className="flex justify-between text-slate-600">
                    <span>PNBP Barang:</span>
                    <span>{formatRupiah(order.pnbpBarangAmount || 0)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>PNBP Pengawasan:</span>
                    <span>{formatRupiah(order.pnbpPengawasanAmount || 0)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-1 border-t border-blue-200">
                    <span>Total Reimbursement:</span>
                    <span>{formatRupiah(totalPnbp)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm font-black text-slate-900 pt-1.5 border-t-2 border-slate-900">
                  <span>Grand Total Faktur:</span>
                  <span className="text-emerald-700">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Terbilang */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs italic">
              <span className="text-slate-500 not-italic font-bold block mb-0.5">
                Terbilang:
              </span>
              <span className="text-slate-700 font-medium capitalize">
                # {angkaTerbilang(grandTotal)} Rupiah #
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
