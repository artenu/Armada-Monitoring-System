import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore, type User } from "@/stores/auth-store";
import { ShieldAlert, ArrowLeft } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: User["role"][];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  // 1. Cek Autentikasi (Wajib Login)
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Cek Otorisasi (Hak Akses Peran)
  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-8 rounded-3xl border border-slate-200/90 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-100 shadow-xs">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
              403 • Akses Terbatas
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-3 tracking-tight">
              Akses Halaman Ditolak
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Akun Anda login sebagai{" "}
              <strong className="text-slate-800 font-semibold uppercase">
                {user.role}
              </strong>
              . Halaman ini memerlukan hak akses khusus (
              <span className="font-semibold text-slate-700">
                {allowedRoles.join(", ")}
              </span>
              ).
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
