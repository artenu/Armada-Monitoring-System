import type { FormEvent } from "react";
import { FileText, Eye, Trash2, Upload } from "lucide-react";
import { Modal, Input, Select, Button } from "@/components/ui";
import type {
  MasterItem,
  MasterResourceKey,
  MasterConfig,
  MasterFormData,
  NpwpPreviewData,
} from "@/types/master/master-data";

interface MasterItemModalProps {
  isOpen: boolean;
  editingItem: MasterItem | null;
  activeTab: MasterResourceKey;
  currentConfig: MasterConfig;
  formData: MasterFormData;
  onFormDataChange: (data: MasterFormData) => void;
  onSave: (e: FormEvent) => void;
  onClose: () => void;
  onPreviewNpwp: (data: NpwpPreviewData) => void;
}

export const MasterItemModal = ({
  isOpen,
  editingItem,
  activeTab,
  currentConfig,
  formData,
  onFormDataChange,
  onSave,
  onClose,
  onPreviewNpwp,
}: MasterItemModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={
        editingItem
          ? `Edit ${currentConfig.label}`
          : `Tambah ${currentConfig.label}`
      }
      maxWidth="md">
      <form onSubmit={onSave} className="p-5 space-y-4">
        <Input
          required
          label={`Nama ${currentConfig.label}`}
          placeholder={`Masukkan nama ${currentConfig.label}`}
          value={formData.nama}
          onChange={(e) =>
            onFormDataChange({ ...formData, nama: e.target.value })
          }
        />

        <Input
          label={currentConfig.subDetailLabel}
          placeholder={currentConfig.subDetailPlaceholder}
          value={formData.subDetail}
          onChange={(e) =>
            onFormDataChange({ ...formData, subDetail: e.target.value })
          }
        />

        {/* Upload Berkas NPWP Khusus Customer */}
        {activeTab === "customer" && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-red-600" />
                <span>Berkas Dokumen NPWP (PDF)</span>
              </label>
              {formData.npwpDocName && (
                <span className="text-[10.5px] text-emerald-600 font-medium font-mono">
                  ✓ Terlampir
                </span>
              )}
            </div>

            {formData.npwpDocName ? (
              <div className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded-lg">
                <span className="text-xs text-slate-700 font-mono truncate max-w-[200px]">
                  {formData.npwpDocName}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      onPreviewNpwp({
                        customerName: formData.nama || "Customer",
                        docName: formData.npwpDocName,
                        docUrl: formData.npwpDocUrl || "/sample-sp.pdf",
                      })
                    }
                    className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Pratinjau NPWP">
                    <Eye className="w-3 h-3" />
                    <span>Lihat</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onFormDataChange({
                        ...formData,
                        npwpDocName: "",
                        npwpDocUrl: "",
                      })
                    }
                    className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                    title="Hapus berkas">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-slate-300 hover:border-red-500 hover:bg-red-50/30 rounded-lg cursor-pointer transition-colors bg-white">
                <Upload className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-600">
                  Upload Berkas PDF NPWP
                </span>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      onFormDataChange({
                        ...formData,
                        npwpDocName: file.name,
                        npwpDocUrl: url,
                      });
                    }
                  }}
                />
              </label>
            )}
          </div>
        )}

        {activeTab === "customer" && (
          <>
            <Input
              label="Nama PIC Customer"
              placeholder="Contoh: Bpk. Hendra Gunawan"
              value={formData.picName}
              onChange={(e) =>
                onFormDataChange({ ...formData, picName: e.target.value })
              }
            />
            <Input
              label="Kontak PIC (No. HP / WA)"
              placeholder="Contoh: 0812-3456-7890"
              value={formData.kontak}
              onChange={(e) =>
                onFormDataChange({ ...formData, kontak: e.target.value })
              }
            />
          </>
        )}

        <Select
          label="Status"
          value={formData.status}
          onChange={(e) =>
            onFormDataChange({
              ...formData,
              status: e.target.value as "Aktif" | "Nonaktif",
            })
          }
          options={[
            { label: "Aktif", value: "Aktif" },
            { label: "Nonaktif", value: "Nonaktif" },
          ]}
        />

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </div>
      </form>
    </Modal>
  );
};
