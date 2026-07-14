import { Item, MessageThread } from './types';

export const AUDIO_ENTHUSIAST_SELLER = {
  name: "Audio Enthusiast Store",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk8jKilHoVrnmumDuRTQDfvoMFKreZ52_yLpzFJb4_whxHjxaj7bRTjQQHQPYPq2_v5DP4-qHM6GBaTtwjhxJJpxf19ch7xkTQI5jtmGxt63nkgfhN6cDwsxYzotGxM87RvuZaqDqw90H_172Zn9gQkTuvxKiscKXVwnONheGd5GVGHxe1Q6e2mpffxgn21m0NBdx2p0St1FjktHAewVTmF0GSR3OlsDUmAkF9OAd1GNnLWL9gSFD1_Q",
  joinedDate: "March 2021",
  rating: 4.9,
  reviewsCount: 248,
  isVerified: true
};

export const STANDARD_TECH_SELLER = {
  name: "Tech Pioneer",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj8fps8xXUAP-gf8NlKJbIAymke-0BFVmtA4hg4YkrjvSKEpVlyivthUBjB-OIwBKmV2Peww9vbPKSVMijhHKCxNvPEYyE-OW4uciBnxOTsALIT2HeqMUk8VnHj7KPSzL4YNOp1Vu5fWDYxAkYSpv_4amoumJGwDvPPOPURhpfzNt5WHw1v5J_IJ4eBmbnYhhprjlnv2jT-YWHFhJk9Z76qSe6gy4ayqGb0VXT6QkLhCJYM_giBm7pTw",
  joinedDate: "June 2022",
  rating: 4.8,
  reviewsCount: 156,
  isVerified: true
};

export const SELLER_ELENA = {
  name: "Elena Rodriguez",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhnkMFOcxypd4KFnBgr2f2KBWpKb2Zs7LpV4fQCwZSG35b6svz94VtAQJfjTwrPc_YrcmwrnD695_FfGtEUOvHZhL6mb3GI4tRiFJIAhChBsbsWcUZ0PLcqw3j2he2y4rf1r_8icTlVvka_cl-biwhqtZ2ldb-QheHozMiBhJrgqz5pF7WbU7yzLrjtFQH5HLbWgFefhsvkDAlG2qXiZbXmWC3fqGPkrUiImTe4NfVfz6qGVXLoAsUiA",
  joinedDate: "September 2020",
  rating: 4.9,
  reviewsCount: 92
};

export const SELLER_MARCUS = {
  name: "Marcus T.",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuANmGnFGfZWpbemZVary05gYSOrRIMpVqCk58J4moPxosctv2OZIX-6ByhXag3zCK6h_8Ze8ehLQUvyZi_l252DQ2QltWNnCoM8KMy1qMDnUy2XyuxOJLvcQ2WZvxxaVnoXPgQfuqgMtqLZFcinodShUKD4cbNNjN_lauL78pFIH5yLtW48z6qdcu3pTyJ3sZhPTjtszviOf_SCA7zha6q6IagSJbdf9UWZkiR4Tz8vMad4hx-zG7QPqg",
  joinedDate: "January 2023",
  rating: 4.7,
  reviewsCount: 44
};

export const SELLER_DAVID = {
  name: "David Wilson",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlTbfKlxAtr1xKzcEl7Io1JG9c3ONCTX9xPL9rvMremGZJIWUY3pzrXknwXqT4WhOlEHPQ5zS1LUjT7m-zr_mXNue8IHBebGYunQ-VVNxOjdBYkTPkZ0nScJRpG0DUR4366z1CBAKIMYgtUUHjJEB9xWrVq-ZyQ_MggLWf0NOy9wdvvD_XD10PbycpTS_P_wwHrueHwvLw2kEYRQk45e6YCIpJ0xDVEwUyMCgZsy_dS9AXriKrql-XNg",
  joinedDate: "November 2021",
  rating: 4.6,
  reviewsCount: 31
};

