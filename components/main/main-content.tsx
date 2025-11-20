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
      <div className="grid grid-cols-2 gap-2 mb-4 lg:hidden w-full">
        <button
          onClick={onOpenSidebar}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1a2332] hover:bg-[#243041] rounded-md transition text-sm font-medium text-[#b0bcc4]"
        >
          <Menu size={18} />
          <span>Coverage</span>
        </button>
        <button
          onClick={onOpenRightPanel}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1a2332] hover:bg-[#243041] rounded-md transition text-sm font-medium text-[#b0bcc4]"
        >
          <span>Featured</span>
          <TrendingUp size={18} />
        </button>
      </div>

      <FeaturedBanner />

      {/* Football Matches Section */}
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4 gap-2">
          <h2 className="font-bold text-xl sm:text-2xl text-[#f5f7fa] tracking-tight">
            Football Matches
          </h2>
        </div>

        <MatchesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <MatchesList activeTab={activeTab} />
      </div>
    </main>
  );
}
