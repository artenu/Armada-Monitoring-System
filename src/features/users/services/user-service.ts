import { apiClient, isMockMode, mockDelay } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api";
import type { ManagedUser, UserInputPayload } from "@/types";
import { INITIAL_USERS } from "@/data/user-mock";

const STORAGE_KEY = "gds_users_v1";

const getLocalUsers = (): ManagedUser[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : INITIAL_USERS;
};

const saveLocalUsers = (users: ManagedUser[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const userService = {
  // 1. Ambil Semua Pengguna
  async getUsers(): Promise<ManagedUser[]> {
    if (!isMockMode()) {
      const response =
        await apiClient.get<ApiResponse<ManagedUser[]>>("/users");
      return response.data.data;
    }

    await mockDelay(250);
    return getLocalUsers();
  },

  // 2. Ambil Pengguna berdasarkan ID
  async getUserById(id: string): Promise<ManagedUser | undefined> {
    if (!isMockMode()) {
      const response = await apiClient.get<ApiResponse<ManagedUser>>(
        `/users/${id}`,
      );
      return response.data.data;
    }

    await mockDelay(150);
    return getLocalUsers().find((u) => u.id === id);
  },

  // 3. Tambah Pengguna Baru
  async createUser(payload: UserInputPayload): Promise<ManagedUser> {
    if (!isMockMode()) {
      const response = await apiClient.post<ApiResponse<ManagedUser>>(
        "/users",
        payload,
      );
      return response.data.data;
    }

    await mockDelay(300);
    const users = getLocalUsers();
    const nextIdNumber = users.length + 1;
    const newId = `USR-${String(nextIdNumber).padStart(3, "0")}`;
    const currentDate = new Date().toISOString().split("T")[0];

    const newUser: ManagedUser = {
      ...payload,
      id: newId,
      createdAt: currentDate,
    };

    saveLocalUsers([newUser, ...users]);
    return newUser;
  },

  // 4. Update Data Pengguna
  async updateUser(
    id: string,
    payload: Partial<ManagedUser>,
  ): Promise<ManagedUser> {
    if (!isMockMode()) {
      const response = await apiClient.put<ApiResponse<ManagedUser>>(
        `/users/${id}`,
        payload,
      );
      return response.data.data;
    }

    await mockDelay(300);
    const users = getLocalUsers();
    let updatedUser: ManagedUser | undefined;

    const nextUsers = users.map((u) => {
      if (u.id === id) {
        updatedUser = { ...u, ...payload };
        return updatedUser;
      }
      return u;
    });

    if (!updatedUser) {
      throw new Error(`User dengan ID ${id} tidak ditemukan.`);
    }

    saveLocalUsers(nextUsers);
    return updatedUser;
  },

  // 5. Hapus Pengguna
  async deleteUser(id: string): Promise<void> {
    if (!isMockMode()) {
      await apiClient.delete<ApiResponse<void>>(`/users/${id}`);
      return;
    }

    await mockDelay(250);
    const users = getLocalUsers();
    saveLocalUsers(users.filter((u) => u.id !== id));
  },

  // 6. Ubah Status Aktif / Nonaktif
  async toggleUserStatus(id: string): Promise<ManagedUser> {
    if (!isMockMode()) {
      const response = await apiClient.patch<ApiResponse<ManagedUser>>(
        `/users/${id}/status`,
      );
      return response.data.data;
    }

    await mockDelay(200);
    const users = getLocalUsers();
    let updatedUser: ManagedUser | undefined;

    const nextUsers = users.map((u) => {
      if (u.id === id) {
        updatedUser = {
          ...u,
          status: (u.status === "Aktif"
            ? "Nonaktif"
            : "Aktif") as ManagedUser["status"],
        };
        return updatedUser;
      }
      return u;
    });

    if (!updatedUser) {
      throw new Error(`User dengan ID ${id} tidak ditemukan.`);
    }

    saveLocalUsers(nextUsers);
    return updatedUser;
  },
};
