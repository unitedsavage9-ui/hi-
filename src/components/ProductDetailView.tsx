import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, MessageSquare, Shield, Star, Sparkles, MapPin, CheckCircle, Share2, Info, Eye } from 'lucide-react';
import { Item } from '../types';
import { similarListings } from '../data';
import ItemCard from './ItemCard';

interface ProductDetailViewProps {
  item: Item;
  favorites: string[];
  onLikeToggle: (id: string, e: React.MouseEvent) => void;
  onSelectItem: (id: string) => void;
  onBack: () => void;
  onContactSeller: (sellerName: string, itemTitle: string, itemId: string) => void;
}

export default function ProductDetailView({
  item,
  favorites,
  onLikeToggle,
  onSelectItem,
  onBack,
  onContactSeller
}: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(item.imageUrl);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // When item changes, reset active image
  useEffect(() => {
    setActiveImage(item.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [item]);

  const isLiked = favorites.includes(item.id);

  // Gallery images list
  // For Lumina Headphones, we can use the high-res detail photos, or generate variation parameters for others
  const galleryImages = item.id === 'lumina-headphones' 
    ? [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDxL7g76EDx1b83ecenZc1cZ0Qd85bnVa9zX8RiHH81C6m6-7h6BnlkPaNRzX0-rfaW0A9sdRgfjCxo9AecGaADYD2TmX1hpZtDgb7XNrI5-6u02VlAifOVXNv2QTCdo4dCGRMkUb0d6lQ6fHoS2tQMUBf-0SO75pwFnAYh_hpaMkqpC1Cz5NesvMaENzdvcPVKBrCvAav7zxPL_9eJoCdok8uIuPMSs43nTPS4FQMBx3vlTjOYau9f6Q",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCg5iwlzm_JyLDVHBOfV2cr__QTM3jRAbNg4-yjLV0AuiFbdhrd46W2yTHbHRWnTyBmT_8mHelx-Y5tdjWcp8154SQNWAsNOlWboExlwUgEpicg0FdkP_tRqtokdcX1II6nVMKB9_yYGH3j58iyLq4IZpkMmWBQm2HvQx0Njueb1K8wjbQI1NqzH_IZQZvZ5zjkjL-CVAMnTOxWepBvNbWSgieTypYH1K-V-9GTTJzTE5BqKPZbUlA5Og",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDvGsD_Fl515arwOn17WOo9zzcFxX9X-f2IHUpaUuwgOef0TxgfJBdUMiYLM7zQOPQKfax8S1PvKX0ySEMLfbxoGSeJ_UXtmR9EXaVA3jOAEj8pWGxPVx4CrhUof2nXeABeH1mhto04pW4_EtKd-HS-drll6famDiGDQAheLPco5sJIUTnCSK4CYKF2-bAOK9akEaSlhZId-VPg--PNuEsEpGOMz-wYK6lndKwClVDInDfIR68-yTC3ZQ",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAuH8z1zSypOgFNt1oCNNP_VpBjM79bZFJiT1kw4Zr06n1WchhtZhsWF3qT9waqukBOcY5dP908jtLN7zm13wo7T6GRdCo9WPbMtHKuhj0QIa671JOPCqZcjljY_Me57XWXuJWgZwlt7F_OaLf9fiaJju6NK_7CBbAior4jxwbfXODCuvlg-iSXNvuyw6jvxegfADpOthPRpRk3umYoMBjY7QxkB8Uhp5qcs5wVn1IKP_TCyRC2I403GA"
      ]
    : [item.imageUrl]; // Default fallback

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchaseModalOpen(false);
      setPurchaseSuccess(false);
    }, 3000);
  };

  return (
    <div className="px-6 py-6 w-full max-w-7xl mx-auto space-y-12 text-left" id="product-detail-view-root">
      
      {/* Back link */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-primary font-bold uppercase tracking-wider hover:text-white transition-all cursor-pointer bg-white/5 px-4 py-2 rounded-xl border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse</span>
        </button>
        
        {/* Share buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Copied link to clipboard!");
            }}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
            title="Share Listing"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main product configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column: Visual Showcase & Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-3xl overflow-hidden aspect-video sm:aspect-square bg-slate-900 border border-white/10 relative group">
            <img 
              src={activeImage} 
              alt={item.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Ambient Shadow glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/50 to-transparent pointer-events-none"></div>
            
            {/* Category tag */}
            <span className="absolute top-4 left-4 text-xs font-black uppercase tracking-widest bg-primary text-black px-3 py-1.5 rounded-lg shadow-md">
              {item.category}
            </span>
          </div>

          {/* Thumbnail row */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-2" id="detail-thumbnail-row">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImage === img ? 'border-primary scale-95 shadow-md shadow-primary/20' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Specs, pricing, and actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            {/* Location & Time */}
            <div className="flex items-center gap-3 text-xs text-on-surface-variant font-semibold">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {item.location}
              </span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full"></span>
              <span>{item.timeAgo}</span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full"></span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {item.viewsCount} views
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
              {item.title}
            </h1>

            {/* Price Badge */}
            <div className="text-3xl font-extrabold text-primary tracking-tight">
              {item.priceFormatted}
            </div>
          </div>

          {/* Core Action Panel */}
          <div className="glass-card-elevated p-6 rounded-2xl border-white/15 space-y-4">
            <div className="flex gap-3">
              {/* Buy button */}
              <button 
                onClick={() => setPurchaseModalOpen(true)}
                className="flex-1 bg-primary text-on-primary font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
                id="buy-now-btn"
              >
                Buy Specimen
              </button>

              {/* Chat action button */}
              <button 
                onClick={() => onContactSeller(item.seller.name, item.title, item.id)}
                className="flex items-center justify-center gap-2 bg-[#111828]/60 hover:bg-white/5 border border-white/10 font-bold text-sm text-on-surface px-5 py-3.5 rounded-xl transition-all cursor-pointer shrink-0"
                id="contact-seller-btn"
              >
                <MessageSquare className="w-4 h-4 text-tertiary" />
                <span>Contact Seller</span>
              </button>

              {/* Like action */}
              <button 
                onClick={(e) => onLikeToggle(item.id, e)}
                className={`w-12 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  isLiked 
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' 
                    : 'bg-[#111828]/60 hover:bg-white/5 border border-white/10 text-on-surface-variant hover:text-white'
                }`}
                title="Favorite"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Security Guarantee banner */}
            <div className="flex gap-2.5 items-start bg-[#0a0e1a]/40 p-3 rounded-xl border border-white/5 text-[11px] text-on-surface-variant leading-relaxed">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-white">Vendo Escrow Security:</span> Your funds are held securely until delivery is verified. Buy with complete confidence.
              </div>
            </div>
          </div>

          {/* Seller profile card */}
          <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={item.seller.avatar} 
                alt={item.seller.name} 
                className="w-12 h-12 rounded-full object-cover border border-white/10"
              />
              <div className="text-left space-y-0.5">
                <div className="font-bold text-white text-sm flex items-center gap-1">
                  <span>{item.seller.name}</span>
                  {item.seller.isVerified && <CheckCircle className="w-3.5 h-3.5 fill-primary text-black" />}
                </div>
                <div className="text-[11px] text-on-surface-variant font-medium">
                  Member since {item.seller.joinedDate}
                </div>
              </div>
            </div>
            
            {/* Rating */}
            <div className="bg-[#111828]/40 border border-white/5 rounded-xl py-1.5 px-3 flex flex-col items-center">
              <div className="flex items-center text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                <span>{item.seller.rating}</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-on-surface-variant/75 font-semibold">
                {item.seller.reviewsCount} reviews
              </span>
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Listing Description</span>
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
          </div>

          {/* Specifications Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">
              Listing Specifications
            </h3>
            <div className="glass-card rounded-xl overflow-hidden border-white/5 divide-y divide-white/5 text-xs">
              {Object.entries(item.specs).map(([key, value]) => (
                <div key={key} className="grid grid-cols-12 py-2.5 px-4 bg-slate-950/20">
                  <div className="col-span-4 font-bold text-on-surface-variant">{key}</div>
                  <div className="col-span-8 font-medium text-white">{value}</div>
                </div>
              ))}
              <div className="grid grid-cols-12 py-2.5 px-4 bg-slate-950/20">
                <div className="col-span-4 font-bold text-on-surface-variant">Condition</div>
                <div className="col-span-8 font-medium text-white">{item.condition}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Similar Listings */}
      <section className="space-y-6 pt-10 border-t border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-6 bg-primary rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Similar Specimens
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" id="similar-specimens-grid">
          {similarListings.map((simItem) => (
            <ItemCard
              key={simItem.id}
              item={simItem}
              isLiked={favorites.includes(simItem.id)}
              onLikeToggle={onLikeToggle}
              onClick={() => onSelectItem(simItem.id)}
            />
          ))}
        </div>
      </section>

      {/* Purchase Modal Simulation */}
      {purchaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e1a]/80 backdrop-blur-md px-4">
          <div className="glass-card-elevated w-full max-w-md p-6 rounded-2xl border-white/10 text-center space-y-6">
            {!purchaseSuccess ? (
              <form onSubmit={handlePurchaseSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Purchase Agreement</h3>
                  <p className="text-xs text-on-surface-variant">
                    Agree to terms to finalize transaction with the escrow service.
                  </p>
                </div>

                <div className="bg-[#111828]/40 border border-white/5 p-4 rounded-xl text-left space-y-2">
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Listing Item:</span>
                    <span className="text-white font-bold">{item.title.substring(0, 30)}...</span>
                  </div>
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Listed Price:</span>
                    <span className="text-white font-bold">{item.priceFormatted}</span>
                  </div>
                  <div className="flex justify-between text-xs text-on-surface-variant border-t border-white/5 pt-2">
                    <span>Escrow Service Fee:</span>
                    <span className="text-white">₹0 (Free Demo)</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white border-t border-white/10 pt-2">
                    <span>Total Debit:</span>
                    <span className="text-primary">{item.priceFormatted}</span>
                  </div>
                </div>

                {/* Simulated payment inputs */}
                <div className="space-y-3 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full bg-[#111828]/60 border border-white/10 text-on-surface rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Card Details</label>
                    <div className="grid grid-cols-12 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="4111 2222 3333 4444"
                        className="col-span-8 bg-[#111828]/60 border border-white/10 text-on-surface rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/20"
                      />
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        className="col-span-2 bg-[#111828]/60 border border-white/10 text-on-surface rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/20"
                      />
                      <input
                        type="text"
                        required
                        placeholder="CVV"
                        className="col-span-2 bg-[#111828]/60 border border-white/10 text-on-surface rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPurchaseModalOpen(false)}
                    className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-xs py-2.5 rounded-lg text-on-surface cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-on-primary font-bold text-xs py-2.5 rounded-lg cursor-pointer"
                  >
                    Authorise
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-8 h-8 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-white text-base">Payment Authorized Successfully</h4>
                  <p className="text-xs text-on-surface-variant">
                    Funds are now safely held in Vendo Escrow. The seller ({item.seller.name}) is preparing your order.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
