import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Bell, 
  MessageSquare, 
  ChevronDown 
} from 'lucide-react';

interface TopNavBarProps {
  currentView: 'home' | 'search' | 'dashboard';
  setView: (view: 'home' | 'search' | 'dashboard') => void;
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  onOpenNotifications: () => void;
  onOpenChat: () => void;
  onOpenAddListing: () => void;
  searchQuery: string;
  profileImage: string;
}

export default function TopNavBar({
  currentView,
  setView,
  onSearch,
  onCategorySelect,
  onOpenNotifications,
  onOpenChat,
  onOpenAddListing,
  searchQuery,
  profileImage
}: TopNavBarProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
    setView('search');
  };

  const handleCategoryClick = (cat: string) => {
    onCategorySelect(cat);
    setView('search');
  };

  return (
    <header className="glass-nav sticky top-0 z-50 w-full border-b border-outline-variant">
      <nav className="flex items-center justify-between px-6 py-3 w-full max-w-7xl mx-auto">
        {/* Left Section: Logo & Main Navigation */}
        <div className="flex items-center gap-12">
          <div 
            onClick={() => setView('home')} 
            className="flex flex-col cursor-pointer select-none group"
          >
            <span className="text-2xl font-black text-primary tracking-tight group-hover:brightness-110 transition-all">
              Vendo
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-on-surface-variant/70 font-semibold -mt-1">
              One place for everything
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {['Electronics', 'Property', 'Vehicles', 'Jobs'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-2 relative"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Section: Quick Search (Only visible on Search screen or globally for quick access) */}
        {currentView !== 'home' && (
          <form 
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-md mx-8 hidden lg:block"
          >
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search for anything..."
                className="w-full bg-surface-container/60 border border-outline-variant/50 text-on-surface rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder-on-surface-variant/40 text-sm"
              />
            </div>
          </form>
        )}

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <button 
              onClick={() => {
                onCategorySelect('All');
                setView('search');
              }}
              title="Location"
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-all duration-200 active:scale-95"
            >
              <MapPin className="w-5 h-5" />
            </button>
            
            <button 
              onClick={onOpenNotifications}
              title="Notifications"
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-all duration-200 relative active:scale-95"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-surface shadow-[0_0_8px_#0070f3]"></span>
            </button>
            
            <button 
              onClick={onOpenChat}
              title="Messages"
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-all duration-200 active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>

          <button 
            onClick={onOpenAddListing}
            className="bg-primary text-background font-bold text-sm px-5 py-2 rounded-xl shadow-[0_0_15px_rgba(0,180,255,0.35)] hover:shadow-[0_0_22px_rgba(0,180,255,0.6)] hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            Sell
          </button>

          <div 
            onClick={() => setView('dashboard')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/60 cursor-pointer transition-all active:scale-95 shrink-0"
            title="User Dashboard"
          >
            <img 
              alt="Profile" 
              className="w-full h-full object-cover"
              src={profileImage}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
