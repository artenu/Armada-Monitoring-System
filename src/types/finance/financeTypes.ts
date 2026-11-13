import type { OrderItem } from "@/types";

// 3 Status Proses Siklus Finance sesuai MOM
export type BillingStatus =
  | "Siap Ditagihkan"
  | "Terkirim"
  | "Diterima"
  | "Lunas";

export type BillingTab =
  | "all"
  | "ready_to_bill"
  | "pending_payment"
  | "sent"
  | "received"
  | "paid";

export interface FinanceOrderFields {
  invoiceNo?: string;
  invoiceDate?: string;
  dueDate?: string;
  rateType?: "Contract" | "Spot";
  ratePerTon?: number;
  subtotalJasa?: number;
  subtotalInvoice?: number;
  additionalFee?: number;
  rkbmFee?: number;
  kepabeananFee?: number;
  cooFee?: number;
  ppnAmount?: number;
  pnbpBarangAmount?: number;
  pnbpPengawasanAmount?: number;
  totalPnbpReimbursement?: number;
  totalInvoice?: number;
  invoiceDocUrl?: string;
  invoiceDocName?: string;
  accurateSyncNotes?: string;
  sentDate?: string;
  receivedDate?: string;
  paymentDate?: string;
  paymentNotes?: string;
}

export interface InvoicePayload {
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  ratePerTon: number;
  additionalFee?: number;
  rkbmFee?: number;
  kepabeananFee?: number;
  cooFee?: number;
  subtotalJasa?: number;
  subtotalInvoice?: number;
  ppnAmount: number;
  pnbpBarangAmount?: number;
  pnbpPengawasanAmount?: number;
  totalPnbpReimbursement?: number;
  totalInvoice: number;
  invoiceDocUrl?: string;
  invoiceDocName?: string;
  accurateSyncNotes?: string;
}

// Data Kontrak Tarif per Customer (Lengkap dengan ID, Catatan, & Status)
// Data Kontrak Tarif per Layanan & Lokasi Sesuai MOM 11 Nov 2026
export interface CustomerContractRate {
  id?: string;
  customerId: string;
  customerName: string;
  service?: string;
  location?: string;
  pbmRatePerTon?: number;
  pnbpBarangType?: "Gratis" | "Standar" | "Nominal" | string;
  pnbpPengawasanType?: "Gratis" | "Standar" | "Nominal" | string;
  pnbpBarangAmount?: number;
  pnbpPengawasanAmount?: number;
  rkbmBongkarFee?: number;
  rkbmMuatPrivateFee?: number;
  rkbmMuatPublicFee?: number;
  fenderMooringFee?: number;
  kepabeananFee?: number;
  cooFee?: number;
  invoiceDocUrl?: string;
  invoiceDocName?: string;
  notes?: string;
  status?: "Aktif" | "Nonaktif";
}

export interface ProcessInvoiceModalProps {
  order: OrderItem;
  onClose: () => void;
  onSave: (payload: InvoicePayload) => void;
}

export interface ProcessInvoiceModalProps {
  order: OrderItem;
  onClose: () => void;
  onSave: (payload: InvoicePayload) => void;
}

export interface InvoiceSlipModalProps {
  order: OrderItem;
  onClose: () => void;
}

export interface ConfirmPaymentModalProps {
  order: OrderItem;
  onClose: () => void;
  onConfirm: (paymentDate: string, paymentNotes: string) => void;
}

export interface BillingFilterBarProps {
  activeTab: BillingTab;
  onTabChange: (tab: BillingTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  stats: {
    readyToBillCount: number;
    sentCount: number;
    receivedCount: number;
    paidCount: number;
  };
}

export interface BillingTabConfig {
  id: BillingTab;
  label: string;
  activeClass: string;
}

export interface BillingTableProps {
  orders: OrderItem[];
  onSelectForInvoice: (order: OrderItem) => void;
  onSelectForPrint: (order: OrderItem) => void;
  onSelectForPay: (order: OrderItem) => void;
  onMarkAsReceived: (orderId: string) => void;
}
