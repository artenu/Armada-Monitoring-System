import { create } from "zustand";
import type { User } from "@/types";
export type { User };

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = localStorage.getItem("user_data");
  const storedToken = localStorage.getItem("auth_token");

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAuthenticated: Boolean(storedToken),
    setAuth: (user, token) => {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(user));
      set({ user, token, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      set({ user: null, token: null, isAuthenticated: false });
    },
  };
});
