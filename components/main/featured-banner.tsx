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
      {/* Navigation Arrows - Hidden on mobile */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-2 top-1/2 transform -translate-y-1/2 z-30 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center transition-all backdrop-blur-sm"
      >
        <ChevronLeft size={18} className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-2 top-1/2 transform -translate-y-1/2 z-30 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center transition-all backdrop-blur-sm"
      >
        <ChevronRight size={18} className="text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10">
        {/* League and Time */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img
              src={currentMatch.league.image}
              alt={currentMatch.league.name}
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full"
            />
            <span className="text-sm font-semibold text-[#00d4ff]">
              {currentMatch.league.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Live Status Badge */}
            {currentMatch.liveStatus ? (
              <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 px-2.5 py-1 rounded-full backdrop-blur-sm mr-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-red-400">LIVE NOW</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Calendar size={14} className="text-[#00d4ff]" />
                <span className="text-sm font-medium text-white">
                  {matchTime}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Teams vs Layout */}
        <div className="flex items-center justify-between mb-2 lg:mb-6">
          {/* Team 1 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/10 rounded-xl flex items-center justify-center p-2 mb-3 border border-white/20 backdrop-blur-sm">
              <img
                src={currentMatch.participants[0].image || "/placeholder.svg"}
                alt={currentMatch.participants[0].name}
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
              <div className="hidden w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/5 rounded-xl flex items-center justify-center text-base font-bold text-white">
                {currentMatch.participants[0].name
                  .substring(0, 3)
                  .toUpperCase()}
              </div>
            </div>
            <span className="text-sm font-bold text-white text-center leading-tight line-clamp-2">
              {currentMatch.participants[0].name}
            </span>
          </div>

          {/* VS Badge */}
          <div className="flex flex-col items-center mx-4 sm:mx-6 lg:mx-8">
            <div className="bg-white/10 px-4 py-2 rounded-xl mb-2 backdrop-blur-sm">
              <span className="text-sm font-bold text-white">VS</span>
            </div>
            <div className="text-center">
              <span className="text-sm font-semibold text-[#00d4ff]">
                {matchTime}
              </span>
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/10 rounded-xl flex items-center justify-center p-2 mb-3 border border-white/20 backdrop-blur-sm">
              <img
                src={currentMatch.participants[1].image || "/placeholder.svg"}
                alt={currentMatch.participants[1].name}
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
              <div className="hidden w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/5 rounded-xl flex items-center justify-center text-base font-bold text-white">
                {currentMatch.participants[1].name
                  .substring(0, 3)
                  .toUpperCase()}
              </div>
            </div>
            <span className="text-sm font-bold text-white text-center leading-tight line-clamp-2">
              {currentMatch.participants[1].name}
            </span>
          </div>
        </div>

        {/* Match Description */}
        <p className="text-sm text-white/80 text-center mb-2 lg:mb-6 px-2 leading-relaxed line-clamp-2">
          {currentMatch.liveStatus ? (
            <>
              {currentMatch.participants[0].name} vs{" "}
              {currentMatch.participants[1].name} in {currentMatch.league.name}:
              Watch Live Now!
            </>
          ) : (
            <>
              Watch {currentMatch.participants[0].name} vs{" "}
              {currentMatch.participants[1].name} live in{" "}
              {currentMatch.league.name} - {matchTime}
            </>
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-4">
          {currentMatch.liveStatus ? (
            <button className="flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-white/90 text-[#00303d] px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all">
              <Play size={14} className="sm:w-4 sm:h-4 fill-[#00303d]" />
              {currentMatch.liveStatus ? "Watch Live" : "Watch Now"}
            </button>
          ) : (
            <button className="flex items-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all backdrop-blur-sm">
              <Info size={14} className="sm:w-4 sm:h-4" />
              View Details
            </button>
          )}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {hotMatches.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/40 w-2"
            }`}
          />
        ))}
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-white via-transparent to-white"></div>
    </div>
  );
}
