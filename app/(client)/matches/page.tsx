"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Grid3x3,
  List,
  SlidersHorizontal,
  X,
  Calendar,
  Shield,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import MatchCard from "@/components/main/match-card";
import MatchListItem from "@/components/matches/match-list-item";

type MatchStatus = "live" | "upcoming" | "finished";
type ViewMode = "grid" | "list";
type SortOrder = "asc" | "desc";

// Your actual data
const leaguesData = [
  {
    name: "Bundesliga",
    position: 9999,
    image: "https://media.api-sports.io/football/leagues/78.png",
    id: 78,
    matches: 0,
  },
  {
    name: "Pro League",
    position: 9999,
    image: "https://media.api-sports.io/football/leagues/307.png",
    id: 307,
    matches: 3,
  },
];

const teamsData = [
  {
    id: "68d50f91f161cc8d8c16af5f",
    uId: 9863,
    name: "Berceo",
    image: "https://media.api-sports.io/football/teams/9863.png",
    newsUrl: "",
    position: 9999,
    createdAt: "2025-09-25T09:46:57.193Z",
    updatedAt: "2025-09-25T09:46:57.193Z",
  },
  {
    id: "68d50f98f161cc8d8c16af69",
    uId: 529,
    name: "Barcelona",
    image: "https://media.api-sports.io/football/teams/529.png",
    newsUrl: "",
    position: 9999,
    createdAt: "2025-09-25T09:47:04.370Z",
    updatedAt: "2025-09-25T09:47:04.370Z",
  },
];

