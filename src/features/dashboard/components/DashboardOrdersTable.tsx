import { Ship } from "lucide-react";
import {
  TableCard,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  EmptyState,
  ServiceBadge,
  StatusBadge,
} from "@/components/ui";
import { formatTonnage } from "@/utils/formatters";
import type { OrderItem } from "@/types/jobs/jobTypes";

interface DashboardOrdersTableProps {
  orders: OrderItem[];
}

export const DashboardOrdersTable = ({ orders }: DashboardOrdersTableProps) => {
  return (
    <div className="space-y-3">
      {/* Header Tabel */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-slate-900 text-sm">
            Monitoring Pekerjaan Armada
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Daftar seluruh aktivitas operasional terbaru yang tercatat di sistem
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          Live Sync
        </span>
      </div>

      {/* Reusable TableCard & Table Primitives */}
      <TableCard>
        <Table>
          <THead>
            <TR>
              <TH>Armada / Kapal</TH>
              <TH>Customer</TH>
              <TH>Layanan</TH>
              <TH>Tonase / Final DSR</TH>
              <TH>Rute / Lokasi</TH>
              <TH className="text-center">Status</TH>
            </TR>
          </THead>
          <TBody>
            {orders.length === 0 ? (
              <EmptyState
                colSpan={6}
                message="Belum ada order pekerjaan yang terdaftar."
              />
            ) : (
              orders.slice(0, 8).map((order) => {
                const armadaDisplay =
                  order.bargeNomination ||
                  (order.tugBoat
                    ? `${order.tugBoat}`
                    : order.vessel || "Armada Belum Ditentukan");

                return (
                  <TR key={order.id}>
                    <TD>
                      <div className="flex items-center gap-2">
                        <Ship className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-900">
                          {armadaDisplay}
                        </span>
                      </div>
                      {order.vessel && order.bargeNomination && (
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          Mother Vessel: {order.vessel}
                        </span>
                      )}
                    </TD>
                    <TD className="font-medium text-slate-800">
                      {order.customer}
                    </TD>
                    <TD>
                      {/* Reuse ServiceBadge Langsung dari Components */}
                      <ServiceBadge service={order.service} size="sm" />
                    </TD>
                    <TD className="font-medium text-slate-700">
                      {order.finalDsr
                        ? formatTonnage(order.finalDsr)
                        : order.estimatedTonnage
                          ? formatTonnage(order.estimatedTonnage)
                          : "-"}
                    </TD>
                    <TD className="text-xs text-slate-500">
                      {order.dropPoint ||
                        (order.pol && order.pod
                          ? `${order.pol} → ${order.pod}`
                          : "-")}
                    </TD>
                    <TD className="text-center">
                      {/* Reuse StatusBadge Langsung dari Components */}
                      <StatusBadge status={order.status} size="sm" dot />
                    </TD>
                  </TR>
                );
              })
            )}
          </TBody>
        </Table>
      </TableCard>
    </div>
  );
};
