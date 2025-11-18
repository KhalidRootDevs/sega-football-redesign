import { HelpCircle, MessageCircle } from "lucide-react";
import React from "react";

export default function Support() {
  return (
    <div>
      {/* Telegram & Support Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white text-base">
            Support & Community
          </h3>
          <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
            Online
          </span>
        </div>

        {/* Telegram Channel */}
        <a
          href="https://t.me/betlive"
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-4"
        >
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                <MessageCircle size={20} className="text-blue-400" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white text-sm mb-1">
                  Telegram Channel
                </h4>
                <p className="text-sm text-gray-300">
                  Join our community for updates
                </p>
              </div>

              {/* External link indicator */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* Quick Help */}
        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <HelpCircle size={16} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white font-medium">Need help?</p>
              <p className="text-xs text-gray-300">
                We're here 24/7 to assist you
              </p>
            </div>
            <a
              href="/support"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Get Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
