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
  Mail,
  Award,
  Phone,
  MapPin,
  Truck
} from 'lucide-react';
import { api } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import ProductCarouselSection from '@/components/products/ProductCarouselSection';
import PincodeCheckerModal from '@/components/common/PincodeCheckerModal';

const celebrationOccasions = [
  {
    id: 'birthday',
    label: 'Birthday Bash',
    icon: '🎂',
    subtitle: 'Free custom plaque & candles',
    cakeName: 'Royal Belgian Couverture Birthday Cake',
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
    icon: '💍',
    subtitle: 'Grand multi-tier florals & gold',
    cakeName: 'Grand 3-Tier Couverture & Floral Masterpiece',
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
    icon: '🍫',
    subtitle: 'Intense 70% Callebaut ganache',
    cakeName: 'Decadent Dark Truffle & Roasted Hazelnut',
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
    icon: '🌿',
    subtitle: 'Certified pure vegetarian line',
    cakeName: 'Pure Eggless Red Velvet & Cream Cheese Luxe',
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
    icon: '✨',
    subtitle: 'Speculoos mousse & crunchy biscuit',
    cakeName: 'Lotus Biscoff Speculoos Dream Cake',
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
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
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
        const step = 290;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          categoryScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          categoryScrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 2800);

    return () => clearInterval(timer);
  }, [isCategoryPaused]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    }
  };

  // Fallback categories if server not yet populated
  const displayCategories = categories.length > 0 ? categories : [
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
      slug: 'fresh-red-velvet-cream-cheese-luxe',
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
      slug: 'fresh-red-velvet-cream-cheese-luxe',
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
      slug: 'lotus-biscoff-speculoos-dream-cake',
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
      slug: 'royal-belgian-chocolate-truffle-cake',
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
      slug: 'royal-belgian-chocolate-truffle-cake',
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
      slug: 'royal-belgian-chocolate-truffle-cake',
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
      slug: 'royal-belgian-chocolate-truffle-cake',
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
      slug: 'fresh-red-velvet-cream-cheese-luxe',
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
      slug: 'fresh-red-velvet-cream-cheese-luxe',
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
      slug: 'royal-belgian-chocolate-truffle-cake',
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
      slug: 'royal-belgian-chocolate-truffle-cake',
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
      slug: 'royal-belgian-chocolate-truffle-cake',
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
      slug: 'fresh-red-velvet-cream-cheese-luxe',
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
      slug: 'exotic-fresh-seasonal-fruit-ambrosia',
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
      slug: 'royal-belgian-chocolate-truffle-cake',
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
      slug: 'exotic-fresh-seasonal-fruit-ambrosia',
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

  return (
    <div className="space-y-20 pb-20">
      {/* SECTION 1: FULL-SCREEN IMAGE HERO CAROUSEL WITH CONTINUOUS AUTO-ROTATION & TOUCH SWIPE */}
      <section
        className="relative w-full h-[75vh] sm:h-[84vh] lg:h-[90vh] overflow-hidden bg-black select-none touch-pan-y"
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
              {/* Full-Screen Background Image - Positioned to keep top of cake fully visible below navbar */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={activeCake.image}
                  alt={activeCake.cakeName}
                  className={`w-full h-full object-cover object-[center_top] sm:object-[center_12%] origin-top transition-transform duration-[4000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
                {/* Luxury Multi-layer Dark Gradients - Clear top with zero dark masking under navbar */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              </div>

              {/* Overlaid Content Container - Minimal & Clean with Top Headroom */}
              <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pt-10 sm:pt-16 pb-12 xs:pb-14 sm:pb-20 lg:pb-24">
                <div className="max-w-xl sm:max-w-2xl space-y-2.5 sm:space-y-4">
                  
                  {/* Subtle Badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-brand-chocolate/85 border border-brand-gold/40 text-brand-gold text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                    <span>{activeCake.icon}</span>
                    <span>{activeCake.badge}</span>
                  </span>

                  {/* Clean Title */}
                  <h1 className="font-heading text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight drop-shadow-lg">
                    {activeCake.cakeName}
                  </h1>

                  {/* Short Price & Dispatch Line */}
                  <p className="text-xs xs:text-sm sm:text-lg font-medium text-brand-gold drop-shadow-sm flex items-center gap-2">
                    <span className="font-bold text-white text-base xs:text-lg sm:text-2xl">₹{activeCake.prices['0.5kg']}</span>
                    <span className="text-white/60">&bull;</span>
                    <span className="text-brand-cream/90 text-xs xs:text-sm sm:text-base">2-Hour Fresh Doorstep Dispatch</span>
                  </p>

                  {/* Action CTA Buttons */}
                  <div className="pt-1 flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
                    <Link
                      href={`/cakes/${activeCake.slug}`}
                      className="py-2.5 sm:py-3 px-5 sm:px-8 rounded-xl sm:rounded-2xl bg-brand-caramel hover:bg-brand-gold hover:text-brand-chocolate text-white font-bold text-xs sm:text-sm transition-all shadow-xl flex items-center gap-2 group min-h-[44px]"
                    >
                      <span>Order Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/cakes"
                      className="py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 min-h-[44px] flex items-center"
                    >
                      View All Cakes
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* SECTION 2: EXPLORE OUR CAKES (ONE LINE TITLE & AUTOMATIC MOVEMENT CAROUSEL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="min-w-0">
            <span className="text-[11px] sm:text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-1">
              Curated Collections
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-chocolate whitespace-nowrap tracking-tight">
              Explore Our Cakes
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden sm:inline-flex text-[11px] font-semibold text-brand-chocolate/50 items-center gap-1">
              <span>Auto-moving</span>
              <span className="text-brand-caramel font-bold">&bull;</span>
              <span>Swipe to explore</span>
            </span>
            <Link
              href="/categories"
              className="text-xs sm:text-sm font-bold text-brand-caramel hover:text-brand-chocolate flex items-center gap-1 group whitespace-nowrap pl-2 border-l border-brand-chocolate/15 sm:border-l-0 sm:pl-0"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Single-Line Automatic Movement Carousel Track */}
        <div
          ref={categoryScrollRef}
          onMouseEnter={() => setIsCategoryPaused(true)}
          onMouseLeave={() => setIsCategoryPaused(false)}
          onTouchStart={() => setIsCategoryPaused(true)}
          onTouchEnd={() => setIsCategoryPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayCategories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/cakes?category=${cat.slug}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-square w-[210px] xs:w-[240px] sm:w-[270px] lg:w-[290px] shrink-0 border border-brand-chocolate/10 shadow-cake-soft hover:shadow-cake-hover transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-chocolate/90 via-brand-chocolate/30 to-transparent group-hover:from-brand-chocolate/95 transition-colors" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-heading text-lg sm:text-xl text-brand-cream group-hover:text-brand-gold transition-colors leading-tight">
                  {cat.name}
                </h3>
                <span className="text-[11px] font-semibold text-brand-cream/80 flex items-center gap-1 mt-1 opacity-90 group-hover:opacity-100">
                  <span>Browse Cakes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
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

      {/* SECTION 4: PINCODE DELIVERY CHECKER & BRANCH LOCATOR PROMOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-peach/50 rounded-3xl p-6 sm:p-10 border border-brand-chocolate/10">
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

      {/* SECTION 5: CUSTOM CAKE EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-brand-chocolate text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop"
              alt="Custom Cake Backdrop"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-caramel/40 text-brand-gold text-xs font-bold uppercase tracking-wider border border-brand-gold/30">
              <Cake className="w-3.5 h-3.5" />
              <span>Bespoke Confectionery Studio</span>
            </div>

            <h2 className="hero-title font-heading text-brand-cream">
              Have a Dream Cake Design in Mind?
            </h2>

            <p className="text-sm sm:text-base text-brand-cream/80 leading-relaxed font-body">
              Whether it is a 4-tier sculpted floral wedding cake, a fairytale theme for your child&apos;s milestone, or a
              corporate launch masterpiece, our master decorators will bring your creative vision to life with complete flavor customization.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/custom-cakes"
                className="px-8 py-4 rounded-xl bg-brand-caramel text-white font-bold text-base hover:bg-white hover:text-brand-chocolate transition-all shadow-md text-center flex items-center justify-center gap-2 group"
              >
                <span>Design Your Custom Cake</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/branches"
                className="px-6 py-4 rounded-xl bg-brand-cream/10 text-brand-cream border border-brand-cream/20 font-semibold text-base hover:bg-brand-cream/20 transition-all text-center"
              >
                Consult in Person at Branch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-1">
            Our Quality Pledge
          </span>
          <h2 className="section-title font-heading text-brand-chocolate">
            Why Celebrate With Chef&apos;s Cake World?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-peach flex items-center justify-center text-brand-chocolate">
              <Cake className="w-6 h-6 text-brand-caramel" />
            </div>
            <h3 className="font-heading text-xl text-brand-chocolate">Freshly Prepared on Order</h3>
            <p className="text-xs sm:text-sm text-brand-chocolate/70 leading-relaxed">
              We never freeze cakes or serve days-old inventory. Every cake sponge is baked and decorated fresh on the day of delivery.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-peach flex items-center justify-center text-brand-chocolate">
              <Award className="w-6 h-6 text-brand-caramel" />
            </div>
            <h3 className="font-heading text-xl text-brand-chocolate">Pure Couverture Chocolate</h3>
            <p className="text-xs sm:text-sm text-brand-chocolate/70 leading-relaxed">
              We use authentic 70% Callebaut Belgian and Dutch cocoa. No compound chocolate or vegetable oil shortcuts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-peach flex items-center justify-center text-brand-chocolate">
              <Store className="w-6 h-6 text-brand-caramel" />
            </div>
            <h3 className="font-heading text-xl text-brand-chocolate">Multiple Kerala Kitchens</h3>
            <p className="text-xs sm:text-sm text-brand-chocolate/70 leading-relaxed">
              With 8 artisan branches across Kerala (Attingal, Kazhakootam, Alamcode, Kumarapuram, Ulloor, Vattappara, Vetturoad, Ambalathinkara), your orders are routed to the closest patisserie for rapid 2-hour doorstep delivery.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-peach flex items-center justify-center text-brand-chocolate">
              <Clock className="w-6 h-6 text-brand-caramel" />
            </div>
            <h3 className="font-heading text-xl text-brand-chocolate">Midnight &amp; Slot Delivery</h3>
            <p className="text-xs sm:text-sm text-brand-chocolate/70 leading-relaxed">
              Make birthday midnight surprises truly unforgettable with our dedicated 11:00 PM - 12:00 AM delivery slot.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-peach flex items-center justify-center text-brand-chocolate">
              <HeartHandshake className="w-6 h-6 text-brand-caramel" />
            </div>
            <h3 className="font-heading text-xl text-brand-chocolate">Celebration-Focused Service</h3>
            <p className="text-xs sm:text-sm text-brand-chocolate/70 leading-relaxed">
              Complementary customized celebration plaque message, sparkler candles, and secure presentation boxes with every cake.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-peach flex items-center justify-center text-brand-chocolate">
              <ShieldCheck className="w-6 h-6 text-brand-caramel" />
            </div>
            <h3 className="font-heading text-xl text-brand-chocolate">FSSAI Certified Hygiene</h3>
            <p className="text-xs sm:text-sm text-brand-chocolate/70 leading-relaxed">
              Operating under strict food safety guidelines, sanitized artisan kitchens, and temperature-monitored refrigerated transport.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: OUR BRANCHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-1">
              Physical Stores
            </span>
            <h2 className="section-title font-heading text-brand-chocolate">
              Visit Our Kerala Branches
            </h2>
          </div>
          <Link
            href="/branches"
            className="text-sm font-bold text-brand-caramel hover:text-brand-chocolate flex items-center gap-1 group"
          >
            <span>See Branch Details &amp; Maps</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-heading text-lg text-brand-chocolate">Attingal</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-peach text-brand-chocolate">KL-01</span>
            </div>
            <p className="text-xs text-brand-chocolate/70">Near KSRTC Bus Stand, Main Road, Attingal, Kerala 695101</p>
            <div className="pt-2 border-t border-brand-chocolate/10 text-xs space-y-1 text-brand-chocolate/80">
              <p><strong>Hours:</strong> 09:00 AM - 10:30 PM</p>
              <p><strong>Phone:</strong> +91 98479 60677</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-heading text-lg text-brand-chocolate">Kazhakootam</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-peach text-brand-chocolate">KL-02</span>
            </div>
            <p className="text-xs text-brand-chocolate/70">Near Technopark Campus, Kazhakootam, Thiruvananthapuram 695582</p>
            <div className="pt-2 border-t border-brand-chocolate/10 text-xs space-y-1 text-brand-chocolate/80">
              <p><strong>Hours:</strong> 09:00 AM - 11:00 PM</p>
              <p><strong>Phone:</strong> +91 89210 29932</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-heading text-lg text-brand-chocolate">Upcoming Locations</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-peach text-brand-chocolate">KL-EXP</span>
            </div>
            <p className="text-xs text-brand-chocolate/70">Expanding to more branches across Kerala soon</p>
            <div className="pt-2 border-t border-brand-chocolate/10 text-xs space-y-1 text-brand-chocolate/80">
              <p><strong>Status:</strong> New locations opening</p>
              <p><strong>Support:</strong> +91 98479 60677</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-1">
            Real Reviews
          </span>
          <h2 className="section-title font-heading text-brand-chocolate">
            Loved Across Every Celebration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-cake-soft space-y-4">
            <div className="flex text-brand-caramel">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-brand-chocolate/80 italic leading-relaxed">
              &ldquo;Ordered the Royal Belgian Chocolate Truffle for my mother&apos;s 60th birthday. The ganache was rich,
              velvety, and not overly sweet. Delivered right at midnight in Attingal with perfect packaging!&rdquo;
            </p>
            <div className="pt-2 border-t border-brand-chocolate/10 flex items-center justify-between text-xs">
              <span className="font-bold text-brand-chocolate">Pooja Nair</span>
              <span className="text-brand-chocolate/60">Attingal, Kerala</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-cake-soft space-y-4">
            <div className="flex text-brand-caramel">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-brand-chocolate/80 italic leading-relaxed">
              &ldquo;Their custom cake consultation was flawless. I shared a Pinterest moodboard for our engagement cake and
              Chef&apos;s Cake World executed the exact floral fondant tiers. Guests couldn&apos;t stop raving.&rdquo;
            </p>
            <div className="pt-2 border-t border-brand-chocolate/10 flex items-center justify-between text-xs">
              <span className="font-bold text-brand-chocolate">Rohan &amp; Arya</span>
              <span className="text-brand-chocolate/60">Kazhakootam, Kerala</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-cake-soft space-y-4">
            <div className="flex text-brand-caramel">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-brand-chocolate/80 italic leading-relaxed">
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

      {/* SECTION 9: BRAND STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-peach/40 border border-brand-chocolate/10 p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <span className="text-xs uppercase font-bold text-brand-caramel tracking-widest block">
              The Chef&apos;s Cake World Philosophy
            </span>
            <h2 className="section-title font-heading text-brand-chocolate">
              Artisan Craftsmanship in Every Crumb
            </h2>
            <p className="text-sm sm:text-base text-brand-chocolate/80 leading-relaxed font-body">
              Chef&apos;s Cake World was born out of a culinary conviction: celebrations deserve more than mass-produced cakes
              stored in cold storage for days. By combining European pastry techniques with the celebratory traditions of India,
              we design centerpieces that look breathtaking and taste extraordinary.
            </p>
            <div className="pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-caramel hover:text-brand-chocolate transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-chocolate text-white p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-brand-caramel/40 mx-auto flex items-center justify-center text-brand-gold">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl text-brand-cream">
            Join the Chef&apos;s Cake Circle
          </h2>
          <p className="text-xs sm:text-sm text-brand-cream/80 max-w-md mx-auto">
            Subscribe to receive seasonal collection previews, private festival offers, and an exclusive ₹100 discount voucher on your first order.
          </p>

          {newsletterSubmitted ? (
            <div className="p-4 rounded-xl bg-white/10 text-brand-gold text-sm font-semibold inline-block">
              🎉 Thank you for subscribing! Check your inbox for your welcome voucher.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white text-brand-chocolate placeholder:text-brand-chocolate/50 text-sm flex-1 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-brand-caramel text-white font-bold text-sm hover:bg-white hover:text-brand-chocolate transition-all"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

