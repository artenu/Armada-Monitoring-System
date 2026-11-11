import type { SubmitEvent } from "react";
import { DollarSign } from "lucide-react";
import { Modal, Button } from "@/components/ui";
import { Input, NumberInput, Select } from "@/components/forms";
import type {
  MasterItem,
  ContractRateFormData,
} from "@/types/master/master-data";
import type { CustomerContractRate } from "@/types/finance/financeTypes";

interface ContractRateModalProps {
  isOpen: boolean;
  editingContract: CustomerContractRate | null;
  customers: MasterItem[];
  contractForm: ContractRateFormData;
  onFormChange: (data: ContractRateFormData) => void;
  onSave: (e: SubmitEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

export const ContractRateModal = ({
  isOpen,
  editingContract,
  customers,
  contractForm,
  onFormChange,
  onSave,
  onClose,
}: ContractRateModalProps) => {
  if (!isOpen) {return null;}

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      icon={DollarSign}
      title={
        editingContract
          ? "Edit Tarif Kontrak Customer"
          : "Tambah Tarif Kontrak Baru"
      }
      maxWidth="xl">
      <form onSubmit={onSave} className="p-5 space-y-4 text-xs">
        {editingContract ? (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10.5px] text-slate-400 block font-medium">
                Customer (Terkunci saat Edit):
              </span>
              <span className="text-sm font-bold text-slate-900 block">
                {contractForm.customerName}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10.5px] text-slate-400 block font-medium">
                Kode Customer:
              </span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {contractForm.customerId || editingContract.customerId}
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              required
              label="Customer"
              value={contractForm.customerName}
              onChange={(e) => {
                const name = e.target.value;
                const matched = customers.find((c) => c.nama === name);
                onFormChange({
                  ...contractForm,
                  customerName: name,
                  customerId: matched ? matched.kode : name.toUpperCase(),
                });
              }}
              options={[
                { label: "Pilih Customer", value: "" },
                ...customers.map((c) => ({
                  label: `${c.nama} (${c.kode})`,
                  value: c.nama,
                })),
              ]}
            />

            <Input
              label="Kode Singkatan Customer"
              placeholder="Contoh: CEP / ALFARA"
              value={contractForm.customerId}
              onChange={(e) =>
                onFormChange({
                  ...contractForm,
                  customerId: e.target.value.toUpperCase(),
                })
              }
              className="uppercase"
            />
          </div>
        )}

        {/* Seksi Jasa PBM */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <span className="font-bold text-slate-800 block">
            1. Tarif Jasa PBM (Stevedoring)
          </span>
          <NumberInput
            label="Tarif per Ton (Rp / MT)"
            placeholder="Contoh: 250"
            prefix="Rp"
            suffix="/ MT"
            value={contractForm.pbmRatePerTon}
            onChange={(val) =>
              onFormChange({ ...contractForm, pbmRatePerTon: val })
            }
          />
        </div>

        {/* Seksi Pengurusan RKBM */}
        <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-xl space-y-3">
          <span className="font-bold text-amber-900 block">
            2. Fee Dokumen RKBM
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <NumberInput
              label="RKBM Bongkar (Rp)"
              placeholder="Contoh: 500.000"
              prefix="Rp"
              value={contractForm.rkbmBongkarFee}
              onChange={(val) =>
                onFormChange({ ...contractForm, rkbmBongkarFee: val })
              }
            />
            <NumberInput
              label="RKBM Muat - Jetty Private"
              disabled
              placeholder="FREE"
              value={undefined}
              onChange={() => {}}
              className="bg-slate-100 text-slate-500 font-bold placeholder:text-slate-600 placeholder:font-base cursor-not-allowed"
            />
            <NumberInput
              label="Muat (Public Jetty)"
              placeholder="Contoh: 350.000"
              prefix="Rp"
              value={contractForm.rkbmMuatPublicFee}
              onChange={(val) =>
                onFormChange({ ...contractForm, rkbmMuatPublicFee: val })
              }
            />
          </div>
        </div>

        {/* Seksi Kepabeanan & COO */}
        <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-2">
          <span className="font-bold text-indigo-900 block">
            3. Jasa Kepabeanan & COO (Flat per Dokumen)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <NumberInput
              label="Fee Kepabeanan (Rp)"
              placeholder="Contoh: 10.000.000"
              prefix="Rp"
              value={contractForm.kepabeananFee}
              onChange={(val) =>
                onFormChange({ ...contractForm, kepabeananFee: val })
              }
            />
            <NumberInput
              label="Fee COO (Rp)"
              placeholder="Contoh: 2.000.000"
              prefix="Rp"
              value={contractForm.cooFee}
              onChange={(val) => onFormChange({ ...contractForm, cooFee: val })}
            />
          </div>
        </div>

        {/* Catatan & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <Input
              label="Catatan Kontrak / Referensi MOM"
              placeholder="Contoh: Kesepakatan MOM 5 Nov 2026"
              value={contractForm.notes}
              onChange={(e) =>
                onFormChange({
                  ...contractForm,
                  notes: e.target.value,
                })
              }
            />
          </div>
          <Select
            label="Status"
            value={contractForm.status}
            onChange={(e) =>
              onFormChange({
                ...contractForm,
                status: e.target.value as "Aktif" | "Nonaktif",
              })
            }
            options={[
              { label: "Aktif", value: "Aktif" },
              { label: "Nonaktif", value: "Nonaktif" },
            ]}
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary" type="submit">
            Simpan Tarif Kontrak
          </Button>
        </div>
      </form>
    </Modal>
  );
};
