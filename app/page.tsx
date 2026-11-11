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
  ChevronLeft,
  ChevronRight,
  Flame,
  Feather
} from 'lucide-react';
import { api } from '@/lib/api';
import { OFFICIAL_BRANCHES } from '@/lib/branchesData';
import ProductCard from '@/components/products/ProductCard';
import PincodeCheckerModal from '@/components/common/PincodeCheckerModal';

const celebrationOccasions = [
  {
    id: 'chocolate',
    index: '01',
    cakeName: 'Royal Belgian Couverture Truffle',
    shortName: 'Belgian Truffle',
    tagline: 'Pure 70% Callebaut Single-Origin',
    price: '₹699',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1600&auto=format&fit=crop',
    slug: 'royal-belgian-chocolate-truffle-cake',
    description: 'Triple-layered dark cocoa sponge smothered in silky Callebaut ganache and hand-rolled dark truffles.',
  },
  {
    id: 'wedding',
    index: '02',
    cakeName: 'Grand Floral Wedding Masterpiece',
    shortName: 'Floral Wedding',
    tagline: 'Hand-Sculpted 24K Edible Gold',
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1600&auto=format&fit=crop',
    slug: 'grand-tiered-golden-wedding-masterpiece',
    description: 'Architectural celebration tiers accented with handcrafted sugar peonies and bourbon vanilla bean sponge.',
  },
  {
    id: 'truffle',
    index: '03',
    cakeName: 'Dark Truffle Roasted Hazelnut',
    shortName: 'Hazelnut Truffle',
    tagline: 'Piedmont Hazelnut Praline',
    price: '₹749',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1600&auto=format&fit=crop',
    slug: 'decadent-dark-truffle-roasted-hazelnut',
    description: 'Bittersweet chocolate mousse layered with roasted hazelnut crunch and a glossy mirror glaze finish.',
  },
  {
    id: 'eggless',
    index: '04',
    cakeName: 'Pure Eggless Red Velvet Luxe',
    shortName: 'Eggless Velvet',
    tagline: '100% Certified Vegetarian Atelier',
    price: '₹749',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=1600&auto=format&fit=crop',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    description: 'Cloud-soft crimson sponge draped in whipped Philadelphia cream cheese frosting, baked without egg.',
  },
  {
    id: 'biscoff',
    index: '05',
    cakeName: 'Lotus Biscoff Speculoos Dream',
    shortName: 'Lotus Biscoff',
    tagline: 'Belgian Caramelized Biscuit Mousse',
    price: '₹799',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=1600&auto=format&fit=crop',
    slug: 'lotus-biscoff-speculoos-dream-cake',
    description: 'Caramelized cinnamon sponge, silky Biscoff mousse, and crunchy spiced butter cookie crumb.',
  }
];

