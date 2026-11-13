import { FileCheck2, DollarSign, ShieldAlert } from "lucide-react";
import { Input, Select } from "@/components/forms";
import type { UseCreateOrderModalReturn } from "@/features/jobs/hooks/useCreateOrderModal";
import {
  isPbmService,
  isRkbmService,
  isCustomsService,
} from "@/data/mock-data";

export const OrderServiceDetailsSection = ({
  form,
}: {
  form: UseCreateOrderModalReturn;
}) => {
  const {
    register,
    errors,
    selectedService,
    selectedRateType,
    selectedActivity,
    selectedIncludeCoo,
    contractInfo,
    pnbpPreview,
  } = form;

  // 1. Khusus LAYANAN RKBM MUAT/BONGKAR
  if (isRkbmService(selectedService)) {
    return (
      <div className="border border-amber-200 rounded-xl bg-white shadow-2xs animate-in fade-in duration-200">
        <div className="border-l-4 border-amber-500 px-4 py-2 bg-amber-50/70 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              3. Detail Lokasi Jetty Pengurusan RKBM
            </h3>
          </div>
          <span className="text-[11px] text-amber-800 font-semibold bg-amber-100/60 px-2 py-0.5 rounded-md">
            Validasi Tarif Muat Pelabuhan
          </span>
        </div>
        <div className="p-4 space-y-2 border-t border-amber-100">
          <label className="block text-xs font-semibold text-amber-950">
            Tipe Jetty Muat (POL) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <label className="flex items-center gap-2 p-2.5 border border-amber-300 rounded-lg cursor-pointer bg-white hover:bg-amber-50/50">
              <input
                type="radio"
                value="Private"
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
            <label className="flex items-center gap-2 p-2.5 border border-amber-300 rounded-lg cursor-pointer bg-white hover:bg-amber-50/50">
              <input
                type="radio"
                value="Public"
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
      </div>
    );
  }

  // 2. Khusus JASA PENGAWASAN KEPABEANAN & COO (Dengan Checkbox Validasi COO)
  if (isCustomsService(selectedService)) {
    return (
      <div className="border border-purple-200 rounded-xl bg-white shadow-2xs animate-in fade-in duration-200">
        <div className="border-l-4 border-purple-600 px-4 py-2 bg-purple-50/70 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              3. Detail Layanan Kepabeanan & COO
            </h3>
          </div>
          <span className="text-[11px] text-purple-800 font-semibold bg-purple-100/60 px-2 py-0.5 rounded-md">
            Skema Tarif & Opsi COO
          </span>
        </div>

        <div className="p-4 space-y-4 border-t border-purple-100">
          {/* Skema Tarif Contract vs Spot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Select
              label="Skema Tarif Kepabeanan"
              error={errors.rateType?.message}
              {...register("rateType")}>
              <option value="Contract">
                Contract Rate (
                {contractInfo?.kepabeananFee
                  ? `Rp ${contractInfo.kepabeananFee.toLocaleString("id-ID")}`
                  : "Sesuai Database Kontrak"}
                )
              </option>
              <option value="Spot">Spot Rate (Input Tarif Khusus)</option>
            </Select>

            {/* Input Nominal Tarif Spot jika dipilih Spot */}
            {selectedRateType === "Spot" && (
              <Input
                type="number"
                label="Nominal Tarif Spot (Rp)"
                required
                placeholder="Contoh: 15000000"
                error={errors.spotRateAmount?.message}
                {...register("spotRateAmount")}
              />
            )}
          </div>

          {/* Checkbox Validasi: Termasuk Layanan COO */}
          <div className="p-3 bg-purple-50/50 border border-purple-200 rounded-xl">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                {...register("includeCoo")}
              />
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-purple-950 block">
                  Termasuk Layanan COO (Certificate of Origin)
                </span>
                <p className="text-[11px] text-purple-700">
                  {selectedIncludeCoo
                    ? "✓ Order ini mencakup penerbitan COO (+Rp 2.000.000). Di tahap operasional wajib upload dokumen PEB dan COO."
                    : "Order ini hanya mencakup jasa Pengawasan Kepabeanan (Bea Cukai). Di tahap operasional cukup upload dokumen PEB."}
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }

  // 3. Khusus LAYANAN PBM & PNBP (Bersih Tanpa Input COO)
  if (isPbmService(selectedService)) {
    return (
      <div className="border border-emerald-200 rounded-xl bg-white shadow-2xs animate-in fade-in duration-200">
        <div className="border-l-4 border-emerald-600 px-4 py-2 bg-emerald-50/70 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              3. Detail Jasa PBM & Skema Tarif
            </h3>
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded-md">
            Wajib Upload Surat Penunjukan (SI)
          </span>
        </div>
        <div className="p-4 space-y-4 border-t border-emerald-100">
          {/* Skema Tarif Contract / Spot */}
          <div className="max-w-xs">
            <Select
              label="Skema Tarif PBM"
              error={errors.rateType?.message}
              {...register("rateType")}>
              <option value="Contract">
                Contract Rate (
                {contractInfo?.pbmRatePerTon
                  ? `Rp ${contractInfo.pbmRatePerTon} / MT`
                  : "Sesuai Database Kontrak"}
                )
              </option>
              <option value="Spot">Spot Rate (Input Tarif Khusus)</option>
            </Select>
          </div>

          {/* Input Spot Rate jika dipilih Spot */}
          {selectedRateType === "Spot" && (
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg max-w-sm">
              <Input
                type="number"
                label="Tarif Spot Jasa PBM (Rp / MT)"
                required
                placeholder="Contoh: 300"
                error={errors.customRatePerTon?.message}
                {...register("customRatePerTon")}
              />
            </div>
          )}

          {/* Estimasi Reimbursement PNBP */}
          {pnbpPreview && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <span className="font-bold text-slate-700 block mb-1">
                Estimasi Reimbursement PNBP (Kas Negara):
              </span>
              <div className="flex justify-between text-slate-600">
                <span>
                  PNBP Barang ({selectedActivity} @ Rp {pnbpPreview.rateBarang}
                  /MT):
                </span>
                <span className="font-mono font-medium">
                  Rp {pnbpPreview.pnbpBarang.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>PNBP Pengawasan Bongkar Muat (@ Rp 54/MT):</span>
                <span className="font-mono font-medium">
                  Rp {pnbpPreview.pnbpPengawasan.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200 font-bold text-slate-900">
                <span>Total Reimbursement PNBP:</span>
                <span className="font-mono text-emerald-700">
                  Rp {pnbpPreview.totalPnbp.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
