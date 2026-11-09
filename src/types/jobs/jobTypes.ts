import type { OperationalOrderFields } from "@/types/Operational/operationalTypes";
import type { FinanceOrderFields } from "@/types/finance/financeTypes";
import type { MasterItem } from "@/types/master/master-data";

export interface SalesOrderFields {
  id: string;
  vessel: string; // Mother Vessel (MV LARUS, dll)
  customer: string;
  endUser: string;
  activityType: "Ekspor" | "Domestik" | "Impor";
  service:
    | "Jasa PBM"
    | "Pengurusan RKBM"
    | "Pengurusan Kepabeanan dan COO"
    | string;
  pol: string;
  pod: string;
  dropPoint: string;
  startDate: string;
  estimatedTonnage: number;
  customerPic?: string;
  notes?: string;

  // --- Inputan Armada yang Dipindahkan dari Operasional ke Sales ---
  tugBoat?: string; // Nama Kapal
  bargeNomination?: string; // Barge / Tongkang
  shipmentType?: string; // Tipe pengapalan (misal: KS)

  // --- Khusus Layanan Pengurusan RKBM ---
  rkbmType?: "Bongkar" | "Muat" | "Muat & Bongkar"; // Validasi RKBM Bongkar atau Muat
  rkbmDocName?: string; // Berkas RKBM Muat (atau Utama)
  rkbmDocUrl?: string;
  rkbmBongkarDocName?: string; // Berkas RKBM Bongkar (khusus opsi Muat & Bongkar)
  rkbmBongkarDocUrl?: string;

  // --- Khusus Layanan Jasa PBM & Dokumen Sales ---
  spDocName?: string; // Surat Penunjukan / SI
  spDocUrl?: string;
  kegiatanLokasi?: string;
  polJettyType?: "Private" | "Public";

  // --- Tipe Tarif ---
  rateType?: "Contract" | "Spot";
  customRatePerTon?: number;
}

export type OrderStatus =
  | "Draft Sales"
  | "Operational"
  | "Proses Muat"
  | "Selesai Muat"
  | "Siap Ditagihkan"
  | "Menunggu Pembayaran"
  | "Terkirim"
  | "Diterima"
  | "Lunas";

export interface OrderItem
  extends SalesOrderFields, OperationalOrderFields, FinanceOrderFields {
  status: OrderStatus;
}

export interface JobStats {
  total: number;
  readyToBill: number;
  loading: number;
  completed: number;
}

export interface JobSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export interface JobTableProps {
  orders: OrderItem[];
  onSendToOperational: (orderId: string) => void;
  onEdit: (orderId: string) => void;
  onDelete: (orderId: string) => void;
}

import type { OrderFormData } from "@/features/jobs/schema/order-schema";

export interface CreateOrderModalFiles {
  spDocName?: string;
  spDocUrl?: string;
  rkbmDocName?: string;
  rkbmDocUrl?: string;
  rkbmBongkarDocName?: string;
  rkbmBongkarDocUrl?: string;
}

export interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (data: OrderFormData, files: CreateOrderModalFiles) => void;
  initialData?: OrderItem | null;
}

export interface JobMasterOptions {
  customerList: MasterItem[];
  tugList: string[];
  bargeList: string[];
  polList: string[];
  podList: string[];
  lokasiList: string[];
}

export interface ValidateFilesParams {
  data: OrderFormData;
  spFile: File | null;
  rkbmFile: File | null;
  rkbmBongkarFile: File | null;
  isEdit: boolean;
}

export interface BuildFilesParams {
  spFile: File | null;
  rkbmFile: File | null;
  rkbmBongkarFile: File | null;
  initialData?: OrderItem | null;
}

export interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (
    data: OrderFormData,
    files: {
      spDocName?: string;
      spDocUrl?: string;
      rkbmDocName?: string;
      rkbmDocUrl?: string;
      rkbmBongkarDocName?: string;
      rkbmBongkarDocUrl?: string;
    },
  ) => void;
  initialData?: OrderItem | null;
}
