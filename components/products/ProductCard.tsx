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
    <div className="group relative bg-[#FAF8F5] rounded-xl sm:rounded-2xl overflow-hidden border border-brand-chocolate/12 shadow-[0_4px_16px_rgba(66,6,0,0.06)] hover:shadow-[0_12px_28px_rgba(66,6,0,0.14)] hover:border-brand-caramel/40 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-brand-cream/30">
        <Link href={`/cakes/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Luxury Micro-Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-brand-chocolate/95 text-brand-gold text-[8.5px] xs:text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase shadow-md border border-brand-gold/30 flex items-center gap-1 backdrop-blur-xs">
              <Sparkles className="w-2.5 h-2.5 text-brand-gold" />
              <span>Signature</span>
            </span>
          )}
          {product.egglessAvailable && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 text-[8px] xs:text-[9px] sm:text-[9.5px] font-bold tracking-wider uppercase shadow-xs border border-emerald-500/30 backdrop-blur-xs">
              100% Eggless
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Link
            href={`/cakes/${product.slug}`}
            className="p-1.5 sm:p-2 rounded-full bg-white/95 text-brand-chocolate hover:bg-brand-chocolate hover:text-brand-gold shadow-md backdrop-blur-xs transition-colors"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-2.5 xs:p-3 sm:p-4 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#FAF8F5] to-white">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
            <div className="flex text-brand-caramel">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            </div>
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-brand-chocolate">{product.averageRating.toFixed(1)}</span>
            <span className="text-[10px] xs:text-[11px] sm:text-xs text-brand-chocolate/50">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <Link href={`/cakes/${product.slug}`}>
            <h3 className="font-heading text-xs xs:text-sm sm:text-base font-bold text-brand-chocolate group-hover:text-brand-caramel transition-colors line-clamp-1 leading-snug tracking-tight">
              {product.name}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-[10px] xs:text-[11px] sm:text-xs text-brand-chocolate/65 line-clamp-1 xs:line-clamp-2 mt-0.5 leading-relaxed font-body">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="mt-2.5 sm:mt-3 pt-2 border-t border-brand-chocolate/10 flex items-center justify-between gap-1">
          <div className="min-w-0 flex-1">
            <span className="text-[8px] xs:text-[9px] uppercase tracking-wider text-brand-chocolate/55 font-bold block leading-tight">Price</span>
            <span className="font-heading text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-brand-caramel leading-tight block truncate">
              ₹{product.basePrice}
            </span>
          </div>

          <Link
            href={`/cakes/${product.slug}`}
            className="flex items-center justify-center gap-1 px-2.5 xs:px-3 py-1 xs:py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-brand-chocolate text-brand-gold text-[9px] xs:text-[10px] sm:text-xs font-bold hover:bg-brand-caramel hover:text-white transition-all shadow-xs active:scale-95 whitespace-nowrap min-h-[30px] sm:min-h-[36px] shrink-0"
            title={`Customize weight and order ${product.name}`}
          >
            <ShoppingBag className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Order</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

