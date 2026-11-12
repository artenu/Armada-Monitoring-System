import type { ValidateFilesParams } from "@/types";
import { isPbmService, isRkbmService } from "@/data/mock-data";

/**
 * Validasi keberadaan berkas wajib (Surat Penunjukan, 3 Dokumen KSOP untuk RKBM)
 */
export const validateOrderFiles = ({
  data,
  spFile,
  suratPenunjukanFile,
  suratPermohonanFile,
  suratPernyataanFile,
  isEdit,
}: ValidateFilesParams): string | null => {
  // Jika sedang mode edit dan file tidak diganti, lewati validasi
  if (isEdit) {
    return null;
  }

  // 1. Layanan Jasa PBM: Surat Penunjukan (SI) wajib diunggah
  if (isPbmService(data.service)) {
    if (!spFile) {
      return "Surat Penunjukan (SI) wajib diunggah untuk layanan Jasa PBM.";
    }
  }

  // 2. Layanan Pengurusan RKBM: 3 Dokumen Persyaratan KSOP wajib diunggah
  if (isRkbmService(data.service)) {
    if (!suratPenunjukanFile) {
      return "Surat Penunjukan KSOP wajib diunggah untuk pengajuan RKBM.";
    }
    if (!suratPermohonanFile) {
      return "Surat Permohonan KSOP wajib diunggah untuk pengajuan RKBM.";
    }
    if (!suratPernyataanFile) {
      return "Surat Pernyataan KSOP wajib diunggah untuk pengajuan RKBM.";
    }
  }

  // 3. Layanan Pengurusan Kepabeanan dan COO tidak membutuhkan berkas awal di tahap sales
  return null;
};
