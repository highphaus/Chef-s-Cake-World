'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  RotateCcw,
  ShieldCheck,
  Clock,
  Truck,
  HeartHandshake,
  Star,
  ChevronRight,
  CakeSlice
} from 'lucide-react';
import { MASTER_PRODUCTS, ProductItem } from '@/lib/productsData';
import ProductCard from '@/components/products/ProductCard';

function PastriesCatalogueContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [egglessOnly, setEgglessOnly] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('popularity');

  // Filter MASTER_PRODUCTS for pastry items or category 'pastries'
  const pastryProducts = useMemo(() => {
    return MASTER_PRODUCTS.filter(
      (p) => p.itemType === 'pastry' || p.category?.slug === 'pastries'
    );
  }, []);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let prods = [...pastryProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      prods = prods.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.availableFlavours?.some((f) => f.toLowerCase().includes(q)) ||
          p.ingredients?.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Filter by tag
    if (selectedTag === 'truffle') {
      prods = prods.filter((p) =>
        p.name.toLowerCase().includes('truffle') ||
        p.name.toLowerCase().includes('chocolate')
      );
    } else if (selectedTag === 'cheesecake') {
      prods = prods.filter((p) =>
        p.name.toLowerCase().includes('cheesecake') ||
        p.name.toLowerCase().includes('mascarpone')
      );
    } else if (selectedTag === 'red-velvet') {
      prods = prods.filter((p) =>
        p.name.toLowerCase().includes('red velvet')
      );
    } else if (selectedTag === 'biscoff') {
      prods = prods.filter((p) =>
        p.name.toLowerCase().includes('biscoff') ||
        p.name.toLowerCase().includes('speculoos')
      );
    } else if (selectedTag === 'fruit') {
      prods = prods.filter((p) =>
        p.name.toLowerCase().includes('mango') ||
        p.name.toLowerCase().includes('blueberry') ||
        p.name.toLowerCase().includes('forest')
      );
    }

    // Eggless filter
    if (egglessOnly) {
      prods = prods.filter((p) => p.egglessAvailable === true);
    }

    // Sorting
    switch (sortOption) {
      case 'price-asc':
        prods.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-desc':
        prods.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating':
        prods.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case 'popularity':
      default:
        prods.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
    }

    return prods;
  }, [pastryProducts, searchQuery, selectedTag, egglessOnly, sortOption]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTag('all');
    setEgglessOnly(false);
    setSortOption('popularity');
  };

  const tagPills = [
    { id: 'all', label: 'All Pastries' },
    { id: 'truffle', label: 'Belgian Truffle' },
    { id: 'cheesecake', label: 'Cheesecakes' },
    { id: 'red-velvet', label: 'Red Velvet' },
    { id: 'biscoff', label: 'Lotus Biscoff' },
    { id: 'fruit', label: 'Fruit & Gateau' },
  ];

  return (
    <div className="bg-brand-cream min-h-screen text-brand-chocolate selection:bg-brand-caramel selection:text-white pb-24">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO HEADER: LUXURY ARTISAN INTRO
      ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-peach/40 via-brand-cream to-brand-cream pt-10 sm:pt-14 pb-10 border-b border-brand-chocolate/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-brand-chocolate/60 font-body mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-caramel transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-brand-chocolate/40" />
            <span className="font-semibold text-brand-chocolate">Pastries</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-peach/90 border border-brand-chocolate/15 text-brand-chocolate text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
                <span>Single Slices &amp; Assorted Box Collections</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-chocolate tracking-tight">
                Artisan Pastries &amp; Dessert Slices
              </h1>

              <p className="font-body text-sm sm:text-base text-brand-chocolate/75 max-w-2xl leading-relaxed">
                Single-origin Callebaut chocolate, whipped Philadelphia cream cheese, and French berry coulis portioned to perfection. Prepared fresh daily in individual slices, boxes of 2, and celebratory party sets of 4 across our 8 Kerala boutique kitchens.
              </p>

              {/* Quality & Delivery Highlights */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-2 text-xs font-semibold text-brand-chocolate/85">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-caramel" />
                  <span>2-Hour Express Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block shadow-xs" />
                  <span>100% Pure Eggless Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-caramel" />
                  <span>Chilled Box Packaging</span>
                </div>
              </div>
            </div>

            {/* Visual Pill Card */}
            <div className="lg:col-span-4 bg-white/80 backdrop-blur-xs rounded-3xl p-5 border border-brand-chocolate/15 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/hero section/Cut inner/6d7a427cd0c48be5f486a4220aa6a805.jpg"
                  alt="Pastry box preview"
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                />
                <div>
                  <h4 className="font-heading text-sm font-bold text-brand-chocolate">
                    Curate a Pastry Box
                  </h4>
                  <p className="text-xs text-brand-chocolate/65 mt-0.5">
                    Mix &amp; match your favorite single slices in premium gold foil gift packaging.
                  </p>
                </div>
              </div>
              <div className="text-[11px] text-brand-chocolate/70 bg-brand-peach/50 p-2.5 rounded-xl border border-brand-chocolate/10 flex justify-between items-center">
                <span>Portion Options</span>
                <span className="font-bold text-brand-chocolate">1 Slice &bull; Box of 2 &bull; Box of 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FILTER & SORT CONTROLS BAR
      ────────────────────────────────────────────────────────────── */}
      <section className="sticky top-16 sm:top-20 lg:top-[88px] xl:top-24 z-30 bg-brand-cream/95 backdrop-blur-md border-b border-brand-chocolate/10 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Tag Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {tagPills.map((tab) => {
                const isActive = selectedTag === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedTag(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-chocolate text-brand-gold shadow-xs'
                        : 'bg-white/80 hover:bg-white text-brand-chocolate/80 hover:text-brand-chocolate border border-brand-chocolate/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-2.5">
              {/* Eggless Toggle Pill */}
              <button
                type="button"
                onClick={() => setEgglessOnly(!egglessOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  egglessOnly
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-brand-chocolate/80 border border-brand-chocolate/10'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${egglessOnly ? 'bg-white' : 'bg-emerald-600'}`} />
                <span>Pure Eggless</span>
              </button>

              {/* Search Box */}
              <div className="relative flex-1 md:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-brand-chocolate/50 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pastries..."
                  className="w-full pl-8 pr-7 py-1.5 rounded-full bg-white border border-brand-chocolate/15 text-xs text-brand-chocolate placeholder:text-brand-chocolate/40 focus:outline-none focus:border-brand-caramel transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-chocolate/40 hover:text-brand-chocolate"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="pl-3 pr-8 py-1.5 rounded-full bg-white border border-brand-chocolate/15 text-xs font-semibold text-brand-chocolate focus:outline-none focus:border-brand-caramel cursor-pointer appearance-none"
                  aria-label="Sort pastries by"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ArrowUpDown className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-brand-chocolate/50 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. PASTRY PRODUCTS CATALOGUE GRID
      ────────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Result Counter & Active Filter Pills */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-chocolate/10 text-xs text-brand-chocolate/70">
          <span>
            Showing <strong className="text-brand-chocolate font-bold">{filteredProducts.length}</strong> artisan confections
          </span>

          {(selectedTag !== 'all' || egglessOnly || searchQuery) && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 text-brand-caramel font-semibold hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((pastry) => (
              <ProductCard key={pastry._id} product={pastry} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto border border-brand-chocolate/15 shadow-sm space-y-4 my-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-brand-peach flex items-center justify-center text-brand-chocolate">
              <CakeSlice className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-lg font-bold text-brand-chocolate">
              No matching pastries found
            </h3>
            <p className="text-xs sm:text-sm text-brand-chocolate/70">
              We couldn&apos;t find any pastries matching your criteria. Try resetting your search or exploring our full cake atelier.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold hover:bg-brand-caramel hover:text-white transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
              <Link
                href="/cakes"
                className="px-4 py-2 rounded-xl bg-brand-peach text-brand-chocolate text-xs font-bold hover:bg-brand-peach/80 transition-colors"
              >
                View Full Cake Menu
              </Link>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            4. PASTRY FAQ / QUALITY COMMITMENT
        ────────────────────────────────────────────────────────────── */}
        <section className="mt-16 sm:mt-24 pt-12 border-t border-brand-chocolate/15">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] uppercase font-bold text-brand-caramel tracking-[0.2em] block mb-1">
              Boutique Quality Standards
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-brand-chocolate">
              The Chef&apos;s Cake World Pastry Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 rounded-2xl p-6 border border-brand-chocolate/10 space-y-2">
              <h3 className="font-heading text-base font-bold text-brand-chocolate">
                Single-Origin Couverture
              </h3>
              <p className="text-xs text-brand-chocolate/70 leading-relaxed font-body">
                We use 70% Callebaut dark chocolate and Dutch cocoa. Never compound fats, hydrogenated oils, or artificial flavors.
              </p>
            </div>

            <div className="bg-white/80 rounded-2xl p-6 border border-brand-chocolate/10 space-y-2">
              <h3 className="font-heading text-base font-bold text-brand-chocolate">
                100% Segregated Eggless Ovens
              </h3>
              <p className="text-xs text-brand-chocolate/70 leading-relaxed font-body">
                Our pure vegetarian pastries are baked in dedicated vegetarian zones with pure dairy mascarpone and fruit coulis.
              </p>
            </div>

            <div className="bg-white/80 rounded-2xl p-6 border border-brand-chocolate/10 space-y-2">
              <h3 className="font-heading text-base font-bold text-brand-chocolate">
                Protective Luxe Clamshells
              </h3>
              <p className="text-xs text-brand-chocolate/70 leading-relaxed font-body">
                Every pastry slice is packed in an individual structured food-grade box, maintaining mirror glazes during transit.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function PastriesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-cream flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-3 border-brand-caramel border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-heading text-sm text-brand-chocolate font-semibold">
              Loading Artisan Pastries...
            </p>
          </div>
        </div>
      }
    >
      <PastriesCatalogueContent />
    </Suspense>
  );
}

