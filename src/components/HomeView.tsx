import React, { useState } from 'react';
import { Search, Sparkles, TrendingUp, Cpu, Home, Car, Briefcase, ChevronRight } from 'lucide-react';
import { Item } from '../types';
import ItemCard from './ItemCard';

interface HomeViewProps {
  items: Item[];
  favorites: string[];
  onLikeToggle: (id: string, e: React.MouseEvent) => void;
  onSelectItem: (id: string) => void;
  setCurrentScreen: (screen: 'home' | 'search' | 'detail' | 'dashboard') => void;
  setSelectedCategory: (cat: 'All' | 'Electronics' | 'Property' | 'Vehicles' | 'Jobs') => void;
  setSearchQuery: (query: string) => void;
}

export default function HomeView({
  items,
  favorites,
  onLikeToggle,
  onSelectItem,
  setCurrentScreen,
  setSelectedCategory,
  setSearchQuery
}: HomeViewProps) {
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(heroSearch);
    setCurrentScreen('search');
  };

  const handleCategorySelect = (cat: 'Electronics' | 'Property' | 'Vehicles' | 'Jobs') => {
    setSelectedCategory(cat);
    setCurrentScreen('search');
  };

  const categoryChips = [
    { label: 'Electronics', value: 'Electronics' as const, icon: Cpu, color: 'border-cyan-500/20 text-cyan-400 bg-cyan-950/20' },
    { label: 'Property', value: 'Property' as const, icon: Home, color: 'border-emerald-500/20 text-emerald-400 bg-emerald-950/20' },
    { label: 'Vehicles', value: 'Vehicles' as const, icon: Car, color: 'border-rose-500/20 text-rose-400 bg-rose-950/20' },
    { label: 'Jobs', value: 'Jobs' as const, icon: Briefcase, color: 'border-purple-500/20 text-purple-400 bg-purple-950/20' }
  ];

  // We have 1 featured item (Lumina headphones) and we can feature other beautiful elements (skyline penthouse, model s plaid)
  const featuredItems = items.filter(i => i.isFeatured || i.price > 10000000).slice(0, 3);
  const recommendedItems = items.filter(i => !i.isFeatured);

  return (
    <div className="space-y-16 py-6 pb-20 relative overflow-hidden" id="home-view-container">
      {/* Background Ambience Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-80 right-20 w-80 h-80 bg-tertiary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="text-center space-y-8 px-6 pt-10 pb-4 max-w-4xl mx-auto relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs uppercase font-extrabold px-3 py-1.5 rounded-full animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Glacier-Grade Marketplace</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-on-surface to-primary leading-tight tracking-tight">
            Find everything you need,<br />right here.
          </h1>
          <p className="text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Buy, sell, and discover high-value products in our premium marketplace. 
            Experience beautiful glassmorphic layers and instant response.
          </p>
        </div>

        {/* Large Glass Search Card */}
        <div className="glass-card p-4 sm:p-5 rounded-2xl max-w-2xl mx-auto shadow-2xl relative" id="hero-search-card">
          <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70 w-5 h-5" />
              <input
                type="text"
                placeholder="What are you looking for today?"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="w-full bg-[#111828]/50 border border-white/10 text-on-surface placeholder:text-on-surface-variant/40 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-on-primary font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all text-sm cursor-pointer whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>

        {/* Categories Grid (Chips) */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">
            Browse Core Categories
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categoryChips.map((chip) => {
              const Icon = chip.icon;
              return (
                <button
                  key={chip.label}
                  onClick={() => handleCategorySelect(chip.value)}
                  className={`flex items-center gap-2 border px-4.5 py-2.5 rounded-xl text-sm font-semibold hover:border-primary/40 hover:bg-[#111828]/40 hover:-translate-y-0.5 transition-all cursor-pointer ${chip.color}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Curious Highlight (The headphones or top item) */}
      <section className="px-6 w-full max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-primary rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Featured Specimen <span className="text-xs bg-tertiary/20 text-tertiary px-2 py-0.5 rounded uppercase font-bold tracking-wider">Premium Curated</span>
            </h2>
          </div>
          <button 
            onClick={() => { setSelectedCategory('All'); setCurrentScreen('search'); }}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Showcase Item Row / Special Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Huge Premium Card */}
          <div 
            onClick={() => onSelectItem('lumina-headphones')}
            className="lg:col-span-8 glass-card hover:glass-card-elevated rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center cursor-pointer transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            {/* Left Image */}
            <div className="w-full md:w-1/2 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/5 relative shrink-0">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxL7g76EDx1b83ecenZc1cZ0Qd85bnVa9zX8RiHH81C6m6-7h6BnlkPaNRzX0-rfaW0A9sdRgfjCxo9AecGaADYD2TmX1hpZtDgb7XNrI5-6u02VlAifOVXNv2QTCdo4dCGRMkUb0d6lQ6fHoS2tQMUBf-0SO75pwFnAYh_hpaMkqpC1Cz5NesvMaENzdvcPVKBrCvAav7zxPL_9eJoCdok8uIuPMSs43nTPS4FQMBx3vlTjOYau9f6Q" 
                alt="Lumina Headphones" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-extrabold bg-[#0a0e1a]/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-primary shadow-lg">
                Exclusive Deal
              </span>
            </div>

            {/* Right Information */}
            <div className="flex-1 space-y-4 text-left w-full">
              <div className="space-y-2">
                <span className="text-xs font-bold text-tertiary uppercase tracking-widest">Electronics • Pristine</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors leading-snug">
                  Lumina X-1000 Reference Audio Headphones
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                  Experience acoustic purity through proprietary beryllium driver technology. Open back soundstage for unmatched auditory dimensions. High performance audio hardware crafted with premium materials.
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">₹1,07,000</span>
                <span className="text-xs text-on-surface-variant">Brooklyn, NY</span>
              </div>

              <button className="flex items-center gap-2 text-xs font-bold bg-white/5 border border-white/10 group-hover:border-primary/30 text-on-surface rounded-xl px-5 py-3 transition-all cursor-pointer">
                <span>Inspect Specimen</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Secondary Featured List Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {featuredItems.slice(1, 3).map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className="glass-card hover:glass-card-elevated p-4 rounded-2xl flex gap-4 cursor-pointer transition-all duration-300 group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-white/5 shrink-0 relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{item.category}</span>
                    <h4 className="font-semibold text-on-surface text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-extrabold text-white text-sm">{item.priceFormatted}</span>
                    <span className="text-[10px] text-on-surface-variant">{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Help / Tip glass widget */}
            <div className="glass-card p-4 rounded-2xl text-left flex gap-3 border-dashed border-primary/20 items-center">
              <span className="text-2xl">💡</span>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-white">Interactive Messages</h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Go to the **Dashboard** messages section to chat directly with active buyers or sellers in real-time!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Recommendations Grid */}
      <section className="px-6 w-full max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-tertiary rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Fresh Recommendations <TrendingUp className="w-5 h-5 text-tertiary animate-pulse" />
            </h2>
          </div>
          <button 
            onClick={() => { setSelectedCategory('All'); setCurrentScreen('search'); }}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-tertiary hover:text-white transition-colors cursor-pointer"
          >
            <span>Explore All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Catalog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="recommendations-grid">
          {recommendedItems.map((item) => (
            <ItemCard 
              key={item.id}
              item={item}
              isLiked={favorites.includes(item.id)}
              onLikeToggle={onLikeToggle}
              onClick={() => onSelectItem(item.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
