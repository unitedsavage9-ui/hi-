import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  Trash2,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { Listing, FilterState } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface SearchViewProps {
  listings: Listing[];
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onAddToCart?: (listing: Listing) => void;
}

export default function SearchView({
  listings,
  onToggleFavorite,
  onSelectListing,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onAddToCart
}: SearchViewProps) {
  // Filter States
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [condition, setCondition] = useState<'Any' | 'New' | 'Refurbished' | 'Used'>('Any');
  const [locationVal, setLocationVal] = useState('San Francisco, CA');
  const [sortBy, setSortBy] = useState('Newest First');
  const [currentPage, setCurrentPage] = useState(1);

  // Helper to get maximum price for the current category
  const getMaxPriceForCategory = (cat: string) => {
    const catListings = listings.filter(l => cat === 'All' || l.category.toLowerCase() === cat.toLowerCase());
    if (catListings.length === 0) return 1000000;
    return Math.max(...catListings.map(l => l.price));
  };

  const maxLimit = getMaxPriceForCategory(selectedCategory);
  const valMin = priceMin === '' ? 0 : Math.max(0, Math.min(parseFloat(priceMin), maxLimit));
  const valMax = priceMax === '' ? maxLimit : Math.max(valMin, Math.min(parseFloat(priceMax), maxLimit));

  // Loading state to trigger skeletons upon filter changes
  const [isLoading, setIsLoading] = useState(false);

  // Trigger loading screen on changes to filters or search
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, priceMin, priceMax, condition, sortBy, currentPage]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceMin('');
    setPriceMax('');
    setCondition('Any');
    setLocationVal('San Francisco, CA');
    setSortBy('Newest First');
    setCurrentPage(1);
  };

  // Filter listings based on criteria
  const filteredListings = listings.filter((item) => {
    // 1. Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const titleMatches = item.title.toLowerCase().includes(q);
      const descMatches = item.description?.toLowerCase().includes(q) || false;
      const catMatches = item.category.toLowerCase().includes(q);
      if (!titleMatches && !descMatches && !catMatches) {
        return false;
      }
    }

    // 2. Category
    if (selectedCategory !== 'All') {
      if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    // 3. Price Min
    if (priceMin !== '') {
      if (item.price < parseFloat(priceMin)) {
        return false;
      }
    }

    // 4. Price Max
    if (priceMax !== '') {
      if (item.price > parseFloat(priceMax)) {
        return false;
      }
    }

    // 5. Condition
    if (condition !== 'Any') {
      if (item.condition.toLowerCase() !== condition.toLowerCase()) {
        return false;
      }
    }

    // Only display items not sold yet unless viewing user items
    if (item.owner === 'user' && item.status === 'sold') {
      return false; // hide sold out items from search
    }

    return true;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'Price: Low to High') {
      return a.price - b.price;
    } else if (sortBy === 'Price: High to Low') {
      return b.price - a.price;
    } else if (sortBy === 'Trending') {
      const viewsA = parseFloat(a.views || '0');
      const viewsB = parseFloat(b.views || '0');
      return viewsB - viewsA;
    } else {
      // Newest First (default, mock via id comparison)
      return b.id.localeCompare(a.id);
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const categories = ['All', 'Electronics', 'Property', 'Vehicles', 'Jobs'];

  return (
    <div className="w-full pb-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Filters */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <h3 className="text-lg font-black text-on-surface tracking-tight flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <span>Filters</span>
                </h3>
                <button 
                  onClick={clearAllFilters}
                  className="text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Category Checklist */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-primary mb-3 uppercase tracking-widest">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <label 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="flex items-center gap-3 group cursor-pointer"
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                          isSelected 
                            ? 'bg-primary border-primary text-background' 
                            : 'border-outline-variant bg-surface-container/40 group-hover:border-primary/50'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-sm transition-colors ${
                          isSelected 
                            ? 'text-primary font-bold' 
                            : 'text-on-surface-variant group-hover:text-primary'
                        }`}>
                          {cat === 'All' ? 'All Categories' : cat}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[11px] font-bold text-primary uppercase tracking-widest">
                    Price Range
                  </label>
                  <span className="text-xs font-bold text-on-surface">
                    {formatPrice(valMin)} - {formatPrice(valMax)}
                  </span>
                </div>
                
                {/* Dual Range Slider Track & Inputs */}
                <div className="relative w-full h-6 flex items-center select-none mb-3">
                  {/* Background Track */}
                  <div className="absolute left-0 right-0 h-1.5 bg-surface-container/60 rounded-full" />
                  
                  {/* Active Colored Track */}
                  <div 
                    className="absolute h-1.5 bg-primary rounded-full opacity-80"
                    style={{
                      left: `${(valMin / maxLimit) * 100}%`,
                      width: `${((valMax - valMin) / maxLimit) * 100}%`
                    }}
                  />
                  
                  {/* Min Range Slider */}
                  <input
                    type="range"
                    min="0"
                    max={maxLimit}
                    step={Math.max(1, Math.floor(maxLimit / 100))}
                    value={valMin}
                    onChange={(e) => {
                      const value = Math.min(parseFloat(e.target.value), valMax);
                      setPriceMin(value === 0 ? '' : value.toString());
                    }}
                    className={`absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none ${
                      valMin > maxLimit * 0.5 ? 'z-20' : 'z-10'
                    }
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-4
                               [&::-webkit-slider-thumb]:h-4
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-primary
                               [&::-webkit-slider-thumb]:border-2
                               [&::-webkit-slider-thumb]:border-background
                               [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,180,255,0.6)]
                               [&::-webkit-slider-thumb]:cursor-pointer
                               [&::-webkit-slider-thumb]:pointer-events-auto
                               [&::-webkit-slider-thumb]:transition-all
                               [&::-webkit-slider-thumb]:hover:scale-125
                               [&::-moz-range-thumb]:appearance-none
                               [&::-moz-range-thumb]:w-4
                               [&::-moz-range-thumb]:h-4
                               [&::-moz-range-thumb]:rounded-full
                               [&::-moz-range-thumb]:bg-primary
                               [&::-moz-range-thumb]:border-2
                               [&::-moz-range-thumb]:border-background
                               [&::-moz-range-thumb]:shadow-[0_0_8px_rgba(0,180,255,0.6)]
                               [&::-moz-range-thumb]:cursor-pointer
                               [&::-moz-range-thumb]:pointer-events-auto
                               [&::-moz-range-thumb]:transition-all
                               [&::-moz-range-thumb]:hover:scale-125
                               [&::-moz-range-thumb]:border-none`}
                  />
                  
                  {/* Max Range Slider */}
                  <input
                    type="range"
                    min="0"
                    max={maxLimit}
                    step={Math.max(1, Math.floor(maxLimit / 100))}
                    value={valMax}
                    onChange={(e) => {
                      const value = Math.max(parseFloat(e.target.value), valMin);
                      setPriceMax(value === maxLimit ? '' : value.toString());
                    }}
                    className={`absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none ${
                      valMin > maxLimit * 0.5 ? 'z-10' : 'z-20'
                    }
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-4
                               [&::-webkit-slider-thumb]:h-4
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-primary
                               [&::-webkit-slider-thumb]:border-2
                               [&::-webkit-slider-thumb]:border-background
                               [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,180,255,0.6)]
                               [&::-webkit-slider-thumb]:cursor-pointer
                               [&::-webkit-slider-thumb]:pointer-events-auto
                               [&::-webkit-slider-thumb]:transition-all
                               [&::-webkit-slider-thumb]:hover:scale-125
                               [&::-moz-range-thumb]:appearance-none
                               [&::-moz-range-thumb]:w-4
                               [&::-moz-range-thumb]:h-4
                               [&::-moz-range-thumb]:rounded-full
                               [&::-moz-range-thumb]:bg-primary
                               [&::-moz-range-thumb]:border-2
                               [&::-moz-range-thumb]:border-background
                               [&::-moz-range-thumb]:shadow-[0_0_8px_rgba(0,180,255,0.6)]
                               [&::-moz-range-thumb]:cursor-pointer
                               [&::-moz-range-thumb]:pointer-events-auto
                               [&::-moz-range-thumb]:transition-all
                               [&::-moz-range-thumb]:hover:scale-125
                               [&::-moz-range-thumb]:border-none`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-wider">Min</span>
                    <input
                      type="number"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      placeholder="Min"
                      className="w-full bg-surface-container/60 border border-outline-variant/50 rounded-xl pl-9 pr-2 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-wider">Max</span>
                    <input
                      type="number"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      placeholder="Max"
                      className="w-full bg-surface-container/60 border border-outline-variant/50 rounded-xl pl-9 pr-2 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
              </div>

              {/* Condition pills */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-primary mb-3 uppercase tracking-widest">
                  Condition
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['Any', 'New', 'Refurbished', 'Used'] as const).map((cond) => {
                    const isActive = condition === cond;
                    return (
                      <button
                        key={cond}
                        onClick={() => setCondition(cond)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          isActive 
                            ? 'bg-primary text-background shadow-[0_0_10px_rgba(0,180,255,0.35)] font-bold' 
                            : 'bg-surface-container/60 hover:bg-outline-variant/50 text-on-surface-variant hover:text-on-surface border border-white/5'
                        }`}
                      >
                        {cond}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location Input */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-primary mb-3 uppercase tracking-widest">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                  <input
                    type="text"
                    value={locationVal}
                    onChange={(e) => setLocationVal(e.target.value)}
                    className="w-full bg-surface-container/60 border border-outline-variant/50 rounded-xl pl-9 pr-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <button 
                onClick={clearAllFilters}
                className="w-full py-3 bg-white/5 border border-white/5 text-on-surface hover:bg-primary hover:text-background font-bold rounded-xl transition-all duration-300 active:scale-[0.98] text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Results Area */}
        <div className="flex-1">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-on-surface tracking-tight">
                Search Results
              </h1>
              <p className="text-xs md:text-sm text-on-surface-variant">
                Showing {isLoading ? '...' : sortedListings.length} high-quality items found
              </p>
            </div>
            
            <div className="flex items-center gap-3 self-end sm:self-auto select-none">
              <span className="text-on-surface-variant text-xs font-semibold">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container/80 border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer focus:outline-none"
              >
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Trending</option>
              </select>
            </div>
          </div>

          {/* Results Grid / Skeleton Display */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="skeleton-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="glass-card rounded-2xl overflow-hidden p-1 border border-white/5">
                    <div className="skeleton h-48 w-full rounded-xl mb-4"></div>
                    <div className="p-3 space-y-3">
                      <div className="skeleton h-5 w-3/4 rounded"></div>
                      <div className="skeleton h-3.5 w-1/2 rounded"></div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <div className="skeleton h-6 w-20 rounded"></div>
                        <div className="skeleton h-3.5 w-16 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : sortedListings.length === 0 ? (
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 rounded-2xl text-center border border-white/5 shadow-xl max-w-lg mx-auto mt-12"
              >
                <p className="text-lg font-bold text-on-surface mb-2">No matching items found</p>
                <p className="text-sm text-on-surface-variant mb-6">
                  Adjust your search keyword, change the category or clear your filters to explore Vendo's premium items.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="bg-primary text-background font-bold px-6 py-2.5 rounded-xl hover:brightness-110 active:scale-95 transition-all"
                >
                  Reset All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="listings-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {sortedListings.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectListing(item)}
                    className="glass-card rounded-2xl overflow-hidden p-1.5 group hover:scale-[1.01] hover:border-primary/25 border border-white/5 hover:shadow-[0_12px_40px_rgba(0,180,255,0.08)] transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-900/40">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(item.id);
                        }}
                        className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors shadow ${
                          item.isFavorite 
                            ? 'bg-primary text-background hover:brightness-110' 
                            : 'bg-background/40 text-white hover:bg-primary hover:text-background'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-base text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-on-surface-variant text-xs mb-4">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{item.location}</span>
                      </div>

                      <div className="flex justify-between items-end mt-auto pt-3 border-t border-white/5">
                        <div className="flex flex-col">
                          <span className="text-primary font-black text-lg tracking-tight">
                            {formatPrice(item.price)}
                          </span>
                          <span className="text-[10px] text-on-surface-variant/60 font-medium uppercase mt-0.5">
                            {item.time}
                          </span>
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAddToCart) {
                              onAddToCart(item);
                            } else {
                              alert(`Successfully added ${item.title} to your interest list! The seller will be notified.`);
                            }
                          }}
                          className="p-2.5 bg-primary/10 text-primary border border-primary/20 hover:border-primary/50 hover:bg-primary hover:text-background rounded-xl active:scale-90 transition-all shadow-[0_0_10px_rgba(0,180,255,0.05)] hover:shadow-[0_0_15px_rgba(0,180,255,0.25)]"
                          title="I'm Interested"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination Controls */}
          {sortedListings.length > 0 && (
            <div className="mt-12 flex justify-center items-center gap-2 select-none">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all text-on-surface-variant cursor-pointer active:scale-90"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setCurrentPage(1)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all cursor-pointer active:scale-90 ${
                  currentPage === 1 
                    ? 'bg-primary text-background shadow-[0_0_12px_rgba(0,180,255,0.4)]' 
                    : 'border border-outline-variant/50 hover:bg-primary/10 hover:text-primary text-on-surface-variant'
                }`}
              >
                1
              </button>
              
              <button 
                onClick={() => setCurrentPage(2)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all cursor-pointer active:scale-90 ${
                  currentPage === 2 
                    ? 'bg-primary text-background shadow-[0_0_12px_rgba(0,180,255,0.4)]' 
                    : 'border border-outline-variant/50 hover:bg-primary/10 hover:text-primary text-on-surface-variant'
                }`}
              >
                2
              </button>

              <button 
                onClick={() => setCurrentPage(3)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all cursor-pointer active:scale-90 ${
                  currentPage === 3 
                    ? 'bg-primary text-background shadow-[0_0_12px_rgba(0,180,255,0.4)]' 
                    : 'border border-outline-variant/50 hover:bg-primary/10 hover:text-primary text-on-surface-variant'
                }`}
              >
                3
              </button>

              <span className="px-2 text-outline/80 font-bold">...</span>
              
              <button 
                onClick={() => setCurrentPage(42)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all cursor-pointer active:scale-90 ${
                  currentPage === 42 
                    ? 'bg-primary text-background shadow-[0_0_12px_rgba(0,180,255,0.4)]' 
                    : 'border border-outline-variant/50 hover:bg-primary/10 hover:text-primary text-on-surface-variant'
                }`}
              >
                42
              </button>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, 42))}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all text-on-surface-variant cursor-pointer active:scale-90"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
