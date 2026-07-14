import React, { useState } from 'react';
import { 
  Search, 
  Laptop, 
  Home, 
  Car, 
  Briefcase, 
  ArrowRight, 
  Heart, 
  Clock, 
  MapPin, 
  Gauge, 
  Anchor, 
  History, 
  ShieldCheck, 
  Sparkles,
  Rocket
} from 'lucide-react';
import { Listing } from '../types';
import { motion } from 'motion/react';

interface HomeViewProps {
  listings: Listing[];
  onToggleFavorite: (id: string) => void;
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  onSelectListing: (listing: Listing) => void;
  setView: (view: 'home' | 'search' | 'dashboard') => void;
  onOpenAddListing: () => void;
}

export default function HomeView({
  listings,
  onToggleFavorite,
  onSearch,
  onCategorySelect,
  onSelectListing,
  setView,
  onOpenAddListing
}: HomeViewProps) {
  const [searchVal, setSearchVal] = useState('');

  // Get first 8 listings that are flagged as recommended or belong to other/general listings
  const recommendedListings = listings.filter(l => l.owner !== 'user').slice(0, 8);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
    setView('search');
  };

  const handleChipClick = (category: string) => {
    onCategorySelect(category);
    setView('search');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Helper to map category/condition to a descriptive icon at the card footer
  const getFooterIcon = (listing: Listing) => {
    if (listing.location.toLowerCase().includes('nyc')) {
      return <MapPin className="w-3.5 h-3.5 text-primary" />;
    }
    if (listing.location.toLowerCase().includes('miami')) {
      return <Anchor className="w-3.5 h-3.5 text-primary" />;
    }
    if (listing.location.toLowerCase().includes('mi') || listing.location.toLowerCase().includes('km')) {
      return <Gauge className="w-3.5 h-3.5 text-primary" />;
    }
    if (listing.condition.toLowerCase() === 'vintage') {
      return <History className="w-3.5 h-3.5 text-primary" />;
    }
    if (listing.location.toLowerCase().includes('certified')) {
      return <ShieldCheck className="w-3.5 h-3.5 text-primary" />;
    }
    return <Clock className="w-3.5 h-3.5 text-primary" />;
  };

  const categoryChips = [
    { name: 'Electronics', icon: Laptop },
    { name: 'Property', icon: Home },
    { name: 'Vehicles', icon: Car },
    { name: 'Jobs', icon: Briefcase }
  ];

  return (
    <div className="w-full pb-16">
      {/* Hero Section */}
      <section className="py-20 flex flex-col items-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 max-w-4xl leading-tight tracking-tight"
        >
          Find exactly what you need, <span className="text-primary bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">effortlessly.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base md:text-lg text-on-surface-variant max-w-2xl mb-10 opacity-90 leading-relaxed font-normal"
        >
          The world’s most sophisticated marketplace for high-end electronics, luxury properties, and premium vehicles.
        </motion.p>

        {/* Hero Search Bar */}
        <motion.form 
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-full max-w-2xl glass-card rounded-2xl p-2 flex items-center shadow-2xl mb-12 border-white/10 hover:border-primary/20 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15 transition-all duration-300"
        >
          <div className="flex-1 flex items-center px-3">
            <Search className="text-primary mr-3 w-5 h-5 shrink-0" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search for electronics, property, cars..."
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-on-surface py-3 placeholder:text-on-surface-variant/40 text-base"
            />
          </div>
          <button 
            type="submit"
            className="bg-primary hover:brightness-110 active:scale-95 text-background font-bold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-primary/10"
          >
            Search
          </button>
        </motion.form>

        {/* Categories Chips */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-3.5"
        >
          {categoryChips.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => handleChipClick(name)}
              className="flex items-center gap-2 px-5 py-3 rounded-full glass-card hover:bg-primary/10 hover:border-primary/30 text-on-surface hover:text-primary transition-all duration-300 group active:scale-95 text-sm font-semibold select-none border border-white/5"
            >
              <Icon className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
              <span>{name}</span>
            </button>
          ))}
        </motion.div>
      </section>

      {/* Fresh Recommendations Section */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-on-surface mb-2 tracking-tight">
              Fresh Recommendations
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant/80">
              Based on your recent interests and trending items.
            </p>
          </div>
          <button 
            onClick={() => {
              onCategorySelect('All');
              setView('search');
            }}
            className="text-sm font-semibold text-primary flex items-center gap-1.5 hover:underline group"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => onSelectListing(listing)}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer border border-white/5 hover:border-primary/25 hover:shadow-[0_12px_40px_rgba(0,180,255,0.08)] transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden bg-slate-900/40">
                <img
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={listing.image}
                  loading="lazy"
                />
                
                {/* Favorite Action Button */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(listing.id);
                    }}
                    className={`w-9 h-9 rounded-full ${
                      listing.isFavorite 
                        ? 'bg-primary text-background' 
                        : 'bg-surface/80 text-on-surface hover:text-primary hover:bg-surface'
                    } backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-md active:scale-90`}
                  >
                    <Heart className={`w-4 h-4 ${listing.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Optional Status Label (e.g. New) */}
                {listing.id === 'rec-1' && (
                  <div className="absolute bottom-3 left-3 bg-primary text-background text-[10px] uppercase font-black px-3 py-1 rounded-full shadow-lg">
                    New
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-on-surface mb-1.5 truncate group-hover:text-primary transition-colors">
                  {listing.title}
                </h3>
                <p className="text-xs text-on-surface-variant/80 mb-4 line-clamp-2 leading-relaxed">
                  {listing.description || 'Pristine condition premium quality item.'}
                </p>
                
                {/* Price and Metadata Footer */}
                <div className="mt-auto flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-lg font-black text-primary tracking-tight">
                    {formatPrice(listing.price)}
                  </span>
                  
                  <span className="text-xs text-on-surface-variant/60 flex items-center gap-1">
                    {getFooterIcon(listing)}
                    <span>{listing.location}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* High-Impact CTA Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-container via-primary/80 to-blue-600 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10">
          
          {/* Luminous dynamic background blur */}
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
              Turn your premium items into liquid capital.
            </h2>
            <p className="text-sm md:text-base text-sky-100 mb-8 opacity-90 leading-relaxed">
              Join 50k+ sellers who trust Vendo for its fast, high-end, and secure transaction ecosystem. Complete lists in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={onOpenAddListing}
                className="w-full sm:w-auto bg-white text-primary font-extrabold px-8 py-3.5 rounded-xl hover:brightness-95 active:scale-95 transition-all duration-200 shadow-xl"
              >
                List Your First Item
              </button>
              <button 
                onClick={() => alert("How it works:\n\n1. Take beautiful photos of your high-end items.\n2. Tap 'Sell' to list them on Vendo's premium marketplace.\n3. Communicate with verified buyers in our chat panel.\n4. Close the deal securely with full confidence.")}
                className="w-full sm:w-auto border border-white/30 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-200"
              >
                How it works
              </button>
            </div>
          </div>

          {/* Floating graphic element */}
          <div className="relative z-10 w-full max-w-xs md:max-w-sm hidden lg:block">
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="glass-card p-6 rounded-2xl border border-white/20 shadow-2xl rotate-2 translate-x-4 bg-slate-950/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                  <Rocket className="text-primary w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Selling Speed</p>
                  <p className="text-xs text-on-surface-variant">3x faster than average</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%] rounded-full shadow-[0_0_12px_rgba(0,180,255,0.7)]"></div>
                </div>
                <div className="flex justify-between text-[11px] font-semibold text-on-surface-variant/80">
                  <span>High Interest</span>
                  <span className="text-primary">85% Match</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
