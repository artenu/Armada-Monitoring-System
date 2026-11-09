import { useState, useMemo, type SubmitEvent } from "react";
import type { ProcessInvoiceModalProps } from "@/types";
import { getContractRateByCustomer, calculatePnbp } from "@/data/pricing-data";

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

  // 3. Default Tarif Satuan PBM
  const defaultRate = useMemo(() => {
    if (order.rateType === "Spot" && order.customRatePerTon) {
      return order.customRatePerTon;
    }
    if (contract?.pbmRatePerTon) {
      return contract.pbmRatePerTon;
    }
    return order.ratePerTon || 0;
  }, [order.rateType, order.customRatePerTon, contract, order.ratePerTon]);

  // 4. Default Fee RKBM
  const defaultRkbmFee = useMemo(() => {
    if (order.rkbmFee !== undefined) return order.rkbmFee;
    if (order.service === "Pengurusan RKBM") {
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
    }
    return order.polJettyType === "Private" ? 0 : 350000;
  }, [
    order.rkbmFee,
    order.service,
    order.rkbmType,
    order.polJettyType,
    contract,
  ]);

  // 5. Default PNBP Reimbursement Sesuai MOM (700/350 & 54)
  const pnbpCalc = useMemo(() => {
    return calculatePnbp(order.activityType, tonase);
  }, [order.activityType, tonase]);

  // 6. State Form Administrasi Invoice
  const [invoiceNo, setInvoiceNo] = useState(
    order.invoiceNo ||
      `INV/2026/${order.id.replace(/\D/g, "").slice(-4).padStart(4, "0")}/AMP`,
  );
  const [invoiceDate, setInvoiceDate] = useState(
    order.invoiceDate || new Date().toISOString().split("T")[0],
  );
  const [dueDate, setDueDate] = useState(() => {
    if (order.dueDate) return order.dueDate;
    const target = new Date();
    target.setDate(target.getDate() + 14);
    return target.toISOString().split("T")[0];
  });

  // 7. State Nilai Tagihan Jasa & Reimbursement
  const [ratePerTon, setRatePerTon] = useState<number>(defaultRate);
  const [rkbmFee, setRkbmFee] = useState<number>(defaultRkbmFee);
  const [kepabeananFee, setKepabeananFee] = useState<number>(
    contract?.kepabeananFee ?? 0,
  );
  const [cooFee, setCooFee] = useState<number>(contract?.cooFee ?? 0);
  const [includePpn, setIncludePpn] = useState<boolean>(true);
  const [pnbpBarang, setPnbpBarang] = useState<number>(
    order.pnbpBarangAmount !== undefined
      ? order.pnbpBarangAmount
      : pnbpCalc.pnbpBarang,
  );
  const [pnbpPengawasan, setPnbpPengawasan] = useState<number>(
    order.pnbpPengawasanAmount !== undefined
      ? order.pnbpPengawasanAmount
      : pnbpCalc.pnbpPengawasan,
  );
  const [accurateNotes, setAccurateNotes] = useState<string>(
    order.accurateSyncNotes || "",
  );

  // 8. Kalkulasi Real-time Agregat
  const jasaPbm = Math.round(tonase * ratePerTon);
  const subtotalJasa =
    jasaPbm +
    Number(rkbmFee || 0) +
    Number(kepabeananFee || 0) +
    Number(cooFee || 0);
  const ppn = includePpn ? Math.round(subtotalJasa * 0.11) : 0;
  const totalPnbp = Number(pnbpBarang || 0) + Number(pnbpPengawasan || 0);
  const grandTotal = subtotalJasa + ppn + totalPnbp;

  // 9. Submit Handler
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!invoiceNo.trim()) return;

    onSave({
      invoiceNo: invoiceNo.trim(),
      invoiceDate,
      dueDate,
      ratePerTon,
      rkbmFee,
      kepabeananFee,
      cooFee,
      subtotalJasa,
      subtotalInvoice: subtotalJasa,
      ppnAmount: ppn,
      pnbpBarangAmount: pnbpBarang,
      pnbpPengawasanAmount: pnbpPengawasan,
      totalPnbpReimbursement: totalPnbp,
      totalInvoice: grandTotal,
      accurateSyncNotes: accurateNotes.trim(),
    });
  };

  return {
    order,
    tonase,
    contract,
    pnbpCalc,
    invoiceNo,
    setInvoiceNo,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    ratePerTon,
    setRatePerTon,
    rkbmFee,
    setRkbmFee,
    kepabeananFee,
    setKepabeananFee,
    cooFee,
    setCooFee,
    includePpn,
    setIncludePpn,
    pnbpBarang,
    setPnbpBarang,
    pnbpPengawasan,
    setPnbpPengawasan,
    accurateNotes,
    setAccurateNotes,
    jasaPbm,
    subtotalJasa,
    ppn,
    totalPnbp,
    grandTotal,
    handleSubmit,
    onClose,
  };
};

export type UseProcessInvoiceModalReturn = ReturnType<
  typeof useProcessInvoiceModal
>;
