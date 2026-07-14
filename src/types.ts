export interface Seller {
  name: string;
  avatar: string;
  joinedDate: string;
  rating: number;
  reviewsCount: number;
  isVerified?: boolean;
}

export interface Item {
  id: string;
  title: string;
  price: number; // For sorting and comparisons
  priceFormatted: string; // E.g. "₹2,90,000"
  location: string;
  timeAgo: string;
  category: 'Electronics' | 'Property' | 'Vehicles' | 'Jobs';
  imageUrl: string;
  description: string;
  specs: Record<string, string>;
  seller: Seller;
  condition: 'New' | 'Refurbished' | 'Used';
  likesCount: number;
  viewsCount: string;
  status: 'active' | 'pending' | 'sold';
  isFeatured?: boolean;
  isNewTag?: boolean;
}

export interface ChatMessage {
  sender: 'user' | 'seller';
  text: string;
  time: string;
}

export interface MessageThread {
  id: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isOnline: boolean;
  unread: boolean;
  chats: ChatMessage[];
  itemId?: string;
  itemTitle?: string;
}
