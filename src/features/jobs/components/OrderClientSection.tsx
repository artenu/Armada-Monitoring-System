import { Users, CheckCircle2 } from "lucide-react";
import { Input, Select } from "@/components/ui";
import { SERVICE_OPTIONS, END_USER_OPTIONS } from "@/data/mock-data";
import type { UseCreateOrderModalReturn } from "@/features/jobs/hooks/useCreateOrderModal";

export const OrderClientSection = ({
  form,
}: {
  form: UseCreateOrderModalReturn;
}) => {
  const { register, errors, customerList, contractInfo, handleCustomerChange } =
    form;

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
      <div className="border-l-4 border-red-600 px-4 py-2 bg-slate-50/70 flex items-center gap-2">
        <Users className="w-4 h-4 text-red-600" />
        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
          1. Data Klien & Layanan Order
        </h3>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-slate-100">
        {/* Customer */}
        <Select
          label="Customer"
          required
          error={errors.customer?.message}
          {...register("customer")}
          onChange={handleCustomerChange}>
          <option value="">Pilih Customer</option>
          {customerList.map((c) => (
            <option key={c.id} value={c.nama}>
              {c.nama}
            </option>
          ))}
        </Select>

        {/* End User */}
        <Select
          label="End User"
          required
          error={errors.endUser?.message}
          {...register("endUser")}>
          <option value="">Pilih End User</option>
          {END_USER_OPTIONS.map((eu) => (
            <option key={eu} value={eu}>
              {eu}
            </option>
          ))}
        </Select>

        {/* PIC Customer */}
        <Input
          label="PIC Customer"
          required
          placeholder="Auto-fill dari Master Customer"
          error={errors.customerPic?.message}
          {...register("customerPic")}
        />

        {/* Layanan Order */}
        <Select
          label="Layanan Order"
          required
          error={errors.service?.message}
          {...register("service")}>
          {SERVICE_OPTIONS.map((srv) => (
            <option key={srv} value={srv}>
              {srv}
            </option>
          ))}
        </Select>

        {/* Jenis Kegiatan */}
        <Select
          label="Jenis Kegiatan"
          required
          error={errors.activityType?.message}
          {...register("activityType")}>
          <option value="Domestik">Domestik (Lokal)</option>
          <option value="Ekspor">Ekspor (Internasional)</option>
          <option value="Impor">Impor</option>
        </Select>

        {/* Tanggal Pekerjaan */}
        <Input
          type="date"
          label="Tanggal Pekerjaan"
          required
          error={errors.startDate?.message}
          {...register("startDate")}
        />
      </div>

      {/* Banner Tarif Kontrak Customer (Jika Terdeteksi) */}
      {contractInfo && (
        <div className="mx-4 mb-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Kontrak Terdaftar:</strong> {contractInfo.customerName} •
              Tarif PBM:{" "}
              <strong>
                Rp {contractInfo.pbmRatePerTon?.toLocaleString("id-ID") || "-"}{" "}
                / MT
              </strong>
              {contractInfo.rkbmBongkarFee !== undefined && (
                <span>
                  {" "}
                  • RKBM Bongkar: Rp{" "}
                  {contractInfo.rkbmBongkarFee.toLocaleString("id-ID")}
                </span>
              )}
            </span>
          </div>
          <span className="text-[10.5px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold font-mono">
            Contract Active
          </span>
        </div>
      )}
    </div>
  );
};
