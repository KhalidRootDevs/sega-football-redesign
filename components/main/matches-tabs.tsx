"use client";

import { Circle } from "lucide-react";

interface MatchesTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MatchesTabs({
  activeTab,
  setActiveTab,
}: MatchesTabsProps) {
  const tabs = [
    { id: "all", label: "All Games" },
    { id: "live", label: "Live", hasIndicator: true },
    { id: "upcoming", label: "Upcoming" },
    { id: "finished", label: "Finished" },
  ];

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg border transition-all whitespace-nowrap min-w-[100px] justify-center ${
            activeTab === tab.id
              ? "bg-[#00d4ff] text-[#0a0e12] border-[#00d4ff] hover:bg-[#00b8e6] hover:border-[#00b8e6]"
              : "bg-transparent text-[#7a8a96] border-[#2a3a48] hover:bg-[#1a2332] hover:text-white hover:border-[#00d4ff]/30"
          }`}
        >
          {tab.hasIndicator && (
            <Circle
              size={8}
              className={`${
                activeTab === tab.id
                  ? "fill-[#0a0e12] text-[#0a0e12]"
                  : "fill-red-500 text-red-500"
              } ${activeTab === tab.id ? "" : "animate-pulse"}`}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
