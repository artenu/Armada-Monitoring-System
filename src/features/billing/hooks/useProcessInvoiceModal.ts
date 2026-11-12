import { useState, useMemo, type SubmitEvent, type ChangeEvent } from "react";
import type { ProcessInvoiceModalProps } from "@/types";
import { getContractRateByCustomer, calculatePnbp } from "@/data/pricing-data";
import {
  isPbmService,
  isRkbmService,
  isCustomsService,
} from "@/data/mock-data";

export const useProcessInvoiceModal = ({
  order,
  onClose,
  onSave,
}: ProcessInvoiceModalProps) => {
  // 1. Tonase Acuan (DSR Final atau Estimasi)
  const tonase = order.finalDsr || order.estimatedTonnage || 0;

  // 2. Deteksi Tarif Kontrak Customer
  const contract = useMemo(() => {
    return getContractRateByCustomer(order.customer);
  }, [order.customer]);

  const isPbm = isPbmService(order.service);
  const isRkbm = isRkbmService(order.service);
  const isCustoms = isCustomsService(order.service);

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

  // B. Subtotal Jasa PBM
  const jasaPbm = useMemo(() => {
    return Math.round(tonase * ratePerTon);
  }, [tonase, ratePerTon]);

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

  // E. Subtotal Seluruh Jasa (DPP)
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
    return 0;
  }, [isPbm, jasaPbm, isRkbm, rkbmFee, isCustoms, kepabeananFee, cooFee]);

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
      ratePerTon,
      rkbmFee,
      kepabeananFee,
      cooFee,
      subtotalJasa,
      subtotalInvoice: subtotalJasa,
      ppnAmount: ppn,
      pnbpBarangAmount: pnbpCalc.pnbpBarang,
      pnbpPengawasanAmount: pnbpCalc.pnbpPengawasan,
      totalPnbpReimbursement: totalPnbp,
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
