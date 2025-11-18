"use client";

import PopularLeagues from "@/components/sidebar/popular-leagues";
import PopularTeams from "@/components/sidebar/popular-teams";
import { X, TrendingUp, Users, Star } from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed xl:static
        inset-y-0 left-0
        w-72
        bg-gradient-to-b from-[#0f1419] to-[#0a0e12]
        border-r border-white/10
        p-2
        max-h-[calc(100vh-80px)] xl:max-h-[calc(100vh-80px)]
        overflow-y-auto scrollbar-hide
        transform transition-transform duration-300 ease-in-out
        z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
      `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#00303d] rounded-xl flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <h2 className="font-bold text-lg text-white">Navigation</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-xl transition-all duration-200"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#00303d] rounded-xl flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">Featured</h2>
              <p className="text-xs text-gray-400">Leagues & Teams</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <PopularLeagues />
          <PopularTeams />
        </div>
      </aside>
    </>
  );
}
