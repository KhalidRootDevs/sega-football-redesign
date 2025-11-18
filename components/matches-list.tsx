"use client";
import MatchCard from "./match-card";

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
  const matchesData: { [key: string]: { date: string; matches: Match[] } } = {
    today: {
      date: "Today, 14 Nov 2025",
      matches: [
        {
          id: 1,
          home: "Bayern Munich",
          homeImage: "🔴",
          away: "Stuttgart",
          awayImage: "🔴",
          homeScore: 1,
          awayScore: 0,
          status: "live",
          time: "17:30",
          league: "Bundesliga",
          viewers: 12500,
          minute: "24",
        },
        {
          id: 2,
          home: "Dortmund",
          homeImage: "🟡",
          away: "Wolfsburg",
          awayImage: "🟢",
          homeScore: 2,
          awayScore: 1,
          status: "live",
          time: "17:30",
          league: "Bundesliga",
          viewers: 8900,
          minute: "54",
        },
        {
          id: 3,
          home: "Manchester City",
          homeImage: "🔵",
          away: "Tottenham Hotspur",
          awayImage: "⚪",
          status: "upcoming",
          time: "19:45",
          league: "Premier League",
          viewers: 0,
        },
      ],
    },
    tomorrow: {
      date: "Tomorrow, 15 Nov 2025",
      matches: [
        {
          id: 4,
          home: "Real Madrid",
          homeImage: "⚪",
          away: "Atletico Madrid",
          awayImage: "🔴",
          homeScore: 1,
          awayScore: 0,
          status: "finished",
          time: "20:00",
          league: "La Liga",
        },
        {
          id: 5,
          home: "FC Barcelona",
          homeImage: "🔵",
          away: "Athletic Bilbao",
          awayImage: "🔴",
          status: "upcoming",
          time: "16:30",
          league: "La Liga",
        },
      ],
    },
  };

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
  const allMatches = Object.values(matchesData).flatMap((data) =>
    filterMatches(data.matches)
  );
  if (allMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">⚽</span>
        </div>
        <h3 className="text-lg font-semibold text-neutral-300 mb-2">
          No matches found
        </h3>
        <p className="text-neutral-500 text-sm max-w-sm">
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
              <h3 className="text-sm font-bold text-neutral-200 mb-2">
                {date}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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
