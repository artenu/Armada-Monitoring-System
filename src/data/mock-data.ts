import type { OrderItem } from "@/types";

// Pilihan Layanan Order (Sesuai Revisi Bos: PNBP sudah di-takedown)
// 4 Layanan Resmi Sesuai MOM 11 Nov 2026
export const SERVICE_OPTIONS = [
  "LAYANAN PBM",
  "LAYANAN RKBM MUAT/BONGKAR/MUAT & BONGKAR",
  "LAYANAN JASA VENDER & MURING",
  "JASA PENGAWASAN KEPABEANAN & COO",
] as const;

export type ServiceType = (typeof SERVICE_OPTIONS)[number];

// Helper kompatibilitas untuk mendeteksi kategori layanan di seluruh sistem
export const isPbmService = (service?: string) =>
  service === "LAYANAN PBM" || service === "Jasa PBM";

export const isRkbmService = (service?: string) =>
  service === "LAYANAN RKBM MUAT/BONGKAR/MUAT & BONGKAR" ||
  service === "Pengurusan RKBM";

export const isFenderMooringService = (service?: string) =>
  service === "LAYANAN JASA VENDER & MURING" ||
  service === "Jasa Vender & Muring";

export const isCustomsService = (service?: string) =>
  service === "JASA PENGAWASAN KEPABEANAN & COO" ||
  service === "Pengurusan Kepabeanan dan COO";

export const CUSTOMER_END_USER_OPTIONS = [
  "PT ADP",
  "PT ACI",
  "PT CEP",
  "PT AMP",
  "PT KS",
  "PT MRM",
  "PT MP",
  "PT BUP PTB",
  "PT ZADIN",
] as const;

export const CUSTOMER_OPTIONS = CUSTOMER_END_USER_OPTIONS;
export const END_USER_OPTIONS = CUSTOMER_END_USER_OPTIONS;

export const POL_OPTIONS = [
  "Muara Berau",
  "Muara Jawa",
  "Jetty BET",
  "Anchorage Samarinda",
] as const;

export const POD_OPTIONS = [
  "PLTU Muara Jawa",
  "PLTU Paiton",
  "Cigading Port",
  "PLTU Tanjung Jati B",
  "Pelabuhan Tanjung Perak",
  "Taboneo STS",
] as const;

// Data awal diambil persis dari baris riil sheet Monrep RKBM
export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "JOB-2026-001",
    rkbmNo: "SL004.IDSRI.0126.000425",
    bargeNomination: "TB. HARMONY XIX / BG. LINTAS SAMUDERA 88",
    vessel: "MV LARUS",
    customer: "CEP",
    endUser: "CEP",
    activityType: "Ekspor",
    service: "Jasa PBM",
    pol: "Muara Berau",
    pod: "Taboneo STS",
    dropPoint: "Muara Berau → Taboneo STS",
    startDate: "2026-01-05",
    estimatedTonnage: 7300,
    finalDsr: 7300.83,
    vesselCompleteDate: "2026-01-23",
    status: "Lunas",
    invoiceNo: "049/21012026/AMP/ALI",
    totalInvoice: 2580980,
  },
  {
    id: "JOB-2026-002",
    rkbmNo: "SL004.IDSRI.0126.000424",
    bargeNomination: "TB. HARMONY XXVII / BG. LINTAS SAMUDERA 139",
    vessel: "MV LARUS",
    customer: "CEP",
    endUser: "CEP",
    activityType: "Ekspor",
    service: "Pengurusan RKBM",
    pol: "Muara Berau",
    pod: "PLTU Paiton",
    dropPoint: "Muara Berau → PLTU Paiton",
    startDate: "2026-01-05",
    estimatedTonnage: 7300,
    finalDsr: 7300.39,
    vesselCompleteDate: "2026-01-23",
    status: "Siap Ditagihkan",
  },
  {
    id: "JOB-2026-003",
    rkbmNo: "SL004.IDSRI.0126.000789",
    bargeNomination: "TB. KARYA STAR 66 / BG. SUMBER SAMUDERA 01",
    vessel: "MV TRANS SPRING",
    customer: "PT Alfara Delta Persada",
    endUser: "PLTU Muara Jawa",
    activityType: "Domestik",
    service: "Jasa PBM",
    pol: "Muara Jawa",
    pod: "PLTU Muara Jawa",
    dropPoint: "Muara Jawa → PLTU Muara Jawa",
    startDate: "2026-01-15",
    estimatedTonnage: 7500,
    status: "Proses Muat",
  },
];

export const DROP_POINT_OPTIONS = ["Muara Berau", "Muara Jawa"] as const;

export const AGENT_OPTIONS = [
  "PT DUTA LINTAS SAMUDERA",
  "PT AYU",
  "PT. REZEKI HUDA BERSAMA",
  "PT LINTAS SAMUDERA ENERGI",
] as const;

export const OPERATIONAL_STATUS_PRESETS = [
  "Sailing to samarinda",
  "Stanbay waiting info sandar jetty",
  "Stndby waiting Doc spog",
  "Tambat waiting info muat",
  "Tambat waiting air pasang",
  "Stanby pangkalan",
  "Sailing to muara",
] as const;

export const SHIPMENT_CATEGORY_OPTIONS = [
  "Batu Bara",
  "Batu Split",
  "Alat Berat",
  "Lainnya",
] as const;
export type ShipmentCategory = (typeof SHIPMENT_CATEGORY_OPTIONS)[number];
