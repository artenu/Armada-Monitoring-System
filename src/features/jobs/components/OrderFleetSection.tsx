import { Anchor } from "lucide-react";
import { Input, Select } from "@/components/forms";
import {
  SHIPMENT_CATEGORY_OPTIONS,
  isPbmService,
  isCustomsService,
} from "@/data/mock-data";
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

  const isPbm = isPbmService(selectedService);
  const isCustoms = isCustomsService(selectedService);

  return (
    <div className="border border-slate-200 rounded-xl bg-white shadow-2xs">
      <div className="border-l-4 border-blue-600 px-4 py-2 bg-slate-50/70 flex items-center justify-between rounded-t-xl">
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
        {isCustoms && (
          <span className="text-[11px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
            Tug & Barge Wajib (Vessel Opsional)
          </span>
        )}
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-slate-100">
        {/* Mother Vessel: Opsional untuk Kepabeanan & COO, Wajib untuk PBM & RKBM */}
        <Input
          label={
            isCustoms ? "Nama Vessel (Opsional)" : "Nama Vessel (Mother Vessel)"
          }
          required={!isCustoms}
          placeholder={isCustoms ? "Boleh dikosongkan..." : "Contoh: MV LARUS"}
          error={errors.vessel?.message}
          className="font-bold"
          {...register("vessel")}
        />

        {/* Tug Boat & Barge: Hanya tampil jika BUKAN Jasa PBM */}
        {!isPbm && (
          <>
            <Select
              label="Nama Kapal (Tug Boat)"
              required={isCustoms}
              placeholder="Pilih Kapal / Tug Boat"
              error={errors.tugBoat?.message}
              {...register("tugBoat")}>
              {tugList.map((tb) => (
                <option key={tb} value={tb}>
                  {tb}
                </option>
              ))}
            </Select>

            <Select
              label="Barge (Tongkang)"
              required={isCustoms}
              placeholder="Pilih Tongkang (Barge)"
              error={errors.bargeNomination?.message}
              {...register("bargeNomination")}>
              {bargeList.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </Select>
          </>
        )}

        {/* Shipment: Dropdown Kategori Muatan Resmi (Batu Bara, Batu Split, Alat Berat) */}
        <Select
          label="Shipment (Kategori Muatan)"
          required
          placeholder="Pilih Kategori Shipment"
          error={errors.shipmentType?.message}
          {...register("shipmentType")}>
          {SHIPMENT_CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>

        {/* POL */}
        <Select
          label="POL (Loading)"
          required
          placeholder="Pilih POL"
          error={errors.pol?.message}
          {...register("pol")}>
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
          placeholder="Pilih POD"
          error={errors.pod?.message}
          {...register("pod")}>
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
