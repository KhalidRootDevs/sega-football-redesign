"use client";
import { fixturesData } from "@/lib/data/fixtures";
import MatchCard from "./match-card";

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
interface MatchesListProps {
  activeTab: string;
}

export default function MatchesList({ activeTab }: MatchesListProps) {
  // Transform fixturesData to match the expected format
  const transformFixturesData = () => {
    const transformedData: {
      [key: string]: { date: string; matches: Match[] };
    } = {};

    fixturesData.forEach((fixtureGroup, index) => {
      const date = new Date(fixtureGroup.timestamp);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let key = "";
      let displayDate = "";

      // Check if date is today, tomorrow, or other
      if (date.toDateString() === today.toDateString()) {
        key = "today";
        displayDate = `Today, ${date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`;
      } else if (date.toDateString() === tomorrow.toDateString()) {
        key = "tomorrow";
        displayDate = `Tomorrow, ${date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`;
      } else {
        key = `day${index}`;
        displayDate = date.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }

      const matches: Match[] = fixtureGroup.matches.map((match) => {
        // Determine match status based on the fixture data
        let status: "live" | "upcoming" | "finished" = "upcoming";
        if (match.liveStatus) {
          status = "live";
        } else if (
          match.status === "ended" ||
          match.participants.some((p) => p.score > 0)
        ) {
          status = "finished";
        }

        // Convert timestamp to time string - using startingAtTimestamps
        const matchDate = new Date(match.startingAtTimestamps * 1000);
        const time = matchDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          id: match.id, // Use the actual string ID
          home: match.participants[0]?.name || "TBD",
          homeImage: match.participants[0]?.image,
          away: match.participants[1]?.name || "TBD",
          awayImage: match.participants[1]?.image,
          homeScore: match.participants[0]?.score,
          awayScore: match.participants[1]?.score,
          status,
          time,
          startingAtTimestamps: match.startingAtTimestamps,
          startingAt: match.startingAtTimestamps
            ? new Date(match.startingAtTimestamps * 1000).toISOString()
            : "",
          date: displayDate,
          league: match.league?.name || "Unknown",
          leagueIcon: match.league?.image,
          fixtureId:
            typeof match.fixtureId === "number"
              ? match.fixtureId
              : Number(match.fixtureId) || 0,
          matchType: (match.matchType as "hot" | "normal") || "normal",
          streamSources: match.streamSources || [],
          platforms: match.platforms || [],
        };
      });

      transformedData[key] = {
        date: displayDate,
        matches,
      };
    });

    return transformedData;
  };

  const matchesData = transformFixturesData();

  const filterMatches = (matches: Match[]) => {
    switch (activeTab) {
      case "live":
        return matches.filter((m) => m.status === "live");
      case "upcoming":
        return matches.filter((m) => m.status === "upcoming");
      case "finished":
        return matches.filter((m) => m.status === "finished");
      default: // "all" tab - show only live and upcoming matches
        return matches.filter((m) => m.status !== "finished");
    }
  };

  // Show empty state if no matches
  const allMatches = Object.values(matchesData).flatMap((data) =>
    filterMatches(data.matches)
  );
  if (allMatches.length === 0) {
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
      {Object.entries(matchesData).map(([key, { date, matches }]) => {
        const filteredMatches = filterMatches(matches);
        if (filteredMatches.length === 0) return null;

        return (
          <div key={key} className="animate-in fade-in duration-300">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-[#7a8a96] uppercase tracking-wide">
                {date}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
