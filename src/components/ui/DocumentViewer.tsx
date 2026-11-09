import { FileText } from "lucide-react";
import { cn } from "@/utils/cn";
import type { DocumentViewerProps } from "@/types/components/ui/documentViewer";

// Helper deteksi apakah format berkas berupa gambar
const checkIsImage = (url?: string | null, fileName?: string): boolean => {
  if (!url) return false;
  const target = (fileName || url).toLowerCase();
  return (
    target.endsWith(".png") ||
    target.endsWith(".jpg") ||
    target.endsWith(".jpeg") ||
    target.endsWith(".webp") ||
    target.endsWith(".svg") ||
    url.startsWith("data:image/")
  );
};

export const DocumentViewer = ({
  url,
  fileName,
  title = "Pratinjau Dokumen",
  alt = "Pratinjau Dokumen",
  className,
  heightClass = "h-[600px] sm:h-[620px]",
}: DocumentViewerProps) => {
  // 1. Tampilan jika berkas kosong
  if (!url) {
    return (
      <div
        className={cn(
          "w-full flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400",
          heightClass,
          className,
        )}>
        <FileText className="w-10 h-10 mb-2 text-slate-300" />
        <p className="text-xs font-semibold">Tidak ada dokumen yang dipilih</p>
      </div>
    );
  }

  const isImage = checkIsImage(url, fileName);

  return (
    <div className={cn("p-3 bg-slate-100/70 flex-1", className)}>
      {isImage ? (
        // 2. Tampilan Gambar
        <div
          className={cn(
            "w-full flex items-center justify-center bg-white rounded-xl border border-slate-200 overflow-hidden p-2 shadow-2xs",
            heightClass,
          )}>
          <img
            src={url}
            alt={alt}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ) : (
        // 3. Tampilan Dokumen PDF via Iframe
        <iframe
          src={url.includes("#") ? url : `${url}#toolbar=1&navpanes=0`}
          className={cn(
            "w-full rounded-xl border border-slate-300 bg-white shadow-xs",
            heightClass,
          )}
          title={title}
        />
      )}
    </div>
  );
};
