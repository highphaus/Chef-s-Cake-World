'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Store,
  Star,
  CheckCircle2,
  Cake,
  Award,
  Phone,
  MapPin,
  Truck,
  Navigation,
  ChefHat,
  Gift,
  Layers,
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { api } from '@/lib/api';
import { OFFICIAL_BRANCHES } from '@/lib/branchesData';
import ProductCard from '@/components/products/ProductCard';
import ProductCarouselSection from '@/components/products/ProductCarouselSection';
import PincodeCheckerModal from '@/components/common/PincodeCheckerModal';

const celebrationOccasions = [
  {
    id: 'birthday',
    label: 'Birthday Bash',
    icon: '',
    subtitle: 'Free custom plaque & candles',
    cakeName: 'Royal Belgian Birthday Cake',
    tagline: '70% Dark Callebaut Ganache & Hazelnut Praline',
    prices: { '0.5kg': 699, '1kg': 1299, '2kg': 2499 },
    rating: 4.96,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop',
    slug: 'royal-belgian-chocolate-truffle-cake',
    badge: 'Bestselling Celebration Cake',
    flavorDesc: 'Three tiers of moist chocolate sponge smothered in silky Callebaut ganache. Includes free custom chocolate message plaque and sparkle candles.',
    perks: [
      'Complimentary customized message plaque & celebration candles',
      'Pure 70% Belgian chocolate (zero compound chocolate)',
      'Guaranteed 2-hour doorstep delivery from nearest Kerala hub'
    ]
  },
  {
    id: 'wedding',
    label: 'Weddings & Anniversaries',
    icon: '',
    subtitle: 'Grand multi-tier florals & gold',
    cakeName: 'Grand Floral Celebration Cake',
    tagline: 'Sculpted Tiering with 24K Edible Gold Accents',
    prices: { '0.5kg': 1499, '1kg': 2899, '2kg': 5499 },
    rating: 4.99,
    reviews: 180,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop',
    slug: 'royal-belgian-chocolate-truffle-cake',
    badge: 'Grand Celebration Tier',
    flavorDesc: 'Architectural centerpiece layered with Belgian truffle and Madagascar bourbon vanilla, crowned with hand-crafted sugar florals.',
    perks: [
      'Dedicated senior pastry chef consultation for custom tiering',
      'Reinforced internal food-grade structure for flawless stability',
      'White-glove climate-controlled delivery to your event banquet'
    ]
  },
  {
    id: 'chocolate',
    label: 'Belgian Truffle Lovers',
    icon: '',
    subtitle: 'Intense 70% Callebaut ganache',
    cakeName: 'Dark Truffle Hazelnut Cake',
    tagline: 'Intense Single-Origin Cocoa with Silky Mirror Drip',
    prices: { '0.5kg': 749, '1kg': 1399, '2kg': 2699 },
    rating: 4.94,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1200&auto=format&fit=crop',
    slug: 'royal-belgian-chocolate-truffle-cake',
    badge: 'Chocoholic Favorite',
    flavorDesc: 'For true chocolate connoisseurs. Baked with pure single-origin cocoa, dressed in mirror ganache glaze and roasted hazelnut crunch.',
    perks: [
      '100% Callebaut Belgian couverture (no artificial fats)',
      'Rich bittersweet notes with luxurious velvety mouthfeel',
      'Dispatched fresh from local oven within 120 minutes'
    ]
  },
  {
    id: 'eggless',
    label: '100% Pure Eggless',
    icon: '',
    subtitle: 'Certified pure vegetarian line',
    cakeName: 'Red Velvet Cream Cheese',
    tagline: 'Whipped Philadelphia Frosting & Crimson Crumb',
    prices: { '0.5kg': 749, '1kg': 1399, '2kg': 2699 },
    rating: 4.92,
    reviews: 260,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=1200&auto=format&fit=crop',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    badge: '100% Pure Vegetarian',
    flavorDesc: 'Baked in our strictly segregated pure vegetarian kitchen. Tender crimson crumb paired with tangy whipped Philadelphia cream cheese.',
    perks: [
      'Strictly certified vegetarian kitchen and ingredients',
      'Feather-light moist texture with zero compromise on fluffiness',
      'Prepared with fresh dairy cream and organic vanilla'
    ]
  },
  {
    id: 'biscoff',
    label: 'Lotus Biscoff Gourmet',
    icon: '',
    subtitle: 'Speculoos mousse & crunchy biscuit',
    cakeName: 'Lotus Biscoff Dream Cake',
    tagline: 'Caramel Cinnamon Biscuit Layering & Spread Drizzle',
    prices: { '0.5kg': 799, '1kg': 1499, '2kg': 2899 },
    rating: 4.98,
    reviews: 195,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=1200&auto=format&fit=crop',
    slug: 'lotus-biscoff-speculoos-dream-cake',
    badge: 'Trending Sensation',
    flavorDesc: 'The modern artisan dessert sensation. Golden spiced speculoos mousse layered with crunchy biscuit crust and generous Biscoff spread drizzle.',
    perks: [
      'Original imported Lotus Biscoff speculoos cookies and spread',
      'Addictive crunch balanced with light caramelized mousse',
      'Freshly piped upon ordering for maximum biscuit crispness'
    ]
  }
];

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [featuredCakes, setFeaturedCakes] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedOccasionIndex, setSelectedOccasionIndex] = useState(0);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [catRes, prodRes, branchRes] = await Promise.all([
          api.getCategories(),
          api.getProducts('limit=8'),
          api.getBranches(),
        ]);

        if (catRes.success && catRes.categories) {
          setCategories(catRes.categories);
        }
        if (prodRes.success && prodRes.products) {
          setBestSellers(prodRes.products.filter((p: any) => p.isBestSeller));
          setFeaturedCakes(prodRes.products.slice(0, 4));
        }
        if (branchRes.success && branchRes.branches) {
          setBranches(branchRes.branches);
        }
      } catch (err) {
        console.warn('Initial data loading using fallback default items.');
      }
    };

    loadHomeData();
  }, []);

  // Hero Carousel Autoplay (Continuous, Smooth Movement every 3.8s)
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedOccasionIndex((prev) => (prev + 1) % celebrationOccasions.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setSelectedOccasionIndex((prev) => (prev - 1 + celebrationOccasions.length) % celebrationOccasions.length);
  };

  const handleNextSlide = () => {
    setSelectedOccasionIndex((prev) => (prev + 1) % celebrationOccasions.length);
  };

  // Touch swipe gesture controls for hero carousel on smaller devices
  const [heroTouchStartX, setHeroTouchStartX] = useState<number | null>(null);
  const [heroTouchEndX, setHeroTouchEndX] = useState<number | null>(null);
  const minHeroSwipeDistance = 45;

  const handleHeroTouchStart = (e: React.TouchEvent) => {
    setHeroTouchEndX(null);
    setHeroTouchStartX(e.targetTouches[0].clientX);
  };

  const handleHeroTouchMove = (e: React.TouchEvent) => {
    setHeroTouchEndX(e.targetTouches[0].clientX);
  };

  const handleHeroTouchEnd = () => {
    if (!heroTouchStartX || !heroTouchEndX) return;
    const distance = heroTouchStartX - heroTouchEndX;
    const isLeftSwipe = distance > minHeroSwipeDistance;
    const isRightSwipe = distance < -minHeroSwipeDistance;
    if (isLeftSwipe) {
      handleNextSlide();
    } else if (isRightSwipe) {
      handlePrevSlide();
    }
    setHeroTouchStartX(null);
    setHeroTouchEndX(null);
  };

  // Category Carousel Automatic Movement
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [isCategoryPaused, setIsCategoryPaused] = useState(false);

  useEffect(() => {
    if (isCategoryPaused) return;

    const timer = setInterval(() => {
      if (categoryScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
        const step = clientWidth < 640 ? 210 : 290;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          categoryScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          categoryScrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 2800);

    return () => clearInterval(timer);
  }, [isCategoryPaused]);

  // Fallback categories if server not yet populated
  const displayCategories = categories.length > 0 ? categories : [
    { name: 'Artisan Pastries', slug: 'pastries', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop' },
    { name: 'Sweets & Desserts', slug: 'sweets-desserts', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop' },
    { name: 'Birthday Cakes', slug: 'birthday-cakes', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=600&auto=format&fit=crop' },
    { name: 'Wedding Cakes', slug: 'wedding-cakes', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=600&auto=format&fit=crop' },
    { name: 'Anniversary Cakes', slug: 'anniversary-cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop' },
    { name: 'Chocolate Cakes', slug: 'chocolate-cakes', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop' },
    { name: 'Photo Cakes', slug: 'photo-cakes', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=600&auto=format&fit=crop' },
    { name: 'Custom Cakes', slug: 'designer-cakes', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop' },
    { name: "Kids' Cakes", slug: 'kids-cakes', image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=600&auto=format&fit=crop' },
    { name: 'Eggless Delights', slug: 'eggless-cakes', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=600&auto=format&fit=crop' },
  ];

  // Fallback best sellers if DB empty
  const displayBestSellers = bestSellers.length > 0 ? bestSellers : [
    {
      _id: 'sample-1',
      name: 'Royal Belgian Chocolate Truffle Cake',
      slug: 'royal-belgian-chocolate-truffle-cake',
      description: 'Layers of moist dark chocolate sponge draped in silky 70% Callebaut Belgian ganache.',
      basePrice: 699,
      images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Belgian Truffle'],
      averageRating: 4.9,
      reviewCount: 142,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'sample-2',
      name: 'Fresh Red Velvet Cream Cheese Luxe',
      slug: 'fresh-red-velvet-cream-cheese-luxe',
      description: 'Velvety crimson sponge layered with whipped Philadelphia cream cheese frosting.',
      basePrice: 749,
      images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Classic Cream Cheese'],
      averageRating: 4.85,
      reviewCount: 98,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'sample-3',
      name: 'Lotus Biscoff Speculoos Dream Cake',
      slug: 'lotus-biscoff-speculoos-dream-cake',
      description: 'Caramelized cinnamon sponge, creamy Biscoff mousse, and crunchy biscuit crumble.',
      basePrice: 799,
      images: ['https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Lotus Speculoos'],
      averageRating: 4.95,
      reviewCount: 76,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'sample-4',
      name: 'Exotic Fresh Seasonal Fruit Ambrosia',
      slug: 'exotic-fresh-seasonal-fruit-ambrosia',
      description: 'Light vanilla sponge crowned with fresh kiwi, strawberries, blueberries, and mangoes.',
      basePrice: 699,
      images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Fruit Mascarpone'],
      averageRating: 4.8,
      reviewCount: 64,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'sample-5',
      name: 'Classic Black Forest Cherry Jubilee',
      slug: 'fresh-red-velvet-cream-cheese-luxe',
      description: 'European recipe with chocolate sponge soaked in dark cherry compote and French cherries.',
      basePrice: 599,
      images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Dark Cherry Truffle'],
      averageRating: 4.84,
      reviewCount: 52,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'sample-6',
      name: 'Ferrero Rocher Hazelnut Praline Luxe',
      slug: 'royal-belgian-chocolate-truffle-cake',
      description: 'Nutella mousse, crushed wafer crunch, whole Ferrero rochers, and dark ganache drip.',
      basePrice: 899,
      images: ['https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Ferrero Nutella'],
      averageRating: 4.97,
      reviewCount: 112,
      isBestSeller: true,
      egglessAvailable: true,
    },
  ];

  // Curated Section 1: Birthday Celebration Specials
  const birthdayCakes = [
    {
      _id: 'bday-1',
      name: 'Royal Belgian Chocolate Birthday Cake',
      slug: 'royal-belgian-chocolate-truffle-cake',
      description: 'Moist chocolate sponge with 70% dark Belgian ganache, sparkle candles, and custom plaque.',
      basePrice: 699,
      images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Belgian Truffle'],
      averageRating: 4.96,
      reviewCount: 142,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'bday-2',
      name: 'Exotic Fresh Seasonal Fruit Ambrosia',
      slug: 'exotic-fresh-seasonal-fruit-ambrosia',
      description: 'Light vanilla sponge crowned with fresh kiwi, strawberries, blueberries, and mangoes.',
      basePrice: 699,
      images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Fruit Mascarpone'],
      averageRating: 4.88,
      reviewCount: 94,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'bday-3',
      name: 'Classic Black Forest Cherry Jubilee',
      slug: 'classic-black-forest-cherry-jubilee',
      description: 'Dark chocolate sponge layered with sour German cherries and fresh whipped cream.',
      basePrice: 599,
      images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Classic Cherry'],
      averageRating: 4.82,
      reviewCount: 88,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'bday-4',
      name: 'Magical Unicorn Rainbow Kids Fantasy Cake',
      slug: 'magical-unicorn-rainbow-kids-fantasy-cake',
      description: 'Multi-colored rainbow sponge with strawberry buttercream and golden fondant horn.',
      basePrice: 899,
      images: ['https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['1 kg', '1.5 kg', '2 kg'],
      availableFlavours: ['Strawberry Buttercream'],
      averageRating: 4.95,
      reviewCount: 62,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'bday-5',
      name: 'Golden Butterscotch Caramel Crunch',
      slug: 'golden-butterscotch-caramel-crunch',
      description: 'Moist vanilla sponge with crunchy butterscotch praline and rich caramel drizzle.',
      basePrice: 649,
      images: ['https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Butterscotch Praline'],
      averageRating: 4.85,
      reviewCount: 79,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'bday-6',
      name: 'Fresh Red Velvet Birthday Special',
      slug: 'fresh-red-velvet-cream-cheese-luxe',
      description: 'Crimson cocoa sponge draped in whipped Philadelphia cream cheese with birthday message.',
      basePrice: 749,
      images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Cream Cheese'],
      averageRating: 4.9,
      reviewCount: 110,
      isBestSeller: true,
      egglessAvailable: true,
    },
  ];

  // Curated Section 2: Belgian Couverture & Truffle Luxe
  const chocolateCakes = [
    {
      _id: 'choc-1',
      name: 'Decadent Dark Truffle & Roasted Hazelnut',
      slug: 'decadent-dark-truffle-roasted-hazelnut',
      description: 'Pure 70% single-origin Callebaut couverture with mirror drip and roasted hazelnuts.',
      basePrice: 749,
      images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Roasted Hazelnut Dark'],
      averageRating: 4.94,
      reviewCount: 310,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'choc-2',
      name: 'Royal Belgian Chocolate Truffle Cake',
      slug: 'royal-belgian-chocolate-truffle-cake',
      description: 'Three tiers of moist chocolate sponge smothered in silky Callebaut ganache and curls.',
      basePrice: 699,
      images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Belgian Truffle'],
      averageRating: 4.96,
      reviewCount: 142,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'choc-3',
      name: 'Triple Chocolate Mousse Drip Cake',
      slug: 'triple-chocolate-mousse-drip-cake',
      description: 'Dark, milk, and white Belgian chocolate mousse layers over a crunchy cocoa base.',
      basePrice: 799,
      images: ['https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Triple Mousse'],
      averageRating: 4.91,
      reviewCount: 86,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'choc-4',
      name: 'Ferrero Rocher Hazelnut Praline Luxe',
      slug: 'ferrero-rocher-hazelnut-praline-luxe',
      description: 'Nutella mousse, crushed wafer crunch, whole Ferrero rochers, and dark ganache drip.',
      basePrice: 899,
      images: ['https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Ferrero Nutella'],
      averageRating: 4.98,
      reviewCount: 124,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'choc-5',
      name: 'Dark Callebaut Ganache Mirror Cake',
      slug: 'dark-callebaut-ganache-mirror-cake',
      description: 'Glossy chocolate mirror glaze poured over intense bittersweet single-origin sponge.',
      basePrice: 849,
      images: ['https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Mirror Glaze Ganache'],
      averageRating: 4.89,
      reviewCount: 71,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'choc-6',
      name: 'Lotus Biscoff Speculoos Dream Cake',
      slug: 'lotus-biscoff-speculoos-dream-cake',
      description: 'Caramelized cinnamon biscuit crumb, creamy Biscoff mousse, and spread drizzle.',
      basePrice: 799,
      images: ['https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Lotus Speculoos'],
      averageRating: 4.95,
      reviewCount: 76,
      isBestSeller: true,
      egglessAvailable: true,
    },
  ];

  // Curated Section 3: 100% Pure Eggless Delights
  const egglessCakes = [
    {
      _id: 'eggless-1',
      name: 'Pure Eggless Red Velvet & Cream Cheese Luxe',
      slug: 'fresh-red-velvet-cream-cheese-luxe',
      description: 'Certified 100% vegetarian crimson sponge layered with whipped Philadelphia cream cheese.',
      basePrice: 749,
      images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Classic Cream Cheese'],
      averageRating: 4.92,
      reviewCount: 260,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'eggless-2',
      name: 'Lotus Biscoff Speculoos Dream Cake (Pure Veg)',
      slug: 'lotus-biscoff-speculoos-dream-cake',
      description: 'Eggless cinnamon sponge with creamy Biscoff mousse and crunchy biscuit crumble.',
      basePrice: 799,
      images: ['https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Lotus Speculoos'],
      averageRating: 4.98,
      reviewCount: 195,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'eggless-3',
      name: 'Classic Pure Eggless Black Forest Gateau',
      slug: 'classic-black-forest-cherry-jubilee',
      description: 'Baked in our strictly segregated vegetarian kitchen with dark cherries and dairy cream.',
      basePrice: 649,
      images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Cherry Chocolate'],
      averageRating: 4.88,
      reviewCount: 88,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'eggless-4',
      name: 'Pure Eggless Mango Mascarpone Ambrosia',
      slug: 'exotic-fresh-seasonal-fruit-ambrosia',
      description: 'Light vanilla sponge crowned with fresh mango slices, blueberries, and mascarpone.',
      basePrice: 699,
      images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Mango Mascarpone'],
      averageRating: 4.86,
      reviewCount: 73,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'eggless-5',
      name: 'Eggless Pistachio Kulfi Saffron Bliss',
      slug: 'eggless-pistachio-kulfi-saffron-bliss',
      description: 'Aromatic Kashmiri saffron cream, crushed roasted pistachios, and rich cardamom sponge.',
      basePrice: 799,
      images: ['https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Pistachio Saffron'],
      averageRating: 4.93,
      reviewCount: 65,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'eggless-6',
      name: 'Pure Vegetarian Dutch Truffle Gateau',
      slug: 'pure-vegetarian-dutch-truffle-gateau',
      description: 'Moist eggless chocolate sponge smothered in silky Callebaut ganache and curls.',
      basePrice: 749,
      images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Dutch Ganache'],
      averageRating: 4.91,
      reviewCount: 114,
      isBestSeller: true,
      egglessAvailable: true,
    },
  ];

  // Curated Section 4: Weddings & Grand Milestone Tiers
  const weddingCakes = [
    {
      _id: 'wed-1',
      name: 'Grand Tiered Golden Wedding Masterpiece',
      slug: 'grand-tiered-golden-wedding-masterpiece',
      description: 'Three-tiered royal wedding cake adorned with edible 24K gold leaf and sugar peonies.',
      basePrice: 3499,
      images: ['https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop'],
      availableWeights: ['3 kg', '4 kg', '5 kg'],
      availableFlavours: ['Belgian Truffle & Vanilla'],
      averageRating: 5.0,
      reviewCount: 31,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'wed-2',
      name: '3-Tier Couverture & Floral Masterpiece',
      slug: 'grand-tiered-golden-wedding-masterpiece',
      description: 'Architectural centerpiece layered with Belgian truffle and Madagascar bourbon vanilla.',
      basePrice: 2899,
      images: ['https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=1200&auto=format&fit=crop'],
      availableWeights: ['2 kg', '3 kg', '4 kg'],
      availableFlavours: ['Bourbon Vanilla & Berry'],
      averageRating: 4.99,
      reviewCount: 180,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'wed-3',
      name: 'Sculpted Ivory & 24K Edible Gold Tier',
      slug: 'grand-tiered-golden-wedding-masterpiece',
      description: 'Two-tier ivory fondant cake accented with 24K gold foil and delicate sugar pearls.',
      basePrice: 2499,
      images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=1200&auto=format&fit=crop'],
      availableWeights: ['2 kg', '3 kg'],
      availableFlavours: ['Red Velvet Truffle'],
      averageRating: 4.95,
      reviewCount: 48,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'wed-4',
      name: 'Madagascar Bourbon Vanilla & Peony 3-Tier',
      slug: 'grand-tiered-golden-wedding-masterpiece',
      description: 'Tender vanilla bean sponge with strawberry champagne compote and hand-piped peonies.',
      basePrice: 3199,
      images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1200&auto=format&fit=crop'],
      availableWeights: ['3 kg', '4 kg'],
      availableFlavours: ['Champagne Berry'],
      averageRating: 4.97,
      reviewCount: 39,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'wed-5',
      name: 'Regal Pearl & White Truffle Anniversary Tier',
      slug: 'regal-pearl-white-truffle-anniversary-tier',
      description: 'White Callebaut chocolate ganache with edible luster dust and quilted silver dragee.',
      basePrice: 2699,
      images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop'],
      availableWeights: ['2 kg', '3 kg'],
      availableFlavours: ['White Truffle Hazelnut'],
      averageRating: 4.92,
      reviewCount: 55,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'wed-6',
      name: 'Contemporary Semi-Naked Berry Banquet Tier',
      slug: 'contemporary-semi-naked-berry-banquet-tier',
      description: 'Rustic semi-naked vanilla sponge adorned with organic Kerala figs, berries, and rosemary.',
      basePrice: 2299,
      images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1200&auto=format&fit=crop'],
      availableWeights: ['2 kg', '3 kg'],
      availableFlavours: ['Vanilla Berry Mascarpone'],
      averageRating: 4.88,
      reviewCount: 42,
      isBestSeller: false,
      egglessAvailable: true,
    },
  ];

  // Curated Section 5: Artisan Pastries & Gourmet Sweets
  const pastriesAndSweets = [
    {
      _id: 'pastry-1',
      name: 'Signature Belgian Chocolate Truffle Pastry',
      slug: 'signature-belgian-chocolate-truffle-pastry',
      description: 'Moist cocoa sponge layered with 70% Callebaut Belgian dark ganache and cocoa pearls.',
      basePrice: 129,
      images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['1 Slice', 'Box of 2', 'Box of 4'],
      availableFlavours: ['Belgian Dark Truffle'],
      averageRating: 4.95,
      reviewCount: 182,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'pastry-2',
      name: 'Red Velvet Cream Cheese Pastry',
      slug: 'red-velvet-cream-cheese-pastry',
      description: 'Crimson cocoa sponge with whipped Philadelphia cream cheese and velvet crumble.',
      basePrice: 139,
      images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['1 Slice', 'Box of 2', 'Box of 4'],
      availableFlavours: ['Cream Cheese'],
      averageRating: 4.89,
      reviewCount: 145,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'sweet-1',
      name: 'Royal Gulab Jamun Fusion Dessert Cup',
      slug: 'royal-gulab-jamun-fusion-dessert-cup',
      description: 'Warm cardamom saffron sponge with rabdi mousse and mini Gulab Jamuns & pistachios.',
      basePrice: 139,
      images: ['https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['1 Cup', 'Pack of 2', 'Pack of 4'],
      availableFlavours: ['Saffron Rabdi'],
      averageRating: 4.97,
      reviewCount: 138,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'pastry-3',
      name: 'Blueberry Mascarpone Cheesecake Pastry',
      slug: 'blueberry-mascarpone-cheesecake-pastry',
      description: 'Baked New York style cheesecake slice topped with French wild blueberry coulis.',
      basePrice: 159,
      images: ['https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['1 Slice', 'Box of 2', 'Box of 4'],
      availableFlavours: ['Wild Blueberry'],
      averageRating: 4.92,
      reviewCount: 96,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'sweet-2',
      name: 'Artisan French Macarons Gift Box',
      slug: 'artisan-french-macarons-gift-box',
      description: 'Handcrafted Parisian macarons: Pistachio, Truffle, Salted Caramel, Raspberry, Vanilla.',
      basePrice: 349,
      images: ['https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['Box of 6', 'Box of 12'],
      availableFlavours: ['Assorted Parisian Flavors'],
      averageRating: 4.94,
      reviewCount: 160,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'sweet-3',
      name: 'Classic Italian Espresso Tiramisu Cup',
      slug: 'classic-italian-espresso-tiramisu-cup',
      description: 'Savoiardi ladyfingers in Arabica espresso with whipped mascarpone and Valrhona cocoa.',
      basePrice: 169,
      images: ['https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['1 Cup', 'Pack of 2', 'Pack of 4'],
      availableFlavours: ['Espresso Mascarpone'],
      averageRating: 4.91,
      reviewCount: 124,
      isBestSeller: true,
      egglessAvailable: true,
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16 overflow-x-hidden max-w-full">
      {/* SECTION 1: HERO SHOWCASE (THE MUFFIN HOUSE D2C STYLE) */}
      <section
        className="relative w-full h-[54vh] xs:h-[58vh] sm:h-[68vh] lg:h-[76vh] min-h-[400px] max-h-[720px] overflow-hidden bg-brand-chocolate select-none touch-pan-y group"
        onTouchStart={handleHeroTouchStart}
        onTouchMove={handleHeroTouchMove}
        onTouchEnd={handleHeroTouchEnd}
      >
        {celebrationOccasions.map((activeCake, idx) => {
          const isActive = idx === selectedOccasionIndex;

          return (
            <div
              key={activeCake.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Smooth Subtle Ken Burns Zoom */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={activeCake.image}
                  alt={activeCake.cakeName}
                  className={`w-full h-full object-cover object-[center_top] sm:object-[center_25%] origin-top transition-transform duration-[6000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
                {/* Edge-to-Edge High-Contrast Dual Gradient for Crisp Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-chocolate/95 via-brand-chocolate/40 to-transparent pointer-events-none" />
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-brand-chocolate/90 via-brand-chocolate/30 to-transparent pointer-events-none" />
              </div>

              {/* Overlaid Title & CTA Container (The Muffin House Style) */}
              <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 xs:pb-14 sm:pb-16 lg:pb-20">
                <div className="max-w-xl sm:max-w-2xl space-y-2.5 sm:space-y-3.5">
                  {/* Brand Tagline Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-chocolate/85 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-[10px] sm:text-xs font-bold tracking-wider uppercase font-sans">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Baking You Happy &bull; Kerala Patisserie</span>
                  </div>

                  {/* Clean, Bold Sans-Serif Cake Headline */}
                  <h1 className="font-heading font-extrabold text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight drop-shadow-md">
                    {activeCake.cakeName}
                  </h1>

                  {/* Flavor Tagline */}
                  <p className="text-xs sm:text-sm lg:text-base text-white/90 font-medium font-body leading-relaxed drop-shadow-sm max-w-lg">
                    {activeCake.tagline}
                  </p>

                  {/* Dual Action CTA Buttons */}
                  <div className="pt-1.5 flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <Link
                      href={`/cakes/${activeCake.slug}`}
                      className="inline-flex items-center gap-2 py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-full bg-brand-caramel hover:bg-brand-gold hover:text-brand-chocolate text-white font-bold text-xs sm:text-sm font-sans transition-all shadow-[0_8px_24px_rgba(186,99,0,0.35)] active:scale-95 group/btn min-h-[44px] sm:min-h-[48px] border border-brand-gold/20"
                    >
                      <span className="tracking-wide uppercase text-[11px] sm:text-xs font-bold">Order Now</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/cakes"
                      className="inline-flex items-center gap-2 py-2.5 sm:py-3.5 px-5 sm:px-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-brand-chocolate font-bold text-xs sm:text-sm font-sans backdrop-blur-xs transition-all border border-white/35 active:scale-95 min-h-[44px] sm:min-h-[48px]"
                    >
                      <span>Explore Menu</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Side Carousel Navigation Arrows (The Muffin House Style) */}
        <button
          type="button"
          onClick={handlePrevSlide}
          aria-label="Previous Slide"
          className="absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-brand-chocolate/90 text-white flex items-center justify-center backdrop-blur-xs transition-all border border-white/25 active:scale-95 shadow-lg group"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          type="button"
          onClick={handleNextSlide}
          aria-label="Next Slide"
          className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-brand-chocolate/90 text-white flex items-center justify-center backdrop-blur-xs transition-all border border-white/25 active:scale-95 shadow-lg group"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Hero Slide Indicator Dots (Centered at Bottom) */}
        <div className="absolute bottom-3.5 sm:bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-2 pointer-events-auto">
          {celebrationOccasions.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setSelectedOccasionIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                dotIdx === selectedOccasionIndex
                  ? 'w-7 sm:w-9 bg-brand-gold shadow-md'
                  : 'w-2 bg-white/45 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: SHOP BY CATEGORY (THE MUFFIN HOUSE D2C VISUAL GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] xs:text-[11px] sm:text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-0.5 sm:mb-1 truncate font-sans">
              Handcrafted Collections
            </span>
            <h2 className="font-heading font-extrabold text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-brand-chocolate tracking-tight leading-tight">
              Shop By Category
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden sm:inline-flex text-[11px] font-semibold text-brand-chocolate/50 items-center gap-1 font-sans">
              <span>Auto-gliding</span>
              <span className="text-brand-caramel font-bold">&bull;</span>
              <span>Swipe</span>
            </span>
            <Link
              href="/categories"
              className="text-xs sm:text-sm font-bold text-brand-caramel hover:text-brand-chocolate flex items-center gap-1 group whitespace-nowrap pl-2 border-l border-brand-chocolate/15 sm:border-l-0 sm:pl-0 font-sans"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Visual Category Showcase Cards (Clean, modern squircle / circular D2C bakery style) */}
        <div
          ref={categoryScrollRef}
          onMouseEnter={() => setIsCategoryPaused(true)}
          onMouseLeave={() => setIsCategoryPaused(false)}
          onTouchStart={() => setIsCategoryPaused(true)}
          onTouchEnd={() => setIsCategoryPaused(false)}
          className="flex gap-3 sm:gap-5 lg:gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayCategories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/cakes?category=${cat.slug}`}
              className="group flex flex-col items-center shrink-0 w-[130px] xs:w-[150px] sm:w-[175px] lg:w-[195px] text-center"
            >
              {/* Category Image Card */}
              <div className="relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-chocolate/10 group-hover:border-brand-caramel shadow-sm group-hover:shadow-lg transition-all duration-300 bg-brand-cream/40">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Category Title in Modern Sans-Serif */}
              <h3 className="font-heading font-bold text-xs xs:text-sm sm:text-base text-brand-chocolate group-hover:text-brand-caramel transition-colors mt-2.5 leading-tight tracking-tight">
                {cat.name}
              </h3>
              <span className="text-[10px] sm:text-[11px] text-brand-caramel font-semibold mt-0.5 font-body flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                <span>Explore</span>
                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: BEST SELLING CAKES (2 CARDS PER SCREEN ON MOBILE) */}
      <ProductCarouselSection
        badge="Most Ordered & Loved"
        title="Best Selling Cakes"
        categorySlug="all"
        products={displayBestSellers}
        autoScrollInterval={3000}
      />

      {/* SECTION 3A: BEST SELLING BIRTHDAY CAKES (2 CARDS PER SCREEN ON MOBILE) */}
      <ProductCarouselSection
        badge="Birthday Favorites"
        title="Best Selling Birthday Cakes"
        categorySlug="birthday-cakes"
        products={birthdayCakes}
        autoScrollInterval={3400}
      />

      {/* SECTION 3B: BEST SELLING CHOCOLATE CAKES (2 CARDS PER SCREEN ON MOBILE) */}
      <ProductCarouselSection
        badge="Pure Couverture Truffles"
        title="Best Selling Chocolate Cakes"
        categorySlug="chocolate-cakes"
        products={chocolateCakes}
        autoScrollInterval={3600}
      />

      {/* SECTION 3C: BEST SELLING EGGLESS CAKES (2 CARDS PER SCREEN ON MOBILE) */}
      <ProductCarouselSection
        badge="100% Pure Vegetarian"
        title="Best Selling Eggless Cakes"
        categorySlug="eggless-cakes"
        products={egglessCakes}
        autoScrollInterval={3200}
      />

      {/* SECTION 3D: BEST SELLING WEDDING & ANNIVERSARY CAKES (2 CARDS PER SCREEN ON MOBILE) */}
      <ProductCarouselSection
        badge="Grand Milestone Centerpieces"
        title="Best Selling Wedding & Anniversary Cakes"
        categorySlug="wedding-cakes"
        products={weddingCakes}
        autoScrollInterval={3800}
      />

      {/* SECTION 3E: BEST SELLING PASTRIES & SWEETS (2 CARDS PER SCREEN ON MOBILE) */}
      <ProductCarouselSection
        badge="Patisserie Slices & Gourmet Confections"
        title="Best Selling Pastries & Sweets"
        categorySlug="pastries"
        products={pastriesAndSweets}
        autoScrollInterval={3100}
      />

      {/* SECTION 4: PINCODE DELIVERY CHECKER & BRANCH LOCATOR PROMOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-gradient-to-br from-[#FAF8F5] to-brand-peach/40 rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-10 border border-brand-chocolate/10 shadow-sm">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase font-bold text-brand-caramel tracking-widest block">
              Multi-Branch Network
            </span>
            <h2 className="section-title font-heading text-brand-chocolate">
              Freshly Baked at Your Local Branch
            </h2>
            <p className="text-sm text-brand-chocolate/80 leading-relaxed font-body">
              To guarantee maximum freshness, all cakes are baked and decorated at the Chef&apos;s Cake World branch
              closest to your celebration venue. Enter your delivery PIN code to see available express delivery slots!
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-semibold text-brand-chocolate pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-caramel" />
                <span>Attingal (695101)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-caramel" />
                <span>Kazhakootam (695582)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-caramel" />
                <span>Kerala Express Delivery</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <PincodeCheckerModal />
          </div>
        </div>
      </section>

      {/* SECTION 7: BESPOKE CUSTOM CAKE STUDIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-chocolate text-white p-6 sm:p-10 lg:p-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop"
              alt="Custom Cake Backdrop"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-caramel/40 text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-brand-gold/30">
              <Cake className="w-3.5 h-3.5" />
              <span>Bespoke Confectionery Studio</span>
            </div>

            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-brand-cream tracking-tight leading-tight">
              Have a Dream Cake Design in Mind?
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-brand-cream/80 leading-relaxed font-body">
              Whether it is a 4-tier sculpted floral wedding cake, a fairytale theme for your child&apos;s milestone, or a
              corporate launch masterpiece, our master decorators will bring your creative vision to life with complete flavor customization.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/custom-cakes"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-brand-caramel text-white font-bold text-sm sm:text-base hover:bg-white hover:text-brand-chocolate transition-all shadow-md text-center flex items-center justify-center gap-2 group min-h-[44px]"
              >
                <span>Design Your Custom Cake</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/branches"
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-brand-cream/10 text-brand-cream border border-brand-cream/20 font-semibold text-sm sm:text-base hover:bg-brand-cream/20 transition-all text-center min-h-[44px] flex items-center justify-center"
              >
                Consult in Person at Branch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR BRANCHES (KERALA ATELIER BOUTIQUES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <span className="text-[10px] xs:text-[11px] sm:text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-0.5 sm:mb-1">
              Store Network
            </span>
            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-brand-chocolate tracking-tight">
              Visit Our 8 Kerala Patisseries
            </h2>
          </div>
          <Link
            href="/branches"
            className="text-xs sm:text-sm font-bold text-brand-caramel hover:text-brand-chocolate flex items-center gap-1 group shrink-0"
          >
            <span>View All Details &amp; Maps</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {OFFICIAL_BRANCHES.map((b) => (
            <div
              key={b.branchCode}
              className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-brand-chocolate/12 shadow-[0_4px_16px_rgba(66,6,0,0.06)] hover:shadow-[0_12px_28px_rgba(66,6,0,0.12)] hover:border-brand-caramel/40 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="font-heading text-base sm:text-lg text-brand-chocolate group-hover:text-brand-caramel transition-colors font-bold">
                      {b.shortName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Patisserie &amp; Kitchen Open</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-chocolate/10 text-brand-chocolate shrink-0 border border-brand-chocolate/15">
                    {b.branchCode.replace('CCW-', '')}
                  </span>
                </div>
                <p className="text-xs text-brand-chocolate/70 leading-relaxed line-clamp-2 font-body">
                  {b.address}
                </p>
                <div className="text-[11px] text-brand-chocolate/80 space-y-0.5 pt-1.5 border-t border-brand-chocolate/8">
                  <p className="flex items-center gap-1.5 text-brand-chocolate/65">
                    <Clock className="w-3.5 h-3.5 text-brand-caramel shrink-0" />
                    <span>{b.openingHours}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-brand-chocolate/10 flex items-center gap-2">
                <a
                  href={`tel:${b.rawPhone}`}
                  className="flex-1 py-2 px-2 rounded-xl bg-white hover:bg-brand-caramel hover:text-white text-brand-chocolate text-[11px] font-bold transition-all flex items-center justify-center gap-1 shadow-2xs border border-brand-chocolate/10"
                >
                  <Phone className="w-3 h-3 text-brand-caramel group-hover:text-white" />
                  <span>Call Shop</span>
                </a>
                <a
                  href={b.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl bg-brand-chocolate hover:bg-brand-caramel text-brand-gold hover:text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1 shadow-2xs"
                  title="Open location in Google Maps"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Map</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-[10px] xs:text-[11px] sm:text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-0.5 sm:mb-1">
            Real Reviews
          </span>
          <h2 className="section-title font-heading text-brand-chocolate text-xl xs:text-2xl sm:text-3xl lg:text-4xl">
            Loved Across Every Celebration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-brand-chocolate/10 shadow-[0_4px_16px_rgba(66,6,0,0.06)] space-y-3 sm:space-y-4">
            <div className="flex text-brand-caramel">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-brand-chocolate/80 italic leading-relaxed font-body">
              &ldquo;Ordered the Royal Belgian Chocolate Truffle for my mother&apos;s 60th birthday. The ganache was rich,
              velvety, and not overly sweet. Delivered right at midnight in Attingal with perfect packaging!&rdquo;
            </p>
            <div className="pt-2 border-t border-brand-chocolate/10 flex items-center justify-between text-xs">
              <span className="font-bold text-brand-chocolate">Pooja Nair</span>
              <span className="text-brand-chocolate/60">Attingal, Kerala</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-brand-chocolate/10 shadow-[0_4px_16px_rgba(66,6,0,0.06)] space-y-3 sm:space-y-4">
            <div className="flex text-brand-caramel">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-brand-chocolate/80 italic leading-relaxed font-body">
              &ldquo;Their custom cake consultation was flawless. I shared a Pinterest moodboard for our engagement cake and
              Chef&apos;s Cake World executed the exact floral fondant tiers. Guests couldn&apos;t stop raving.&rdquo;
            </p>
            <div className="pt-2 border-t border-brand-chocolate/10 flex items-center justify-between text-xs">
              <span className="font-bold text-brand-chocolate">Rohan &amp; Arya</span>
              <span className="text-brand-chocolate/60">Kazhakootam, Kerala</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-brand-chocolate/10 shadow-[0_4px_16px_rgba(66,6,0,0.06)] space-y-3 sm:space-y-4">
            <div className="flex text-brand-caramel">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-brand-chocolate/80 italic leading-relaxed font-body">
              &ldquo;As a strict vegetarian family, finding high-end eggless cakes that don&apos;t feel dense is tough.
              Their Red Velvet Eggless cake is so moist and authentic. Hands down best in Kerala.&rdquo;
            </p>
            <div className="pt-2 border-t border-brand-chocolate/10 flex items-center justify-between text-xs">
              <span className="font-bold text-brand-chocolate">Anjali Menon</span>
              <span className="text-brand-chocolate/60">Kazhakootam, Kerala</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: BRAND STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-[#FAF8F5] border border-brand-chocolate/12 p-6 sm:p-10 lg:p-16 shadow-[0_8px_30px_rgba(66,6,0,0.06)]">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5">
            <span className="text-[10px] xs:text-[11px] sm:text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-0.5 sm:mb-1">
              The Chef&apos;s Cake World Philosophy
            </span>
            <h2 className="section-title font-heading text-brand-chocolate text-xl xs:text-2xl sm:text-3xl lg:text-4xl">
              Artisan Craftsmanship in Every Crumb
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-brand-chocolate/80 leading-relaxed font-body">
              Chef&apos;s Cake World was born out of a culinary conviction: celebrations deserve more than mass-produced cakes
              stored in cold storage for days. By combining European pastry techniques with the celebratory traditions of India,
              we design centerpieces that look breathtaking and taste extraordinary.
            </p>
            <div className="pt-2 sm:pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-caramel hover:text-brand-chocolate transition-colors font-body"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

