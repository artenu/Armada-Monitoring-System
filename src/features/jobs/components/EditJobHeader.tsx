import { ArrowLeft, Save, Send, Lock } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import type { UseEditJobReturn } from "@/features/jobs/hooks/useEditJob";

export const EditJobHeader = ({ state }: { state: UseEditJobReturn }) => {
  const { order, isEditable, navigate, handleSendOps } = state;
  if (!order) {return null;}

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          leftIcon={ArrowLeft}
          onClick={() => navigate("/jobs")}
          className="p-2 text-slate-500 hover:text-slate-900 rounded-xl"
          title="Kembali ke Daftar Job"
        />

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-slate-900">
              {isEditable
                ? `Edit Order ${order.id}`
                : `Detail Order ${order.id}`}
            </h1>
            <Badge
              variant={order.status === "Operational" ? "info" : "neutral"}
              size="sm">
              {order.status}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Perbarui rincian muatan dan periksa dokumen Surat Penunjukan.
          </p>
        </div>
      </div>

      {/* Tombol Aksi Header */}
      <div className="flex items-center gap-2">
        {isEditable ? (
          <>
            <Button
              variant="secondary"
              leftIcon={Send}
              onClick={handleSendOps}
              title="Kirim ke Tim Operasional">
              Kirim ke Ops
            </Button>

            <Button
              type="submit"
              form="edit-order-form"
              variant="primary"
              leftIcon={Save}
              title="Simpan Perubahan Order">
              Simpan Perubahan
            </Button>
          </>
        ) : (
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-blue-900 block">
                Mode Terkunci (Read-Only)
              </span>
              <span className="text-[11px] text-blue-700 block mt-0.5">
                Order telah diserahkan ke tim Operasional untuk menjaga
                keabsahan izin RKBM.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
