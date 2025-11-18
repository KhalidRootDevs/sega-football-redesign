"use client";

import { ExternalLink, Star, TrendingUp, Sparkles } from "lucide-react";

const SPONSORED_APPS = [
  {
    id: 1,
    name: "BetMaster Pro",
    description: "Advanced betting analytics and insights",
    icon: "📊",
    tag: "Popular",
    rating: 4.8,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Live Score Plus",
    description: "Real-time match updates & notifications",
    icon: "⚡",
    tag: "New",
    rating: 4.9,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    name: "Fantasy League",
    description: "Build and manage your dream team",
    icon: "🏆",
    tag: "Trending",
    rating: 4.7,
    color: "from-orange-500 to-amber-500",
  },
];

const TagIcon = ({ tag }: { tag: string }) => {
  switch (tag) {
    case "Popular":
      return <Star size={12} className="fill-current" />;
    case "New":
      return <Sparkles size={12} />;
    case "Trending":
      return <TrendingUp size={12} />;
    default:
      return null;
  }
};

export default function SponsoredApps() {
  return (
    <div className="px-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white text-base">Sponsored Apps</h3>
        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
          {SPONSORED_APPS.length} apps
        </span>
      </div>

      <div className="space-y-3">
        {SPONSORED_APPS.map((app) => (
          <div key={app.id} className="group relative">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.08] hover:scale-[1.02] cursor-pointer">
              <div className="flex items-start gap-4">
                {/* App Icon with Gradient Background */}
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center text-white text-lg font-medium shadow-lg flex-shrink-0`}
                >
                  {app.icon}
                </div>

                {/* App Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white text-sm truncate">
                        {app.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star
                            size={12}
                            className="fill-amber-500 text-amber-500"
                          />
                          <span className="text-xs text-gray-300">
                            {app.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400">Free</span>
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full flex-shrink-0">
                      <TagIcon tag={app.tag} />
                      <span className="text-xs font-medium text-white">
                        {app.tag}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                    {app.description}
                  </p>

                  {/* Action Button */}
                  <button className="flex items-center gap-2 text-xs font-semibold text-[#00d4ff] hover:text-white transition-colors duration-200 group/btn">
                    <span>Learn more</span>
                    <ExternalLink
                      size={14}
                      className="group-hover/btn:translate-x-0.5 transition-transform duration-200"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-400 text-center">
          Verified partner applications • Secure installation
        </p>
      </div>
    </div>
  );
}
