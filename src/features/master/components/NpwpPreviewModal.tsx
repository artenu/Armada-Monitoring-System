import { FileText } from "lucide-react";
import { Modal, DocumentViewer } from "@/components/ui";
import type { NpwpPreviewData } from "@/types/master/master-data";

interface NpwpPreviewModalProps {
  previewData: NpwpPreviewData | null;
  onClose: () => void;
}

export const NpwpPreviewModal = ({
  previewData,
  onClose,
}: NpwpPreviewModalProps) => {
  if (!previewData) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      icon={FileText}
      title={`Dokumen NPWP - ${previewData.customerName}`}
      description={previewData.docName}
      maxWidth="4xl">
      <div className="p-2 bg-slate-100">
        <DocumentViewer
          url={previewData.docUrl}
          fileName={previewData.docName}
          title={`Pratinjau ${previewData.docName}`}
          heightClass="min-h-[500px] h-[550px]"
        />
      </div>
    </Modal>
  );
};
