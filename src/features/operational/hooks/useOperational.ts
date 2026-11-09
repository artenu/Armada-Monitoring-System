import { useState, useMemo, useEffect } from "react";
import { useOrderStore } from "@/stores/order-store";
import type {
  OrderItem,
  OperationalTab,
  OperationalUpdatePayload,
} from "@/types";
import {
  getOperationalOrders,
  computeOperationalStats,
  filterOperationalOrders,
} from "../utils/operational-utils";

export const useOperational = () => {
  const { orders, fetchOrders, updateOrder } = useOrderStore();

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  const [activeTab, setActiveTab] = useState<OperationalTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedOrderForRkbm, setSelectedOrderForRkbm] =
    useState<OrderItem | null>(null);
  const [selectedOrderForComplete, setSelectedOrderForComplete] =
    useState<OrderItem | null>(null);

  const operationalOrders = useMemo(
    () => getOperationalOrders(orders),
    [orders],
  );
  const stats = useMemo(
    () => computeOperationalStats(operationalOrders),
    [operationalOrders],
  );
  const filteredOrders = useMemo(
    () => filterOperationalOrders(operationalOrders, activeTab, searchQuery),
    [operationalOrders, activeTab, searchQuery],
  );

  const handleSaveRkbm = (
    orderId: string,
    payload: OperationalUpdatePayload,
  ) => {
    void updateOrder(orderId, {
      ...payload,
      status: "Proses Muat",
    });
  };

  const handleCompleteLoading = (
    orderId: string,
    completeDate: string,
    finalDsr: number,
  ) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    const isBongkarOnly = targetOrder?.rkbmType === "Bongkar";

    void updateOrder(orderId, {
      vesselCompleteDate: completeDate,
      ...(isBongkarOnly
        ? { dischargeEndDate: completeDate }
        : { loadingEndDate: completeDate }),
      finalDsr,
      status: "Siap Ditagihkan",
    });
  };

  return {
    orders,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedOrderForRkbm,
    setSelectedOrderForRkbm,
    selectedOrderForComplete,
    setSelectedOrderForComplete,
    stats,
    filteredOrders,
    handleSaveRkbm,
    handleCompleteLoading,
  };
};

export type UseOperationalReturn = ReturnType<typeof useOperational>;
