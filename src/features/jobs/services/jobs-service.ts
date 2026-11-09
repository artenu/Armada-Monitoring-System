import { apiClient, isMockMode, mockDelay } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api";
import type { OrderItem } from "@/types";
import { INITIAL_ORDERS } from "@/data/mock-data";

const STORAGE_KEY = "gds_orders_v1";

export const getLocalOrders = (): OrderItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : INITIAL_ORDERS;
};

export const saveLocalOrders = (orders: OrderItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const jobsService = {
  // 1. Ambil Semua Sales Order
  async getSalesOrders(): Promise<OrderItem[]> {
    if (!isMockMode()) {
      const response = await apiClient.get<ApiResponse<OrderItem[]>>("/orders");
      return response.data.data;
    }

    await mockDelay(250);
    return getLocalOrders();
  },

  // 2. Ambil Order berdasarkan ID
  async getOrderById(id: string): Promise<OrderItem | undefined> {
    if (!isMockMode()) {
      const response = await apiClient.get<ApiResponse<OrderItem>>(
        `/orders/${id}`,
      );
      return response.data.data;
    }

    await mockDelay(150);
    return getLocalOrders().find((o) => o.id === id);
  },

  // 3. Buat Sales Order Baru
  async createSalesOrder(order: OrderItem): Promise<OrderItem> {
    if (!isMockMode()) {
      const response = await apiClient.post<ApiResponse<OrderItem>>(
        "/orders",
        order,
      );
      return response.data.data;
    }

    await mockDelay(300);
    const orders = getLocalOrders();
    const nextOrders = [order, ...orders];
    saveLocalOrders(nextOrders);
    return order;
  },

  // 4. Update Sales Order
  async updateSalesOrder(
    id: string,
    updated: Partial<OrderItem>,
  ): Promise<OrderItem> {
    if (!isMockMode()) {
      const response = await apiClient.put<ApiResponse<OrderItem>>(
        `/orders/${id}`,
        updated,
      );
      return response.data.data;
    }

    await mockDelay(300);
    const orders = getLocalOrders();
    let result: OrderItem | undefined;

    const nextOrders = orders.map((o) => {
      if (o.id === id) {
        result = { ...o, ...updated };
        return result;
      }
      return o;
    });

    if (!result) {
      throw new Error(`Order ${id} tidak ditemukan.`);
    }

    saveLocalOrders(nextOrders);
    return result;
  },

  // 5. Hapus Sales Order (Draft)
  async deleteSalesOrder(id: string): Promise<void> {
    if (!isMockMode()) {
      await apiClient.delete<ApiResponse<void>>(`/orders/${id}`);
      return;
    }

    await mockDelay(250);
    const orders = getLocalOrders();
    saveLocalOrders(orders.filter((o) => o.id !== id));
  },

  // 6. Teruskan Order ke Tim Operasional Lapangan
  async sendToOperational(id: string): Promise<OrderItem> {
    if (!isMockMode()) {
      const response = await apiClient.post<ApiResponse<OrderItem>>(
        `/orders/${id}/send-to-ops`,
      );
      return response.data.data;
    }

    await mockDelay(300);
    return this.updateSalesOrder(id, { status: "Operational" });
  },
};
