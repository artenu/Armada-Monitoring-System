import { useState, useMemo } from "react";
import { useOrderStore } from "@/stores/order-store";
import type { OrderItem, BillingTab } from "@/types";
import {
  getBillingOrders,
  computeBillingStats,
  filterBillingOrders,
} from "@/features/billing/utils/billing-utils";

export const useBilling = () => {
  const { orders, updateOrder } = useOrderStore();

  const [activeTab, setActiveTab] = useState<BillingTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [selectedForInvoice, setSelectedForInvoice] =
    useState<OrderItem | null>(null);
  const [selectedForPrint, setSelectedForPrint] = useState<OrderItem | null>(
    null,
  );
  const [selectedForPay, setSelectedForPay] = useState<OrderItem | null>(null);

  // 1. Order khusus Finance
  const billingOrders = useMemo(() => {
    return getBillingOrders(orders);
  }, [orders]);

  // 2. Statistik KPI
  const stats = useMemo(() => {
    return computeBillingStats(billingOrders);
  }, [billingOrders]);

  // 3. Filtered Orders
  const filteredOrders = useMemo(() => {
    return filterBillingOrders(billingOrders, activeTab, searchQuery);
  }, [billingOrders, activeTab, searchQuery]);

  return {
    // States
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedForInvoice,
    setSelectedForInvoice,
    selectedForPrint,
    setSelectedForPrint,
    selectedForPay,
    setSelectedForPay,
    // Data & Actions
    billingOrders,
    stats,
    filteredOrders,
    updateOrder,
  };
};