const customerReviews = [
  {
    id: 1,
    name: 'Pooja Nair',
    location: 'Attingal, Kerala',
    occasion: '60th Birthday Celebration',
    cake: 'Royal Belgian Chocolate Truffle',
    rating: 5,
    comment:
      'The Royal Belgian Chocolate Truffle was an absolute showstopper. Rich, velvety, and not overly sweet. Delivered right at midnight in Attingal with pristine packaging!',
  },
  {
    id: 2,
    name: 'Rohan & Arya',
    location: 'Kazhakootam, Kerala',
    occasion: 'Engagement Ceremony',
    cake: 'Bespoke 3-Tier Fondant Atelier',
    rating: 5,
    comment:
      'Their bespoke cake consultation was flawless. We shared a moodboard for our engagement cake and Chef’s Cake World executed the exact floral fondant tiers.',
  },
  {
    id: 3,
    name: 'Anjali Menon',
    location: 'Ulloor, Trivandrum',
    occasion: 'Anniversary Celebration',
    cake: 'Signature Red Velvet Eggless',
    rating: 5,
    comment:
      'As a strict vegetarian family, finding high-end eggless cakes that do not feel dense is tough. Their Red Velvet Eggless is cloud-soft and truly authentic.',
  },
  {
    id: 4,
    name: 'Dr. Vishnu Prasad',
    location: 'Kumarapuram, Trivandrum',
    occasion: 'Daughter’s 1st Birthday',
    cake: 'Fresh Berry Vanilla Mascarpone',
    rating: 5,
    comment:
      'Impeccable craftsmanship and taste. The sponge was cloud-light, with fresh strawberry coulis and zero artificial colors. The delivery coordination was seamless.',
  },
  {
    id: 5,
    name: 'Fathima & Sameer',
    location: 'Alamcode, Kerala',
    occasion: 'Family Milestone',
    cake: 'Hazelnut Praline Crunch',
    rating: 5,
    comment:
      'Chef’s Cake World Alamcode branch made our celebration memorable. The roasted Piedmont hazelnut crunch with milk chocolate ganache is world class.',
  },
  {
    id: 6,
    name: 'Siddharth Rajan',
    location: 'Technopark / Kazhakootam',
    occasion: 'Tech Milestone Party',
    cake: 'Lotus Biscoff Salted Caramel',
    rating: 5,
    comment:
      'Ordered 3 kg Lotus Biscoff cake for our team launch. Perfectly balanced caramelized layers and arrived chilled within 45 minutes of dispatch.',
  },
];

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [selectedOccasionIndex, setSelectedOccasionIndex] = useState(0);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'chocolate' | 'birthday' | 'eggless' | 'wedding' | 'pastries'>('all');
  const [scrollY, setScrollY] = useState(0);

  // Parallax Tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch initial live products from API
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.getCategories().catch(() => ({ categories: [] })),
          api.getProducts('limit=12').catch(() => ({ products: [] })),
        ]);
        if (catRes.categories && catRes.categories.length > 0) {
          setCategories(catRes.categories);
        }
        if (prodRes.products && prodRes.products.length > 0) {
          setBestSellers(prodRes.products);
        }
      } catch (err) {
        // Fallback remains active
      }
    };
    fetchHomeData();
  }, []);

  // Hero Carousel Auto-Timer with Smooth Progress
  const [heroProgress, setHeroProgress] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  useEffect(() => {
    if (isHeroPaused) return;

    const interval = 50; // Update progress every 50ms
    const totalDuration = 6000; // 6 seconds per slide
    const increment = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setHeroProgress((prev) => {
        if (prev >= 100) {
          setSelectedOccasionIndex((current) => (current + 1) % celebrationOccasions.length);
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isHeroPaused, selectedOccasionIndex]);

  const handleNextHero = () => {
    setHeroProgress(0);
    setSelectedOccasionIndex((prev) => (prev + 1) % celebrationOccasions.length);
  };

  const handlePrevHero = () => {
    setHeroProgress(0);
    setSelectedOccasionIndex((prev) => (prev - 1 + celebrationOccasions.length) % celebrationOccasions.length);
  };

  // Touch Swipe for Hero
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNextHero();
      else handlePrevHero();
    }
    touchStartX.current = null;
  };

  // Category Carousel Auto-scroll
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [isCategoryPaused, setIsCategoryPaused] = useState(false);

  useEffect(() => {
    if (isCategoryPaused) return;

    const timer = setInterval(() => {
      if (categoryScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
        const step = clientWidth < 640 ? 190 : 260;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          categoryScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          categoryScrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 3200);

    return () => clearInterval(timer);
  }, [isCategoryPaused]);

  // Product Showcase Scroll Track
  const productScrollRef = useRef<HTMLDivElement>(null);
  const scrollProducts = (dir: 'left' | 'right') => {
    if (!productScrollRef.current) return;
    const clientWidth = productScrollRef.current.clientWidth;
    const scrollAmount = clientWidth < 640 ? clientWidth * 0.85 : 460;
    productScrollRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Branches Carousel Movement & Navigation
  const branchesScrollRef = useRef<HTMLDivElement>(null);
  const [isBranchesPaused, setIsBranchesPaused] = useState(false);

  const scrollBranches = (direction: 'left' | 'right') => {
    if (!branchesScrollRef.current) return;
    const clientWidth = branchesScrollRef.current.clientWidth;
    const scrollAmount = clientWidth < 640 ? clientWidth * 0.85 : 340;
    branchesScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (isBranchesPaused) return;

    const timer = setInterval(() => {
      if (branchesScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = branchesScrollRef.current;
        const step = clientWidth < 640 ? clientWidth * 0.85 : 340;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          branchesScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          branchesScrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isBranchesPaused]);

  // Reviews Carousel Movement & Navigation
  const reviewsScrollRef = useRef<HTMLDivElement>(null);
  const [isReviewsPaused, setIsReviewsPaused] = useState(false);

  const scrollReviews = (direction: 'left' | 'right') => {
    if (!reviewsScrollRef.current) return;
    const clientWidth = reviewsScrollRef.current.clientWidth;
    const scrollAmount = clientWidth < 640 ? clientWidth * 0.85 : 360;
    reviewsScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (isReviewsPaused) return;

    const timer = setInterval(() => {
      if (reviewsScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = reviewsScrollRef.current;
        const step = clientWidth < 640 ? clientWidth * 0.85 : 360;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          reviewsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          reviewsScrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [isReviewsPaused]);

  // Master Categories
  const displayCategories = categories.length > 0 ? categories : [
    { name: 'Belgian Couverture', slug: 'chocolate-cakes', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop' },
    { name: 'Artisan Pastries', slug: 'pastries', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop' },
    { name: 'Pure Eggless', slug: 'eggless-cakes', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=600&auto=format&fit=crop' },
    { name: 'Birthday Favorites', slug: 'birthday-cakes', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=600&auto=format&fit=crop' },
    { name: 'Wedding Atelier', slug: 'wedding-cakes', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=600&auto=format&fit=crop' },
    { name: 'Sweets & Desserts', slug: 'sweets-desserts', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop' },
    { name: 'Bespoke Custom', slug: 'designer-cakes', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop' },
    { name: 'Anniversary Luxe', slug: 'anniversary-cakes', image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=600&auto=format&fit=crop' }
  ];

  // Master Curated Product Lists
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
      availableFlavours: ['Fresh Vanilla Fruit'],
      averageRating: 4.8,
      reviewCount: 64,
      isBestSeller: false,
      egglessAvailable: true,
    },
    {
      _id: 'sample-5',
      name: 'Decadent Dark Truffle & Roasted Hazelnut',
      slug: 'decadent-dark-truffle-roasted-hazelnut',
      description: 'Pure 70% single-origin Callebaut couverture with mirror drip and roasted hazelnuts.',
      basePrice: 749,
      images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Roasted Hazelnut Dark'],
      averageRating: 4.94,
      reviewCount: 310,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'sample-6',
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
    }
  ];

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
    }
  ];

  const birthdayCakes = [
    {
      _id: 'bday-1',
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
      _id: 'bday-2',
      name: 'Fresh Red Velvet Birthday Special',
      slug: 'fresh-red-velvet-cream-cheese-luxe',
      description: 'Crimson cocoa sponge draped in whipped Philadelphia cream cheese with celebratory plaque.',
      basePrice: 749,
      images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Cream Cheese'],
      averageRating: 4.9,
      reviewCount: 110,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'bday-3',
      name: 'Classic Black Forest Cherry Royale',
      slug: 'classic-black-forest-cherry-royale',
      description: 'Layers of chocolate sponge, tart Morello cherries, and fresh dairy cream rosettes.',
      basePrice: 599,
      images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Cherry Royale'],
      averageRating: 4.88,
      reviewCount: 88,
      isBestSeller: false,
      egglessAvailable: true,
    }
  ];

  const egglessCakes = [
    {
      _id: 'egg-1',
      name: 'Signature Pure Eggless Red Velvet',
      slug: 'fresh-red-velvet-cream-cheese-luxe',
      description: '100% vegetarian formulation with cloud-like moistness and light cream cheese frosting.',
      basePrice: 749,
      images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Vegetarian Velvet'],
      averageRating: 4.93,
      reviewCount: 220,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'egg-2',
      name: 'Pure Eggless Belgian Chocolate Truffle',
      slug: 'royal-belgian-chocolate-truffle-cake',
      description: 'Pure Callebaut 70% dark chocolate mousse on vegetarian chocolate sponge.',
      basePrice: 699,
      images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Eggless Belgian Truffle'],
      averageRating: 4.96,
      reviewCount: 310,
      isBestSeller: true,
      egglessAvailable: true,
    },
    {
      _id: 'egg-3',
      name: 'Pure Eggless Mango Alphonso Ambrosia',
      slug: 'exotic-fresh-seasonal-fruit-ambrosia',
      description: 'Ratnagiri Alphonso mango compote layered with light vanilla cream and white chocolate.',
      basePrice: 749,
      images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop'],
      availableWeights: ['0.5 kg', '1 kg', '2 kg'],
      availableFlavours: ['Alphonso Mango'],
      averageRating: 4.9,
      reviewCount: 74,
      isBestSeller: false,
      egglessAvailable: true,
    }
  ];

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
    }
  ];

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
    }
  ];

  // Dynamic filter products by active tab
  const getTabProducts = () => {
    switch (activeCategoryTab) {
      case 'chocolate':
        return chocolateCakes;
      case 'birthday':
        return birthdayCakes;
      case 'eggless':
        return egglessCakes;
      case 'wedding':
        return weddingCakes;
      case 'pastries':
        return pastriesAndSweets;
      case 'all':
      default:
        return displayBestSellers;
    }
  };

  const activeProducts = getTabProducts();

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-28 pb-20 overflow-x-hidden max-w-full bg-brand-cream text-brand-chocolate selection:bg-brand-caramel selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: THE CINEMATIC HAUTE PÂTISSERIE HERO
          (Unique, Wonder & MNC Level Minimalist Editorial)
      ────────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full h-[88vh] xs:h-[90vh] sm:h-[92vh] max-h-[960px] min-h-[580px] overflow-hidden bg-[#1a0300] select-none touch-pan-y group"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {celebrationOccasions.map((cake, idx) => {
          const isActive = idx === selectedOccasionIndex;

          return (
            <div
              key={cake.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Cinematic Background Photography with Subtle Parallax */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                style={{
                  transform: `translate3d(0, ${Math.min(scrollY * 0.3, 140)}px, 0)`,
                }}
              >
                <img
                  src={cake.image}
                  alt={cake.cakeName}
                  className={`w-full h-full object-cover object-[center_35%] transition-transform duration-[8000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
                {/* Ultra-Clean Architectural Dual Vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30 pointer-events-none" />
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent pointer-events-none" />
              </div>

              {/* Minimal Luxury Editorial Content */}
              <div
                className="relative z-10 max-w-7xl mx-auto h-full px-5 sm:px-8 lg:px-12 flex flex-col justify-end pt-24 pb-20 xs:pb-22 sm:pb-24 lg:pb-28 will-change-transform"
                style={{
                  transform: `translate3d(0, -${Math.min(scrollY * 0.18, 70)}px, 0)`,
                  opacity: Math.max(0, 1 - scrollY / 600),
                }}
              >
                <div className="max-w-2xl space-y-3 sm:space-y-4">
                  {/* Subtle Haute Pâtisserie Tag */}
                  <div
                    className={`inline-flex items-center gap-2 text-brand-gold text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-body transition-all duration-700 ease-out delay-100 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <span>Haute Pâtisserie</span>
                    <span className="text-white/40">&bull;</span>
                    <span>Kerala Ateliers</span>
                    <span className="text-white/40">&bull;</span>
                    <span className="text-white/90 font-bold">{cake.price}</span>
                  </div>

                  {/* Commanding Playfair Display Heading */}
                  <h1
                    className={`font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight drop-shadow-xl transition-all duration-700 ease-out delay-200 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {cake.cakeName}
                  </h1>

                  {/* Minimal Sub-line Description */}
                  <p
                    className={`text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed font-body transition-all duration-700 ease-out delay-250 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                  >
                    {cake.description}
                  </p>

                  {/* Refined Luxury CTAs */}
                  <div
                    className={`pt-2 flex items-center gap-3 transition-all duration-700 ease-out delay-300 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                  >
                    <Link
                      href={`/cakes/${cake.slug}`}
                      className="btn font-body font-semibold inline-flex items-center justify-center gap-2 py-3 px-7 sm:px-9 rounded-full bg-white text-brand-chocolate hover:bg-brand-gold hover:text-brand-chocolate text-xs sm:text-sm transition-all duration-300 shadow-xl active:scale-95 group/btn"
                    >
                      <span>Order Creation</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/cakes"
                      className="btn font-body font-semibold inline-flex items-center justify-center py-3 px-6 sm:px-7 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm backdrop-blur-md transition-all duration-300 border border-white/20 active:scale-95"
                    >
                      <span>Explore Menu</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Unique Slide Counter & Sleek Thin Progress Tracker (Bottom Right) */}
        <div className="absolute right-5 sm:right-8 lg:right-12 bottom-8 z-20 flex items-center gap-4 text-white pointer-events-auto">
          {/* Slide Index e.g. 01 / 05 */}
          <div className="text-xs font-body font-semibold tracking-widest text-white/90">
            <span className="text-brand-gold font-bold">{celebrationOccasions[selectedOccasionIndex].index}</span>
            <span className="text-white/40 mx-1">/</span>
            <span className="text-white/60">05</span>
          </div>

          {/* Minimal Thin Progress Bar */}
          <div className="w-16 sm:w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-gold transition-all duration-75 ease-linear"
              style={{ width: `${heroProgress}%` }}
            />
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevHero}
              aria-label="Previous Creation"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-chocolate flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextHero}
              aria-label="Next Creation"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-chocolate flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Bottom Flavour Switcher Bar */}
        <div className="hidden md:flex absolute bottom-8 left-5 sm:left-8 lg:left-12 z-20 pointer-events-auto items-center gap-1.5 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
          {celebrationOccasions.map((c, dotIdx) => {
            const isCurrent = dotIdx === selectedOccasionIndex;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setHeroProgress(0);
                  setSelectedOccasionIndex(dotIdx);
                }}
                className={`px-3 py-1 rounded-full transition-all duration-300 text-[11px] font-body font-semibold cursor-pointer ${
                  isCurrent
                    ? 'bg-white text-brand-chocolate font-bold shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {c.shortName}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: THE PHILOSOPHY BAR (MNC Minimal 4 Pillars)
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-6 border-y border-brand-chocolate/10">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-caramel block">
              Pure Couverture
            </span>
            <h4 className="font-heading text-sm sm:text-base font-bold text-brand-chocolate">
              100% Belgian Cocoa
            </h4>
            <p className="text-[11px] sm:text-xs text-brand-chocolate/70 leading-relaxed font-body">
              Crafted exclusively with single-origin Callebaut, never vegetable fat substitutes.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-caramel block">
              Fresh Daily
            </span>
            <h4 className="font-heading text-sm sm:text-base font-bold text-brand-chocolate">
              Baked to Celebration
            </h4>
            <p className="text-[11px] sm:text-xs text-brand-chocolate/70 leading-relaxed font-body">
              Prepared fresh in the boutique nearest to your delivery address on celebration day.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-caramel block">
              Pure Vegetarian
            </span>
            <h4 className="font-heading text-sm sm:text-base font-bold text-brand-chocolate">
              100% Eggless Kitchen
            </h4>
            <p className="text-[11px] sm:text-xs text-brand-chocolate/70 leading-relaxed font-body">
              Certified separate eggless production lines with cloud-soft moisture and rich crumb.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-caramel block">
              Cold Chain Logistics
            </span>
            <h4 className="font-heading text-sm sm:text-base font-bold text-brand-chocolate">
              Midnight &amp; Express
            </h4>
            <p className="text-[11px] sm:text-xs text-brand-chocolate/70 leading-relaxed font-body">
              Temperature-controlled delivery ensuring chocolate mirror glaze and structural perfection.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: CURATED COLLECTIONS (EDITORIAL GALLERY PLATES)
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6 sm:mb-8 pb-3 border-b border-brand-chocolate/10">
          <div>
            <span className="text-[10px] xs:text-[11px] uppercase font-bold text-brand-caramel tracking-[0.2em] block mb-1">
              Curated Ateliers
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-chocolate">
              Explore By Category
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-xs sm:text-sm font-semibold text-brand-caramel hover:text-brand-chocolate flex items-center gap-1 group font-body"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Minimalist Horizontal Scrolling Track with High-Fashion Aspect */}
        <div
          ref={categoryScrollRef}
          onMouseEnter={() => setIsCategoryPaused(true)}
          onMouseLeave={() => setIsCategoryPaused(false)}
          onTouchStart={() => setIsCategoryPaused(true)}
          onTouchEnd={() => setIsCategoryPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayCategories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/cakes?category=${cat.slug}`}
              className="group flex flex-col shrink-0 w-[120px] xs:w-[136px] sm:w-[160px] text-center"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-chocolate/5 border border-brand-chocolate/10 group-hover:border-brand-caramel/50 transition-all duration-500 shadow-2xs group-hover:shadow-md">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="font-heading font-semibold text-xs sm:text-sm text-brand-chocolate group-hover:text-brand-caramel transition-colors mt-2.5 truncate px-1">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: THE SIGNATURE EDIT (Interactive Master Showcase)
          Replaces 6 repetitive carousels with an interactive luxury switcher
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 pb-3 border-b border-brand-chocolate/10">
          <div>
            <span className="text-[10px] xs:text-[11px] uppercase font-bold text-brand-caramel tracking-[0.2em] block mb-1">
              The Signature Edit
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-chocolate">
              Masterwork Creations
            </h2>
          </div>

          {/* Interactive Category Filter Tabs (MNC Clean Pill Switcher) */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'all', label: 'All Curations' },
              { id: 'chocolate', label: 'Belgian Truffle' },
              { id: 'birthday', label: 'Celebration' },
              { id: 'eggless', label: '100% Eggless' },
              { id: 'wedding', label: 'Wedding Tiers' },
              { id: 'pastries', label: 'Patisserie' },
            ].map((tab) => {
              const isSelected = activeCategoryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategoryTab(tab.id as any)}
                  className={`btn font-body font-semibold px-3 sm:px-4 py-1.5 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-brand-chocolate text-brand-gold shadow-xs'
                      : 'bg-white hover:bg-brand-peach/40 text-brand-chocolate/75 border border-brand-chocolate/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid / Track */}
        <div className="relative group/ptrack">
          {/* Navigation Controls */}
          <button
            type="button"
            onClick={() => scrollProducts('left')}
            aria-label="Previous Products"
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white text-brand-chocolate hover:bg-brand-chocolate hover:text-brand-gold shadow-md border border-brand-chocolate/15 items-center justify-center transition-all active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollProducts('right')}
            aria-label="Next Products"
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white text-brand-chocolate hover:bg-brand-chocolate hover:text-brand-gold shadow-md border border-brand-chocolate/15 items-center justify-center transition-all active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div
            ref={productScrollRef}
            className="flex gap-3 sm:gap-5 overflow-x-auto scroll-smooth pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {activeProducts.map((product: any) => (
              <div
                key={product._id}
                className="w-[calc(50%-6px)] sm:w-[calc(33.333%-12px)] md:w-[220px] lg:w-[240px] shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: THE BESPOKE COUTURE ATELIER (Editorial Split)
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-brand-chocolate text-white p-6 sm:p-10 lg:p-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Editorial Narrative */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.2em] text-brand-gold block">
                Bespoke Confectionery Atelier
              </span>

              <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-brand-cream leading-tight">
                Where Sculptural Art Meets Haute Pâtisserie.
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-brand-cream/80 leading-relaxed font-body max-w-xl">
                From multi-tiered sculpted wedding floral centerpieces to bespoke conceptual birthday cakes, our master
                decorators transform your imagination into edible reality with pure Belgian couverture and zero artificial compromises.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/custom-cakes"
                  className="btn font-body font-semibold py-3 px-7 rounded-full bg-brand-caramel hover:bg-white text-white hover:text-brand-chocolate text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 group/btn"
                >
                  <span>Commission a Custom Cake</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/branches"
                  className="btn font-body font-semibold py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm border border-white/20 transition-all active:scale-95"
                >
                  <span>Consult at Boutique</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Editorial Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/5">
                <img
                  src="https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop"
                  alt="Bespoke Cake Atelier"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 text-xs">
                  <p className="font-heading text-brand-gold font-bold">Grand Tiered Masterwork</p>
                  <p className="text-[11px] text-white/80 font-body">24K Edible Gold &bull; Hand-sculpted Florals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: OUR 8 KERALA PATISSERIES (Boutique Network)
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 pb-3 border-b border-brand-chocolate/10">
          <div>
            <span className="text-[10px] xs:text-[11px] uppercase font-bold text-brand-caramel tracking-[0.2em] block mb-1">
              Store Network
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-chocolate">
              Visit Our 8 Kerala Patisseries
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBranches('left')}
              aria-label="Previous Boutique"
              className="w-8 h-8 rounded-full bg-white text-brand-chocolate hover:bg-brand-chocolate hover:text-brand-gold shadow-2xs border border-brand-chocolate/15 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBranches('right')}
              aria-label="Next Boutique"
              className="w-8 h-8 rounded-full bg-white text-brand-chocolate hover:bg-brand-chocolate hover:text-brand-gold shadow-2xs border border-brand-chocolate/15 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Track of Boutiques */}
        <div
          ref={branchesScrollRef}
          onMouseEnter={() => setIsBranchesPaused(true)}
          onMouseLeave={() => setIsBranchesPaused(false)}
          onTouchStart={() => setIsBranchesPaused(true)}
          onTouchEnd={() => setIsBranchesPaused(false)}
          className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {OFFICIAL_BRANCHES.map((b) => (
            <div
              key={b.branchCode}
              className="w-[260px] xs:w-[280px] sm:w-[300px] shrink-0 bg-white rounded-2xl p-4 sm:p-5 border border-brand-chocolate/10 shadow-[0_2px_12px_rgba(42,6,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="font-heading text-base font-bold text-brand-chocolate truncate">
                      {b.shortName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Patisserie &amp; Kitchen Open</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-chocolate/5 text-brand-chocolate shrink-0">
                    {b.branchCode.replace('CCW-', '')}
                  </span>
                </div>

                <p className="text-xs text-brand-chocolate/70 leading-relaxed line-clamp-2 font-body">
                  {b.address}
                </p>

                <div className="text-[11px] text-brand-chocolate/65 pt-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-caramel shrink-0" />
                  <span>{b.openingHours}</span>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-brand-chocolate/8 flex items-center gap-2">
                <a
                  href={`tel:${b.rawPhone}`}
                  className="btn font-body font-semibold flex-1 py-1.5 px-2 rounded-xl bg-brand-cream/60 hover:bg-brand-caramel hover:text-white text-brand-chocolate text-[11px] transition-all flex items-center justify-center gap-1"
                >
                  <Phone className="w-3 h-3 text-brand-caramel" />
                  <span>Call</span>
                </a>
                <a
                  href={b.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn font-body font-semibold py-1.5 px-3 rounded-xl bg-brand-chocolate hover:bg-brand-caramel text-brand-gold hover:text-white text-[11px] transition-all flex items-center justify-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Map</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: DELIVERY PINCODE CONCIERGE
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-brand-chocolate/10 shadow-xs">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[10px] xs:text-[11px] uppercase font-bold text-brand-caramel tracking-[0.2em] block">
              Multi-Branch Dispatch
            </span>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl text-brand-chocolate">
              Verify Express Delivery to Your Location
            </h2>
            <p className="text-xs sm:text-sm text-brand-chocolate/75 leading-relaxed font-body">
              All creations are baked fresh on the day of delivery at the Chef&apos;s Cake World branch closest to your venue.
              Enter your PIN code to see available delivery slots.
            </p>
          </div>

          <div className="lg:col-span-6">
            <PincodeCheckerModal />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: CLIENT TESTIMONIALS (Editorial Quotes)
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 pb-3 border-b border-brand-chocolate/10">
          <div>
            <span className="text-[10px] xs:text-[11px] uppercase font-bold text-brand-caramel tracking-[0.2em] block mb-1">
              Guest Praise
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-chocolate">
              Celebrated Across Kerala
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollReviews('left')}
              aria-label="Previous Review"
              className="w-8 h-8 rounded-full bg-white text-brand-chocolate hover:bg-brand-chocolate hover:text-brand-gold shadow-2xs border border-brand-chocolate/15 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollReviews('right')}
              aria-label="Next Review"
              className="w-8 h-8 rounded-full bg-white text-brand-chocolate hover:bg-brand-chocolate hover:text-brand-gold shadow-2xs border border-brand-chocolate/15 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrolling Review Quotes */}
        <div
          ref={reviewsScrollRef}
          onMouseEnter={() => setIsReviewsPaused(true)}
          onMouseLeave={() => setIsReviewsPaused(false)}
          onTouchStart={() => setIsReviewsPaused(true)}
          onTouchEnd={() => setIsReviewsPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="w-[280px] xs:w-[310px] sm:w-[340px] shrink-0 p-5 sm:p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-[0_2px_12px_rgba(42,6,0,0.03)] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex text-brand-caramel">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-caramel/10 text-brand-caramel font-body">
                    {rev.occasion}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-brand-chocolate/85 italic leading-relaxed font-body">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-brand-chocolate/8 flex items-center justify-between text-xs font-body">
                <div>
                  <span className="font-bold text-brand-chocolate block">{rev.name}</span>
                  <span className="text-[10.5px] text-brand-caramel font-semibold block">{rev.cake}</span>
                </div>
                <span className="text-[10px] text-brand-chocolate/60 shrink-0">{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: BRAND MANIFESTO (Quiet Luxury Statement)
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-brand-chocolate/10 p-8 sm:p-12 lg:p-16 text-center space-y-4 max-w-3xl mx-auto shadow-xs">
          <span className="text-[10px] xs:text-[11px] uppercase font-bold text-brand-caramel tracking-[0.2em] block">
            The Philosophy
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-chocolate">
            &ldquo;Celebrations deserve more than mass-produced cakes stored in cold storage for days.&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-brand-chocolate/75 leading-relaxed font-body pt-1">
            Chef&apos;s Cake World marries time-honored European confectionery craft with the joyous traditions of Kerala.
            Every layer is sculpted to order using authentic Belgian couverture, farm-fresh dairy, and zero artificial shortcuts.
          </p>
          <div className="pt-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-caramel hover:text-brand-chocolate transition-colors font-body"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
