import { FileCheck2, DollarSign, Upload, X } from "lucide-react";
import { Input, Select } from "@/components/ui";
import type { UseCreateOrderModalReturn } from "@/features/jobs/hooks/useCreateOrderModal";

export const OrderServiceDetailsSection = ({
  form,
}: {
  form: UseCreateOrderModalReturn;
}) => {
  const {
    register,
    errors,
    selectedService,
    selectedRkbmType,
    selectedRateType,
    selectedActivity,
    pnbpPreview,
    rkbmFile,
    setRkbmFile,
    rkbmBongkarFile,
    setRkbmBongkarFile,
  } = form;

  // 1. Kondisional Khusus Layanan Pengurusan RKBM
  if (selectedService === "Pengurusan RKBM") {
    return (
      <div className="border border-amber-200 rounded-xl overflow-hidden bg-white shadow-2xs animate-in fade-in duration-200">
        <div className="border-l-4 border-amber-500 px-4 py-2 bg-amber-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              3. Detail Khusus Pengurusan RKBM
            </h3>
          </div>
          <span className="text-[11px] text-amber-800 font-semibold">
            Wajib Upload Berkas RKBM
          </span>
        </div>

        <div className="p-4 grid grid-cols-1 gap-3.5 border-t border-amber-100">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Jenis RKBM <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer bg-white hover:bg-slate-50">
                <input
                  type="radio"
                  value="Muat"
                  {...register("rkbmType")}
                  className="text-amber-600 focus:ring-amber-500"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Muat Saja
                </span>
              </label>
              <label className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer bg-white hover:bg-slate-50">
                <input
                  type="radio"
                  value="Bongkar"
                  {...register("rkbmType")}
                  className="text-amber-600 focus:ring-amber-500"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Bongkar Saja
                </span>
              </label>
              <label className="flex items-center gap-2 p-2 border border-amber-300 rounded-lg cursor-pointer bg-amber-50/60 hover:bg-amber-100/60">
                <input
                  type="radio"
                  value="Muat & Bongkar"
                  {...register("rkbmType")}
                  className="text-amber-600 focus:ring-amber-500"
                />
                <span className="text-xs font-bold text-amber-900">
                  Muat & Bongkar
                </span>
              </label>
            </div>
          </div>

          {/* Upload Dokumen RKBM */}
          {selectedRkbmType === "Muat & Bongkar" ? (
            <div className=" grid grid-cols-2 gap-3 pt-2 border-t border-amber-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  1. Dokumen RKBM Muat (PDF){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center gap-2 px-3 py-2 border border-dashed border-amber-300 hover:border-amber-500 rounded-lg cursor-pointer bg-amber-50/40 transition-colors">
                    <Upload className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs text-slate-700 truncate">
                      {rkbmFile ? rkbmFile.name : "Pilih PDF RKBM Muat..."}
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => setRkbmFile(e.target.files?.[0] || null)}
                    />
                    {rkbmFile && (
                      <button
                        type="button"
                        onClick={() => setRkbmFile(null)}
                        className=" text-slate-400 hover:text-red-600 cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2. Dokumen RKBM Bongkar (PDF){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center gap-2 px-3 py-2 border border-dashed border-amber-300 hover:border-amber-500 rounded-lg cursor-pointer bg-amber-50/40 transition-colors">
                    <Upload className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs text-slate-700 truncate">
                      {rkbmBongkarFile
                        ? rkbmBongkarFile.name
                        : "Pilih PDF RKBM Bongkar..."}
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) =>
                        setRkbmBongkarFile(e.target.files?.[0] || null)
                      }
                    />
                    {rkbmBongkarFile && (
                      <button
                        type="button"
                        onClick={() => setRkbmBongkarFile(null)}
                        className=" text-slate-400 hover:text-red-600 cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dokumen Berkas{" "}
                {selectedRkbmType === "Bongkar" ? "RKBM Bongkar" : "RKBM Muat"}{" "}
                (PDF) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1 flex items-center gap-2 px-3 py-2 border border-dashed border-amber-300 hover:border-amber-500 rounded-lg cursor-pointer bg-amber-50/40 transition-colors">
                  <Upload className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs text-slate-700 truncate">
                    {rkbmFile
                      ? rkbmFile.name
                      : `Pilih file PDF ${selectedRkbmType === "Bongkar" ? "Bongkar" : "Muat"}...`}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setRkbmFile(e.target.files?.[0] || null)}
                  />
                </label>
                {rkbmFile && (
                  <button
                    type="button"
                    onClick={() => setRkbmFile(null)}
                    className=" text-slate-400 hover:text-red-600 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Tipe Jetty POL: Khusus jika jenis RKBM adalah Muat atau Muat & Bongkar */}
        {(selectedRkbmType === "Muat" ||
          selectedRkbmType === "Muat & Bongkar") && (
          <div className="p-3 space-y-1">
            <label className="block text-xs font-semibold text-amber-950 mb-1">
              Tipe Jetty Muat (POL) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
        )}
      </div>
    );
  }

  // 2. Kondisional Khusus Layanan Jasa PBM & PNBP
  if (selectedService === "Jasa PBM") {
    return (
      <div className="border border-emerald-200 rounded-xl overflow-hidden bg-white shadow-2xs animate-in fade-in duration-200">
        <div className="border-l-4 border-emerald-600 px-4 py-2 bg-emerald-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              3. Detail Jasa PBM & Skema Tarif
            </h3>
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold">
            Cukup Upload Surat Penunjukan (SI)
          </span>
        </div>
        <div className="p-4 space-y-4 border-t border-emerald-100">
          {/* Cukup Skema Tarif Contract / Spot */}
          <div className="max-w-xs">
            <Select
              label="Skema Tarif PBM"
              error={errors.rateType?.message}
              {...register("rateType")}>
              <option value="Contract">Contract Rate (Sesuai Database)</option>
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