export const initialItems: Item[] = [
  {
    id: "lumina-headphones",
    title: "Lumina X-1000 Reference Audio Headphones",
    price: 107000,
    priceFormatted: "₹1,07,000",
    location: "Brooklyn, New York",
    timeAgo: "Posted 2 days ago",
    category: "Electronics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxL7g76EDx1b83ecenZc1cZ0Qd85bnVa9zX8RiHH81C6m6-7h6BnlkPaNRzX0-rfaW0A9sdRgfjCxo9AecGaADYD2TmX1hpZtDgb7XNrI5-6u02VlAifOVXNv2QTCdo4dCGRMkUb0d6lQ6fHoS2tQMUBf-0SO75pwFnAYh_hpaMkqpC1Cz5NesvMaENzdvcPVKBrCvAav7zxPL_9eJoCdok8uIuPMSs43nTPS4FQMBx3vlTjOYau9f6Q",
    description: "Experience audio in its purest form with the Lumina X-1000 Reference Audio Headphones. Designed for audiophiles and professional engineers, these headphones feature proprietary 50mm beryllium-coated drivers that deliver a flat frequency response with astonishing clarity and detail.\n\nThe open-back design provides a vast soundstage, perfect for critical listening and long mixing sessions. Handcrafted with top-grain leather and precision-machined aluminum, the X-1000 offers unparalleled comfort without compromising on durability.",
    specs: {
      "Brand": "Lumina Audio",
      "Model": "X-1000 Reference",
      "Connectivity": "Wired (3.5mm & 6.35mm)",
      "Material": "Beryllium, Aluminum, Leather",
      "Warranty": "Manufacturer 2-Year Limited"
    },
    seller: AUDIO_ENTHUSIAST_SELLER,
    condition: "New",
    likesCount: 142,
    viewsCount: "2.4k",
    status: "active",
    isFeatured: true
  },
  {
    id: "macbook-pro",
    title: "MacBook Pro M3 Max",
    price: 290000,
    priceFormatted: "₹2,90,000",
    location: "Mumbai, MH",
    timeAgo: "2h ago",
    category: "Electronics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYvISTbXF26IwgyKsXxaWLSmXiwRa2xC_Q3PBU3BZHVSx8hwZ5SOrcsD_5y2sX0spmyoZGRX83Hpne3Zq4wA_JeFqP2aQgWG4uGjamddVx2R5PmPT1Gmth4E2QEpB_sTA4JFLmFCTq3zTTnX7yKibqeYCBqpj3j6b-itg-jWOd6z5C0zKkahh1E_QiY9L-SRY6onHb8DD0GHLYbcAuxgo618diDLC5B7c3I3pl9YarRfMnU4LmZpWjrg",
    description: "16-inch, 64GB RAM, 2TB SSD. Pristine condition with original box.",
    specs: {
      "Brand": "Apple",
      "Model": "MacBook Pro 16\"",
      "Processor": "M3 Max",
      "RAM": "64GB Unified",
      "Storage": "2TB SSD"
    },
    seller: STANDARD_TECH_SELLER,
    condition: "New",
    likesCount: 89,
    viewsCount: "1.2k",
    status: "active",
    isNewTag: true
  },
  {
    id: "skyline-penthouse",
    title: "Skyline Penthouse",
    price: 104000000,
    priceFormatted: "₹10,40,00,000",
    location: "NYC",
    timeAgo: "1d ago",
    category: "Property",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDE9j0z5I1_1mXENSNGnbAjGgJai9sSAq9fdrA5EjWloNh0VJO4n-hIUl1x6qedcgHLzHhYQJpLuA1ymfqufCqyLjNBmmhgY9tFf899JWjgl90xujlBwzQ04_qdWP8pxN3CZBDQTG-jl3_JWjwF_WiOLVJTOlORoAzOpfAs6X7-6FLbT1ehD5u0LsECZ4NCRlmGatspmjXxoN9OSmOEtiMDpWn9quZUI9yjGdg_3lRgZi9GSkVU5e137Q",
    description: "3 Bedroom, 4 Bath luxury apartment with private rooftop terrace.",
    specs: {
      "Type": "Penthouse",
      "Bedrooms": "3",
      "Bathrooms": "4",
      "Outdoor Space": "Private Rooftop Terrace"
    },
    seller: {
      name: "Prestige Estates",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj8fps8xXUAP-gf8NlKJbIAymke-0BFVmtA4hg4YkrjvSKEpVlyivthUBjB-OIwBKmV2Peww9vbPKSVMijhHKCxNvPEYyE-OW4uciBnxOTsALIT2HeqMUk8VnHj7KPSzL4YNOp1Vu5fWDYxAkYSpv_4amoumJGwDvPPOPURhpfzNt5WHw1v5J_IJ4eBmbnYhhprjlnv2jT-YWHFhJk9Z76qSe6gy4ayqGb0VXT6QkLhCJYM_giBm7pTw",
      joinedDate: "May 2018",
      rating: 4.9,
      reviewsCount: 312
    },
    condition: "New",
    likesCount: 256,
    viewsCount: "5.3k",
    status: "active"
  },
  {
    id: "model-s-plaid",
    title: "Model S Plaid",
    price: 7400000,
    priceFormatted: "₹74,00,000",
    location: "Delhi",
    timeAgo: "4h ago",
    category: "Vehicles",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcjmsyp5mksR7fT7CJfuU9hxjkAuK7JcUBSY_EOouSo38i3D4YZcY8T6lNVK_bGAZkmyOYneljCPyvEdO8_Y2PMHzdVaCHBswiZ_wveIjk0eLY1L_DbjWhKA-tpbzcP3y9dr54WrK4TGVFL7CjXfGNMY7YPCFM7W0SpuqT2xSrg5xVjfwW1ygkPLpviQjRmGX093TQ6yWRG0hKoqeUc5QluvxPCQQj_piGlYyb6EEEVkQ-4_WD6_kHxg",
    description: "2023 Stealth Black. Only 2,400 miles. Full Self-Driving included.",
    specs: {
      "Brand": "Tesla",
      "Model": "Model S Plaid",
      "Year": "2023",
      "Mileage": "2,400 miles",
      "Paint": "Stealth Black",
      "FSD": "Included"
    },
    seller: {
      name: "Apex Motors",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuChgNM1WgRdlunflisR6bsU3a46nqOp31TftKNTQ09uAFZ8aZr4SMzrTc2QEiKIxI_4JuMhAMtoRRebqAS2WbVuoATm77dq1b5ypJk5rWD5UYLYMYeKkXpXvdvP1-AjLehD78A7MXBNOoAonfYkwpUhTfif5hg3EpmGxwL6vzAhoX5Nyaptka8DdcHvGxoHw8RMo0S9VtqfIDWOuigrpP4AUw8sHrIpAst54OSTTF7MUkTF4QV4uz5ePQ",
      joinedDate: "July 2021",
      rating: 4.7,
      reviewsCount: 78
    },
    condition: "Used",
    likesCount: 112,
    viewsCount: "2.1k",
    status: "active"
  },
  {
    id: "mechanical-watch",
    title: "Mechanical Masterpiece Watch",
    price: 1030000,
    priceFormatted: "₹10,30,000",
    location: "Swiss Border",
    timeAgo: "Box/Papers",
    category: "Electronics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNypi5Y69hwCXtSKj7eg52X9N7RFZoSRXnZMBD8larTK75WT2mnEFm0DdbOlUKJyEKWs9pRpKVWySuvdKtwaBNMyiPaGmmHbj-u5ow4VB-1D1Q8nbnFZTxa2DDEoDlX3JNf0UoDnn1XPNCtAGdruuaFo4sbDeLfLrxyIJ4KgwoEKBSxGV6Bt_y3Z-vBrTPAFLCK4ozNKRDxi86MNwAAW4nXbRroGcjJwwnwl-p5UPm4F9RSsrZdCWxw",
    description: "Swiss-made limited edition. Titanium case with sapphire glass.",
    specs: {
      "Origin": "Swiss-made",
      "Case": "Titanium",
      "Glass": "Sapphire Glass",
      "Packaging": "Original Box & Papers included"
    },
    seller: {
      name: "Legacy Horology",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3wZFi05fnxt1VJDmk4BzJDkdziAuLOaIwTu6cIh89ekIQe6NTefYvMucZDBv02ZxlYU2L0CJ4gy9Ck-_-RpYnSm0XV77mQDQaZfSVEfeKYTGnzTFIdhqUfNn_3SZ1WxlfwCBEnjrvLg_j73e5jVf8Wy83yqJ56Ose3VSG8gEpq_ScQNTkpWIew_NBu8bN_4kEYVwNk_nFyU9zIc_mDfc4F4iKKsnxSWLN9YURfKNs4f3vFsc5_VmiFg",
      joinedDate: "January 2019",
      rating: 5.0,
      reviewsCount: 120
    },
    condition: "Refurbished",
    likesCount: 95,
    viewsCount: "920",
    status: "active"
  },
  {
    id: "fidelity-headphones",
    title: "Fidelity H1 Wireless Headphones",
    price: 37500,
    priceFormatted: "₹37,500",
    location: "Bangalore",
    timeAgo: "Certified",
    category: "Electronics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5HHXfrKQJnoSy616lLhpVj76z7x4sf-lbdPSIzhMJ7j7lCGjLGlbjFK6CwYVzmk44jrba_8kEhKPrpYoAEWE5uaQEbLVThBIizsSYgWAb74N4vhBMS3LCAJ0mExR9KS6a5lX8K71t-lP8P_3CD-ZeoAJpSa7d1hWHWlKN8ZmAZFaiw5tVL6pjBQoFaiHzlxqiXRzWwruvY9pgXOK3a5Wvn5O8Q2Z0qo4XFW0KY6ApyCujWu2BZHWmbg",
    description: "Active noise cancelling with 40-hour battery life. Like new.",
    specs: {
      "Brand": "Fidelity",
      "ANC": "Yes",
      "Battery Life": "40 Hours",
      "Condition": "Like New"
    },
    seller: SELLER_ELENA,
    condition: "Refurbished",
    likesCount: 64,
    viewsCount: "880",
    status: "active"
  },
  {
    id: "home-office",
    title: "Designer Home Office Station",
    price: 230000,
    priceFormatted: "₹2,30,000",
    location: "Delhi",
    timeAgo: "Delivery",
    category: "Property",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQCASND_PEDBX45uotn2Wsj6Q7XQYWVlT_UgTbCWDO7NBNDJNH2bDIjDciIv-RvRETNLMsfsYlP5UW7Y8rOwvIxnNKQcWaOIkQHt-PEzKAZQsYLR1I_ljHcvG2jw7-B4yMkOo-QMOJUOaV8qCX0IqbNh_ZWr3LJ_v6IA-1OtuTNJM8iKArkyYwW28K8KxvxnIeNgQuqiWvNmcuNXiEj-wftEbyzHR9av8hPvPRHjC8vZQFmzAIRKq04w",
    description: "Complete setup including standing desk and ergonomic chair.",
    specs: {
      "Desk Type": "Motorized Standing Desk",
      "Chair Model": "Aura Ergo-Max V2",
      "Included Accessories": "Monitor Mount, Premium Felt Pad"
    },
    seller: SELLER_DAVID,
    condition: "Used",
    likesCount: 82,
    viewsCount: "1.5k",
    status: "active"
  },
  {
    id: "azure-yacht",
    title: "Azure Voyager 40 Yacht",
    price: 26500000,
    priceFormatted: "₹2,65,00,000",
    location: "Miami, FL",
    timeAgo: "Yacht",
    category: "Vehicles",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz6Z9cxL1rNCVNtHSSzKOuU7ain-g0kMwzjL6HgU1jMAyOmbwBxgTcYSubXNiWCGQEAt0cbzSVuQayluPkI6zVKAVx6FgroaIaaKR-c5ZfdEBoAeEWz4qA4kEMIvpFY7XroYnN1ks5SYtsGxsaklQsnV60L85Tl2RPIe6zLL8k44jttSdfd-aohfQtCt1LuiZAzHEFy7C5zeLNnk5uYtZAIbISe2Do9UnPLA-INlUl7rK_a5nDZxRCFQ",
    description: "40ft Motor Yacht, 2 cabins, fully serviced in 2023.",
    specs: {
      "Length": "40ft",
      "Cabins": "2",
      "Year Serviced": "2023",
      "Maximum Speed": "32 knots"
    },
    seller: {
      name: "Blue Horizon Yachts",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk8jKilHoVrnmumDuRTQDfvoMFKreZ52_yLpzFJb4_whxHjxaj7bRTjQQHQPYPq2_v5DP4-qHM6GBaTtwjhxJJpxf19ch7xkTQI5jtmGxt63nkgfhN6cDwsxYzotGxM87RvuZaqDqw90H_172Zn9gQkTuvxKiscKXVwnONheGd5GVGHxe1Q6e2mpffxgn21m0NBdx2p0St1FjktHAewVTmF0GSR3OlsDUmAkF9OAd1GNnLWL9gSFD1_Q",
      joinedDate: "September 2017",
      rating: 4.9,
      reviewsCount: 110
    },
    condition: "Used",
    likesCount: 189,
    viewsCount: "5.1k",
    status: "active"
  },
  {
    id: "eames-chair",
    title: "Eames Lounge Chair",
    price: 515000,
    priceFormatted: "₹5,15,000",
    location: "Bangalore",
    timeAgo: "Vintage",
    category: "Property",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnI7zRUjlCWMJlfVSLg-NqQYMkfU3dTihjdaxfwhaVK5e9-8w4vvFJxUHFD6nwU2DYWYhkgmhU-mJWnk2u76jEmJ9JNscGAnDw1Ssdd9rpu3LcrilAbSWvRwLfEmSCXWlMxt-OPTuDu7qKqqatlIZuBJogt14zPyIQb9O-x9TAyaJha7FxomDIQvwJ4kSgclfzGnMJ671vFU6j-fLDjAeQ9FRDfFbiPem9LzHrpVN97HAH9atXgnPtPw",
    description: "Original 1970s production in premium leather and walnut.",
    specs: {
      "Era": "1970s Vintage",
      "Wood Veneer": "Premium Walnut",
      "Upholstery": "Top-grain Black Leather",
      "Authenticity": "100% Certified Original"
    },
    seller: {
      name: "Mid-Century Modern Vault",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuANmGnFGfZWpbemZVary05gYSOrRIMpVqCk58J4moPxosctv2OZIX-6ByhXag3zCK6h_8Ze8ehLQUvyZi_l252DQ2QltWNnCoM8KMy1qMDnUy2XyuxOJLvcQ2WZvxxaVnoXPgQfuqgMtqLZFcinodShUKD4cbNNjN_lauL78pFIH5yLtW48z6qdcu3pTyJ3sZhPTjtszviOf_SCA7zha6q6IagSJbdf9UWZkiR4Tz8vMad4hx-zG7QPqg",
      joinedDate: "October 2019",
      rating: 4.8,
      reviewsCount: 85
    },
    condition: "Used",
    likesCount: 147,
    viewsCount: "740",
    status: "active"
  },
  {
    id: "mechanical-keyboard",
    title: "Premium Mechanical Keyboard",
    price: 20500,
    priceFormatted: "₹20,500",
    location: "Bangalore, KA",
    timeAgo: "2 hours ago",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600",
    description: "A high-end mechanical keyboard with custom keycaps and RGB backlighting.",
    specs: {
      "Switches": "Custom Linear",
      "Layout": "TKL (Tenkeyless)",
      "Backlight": "Full RGB Per-Key",
      "Keycaps": "PBT Double-Shot"
    },
    seller: STANDARD_TECH_SELLER,
    condition: "New",
    likesCount: 51,
    viewsCount: "420",
    status: "active"
  },
  {
    id: "leica-camera",
    title: "Vintage Leica M6 Camera",
    price: 260000,
    priceFormatted: "₹2,60,000",
    location: "Mumbai, MH",
    timeAgo: "5 hours ago",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=600",
    description: "A classic Leica rangefinder camera sitting on a clean surface.",
    specs: {
      "Type": "Rangefinder Film Camera",
      "Mount": "Leica M Mount",
      "Format": "35mm Film",
      "Color": "Classic Silver & Black"
    },
    seller: SELLER_MARCUS,
    condition: "Used",
    likesCount: 195,
    viewsCount: "1.1k",
    status: "active"
  },
  {
    id: "mid-century-lounge",
    title: "Mid-Century Modern Lounge",
    price: 74000,
    priceFormatted: "₹74,00,000",
    location: "Delhi, DL",
    timeAgo: "1 hour ago",
    category: "Property",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600",
    description: "A designer mid-century modern lounge chair.",
    specs: {
      "Material": "Solid Walnut & Linen",
      "Color": "Mustard Yellow",
      "Style": "Scandinavian Retro"
    },
    seller: SELLER_ELENA,
    condition: "New",
    likesCount: 38,
    viewsCount: "330",
    status: "active"
  },
  {
    id: "commuter-bike",
    title: "Electric Urban Commuter Bike",
    price: 148000,
    priceFormatted: "₹1,48,000",
    location: "Hyderabad, TS",
    timeAgo: "12 hours ago",
    category: "Vehicles",
    imageUrl: "https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?auto=format&fit=crop&q=80&w=600",
    description: "A sleek, matte black electric bicycle.",
    specs: {
      "Battery": "Lithium-Ion 48V 14Ah",
      "Range": "Up to 60 miles",
      "Top Speed": "28 mph",
      "Frame": "Aviation-Grade Aluminum"
    },
    seller: STANDARD_TECH_SELLER,
    condition: "New",
    likesCount: 88,
    viewsCount: "670",
    status: "active"
  },
  {
    id: "coffee-set",
    title: "Artisanal Ceramic Coffee Set",
    price: 9800,
    priceFormatted: "₹9,800",
    location: "Chennai, TN",
    timeAgo: "24 hours ago",
    category: "Property",
    imageUrl: "https://images.unsplash.com/photo-1544991583-5335694bf13c?auto=format&fit=crop&q=80&w=600",
    description: "Handcrafted minimalist ceramic pour-over coffee set.",
    specs: {
      "Material": "Organic Stoneware",
      "Pieces": "1 Dripper, 1 Carafe, 2 Mugs",
      "Finish": "Textured Matte Slate"
    },
    seller: SELLER_DAVID,
    condition: "New",
    likesCount: 22,
    viewsCount: "150",
    status: "active"
  },
  {
    id: "pro-tablet",
    title: "Ultra-Thin Pro Tablet",
    price: 89900,
    priceFormatted: "₹89,900",
    location: "Pune, MH",
    timeAgo: "3 hours ago",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600",
    description: "A cutting-edge tablet with a vivid display.",
    specs: {
      "Display": "11\" OLED Super Fluid",
      "Chipset": "Aura X1 Ultra",
      "Storage": "512GB High Speed",
      "Connectivity": "Wi-Fi 6E + 5G"
    },
    seller: STANDARD_TECH_SELLER,
    condition: "New",
    likesCount: 74,
    viewsCount: "540",
    status: "active"
  }
];

