import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useOrderStore } from "@/stores/order-store";
import {
  orderSchema,
  type OrderFormData,
} from "@/features/jobs/schema/order-schema";
import { loadJobMasterOptions } from "@/data/job-data";

export const useEditJob = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById, updateOrder, sendToOperational } = useOrderStore();

  const order = id ? getOrderById(id) : undefined;
  const isEditable = order?.status === "Draft Sales";

  // Data master opsi (Customer, POL, POD, dll)
  const masterOptions = useMemo(() => loadJobMasterOptions(), []);

  const initialDocUrl =
    order?.spDocUrl ||
    order?.rkbmSuratPenunjukanDocUrl ||
    order?.rkbmSuratPermohonanDocUrl ||
    order?.rkbmSuratPernyataanDocUrl ||
    "";
  const initialDocName =
    order?.spDocName ||
    order?.rkbmSuratPenunjukanDocName ||
    order?.rkbmSuratPermohonanDocName ||
    order?.rkbmSuratPernyataanDocName ||
    (initialDocUrl ? "Dokumen_Order.pdf" : "Belum ada berkas terlampir");
  const [previewUrl, setPreviewUrl] = useState<string>(initialDocUrl);
  const [previewName, setPreviewName] = useState<string>(initialDocName);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewName(file.name);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  let initialTug = order?.tugBoat || "";
  let initialBarge = order?.bargeNomination || "";
  if (!initialTug && initialBarge.includes(" / ")) {
    const parts = initialBarge.split(" / ");
    initialTug = parts[0]?.trim() || "";
    initialBarge = parts[1]?.trim() || "";
  }

  // Form Management
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: yupResolver(orderSchema),
    values: order
      ? {
          customer: order.customer,
          endUser: order.endUser || "",
          vessel: order.vessel || "",
          activityType: order.activityType || "Domestik",
          service: order.service,
          pol: order.pol,
          pod: order.pod,
          startDate: order.startDate,
          estimatedTonnage: new Intl.NumberFormat("id-ID").format(
            order.estimatedTonnage,
          ),
          customerPic: order.customerPic || "PIC Operasional",
          notes: order.notes || "",
          shipmentType: order.shipmentType || "Batu Bara",
          tugBoat: initialTug,
          bargeNomination: initialBarge,
          polJettyType: order.polJettyType || "Private",
          rateType: order.rateType || "Contract",
          includeCoo: order.includeCoo || false,
          spotRateAmount: order.spotRateAmount
            ? new Intl.NumberFormat("id-ID").format(order.spotRateAmount)
            : "",
        }
      : undefined,
  });

  const selectedService = useWatch({ control, name: "service" });
  const selectedRateType = useWatch({ control, name: "rateType" });
  const selectedIncludeCoo = useWatch({ control, name: "includeCoo" });

  const handleFormSubmit = (data: OrderFormData) => {
    if (!order) {
      return;
    }

    void updateOrder(order.id, {
      vessel: data.vessel,
      tugBoat: data.tugBoat,
      bargeNomination: data.bargeNomination,
      shipmentType: data.shipmentType,
      customer: data.customer,
      endUser: data.endUser,
      activityType: data.activityType as "Ekspor" | "Domestik" | "Impor",
      service: data.service,
      pol: data.pol,
      pod: data.pod,
      dropPoint: `${data.pol} → ${data.pod}`,
      startDate: data.startDate,
      estimatedTonnage: Number(data.estimatedTonnage.replace(/\./g, "")) || 0,
      customerPic: data.customerPic,
      notes: data.notes,
      // --- Teruskan data adaptif layanan ---
      polJettyType: (data.polJettyType as "Private" | "Public") || "Private",
      rateType: (data.rateType as "Contract" | "Spot") || "Contract",
      includeCoo: Boolean(data.includeCoo),
      spotRateAmount: data.spotRateAmount
        ? Number(data.spotRateAmount.replace(/\./g, ""))
        : undefined,
      spDocName: previewName,
      spDocUrl: previewUrl,
    });

    alert("Perubahan order berhasil disimpan!");
    navigate("/jobs");
  };

  const handleSendOps = () => {
    if (!order) {
      return;
    }
    if (confirm(`Kirim order ${order.id} ke tim Operasional?`)) {
      void sendToOperational(order.id);
      navigate("/jobs");
    }
  };

  return {
    id,
    order,
    isEditable,
    navigate,
    previewUrl,
    previewName,
    handleFileChange,
    masterOptions,
    register,
    handleSubmit,
    errors,
    handleFormSubmit,
    handleSendOps,
    selectedService,
    selectedRateType,
    selectedIncludeCoo,
  };
};

export type UseEditJobReturn = ReturnType<typeof useEditJob>;
