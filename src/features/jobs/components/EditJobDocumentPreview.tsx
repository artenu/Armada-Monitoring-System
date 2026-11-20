import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import type { UseEditJobReturn } from "@/features/jobs/hooks/useEditJob";
import { DocumentViewer } from "@/components/ui";
import { isRkbmService, isCustomsService } from "@/data/mock-data";

export const EditJobDocumentPreview = ({
  state,
}: {
  state: UseEditJobReturn;
}) => {
  const { order, previewUrl, previewName, isEditable, handleFileChange } =
    state;

  // State tab dokumen aktif untuk layanan RKBM
  const [activeRkbmTab, setActiveRkbmTab] = useState<
    "penunjukan" | "permohonan" | "pernyataan" | "rkbmMuat" | "rkbmBongkar"
  >(() => {
    if (order?.rkbmSuratPenunjukanDocUrl) {
      return "penunjukan";
    }
    if (order?.rkbmSuratPermohonanDocUrl) {
      return "permohonan";
    }
    if (order?.rkbmSuratPernyataanDocUrl) {
      return "pernyataan";
    }
    if (order?.rkbmMuatDocUrl || order?.rkbmDocUrl) {
      return "rkbmMuat";
    }
    if (order?.rkbmBongkarDocUrl) {
      return "rkbmBongkar";
    }
    return "penunjukan";
  });

  if (!order) {
    return null;
  }

  // Gunakan helper standar agar cocok dengan nama layanan baru
  const isRkbm = isRkbmService(order.service);
  const isCustoms = isCustomsService(order.service);

  // Tentukan file URL & nama yang aktif untuk dipratinjau
  let currentUrl = previewUrl;
  let currentName = previewName;

  if (isRkbm) {
    if (activeRkbmTab === "penunjukan") {
      currentUrl = order.rkbmSuratPenunjukanDocUrl || previewUrl;
      currentName =
        order.rkbmSuratPenunjukanDocName || "1_Surat_Penunjukan.pdf";
    } else if (activeRkbmTab === "permohonan") {
      currentUrl = order.rkbmSuratPermohonanDocUrl || "";
      currentName =
        order.rkbmSuratPermohonanDocName || "2_Surat_Permohonan.pdf";
    } else if (activeRkbmTab === "pernyataan") {
      currentUrl = order.rkbmSuratPernyataanDocUrl || "";
      currentName =
        order.rkbmSuratPernyataanDocName || "3_Surat_Pernyataan.pdf";
    } else if (activeRkbmTab === "rkbmMuat") {
      currentUrl = order.rkbmMuatDocUrl || order.rkbmDocUrl || "";
      currentName =
        order.rkbmMuatDocName || order.rkbmDocName || "SK_RKBM_Muat.pdf";
    } else if (activeRkbmTab === "rkbmBongkar") {
      currentUrl = order.rkbmBongkarDocUrl || "";
      currentName = order.rkbmBongkarDocName || "SK_RKBM_Bongkar.pdf";
    }
  }

  const headerTitle = isRkbm
    ? "Berkas Persyaratan RKBM (KSOP)"
    : isCustoms
      ? "Dokumen Kepabeanan / PEB"
      : "Surat Penunjukan (SI / SP)";

  return (
    <>
      {/* Header Panel Preview Berkas */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="overflow-hidden pr-2">
          <div className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-red-600 shrink-0" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {headerTitle}
            </h3>
          </div>
          <p
            className="text-[10.5px] text-slate-500 truncate mt-0.5 font-mono"
            title={currentName}>
            {currentName}
          </p>
        </div>

        {/* Toolbar Aksi Preview */}
        <div className="flex items-center gap-1 shrink-0">
          {currentUrl && (
            <>
              <a
                href={currentUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                title="Buka di Tab Baru">
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={currentUrl}
                download={currentName}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                title="Unduh Berkas PDF">
                <Download className="w-4 h-4" />
              </a>
            </>
          )}

          {isEditable && (
            <label className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1 transition-colors shadow-2xs">
              <Upload className="w-3.5 h-3.5 text-red-600" />
              <span>Ganti</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>

      {/* Selector Seluruh Dokumen RKBM */}
      {isRkbm && (
        <div className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100/90 border-b border-slate-200 text-xs overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-500 shrink-0">
            Pilih Berkas:
          </span>

          <button
            type="button"
            onClick={() => setActiveRkbmTab("penunjukan")}
            className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] cursor-pointer transition-all whitespace-nowrap flex items-center gap-1 ${
              activeRkbmTab === "penunjukan"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200"
            }`}>
            <span>1. Penunjukan</span>
            {Boolean(order.rkbmSuratPenunjukanDocUrl) && (
              <span className="text-emerald-400 font-bold">✓</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveRkbmTab("permohonan")}
            className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] cursor-pointer transition-all whitespace-nowrap flex items-center gap-1 ${
              activeRkbmTab === "permohonan"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200"
            }`}>
            <span>2. Permohonan</span>
            {Boolean(order.rkbmSuratPermohonanDocUrl) && (
              <span className="text-emerald-400 font-bold">✓</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveRkbmTab("pernyataan")}
            className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] cursor-pointer transition-all whitespace-nowrap flex items-center gap-1 ${
              activeRkbmTab === "pernyataan"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200"
            }`}>
            <span>3. Pernyataan</span>
            {Boolean(order.rkbmSuratPernyataanDocUrl) && (
              <span className="text-emerald-400 font-bold">✓</span>
            )}
          </button>

          {/* Tab Tambahan jika SK RKBM sudah diterbitkan/diupload di operasional */}
          {Boolean(order.rkbmMuatDocUrl || order.rkbmDocUrl) && (
            <button
              type="button"
              onClick={() => setActiveRkbmTab("rkbmMuat")}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] cursor-pointer transition-all whitespace-nowrap flex items-center gap-1 ${
                activeRkbmTab === "rkbmMuat"
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-300"
              }`}>
              <span>SK RKBM Muat</span>
              <span className="font-bold">✓</span>
            </button>
          )}

          {Boolean(order.rkbmBongkarDocUrl) && (
            <button
              type="button"
              onClick={() => setActiveRkbmTab("rkbmBongkar")}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] cursor-pointer transition-all whitespace-nowrap flex items-center gap-1 ${
                activeRkbmTab === "rkbmBongkar"
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-300"
              }`}>
              <span>SK RKBM Bongkar</span>
              <span className="font-bold">✓</span>
            </button>
          )}
        </div>
      )}

      {/* Canvas Viewer */}
      <DocumentViewer
        url={currentUrl}
        fileName={currentName}
        title={`Pratinjau ${currentName}`}
        alt={currentName}
      />

      {/* Footer Status Verifikasi */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Dokumen Terverifikasi
        </span>
        <span className="text-slate-400 font-mono text-[10px]">
          Status: {order.status}
        </span>
      </div>
    </>
  );
};
