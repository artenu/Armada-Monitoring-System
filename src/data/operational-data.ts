import type { OperationalTabConfig } from "@/types";
import { AGENT_OPTIONS } from "@/data/mock-data";
import { INITIAL_MASTER_DATA } from "@/data/master-mock";
import type { OperationalDocumentConfig } from "@/types";

export const OPERATIONAL_TAB_CONFIGS: OperationalTabConfig[] = [
  { id: "all", label: "Semua" },
  { id: "pending_rkbm", label: "Menunggu RKBM" },
  { id: "loading", label: "Proses Ops" },
  { id: "completed", label: "Selesai Ops" },
];

export const getMasterAgentList = (): string[] => {
  try {
    const raw = localStorage.getItem("gds_master_data_v1");
    if (raw) {
      const parsed = JSON.parse(raw) as {
        agen?: Array<{ nama: string; status: string }>;
      };
      if (Array.isArray(parsed.agen) && parsed.agen.length > 0) {
        return parsed.agen
          .filter((item) => item.status === "Aktif")
          .map((item) => item.nama);
      }
    }
  } catch {
    // fallback
  }
  return [...AGENT_OPTIONS];
};

export const getMasterLocationList = (): string[] => {
  try {
    const raw = localStorage.getItem("gds_master_data_v1");
    if (raw) {
      const parsed = JSON.parse(raw) as {
        lokasi?: Array<{ nama: string; status: string }>;
      };
      if (Array.isArray(parsed.lokasi) && parsed.lokasi.length > 0) {
        return parsed.lokasi
          .filter((item) => item.status === "Aktif")
          .map((item) => item.nama);
      }
    }
  } catch {
    // fallback
  }
  return INITIAL_MASTER_DATA.lokasi.map((item) => item.nama);
};

export const OPERATIONAL_DOCUMENTS_CONFIG: OperationalDocumentConfig[] = [
  {
    key: "hasSkab",
    id: "chk-skab",
    label: "SKAB",
    description: "Surat Keterangan Asal Barang",
  },
  {
    key: "hasSkb",
    id: "chk-skb",
    label: "SKB",
    description: "Surat Keterangan Bebas",
  },
  {
    key: "hasRoyalty",
    id: "chk-royalty",
    label: "Royalty ESDM",
    description: "Bukti Setor Royalty",
  },
  {
    key: "hasLhv",
    id: "chk-lhv",
    label: "LHV",
    description: "Laporan Hasil Verifikasi",
  },
  {
    key: "hasBo",
    id: "chk-bo",
    label: "Booking Order BUP",
    description: "Pemesanan Jasa Pelabuhan BUP",
  },
];
