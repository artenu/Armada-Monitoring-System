import { apiClient, isMockMode, mockDelay } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api";
import type { MasterItem, MasterResourceKey } from "@/types/master/master-data";
import type { CustomerContractRate } from "@/types/finance/financeTypes";
import { INITIAL_MASTER_DATA } from "@/data/master-mock";
import {
  getContractRatesFromStorage,
  saveContractRatesToStorage,
} from "@/data/pricing-data";

const MASTER_STORAGE_KEY = "gds_master_data_v3";

const getLocalMasterStore = (): Record<MasterResourceKey, MasterItem[]> => {
  try {
    const raw = localStorage.getItem(MASTER_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return INITIAL_MASTER_DATA;
};

const saveLocalMasterStore = (
  store: Record<MasterResourceKey, MasterItem[]>,
): void => {
  localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify(store));
};

export const masterService = {
  // 1. Ambil Data Master Resource (customer, tug-boat, barge, lokasi, agen, dll)
  async getMasterItems(resource: MasterResourceKey): Promise<MasterItem[]> {
    if (!isMockMode()) {
      const response = await apiClient.get<ApiResponse<MasterItem[]>>(
        `/master/${resource}`,
      );
      return response.data.data;
    }

    await mockDelay(200);
    const store = getLocalMasterStore();
    return store[resource] || [];
  },

  // 2. Simpan atau Update Master Item
  async saveMasterItem(
    resource: MasterResourceKey,
    item: MasterItem,
  ): Promise<MasterItem> {
    if (!isMockMode()) {
      const response = await apiClient.post<ApiResponse<MasterItem>>(
        `/master/${resource}`,
        item,
      );
      return response.data.data;
    }

    await mockDelay(250);
    const store = getLocalMasterStore();
    const items = store[resource] || [];
    const exists = items.some((it) => it.id === item.id);

    const nextItems = exists
      ? items.map((it) => (it.id === item.id ? item : it))
      : [...items, item];

    saveLocalMasterStore({ ...store, [resource]: nextItems });
    return item;
  },

  // 3. Hapus Master Item
  async deleteMasterItem(
    resource: MasterResourceKey,
    id: string,
  ): Promise<void> {
    if (!isMockMode()) {
      await apiClient.delete<ApiResponse<void>>(`/master/${resource}/${id}`);
      return;
    }

    await mockDelay(200);
    const store = getLocalMasterStore();
    const items = store[resource] || [];
    saveLocalMasterStore({
      ...store,
      [resource]: items.filter((it) => it.id !== id),
    });
  },

  // 4. Ambil Data Tarif Kontrak Customer
  async getContractRates(): Promise<CustomerContractRate[]> {
    if (!isMockMode()) {
      const response = await apiClient.get<ApiResponse<CustomerContractRate[]>>(
        "/master/contract-rates",
      );
      return response.data.data;
    }

    await mockDelay(200);
    return getContractRatesFromStorage();
  },

  // 5. Simpan / Update Tarif Kontrak Customer
  async saveContractRate(
    rate: CustomerContractRate,
  ): Promise<CustomerContractRate> {
    if (!isMockMode()) {
      const response = await apiClient.post<ApiResponse<CustomerContractRate>>(
        "/master/contract-rates",
        rate,
      );
      return response.data.data;
    }

    await mockDelay(250);
    const rates = getContractRatesFromStorage();
    const exists = rates.some((r) => r.id === rate.id);

    const nextRates = exists
      ? rates.map((r) => (r.id === rate.id ? rate : r))
      : [rate, ...rates];

    saveContractRatesToStorage(nextRates);
    return rate;
  },
};
