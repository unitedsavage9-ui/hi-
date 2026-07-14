import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ResultsView from './components/ResultsView';
import ProductDetailView from './components/ProductDetailView';
import DashboardView from './components/DashboardView';
import CreateListingModal from './components/CreateListingModal';
import { initialItems, userActiveListings, initialThreads, similarListings } from './data';
import { Item, MessageThread, ChatMessage } from './types';

export default function App() {
  // Navigation / Screen State
  const [currentScreen, setCurrentScreen] = useState<'home' | 'search' | 'detail' | 'dashboard'>('home');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Electronics' | 'Property' | 'Vehicles' | 'Jobs'>('All');
  const [selectedCondition, setSelectedCondition] = useState<'All' | 'New' | 'Refurbished' | 'Used'>('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'priceAsc' | 'priceDesc'>('relevance');
  const [locationFilter, setLocationFilter] = useState('');

  // Favorites (Bookmarks) Watchlist state
  const [favorites, setFavorites] = useState<string[]>(['lumina-headphones', 'macbook-pro', 'eames-chair']);

  // Shared Listings & Chat Thread database
  const [allItems, setAllItems] = useState<Item[]>(initialItems);
  const [userListings, setUserListings] = useState<Item[]>(userActiveListings);
  const [threads, setThreads] = useState<MessageThread[]>(initialThreads);

  // Dashboard state handlers
  const [dashboardTab, setDashboardTab] = useState<'listings' | 'messages' | 'favorites' | 'stats'>('listings');
  const [dashboardThreadId, setDashboardThreadId] = useState<string | null>(null);

  // Create listing modal trigger
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // Scroll to top on screen swap
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  // Handler: Inspecting/Selecting an item to view in details
  const handleSelectItem = (id: string) => {
    // Look up item inside all items or user's listings
    let item = allItems.find(i => i.id === id);
    if (!item) {
      item = userListings.find(i => i.id === id);
    }
    if (!item) {
      // Look up in similar listings too as a fallback
      item = similarListings.find((i: Item) => i.id === id);
    }

    if (item) {
      setSelectedItem(item);
      setCurrentScreen('detail');
    }
  };

  // Handler: Like / heart toggler
  const handleLikeToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop parent click actions
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handler: Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCondition('All');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('relevance');
    setLocationFilter('');
  };

  // Handler: Submit newly created listing
  const handleSubmitListing = (newItem: Item) => {
    // Add to all items so it shows in search results immediately
    setAllItems(prev => [newItem, ...prev]);
    // Add to user active listings for dashboard tracking
    setUserListings(prev => [newItem, ...prev]);
  };

  // Handler: Initiate chat conversation with a seller
  const handleContactSeller = (sellerName: string, itemTitle: string, itemId: string) => {
    // Check if thread discussing this item already exists
    const existingThread = threads.find(t => t.itemId === itemId);
    if (existingThread) {
      setDashboardThreadId(existingThread.id);
      setDashboardTab('messages');
      setCurrentScreen('dashboard');
      return;
    }

    // Create a new simulated chat thread
    const newThreadId = `thread-custom-${Date.now()}`;
    const firstGreeting: ChatMessage = {
      sender: 'user',
      text: `Hi ${sellerName}! I'm highly interested in purchasing your listed item: "${itemTitle}". Is it still available for trade?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newThread: MessageThread = {
      id: newThreadId,
      senderName: sellerName,
      senderAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk8jKilHoVrnmumDuRTQDfvoMFKreZ52_yLpzFJb4_whxHjxaj7bRTjQQHQPYPq2_v5DP4-qHM6GBaTtwjhxJJpxf19ch7xkTQI5jtmGxt63nkgfhN6cDwsxYzotGxM87RvuZaqDqw90H_172Zn9gQkTuvxKiscKXVwnONheGd5GVGHxe1Q6e2mpffxgn21m0NBdx2p0St1FjktHAewVTmF0GSR3OlsDUmAkF9OAd1GNnLWL9gSFD1_Q", // Seller avatar or generic placeholder
      content: firstGreeting.text,
      timestamp: "Just now",
      isOnline: true,
      unread: false,
      chats: [firstGreeting],
      itemId: itemId,
      itemTitle: itemTitle
    };

    setThreads(prev => [newThread, ...prev]);
    setDashboardThreadId(newThreadId);
    setDashboardTab('messages');
    setCurrentScreen('dashboard');

    // Simulate seller responding back in 2 seconds
    setTimeout(() => {
      const responseText = `Hello! Yes indeed, the "${itemTitle}" is still fully active and ready for trade. When would you be free to arrange delivery details?`;
      const responseMessage: ChatMessage = {
        sender: 'seller',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setThreads(prev => prev.map(t => {
        if (t.id === newThreadId) {
          return {
            ...t,
            unread: true,
            content: responseText,
            timestamp: "1m ago",
            chats: [...t.chats, responseMessage]
          };
        }
        return t;
      }));
    }, 2000);
  };

  // Get active bookmarked items for the watchlist panel
  const favoritesList = allItems.filter(item => favorites.includes(item.id));

  return (
    <div className="mesh-bg min-h-screen text-on-surface flex flex-col justify-between" id="vendo-app-root">
      
      {/* Top Header Navigation */}
      <Header
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenChat={() => {
          setDashboardTab('messages');
          setCurrentScreen('dashboard');
        }}
        favoritesCount={favorites.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {currentScreen === 'home' && (
          <HomeView
            items={allItems}
            favorites={favorites}
            onLikeToggle={handleLikeToggle}
            onSelectItem={handleSelectItem}
            setCurrentScreen={setCurrentScreen}
            setSelectedCategory={setSelectedCategory}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentScreen === 'search' && (
          <ResultsView
            items={allItems}
            favorites={favorites}
            onLikeToggle={handleLikeToggle}
            onSelectItem={handleSelectItem}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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
            onClearFilters={handleClearFilters}
            setCurrentScreen={setCurrentScreen}
          />
        )}

        {currentScreen === 'detail' && selectedItem && (
          <ProductDetailView
            item={selectedItem}
            favorites={favorites}
            onLikeToggle={handleLikeToggle}
            onSelectItem={handleSelectItem}
            onBack={() => setCurrentScreen('search')}
            onContactSeller={handleContactSeller}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardView
            userListings={userListings}
            setUserListings={setUserListings}
            favoritesList={favoritesList}
            onLikeToggle={handleLikeToggle}
            onSelectItem={handleSelectItem}
            threads={threads}
            setThreads={setThreads}
            initialActiveTab={dashboardTab}
            initialActiveThreadId={dashboardThreadId || undefined}
            onOpenSellModal={() => setIsSellModalOpen(true)}
          />
        )}
      </main>

      {/* Footer Details */}
      <Footer 
        setCurrentScreen={setCurrentScreen}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Sell Modal Layer */}
      <CreateListingModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onSubmitListing={handleSubmitListing}
      />

    </div>
  );
}
