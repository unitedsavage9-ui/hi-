import { X, Filter, Trash2 } from 'lucide-react';

interface FiltersSidebarProps {
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
  totalResultsCount: number;
}

export default function FiltersSidebar({
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
  totalResultsCount
}: FiltersSidebarProps) {
  const categories: ('All' | 'Electronics' | 'Property' | 'Vehicles' | 'Jobs')[] = [
    'All', 'Electronics', 'Property', 'Vehicles', 'Jobs'
  ];

  const conditions: ('All' | 'New' | 'Refurbished' | 'Used')[] = [
    'All', 'New', 'Refurbished', 'Used'
  ];

  return (
    <div className="glass-card p-5 rounded-2xl space-y-6 text-left h-fit" id="search-filters-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <span>Filters</span>
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">
            {totalResultsCount}
          </span>
        </h3>
        <button 
          onClick={onClearFilters}
          className="text-xs text-on-surface-variant hover:text-primary flex items-center gap-1.5 font-bold transition-all cursor-pointer"
          title="Reset all filters"
        >
          <Trash2 className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category list */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Category</h4>
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>}
            </button>
          ))}
        </div>
      </div>

      {/* Sort selection */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full bg-[#111828]/50 border border-white/10 rounded-xl py-2 px-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
        >
          <option value="relevance">Recent / Featured</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range inputs */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Price Range (₹)</h4>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-[#111828]/50 border border-white/10 text-on-surface text-xs rounded-lg py-2 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/30"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-[#111828]/50 border border-white/10 text-on-surface text-xs rounded-lg py-2 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/30"
          />
        </div>
      </div>

      {/* Condition filters */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Condition</h4>
        <div className="flex flex-col gap-1.5">
          {conditions.map((cond) => (
            <label 
              key={cond} 
              className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface cursor-pointer py-1"
            >
              <input
                type="radio"
                name="condition"
                checked={selectedCondition === cond}
                onChange={() => setSelectedCondition(cond)}
                className="accent-primary w-4 h-4 border-white/10"
              />
              <span className={selectedCondition === cond ? "text-primary font-bold" : ""}>
                {cond === 'All' ? 'Any Condition' : cond}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Location filtering */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Location</h4>
        <input
          type="text"
          placeholder="E.g. Mumbai, Bangalore..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-full bg-[#111828]/50 border border-white/10 text-on-surface text-sm rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/30"
        />
      </div>
    </div>
  );
}
