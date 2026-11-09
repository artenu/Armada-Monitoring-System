import { ShieldCheck, FileCheck2, Ship } from "lucide-react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import armadaLogo from "@/assets/logo/armadaLogo.png";

export const LoginPage = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* ========================================================= */}
      {/* SISI KIRI: Branding, Deskripsi & Background Hitam-Merah  */}
      {/* ========================================================= */}
      <div className="hidden lg:flex lg:col-span-7 bg-slate-950 text-white relative flex-col justify-between p-12 xl:p-16 overflow-hidden">
        {/* Latar Belakang Dekorasi Geometris & Aksen Merah */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />

        {/* Header Sisi Kiri */}
        <div className="relative z-10 flex items-center gap-3">
          <img
            src={armadaLogo}
            alt="Logo Armada"
            className="w-12 h-12 object-contain rounded-full shadow-lg shadow-red-600/30 bg-white p-0.5 border border-slate-800"
          />
          <div>
            <span className="font-bold text-xl tracking-tight text-white block">
              GDS SYSTEM
            </span>
            <span className="text-[11px] uppercase tracking-widest text-red-400 font-semibold">
              Gapura Dermaga Samudera
            </span>
          </div>
        </div>

        {/* Deskripsi Tengah & Poin Operasional */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/60 border border-red-800/40 text-red-300 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Sistem Informasi Operasional PBM Terpadu
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Manajemen Pemuatan &{" "}
            <span className="text-red-500">Bongkar Muat</span> Maritim.
          </h1>

          <p className="mt-5 text-slate-400 text-base leading-relaxed">
            Platform terpadu untuk monitoring pergerakan tongkang batubara,
            pengurusan dokumen izin RKBM Muat dan Bongkar, alokasi TKBM, serta
            pengarsipan digital Sucofindo.
          </p>

          {/* 3 Keunggulan Fitur Sistem */}
          <div className="mt-8 space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-red-400 shrink-0">
                <Ship className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">
                  Monitoring Jadwal Tongkang Fleksibel
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mendukung pelacakan jadwal sales dan riwayat penundaan
                  (reschedule log).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-red-400 shrink-0">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">
                  Checklist 11 Dokumen Muat & LHV
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verifikasi digital berkas perizinan jetty dan pencocokan
                  tonase DSR riil.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-red-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">
                  Kepatuhan Regulasi Pelabuhan
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sesuai ketentuan yurisdiksi Syahbandar, Muara Berau, dan
                  aturan PNBP.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Sisi Kiri */}
        <div className="relative z-10 pt-6 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500">
          <span>PT Gapura Segara Borneo</span>
          <span>Versi 2.2 Enterprise</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SISI KANAN: Form Login Bersih (Putih, Hitam, Aksen Merah) */}
      {/* ========================================================= */}
      <div className="col-span-1 lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 xl:px-16 py-12 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Logo untuk Tampilan Mobile (Hanya muncul di layar kecil) */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <img
              src={armadaLogo}
              alt="Logo Armada"
              className="w-10 h-10 object-contain rounded-full"
            />
            <div>
              <span className="font-bold text-lg text-slate-900 leading-tight block">
                GDS SYSTEM
              </span>
              <span className="text-[10px] text-red-600 font-semibold tracking-wider uppercase">
                PT Gapura Segara Borneo
              </span>
            </div>
          </div>

          {/* Heading Form */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Selamat Datang
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Silakan masukkan kredensial akun internal Anda untuk mengakses
              sistem operasional.
            </p>
          </div>

          {/* Komponen Form */}
          <LoginForm />

          {/* Catatan Bantuan Keamanan */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Mengalami kendala akun? Hubungi{" "}
              <a
                href="#"
                className="font-medium text-red-600 hover:text-red-700 underline">
                Administrator IT
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
