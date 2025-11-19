"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Info, Calendar } from "lucide-react";
import { hotMatches } from "@/lib/data/hot-matches";

export default function FeaturedBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === hotMatches.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? hotMatches.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentMatch = hotMatches[currentSlide];

  // Convert timestamp to readable time
  const matchTime = currentMatch.startingAtTimestamps
    ? new Date(currentMatch.startingAtTimestamps * 1000).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : "TBD";

  return (
    <div className="relative bg-gradient-to-r from-[#00303d] via-[#004557] to-[#00303d] rounded-xl p-4 sm:p-6 overflow-hidden border border-[#1a2a38]">
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
      >
        <ChevronLeft size={16} className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
      >
        <ChevronRight size={16} className="text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10">
        {/* League and Time */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <span className="text-xs font-semibold text-[#00d4ff]">
              {currentMatch.league.name}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <Calendar size={12} className="text-[#00d4ff]" />
            <span className="text-xs font-medium text-white">{matchTime}</span>
          </div>
        </div>

        {/* Teams vs Layout */}
        <div className="flex items-center justify-between mb-4">
          {/* Team 1 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-lg flex items-center justify-center p-2 mb-2 border border-white/20 backdrop-blur-sm">
              <img
                src={currentMatch.participants[0].image || "/placeholder.svg"}
                alt={currentMatch.participants[0].name}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
              <div className="hidden w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center text-sm font-bold text-white">
                {currentMatch.participants[0].name
                  .substring(0, 3)
                  .toUpperCase()}
              </div>
            </div>
            <span className="text-xs font-semibold text-white text-center leading-tight line-clamp-2">
              {currentMatch.participants[0].name}
            </span>
          </div>

          {/* VS Badge */}
          <div className="flex flex-col items-center mx-3 sm:mx-4">
            <div className="bg-white/10 px-3 py-1.5 rounded-lg mb-1.5 backdrop-blur-sm">
              <span className="text-xs font-bold text-white">VS</span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-[#00d4ff]">
                {matchTime}
              </span>
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-lg flex items-center justify-center p-2 mb-2 border border-white/20 backdrop-blur-sm">
              <img
                src={currentMatch.participants[1].image || "/placeholder.svg"}
                alt={currentMatch.participants[1].name}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
              <div className="hidden w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center text-sm font-bold text-white">
                {currentMatch.participants[1].name
                  .substring(0, 3)
                  .toUpperCase()}
              </div>
            </div>
            <span className="text-xs font-semibold text-white text-center leading-tight line-clamp-2">
              {currentMatch.participants[1].name}
            </span>
          </div>
        </div>

        {/* Match Description */}
        <p className="text-xs text-white/80 text-center mb-4 px-2 leading-relaxed line-clamp-2">
          {currentMatch.name} - {currentMatch.participants[0].name} vs{" "}
          {currentMatch.participants[1].name}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2">
          <button className="flex items-center gap-1.5 bg-white hover:bg-white/90 text-[#00303d] px-4 sm:px-6 py-2 rounded-lg font-semibold text-xs transition-all">
            <Play size={14} className="fill-[#00303d]" />
            Watch Live
          </button>
          <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 sm:px-6 py-2 rounded-lg font-semibold text-xs transition-all backdrop-blur-sm">
            <Info size={14} />
            View Details
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30 flex gap-1.5">
        {hotMatches.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6" : "bg-white/40 w-1.5"
            }`}
          />
        ))}
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-white via-transparent to-white"></div>
    </div>
  );
}
