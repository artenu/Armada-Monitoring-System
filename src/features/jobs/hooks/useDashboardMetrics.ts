import { useEffect, useMemo } from "react";
import { useOrderStore } from "@/stores/order-store";
import type { OrderStatus } from "@/types/jobs/jobTypes";
import type { DashboardMetrics } from "@/types/dashboard/dashboardTypes";

export const useDashboardMetrics = () => {
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Perhitungan Metrik Sesuai MOM 7-11-2026 Part 2
  const metrics = useMemo<DashboardMetrics>(() => {
    const totalOrders = orders.length;

    // Sebaran Layanan
    const pbmCount = orders.filter((o) => o.service === "Jasa PBM").length;
    const rkbmCount = orders.filter(
      (o) => o.service === "Pengurusan RKBM",
    ).length;
    const customsCount = orders.filter(
      (o) => o.service === "Pengurusan Kepabeanan dan COO",
    ).length;

    // Status Kegiatan: Sudah Beres vs Belum Beres
    const completedStatuses: OrderStatus[] = [
      "Selesai Muat",
      "Siap Ditagihkan",
      "Menunggu Pembayaran",
      "Terkirim",
      "Diterima",
      "Lunas",
    ];
    const completedOrders = orders.filter((o) =>
      completedStatuses.includes(o.status),
    );
    const activeOrders = orders.filter(
      (o) => !completedStatuses.includes(o.status),
    );

    // Finansial: Invoiced & Lunas
    const invoicedOrders = orders.filter(
      (o) =>
        Boolean(o.invoiceNo) ||
        ["Menunggu Pembayaran", "Terkirim", "Diterima", "Lunas"].includes(
          o.status,
        ),
    );
    const totalInvoicedAmount = invoicedOrders.reduce(
      (acc, o) => acc + (o.totalInvoice || 0),
      0,
    );

    const paidOrders = orders.filter((o) => o.status === "Lunas");
    const totalPaidAmount = paidOrders.reduce(
      (acc, o) => acc + (o.totalInvoice || 0),
      0,
    );

    return {
      totalOrders,
      pbmCount,
      rkbmCount,
      customsCount,
      completedCount: completedOrders.length,
      activeCount: activeOrders.length,
      invoicedCount: invoicedOrders.length,
      totalInvoicedAmount,
      paidCount: paidOrders.length,
      totalPaidAmount,
    };
  }, [orders]);

  return {
    metrics,
    orders,
  };
};
