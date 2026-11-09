import {
  Home,
  ChevronRight,
  LogOut,
  Menu,
  User as UserIcon,
  Search,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import { useUiStore } from "@/stores/ui-store";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [globalSearch, setGlobalSearch] = useState("");

  // Otomatis tentukan label judul breadcrumb dari rute aktif
  const getPageTitle = (pathname: string) => {
    if (pathname.includes("jobs")) return "Job Sales";
    if (pathname.includes("operational")) return "Job Operational";
    if (pathname.includes("billing")) return "Job Finance";
    if (pathname.includes("documents")) return "Checklist Dokumen";
    if (pathname.includes("users")) return "User Management";
    return "Dashboard";
  };

  // Pintasan Keyboard: Tekan Ctrl+K (atau Cmd+K) untuk langsung fokus ke pencarian
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-2xs gap-3">
      {/* 1. SISI KIRI: Tombol Menu (Mobile) & Breadcrumb Navigasi */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-slate-600 hover:text-slate-900 lg:hidden rounded-lg cursor-pointer">
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 text-sm text-slate-500">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-1 hover:text-slate-900 transition-colors cursor-pointer">
            <Home className="w-4 h-4 text-slate-500 hover:text-slate-900" />
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-bold text-slate-900 text-xs sm:text-sm whitespace-nowrap">
            {getPageTitle(location.pathname)}
          </span>

          <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-slate-500 bg-slate-100 border border-slate-200 uppercase">
            Development
          </span>
        </div>
      </div>

      {/* 2. SISI TENGAH: Input Pencarian Global (Sangat Modern) */}
      <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2 sm:mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Cari data kapal, RKBM, customer..."
            className="w-full pl-8 sm:pl-9 pr-12 py-1.5 sm:py-2 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 transition-all placeholder:text-slate-400"
          />
          {/* Badge Shortcut Pintasan ⌘K / Ctrl K */}
          <div className="absolute inset-y-0 right-0 pr-2.5 hidden sm:flex items-center pointer-events-none">
            <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
              Ctrl K
            </kbd>
          </div>
        </div>
      </div>

      {/* 3. SISI KANAN: Profil Pengguna & Tombol Keluar */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 text-red-600 flex items-center justify-center font-bold text-xs shadow-2xs">
            {user?.name ? (
              user.name.slice(0, 2).toUpperCase()
            ) : (
              <UserIcon className="w-3.5 h-3.5" />
            )}
          </div>
          <span className="hidden md:inline text-xs font-semibold text-slate-800">
            {user?.name || "Staf Operasional"}
          </span>
        </div>

        <div className="h-5 w-px bg-slate-200 hidden sm:block" />

        <button
          onClick={handleLogout}
          title="Keluar dari sistem"
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium">
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Keluar</span>
        </button>
      </div>
    </header>
  );
};
