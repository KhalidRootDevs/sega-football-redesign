"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import MainContent from "@/components/main/main-content";
import RightPanel from "@/components/layout/right-panel";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col xl:flex-row">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <MainContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenRightPanel={() => setIsRightPanelOpen(true)}
      />
      <RightPanel
        isOpen={isRightPanelOpen}
        onClose={() => setIsRightPanelOpen(false)}
      />
    </div>
  );
}
