"use client"

export default function FeaturedMatch() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-6 flex items-center gap-6 overflow-hidden relative">
      {/* Background blur effect */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: "url(/placeholder.svg?height=400&width=800&query=football-player-celebrating)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs">🏆</div>
          <span className="text-xs font-semibold text-blue-100">VS</span>
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs">🏆</div>
        </div>
        <p className="text-xs text-blue-100 mb-1">Today, 08:30 PM</p>
        <h3 className="text-xl font-bold text-white mb-2">Premier League</h3>
        <h2 className="text-2xl font-bold text-white mb-3">Liverpool FC vs Manchester United</h2>
        <p className="text-sm text-blue-100 mb-4">
          Place a bet on this match today, get instant cashback and participate in various raffles
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold text-sm hover:bg-blue-50 transition">
          Bet now
        </button>
      </div>

      {/* Player image placeholder */}
      <div className="w-48 h-48 relative z-20">
        <img src="/football-player.jpg" alt="Featured player" className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  )
}
