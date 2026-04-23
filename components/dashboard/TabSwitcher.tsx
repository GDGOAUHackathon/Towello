"use client";

type Tab = {
  id: string;
  label: string;
};

type TabSwitcherProps = {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
};

export function TabSwitcher({ tabs, activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="inline-flex flex-wrap rounded-2xl border border-[#2A2A2A] bg-[#111111] p-1">
      {tabs.map((tab) => {
        const active = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-[linear-gradient(180deg,rgba(240,192,64,0.18),rgba(240,192,64,0.06))] text-[#F0F0F0] shadow-[0_0_0_1px_rgba(240,192,64,0.16)]"
                : "text-[#888888] hover:bg-white/5 hover:text-[#F0F0F0]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
