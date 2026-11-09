import { Ship, CheckCircle2, Pencil, Send, Eye, Trash2 } from "lucide-react";
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
import type { JobTableProps } from "@/types";

export const JobTable = ({
  orders,
  onSendToOperational,
  onEdit,
  onDelete,
}: JobTableProps) => {
  return (
    <TableCard>
      <Table>
        <THead>
          <tr>
            <TH>No. Job & RKBM</TH>
            <TH>Mother Vessel</TH>
            <TH>Customer / End User</TH>
            <TH>Layanan & Rute</TH>
            <TH>Tonase (DSR)</TH>
            <TH>Status</TH>
            <TH className="text-center">Aksi</TH>
          </tr>
        </THead>
        <TBody>
          {orders.length === 0 ? (
            <EmptyState
              message="Tidak ada order yang cocok dengan pencarian Anda."
              icon={Ship}
              colSpan={7}
            />
          ) : (
            orders.map((order) => {
              const isDraft = order.status === "Draft Sales";

              return (
                <TR key={order.id}>
                  {/* No. Job & RKBM */}
                  <TD>
                    <span className="font-mono font-bold text-red-600 block">
                      {order.id}
                    </span>
                    <span className="font-bold text-slate-900 block text-xs mt-0.5">
                      {order.bargeNomination}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                      {order.rkbmNo !== "-" ? (
                        `RKBM: ${order.rkbmNo}`
                      ) : (
                        <span className="text-amber-600 font-medium italic">
                          RKBM: Menunggu Verifikasi
                        </span>
                      )}
                    </span>
                  </TD>

                  {/* Mother Vessel */}
                  <TD>
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <Ship className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{order.vessel}</span>
                    </div>
                  </TD>

                  {/* Customer & End User */}
                  <TD>
                    <span className="text-slate-900 font-bold block">
                      {order.customer}
                    </span>
                    <span className="text-[10.5px] text-slate-400 block mt-0.5">
                      End User: {order.endUser}
                    </span>
                  </TD>

                  {/* Layanan & Rute */}
                  <TD>
                    <Badge variant="neutral" size="sm">
                      {order.service}
                    </Badge>
                    <span className="text-[10.5px] text-slate-500 block mt-1">
                      {order.dropPoint} ({order.activityType})
                    </span>
                  </TD>

                  {/* Tonase */}
                  <TD className="font-mono">
                    <span className="font-bold text-slate-900 block">
                      {order.finalDsr
                        ? `${order.finalDsr.toLocaleString("id-ID")} MT`
                        : "-"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Rencana: {order.estimatedTonnage.toLocaleString("id-ID")}{" "}
                      MT
                    </span>
                  </TD>

                  {/* Status */}
                  <TD>
                    {isDraft ? (
                      <Button
                        size="sm"
                        variant="primary"
                        leftIcon={Send}
                        onClick={() => onSendToOperational(order.id)}
                        title="Kirim ke Operasional Lapangan">
                        Kirim ke Ops
                      </Button>
                    ) : (
                      <Badge variant="info" icon={CheckCircle2}>
                        {order.status}
                      </Badge>
                    )}
                  </TD>

                  {/* Kolom Aksi */}
                  <TD className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {isDraft ? (
                        <>
                          <button
                            type="button"
                            onClick={() => onEdit(order.id)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Draft Order">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(order.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus Draft Order">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onEdit(order.id)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Lihat Detail & Dokumen">
                          <Eye className="w-3.5 h-3.5" />
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
