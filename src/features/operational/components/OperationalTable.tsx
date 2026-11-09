import {
  Ship,
  FileCheck2,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Eye,
  Boxes,
  ArrowRight,
  Compass,
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
import type { OperationalTableProps, OrderItem } from "@/types";

export const OperationalTable = ({
  orders,
  onUpdateOps,
  onCompleteLoading,
  onViewDetail,
}: OperationalTableProps) => {
  return (
    <TableCard>
      <Table>
        <THead>
          <tr>
            <TH>Order ID & Jadwal</TH>
            <TH>Mother Vessel</TH>
            <TH>Tug Boat / Barge</TH>
            <TH>Customer & Rute</TH>
            <TH>No. RKBM KSOP</TH>
            <TH>Tonase (MT)</TH>
            <TH>Dokumen Ops</TH>
            <TH>Status</TH>
            <TH className="text-center">Aksi Operasional</TH>
          </tr>
        </THead>
        <TBody>
          {orders.length === 0 ? (
            <EmptyState
              message="Tidak ada data order operasional pada tab ini."
              icon={Ship}
              colSpan={9}
            />
          ) : (
            orders.map((order: OrderItem) => {
              const hasRkbm = order.rkbmNo && order.rkbmNo !== "-";
              const isFinished = Boolean(order.vesselCompleteDate);
              const isBongkarOnly = order.rkbmType === "Bongkar";

              return (
                <TR key={order.id}>
                  {/* Order ID & Jadwal */}
                  <TD>
                    <span className="font-mono font-bold text-slate-900 block">
                      {order.id}
                    </span>
                    <div className="text-[11px] text-slate-400 space-y-0.5 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>
                          Mulai:{" "}
                          {isBongkarOnly
                            ? order.dischargeStartDate || order.startDate
                            : order.loadingStartDate || order.startDate}
                        </span>
                      </span>
                      {order.vesselCompleteDate && (
                        <span className="flex items-center gap-1 text-emerald-600 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>Selesai: {order.vesselCompleteDate}</span>
                        </span>
                      )}
                    </div>
                  </TD>

                  {/* Mother Vessel */}
                  <TD>
                    <div className="font-semibold text-slate-800">
                      {order.vessel}
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-semibold text-[11px] mt-0.5">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span>{order.position || "Belum Update"}</span>
                    </span>
                  </TD>

                  {/* Tug Boat / Barge */}
                  <TD>
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Boxes className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{order.bargeNomination || "-"}</span>
                    </div>
                  </TD>

                  {/* Customer & Rute */}
                  <TD>
                    <div className="font-bold text-slate-900">
                      {order.customer}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <span>{order.pol}</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                      <span>{order.pod}</span>
                    </div>
                  </TD>

                  {/* No. RKBM */}
                  <TD>
                    <div className="mb-2">
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
                    {hasRkbm ? (
                      <Badge variant="success" icon={FileCheck2}>
                        {order.rkbmNo}
                      </Badge>
                    ) : (
                      <Badge variant="warning" icon={Clock}>
                        Menunggu Izin
                      </Badge>
                    )}
                  </TD>

                  {/* Tonase */}
                  <TD className="font-mono">
                    {order.finalDsr ? (
                      <div>
                        <span className="font-bold text-emerald-700 block">
                          {order.finalDsr.toLocaleString("id-ID")} MT
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Est: {order.estimatedTonnage?.toLocaleString("id-ID")}{" "}
                          MT
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-600">
                        {order.estimatedTonnage?.toLocaleString("id-ID")} MT
                      </span>
                    )}
                  </TD>

                  {/* Checklist Dokumen Operasional */}
                  <TD>
                    <div className="flex items-center gap-1">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          order.hasSkab
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-400"
                        }`}
                        title="SKAB">
                        SKAB
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          order.hasSkb
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-400"
                        }`}
                        title="SKB">
                        SKB
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          order.hasRoyalty
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-400"
                        }`}
                        title="Royalty">
                        RYL
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          order.hasLhv
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-400"
                        }`}
                        title="LHV">
                        LHV
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          order.hasBo
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-400"
                        }`}
                        title="Bunker Order">
                        BO
                      </span>
                    </div>
                  </TD>

                  {/* Status Badge */}
                  <TD>
                    <Badge
                      variant={
                        isFinished ? "success" : hasRkbm ? "info" : "warning"
                      }
                      dot>
                      {isFinished
                        ? isBongkarOnly
                          ? "Selesai Bongkar"
                          : "Selesai Muat"
                        : hasRkbm
                          ? isBongkarOnly
                            ? "Proses Bongkar"
                            : "Proses Muat"
                          : "Operational"}
                    </Badge>
                  </TD>

                  {/* Aksi Operasional */}
                  <TD className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Button
                        size="sm"
                        variant="secondary"
                        leftIcon={Compass}
                        onClick={() => onUpdateOps(order)}
                        title="Update Operasional & Plotting Armada">
                        Update Ops
                      </Button>

                      {hasRkbm && !isFinished && (
                        <Button
                          size="sm"
                          variant="success"
                          leftIcon={CheckCircle2}
                          onClick={() => onCompleteLoading(order)}
                          title={`Konfirmasi Selesai ${isBongkarOnly ? "Bongkar" : "Muat"} & Realisasi Tonase DSR`}>
                          {isBongkarOnly ? "Selesai Bongkar" : "Selesai Muat"}
                        </Button>
                      )}

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        leftIcon={Eye}
                        onClick={() => onViewDetail(order.id)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg"
                        title="Lihat Berkas & Detail Order"
                      />
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
