import { create } from "zustand";
import { userService } from "@/features/users/services/user-service";
import { INITIAL_USERS } from "@/data/user-mock";
import type { UserRole, ManagedUser, UserInputPayload } from "@/types";

export type { UserRole, ManagedUser, UserInputPayload };
export { INITIAL_USERS };

interface UserState {
  users: ManagedUser[];
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (payload: UserInputPayload) => Promise<void>;
  updateUser: (id: string, updated: Partial<ManagedUser>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  toggleUserStatus: (id: string) => Promise<void>;
  getUserById: (id: string) => ManagedUser | undefined;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: INITIAL_USERS,
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const users = await userService.getUsers();
      set({ users, isLoading: false });
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
      set({ isLoading: false });
    }
  },

  addUser: async (payload) => {
    const newUser = await userService.createUser(payload);
    set((state) => ({ users: [newUser, ...state.users] }));
  },

  updateUser: async (id, updated) => {
    const updatedUser = await userService.updateUser(id, updated);
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? updatedUser : u)),
    }));
  },

  deleteUser: async (id) => {
    await userService.deleteUser(id);
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
  },

  toggleUserStatus: async (id) => {
    const updatedUser = await userService.toggleUserStatus(id);
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? updatedUser : u)),
    }));
  },

  getUserById: (id) => {
    return get().users.find((u) => u.id === id);
  },
}));
