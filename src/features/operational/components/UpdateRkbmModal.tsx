import { Compass, Save } from "lucide-react";
import { Modal, Button } from "@/components/ui";
import { useUpdateRkbmModal } from "../hooks/useUpdateRkbmModal";
import { RkbmFleetSection } from "./RkbmFleetSection";
import { RkbmScheduleSection } from "./RkbmSchedule";
import { RkbmChecklistSection } from "./RkbmChecklistSection";
import type { UpdateRkbmFormProps, UpdateRkbmModalProps } from "@/types";

const UpdateRkbmForm = ({ order, onClose, onSave }: UpdateRkbmFormProps) => {
  const form = useUpdateRkbmModal({ order, onClose, onSave });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      icon={Compass}
      title="Monitoring Operasional & Pergerakan Armada"
      description={`Order: ${order.id} • ${order.vessel} (${order.customer})`}
      maxWidth="4xl">
      <form onSubmit={form.handleSubmit} className="p-5 space-y-5">
        {/* SEKSI 1: DATA ARMADA SALES (Read-Only) & KOORDINASI */}
        <RkbmFleetSection
          order={order}
          captainPhone={form.captainPhone}
          onCaptainPhoneChange={form.setCaptainPhone}
          agent={form.agent}
          onAgentChange={form.setAgent}
          agentOptions={form.agentOptions}
        />

        {/* SEKSI 2: POSISI TERKINI & JADWAL LAPANGAN */}
        <RkbmScheduleSection
          order={order}
          showMuat={form.showMuat}
          showBongkar={form.showBongkar}
          position={form.position}
          onPositionChange={form.setPosition}
          positionOptions={form.positionOptions}
          etaPol={form.etaPol}
          onEtaPolChange={form.setEtaPol}
          etaPod={form.etaPod}
          onEtaPodChange={form.setEtaPod}
          loadingStartDate={form.loadingStartDate}
          onLoadingStartDateChange={form.setLoadingStartDate}
          loadingEndDate={form.loadingEndDate}
          onLoadingEndDateChange={form.setLoadingEndDate}
          dischargeStartDate={form.dischargeStartDate}
          onDischargeStartDateChange={form.setDischargeStartDate}
          dischargeEndDate={form.dischargeEndDate}
          onDischargeEndDateChange={form.setDischargeEndDate}
          finalDsr={form.finalDsr}
          onFinalDsrChange={form.setFinalDsr}
          operationalNotes={form.operationalNotes}
          onOperationalNotesChange={form.setOperationalNotes}
        />

        {/* SEKSI 3: CHECKLIST DOKUMEN OPERASIONAL */}
        <RkbmChecklistSection
          hasSkab={form.hasSkab}
          onHasSkabChange={form.setHasSkab}
          hasSkb={form.hasSkb}
          onHasSkbChange={form.setHasSkb}
          hasRoyalty={form.hasRoyalty}
          onHasRoyaltyChange={form.setHasRoyalty}
          hasLhv={form.hasLhv}
          onHasLhvChange={form.setHasLhv}
          hasBo={form.hasBo}
          onHasBoChange={form.setHasBo}
        />

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
          <Button variant="outline" type="button" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary" type="submit" leftIcon={Save}>
            Simpan Update Operasional
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export const UpdateRkbmModal = ({
  isOpen,
  order,
  onClose,
  onSave,
}: UpdateRkbmModalProps) => {
  if (!isOpen || !order) return null;
  return (
    <UpdateRkbmForm
      key={order.id}
      order={order}
      onClose={onClose}
      onSave={onSave}
    />
  );
};
