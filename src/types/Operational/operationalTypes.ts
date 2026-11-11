import type { OrderItem, OrderStatus } from "@/types";

export type OperationalTab = "all" | "pending_rkbm" | "loading" | "completed";

export interface OperationalOrderFields {
  position?: string;
  positionUpdatedAt?: string; // Tanggal & Jam (Datetime) update posisi armada
  etaPol?: string;
  etaPod?: string;
  etaJetty?: string;
  etaVessel?: string;
  loadingStartDate?: string;
  loadingEndDate?: string;
  dischargeStartDate?: string;
  dischargeEndDate?: string;
  loadingDate?: string;
  vesselCompleteDate?: string;
  finalDsr?: number;
  operationalNotes?: string;

  // Tanggal Mulai Commenced (Komen Slot) & Completed
  commencedDate?: string;
  completedDate?: string;

  // Checkbox Dokumen Operasional
  hasSkab?: boolean;
  hasSkb?: boolean;
  hasRoyalty?: boolean;
  hasLhv?: boolean;
  hasBo?: boolean; // Booking Order BUP

  // Dokumen Trigger Finance - RKBM (File SK RKBM Muat / Bongkar Terbit)
  rkbmMuatDocName?: string;
  rkbmMuatDocUrl?: string;
  rkbmBongkarDocName?: string;
  rkbmBongkarDocUrl?: string;

  // Dokumen Trigger Finance - Jasa PBM (5 Dokumen Wajib Siap Finance)
  sofDocName?: string;
  sofDocUrl?: string;
  fenderDocName?: string;
  fenderDocUrl?: string;
  staleweightDocName?: string;
  staleweightDocUrl?: string;
  finalDsrDocName?: string;
  finalDsrDocUrl?: string;
  noDamageDocName?: string;
  noDamageDocUrl?: string;

  // Dokumen Trigger Finance - Kepabeanan & COO
  pebDocName?: string;
  pebDocUrl?: string;
  cooDocName?: string;
  cooDocUrl?: string;

  // Berkas lama (opsional transisi)
  skabFileName?: string;
  skabFileUrl?: string;
  skbFileName?: string;
  skbFileUrl?: string;
  royaltyFileName?: string;
  royaltyFileUrl?: string;
  lhvFileName?: string;
  lhvFileUrl?: string;
  boFileName?: string;
  boFileUrl?: string;

  rkbmNo?: string;
  captainPhone?: string;
  agent?: string;
  bargeNomination?: string;
  shipmentType?: string;
}

export interface OperationalUpdatePayload {
  position: string;
  positionUpdatedAt?: string;
  etaPol?: string;
  etaPod?: string;
  etaJetty?: string;
  etaVessel?: string;
  loadingDate?: string;
  vesselCompleteDate?: string;
  finalDsr?: number;
  operationalNotes?: string;
  commencedDate?: string;
  completedDate?: string;
  hasSkab?: boolean;
  hasSkb?: boolean;
  hasRoyalty?: boolean;
  hasLhv?: boolean;
  hasBo?: boolean;
  loadingStartDate?: string;
  loadingEndDate?: string;
  dischargeStartDate?: string;
  dischargeEndDate?: string;
  lhvStatus?: string;
  boStatus?: string;
  rkbmNo?: string;
  captainPhone?: string;
  agent?: string;
  bargeNomination?: string;
  shipmentType?: string;
  status?: OrderStatus;

  // Dokumen Trigger Finance
  rkbmMuatDocName?: string;
  rkbmMuatDocUrl?: string;
  rkbmBongkarDocName?: string;
  rkbmBongkarDocUrl?: string;

  sofDocName?: string;
  sofDocUrl?: string;
  fenderDocName?: string;
  fenderDocUrl?: string;
  staleweightDocName?: string;
  staleweightDocUrl?: string;
  finalDsrDocName?: string;
  finalDsrDocUrl?: string;
  noDamageDocName?: string;
  noDamageDocUrl?: string;

  pebDocName?: string;
  pebDocUrl?: string;
  cooDocName?: string;
  cooDocUrl?: string;

  skabFileName?: string;
  skabFileUrl?: string;
  skbFileName?: string;
  skbFileUrl?: string;
  royaltyFileName?: string;
  royaltyFileUrl?: string;
  lhvFileName?: string;
  lhvFileUrl?: string;
  boFileName?: string;
  boFileUrl?: string;
}

export interface OperationalTableProps {
  orders: OrderItem[];
  onUpdateOps: (order: OrderItem) => void;
  onCompleteLoading: (order: OrderItem) => void;
  onViewDetail: (orderId: string) => void;
}

export interface OperationalStats {
  total: number;
  pendingRkbm: number;
  loading: number;
  completed: number;
}
export interface OperationalTabConfig {
  id: OperationalTab;
  label: string;
}
export interface OperationalFilterBarProps {
  activeTab: OperationalTab;
  onTabChange: (tab: OperationalTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stats: OperationalStats;
}

export interface UpdateRkbmModalProps {
  isOpen: boolean;
  order: OrderItem | null;
  onClose: () => void;
  onSave: (orderId: string, payload: OperationalUpdatePayload) => void;
}

export interface UpdateRkbmFormProps {
  order: OrderItem;
  onClose: () => void;
  onSave: (orderId: string, payload: OperationalUpdatePayload) => void;
}

export interface RkbmFleetSectionProps {
  order: OrderItem;
  captainPhone: string;
  onCaptainPhoneChange: (val: string) => void;
  agent: string;
  onAgentChange: (val: string) => void;
  agentOptions: Array<{ label: string; value: string }>;
}

export interface RkbmScheduleSectionProps {
  order: OrderItem;
  showMuat: boolean;
  showBongkar: boolean;
  position: string;
  onPositionChange: (val: string) => void;
  positionOptions: Array<{ label: string; value: string }>;
  positionUpdatedAt?: string;
  onPositionUpdatedAtChange?: (val: string) => void;
  commencedDate?: string;
  onCommencedDateChange?: (val: string) => void;
  completedDate?: string;
  onCompletedDateChange?: (val: string) => void;
  etaPol: string;
  onEtaPolChange: (val: string) => void;
  etaPod: string;
  onEtaPodChange: (val: string) => void;
  loadingStartDate: string;
  onLoadingStartDateChange: (val: string) => void;
  loadingEndDate: string;
  onLoadingEndDateChange: (val: string) => void;
  dischargeStartDate: string;
  onDischargeStartDateChange: (val: string) => void;
  dischargeEndDate: string;
  onDischargeEndDateChange: (val: string) => void;
  finalDsr: string;
  onFinalDsrChange: (val: string) => void;
  operationalNotes: string;
  onOperationalNotesChange: (val: string) => void;
}

export interface RkbmChecklistSectionProps {
  hasSkab: boolean;
  onHasSkabChange: (val: boolean) => void;
  hasSkb: boolean;
  onHasSkbChange: (val: boolean) => void;
  hasRoyalty: boolean;
  onHasRoyaltyChange: (val: boolean) => void;
  hasLhv: boolean;
  onHasLhvChange: (val: boolean) => void;
  hasBo: boolean;
  onHasBoChange: (val: boolean) => void;
}

export interface OperationalDocumentConfig {
  key: "hasSkab" | "hasSkb" | "hasRoyalty" | "hasLhv" | "hasBo";
  id: string;
  label: string;
  description: string;
}

export interface ChecklistItemViewModel {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}
