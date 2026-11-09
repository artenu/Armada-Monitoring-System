import type { BillingTabConfig } from "@/types";

/**
 * Konfigurasi Tab Filter Halaman Billing (Finance)
 */
export const BILLING_TAB_CONFIGS: BillingTabConfig[] = [
  {
    id: "all",
    label: "Semua Tagihan",
    activeClass: "bg-slate-900 text-white",
  },
  {
    id: "ready_to_bill",
    label: "Siap Ditagihkan",
    activeClass: "bg-amber-600 text-white",
  },
  {
    id: "sent",
    label: "Terkirim",
    activeClass: "bg-blue-600 text-white",
  },
  {
    id: "received",
    label: "Diterima",
    activeClass: "bg-purple-600 text-white",
  },
  {
    id: "paid",
    label: "Lunas",
    activeClass: "bg-emerald-600 text-white",
  },
];
