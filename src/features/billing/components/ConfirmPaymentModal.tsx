import { useState, type SubmitEvent } from "react";
import { CheckCircle2, Calendar } from "lucide-react";
import { Modal, Button } from "@/components/ui";
import { Input } from "@/components/forms";
import { formatRupiah } from "@/utils/formatters";
import type { ConfirmPaymentModalProps } from "@/types";

export const ConfirmPaymentModal = ({
  order,
  onClose,
  onConfirm,
}: ConfirmPaymentModalProps) => {
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [paymentNotes, setPaymentNotes] = useState("Transfer Bank Rek Mandiri");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(paymentDate, paymentNotes);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      icon={CheckCircle2}
      title="Konfirmasi Pelunasan Tagihan"
      description={`Invoice: ${order.invoiceNo} • ${order.customer}`}
      maxWidth="md">
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
          <div className="flex justify-between">
            <span>Customer:</span>
            <span className="font-bold">{order.customer}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Tagihan:</span>
            <span className="font-bold font-mono text-sm text-emerald-800">
              {formatRupiah(order.totalInvoice)}
            </span>
          </div>
        </div>

        <Input
          type="date"
          required
          label="Tanggal Masuk Pembayaran"
          startIcon={Calendar}
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
        />

        <Input
          label="Catatan Rekening / Bukti Transfer"
          placeholder="Contoh: Transfer Mandiri An. PT Borneo"
          value={paymentNotes}
          onChange={(e) => setPaymentNotes(e.target.value)}
        />

        <div className="pt-2 flex items-center justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Batal
          </Button>
          <Button variant="success" type="submit" leftIcon={CheckCircle2}>
            Konfirmasi Lunas
          </Button>
        </div>
      </form>
    </Modal>
  );
};
