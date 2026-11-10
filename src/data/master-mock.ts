import type { MasterItem, MasterResourceKey } from "@/types/master/master-data";

export const MASTER_CONFIGS: Record<
  MasterResourceKey,
  {
    label: string;
    prefix: string;
    subDetailLabel: string;
    subDetailPlaceholder: string;
  }
> = {
  customer: {
    label: "Customer",
    prefix: "CUST",
    subDetailLabel: "NPWP",
    subDetailPlaceholder: "Contoh: 01.234.567.8-901.000",
  },
  "tug-boat": {
    label: "Tug Boat",
    prefix: "TB",
    subDetailLabel: "Owner / Horse Power (HP)",
    subDetailPlaceholder: "Contoh: Armada Group - 2.400 HP",
  },
  barge: {
    label: "Barge (Tongkang)",
    prefix: "BG",
    subDetailLabel: "Owner / Kapasitas Feet",
    subDetailPlaceholder: "Contoh: PT LSE - 300 Feet (8.000 MT)",
  },
  lokasi: {
    label: "Lokasi Operasional",
    prefix: "LOK",
    subDetailLabel: "Tipe / Keterangan Wilayah",
    subDetailPlaceholder: "Contoh: Area Sungai / Muara / Pangkalan",
  },
  "drop-point": {
    label: "Drop Point / Jetty",
    prefix: "LOC",
    subDetailLabel: "Tipe Lokasi / Area",
    subDetailPlaceholder: "Contoh: Area Transhipment STS / Kutai",
  },
  pol: {
    label: "POL (Port of Loading)",
    prefix: "POL",
    subDetailLabel: "Area / Tipe Muat",
    subDetailPlaceholder: "Contoh: Transhipment STS / Jetty Tambang",
  },
  pod: {
    label: "POD (Port of Discharge)",
    prefix: "POD",
    subDetailLabel: "Area / Wilayah Bongkar",
    subDetailPlaceholder: "Contoh: Pembangkit Listrik / Dermaga Industri",
  },
  agen: {
    label: "Agen Kapal",
    prefix: "AGN",
    subDetailLabel: "Wilayah Operasi / Alamat",
    subDetailPlaceholder: "Contoh: Samarinda / Balikpapan / Banjarmasin",
  },
};

