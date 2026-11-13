import {
  Receipt,
  CheckCircle2,
  Printer,
  Calendar,
  Ship,
  Boxes,
  AlertCircle,
  Send,
  Inbox,
  Pencil,
  Check,
  Upload,
} from "lucide-react";
import {
  Button,
  Badge,
  TableCard,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  EmptyState,
} from "@/components/ui";
import { formatRupiah } from "@/utils/formatters";
import type { BillingTableProps } from "@/types";

export const BillingTable = ({
  orders,
  onSelectForInvoice,
  onSelectForPrint,
  onSelectForPay,
  onMarkAsReceived,
}: BillingTableProps) => {
  return (
    <TableCard>
      <Table>
        <THead>
          <tr>
            <TH>Order ID & Selesai</TH>
            <TH>Customer</TH>
            <TH>Kapal & Tongkang</TH>
            <TH>Final DSR (MT)</TH>
            <TH>No. Invoice</TH>
            <TH>Total Tagihan</TH>
            <TH>Status Invoice</TH>
            <TH className="text-center">Aksi Tagihan</TH>
          </tr>
        </THead>
        <TBody>
          {orders.length === 0 ? (
            <EmptyState
              message="Tidak ada data tagihan yang sesuai filter."
              icon={Receipt}
              colSpan={8}
            />
          ) : (
            orders.map((order) => {
              const hasInvoice = Boolean(order.invoiceNo);
              const isPaid = order.status === "Lunas";
              const isReceived = order.status === "Diterima";
              const isSent =
                order.status === "Terkirim" ||
                order.status === "Menunggu Pembayaran";

              return (
                <TR key={order.id}>
                  {/* Order & Tgl Selesai */}
                  <TD>
                    <span className="font-mono font-bold text-slate-900 block">
                      {order.id}
                    </span>
                    <span className="text-[10.5px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {order.vesselCompleteDate
                          ? `Selesai: ${order.vesselCompleteDate}`
                          : `Mulai: ${order.startDate}`}
                      </span>
                    </span>
                  </TD>

                  {/* Customer & Layanan */}
                  <TD>
                    <div className="mb-1">
                      {order.service === "Jasa PBM" ? (
                        <Badge variant="success" size="sm" dot>
                          Jasa PBM
                        </Badge>
                      ) : order.service === "Pengurusan RKBM" ? (
                        <Badge variant="warning" size="sm" dot>
                          Pengurusan RKBM
                        </Badge>
                      ) : (
                        <Badge variant="purple" size="sm" dot>
                          {order.service || "Kepabeanan & COO"}
                        </Badge>
                      )}
                    </div>
                    <div className="font-semibold text-slate-800">
                      {order.customer}
                    </div>
                    {order.customerPic && (
                      <div className="text-[10.5px] text-slate-400 font-mono">
                        PIC: {order.customerPic}
                      </div>
                    )}
                  </TD>

                  {/* Kapal & Tongkang */}
                  <TD>
                    <div className="font-medium text-slate-800 flex items-center gap-1">
                      <Ship className="w-3.5 h-3.5 text-slate-400" />
                      <span>{order.vessel || "-"}</span>
                    </div>
                    <div className="text-[10.5px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Boxes className="w-3 h-3" />
                      <span className="truncate max-w-[180px]">
                        {order.bargeNomination || "-"}
                      </span>
                    </div>
                  </TD>

                  {/* Final DSR (MT) */}
                  <TD className="font-mono">
                    {order.finalDsr ? (
                      <span className="font-bold text-slate-800">
                        {order.finalDsr.toLocaleString("id-ID")} MT
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">
                        Est: {order.estimatedTonnage?.toLocaleString("id-ID")}{" "}
                        MT
                      </span>
                    )}
                  </TD>

                  {/* No. Invoice */}
                  <TD className="font-mono">
                    {hasInvoice ? (
                      <Badge variant="info">{order.invoiceNo}</Badge>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">
                        Belum Terbit
                      </span>
                    )}
                  </TD>

                  {/* Total Tagihan */}
                  <TD className="font-mono">
                    {order.totalInvoice ? (
                      <div>
                        <span className="font-bold text-slate-900 block">
                          {formatRupiah(order.totalInvoice)}
                        </span>
                        {Boolean(order.totalPnbpReimbursement) && (
                          <span className="text-[10px] text-emerald-600 block">
                            Inc. PNBP{" "}
                            {formatRupiah(order.totalPnbpReimbursement)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">-</span>
                    )}
                  </TD>

                  {/* Status Badge */}
                  <TD>
                    {isPaid ? (
                      <Badge variant="success" icon={CheckCircle2}>
                        Lunas
                      </Badge>
                    ) : isReceived ? (
                      <Badge variant="purple" icon={Inbox}>
                        Diterima Customer
                      </Badge>
                    ) : isSent ? (
                      <Badge variant="info" icon={Send}>
                        Terkirim (Accurate)
                      </Badge>
                    ) : (
                      <Badge variant="warning" icon={AlertCircle}>
                        Siap Ditagihkan
                      </Badge>
                    )}
                  </TD>

                  {/* Aksi Tagihan */}
                  <TD className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Tombol Buat / Edit Invoice */}
                      {!isPaid && (
                        <Button
                          size="sm"
                          variant={hasInvoice ? "secondary" : "primary"}
                          leftIcon={hasInvoice ? Pencil : Upload}
                          onClick={() => onSelectForInvoice(order)}
                          title={
                            hasInvoice
                              ? "Edit Data Invoice"
                              : "Upload Dokumen Invoice"
                          }>
                          {hasInvoice ? "Edit Invoice" : "Upload Invoice"}
                        </Button>
                      )}

                      {/* Tombol Tandai Diterima */}
                      {isSent && (
                        <Button
                          size="sm"
                          variant="primary"
                          leftIcon={Check}
                          onClick={() => onMarkAsReceived(order.id)}
                          title="Tandai Invoice Diterima Customer">
                          Diterima
                        </Button>
                      )}

                      {/* Tombol Konfirmasi Lunas */}
                      {hasInvoice && !isPaid && (
                        <Button
                          size="sm"
                          variant="success"
                          leftIcon={CheckCircle2}
                          onClick={() => onSelectForPay(order)}
                          title="Tandai Sudah Dibayar (Lunas)">
                          Lunas
                        </Button>
                      )}

                      {/* Tombol Cetak Slip Faktur */}
                      {hasInvoice && (
                        <button
                          type="button"
                          onClick={() => onSelectForPrint(order)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                          title="Cetak Faktur Tagihan">
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </TD>
                </TR>
              );
            })
          )}
        </TBody>
      </Table>
    </TableCard>
  );
};
