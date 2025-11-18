"use client";

import type React from "react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0e12] text-[#f5f7fa] flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
