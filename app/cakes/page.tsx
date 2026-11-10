'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Filter,
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  Star,
  Check,
  RotateCcw,
  Cake,
  Cookie,
  UtensilsCrossed,
  Tag
} from 'lucide-react';
import { api } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import { MASTER_PRODUCTS, MASTER_CATEGORIES, ProductItem, CategoryItem } from '@/lib/productsData';

function CakesCatalogueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialEggless = searchParams.get('eggless') === 'true' || initialCategory === 'eggless-cakes';

  const [categories, setCategories] = useState<CategoryItem[]>(MASTER_CATEGORIES);
  const [allProducts, setAllProducts] = useState<ProductItem[]>(MASTER_PRODUCTS);
  const [loading, setLoading] = useState(false);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [itemType, setItemType] = useState<'all' | 'cake' | 'pastry' | 'sweet'>('all');
  const [egglessOnly, setEgglessOnly] = useState<boolean>(initialEggless);
  const [pricePreset, setPricePreset] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync category if URL param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat !== null) {
      setSelectedCategory(cat);
      if (cat === 'pastries') setItemType('pastry');
      else if (cat === 'sweets-desserts') setItemType('sweet');
      else if (cat === 'eggless-cakes') setEgglessOnly(true);
    }
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileFilterOpen]);

  // Load from API if backend is online, fallback to MASTER_PRODUCTS
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.getCategories(),
          api.getProducts('limit=50'),
        ]);
        if (catRes.success && catRes.categories && catRes.categories.length > 0) {
          // Merge with MASTER_CATEGORIES to ensure pastries and sweets are always included
          const existingSlugs = new Set(catRes.categories.map((c: any) => c.slug));
          const mergedCats = [
            ...catRes.categories,
            ...MASTER_CATEGORIES.filter((c) => !existingSlugs.has(c.slug)),
          ];
          setCategories(mergedCats);
        }
        if (prodRes.success && prodRes.products && prodRes.products.length > 0) {
          const existingSlugs = new Set(prodRes.products.map((p: any) => p.slug));
          const mergedProds = [
            ...prodRes.products.map((p: any) => ({
              ...p,
              itemType: p.itemType || (p.category?.slug === 'pastries' ? 'pastry' : p.category?.slug === 'sweets-desserts' ? 'sweet' : 'cake'),
            })),
            ...MASTER_PRODUCTS.filter((p) => !existingSlugs.has(p.slug)),
          ];
          setAllProducts(mergedProds);
        }
      } catch (err) {
        // Safe offline fallback
        setCategories(MASTER_CATEGORIES);
        setAllProducts(MASTER_PRODUCTS);
      }
    };
    fetchApiData();
  }, []);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Item Type filter
    if (itemType !== 'all') {
      result = result.filter((p) => {
        if (itemType === 'pastry') return p.itemType === 'pastry' || p.category?.slug === 'pastries';
        if (itemType === 'sweet') return p.itemType === 'sweet' || p.category?.slug === 'sweets-desserts';
        if (itemType === 'cake') return p.itemType === 'cake' || (!['pastries', 'sweets-desserts'].includes(p.category?.slug || ''));
        return true;
      });
    }

    // 2. Category filter
    if (selectedCategory) {
      if (selectedCategory === 'eggless-cakes') {
        result = result.filter((p) => p.egglessAvailable);
      } else {
        result = result.filter((p) => p.category?.slug === selectedCategory);
      }
    }

    // 3. Eggless filter
    if (egglessOnly) {
      result = result.filter((p) => p.egglessAvailable);
    }

    // 4. Text Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category?.name.toLowerCase().includes(q) ||
          p.availableFlavours?.some((f) => f.toLowerCase().includes(q))
      );
    }

    // 5. Price Preset or Slider
    if (pricePreset === 'under-200') {
      result = result.filter((p) => p.basePrice <= 200);
    } else if (pricePreset === '200-699') {
      result = result.filter((p) => p.basePrice >= 200 && p.basePrice <= 699);
    } else if (pricePreset === '700-1299') {
      result = result.filter((p) => p.basePrice >= 700 && p.basePrice <= 1299);
    } else if (pricePreset === '1300-plus') {
      result = result.filter((p) => p.basePrice >= 1300);
    } else if (maxPrice < 4000) {
      result = result.filter((p) => p.basePrice <= maxPrice);
    }

    // 6. Rating filter
    if (minRating > 0) {
      result = result.filter((p) => (p.averageRating || 0) >= minRating);
    }

    // 7. Weight / Portion filter
    if (selectedWeight) {
      result = result.filter((p) =>
        p.availableWeights?.some((w) => w.toLowerCase().includes(selectedWeight.toLowerCase()))
      );
    }

    // 8. Sorting
    result.sort((a, b) => {
      if (sortOption === 'price-asc') return a.basePrice - b.basePrice;
      if (sortOption === 'price-desc') return b.basePrice - a.basePrice;
      if (sortOption === 'popularity') {
        const ratingA = (a.averageRating || 4.5) * 100 + (a.reviewCount || 0);
        const ratingB = (b.averageRating || 4.5) * 100 + (b.reviewCount || 0);
        return ratingB - ratingA;
      }
      // 'newest' or default
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });

    return result;
  }, [allProducts, itemType, selectedCategory, egglessOnly, searchQuery, pricePreset, maxPrice, minRating, selectedWeight, sortOption]);

  // Active filters count (for badge and drawer header)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory) count++;
    if (itemType !== 'all') count++;
    if (egglessOnly) count++;
    if (searchQuery.trim()) count++;
    if (pricePreset !== 'all' || maxPrice < 4000) count++;
    if (minRating > 0) count++;
    if (selectedWeight) count++;
    return count;
  }, [selectedCategory, itemType, egglessOnly, searchQuery, pricePreset, maxPrice, minRating, selectedWeight]);

  const clearAllFilters = () => {
    setSelectedCategory('');
    setItemType('all');
    setSearchQuery('');
    setEgglessOnly(false);
    setPricePreset('all');
    setMaxPrice(4000);
    setMinRating(0);
    setSelectedWeight('');
    setSortOption('popularity');
  };

  const handlePricePresetClick = (preset: string) => {
    if (pricePreset === preset) {
      setPricePreset('all');
      setMaxPrice(4000);
    } else {
      setPricePreset(preset);
      if (preset === 'under-200') setMaxPrice(200);
      else if (preset === '200-699') setMaxPrice(699);
      else if (preset === '700-1299') setMaxPrice(1299);
      else if (preset === '1300-plus') setMaxPrice(4000);
    }
  };

  // Reusable Filter Content (Used both in Desktop Sidebar and Mobile Slide-out Drawer)
  const FilterControls = () => (
    <div className="space-y-6">
      {/* 1. Item Department / Type (Cakes vs Pastries vs Sweets) */}
      <div className="space-y-2.5">
        <span className="text-xs uppercase font-bold text-brand-chocolate/70 tracking-wider flex items-center gap-1.5">
          <UtensilsCrossed className="w-3.5 h-3.5 text-brand-caramel" />
          <span>Product Line</span>
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Confections', icon: '✨' },
            { id: 'cake', label: 'Celebration Cakes', icon: '🎂' },
            { id: 'pastry', label: 'Artisan Pastries', icon: '🍰' },
            { id: 'sweet', label: 'Sweets & Desserts', icon: '🍮' },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => {
                setItemType(type.id as any);
                if (type.id === 'pastry') setSelectedCategory('pastries');
                else if (type.id === 'sweet') setSelectedCategory('sweets-desserts');
                else if (type.id === 'cake' && ['pastries', 'sweets-desserts'].includes(selectedCategory)) setSelectedCategory('');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all border flex items-center gap-1.5 ${
                itemType === type.id
                  ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-sm'
                  : 'bg-brand-cream/50 text-brand-chocolate/80 border-brand-chocolate/10 hover:bg-brand-peach/40'
              }`}
            >
              <span>{type.icon}</span>
              <span className="truncate">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Dietary Preference (100% Pure Eggless) */}
      <div className="p-3.5 rounded-2xl bg-brand-cream/60 border border-brand-chocolate/10 space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="eggless-toggle" className="cursor-pointer flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
            <span className="text-xs font-bold text-brand-chocolate">100% Pure Eggless</span>
          </label>
          <input
            id="eggless-toggle"
            type="checkbox"
            checked={egglessOnly}
            onChange={(e) => setEgglessOnly(e.target.checked)}
            className="w-4 h-4 rounded text-brand-caramel accent-brand-chocolate cursor-pointer"
          />
        </div>
        <p className="text-[11px] text-brand-chocolate/65 leading-tight">
          Strictly segregated vegetarian line baked with pure dairy & natural vanilla.
        </p>
      </div>

      {/* 3. Categories Navigation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold text-brand-chocolate/70 tracking-wider">
            Categories
          </span>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              className="text-[11px] text-brand-caramel font-semibold hover:underline"
            >
              View All
            </button>
          )}
        </div>
        <div className="space-y-1 text-xs max-h-56 overflow-y-auto pr-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('');
              setItemType('all');
            }}
            className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors flex items-center justify-between ${
              selectedCategory === ''
                ? 'bg-brand-chocolate text-brand-gold font-bold'
                : 'text-brand-chocolate/80 hover:bg-brand-peach/40'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[11px] opacity-75">{allProducts.length}</span>
          </button>

          {categories.map((c) => {
            const count = allProducts.filter((p) => p.category?.slug === c.slug).length;
            const isSelected = selectedCategory === c.slug;

            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => {
                  setSelectedCategory(isSelected ? '' : c.slug);
                  if (c.slug === 'pastries') setItemType('pastry');
                  else if (c.slug === 'sweets-desserts') setItemType('sweet');
                }}
                className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-brand-chocolate text-brand-gold font-bold shadow-2xs'
                    : 'text-brand-chocolate/80 hover:bg-brand-peach/40'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span>{c.icon || '🎂'}</span>
                  <span className="truncate">{c.name}</span>
                </div>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isSelected
                        ? 'bg-brand-gold/30 text-brand-gold'
                        : 'bg-brand-chocolate/10 text-brand-chocolate/70'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Price Filter (Quick Presets & Continuous Slider) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold text-brand-chocolate/70 tracking-wider">
            Price Range
          </span>
          <span className="text-xs font-bold text-brand-caramel">
            {pricePreset === 'under-200'
              ? 'Under ₹200'
              : pricePreset === '200-699'
              ? '₹200 - ₹699'
              : pricePreset === '700-1299'
              ? '₹700 - ₹1,299'
              : pricePreset === '1300-plus'
              ? '₹1,300+'
              : `Up to ₹${maxPrice}`}
          </span>
        </div>

        {/* Quick Price Pills */}
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {[
            { id: 'under-200', label: 'Under ₹200', desc: 'Pastries & Sweets' },
            { id: '200-699', label: '₹200 - ₹699', desc: 'Mini Treats & Cakes' },
            { id: '700-1299', label: '₹700 - ₹1,299', desc: 'Signature Cakes' },
            { id: '1300-plus', label: '₹1,300+', desc: 'Grand Tiers & Gifts' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePricePresetClick(preset.id)}
              className={`p-2 rounded-xl text-left border transition-all ${
                pricePreset === preset.id
                  ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-xs'
                  : 'bg-white text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/30'
              }`}
            >
              <div className="font-bold text-[11px]">{preset.label}</div>
              <div className="text-[9.5px] opacity-75 truncate">{preset.desc}</div>
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="space-y-1 pt-1">
          <input
            type="range"
            min={99}
            max={4000}
            step={50}
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
              setPricePreset('custom');
            }}
            className="w-full accent-brand-caramel cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-brand-chocolate/50 font-medium">
            <span>₹99</span>
            <span>₹1,500</span>
            <span>₹4,000+</span>
          </div>
        </div>
      </div>

      {/* 5. Minimum Star Rating */}
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold text-brand-chocolate/70 tracking-wider block">
          Customer Rating
        </span>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { val: 0, label: 'All' },
            { val: 4.5, label: '4.5★ +' },
            { val: 4.8, label: '4.8★ +' },
          ].map((r) => (
            <button
              key={r.val}
              type="button"
              onClick={() => setMinRating(minRating === r.val ? 0 : r.val)}
              className={`py-1.5 px-2 rounded-xl font-bold border text-center transition-all ${
                minRating === r.val
                  ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-2xs'
                  : 'bg-white text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/30'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Portion & Weight Options */}
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold text-brand-chocolate/70 tracking-wider block">
          Portion / Size
        </span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: '1 slice', label: '1 Slice / Piece' },
            { id: 'box', label: 'Box / Pack' },
            { id: '0.5 kg', label: '0.5 kg' },
            { id: '1 kg', label: '1 kg' },
            { id: '2 kg', label: '2 kg+' },
          ].map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setSelectedWeight(selectedWeight === w.id ? '' : w.id)}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                selectedWeight === w.id
                  ? 'bg-brand-chocolate text-brand-gold font-bold'
                  : 'bg-brand-cream/60 text-brand-chocolate hover:bg-brand-peach/50'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-peach text-brand-chocolate text-xs font-bold tracking-wide uppercase mb-2 border border-brand-chocolate/15">
          <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
          <span>Fresh Daily Patisserie & Confections</span>
        </div>
        <h1 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-brand-chocolate tracking-tight">
          Handcrafted Cakes, Pastries & Sweets
        </h1>
        <p className="text-xs sm:text-base text-brand-chocolate/75 mt-1 sm:mt-2 max-w-2xl font-body leading-relaxed">
          From 70% Callebaut Belgian chocolate truffle cakes to melt-in-mouth individual pastry slices and traditional Indian fusion sweets.
        </p>
      </div>

      {/* Top Search & Filter Control Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-brand-chocolate/10 shadow-cake-soft mb-6 sm:mb-8 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search cakes, pastries, sweets (e.g. Truffle, Cheesecake, Tiramisu)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm border border-brand-chocolate/20 text-brand-chocolate placeholder:text-brand-chocolate/40 focus:ring-2 focus:ring-brand-caramel focus:border-brand-caramel focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-brand-chocolate/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-chocolate/50 hover:text-brand-chocolate p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Actions (Mobile Filter Drawer Trigger + Sort Dropdown) */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-chocolate text-brand-gold font-bold text-xs shadow-sm hover:bg-brand-caramel transition-all shrink-0 active:scale-95"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-brand-gold text-brand-chocolate text-[10px] font-black flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-chocolate shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-caramel" />
              <span className="hidden sm:inline text-brand-chocolate/70">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-brand-chocolate/20 text-xs bg-white text-brand-chocolate focus:outline-none focus:ring-2 focus:ring-brand-caramel font-medium cursor-pointer"
              >
                <option value="popularity">Most Popular &bull; High Rating</option>
                <option value="price-asc">Price: Low to High (Pastries & Sweets)</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Featured / Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Horizontal Quick Filter Pills (Responsive on All Devices) */}
        <div className="pt-2 border-t border-brand-chocolate/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setItemType('all');
              setSelectedCategory('');
              setEgglessOnly(false);
              setPricePreset('all');
              setMaxPrice(4000);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              itemType === 'all' && !selectedCategory && !egglessOnly && pricePreset === 'all'
                ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-xs'
                : 'bg-brand-cream/40 text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/40'
            }`}
          >
            ✨ All Confections
          </button>

          <button
            type="button"
            onClick={() => {
              setItemType('pastry');
              setSelectedCategory('pastries');
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              itemType === 'pastry' || selectedCategory === 'pastries'
                ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-xs'
                : 'bg-brand-cream/40 text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/40'
            }`}
          >
            🍰 Artisan Pastries
          </button>

          <button
            type="button"
            onClick={() => {
              setItemType('sweet');
              setSelectedCategory('sweets-desserts');
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              itemType === 'sweet' || selectedCategory === 'sweets-desserts'
                ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-xs'
                : 'bg-brand-cream/40 text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/40'
            }`}
          >
            🍮 Sweets & Desserts
          </button>

          <button
            type="button"
            onClick={() => {
              setItemType('cake');
              setSelectedCategory('birthday-cakes');
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              selectedCategory === 'birthday-cakes'
                ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-xs'
                : 'bg-brand-cream/40 text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/40'
            }`}
          >
            🎂 Birthday Cakes
          </button>

          <button
            type="button"
            onClick={() => {
              setItemType('cake');
              setSelectedCategory('chocolate-cakes');
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              selectedCategory === 'chocolate-cakes'
                ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-xs'
                : 'bg-brand-cream/40 text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/40'
            }`}
          >
            🍫 Belgian Truffle
          </button>

          <button
            type="button"
            onClick={() => setEgglessOnly(!egglessOnly)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 flex items-center gap-1.5 ${
              egglessOnly
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                : 'bg-brand-cream/40 text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/40'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>100% Pure Eggless</span>
          </button>

          <button
            type="button"
            onClick={() => handlePricePresetClick('under-200')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              pricePreset === 'under-200'
                ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-xs'
                : 'bg-brand-cream/40 text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/40'
            }`}
          >
            ⚡ Under ₹200
          </button>

          <button
            type="button"
            onClick={() => setMinRating(minRating === 4.8 ? 0 : 4.8)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 flex items-center gap-1 ${
              minRating === 4.8
                ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-xs'
                : 'bg-brand-cream/40 text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/40'
            }`}
          >
            <Star className="w-3 h-3 fill-current text-brand-caramel" />
            <span>Top Rated (4.8+)</span>
          </button>
        </div>
      </div>

      {/* Active Filter Badges Bar (Shows when any filter is on) */}
      {activeFiltersCount > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2 p-3 rounded-xl bg-brand-cream/40 border border-brand-chocolate/10 text-xs">
          <span className="font-bold text-brand-chocolate/70 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-brand-caramel" />
            <span>Active Filters:</span>
          </span>

          {itemType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-chocolate text-brand-gold font-bold">
              <span>{itemType === 'pastry' ? 'Pastries' : itemType === 'sweet' ? 'Sweets & Desserts' : 'Cakes'}</span>
              <button type="button" onClick={() => setItemType('all')} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-chocolate text-brand-gold font-bold">
              <span>{categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}</span>
              <button type="button" onClick={() => setSelectedCategory('')} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {egglessOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-700 text-white font-bold">
              <span>🌱 100% Eggless</span>
              <button type="button" onClick={() => setEgglessOnly(false)} className="hover:text-emerald-200">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-chocolate text-brand-gold font-bold">
              <span>Search: &ldquo;{searchQuery}&rdquo;</span>
              <button type="button" onClick={() => setSearchQuery('')} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {pricePreset !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-chocolate text-brand-gold font-bold">
              <span>
                {pricePreset === 'under-200'
                  ? 'Under ₹200'
                  : pricePreset === '200-699'
                  ? '₹200 - ₹699'
                  : pricePreset === '700-1299'
                  ? '₹700 - ₹1299'
                  : '₹1300+'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setPricePreset('all');
                  setMaxPrice(4000);
                }}
                className="hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-chocolate text-brand-gold font-bold">
              <span>{minRating}★+ Rated</span>
              <button type="button" onClick={() => setMinRating(0)} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedWeight && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-chocolate text-brand-gold font-bold">
              <span>Size: {selectedWeight}</span>
              <button type="button" onClick={() => setSelectedWeight('')} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={clearAllFilters}
            className="ml-auto text-brand-caramel font-bold hover:underline flex items-center gap-1 py-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Layout: Desktop Sidebar Filter + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* DESKTOP SIDEBAR FILTER (Visible on >= lg) */}
        <aside className="hidden lg:block lg:col-span-1 bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-brand-chocolate/10 mb-6">
            <div className="flex items-center gap-2 text-brand-chocolate font-bold text-sm">
              <Filter className="w-4 h-4 text-brand-caramel" />
              <span>Filter Confections</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[11px] text-brand-caramel hover:underline font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <FilterControls />
        </aside>

        {/* PRODUCTS MAIN CONTENT AREA */}
        <main className="lg:col-span-3 space-y-6">
          {/* Result Count and Quick Stats */}
          <div className="flex items-center justify-between text-xs font-semibold text-brand-chocolate/75 px-1">
            <span>
              Showing <strong className="text-brand-chocolate font-bold">{filteredProducts.length}</strong> handcrafted confections
            </span>
            <span className="text-[11px] text-brand-chocolate/50 hidden sm:inline">
              Dispatched fresh within 2 hours
            </span>
          </div>

          {loading ? (
            <div className="py-24 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-brand-caramel border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-semibold text-brand-chocolate">Curating fresh artisanal creations...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-brand-chocolate/10 p-8 space-y-4 shadow-cake-soft">
              <div className="w-14 h-14 rounded-2xl bg-brand-cream/80 text-brand-caramel flex items-center justify-center mx-auto text-2xl">
                🍰
              </div>
              <h3 className="font-heading text-xl sm:text-2xl text-brand-chocolate">No confections match your selection</h3>
              <p className="text-xs sm:text-sm text-brand-chocolate/70 max-w-md mx-auto leading-relaxed">
                Try loosening your filters, selecting a different price bracket, or clearing the search query to view our complete collection.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-6 py-2.5 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold hover:bg-brand-caramel hover:text-white transition-all shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p._id} product={p as any} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE RESPONSIVE FILTER DRAWER (Slide-over Bottom Sheet / Modal) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container (Right slide-over) */}
          <div className="fixed inset-y-0 right-0 max-w-full w-full sm:max-w-md bg-white shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-brand-chocolate/10 flex items-center justify-between bg-brand-cream/30">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-caramel" />
                <h2 className="font-heading text-lg text-brand-chocolate font-bold">
                  Filter Confections
                </h2>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-chocolate text-brand-gold text-[10px] font-black">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 rounded-xl text-brand-chocolate hover:bg-brand-peach/40 transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-6">
              <FilterControls />
            </div>

            {/* Drawer Sticky Action Footer */}
            <div className="p-4 border-t border-brand-chocolate/10 bg-white flex items-center gap-3 shadow-lg">
              <button
                type="button"
                onClick={clearAllFilters}
                className="py-3 px-4 rounded-xl border border-brand-chocolate/20 text-brand-chocolate font-bold text-xs hover:bg-brand-cream transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 px-5 rounded-xl bg-brand-chocolate text-brand-gold font-bold text-xs hover:bg-brand-caramel hover:text-white transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-brand-caramel" />
                <span>Show {filteredProducts.length} Confections</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CakesCataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-4 border-brand-caramel border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <CakesCatalogueContent />
    </Suspense>
  );
}
