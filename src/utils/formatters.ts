/**
 * Format angka ke format mata uang Rupiah (contoh: Rp 1.500.000)
 */
export const formatRupiah = (val?: number | null): string => {
  if (val === undefined || val === null || isNaN(val)) {return "Rp 0";}
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

/**
 * Format tonase kargo (contoh: 7.500 MT)
 */
export const formatTonnage = (val?: number | null): string => {
  if (val === undefined || val === null || isNaN(val)) {return "0 MT";}
  return `${new Intl.NumberFormat("id-ID").format(val)} MT`;
};

/**
 * Format angka ribuan biasa (contoh: 1.250)
 */
export const formatNumber = (val?: number | null): string => {
  if (val === undefined || val === null || isNaN(val)) {return "0";}
  return new Intl.NumberFormat("id-ID").format(val);
};

/**
 * Mengubah angka menjadi teks terbilang bahasa Indonesia untuk cetak faktur/invoice
 */
export function angkaTerbilang(nilai: number): string {
  const bilangan = Math.floor(Math.abs(nilai));
  const huruf = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];

  if (bilangan < 12) {return huruf[bilangan];}
  if (bilangan < 20) {return angkaTerbilang(bilangan - 10) + " Belas";}
  if (bilangan < 100)
    {return (
      angkaTerbilang(Math.floor(bilangan / 10)) +
      " Puluh " +
      angkaTerbilang(bilangan % 10)
    );}
  if (bilangan < 200) {return "Seratus " + angkaTerbilang(bilangan - 100);}
  if (bilangan < 1000)
    {return (
      angkaTerbilang(Math.floor(bilangan / 100)) +
      " Ratus " +
      angkaTerbilang(bilangan % 100)
    );}
  if (bilangan < 2000) {return "Seribu " + angkaTerbilang(bilangan - 1000);}
  if (bilangan < 1000000)
    {return (
      angkaTerbilang(Math.floor(bilangan / 1000)) +
      " Ribu " +
      angkaTerbilang(bilangan % 1000)
    );}
  if (bilangan < 1000000000)
    {return (
      angkaTerbilang(Math.floor(bilangan / 1000000)) +
      " Juta " +
      angkaTerbilang(bilangan % 1000000)
    );}
  return (
    angkaTerbilang(Math.floor(bilangan / 1000000000)) +
    " Miliar " +
    angkaTerbilang(bilangan % 1000000000)
  );
}

export const formatRibuan = (val?: number | string | null): string => {
  if (val === undefined || val === null || val === "") {return "";}
  const num =
    typeof val === "string"
      ? parseFloat(val.replace(/\./g, "").replace(",", "."))
      : val;
  if (isNaN(num)) {return "";}
  return new Intl.NumberFormat("id-ID").format(num);
};
/**
 * Parse string ber-titik ribuan kembali ke number (contoh: "500.000" -> 500000)
 */
export const parseRibuan = (str: string | number): number => {
  if (typeof str === "number") {return str;}
  if (!str) {return 0;}
  const clean = str.toString().replace(/\./g, "").replace(",", ".");
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
};
