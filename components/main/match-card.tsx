"use client";

import { Play, Eye, Calendar, Trophy, ExternalLink } from "lucide-react";

interface Match {
  id: string;
  home: string;
  homeImage?: string;
  away: string;
  awayImage?: string;
  homeScore?: number;
  awayScore?: number;
  status: "live" | "upcoming" | "finished";
  time: string;
  startingAtTimestamps?: number;
  date: string;
  league: string;
  leagueIcon?: string;
  fixtureId: number;
  startingAt: string;
  matchType: "hot" | "normal";
  streamSources: string[];
  platforms: string[];
  name?: string;
  position?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "live":
        return {
          badgeClass: "bg-red-50 text-red-600 border border-red-200",
          buttonClass:
            "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105",
          buttonText: "Watch Live",
          showScore: true,
          icon: Play,
          timeClass: "text-red-600 font-semibold",
          hasStreams: match.streamSources && match.streamSources.length > 0,
        };
      case "upcoming":
        return {
          badgeClass: "bg-blue-50 text-blue-600 border border-blue-200",
          buttonClass:
            "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white",
          buttonText: "Set Reminder",
          showScore: false,
          icon: Calendar,
          timeClass: "text-gray-900 font-semibold",
          hasStreams: false,
        };
      case "finished":
        return {
          badgeClass: "bg-green-50 text-green-600 border border-green-200",
          buttonClass:
            "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white",
          buttonText: "Match Highlights",
          showScore: true,
          icon: Trophy,
          timeClass: "text-gray-500",
          hasStreams: false,
        };
      default:
        return {
          badgeClass: "bg-gray-50 text-gray-600 border border-gray-200",
          buttonClass: "bg-gray-800 hover:bg-gray-900 text-white",
          buttonText: "Details",
          showScore: false,
          icon: Calendar,
          timeClass: "text-gray-900",
          hasStreams: false,
        };
    }
  };

  const statusConfig = getStatusConfig(match.status);
  const StatusIcon = statusConfig.icon;

  // Format match time for better display
  const formatMatchTime = (time: string) => {
    if (match.status === "live" && match.startingAtTimestamps) {
      return `${match.startingAtTimestamps}'`;
    }
    if (match.status === "finished") {
      return "FT";
    }
    return time;
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-3 bg-gradient-to-r from-gray-50 to-gray-100/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-200 overflow-hidden">
            {match.leagueIcon ? (
              <img
                src={match.leagueIcon}
                alt={match.league}
                className="w-6 h-6 object-contain"
              />
            ) : (
              "⚽"
            )}
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900 block">
              {match.league}
            </span>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.badgeClass}`}
        >
          {match.status === "live" && (
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
          )}
          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
        </div>
      </div>

      {/* Match Content */}
      <div className="px-6 py-5">
        <div className="flex items-center justify-between gap-6">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-3 flex-1 min-w-0">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl border-2 border-gray-200 overflow-hidden">
              {match.homeImage ? (
                <img
                  src={match.homeImage}
                  alt={match.home}
                  className="w-14 h-14 object-contain"
                />
              ) : (
                "🏠"
              )}
            </div>
            <span className="text-sm font-semibold text-gray-900 text-center truncate w-full">
              {match.home}
            </span>
          </div>

          {/* Score/Time Section */}
          <div className="flex flex-col items-center justify-center gap-2 min-w-[100px]">
            {statusConfig.showScore ? (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {match.homeScore ?? 0}
                  </span>
                  <span className="text-lg font-medium text-gray-300">-</span>
                  <span className="text-3xl font-bold text-gray-900">
                    {match.awayScore ?? 0}
                  </span>
                </div>

                {match.status === "finished" && (
                  <span className="text-xs text-gray-500 font-medium">
                    Full Time
                  </span>
                )}
              </>
            ) : (
              <div className="text-center">
                <div className={`text-lg font-bold ${statusConfig.timeClass}`}>
                  {formatMatchTime(match.time)}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">
                  {match.status === "upcoming" ? "KICK OFF" : "MATCH ENDED"}
                </div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-3 flex-1 min-w-0">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl border-2 border-gray-200 overflow-hidden">
              {match.awayImage ? (
                <img
                  src={match.awayImage}
                  alt={match.away}
                  className="w-14 h-14 object-contain"
                />
              ) : (
                "✈️"
              )}
            </div>
            <span className="text-sm font-semibold text-gray-900 text-center truncate w-full">
              {match.away}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-4">
        <button
          className={`
            w-full flex items-center justify-center gap-3 text-sm font-semibold py-2.5 
            rounded-md transition-all duration-200 group/btn relative
            ${statusConfig.buttonClass}
            ${!statusConfig.hasStreams ? "opacity-80 cursor-not-allowed" : ""}
          `}
          disabled={!statusConfig.hasStreams}
        >
          <StatusIcon
            size={16}
            className="group-hover/btn:scale-110 transition-transform duration-200"
          />
          {statusConfig.buttonText}
        </button>
      </div>
    </div>
  );
}
