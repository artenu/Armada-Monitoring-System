import { useState, type SubmitEvent } from "react";
import { Calendar, CheckCircle2, Scale, AlertCircle } from "lucide-react";
import { Modal, Button } from "@/components/ui";
import { Input } from "@/components/forms";
import type { OrderItem } from "@/types";

export interface CompleteLoadingModalProps {
  isOpen: boolean;
  order: OrderItem | null;
  onClose: () => void;
  onComplete: (orderId: string, completeDate: string, finalDsr: number) => void;
}

interface CompleteLoadingFormProps {
  order: OrderItem;
  onClose: () => void;
  onComplete: (orderId: string, completeDate: string, finalDsr: number) => void;
}

const CompleteLoadingForm = ({
  order,
  onClose,
  onComplete,
}: CompleteLoadingFormProps) => {
  const isBongkarOnly = order.rkbmType === "Bongkar";
  const actionTerm = isBongkarOnly ? "Bongkar" : "Muat";

  const [completeDate, setCompleteDate] = useState<string>(
    order.vesselCompleteDate ||
      (isBongkarOnly ? order.dischargeEndDate : order.loadingEndDate) ||
      new Date().toISOString().split("T")[0],
  );
  const [finalDsr, setFinalDsr] = useState<string>(
    order.finalDsr
      ? String(order.finalDsr)
      : String(order.estimatedTonnage || ""),
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanNumber = finalDsr.replace(/\./g, "").replace(",", ".");
    const parsedDsr = parseFloat(cleanNumber);

    if (isNaN(parsedDsr) || parsedDsr <= 0) {
      setErrorMessage(
        "Masukkan tonase realisasi DSR yang valid (angka lebih dari 0).",
      );
      return;
    }

    if (!completeDate) {
      setErrorMessage(
        `Tanggal selesai ${actionTerm.toLowerCase()} wajib diisi.`,
      );
      return;
    }

    setErrorMessage(null);
    onComplete(order.id, completeDate, parsedDsr);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      icon={CheckCircle2}
      title={`Konfirmasi Selesai ${actionTerm}`}
      description={`Order: ${order.id} • ${order.vessel} (${order.rkbmType || "PBM"})`}
      maxWidth="md">
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Banner Info */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            Menyelesaikan {actionTerm.toLowerCase()} akan mengunci status
            operasional kapal dan meneruskan order ke bagian{" "}
            <strong>Finance (Siap Ditagihkan)</strong>.
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tanggal Selesai */}
        <Input
          type="date"
          required
          label={`Tanggal Selesai ${actionTerm}`}
          startIcon={Calendar}
          value={completeDate}
          onChange={(e) => {
            setCompleteDate(e.target.value);
            if (errorMessage) {setErrorMessage(null);}
          }}
        />

        {/* Realisasi Tonase DSR */}
        <Input
          type="text"
          required
          label="Realisasi Tonase DSR Sucofindo (MT)"
          startIcon={Scale}
          placeholder="Contoh: 7502"
          value={finalDsr}
          onChange={(e) => {
            setFinalDsr(e.target.value);
            if (errorMessage) {setErrorMessage(null);}
          }}
          helperText={`Estimasi awal dari Sales: ${order.estimatedTonnage?.toLocaleString("id-ID")} MT`}
        />

        {/* Footer Tombol */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" variant="success" leftIcon={CheckCircle2}>
            Selesai {actionTerm} & Lanjutkan ke Finance
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export const CompleteLoadingModal = ({
  isOpen,
  order,
  onClose,
  onComplete,
}: CompleteLoadingModalProps) => {
  if (!isOpen || !order) {return null;}

  return (
    <CompleteLoadingForm
      key={order.id}
      order={order}
      onClose={onClose}
      onComplete={onComplete}
    />
  );
};
