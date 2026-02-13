'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Star, Plus, Play, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface NavLink {
  href: string;
  label: string;
}

interface WatchlistItem {
  id: number;
  title: string;
  year: number;
  poster: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'AI Chat' },
  { href: '/trending', label: 'Trending' },
  { href: '/browse', label: 'Browse' },
];

// Sample watchlist items (in a real app, this would come from a database or localStorage)
const sampleWatchlist: WatchlistItem[] = [
  { id: 1, title: 'Inception', year: 2010, poster: '🎬' },
  { id: 2, title: 'The Dark Knight', year: 2008, poster: '🎬' },
  { id: 3, title: 'Interstellar', year: 2014, poster: '🎬' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(sampleWatchlist);

  const watchlistRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close watchlist when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (watchlistRef.current && !watchlistRef.current.contains(event.target as Node)) {
        setIsWatchlistOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const removeFromWatchlist = (id: number) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-950/98 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-gray-900/90 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* Left side - Logo and Nav Links */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Netflix-style Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-bold text-red-600 group-hover:text-red-500 transition-colors">
              N
            </span>
            <span className="hidden sm:block text-lg font-semibold text-white tracking-wide">
              CineMatch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white scale-105'
                    : 'text-gray-300 hover:text-white hover:scale-105'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Watchlist */}
          <div ref={watchlistRef} className="relative">
            <button
              onClick={() => setIsWatchlistOpen(!isWatchlistOpen)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all"
            >
              <Star className="w-4 h-4" />
              <span>Watchlist</span>
              {watchlist.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-red-800 rounded text-xs">
                  {watchlist.length}
                </span>
              )}
            </button>

            {/* Watchlist Dropdown */}
            {isWatchlistOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                  <h3 className="text-white font-semibold">My Watchlist</h3>
                  <span className="text-gray-400 text-sm">{watchlist.length} movies</span>
                </div>
                {watchlist.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <Star className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-400">Your watchlist is empty</p>
                    <p className="text-gray-500 text-sm">Add movies to watch later</p>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto">
                    {watchlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 hover:bg-gray-800 transition-colors"
                      >
                        <div className="w-10 h-14 bg-gray-700 rounded flex items-center justify-center text-2xl">
                          {item.poster}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{item.title}</p>
                          <p className="text-gray-400 text-sm">{item.year}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 text-green-500 hover:bg-green-500/10 rounded transition-colors">
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromWatchlist(item.id)}
                            className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="px-4 py-3 border-t border-gray-700">
                  <Link
                    href="/watchlist"
                    onClick={() => setIsWatchlistOpen(false)}
                    className="text-red-500 hover:text-red-400 text-sm transition-colors"
                  >
                    View all watchlist
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-950/98 backdrop-blur-md border-t border-gray-800 shadow-xl">
          <div className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-800 my-2" />
            {/* Mobile Watchlist Button */}
            <div className="px-4 py-3">
              <button
                onClick={() => setIsWatchlistOpen(!isWatchlistOpen)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all"
              >
                <Star className="w-4 h-4" />
                <span>Watchlist ({watchlist.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
