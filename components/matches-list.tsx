"use client";
import MatchCard from "./match-card";
import { transformMatches } from "@/app/(client)/matches/page";
import { useMemo } from "react";

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

interface MatchesListProps {
  activeTab: string;
}

export default function MatchesList({ activeTab }: MatchesListProps) {
  const allMatches = useMemo(() => transformMatches(), []);

  const groupedMatches = useMemo(() => {
    const groups: { [key: string]: Match[] } = {};

    allMatches.forEach((match: any) => {
      const matchDate = new Date(match.date);
      const dateKey = matchDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(match);
    });

    return groups;
  }, [allMatches]);

  const filterMatches = (matches: Match[]) => {
    switch (activeTab) {
      case "live":
        return matches.filter((m) => m.status === "live");
      case "upcoming":
        return matches.filter((m) => m.status === "upcoming");
      case "finished":
        return matches.filter((m) => m.status === "finished");
      default:
        return matches;
    }
  };

  // Show empty state if no matches
  const filteredGroupedMatches = Object.entries(groupedMatches).reduce(
    (acc, [date, matches]) => {
      const filtered = filterMatches(matches);
      if (filtered.length > 0) {
        acc[date] = filtered;
      }
      return acc;
    },
    {} as { [key: string]: Match[] }
  );

  if (Object.keys(filteredGroupedMatches).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-[#1a2332] rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">⚽</span>
        </div>
        <h3 className="text-lg font-semibold text-[#f5f7fa] mb-2">
          No matches found
        </h3>
        <p className="text-[#7a8a96] text-sm max-w-sm">
          There are no {activeTab !== "all" ? activeTab : ""} matches scheduled
          for this period.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(filteredGroupedMatches).map(([date, matches]) => (
        <div key={date} className="animate-in fade-in duration-300">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-[#7a8a96] uppercase tracking-wide">
              {date}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
