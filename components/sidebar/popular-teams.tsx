"use client";

import { ChevronDown, ChevronUp, Users } from "lucide-react";
import { useState } from "react";

export default function PopularTeams() {
  const [isOpen, setIsOpen] = useState(true);

  const teams = [
    {
      name: "Real Madrid",
      matches: 225,
      image: "https://media.api-sports.io/football/teams/541.png",
    },
    {
      name: "FC Barcelona",
      matches: 190,
      image: "https://media.api-sports.io/football/teams/529.png",
    },
    {
      name: "Manchester United",
      matches: 310,
      image: "https://media.api-sports.io/football/teams/33.png",
    },
    {
      name: "Bayern Munich",
      matches: 215,
      image: "https://media.api-sports.io/football/teams/157.png",
    },
    {
      name: "Paris Saint-Germain",
      matches: 100,
      image: "https://media.api-sports.io/football/teams/85.png",
    },
    {
      name: "Liverpool",
      matches: 280,
      image: "https://media.api-sports.io/football/teams/40.png",
    },
    {
      name: "Manchester City",
      matches: 195,
      image: "https://media.api-sports.io/football/teams/50.png",
    },
    {
      name: "Juventus",
      matches: 175,
      image: "https://media.api-sports.io/football/teams/496.png",
    },
  ];

  return (
    <div className="bg-white/5 rounded-xl p-2 backdrop-blur-sm border border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Users size={16} className="text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white text-sm">Popular Teams</h3>
            <p className="text-xs text-gray-400">{teams.length} teams</p>
          </div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
          {isOpen ? (
            <ChevronUp size={16} className="text-gray-400" />
          ) : (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {teams.map((team, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-1 hover:bg-white/5 rounded-lg transition-all duration-200 group/item border border-transparent hover:border-white/5"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-6 h-6 object-contain rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden"
                      );
                    }}
                  />
                  <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded hidden items-center justify-center text-xs font-bold text-white">
                    {team.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h4 className="text-sm font-medium text-white truncate">
                    {team.name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full font-medium">
                  {team.matches}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* View All Button */}
      {isOpen && (
        <button className="w-full mt-4 py-2.5 text-xs font-semibold text-[#00d4ff] hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 border border-white/5 hover:border-[#00d4ff]/20">
          View All Teams
        </button>
      )}
    </div>
  );
}
