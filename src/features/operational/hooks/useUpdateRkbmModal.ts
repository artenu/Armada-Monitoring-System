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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedDsr = finalDsr.trim()
      ? parseFloat(finalDsr.replace(/\./g, "").replace(",", "."))
      : undefined;

    onSave(order.id, {
      position: position.trim(),
      etaPol: etaPol || undefined,
      etaPod: etaPod || undefined,
      loadingStartDate: loadingStartDate || undefined,
      loadingEndDate: loadingEndDate || undefined,
      dischargeStartDate: dischargeStartDate || undefined,
      dischargeEndDate: dischargeEndDate || undefined,
      loadingDate: loadingStartDate || undefined,
      vesselCompleteDate: dischargeEndDate || loadingEndDate || undefined,
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
    handleSubmit,
    agentOptions,
    positionOptions,
  };
};

export type UseUpdateRkbmModalReturn = ReturnType<typeof useUpdateRkbmModal>;
