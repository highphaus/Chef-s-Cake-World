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
          src={product.images?.[0] || '/Cakes/cake.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
        />

        {/* Subtle Gradient Shadow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Link>

      {/* 2. Editorial Product Information */}
      <div className="pt-3 sm:pt-3.5 flex flex-col justify-between flex-1">
        <div>
          {/* Micro Category / Flavour Note */}
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-brand-caramel tracking-wide uppercase font-body truncate mb-1">
            <span>{flavourNote}</span>
            <span className="text-brand-chocolate/30">&bull;</span>
            <span className="text-brand-chocolate/55 font-normal lowercase">{sizeNote}</span>
          </div>

          {/* Product Title with Veg Representation Dot & Rating */}
          <div className="flex items-center justify-between gap-1.5">
            <Link
              href={`/cakes/${product.slug}`}
              className="flex items-center gap-1.5 min-w-0 flex-1 group/title"
            >
              {product.egglessAvailable && (
                <span
                  className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-[2px] border border-emerald-600 bg-white shrink-0 p-[2px]"
                  title="100% Pure Vegetarian / Eggless"
                  aria-label="Pure Vegetarian"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                </span>
              )}
              <h3
                className="product-title font-body font-semibold text-xs sm:text-sm text-brand-chocolate group-hover/title:text-brand-caramel transition-colors truncate leading-snug tracking-tight"
                title={product.name}
              >
                {product.name}
              </h3>
            </Link>

            {/* Rating next to cake name */}
            <div
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/70 text-brand-chocolate text-[10px] sm:text-[10.5px] font-bold shrink-0"
              title={`Rated ${rating.toFixed(1)} out of 5 stars`}
            >
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
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
