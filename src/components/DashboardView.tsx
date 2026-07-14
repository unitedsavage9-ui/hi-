import React, { useState, useRef, useEffect } from 'react';
import { 
  List, 
  MessageSquare, 
  Heart, 
  Settings, 
  Eye, 
  CheckCircle, 
  Plus, 
  MoreVertical, 
  Lightbulb, 
  Sparkles,
  ArrowRight,
  Send,
  User,
  Shield,
  BellRing,
  Trash2,
  ExternalLink,
  Camera,
  Upload,
  RotateCw,
  Crop
} from 'lucide-react';
import { Listing, Message } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE_IMAGE } from '../data';

interface DashboardViewProps {
  listings: Listing[];
  messages: Message[];
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onOpenAddListing: () => void;
  onToggleListingStatus: (id: string, nextStatus: 'active' | 'pending' | 'sold') => void;
  onDeleteListing: (id: string) => void;
  profileImage: string;
  setProfileImage: (url: string) => void;
  profileName: string;
  setProfileName: (name: string) => void;
  profileEmail: string;
  setProfileEmail: (email: string) => void;
  profileBio: string;
  setProfileBio: (bio: string) => void;
}

export default function DashboardView({
  listings,
  messages: initialMessages,
  onToggleFavorite,
  onSelectListing,
  onOpenAddListing,
  onToggleListingStatus,
  onDeleteListing,
  profileImage,
  setProfileImage,
  profileName,
  setProfileName,
  profileEmail,
  setProfileEmail,
  profileBio,
  setProfileBio
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'messages' | 'favorites' | 'settings'>('listings');
  const [conversations, setConversations] = useState<Message[]>(initialMessages);
  const [activeChatId, setActiveChatId] = useState<string>('msg-1');
  const [chatMessages, setChatMessages] = useState<Record<string, { sender: 'me' | 'buyer', text: string, time: string }[]>>({
    'msg-1': [
      { sender: 'buyer', text: 'Hi, is the Silver Ultrabook Pro M2 still available?', time: '10:30 AM' },
      { sender: 'buyer', text: 'I can meet today in San Francisco or pay for courier.', time: '10:31 AM' }
    ],
    'msg-2': [
      { sender: 'buyer', text: 'What is the absolute lowest you would go for the headphones?', time: 'Yesterday' },
      { sender: 'me', text: 'Hi Marcus, they are practically brand new, so 350 is a very fair price.', time: 'Yesterday' },
      { sender: 'buyer', text: 'Great, thanks for the info! Let me think about it...', time: 'Yesterday' }
    ],
    'msg-3': [
      { sender: 'buyer', text: 'Would you accept ₹150 for the office chair?', time: '2h ago' }
    ]
  });
  const [replyText, setReplyText] = useState('');

  // User Settings states (bound to parent profile state)
  const [sellerName, setSellerName] = useState(profileName);
  const [sellerEmail, setSellerEmail] = useState(profileEmail);
  const [sellerBio, setSellerBio] = useState(profileBio);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(profileImage);
  const [pushEnabled, setPushEnabled] = useState(true);

  // Camera & Cropper states for profile image
  const [profileCameraActive, setProfileCameraActive] = useState(false);
  const [rawProfilePhoto, setRawProfilePhoto] = useState<string | null>(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropRotation, setCropRotation] = useState(0);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);

  const profileVideoRef = useRef<HTMLVideoElement | null>(null);
  const profileStreamRef = useRef<MediaStream | null>(null);

  const startProfileCamera = async () => {
    try {
      if (profileStreamRef.current) {
        profileStreamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      profileStreamRef.current = stream;
      setProfileCameraActive(true);
      setTimeout(() => {
        if (profileVideoRef.current) {
          profileVideoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      alert("Could not access front camera. Please verify permission settings in your web browser.");
    }
  };

  const stopProfileCamera = () => {
    if (profileStreamRef.current) {
      profileStreamRef.current.getTracks().forEach(t => t.stop());
      profileStreamRef.current = null;
    }
    setProfileCameraActive(false);
  };

  const captureProfileSnapshot = () => {
    if (profileVideoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = profileVideoRef.current.videoWidth || 400;
      canvas.height = profileVideoRef.current.videoHeight || 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(profileVideoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setRawProfilePhoto(dataUrl);
        setCropZoom(1);
        setCropRotation(0);
        setCropX(0);
        setCropY(0);
        stopProfileCamera();
      }
    }
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setRawProfilePhoto(reader.result);
          setCropZoom(1);
          setCropRotation(0);
          setCropX(0);
          setCropY(0);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCroppedAvatar = () => {
    if (!rawProfilePhoto) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = rawProfilePhoto;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 250;
      canvas.height = 250;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0a0e1a';
        ctx.fillRect(0, 0, 250, 250);

        ctx.save();
        ctx.translate(125, 125);
        ctx.rotate((cropRotation * Math.PI) / 180);
        ctx.scale(cropZoom, cropZoom);
        
        const scale = Math.max(250 / img.width, 250 / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        
        ctx.drawImage(img, -w/2 + cropX, -h/2 + cropY, w, h);
        ctx.restore();

        const croppedUrl = canvas.toDataURL('image/jpeg', 0.9);
        setSelectedAvatarUrl(croppedUrl);
        setRawProfilePhoto(null);
        alert("Dynamic circular crop applied successfully! Make sure to save settings to synchronize your public Vendo profile!");
      }
    };
  };

  useEffect(() => {
    return () => {
      if (profileStreamRef.current) {
        profileStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Filter listings owned by the user
  const userListings = listings.filter(l => l.owner === 'user');
  const favoritedListings = listings.filter(l => l.isFavorite);

  // Statistics
  const totalViewsNum = 12482;
  const activeChatsNum = conversations.length;
  const itemsSoldNum = userListings.filter(l => l.status === 'sold').length + 39; // add some legacy sold items

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim() === '') return;

    // Add to chat messages
    const newMsg = { sender: 'me' as const, text: replyText, time: 'Just now' };
    setChatMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg]
    }));

    // Update conversation preview text
    setConversations(prev => prev.map(conv => {
      if (conv.id === activeChatId) {
        return {
          ...conv,
          message: replyText,
          time: 'Just now',
          unread: false
        };
      }
      return conv;
    }));

    setReplyText('');
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-emerald-400/20">
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="bg-amber-500/80 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-amber-400/20">
            Pending
          </span>
        );
      case 'sold':
        return (
          <span className="bg-slate-700/80 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-slate-600/20">
            Sold Out
          </span>
        );
      default:
        return null;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const activeConversation = conversations.find(c => c.id === activeChatId);

  return (
    <div className="w-full pb-12">
      <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-140px)]">
        
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0 glass-sidebar rounded-2xl md:bg-transparent md:border-r-0 md:backdrop-blur-none md:p-0 flex flex-col gap-6">
          <div className="p-4 md:p-0">
            <h2 className="text-xs uppercase tracking-widest text-on-surface-variant/70 px-3 mb-4 font-bold">
              Dashboard
            </h2>
            <nav className="flex flex-col gap-1.5">
              <button
                onClick={() => setActiveTab('listings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  activeTab === 'listings'
                    ? 'bg-primary/10 text-primary border border-primary/20 font-bold'
                    : 'text-on-surface-variant hover:bg-white/5 border border-transparent'
                }`}
              >
                <List className="w-4.5 h-4.5" />
                <span className="text-sm">My Listings</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  activeTab === 'messages'
                    ? 'bg-primary/10 text-primary border border-primary/20 font-bold'
                    : 'text-on-surface-variant hover:bg-white/5 border border-transparent'
                }`}
              >
                <MessageSquare className="w-4.5 h-4.5" />
                <span className="text-sm flex-1">Messages</span>
                {conversations.some(c => c.unread) && (
                  <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#00b4ff]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('favorites')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  activeTab === 'favorites'
                    ? 'bg-primary/10 text-primary border border-primary/20 font-bold'
                    : 'text-on-surface-variant hover:bg-white/5 border border-transparent'
                }`}
              >
                <Heart className="w-4.5 h-4.5" />
                <span className="text-sm">Favorites</span>
                {favoritedListings.length > 0 && (
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                    {favoritedListings.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  activeTab === 'settings'
                    ? 'bg-primary/10 text-primary border border-primary/20 font-bold'
                    : 'text-on-surface-variant hover:bg-white/5 border border-transparent'
                }`}
              >
                <Settings className="w-4.5 h-4.5" />
                <span className="text-sm">Settings</span>
              </button>
            </nav>
          </div>

          {/* Premium Badge at Bottom of Sidebar */}
          <div className="mt-auto p-5 glass-card rounded-2xl border border-white/5 bg-[#0f1524]/20 mx-4 md:mx-0">
            <p className="text-xs font-bold text-primary/90 uppercase tracking-wider">
              Premium Member
            </p>
            <div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-primary w-[75%] h-full shadow-[0_0_10px_#00b4ff]"></div>
            </div>
            <p className="text-[11px] text-on-surface-variant/70 mt-2 font-medium">
              75% to Platinum Seller
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1">
          
          {/* Stats Header (Only shown on Listings & Dashboard Main view) */}
          {activeTab === 'listings' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-5 rounded-2xl flex items-center justify-between group hover:border-primary/25 transition-all duration-300">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1.5">
                    Total Views
                  </p>
                  <h3 className="text-2xl font-black text-primary tracking-tight">
                    {totalViewsNum.toLocaleString()}
                  </h3>
                </div>
                <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform duration-300">
                  <Eye className="text-primary w-5 h-5" />
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl flex items-center justify-between group hover:border-primary/25 transition-all duration-300">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1.5">
                    Active Chats
                  </p>
                  <h3 className="text-2xl font-black text-primary tracking-tight">
                    {activeChatsNum}
                  </h3>
                </div>
                <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform duration-300">
                  <MessageSquare className="text-primary w-5 h-5" />
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl flex items-center justify-between group hover:border-primary/25 transition-all duration-300">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1.5">
                    Items Sold
                  </p>
                  <h3 className="text-2xl font-black text-primary tracking-tight">
                    {itemsSoldNum}
                  </h3>
                </div>
                <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform duration-300">
                  <CheckCircle className="text-primary w-5 h-5" />
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENTS */}
          <AnimatePresence mode="wait">
            
            {/* TAB: My Listings (Bento Grid Style) */}
            {activeTab === 'listings' && (
              <motion.div
                key="tab-listings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Active user items column */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-on-surface tracking-tight">
                      My Active Listings
                    </h2>
                    <span className="text-xs text-on-surface-variant bg-white/5 border border-white/5 px-2.5 py-1 rounded-full font-semibold">
                      {userListings.length} Total
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* List actual user products */}
                    {userListings.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectListing(item)}
                        className={`glass-card rounded-2xl overflow-hidden group hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] border border-white/5 hover:border-primary/20 transition-all duration-300 cursor-pointer flex flex-col ${
                          item.status === 'sold' ? 'opacity-70 hover:opacity-100' : ''
                        }`}
                      >
                        <div className="relative h-48 overflow-hidden bg-slate-900/40">
                          <img
                            src={item.image}
                            alt={item.title}
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                              item.status === 'sold' ? 'grayscale opacity-40' : ''
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/80 via-transparent to-transparent"></div>
                          
                          <div className="absolute top-3 right-3">
                            {getStatusBadge(item.status)}
                          </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1 relative bg-[#0f1524]/20">
                          <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                            {item.title}
                          </h4>
                          
                          <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                            <span className="text-base font-black text-primary">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-xs text-on-surface-variant font-medium">
                              {item.status === 'sold' ? 'Completed' : (item.views ? `${item.views} views` : '0 views')}
                            </span>
                          </div>

                          {/* Quick Admin Actions */}
                          <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/5 pt-3">
                            {item.status !== 'sold' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleListingStatus(item.id, 'sold');
                                }}
                                className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg hover:bg-emerald-500 hover:text-background font-bold transition-all"
                              >
                                Mark Sold
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm("Are you sure you want to delete this listing?")) {
                                  onDeleteListing(item.id);
                                }
                              }}
                              className="text-[11px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-1 rounded-lg hover:bg-rose-500 hover:text-white font-bold transition-all flex items-center gap-1"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Create New Listing Placeholder box */}
                    <div
                      onClick={onOpenAddListing}
                      className="border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center p-6 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all cursor-pointer min-h-[260px] group text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,180,255,0.25)]">
                        <Plus className="text-primary w-7 h-7" />
                      </div>
                      <p className="text-sm font-black text-primary/90 mb-1">Create New Listing</p>
                      <p className="text-xs text-on-surface-variant/70 max-w-[180px] leading-relaxed">
                        Instantly list premium gear on Vendo's luxury stream
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right columns messages and tips */}
                <div className="flex flex-col gap-6">
                  {/* Messages panel preview */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-black text-on-surface tracking-tight">
                        Recent Messages
                      </h2>
                      <button 
                        onClick={() => setActiveTab('messages')}
                        className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
                      >
                        <span>Inbox</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5 bg-[#0f1524]/10 border border-white/5">
                      {conversations.slice(0, 3).map((conv) => (
                        <div
                          key={conv.id}
                          onClick={() => {
                            setActiveChatId(conv.id);
                            setActiveTab('messages');
                          }}
                          className="p-4 hover:bg-white/5 transition-colors cursor-pointer group flex items-start gap-3"
                        >
                          <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 ring-2 ring-primary/5">
                              <img src={conv.avatar} alt={conv.sender} className="w-full h-full object-cover" />
                            </div>
                            {conv.unread && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0e1a] rounded-full shadow-[0_0_5px_#22c55e]"></span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                              <h5 className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                                {conv.sender}
                              </h5>
                              <span className="text-[9px] text-on-surface-variant/60 font-semibold">{conv.time}</span>
                            </div>
                            <p className={`text-xs truncate ${conv.unread ? 'text-on-surface font-semibold' : 'text-on-surface-variant/80'}`}>
                              {conv.message}
                            </p>
                          </div>
                        </div>
                      ))}

                      <button 
                        onClick={() => setActiveTab('messages')}
                        className="w-full py-3 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/15 transition-all text-center border-t border-white/5"
                      >
                        Open Message Center
                      </button>
                    </div>
                  </div>

                  {/* Quick tips panel */}
                  <div className="glass-card p-5 rounded-2xl border border-primary/10">
                    <h4 className="text-xs font-bold text-on-surface flex items-center gap-2 mb-4">
                      <Lightbulb className="text-primary w-4 h-4" />
                      <span>Quick Tips</span>
                    </h4>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
                          <Sparkles className="text-indigo-400 w-4 h-4" />
                        </div>
                        <p className="text-xs leading-relaxed text-on-surface-variant/90">
                          Listings with 5+ photos sell <span className="text-primary font-bold">40% faster</span>. Use direct professional studio setups.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                          <Eye className="text-primary w-4 h-4" />
                        </div>
                        <p className="text-xs leading-relaxed text-on-surface-variant/90">
                          Respond to chats within 15 mins to boost your seller ranking by up to <span className="text-primary font-bold">30%</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: Message Center (Interactive Messenger) */}
            {activeTab === 'messages' && (
              <motion.div
                key="tab-messages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row h-[550px] bg-[#0f1524]/30"
              >
                {/* Chat users selection sidebar (Left pane) */}
                <div className="w-full lg:w-80 border-r border-white/5 flex flex-col h-full bg-[#0a0e1a]/20">
                  <div className="p-4 border-b border-white/5">
                    <h3 className="text-sm font-black text-on-surface">Inbox conversations</h3>
                    <p className="text-[11px] text-on-surface-variant">Click to respond instantly</p>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto scrollbar-hide">
                    {conversations.map((conv) => {
                      const isActive = conv.id === activeChatId;
                      return (
                        <div
                          key={conv.id}
                          onClick={() => {
                            setActiveChatId(conv.id);
                            // Mark read
                            setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: false } : c));
                          }}
                          className={`p-4 hover:bg-white/5 transition-all cursor-pointer flex items-start gap-3 border-b border-white/5/30 ${
                            isActive ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                          }`}
                        >
                          <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                              <img src={conv.avatar} alt={conv.sender} className="w-full h-full object-cover" />
                            </div>
                            {conv.unread && (
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-background rounded-full"></span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <h5 className={`text-xs truncate ${isActive ? 'text-primary font-bold' : 'text-on-surface font-semibold'}`}>
                                {conv.sender}
                              </h5>
                              <span className="text-[9px] text-on-surface-variant/60 font-semibold">{conv.time}</span>
                            </div>
                            <p className="text-xs text-on-surface-variant truncate">
                              {conv.message}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Main active conversation pane (Right pane) */}
                <div className="flex-1 flex flex-col h-full relative">
                  {activeConversation ? (
                    <>
                      {/* Active conversation Header */}
                      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-surface-container/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
                            <img src={activeConversation.avatar} alt={activeConversation.sender} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-on-surface">{activeConversation.sender}</h4>
                            <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
                              <span>Active negotiator</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            Verified Buyer
                          </span>
                        </div>
                      </div>

                      {/* Chat messages viewport */}
                      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide space-y-4">
                        {(chatMessages[activeChatId] || []).map((m, i) => {
                          const isMe = m.sender === 'me';
                          return (
                            <div
                              key={i}
                              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                  isMe
                                    ? 'bg-primary text-background font-medium rounded-tr-none'
                                    : 'bg-surface-container-high/60 backdrop-blur border border-white/5 text-on-surface rounded-tl-none'
                                }`}
                              >
                                <p>{m.text}</p>
                                <span className={`block text-[9px] mt-1.5 text-right ${
                                  isMe ? 'text-slate-900/60' : 'text-on-surface-variant/50'
                                }`}>
                                  {m.time}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Chat interactive replies box */}
                      <form
                        onSubmit={handleSendReply}
                        className="p-4 border-t border-white/5 flex items-center gap-3 bg-[#0f1524]/40"
                      >
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Reply to ${activeConversation.sender}...`}
                          className="flex-1 bg-[#0a0e1a]/60 border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-on-surface-variant/30"
                        />
                        <button
                          type="submit"
                          className="w-10 h-10 shrink-0 bg-primary hover:brightness-110 text-background rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                      <p className="text-on-surface-variant text-sm">Select a conversation to start chatting.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB: Favorites Grid */}
            {activeTab === 'favorites' && (
              <motion.div
                key="tab-favorites"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-on-surface tracking-tight">
                    My Favorites
                  </h2>
                  <span className="text-xs text-on-surface-variant bg-white/5 border border-white/5 px-2.5 py-1 rounded-full font-semibold">
                    {favoritedListings.length} Saved Items
                  </span>
                </div>

                {favoritedListings.length === 0 ? (
                  <div className="glass-card p-12 rounded-2xl text-center border border-white/5 max-w-md mx-auto">
                    <Heart className="w-10 h-10 text-primary/40 mx-auto mb-4" />
                    <p className="text-base font-bold text-on-surface mb-2">Your Favorites list is empty</p>
                    <p className="text-xs text-on-surface-variant/80 mb-6">
                      Tap the heart icon on any product in the Vendo marketplace to save it here for easy reference.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoritedListings.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectListing(item)}
                        className="glass-card rounded-2xl overflow-hidden p-1.5 border border-white/5 hover:border-primary/20 hover:scale-[1.01] transition-all duration-300 cursor-pointer flex flex-col"
                      >
                        <div className="relative h-44 rounded-xl overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(item.id);
                            }}
                            className="absolute top-2.5 right-2.5 p-2 bg-primary text-background rounded-full hover:brightness-110 transition-colors shadow"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                          <h4 className="font-bold text-sm text-on-surface line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-on-surface-variant mt-1">{item.location}</p>
                          
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
                            <span className="text-primary font-bold text-sm">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-[10px] text-on-surface-variant/60 uppercase font-bold">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB: Settings Profile Panel */}
            {activeTab === 'settings' && (
              <motion.div
                key="tab-settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <h2 className="text-xl font-black text-on-surface tracking-tight mb-4">
                  Account Settings
                </h2>

                <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
                  {/* Avatar Selector */}
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white/5 border border-white/5 rounded-2xl">
                      {/* Avatar Live Display */}
                      <div className="relative group shrink-0">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/60 ring-4 ring-primary/10 shadow-lg">
                          <img src={selectedAvatarUrl} alt="Profile Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-primary text-background p-1.5 rounded-full shadow border border-[#0a0e1a]">
                          <Camera className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Main Interactive Selectors */}
                      <div className="flex-1 space-y-3 text-center md:text-left w-full">
                        <h4 className="text-sm font-bold text-on-surface">Seller Profile Avatar</h4>
                        <p className="text-xs text-on-surface-variant/80">
                          Take a fresh profile snapshot with your web camera, upload any image file from your computer, or choose from our studio presets.
                        </p>

                        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                          <button
                            type="button"
                            onClick={profileCameraActive ? stopProfileCamera : startProfileCamera}
                            className={`py-2 px-3.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                              profileCameraActive 
                                ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' 
                                : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
                            }`}
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>{profileCameraActive ? 'Turn Off Camera' : 'Snap Live Photo'}</span>
                          </button>

                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleProfilePhotoUpload}
                              className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                            />
                            <button
                              type="button"
                              className="py-2 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-on-surface hover:bg-white/10 font-bold transition-all flex items-center gap-2"
                            >
                              <Upload className="w-3.5 h-3.5 text-primary" />
                              <span>Upload Photo</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live webcam feed drawer */}
                    {profileCameraActive && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-[#0a0e1a] rounded-2xl border border-primary/25 p-4 space-y-3"
                      >
                        <div className="relative w-full max-w-sm mx-auto h-56 rounded-xl overflow-hidden bg-black border border-white/5">
                          <video 
                            ref={profileVideoRef} 
                            autoPlay 
                            playsInline 
                            className="w-full h-full object-cover scale-x-[-1]" 
                          />
                          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                            <button
                              type="button"
                              onClick={captureProfileSnapshot}
                              className="bg-primary hover:brightness-110 text-background font-black text-xs px-4 py-2 rounded-lg flex items-center gap-1 shadow-md cursor-pointer"
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <span>Take Snapshot</span>
                            </button>
                            <button
                              type="button"
                              onClick={stopProfileCamera}
                              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Circular Cropper Sandbox */}
                    {rawProfilePhoto && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0a0e1a]/80 backdrop-blur-md rounded-2xl border border-primary/20 p-5 space-y-5"
                      >
                        <div className="text-center">
                          <h5 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-1.5">
                            <Crop className="w-4 h-4 text-primary animate-pulse" />
                            <span>Vendo Avatar Cropper Sandbox</span>
                          </h5>
                          <p className="text-[10px] text-on-surface-variant/80 mt-1">
                            Drag sliders below to zoom, rotate, and center your avatar cleanly inside the circular preview template.
                          </p>
                        </div>

                        {/* Interactive Circle Cutout Viewport */}
                        <div className="flex justify-center py-2">
                          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/50 shadow-[0_0_20px_rgba(0,180,255,0.15)] bg-slate-900 flex items-center justify-center">
                            <img
                              src={rawProfilePhoto}
                              alt="Raw Upload"
                              className="max-w-none origin-center"
                              style={{
                                transform: `rotate(${cropRotation}deg) scale(${cropZoom}) translate(${cropX}px, ${cropY}px)`,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                            {/* Visual center helper overlay */}
                            <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-full" />
                          </div>
                        </div>

                        {/* Sliders Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                          {/* Zoom */}
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase">
                              <span>Zoom Scale</span>
                              <span className="text-primary font-mono">{cropZoom.toFixed(1)}x</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="3"
                              step="0.1"
                              value={cropZoom}
                              onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                              className="w-full accent-primary bg-white/5 h-1 rounded-lg cursor-pointer"
                            />
                          </div>

                          {/* Rotate */}
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase">
                              <span>Rotation</span>
                              <span className="text-primary font-mono">{cropRotation}°</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="360"
                              step="5"
                              value={cropRotation}
                              onChange={(e) => setCropRotation(parseInt(e.target.value))}
                              className="w-full accent-primary bg-white/5 h-1 rounded-lg cursor-pointer"
                            />
                          </div>

                          {/* Pan X */}
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase">
                              <span>Horizontal Offset</span>
                              <span className="text-primary font-mono">{cropX}px</span>
                            </div>
                            <input
                              type="range"
                              min="-100"
                              max="100"
                              step="2"
                              value={cropX}
                              onChange={(e) => setCropX(parseInt(e.target.value))}
                              className="w-full accent-primary bg-white/5 h-1 rounded-lg cursor-pointer"
                            />
                          </div>

                          {/* Pan Y */}
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase">
                              <span>Vertical Offset</span>
                              <span className="text-primary font-mono">{cropY}px</span>
                            </div>
                            <input
                              type="range"
                              min="-100"
                              max="100"
                              step="2"
                              value={cropY}
                              onChange={(e) => setCropY(parseInt(e.target.value))}
                              className="w-full accent-primary bg-white/5 h-1 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={handleApplyCroppedAvatar}
                            className="bg-primary hover:brightness-110 text-background font-black text-xs px-5 py-2 rounded-xl flex items-center gap-1 shadow cursor-pointer"
                          >
                            <Crop className="w-4 h-4" />
                            <span>Apply Circular Crop</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setRawProfilePhoto(null)}
                            className="bg-white/5 hover:bg-white/10 text-on-surface font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                          >
                            Discard
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Stock Presets Dropdown */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] text-on-surface-variant/70 font-black uppercase tracking-widest">
                        Or Pick Studio Preset Avatar:
                      </span>
                      <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-hide">
                        {[
                          { name: 'Male 1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3wZFi05fnxt1VJDmk4BzJDkdziAuLOaIwTu6cIh89ekIQe6NTefYvMucZDBv02ZxlYU2L0CJ4gy9Ck-_-RpYnSm0XV77mQDQaZfSVEfeKYTGnzTFIdhqUfNn_3SZ1WxlfwCBEnjrvLg_j73e5jVf8Wy83yqJ56Ose3VSG8gEpq_ScQNTkpWIew_NBu8bN_4kEYVwNk_nFyU9zIc_mDfc4F4iKKsnxSWLN9YURfKNs4f3vFsc5_VmiFg' },
                          { name: 'Female 1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj8fps8xXUAP-gf8NlKJbIAymke-0BFVmtA4hg4YkrjvSKEpVlyivthUBjB-OIwBKmV2Peww9vbPKSVMijhHKCxNvPEYyE-OW4uciBnxOTsALIT2HeqMUk8VnHj7KPSzL4YNOp1Vu5fWDYxAkYSpv_4amoumJGwDvPPOPURhpfzNt5WHw1v5J_IJ4eBmbnYhhprjlnv2jT-YWHFhJk9Z76qSe6gy4ayqGb0VXT6QkLhCJYM_giBm7pTw' },
                          { name: 'Male 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
                          { name: 'Female 2', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
                          { name: 'Designer', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' },
                          { name: 'Developer', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150' }
                        ].map((preset, idx) => {
                          const isSelected = selectedAvatarUrl === preset.url;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedAvatarUrl(preset.url)}
                              className={`w-11 h-11 rounded-full overflow-hidden border-2 shrink-0 transition-all ${
                                isSelected ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-white/10 hover:border-white/30'
                              }`}
                              title={preset.name}
                            >
                              <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom URL Input (Compact) */}
                    <div className="flex flex-col gap-1.5 pt-1.5">
                      <label className="text-[10px] text-primary font-bold uppercase tracking-wider">Custom Image URL Link</label>
                      <input
                        type="url"
                        value={selectedAvatarUrl}
                        onChange={(e) => setSelectedAvatarUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-on-surface-variant/25"
                      />
                    </div>
                  </div>

                  {/* Profile inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-primary font-bold uppercase tracking-wider">
                        Public Username
                      </label>
                      <input
                        type="text"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-primary font-bold uppercase tracking-wider">
                        Linked Email Address
                      </label>
                      <input
                        type="email"
                        value={sellerEmail}
                        onChange={(e) => setSellerEmail(e.target.value)}
                        className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs text-primary font-bold uppercase tracking-wider">
                        Seller Biography (Bio)
                      </label>
                      <textarea
                        value={sellerBio}
                        onChange={(e) => setSellerBio(e.target.value)}
                        rows={3}
                        className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Notification Switches */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Preferences</h4>
                    
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <p className="text-xs font-bold text-on-surface">Enable Real-Time Chat Notifications</p>
                        <p className="text-[10px] text-on-surface-variant/80">Get immediate alerts when buyers ask about your items.</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={pushEnabled}
                        onChange={(e) => setPushEnabled(e.target.checked)}
                        className="rounded border-outline-variant bg-surface-container/40 text-primary focus:ring-primary" 
                      />
                    </label>
                  </div>

                  <button
                    onClick={() => {
                      setProfileImage(selectedAvatarUrl);
                      setProfileName(sellerName);
                      setProfileEmail(sellerEmail);
                      setProfileBio(sellerBio);
                      alert("Your seller profile avatar, name, and bio have been successfully synchronized across the entire Vendo platform!");
                    }}
                    className="w-full bg-primary text-background font-bold py-3 rounded-xl hover:brightness-110 transition-all duration-200 shadow-md text-sm cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
