import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Heart, 
  MessageSquare, 
  ShieldCheck, 
  Tag, 
  ArrowRight,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import { Listing } from '../types';
import { motion } from 'motion/react';

interface ListingDetailsModalProps {
  listing: Listing | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onSendMessageToSeller?: (sellerName: string, initialText: string) => void;
}

export default function ListingDetailsModal({
  listing,
  onClose,
  onToggleFavorite,
  onSendMessageToSeller
}: ListingDetailsModalProps) {
  if (!listing) return null;

  const [inquiryText, setInquiryText] = useState('');
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const mediaList = Array.from(new Set([listing.image, ...(listing.images || [])])).filter(Boolean);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryText.trim() === '') return;
    
    if (onSendMessageToSeller) {
      onSendMessageToSeller(
        listing.owner === 'user' ? 'Buyer Inquirer' : 'Elena Rodriguez', 
        `Inquiry about "${listing.title}": ${inquiryText}`
      );
    } else {
      alert(`Message successfully sent to seller: "${inquiryText}"`);
    }
    setInquiryText('');
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Tinted Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, translateY: 15 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        exit={{ opacity: 0, scale: 0.95, translateY: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-4xl glass-card rounded-2xl overflow-hidden border border-outline-variant/70 shadow-2xl z-10 flex flex-col md:flex-row bg-white/95 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible scrollbar-hide"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-primary/20 text-white hover:text-primary transition-colors flex items-center justify-center"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Left pane: Large high resolution visual image with Carousel & Video Support */}
        <div className="w-full md:w-1/2 relative bg-slate-900/60 min-h-[350px] md:min-h-[500px] flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0">
            {isPlayingVideo && listing.videoUrl ? (
              <div className="relative w-full h-full">
                <video 
                  src={listing.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover absolute inset-0 z-10" 
                />
                <button
                  onClick={() => setIsPlayingVideo(false)}
                  className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <X className="w-3 h-3" />
                  <span>Exit Video</span>
                </button>
              </div>
            ) : (
              <img 
                src={mediaList[activeMediaIndex] || listing.image} 
                alt={listing.title} 
                className="w-full h-full object-cover absolute inset-0 transition-all duration-300"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Top Floating items - navigation or controls */}
          <div className="relative z-10 p-4 flex justify-between items-start pointer-events-none w-full">
            {/* Carousel navigation buttons */}
            {!isPlayingVideo && mediaList.length > 1 ? (
              <div className="flex gap-1.5 pointer-events-auto">
                <button
                  onClick={() => {
                    setActiveMediaIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
                    setIsPlayingVideo(false);
                  }}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/95 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setActiveMediaIndex((prev) => (prev + 1) % mediaList.length);
                    setIsPlayingVideo(false);
                  }}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/95 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div />
            )}

            {/* Video Play Badge */}
            {listing.videoUrl && !isPlayingVideo && (
              <button
                onClick={() => setIsPlayingVideo(true)}
                className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-primary text-background font-black text-[11px] flex items-center gap-1.5 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all ml-auto cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Demo Video</span>
              </button>
            )}
          </div>

          {/* Bottom Floating items: verified badge, favorites, and thumbnails */}
          <div className="relative z-10 p-6 space-y-4 pointer-events-none w-full">
            {/* Thumbnails list if there are multiple images */}
            {!isPlayingVideo && mediaList.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-hide pointer-events-auto max-w-full">
                {mediaList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveMediaIndex(idx);
                      setIsPlayingVideo(false);
                    }}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      idx === activeMediaIndex ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-outline hover:border-primary'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pointer-events-auto w-full">
              <span className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{listing.category === 'Jobs' ? 'Verified Vendo Job Post' : 'Verified Vendo Item'}</span>
              </span>
              
              <button
                onClick={() => onToggleFavorite(listing.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow cursor-pointer ${
                  listing.isFavorite 
                    ? 'bg-red-500 text-white hover:bg-red-600 scale-110' 
                    : 'bg-black/35 text-white/80 hover:text-white hover:bg-black/50 hover:scale-105'
                }`}
              >
                <Heart className={`w-4 h-4 ${listing.isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Right pane: Product detail metadata */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between h-full bg-surface-container/10">
          <div>
            {/* Category / Condition tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-surface-container border border-outline-variant/60 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-on-surface-variant">
                {listing.category}
              </span>
              {listing.category === 'Jobs' ? (
                <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Job Type: {listing.jobType || 'Full-time'}
                </span>
              ) : (
                <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Condition: {listing.condition}
                </span>
              )}
              {listing.views && listing.views !== 'Completed' && (
                <span className="text-on-surface-variant/60 text-[11px] font-semibold flex items-center gap-1 ml-auto">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  <span>{listing.views} active views</span>
                </span>
              )}
            </div>

            {/* Hiring Company Title */}
            {listing.category === 'Jobs' && listing.companyName && (
              <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 bg-primary/10 border border-primary/15 rounded-lg px-2.5 py-1.5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>Hiring Company: {listing.companyName}</span>
              </div>
            )}

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-black text-on-surface tracking-tight mb-2">
              {listing.title}
            </h2>

            {/* Price/Salary tag */}
            <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-outline-variant/40">
              <span className="text-2xl font-black text-primary tracking-tight">
                {formatPrice(listing.price)}
              </span>
              <span className="text-xs text-on-surface-variant/50">
                {listing.category === 'Jobs' ? '/ Month Base Comp' : 'INR Negotiable'}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-6 bg-surface-container/60 rounded-xl px-4 py-3 border border-outline-variant/40">
              <MapPin className="w-4 h-4 text-primary" />
              <div>
                <p className="font-bold text-on-surface text-xs">
                  {listing.category === 'Jobs' ? 'Job Location' : 'Pickup Location'}
                </p>
                <p className="text-xs text-on-surface-variant/80">{listing.location}</p>
              </div>
              <span className="text-[10px] text-on-surface-variant/50 ml-auto font-bold uppercase">
                Listed {listing.time}
              </span>
            </div>

            {/* Long details */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
                  {listing.category === 'Jobs' ? 'Role Description' : 'Item Description'}
                </h4>
                <p className="text-xs md:text-sm text-on-surface-variant/90 leading-relaxed">
                  {listing.description || (listing.category === 'Jobs' ? 'Join an incredible team building premium solutions. Submit an inquiry below to discuss the role requirements.' : 'This premium Vendo-listed product is thoroughly checked for physical damage and functions flawlessly. Contact the seller below for questions, offers, or shipping estimates.')}
                </p>
              </div>

              {listing.category === 'Jobs' && listing.jobRequirements && (
                <div className="bg-surface-container/50 border border-primary/10 rounded-xl p-4 space-y-2">
                  <h5 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-primary" />
                    <span>Job Requirements & Skills</span>
                  </h5>
                  <ul className="list-disc list-inside text-xs text-on-surface-variant/90 space-y-1.5 ml-0.5 leading-relaxed">
                    {listing.jobRequirements.split(';').map((req, idx) => {
                      if (req.trim() === '') return null;
                      return <li key={idx}>{req.trim()}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Buyer-Seller Inquiry panel */}
          {listing.owner !== 'user' ? (
            <div className="border-t border-outline-variant/40 pt-6 space-y-4">
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>
                  {listing.category === 'Jobs' ? 'Apply or Contact Recruiter' : 'Message Seller Directly'}
                </span>
              </h4>

              <form onSubmit={handleSendInquiry} className="flex gap-2">
                <input
                  type="text"
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  placeholder={listing.category === 'Jobs' ? 'Introduce yourself, attach resume/portfolio links...' : 'Ask seller if available, offer prices...'}
                  className="flex-1 bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  className="bg-primary hover:brightness-110 text-background font-bold px-4 py-2.5 rounded-xl text-xs active:scale-95 transition-all flex items-center gap-1.5 shadow-lg shadow-primary/5 cursor-pointer"
                >
                  <span>{listing.category === 'Jobs' ? 'Apply Now' : 'Inquire'}</span>
                  <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                </button>
              </form>
            </div>
          ) : (
            <div className="border-t border-outline-variant/40 pt-6 flex items-center justify-between text-xs text-on-surface-variant/70">
              <span className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="text-emerald-400 w-4 h-4" />
                <span>This is your active listing</span>
              </span>
              <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-bold uppercase">
                Owner State
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
