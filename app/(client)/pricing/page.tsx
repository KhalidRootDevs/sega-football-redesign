"use client";

import { useState } from "react";
import {
  Check,
  CreditCard,
  Zap,
  Shield,
  Clock,
  Users,
  Bitcoin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Types based on API response
interface Provider {
  name: string;
  displayName: string;
  icon: string;
  description: string;
  images: string[];
  status: string;
}

interface League {
  _id: string;
  uId: number;
  name: string;
  image: string;
  position: number;
}

interface Subscription {
  _id: string;
  title: string;
  packageDetails: string;
  durationType: "monthly" | "yearly";
  duration: number;
  price: number;
  salePrice: number;
  providers: Provider[];
  status: string;
  descriptions: string[];
  discount: number;
  currency: string;
  watchTime: number;
  position: number;
  ads: string;
  fixtureAccess: string;
  deviceLimit: number;
  support: string;
  featured: boolean;
  subscriptionType: "universal" | "league";
  league?: League;
  leagueId?: number;
  session?: string;
}

export default function PricingPage() {
  const [selectedTab, setSelectedTab] = useState<"universal" | "league">(
    "universal"
  );
  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "stripe" | "crypto"
  >("stripe");

  // Mock data based on the API response structure
  const subscriptions: Subscription[] = [
    {
      _id: "674db7ebf90547d17281043b",
      title: "12 Month",
      packageDetails: "70% off. Get uninterrupted streaming for 12 months.",
      durationType: "yearly",
      duration: 1,
      price: 240,
      salePrice: 72,
      providers: [
        {
          name: "stripe",
          displayName: "Card",
          icon: "",
          description:
            "Your account will be automatically updated within a minute or so once you pay.",
          images: ["visa.svg", "mastercard.svg", "maestro.png", "elco.svg"],
          status: "on",
        },
        {
          name: "crypto",
          displayName: "Crypto",
          icon: "",
          description:
            "We accept payment via crypto. This methods includes ETH, BTC, USDT, USDC & BNB.",
          images: ["btc.svg", "bnb.svg", "ethereum.svg", "usdt.svg"],
          status: "on",
        },
      ],
      status: "active",
      descriptions: [
        "⚽ 100+ Football Leagues & Tournaments",
        "🎙 English Commentary",
        "🚫 No Ads or Pop-ups",
        "🔒 256-bit Encrypted Security",
        "🕒 24/7 Dedicated Support",
        "📦 Discreet Billing",
        "✅ 100% Safe & Secure",
        "💻📱 Watch on Laptop, Phone, or Tablet",
      ],
      discount: 70,
      currency: "USD",
      watchTime: 100,
      position: 1,
      ads: "no-ads",
      fixtureAccess: "full",
      deviceLimit: 2,
      support: "priority",
      featured: true,
      subscriptionType: "universal",
    },
    {
      _id: "6721c2cd66b04db7574374a7",
      title: "1 Month",
      packageDetails: "25% off. Get uninterrupted streaming for one month.",
      durationType: "monthly",
      duration: 1,
      price: 20,
      salePrice: 15,
      providers: [
        {
          name: "stripe",
          displayName: "Card",
          icon: "",
          description:
            "Your account will be automatically updated within a minute or so once you pay.",
          images: ["visa.svg", "mastercard.svg", "maestro.png", "elco.svg"],
          status: "on",
        },
        {
          name: "crypto",
          displayName: "Crypto",
          icon: "",
          description:
            "We accept payment via crypto. This methods includes ETH, BTC, USDT, USDC & BNB.",
          images: ["btc.svg", "bnb.svg", "ethereum.svg", "usdt.svg"],
          status: "on",
        },
      ],
      status: "active",
      descriptions: [
        "⚽ 100+ Football Leagues & Tournaments",
        "🎙 English Commentary",
        "🚫 No Ads or Pop-ups",
        "🔒 256-bit Encrypted Security",
        "🕒 24/7 Dedicated Support",
        "📦 Discreet Billing",
        "✅ 100% Safe & Secure",
        "💻📱 Watch on Laptop, Phone, or Tablet",
      ],
      discount: 25,
      currency: "USD",
      watchTime: 6,
      position: 2,
      ads: "no-ads",
      fixtureAccess: "full",
      deviceLimit: 2,
      support: "priority",
      featured: false,
      subscriptionType: "universal",
    },
    {
      _id: "6721c32f66b04db7574374b2",
      title: "3 Month",
      packageDetails: "30% off. Get uninterrupted streaming for three months.",
      durationType: "monthly",
      duration: 3,
      price: 60,
      salePrice: 42,
      providers: [
        {
          name: "stripe",
          displayName: "Card",
          icon: "",
          description:
            "Your account will be automatically updated within a minute or so once you pay.",
          images: ["visa.svg", "mastercard.svg", "maestro.png", "elco.svg"],
          status: "on",
        },
        {
          name: "crypto",
          displayName: "Crypto",
          icon: "",
          description:
            "We accept payment via crypto. This methods includes ETH, BTC, USDT, USDC & BNB.",
          images: ["btc.svg", "bnb.svg", "ethereum.svg", "usdt.svg"],
          status: "on",
        },
      ],
      status: "active",
      descriptions: [
        "⚽ 100+ Football Leagues & Tournaments",
        "🎙 English Commentary",
        "🚫 No Ads or Pop-ups",
        "🔒 256-bit Encrypted Security",
        "🕒 24/7 Dedicated Support",
        "📦 Discreet Billing",
        "✅ 100% Safe & Secure",
        "💻📱 Watch on Laptop, Phone, or Tablet",
      ],
      discount: 30,
      currency: "USD",
      watchTime: 1,
      position: 3,
      ads: "no-ads",
      fixtureAccess: "full",
      deviceLimit: 2,
      support: "priority",
      featured: false,
      subscriptionType: "universal",
    },
    {
      _id: "676bd0dd7387fc21641a6c28",
      title: "6 Month",
      packageDetails: "50% off. Get uninterrupted streaming for Six months.",
      durationType: "monthly",
      duration: 6,
      price: 120,
      salePrice: 60,
      providers: [
        {
          name: "stripe",
          displayName: "Card",
          icon: "",
          description:
            "Your account will be automatically updated within a minute or so once you pay.",
          images: ["visa.svg", "mastercard.svg", "maestro.png", "elco.svg"],
          status: "on",
        },
        {
          name: "crypto",
          displayName: "Crypto",
          icon: "",
          description:
            "We accept payment via crypto. This methods includes ETH, BTC, USDT, USDC & BNB.",
          images: ["btc.svg", "bnb.svg", "ethereum.svg", "usdt.svg"],
          status: "on",
        },
      ],
      status: "active",
      descriptions: [
        "⚽ 100+ Football Leagues & Tournaments",
        "🎙 English Commentary",
        "🚫 No Ads or Pop-ups",
        "🔒 256-bit Encrypted Security",
        "🕒 24/7 Dedicated Support",
        "📦 Discreet Billing",
        "✅ 100% Safe & Secure",
        "💻📱 Watch on Laptop, Phone, or Tablet",
      ],
      discount: 50,
      currency: "USD",
      watchTime: 100,
      position: 4,
      ads: "no-ads",
      fixtureAccess: "full",
      deviceLimit: 2,
      support: "priority",
      featured: false,
      subscriptionType: "universal",
    },
    {
      _id: "68999bf7be20716e19b0618f",
      title: "English Premier League",
      packageDetails: "Watch Full Premier League Season",
      durationType: "yearly",
      duration: 1,
      price: 40,
      salePrice: 40,
      providers: [
        {
          name: "stripe",
          displayName: "Card",
          icon: "",
          description:
            "Your account will be automatically updated within a minute or so once you pay.",
          images: ["visa.svg", "mastercard.svg", "maestro.png", "elco.svg"],
          status: "on",
        },
        {
          name: "crypto",
          displayName: "Crypto",
          icon: "",
          description:
            "We accept payment via crypto. This methods includes ETH, BTC, USDT, USDC & BNB.",
          images: ["btc.svg", "bnb.svg", "ethereum.svg", "usdt.svg"],
          status: "on",
        },
      ],
      status: "active",
      descriptions: [
        "📺 Full Premier League season coverage",
        "🎙️English commentary",
        "🚫 No ads/popups",
      ],
      discount: 0,
      currency: "USD",
      watchTime: 100,
      position: 1,
      ads: "no-ads",
      fixtureAccess: "full",
      deviceLimit: 2,
      support: "priority",
      featured: true,
      subscriptionType: "league",
      league: {
        _id: "672ccd58b5e27e0ac583490c",
        uId: 39,
        name: "Premier League",
        image: "https://media.api-sports.io/football/leagues/39.png",
        position: 4,
      },
      leagueId: 39,
      session: "2025-2026",
    },
    {
      _id: "689998e541064b1517d22321",
      title: "UEFA Champions League",
      packageDetails: "Watch Full Champions League Season",
      durationType: "yearly",
      duration: 1,
      price: 40,
      salePrice: 40,
      providers: [
        {
          name: "stripe",
          displayName: "Card",
          icon: "",
          description:
            "Your account will be automatically updated within a minute or so once you pay.",
          images: ["visa.svg", "mastercard.svg", "maestro.png", "elco.svg"],
          status: "on",
        },
        {
          name: "crypto",
          displayName: "Crypto",
          icon: "",
          description:
            "We accept payment via crypto. This methods includes ETH, BTC, USDT, USDC & BNB.",
          images: ["btc.svg", "bnb.svg", "ethereum.svg", "usdt.svg"],
          status: "on",
        },
      ],
      status: "active",
      descriptions: [
        "📺 Full Champions League season coverage",
        "🎙️English commentary",
        "🚫 No ads/popups",
      ],
      discount: 0,
      currency: "USD",
      watchTime: 100,
      position: 2,
      ads: "no-ads",
      fixtureAccess: "full",
      deviceLimit: 2,
      support: "priority",
      featured: false,
      subscriptionType: "league",
      league: {
        _id: "672ccd48a8dc7da3f3028638",
        uId: 2,
        name: "UEFA Champions League",
        image: "https://media.api-sports.io/football/leagues/2.png",
        position: 1,
      },
      leagueId: 2,
      session: "2025-2026",
    },
    {
      _id: "6899b034eaed9c8ae97086f1",
      title: "Europa League",
      packageDetails: "Watch Full Europa League Season",
      durationType: "yearly",
      duration: 1,
      price: 20,
      salePrice: 20,
      providers: [
        {
          name: "stripe",
          displayName: "Card",
          icon: "",
          description:
            "Your account will be automatically updated within a minute or so once you pay.",
          images: ["visa.svg", "mastercard.svg", "maestro.png", "elco.svg"],
          status: "on",
        },
        {
          name: "crypto",
          displayName: "Crypto",
          icon: "",
          description:
            "We accept payment via crypto. This methods includes ETH, BTC, USDT, USDC & BNB.",
          images: ["btc.svg", "bnb.svg", "ethereum.svg", "usdt.svg"],
          status: "on",
        },
      ],
      status: "active",
      descriptions: [
        "📺 Full Europa League season coverage",
        "🎙️English commentary",
        "🚫No ads/popups",
      ],
      discount: 0,
      currency: "USD",
      watchTime: 100,
      position: 3,
      ads: "no-ads",
      fixtureAccess: "full",
      deviceLimit: 2,
      support: "priority",
      featured: false,
      subscriptionType: "league",
      league: {
        _id: "672ccd9b65187e717e2a0910",
        uId: 3,
        name: "UEFA Europa League",
        image: "https://media.api-sports.io/football/leagues/3.png",
        position: 2,
      },
      leagueId: 3,
      session: "2025-2026",
    },
    {
      _id: "68999d7f2914ed682648d872",
      title: "La Liga",
      packageDetails: "Watch Full La Liga Season",
      durationType: "yearly",
      duration: 1,
      price: 30,
      salePrice: 30,
      providers: [
        {
          name: "stripe",
          displayName: "Card",
          icon: "",
          description:
            "Your account will be automatically updated within a minute or so once you pay.",
          images: ["visa.svg", "mastercard.svg", "maestro.png", "elco.svg"],
          status: "on",
        },
        {
          name: "crypto",
          displayName: "Crypto",
          icon: "",
          description:
            "We accept payment via crypto. This methods includes ETH, BTC, USDT, USDC & BNB.",
          images: ["btc.svg", "bnb.svg", "ethereum.svg", "usdt.svg"],
          status: "on",
        },
      ],
      status: "active",
      descriptions: [
        "📺 Full La Liga season coverage",
        "🎙️English commentary",
        "🚫No ads/popups",
      ],
      discount: 0,
      currency: "USD",
      watchTime: 100,
      position: 4,
      ads: "no-ads",
      fixtureAccess: "full",
      deviceLimit: 2,
      support: "priority",
      featured: false,
      subscriptionType: "league",
      league: {
        _id: "672ccd5185b2f79abcf2896c",
        uId: 140,
        name: "La Liga",
        image: "https://media.api-sports.io/football/leagues/140.png",
        position: 5,
      },
      leagueId: 140,
      session: "2025-2026",
    },
  ];

  const universalPlans = subscriptions
    .filter((s) => s.subscriptionType === "universal")
    .sort((a, b) => a.position - b.position);

  const leaguePlans = subscriptions
    .filter((s) => s.subscriptionType === "league")
    .sort((a, b) => a.position - b.position);

  const displayedPlans =
    selectedTab === "universal" ? universalPlans : leaguePlans;

  useState(() => {
    const mostPopular =
      displayedPlans.find((plan) => plan.featured) || displayedPlans[0];
    if (mostPopular && !selectedPlan) {
      setSelectedPlan(mostPopular);
    }
  });

  const handleTabChange = (tab: "universal" | "league") => {
    setSelectedTab(tab);
    const plans = tab === "universal" ? universalPlans : leaguePlans;
    const mostPopular = plans.find((plan) => plan.featured) || plans[0];
    setSelectedPlan(mostPopular);
  };

  const handlePlanSelect = (plan: Subscription) => {
    setSelectedPlan(plan);
  };

  const handlePaymentMethodChange = (method: "stripe" | "crypto") => {
    setSelectedPaymentMethod(method);
  };

  const activeProvider = selectedPlan?.providers.find(
    (p) => p.name === selectedPaymentMethod && p.status === "on"
  );

  const PaymentIcon = ({ type }: { type: string }) => {
    const iconType = type.toLowerCase().replace(".svg", "").replace(".png", "");

    switch (iconType) {
      case "visa":
        return (
          <svg className="w-full h-full" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="white" />
            <path
              d="M20.5 11h-3.2l-2 12h3.2l2-12zm9.8 7.8l1.7-4.7 1 4.7h-2.7zm3.6 4.2h2.9l-2.5-12h-2.7c-.6 0-1.1.4-1.3.9l-4.6 11.1h3.4l.7-1.9h4.2l.4 1.9zm-7.2-3.9c0-3.1-4.3-3.3-4.3-4.7 0-.4.4-.9 1.3-.9.7 0 1.9.2 2.7.5l.5-2.3c-.9-.3-2-.6-3.4-.6-3.6 0-6.1 1.9-6.1 4.7 0 2 1.8 3.2 3.2 3.8 1.4.7 1.9 1.1 1.9 1.7 0 .9-1.1 1.3-2.1 1.3-1.8 0-2.7-.3-4.2-.9l-.6 2.7c1 .4 2.7.8 4.5.8 3.8.1 6.3-1.8 6.3-4.6l.3-.5z"
              fill="#1434CB"
            />
          </svg>
        );
      case "mastercard":
        return (
          <svg className="w-full h-full" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="white" />
            <circle cx="18" cy="16" r="7" fill="#EB001B" />
            <circle cx="30" cy="16" r="7" fill="#F79E1B" />
            <path
              d="M24 10.5a6.98 6.98 0 000 11 6.98 6.98 0 000-11z"
              fill="#FF5F00"
            />
          </svg>
        );
      case "btc":
      case "bitcoin":
        return (
          <svg className="w-full h-full" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#F7931A" />
            <path
              d="M31.5 17.3c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.6-.4-.7 2.6c-.4-.1-.9-.2-1.3-.3l.7-2.6-1.6-.4-.7 2.7c-.3-.1-.7-.2-1-.2v-.1l-2.2-.5-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c.1 0 .1.1.2.1h-.2l-1.1 4.4c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.9 2.1.5c.4.1.8.2 1.1.3l-.7 2.8 1.6.4.7-2.7c.4.1.9.2 1.3.3l-.7 2.7 1.6.4.7-2.8c3 .6 5.2.3 6.2-2.4.8-2.2-.1-3.4-1.6-4.2 1.1-.3 2-1.1 2.2-2.8zm-3.9 5.5c-.5 2.1-4.1.9-5.2.7l.9-3.7c1.2.3 4.9.9 4.3 3zm.5-5.6c-.5 1.9-3.5.9-4.5.7l.8-3.4c1 .2 4.1.7 3.7 2.7z"
              fill="white"
            />
          </svg>
        );
      case "bnb":
      case "binance":
        return (
          <svg className="w-full h-full" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#F3BA2F" />
            <path
              d="M19 12.5l5-5 5 5 2.9-2.9L24 1.7l-7.9 7.9L19 12.5zm-7.4 3.5l2.9-2.9 2.9 2.9-2.9 2.9-2.9-2.9zM19 19.5l5 5 5-5 2.9 2.9L24 30.3l-7.9-7.9L19 19.5zm13.5-3.5l2.9-2.9 2.9 2.9-2.9 2.9-2.9-2.9zM24 19l-3-3 3-3 3 3-3 3z"
              fill="white"
            />
          </svg>
        );
      case "ethereum":
      case "eth":
        return (
          <svg className="w-full h-full" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#627EEA" />
            <path
              d="M24 6l-.2.7v13.8l.2.2 6.3-3.7L24 6z"
              fill="white"
              fillOpacity=".6"
            />
            <path d="M24 6l-6.3 11L24 20.7V6z" fill="white" />
            <path
              d="M24 22.4l-.1.2v4.8l.1.3 6.3-8.9-6.3 3.6z"
              fill="white"
              fillOpacity=".6"
            />
            <path d="M24 27.7v-5.3l-6.3-3.6L24 27.7z" fill="white" />
            <path
              d="M24 20.7l6.3-3.7-6.3-2.9v6.6z"
              fill="white"
              fillOpacity=".2"
            />
            <path
              d="M17.7 17l6.3 3.7v-6.6L17.7 17z"
              fill="white"
              fillOpacity=".6"
            />
          </svg>
        );
      case "usdt":
      case "tether":
        return (
          <svg className="w-full h-full" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#26A17B" />
            <path
              d="M26.5 13.5v-2h5v-3h-15v3h5v2c-5.2.3-9 1.4-9 2.7 0 1.5 5.1 2.8 11.5 2.8s11.5-1.3 11.5-2.8c0-1.3-3.8-2.4-9-2.7zm0 4.2v3.6c-.5 0-1 .1-1.5.1-5.7 0-10.3-1-10.3-2.1v-3.5c2.3 1.1 6 1.7 10.3 1.7 1.7 0 3.3-.1 4.8-.4v3.6c-1 .1-2.1.2-3.3.2v-3.2z"
              fill="white"
            />
          </svg>
        );
      case "maestro":
        return (
          <svg className="w-full h-full" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="white" />
            <circle cx="18" cy="16" r="7" fill="#0099DF" />
            <circle cx="30" cy="16" r="7" fill="#ED1C24" />
            <path
              d="M24 10.5a6.98 6.98 0 000 11 6.98 6.98 0 000-11z"
              fill="#6C6BBD"
            />
          </svg>
        );
      case "elco":
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 rounded flex items-center justify-center text-[9px] font-bold text-gray-600">
            {iconType.toUpperCase().substring(0, 4)}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge className="bg-[#00303D]/10 text-[#00303D] border-[#00303D]/20 px-3 py-1">
              Premium Streaming
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
              Choose Your Perfect Plan
            </h1>
            <p className="text-base md:text-lg text-gray-600 text-balance max-w-2xl mx-auto">
              Stream your favorite leagues and matches with premium quality, no
              ads, and 24/7 support
            </p>
          </div>

          {/* Plan Type Tabs */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex bg-gray-100 rounded-xl p-1 border border-gray-200">
              <button
                onClick={() => handleTabChange("universal")}
                className={cn(
                  "px-5 py-2.5 rounded-lg font-medium transition-all text-sm md:text-base",
                  selectedTab === "universal"
                    ? "bg-[#00303D] text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                All Access Plans
              </button>
              <button
                onClick={() => handleTabChange("league")}
                className={cn(
                  "px-5 py-2.5 rounded-lg font-medium transition-all text-sm md:text-base",
                  selectedTab === "league"
                    ? "bg-[#00303D] text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                League Specific
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-16 -mt-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {displayedPlans.map((plan) => (
              <div
                key={plan._id}
                className={cn(
                  "bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#00303D]/50 transition-all duration-300 flex flex-col cursor-pointer shadow-sm hover:shadow-md",
                  plan.featured &&
                    "ring-2 ring-[#00303D] shadow-xl shadow-[#00303D]/10 relative",
                  selectedPlan?._id === plan._id &&
                    "ring-2 ring-[#00303D] shadow-lg"
                )}
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#00303D] text-white px-4 py-1.5 shadow-lg">
                      <Zap className="w-3 h-3 mr-1 inline" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* League Logo for league plans */}
                {plan.league && (
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={plan.league.image || "/placeholder.svg"}
                      alt={plan.league.name}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {plan.title}
                      </h3>
                      <p className="text-xs text-gray-500">{plan.session}</p>
                    </div>
                  </div>
                )}

                {!plan.league && (
                  <h3 className="font-bold text-gray-900 text-2xl mb-2">
                    {plan.title}
                  </h3>
                )}

                <p className="text-sm text-gray-600 mb-6">
                  {plan.packageDetails}
                </p>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    {plan.discount > 0 && (
                      <span className="text-2xl text-gray-400 line-through">
                        ${plan.price}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.salePrice}
                    </span>
                    <span className="text-gray-500 text-sm">
                      /
                      {plan.durationType === "yearly"
                        ? "year"
                        : `${plan.duration}mo`}
                    </span>
                  </div>
                  {plan.discount > 0 && (
                    <Badge
                      variant="outline"
                      className="bg-[#00303D]/10 text-[#00303D] border-[#00303D]/20"
                    >
                      Save {plan.discount}%
                    </Badge>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6 flex-grow">
                  {plan.descriptions.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#00303D] shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={cn(
                    "w-full",
                    selectedPlan?._id === plan._id
                      ? "bg-[#00303D] hover:bg-[#00303D]/90 text-white"
                      : plan.featured
                      ? "bg-[#00303D] hover:bg-[#00303D]/90 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  )}
                >
                  {selectedPlan?._id === plan._id ? "Selected" : "Select Plan"}
                </Button>

                {/* Device Limit */}
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  <span>Up to {plan.deviceLimit} devices</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPlan && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-2">
                Complete Your Purchase
              </h2>
              <p className="text-center text-gray-600 mb-8 text-sm">
                Choose your preferred payment method and complete the checkout
              </p>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                {/* Selected Plan Summary */}
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Selected Plan
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {selectedPlan.league && (
                        <img
                          src={selectedPlan.league.image || "/placeholder.svg"}
                          alt={selectedPlan.league.name}
                          className="w-12 h-12 object-contain"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {selectedPlan.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {selectedPlan.packageDetails}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${selectedPlan.salePrice}
                      </div>
                      {selectedPlan.discount > 0 && (
                        <div className="text-sm text-gray-400 line-through">
                          ${selectedPlan.price}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">
                    Payment Method
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedPlan.providers.map((provider) => (
                      <button
                        key={provider.name}
                        onClick={() =>
                          handlePaymentMethodChange(
                            provider.name as "stripe" | "crypto"
                          )
                        }
                        className={cn(
                          "border rounded-xl p-3 text-left transition-all",
                          selectedPaymentMethod === provider.name
                            ? "border-[#00303D] bg-[#00303D]/5 ring-2 ring-[#00303D]"
                            : "border-gray-200 hover:border-[#00303D]/50 bg-white"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={cn(
                              "w-9 h-9 rounded-lg flex items-center justify-center",
                              selectedPaymentMethod === provider.name
                                ? "bg-[#00303D]/10"
                                : "bg-gray-100"
                            )}
                          >
                            {provider.name === "stripe" ? (
                              <CreditCard
                                className={cn(
                                  "w-4 h-4",
                                  selectedPaymentMethod === provider.name
                                    ? "text-[#00303D]"
                                    : "text-gray-600"
                                )}
                              />
                            ) : (
                              <Bitcoin
                                className={cn(
                                  "w-4 h-4",
                                  selectedPaymentMethod === provider.name
                                    ? "text-[#00303D]"
                                    : "text-gray-600"
                                )}
                              />
                            )}
                          </div>
                          <div>
                            <h4
                              className={cn(
                                "font-semibold text-sm",
                                selectedPaymentMethod === provider.name
                                  ? "text-[#00303D]"
                                  : "text-gray-900"
                              )}
                            >
                              {provider.displayName}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {provider.name === "stripe"
                                ? "Instant activation"
                                : "Fast & anonymous"}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed mb-2">
                          {provider.description}
                        </p>
                        <div className="flex gap-1.5 flex-wrap">
                          {provider.images.map((img, idx) => (
                            <div
                              key={idx}
                              className="w-10 h-7 rounded border border-gray-200 overflow-hidden bg-white shadow-sm"
                            >
                              <PaymentIcon type={img} />
                            </div>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Info for Card */}
                {selectedPaymentMethod === "stripe" && activeProvider && (
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Plan</span>
                        <span className="text-gray-900 font-medium">
                          {selectedPlan.title}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration</span>
                        <span className="text-gray-900 font-medium">
                          {selectedPlan.durationType === "yearly"
                            ? "1 Year"
                            : `${selectedPlan.duration} Month${
                                selectedPlan.duration > 1 ? "s" : ""
                              }`}
                        </span>
                      </div>
                      {selectedPlan.discount > 0 && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Original Price
                            </span>
                            <span className="text-gray-400 line-through">
                              ${selectedPlan.price}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[#00303D]">
                              Discount ({selectedPlan.discount}%)
                            </span>
                            <span className="text-[#00303D] font-medium">
                              -${selectedPlan.price - selectedPlan.salePrice}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="h-px bg-gray-200 my-3"></div>
                      <div className="flex justify-between">
                        <span className="text-gray-900 font-semibold">
                          Total
                        </span>
                        <span className="text-gray-900 font-bold text-xl">
                          ${selectedPlan.salePrice}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Purchase Button */}
                <Button
                  size="lg"
                  className="w-full bg-[#00303D] hover:bg-[#00303D]/90 text-white text-base h-12"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay Now - ${selectedPlan.salePrice}
                </Button>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>256-bit encrypted secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Indicators */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#00303D]/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-[#00303D]" />
              </div>
              <h3 className="font-semibold text-gray-900">Secure & Safe</h3>
              <p className="text-sm text-gray-600">
                256-bit encrypted transactions for your protection
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#00303D]/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-[#00303D]" />
              </div>
              <h3 className="font-semibold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Dedicated support team always ready to help you
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#00303D]/10 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-[#00303D]" />
              </div>
              <h3 className="font-semibold text-gray-900">Instant Access</h3>
              <p className="text-sm text-gray-600">
                Start streaming immediately after payment
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
