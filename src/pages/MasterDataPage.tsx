import { useMasterData } from "@/features/master/hooks/useMasterData";
import {
  MasterHeader,
  MasterTabBar,
  MasterSearchBar,
  MasterItemTable,
  ContractRateTable,
  MasterItemModal,
  ContractRateModal,
  NpwpPreviewModal,
} from "@/features/master/components";

export const MasterDataPage = () => {
  const master = useMasterData();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Header & Aksi Tambah */}
      <MasterHeader
        isTarifTab={master.isTarifTab}
        currentConfig={master.currentConfig}
        onAdd={
          master.isTarifTab
            ? master.handleOpenAddContract
            : master.handleOpenAddModal
        }
      />

      {/* 2. Tab Kategori Master Data */}
      <MasterTabBar
        tabItems={master.tabItems}
        isTarifTab={master.isTarifTab}
        activeTab={master.activeTab}
        onSelectTab={master.handleSelectTab}
        getTabCount={master.getTabCount}
      />

      {/* 3. Bar Pencarian */}
      <MasterSearchBar
        isTarifTab={master.isTarifTab}
        currentConfig={master.currentConfig}
        searchQuery={master.searchQuery}
        onSearchChange={master.setSearchQuery}
      />

      {/* 4. Tabel Master (Tarif Kontrak atau Master Reguler) */}
      {master.isTarifTab ? (
        <ContractRateTable
          contracts={master.filteredContracts}
          onEdit={master.handleOpenEditContract}
          onDelete={master.handleDeleteContract}
        />
      ) : (
        <MasterItemTable
          items={master.filteredItems}
          activeTab={master.activeTab}
          currentConfig={master.currentConfig}
          onEdit={master.handleOpenEditModal}
          onDelete={master.handleDeleteItem}
        />
      )}

      {/* 5. Modals */}
      <MasterItemModal
        isOpen={master.isModalOpen}
        editingItem={master.editingItem}
        activeTab={master.activeTab}
        currentConfig={master.currentConfig}
        formData={master.formData}
        onFormDataChange={master.setFormData}
        onSave={master.handleSaveItem}
        onClose={() => master.setIsModalOpen(false)}
        onPreviewNpwp={master.setPreviewNpwp}
      />

      <ContractRateModal
        isOpen={master.isContractModalOpen}
        editingContract={master.editingContract}
        customers={master.dataStore.customer}
        contractForm={master.contractForm}
        onFormChange={master.setContractForm}
        onSave={master.handleSaveContract}
        onClose={() => master.setIsContractModalOpen(false)}
      />

      <NpwpPreviewModal
        previewData={master.previewNpwp}
        onClose={() => master.setPreviewNpwp(null)}
      />
    </div>
  );
};
