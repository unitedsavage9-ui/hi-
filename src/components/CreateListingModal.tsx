import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon, CheckCircle, Info } from 'lucide-react';
import { Item } from '../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitListing: (item: Item) => void;
}

export default function CreateListingModal({
  isOpen,
  onClose,
  onSubmitListing
}: CreateListingModalProps) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<'Electronics' | 'Property' | 'Vehicles' | 'Jobs'>('Electronics');
  const [condition, setCondition] = useState<'New' | 'Refurbished' | 'Used'>('New');
  const [location, setLocation] = useState('San Francisco, CA');
  const [description, setDescription] = useState('');
  
  // Custom image selection, or preset helper template
  const [imageUrl, setImageUrl] = useState('');
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number | null>(null);

  // Predefined image presets to give beautiful results immediately!
  const imagePresets = [
    { label: 'Studio Audio Tech', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600' },
    { label: 'Ergonomic Desk Tech', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600' },
    { label: 'Modern Suite Penthouse', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600' },
    { label: 'Hypercar Coupe', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600' },
    { label: 'Professional Office Spot', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' }
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !price || !location.trim()) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    // Set fallback image url if none selected
    const finalImageUrl = imageUrl.trim() !== '' 
      ? imageUrl 
      : selectedPresetIdx !== null 
      ? imagePresets[selectedPresetIdx].url 
      : 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600';

    const numericPrice = parseFloat(price);
    const formattedPrice = `₹${numericPrice.toLocaleString('en-IN')}`;

    const newListingItem: Item = {
      id: `user-listing-${Date.now()}`,
      title: title.trim(),
      price: numericPrice,
      priceFormatted: formattedPrice,
      location: location.trim(),
      timeAgo: "Just now",
      category,
      imageUrl: finalImageUrl,
      description: description.trim() || "A beautiful premium item uploaded directly through Vendo portal.",
      specs: {
        "Brand": "General Specification",
        "Category": category,
        "Authentic Seal": "Verified",
        "Source Origin": location.trim()
      },
      seller: {
        name: "Audio Enthusiast Store", // The user
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj8fps8xXUAP-gf8NlKJbIAymke-0BFVmtA4hg4YkrjvSKEpVlyivthUBjB-OIwBKmV2Peww9vbPKSVMijhHKCxNvPEYyE-OW4uciBnxOTsALIT2HeqMUk8VnHj7KPSzL4YNOp1Vu5fWDYxAkYSpv_4amoumJGwDvPPOPURhpfzNt5WHw1v5J_IJ4eBmbnYhhprjlnv2jT-YWHFhJk9Z76qSe6gy4ayqGb0VXT6QkLhCJYM_giBm7pTw",
        joinedDate: "March 2021",
        rating: 4.9,
        reviewsCount: 248
      },
      condition,
      likesCount: 0,
      viewsCount: "0 views",
      status: "active",
      isNewTag: true
    };

    onSubmitListing(newListingItem);
    onClose();

    // Reset fields
    setTitle('');
    setPrice('');
    setCategory('Electronics');
    setCondition('New');
    setLocation('San Francisco, CA');
    setDescription('');
    setImageUrl('');
    setSelectedPresetIdx(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e1a]/85 backdrop-blur-md px-4 overflow-y-auto py-10" id="create-listing-modal-backdrop">
      <div className="glass-card-elevated w-full max-w-xl p-6 sm:p-8 rounded-3xl border-white/10 relative my-auto shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition-all cursor-pointer"
        >
          <X className="w-5 h-5 text-on-surface-variant hover:text-white" />
        </button>

        {/* Modal Header */}
        <div className="text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/20 text-primary text-[10px] uppercase font-extrabold px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3" />
            <span>Vendo Global Index</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Create Listing Specimen</h3>
          <p className="text-xs text-on-surface-variant">Publish a listing immediately to show on our search index and recommendations lists.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Title & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Listing Title *</label>
              <input
                type="text"
                required
                placeholder="E.g. Vintage Stereo Amplifier"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#111828]/60 border border-white/10 text-on-surface rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/20"
              />
            </div>
            <div className="sm:col-span-4 space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Price (₹) *</label>
              <input
                type="number"
                required
                placeholder="E.g. 45000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#111828]/60 border border-white/10 text-on-surface rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/20"
              />
            </div>
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-4 space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#111828]/60 border border-white/10 text-on-surface rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              >
                <option value="Electronics">Electronics</option>
                <option value="Property">Property</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Jobs">Jobs</option>
              </select>
            </div>
            <div className="sm:col-span-4 space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Condition *</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full bg-[#111828]/60 border border-white/10 text-on-surface rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              >
                <option value="New">New</option>
                <option value="Refurbished">Refurbished</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div className="sm:col-span-4 space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Location *</label>
              <input
                type="text"
                required
                placeholder="E.g. Mumbai, MH"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#111828]/60 border border-white/10 text-on-surface rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/20"
              />
            </div>
          </div>

          {/* Image Presets / Paste Image URL */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant block">Listing Visual Media</label>
            
            {/* Presets */}
            <div className="grid grid-cols-5 gap-2" id="image-presets-selector">
              {imagePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedPresetIdx(idx);
                    setImageUrl(''); // Clear custom URL when preset selected
                  }}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedPresetIdx === idx ? 'border-primary scale-95 shadow-md shadow-primary/20' : 'border-white/5 hover:border-white/15'
                  }`}
                  title={preset.label}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  {selectedPresetIdx === idx && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary fill-[#0a0e1a]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Custom URL Option */}
            <div className="relative group">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input
                type="text"
                placeholder="Or paste custom image Unsplash link here..."
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setSelectedPresetIdx(null); // Clear preset selection when custom is typed
                }}
                className="w-full bg-[#111828]/60 border border-white/10 text-on-surface rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/20"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Listing Details / Description</label>
            <textarea
              placeholder="Tell buyers about key product specifications, original warranty status, and delivery preferences."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-[#111828]/60 border border-white/10 text-on-surface rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/20 resize-none"
            />
          </div>

          {/* Guidelines info */}
          <div className="flex gap-2.5 bg-[#0a0e1a]/40 p-3 rounded-xl border border-white/5 text-[10px] text-on-surface-variant leading-relaxed">
            <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <span>
              By publishing, you agree to comply with Vendo secure listing standards. Listing immediately enters our simulated local database.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-xs py-3 rounded-xl text-on-surface transition-all cursor-pointer"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-on-primary font-black text-xs py-3 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              id="submit-new-listing"
            >
              Publish Specimen
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
