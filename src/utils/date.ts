/**
 * Format string tanggal YYYY-MM-DD ke format Indonesia (contoh: 06 Nov 2026)
 */
export const formatDateIndo = (dateStr?: string | null): string => {
  if (!dateStr) {return "-";}
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {return dateStr;}
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
};

/**
 * Dapatkan tanggal hari ini dalam format YYYY-MM-DD
 */
export const getTodayString = (): string => {
  return new Date().toISOString().split("T")[0];
};
