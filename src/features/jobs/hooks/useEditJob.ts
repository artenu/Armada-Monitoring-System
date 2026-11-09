import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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

  // State Berkas Dokumen Preview
  const [previewUrl, setPreviewUrl] = useState<string>(
    order?.spDocUrl || "/sample-sp.pdf",
  );
  const [previewName, setPreviewName] = useState<string>(
    order?.spDocName || "SP_PBM_TB_KARYA_STAR_66_BG_SUMBER_SAMUDERA_01.pdf",
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewName(file.name);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // Form Management
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: yupResolver(orderSchema),
    values: order
      ? {
          customer: order.customer,
          endUser: order.endUser,
          vessel: order.vessel,
          activityType: order.activityType,
          service: order.service,
          pol: order.pol,
          pod: order.pod,
          startDate: order.startDate,
          estimatedTonnage: new Intl.NumberFormat("id-ID").format(
            order.estimatedTonnage,
          ),
          customerPic: order.customerPic || "PIC Operasional",
          notes: order.notes || "",
        }
      : undefined,
  });

  const handleFormSubmit = (data: OrderFormData) => {
    if (!order) return;

    void updateOrder(order.id, {
      vessel: data.vessel,
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
      spDocName: previewName,
      spDocUrl: previewUrl,
    });

    alert("Perubahan order berhasil disimpan!");
    navigate("/jobs");
  };

  const handleSendOps = () => {
    if (!order) return;
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
  };
};

export type UseEditJobReturn = ReturnType<typeof useEditJob>;
