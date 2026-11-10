'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';

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
  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-brand-chocolate/10 shadow-cake-soft hover:shadow-cake-hover transition-all duration-300 flex flex-col justify-between h-full">
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
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-brand-caramel text-white text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-wide uppercase shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-gold" /> Best Seller
            </span>
          )}
          {product.egglessAvailable && (
            <span className="px-1.5 xs:px-2 py-0.5 rounded-full bg-brand-peach text-brand-chocolate text-[8.5px] xs:text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase shadow-2xs border border-brand-chocolate/15">
              100% Eggless
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Link
            href={`/cakes/${product.slug}`}
            className="p-1.5 sm:p-2 rounded-full bg-white/90 text-brand-chocolate hover:bg-brand-chocolate hover:text-brand-gold shadow-md backdrop-blur-sm transition-colors"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-2.5 xs:p-3 sm:p-4 lg:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
            <div className="flex text-brand-caramel">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            </div>
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-brand-chocolate">{product.averageRating.toFixed(1)}</span>
            <span className="text-[10px] xs:text-[11px] sm:text-xs text-brand-chocolate/50">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <Link href={`/cakes/${product.slug}`}>
            <h3 className="font-heading text-xs xs:text-sm sm:text-base lg:text-lg text-brand-chocolate hover:text-brand-caramel transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-[10px] xs:text-[11px] sm:text-xs text-brand-chocolate/70 line-clamp-1 xs:line-clamp-2 mt-0.5 sm:mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-brand-chocolate/10 flex items-center justify-between gap-1.5 sm:gap-2">
          <div className="min-w-0">
            <span className="text-[9px] xs:text-[10px] uppercase text-brand-chocolate/60 font-semibold block leading-tight">Price</span>
            <span className="font-heading text-sm xs:text-base sm:text-lg lg:text-xl text-brand-caramel leading-tight">
              ₹{product.basePrice}
            </span>
          </div>

          <Link
            href={`/cakes/${product.slug}`}
            className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-brand-chocolate text-brand-gold text-[10px] xs:text-[11px] sm:text-xs font-bold hover:bg-brand-caramel hover:text-white transition-all shadow-xs active:scale-95 whitespace-nowrap min-h-[32px] sm:min-h-[38px] shrink-0"
            title={`Customize weight and order ${product.name}`}
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Order</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

