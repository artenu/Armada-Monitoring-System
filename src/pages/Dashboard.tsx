import { Ship, Calendar, FileText, CheckCircle2 } from "lucide-react";

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Dashboard Operasional
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Ringkasan jadwal pemuatan tongkang batubara dan status dokumen jetty
        </p>
      </div>

      {/* Kartu Ringkasan Metrik (KPI) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Ship className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold text-slate-900">4</span>
            <span className="text-xs text-slate-500">
              Tongkang Aktif di Jetty
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold text-slate-900">2</span>
            <span className="text-xs text-slate-500">
              Jadwal Rescheduled / Delay
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold text-slate-900">11</span>
            <span className="text-xs text-slate-500">
              Verifikasi Dokumen Muat
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold text-slate-900">
              29.800 MT
            </span>
            <span className="text-xs text-slate-500">Total Muat Bulan Ini</span>
          </div>
        </div>
      </div>

      {/* Tabel Ringkasan Armada Tongkang Aktif */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 text-sm">
            Pekerjaan Tongkang Sedang Berjalan
          </h2>
          <span className="text-xs text-blue-600 font-medium">
            Update Terkini
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase font-semibold text-slate-500 tracking-wider">
              <tr>
                <th className="px-5 py-3">Armada Kapal</th>
                <th className="px-5 py-3">Shipper / Klien</th>
                <th className="px-5 py-3">Target Tonase</th>
                <th className="px-5 py-3">Tujuan</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/60">
                <td className="px-5 py-3.5 font-medium text-slate-900">
                  TB. KARYA STAR 66 / BG. SUMBER SAMUDERA 01
                </td>
                <td className="px-5 py-3.5">PT Alfara Delta Persada</td>
                <td className="px-5 py-3.5">7.500 MT</td>
                <td className="px-5 py-3.5">Muara Sangkulirang</td>
                <td className="px-5 py-3.5">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Proses Muat
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="px-5 py-3.5 font-medium text-slate-900">
                  TB. HARMONY XIX / BG. LINTAS SAMUDERA 88
                </td>
                <td className="px-5 py-3.5">CEP</td>
                <td className="px-5 py-3.5">7.300 MT</td>
                <td className="px-5 py-3.5">Muara Berau (Transhipment)</td>
                <td className="px-5 py-3.5">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Selesai
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
