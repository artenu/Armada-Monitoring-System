import type { OrderItem, JobStats } from "@/types";
import {
  getContractRateByCustomerAndService,
  getContractRateByCustomer,
} from "@/data/pricing-data";
import type { OrderFormData } from "@/features/jobs/schema/order-schema";

/**
 * 1. Hitung 4 Metrik KPI Cepat Divisi Sales
 */
export const computeJobStats = (orders: OrderItem[]): JobStats => {
  return {
    total: orders.length,
    readyToBill: orders.filter((o) => o.status === "Siap Ditagihkan").length,
    loading: orders.filter(
      (o) => o.status === "Proses Muat" || o.status === "Operational",
    ).length,
    completed: orders.filter((o) => o.status === "Lunas").length,
  };
};

/**
 * 2. Filter pesanan berdasarkan kata kunci pencarian
 */
export const filterJobs = (
  orders: OrderItem[],
  searchQuery: string,
): OrderItem[] => {
  if (!searchQuery.trim()) {
    return orders;
  }
  const q = searchQuery.toLowerCase();

  return orders.filter(
    (item) =>
      item.id.toLowerCase().includes(q) ||
      (item.vessel || "").toLowerCase().includes(q) ||
      item.customer.toLowerCase().includes(q) ||
      (item.bargeNomination || "").toLowerCase().includes(q),
  );
};

/**
 * 3. Builder pembuatan payload OrderItem baru dari Form Modal
 */
export const buildNewOrder = (
  data: OrderFormData,
  files: {
    spDocName?: string;
    spDocUrl?: string;
    rkbmDocName?: string;
    rkbmDocUrl?: string;
    rkbmBongkarDocName?: string;
    rkbmBongkarDocUrl?: string;
    rkbmSuratPenunjukanDocName?: string;
    rkbmSuratPenunjukanDocUrl?: string;
    rkbmSuratPermohonanDocName?: string;
    rkbmSuratPermohonanDocUrl?: string;
    rkbmSuratPernyataanDocName?: string;
    rkbmSuratPernyataanDocUrl?: string;
  },
  orderCount: number,
): OrderItem => {
  const armadaName =
    data.tugBoat && data.bargeNomination
      ? `${data.tugBoat} / ${data.bargeNomination}`
      : data.tugBoat || data.bargeNomination || "Menunggu Plotting Tongkang";

  // Lookup Kontrak Aktif Sesuai Layanan & Lokasi
  const location = data.pol?.toLowerCase().includes("jawa")
    ? "Muara Jawa"
    : "Muara Berau";
  const contract =
    getContractRateByCustomerAndService(
      data.customer,
      data.service,
      location,
    ) || getContractRateByCustomer(data.customer);

  return {
    id: `JOB-2026-${String(orderCount + 1).padStart(3, "0")}`,
    rkbmNo: "-",
    vessel: data.vessel || "",
    tugBoat: data.tugBoat,
    bargeNomination: armadaName,
    shipmentType: data.shipmentType || "Batu Bara",
    customer: data.customer,
    endUser: data.endUser || "-",
    activityType: (data.activityType || "Domestik") as
      | "Ekspor"
      | "Domestik"
      | "Impor",
    service: data.service,
    rkbmType: (data.rkbmType || "Muat") as "Bongkar" | "Muat",
    rkbmDocName: files.rkbmDocName,
    rkbmDocUrl: files.rkbmDocUrl,
    rkbmBongkarDocName: files.rkbmBongkarDocName,
    rkbmBongkarDocUrl: files.rkbmBongkarDocUrl,
    rkbmSuratPenunjukanDocName: files.rkbmSuratPenunjukanDocName,
    rkbmSuratPenunjukanDocUrl: files.rkbmSuratPenunjukanDocUrl,
    rkbmSuratPermohonanDocName: files.rkbmSuratPermohonanDocName,
    rkbmSuratPermohonanDocUrl: files.rkbmSuratPermohonanDocUrl,
    rkbmSuratPernyataanDocName: files.rkbmSuratPernyataanDocName,
    rkbmSuratPernyataanDocUrl: files.rkbmSuratPernyataanDocUrl,
    includeCoo: data.includeCoo,
    spotRateAmount: data.spotRateAmount
      ? Number(data.spotRateAmount)
      : undefined,
    spDocName: files.spDocName,
    spDocUrl: files.spDocUrl,
    pol: data.pol,
    pod: data.pod,
    dropPoint: `${data.pol} → ${data.pod}`,
    polJettyType: data.polJettyType as "Private" | "Public",
    kegiatanLokasi: data.kegiatanLokasi,
    rateType: data.rateType as "Contract" | "Spot",
    customRatePerTon: data.customRatePerTon
      ? Number(data.customRatePerTon)
      : undefined,
    // Integrasi Master Kontrak ke Order Baru
    contractNo: data.rateType === "Contract" ? contract?.contractNo : undefined,
    chargeUnit: contract?.chargeUnit,
    fenderFee: contract?.fenderFee,
    mooringFee: contract?.mooringFee,
    fenderMooringFee:
      (contract?.fenderFee ?? 0) + (contract?.mooringFee ?? 0) ||
      contract?.fenderMooringFee,
    startDate: data.startDate,
    estimatedTonnage: Number(data.estimatedTonnage.replace(/\./g, "")) || 0,
    customerPic: data.customerPic,
    notes: data.notes,
    status: "Draft Sales",
  };
};