export const similarListings: Item[] = [
  {
    id: "dac-amp",
    title: "Stellar DAC Amplifier Pro",
    price: 37000,
    priceFormatted: "₹37,000",
    location: "San Francisco, CA",
    timeAgo: "Featured",
    category: "Electronics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8fJYDXZuzERJYG248MMBYAtgzlZ74yn7biELF5cQzjnFG6bq5fU5rsiaHrD2JPOHzvblCBVTWzRvjW4UpX6unliGOlyE1Ws3sCnwimhQJgucD7trPpjh5qxg7ijyN0yTLmtlNSB0FNA4UhSeoKhk5_XtOiI_USmdJVY-OyOrUpqI8zPM1IYNB9X7bQ5he2zNUiaZs0MQI6qo-9LCMAdzQsEd0ydCVmsEb-ECmDm89XjuRY9kwCott7A",
    description: "Reference-grade digital-to-analog converter and high-power amplifier.",
    specs: { "Brand": "Stellar", "Type": "DAC/AMP" },
    seller: AUDIO_ENTHUSIAST_SELLER,
    condition: "New",
    likesCount: 31,
    viewsCount: "350",
    status: "active"
  },
  {
    id: "studio-monitors",
    title: "Walnut Studio Monitors Pair",
    price: 148000,
    priceFormatted: "₹1,48,000",
    location: "Austin, TX",
    timeAgo: "High-End",
    category: "Electronics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB62ydZKvkOUd96IYKaVJQz1U4IRNTptOQk_N4Wa9TCw3YY-kEuJfUksHdlMfEELgEHnQU8ROABpO60UTtGoy_FupfNRI_X9qEzSkAZEC9Zwu6fTzH5nt7rRSQPYFVt1BPA5lWvTCguTkTFvJ-2giqlJ8FM9Tp24LPGCK2-NqPQDt6Ohv80z_ZELvtVY42Hz1e1zGKY34jnhaLixfHmdd1Q2zLR4vj9snYiITlwLbcZ8WzjLfw5HK2xSw",
    description: "Bespoke reference audio monitors finished in hand-oiled walnut veneer.",
    specs: { "Cabinet": "Solid American Walnut", "Configuration": "Bi-Amplified 2-Way" },
    seller: AUDIO_ENTHUSIAST_SELLER,
    condition: "New",
    likesCount: 56,
    viewsCount: "740",
    status: "active"
  },
  {
    id: "braided-cables",
    title: "Audiophile Braided Cables",
    price: 9900,
    priceFormatted: "₹9,900",
    location: "London, UK",
    timeAgo: "New",
    category: "Electronics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQkszlhonONwre0AvLHidt9lkS6pXztQvvkKTZ3QN9_GVnmlf2rzIVmz4VnXTMQryEStOGJPxoyCm0ZyvhScsf0Ijp47S_geVwLi-5NLkDlRkogUWWTd5UOpjU7WwZpAQf7BYzmyqZZSqgwITWuGBHgYWIvDw_uJUscZeXz0_QC5oe2U0VxnZ7dY3GCIEbuPXzC_MuHDt_UIikIVwilUDxrIpRxMjlzwAaswmZkX_h9YAwqi53bAcNCQ",
    description: "Silver-core triple-shielded headphone cables with heavy duty 6.35mm jack.",
    specs: { "Conductors": "99.99% Pure OCC Silver", "Jack": "24k Gold Plated" },
    seller: AUDIO_ENTHUSIAST_SELLER,
    condition: "New",
    likesCount: 12,
    viewsCount: "190",
    status: "active"
  },
  {
    id: "turntable",
    title: "Glass & Chrome Turntable",
    price: 74000,
    priceFormatted: "₹74,00,000", // Wait, in card it is ₹74,000
    location: "Seattle, WA",
    timeAgo: "Classic",
    category: "Electronics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuANCQMm9iNthI2qckkRzWNtkC_iANdFwp7OmX4TImCrKDOmzngqnJMojoXaqlJ4DeaqwOXqSsVywDoGXqBM99pLuD0q96cxFCtlI8rlmGYCXJbPkJIF33TrXQ4N7B9rIraeyDkgIaU0_IJWxTb92wI9TbKkbMpSovYJomrYejW7LzDbcFyKzk7aXxInmQtAqLV23qMOG5tByXxJRSXwBHJVlAndPVnhl3SadpaD3QEgrhKCXocHj14iUg",
    description: "Luminous direct-drive turntable featuring a polished crystal glass platter.",
    specs: { "Platter": "12mm Tempered Glass", "Drive": "Direct-Drive Servo Motor" },
    seller: AUDIO_ENTHUSIAST_SELLER,
    condition: "New",
    likesCount: 42,
    viewsCount: "410",
    status: "active"
  }
];

