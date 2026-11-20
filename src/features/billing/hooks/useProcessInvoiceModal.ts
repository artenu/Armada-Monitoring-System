import { useState, useMemo, type SubmitEvent, type ChangeEvent } from "react";
import type { ProcessInvoiceModalProps } from "@/types";
import {
  getContractRateByCustomer,
  calculatePnbp,
  getContractRateByCustomerAndService,
} from "@/data/pricing-data";
import {
  isPbmService,
  isRkbmService,
  isCustomsService,
  isFenderMooringService,
} from "@/data/mock-data";

export const useProcessInvoiceModal = ({
  order,
  onClose,
  onSave,
}: ProcessInvoiceModalProps) => {
  // 1. Tonase Acuan (DSR Final atau Estimasi)
  const tonase = order.finalDsr || order.estimatedTonnage || 0;

  // 2. Deteksi Tarif Kontrak Customer Presisi
  const contract = useMemo(() => {
    const location = order.pol?.toLowerCase().includes("jawa")
      ? "Muara Jawa"
      : "Muara Berau";
    return (
      getContractRateByCustomerAndService(
        order.customer,
        order.service,
        location,
      ) || getContractRateByCustomer(order.customer)
    );
  }, [order.customer, order.service, order.pol]);

  const isPbm = isPbmService(order.service);
  const isRkbm = isRkbmService(order.service);
  const isCustoms = isCustomsService(order.service);
  const isFenderMooring = isFenderMooringService(order.service);

  // 3. Kalkulasi Otomatis di Belakang Layar (Tanpa Input Manual)
  // A. Tarif Satuan PBM
  const ratePerTon = useMemo(() => {
    if (!isPbm) {
      return 0;
    }
    if (order.rateType === "Spot" && order.customRatePerTon) {
      return order.customRatePerTon;
    }
    // Jika BUP PTB di Muara Berau -> Rp 11.000 / MT sesuai MOM 11 Nov 2026
    if (order.customer.includes("PTB") || order.customer.includes("BUP")) {
      return contract?.pbmRatePerTon || 11000;
    }
    if (contract?.pbmRatePerTon) {
      return contract.pbmRatePerTon;
    }
    return order.ratePerTon || 0;
  }, [
    isPbm,
    order.rateType,
    order.customRatePerTon,
    order.customer,
    contract,
    order.ratePerTon,
  ]);

  // Subtotal Jasa PBM (memperhatikan satuan charge /MT vs /Lumpsum)
  const jasaPbm = useMemo(() => {
    if (!isPbm) {
      return 0;
    }
    const unit = order.chargeUnit || contract?.chargeUnit || "/MT";
    if (unit === "/Lumpsum" || unit === "/Document") {
      return ratePerTon;
    }
    return Math.round(tonase * ratePerTon);
  }, [isPbm, tonase, ratePerTon, order.chargeUnit, contract?.chargeUnit]);

  // C. Fee RKBM
  const rkbmFee = useMemo(() => {
    if (!isRkbm) {
      return 0;
    }
    if (order.rkbmFee !== undefined) {
      return order.rkbmFee;
    }

    const muatFee =
      order.polJettyType === "Private"
        ? (contract?.rkbmMuatPrivateFee ?? 0)
        : (contract?.rkbmMuatPublicFee ?? 350000);
    const bongkarFee = contract?.rkbmBongkarFee ?? 500000;

    if (order.rkbmType === "Bongkar") {
      return bongkarFee;
    }
    if (order.rkbmType === "Muat & Bongkar") {
      return muatFee + bongkarFee;
    }
    return muatFee;
  }, [isRkbm, order.rkbmFee, order.rkbmType, order.polJettyType, contract]);

  // D. Fee Kepabeanan & COO
  const kepabeananFee = useMemo(() => {
    if (!isCustoms) {
      return 0;
    }
    if (order.rateType === "Spot" && order.spotRateAmount) {
      return order.spotRateAmount;
    }
    return (
      contract?.kepabeananFee ??
      (order.customer.includes("ADP") || order.customer.includes("Alfara")
        ? 12000000
        : 10000000)
    );
  }, [
    isCustoms,
    order.rateType,
    order.spotRateAmount,
    contract,
    order.customer,
  ]);

  const cooFee = useMemo(() => {
    if (!isCustoms || !order.includeCoo) {
      return 0;
    }
    return contract?.cooFee ?? 2000000;
  }, [isCustoms, order.includeCoo, contract]);

  // Fee Fender & Mooring (MOM 16 Nov)
  const fenderFee = useMemo(() => {
    if (!isFenderMooring) {
      return 0;
    }
    return order.fenderFee ?? contract?.fenderFee ?? 0;
  }, [isFenderMooring, order.fenderFee, contract?.fenderFee]);

  const mooringFee = useMemo(() => {
    if (!isFenderMooring) {
      return 0;
    }
    return order.mooringFee ?? contract?.mooringFee ?? 0;
  }, [isFenderMooring, order.mooringFee, contract?.mooringFee]);

  const fenderMooringFee = useMemo(() => {
    if (!isFenderMooring) {
      return 0;
    }
    if (order.fenderMooringFee !== undefined) {
      return order.fenderMooringFee;
    }
    if (fenderFee > 0 || mooringFee > 0) {
      return fenderFee + mooringFee;
    }
    return contract?.fenderMooringFee ?? 0;
  }, [
    isFenderMooring,
    order.fenderMooringFee,
    fenderFee,
    mooringFee,
    contract?.fenderMooringFee,
  ]);

  // E. Subtotal Seluruh Jasa (DPP)
  // Subtotal Seluruh Jasa (DPP)
  const subtotalJasa = useMemo(() => {
    if (isPbm) {
      return jasaPbm;
    }
    if (isRkbm) {
      return rkbmFee;
    }
    if (isCustoms) {
      return kepabeananFee + cooFee;
    }
    if (isFenderMooring) {
      return fenderMooringFee;
    }
    return 0;
  }, [
    isPbm,
    jasaPbm,
    isRkbm,
    rkbmFee,
    isCustoms,
    kepabeananFee,
    cooFee,
    isFenderMooring,
    fenderMooringFee,
  ]);

  // F. PPN 11% Otomatis Diproses di Belakang Layar
  const ppn = useMemo(() => {
    return Math.round(subtotalJasa * 0.11);
  }, [subtotalJasa]);

  // G. PNBP Reimbursement Otomatis (Gratis untuk PT BUP PTB)
  const isPnbpGratis =
    contract?.pnbpBarangType === "Gratis" || order.customer.includes("PTB");
  const pnbpCalc = useMemo(() => {
    if (!isPbm || isPnbpGratis) {
      return {
        rateBarang: 0,
        pnbpBarang: 0,
        ratePengawasan: 0,
        pnbpPengawasan: 0,
        totalPnbp: 0,
      };
    }
    return calculatePnbp(order.activityType || "Domestik", tonase);
  }, [isPbm, isPnbpGratis, order.activityType, tonase]);

  const totalPnbp = pnbpCalc.totalPnbp;
  const grandTotal = subtotalJasa + ppn + totalPnbp;

  // 4. State Administrasi Nomor Invoice & Upload Berkas
  const [invoiceNo, setInvoiceNo] = useState(
    order.invoiceNo ||
      `INV/2026/${order.id.replace(/\D/g, "").slice(-4).padStart(4, "0")}/AMP`,
  );
  const [invoiceDate, setInvoiceDate] = useState(
    order.invoiceDate || new Date().toISOString().split("T")[0],
  );
  const [dueDate, setDueDate] = useState(() => {
    if (order.dueDate) {
      return order.dueDate;
    }
    const target = new Date();
    target.setDate(target.getDate() + 14);
    return target.toISOString().split("T")[0];
  });

  // State Berkas Invoice yang Diunggah
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [invoiceDocUrl, setInvoiceDocUrl] = useState<string>(
    order.invoiceDocUrl || "",
  );
  const [invoiceDocName, setInvoiceDocName] = useState<string>(
    order.invoiceDocName || "",
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInvoiceFile(file);
      setInvoiceDocName(file.name);
      setInvoiceDocUrl(URL.createObjectURL(file));
    }
  };

  // 5. Submit Handler (Upload Invoice & Kirim)
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      invoiceNo,
      invoiceDate,
      dueDate,
      contractNo: order.contractNo || contract?.contractNo,
      chargeUnit: order.chargeUnit || contract?.chargeUnit,
      ratePerTon,
      subtotalJasa,
      subtotalInvoice: subtotalJasa,
      ppnAmount: ppn,
      pnbpBarangAmount: pnbpCalc.pnbpBarang,
      pnbpPengawasanAmount: pnbpCalc.pnbpPengawasan,
      totalPnbpReimbursement: totalPnbp,
      rkbmFee: isRkbm ? rkbmFee : undefined,
      kepabeananFee: isCustoms ? kepabeananFee : undefined,
      cooFee: isCustoms ? cooFee : undefined,
      fenderFee: isFenderMooring ? fenderFee : undefined,
      mooringFee: isFenderMooring ? mooringFee : undefined,
      fenderMooringFee: isFenderMooring ? fenderMooringFee : undefined,
      totalInvoice: grandTotal,
      invoiceDocUrl,
      invoiceDocName,
    });
  };

  return {
    order,
    tonase,
    contract,
    isPbm,
    isRkbm,
    isCustoms,
    isFenderMooring,
    fenderFee,
    mooringFee,
    fenderMooringFee,
    isPnbpGratis,
    invoiceNo,
    setInvoiceNo,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    invoiceFile,
    invoiceDocUrl,
    invoiceDocName,
    handleFileChange,
    ratePerTon,
    jasaPbm,
    rkbmFee,
    kepabeananFee,
    cooFee,
    subtotalJasa,
    ppn,
    pnbpCalc,
    totalPnbp,
    grandTotal,
    handleSubmit,
    onClose,
  };
};
