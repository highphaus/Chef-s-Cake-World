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
    <div className="group relative flex flex-col justify-between h-full bg-white rounded-2xl p-2.5 sm:p-3 border border-brand-chocolate/10 hover:border-brand-caramel/50 shadow-[0_2px_12px_rgba(42,6,0,0.03)] hover:shadow-[0_12px_30px_rgba(42,6,0,0.08)] transition-all duration-400 ease-out">
      {/* Product Image */}
      <Link
        href={`/cakes/${product.slug}`}
        className="block relative aspect-square w-full rounded-xl overflow-hidden bg-brand-cream/40"
      >
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {product.isBestSeller && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-brand-chocolate/90 backdrop-blur-xs text-brand-gold text-[9px] font-bold tracking-wider uppercase">
            Signature
          </span>
        )}
      </Link>

      {/* Minimal Product Information */}
      <div className="pt-2.5 sm:pt-3 flex flex-col justify-between flex-1">
        <Link href={`/cakes/${product.slug}`} className="block">
          <h3
            className="product-title font-body font-semibold text-xs xs:text-sm text-brand-chocolate group-hover:text-brand-caramel transition-colors truncate block leading-snug tracking-tight"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {/* Minimal Price & Order Action */}
        <div className="mt-2 flex items-center justify-between gap-1.5 pt-1">
          <span className="font-heading text-xs xs:text-sm sm:text-base font-bold text-brand-caramel leading-none">
            ₹{product.basePrice}
          </span>

          <Link
            href={`/cakes/${product.slug}`}
            className="btn font-body font-semibold inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-brand-chocolate text-brand-gold text-[10px] sm:text-xs hover:bg-brand-caramel hover:text-white transition-all duration-300 shadow-2xs active:scale-95 whitespace-nowrap shrink-0"
            title={`Order ${product.name}`}
          >
            <ShoppingBag className="w-3 h-3 shrink-0" />
            <span>Order</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

