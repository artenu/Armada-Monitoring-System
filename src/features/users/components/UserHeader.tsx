import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui";

interface UserHeaderProps {
  onAdd: () => void;
}

export const UserHeader = ({ onAdd }: UserHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <Users className="w-6 h-6 text-red-600" />
          <span>User Management</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Kelola hak akses peran (*Role-Based Access Control*), akun staf
          internal, dan penugasan divisi.
        </p>
      </div>

      <Button variant="primary" leftIcon={Plus} onClick={onAdd}>
        Tambah Pengguna
      </Button>
    </div>
  );
};
