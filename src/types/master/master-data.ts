import type { LucideIcon } from "lucide-react";
import type { CustomerContractRate } from "../finance/financeTypes";

export type MasterResourceKey =
  | "customer"
  | "tug-boat"
  | "barge"
  | "lokasi"
  | "pol"
  | "pod"
  | "agen"
  | "drop-point";

export type TabKey = MasterResourceKey | "tarif";

export interface TabItem {
  key: TabKey;
  label: string;
  icon: LucideIcon;
}

export interface MasterItem {
  id: string;
  kode: string;
  nama: string;
  subDetail?: string; // NPWP (Customer), Owner/HP (Tug), Feet (Barge), Keterangan Area (Lokasi)
  kontak?: string; // No HP / Telepon PIC
  picName?: string; // Khusus Customer: Nama Lengkap PIC
  npwpDocName?: string; // Nama file dokumen/PDF NPWP
  npwpDocUrl?: string; // URL dokumen PDF NPWP
  status: "Aktif" | "Nonaktif";
}

export interface MasterConfig {
  label: string;
  prefix: string;
  subDetailLabel: string;
  subDetailPlaceholder: string;
}

export interface MasterFormData {
  nama: string;
  subDetail: string;
  kontak: string;
  picName: string;
  npwpDocName: string;
  npwpDocUrl: string;
  status: "Aktif" | "Nonaktif";
}

export interface ContractRateFormData {
  customerId: string;
  customerName: string;
  pbmRatePerTon?: number;
  rkbmBongkarFee?: number;
  rkbmMuatPrivateFee?: number;
  rkbmMuatPublicFee?: number;
  kepabeananFee?: number;
  cooFee?: number;
  notes: string;
  status: "Aktif" | "Nonaktif";
}

export interface NpwpPreviewData {
  customerName: string;
  docName: string;
  docUrl: string;
}

export interface ContractRateTableProps {
  contracts: CustomerContractRate[];
  onEdit: (rate: CustomerContractRate) => void;
  onDelete: (id?: string) => void;
}
