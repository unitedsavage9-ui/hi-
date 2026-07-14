import React, { useState } from 'react';
import { Globe, Mail, Send } from 'lucide-react';

interface FooterProps {
  setCurrentScreen: (screen: 'home' | 'search' | 'detail' | 'dashboard') => void;
  setSelectedCategory: (cat: 'All' | 'Electronics' | 'Property' | 'Vehicles' | 'Jobs') => void;
}

export default function Footer({ setCurrentScreen, setSelectedCategory }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleMarketplaceLink = (cat: 'All' | 'Electronics' | 'Property' | 'Vehicles' | 'Jobs') => {
    setSelectedCategory(cat);
    setCurrentScreen('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f1524]/60 border-t border-white/10 mt-20 backdrop-blur-xl relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-8 py-14 w-full max-w-7xl mx-auto">
        
        {/* Brand / Intro */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-primary tracking-tight">Vendo</span>
            <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">One place for everything</span>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            A premium ecosystem for trade, connecting discerning buyers and sellers worldwide with sophisticated efficiency and glassmorphic elegance.
          </p>
          <div className="flex gap-3 pt-2">
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all cursor-pointer">
              <Globe className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all cursor-pointer">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Column 1: Marketplace */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Marketplace</h4>
          <nav className="flex flex-col gap-2.5">
            <button onClick={() => handleMarketplaceLink('All')} className="text-sm text-left text-on-surface-variant hover:text-primary transition-all cursor-pointer">
              Fresh Recommendations
            </button>
            <button onClick={() => handleMarketplaceLink('Electronics')} className="text-sm text-left text-on-surface-variant hover:text-primary transition-all cursor-pointer">
              High-End Electronics
            </button>
            <button onClick={() => handleMarketplaceLink('Property')} className="text-sm text-left text-on-surface-variant hover:text-primary transition-all cursor-pointer">
              Luxury Properties
            </button>
            <button onClick={() => handleMarketplaceLink('Vehicles')} className="text-sm text-left text-on-surface-variant hover:text-primary transition-all cursor-pointer">
              Premium Vehicles
            </button>
          </nav>
        </div>

        {/* Column 2: Resources */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Resources</h4>
          <nav className="flex flex-col gap-2.5">
            <button onClick={() => setCurrentScreen('dashboard')} className="text-sm text-left text-on-surface-variant hover:text-primary transition-all cursor-pointer">
              Seller Dashboard
            </button>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-all">
              Buying Guide
            </a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-all">
              Selling Guide
            </a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-all">
              Trust &amp; Safety
            </a>
          </nav>
        </div>

        {/* Column 3: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Stay Updated</h4>
          <p className="text-sm text-on-surface-variant">
            Subscribe to our weekly premium digest and get notified of high-interest luxury listings.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 relative">
            <input
              type="email"
              placeholder="Your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111828]/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary text-on-surface placeholder:text-on-surface-variant/40"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg transition-all flex items-center justify-center cursor-pointer font-bold shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-primary font-medium animate-pulse">
              ✓ Successfully subscribed to Vendo update list!
            </p>
          )}
        </div>
      </div>

      <div className="px-8 py-6 border-t border-white/5 text-center flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl mx-auto text-xs text-on-surface-variant/60 gap-4">
        <span>© 2026 Vendo Global. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
