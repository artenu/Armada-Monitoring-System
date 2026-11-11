import type {
  OrderItem,
  OperationalTab,
  OperationalStats,
  RkbmChecklistSectionProps,
} from "@/types";
import { OPERATIONAL_DOCUMENTS_CONFIG } from "@/data/operational-data";
import type { ChecklistItemViewModel } from "@/types/Operational/operationalTypes";

/**
 * Filter apakah order termasuk order operasional (bukan Draft Sales)
 */
export const isOperationalOrder = (order: OrderItem): boolean => {
  return order.status !== "Draft Sales";
};

export const getOperationalOrders = (orders: OrderItem[]): OrderItem[] => {
  return orders.filter(isOperationalOrder);
};

/**
 * Helper: Cek apakah order sudah selesai tahap operasional (Selesai Muat / Siap Ditagihkan / Lunas)
 */
export const isOperationalCompleted = (order: OrderItem): boolean => {
  return (
    Boolean(order.vesselCompleteDate) ||
    order.status === "Selesai Muat" ||
    order.status === "Siap Ditagihkan" ||
    order.status === "Menunggu Pembayaran" ||
    order.status === "Terkirim" ||
    order.status === "Diterima" ||
    order.status === "Lunas"
  );
};

/**
 * Helper: Cek apakah order menunggu izin RKBM (HANYA untuk order yang BELUM selesai)
 */
export const isOperationalPendingRkbm = (order: OrderItem): boolean => {
  return (
    !isOperationalCompleted(order) &&
    (!order.rkbmNo || order.rkbmNo.trim() === "-" || order.rkbmNo === "")
  );
};

/**
 * Helper: Cek apakah order sedang aktif muat/bongkar (BELUM selesai & SUDAH ada nomor RKBM)
 */
export const isOperationalLoading = (order: OrderItem): boolean => {
  return !isOperationalCompleted(order) && !isOperationalPendingRkbm(order);
};

/**
 * Hitung ringkasan statistik tab operasional secara mutually exclusive (pasti konsisten)
 */
export const computeOperationalStats = (
  operationalOrders: OrderItem[],
): OperationalStats => {
  const total = operationalOrders.length;
  const completed = operationalOrders.filter(isOperationalCompleted).length;
  const pendingRkbm = operationalOrders.filter(isOperationalPendingRkbm).length;
  const loading = operationalOrders.filter(isOperationalLoading).length;

  return { total, pendingRkbm, loading, completed };
};

/**
 * Filter order berdasarkan active tab dan search query
 */
export const filterOperationalOrders = (
  orders: OrderItem[],
  activeTab: OperationalTab,
  searchQuery: string,
): OrderItem[] => {
  return orders.filter((order) => {
    const isPending = isOperationalPendingRkbm(order);
    const isLoading = isOperationalLoading(order);
    const isCompleted = isOperationalCompleted(order);

    if (activeTab === "pending_rkbm" && !isPending) {return false;}
    if (activeTab === "loading" && !isLoading) {return false;}
    if (activeTab === "completed" && !isCompleted) {return false;}

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(query);
      const matchVessel = (order.vessel || "").toLowerCase().includes(query);
      const matchArmada = (order.bargeNomination || "")
        .toLowerCase()
        .includes(query);
      const matchCustomer = order.customer.toLowerCase().includes(query);
      const matchRkbm = (order.rkbmNo || "").toLowerCase().includes(query);
      return (
        matchId || matchVessel || matchArmada || matchCustomer || matchRkbm
      );
    }

    return true;
  });
};

/**
 * Transformer Checklist Dokumen Operasional untuk RkbmChecklistSection
 */
export const buildChecklistItems = (
  props: RkbmChecklistSectionProps,
): ChecklistItemViewModel[] => {
  const valueMap = {
    hasSkab: { checked: props.hasSkab, onChange: props.onHasSkabChange },
    hasSkb: { checked: props.hasSkb, onChange: props.onHasSkbChange },
    hasRoyalty: {
      checked: props.hasRoyalty,
      onChange: props.onHasRoyaltyChange,
    },
    hasLhv: { checked: props.hasLhv, onChange: props.onHasLhvChange },
    hasBo: { checked: props.hasBo, onChange: props.onHasBoChange },
  };

  return OPERATIONAL_DOCUMENTS_CONFIG.map((doc) => ({
    id: doc.id,
    label: doc.label,
    description: doc.description,
    checked: valueMap[doc.key].checked,
    onChange: valueMap[doc.key].onChange,
  }));
};
