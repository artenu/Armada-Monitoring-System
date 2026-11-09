import { Input, Select } from "@/components/ui";
import { SERVICE_OPTIONS, END_USER_OPTIONS } from "@/data/mock-data";
import type { UseEditJobReturn } from "@/features/jobs/hooks/useEditJob";

export const EditJobForm = ({ state }: { state: UseEditJobReturn }) => {
  const {
    isEditable,
    masterOptions,
    register,
    handleSubmit,
    errors,
    handleFormSubmit,
  } = state;

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
        <Select
          label="End User"
          required
          disabled={!isEditable}
          error={errors.endUser?.message}
          {...register("endUser")}>
          {END_USER_OPTIONS.map((eu) => (
            <option key={eu} value={eu}>
              {eu}
            </option>
          ))}
        </Select>

        {/* Mother Vessel */}
        <Input
          label="Mother Vessel"
          required
          disabled={!isEditable}
          error={errors.vessel?.message}
          {...register("vessel")}
        />

        {/* Jenis Kegiatan */}
        <Select
          label="Jenis Kegiatan"
          disabled={!isEditable}
          error={errors.activityType?.message}
          {...register("activityType")}>
          <option value="Domestik">Domestik</option>
          <option value="Ekspor">Ekspor</option>
          <option value="Impor">Impor</option>
        </Select>

        {/* Layanan Order */}
        <div className="sm:col-span-2">
          <Select
            label="Layanan Order"
            required
            disabled={!isEditable}
            error={errors.service?.message}
            {...register("service")}>
            {SERVICE_OPTIONS.map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </Select>
        </div>

        {/* POL */}
        <Select
          label="POL (Pelabuhan Muat)"
          required
          disabled={!isEditable}
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
      </div>
    </form>
  );
};
