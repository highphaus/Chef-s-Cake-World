'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

interface ProductCarouselSectionProps {
  badge: string;
  title: string;
  categorySlug: string;
  products: any[];
  autoScrollInterval?: number;
}

export default function ProductCarouselSection({
  badge,
  title,
  categorySlug,
  products,
  autoScrollInterval = 3400,
}: ProductCarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || products.length === 0) return;

    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // On mobile, scroll by 1 card (50% screen) for smooth step
        const step = clientWidth < 640 ? clientWidth * 0.5 : 280;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [isPaused, products.length, autoScrollInterval]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-6 gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] xs:text-[11px] sm:text-xs uppercase font-bold text-brand-caramel tracking-widest block mb-0.5 sm:mb-1 truncate">
            {badge}
          </span>
          <h2 className="font-heading text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-brand-chocolate tracking-tight leading-tight break-words">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="hidden md:inline-flex text-[11px] font-semibold text-brand-chocolate/50 items-center gap-1">
            <span>Auto-moving</span>
            <span className="text-brand-caramel font-bold">&bull;</span>
            <span>Swipe</span>
          </span>
          <Link
            href={`/cakes?category=${categorySlug}`}
            className="text-xs sm:text-sm font-bold text-brand-caramel hover:text-brand-chocolate flex items-center gap-1 group whitespace-nowrap pl-2 border-l border-brand-chocolate/15 sm:border-l-0 sm:pl-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Product Track: Exactly 2 cards on mobile screen side-by-side (Zero scrollbar, no page overflow) */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-3 sm:gap-5 lg:gap-6 overflow-x-auto scroll-smooth pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product: any) => (
          <div
            key={product._id}
            className="w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] md:w-[250px] lg:w-[275px] shrink-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

