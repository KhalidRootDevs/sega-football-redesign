"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  minute?: string;
}

interface MatchListItemProps {
  match: Match;
}

export default function MatchListItem({ match }: MatchListItemProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "live":
        return {
          badgeClass: "bg-red-600 text-white",
          buttonClass: "bg-red-600 hover:bg-red-700 text-white",
          buttonText: "Watch Live",
        };
      case "upcoming":
        return {
          badgeClass: "bg-blue-600 text-white",
          buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
          buttonText: "View",
        };
      case "finished":
        return {
          badgeClass: "bg-neutral-700 text-neutral-300",
          buttonClass: "bg-neutral-700 hover:bg-neutral-600 text-neutral-300",
          buttonText: "Details",
        };
      default:
        return {
          badgeClass: "bg-blue-600 text-white",
          buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
          buttonText: "View",
        };
    }
  };

  const statusConfig = getStatusConfig(match.status);

  return (
    <div className="bg-neutral-800 rounded-lg p-4 hover:bg-neutral-750 transition-all border border-neutral-700 hover:border-neutral-600">
      <div className="flex items-center justify-between gap-4">
        {/* Left: League and Time */}
        <div className="flex items-center gap-4 min-w-[180px]">
          <div className="text-left">
            <div className="text-xs font-semibold text-blue-400 mb-1">
              {match.league}
            </div>
            <div className="text-xs text-neutral-400">{match.time}</div>
          </div>
        </div>

        {/* Center: Teams and Score */}
        <div className="flex-1 flex items-center justify-center gap-6">
          {/* Home Team */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <span className="text-sm font-medium text-neutral-200 truncate">
              {match.home}
            </span>
            <div className="w-8 h-8 bg-neutral-700 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
              {match.homeImage || "🔴"}
            </div>
          </div>

          {/* Score or VS */}
          <div className="flex items-center gap-3 min-w-[80px] justify-center">
            {match.status === "live" || match.status === "finished" ? (
              <>
                <span className="text-xl font-bold text-neutral-100">
                  {match.homeScore}
                </span>
                <span className="text-neutral-500">-</span>
                <span className="text-xl font-bold text-neutral-100">
                  {match.awayScore}
                </span>
              </>
            ) : (
              <span className="text-neutral-500 text-sm">vs</span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-neutral-700 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
              {match.awayImage || "🔵"}
            </div>
            <span className="text-sm font-medium text-neutral-200 truncate">
              {match.away}
            </span>
          </div>
        </div>

        {/* Right: Status and Action */}
        <div className="flex items-center gap-3 min-w-[160px] justify-end">
          {/* Live Indicator */}
          {match.status === "live" && match.minute && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-500 text-xs font-bold">
                {match.minute}'
              </span>
            </div>
          )}

          {/* Status Badge */}
          <div
            className={`px-2 py-1 rounded text-xs font-semibold ${statusConfig.badgeClass}`}
          >
            {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
          </div>

          {/* Action Button */}
          <Button size="sm" className={`gap-1 ${statusConfig.buttonClass}`}>
            {match.status === "live" && <Play size={12} />}
            {statusConfig.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