export const userActiveListings: Item[] = [
  {
    id: "user-ultrabook",
    title: "Silver Ultrabook Pro M2",
    price: 129900,
    priceFormatted: "₹1,29,900",
    location: "Bangalore",
    timeAgo: "2 hours ago",
    category: "Electronics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyFA0NXnC-vOPCyt7i6UMzW8sZcY9vuLfkC85Y8mdcyyYhzSWFsFREYmbuH9UnV9LJ24eblyrb9C4sdX2M14ZvEYrEvI8Q9xM_6d7wWuhRpH7hiWYqjGHhpx1WAIenEtegUu9UkdFBX8rLDapPo4aVpJz_V-PpOIE4y_XgVjfmWAZss6fJ_vpxSgIZDPcavAS-BMJlTRtAbkq9jeYaWQdzrHHEPla8bvBRHJiww77E1rcN_EUEUgWaCQ",
    description: "Sleek aluminum laptop, super slim profile with beautiful fluid screen.",
    specs: { "RAM": "16GB", "Storage": "512GB", "Processor": "M2 Core" },
    seller: AUDIO_ENTHUSIAST_SELLER, // User
    condition: "New",
    likesCount: 14,
    viewsCount: "1.2k views",
    status: "active"
  },
  {
    id: "user-headphones",
    title: "Noise-Canceling Studio Headphones",
    price: 35000,
    priceFormatted: "₹35,000",
    location: "Bangalore",
    timeAgo: "1 day ago",
    category: "Electronics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuChgNM1WgRdlunflisR6bsU3a46nqOp31TftKNTQ09uAFZ8aZr4SMzrTc2QEiKIxI_4JuMhAMtoRRebqAS2WbVuoATm77dq1b5ypJk5rWD5UYLYMYeKkXpXvdvP1-AjLehD78A7MXBNOoAonfYkwpUhTfif5hg3EpmGxwL6vzAhoX5Nyaptka8DdcHvGxoHw8RMo0S9VtqfIDWOuigrpP4AUw8sHrIpAst54OSTTF7MUkTF4QV4uz5ePQ",
    description: "Studio monitors for precise mixing. Flat and highly neutral.",
    specs: { "Drivers": "45mm Neodymium", "Response": "15Hz - 28kHz" },
    seller: AUDIO_ENTHUSIAST_SELLER,
    condition: "Refurbished",
    likesCount: 8,
    viewsCount: "840 views",
    status: "pending"
  },
  {
    id: "user-chair",
    title: "Ergonomic Office Chair",
    price: 18000,
    priceFormatted: "₹18,000",
    location: "Bangalore",
    timeAgo: "Completed",
    category: "Property",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAonqnTJCyIFZ5VPTsumi7VqijIzi1Cd2Bqpokha1xVmoFQduYE2H8Unqx1f50N-z517hPqZL6XU_ytmfOVDczpp7bX0xjAJVqgTjyAQp49MUhozD-VDpBp4iJtl6gdmNZwyfbSBZ70D4tgRNdKbCflxWzw7ob1XnQPWCQjtQdJrodsrniTp4tWkd3ZUFxrEbouFRnSGrCptRJyHd7tHUFtdbQvQGOo7YP18iwKFOM29ovyyfg3XY5kPA",
    description: "Mesh executive chair with full adjustment.",
    specs: { "Armrests": "3D Adjustable", "Mesh": "Breathable High-Elasticity" },
    seller: AUDIO_ENTHUSIAST_SELLER,
    condition: "Used",
    likesCount: 23,
    viewsCount: "Completed",
    status: "sold"
  }
];

