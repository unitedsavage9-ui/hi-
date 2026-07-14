import React, { useState } from 'react';
import { 
  INITIAL_LISTINGS, 
  INITIAL_MESSAGES,
  PROFILE_IMAGE 
} from './data';
import { Listing, Message } from './types';
import TopNavBar from './components/TopNavBar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import DashboardView from './components/DashboardView';
import ListingDetailsModal from './components/ListingDetailsModal';
import AddListingModal from './components/AddListingModal';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Sparkles, 
  Heart, 
  Trash2, 
  Check, 
  X,
  ExternalLink,
  Laptop,
  Home,
  Car,
  Briefcase
} from 'lucide-react';

export default function App() {
  // Views
  const [currentView, setView] = useState<'home' | 'search' | 'dashboard'>('home');
  
  // Platform Lists State
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  // User Profile States
  const [profileImage, setProfileImage] = useState(PROFILE_IMAGE);
  const [profileName, setProfileName] = useState('United Savage');
  const [profileEmail, setProfileEmail] = useState('unitedsavage9@gmail.com');
  const [profileBio, setProfileBio] = useState('Discerning collector and trader of high-end consumer tech.');
  
  // Active Search/Filter filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Selected Inspector Listing
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Modal Open/Close Controls
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Notification State
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'New Negotiator Match',
      desc: 'Elena Rodriguez wants to meet today regarding Silver Ultrabook.',
      time: '2m ago',
      unread: true,
      action: 'dashboard' as const
    },
    {
      id: 'n-2',
      title: 'High Interest Alert',
      desc: 'Your Mechanical Masterpiece watch listing received 180 views in the last hour.',
      time: '1h ago',
      unread: true,
      action: 'dashboard' as const
    },
    {
      id: 'n-3',
      title: 'Price Drop Watchlist',
      desc: 'The Eames Lounge Chair was discounted by ₹10,000.',
      time: '1d ago',
      unread: false,
      action: 'search' as const
    }
  ]);

  // Favorites Toggler
  const handleToggleFavorite = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    }));
  };

  // Create Listing
  const handleAddListing = (newListing: Omit<Listing, 'id' | 'views' | 'isFavorite' | 'owner'>) => {
    const id = `user-added-${Date.now()}`;
    const listingToAdd: Listing & { owner: 'user' } = {
      ...newListing,
      id,
      views: '1',
      isFavorite: false,
      owner: 'user',
      status: 'active'
    };

    setListings(prev => [listingToAdd, ...prev]);
    setView('dashboard'); // Redirect to dashboard immediately so user sees their item!
    alert(`Successfully published "${newListing.title}" to Vendo's live market streaming!`);
  };

  // Change Listing Status
  const handleToggleListingStatus = (id: string, nextStatus: 'active' | 'pending' | 'sold') => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  // Delete Listing
  const handleDeleteListing = (id: string) => {
    setListings(prev => prev.filter(item => item.id !== id));
  };

  // Simulated Buy or Direct Message Action from Inspector Modal
  const handleSendMessageToSeller = (sellerName: string, initialText: string) => {
    // Add to conversations preview
    const newChatId = `chat-added-${Date.now()}`;
    const newConv: Message = {
      id: newChatId,
      sender: sellerName,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhnkMFOcxypd4KFnBgr2f2KBWpKb2Zs7LpV4fQCwZSG35b6svz94VtAQJfjTwrPc_YrcmwrnD695_FfGtEUOvHZhL6mb3GI4tRiFJIAhChBsbsWcUZ0PLcqw3j2he2y4rf1r_8icTlVvka_cl-biwhqtZ2ldb-QheHozMiBhJrgqz5pF7WbU7yzLrjtFQH5HLbWgFefhsvkDAlG2qXiZbXmWC3fqGPkrUiImTe4NfVfz6qGVXLoAsUiA',
      time: 'Just now',
      message: initialText,
      unread: false
    };

    setMessages(prev => [newConv, ...prev]);
    setView('dashboard');
    alert(`Message dispatched securely. Switch to the "Messages" tab inside your dashboard to view the seller's active responses.`);
  };

  const markNotificationsAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (item: typeof notifications[number]) => {
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));
    setIsNotificationsOpen(false);
    if (item.action === 'dashboard') {
      setView('dashboard');
    } else {
      setView('search');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-on-surface font-sans antialiased overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {/* Dynamic ambient radial lighting effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#c8a0f0]/5 rounded-full blur-[180px] pointer-events-none"></div>
      
      {/* Core Top Navigation Header */}
      <TopNavBar
        currentView={currentView}
        setView={setView}
        onSearch={setSearchQuery}
        onCategorySelect={setSelectedCategory}
        onOpenNotifications={() => setIsNotificationsOpen(prev => !prev)}
        onOpenChat={() => setView('dashboard')}
        onOpenAddListing={() => setIsAddListingOpen(true)}
        searchQuery={searchQuery}
        profileImage={profileImage}
      />

      {/* Notifications Popover Dropdown Overlay */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <div className="absolute top-18 right-6 z-40 w-80 md:w-96">
            {/* Backdrop cover clicker */}
            <div 
              onClick={() => setIsNotificationsOpen(false)} 
              className="fixed inset-0 z-0 bg-transparent" 
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 glass-card p-5 rounded-2xl border border-white/10 shadow-2xl bg-[#0f1524]/85 text-on-surface"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                <span className="font-bold text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" />
                  <span>Real-Time Notifications</span>
                </span>
                
                <button 
                  onClick={markNotificationsAllRead}
                  className="text-[11px] text-primary hover:underline font-semibold"
                >
                  Mark all read
                </button>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto scrollbar-hide">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className={`p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer border relative ${
                      n.unread ? 'bg-primary/5 border-primary/20' : 'border-transparent bg-white/5/20'
                    }`}
                  >
                    {n.unread && (
                      <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                    <h5 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      {n.title}
                    </h5>
                    <p className="text-[11px] text-on-surface-variant/80 mt-1 leading-relaxed">{n.desc}</p>
                    <span className="text-[9px] text-on-surface-variant/50 mt-1.5 block font-semibold">{n.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Primary Application Stages (Home, Search, Dashboard) */}
      <main className="px-6 py-6 w-full max-w-7xl mx-auto min-h-[calc(100vh-140px)]">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HomeView
                listings={listings}
                onToggleFavorite={handleToggleFavorite}
                onSearch={setSearchQuery}
                onCategorySelect={setSelectedCategory}
                onSelectListing={setSelectedListing}
                setView={setView}
                onOpenAddListing={() => setIsAddListingOpen(true)}
              />
            </motion.div>
          )}

          {currentView === 'search' && (
            <motion.div
              key="search-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SearchView
                listings={listings}
                onToggleFavorite={handleToggleFavorite}
                onSelectListing={setSelectedListing}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </motion.div>
          )}

          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DashboardView
                listings={listings}
                messages={messages}
                onToggleFavorite={handleToggleFavorite}
                onSelectListing={setSelectedListing}
                onOpenAddListing={() => setIsAddListingOpen(true)}
                onToggleListingStatus={handleToggleListingStatus}
                onDeleteListing={handleDeleteListing}
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                profileName={profileName}
                setProfileName={setProfileName}
                profileEmail={profileEmail}
                setProfileEmail={setProfileEmail}
                profileBio={profileBio}
                setProfileBio={setProfileBio}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Minimalist Translucent Footer */}
      <footer className="border-t border-white/5 py-12 px-6 mt-16 bg-[#0a0e1a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex flex-col">
            <span className="text-xl font-black text-primary tracking-tight">Vendo</span>
            <span className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-semibold mt-0.5">
              Glacier — Glassmorphism Design System
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-on-surface-variant/80">
            <button onClick={() => setView('home')} className="hover:text-primary transition-colors">Home</button>
            <button onClick={() => { setSelectedCategory('All'); setView('search'); }} className="hover:text-primary transition-colors">Marketplace</button>
            <button onClick={() => setView('dashboard')} className="hover:text-primary transition-colors">My Listings</button>
            <button onClick={() => alert("Vendo Privacy Notice:\n\nThis application runs in a simulated preview sandbox. All items are mock listings.")} className="hover:text-primary transition-colors">Privacy</button>
            <button onClick={() => alert("Vendo Terms of Use:\n\nBy accessing this marketplace, you consent to the simulation values.")} className="hover:text-primary transition-colors">Terms</button>
          </div>

          <p className="text-xs text-on-surface-variant/40 font-medium">
            © 2026 Vendo platform. All simulated rights reserved.
          </p>

        </div>
      </footer>

      {/* Dynamic Vendo Floating Action Button (Quick Sell FAB) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          whileHover={{ scale: 1.05, translateY: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddListingOpen(true)}
          className="bg-gradient-to-r from-primary to-[#b06cf0] text-background font-black text-xs md:text-sm px-5 md:px-6 py-3 md:py-3.5 rounded-full shadow-[0_4px_25px_rgba(0,180,255,0.35)] hover:shadow-[0_4px_30px_rgba(0,180,255,0.5)] border border-white/15 transition-shadow duration-300 flex items-center gap-2 cursor-pointer uppercase tracking-wider font-extrabold"
          title="Instantly list a product or job on Vendo"
        >
          <Sparkles className="w-4.5 h-4.5 fill-current animate-pulse text-background" />
          <span>Quick Sell</span>
        </motion.button>
      </div>

      {/* Modal: Product Detailed Inspector Drawer */}
      <AnimatePresence>
        {selectedListing && (
          <ListingDetailsModal
            listing={selectedListing}
            onClose={() => setSelectedListing(null)}
            onToggleFavorite={handleToggleFavorite}
            onSendMessageToSeller={handleSendMessageToSeller}
          />
        )}
      </AnimatePresence>

      {/* Modal: Publish New Item Dialog */}
      <AnimatePresence>
        {isAddListingOpen && (
          <AddListingModal
            onClose={() => setIsAddListingOpen(false)}
            onAddListing={handleAddListing}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
