import type { ValidateFilesParams } from "@/types";

/**
 * Validasi keberadaan berkas wajib (Surat Penunjukan & Dokumen RKBM)
 */
export const validateOrderFiles = ({
  data,
  spFile,
  rkbmFile,
  rkbmBongkarFile,
  isEdit,
}: ValidateFilesParams): string | null => {
  // 1. Surat Penunjukan (SI) wajib diunggah untuk order baru
  if (!isEdit && !spFile) {
    return "Surat Penunjukan (SI) wajib diunggah.";
  }

  // 2. Berkas RKBM wajib diunggah khusus layanan Pengurusan RKBM
  if (data.service === "Pengurusan RKBM" && !isEdit) {
    if (data.rkbmType === "Muat & Bongkar") {
      if (!rkbmFile || !rkbmBongkarFile) {
        return "Untuk opsi Muat & Bongkar, kedua berkas (RKBM Muat dan RKBM Bongkar) wajib diunggah.";
      }
    } else if (data.rkbmType === "Bongkar") {
      if (!rkbmFile) {
        return "File dokumen RKBM Bongkar wajib diunggah.";
      }
    } else {
      if (!rkbmFile) {
        return "File dokumen RKBM Muat wajib diunggah.";
      }
    }
  }

  return null;
};
