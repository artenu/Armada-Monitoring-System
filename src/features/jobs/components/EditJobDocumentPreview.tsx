import {
  FileText,
  Upload,
  Download,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import type { UseEditJobReturn } from "@/features/jobs/hooks/useEditJob";
import { DocumentViewer } from "@/components/ui";

export const EditJobDocumentPreview = ({
  state,
}: {
  state: UseEditJobReturn;
}) => {
  const { order, previewUrl, previewName, isEditable, handleFileChange } =
    state;

  if (!order) return null;

  return (
    <>
      {/* Header Panel Preview Berkas */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="overflow-hidden pr-2">
          <div className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-red-600 shrink-0" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              Surat Penunjukan (SP)
            </h3>
          </div>
          <p
            className="text-[10.5px] text-slate-500 truncate mt-0.5 font-mono"
            title={previewName}>
            {previewName}
          </p>
        </div>

        {/* Toolbar Aksi Preview */}
        <div className="flex items-center gap-1 shrink-0">
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            title="Buka di Tab Baru">
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href={previewUrl}
            download={previewName}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            title="Unduh Berkas PDF">
            <Download className="w-4 h-4" />
          </a>

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

      {/* Canvas Viewer: Gambar atau PDF */}
      <DocumentViewer
        url={previewUrl}
        fileName={previewName}
        title="Pratinjau Surat Penunjukan PDF"
        alt="Surat Penunjukan"
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
