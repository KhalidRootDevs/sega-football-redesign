"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  Crown,
  Zap,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Matches", href: "/matches" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  // User data
  const userData = {
    name: "Olivia Evelyn",
    email: "john.doe@example.com",
    image: "/user-avatar.png",
    isPremium: true,
    subscriptionDaysLeft: 15,
    plan: "Premium",
  };

  // Check if a navigation item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
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
    <header className="bg-[#0f1419] border-b border-[#1a2a38] sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <Link href="/" className="z-10 flex items-center gap-3">
            <img
              src="/sega-logo.png"
              alt="Sega Football Logo"
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation Items - Hidden when search is open on large screens */}
          {!isSearchOpen && (
            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2 bg-[#1a2332]/50 backdrop-blur-sm rounded-2xl p-1.5 border border-[#2a3a48]">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-white bg-gradient-to-r from-[#00d4ff] to-[#0099cc] shadow-lg shadow-[#00d4ff]/20"
                      : "text-[#b0bcc4] hover:text-white hover:bg-[#2a3a48]"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>
          )}

          {/* Search Bar - Only shown when search is open on large screens */}
          {isSearchOpen && (
            <div
              ref={searchRef}
              className="hidden lg:flex items-center gap-3 bg-[#1a2332] rounded-xl px-4 py-2.5 border-2 border-[#00d4ff] transition-all duration-200 ring-2 ring-[#00d4ff]/20 w-80 xl:w-96 animate-in slide-in-from-right duration-200 absolute left-1/2 transform -translate-x-1/2"
            >
              <Search size={18} className="text-[#00d4ff] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search matches, teams, leagues..."
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
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Toggle - Always visible */}
            <button
              onClick={handleSearchToggle}
              className={`text-[#7a8a96] hover:text-[#00d4ff] transition-colors p-2.5 hover:bg-[#1a2332] rounded-xl ${
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
                  className={`hidden sm:flex items-center gap-3 text-[#b0bcc4] px-3 py-2.5 rounded-xl transition-all border border-transparent bg-none ${
                    isSearchOpen ? "lg:flex" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center overflow-hidden border-2 border-[#2a3a48]">
                      {userData.image ? (
                        <img
                          src={"/girl-profile.jpeg"}
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
                    {userData.isPremium && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                        <Crown size={10} className="text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-semibold text-white">
                      {userData.name.split(" ")[0]}
                    </div>
                    <div className="text-xs text-[#00d4ff]">
                      {userData.plan}
                    </div>
                  </div>
                  <ChevronDown size={16} className="text-[#7a8a96]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 bg-[#1a2332] border-2 border-[#2a3a48] shadow-2xl rounded-2xl p-0 overflow-hidden"
              >
                {/* User Info Section */}
                <div className="p-6 border-b border-[#2a3a48] bg-gradient-to-r from-[#1a2332] to-[#1a2a38]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-xl flex items-center justify-center overflow-hidden border-2 border-[#00d4ff]/30">
                        {userData.image ? (
                          <img
                            src={"/girl-profile.jpeg"}
                            alt={userData.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-bold text-white">
                            {userData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        )}
                      </div>
                      {userData.isPremium && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center border-2 border-[#1a2332]">
                          <Crown size={10} className="text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg truncate">
                        {userData.name}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {userData.email}
                      </p>
                    </div>
                  </div>

                  {/* Subscription Status */}
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Crown
                          size={16}
                          className="text-amber-300 fill-amber-300"
                        />
                        <span className="text-amber-300 text-sm font-bold">
                          {userData.plan} Plan
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-500/30 px-3 py-1 rounded-full">
                        <Zap size={12} className="text-amber-300" />
                        <span className="text-amber-300 text-xs font-semibold">
                          {userData.subscriptionDaysLeft} days
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <Crown size={14} />
                      Renew Subscription
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 text-[#b0bcc4] hover:bg-[#2a3a48] hover:text-[#00d4ff] cursor-pointer rounded-lg transition-all duration-200">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <User size={16} className="text-blue-400" />
                    </div>
                    <span className="font-medium text-white">Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 text-[#b0bcc4] hover:bg-[#2a3a48] hover:text-[#00d4ff] cursor-pointer rounded-lg transition-all duration-200">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Settings size={16} className="text-purple-400" />
                    </div>
                    <span className="font-medium text-white">Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-[#2a3a48] my-1" />

                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 text-[#b0bcc4] hover:bg-[#2a3a48] hover:text-[#00d4ff] cursor-pointer rounded-lg transition-all duration-200">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <LogOut size={16} className="text-red-400" />
                    </div>
                    <span className="font-medium text-white">Logout</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Profile Icon - Hidden when search is open */}
            {!isSearchOpen && (
              <button className="sm:hidden text-[#7a8a96] hover:text-[#00d4ff] transition-colors p-2.5 hover:bg-[#1a2332] rounded-xl">
                <div className="w-7 h-7 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-lg flex items-center justify-center overflow-hidden border border-[#2a3a48]">
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
                className="lg:hidden text-[#7a8a96] hover:text-[#00d4ff] transition-colors p-2.5 hover:bg-[#1a2332] rounded-xl"
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
              className="flex items-center gap-3 bg-[#1a2332] rounded-xl px-4 py-3 border-2 border-[#00d4ff]"
            >
              <Search size={20} className="text-[#00d4ff] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search matches, teams, leagues..."
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
              <div className="bg-[#1a2332] rounded-xl border border-[#2a3a48] p-3 mt-3">
                <div className="text-[#7a8a96] text-sm px-2 py-1 font-medium">
                  Quick Search
                </div>
                <div className="text-[#b0bcc4] px-3 py-2.5 hover:bg-[#2a3a48] rounded-lg cursor-pointer flex items-center gap-2">
                  <Search size={16} className="text-[#00d4ff]" />
                  Premier League
                </div>
                <div className="text-[#b0bcc4] px-3 py-2.5 hover:bg-[#2a3a48] rounded-lg cursor-pointer flex items-center gap-2">
                  <Search size={16} className="text-[#00d4ff]" />
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
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive(item.href)
                    ? "text-white bg-gradient-to-r from-[#00d4ff] to-[#0099cc] shadow-lg shadow-[#00d4ff]/20"
                    : "text-[#b0bcc4] hover:text-white hover:bg-[#1a2332]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile User Profile Section */}
            <div className="pt-4 border-t border-[#2a3a48] mt-2">
              {/* User Info */}
              <div className="px-4 py-3 mb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-xl flex items-center justify-center overflow-hidden border-2 border-[#00d4ff]/30">
                      {userData.image ? (
                        <img
                          src={"/girl-profile.jpeg"}
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
                    {userData.isPremium && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center border-2 border-[#1a2332]">
                        <Crown size={10} className="text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-sm">
                      {userData.name}
                    </h3>
                    <p className="text-gray-400 text-xs">{userData.email}</p>
                  </div>
                </div>

                {/* Subscription Status */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Crown
                        size={14}
                        className="text-amber-300 fill-amber-300"
                      />
                      <span className="text-amber-300 text-sm font-bold">
                        {userData.plan} Plan
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/30 px-2 py-1 rounded-full">
                      <Zap size={10} className="text-amber-300" />
                      <span className="text-amber-300 text-xs font-semibold">
                        {userData.subscriptionDaysLeft} days
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/pricing"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Crown size={12} />
                    Renew Subscription
                  </Link>
                </div>
              </div>

              {/* Profile Links */}
              {/* Menu Items */}
              <div className="p-2">
                <Link
                  href={"/profile"}
                  className="flex items-center gap-3 px-3 py-2.5 text-[#b0bcc4] hover:bg-[#2a3a48] hover:text-[#00d4ff] cursor-pointer rounded-lg transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <User size={16} className="text-blue-400" />
                  </div>
                  <span className="font-medium text-white">Profile</span>
                </Link>

                <Link
                  href={"/settings"}
                  className="flex items-center gap-3 px-3 py-2.5 text-[#b0bcc4] hover:bg-[#2a3a48] hover:text-[#00d4ff] cursor-pointer rounded-lg transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Settings size={16} className="text-purple-400" />
                  </div>
                  <span className="font-medium text-white">Settings</span>
                </Link>

                <DropdownMenuSeparator className="bg-[#2a3a48] my-1" />

                <Link
                  href={"/logout"}
                  className="flex items-center gap-3 px-3 py-2.5 text-[#b0bcc4] hover:bg-[#2a3a48] hover:text-[#00d4ff] cursor-pointer rounded-lg transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <LogOut size={16} className="text-red-400" />
                  </div>
                  <span className="font-medium text-white">Logout</span>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
