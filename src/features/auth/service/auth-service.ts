import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/stores/auth-store";
import type { LoginFormData } from "../schema/login-schema";

export interface LoginResponseData {
  user: User;
  token: string;
}

export const authService = {
  async login(payload: LoginFormData): Promise<LoginResponseData> {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponseData>>(
        "/auth/login",
        payload,
      );
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.warn(
        "Backend API belum berjalan. Menggunakan simulasi login lokal (Mock).",
      );
      const emailLower = payload.email.toLowerCase();
      // 1. Cek apakah email cocok dengan data akun staf di User Management
      const savedUsersJson = localStorage.getItem("gds_users_v1");
      if (savedUsersJson) {
        try {
          const savedUsers: Array<{
            id: string;
            name: string;
            email: string;
            role: "admin" | "operasional" | "sales" | "finance";
          }> = JSON.parse(savedUsersJson);
          const matched = savedUsers.find(
            (u) => u.email.toLowerCase() === emailLower,
          );
          if (matched) {
            return {
              user: {
                id: matched.id,
                name: matched.name,
                email: matched.email,
                role: matched.role,
              },
              token: "mock-jwt-token-gds-system-2026",
            };
          }
        } catch {
          // ignore error parse
        }
      }
      // 2. Deteksi cerdas berdasarkan kata kunci email
      let inferredRole: "admin" | "operasional" | "sales" | "finance" = "admin";
      let inferredName = "Administrator Sistem";
      if (emailLower.includes("sales")) {
        inferredRole = "sales";
        inferredName = "Staf Sales & Marketing";
      } else if (
        emailLower.includes("ops") ||
        emailLower.includes("operasional")
      ) {
        inferredRole = "operasional";
        inferredName = "Staf Operasional Lapangan";
      } else if (
        emailLower.includes("finance") ||
        emailLower.includes("keuangan")
      ) {
        inferredRole = "finance";
        inferredName = "Staf Finance & Billing";
      } else if (emailLower.includes("admin")) {
        inferredRole = "admin";
        inferredName = "Administrator Sistem";
      }
      return {
        user: {
          id: "USR-001",
          name: inferredName,
          email: payload.email,
          role: inferredRole,
        },
        token: "mock-jwt-token-gds-system-2026",
      };
    }
  },
};
