import { useState, type FormEvent } from "react";
import type { OrderItem, OperationalUpdatePayload } from "@/types";
import {
  getMasterAgentList,
  getMasterLocationList,
} from "@/data/operational-data";

interface UseUpdateRkbmModalProps {
  order: OrderItem;
  onClose: () => void;
  onSave: (orderId: string, payload: OperationalUpdatePayload) => void;
}

export const useUpdateRkbmModal = ({
  order,
  onClose,
  onSave,
}: UseUpdateRkbmModalProps) => {
  const [locationList] = useState<string[]>(() => getMasterLocationList());
  const [agentList] = useState<string[]>(() => getMasterAgentList());

  const isRkbm = order.service === "Pengurusan RKBM";
  const isPbm = order.service === "Jasa PBM";
  const isCustoms = order.service === "Pengurusan Kepabeanan dan COO";

  // Koordinasi Lapangan
  const [captainPhone, setCaptainPhone] = useState<string>(
    order.captainPhone || "",
  );
  const [agent, setAgent] = useState<string>(
    order.agent || "PT DUTA LINTAS SAMUDERA",
  );

  // Logika adaptif berdasarkan pilihan Sales
  const showMuat =
    order.service !== "Pengurusan RKBM" ||
    order.rkbmType === "Muat" ||
    order.rkbmType === "Muat & Bongkar" ||
    !order.rkbmType;

  const showBongkar =
    order.service !== "Pengurusan RKBM" ||
    order.rkbmType === "Bongkar" ||
    order.rkbmType === "Muat & Bongkar" ||
    !order.rkbmType;

  // Posisi & Jadwal Lapangan
  const [position, setPosition] = useState<string>(order.position || "Kalaq");
  const [positionUpdatedAt, setPositionUpdatedAt] = useState<string>(
    order.positionUpdatedAt || new Date().toISOString().slice(0, 16),
  );
  const [commencedDate, setCommencedDate] = useState<string>(
    order.commencedDate || order.loadingStartDate || order.startDate || "",
  );
  const [completedDate, setCompletedDate] = useState<string>(
    order.completedDate || order.vesselCompleteDate || "",
  );

  const [etaPol, setEtaPol] = useState<string>(
    order.etaPol || order.etaJetty || "",
  );
  const [etaPod, setEtaPod] = useState<string>(
    order.etaPod || order.etaVessel || "",
  );

  // Siklus Muat (Loading di POL)
  const [loadingStartDate, setLoadingStartDate] = useState<string>(
    order.loadingStartDate || order.loadingDate || "",
  );
  const [loadingEndDate, setLoadingEndDate] = useState<string>(
    order.loadingEndDate || "",
  );

  // Siklus Bongkar (Discharge di POD)
  const [dischargeStartDate, setDischargeStartDate] = useState<string>(
    order.dischargeStartDate || "",
  );
  const [dischargeEndDate, setDischargeEndDate] = useState<string>(
    order.dischargeEndDate || order.vesselCompleteDate || "",
  );

  const [finalDsr, setFinalDsr] = useState<string>(
    order.finalDsr ? String(order.finalDsr) : "",
  );
  const [operationalNotes, setOperationalNotes] = useState<string>(
    order.operationalNotes || "",
  );

  // Dokumen Operasional: Checkbox Saja
  const [hasSkab, setHasSkab] = useState<boolean>(Boolean(order.hasSkab));
  const [hasSkb, setHasSkb] = useState<boolean>(Boolean(order.hasSkb));
  const [hasRoyalty, setHasRoyalty] = useState<boolean>(
    Boolean(order.hasRoyalty),
  );
  const [hasLhv, setHasLhv] = useState<boolean>(Boolean(order.hasLhv));
  const [hasBo, setHasBo] = useState<boolean>(Boolean(order.hasBo));

  // Berkas Trigger Finance (MOM Part 2)
  // RKBM
  const [rkbmMuatFile, setRkbmMuatFile] = useState<File | null>(null);
  const [rkbmBongkarFile, setRkbmBongkarFile] = useState<File | null>(null);
  // PBM (5 Dokumen Wajib)
  const [sofFile, setSofFile] = useState<File | null>(null);
  const [fenderFile, setFenderFile] = useState<File | null>(null);
  const [staleweightFile, setStaleweightFile] = useState<File | null>(null);
  const [finalDsrFile, setFinalDsrFile] = useState<File | null>(null);
  const [noDamageFile, setNoDamageFile] = useState<File | null>(null);
  // Kepabeanan & COO
  const [pebFile, setPebFile] = useState<File | null>(null);
  const [cooFile, setCooFile] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedDsr = finalDsr.trim()
      ? parseFloat(finalDsr.replace(/\./g, "").replace(",", "."))
      : undefined;

    // Evaluasi Trigger Finance otomatis
    let isFinanceReady = false;

    if (isRkbm) {
      const hasMuat = Boolean(
        rkbmMuatFile || order.rkbmMuatDocName || order.rkbmDocName,
      );
      const hasBongkar = Boolean(rkbmBongkarFile || order.rkbmBongkarDocName);
      if (order.rkbmType === "Muat & Bongkar") {
        isFinanceReady = hasMuat && hasBongkar;
      } else if (order.rkbmType === "Bongkar") {
        isFinanceReady = hasBongkar;
      } else {
        isFinanceReady = hasMuat;
      }
    } else if (isPbm) {
      const hasSof = Boolean(sofFile || order.sofDocName);
      const hasFender = Boolean(fenderFile || order.fenderDocName);
      const hasStaleweight = Boolean(staleweightFile || order.staleweightDocName);
      const hasFinalDsrDoc = Boolean(finalDsrFile || order.finalDsrDocName);
      const hasNoDamage = Boolean(noDamageFile || order.noDamageDocName);
      isFinanceReady =
        hasSof && hasFender && hasStaleweight && hasFinalDsrDoc && hasNoDamage;
    } else if (isCustoms) {
      const hasPeb = Boolean(pebFile || order.pebDocName);
      const hasCoo = Boolean(cooFile || order.cooDocName);
      if (order.includeCoo) {
        isFinanceReady = hasPeb && hasCoo;
      } else {
        isFinanceReady = hasPeb;
      }
    }

    const calculatedStatus = isFinanceReady
      ? "Siap Ditagihkan"
      : order.status === "Siap Ditagihkan" || order.status === "Lunas"
        ? order.status
        : "Proses Muat";

    onSave(order.id, {
      position: position.trim(),
      positionUpdatedAt: positionUpdatedAt || undefined,
      commencedDate: commencedDate || undefined,
      completedDate: completedDate || undefined,
      etaPol: etaPol || undefined,
      etaPod: etaPod || undefined,
      loadingStartDate: loadingStartDate || undefined,
      loadingEndDate: loadingEndDate || undefined,
      dischargeStartDate: dischargeStartDate || undefined,
      dischargeEndDate: dischargeEndDate || undefined,
      loadingDate: loadingStartDate || undefined,
      vesselCompleteDate:
        completedDate || dischargeEndDate || loadingEndDate || undefined,
      finalDsr: isNaN(parsedDsr as number) ? undefined : parsedDsr,
      operationalNotes: operationalNotes.trim(),
      hasSkab,
      hasSkb,
      hasRoyalty,
      hasLhv,
      hasBo,
      rkbmNo: order.rkbmNo || "-",
      captainPhone: captainPhone.trim(),
      agent: agent.trim(),
      bargeNomination: order.bargeNomination,
      shipmentType: order.shipmentType,
      status: calculatedStatus,

      // Dokumen Trigger RKBM
      rkbmMuatDocName: rkbmMuatFile
        ? rkbmMuatFile.name
        : order.rkbmMuatDocName || order.rkbmDocName,
      rkbmMuatDocUrl: rkbmMuatFile
        ? URL.createObjectURL(rkbmMuatFile)
        : order.rkbmMuatDocUrl || order.rkbmDocUrl,
      rkbmBongkarDocName: rkbmBongkarFile
        ? rkbmBongkarFile.name
        : order.rkbmBongkarDocName,
      rkbmBongkarDocUrl: rkbmBongkarFile
        ? URL.createObjectURL(rkbmBongkarFile)
        : order.rkbmBongkarDocUrl,

      // Dokumen Trigger PBM
      sofDocName: sofFile ? sofFile.name : order.sofDocName,
      sofDocUrl: sofFile ? URL.createObjectURL(sofFile) : order.sofDocUrl,
      fenderDocName: fenderFile ? fenderFile.name : order.fenderDocName,
      fenderDocUrl: fenderFile
        ? URL.createObjectURL(fenderFile)
        : order.fenderDocUrl,
      staleweightDocName: staleweightFile
        ? staleweightFile.name
        : order.staleweightDocName,
      staleweightDocUrl: staleweightFile
        ? URL.createObjectURL(staleweightFile)
        : order.staleweightDocUrl,
      finalDsrDocName: finalDsrFile ? finalDsrFile.name : order.finalDsrDocName,
      finalDsrDocUrl: finalDsrFile
        ? URL.createObjectURL(finalDsrFile)
        : order.finalDsrDocUrl,
      noDamageDocName: noDamageFile ? noDamageFile.name : order.noDamageDocName,
      noDamageDocUrl: noDamageFile
        ? URL.createObjectURL(noDamageFile)
        : order.noDamageDocUrl,

      // Dokumen Trigger Kepabeanan & COO
      pebDocName: pebFile ? pebFile.name : order.pebDocName,
      pebDocUrl: pebFile ? URL.createObjectURL(pebFile) : order.pebDocUrl,
      cooDocName: cooFile ? cooFile.name : order.cooDocName,
      cooDocUrl: cooFile ? URL.createObjectURL(cooFile) : order.cooDocUrl,
    });

    onClose();
  };

  const agentOptions = [
    { label: "Pilih Agen Kapal", value: "" },
    ...agentList.map((ag) => ({ label: ag, value: ag })),
  ];

  const positionOptions = [
    { label: "Pilih Posisi Terkini", value: "" },
    ...locationList.map((pos) => ({ label: pos, value: pos })),
    ...(position && !locationList.includes(position)
      ? [{ label: position, value: position }]
      : []),
  ];

  return {
    captainPhone,
    setCaptainPhone,
    agent,
    setAgent,
    showMuat,
    showBongkar,
    position,
    setPosition,
    positionUpdatedAt,
    setPositionUpdatedAt,
    commencedDate,
    setCommencedDate,
    completedDate,
    setCompletedDate,
    etaPol,
    setEtaPol,
    etaPod,
    setEtaPod,
    loadingStartDate,
    setLoadingStartDate,
    loadingEndDate,
    setLoadingEndDate,
    dischargeStartDate,
    setDischargeStartDate,
    dischargeEndDate,
    setDischargeEndDate,
    finalDsr,
    setFinalDsr,
    operationalNotes,
    setOperationalNotes,
    hasSkab,
    setHasSkab,
    hasSkb,
    setHasSkb,
    hasRoyalty,
    setHasRoyalty,
    hasLhv,
    setHasLhv,
    hasBo,
    setHasBo,
    // File Triggers
    rkbmMuatFile,
    setRkbmMuatFile,
    rkbmBongkarFile,
    setRkbmBongkarFile,
    sofFile,
    setSofFile,
    fenderFile,
    setFenderFile,
    staleweightFile,
    setStaleweightFile,
    finalDsrFile,
    setFinalDsrFile,
    noDamageFile,
    setNoDamageFile,
    pebFile,
    setPebFile,
    cooFile,
    setCooFile,
    handleSubmit,
    agentOptions,
    positionOptions,
  };
};

export type UseUpdateRkbmModalReturn = ReturnType<typeof useUpdateRkbmModal>;
