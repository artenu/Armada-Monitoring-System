import type { CustomerContractRate } from "@/types/finance/financeTypes";

export const CONTRACT_RATES_STORAGE_KEY = "gds_contract_rates_v1";

/**
 * Data Kontrak Resmi Sesuai MOM 5 November 2026 (Data Awal / Seeder)
 */
export const CONTRACT_RATES_DATABASE: CustomerContractRate[] = [
  {
    id: "RATE-001",
    customerId: "CEP",
    customerName: "CEP",
    pbmRatePerTon: 250, // 250 rupiah/MT
    rkbmBongkarFee: 500000, // 500 ribu per dokumen
    rkbmMuatPrivateFee: 0, // Free di Private Jetty
    rkbmMuatPublicFee: 350000, // 350 ribu jika Public Jetty
    kepabeananFee: 0,
    cooFee: 0,
    status: "Aktif",
    notes: "Kontrak Resmi MOM 5 Nov 2026",
  },
  {
    id: "RATE-002",
    customerId: "ALFARA",
    customerName: "PT Alfara Delta Persada",
    pbmRatePerTon: 490, // 490 rupiah/MT
    rkbmBongkarFee: 0,
    rkbmMuatPrivateFee: 0,
    rkbmMuatPublicFee: 350000,
    kepabeananFee: 0,
    cooFee: 0,
    status: "Aktif",
    notes: "Kontrak Resmi MOM 5 Nov 2026",
  },
  {
    id: "RATE-003",
    customerId: "AMP",
    customerName: "PT Antara Multi Perkasa",
    pbmRatePerTon: 0,
    rkbmBongkarFee: 0,
    rkbmMuatPrivateFee: 0,
    rkbmMuatPublicFee: 0,
    kepabeananFee: 10000000, // 10 juta flat / dokumen
    cooFee: 0, // Sudah include
    status: "Aktif",
    notes: "Flat paket Kepabeanan & COO MOM 5 Nov 2026",
  },
  {
    id: "RATE-004",
    customerId: "ALFA_ENERGY",
    customerName: "Alfa Energy",
    pbmRatePerTon: 0,
    rkbmBongkarFee: 0,
    rkbmMuatPrivateFee: 0,
    rkbmMuatPublicFee: 0,
    kepabeananFee: 12000000, // 12 juta / dokumen
    cooFee: 2000000, // 2 juta / dokumen
    status: "Aktif",
    notes: "Kepabeanan 12jt, COO 2jt MOM 5 Nov 2026",
  },
  {
    id: "RATE-005",
    customerId: "LSE",
    customerName: "PT Lintas Samudera Energi",
    pbmRatePerTon: 300,
    rkbmBongkarFee: 500000,
    rkbmMuatPrivateFee: 0,
    rkbmMuatPublicFee: 350000,
    kepabeananFee: 0,
    cooFee: 0,
    status: "Aktif",
    notes: "Tarif Standar Operasional LSE",
  },
  {
    id: "RATE-006",
    customerId: "BET",
    customerName: "PT Borneo Energy Terminal",
    pbmRatePerTon: 350,
    rkbmBongkarFee: 500000,
    rkbmMuatPrivateFee: 0,
    rkbmMuatPublicFee: 350000,
    kepabeananFee: 0,
    cooFee: 0,
    status: "Aktif",
    notes: "Tarif Standar Operasional BET",
  },
];

/**
 * Helper membaca data tarif kontrak dari localStorage
 */
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

/**
 * Helper menyimpan tarif kontrak ke localStorage
 */
export const saveContractRatesToStorage = (
  rates: CustomerContractRate[],
): void => {
  try {
    localStorage.setItem(CONTRACT_RATES_STORAGE_KEY, JSON.stringify(rates));
  } catch {
    // fallback
  }
};

/**
 * Tarif Standar Reimbursement PNBP Sesuai MOM
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
        customerName.toLowerCase().includes(rate.customerName.toLowerCase())),
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
