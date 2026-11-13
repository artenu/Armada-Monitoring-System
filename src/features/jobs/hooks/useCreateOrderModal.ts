import { useState, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderSchema, type OrderFormData } from "../schema/order-schema";
import type { CreateOrderModalProps } from "@/types";
import {
  getContractRateByCustomer,
  getContractRateByCustomerAndService,
} from "@/data/pricing-data";
import { loadJobMasterOptions } from "@/data/job-data";
import { validateOrderFiles } from "@/features/jobs/schema/order-validation";
import {
  getDefaultOrderFormValues,
  buildOrderFilesPayload,
  computePnbpPreview,
  findCustomerPic,
} from "@/features/jobs/utils/create-order-modal-utils";

export const useCreateOrderModal = ({
  onClose,
  onSubmitSuccess,
  initialData,
}: CreateOrderModalProps) => {
  // 1. Local States untuk Berkas
  const [spFile, setSpFile] = useState<File | null>(null);
  const [rkbmFile, setRkbmFile] = useState<File | null>(null);
  const [rkbmBongkarFile, setRkbmBongkarFile] = useState<File | null>(null);
  // 3 Persyaratan KSOP untuk Permohonan RKBM (Tahap Sales)
  const [suratPenunjukanFile, setSuratPenunjukanFile] = useState<File | null>(
    null,
  );
  const [suratPermohonanFile, setSuratPermohonanFile] = useState<File | null>(
    null,
  );
  const [suratPernyataanFile, setSuratPernyataanFile] = useState<File | null>(
    null,
  );
  const [fileError, setFileError] = useState<string | null>(null);

  // 2. Data Master Options
  const masterOptions = useMemo(() => loadJobMasterOptions(), []);

  // 3. React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: yupResolver(orderSchema),
    values: getDefaultOrderFormValues(initialData),
  });

  // 4. Form Watches
  const selectedCustomer = useWatch({ control, name: "customer" });
  const selectedService = useWatch({ control, name: "service" });
  const selectedActivity = useWatch({ control, name: "activityType" });
  const rawTonnage = useWatch({ control, name: "estimatedTonnage" });
  const selectedRateType = useWatch({ control, name: "rateType" });
  const selectedRkbmType = useWatch({ control, name: "rkbmType" });
  const selectedIncludeCoo = useWatch({ control, name: "includeCoo" });
  const selectedSpotRateAmount = useWatch({ control, name: "spotRateAmount" });
  const selectedShipmentType = useWatch({ control, name: "shipmentType" });
  const selectedPol = useWatch({ control, name: "pol" });

  // 5. Derived Values dari Utilitas
  const contractInfo = useMemo(() => {
    if (!selectedCustomer) {
      return undefined;
    }
    const location = selectedPol?.toLowerCase().includes("jawa")
      ? "Muara Jawa"
      : "Muara Berau";
    return (
      getContractRateByCustomerAndService(
        selectedCustomer,
        selectedService,
        location,
      ) || getContractRateByCustomer(selectedCustomer)
    );
  }, [selectedCustomer, selectedService, selectedPol]);

  const pnbpPreview = useMemo(
    () => computePnbpPreview(selectedActivity, rawTonnage),
    [selectedActivity, rawTonnage],
  );

  // 6. Action Handlers
  const handleClose = () => {
    reset();
    setSpFile(null);
    setRkbmFile(null);
    setRkbmBongkarFile(null);
    setSuratPenunjukanFile(null);
    setSuratPermohonanFile(null);
    setSuratPernyataanFile(null);
    setFileError(null);
    onClose();
  };

  const handleFormSubmit = (data: OrderFormData) => {
    const errorMsg = validateOrderFiles({
      data,
      spFile,
      rkbmFile,
      rkbmBongkarFile,
      suratPenunjukanFile,
      suratPermohonanFile,
      suratPernyataanFile,
      isEdit: Boolean(initialData),
    });

    if (errorMsg) {
      setFileError(errorMsg);
      return;
    }

    setFileError(null);
    const files = buildOrderFilesPayload({
      spFile,
      rkbmFile,
      rkbmBongkarFile,
      suratPenunjukanFile,
      suratPermohonanFile,
      suratPernyataanFile,
      initialData,
    });

    onSubmitSuccess(data, files);
    handleClose();
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const custName = e.target.value;
    setValue("customer", custName, { shouldValidate: true });

    const pic = findCustomerPic(custName, masterOptions.customerList);
    if (pic) {
      setValue("customerPic", pic, { shouldValidate: true });
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    fileError,
    ...masterOptions,
    selectedService,
    selectedActivity,
    selectedRateType,
    selectedRkbmType,
    selectedIncludeCoo,
    selectedSpotRateAmount,
    selectedShipmentType,
    contractInfo,
    pnbpPreview,
    spFile,
    setSpFile,
    rkbmFile,
    setRkbmFile,
    rkbmBongkarFile,
    setRkbmBongkarFile,
    suratPenunjukanFile,
    setSuratPenunjukanFile,
    suratPermohonanFile,
    setSuratPermohonanFile,
    suratPernyataanFile,
    setSuratPernyataanFile,
    handleClose,
    handleFormSubmit,
    handleCustomerChange,
  };
};

export type UseCreateOrderModalReturn = ReturnType<typeof useCreateOrderModal>;
