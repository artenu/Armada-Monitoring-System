import type { JobMasterOptions } from "@/types";
import { INITIAL_MASTER_DATA } from "@/data/master-mock";

/**
 * 1. Helper membaca list data master aktif dari localStorage dengan fallback aman
 */
export const getMasterListFromStorage = (
  key: "customer" | "tug-boat" | "barge" | "lokasi" | "pol" | "pod",
  fallback: string[],
): string[] => {
  try {
    const raw = localStorage.getItem("gds_master_data_v3");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed[key]) && parsed[key].length > 0) {
        return parsed[key]
          .filter((item: { status: string }) => item.status === "Aktif")
          .map((item: { nama: string }) => item.nama);
      }
    }
  } catch {
    // fallback
  }
  return fallback;
};

/**
 * 2. Ambil seluruh opsi master data untuk form pekerjaan/order
 */
export const loadJobMasterOptions = (): JobMasterOptions => {
  let customerList = INITIAL_MASTER_DATA.customer;
  try {
    const raw = localStorage.getItem("gds_master_data_v3");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.customer) && parsed.customer.length > 9) {
        customerList = parsed.customer.filter(
          (item: { status: string }) => item.status === "Aktif",
        );
      }
    }
  } catch {
    // fallback
  }

  return {
    customerList,
    tugList: getMasterListFromStorage(
      "tug-boat",
      INITIAL_MASTER_DATA["tug-boat"].map((i) => i.nama),
    ),
    bargeList: getMasterListFromStorage(
      "barge",
      INITIAL_MASTER_DATA.barge.map((i) => i.nama),
    ),
    polList: getMasterListFromStorage("pol", [
      "Muara Berau",
      "Muara Jawa",
      "Jetty BET",
    ]),
    podList: getMasterListFromStorage("pod", [
      "PLTU Muara Jawa",
      "PLTU Paiton",
      "Taboneo STS",
      "Cigading Port",
    ]),
    lokasiList: getMasterListFromStorage(
      "lokasi",
      INITIAL_MASTER_DATA.lokasi.map((i) => i.nama),
    ),
  };
};
