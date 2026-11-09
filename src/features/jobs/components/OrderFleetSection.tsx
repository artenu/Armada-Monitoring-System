import { Anchor } from "lucide-react";
import { Input, Select } from "@/components/ui";
import type { UseCreateOrderModalReturn } from "@/features/jobs/hooks/useCreateOrderModal";

export const OrderFleetSection = ({
  form,
}: {
  form: UseCreateOrderModalReturn;
}) => {
  const {
    register,
    errors,
    tugList,
    bargeList,
    polList,
    podList,
    selectedService,
  } = form;

  const isPbm = selectedService === "Jasa PBM";

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
      <div className="border-l-4 border-blue-600 px-4 py-2 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Anchor className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
            2. Plotting Armada Kapal & Rute
          </h3>
        </div>
        {isPbm && (
          <span className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
            Fokus Mother Vessel
          </span>
        )}
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-slate-100">
        {/* Mother Vessel */}
        <Input
          label="Nama Vessel (Mother Vessel)"
          required
          placeholder="Contoh: MV LARUS"
          error={errors.vessel?.message}
          className="font-bold"
          {...register("vessel")}
        />

        {/* Tug Boat & Barge hanya tampil jika BUKAN Jasa PBM (misal: Pengurusan RKBM) */}
        {!isPbm && (
          <>
            <Select
              label="Nama Kapal (Tug Boat)"
              error={errors.tugBoat?.message}
              {...register("tugBoat")}>
              <option value="">Pilih Kapal / Tug Boat</option>
              {tugList.map((tb) => (
                <option key={tb} value={tb}>
                  {tb}
                </option>
              ))}
            </Select>

            <Select
              label="Barge (Tongkang)"
              error={errors.bargeNomination?.message}
              {...register("bargeNomination")}>
              <option value="">Pilih Tongkang (Barge)</option>
              {bargeList.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </Select>
          </>
        )}

        {/* Shipment */}
        <Input
          label="Shipment"
          placeholder="Contoh: KS"
          error={errors.shipmentType?.message}
          className="uppercase"
          {...register("shipmentType")}
        />

        {/* POL */}
        <Select
          label="POL (Loading)"
          required
          error={errors.pol?.message}
          {...register("pol")}>
          <option value="">Pilih POL</option>
          {polList.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>

        {/* POD */}
        <Select
          label="POD (Discharge)"
          required
          error={errors.pod?.message}
          {...register("pod")}>
          <option value="">Pilih POD</option>
          {podList.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};
