import { Lock, Phone, Building2 } from "lucide-react";
import { Input, Select, Badge } from "@/components/ui";
import type { RkbmFleetSectionProps } from "@/types";

export const RkbmFleetSection = ({
  order,
  captainPhone,
  onCaptainPhoneChange,
  agent,
  onAgentChange,
  agentOptions,
}: RkbmFleetSectionProps) => {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
      <div className="border-l-4 border-slate-700 px-4 py-2.5 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            1. Plotting Armada & Rute (Ditetapkan oleh Tim Sales)
          </h4>
        </div>
        <Badge variant="neutral">Terkunci (Read-Only)</Badge>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-5 gap-3 border-t border-slate-100 text-xs">
        {/* Cirian Jenis Layanan Order */}
        <div>
          <span className="text-slate-400 block text-[10.5px]">
            Layanan Order:
          </span>
          <span className="mt-1 block">
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
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10.5px]">
            Nama Kapal / Tug Boat:
          </span>
          <span className="font-bold text-slate-800">
            {order.service === "Jasa PBM"
              ? "-"
              : order.tugBoat ||
                order.bargeNomination?.split("/")[0]?.trim() ||
                "-"}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10.5px]">
            Barge (Tongkang):
          </span>
          <span className="font-bold text-slate-800">
            {order.service === "Jasa PBM"
              ? "-"
              : order.bargeNomination?.includes("/")
                ? order.bargeNomination.split("/")[1]?.trim()
                : order.bargeNomination || "-"}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10.5px]">
            Mother Vessel:
          </span>
          <span className="font-bold text-slate-800">{order.vessel}</span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10.5px]">
            Shipment / Rute:
          </span>
          <span className="font-bold text-slate-800">
            {order.shipmentType || "KS"} • {order.pol} → {order.pod}
          </span>
        </div>
      </div>

      {/* Input Tambahan Koordinasi Lapangan */}
      <div className="p-4 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-100">
        <Input
          label="No. HP Kapten"
          startIcon={Phone}
          placeholder="0812-xxxx-xxxx"
          value={captainPhone}
          onChange={(e) => onCaptainPhoneChange(e.target.value)}
        />
        <Select
          label="Agen Kapal (Master Data)"
          startIcon={Building2}
          value={agent}
          onChange={(e) => onAgentChange(e.target.value)}
          options={agentOptions}
        />
      </div>
    </div>
  );
};
