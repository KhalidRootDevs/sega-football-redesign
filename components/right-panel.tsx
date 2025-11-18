"use client"

import { Heart, Plus, Minus } from "lucide-react"
import { useState } from "react"

export default function RightPanel() {
  const [betAmount, setBetAmount] = useState(150)

  return (
    <aside className="w-80 bg-neutral-900 border-l border-neutral-800 p-6 max-h-[calc(100vh-80px)] overflow-y-auto">
      {/* Popular Live Matches */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Popular Live Matches</h3>
          <div className="flex gap-2">
            <button className="text-neutral-500 hover:text-neutral-300">←</button>
            <button className="text-neutral-500 hover:text-neutral-300">→</button>
          </div>
        </div>

        <div className="text-xs text-neutral-400 mb-4">Italy / Serie A / Matchday 2 of 38</div>

        {/* Match Card */}
        <div className="bg-neutral-800 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                N
              </div>
              <span className="text-sm font-semibold">Napoli</span>
            </div>
            <span className="text-sm">Live</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="text-2xl font-bold">2</div>
            <span className="text-neutral-400">:</span>
            <div className="text-2xl font-bold">1</div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                I
              </div>
              <span className="text-sm font-semibold">Inter</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
            <div className="text-center">
              <div className="text-neutral-400">1</div>
              <div className="font-semibold">2.10</div>
            </div>
            <div className="text-center">
              <div className="text-neutral-400">X</div>
              <div className="font-semibold">2.80</div>
            </div>
            <div className="text-center">
              <div className="text-neutral-400">2</div>
              <div className="font-semibold">1.70</div>
            </div>
          </div>

          <button className="w-full flex items-center justify-between px-3 py-2 bg-neutral-700 rounded text-xs text-neutral-300 hover:bg-neutral-600">
            <span>Match details</span>
            <Heart size={16} />
          </button>
        </div>
      </div>

      {/* Bet Slip */}
      <div className="bg-neutral-800 rounded-lg p-4">
        <h3 className="font-bold mb-4">Bet slip</h3>

        {/* Single Bet */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-xs text-neutral-300">Single</span>
          </div>

          <div className="bg-neutral-700 rounded p-3 mb-3">
            <p className="text-xs mb-2">Liverpool FC - Manchester United</p>
            <p className="text-sm font-semibold">2.2</p>
          </div>
        </div>

        {/* Bet Amount */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-neutral-400">Bet amount</span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-700 rounded p-2 mb-3">
            <button
              onClick={() => setBetAmount(Math.max(0, betAmount - 50))}
              className="text-neutral-400 hover:text-neutral-200"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="flex-1 bg-transparent text-right text-sm font-semibold outline-none"
            />
            <button onClick={() => setBetAmount(betAmount + 50)} className="text-neutral-400 hover:text-neutral-200">
              <Plus size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-neutral-500">Odds: 2.10</span>
            <span className="text-xs text-neutral-500">Potential win: $30.00 USD</span>
          </div>
        </div>

        {/* Place Bet Button */}
        <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
          Place a bet
        </button>
      </div>
    </aside>
  )
}
