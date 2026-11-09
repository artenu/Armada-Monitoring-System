import { useState, useMemo, useEffect } from "react";
import { useUserStore } from "@/stores/user-store";
import type {
  ManagedUser,
  UserInputPayload,
  RoleFilter,
  UserStats,
} from "@/types";

export const useUsers = () => {
  const {
    users,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
  } = useUserStore();

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<RoleFilter>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserToEdit, setSelectedUserToEdit] =
    useState<ManagedUser | null>(null);

  // Statistik Ringkasan KPI
  const stats: UserStats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "Aktif").length;
    const ops = users.filter((u) => u.role === "operasional").length;
    const salesFinance = users.filter(
      (u) => u.role === "sales" || u.role === "finance",
    ).length;
    return { total, active, ops, salesFinance };
  }, [users]);

  // Filter Data Staf
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (activeTab === "nonaktif" && u.status !== "Nonaktif") return false;
      if (
        activeTab !== "all" &&
        activeTab !== "nonaktif" &&
        u.role !== activeTab
      ) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = u.name.toLowerCase().includes(q);
        const matchEmail = u.email.toLowerCase().includes(q);
        const matchRole = u.role.toLowerCase().includes(q);
        const matchDept = u.department.toLowerCase().includes(q);
        const matchPhone = u.phone.toLowerCase().includes(q);
        return matchName || matchEmail || matchRole || matchDept || matchPhone;
      }

      return true;
    });
  }, [users, activeTab, searchQuery]);

  const handleOpenCreateModal = () => {
    setSelectedUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (u: ManagedUser) => {
    setSelectedUserToEdit(u);
    setIsModalOpen(true);
  };

  const handleSaveUser = (payload: UserInputPayload) => {
    if (selectedUserToEdit) {
      updateUser(selectedUserToEdit.id, payload);
    } else {
      addUser(payload);
    }
  };

  const handleDeleteConfirm = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus user "${name}"?`)) {
      deleteUser(id);
    }
  };

  return {
    users,
    stats,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredUsers,
    isModalOpen,
    setIsModalOpen,
    selectedUserToEdit,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleSaveUser,
    handleDeleteConfirm,
    toggleUserStatus,
  };
};

export type UseUsersReturn = ReturnType<typeof useUsers>;
