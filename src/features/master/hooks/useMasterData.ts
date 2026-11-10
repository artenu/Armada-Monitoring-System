import { useState, useEffect, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Users,
  Anchor,
  Boxes,
  MapPin,
  Navigation,
  Building2,
  DollarSign,
} from "lucide-react";
import type { CustomerContractRate } from "@/types/finance/financeTypes";
import {
  getContractRatesFromStorage,
  saveContractRatesToStorage,
} from "@/data/pricing-data";
import type {
  MasterItem,
  MasterResourceKey,
  TabKey,
  TabItem,
  MasterFormData,
  ContractRateFormData,
  NpwpPreviewData,
} from "@/types/master/master-data";
import { INITIAL_MASTER_DATA, MASTER_CONFIGS } from "@/data/master-mock";

const STORAGE_KEY = "gds_master_data_v1";

export const TAB_ITEMS: TabItem[] = [
  { key: "customer", label: "Customer", icon: Users },
  { key: "tarif", label: "Tarif Kontrak", icon: DollarSign },
  { key: "tug-boat", label: "Tug Boat", icon: Anchor },
  { key: "barge", label: "Barge", icon: Boxes },
  { key: "agen", label: "Agen Kapal", icon: Building2 },
  { key: "lokasi", label: "Lokasi Operasional", icon: MapPin },
  { key: "pol", label: "POL (Loading)", icon: Navigation },
  { key: "pod", label: "POD (Discharge)", icon: MapPin },
];

