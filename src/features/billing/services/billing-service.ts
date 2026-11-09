import { apiClient, isMockMode, mockDelay } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api";
import type { OrderItem } from "@/types";
import type { InvoicePayload } from "@/types/finance/financeTypes";
import {
  getLocalOrders,
  jobsService,
} from "@/features/jobs/services/jobs-service";

export const billingService = {
  // 1. Ambil Order yang masuk ke pipeline Finance
  async getBillingOrders(): Promise<OrderItem[]> {
    if (!isMockMode()) {
      const response =
        await apiClient.get<ApiResponse<OrderItem[]>>("/billing/orders");
      return response.data.data;
    }

    await mockDelay(250);
    const orders = getLocalOrders();
    return orders.filter(
      (o) =>
        o.status === "Siap Ditagihkan" ||
        o.status === "Terkirim" ||
        o.status === "Diterima" ||
        o.status === "Lunas",
    );
  },

  // 2. Terbitkan Faktur & Kirim ke Customer (Status -> Terkirim)
  async processInvoice(
    orderId: string,
    payload: InvoicePayload,
  ): Promise<OrderItem> {
    if (!isMockMode()) {
      const response = await apiClient.post<ApiResponse<OrderItem>>(
        `/billing/orders/${orderId}/invoice`,
        payload,
      );
      return response.data.data;
    }

    await mockDelay(300);
    const currentDate = new Date().toISOString().split("T")[0];
    return jobsService.updateSalesOrder(orderId, {
      ...payload,
      status: "Terkirim",
      sentDate: currentDate,
    });
  },

  // 3. Konfirmasi Faktur Diterima Customer (Status -> Diterima)
  async markAsReceived(
    orderId: string,
    receivedDate?: string,
  ): Promise<OrderItem> {
    if (!isMockMode()) {
      const response = await apiClient.patch<ApiResponse<OrderItem>>(
        `/billing/orders/${orderId}/received`,
        { receivedDate },
      );
      return response.data.data;
    }

    await mockDelay(250);
    const date = receivedDate || new Date().toISOString().split("T")[0];
    return jobsService.updateSalesOrder(orderId, {
      status: "Diterima",
      receivedDate: date,
    });
  },

  // 4. Konfirmasi Pembayaran Lunas (Status -> Lunas)
  async confirmPayment(
    orderId: string,
    payload: {
      paymentDate: string;
      paymentNotes?: string;
    },
  ): Promise<OrderItem> {
    if (!isMockMode()) {
      const response = await apiClient.post<ApiResponse<OrderItem>>(
        `/billing/orders/${orderId}/payment`,
        payload,
      );
      return response.data.data;
    }

    await mockDelay(300);
    return jobsService.updateSalesOrder(orderId, {
      status: "Lunas",
      paymentDate: payload.paymentDate,
      paymentNotes: payload.paymentNotes,
    });
  },
};
