import { create } from "zustand";
import type { OrderItem } from "@/types";
import {
  jobsService,
  getLocalOrders,
} from "@/features/jobs/services/jobs-service";

interface OrderState {
  orders: OrderItem[];
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  addOrder: (order: OrderItem) => Promise<void>;
  updateOrder: (id: string, updated: Partial<OrderItem>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  sendToOperational: (id: string) => Promise<void>;
  getOrderById: (id: string) => OrderItem | undefined;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: getLocalOrders(),
  isLoading: false,

  fetchOrders: async () => {
    set({ isLoading: true });
    try {
      const orders = await jobsService.getSalesOrders();
      set({ orders, isLoading: false });
    } catch (err) {
      console.error("Gagal mengambil data order:", err);
      set({ isLoading: false });
    }
  },

  addOrder: async (newOrder) => {
    const created = await jobsService.createSalesOrder(newOrder);
    set((state) => ({ orders: [created, ...state.orders] }));
  },

  updateOrder: async (id, updated) => {
    const nextOrder = await jobsService.updateSalesOrder(id, updated);
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? nextOrder : o)),
    }));
  },

  deleteOrder: async (id) => {
    await jobsService.deleteSalesOrder(id);
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== id),
    }));
  },

  sendToOperational: async (id) => {
    const nextOrder = await jobsService.sendToOperational(id);
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? nextOrder : o)),
    }));
  },

  getOrderById: (id) => {
    return get().orders.find((o) => o.id === id);
  },
}));
