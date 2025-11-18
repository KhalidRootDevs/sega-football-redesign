"use client";

import { ChevronDown, ChevronUp, Shield, Eye } from "lucide-react";
import { useState } from "react";

export default function PopularLeagues() {
  const [isOpen, setIsOpen] = useState(true);

  const leagues = [
    {
      name: "UEFA Champions League",
      matches: 38,
      image: "https://media.api-sports.io/football/leagues/2.png",
    },
    {
      name: "Premier League",
      matches: 153,
      image: "https://media.api-sports.io/football/leagues/39.png",
    },
    {
      name: "La Liga",
      matches: 156,
      image: "https://media.api-sports.io/football/leagues/140.png",
    },
    {
      name: "Serie A",
      matches: 145,
      image: "https://media.api-sports.io/football/leagues/135.png",
    },
    {
      name: "Bundesliga",
      matches: 150,
      image: "https://media.api-sports.io/football/leagues/78.png",
    },
    {
      name: "Ligue 1",
      matches: 159,
      image: "https://media.api-sports.io/football/leagues/61.png",
    },
    {
      name: "Pro League",
      matches: 42,
      image: "https://media.api-sports.io/football/leagues/307.png",
    },
  ];

  return (
    <div className="bg-white/5 rounded-xl p-2 backdrop-blur-sm border border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white text-sm">
              Popular Leagues
            </h3>
            <p className="text-xs text-gray-400">{leagues.length} leagues</p>
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
          {leagues.map((league, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-1 hover:bg-white/5 rounded-lg transition-all duration-200 group/item border border-transparent hover:border-white/5"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200">
                  <img
                    src={league.image}
                    alt={league.name}
                    className="w-6 h-6 object-contain rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden"
                      );
                    }}
                  />
                  <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded hidden items-center justify-center text-xs font-bold text-white">
                    {league.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h4 className="text-sm font-medium text-white truncate">
                    {league.name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full font-medium">
                  {league.matches}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* View All Button */}
      {isOpen && (
        <button className="w-full mt-4 py-2.5 text-xs font-semibold text-[#00d4ff] hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-all duration-200 border border-white/5 hover:border-[#00d4ff]/20">
          View All Leagues
        </button>
      )}
    </div>
  );
}
