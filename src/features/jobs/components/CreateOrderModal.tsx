import { Ship, AlertCircle } from "lucide-react";
import { Modal } from "@/components/ui";
import type { CreateOrderModalProps } from "@/types";
import { useCreateOrderModal } from "@/features/jobs/hooks/useCreateOrderModal";
import { OrderClientSection } from "./OrderClientSection";
import { OrderFleetSection } from "./OrderFleetSection";
import { OrderServiceDetailsSection } from "./OrderServiceDetailsSection";
import { OrderVolumeSection } from "./OrderVolumeSection";

export const CreateOrderModal = (props: CreateOrderModalProps) => {
  const form = useCreateOrderModal(props);

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={form.handleClose}
      title="Buat Sales Order Baru"
      description="Input data kontrak sales, plotting armada kapal, dan dokumen perizinan."
      icon={Ship}
      maxWidth="4xl">
      {/* Form Body */}
      <form
        id="create-order-form"
        onSubmit={form.handleSubmit(form.handleFormSubmit)}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">
        {form.fileError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{form.fileError}</span>
          </div>
        )}

        {/* 4 Seksi Form Terpisah & Modular Menggunakan UI Primitives */}
        <OrderClientSection form={form} />
        <OrderFleetSection form={form} />
        <OrderServiceDetailsSection form={form} />
        <OrderVolumeSection form={form} />
      </form>

      {/* Footer Modal */}
      <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-end gap-2 bg-slate-50 shrink-0">
        <button
          type="button"
          onClick={form.handleClose}
          className="px-4 py-2 border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
          Batal
        </button>
        <button
          type="submit"
          form="create-order-form"
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs shadow-red-600/30 transition-all cursor-pointer">
          Simpan Sales Order
        </button>
      </div>
    </Modal>
  );
};
