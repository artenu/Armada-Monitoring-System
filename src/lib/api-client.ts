import axios, { type AxiosError } from "axios";
import type { ApiFieldError, ApiErrorResponse } from "@/types/api";

// Class kustom error penyeragam error API di seluruh frontend
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: ApiFieldError[],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Cek apakah sistem sedang berjalan dalam mode simulasi lokal
export const isMockMode = (): boolean => {
  return import.meta.env.VITE_USE_MOCK !== "false";
};

// Delay simulasi agar terasa seperti latency jaringan nyata (200-400ms)
export const mockDelay = (ms = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Otomatis sisipkan token JWT di header Authorization
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Tangani error & sesi kedaluwarsa (401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status ?? 0;
    const data = error.response?.data;
    const message =
      data?.message || error.message || "Terjadi kesalahan sistem";
    const errors = data?.errors;

    // Jika 401 unauthorized dan bukan di halaman login, bersihkan sesi & redirect
    if (status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      window.location.href = "/login";
    }

    return Promise.reject(new ApiError(status, message, errors));
  },
);
