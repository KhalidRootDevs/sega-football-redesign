"use client";

import PopularMatchesSlider from "@/components/right-panel/popular-matches-slider";
import SponsoredApps from "@/components/right-panel/sponsored-apps";
import { X } from "lucide-react";
import Support from "../right-panel/support";

interface RightPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function RightPanel({
  isOpen = false,
  onClose,
}: RightPanelProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed xl:static
        inset-y-0 right-0
        w-full sm:w-96
        bg-[#0f1419]
        border-l border-white/10
        p-4 sm:p-6
        max-h-[calc(100vh-80px)]
        overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        z-50
        ${isOpen ? "translate-x-0" : "translate-x-full xl:translate-x-0"}
      `}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h2 className="font-semibold text-base text-white">Live Matches</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <PopularMatchesSlider />
        <Support />
        <SponsoredApps />
      </aside>
    </>
  );
}
