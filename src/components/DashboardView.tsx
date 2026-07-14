import React, { useState, useEffect, useRef } from 'react';
import { Package, MessageSquare, Heart, BarChart3, Star, MapPin, Eye, Search, Send, CheckCircle, TrendingUp, Sparkles, Trash2, ArrowUpRight } from 'lucide-react';
import { Item, MessageThread, ChatMessage } from '../types';

interface DashboardViewProps {
  userListings: Item[];
  setUserListings: React.Dispatch<React.SetStateAction<Item[]>>;
  favoritesList: Item[];
  onLikeToggle: (id: string, e: React.MouseEvent) => void;
  onSelectItem: (id: string) => void;
  threads: MessageThread[];
  setThreads: React.Dispatch<React.SetStateAction<MessageThread[]>>;
  initialActiveTab?: 'listings' | 'messages' | 'favorites' | 'stats';
  initialActiveThreadId?: string;
  onOpenSellModal: () => void;
}

export default function DashboardView({
  userListings,
  setUserListings,
  favoritesList,
  onLikeToggle,
  onSelectItem,
  threads,
  setThreads,
  initialActiveTab = 'listings',
  initialActiveThreadId,
  onOpenSellModal
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'messages' | 'favorites' | 'stats'>(initialActiveTab);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(initialActiveThreadId || null);
  const [typedMessage, setTypedMessage] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Synchronise state triggers
  useEffect(() => {
    setActiveTab(initialActiveTab);
    if (initialActiveThreadId) {
      setActiveThreadId(initialActiveThreadId);
    }
  }, [initialActiveTab, initialActiveThreadId]);

  // Scroll to bottom of chat whenever active thread or chat length changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeThreadId, threads]);

  const activeThread = threads.find(t => t.id === activeThreadId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeThreadId) return;

    const newMessage: ChatMessage = {
      sender: 'user',
      text: typedMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update messages local thread
    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          content: typedMessage,
          timestamp: 'Just now',
          chats: [...t.chats, newMessage]
        };
      }
      return t;
    }));

    setTypedMessage('');

    // Simulate automatic reply
    setTimeout(() => {
      const replies = [
        "That sounds perfect! Let's arrange a time to meet up.",
        "Excellent! I can make the transfer as soon as you confirm.",
        "Could you do a minor discount, or is the price strictly firm?",
        "Perfect, thank you! I am ready to purchase."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const autoReplyMessage: ChatMessage = {
        sender: 'seller',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setThreads(prev => prev.map(t => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            unread: true,
            content: randomReply,
            timestamp: '1m ago',
            chats: [...t.chats, autoReplyMessage]
          };
        }
        return t;
      }));
    }, 1500);
  };

  const toggleListingStatus = (id: string, newStatus: 'active' | 'pending' | 'sold') => {
    setUserListings(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
          viewsCount: newStatus === 'sold' ? 'Completed' : item.viewsCount
        };
      }
      return item;
    }));
  };

  const handleDeleteListing = (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      setUserListings(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="px-6 py-6 w-full max-w-7xl mx-auto space-y-8 text-left" id="dashboard-view-root">
      
      {/* Profile Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Left side details */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/40 p-1 relative shrink-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj8fps8xXUAP-gf8NlKJbIAymke-0BFVmtA4hg4YkrjvSKEpVlyivthUBjB-OIwBKmV2Peww9vbPKSVMijhHKCxNvPEYyE-OW4uciBnxOTsALIT2HeqMUk8VnHj7KPSzL4YNOp1Vu5fWDYxAkYSpv_4amoumJGwDvPPOPURhpfzNt5WHw1v5J_IJ4eBmbnYhhprjlnv2jT-YWHFhJk9Z76qSe6gy4ayqGb0VXT6QkLhCJYM_giBm7pTw" 
              alt="User Store avatar" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 justify-center sm:justify-start">
              <span>Audio Enthusiast Store</span>
              <CheckCircle className="w-5 h-5 fill-primary text-black" title="Verified Professional Seller" />
            </h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-on-surface-variant font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary" /> San Francisco, CA
              </span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full"></span>
              <span>Joined March 2021</span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full"></span>
              <span className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current mr-0.5" /> 4.9 (248 reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Right side stats action */}
        <button 
          onClick={onOpenSellModal}
          className="w-full md:w-auto bg-primary text-on-primary font-black px-6 py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all text-sm text-center cursor-pointer"
        >
          Create New Listing
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-white/5 overflow-x-auto no-scrollbar gap-2 sm:gap-6" id="dashboard-tabs">
        <button
          onClick={() => setActiveTab('listings')}
          className={`flex items-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'listings'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Listings</span>
          <span className="text-xs bg-white/5 py-0.5 px-2 rounded-full">{userListings.length}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('messages');
            // Select first thread by default if none is selected
            if (!activeThreadId && threads.length > 0) {
              setActiveThreadId(threads[0].id);
            }
          }}
          className={`flex items-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'messages'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Message Center</span>
          {threads.some(t => t.unread) && (
            <span className="w-2 h-2 bg-primary rounded-full"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'favorites'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Watchlist</span>
          <span className="text-xs bg-white/5 py-0.5 px-2 rounded-full">{favoritesList.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'stats'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics Insights</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="w-full">
        
        {/* PANEL: Listings */}
        {activeTab === 'listings' && (
          <div className="space-y-6" id="panel-listings">
            {userListings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {userListings.map((item) => (
                  <div 
                    key={item.id}
                    className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 hover:border-white/15 transition-all duration-300"
                  >
                    {/* Item Details */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full sm:w-auto">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-white/5 shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <span className={`text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${
                          item.status === 'active' 
                            ? 'border-emerald-500/20 text-emerald-400 bg-emerald-950/10' 
                            : item.status === 'pending'
                            ? 'border-amber-500/20 text-amber-400 bg-amber-950/10'
                            : 'border-white/10 text-on-surface-variant bg-slate-900'
                        }`}>
                          {item.status}
                        </span>
                        <h4 className="font-extrabold text-white text-base leading-snug line-clamp-1">{item.title}</h4>
                        <div className="text-xs text-on-surface-variant font-semibold flex items-center gap-3 justify-center sm:justify-start">
                          <span className="text-white font-bold">{item.priceFormatted}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.viewsCount}</span>
                          <span>•</span>
                          <span>{item.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center">
                      {item.status !== 'active' && (
                        <button
                          onClick={() => toggleListingStatus(item.id, 'active')}
                          className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/10 font-bold text-xs rounded-xl transition-all cursor-pointer"
                        >
                          Activate
                        </button>
                      )}
                      {item.status !== 'pending' && item.status !== 'sold' && (
                        <button
                          onClick={() => toggleListingStatus(item.id, 'pending')}
                          className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/10 font-bold text-xs rounded-xl transition-all cursor-pointer"
                        >
                          Set Pending
                        </button>
                      )}
                      {item.status !== 'sold' && (
                        <button
                          onClick={() => toggleListingStatus(item.id, 'sold')}
                          className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/10 font-bold text-xs rounded-xl transition-all cursor-pointer"
                        >
                          Mark Sold
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteListing(item.id)}
                        className="p-2 bg-white/5 border border-white/5 hover:bg-rose-950/20 hover:border-rose-500/30 text-on-surface-variant hover:text-rose-400 rounded-xl transition-all cursor-pointer"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
                <span className="text-3xl">📦</span>
                <h4 className="font-bold text-white text-base">No active specimens listed</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Start creating listings to showcase your items in our high-end index.
                </p>
                <button
                  onClick={onOpenSellModal}
                  className="bg-primary text-on-primary font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Create Listing
                </button>
              </div>
            )}
          </div>
        )}

        {/* PANEL: Messages & Live Chats */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]" id="panel-messages">
            
            {/* Thread list (Left) */}
            <div className="lg:col-span-4 glass-card rounded-2xl overflow-y-auto divide-y divide-white/5 h-full">
              {threads.length > 0 ? (
                threads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => {
                      setActiveThreadId(thread.id);
                      // Clear unread indicator
                      setThreads(prev => prev.map(t => t.id === thread.id ? { ...t, unread: false } : t));
                    }}
                    className={`w-full text-left p-4 transition-all flex items-start gap-3 cursor-pointer ${
                      activeThreadId === thread.id
                        ? 'bg-white/5 border-l-4 border-primary'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img src={thread.senderAvatar} alt={thread.senderName} className="w-10 h-10 rounded-full object-cover" />
                      {thread.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-surface rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white truncate">{thread.senderName}</span>
                        <span className="text-[10px] text-on-surface-variant font-medium">{thread.timestamp}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant truncate font-medium">
                        {thread.content}
                      </p>
                      {thread.itemTitle && (
                        <div className="text-[10px] bg-white/5 border border-white/5 rounded px-1.5 py-0.5 inline-block text-primary font-bold truncate max-w-full">
                          Discussing: {thread.itemTitle}
                        </div>
                      )}
                    </div>
                    {thread.unread && (
                      <span className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 mt-2 shadow-[0_0_8px_#7dd3fc]"></span>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-on-surface-variant space-y-2">
                  <span className="text-2xl">💬</span>
                  <p className="text-xs font-bold">No message threads found</p>
                </div>
              )}
            </div>

            {/* Active chat window (Right) */}
            <div className="lg:col-span-8 glass-card rounded-2xl flex flex-col h-full overflow-hidden">
              {activeThread ? (
                <>
                  {/* Chat header */}
                  <div className="px-5 py-3.5 bg-slate-950/40 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <img src={activeThread.senderAvatar} alt={activeThread.senderName} className="w-10 h-10 rounded-full object-cover" />
                      <div className="text-left">
                        <h4 className="font-bold text-sm text-white">{activeThread.senderName}</h4>
                        <span className="text-[10px] text-emerald-400 font-bold">
                          {activeThread.isOnline ? "Active now" : "Offline"}
                        </span>
                      </div>
                    </div>
                    
                    {activeThread.itemTitle && (
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-on-surface-variant block">Subject Specimen:</span>
                        <span className="text-xs font-bold text-primary">{activeThread.itemTitle}</span>
                      </div>
                    )}
                  </div>

                  {/* Messages container */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/20">
                    {activeThread.chats.map((chat, idx) => {
                      const isUser = chat.sender === 'user';
                      return (
                        <div 
                          key={idx}
                          className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-xs space-y-1 ${
                            isUser 
                              ? 'bg-primary text-black rounded-tr-none font-medium' 
                              : 'bg-white/5 border border-white/10 text-on-surface rounded-tl-none leading-relaxed'
                          }`}>
                            <p className="whitespace-pre-wrap">{chat.text}</p>
                            <span className={`block text-[9px] text-right ${isUser ? 'text-black/60' : 'text-on-surface-variant'}`}>
                              {chat.time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={chatEndRef}></div>
                  </div>

                  {/* Chat text box */}
                  <form onSubmit={handleSendMessage} className="p-3 bg-slate-950/40 border-t border-white/5 flex gap-2 shrink-0">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={typedMessage}
                      onChange={(e) => setTypedMessage(e.target.value)}
                      className="flex-1 bg-[#111828]/60 border border-white/10 text-on-surface rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/30"
                    />
                    <button
                      type="submit"
                      className="p-2.5 bg-primary hover:bg-primary-hover text-black rounded-xl transition-all cursor-pointer shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-on-surface-variant space-y-3">
                  <MessageSquare className="w-12 h-12 text-white/10" />
                  <h4 className="font-bold text-white text-base">Select a Discussion</h4>
                  <p className="text-xs leading-relaxed max-w-xs mx-auto">
                    Choose a thread on the left to start live chats and coordinate listing negotiations instantly.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* PANEL: Favorites */}
        {activeTab === 'favorites' && (
          <div className="space-y-6" id="panel-favorites">
            {favoritesList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoritesList.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelectItem(item.id)}
                    className="glass-card hover:glass-card-elevated hover:scale-[1.02] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group cursor-pointer"
                  >
                    <div className="relative h-40 w-full bg-slate-900">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <button 
                        onClick={(e) => onLikeToggle(item.id, e)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center cursor-pointer shadow-md shadow-rose-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{item.category}</span>
                        <h4 className="font-bold text-sm text-white line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h4>
                      </div>
                      <div className="flex items-baseline justify-between border-t border-white/5 pt-2">
                        <span className="font-extrabold text-white text-base">{item.priceFormatted}</span>
                        <span className="text-[11px] text-on-surface-variant">{item.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
                <Heart className="w-12 h-12 text-rose-500 mx-auto" />
                <h4 className="font-bold text-white text-base">Watchlist is currently empty</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Bookmark specimens while browsing to keep track of premium opportunities effortlessly.
                </p>
              </div>
            )}
          </div>
        )}

        {/* PANEL: Analytics */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left" id="panel-analytics">
            {/* Sales Card */}
            <div className="glass-card p-5 rounded-2xl space-y-2 flex flex-col justify-between">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Est. Sales</span>
              <div className="space-y-1">
                <span className="text-2xl font-black text-white">₹1,64,900</span>
                <span className="text-[11px] text-emerald-400 font-bold block flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +12% this week
                </span>
              </div>
            </div>

            {/* Views Card */}
            <div className="glass-card p-5 rounded-2xl space-y-2 flex flex-col justify-between">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Catalogue Views</span>
              <div className="space-y-1">
                <span className="text-2xl font-black text-white">2,880</span>
                <span className="text-[11px] text-primary font-bold block">120 daily avg</span>
              </div>
            </div>

            {/* Message leads */}
            <div className="glass-card p-5 rounded-2xl space-y-2 flex flex-col justify-between">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Inquiries</span>
              <div className="space-y-1">
                <span className="text-2xl font-black text-white">3</span>
                <span className="text-[11px] text-tertiary font-bold block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> High buy intent
                </span>
              </div>
            </div>

            {/* Stars rating */}
            <div className="glass-card p-5 rounded-2xl space-y-2 flex flex-col justify-between">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Trust Score</span>
              <div className="space-y-1">
                <span className="text-2xl font-black text-white">4.9/5</span>
                <span className="text-[11px] text-amber-400 font-bold block flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> Top rated merchant
                </span>
              </div>
            </div>

            {/* Custom Visual Sparkline/Bars Chart */}
            <div className="md:col-span-4 glass-card p-6 rounded-3xl space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <h4 className="font-extrabold text-white text-base">Merchant Lead Funnel</h4>
                  <p className="text-xs text-on-surface-variant">Views compared against inquiry response loops</p>
                </div>
                <span className="text-xs bg-white/5 border border-white/15 px-3 py-1 rounded-lg text-primary font-semibold">
                  Last 30 Days
                </span>
              </div>

              {/* Graphic HTML layout charts */}
              <div className="space-y-4 pt-2">
                
                {/* Silver Ultrabook */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-white">
                    <span>Silver Ultrabook Pro M2</span>
                    <span className="text-primary">1,200 views / 4 inquiry threads (Healthy)</span>
                  </div>
                  <div className="w-full bg-[#111828]/50 h-3 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-gradient-to-r from-primary to-cyan-400 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Studio headphones */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-white">
                    <span>Noise-Canceling Studio Headphones</span>
                    <span className="text-tertiary">840 views / 2 inquiry threads (Active)</span>
                  </div>
                  <div className="w-full bg-[#111828]/50 h-3 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-gradient-to-r from-tertiary to-purple-400 h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                {/* Office chair */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-white">
                    <span>Ergonomic Office Chair</span>
                    <span className="text-on-surface-variant">Completed (100% Lead Match)</span>
                  </div>
                  <div className="w-full bg-[#111828]/50 h-3 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-[#e0e8f0]/40 h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
