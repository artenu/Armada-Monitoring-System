import { FileText, Upload, X } from "lucide-react";
import { Input } from "@/components/forms";
import type { UseCreateOrderModalReturn } from "@/features/jobs/hooks/useCreateOrderModal";

export const OrderVolumeSection = ({
  form,
}: {
  form: UseCreateOrderModalReturn;
}) => {
  const {
    register,
    errors,
    selectedService,
    spFile,
    setSpFile,
    suratPenunjukanFile,
    setSuratPenunjukanFile,
    suratPermohonanFile,
    setSuratPermohonanFile,
    suratPernyataanFile,
    setSuratPernyataanFile,
  } = form;

  const isPbm = selectedService === "Jasa PBM";
  const isRkbm = selectedService === "Pengurusan RKBM";

  // Helper render tombol upload file
  const renderFileInput = (
    label: string,
    file: File | null,
    setFile: (f: File | null) => void,
    placeholder: string,
  ) => (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-2">
        <label className="flex-1 flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 hover:border-red-500 rounded-lg cursor-pointer bg-slate-50/60 transition-colors">
          <Upload className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-[11.5px] text-slate-700 truncate">
            {file ? file.name : placeholder}
          </span>
          <input
            type="file"
            accept=".pdf,image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        {file && (
          <button
            type="button"
            onClick={() => setFile(null)}
            className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
      <div className="border-l-4 border-slate-700 px-4 py-2 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-700" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
            4. Volume Kargo & Dokumen Persyaratan
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          {isPbm && "Wajib upload SI"}
          {isRkbm && "Wajib 3 Berkas KSOP"}
          {!isPbm && !isRkbm && "Dokumen diatur di Operasional"}
        </span>
      </div>

      <div className="p-4 space-y-4 border-t border-slate-100">
        {/* Input Volume / Tonase */}
        <div className="max-w-xs">
          <Input
            label="Volume / Estimasi Tonase (MT)"
            required
            placeholder="Contoh: 7.500"
            badgeText="MT"
            error={errors.estimatedTonnage?.message}
            className="font-mono font-bold"
            {...register("estimatedTonnage")}
          />
        </div>

        {/* 1. Layanan Jasa PBM: Upload SI */}
        {isPbm && (
          <div className="pt-2 border-t border-slate-100">
            {renderFileInput(
              "Surat Penunjukan / SI (PDF)",
              spFile,
              setSpFile,
              "Unggah Surat Penunjukan (PDF)...",
            )}
          </div>
        )}

        {/* 2. Layanan Pengurusan RKBM: Upload 3 Berkas KSOP */}
        {isRkbm && (
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-800 block">
              Unggah 3 Berkas Permohonan KSOP (PDF):
            </span>
            <div className="grid grid-cols-1 gap-3">
              {renderFileInput(
                "1. Surat Penunjukan",
                suratPenunjukanFile,
                setSuratPenunjukanFile,
                "Pilih PDF Surat Penunjukan...",
              )}
              {renderFileInput(
                "2. Surat Permohonan",
                suratPermohonanFile,
                setSuratPermohonanFile,
                "Pilih PDF Surat Permohonan...",
              )}
              {renderFileInput(
                "3. Surat Pernyataan",
                suratPernyataanFile,
                setSuratPernyataanFile,
                "Pilih PDF Surat Pernyataan...",
              )}
            </div>
            <p className="text-[11px] text-slate-400 italic">
              * SK RKBM Resmi nantinya akan diunggah oleh tim Operasional
              setelah perizinan disetujui KSOP.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
