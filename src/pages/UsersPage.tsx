import { useUsers } from "@/features/users/hooks/useUsers";
import {
  UserHeader,
  UserKpiCards,
  UserFilterBar,
  UserTable,
  UserFormModal,
} from "@/features/users/components";

export const UsersPage = () => {
  const {
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
  } = useUsers();

  return (
    <div className="space-y-6">
      {/* 1. Header Halaman */}
      <UserHeader onAdd={handleOpenCreateModal} />

      {/* 2. KPI Cards */}
      <UserKpiCards stats={stats} />

      {/* 3. Filter Tabs & Search Bar */}
      <UserFilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={stats.total}
      />

      {/* 4. Tabel Pengguna */}
      <UserTable
        users={filteredUsers}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteConfirm}
        onToggleStatus={toggleUserStatus}
      />

      {/* 5. Modal Tambah / Edit Pengguna */}
      <UserFormModal
        isOpen={isModalOpen}
        userToEdit={selectedUserToEdit}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
};
