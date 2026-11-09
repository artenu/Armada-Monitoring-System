import { Users, Pencil, Trash2, Mail, Phone } from "lucide-react";
import {
  TableCard,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  EmptyState,
  Badge,
} from "@/components/ui";
import type { ManagedUser, UserRole } from "@/types";

interface UserTableProps {
  users: ManagedUser[];
  onEdit: (user: ManagedUser) => void;
  onDelete: (id: string, name: string) => void;
  onToggleStatus: (id: string) => void;
}

const getRoleBadge = (role: UserRole) => {
  switch (role) {
    case "admin":
      return <Badge variant="purple">Admin System</Badge>;
    case "sales":
      return <Badge variant="success">Sales & Komersial</Badge>;
    case "operasional":
      return <Badge variant="info">Operasional</Badge>;
    case "finance":
      return <Badge variant="warning">Finance & Billing</Badge>;
  }
};

export const UserTable = ({
  users,
  onEdit,
  onDelete,
  onToggleStatus,
}: UserTableProps) => {
  return (
    <TableCard>
      <Table>
        <THead>
          <tr>
            <TH>Nama & Email</TH>
            <TH>Peran (Role)</TH>
            <TH>Departemen / Divisi</TH>
            <TH>Kontak HP</TH>
            <TH>Status</TH>
            <TH>Terakhir Login</TH>
            <TH className="text-center">Aksi</TH>
          </tr>
        </THead>
        <TBody>
          {users.length === 0 ? (
            <EmptyState
              message="Tidak ada data pengguna yang sesuai dengan filter."
              icon={Users}
              colSpan={7}
            />
          ) : (
            users.map((u) => {
              const isUserActive = u.status === "Aktif";
              const initials = u.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <TR key={u.id}>
                  {/* Nama & Email */}
                  <TD>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                        {initials}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block">
                          {u.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {u.email}
                        </span>
                      </div>
                    </div>
                  </TD>

                  {/* Peran / Role */}
                  <TD>{getRoleBadge(u.role)}</TD>

                  {/* Divisi */}
                  <TD className="text-slate-700 font-medium">{u.department}</TD>

                  {/* No Kontak */}
                  <TD className="font-mono text-slate-600">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{u.phone}</span>
                    </span>
                  </TD>

                  {/* Status */}
                  <TD>
                    <button
                      type="button"
                      onClick={() => onToggleStatus(u.id)}
                      title="Klik untuk mengubah status akun"
                      className="cursor-pointer transition-opacity hover:opacity-80">
                      <Badge variant={isUserActive ? "success" : "neutral"} dot>
                        {u.status}
                      </Badge>
                    </button>
                  </TD>

                  {/* Terakhir Login */}
                  <TD className="text-[11px] text-slate-400 font-mono">
                    {u.lastLogin || "Belum Login"}
                  </TD>

                  {/* Aksi */}
                  <TD className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(u)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit data pengguna">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(u.id, u.name)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus akun">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TD>
                </TR>
              );
            })
          )}
        </TBody>
      </Table>
    </TableCard>
  );
};
