import { useState, useEffect, useMemo } from "react";
import { useOrderStore } from "@/stores/order-store";
import type { OrderFormData } from "../schema/order-schema";
import { computeJobStats, filterJobs, buildNewOrder } from "../utils/job-utils";

export const useJobs = () => {
  const { orders, fetchOrders, addOrder, deleteOrder, sendToOperational } =
    useOrderStore();

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Statistik 4 Kartu KPI
  const stats = useMemo(() => computeJobStats(orders), [orders]);

  // Data Terfilter Pencarian
  const filteredOrders = useMemo(
    () => filterJobs(orders, searchQuery),
    [orders, searchQuery],
  );

  // Handler Hapus Draft Order
  const handleDeleteOrder = (orderId: string) => {
    const isConfirm = window.confirm(
      `Apakah Anda yakin ingin menghapus draft order ${orderId}? Data yang dihapus tidak dapat dikembalikan.`,
    );
    if (!isConfirm) {return;}
    void deleteOrder(orderId);
  };

  // Handler Kirim ke Operasional
  const handleSendToOperational = (orderId: string) => {
    const isConfirm = window.confirm(
      `Apakah Anda yakin ingin mengirim order ${orderId} ke tim Operasional?`,
    );
    if (!isConfirm) {return;}
    void sendToOperational(orderId);
  };

  // Handler Simpan Order Baru
  const handleSaveOrder = (
    data: OrderFormData,
    files: {
      spDocName?: string;
      spDocUrl?: string;
      rkbmDocName?: string;
      rkbmDocUrl?: string;
      rkbmBongkarDocName?: string;
      rkbmBongkarDocUrl?: string;
    },
  ) => {
    const newOrder = buildNewOrder(data, files, orders.length);
    void addOrder(newOrder);
  };

  return {
    orders,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    stats,
    filteredOrders,
    handleDeleteOrder,
    handleSendToOperational,
    handleSaveOrder,
  };
};
