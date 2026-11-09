import { FileText, Upload, X } from "lucide-react";
import { Input } from "@/components/ui";
import type { UseCreateOrderModalReturn } from "@/features/jobs/hooks/useCreateOrderModal";

export const OrderVolumeSection = ({
  form,
}: {
  form: UseCreateOrderModalReturn;
}) => {
  const { register, errors, spFile, setSpFile } = form;

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
      <div className="border-l-4 border-slate-700 px-4 py-2 bg-slate-50/70 flex items-center gap-2">
        <FileText className="w-4 h-4 text-slate-700" />
        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
          4. Volume Kargo & Surat Penunjukan (SI)
        </h3>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-slate-100">
        <Input
          label="Volume / Estimasi Tonase (MT)"
          required
          placeholder="Contoh: 7.500"
          badgeText="MT"
          error={errors.estimatedTonnage?.message}
          className="font-mono font-bold"
          {...register("estimatedTonnage")}
        />

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Surat Penunjukan / SI (PDF) <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <label className="flex-1 flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 hover:border-red-500 rounded-lg cursor-pointer bg-slate-50/60 transition-colors">
              <Upload className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-xs text-slate-700 truncate">
                {spFile ? spFile.name : "Unggah Surat Penunjukan (PDF)..."}
              </span>
              <input
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={(e) => setSpFile(e.target.files?.[0] || null)}
              />
            </label>
            {spFile && (
              <button
                type="button"
                onClick={() => setSpFile(null)}
                className="p-2 text-slate-400 hover:text-red-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
