import * as yup from "yup";

export const orderSchema = yup.object({
  customer: yup.string().required("Customer wajib dipilih"),
  // End User: Wajib kecuali layanan Pengurusan Kepabeanan dan COO
  endUser: yup.string().when("service", {
    is: (svc: string) => svc === "Pengurusan Kepabeanan dan COO",
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.required("End User wajib dipilih"),
  }),
  // Mother Vessel: Wajib untuk PBM & RKBM, opsional untuk Kepabeanan & COO
  vessel: yup.string().when("service", {
    is: (svc: string) => svc === "Pengurusan Kepabeanan dan COO",
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.required("Nama Vessel wajib diisi"),
  }),
  // Jenis Kegiatan: Wajib kecuali Kepabeanan & COO
  activityType: yup.string().when("service", {
    is: (svc: string) => svc === "Pengurusan Kepabeanan dan COO",
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.required("Jenis kegiatan wajib dipilih"),
  }),
  service: yup.string().required("Layanan order wajib dipilih"),
  pol: yup.string().required("POL (Port of Loading) wajib dipilih"),
  pod: yup.string().required("POD (Port of Discharge) wajib dipilih"),
  startDate: yup.string().required("Tanggal pekerjaan wajib diisi"),
  estimatedTonnage: yup
    .string()
    .required("Estimasi tonase wajib diisi")
    .test("min-tonnage", "Estimasi tonase harus lebih dari 0 MT", (val) => {
      if (!val) {return false;}
      const num = Number(val.replace(/\./g, ""));
      return !isNaN(num) && num > 0;
    }),
  customerPic: yup.string().required("PIC Customer wajib diisi"),
  notes: yup.string().optional(),

  // Field Armada: Tug Boat & Barge Mandatory untuk Kepabeanan & COO
  tugBoat: yup.string().when("service", {
    is: (svc: string) => svc === "Pengurusan Kepabeanan dan COO",
    then: (schema) => schema.required("Nama Kapal (Tug Boat) wajib diisi untuk Kepabeanan & COO"),
    otherwise: (schema) => schema.optional(),
  }),
  bargeNomination: yup.string().when("service", {
    is: (svc: string) => svc === "Pengurusan Kepabeanan dan COO",
    then: (schema) => schema.required("Barge (Tongkang) wajib diisi untuk Kepabeanan & COO"),
    otherwise: (schema) => schema.optional(),
  }),
  shipmentType: yup.string().required("Kategori muatan (Shipment) wajib dipilih"),

  // Khusus Layanan Pengurusan RKBM
  rkbmType: yup.string().optional(),

  // Khusus Layanan Jasa PBM & Kepabeanan
  kegiatanLokasi: yup.string().optional(),
  polJettyType: yup.string().optional(),
  rateType: yup.string().optional(),
  customRatePerTon: yup.string().optional(),

  // Khusus Layanan Kepabeanan & COO
  includeCoo: yup.boolean().optional(),
  spotRateAmount: yup.string().optional(),
});

export type OrderFormData = yup.InferType<typeof orderSchema>;
