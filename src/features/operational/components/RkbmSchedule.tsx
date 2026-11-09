import { MapPin, Calendar, Scale, Activity } from "lucide-react";
import { Input, Select } from "@/components/ui";
import type { RkbmScheduleSectionProps } from "@/types";

export const RkbmScheduleSection = ({
  order,
  showMuat,
  showBongkar,
  position,
  onPositionChange,
  positionOptions,
  etaPol,
  onEtaPolChange,
  etaPod,
  onEtaPodChange,
  loadingStartDate,
  onLoadingStartDateChange,
  loadingEndDate,
  onLoadingEndDateChange,
  dischargeStartDate,
  onDischargeStartDateChange,
  dischargeEndDate,
  onDischargeEndDateChange,
  finalDsr,
  onFinalDsrChange,
  operationalNotes,
  onOperationalNotesChange,
}: RkbmScheduleSectionProps) => {
  const isPbm = order.service === "Jasa PBM";
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
      <div className="border-l-4 border-blue-600 px-4 py-2.5 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            2.{" "}
            {isPbm
              ? "Jadwal Muat & DSR (PBM)"
              : "Posisi Armada & Jadwal Kegiatan"}
          </h4>
        </div>
        <span className="text-[10.5px] text-blue-700 font-semibold">
          {isPbm
            ? `Lokasi Kerja: ${order.pol}`
            : "Wajib update posisi tiap hari"}
        </span>
      </div>
      <div className="p-4 space-y-4 border-t border-slate-100">
        <div
          className={`grid grid-cols-1 ${isPbm ? "sm:grid-cols-2" : "sm:grid-cols-3"} gap-3`}>
          {/* Posisi Terkini HANYA tampil jika BUKAN Jasa PBM */}
          {!isPbm && (
            <Select
              label="Posisi Terkini Armada (Master Data)"
              startIcon={MapPin}
              value={position}
              onChange={(e) => onPositionChange(e.target.value)}
              options={positionOptions}
            />
          )}
          <Input
            type="date"
            label="ETA POL (Loading)"
            startIcon={Calendar}
            value={etaPol}
            onChange={(e) => onEtaPolChange(e.target.value)}
          />
          <Input
            type="date"
            label="ETA POD (Discharge)"
            startIcon={Calendar}
            value={etaPod}
            onChange={(e) => onEtaPodChange(e.target.value)}
          />
        </div>
        {/* Siklus Muat & Siklus Bongkar (Adaptif) */}
        <div
          className={`grid gap-3 ${
            showMuat && showBongkar
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1"
          }`}>
          {showMuat && (
            <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2.5">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kegiatan Muat (POL: {order.pol})</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  label="Mulai Muat"
                  value={loadingStartDate}
                  onChange={(e) => onLoadingStartDateChange(e.target.value)}
                />
                <Input
                  type="date"
                  label="Selesai Muat"
                  value={loadingEndDate}
                  onChange={(e) => onLoadingEndDateChange(e.target.value)}
                />
              </div>
            </div>
          )}

          {showBongkar && (
            <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-2.5">
              <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                <span>Kegiatan Bongkar (POD: {order.pod})</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  label="Mulai Bongkar"
                  value={dischargeStartDate}
                  onChange={(e) => onDischargeStartDateChange(e.target.value)}
                />
                <Input
                  type="date"
                  label="Selesai Bongkar"
                  value={dischargeEndDate}
                  onChange={(e) => onDischargeEndDateChange(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Realisasi DSR & Status Lapangan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Realisasi DSR Sucofindo (MT)"
            startIcon={Scale}
            placeholder="Contoh: 7500.65"
            value={finalDsr}
            onChange={(e) => onFinalDsrChange(e.target.value)}
            className="font-mono font-bold"
          />
          <div className="sm:col-span-2">
            <Input
              label="Keterangan Status Lapangan (KET)"
              startIcon={Activity}
              placeholder="Contoh: Menunggu antrean jetty / Sandar / Selesai muat"
              value={operationalNotes}
              onChange={(e) => onOperationalNotesChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
