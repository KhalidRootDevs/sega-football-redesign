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
    <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded transition-all whitespace-nowrap ${
            activeTab === tab.id
              ? "bg-[#00303d] text-white shadow-lg shadow-[#00303d]/20"
              : "bg-[#1a2332] text-[#7a8a96] hover:bg-[#243041] hover:text-white"
          }`}
        >
          {tab.hasIndicator && activeTab === tab.id && (
            <Circle
              size={8}
              className="fill-red-500 text-red-500 animate-pulse"
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
