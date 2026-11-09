import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { loginSchema, type LoginFormData } from "../schema/login-schema";
import { authService } from "../service/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import { ApiError } from "@/lib/api-client";

export const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setGlobalError(null);

      const result = await authService.login(data);
      setAuth(result.user, result.token);

      navigate("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setGlobalError(err.message);
      } else {
        setGlobalError("Terjadi kesalahan jaringan. Silakan coba kembali.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Banner Error Global */}
      {globalError && (
        <div className="flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Input Email / Username */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
          Email / Akun Staf
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="admin@perusahaan.com"
            disabled={isLoading}
            className={`w-full pl-10 pr-3.5 py-3 text-sm bg-white text-slate-900 border rounded-xl transition-all outline-none focus:ring-2 ${
              errors.email
                ? "border-red-400 focus:border-red-600 focus:ring-red-100"
                : "border-slate-300 focus:border-red-600 focus:ring-red-100"
            }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-600 font-semibold">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Input Kata Sandi dengan Tombol Lihat Password */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
          Kata Sandi
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            disabled={isLoading}
            className={`w-full pl-10 pr-10 py-3 text-sm bg-white text-slate-900 border rounded-xl transition-all outline-none focus:ring-2 ${
              errors.password
                ? "border-red-400 focus:border-red-600 focus:ring-red-100"
                : "border-slate-300 focus:border-red-600 focus:ring-red-100"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
            title={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
            tabIndex={-1}>
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-slate-600" />
            ) : (
              <Eye className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-600 font-semibold">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Tombol Masuk Bertema Merah - Hitam */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Memverifikasi...</span>
          </>
        ) : (
          <>
            <span>Masuk ke Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
