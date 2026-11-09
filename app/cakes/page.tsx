'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { api } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';

const FALLBACK_CAKES = [
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
    category: { slug: 'chocolate-cakes', name: 'Chocolate Cakes' },
  },
  {
    _id: 'sample-2',
    name: 'Fresh Red Velvet Cream Cheese Luxe',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    description: '100% Pure vegetarian crimson sponge layered with whipped Philadelphia cream cheese frosting.',
    basePrice: 749,
    images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop'],
    availableWeights: ['0.5 kg', '1 kg', '2 kg'],
    availableFlavours: ['Classic Cream Cheese'],
    averageRating: 4.85,
    reviewCount: 98,
    isBestSeller: true,
    egglessAvailable: true,
    category: { slug: 'eggless-cakes', name: 'Eggless Delights' },
  },
  {
    _id: 'sample-3',
    name: 'Lotus Biscoff Speculoos Dream Cake',
    slug: 'lotus-biscoff-speculoos-dream-cake',
    description: 'Caramelized cinnamon biscuit crumb, creamy Biscoff mousse, and speculoos cookie spread.',
    basePrice: 799,
    images: ['https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop'],
    availableWeights: ['0.5 kg', '1 kg', '2 kg'],
    availableFlavours: ['Lotus Speculoos'],
    averageRating: 4.95,
    reviewCount: 76,
    isBestSeller: true,
    egglessAvailable: true,
    category: { slug: 'eggless-cakes', name: 'Eggless Delights' },
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
    category: { slug: 'birthday-cakes', name: 'Birthday Cakes' },
  },
  {
    _id: 'sample-5',
    name: 'Classic Pure Eggless Black Forest Gateau',
    slug: 'fresh-red-velvet-cream-cheese-luxe',
    description: 'Traditional German chocolate sponge layered with Maraschino cherry coulis and Belgian chocolate shavings.',
    basePrice: 649,
    images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'],
    availableWeights: ['0.5 kg', '1 kg', '2 kg'],
    availableFlavours: ['Cherry Chocolate'],
    averageRating: 4.88,
    reviewCount: 88,
    isBestSeller: true,
    egglessAvailable: true,
    category: { slug: 'eggless-cakes', name: 'Eggless Delights' },
  }
];

function CakesCatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialEggless = searchParams.get('eggless') === 'true' || initialCategory === 'eggless-cakes';

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [egglessOnly, setEgglessOnly] = useState(initialEggless);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [sortOption, setSortOption] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.getCategories();
        if (res.success && res.categories) setCategories(res.categories);
      } catch (err) {}
    };
    fetchCats();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      if (egglessOnly) params.append('eggless', 'true');
      if (selectedWeight) params.append('weight', selectedWeight);
      if (maxPrice < 4000) params.append('maxPrice', String(maxPrice));
      if (sortOption) params.append('sort', sortOption);

      const res = await api.getProducts(params.toString());
      if (res.success && res.products && res.products.length > 0) {
        setProducts(res.products);
      } else {
        // Fallback items filtered by user's options
        let fallback = [...FALLBACK_CAKES];
        if (egglessOnly || selectedCategory === 'eggless-cakes') {
          fallback = fallback.filter((c) => c.egglessAvailable);
        } else if (selectedCategory) {
          fallback = fallback.filter((c) => c.category?.slug === selectedCategory);
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          fallback = fallback.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
        }
        setProducts(fallback);
      }
    } catch (err) {
      // Offline fallback
      let fallback = [...FALLBACK_CAKES];
      if (egglessOnly || selectedCategory === 'eggless-cakes') {
        fallback = fallback.filter((c) => c.egglessAvailable);
      }
      setProducts(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, egglessOnly, selectedWeight, maxPrice, sortOption]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadProducts();
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setEgglessOnly(false);
    setSelectedWeight('');
    setMaxPrice(4000);
    setSortOption('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl text-brand-chocolate tracking-tight">
          Handcrafted Artisan Cake Collection
        </h1>
        <p className="text-sm sm:text-base text-brand-chocolate/70 mt-1 font-body">
          Baked fresh daily with pure Belgian couverture chocolate and farm-fresh dairy across our Kerala kitchens.
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-brand-chocolate/10 shadow-cake-soft mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search cakes (e.g. Truffle, Red Velvet)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-brand-chocolate/20 text-brand-chocolate focus:ring-1 focus:ring-brand-caramel focus:outline-none"
          />
          <Search className="w-4 h-4 text-brand-chocolate/50 absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Trigger */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-cream border border-brand-chocolate/20 text-xs font-bold text-brand-chocolate"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-chocolate">
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-caramel" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-brand-chocolate/20 text-xs bg-white text-brand-chocolate focus:outline-none focus:ring-1 focus:ring-brand-caramel font-medium"
            >
              <option value="newest">Newest Additions</option>
              <option value="popularity">Most Popular &bull; High Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`${
            mobileFilterOpen ? 'block' : 'hidden'
          } lg:block lg:col-span-1 bg-white rounded-2xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-6 h-fit`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-brand-chocolate/10">
            <div className="flex items-center gap-2 text-brand-chocolate font-bold text-sm">
              <Filter className="w-4 h-4 text-brand-caramel" />
              <span>Filter Cakes</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearFilters}
                className="text-[11px] text-brand-caramel hover:underline font-semibold"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="lg:hidden p-1 rounded-md text-brand-chocolate hover:bg-brand-peach/40"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Eggless Toggle */}
          <div className="p-3 rounded-xl bg-brand-cream/50 border border-brand-chocolate/10 flex items-center justify-between">
            <span className="text-xs font-bold text-brand-chocolate">🌱 100% Pure Eggless</span>
            <input
              type="checkbox"
              checked={egglessOnly}
              onChange={(e) => setEgglessOnly(e.target.checked)}
              className="w-4 h-4 rounded text-brand-caramel accent-brand-chocolate cursor-pointer"
            />
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-brand-chocolate/60 tracking-wider block">
              Categories
            </span>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setEgglessOnly(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedCategory === '' && !egglessOnly
                    ? 'bg-brand-chocolate text-brand-gold font-bold'
                    : 'text-brand-chocolate/80 hover:bg-brand-peach/40'
                }`}
              >
                All Cakes
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('eggless-cakes');
                  setEgglessOnly(true);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === 'eggless-cakes' || egglessOnly
                    ? 'bg-brand-chocolate text-brand-gold font-bold'
                    : 'text-brand-chocolate/80 hover:bg-brand-peach/40'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span>100% Pure Eggless Cakes</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  Pure Veg
                </span>
              </button>

              {categories.filter((c) => c.slug !== 'eggless-cakes').map((c) => (
                <button
                  key={c.slug}
                  onClick={() => {
                    setSelectedCategory(c.slug);
                    setEgglessOnly(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedCategory === c.slug && !egglessOnly
                      ? 'bg-brand-chocolate text-brand-gold font-bold'
                      : 'text-brand-chocolate/80 hover:bg-brand-peach/40'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-brand-chocolate/60 tracking-wider block">
              Weight Options
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['0.5 kg', '1 kg', '1.5 kg', '2 kg', '3 kg'].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeight(selectedWeight === w ? '' : w)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                    selectedWeight === w
                      ? 'bg-brand-chocolate text-brand-gold font-bold'
                      : 'bg-brand-cream/60 text-brand-chocolate hover:bg-brand-peach'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-brand-chocolate">
              <span>Max Price:</span>
              <span className="font-bold text-brand-caramel">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min={499}
              max={4000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-caramel"
            />
            <div className="flex justify-between text-[10px] text-brand-chocolate/50">
              <span>₹499</span>
              <span>₹4,000+</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3 space-y-6">
          {/* Quick Filter Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('');
                setEgglessOnly(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === '' && !egglessOnly
                  ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate'
                  : 'bg-white text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/30'
              }`}
            >
              All Cakes
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('eggless-cakes');
                setEgglessOnly(true);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                selectedCategory === 'eggless-cakes' || egglessOnly
                  ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-sm'
                  : 'bg-white text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span>100% Pure Eggless Cakes</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('chocolate-cakes');
                setEgglessOnly(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === 'chocolate-cakes' && !egglessOnly
                  ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate'
                  : 'bg-white text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/30'
              }`}
            >
              🍫 Belgian Truffle
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('birthday-cakes');
                setEgglessOnly(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === 'birthday-cakes' && !egglessOnly
                  ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate'
                  : 'bg-white text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/30'
              }`}
            >
              🎂 Birthday Cakes
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('wedding-cakes');
                setEgglessOnly(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === 'wedding-cakes' && !egglessOnly
                  ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate'
                  : 'bg-white text-brand-chocolate border-brand-chocolate/15 hover:bg-brand-peach/30'
              }`}
            >
              💍 Wedding Masterworks
            </button>
          </div>
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-brand-caramel border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-semibold text-brand-chocolate">Selecting fresh artisanal cakes...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-brand-chocolate/10 p-8 space-y-4">
              <h3 className="font-heading text-xl text-brand-chocolate">No cakes match your criteria</h3>
              <p className="text-xs sm:text-sm text-brand-chocolate/70 max-w-sm mx-auto">
                Try resetting some filters or searching for our signature Belgian Chocolate Truffle or Red Velvet cakes.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold hover:bg-brand-caramel hover:text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>
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
