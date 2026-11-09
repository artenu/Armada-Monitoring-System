import * as yup from "yup";

export const orderSchema = yup.object({
  customer: yup.string().required("Customer wajib dipilih"),
  endUser: yup.string().required("End User wajib dipilih"),
  vessel: yup.string().required("Nama Vessel wajib diisi"),
  activityType: yup.string().required("Jenis kegiatan wajib dipilih"),
  service: yup.string().required("Layanan order wajib dipilih"),
  pol: yup.string().required("POL (Port of Loading) wajib dipilih"),
  pod: yup.string().required("POD (Port of Discharge) wajib dipilih"),
  startDate: yup.string().required("Tanggal pekerjaan wajib diisi"),
  estimatedTonnage: yup
    .string()
    .required("Estimasi tonase wajib diisi")
    .test("min-tonnage", "Estimasi tonase harus lebih dari 0 MT", (val) => {
      if (!val) return false;
      const num = Number(val.replace(/\./g, ""));
      return !isNaN(num) && num > 0;
    }),
  customerPic: yup.string().required("PIC Customer wajib diisi"),
  notes: yup.string().optional(),

  // Field Armada (dipindahkan dari Operasional ke Sales)
  tugBoat: yup.string().optional(),
  bargeNomination: yup.string().optional(),
  shipmentType: yup.string().optional(),

  // Khusus Layanan Pengurusan RKBM
  rkbmType: yup.string().optional(),

  // Khusus Layanan Jasa PBM
  kegiatanLokasi: yup.string().optional(),
  polJettyType: yup.string().optional(),
  rateType: yup.string().optional(),
  customRatePerTon: yup.string().optional(),
});

export type OrderFormData = yup.InferType<typeof orderSchema>;
