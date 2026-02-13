import Link from "next/link";
import { Brain, Film, Twitter, Github, Instagram, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 border-t border-white/10">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-600/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CineMatch AI</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your AI-powered movie recommendation companion. Discover your next favorite film instantly.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/trending" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/browse" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Browse
                </Link>
              </li>
              <li>
                <Link href="/chat" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  AI Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Popular Genres</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/browse" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Action
                </Link>
              </li>
              <li>
                <Link href="/browse" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Comedy
                </Link>
              </li>
              <li>
                <Link href="/browse" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Drama
                </Link>
              </li>
              <li>
                <Link href="/browse" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Sci-Fi
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Get the latest movie recommendations and updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Film className="w-4 h-4" />
              <span>© {new Date().getFullYear()} CineMatch AI. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
