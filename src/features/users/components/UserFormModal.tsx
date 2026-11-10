import { useState, type SubmitEvent } from "react";
import {
  Shield,
  Mail,
  Phone,
  Briefcase,
  User as UserIcon,
  KeyRound,
} from "lucide-react";
import { Modal, Button } from "@/components/ui";
import { Input, Select } from "@/components/forms";
import type {
  ManagedUser,
  UserRole,
  UserInputPayload,
} from "@/stores/user-store";

interface UserFormModalProps {
  isOpen: boolean;
  userToEdit: ManagedUser | null;
  onClose: () => void;
  onSave: (payload: UserInputPayload) => void;
}

interface FormContentProps {
  userToEdit: ManagedUser | null;
  onClose: () => void;
  onSave: (payload: UserInputPayload) => void;
}

const getDefaultDept = (r: UserRole): string => {
  switch (r) {
    case "admin":
      return "Divisi IT & Manajemen Sistem";
    case "sales":
      return "Divisi Komersial & Sales";
    case "operasional":
      return "Divisi Operasional Lapangan";
    case "finance":
      return "Divisi Keuangan & Billing";
  }
};

const UserFormContent = ({ userToEdit, onClose, onSave }: FormContentProps) => {
  const isEdit = Boolean(userToEdit);

  const [name, setName] = useState(userToEdit?.name || "");
  const [email, setEmail] = useState(userToEdit?.email || "");
  const [role, setRole] = useState<UserRole>(userToEdit?.role || "operasional");
  const [department, setDepartment] = useState(
    userToEdit?.department || getDefaultDept(userToEdit?.role || "operasional"),
  );
  const [phone, setPhone] = useState(userToEdit?.phone || "");
  const [status, setStatus] = useState<"Aktif" | "Nonaktif">(
    userToEdit?.status || "Aktif",
  );
  const [password, setPassword] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave({
      name,
      email,
      role,
      department: department || getDefaultDept(role),
      phone: phone || "-",
      status,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      icon={Shield}
      title={isEdit ? "Edit Data Pengguna" : "Tambah Pengguna Baru"}
      description={
        isEdit
          ? `Mengubah hak akses & profil ID: ${userToEdit?.id}`
          : "Daftarkan akun staf baru untuk mengakses sistem ARMADA"
      }>
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Nama Lengkap */}
        <Input
          label="Nama Lengkap Staf"
          required
          startIcon={UserIcon}
          placeholder="Contoh: Budi Santoso"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email & No HP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Alamat Email"
            type="email"
            required
            startIcon={Mail}
            placeholder="nama@gds.co.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="No. WhatsApp / HP"
            startIcon={Phone}
            placeholder="Contoh: 0812-3456-7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Role & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Hak Akses (Role)"
            required
            startIcon={Shield}
            value={role}
            onChange={(e) => {
              const newRole = e.target.value as UserRole;
              setRole(newRole);
              setDepartment(getDefaultDept(newRole));
            }}
            options={[
              { label: "Admin System", value: "admin" },
              { label: "Sales & Komersial", value: "sales" },
              { label: "Operasional & RKBM", value: "operasional" },
              { label: "Finance & Billing", value: "finance" },
            ]}
          />

          <Select
            label="Status Akun"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value as "Aktif" | "Nonaktif")}
            options={[
              { label: "Aktif", value: "Aktif" },
              { label: "Nonaktif", value: "Nonaktif" },
            ]}
          />
        </div>

        {/* Divisi (Otomatis) */}
        <Input
          label="Divisi / Departemen Kerja"
          readOnly
          badgeText="Otomatis"
          startIcon={Briefcase}
          value={department}
          helperText="Divisi terisi otomatis mengikuti pilihan Hak Akses (Role) di atas."
        />

        {/* Password (dengan auto eye toggle) */}
        <Input
          label={
            isEdit
              ? "Password Baru (Kosongkan jika tidak diubah)"
              : "Kata Sandi (Password)"
          }
          type="password"
          required={!isEdit}
          startIcon={KeyRound}
          placeholder={isEdit ? "••••••••" : "Minimal 6 karakter"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={
            !isEdit
              ? "Klik ikon mata untuk memastikan kata sandi sudah benar."
              : undefined
          }
        />

        {/* Footer Tombol */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" variant="primary">
            {isEdit ? "Simpan Perubahan" : "Daftarkan Pengguna"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export const UserFormModal = ({
  isOpen,
  userToEdit,
  onClose,
  onSave,
}: UserFormModalProps) => {
  if (!isOpen) {return null;}

  return (
    <UserFormContent
      key={userToEdit?.id || "new-user"}
      userToEdit={userToEdit}
      onClose={onClose}
      onSave={onSave}
    />
  );
};
