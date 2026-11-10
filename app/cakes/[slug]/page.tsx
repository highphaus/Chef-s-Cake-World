'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  ShoppingBag,
  Sparkles,
  Truck,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Share2,
  Heart,
  Plus,
  Minus,
  Info
} from 'lucide-react';
import { api } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';
import { MASTER_PRODUCTS, findMasterProduct } from '@/lib/productsData';

interface ProductDetailPageProps {
  params?: {
    slug?: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const routeParams = useParams();
  const rawParamSlug = params?.slug || routeParams?.slug;
  const slugStr = Array.isArray(rawParamSlug) ? rawParamSlug[0] : (rawParamSlug ? String(rawParamSlug) : '');
  const cleanSlug = slugStr ? decodeURIComponent(slugStr).trim() : '';

  const router = useRouter();
  const { addToCart } = useCart();

  // Instantly resolve initial product from local master repository with zero network delay
  const initialResolved = cleanSlug ? findMasterProduct(cleanSlug) : MASTER_PRODUCTS[0];

  const [product, setProduct] = useState<any>(initialResolved);
  const [relatedProducts, setRelatedProducts] = useState<any[]>(() =>
    MASTER_PRODUCTS.filter((p) => p.slug !== initialResolved.slug).slice(0, 4)
  );
  const [selectedImage, setSelectedImage] = useState<string>(initialResolved.images?.[0] || '');
  const [loading, setLoading] = useState(false);

  // Customization State initialized with the product defaults
  const [selectedWeight, setSelectedWeight] = useState<string>(
    initialResolved.availableWeights?.[0] || '0.5 kg'
  );
  const [selectedFlavour, setSelectedFlavour] = useState<string>(
    initialResolved.availableFlavours?.[0] || 'Original'
  );
  const [isEggless, setIsEggless] = useState<boolean>(initialResolved.egglessAvailable ?? true);
  const [customMessage, setCustomMessage] = useState('');
  const [candlesCount, setCandlesCount] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Delivery Availability State
  const [pincode, setPincode] = useState('');
  const [pincodeChecking, setPincodeChecking] = useState(false);
  const [pincodeResult, setPincodeResult] = useState<any>(null);
  const [pincodeError, setPincodeError] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('02:00 PM - 05:00 PM (Afternoon)');

  useEffect(() => {
    if (!cleanSlug) return;
    
    // 1. Immediately ensure local match is in place
    const matched = findMasterProduct(cleanSlug);
    if (matched) {
      setProduct(matched);
      setSelectedImage(matched.images?.[0] || '');
      setSelectedWeight(matched.availableWeights?.[0] || '0.5 kg');
      setSelectedFlavour(matched.availableFlavours?.[0] || 'Original');
      setIsEggless(matched.egglessAvailable ?? true);
      setRelatedProducts(MASTER_PRODUCTS.filter((p) => p.slug !== matched.slug).slice(0, 4));
    }

    // 2. Query live API in background if online, gracefully handling offline/timeout
    const fetchLiveProduct = async () => {
      try {
        const res = await api.getProductBySlug(cleanSlug);
        if (res && res.success && res.product) {
          setProduct(res.product);
          if (res.product.images?.[0]) setSelectedImage(res.product.images[0]);
          if (res.product.availableWeights?.[0]) setSelectedWeight(res.product.availableWeights[0]);
          if (res.product.availableFlavours?.[0]) setSelectedFlavour(res.product.availableFlavours[0]);
          if (res.product.egglessAvailable !== undefined) setIsEggless(res.product.egglessAvailable);
          if (res.relatedProducts && res.relatedProducts.length > 0) {
            setRelatedProducts(res.relatedProducts);
          }
        }
      } catch (err) {
        // Backend offline or timeout: local master fallback remains active
      }
    };

    fetchLiveProduct();
  }, [cleanSlug]);

  // Dynamic price calculation based on chosen weight
  const calculateCurrentPrice = () => {
    return getPriceForWeight(selectedWeight);
  };

  const getPriceForWeight = (w: string) => {
    if (!product) return 0;
    const base = product.basePrice;
    const lower = w.toLowerCase();
    
    // Pastry and Sweet portion pricing
    if (lower.includes('1 slice') || lower.includes('1 piece') || lower.includes('1 cup') || lower.includes('1 jar')) return base;
    if (lower.includes('box of 2') || lower.includes('pack of 2')) return Math.round(base * 1.95);
    if (lower.includes('box of 4') || lower.includes('pack of 4')) return Math.round(base * 3.8);
    if (lower.includes('box of 6')) return Math.round(base * 5.5);
    if (lower.includes('box of 12')) return Math.round(base * 10.5);

    // Cake weight pricing
    if (lower.includes('0.5')) return base;
    if (lower.includes('1.5')) return Math.round(base * 2.8);
    if (lower.includes('1')) return Math.round(base * 1.9);
    if (lower.includes('2')) return Math.round(base * 3.6);
    if (lower.includes('3')) return Math.round(base * 5.2);
    if (lower.includes('4')) return Math.round(base * 6.8);
    if (lower.includes('5')) return Math.round(base * 8.4);
    return base;
  };

  const getServingForWeight = (w: string) => {
    const lower = w.toLowerCase();
    if (lower.includes('1 slice') || lower.includes('1 piece') || lower.includes('1 cup') || lower.includes('1 jar')) return 'Individual Treat (Serves 1)';
    if (lower.includes('box of 2') || lower.includes('pack of 2')) return 'Pair Indulgence (Serves 2)';
    if (lower.includes('box of 4') || lower.includes('pack of 4')) return 'Dessert Sharing Box (Serves 3 - 4)';
    if (lower.includes('box of 6')) return 'Celebration Box (Serves 4 - 6)';
    if (lower.includes('box of 12')) return 'Party Sharing Box (Serves 8 - 12)';

    if (w.includes('0.5')) return 'Serves 4 - 6';
    if (w.includes('1.5')) return 'Serves 12 - 16';
    if (w.includes('1')) return 'Serves 8 - 12';
    if (w.includes('2')) return 'Serves 16 - 22';
    if (w.includes('3')) return 'Serves 25 - 35';
    if (w.includes('4')) return 'Serves 35 - 50';
    return 'Celebration size';
  };

  const handlePincodeCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.trim().length !== 6) {
      setPincodeError('Please enter a valid 6-digit PIN code');
      return;
    }
    setPincodeError('');
    setPincodeChecking(true);
    setPincodeResult(null);

