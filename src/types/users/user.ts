export type UserRole = "admin" | "sales" | "operasional" | "finance";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  token?: string;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  phone: string;
  status: "Aktif" | "Nonaktif";
  createdAt: string;
  lastLogin?: string;
}

export type UserInputPayload = Omit<
  ManagedUser,
  "id" | "createdAt" | "lastLogin"
>;

export type RoleFilter = "all" | UserRole | "nonaktif";

export interface UserStats {
  total: number;
  active: number;
  ops: number;
  salesFinance: number;
}