export const initialThreads: MessageThread[] = [
  {
    id: "thread-elena",
    senderName: "Elena Rodriguez",
    senderAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhnkMFOcxypd4KFnBgr2f2KBWpKb2Zs7LpV4fQCwZSG35b6svz94VtAQJfjTwrPc_YrcmwrnD695_FfGtEUOvHZhL6mb3GI4tRiFJIAhChBsbsWcUZ0PLcqw3j2he2y4rf1r_8icTlVvka_cl-biwhqtZ2ldb-QheHozMiBhJrgqz5pF7WbU7yzLrjtFQH5HLbWgFefhsvkDAlG2qXiZbXmWC3fqGPkrUiImTe4NfVfz6qGVXLoAsUiA",
    content: "Is the Ultrabook still available? I can meet today.",
    timestamp: "2m ago",
    isOnline: true,
    unread: true,
    chats: [
      { sender: "seller", text: "Hi Elena! Yes, the Ultrabook is still available.", time: "10:15 AM" },
      { sender: "user", text: "Perfect! Is there any warranty remaining on it?", time: "10:17 AM" },
      { sender: "seller", text: "Yes, it has 6 months of official manufacturer warranty remaining.", time: "10:18 AM" },
      { sender: "user", text: "Is the Ultrabook still available? I can meet today.", time: "10:43 AM" }
    ],
    itemId: "user-ultrabook",
    itemTitle: "Silver Ultrabook Pro M2"
  },
  {
    id: "thread-marcus",
    senderName: "Marcus T.",
    senderAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuANmGnFGfZWpbemZVary05gYSOrRIMpVqCk58J4moPxosctv2OZIX-6ByhXag3zCK6h_8Ze8ehLQUvyZi_l252DQ2QltWNnCoM8KMy1qMDnUy2XyuxOJLvcQ2WZvxxaVnoXPgQfuqgMtqLZFcinodShUKD4cbNNjN_lauL78pFIH5yLtW48z6qdcu3pTyJ3sZhPTjtszviOf_SCA7zha6q6IagSJbdf9UWZkiR4Tz8vMad4hx-zG7QPqg",
    content: "Great, thanks for the info! Let me think about it...",
    timestamp: "45m ago",
    isOnline: false,
    unread: false,
    chats: [
      { sender: "user", text: "Hi Marcus, are you interested in the headphones?", time: "Yesterday" },
      { sender: "seller", text: "Yes, do they come with the original carry pouch and audio cable?", time: "Yesterday" },
      { sender: "user", text: "Yes, indeed! It comes with the pristine carrying case and both cords.", time: "Yesterday" },
      { sender: "seller", text: "Great, thanks for the info! Let me think about it...", time: "Yesterday" }
    ],
    itemId: "user-headphones",
    itemTitle: "Noise-Canceling Studio Headphones"
  },
  {
    id: "thread-david",
    senderName: "David Wilson",
    senderAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlTbfKlxAtr1xKzcEl7Io1JG9c3ONCTX9xPL9rvMremGZJIWUY3pzrXknwXqT4WhOlEHPQ5zS1LUjT7m-zr_mXNue8IHBebGYunQ-VVNxOjdBYkTPkZ0nScJRpG0DUR4366z1CBAKIMYgtUUHjJEB9xWrVq-ZyQ_MggLWf0NOy9wdvvD_XD10PbycpTS_P_wwHrueHwvLw2kEYRQk45e6YCIpJ0xDVEwUyMCgZsy_dS9AXriKrql-XNg",
    content: "Would you accept ₹150 for the office chair?", // wait, let's keep currency values consistent: chair is ₹18,000, so "Would you accept ₹15,000 for the office chair?" is more appropriate
    timestamp: "2h ago",
    isOnline: false,
    unread: false,
    chats: [
      { sender: "user", text: "Hello! The office chair is listed for ₹18,000.", time: "9:00 AM" },
      { sender: "seller", text: "Would you accept ₹15,000 for the office chair?", time: "10:12 AM" }
    ],
    itemId: "user-chair",
    itemTitle: "Ergonomic Office Chair"
  }
];
