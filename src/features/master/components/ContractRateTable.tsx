import { useState, useMemo, Fragment } from "react";
import {
  Pencil,
  Trash2,
  CheckCircle2,
  DollarSign,
  MapPin,
  Layers,
  Filter,
} from "lucide-react";
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
import type { CustomerContractRate } from "@/types/finance/financeTypes";
import type { ContractRateTableProps } from "../../../types/master/master-data";

export const ContractRateTable = ({
  contracts,
  onEdit,
  onDelete,
}: ContractRateTableProps) => {
  // State Filter Kategori Layanan & Lokasi
  const [selectedService, setSelectedService] = useState<string>("ALL");
  const [selectedLocation, setSelectedLocation] = useState<string>("ALL");

  // Kelompokkan data per Kategori (Layanan & Lokasi Jetty)
  const groupedContracts = useMemo(() => {
    const filtered = contracts.filter((cr) => {
      const matchService =
        selectedService === "ALL" || cr.service === selectedService;
      const matchLocation =
        selectedLocation === "ALL" || cr.location === selectedLocation;
      return matchService && matchLocation;
    });

    const groups: Record<
      string,
      { service: string; location: string; items: CustomerContractRate[] }
    > = {};

    filtered.forEach((cr) => {
      const srv = cr.service || "LAYANAN PBM";
      const loc = cr.location || "Muara Berau";
      const key = `${srv}__${loc}`;

      if (!groups[key]) {
        groups[key] = {
          service: srv,
          location: loc,
          items: [],
        };
      }
      groups[key].items.push(cr);
    });

    return Object.values(groups);
  }, [contracts, selectedService, selectedLocation]);

  return (
    <div className="space-y-4">
      {/* Bar Filter Kategori Layanan & Lokasi */}
      <div className="p-3 bg-white border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-800">
            Kategori Kontrak:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filter Layanan */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11.5px] text-slate-500">Layanan:</span>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500">
              <option value="ALL">Semua Layanan (4 Layanan)</option>
              <option value="LAYANAN PBM">LAYANAN PBM</option>
              <option value="LAYANAN RKBM MUAT/BONGKAR/MUAT & BONGKAR">
                LAYANAN RKBM MUAT/BONGKAR
              </option>
              <option value="LAYANAN JASA VENDER & MURING">
                LAYANAN JASA VENDER & MURING
              </option>
              <option value="JASA PENGAWASAN KEPABEANAN & COO">
                JASA PENGAWASAN KEPABEANAN & COO
              </option>
            </select>
          </div>

          {/* Filter Lokasi Jetty */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11.5px] text-slate-500">Lokasi:</span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500">
              <option value="ALL">Semua Lokasi Jetty</option>
              <option value="Muara Berau">Muara Berau</option>
              <option value="Muara Jawa">Muara Jawa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabel Utama Berdasarkan Grup Kategori */}
      <TableCard>
        <Table>
          <THead>
            <tr>
              <TH>Customer & ID</TH>
              <TH>Layanan</TH>
              <TH>Lokasi</TH>
              <TH>Tarif Jasa</TH>
              <TH>PNBP Jasa Barang</TH>
              <TH>PNBP Jasa Pengawasan</TH>
              <TH>Status</TH>
              <TH className="text-right">Aksi</TH>
            </tr>
          </THead>
          <TBody>
            {groupedContracts.length === 0 ? (
              <EmptyState
                message="Tidak ada tarif kontrak yang cocok dengan filter kategori."
                icon={DollarSign}
                colSpan={8}
              />
            ) : (
              groupedContracts.map((group) => (
                <Fragment key={`${group.service}-${group.location}`}>
                  {/* Header Grup Kategori Layanan & Lokasi */}
                  <tr className="bg-slate-100/90 border-y border-slate-200">
                    <td colSpan={8} className="px-4 py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-slate-600" />
                          <span className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                            {group.service}
                          </span>
                          <span className="text-slate-400">•</span>
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                            <MapPin className="w-3 h-3 text-red-500" />
                            <span>{group.location}</span>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium font-mono">
                          {group.items.length} Customer
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Baris Customer di dalam Kategori Ini */}
                  {group.items.map((cr) => {
                    const isPbm = cr.service?.includes("PBM");
                    const isRkbm = cr.service?.includes("RKBM");
                    const isCustoms =
                      cr.service?.includes("KEPABEANAN") ||
                      cr.service?.includes("COO");

                    return (
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
                        <TD>
                          <Badge
                            variant={
                              isPbm
                                ? "success"
                                : isRkbm
                                  ? "warning"
                                  : isCustoms
                                    ? "purple"
                                    : "info"
                            }
                            size="sm">
                            {cr.service || "LAYANAN PBM"}
                          </Badge>
                        </TD>
                        <TD>
                          <div className="flex items-center gap-1 text-slate-700 font-medium text-xs">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{cr.location || "Muara Berau"}</span>
                          </div>
                        </TD>
                        <TD className="font-mono text-xs">
                          {isPbm && (
                            <div>
                              {cr.pbmRatePerTon && cr.pbmRatePerTon > 0 ? (
                                <span className="font-bold text-slate-900">
                                  {formatRupiah(cr.pbmRatePerTon)} / MT
                                </span>
                              ) : (
                                <span className="text-amber-600 italic font-sans font-medium">
                                  (Belum diketahui)
                                </span>
                              )}
                            </div>
                          )}
                          {isRkbm && (
                            <div className="space-y-0.5 text-[11px]">
                              <div>
                                Bongkar:{" "}
                                {cr.rkbmBongkarFee
                                  ? formatRupiah(cr.rkbmBongkarFee)
                                  : "(Belum diketahui)"}
                              </div>
                              <div>
                                Muat:{" "}
                                {cr.rkbmMuatPublicFee
                                  ? formatRupiah(cr.rkbmMuatPublicFee)
                                  : "(Belum diketahui)"}
                              </div>
                            </div>
                          )}
                          {isCustoms && (
                            <div className="space-y-0.5 text-[11px]">
                              <div>
                                Pabean:{" "}
                                {cr.kepabeananFee
                                  ? formatRupiah(cr.kepabeananFee)
                                  : "-"}
                              </div>
                              <div>
                                COO: {cr.cooFee ? formatRupiah(cr.cooFee) : "-"}
                              </div>
                            </div>
                          )}
                          {!isPbm && !isRkbm && !isCustoms && (
                            <span className="text-slate-400">-</span>
                          )}
                        </TD>

                        {/* PNBP Jasa Barang */}
                        <TD>
                          {cr.pnbpBarangType === "Gratis" ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800">
                              GRATIS
                            </span>
                          ) : cr.pnbpBarangType === "Standar" ? (
                            <span className="text-slate-700 text-xs font-medium">
                              Standar Kas Negara
                            </span>
                          ) : cr.pnbpBarangType === "Nominal" &&
                            cr.pnbpBarangAmount ? (
                            <span className="font-mono text-xs font-bold text-slate-800">
                              {formatRupiah(cr.pnbpBarangAmount)}
                            </span>
                          ) : (
                            <span className="text-amber-600 italic text-[11px] font-medium">
                              (Belum diketahui)
                            </span>
                          )}
                        </TD>

                        {/* PNBP Jasa Pengawasan */}
                        <TD>
                          {cr.pnbpPengawasanType === "Gratis" ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800">
                              GRATIS
                            </span>
                          ) : cr.pnbpPengawasanType === "Standar" ? (
                            <span className="text-slate-700 text-xs font-medium">
                              Standar (@ Rp 54/MT)
                            </span>
                          ) : cr.pnbpPengawasanType === "Nominal" &&
                            cr.pnbpPengawasanAmount ? (
                            <span className="font-mono text-xs font-bold text-slate-800">
                              {formatRupiah(cr.pnbpPengawasanAmount)}
                            </span>
                          ) : (
                            <span className="text-amber-600 italic text-[11px] font-medium">
                              (Belum diketahui)
                            </span>
                          )}
                        </TD>

                        <TD>
                          {cr.status !== "Nonaktif" ? (
                            <Badge variant="success" icon={CheckCircle2}>
                              {cr.status || "Aktif"}
                            </Badge>
                          ) : (
                            <Badge variant="neutral">
                              {cr.status || "Nonaktif"}
                            </Badge>
                          )}
                        </TD>
                        <TD className="text-right space-x-1">
                          <button
                            type="button"
                            onClick={() => onEdit(cr)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Tarif">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(cr.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus Tarif">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </TD>
                      </TR>
                    );
                  })}
                </Fragment>
              ))
            )}
          </TBody>
        </Table>
      </TableCard>
    </div>
  );
};
