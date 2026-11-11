import type {
  OrderItem,
  CreateOrderModalFiles,
  BuildFilesParams,
} from "@/types";
import type { MasterItem } from "@/types/master/master-data";
import { calculatePnbp } from "@/data/pricing-data";
import type { OrderFormData } from "../schema/order-schema";

/**
 * 1. Mapping nilai default atau nilai awal dari initialData
 */
export const getDefaultOrderFormValues = (
  initialData?: OrderItem | null,
): OrderFormData => {
  if (initialData) {
    return {
      customer: initialData.customer,
      endUser: initialData.endUser || "",
      vessel: initialData.vessel || "",
      activityType: initialData.activityType || "Domestik",
      service: initialData.service,
      pol: initialData.pol,
      pod: initialData.pod,
      startDate: initialData.startDate,
      estimatedTonnage: new Intl.NumberFormat("id-ID").format(
        initialData.estimatedTonnage,
      ),
      customerPic: initialData.customerPic || "",
      notes: initialData.notes || "",
      tugBoat: initialData.tugBoat || "",
      bargeNomination: initialData.bargeNomination || "",
      shipmentType: initialData.shipmentType || "Batu Bara",
      rkbmType: initialData.rkbmType || "Muat",
      kegiatanLokasi: initialData.kegiatanLokasi || "Muara Berau",
      polJettyType: initialData.polJettyType || "Private",
      rateType: initialData.rateType || "Contract",
      customRatePerTon: initialData.customRatePerTon
        ? String(initialData.customRatePerTon)
        : "",
      includeCoo: initialData.includeCoo ?? false,
      spotRateAmount: initialData.spotRateAmount
        ? String(initialData.spotRateAmount)
        : "",
    };
  }

  return {
    customer: "",
    endUser: "",
    vessel: "",
    activityType: "Domestik",
    service: "Jasa PBM",
    pol: "",
    pod: "",
    startDate: "",
    estimatedTonnage: "",
    customerPic: "",
    notes: "",
    tugBoat: "",
    bargeNomination: "",
    shipmentType: "Batu Bara",
    rkbmType: "Muat",
    kegiatanLokasi: "Muara Berau",
    polJettyType: "Private",
    rateType: "Contract",
    customRatePerTon: "",
    includeCoo: false,
    spotRateAmount: "",
  };
};

/**
 * 2. Rakit payload objek file (nama & URL preview)
 */
export const buildOrderFilesPayload = ({
  spFile,
  rkbmFile,
  rkbmBongkarFile,
  suratPenunjukanFile,
  suratPermohonanFile,
  suratPernyataanFile,
  initialData,
}: BuildFilesParams): CreateOrderModalFiles => {
  return {
    spDocName: spFile ? spFile.name : initialData?.spDocName,
    spDocUrl: spFile ? URL.createObjectURL(spFile) : initialData?.spDocUrl,
    rkbmDocName: rkbmFile ? rkbmFile.name : initialData?.rkbmDocName,
    rkbmDocUrl: rkbmFile
      ? URL.createObjectURL(rkbmFile)
      : initialData?.rkbmDocUrl,
    rkbmBongkarDocName: rkbmBongkarFile
      ? rkbmBongkarFile.name
      : initialData?.rkbmBongkarDocName,
    rkbmBongkarDocUrl: rkbmBongkarFile
      ? URL.createObjectURL(rkbmBongkarFile)
      : initialData?.rkbmBongkarDocUrl,
    // 3 Dokumen Persyaratan KSOP untuk RKBM
    rkbmSuratPenunjukanDocName: suratPenunjukanFile
      ? suratPenunjukanFile.name
      : initialData?.rkbmSuratPenunjukanDocName,
    rkbmSuratPenunjukanDocUrl: suratPenunjukanFile
      ? URL.createObjectURL(suratPenunjukanFile)
      : initialData?.rkbmSuratPenunjukanDocUrl,
    rkbmSuratPermohonanDocName: suratPermohonanFile
      ? suratPermohonanFile.name
      : initialData?.rkbmSuratPermohonanDocName,
    rkbmSuratPermohonanDocUrl: suratPermohonanFile
      ? URL.createObjectURL(suratPermohonanFile)
      : initialData?.rkbmSuratPermohonanDocUrl,
    rkbmSuratPernyataanDocName: suratPernyataanFile
      ? suratPernyataanFile.name
      : initialData?.rkbmSuratPernyataanDocName,
    rkbmSuratPernyataanDocUrl: suratPernyataanFile
      ? URL.createObjectURL(suratPernyataanFile)
      : initialData?.rkbmSuratPernyataanDocUrl,
  };
};

/**
 * 3. Hitung estimasi PNBP untuk preview
 */
export const computePnbpPreview = (
  activityType?: string,
  rawTonnage?: string,
) => {
  const numTonnage = Number((rawTonnage || "").replace(/\./g, "")) || 0;
  if (numTonnage <= 0) {return null;}
  return calculatePnbp(
    (activityType as "Ekspor" | "Domestik" | "Impor") || "Domestik",
    numTonnage,
  );
};

/**
 * 4. Cari PIC Customer otomatis
 */
export const findCustomerPic = (
  customerName: string,
  customerList: MasterItem[],
): string | undefined => {
  return customerList.find((c) => c.nama === customerName)?.picName;
};
