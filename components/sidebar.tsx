"use client"

import { ChevronDown } from "lucide-react"

export default function Sidebar() {
  const leagues = [
    { name: "UEFA Champions", matches: 38 },
    { name: "European League", matches: 41 },
    { name: "Premier League", matches: 153 },
    { name: "La Liga", matches: 156 },
    { name: "Serie A", matches: 145 },
    { name: "Bundesliga", matches: 150 },
    { name: "Liga 1", matches: 159 },
  ]

  const countries = [
    { name: "Germany", matches: 225 },
    { name: "France", matches: 190 },
    { name: "Spain", matches: 310 },
    { name: "England", matches: 215 },
    { name: "Italy", matches: 100 },
  ]

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-4 max-h-[calc(100vh-80px)] overflow-y-auto">
      {/* Popular Leagues */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm">Popular Leagues</h3>
          <ChevronDown size={16} className="text-neutral-500" />
        </div>
        <div className="space-y-2">
          {leagues.map((league, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-2 hover:bg-neutral-800 rounded text-xs text-neutral-300 hover:text-neutral-100"
            >
              <span>{league.name}</span>
              <span className="text-neutral-500">{league.matches}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Countries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm">Popular Countries</h3>
          <ChevronDown size={16} className="text-neutral-500" />
        </div>
        <div className="space-y-2">
          {countries.map((country, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-2 hover:bg-neutral-800 rounded text-xs text-neutral-300 hover:text-neutral-100"
            >
              <span>{country.name}</span>
              <span className="text-neutral-500">{country.matches}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
