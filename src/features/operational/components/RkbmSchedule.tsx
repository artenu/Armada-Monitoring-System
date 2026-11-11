import { MapPin, Calendar, Scale, Activity, Clock } from "lucide-react";
import { Input, Select } from "@/components/forms";
import type { RkbmScheduleSectionProps } from "@/types";

export const RkbmScheduleSection = ({
  order,
  position,
  onPositionChange,
  positionOptions,
  positionUpdatedAt = "",
  onPositionUpdatedAtChange,
  commencedDate = "",
  onCommencedDateChange,
  completedDate = "",
  onCompletedDateChange,
  etaPol,
  onEtaPolChange,
  etaPod,
  onEtaPodChange,
  finalDsr,
  onFinalDsrChange,
  operationalNotes,
  onOperationalNotesChange,
}: RkbmScheduleSectionProps) => {
  const isRkbm = order.service === "Pengurusan RKBM";
  const isPbm = order.service === "Jasa PBM";
  const isCustoms = order.service === "Pengurusan Kepabeanan dan COO";

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
      <div className="border-l-4 border-blue-600 px-4 py-2.5 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            2.{" "}
            {isRkbm
              ? "Posisi Armada (Datetime) & ETA"
              : isPbm
                ? "Jadwal Commenced & Completed (PBM)"
                : "Jadwal Commenced & Completed (Kepabeanan)"}
          </h4>
        </div>
        <span className="text-[10.5px] text-blue-700 font-semibold">
          {isRkbm
            ? "Update posisi & jam tiap pergerakan"
            : `Lokasi Kerja: ${order.pol}`}
        </span>
      </div>

      <div className="p-4 space-y-4 border-t border-slate-100">
        {/* Posisi Terkini & Waktu (Datetime) Khusus RKBM / Non-PBM */}
        {isRkbm && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Select
              label="Posisi Terkini Armada"
              startIcon={MapPin}
              value={position}
              onChange={(e) => onPositionChange(e.target.value)}
              options={positionOptions}
            />
            {/* Input Datetime untuk Posisi Terkini */}
            <Input
              type="datetime-local"
              label="Waktu Posisi (Tanggal & Jam)"
              startIcon={Clock}
              value={positionUpdatedAt}
              onChange={(e) => onPositionUpdatedAtChange?.(e.target.value)}
            />
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
        )}

        {/* Jadwal Commenced & Completed Khusus PBM & Kepabeanan (MOM Part 2) */}
        {(isPbm || isCustoms) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Input
              type="date"
              label={isPbm ? "Mulai Commenced (Komen Slot)" : "Tanggal Mulai Commenced"}
              startIcon={Calendar}
              value={commencedDate}
              onChange={(e) => onCommencedDateChange?.(e.target.value)}
            />
            <Input
              type="date"
              label="Tanggal Completed"
              startIcon={Calendar}
              value={completedDate}
              onChange={(e) => onCompletedDateChange?.(e.target.value)}
            />
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
        )}

        {/* Final DSR & Status Lapangan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Final DSR (MT)"
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
