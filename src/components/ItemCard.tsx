import React from 'react';
import { Heart, MapPin, Eye, Star } from 'lucide-react';
import { Item } from '../types';

interface ItemCardProps {
  key?: any;
  item: Item;
  isLiked: boolean;
  onLikeToggle: (id: string, e: any) => void;
  onClick: () => void;
}

export default function ItemCard({ item, isLiked, onLikeToggle, onClick }: ItemCardProps) {
  return (
    <div 
      onClick={onClick}
      className="glass-card hover:glass-card-elevated hover:scale-[1.02] hover:-translate-y-1 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group cursor-pointer w-full ambient-glow hover:shadow-primary/5"
      id={`item-card-${item.id}`}
    >
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900 shrink-0">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/80 via-transparent to-transparent opacity-60"></div>
        
        {/* Status/Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.isNewTag && (
            <span className="text-[10px] font-black uppercase tracking-wider bg-primary text-[#0a0e1a] px-2.5 py-1 rounded-md shadow-md animate-pulse">
              New
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider bg-surface/80 border border-white/10 backdrop-blur-md text-primary px-2.5 py-1 rounded-md">
            {item.category}
          </span>
        </div>

        {/* Condition Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-medium tracking-wide bg-slate-900/80 border border-white/5 backdrop-blur-md text-on-surface-variant px-2 py-0.5 rounded-full">
            {item.condition}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => onLikeToggle(item.id, e)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isLiked 
              ? 'bg-rose-500 text-white scale-110' 
              : 'bg-surface/60 hover:bg-surface/80 text-on-surface-variant hover:text-white border border-white/10'
          } backdrop-blur-md cursor-pointer`}
          title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Seller / rating micro link */}
          <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant">
            <span>By {item.seller.name.substring(0, 16)}{item.seller.name.length > 16 ? '...' : ''}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="flex items-center text-amber-400">
              <Star className="w-2.5 h-2.5 fill-current mr-0.5" />
              {item.seller.rating}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-on-surface text-sm sm:text-base line-clamp-2 tracking-tight group-hover:text-primary transition-colors min-h-[2.5rem]">
            {item.title}
          </h3>
        </div>

        <div className="space-y-2 pt-3 mt-auto">
          {/* Price */}
          <div className="text-lg font-extrabold text-white tracking-tight">
            {item.priceFormatted}
          </div>

          {/* Location and Metadata */}
          <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[11px] text-on-surface-variant">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-primary/70" />
              {item.location}
            </span>
            <span className="flex items-center gap-1 text-[10px] uppercase font-bold">
              <Eye className="w-3 h-3" />
              {item.viewsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
