"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, Menu, X, ChevronDown, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Matches", href: "/matches" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  // User data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "/user-avatar.png", // You can replace with actual user image
    isPremium: true,
    subscriptionDaysLeft: 15,
    plan: "Premium",
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-[#0f1419] border-b border-[#1a2a38] sticky top-0 z-50 shadow-sm">
      <div className="px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <Link href="/" className="z-10">
            <img src="sega-logo.png" alt="" className="h-10" />
          </Link>

          {/* Navigation Items - Hidden when search is open on large screens */}
          {!isSearchOpen && (
            <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[#b0bcc4] hover:text-[#00d4ff] transition-colors text-sm font-medium tracking-wide whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Search Bar - Only shown when search is open on large screens */}
          {isSearchOpen && (
            <div
              ref={searchRef}
              className="hidden lg:flex items-center gap-3 bg-[#1a2332] rounded-xl px-4 py-2.5 border border-[#00d4ff] transition-all duration-200 ring-2 ring-[#00d4ff]/20 w-80 xl:w-96 animate-in slide-in-from-right duration-200 absolute left-1/2 transform -translate-x-1/2"
            >
              <Search size={18} className="text-[#00d4ff] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search matches, teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-[#f5f7fa] placeholder-[#7a8a96] outline-none w-full font-medium"
              />
              <button
                onClick={handleSearchToggle}
                className="text-[#7a8a96] hover:text-[#00d4ff] transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Toggle - Always visible */}
            <button
              onClick={handleSearchToggle}
              className={`text-[#7a8a96] hover:text-[#00d4ff] transition-colors p-2.5 hover:bg-[#1a2332] rounded-lg ${
                isSearchOpen ? "lg:hidden" : ""
              }`}
            >
              <Search size={20} />
            </button>

            {/* Profile Dropdown - Always visible on large screens, even when search is open */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`hidden sm:flex items-center gap-3 text-[#b0bcc4] hover:text-[#f5f7fa] hover:bg-[#1a2332] px-3 py-2.5 rounded-lg transition-all ${
                    isSearchOpen ? "lg:flex" : ""
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00303d] to-[#00d4ff] rounded-lg flex items-center justify-center overflow-hidden">
                    {userData.image ? (
                      <img
                        src={userData.image}
                        alt={userData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-white">
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium hidden lg:inline">
                    Profile
                  </span>
                  <ChevronDown size={16} className="text-[#7a8a96]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 bg-[#1a2332] border-[#2a3a48] shadow-xl rounded-xl p-0 overflow-hidden"
              >
                {/* User Info Section */}
                <div className="p-4 border-b border-[#2a3a48]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00303d] to-[#00d4ff] rounded-lg flex items-center justify-center overflow-hidden">
                      {userData.image ? (
                        <img
                          src={userData.image}
                          alt={userData.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-white">
                          {userData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm truncate">
                        {userData.name}
                      </h3>
                      <p className="text-gray-400 text-xs truncate">
                        {userData.email}
                      </p>
                    </div>
                  </div>

                  {/* Subscription Status */}
                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Crown
                          size={14}
                          className="text-amber-400 fill-amber-400"
                        />
                        <span className="text-amber-400 text-sm font-semibold">
                          {userData.plan} User
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-full">
                        <Zap size={10} className="text-amber-400" />
                        <span className="text-amber-400 text-xs font-medium">
                          {userData.subscriptionDaysLeft} days left
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/pricing"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-1"
                    >
                      <Crown size={12} />
                      Upgrade Plan
                    </Link>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <DropdownMenuItem className="text-[#b0bcc4] focus:bg-[#2a3a48] focus:text-[#00d4ff] cursor-pointer rounded-lg p-3 mb-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <span>My Profile</span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="text-[#b0bcc4] focus:bg-[#2a3a48] focus:text-[#00d4ff] cursor-pointer rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <span>Logout</span>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Profile Icon - Hidden when search is open */}
            {!isSearchOpen && (
              <button className="sm:hidden text-[#7a8a96] hover:text-[#00d4ff] transition-colors p-2.5 hover:bg-[#1a2332] rounded-lg">
                <div className="w-6 h-6 bg-gradient-to-br from-[#00303d] to-[#00d4ff] rounded-lg flex items-center justify-center overflow-hidden">
                  {userData.image ? (
                    <img
                      src={userData.image}
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-white">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
              </button>
            )}

            {/* Mobile Menu Toggle - Hidden when search is open */}
            {!isSearchOpen && (
              <button
                onClick={handleMenuToggle}
                className="lg:hidden text-[#7a8a96] hover:text-[#00d4ff] transition-colors p-2.5 hover:bg-[#1a2332] rounded-lg"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search - Shown when search is open on mobile */}
        {isSearchOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-[#2a3a48] pt-4 animate-in slide-in-from-top duration-200">
            <div
              ref={searchRef}
              className="flex items-center gap-3 bg-[#1a2332] rounded-xl px-4 py-3 border border-[#00d4ff]"
            >
              <Search size={20} className="text-[#00d4ff] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search matches, teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-base text-[#f5f7fa] placeholder-[#7a8a96] outline-none w-full font-medium"
              />
              <button
                onClick={handleSearchToggle}
                className="text-[#7a8a96] hover:text-[#00d4ff] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Suggestions */}
            {searchQuery && (
              <div className="bg-[#1a2332] rounded-xl border border-[#2a3a48] p-2 mt-3">
                <div className="text-[#7a8a96] text-sm px-3 py-2">
                  Recent searches
                </div>
                <div className="text-[#b0bcc4] px-3 py-2 hover:bg-[#2a3a48] rounded-lg cursor-pointer">
                  Premier League
                </div>
                <div className="text-[#b0bcc4] px-3 py-2 hover:bg-[#2a3a48] rounded-lg cursor-pointer">
                  Champions League
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation Menu - Only shown when menu is open and search is closed */}
        {isMenuOpen && !isSearchOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-[#2a3a48] pt-4 space-y-1 animate-in slide-in-from-top duration-200">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-[#b0bcc4] hover:text-[#00d4ff] hover:bg-[#1a2332] rounded-lg transition-all font-medium text-base"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile User Profile Section */}
            <div className="pt-4 border-t border-[#2a3a48] mt-2">
              {/* User Info */}
              <div className="px-4 py-3 mb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00303d] to-[#00d4ff] rounded-lg flex items-center justify-center overflow-hidden">
                    {userData.image ? (
                      <img
                        src={userData.image}
                        alt={userData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-white">
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm">
                      {userData.name}
                    </h3>
                    <p className="text-gray-400 text-xs">{userData.email}</p>
                  </div>
                </div>

                {/* Subscription Status */}
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Crown
                        size={14}
                        className="text-amber-400 fill-amber-400"
                      />
                      <span className="text-amber-400 text-sm font-semibold">
                        {userData.plan} User
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-full">
                      <Zap size={10} className="text-amber-400" />
                      <span className="text-amber-400 text-xs font-medium">
                        {userData.subscriptionDaysLeft} days left
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/pricing"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-1"
                  >
                    <Crown size={12} />
                    Upgrade Plan
                  </Link>
                </div>
              </div>

              {/* Profile Links */}
              <Link
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#b0bcc4] hover:text-[#00d4ff] hover:bg-[#1a2332] rounded-lg transition-all font-medium"
              >
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                My Profile
              </Link>
              <Link
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#b0bcc4] hover:text-[#00d4ff] hover:bg-[#1a2332] rounded-lg transition-all font-medium"
              >
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                Logout
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