    try {
      const res = await api.checkPincode(pincode.trim());
      setPincodeResult(res);
    } catch (err: any) {
      setPincodeError(err.message || 'Error checking pincode');
    } finally {
      setPincodeChecking(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    await addToCart({
      productId: product._id,
      selectedWeight,
      selectedFlavour,
      isEggless,
      customMessage: customMessage.trim(),
      candlesCount,
      quantity,
    });
    setIsAdding(false);
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="py-28 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-caramel border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-heading text-lg text-brand-chocolate">Preparing artisan cake details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4 space-y-4">
        <h2 className="font-heading text-2xl text-brand-chocolate">Cake Not Found</h2>
        <p className="text-sm text-brand-chocolate/70">
          The requested creation may have retired from our seasonal rotation.
        </p>
        <Link
          href="/cakes"
          className="inline-block px-6 py-2.5 rounded-full bg-brand-chocolate text-brand-gold font-bold text-sm"
        >
          Browse All Cakes
        </Link>
      </div>
    );
  }

  const unitPrice = calculateCurrentPrice();
  const totalPrice = unitPrice * quantity;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-16">
      {/* Breadcrumbs */}
      <nav className="text-xs text-brand-chocolate/60 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-caramel">Home</Link>
        <span>&bull;</span>
        <Link href="/cakes" className="hover:text-brand-caramel">Cakes</Link>
        <span>&bull;</span>
        <span className="text-brand-chocolate font-bold truncate">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-brand-cream/40 border border-brand-chocolate/10 shadow-cake-soft relative">
            <img
              src={selectedImage || product.images?.[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-caramel text-white text-xs font-bold uppercase tracking-wider shadow">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === img ? 'border-brand-caramel scale-105' : 'border-brand-chocolate/10 opacity-70'
                  }`}
                >
                  <img src={img} alt={`view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Ingredients & Allergens Accordion */}
          <div className="p-4 rounded-2xl bg-white border border-brand-chocolate/10 text-xs space-y-2">
            <h4 className="font-bold text-brand-chocolate flex items-center gap-1.5">
              <Info className="w-4 h-4 text-brand-caramel" />
              <span>Artisan Ingredients &amp; Allergens</span>
            </h4>
            <p className="text-brand-chocolate/70 leading-relaxed">
              <strong>Crafted with:</strong> {product.ingredients?.join(', ') || 'Belgian couverture chocolate, heavy fresh dairy cream, Madagascar vanilla bean, organic cane sugar.'}
            </p>
            <p className="text-brand-chocolate/70">
              <strong>Allergen Notice:</strong> Contains {product.allergens?.join(', ') || 'Dairy, Wheat/Gluten'}. Handcrafted in an artisan kitchen that handles tree nuts.
            </p>
          </div>
        </div>

