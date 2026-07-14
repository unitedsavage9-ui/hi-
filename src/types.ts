export interface Listing {
  id: string;
  title: string;
  price: number;
  category: 'Electronics' | 'Property' | 'Vehicles' | 'Jobs';
  condition: 'New' | 'Pending' | 'Refurbished' | 'Used' | 'Vintage' | 'Active';
  location: string;
  time: string;
  image: string;
  views?: string;
  isFavorite: boolean;
  description?: string;
  tags?: string[];
  status?: 'active' | 'pending' | 'sold';
  owner?: 'user' | 'other';
  companyName?: string;
  jobType?: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  jobRequirements?: string;
  images?: string[];
  videoUrl?: string;
  latitude?: number;
  longitude?: number;
  showCoordinates?: boolean;
}

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  message: string;
  unread: boolean;
  active?: boolean;
}

export interface FilterState {
  searchQuery: string;
  category: string; // 'All' or specific category
  priceMin: string;
  priceMax: string;
  condition: 'Any' | 'New' | 'Refurbished' | 'Used';
  location: string;
}
