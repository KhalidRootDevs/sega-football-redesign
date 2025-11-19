"use client";

import { useState } from "react";
import FeaturedMatch from "./featured-match";
import MatchesList from "./matches-list";

export default function MainContent() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <main className="flex-1 p-6 max-h-[calc(100vh-80px)] overflow-y-auto">
      {/* Featured Match Banner */}
      <FeaturedMatch />

      {/* Football Matches Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Football Matches</h2>
          <span className="text-xs text-neutral-500">August 24, 2022</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-neutral-800">
          {["All games", "Live matches", "ODDS", "Finished"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.toLowerCase()
                  ? "text-blue-500 border-blue-500"
                  : "text-neutral-400 border-transparent hover:text-neutral-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Matches List */}
        <MatchesList activeTab={activeTab} />
      </div>
    </main>
  );
}
