import type {
  TabItem,
  TabKey,
  MasterResourceKey,
} from "@/types/master/master-data";

interface MasterTabBarProps {
  tabItems: TabItem[];
  isTarifTab: boolean;
  activeTab: MasterResourceKey;
  onSelectTab: (tabKey: TabKey) => void;
  getTabCount: (tabKey: TabKey) => number;
}

export const MasterTabBar = ({
  tabItems,
  isTarifTab,
  activeTab,
  onSelectTab,
  getTabCount,
}: MasterTabBarProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
      {tabItems.map((tab) => {
        const Icon = tab.icon;
        const isActive = isTarifTab
          ? tab.key === "tarif"
          : activeTab === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onSelectTab(tab.key)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? "bg-red-600 text-white shadow-xs shadow-red-600/30"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}>
            <Icon className="w-4 h-4 shrink-0" />
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}>
              {getTabCount(tab.key)}
            </span>
          </button>
        );
      })}
    </div>
  );
};
