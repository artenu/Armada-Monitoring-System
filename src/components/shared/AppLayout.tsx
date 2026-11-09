import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useUiStore } from "@/stores/ui-store";
import clsx from "clsx";

export const AppLayout = () => {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex">
      {/* Sidebar Navigasi */}
      <Sidebar />

      {/* Konten Utama: Lebar margin kiri bergeser mulus mengikuti lebar sidebar */}
      <div
        className={clsx(
          "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:pl-64" : "lg:pl-20",
        )}>
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
