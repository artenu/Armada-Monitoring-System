import { apiClient, isMockMode, mockDelay } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api";
import type { OrderItem } from "@/types";
import type { OperationalUpdatePayload } from "@/types/Operational/operationalTypes";
import {
  getLocalOrders,
  jobsService,
} from "@/features/jobs/services/jobs-service";

export const operationalService = {
  // 1. Ambil Order yang masuk ke pipeline Operasional
  async getOperationalOrders(): Promise<OrderItem[]> {
    if (!isMockMode()) {
      const response = await apiClient.get<ApiResponse<OrderItem[]>>(
        "/operational/orders",
      );
      return response.data.data;
    }

    await mockDelay(250);
    const orders = getLocalOrders();
    return orders.filter((o) => o.status !== "Draft Sales");
  },

  // 2. Simpan Perizinan RKBM, Posisi Harian, & Checklist Dokumen Ops
  async updateOperational(
    orderId: string,
    payload: OperationalUpdatePayload,
  ): Promise<OrderItem> {
    if (!isMockMode()) {
      const response = await apiClient.put<ApiResponse<OrderItem>>(
        `/operational/orders/${orderId}`,
        payload,
      );
      return response.data.data;
    }

    await mockDelay(300);
    return jobsService.updateSalesOrder(orderId, {
      ...payload,
      status: "Proses Muat",
    });
  },

  // 3. Konfirmasi Selesai Muat / Bongkar & Realisasi DSR (Lanjut ke Finance)
  async completeOperation(
    orderId: string,
    payload: {
      completeDate: string;
      finalDsr: number;
      isBongkar?: boolean;
    },
  ): Promise<OrderItem> {
    if (!isMockMode()) {
      const response = await apiClient.post<ApiResponse<OrderItem>>(
        `/operational/orders/${orderId}/complete`,
        payload,
      );
      return response.data.data;
    }

    await mockDelay(300);
    const updates: Partial<OrderItem> = {
      vesselCompleteDate: payload.completeDate,
      ...(payload.isBongkar
        ? { dischargeEndDate: payload.completeDate }
        : { loadingEndDate: payload.completeDate }),
      finalDsr: payload.finalDsr,
      status: "Siap Ditagihkan",
    };

    return jobsService.updateSalesOrder(orderId, updates);
  },
};
