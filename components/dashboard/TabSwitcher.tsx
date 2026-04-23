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
    <div className="inline-flex flex-wrap rounded-2xl border border-white/10 bg-black/40 p-1">
      {tabs.map((tab) => {
        const active = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-emerald-500/10 text-zinc-50 shadow-[0_0_0_1px_rgba(16,185,129,0.16)]"
                : "text-zinc-500 hover:bg-white/5 hover:text-zinc-50"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
