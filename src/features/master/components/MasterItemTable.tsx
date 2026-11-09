import { Pencil, Trash2, CheckCircle2, Database } from "lucide-react";
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
import type {
  MasterItem,
  MasterResourceKey,
  MasterConfig,
} from "@/types/master/master-data";

interface MasterItemTableProps {
  items: MasterItem[];
  activeTab: MasterResourceKey;
  currentConfig: MasterConfig;
  onEdit: (item: MasterItem) => void;
  onDelete: (id: string) => void;
}

export const MasterItemTable = ({
  items,
  activeTab,
  currentConfig,
  onEdit,
  onDelete,
}: MasterItemTableProps) => {
  return (
    <TableCard>
      <Table>
        <THead>
          <tr>
            <TH>Kode</TH>
            <TH>Nama {currentConfig.label}</TH>
            <TH>{currentConfig.subDetailLabel}</TH>
            <TH>Kontak</TH>
            {activeTab === "customer" && <TH>PIC & Kontak</TH>}
            <TH>Status</TH>
            <TH className="text-right">Aksi</TH>
          </tr>
        </THead>
        <TBody>
          {items.length === 0 ? (
            <EmptyState
              message={`Tidak ada data ${currentConfig.label} yang ditemukan.`}
              icon={Database}
              colSpan={activeTab === "customer" ? 7 : 6}
            />
          ) : (
            items.map((item) => (
              <TR key={item.id}>
                <TD className="font-mono text-slate-500 font-medium">
                  {item.kode}
                </TD>
                <TD className="font-bold text-slate-900">{item.nama}</TD>
                <TD className="text-slate-600">{item.subDetail || "-"}</TD>
                <TD className="text-slate-600">{item.kontak || "-"}</TD>
                {activeTab === "customer" && (
                  <TD className="text-slate-600">{item.picName || "-"}</TD>
                )}
                <TD>
                  {item.status === "Aktif" ? (
                    <Badge variant="success" icon={CheckCircle2}>
                      {item.status}
                    </Badge>
                  ) : (
                    <Badge variant="neutral">{item.status}</Badge>
                  )}
                </TD>
                <TD className="text-right space-x-1">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus">
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