        {/* Right: Customization & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-brand-caramel">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-brand-chocolate">{product.averageRating.toFixed(1)}</span>
              <span className="text-xs text-brand-chocolate/50">({product.reviewCount} customer reviews)</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl text-brand-chocolate">
              {product.name}
            </h1>

            <p className="text-sm text-brand-chocolate/80 mt-2 leading-relaxed">
              {product.description}
            </p>

            {/* Price display */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-heading text-3xl text-brand-caramel">
                ₹{unitPrice}
              </span>
              <span className="text-xs text-brand-chocolate/60">
                (Inclusive of 5% bakery GST &bull; Excludes delivery)
              </span>
            </div>
          </div>

          <hr className="border-brand-chocolate/10" />

          {/* Customization Options */}
          <div className="space-y-5">
            {/* 1. Weight Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase font-bold text-brand-chocolate/70 tracking-wider block">
                  1. Select Cake Weight:
                </label>
                <span className="text-[11px] font-semibold text-brand-caramel">
                  {getServingForWeight(selectedWeight)}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {product.availableWeights?.map((w: string) => {
                  const isSelected = selectedWeight === w;
                  const price = getPriceForWeight(w);
                  return (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-left transition-all border ${
                        isSelected
                          ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-md scale-[1.02]'
                          : 'bg-white border-brand-chocolate/20 text-brand-chocolate hover:bg-brand-peach/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm">{w}</span>
                        <span className={`text-[11px] font-bold ${isSelected ? 'text-brand-gold' : 'text-brand-caramel'}`}>
                          ₹{price}
                        </span>
                      </div>
                      <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-brand-cream/80' : 'text-brand-chocolate/60'}`}>
                        {getServingForWeight(w)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Flavour Infusion */}
            {product.availableFlavours && product.availableFlavours.length > 0 && (
              <div>
                <label className="text-xs uppercase font-bold text-brand-chocolate/70 tracking-wider block mb-2">
                  2. Flavour Profile:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableFlavours.map((fl: string) => (
                    <button
                      key={fl}
                      type="button"
                      onClick={() => setSelectedFlavour(fl)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedFlavour === fl
                          ? 'bg-brand-caramel text-white font-bold'
                          : 'bg-white border border-brand-chocolate/20 text-brand-chocolate hover:bg-brand-peach/30'
                      }`}
                    >
                      {fl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Egg Preference */}
            <div>
              <label className="text-xs uppercase font-bold text-brand-chocolate/70 tracking-wider block mb-2">
                3. Dietary Preference:
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEggless(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isEggless
                      ? 'bg-brand-chocolate text-brand-gold shadow-sm'
                      : 'bg-white border border-brand-chocolate/20 text-brand-chocolate'
                  }`}
                >
                  <span>100% Pure Eggless</span>
                </button>

                {product.eggOptionAvailable && (
                  <button
                    type="button"
                    onClick={() => setIsEggless(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      !isEggless
                        ? 'bg-brand-chocolate text-white shadow-sm'
                        : 'bg-white border border-brand-chocolate/20 text-brand-chocolate'
                    }`}
                  >
                    <span>Contains Egg</span>
                  </button>
                )}
              </div>
            </div>

            {/* 4. Custom Plaque Message */}
            <div>
              <label className="text-xs uppercase font-bold text-brand-chocolate/70 tracking-wider block mb-1">
                4. Custom Message on Cake Plaque (Complimentary):
              </label>
              <input
                type="text"
                maxLength={35}
                placeholder="e.g. Happy 30th Birthday Rahul!"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-1 focus:ring-brand-caramel bg-white"
              />
              <span className="text-[10px] text-brand-chocolate/50 block text-right mt-1">
                {customMessage.length}/35 characters
              </span>
            </div>

            {/* 5. Quantity & Total Controls */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs uppercase font-bold text-brand-chocolate/70">Quantity:</span>
              <div className="flex items-center border border-brand-chocolate/20 rounded-xl bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-brand-chocolate hover:text-brand-caramel"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-brand-chocolate">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-brand-chocolate hover:text-brand-caramel"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="ml-auto text-right">
                <span className="text-[11px] text-brand-chocolate/60 block">Item Subtotal</span>
                <span className="font-heading text-2xl text-brand-chocolate">₹{totalPrice}</span>
              </div>
            </div>
          </div>

          <hr className="border-brand-chocolate/10" />

          {/* Delivery & Pincode Resolution */}
          <div className="bg-brand-peach/40 p-5 rounded-2xl border border-brand-chocolate/10 space-y-3">
            <div className="flex items-center gap-2 text-brand-chocolate font-bold text-sm">
              <Truck className="w-4 h-4 text-brand-caramel" />
              <span>Verify Branch Delivery to Your PIN Code</span>
            </div>

            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit delivery PIN code..."
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3 py-2 rounded-xl text-xs border border-brand-chocolate/20 bg-white text-brand-chocolate font-semibold focus:outline-none"
              />
              <button
                type="submit"
                disabled={pincodeChecking}
                className="px-4 py-2 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold hover:bg-brand-caramel hover:text-white transition-all flex-shrink-0"
              >
                {pincodeChecking ? 'Checking...' : 'Check'}
              </button>
            </form>

            {pincodeError && <p className="text-xs text-brand-caramel font-semibold">{pincodeError}</p>}

            {pincodeResult && (
              <div className="pt-2 text-xs">
                {pincodeResult.isServiceable ? (
                  <div className="p-2.5 rounded-lg bg-brand-peach/60 text-brand-chocolate border border-brand-chocolate/15 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-caramel" />
                      {pincodeResult.message}
                    </p>
                    <p className="text-[11px] text-brand-chocolate/80">
                      Standard Delivery Fee: <strong>₹{pincodeResult.deliveryFee}</strong> &bull; Prep Time: <strong>{pincodeResult.estimatedDeliveryHours} Hours</strong>
                    </p>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-brand-cream text-brand-chocolate border border-brand-chocolate/20">
                    <p>{pincodeResult.message}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CTAs: Add to Cart & Buy Now */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="py-3.5 px-6 min-h-[48px] rounded-xl bg-brand-chocolate text-brand-gold font-bold text-sm hover:bg-brand-caramel hover:text-white transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isAdding ? 'Adding to Cart...' : 'Add to Cart'}</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="py-3.5 px-6 min-h-[48px] rounded-xl bg-brand-caramel text-white font-bold text-sm hover:bg-brand-chocolate hover:text-brand-gold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Instant Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products - Reduced Card Size on Smaller Devices (2 Cards Per Row) */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 sm:pt-12 border-t border-brand-chocolate/10">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h2 className="font-heading text-lg sm:text-2xl text-brand-chocolate">
              You May Also Savor
            </h2>
            <Link href="/cakes" className="text-xs font-bold text-brand-caramel hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