const fixturesData = [
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

// Transform your data to match the expected Match interface
const transformMatches = () => {
  const allMatches: any[] = [];

  fixturesData.forEach((day) => {
    day.matches.forEach((match) => {
      // Determine match status based on your data
      let status: MatchStatus = "upcoming";
      if (match.liveStatus) {
        status = "live";
      } else if (
        match.status === "finished" ||
        match.participants.some((p) => p.score > 0)
      ) {
        status = "finished";
      }

      // Convert timestamp to Date
      const matchDate = new Date(parseInt(match.startingAt) * 1000);

      const transformedMatch = {
        id: match.matchId,
        home: match.participants[0].name,
        homeImage: match.participants[0].image,
        away: match.participants[1].name,
        awayImage: match.participants[1].image,
        homeScore: match.participants[0].score,
        awayScore: match.participants[1].score,
        status: status,
        time: matchDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: matchDate.toISOString(),
        league: match.league.name,
        leagueIcon: match.league.image,
        fixtureId: match.fixtureId,
        startingAt: match.startingAt,
        matchType: match.matchType,
        streamSources: match.streamSources,
        platforms: match.platforms,
      };

      allMatches.push(transformedMatch);
    });
  });

  return allMatches;
};

export default function MatchesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [statusFilter, setStatusFilter] = useState<MatchStatus | "all">("all");
  const [leagueFilter, setLeagueFilter] = useState<string>("all");
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchQuery, setSearchQuery] = useState("");

  // Transform and use your actual data
  const mockMatches = useMemo(() => transformMatches(), []);

  // Extract unique leagues from your actual data
  const leagues = useMemo(() => {
    const uniqueLeagues = Array.from(
      new Set(mockMatches.map((match) => match.league))
    );
    return uniqueLeagues.sort();
  }, [mockMatches]);

  // Extract unique teams from your actual data
  const teams = useMemo(() => {
    const allTeams = new Set<string>();
    mockMatches.forEach((match) => {
      allTeams.add(match.home);
      allTeams.add(match.away);
    });
    return Array.from(allTeams).sort();
  }, [mockMatches]);

  // Filter and sort matches
  const filteredMatches = useMemo(() => {
    let filtered = mockMatches;

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((match) => match.status === statusFilter);
    }

    // League filter
    if (leagueFilter !== "all") {
      filtered = filtered.filter((match) => match.league === leagueFilter);
    }

    if (teamFilter !== "all") {
      filtered = filtered.filter(
        (match) => match.home === teamFilter || match.away === teamFilter
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (match) =>
          match.home.toLowerCase().includes(query) ||
          match.away.toLowerCase().includes(query) ||
          match.league.toLowerCase().includes(query)
      );
    }

    // Sort by match time
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [
    statusFilter,
    leagueFilter,
    teamFilter,
    sortOrder,
    searchQuery,
    mockMatches,
  ]);

  const hasActiveFilters =
    statusFilter !== "all" ||
    leagueFilter !== "all" ||
    teamFilter !== "all" ||
    searchQuery !== "";

  const resetFilters = () => {
    setStatusFilter("all");
    setLeagueFilter("all");
    setTeamFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="flex-1 bg-[#0a0e12]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#f5f7fa] mb-2">
              All Matches
            </h1>
            <p className="text-[#7a8a96]">
              Browse and filter through all available matches
            </p>
          </div>

          <div className="flex gap-2 bg-[#0f1419] border border-[#1a2a38] p-1.5 rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid"
                  ? "bg-[#00d4ff] text-[#0a0e12] hover:bg-[#00b8e6]"
                  : "text-[#7a8a96] hover:text-[#f5f7fa] hover:bg-[#1a2332]"
              }
            >
              <Grid3x3 size={16} />
              <span className="ml-2 hidden sm:inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list"
                  ? "bg-[#00d4ff] text-[#0a0e12] hover:bg-[#00b8e6]"
                  : "text-[#7a8a96] hover:text-[#f5f7fa] hover:bg-[#1a2332]"
              }
            >
              <List size={16} />
              <span className="ml-2 hidden sm:inline">List</span>
            </Button>
          </div>
        </div>

        {/* Filter Groups */}
        <div className="bg-[#0f1419] border border-[#1a2a38] rounded-xl p-4 md:p-6 mb-6">
          {/* Search Bar */}
          <div className="mb-5">
            <label className="text-sm font-medium text-[#7a8a96] mb-2 flex items-center gap-2">
              <Search size={14} />
              Search Matches
            </label>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8a96]"
              />
              <input
                type="text"
                placeholder="Search by teams, leagues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a2332] text-[#f5f7fa] placeholder-[#7a8a96] pl-10 pr-10 py-3 rounded-lg border border-[#2a3a48] focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a8a96] hover:text-[#00d4ff] transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Match Status */}
            <div className="lg:col-span-1">
              <label className="text-sm font-medium text-[#7a8a96] mb-3 flex items-center gap-2">
                <Shield size={14} />
                Match Status
              </label>
              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                  className={
                    statusFilter === "all"
                      ? "bg-[#00d4ff] text-[#0a0e12] hover:bg-[#00b8e6] border-0 justify-start"
                      : "bg-[#1a2332] text-[#7a8a96] border-[#2a3a48] hover:bg-[#2a3a48] hover:text-[#f5f7fa] hover:border-[#00d4ff]/30 justify-start"
                  }
                >
                  All Matches
                </Button>
                <Button
                  variant={statusFilter === "live" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("live")}
                  className={
                    statusFilter === "live"
                      ? "bg-[#00d4ff] text-[#0a0e12] hover:bg-[#00b8e6] border-0 justify-start"
                      : "bg-[#1a2332] text-[#7a8a96] border-[#2a3a48] hover:bg-[#2a3a48] hover:text-[#f5f7fa] hover:border-[#00d4ff]/30 justify-start"
                  }
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2" />
                  Live
                </Button>
                <Button
                  variant={statusFilter === "upcoming" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("upcoming")}
                  className={
                    statusFilter === "upcoming"
                      ? "bg-[#00d4ff] text-[#0a0e12] hover:bg-[#00b8e6] border-0 justify-start"
                      : "bg-[#1a2332] text-[#7a8a96] border-[#2a3a48] hover:bg-[#2a3a48] hover:text-[#f5f7fa] hover:border-[#00d4ff]/30 justify-start"
                  }
                >
                  <Calendar size={14} className="mr-2" />
                  Upcoming
                </Button>
                <Button
                  variant={statusFilter === "finished" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("finished")}
                  className={
                    statusFilter === "finished"
                      ? "bg-[#00d4ff] text-[#0a0e12] hover:bg-[#00b8e6] border-0 justify-start"
                      : "bg-[#1a2332] text-[#7a8a96] border-[#2a3a48] hover:bg-[#2a3a48] hover:text-[#f5f7fa] hover:border-[#00d4ff]/30 justify-start"
                  }
                >
                  Finished
                </Button>
              </div>
            </div>

            {/* Right Column - League, Team, Sort Filters */}
            <div className="lg:col-span-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* League Filter */}
                <div>
                  <label className="text-sm font-medium text-[#7a8a96] mb-3 flex items-center gap-1.5">
                    <Shield size={12} />
                    League
                  </label>
                  <Select
                    value={leagueFilter}
                    onValueChange={(value) => setLeagueFilter(value)}
                  >
                    <SelectTrigger className="bg-[#1a2332] border-[#2a3a48] text-[#f5f7fa] hover:border-[#00d4ff]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20 transition-all">
                      <SelectValue placeholder="All Leagues" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2332] border-[#2a3a48]">
                      <SelectItem value="all">All Leagues</SelectItem>
                      {leagues.map((league) => (
                        <SelectItem key={league} value={league}>
                          {league}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Team Filter */}
                <div>
                  <label className="text-sm font-medium text-[#7a8a96] mb-3 flex items-center gap-1.5">
                    <Users size={12} />
                    Team
                  </label>
                  <Select
                    value={teamFilter}
                    onValueChange={(value) => setTeamFilter(value)}
                  >
                    <SelectTrigger className="bg-[#1a2332] border-[#2a3a48] text-[#f5f7fa] hover:border-[#00d4ff]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20 transition-all">
                      <SelectValue placeholder="All Teams" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2332] border-[#2a3a48]">
                      <SelectItem value="all">All Teams</SelectItem>
                      {teams.map((team) => (
                        <SelectItem key={team} value={team}>
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="text-sm font-medium text-[#7a8a96] mb-3 flex items-center gap-1.5">
                    <Clock size={12} />
                    Sort by Time
                  </label>
                  <Select
                    value={sortOrder}
                    onValueChange={(value) => setSortOrder(value as SortOrder)}
                  >
                    <SelectTrigger className="bg-[#1a2332] border-[#2a3a48] text-[#f5f7fa] hover:border-[#00d4ff]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20 transition-all">
                      <SelectValue placeholder="Sort by Time" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2332] border-[#2a3a48]">
                      <SelectItem value="asc">Earliest First</SelectItem>
                      <SelectItem value="desc">Latest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-5 pt-5 border-t border-[#1a2a38]">
              <div className="flex items-center gap-2 text-sm text-[#7a8a96] shrink-0">
                <SlidersHorizontal size={14} />
                <span className="font-medium">Active:</span>
              </div>
              <div className="flex flex-wrap gap-2 flex-1">
                {statusFilter !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30 hover:bg-[#00d4ff]/20"
                  >
                    {statusFilter.charAt(0).toUpperCase() +
                      statusFilter.slice(1)}
                    <button
                      onClick={() => setStatusFilter("all")}
                      className="ml-1.5 hover:text-[#00b8e6]"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                )}
                {leagueFilter !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30 hover:bg-[#00d4ff]/20"
                  >
                    {leagueFilter}
                    <button
                      onClick={() => setLeagueFilter("all")}
                      className="ml-1.5 hover:text-[#00b8e6]"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                )}
                {teamFilter !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30 hover:bg-[#00d4ff]/20"
                  >
                    {teamFilter}
                    <button
                      onClick={() => setTeamFilter("all")}
                      className="ml-1.5 hover:text-[#00b8e6]"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                )}
                {searchQuery && (
                  <Badge
                    variant="secondary"
                    className="bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30 hover:bg-[#00d4ff]/20"
                  >
                    {'"'}
                    {searchQuery}
                    {'"'}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1.5 hover:text-[#00b8e6]"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-[#7a8a96] hover:text-[#00d4ff] hover:bg-[#1a2332] whitespace-nowrap shrink-0"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-[#7a8a96]">
            Showing{" "}
            <span className="text-[#00d4ff] font-semibold">
              {filteredMatches.length}
            </span>{" "}
            of {mockMatches.length} matches
          </span>
        </div>

        {/* Matches Display */}
        {filteredMatches.length === 0 ? (
          <div className="bg-[#0f1419] border border-[#1a2a38] rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-[#1a2332] rounded-full flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal size={24} className="text-[#7a8a96]" />
            </div>
            <h3 className="text-xl font-semibold text-[#f5f7fa] mb-2">
              No matches found
            </h3>
            <p className="text-[#7a8a96] mb-4">
              Try adjusting your filters or search query
            </p>
            <Button
              onClick={resetFilters}
              className="bg-[#00d4ff] text-[#0a0e12] hover:bg-[#00b8e6]"
            >
              Reset Filters
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMatches.map((match) => (
              <MatchListItem key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
