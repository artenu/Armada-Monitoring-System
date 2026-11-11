import { Input, Select } from "@/components/forms";
import {
  SERVICE_OPTIONS,
  END_USER_OPTIONS,
  SHIPMENT_CATEGORY_OPTIONS,
} from "@/data/mock-data";
import type { UseEditJobReturn } from "@/features/jobs/hooks/useEditJob";

export const EditJobForm = ({ state }: { state: UseEditJobReturn }) => {
  const {
    order,
    isEditable,
    masterOptions,
    register,
    handleSubmit,
    errors,
    handleFormSubmit,
    selectedService,
    selectedRateType,
    selectedIncludeCoo,
  } = state;

  const isCustoms = selectedService === "Pengurusan Kepabeanan dan COO";
  const isPbm = selectedService === "Jasa PBM";
  const isRkbm = selectedService === "Pengurusan RKBM";

  return (
    <form
      id="edit-order-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4">
      <div className="border-l-4 border-red-600 pl-3">
        <h3 className="text-sm font-bold text-slate-900">Rincian Data Order</h3>
        <p className="text-[11px] text-slate-500">
          Sesuaikan informasi sebelum diteruskan ke operasional.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {/* Customer */}
        <Select
          label="Customer"
          required
          defaultValue={order?.customer}
          disabled={!isEditable}
          error={errors.customer?.message}
          {...register("customer")}>
          {masterOptions.customerList.map((c) => (
            <option key={c.id} value={c.nama}>
              {c.nama}
            </option>
          ))}
        </Select>

        {/* End User */}
        {!isCustoms && (
          <Select
            label="End User"
            required
            defaultValue={order?.endUser}
            disabled={!isEditable}
            error={errors.endUser?.message}
            {...register("endUser")}>
            {END_USER_OPTIONS.map((eu) => (
              <option key={eu} value={eu}>
                {eu}
              </option>
            ))}
          </Select>
        )}

        {/* Mother Vessel */}
        <Input
          label={isCustoms ? "Mother Vessel (Opsional)" : "Mother Vessel"}
          required={!isCustoms}
          disabled={!isEditable}
          error={errors.vessel?.message}
          {...register("vessel")}
        />

        {/* Jenis Kegiatan: Disembunyikan jika Kepabeanan & COO */}
        {!isCustoms && (
          <Select
            label="Jenis Kegiatan"
            disabled={!isEditable}
            defaultValue={order?.activityType}
            error={errors.activityType?.message}
            {...register("activityType")}>
            <option value="Domestik">Domestik</option>
            <option value="Ekspor">Ekspor</option>
            <option value="Impor">Impor</option>
          </Select>
        )}

        {/* Layanan Order */}
        <div className="sm:col-span-2">
          <Select
            label="Layanan Order"
            required
            disabled={!isEditable}
            defaultValue={order?.service}
            error={errors.service?.message}
            {...register("service")}>
            {SERVICE_OPTIONS.map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </Select>
        </div>

        {/* Detail Khusus: Pengurusan RKBM (Tipe Jetty Muat) */}
        {isRkbm && (
          <div className="sm:col-span-2 p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
            <label className="block text-xs font-bold text-amber-950">
              Tipe Jetty Muat (POL) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="flex items-center gap-2.5 p-2.5 border border-amber-300 rounded-lg cursor-pointer bg-white hover:bg-amber-50/50">
                <input
                  type="radio"
                  value="Private"
                  disabled={!isEditable}
                  {...register("polJettyType")}
                  className="text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Jetty Private (Milik Sendiri)
                  </span>
                  <span className="text-[10.5px] text-emerald-700 font-semibold block">
                    Fee RKBM Muat: Rp 0 (FREE)
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 border border-amber-300 rounded-lg cursor-pointer bg-white hover:bg-amber-50/50">
                <input
                  type="radio"
                  value="Public"
                  disabled={!isEditable}
                  {...register("polJettyType")}
                  className="text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Jetty Public (Umum)
                  </span>
                  <span className="text-[10.5px] text-amber-800 font-medium block">
                    Fee RKBM Muat: Rp 350.000
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Detail Khusus: Kepabeanan & COO (Skema Tarif & Checkbox COO) */}
        {isCustoms && (
          <div className="sm:col-span-2 p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-3">
            <span className="text-xs font-bold text-purple-950 block">
              Pengaturan Tarif Kepabeanan & Opsi COO
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Skema Tarif Kepabeanan"
                disabled={!isEditable}
                defaultValue={order?.rateType || "Contract"}
                error={errors.rateType?.message}
                {...register("rateType")}>
                <option value="Contract">Sesuai Kontrak Customer</option>
                <option value="Spot">Spot Rate (Non-Kontrak)</option>
              </Select>

              {selectedRateType === "Spot" && (
                <Input
                  label="Nominal Spot Rate (Rp)"
                  required
                  disabled={!isEditable}
                  placeholder="Contoh: 15.000.000"
                  error={errors.spotRateAmount?.message}
                  {...register("spotRateAmount", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      e.target.value = raw
                        ? new Intl.NumberFormat("id-ID").format(Number(raw))
                        : "";
                    },
                  })}
                />
              )}
            </div>

            <label className="flex items-start gap-2.5 p-3 bg-white border border-purple-200 rounded-lg cursor-pointer hover:bg-purple-50/40">
              <input
                type="checkbox"
                disabled={!isEditable}
                className="mt-0.5 rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
                {...register("includeCoo")}
              />
              <div>
                <span className="text-xs font-bold text-purple-950 block">
                  Termasuk Layanan COO (Certificate of Origin)
                </span>
                <p className="text-[11px] text-purple-700">
                  {selectedIncludeCoo
                    ? "✓ Order ini mencakup penerbitan COO (+Rp 2.000.000 untuk Alfara). Di tahap operasional wajib upload dokumen PEB dan COO."
                    : "Order ini hanya mencakup jasa Kepabeanan (Bea Cukai). Di tahap operasional cukup upload dokumen PEB."}
                </p>
              </div>
            </label>
          </div>
        )}

        {/* POL */}
        <Select
          label="POL (Pelabuhan Muat)"
          required
          disabled={!isEditable}
          defaultValue={order?.pol}
          error={errors.pol?.message}
          {...register("pol")}>
          {masterOptions.polList.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>

        {/* POD */}
        <Select
          label="POD (Pelabuhan Bongkar)"
          required
          disabled={!isEditable}
          defaultValue={order?.pod}
          error={errors.pod?.message}
          {...register("pod")}>
          {masterOptions.podList.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>

        {/* Tanggal Pekerjaan */}
        <Input
          type="date"
          label="Tanggal Pekerjaan"
          required
          disabled={!isEditable}
          error={errors.startDate?.message}
          {...register("startDate")}
        />

        {/* Estimasi Tonase */}
        <Input
          label="Estimasi Tonase (MT)"
          required
          badgeText="MT"
          disabled={!isEditable}
          error={errors.estimatedTonnage?.message}
          {...register("estimatedTonnage", {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const raw = e.target.value.replace(/\D/g, "");
              e.target.value = raw
                ? new Intl.NumberFormat("id-ID").format(Number(raw))
                : "";
            },
          })}
        />

        {/* PIC Customer */}
        <Input
          label="PIC Customer"
          required
          disabled={!isEditable}
          error={errors.customerPic?.message}
          {...register("customerPic")}
        />

        {/* Keterangan */}
        <Input
          label="Keterangan"
          placeholder="Catatan tambahan"
          disabled={!isEditable}
          error={errors.notes?.message}
          {...register("notes")}
        />

        {!isPbm && (
          <>
            <Select
              label="Nama Kapal (Tug Boat)"
              required={isCustoms}
              disabled={!isEditable}
              defaultValue={
                order?.tugBoat ||
                (order?.bargeNomination?.includes(" / ")
                  ? order.bargeNomination.split(" / ")[0].trim()
                  : "")
              }
              error={errors.tugBoat?.message}
              {...register("tugBoat")}>
              <option value="">Pilih Kapal / Tug Boat</option>
              {masterOptions.tugList.map((tb) => (
                <option key={tb} value={tb}>
                  {tb}
                </option>
              ))}
            </Select>

            <Select
              label="Barge (Tongkang)"
              required={isCustoms}
              defaultValue={
                order?.bargeNomination?.includes(" / ")
                  ? order.bargeNomination.split(" / ")[1].trim()
                  : order?.bargeNomination
              }
              disabled={!isEditable}
              error={errors.bargeNomination?.message}
              {...register("bargeNomination")}>
              <option value="">Pilih Tongkang (Barge)</option>
              {masterOptions.bargeList.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </Select>

            <Select
              label="Barge (Tongkang)"
              required={isCustoms}
              defaultValue={order?.bargeNomination}
              disabled={!isEditable}
              error={errors.bargeNomination?.message}
              {...register("bargeNomination")}>
              <option value="">Pilih Tongkang (Barge)</option>
              {masterOptions.bargeList.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </Select>
          </>
        )}

        <Select
          label="Shipment (Kategori Muatan)"
          required
          disabled={!isEditable}
          defaultValue={order?.shipmentType || "Batu Bara"}
          error={errors.shipmentType?.message}
          {...register("shipmentType")}>
          {SHIPMENT_CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </div>
    </form>
  );
};