export const INITIAL_MASTER_DATA: Record<MasterResourceKey, MasterItem[]> = {
  // 1. Customer (6 Customer Selaras dengan Tarif Kontrak)
  customer: [
    {
      id: "1",
      kode: "ALFARA",
      nama: "PT Alfara Delta Persada",
      subDetail: "01.234.567.8-901.000",
      picName: "Bpk. Hendra Gunawan",
      kontak: "0812-3456-7890",
      status: "Aktif",
    },
    {
      id: "2",
      kode: "AMP",
      nama: "Armada Maritim Perkasa",
      subDetail: "05.678.901.2-345.000",
      picName: "Ibu Maya Sari",
      kontak: "0819-2233-4455",
      status: "Aktif",
    },
    {
      id: "3",
      kode: "CEP",
      nama: "Christian Eka Pratama",
      subDetail: "04.567.890.1-234.000",
      picName: "Bpk. Michael Chen",
      kontak: "0811-5566-7788",
      status: "Aktif",
    },
  ],

  // 2. Tug Boat
  "tug-boat": [
    {
      id: "1",
      kode: "TB-001",
      nama: "TB. HARMONY XIX",
      subDetail: "Armada - 2.400 HP",
      status: "Aktif",
    },
    {
      id: "2",
      kode: "TB-002",
      nama: "TB. HARMONY XXVII",
      subDetail: "Armada - 2.400 HP",
      status: "Aktif",
    },
    {
      id: "3",
      kode: "TB-003",
      nama: "TB. KARYA STAR 66",
      subDetail: "Karya Star - 2.000 HP",
      status: "Aktif",
    },
    {
      id: "4",
      kode: "TB-004",
      nama: "TB. DELTA AYU 58",
      subDetail: "Delta Ayu - 2.200 HP",
      status: "Aktif",
    },
  ],

  // 3. Barge (Tongkang)
  barge: [
    {
      id: "1",
      kode: "BG-001",
      nama: "BG. LINTAS SAMUDERA 88",
      subDetail: "PT LSE - 300 Feet",
      status: "Aktif",
    },
    {
      id: "2",
      kode: "BG-002",
      nama: "BG. LINTAS SAMUDERA 139",
      subDetail: "PT LSE - 300 Feet",
      status: "Aktif",
    },
    {
      id: "3",
      kode: "BG-003",
      nama: "BG. SUMBER SAMUDERA 01",
      subDetail: "Sumber Samudera - 300 Feet",
      status: "Aktif",
    },
    {
      id: "4",
      kode: "BG-004",
      nama: "BG. KALIMANTAN 158",
      subDetail: "Kalimantan - 270 Feet",
      status: "Aktif",
    },
  ],

  // 4. Lokasi Operasional
  lokasi: [
    {
      id: "1",
      kode: "LOK-001",
      nama: "Kalaq",
      subDetail: "Area Sungai Mahakam",
      status: "Aktif",
    },
    {
      id: "2",
      kode: "LOK-002",
      nama: "Tukul",
      subDetail: "Area Sungai Kutai",
      status: "Aktif",
    },
    {
      id: "3",
      kode: "LOK-003",
      nama: "Loa kulu",
      subDetail: "Muatan Kutai Kartanegara",
      status: "Aktif",
    },
    {
      id: "4",
      kode: "LOK-004",
      nama: "Zona IIIB",
      subDetail: "Anchorage STS Samarinda",
      status: "Aktif",
    },
    {
      id: "5",
      kode: "LOK-005",
      nama: "Kampung sebamban",
      subDetail: "Pangkalan Tongkang",
      status: "Aktif",
    },
    {
      id: "6",
      kode: "LOK-006",
      nama: "Royo",
      subDetail: "Jetty Muat",
      status: "Aktif",
    },
    {
      id: "7",
      kode: "LOK-007",
      nama: "J.liang",
      subDetail: "Area Pelayaran",
      status: "Aktif",
    },
    {
      id: "8",
      kode: "LOK-008",
      nama: "T batu",
      subDetail: "Pangkalan Sandar",
      status: "Aktif",
    },
  ],

  // 5. POL (Port of Loading)
  pol: [
    {
      id: "1",
      kode: "POL-001",
      nama: "Muara Berau",
      subDetail: "Transhipment STS",
      status: "Aktif",
    },
    {
      id: "2",
      kode: "POL-002",
      nama: "Muara Jawa",
      subDetail: "Transhipment STS",
      status: "Aktif",
    },
    {
      id: "3",
      kode: "POL-003",
      nama: "Jetty BET",
      subDetail: "Jetty Tambang",
      status: "Aktif",
    },
    {
      id: "4",
      kode: "POL-004",
      nama: "Anchorage Samarinda",
      subDetail: "Labuh Jangkar",
      status: "Aktif",
    },
  ],

  // 6. POD (Port of Discharge)
  pod: [
    {
      id: "1",
      kode: "POD-001",
      nama: "PLTU Muara Jawa",
      subDetail: "Pembangkit Listrik",
      status: "Aktif",
    },
    {
      id: "2",
      kode: "POD-002",
      nama: "PLTU Paiton",
      subDetail: "Pembangkit Listrik",
      status: "Aktif",
    },
    {
      id: "3",
      kode: "POD-003",
      nama: "Cigading Port",
      subDetail: "Pelabuhan Umum",
      status: "Aktif",
    },
    {
      id: "4",
      kode: "POD-004",
      nama: "PLTU Tanjung Jati B",
      subDetail: "Pembangkit Listrik",
      status: "Aktif",
    },
    {
      id: "5",
      kode: "POD-005",
      nama: "Taboneo STS",
      subDetail: "Transhipment",
      status: "Aktif",
    },
  ],

  // 7. Drop Point / Rute
  "drop-point": [
    {
      id: "1",
      kode: "LOC-001",
      nama: "Muara Berau → Taboneo STS",
      subDetail: "Rute Transhipment",
      status: "Aktif",
    },
    {
      id: "2",
      kode: "LOC-002",
      nama: "Muara Berau → PLTU Paiton",
      subDetail: "Rute Paiton",
      status: "Aktif",
    },
    {
      id: "3",
      kode: "LOC-003",
      nama: "Muara Jawa → PLTU Muara Jawa",
      subDetail: "Rute Domestik",
      status: "Aktif",
    },
  ],

  // 8. Agen Kapal
  agen: [
    {
      id: "1",
      kode: "AGN-001",
      nama: "PT DUTA LINTAS SAMUDERA",
      subDetail: "Samarinda & Muara Berau",
      kontak: "0812-3456-7890",
      picName: "Bpk. Hendra",
      status: "Aktif",
    },
    {
      id: "2",
      kode: "AGN-002",
      nama: "PT PELAYARAN BAHTERA SAMUDRA",
      subDetail: "Balikpapan & Banjarmasin",
      kontak: "0813-9876-5432",
      picName: "Bpk. Bambang",
      status: "Aktif",
    },
    {
      id: "3",
      kode: "AGN-003",
      nama: "PT BARUNA RAYA LOGISTICS",
      subDetail: "Kutai Kartanegara",
      kontak: "0821-1122-3344",
      picName: "Ibu Maya",
      status: "Aktif",
    },
    {
      id: "4",
      kode: "AGN-004",
      nama: "PT SAMUDERA INDONESIA",
      subDetail: "Nasional",
      kontak: "0811-5566-7788",
      picName: "Bpk. Arif",
      status: "Aktif",
    },
    {
      id: "5",
      kode: "AGN-005",
      nama: "PT MARINDO PACIFIC",
      subDetail: "Muara Jawa & Samarinda",
      kontak: "0852-3344-5566",
      picName: "Bpk. Doni",
      status: "Aktif",
    },
  ],
};
