"use client";

import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const POPULAR_MATCHES = [
  {
    id: 5,
    homeTeam: { name: "Barcelona", logo: "B", color: "bg-[#A50044]" },
    awayTeam: { name: "Atletico Madrid", logo: "A", color: "bg-[#D50032]" },
    homeScore: 2,
    awayScore: 2,
    league: "La Liga",
    time: "71'",
    status: "Live",
  },
  {
    id: 6,
    homeTeam: { name: "Liverpool", logo: "LIV", color: "bg-[#C8102E]" },
    awayTeam: { name: "Manchester United", logo: "MU", color: "bg-[#DA291C]" },
    homeScore: 1,
    awayScore: 0,
    league: "Premier League",
    time: "54'",
    status: "Live",
  },
  {
    id: 7,
    homeTeam: { name: "Bayern Munich", logo: "BM", color: "bg-[#DC052D]" },
    awayTeam: { name: "Borussia Dortmund", logo: "BVB", color: "bg-[#FDE100]" },
    homeScore: 3,
    awayScore: 1,
    league: "Bundesliga",
    time: "66'",
    status: "Live",
  },
  {
    id: 8,
    homeTeam: { name: "PSG", logo: "P", color: "bg-[#004170]" },
    awayTeam: { name: "Marseille", logo: "OM", color: "bg-[#00A3E0]" },
    homeScore: 2,
    awayScore: 0,
    league: "Ligue 1",
    time: "58'",
    status: "Live",
  },
  {
    id: 9,
    homeTeam: { name: "Arsenal", logo: "A", color: "bg-[#EF0107]" },
    awayTeam: { name: "Chelsea", logo: "C", color: "bg-[#034694]" },
    homeScore: 0,
    awayScore: 1,
    league: "Premier League",
    time: "40'",
    status: "Live",
  },
];

export default function PopularMatchesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === POPULAR_MATCHES.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? POPULAR_MATCHES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === POPULAR_MATCHES.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentMatch = POPULAR_MATCHES[currentIndex];

  return (
    <div
      className="mb-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm text-white">Live Matches</h3>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handlePrevious}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
            aria-label="Previous match"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
            aria-label="Next match"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 relative overflow-hidden">
        {/* Auto-slide progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
          <div
            className="h-full bg-red-500 transition-all duration-1000 ease-linear"
            style={{
              width: isPaused ? "100%" : "0%",
              animation: isPaused ? "none" : "progress 5s linear",
            }}
            key={currentIndex}
          />
        </div>

        <style jsx>{`
          @keyframes progress {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
        `}</style>

        {/* Live indicator */}
        <div className="flex items-center justify-between mb-4 mt-1">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <p className="text-xs text-gray-400 mt-0.5">
              {currentMatch.league}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-xs font-semibold text-red-500 uppercase">
              LIVE
            </span>
          </div>
        </div>

        {/* Teams and Score */}
        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 flex-1">
              <div
                className={`w-8 h-8 ${currentMatch.homeTeam.color} rounded-lg flex items-center justify-center text-xs font-bold text-white`}
              >
                {currentMatch.homeTeam.logo}
              </div>
              <span className="text-sm font-medium text-white">
                {currentMatch.homeTeam.name}
              </span>
            </div>
            <div className="text-2xl font-bold text-white tabular-nums">
              {currentMatch.homeScore}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10"></div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 flex-1">
              <div
                className={`w-8 h-8 ${currentMatch.awayTeam.color} rounded-lg flex items-center justify-center text-xs font-bold text-white`}
              >
                {currentMatch.awayTeam.logo}
              </div>
              <span className="text-sm font-medium text-white">
                {currentMatch.awayTeam.name}
              </span>
            </div>
            <div className="text-2xl font-bold text-white tabular-nums">
              {currentMatch.awayScore}
            </div>
          </div>
        </div>

        {/* Details Button */}
        <button className="w-full mt-4 py-2 bg-[#00303d] hover:bg-[#00303d]/90 text-white text-sm font-medium rounded-md transition">
          View Details
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {POPULAR_MATCHES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-[#00303d] w-6 h-1.5"
                : "bg-white/20 w-1.5 h-1.5 hover:bg-white/30"
            }`}
            aria-label={`Go to match ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
