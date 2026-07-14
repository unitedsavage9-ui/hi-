import React, { useState } from 'react';
import { Search, MapPin, Bell, MessageSquare, Plus, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  currentScreen: 'home' | 'search' | 'detail' | 'dashboard';
  setCurrentScreen: (screen: 'home' | 'search' | 'detail' | 'dashboard') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: 'All' | 'Electronics' | 'Property' | 'Vehicles' | 'Jobs') => void;
  onOpenSellModal: () => void;
  onOpenChat: () => void;
  favoritesCount: number;
}

export default function Header({
  currentScreen,
  setCurrentScreen,
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  onOpenSellModal,
  onOpenChat,
  favoritesCount
}: HeaderProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    setCurrentScreen('search');
  };

  const handleCategoryClick = (cat: 'Electronics' | 'Property' | 'Vehicles' | 'Jobs') => {
    setSelectedCategory(cat);
    setCurrentScreen('search');
  };

  return (
    <header className="glass-nav sticky top-0 z-50 w-full shadow-lg">
      <nav className="flex items-center justify-between px-6 py-3 w-full max-w-7xl mx-auto h-16">
        {/* Brand */}
        <div className="flex items-center gap-10">
          <button 
            onClick={() => {
              setCurrentScreen('home');
              setSearchQuery('');
              setLocalQuery('');
              setSelectedCategory('All');
            }} 
            className="flex flex-col text-left group cursor-pointer"
            id="brand-logo"
          >
            <span className="text-2xl font-extrabold text-primary tracking-tight group-hover:text-sky-300 transition-colors">
              Vendo
            </span>
            <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold -mt-1">
              One place for everything
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {(['Electronics', 'Property', 'Vehicles', 'Jobs'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`text-sm font-semibold transition-colors cursor-pointer py-1 ${
                  currentScreen === 'search' && cat === cat // wait, simple active checks can be customized in App level, let's keep it simple
                    ? 'text-on-surface-variant hover:text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Global Search Bar (Only shown on non-home pages or as header helper) */}
        <div className="flex-1 max-w-md mx-6 hidden lg:block">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search for electronics, property, cars..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full bg-[#111828]/60 border border-white/10 text-on-surface rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder-on-surface-variant/40"
            />
          </form>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            {/* Location indicator */}
            <button 
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all relative group"
              title="Filter Location"
            >
              <MapPin className="w-5 h-5" />
              <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 bg-surface text-xs text-primary font-bold px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                San Francisco, CA
              </span>
            </button>

            {/* Notification Badge */}
            <button 
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all relative group"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-surface shadow-[0_0_8px_#7dd3fc]"></span>
            </button>

            {/* Direct messages action */}
            <button 
              onClick={onOpenChat}
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all relative group"
              title="Message Center"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tertiary rounded-full border border-surface shadow-[0_0_8px_#c8a0f0]"></span>
            </button>
          </div>

          {/* Sell Button */}
          <button 
            onClick={onOpenSellModal}
            className="flex items-center gap-1.5 bg-primary text-on-primary font-bold text-sm px-5 py-2 rounded-full shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            id="sell-nav-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Sell</span>
          </button>

          {/* User Account / Profile -> goes to dashboard */}
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 rounded-full overflow-hidden border border-white/10 ring-2 ring-primary/20 hover:ring-primary/60 transition-all cursor-pointer"
            title="Seller Dashboard"
            id="user-profile-btn"
          >
            <img 
              alt="Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj8fps8xXUAP-gf8NlKJbIAymke-0BFVmtA4hg4YkrjvSKEpVlyivthUBjB-OIwBKmV2Peww9vbPKSVMijhHKCxNvPEYyE-OW4uciBnxOTsALIT2HeqMUk8VnHj7KPSzL4YNOp1Vu5fWDYxAkYSpv_4amoumJGwDvPPOPURhpfzNt5WHw1v5J_IJ4eBmbnYhhprjlnv2jT-YWHFhJk9Z76qSe6gy4ayqGb0VXT6QkLhCJYM_giBm7pTw"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}
