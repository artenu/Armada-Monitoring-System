import type { CustomerContractRate } from "@/types/finance/financeTypes";

export const CONTRACT_RATES_STORAGE_KEY = "gds_service_contract_rates_v3";

/**
 * Master Data Tarif Kontrak Resmi berbasis Layanan & Lokasi
 * Sesuai MOM 11 November 2026
 */
export const CONTRACT_RATES_DATABASE: CustomerContractRate[] = [
  // 1. LAYANAN PBM - Muara Berau (PT BUP PTB)
  {
    id: "RATE-PBM-001",
    service: "LAYANAN PBM",
    location: "Muara Berau",
    customerId: "PTB",
    customerName: "PT BUP PTB",
    pbmRatePerTon: 11000, // Rp 11.000 / MT
    pnbpBarangType: "Gratis",
    pnbpPengawasanType: "Gratis",
    pnbpBarangAmount: 0,
    pnbpPengawasanAmount: 0,
    status: "Aktif",
    notes:
      "PBM Rp 11.000/MT, PNBP Barang & Pengawasan GRATIS (MOM 11 Nov 2026)",
  },
  // 2. LAYANAN PBM - Muara Jawa (PT CEP)
  {
    id: "RATE-PBM-002",
    service: "LAYANAN PBM",
    location: "Muara Jawa",
    customerId: "CEP",
    customerName: "PT CEP",
    pbmRatePerTon: 0, // TBD / Menunggu konfirmasi
    pnbpBarangType: "Belum Diketahui",
    pnbpPengawasanType: "Belum Diketahui",
    status: "Aktif",
    notes: "Menunggu konfirmasi angka resmi (MOM 11 Nov 2026)",
  },
  // 3. LAYANAN RKBM - Muara Berau (Template Siap Pakai)
  {
    id: "RATE-RKBM-001",
    service: "LAYANAN RKBM MUAT/BONGKAR/MUAT & BONGKAR",
    location: "Muara Berau",
    customerId: "ADP",
    customerName: "PT ADP",
    rkbmBongkarFee: 0,
    rkbmMuatPrivateFee: 0,
    rkbmMuatPublicFee: 350000,
    pnbpBarangType: "Gratis",
    pnbpPengawasanType: "Gratis",
    status: "Aktif",
    notes: "Tarif RKBM Muara Berau TBD (MOM 11 Nov 2026)",
  },
  // 4. LAYANAN RKBM - Muara Jawa (Template Siap Pakai)
  {
    id: "RATE-RKBM-002",
    service: "LAYANAN RKBM MUAT/BONGKAR/MUAT & BONGKAR",
    location: "Muara Jawa",
    customerId: "CEP",
    customerName: "PT CEP",
    rkbmBongkarFee: 500000,
    rkbmMuatPrivateFee: 0,
    rkbmMuatPublicFee: 350000,
    pnbpBarangType: "Gratis",
    pnbpPengawasanType: "Gratis",
    status: "Aktif",
    notes: "Tarif RKBM Muara Jawa (MOM 11 Nov 2026)",
  },
  // 5. JASA PENGAWASAN KEPABEANAN & COO
  {
    id: "RATE-CUST-001",
    service: "JASA PENGAWASAN KEPABEANAN & COO",
    location: "Muara Berau",
    customerId: "ALFARA",
    customerName: "PT ADP",
    kepabeananFee: 12000000,
    cooFee: 2000000,
    status: "Aktif",
    notes: "Kepabeanan 12jt, COO 2jt",
  },
];

export const getContractRatesFromStorage = (): CustomerContractRate[] => {
  try {
    const raw = localStorage.getItem(CONTRACT_RATES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return CONTRACT_RATES_DATABASE;
};

export const saveContractRatesToStorage = (
  rates: CustomerContractRate[],
): void => {
  try {
    localStorage.setItem(CONTRACT_RATES_STORAGE_KEY, JSON.stringify(rates));
  } catch {
    // ignore
  }
};

export const getContractRateByCustomerAndService = (
  customerName: string,
  service?: string,
  location?: string,
): CustomerContractRate | undefined => {
  const allRates = getContractRatesFromStorage();
  return (
    allRates.find((r) => {
      const matchCust =
        r.customerName.toLowerCase() === customerName.toLowerCase() ||
        r.customerId.toLowerCase() === customerName.toLowerCase();
      const matchService = !service || r.service === service;
      const matchLocation = !location || !r.location || r.location === location;
      return matchCust && matchService && matchLocation;
    }) ||
    allRates.find(
      (r) =>
        r.customerName.toLowerCase() === customerName.toLowerCase() ||
        r.customerId.toLowerCase() === customerName.toLowerCase(),
    )
  );
};

/**
 * Tarif Standar Reimbursement PNBP
 */
export const PNBP_CONFIG = {
  barangInternasionalPerTon: 700, // Ekspor / Impor
  barangLokalPerTon: 350, // Domestik
  pengawasanBongkarMuatPerTon: 54, // 54 rupiah/MT
};

/**
 * Mencari tarif kontrak customer aktif berdasarkan nama customer
 */
export const getContractRateByCustomer = (
  customerName: string,
): CustomerContractRate | undefined => {
  const rates = getContractRatesFromStorage();
  return rates.find(
    (rate) =>
      rate.status !== "Nonaktif" &&
      (customerName.toLowerCase().includes(rate.customerId.toLowerCase()) ||
        customerName.toLowerCase().includes(rate.customerName.toLowerCase()) ||
        rate.customerName.toLowerCase().includes(customerName.toLowerCase())),
  );
};

/**
 * Helper kalkulasi otomatis Reimbursement PNBP
 */
export const calculatePnbp = (
  activityType: "Ekspor" | "Domestik" | "Impor",
  volumeTon: number,
) => {
  const isInternasional = activityType === "Ekspor" || activityType === "Impor";
  const rateBarang = isInternasional
    ? PNBP_CONFIG.barangInternasionalPerTon
    : PNBP_CONFIG.barangLokalPerTon;

  const pnbpBarang = Math.round(volumeTon * rateBarang);
  const pnbpPengawasan = Math.round(
    volumeTon * PNBP_CONFIG.pengawasanBongkarMuatPerTon,
  );
  const totalPnbp = pnbpBarang + pnbpPengawasan;

  return {
    rateBarang,
    pnbpBarang,
    ratePengawasan: PNBP_CONFIG.pengawasanBongkarMuatPerTon,
    pnbpPengawasan,
    totalPnbp,
  };
};
