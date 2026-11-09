import { Pencil, Trash2, CheckCircle2, DollarSign } from "lucide-react";
import {
  TableCard,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  EmptyState,
  Badge,
} from "@/components/ui";
import { formatRupiah } from "@/utils/formatters";

import type { ContractRateTableProps } from "../../../types/master/master-data";

export const ContractRateTable = ({
  contracts,
  onEdit,
  onDelete,
}: ContractRateTableProps) => {
  return (
    <TableCard>
      <Table>
        <THead>
          <tr>
            <TH>ID / Customer</TH>
            <TH>Tarif PBM (MT)</TH>
            <TH>RKBM Bongkar</TH>
            <TH>RKBM Muat (Priv / Pub)</TH>
            <TH>Kepabeanan & COO</TH>
            <TH>Status</TH>
            <TH className="text-right">Aksi</TH>
          </tr>
        </THead>
        <TBody>
          {contracts.length === 0 ? (
            <EmptyState
              message="Tidak ada tarif kontrak yang cocok dengan pencarian."
              icon={DollarSign}
              colSpan={7}
            />
          ) : (
            contracts.map((cr) => (
              <TR key={cr.id || cr.customerId}>
                <TD>
                  <span className="font-bold text-slate-900 block">
                    {cr.customerName}
                  </span>
                  <span className="text-[10.5px] font-mono text-slate-400">
                    {cr.id || cr.customerId}
                    {cr.notes ? ` • ${cr.notes}` : ""}
                  </span>
                </TD>
                <TD className="font-mono font-bold text-slate-800">
                  {cr.pbmRatePerTon !== undefined
                    ? `${formatRupiah(cr.pbmRatePerTon)} / MT`
                    : "-"}
                </TD>
                <TD className="font-mono text-slate-700">
                  {cr.rkbmBongkarFee !== undefined
                    ? formatRupiah(cr.rkbmBongkarFee)
                    : "-"}
                </TD>
                <TD className="font-mono text-[11.5px]">
                  <span className="text-emerald-700 block">
                    Private: {formatRupiah(cr.rkbmMuatPrivateFee || 0)}
                  </span>
                  <span className="text-slate-500 block">
                    Public: {formatRupiah(cr.rkbmMuatPublicFee || 0)}
                  </span>
                </TD>
                <TD className="font-mono text-[11.5px]">
                  {cr.kepabeananFee ? (
                    <span className="text-indigo-700 block">
                      Pabean: {formatRupiah(cr.kepabeananFee)}
                    </span>
                  ) : null}
                  {cr.cooFee ? (
                    <span className="text-amber-700 block">
                      COO: {formatRupiah(cr.cooFee)}
                    </span>
                  ) : null}
                  {!cr.kepabeananFee && !cr.cooFee && "-"}
                </TD>
                <TD>
                  {cr.status !== "Nonaktif" ? (
                    <Badge variant="success" icon={CheckCircle2}>
                      {cr.status || "Aktif"}
                    </Badge>
                  ) : (
                    <Badge variant="neutral">{cr.status || "Nonaktif"}</Badge>
                  )}
                </TD>
                <TD className="text-right space-x-1">
                  <button
                    type="button"
                    onClick={() => onEdit(cr)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Tarif">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(cr.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus Tarif">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </TableCard>
  );
};
