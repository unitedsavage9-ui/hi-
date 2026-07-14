import React from 'react';
import { SlidersHorizontal, SearchX, ArrowLeft } from 'lucide-react';
import { Item } from '../types';
import FiltersSidebar from './FiltersSidebar';
import ItemCard from './ItemCard';

interface ResultsViewProps {
  items: Item[];
  favorites: string[];
  onLikeToggle: (id: string, e: React.MouseEvent) => void;
  onSelectItem: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: 'All' | 'Electronics' | 'Property' | 'Vehicles' | 'Jobs';
  setSelectedCategory: (cat: 'All' | 'Electronics' | 'Property' | 'Vehicles' | 'Jobs') => void;
  selectedCondition: 'All' | 'New' | 'Refurbished' | 'Used';
  setSelectedCondition: (cond: 'All' | 'New' | 'Refurbished' | 'Used') => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  sortBy: 'relevance' | 'priceAsc' | 'priceDesc';
  setSortBy: (sort: 'relevance' | 'priceAsc' | 'priceDesc') => void;
  locationFilter: string;
  setLocationFilter: (val: string) => void;
  onClearFilters: () => void;
  setCurrentScreen: (screen: 'home' | 'search' | 'detail' | 'dashboard') => void;
}

export default function ResultsView({
  items,
  favorites,
  onLikeToggle,
  onSelectItem,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCondition,
  setSelectedCondition,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  locationFilter,
  setLocationFilter,
  onClearFilters,
  setCurrentScreen
}: ResultsViewProps) {
  
  // Apply filtering and sorting logic client-side!
  const filteredItems = items.filter((item) => {
    // Search query matches
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchCat = item.category.toLowerCase().includes(query);
      const matchSpec = Object.values(item.specs).some(val => val.toLowerCase().includes(query));
      if (!matchTitle && !matchDesc && !matchCat && !matchSpec) {
        return false;
      }
    }

    // Category matches
    if (selectedCategory !== 'All') {
      if (item.category !== selectedCategory) return false;
    }

    // Condition matches
    if (selectedCondition !== 'All') {
      if (item.condition !== selectedCondition) return false;
    }

    // Price range min
    if (minPrice.trim() !== '') {
      if (item.price < parseFloat(minPrice)) return false;
    }

    // Price range max
    if (maxPrice.trim() !== '') {
      if (item.price > parseFloat(maxPrice)) return false;
    }

    // Location matches
    if (locationFilter.trim() !== '') {
      const locQuery = locationFilter.toLowerCase();
      if (!item.location.toLowerCase().includes(locQuery)) return false;
    }

    return true;
  });

  // Sort logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'priceAsc') {
      return a.price - b.price;
    } else if (sortBy === 'priceDesc') {
      return b.price - a.price;
    }
    // Default or relevance
    return b.likesCount - a.likesCount;
  });

  return (
    <div className="px-6 py-6 w-full max-w-7xl mx-auto space-y-6 text-left" id="results-view-root">
      
      {/* Navigation Breadcrumbs / Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="flex items-center gap-1 text-xs text-primary font-bold uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Listing Catalogue</span>
            {searchQuery && (
              <span className="text-sm font-medium text-on-surface-variant bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                Query: "{searchQuery}"
              </span>
            )}
          </h2>
        </div>
        <div className="text-sm text-on-surface-variant font-medium shrink-0">
          Showing <span className="text-white font-extrabold">{sortedItems.length}</span> of {items.length} items
        </div>
      </div>

      {/* Main Grid: Filters on Left, Grid on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filter Sidebar container */}
        <div className="lg:col-span-1">
          <FiltersSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            onClearFilters={onClearFilters}
            totalResultsCount={sortedItems.length}
          />
        </div>

        {/* Catalog Items Container */}
        <div className="lg:col-span-3 space-y-6">
          {sortedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="search-results-grid">
              {sortedItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isLiked={favorites.includes(item.id)}
                  onLikeToggle={onLikeToggle}
                  onClick={() => onSelectItem(item.id)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="glass-card rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6 border-dashed border-white/10 mt-10">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-on-surface-variant border border-white/5">
                <SearchX className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">No specimens matched your criteria</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
                  Try clearing some filters, expanding your price range, checking for typos, or selecting another category to discover gorgeous items.
                </p>
              </div>
              <button 
                onClick={onClearFilters}
                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer text-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
