'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowUpRight, Star } from 'lucide-react';

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
    averageRating?: number;
    reviewCount?: number;
    isBestSeller?: boolean;
    isFeatured?: boolean;
    egglessAvailable?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const rating = product.averageRating || 4.9;
  const flavourNote = product.availableFlavours?.[0] || (product.egglessAvailable ? '100% Pure Eggless' : 'Artisan Couverture');
  const sizeNote = product.availableWeights?.length ? `${product.availableWeights.length} Sizes Available` : 'Fresh Daily';

  return (
    <div className="group relative flex flex-col justify-between h-full bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border border-brand-chocolate/8 hover:border-brand-caramel/40 shadow-[0_2px_16px_rgba(50,5,0,0.03)] hover:shadow-[0_16px_36px_rgba(50,5,0,0.09)] hover:-translate-y-1 transition-all duration-500 ease-out select-none">
      {/* 1. Image Canvas with Atmospheric Badges */}
      <Link
        href={`/cakes/${product.slug}`}
        className="block relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-brand-cream/30"
      >
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
        />

        {/* Subtle Gradient Shadow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Left Tag */}
        {product.egglessAvailable && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-emerald-800 text-[9px] font-bold tracking-wider uppercase shadow-xs flex items-center gap-1 border border-emerald-700/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Eggless</span>
          </span>
        )}

        {/* Top Right Subtle Rating Pill */}
        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-brand-chocolate text-[10px] font-bold tracking-tight shadow-xs flex items-center gap-1 border border-brand-chocolate/10">
          <Star className="w-2.5 h-2.5 fill-current text-brand-caramel" />
          <span>{rating.toFixed(1)}</span>
        </span>
      </Link>

      {/* 2. Editorial Product Information */}
      <div className="pt-3 sm:pt-3.5 flex flex-col justify-between flex-1">
        <div>
          {/* Micro Category / Flavour Note */}
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-brand-caramel tracking-wide uppercase font-body truncate mb-0.5">
            <span>{flavourNote}</span>
            <span className="text-brand-chocolate/30">&bull;</span>
            <span className="text-brand-chocolate/55 font-normal lowercase">{sizeNote}</span>
          </div>

          {/* Product Title */}
          <Link href={`/cakes/${product.slug}`} className="block">
            <h3
              className="product-title font-body font-semibold text-xs sm:text-sm text-brand-chocolate group-hover:text-brand-caramel transition-colors line-clamp-1 leading-snug tracking-tight"
              title={product.name}
            >
              {product.name}
            </h3>
          </Link>
        </div>

        {/* 3. Luxury Price & Quick Order Pill */}
        <div className="mt-2.5 sm:mt-3 flex items-center justify-between gap-1.5 pt-2 border-t border-brand-chocolate/8">
          <div className="flex flex-col">
            <span className="text-[9px] text-brand-chocolate/50 font-medium uppercase tracking-wider font-body">Starting at</span>
            <span className="font-heading text-xs xs:text-sm sm:text-base font-bold text-brand-chocolate leading-none">
              ₹{product.basePrice}
            </span>
          </div>

          <Link
            href={`/cakes/${product.slug}`}
            className="btn font-body font-semibold inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-chocolate text-brand-gold text-[10.5px] sm:text-xs hover:bg-brand-caramel hover:text-white transition-all duration-300 shadow-2xs group/btn active:scale-95 whitespace-nowrap shrink-0"
            title={`Order ${product.name}`}
          >
            <span>Order</span>
            <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
