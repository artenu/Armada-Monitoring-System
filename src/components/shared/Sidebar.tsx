import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Ship,
  Receipt,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Anchor,
  Boxes,
  MapPin,
  ChevronDown,
  Database,
  Navigation,
  Building2,
  DollarSign,
  type LucideIcon,
} from "lucide-react";
import { useUiStore } from "@/stores/ui-store";
import clsx from "clsx";
import { useAuthStore, type User } from "@/stores/auth-store";
import armadaLogo from "@/assets/logo/armadaLogo.png";

interface NavItem {
  name: string;
  to: string;
  icon: LucideIcon;
  roles?: User["role"][];
}

const navigationItems: NavItem[] = [
  { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  {
    name: "Job Sales",
    to: "/jobs",
    icon: CalendarDays,
    roles: ["admin", "sales"],
  },
  {
    name: "Job Operational",
    to: "/operational",
    icon: Ship,
    roles: ["admin", "operasional"],
  },
  {
    name: "Job Finance",
    to: "/billing",
    icon: Receipt,
    roles: ["admin", "finance"],
  },
  {
    name: "User Management",
    to: "/users",
    icon: Users,
    roles: ["admin"],
  },
];

interface NavChildItem {
  name: string;
  to: string;
  icon: LucideIcon;
}

const masterDataChildren: NavChildItem[] = [
  { name: "Customer", to: "/master-data/customer", icon: Users },
  { name: "Tarif Kontrak", to: "/master-data/tarif", icon: DollarSign },
  { name: "Tug Boat", to: "/master-data/tug-boat", icon: Anchor },
  { name: "Barge", to: "/master-data/barge", icon: Boxes },
  { name: "Agen Kapal", to: "/master-data/agen", icon: Building2 },
  { name: "Lokasi Operasional", to: "/master-data/lokasi", icon: MapPin },
  { name: "POL (Loading)", to: "/master-data/pol", icon: Navigation },
  { name: "POD (Discharge)", to: "/master-data/pod", icon: MapPin },
];

export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUiStore();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  // Saring menu utama sesuai peran pengguna
  const visibleNavItems = navigationItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role)),
  );
  // 1. Cek apakah user sedang berada di rute /master-data
  const isMasterActive = location.pathname.startsWith("/master-data");
  // 2. State untuk interaksi manual user (buka/tutup accordion)
  const [isManualExpanded, setIsManualExpanded] = useState<boolean | null>(
    null,
  );
  // 3. Derived State: jika user pernah klik tombol, ikuti pilihan user.
  // Jika belum, buka otomatis saat rute aktif. (Tanpa useEffect, tanpa re-render beruntun!)
  const isMasterOpen = isManualExpanded ?? isMasterActive;

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Overlay Gelap Mobile */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={clsx(
          "fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden",
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      {/* Container Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-screen bg-[#0b0f19] text-slate-200 border-r border-slate-800/80 flex flex-col transition-all duration-300 ease-in-out",
          sidebarOpen
            ? "w-64 translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-20",
        )}>
        {/* ========================================================= */}
        {/* TOMBOL TOGGLE BULAT MENGAMBANG (Persis Seperti di Foto)   */}
        {/* ========================================================= */}
        <button
          onClick={toggleSidebar}
          title={sidebarOpen ? "Ciutkan Sidebar" : "Buka Sidebar"}
          className="absolute -right-3.5 top-5 z-50 hidden lg:flex items-center justify-center w-7 h-7 bg-white text-slate-600 hover:text-slate-900 border border-slate-200 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer">
          {sidebarOpen ? (
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Header Logo ARMADA */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/60 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 p-1">
              <img
                src={armadaLogo}
                alt="Logo Armada"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div
              className={clsx(
                "transition-opacity duration-200 whitespace-nowrap",
                !sidebarOpen && "lg:hidden",
              )}>
              <span className="font-extrabold text-base tracking-wide text-white block leading-tight">
                ARMADA
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                RKBM Archive System
              </span>
            </div>
          </div>

          {/* Tombol X (Khusus Mobile) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white lg:hidden cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Kategori Menu & Daftar Navigasi */}
        <nav className="flex-1 py-5 px-3 space-y-6 overflow-y-auto">
          <div>
            <div
              className={clsx(
                "px-3 mb-2.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase",
                !sidebarOpen && "lg:hidden",
              )}>
              Menu Utama
            </div>

            <div className="space-y-1">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={handleNavClick}
                    title={!sidebarOpen ? item.name : undefined}
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                        isActive
                          ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                          : "text-slate-400 hover:bg-slate-900 hover:text-slate-100",
                        !sidebarOpen && "lg:justify-center lg:px-0",
                      )
                    }>
                    <Icon className="w-4 h-4 shrink-0" />
                    <span
                      className={clsx(
                        "truncate transition-opacity duration-200",
                        !sidebarOpen && "lg:hidden",
                      )}>
                      {item.name}
                    </span>
                  </NavLink>
                );
              })}
            </div>
            {user?.role === "admin" && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsManualExpanded(!isMasterOpen)}
                  title={!sidebarOpen ? "Master Data" : undefined}
                  className={clsx(
                    "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer",
                    isMasterActive
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-100",
                    !sidebarOpen && "lg:justify-center lg:px-0",
                  )}>
                  <div className="flex items-center gap-3.5">
                    <Database className="w-4 h-4 shrink-0" />
                    <span
                      className={clsx("truncate", !sidebarOpen && "lg:hidden")}>
                      Master Data
                    </span>
                  </div>
                  <ChevronDown
                    className={clsx(
                      "w-4 h-4 transition-transform duration-200",
                      isMasterOpen && "rotate-180",
                      !sidebarOpen && "lg:hidden",
                    )}
                  />
                </button>
                {/* Sub-menu Anak (Children) */}
                {isMasterOpen && sidebarOpen && (
                  <div className="pl-4 pr-1 py-1 mt-1 space-y-1">
                    {masterDataChildren.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={handleNavClick}
                          className={({ isActive }) =>
                            clsx(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                              isActive
                                ? "bg-slate-800 text-white font-bold"
                                : "text-slate-400 hover:text-white hover:bg-slate-900",
                            )
                          }>
                          <ChildIcon className="w-3.5 h-3.5 shrink-0" />
                          <span>{child.name}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-900 shrink-0">
          <div
            className={clsx(
              "text-[10px] text-slate-500 text-center font-medium",
              !sidebarOpen && "lg:hidden",
            )}>
            PT Gapura Segara Borneo &copy; 2026
          </div>
        </div>
      </aside>
    </>
  );
};
