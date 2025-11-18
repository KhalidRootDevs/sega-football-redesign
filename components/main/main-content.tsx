"use client";

import FeaturedBanner from "@/components/main/featured-banner";
import MatchesTabs from "@/components/main/matches-tabs";
import MatchesList from "@/components/main/matches-list";
import { Menu, TrendingUp } from "lucide-react";

interface MainContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSidebar?: () => void;
  onOpenRightPanel?: () => void;
}

export default function MainContent({
  activeTab,
  setActiveTab,
  onOpenSidebar,
  onOpenRightPanel,
}: MainContentProps) {
  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-2 mb-4 lg:hidden">
        <button
          onClick={onOpenSidebar}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] hover:bg-[#243041] rounded-lg transition text-sm font-medium text-[#b0bcc4]"
        >
          <Menu size={18} />
          <span>Leagues</span>
        </button>
        <button
          onClick={onOpenRightPanel}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] hover:bg-[#243041] rounded-lg transition text-sm font-medium text-[#b0bcc4]"
        >
          <TrendingUp size={18} />
          <span>Live</span>
        </button>
      </div>

      <FeaturedBanner />

      {/* Football Matches Section */}
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <h2 className="font-bold text-xl sm:text-2xl text-[#f5f7fa] tracking-tight">
            Football Matches
          </h2>
          <span className="text-xs sm:text-sm text-[#7a8a96] font-medium">
            14 Nov, 2025
          </span>
        </div>

        <MatchesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <MatchesList activeTab={activeTab} />
      </div>
    </main>
  );
}
