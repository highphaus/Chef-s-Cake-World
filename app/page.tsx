'use client';

import React, { useEffect, useState } from 'react';
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
  Truck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { api } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import PincodeCheckerModal from '@/components/common/PincodeCheckerModal';

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [featuredCakes, setFeaturedCakes] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [selectedOccasionIndex, setSelectedOccasionIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState<'0.5kg' | '1kg' | '2kg'>('0.5kg');
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

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

  // Hero Carousel Autoplay (Pauses on Hover)
  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setSelectedOccasionIndex((prev) => (prev + 1) % celebrationOccasions.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isCarouselPaused, celebrationOccasions.length]);

  const handlePrevSlide = () => {
    setSelectedOccasionIndex((prev) => (prev - 1 + celebrationOccasions.length) % celebrationOccasions.length);
    setSelectedWeight('0.5kg');
  };

  const handleNextSlide = () => {
    setSelectedOccasionIndex((prev) => (prev + 1) % celebrationOccasions.length);
    setSelectedWeight('0.5kg');
  };

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
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* SECTION 1: FULL-SCREEN IMAGE HERO CAROUSEL */}
      <section
        className="relative w-full h-[72vh] sm:h-[82vh] lg:h-[88vh] overflow-hidden bg-black -mt-4 sm:-mt-6"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
      >
        {(() => {
          const activeCake = celebrationOccasions[selectedOccasionIndex];

          return (
            <div key={activeCake.id} className="relative w-full h-full animate-in fade-in duration-700">
              {/* Full-Screen Background Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={activeCake.image}
                  alt={activeCake.cakeName}
                  className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
                />
                {/* Luxury Multi-layer Dark Gradients for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
              </div>

              {/* Overlaid Content Container - Minimal & Clean */}
              <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-20 lg:pb-24">
                <div className="max-w-xl sm:max-w-2xl space-y-3 sm:space-y-4">
                  
                  {/* Subtle Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-chocolate/85 border border-brand-gold/40 text-brand-gold text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                    <span>{activeCake.icon}</span>
                    <span>{activeCake.badge}</span>
                  </span>

                  {/* Clean Title */}
                  <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight drop-shadow-lg">
                    {activeCake.cakeName}
                  </h1>

                  {/* Short Price & Dispatch Line */}
                  <p className="text-sm sm:text-lg font-medium text-brand-gold drop-shadow-sm flex items-center gap-2">
                    <span className="font-bold text-white text-lg sm:text-2xl">₹{activeCake.prices['0.5kg']}</span>
                    <span className="text-white/60">&bull;</span>
                    <span className="text-brand-cream/90">2-Hour Fresh Doorstep Dispatch</span>
                  </p>

                  {/* Action CTA Buttons */}
                  <div className="pt-1 flex items-center gap-3">
                    <Link
                      href={`/cakes/${activeCake.slug}`}
                      className="py-3 px-6 sm:px-8 rounded-2xl bg-brand-caramel hover:bg-brand-gold hover:text-brand-chocolate text-white font-bold text-xs sm:text-sm transition-all shadow-xl flex items-center gap-2 group"
                    >
                      <span>Order Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/cakes"
                      className="py-3 px-5 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-xs sm:text-sm transition-all border border-white/20"
                    >
                      View All Cakes
                    </Link>
                  </div>

                </div>
              </div>

              {/* Floating Left Arrow */}
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous slide"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-brand-chocolate text-brand-gold hover:text-white border border-white/25 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 focus:outline-none"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Floating Right Arrow */}
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next slide"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-brand-chocolate text-brand-gold hover:text-white border border-white/25 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 focus:outline-none"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Bottom Centered Pagination Dots & Slide Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-white shadow-xl">
                <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">
                  {selectedOccasionIndex + 1} / {celebrationOccasions.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {celebrationOccasions.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setSelectedOccasionIndex(dotIdx)}
                      className={`h-2 rounded-full transition-all ${
                        selectedOccasionIndex === dotIdx
                          ? 'w-7 bg-brand-gold'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Jump to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* SECTION 2: SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-1">
              Curated Collections
            </span>
            <h2 className="section-title font-heading text-brand-chocolate">
              Explore Our Cake Categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-sm font-bold text-brand-caramel hover:text-brand-chocolate flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayCategories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/cakes?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-square border border-brand-chocolate/10 shadow-cake-soft hover:shadow-cake-hover transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-chocolate/90 via-brand-chocolate/30 to-transparent group-hover:from-brand-chocolate/95 transition-colors" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-heading text-lg sm:text-xl text-brand-cream group-hover:text-brand-gold transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] font-semibold text-brand-cream/80 flex items-center gap-1 mt-1 opacity-90 group-hover:opacity-100">
                  <span>Browse Cakes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-1">
              Customer Favourites
            </span>
            <h2 className="section-title font-heading text-brand-chocolate">
              Most Loved Best Sellers
            </h2>
          </div>
          <Link
            href="/cakes"
            className="text-sm font-bold text-brand-caramel hover:text-brand-chocolate flex items-center gap-1 group"
          >
            <span>Browse Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayBestSellers.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

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
                <span>Attingal Flagship (695101)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-caramel" />
                <span>Kazhakootam Tech Hub (695582)</span>
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
            <h3 className="font-heading text-xl text-brand-chocolate">Multiple Branch Convenience</h3>
            <p className="text-xs sm:text-sm text-brand-chocolate/70 leading-relaxed">
              With 3 flagship branches in Bandra, Andheri, and Powai, your orders are routed to the nearest kitchen for fast, temperature-controlled delivery.
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
              Visit Our Flagship Patisseries
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
              <h3 className="font-heading text-lg text-brand-chocolate">Attingal Flagship</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-peach text-brand-chocolate">KL-01</span>
            </div>
            <p className="text-xs text-brand-chocolate/70">Near KSRTC Bus Stand, Main Road, Attingal, Kerala 695101</p>
            <div className="pt-2 border-t border-brand-chocolate/10 text-xs space-y-1 text-brand-chocolate/80">
              <p><strong>Hours:</strong> 09:00 AM - 10:30 PM</p>
              <p><strong>Phone:</strong> +91 98470 12345</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-heading text-lg text-brand-chocolate">Kazhakootam Tech Hub</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-peach text-brand-chocolate">KL-02</span>
            </div>
            <p className="text-xs text-brand-chocolate/70">Near Technopark Campus, Kazhakootam, Thiruvananthapuram 695582</p>
            <div className="pt-2 border-t border-brand-chocolate/10 text-xs space-y-1 text-brand-chocolate/80">
              <p><strong>Hours:</strong> 09:00 AM - 11:00 PM</p>
              <p><strong>Phone:</strong> +91 98470 54321</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-heading text-lg text-brand-chocolate">Upcoming Kerala Hubs</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-peach text-brand-chocolate">KL-EXP</span>
            </div>
            <p className="text-xs text-brand-chocolate/70">Expanding to more branches across Kerala soon</p>
            <div className="pt-2 border-t border-brand-chocolate/10 text-xs space-y-1 text-brand-chocolate/80">
              <p><strong>Status:</strong> New locations opening</p>
              <p><strong>Support:</strong> +91 98470 99999</p>
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

