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
  Feather,
  Crown,
  Layers,
  Zap,
  Check,
  ShoppingBag,
  Eye,
  BadgePercent
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
    badge: 'Maison Masterpiece',
    tagline: 'Pure 70% Callebaut Single-Origin',
    basePriceNum: 699,
    price: '₹699',
    image: '/Cakes/cake.jpg',
    slug: 'royal-belgian-chocolate-truffle-cake',
    description: 'Triple-layered dark cocoa sponge smothered in silky Callebaut ganache and hand-rolled dark truffles.',
    flavorNotes: ['70% Callebaut Cocoa', 'Single-Origin Ganache', '24K Edible Gold Dust', 'Moist Dutch Sponge'],
    anatomy: {
      layers: 'Triple Sponge & Silky Ganache',
      texture: 'Decadent, Velvety, Melt-in-Mouth',
      prepTime: 'Baked Fresh to Order (3 Hrs)'
    },
    rating: 4.98,
    reviews: 1420,
    accentColor: '#D4B46A'
  },
  {
    id: 'wedding',
    index: '02',
    cakeName: 'Grand Floral Wedding Masterpiece',
    shortName: 'Floral Wedding',
    badge: 'Couture Celebration Tier',
    tagline: 'Hand-Sculpted 24K Edible Gold',
    basePriceNum: 1499,
    price: '₹1,499',
    image: '/Cakes/38499c1ae99d95bfe134d660e4c5d6ea.jpg',
    slug: 'grand-tiered-golden-wedding-masterpiece',
    description: 'Architectural celebration tiers accented with handcrafted sugar peonies and bourbon vanilla bean sponge.',
    flavorNotes: ['Madagascar Bourbon Vanilla', 'Handcrafted Sugar Petals', 'White Chocolate Velvet', '24K Gold Filigree'],
    anatomy: {
      layers: 'Architectural 3-Tier Atelier',
      texture: 'Cloud-Light Sponge & Silky Crème',
      prepTime: 'Sculpted in 24 Hrs'
    },
    rating: 4.99,
    reviews: 860,
    accentColor: '#E6CA85'
  },
  {
    id: 'truffle',
    index: '03',
    cakeName: 'Dark Truffle Roasted Hazelnut',
    shortName: 'Hazelnut Truffle',
    badge: 'Artisan Praline Edition',
    tagline: 'Piedmont Hazelnut Praline',
    basePriceNum: 749,
    price: '₹749',
    image: '/Cakes/6077fa416087bf801e907887a53cfe1d.jpg',
    slug: 'decadent-dark-truffle-roasted-hazelnut',
    description: 'Bittersweet chocolate mousse layered with roasted hazelnut crunch and a glossy mirror glaze finish.',
    flavorNotes: ['Piedmont Roasted Hazelnuts', 'Glossy Mirror Cocoa Glaze', 'Praline Feuilletine', 'Dark Cocoa Mousse'],
    anatomy: {
      layers: 'Crunch Layer & Bittersweet Ganache',
      texture: 'Crunchy Praline & Silky Mousse',
      prepTime: 'Chilled Setting (4 Hrs)'
    },
    rating: 4.95,
    reviews: 1180,
    accentColor: '#D4B46A'
  },
  {
    id: 'eggless',
    index: '04',
    cakeName: 'Pure Eggless Red Velvet Luxe',
    shortName: 'Eggless Velvet',
    badge: '100% Certified Vegetarian',
    tagline: '100% Certified Vegetarian Atelier',
    basePriceNum: 749,
    price: '₹749',
    image: '/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    description: 'Cloud-soft crimson sponge draped in whipped Philadelphia cream cheese frosting, baked without egg.',
    flavorNotes: ['Philadelphia Cream Cheese', 'Natural Beet Cocoa Sponge', 'Madagascar Vanilla Coulis', 'Eggless Certified'],
    anatomy: {
      layers: 'Crimson Velvet & Whipped Cheese',
      texture: 'Feather-Soft & Tangy Sweet',
      prepTime: 'Fresh Morning Bake'
    },
    rating: 4.97,
    reviews: 1650,
    accentColor: '#10B981'
  },
  {
    id: 'biscoff',
    index: '05',
    cakeName: 'Lotus Biscoff Speculoos Dream',
    shortName: 'Lotus Biscoff',
    badge: 'Caramelized Confection',
    tagline: 'Belgian Caramelized Biscuit Mousse',
    basePriceNum: 799,
    price: '₹799',
    image: '/Cakes/da137e0e2f85163498af483676d4ccd8.jpg',
    slug: 'lotus-biscoff-speculoos-dream-cake',
    description: 'Caramelized cinnamon sponge, silky Biscoff mousse, and crunchy spiced butter cookie crumb.',
    flavorNotes: ['Belgian Speculoos Cream', 'Caramelized Cookie Crunch', 'Salted Butter Caramel', 'Spiced Cinnamon Sponge'],
    anatomy: {
      layers: 'Speculoos Mousse & Spiced Crumb',
      texture: 'Rich Caramel & Crisp Biscuit',
      prepTime: 'Infused over 6 Hrs'
    },
    rating: 4.96,
    reviews: 1290,
    accentColor: '#D4B46A'
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
  const [selectedHeroWeight, setSelectedHeroWeight] = useState<'0.5kg' | '1kg' | '2kg'>('0.5kg');

  // Celebration Matchmaker State
  const [matchOccasion, setMatchOccasion] = useState<'birthday' | 'wedding' | 'anniversary' | 'intimate'>('birthday');
  const [matchFlavor, setMatchFlavor] = useState<'chocolate' | 'velvet' | 'hazelnut' | 'biscoff'>('chocolate');
  const [matchDietary, setMatchDietary] = useState<'all' | 'eggless'>('all');

  // Anatomy of a Masterpiece State
  const [activeAnatomyLayer, setActiveAnatomyLayer] = useState(0);

  const getMatchedCake = () => {
    if (matchFlavor === 'chocolate') {
      return {
        name: 'Royal Belgian Chocolate Truffle Cake',
        slug: 'royal-belgian-chocolate-truffle-cake',
        image: '/Cakes/cake.jpg',
        price: '₹699',
        tag: '70% Callebaut Couverture',
        description: 'Triple-layered dark cocoa sponge layered with silky Callebaut ganache and hand-rolled dark truffles.',
        serving: 'Serves 6–10 Guests',
      };
    }
    if (matchFlavor === 'velvet') {
      return {
        name: 'Signature Pure Eggless Red Velvet',
        slug: 'fresh-red-velvet-cream-cheese-luxe',
        image: '/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg',
        price: '₹749',
        tag: '100% Certified Eggless',
        description: 'Feather-soft crimson cocoa sponge draped in whipped Philadelphia cream cheese and organic bourbon vanilla.',
        serving: 'Serves 6–10 Guests',
      };
    }
    if (matchFlavor === 'hazelnut') {
      return {
        name: 'Decadent Dark Truffle & Roasted Hazelnut',
        slug: 'decadent-dark-truffle-roasted-hazelnut',
        image: '/Cakes/6077fa416087bf801e907887a53cfe1d.jpg',
        price: '₹749',
        tag: 'Piedmont Praline Crunch',
        description: 'Bittersweet chocolate mousse layered with roasted hazelnut crunch and a glossy mirror glaze finish.',
        serving: 'Serves 8–12 Guests',
      };
    }
    return {
      name: 'Lotus Biscoff Speculoos Dream Cake',
      slug: 'lotus-biscoff-speculoos-dream-cake',
      image: '/Cakes/da137e0e2f85163498af483676d4ccd8.jpg',
      price: '₹799',
      tag: 'Belgian Speculoos Mousse',
      description: 'Caramelized cinnamon sponge, silky Biscoff mousse, and crunchy spiced butter cookie crumb.',
      serving: 'Serves 6–10 Guests',
    };
  };

  const cakeAnatomyLayers = [
    {
      step: '01',
      layer: 'Crown & 24K Edible Gold Leaf',
      ingredient: 'Belgian Couverture Truffles & Pure Gold Leaf',
      description: 'Every centerpiece is crowned with hand-rolled 70% dark truffles, Valrhona crispy chocolate pearls, and certified edible 24K gold foil.',
      mouthfeel: 'Delicate crisp crunch followed by slow, luxurious melting richness.'
    },
    {
      step: '02',
      layer: 'Glossy Mirror Cocoa Drip',
      ingredient: 'Single-Origin Callebaut Mirror Glaze',
      description: 'Poured warm at precisely 32°C to create an immaculate dark chocolate glaze that retains its mirror shine throughout chilled delivery.',
      mouthfeel: 'Silky smooth with a clean, intense cocoa aroma.'
    },
    {
      step: '03',
      layer: 'Silky Couverture Ganache',
      ingredient: 'Fresh Dairy Cream & 70% Dark Chocolate',
      description: 'Whipped in small artisan batches every morning with European farm dairy cream, never artificial hydrogenated vegetable fats.',
      mouthfeel: 'Velvety, unctuous, and deeply comforting.'
    },
    {
      step: '04',
      layer: 'Moist Dutch-Processed Sponge',
      ingredient: 'Dutch Alkalized Cocoa & Madagascar Bourbon Vanilla',
      description: 'Slow-baked at gentle temperatures to yield a cloud-soft crumb with exceptional natural moisture retention.',
      mouthfeel: 'Feather-light, perfectly balanced sweetness, melting softly on the tongue.'
    },
    {
      step: '05',
      layer: 'Piedmont Hazelnut Praline Base',
      ingredient: 'Roasted Piedmont Hazelnuts & French Feuilletine',
      description: 'The foundation layer provides structural integrity and an irresistible contrast with crispy caramelized wafer flakes and praline paste.',
      mouthfeel: 'Crisp, toasted, and delightfully nutty.'
    }
  ];

  const getHeroPrice = (basePrice: number, weight: '0.5kg' | '1kg' | '2kg') => {
    if (weight === '1kg') return Math.round(basePrice * 1.85);
    if (weight === '2kg') return Math.round(basePrice * 3.5);
    return basePrice;
  };

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
    { name: 'Belgian Couverture', slug: 'chocolate-cakes', image: '/Cakes/cake.jpg' },
    { name: 'Artisan Pastries', slug: 'pastries', image: '/Cakes/38499c1ae99d95bfe134d660e4c5d6ea.jpg' },
    { name: 'Pure Eggless', slug: 'eggless-cakes', image: '/Cakes/6077fa416087bf801e907887a53cfe1d.jpg' },
    { name: 'Birthday Favorites', slug: 'birthday-cakes', image: '/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg' },
    { name: 'Wedding Atelier', slug: 'wedding-cakes', image: '/Cakes/da137e0e2f85163498af483676d4ccd8.jpg' },
    { name: 'Sweets & Desserts', slug: 'sweets-desserts', image: '/Cakes/b3392f499749364b011f93c6634cf890.jpg' },
    { name: 'Bespoke Custom', slug: 'designer-cakes', image: '/Cakes/3b109e1a28abe394a7b3a23ecf94450b.jpg' },
    { name: 'Anniversary Luxe', slug: 'anniversary-cakes', image: '/Cakes/2bb7cee4f7aea565457d0eec341cb3d7.jpg' }
  ];

  // Master Curated Product Lists
  const displayBestSellers = bestSellers.length > 0 ? bestSellers : [
    {
      _id: 'sample-1',
      name: 'Royal Belgian Chocolate Truffle Cake',
      slug: 'royal-belgian-chocolate-truffle-cake',
      description: 'Layers of moist dark chocolate sponge draped in silky 70% Callebaut Belgian ganache.',
      basePrice: 699,
      images: ['/Cakes/cake.jpg'],
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
      images: ['/Cakes/38499c1ae99d95bfe134d660e4c5d6ea.jpg'],
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
      images: ['/Cakes/6077fa416087bf801e907887a53cfe1d.jpg'],
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
      images: ['/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg'],
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
      images: ['/Cakes/da137e0e2f85163498af483676d4ccd8.jpg'],
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
      images: ['/Cakes/b3392f499749364b011f93c6634cf890.jpg'],
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
      images: ['/Cakes/3b109e1a28abe394a7b3a23ecf94450b.jpg'],
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
      images: ['/Cakes/cake.jpg'],
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
      images: ['/Cakes/2bb7cee4f7aea565457d0eec341cb3d7.jpg'],
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
      images: ['/Cakes/49d646997a3a90a8d9104f47746cf1b5.jpg'],
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
      images: ['/Cakes/80752952afded3b566677838ba839337.jpg'],
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
      images: ['/Cakes/372a0db0f1591612b07a001b2d8cc6f7.jpg'],
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
      images: ['/Cakes/be4642911468d018066e50e8d9392619.jpg'],
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
      images: ['/Cakes/c0b4391c72a48711cfe4eff6e5274523.jpg'],
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
      images: ['/Cakes/cake.jpg'],
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
      images: ['/Cakes/e8b9a0c87a7d23ac176188e63655a4d1.jpg'],
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
      images: ['/Cakes/b3392f499749364b011f93c6634cf890.jpg'],
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
      images: ['/Cakes/38499c1ae99d95bfe134d660e4c5d6ea.jpg'],
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
      images: ['/Cakes/6077fa416087bf801e907887a53cfe1d.jpg'],
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
      images: ['/Cakes/d3a5afe4913cfb730896c2b6a1cce517.jpg'],
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
      images: ['/Cakes/da137e0e2f85163498af483676d4ccd8.jpg'],
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
          SECTION 1: THE MINIMAL LUXURY HAUTE PÂTISSERIE HERO
          (Pure Minimal MNC Aesthetic, Architectural Precision & Serene Space)
      ────────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full h-[88vh] xs:h-[90vh] sm:h-[92vh] max-h-[960px] min-h-[580px] overflow-hidden bg-[#140300] select-none touch-pan-y group"
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
              {/* Minimal Full-Bleed Photography with Subtle Parallax */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                style={{
                  transform: `translate3d(0, ${Math.min(scrollY * 0.28, 130)}px, 0)`,
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/25 pointer-events-none" />
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none" />
              </div>

              {/* Minimal Luxury Editorial Content */}
              <div
                className="relative z-10 max-w-7xl mx-auto h-full px-5 sm:px-8 lg:px-12 flex flex-col justify-end pt-24 pb-20 xs:pb-22 sm:pb-24 lg:pb-28 will-change-transform"
                style={{
                  transform: `translate3d(0, -${Math.min(scrollY * 0.16, 65)}px, 0)`,
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

                  {/* Clean Minimalist Heading */}
                  <h1
                    className={`font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight drop-shadow-xl transition-all duration-700 ease-out delay-200 ${
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

        {/* Minimal Slide Counter & Sleek Thin Progress Tracker (Bottom Right) */}
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
          SECTION 5: THE CELEBRATION SOMMELIER (Interactive Matchmaker)
          Helps guests find their ideal creation in 3 elegant taps
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-brand-chocolate/10 p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            
            {/* Left Configurator Column */}
            <div className="w-full lg:w-7/12 space-y-6">
              <div>
                <span className="text-[10px] xs:text-[11px] uppercase font-bold text-brand-caramel tracking-[0.2em] block mb-1">
                  Concierge Recommendation
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-chocolate">
                  The Celebration Matchmaker
                </h2>
                <p className="text-xs sm:text-sm text-brand-chocolate/75 font-body mt-1 leading-relaxed">
                  Select your occasion and sensory preference to reveal the pastry chef&apos;s curated centerpiece.
                </p>
              </div>

              {/* Step 1: Occasion */}
              <div className="space-y-2">
                <label className="text-[11px] font-heading font-bold text-brand-chocolate uppercase tracking-wider block">
                  1. Occasion
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'birthday', label: 'Birthday Celebration' },
                    { id: 'wedding', label: 'Wedding & Tiers' },
                    { id: 'anniversary', label: 'Anniversary Luxe' },
                    { id: 'intimate', label: 'Intimate Milestone' },
                  ].map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setMatchOccasion(o.id as any)}
                      className={`btn font-body text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                        matchOccasion === o.id
                          ? 'bg-brand-chocolate text-brand-gold shadow-xs'
                          : 'bg-brand-cream/60 hover:bg-brand-cream text-brand-chocolate/80 border border-brand-chocolate/10'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Flavor Mood */}
              <div className="space-y-2">
                <label className="text-[11px] font-heading font-bold text-brand-chocolate uppercase tracking-wider block">
                  2. Flavor Palette
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'chocolate', label: '70% Belgian Couverture' },
                    { id: 'velvet', label: 'Pure Red Velvet Cream Cheese' },
                    { id: 'hazelnut', label: 'Dark Truffle Roasted Hazelnut' },
                    { id: 'biscoff', label: 'Lotus Biscoff Speculoos' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setMatchFlavor(f.id as any)}
                      className={`btn font-body text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                        matchFlavor === f.id
                          ? 'bg-brand-chocolate text-brand-gold shadow-xs'
                          : 'bg-brand-cream/60 hover:bg-brand-cream text-brand-chocolate/80 border border-brand-chocolate/10'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Dietary */}
              <div className="space-y-2">
                <label className="text-[11px] font-heading font-bold text-brand-chocolate uppercase tracking-wider block">
                  3. Dietary Formulation
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Formulations' },
                    { id: 'eggless', label: 'Strictly 100% Eggless Vegetarian' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setMatchDietary(d.id as any)}
                      className={`btn font-body text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                        matchDietary === d.id
                          ? 'bg-brand-chocolate text-brand-gold shadow-xs'
                          : 'bg-brand-cream/60 hover:bg-brand-cream text-brand-chocolate/80 border border-brand-chocolate/10'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Matched Result Card */}
            <div className="w-full lg:w-5/12">
              {(() => {
                const matched = getMatchedCake();
                return (
                  <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-brand-cream/50 border border-brand-chocolate/10 shadow-xs space-y-4">
                    <div className="relative aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden bg-brand-chocolate/5 border border-brand-chocolate/10">
                      <img
                        src={matched.image}
                        alt={matched.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-chocolate/90 backdrop-blur-md text-brand-gold text-[10px] font-bold uppercase tracking-wider">
                        {matched.tag}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-heading font-bold text-base sm:text-lg text-brand-chocolate truncate">
                          {matched.name}
                        </h3>
                        <span className="font-heading font-extrabold text-brand-caramel text-base sm:text-lg shrink-0">
                          {matched.price}
                        </span>
                      </div>
                      <p className="text-xs text-brand-chocolate/75 font-body line-clamp-2 leading-relaxed">
                        {matched.description}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[11px] text-brand-chocolate/60 font-body">
                        <span>{matched.serving}</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Baking slots open</span>
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/cakes/${matched.slug}`}
                      className="btn font-body font-semibold w-full py-2.5 rounded-full bg-brand-chocolate text-brand-gold hover:bg-brand-caramel hover:text-white transition-all text-xs flex items-center justify-center gap-2 shadow-xs group"
                    >
                      <span>Order Matched Creation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              })()}
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: ANATOMY OF A MASTERPIECE (Interactive Cross-Section)
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1c0502] text-white p-6 sm:p-10 lg:p-14 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] xs:text-[11px] uppercase font-bold text-brand-gold tracking-[0.2em] block mb-1">
                Culinary Engineering
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white">
                Anatomy of a Masterwork
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/70 font-body max-w-md leading-relaxed">
              Explore the five architectural layers engineered by our master chocolatiers for flawless mouthfeel and structural integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 5 Layer Selectors */}
            <div className="lg:col-span-6 space-y-2.5">
              {cakeAnatomyLayers.map((layer, lIdx) => {
                const isSelected = activeAnatomyLayer === lIdx;
                return (
                  <button
                    key={layer.step}
                    type="button"
                    onClick={() => setActiveAnatomyLayer(lIdx)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-white/15 border-brand-gold text-white shadow-md scale-[1.01]'
                        : 'bg-white/5 border-white/10 hover:border-white/25 text-white/70 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-xs font-heading font-extrabold px-2 py-0.5 rounded-md ${isSelected ? 'bg-brand-gold text-brand-chocolate' : 'bg-white/10 text-brand-gold'}`}>
                        {layer.step}
                      </span>
                      <span className="font-heading font-semibold text-xs sm:text-sm text-white truncate">
                        {layer.layer}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-body text-brand-gold/80 shrink-0 hidden sm:inline">
                      {layer.ingredient.split('&')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Layer Detail Card */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-brand-gold">
                    Layer {cakeAnatomyLayers[activeAnatomyLayer].step} Profile
                  </span>
                  <span className="text-xs text-white/60 font-body">
                    Handcrafted Daily
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {cakeAnatomyLayers[activeAnatomyLayer].layer}
                </h3>

                <div className="space-y-1">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-brand-gold/90 block">
                    Key Ingredients
                  </span>
                  <p className="text-xs sm:text-sm text-white font-medium">
                    {cakeAnatomyLayers[activeAnatomyLayer].ingredient}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-brand-gold/90 block">
                    Crafting Technique
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                    {cakeAnatomyLayers[activeAnatomyLayer].description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-xs">
                  <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Sensory Mouthfeel: </span>
                    <span className="text-white/80">{cakeAnatomyLayers[activeAnatomyLayer].mouthfeel}</span>
                  </div>
                </div>
              </div>
            </div>

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
                  src="/Cakes/e8b9a0c87a7d23ac176188e63655a4d1.jpg"
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
          SECTION 8: THE FOUR PILLARS OF DISTINCTION (Culinary Integrity)
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pb-3 border-b border-brand-chocolate/10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[10px] xs:text-[11px] uppercase font-bold text-brand-caramel tracking-[0.2em] block mb-1">
              Uncompromised Standards
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-chocolate">
              The Four Pillars of Distinction
            </h2>
          </div>
          <span className="text-xs text-brand-chocolate/65 font-body">
            Audited Culinary Integrity &bull; Since 2012
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Pure Callebaut Couverture',
              desc: 'Imported 70% dark Belgian cocoa butter. We strictly reject hydrogenated vegetable fat substitutes used in ordinary cakes.',
              highlight: 'Wieze, Belgium Sourcing',
            },
            {
              num: '02',
              title: 'Segregated Vegetarian Line',
              desc: 'Our dedicated eggless atelier operates with segregated utensils, European yogurt culture, and pure organic vanilla.',
              highlight: '100% Certified Purity',
            },
            {
              num: '03',
              title: 'Chime-of-Midnight Dispatch',
              desc: 'Custom chilled delivery vehicles ensure your cake arrives between 11:30 PM & 12:00 AM with immaculate glaze and zero tilt.',
              highlight: 'Temperature-Controlled Transit',
            },
            {
              num: '04',
              title: 'Architectural Sugar Artistry',
              desc: 'Every wedding and custom tier is handcrafted with food-grade edible 24K gold foil and botanically accurate sugar peonies.',
              highlight: 'Bespoke Couture Craft',
            },
          ].map((pillar) => (
            <div
              key={pillar.num}
              className="p-6 rounded-2xl bg-white border border-brand-chocolate/10 shadow-[0_2px_12px_rgba(42,6,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-xs font-heading font-bold text-brand-gold tracking-widest block">
                  PILLAR {pillar.num}
                </span>
                <h3 className="font-heading text-lg font-bold text-brand-chocolate">
                  {pillar.title}
                </h3>
                <p className="text-xs text-brand-chocolate/75 font-body leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-brand-chocolate/8 text-[11px] font-semibold text-brand-caramel font-body">
                {pillar.highlight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: OUR 8 KERALA PATISSERIES (Boutique Network)
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
