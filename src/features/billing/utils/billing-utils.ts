import type { OrderItem, BillingTab } from "@/types";

export interface BillingStats {
  readyToBillCount: number;
  sentCount: number;
  sentTotal: number;
  receivedCount: number;
  receivedTotal: number;
  paidCount: number;
  paidTotal: number;
}

/**
 * 1. Cek apakah suatu order sudah masuk tahap penagihan (Finance)
 */
export const isBillingOrder = (o: OrderItem): boolean => {
  return (
    o.status === "Siap Ditagihkan" ||
    o.status === "Terkirim" ||
    o.status === "Diterima" ||
    o.status === "Lunas" ||
    o.status === "Menunggu Pembayaran" ||
    Boolean(o.finalDsr && o.vesselCompleteDate)
  );
};

export const getBillingOrders = (orders: OrderItem[]): OrderItem[] => {
  return orders.filter(isBillingOrder);
};

/**
 * 2. Hitung statistik agregat untuk 4 Kartu KPI Finance
 */
export const computeBillingStats = (
  billingOrders: OrderItem[],
): BillingStats => {
  const readyToBillCount = billingOrders.filter(
    (o) =>
      o.status === "Siap Ditagihkan" || (!o.invoiceNo && Boolean(o.finalDsr)),
  ).length;

  const sentOrders = billingOrders.filter(
    (o) => o.status === "Terkirim" || o.status === "Menunggu Pembayaran",
  );
  const sentTotal = sentOrders.reduce(
    (acc, curr) => acc + (curr.totalInvoice || 0),
    0,
  );

  const receivedOrders = billingOrders.filter((o) => o.status === "Diterima");
  const receivedTotal = receivedOrders.reduce(
    (acc, curr) => acc + (curr.totalInvoice || 0),
    0,
  );

  const paidOrders = billingOrders.filter((o) => o.status === "Lunas");
  const paidTotal = paidOrders.reduce(
    (acc, curr) => acc + (curr.totalInvoice || 0),
    0,
  );

  return {
    readyToBillCount,
    sentCount: sentOrders.length,
    sentTotal,
    receivedCount: receivedOrders.length,
    receivedTotal,
    paidCount: paidOrders.length,
    paidTotal,
  };
};

/**
 * 3. Filter order berdasarkan Tab aktif dan kata kunci pencarian
 */
export const filterBillingOrders = (
  orders: OrderItem[],
  activeTab: BillingTab,
  searchQuery: string,
): OrderItem[] => {
  return orders.filter((o) => {
    const isReadyToBill =
      o.status === "Siap Ditagihkan" || (!o.invoiceNo && Boolean(o.finalDsr));
    const isSent =
      o.status === "Terkirim" || o.status === "Menunggu Pembayaran";
    const isReceived = o.status === "Diterima";
    const isPaid = o.status === "Lunas";

    if (activeTab === "ready_to_bill" && !isReadyToBill) {return false;}
    if (activeTab === "sent" && !isSent) {return false;}
    if (activeTab === "received" && !isReceived) {return false;}
    if (activeTab === "paid" && !isPaid) {return false;}

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchCustomer = o.customer.toLowerCase().includes(query);
      const matchVessel = (o.vessel || "").toLowerCase().includes(query);
      const matchInvoice = o.invoiceNo?.toLowerCase().includes(query) || false;
      const matchId = o.id.toLowerCase().includes(query);
      return matchCustomer || matchVessel || matchInvoice || matchId;
    }
    return true;
  });
};
