import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Matches", href: "/matches" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  const featuredLeagues = [
    { name: "Premier League", href: "/matches?league=premier-league" },
    { name: "La Liga", href: "/matches?league=la-liga" },
    { name: "Bundesliga", href: "/matches?league=bundesliga" },
    { name: "Serie A", href: "/matches?league=serie-a" },
    { name: "Ligue 1", href: "/matches?league=ligue-1" },
    { name: "UEFA Champions League", href: "/matches?league=ucl" },
  ];

  const popularMatches = [
    { name: "Manchester United vs Liverpool", href: "/matches?id=1" },
    { name: "Barcelona vs Real Madrid", href: "/matches?id=2" },
    { name: "Bayern Munich vs Borussia Dortmund", href: "/matches?id=3" },
    { name: "PSG vs Marseille", href: "/matches?id=4" },
    { name: "Chelsea vs Arsenal", href: "/matches?id=5" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-[#0a0e12] border-t border-[#1a2a38]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="sega-logo.png" alt="" className="h-10" />
            </Link>
            <p className="text-[#7a8a96] text-sm leading-relaxed mb-6">
              Your ultimate destination for live sports streaming. Watch all
              your favorite matches in HD quality.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:support@segaredesign.com"
                className="flex items-center gap-2 text-sm text-[#7a8a96] hover:text-[#00d4ff] transition-colors"
              >
                <Mail size={16} />
                <span>support@segaredesign.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[#f5f7fa] font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#7a8a96] hover:text-[#00d4ff] text-sm transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Leagues */}
          <div className="lg:col-span-2">
            <h3 className="text-[#f5f7fa] font-semibold mb-4">
              Featured Leagues
            </h3>
            <ul className="space-y-3">
              {featuredLeagues.map((league) => (
                <li key={league.name}>
                  <Link
                    href={league.href}
                    className="text-[#7a8a96] hover:text-[#00d4ff] text-sm transition-colors inline-block"
                  >
                    {league.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Matches */}
          <div className="lg:col-span-3">
            <h3 className="text-[#f5f7fa] font-semibold mb-4">
              Popular Matches
            </h3>
            <ul className="space-y-3">
              {popularMatches.map((match) => (
                <li key={match.name}>
                  <Link
                    href={match.href}
                    className="text-[#7a8a96] hover:text-[#00d4ff] text-sm transition-colors inline-block line-clamp-1"
                  >
                    {match.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[#f5f7fa] font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#7a8a96] hover:text-[#00d4ff] text-sm transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1a2a38]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <p className="text-[#7a8a96] text-sm">
              © {currentYear} SegareDesign. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-[#1a2332] hover:bg-[#00303d] border border-[#2a3a48] hover:border-[#00d4ff] rounded-lg flex items-center justify-center text-[#7a8a96] hover:text-[#00d4ff] transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
