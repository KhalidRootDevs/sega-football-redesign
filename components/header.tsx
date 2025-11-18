"use client"

import { Search, Bell, ChevronDown } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Sports Categories */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-blue-600 px-3 py-2 rounded-lg">
            <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
              BL
            </div>
            <span className="font-bold text-sm">Betlive</span>
          </div>

          {/* Sports Categories */}
          <nav className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium">
              ⚽ Football
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-neutral-300 text-sm hover:text-neutral-100">
              🏀 Basketball
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-neutral-300 text-sm hover:text-neutral-100">
              🎾 Tennis
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-neutral-300 text-sm hover:text-neutral-100">
              🏐 Volleyball
            </button>
          </nav>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-6">
          <div className="text-sm text-neutral-300">1500.00 USD</div>
          <button className="text-neutral-400 hover:text-neutral-200">
            <Search size={20} />
          </button>
          <button className="text-neutral-400 hover:text-neutral-200 relative">
            <Bell size={20} />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 text-sm">
            <span>George Chicua</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
