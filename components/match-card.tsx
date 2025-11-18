"use client";

import { Star, Tv, Eye } from "lucide-react";
import { useState } from "react";

interface Match {
  id: number;
  home: string;
  homeImage?: string;
  away: string;
  awayImage?: string;
  homeScore?: number;
  awayScore?: number;
  status: "live" | "upcoming" | "finished";
  time: string;
  league: string;
  leagueIcon?: string;
  viewers?: number;
}

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-5 hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 border border-neutral-700/50 hover:border-neutral-600/70">
      {/* League Header */}
      <div className="text-center mb-6">
        <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wide">
          {match.league}
        </h3>
      </div>

      {/* Teams & Scores Layout */}
      <div className="space-y-4 mb-6">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-neutral-700/50 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-neutral-600/50">
              {match.homeImage || "🔴"}
            </div>
            <span className="text-lg font-bold text-neutral-100">
              {match.home}
            </span>
          </div>
          {(match.status === "finished" || match.status === "live") && (
            <span className="text-3xl font-black text-neutral-100 min-w-12 text-center">
              {match.homeScore}
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-neutral-700/50 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-neutral-600/50">
              {match.awayImage || "🔵"}
            </div>
            <span className="text-lg font-bold text-neutral-100">
              {match.away}
            </span>
          </div>
          {(match.status === "finished" || match.status === "live") && (
            <span className="text-3xl font-black text-neutral-100 min-w-12 text-center">
              {match.awayScore}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-700/50">
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 hover:bg-neutral-700/50 rounded-xl transition-all duration-200 group/fav"
        >
          <Star
            size={20}
            className={
              isFavorite
                ? "fill-yellow-400 text-yellow-400 scale-110"
                : "text-neutral-500 group-hover/fav:text-yellow-400 transition-colors"
            }
          />
        </button>

        {/* Watch Button */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm group/watch">
          <Tv
            size={16}
            className="group-hover/watch:scale-110 transition-transform"
          />
          Watch Live
        </button>

        {/* Viewers Count */}
        <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
          <Eye size={16} />
          <span className="font-medium">
            {match.viewers ? `${(match.viewers / 1000).toFixed(0)}k` : "140k"}
          </span>
        </div>
      </div>
    </div>
  );
}
