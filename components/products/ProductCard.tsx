'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, Eye, Heart, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    basePrice: number;
    images: string[];
    availableWeights: string[];
    availableFlavours?: string[];
    averageRating: number;
    reviewCount: number;
    isBestSeller?: boolean;
    isFeatured?: boolean;
    egglessAvailable?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(product.availableWeights?.[0] || '0.5 kg');
  const [isAdding, setIsAdding] = useState(false);

  const calculateDisplayPrice = (weight: string) => {
    const base = product.basePrice;
    if (weight.includes('0.5')) return base;
    if (weight.includes('1.5')) return Math.round(base * 2.8);
    if (weight.includes('1')) return Math.round(base * 1.9);
    if (weight.includes('2')) return Math.round(base * 3.6);
    if (weight.includes('3')) return Math.round(base * 5.2);
    return base;
  };

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    await addToCart({
      productId: product._id,
      selectedWeight,
      selectedFlavour: product.availableFlavours?.[0] || 'Belgian Truffle',
      isEggless: true,
      quantity: 1,
    });
    setIsAdding(false);
  };

  const displayPrice = calculateDisplayPrice(selectedWeight);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-brand-chocolate/10 shadow-cake-soft hover:shadow-cake-hover transition-all duration-300 flex flex-col justify-between">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-brand-cream/30">
        <Link href={`/cakes/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full bg-brand-caramel text-white text-[11px] font-bold tracking-wide uppercase shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-gold" /> Best Seller
            </span>
          )}
          {product.egglessAvailable && (
            <span className="px-2 py-0.5 rounded-full bg-brand-peach text-brand-chocolate text-[10px] font-bold tracking-wider uppercase shadow-xs border border-brand-chocolate/15">
              100% Eggless Option
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Link
            href={`/cakes/${product.slug}`}
            className="p-2 rounded-full bg-white/90 text-brand-chocolate hover:bg-brand-chocolate hover:text-brand-gold shadow-md backdrop-blur-sm transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex text-brand-caramel">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-brand-chocolate">{product.averageRating.toFixed(1)}</span>
            <span className="text-xs text-brand-chocolate/50">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <Link href={`/cakes/${product.slug}`}>
            <h3 className="font-heading text-lg text-brand-chocolate hover:text-brand-caramel transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-xs text-brand-chocolate/70 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* Weight selector pills */}
          <div className="mt-3">
            <span className="text-[10px] uppercase font-bold text-brand-chocolate/60 tracking-wider">
              Weight Options:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {product.availableWeights?.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setSelectedWeight(w)}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-all ${
                    selectedWeight === w
                      ? 'bg-brand-chocolate text-brand-gold font-bold shadow-xs'
                      : 'bg-brand-cream/60 text-brand-chocolate/80 hover:bg-brand-peach'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-brand-chocolate/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-brand-chocolate/60 font-semibold block">Price</span>
            <span className="font-heading text-xl text-brand-caramel">
              ₹{displayPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold hover:bg-brand-caramel hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