export const useMasterData = () => {
  const { resource } = useParams<{ resource?: string }>();
  const navigate = useNavigate();

  const isTarifTab = resource === "tarif";

  // Validasi tab aktif dari URL
  const activeTab: MasterResourceKey =
    resource && resource in MASTER_CONFIGS
      ? (resource as MasterResourceKey)
      : "customer";

  // State master data reguler dengan simpanan localStorage
  const [dataStore, setDataStore] = useState<
    Record<MasterResourceKey, MasterItem[]>
  >(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<
          MasterResourceKey,
          MasterItem[]
        >;
        return {
          ...INITIAL_MASTER_DATA,
          ...parsed,
          agen:
            parsed.agen && parsed.agen.length > 0
              ? parsed.agen
              : INITIAL_MASTER_DATA.agen,
        };
      } catch {
        return INITIAL_MASTER_DATA;
      }
    }
    return INITIAL_MASTER_DATA;
  });

  // State master data Tarif Kontrak
  const [contractRates, setContractRates] = useState<CustomerContractRate[]>(
    () => getContractRatesFromStorage(),
  );
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [editingContract, setEditingContract] =
    useState<CustomerContractRate | null>(null);

  // Form state khusus Tarif Kontrak
  const [contractForm, setContractForm] = useState<ContractRateFormData>({
    customerId: "",
    customerName: "",
    pbmRatePerTon: undefined,
    rkbmBongkarFee: undefined,
    rkbmMuatPrivateFee: undefined,
    rkbmMuatPublicFee: undefined,
    kepabeananFee: undefined,
    cooFee: undefined,
    notes: "",
    status: "Aktif",
  });

  useEffect(() => {
    saveContractRatesToStorage(contractRates);
  }, [contractRates]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MasterItem | null>(null);

  const [previewNpwp, setPreviewNpwp] = useState<NpwpPreviewData | null>(null);

  // Form state reguler
  const [formData, setFormData] = useState<MasterFormData>({
    nama: "",
    subDetail: "",
    kontak: "",
    picName: "",
    npwpDocName: "",
    npwpDocUrl: "",
    status: "Aktif",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStore));
  }, [dataStore]);

  const currentConfig = MASTER_CONFIGS[activeTab] || MASTER_CONFIGS.customer;
  const items = dataStore[activeTab] || [];

  const filteredItems = items.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subDetail &&
        item.subDetail.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const filteredContracts = contractRates.filter(
    (cr) =>
      cr.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cr.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cr.notes && cr.notes.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Handlers Master Reguler
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      nama: "",
      subDetail: "",
      kontak: "",
      picName: "",
      npwpDocName: "",
      npwpDocUrl: "",
      status: "Aktif",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MasterItem) => {
    setEditingItem(item);
    setFormData({
      nama: item.nama,
      subDetail: item.subDetail || "",
      kontak: item.kontak || "",
      picName: item.picName || "",
      npwpDocName: item.npwpDocName || "",
      npwpDocUrl: item.npwpDocUrl || "",
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSaveItem = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim()) {return;}

    if (editingItem) {
      const updated = items.map((it) =>
        it.id === editingItem.id
          ? {
              ...it,
              nama: formData.nama,
              subDetail: formData.subDetail,
              kontak: formData.kontak,
              picName: formData.picName,
              npwpDocName: formData.npwpDocName,
              npwpDocUrl: formData.npwpDocUrl,
              status: formData.status,
            }
          : it,
      );
      setDataStore({ ...dataStore, [activeTab]: updated });
    } else {
      const newItem: MasterItem = {
        id: String(Date.now()),
        kode: `${currentConfig.prefix}-${String(items.length + 1).padStart(3, "0")}`,
        nama: formData.nama,
        subDetail: formData.subDetail,
        kontak: formData.kontak,
        picName: formData.picName,
        npwpDocName: formData.npwpDocName,
        npwpDocUrl: formData.npwpDocUrl,
        status: formData.status,
      };
      setDataStore({ ...dataStore, [activeTab]: [...items, newItem] });
    }

    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      const updated = items.filter((it) => it.id !== id);
      setDataStore({ ...dataStore, [activeTab]: updated });
    }
  };

  // Handlers Tarif Kontrak
  const handleOpenAddContract = () => {
    setEditingContract(null);
    setContractForm({
      customerId: "",
      customerName: "",
      pbmRatePerTon: undefined,
      rkbmBongkarFee: undefined,
      rkbmMuatPrivateFee: undefined,
      rkbmMuatPublicFee: undefined,
      kepabeananFee: undefined,
      cooFee: undefined,
      notes: "",
      status: "Aktif",
    });
    setIsContractModalOpen(true);
  };

  const handleOpenEditContract = (rate: CustomerContractRate) => {
    setEditingContract(rate);
    setContractForm({
      customerId: rate.customerId,
      customerName: rate.customerName,
      pbmRatePerTon: rate.pbmRatePerTon,
      rkbmBongkarFee: rate.rkbmBongkarFee,
      rkbmMuatPrivateFee: rate.rkbmMuatPrivateFee,
      rkbmMuatPublicFee: rate.rkbmMuatPublicFee,
      kepabeananFee: rate.kepabeananFee,
      cooFee: rate.cooFee,
      notes: rate.notes || "",
      status: rate.status || "Aktif",
    });
    setIsContractModalOpen(true);
  };

  const handleSaveContract = (e: FormEvent) => {
    e.preventDefault();
    if (!contractForm.customerName.trim()) {
      alert("Nama Customer wajib dipilih.");
      return;
    }

    if (editingContract) {
      setContractRates((prev) =>
        prev.map((c) =>
          c.id === editingContract.id
            ? {
                ...c,
                customerId: contractForm.customerId,
                customerName: contractForm.customerName,
                pbmRatePerTon: contractForm.pbmRatePerTon ?? 0,
                rkbmBongkarFee: contractForm.rkbmBongkarFee ?? 0,
                rkbmMuatPrivateFee: contractForm.rkbmMuatPrivateFee ?? 0,
                rkbmMuatPublicFee: contractForm.rkbmMuatPublicFee ?? 0,
                kepabeananFee: contractForm.kepabeananFee ?? 0,
                cooFee: contractForm.cooFee ?? 0,
                notes: contractForm.notes.trim(),
                status: contractForm.status,
              }
            : c,
        ),
      );
    } else {
      const newRate: CustomerContractRate = {
        id: `RATE-${String(contractRates.length + 1).padStart(3, "0")}`,
        customerId:
          contractForm.customerId.trim() ||
          contractForm.customerName.toUpperCase().slice(0, 6),
        customerName: contractForm.customerName.trim(),
        pbmRatePerTon: contractForm.pbmRatePerTon ?? 0,
        rkbmBongkarFee: contractForm.rkbmBongkarFee ?? 0,
        rkbmMuatPrivateFee: contractForm.rkbmMuatPrivateFee ?? 0,
        rkbmMuatPublicFee: contractForm.rkbmMuatPublicFee ?? 0,
        kepabeananFee: contractForm.kepabeananFee ?? 0,
        cooFee: contractForm.cooFee ?? 0,
        notes: contractForm.notes.trim(),
        status: contractForm.status,
      };
      setContractRates((prev) => [...prev, newRate]);
    }

    setIsContractModalOpen(false);
  };

  const handleDeleteContract = (id?: string) => {
    if (!id) {return;}
    if (confirm("Apakah Anda yakin ingin menghapus data tarif kontrak ini?")) {
      setContractRates((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleSelectTab = (key: TabKey) => {
    setSearchQuery("");
    navigate(`/master-data/${key}`);
  };

  const getTabCount = (key: TabKey) => {
    if (key === "tarif") {return contractRates.length;}
    return dataStore[key]?.length || 0;
  };

  return {
    isTarifTab,
    activeTab,
    currentConfig,
    dataStore,
    tabItems: TAB_ITEMS,
    searchQuery,
    setSearchQuery,
    filteredItems,
    filteredContracts,
    handleSelectTab,
    getTabCount,
    // Master Item modal & handlers
    isModalOpen,
    setIsModalOpen,
    editingItem,
    formData,
    setFormData,
    handleOpenAddModal,
    handleOpenEditModal,
    handleSaveItem,
    handleDeleteItem,
    // Contract modal & handlers
    isContractModalOpen,
    setIsContractModalOpen,
    editingContract,
    contractForm,
    setContractForm,
    handleOpenAddContract,
    handleOpenEditContract,
    handleSaveContract,
    handleDeleteContract,
    // NPWP Preview
    previewNpwp,
    setPreviewNpwp,
  };
};

export type UseMasterDataReturn = ReturnType<typeof useMasterData>;
