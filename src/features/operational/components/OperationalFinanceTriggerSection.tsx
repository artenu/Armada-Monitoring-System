import { FileText, Upload, X, CheckCircle2, ShieldCheck } from "lucide-react";
import type { OrderItem } from "@/types";

export interface OperationalFinanceTriggerSectionProps {
  order: OrderItem;
  // Berkas RKBM
  rkbmMuatFile: File | null;
  setRkbmMuatFile: (f: File | null) => void;
  rkbmBongkarFile: File | null;
  setRkbmBongkarFile: (f: File | null) => void;
  // Berkas PBM (5 Dokumen Wajib)
  sofFile: File | null;
  setSofFile: (f: File | null) => void;
  fenderFile: File | null;
  setFenderFile: (f: File | null) => void;
  staleweightFile: File | null;
  setStaleweightFile: (f: File | null) => void;
  finalDsrFile: File | null;
  setFinalDsrFile: (f: File | null) => void;
  noDamageFile: File | null;
  setNoDamageFile: (f: File | null) => void;
  // Berkas Kepabeanan & COO
  pebFile: File | null;
  setPebFile: (f: File | null) => void;
  cooFile: File | null;
  setCooFile: (f: File | null) => void;
}

export const OperationalFinanceTriggerSection = ({
  order,
  rkbmMuatFile,
  setRkbmMuatFile,
  rkbmBongkarFile,
  setRkbmBongkarFile,
  sofFile,
  setSofFile,
  fenderFile,
  setFenderFile,
  staleweightFile,
  setStaleweightFile,
  finalDsrFile,
  setFinalDsrFile,
  noDamageFile,
  setNoDamageFile,
  pebFile,
  setPebFile,
  cooFile,
  setCooFile,
}: OperationalFinanceTriggerSectionProps) => {
  const isRkbm = order.service === "Pengurusan RKBM";
  const isPbm = order.service === "Jasa PBM";
  const isCustoms = order.service === "Pengurusan Kepabeanan dan COO";

  const renderFileInput = (
    label: string,
    file: File | null,
    setFile: (f: File | null) => void,
    existingDocName?: string,
    required = true,
  ) => {
    const activeName = file ? file.name : existingDocName;

    return (
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-2">
          <label className="flex-1 flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 hover:border-emerald-500 rounded-lg cursor-pointer bg-slate-50/50 hover:bg-emerald-50/30 transition-colors">
            <Upload className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[11.5px] text-slate-700 truncate">
              {activeName || "Unggah dokumen PDF..."}
            </span>
            <input
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
          {(file || existingDocName) && (
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-slate-400 hover:text-red-600 cursor-pointer p-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="border border-emerald-200 rounded-xl overflow-hidden bg-white shadow-2xs">
      <div className="border-l-4 border-emerald-600 px-4 py-2.5 bg-emerald-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            4. Dokumen Kesiapan Penagihan (Finance Trigger)
          </h4>
        </div>
        <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Auto-Trigger Siap Ditagihkan
        </span>
      </div>

      <div className="p-4 space-y-4 border-t border-emerald-100">
        {/* Banner Penjelasan Trigger Finance */}
        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-2.5">
          <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {isRkbm &&
              "Begitu berkas SK RKBM Muat dan/atau Bongkar resmi dari KSOP diunggah di bawah ini, status order otomatis berubah menjadi 'Siap Ditagihkan' dan diteruskan ke antrean Finance."}
            {isPbm &&
              "Layanan Jasa PBM mensyaratkan 5 dokumen pendukung lengkap (SOF, Fender, Staleweight, Final DSR, No Damage) agar order otomatis berstatus 'Siap Ditagihkan'."}
            {isCustoms &&
              `Pengurusan Kepabeanan memerlukan dokumen PEB${order.includeCoo ? " dan COO" : ""} yang sah untuk menerbitkan status 'Siap Ditagihkan'.`}
          </p>
        </div>

        {/* 1. LAYANAN RKBM */}
        {isRkbm && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {(order.rkbmType === "Muat" ||
              order.rkbmType === "Muat & Bongkar" ||
              !order.rkbmType) &&
              renderFileInput(
                "Dokumen SK RKBM Muat (KSOP)",
                rkbmMuatFile,
                setRkbmMuatFile,
                order.rkbmMuatDocName || order.rkbmDocName,
              )}
            {(order.rkbmType === "Bongkar" ||
              order.rkbmType === "Muat & Bongkar") &&
              renderFileInput(
                "Dokumen SK RKBM Bongkar (KSOP)",
                rkbmBongkarFile,
                setRkbmBongkarFile,
                order.rkbmBongkarDocName,
              )}
          </div>
        )}

        {/* 2. LAYANAN JASA PBM: 5 DOKUMEN WAJIB */}
        {isPbm && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {renderFileInput(
              "1. Statement of Fact (SOF)",
              sofFile,
              setSofFile,
              order.sofDocName,
            )}
            {renderFileInput(
              "2. Surat Penggunaan Fender (Ban)",
              fenderFile,
              setFenderFile,
              order.fenderDocName,
            )}
            {renderFileInput(
              "3. Staleweight Plan",
              staleweightFile,
              setStaleweightFile,
              order.staleweightDocName,
            )}
            {renderFileInput(
              "4. Final DSR (Dokumen Fisik)",
              finalDsrFile,
              setFinalDsrFile,
              order.finalDsrDocName,
            )}
            {renderFileInput(
              "5. No Damage Report",
              noDamageFile,
              setNoDamageFile,
              order.noDamageDocName,
            )}
          </div>
        )}

        {/* 3. LAYANAN KEPABEANAN & COO */}
        {isCustoms && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {renderFileInput(
              "Dokumen PEB (Pemberitahuan Ekspor)",
              pebFile,
              setPebFile,
              order.pebDocName,
            )}
            {order.includeCoo &&
              renderFileInput(
                "Dokumen COO (Certificate of Origin)",
                cooFile,
                setCooFile,
                order.cooDocName,
              )}
          </div>
        )}
      </div>
    </div>
  );
};

