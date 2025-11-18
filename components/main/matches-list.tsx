"use client";
import MatchCard from "./match-card";

interface Match {
  id: number;
  home: string;
  homeImage?: string;
  away: string;
  awayImage?: string;
  homeScore?: number;
  startingAt?: number;
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
        if (match.status === "active") {
          status = match.liveStatus ? "live" : "finished";
        }

        // Convert timestamp to time string
        const matchDate = new Date(match?.startingAt * 1000);
        const time = matchDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          id: parseInt(match.id.slice(-6), 16), // Generate numeric ID from string
          home: match.participants[0]?.name || "TBD",
          homeImage: match.participants[0]?.image,
          away: match.participants[1]?.name || "TBD",
          awayImage: match.participants[1]?.image,
          homeScore: match.participants[0]?.score,
          awayScore: match.participants[1]?.score,
          status,
          time,
          league: match.league.name,
          leagueIcon: match.league.image,
          viewers: 0, // Default value since fixturesData doesn't have viewers
          minute: status === "live" ? "45" : undefined, // Default minute for live matches
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

export const fixturesData = [
  {
    matches: [
      {
        id: "6902e8bb2bb1abfe1fe7c411",
        name: "Pro League",
        matchId: 1762610892610,
        fixtureId: 1435971,
        league: {
          id: 307,
          name: "Pro League",
          image: "https://media.api-sports.io/football/leagues/307.png",
        },
        startingAt: "1760541300",
        startingAtTimestamps: 1760541300,
        matchType: "normal",
        participants: [
          {
            id: 2956,
            name: "Damac",
            image: "https://media.api-sports.io/football/teams/2956.png",
            score: 5,
          },
          {
            id: 2931,
            name: "Al-Fateh",
            image: "https://media.api-sports.io/football/teams/2931.png",
            score: 6,
          },
        ],
        status: "active",
        liveStatus: false,
        position: 99999,
        streamSources: [
          "6902e8bb2bb1abfe1fe7c413",
          "6902e8bb2bb1abfe1fe7c414",
          "6902e8bb2bb1abfe1fe7c415",
        ],
        platforms: ["6902e90d2bb1abfe1fe7c453"],
        createdAt: "2025-10-30T04:25:31.765Z",
        updatedAt: "2025-10-30T06:20:21.574Z",
        dateOnly: "2025-10-15",
      },
    ],
    timestamp: "2025-10-15",
  },
  {
    matches: [
      {
        id: "6902e8bd2bb1abfe1fe7c41f",
        name: "Pro League",
        matchId: 1762373387880,
        fixtureId: 1435969,
        league: {
          id: 307,
          name: "Pro League",
          image: "https://media.api-sports.io/football/leagues/307.png",
        },
        startingAt: "1761845400",
        startingAtTimestamps: 1761845400,
        matchType: "normal",
        participants: [
          {
            id: 2929,
            name: "Al-Ahli Jeddah",
            image: "https://media.api-sports.io/football/teams/2929.png",
            score: 0,
          },
          {
            id: 10511,
            name: "Al Riyadh",
            image: "https://media.api-sports.io/football/teams/10511.png",
            score: 0,
          },
        ],
        status: "active",
        liveStatus: false,
        position: 99999,
        streamSources: [
          "6902e8bd2bb1abfe1fe7c421",
          "6902e8bd2bb1abfe1fe7c422",
          "6902e8bd2bb1abfe1fe7c423",
        ],
        platforms: ["6902e90d2bb1abfe1fe7c453"],
        createdAt: "2025-10-30T04:25:33.127Z",
        updatedAt: "2025-10-30T04:27:10.579Z",
        dateOnly: "2025-10-30",
      },
      {
        id: "6902e8be2bb1abfe1fe7c42d",
        name: "Pro League",
        matchId: 1762379754026,
        fixtureId: 1435973,
        league: {
          id: 307,
          name: "Pro League",
          image: "https://media.api-sports.io/football/leagues/307.png",
        },
        startingAt: "1761845400",
        startingAtTimestamps: 1761845400,
        matchType: "normal",
        participants: [
          {
            id: 10509,
            name: "Al Kholood",
            image: "https://media.api-sports.io/football/teams/10509.png",
            score: 0,
          },
          {
            id: 10513,
            name: "NEOM",
            image: "https://media.api-sports.io/football/teams/10513.png",
            score: 0,
          },
        ],
        status: "active",
        liveStatus: false,
        position: 99999,
        streamSources: [
          "6902e8be2bb1abfe1fe7c42f",
          "6902e8be2bb1abfe1fe7c430",
          "6902e8be2bb1abfe1fe7c431",
        ],
        platforms: ["6902e90d2bb1abfe1fe7c453"],
        createdAt: "2025-10-30T04:25:34.374Z",
        updatedAt: "2025-10-30T04:27:17.939Z",
        dateOnly: "2025-10-30",
      },
    ],
    timestamp: "2025-10-30",
  },
];
