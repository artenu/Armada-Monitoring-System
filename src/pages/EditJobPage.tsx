import { Button } from "@/components/ui";
import { useEditJob } from "@/features/jobs/hooks/useEditJob";
import { EditJobHeader } from "@/features/jobs/components/EditJobHeader";
import { EditJobForm } from "@/features/jobs/components/EditJobForm";
import { EditJobDocumentPreview } from "@/features/jobs/components/EditJobDocumentPreview";

export const EditJobPage = () => {
  const editJobState = useEditJob();
  const { id, order, navigate } = editJobState;

  if (!order) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs">
        <h2 className="text-lg font-bold text-slate-800">
          Order Tidak Ditemukan
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Nomor order "{id}" tidak ada dalam sistem.
        </p>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => navigate("/jobs")}>
          Kembali ke Job Sales
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* 1. Header Halaman */}
      <EditJobHeader state={editJobState} />

      {/* 2. Grid Dua Kolom: Form (Kiri) & Preview Dokumen (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* KOLOM KIRI: FORM DATA ORDER */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
          <EditJobForm state={editJobState} />
        </div>

        {/* KOLOM KANAN: PREVIEW DOKUMEN */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden sticky top-6 flex flex-col">
          <EditJobDocumentPreview state={editJobState} />
        </div>
      </div>
    </div>
  );
};
