import { Users, CheckCircle2 } from "lucide-react";
import { Input, Select } from "@/components/forms";
import { SERVICE_OPTIONS, END_USER_OPTIONS } from "@/data/mock-data";
import type { UseCreateOrderModalReturn } from "@/features/jobs/hooks/useCreateOrderModal";

export const OrderClientSection = ({
  form,
}: {
  form: UseCreateOrderModalReturn;
}) => {
  const {
    register,
    errors,
    customerList,
    contractInfo,
    selectedService,
    handleCustomerChange,
  } = form;

  const isCustoms = selectedService === "Pengurusan Kepabeanan dan COO";

  return (
    <div className="border border-slate-200 rounded-xl bg-white shadow-2xs">
      <div className="border-l-4 border-red-600 px-4 py-2 bg-slate-50/70 flex items-center justify-between rounded-t-xl">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-red-600" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
            1. Data Klien & Layanan Order
          </h3>
        </div>
        {isCustoms && (
          <span className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Fokus Kepabeanan (Tanpa End User & Kegiatan)
          </span>
        )}
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-slate-100">
        {/* Customer */}
        <Select
          label="Customer"
          required
          placeholder="Pilih Customer"
          error={errors.customer?.message}
          {...register("customer")}
          onChange={handleCustomerChange}>
          {customerList.map((c) => (
            <option key={c.id} value={c.nama}>
              {c.nama}
            </option>
          ))}
        </Select>

        {/* End User: Disembunyikan khusus Layanan Pengurusan Kepabeanan dan COO */}
        {!isCustoms && (
          <Select
            label="End User"
            required
            placeholder="Pilih End User"
            error={errors.endUser?.message}
            {...register("endUser")}>
            {END_USER_OPTIONS.map((eu) => (
              <option key={eu} value={eu}>
                {eu}
              </option>
            ))}
          </Select>
        )}

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

        {/* Jenis Kegiatan: Disembunyikan khusus Layanan Pengurusan Kepabeanan dan COO */}
        {!isCustoms && (
          <Select
            label="Jenis Kegiatan"
            required
            error={errors.activityType?.message}
            {...register("activityType")}>
            <option value="Domestik">Domestik (Lokal)</option>
            <option value="Ekspor">Ekspor (Internasional)</option>
            <option value="Impor">Impor</option>
          </Select>
        )}

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
              {selectedService === "Jasa PBM" && (
                <span>
                  {" "}Tarif PBM:{" "}
                  <strong>
                    Rp {contractInfo.pbmRatePerTon?.toLocaleString("id-ID") || "-"}{" "}
                    / MT
                  </strong>
                </span>
              )}
              {selectedService === "Pengurusan Kepabeanan dan COO" && (
                <span>
                  {" "}Tarif Kepabeanan:{" "}
                  <strong>
                    Rp {(contractInfo.kepabeananFee || 0).toLocaleString("id-ID")}
                  </strong>
                  {contractInfo.cooFee ? (
                    <span>
                      {" "}• COO:{" "}
                      <strong>
                        Rp {contractInfo.cooFee.toLocaleString("id-ID")}
                      </strong>
                    </span>
                  ) : null}
                </span>
              )}
              {selectedService === "Pengurusan RKBM" && (
                <span>
                  {" "}Bongkar:{" "}
                  <strong>
                    Rp {(contractInfo.rkbmBongkarFee || 0).toLocaleString("id-ID")}
                  </strong>
                  {" "}• Muat:{" "}
                  <strong>
                    Private FREE / Public Rp {(contractInfo.rkbmMuatPublicFee || 350000).toLocaleString("id-ID")}
                  </strong>
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
