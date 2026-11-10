'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

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
    <div className="group relative flex flex-col justify-between h-full bg-white rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-brand-chocolate/8 hover:border-brand-caramel/40 shadow-[0_2px_10px_rgba(66,6,0,0.04)] hover:shadow-[0_8px_20px_rgba(66,6,0,0.08)] transition-all duration-300">
      {/* Product Image */}
      <Link
        href={`/cakes/${product.slug}`}
        className="block relative aspect-square w-full rounded-lg sm:rounded-xl overflow-hidden bg-brand-cream/30"
      >
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
        />
      </Link>

      {/* Minimal Product Information */}
      <div className="pt-2 sm:pt-2.5 flex flex-col justify-between flex-1">
        <Link href={`/cakes/${product.slug}`} className="block">
          <h3
            className="font-heading text-xs xs:text-sm sm:text-sm font-bold text-brand-chocolate group-hover:text-brand-caramel transition-colors truncate block leading-tight tracking-tight"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {/* Minimal Price & Order Action */}
        <div className="mt-1.5 sm:mt-2 flex items-center justify-between gap-1">
          <span className="font-heading text-xs xs:text-sm sm:text-base font-extrabold text-brand-caramel leading-none">
            ₹{product.basePrice}
          </span>

          <Link
            href={`/cakes/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 px-2 xs:px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-brand-chocolate text-brand-gold text-[9.5px] xs:text-[10px] sm:text-xs font-bold hover:bg-brand-caramel hover:text-white transition-all shadow-2xs active:scale-95 whitespace-nowrap shrink-0"
            title={`Order ${product.name}`}
          >
            <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
            <span>Order</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

