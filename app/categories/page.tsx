'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { MASTER_CATEGORIES } from '@/lib/productsData';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.getCategories();
        if (res.success && res.categories && res.categories.length > 0) {
          setCategories(res.categories);
        } else {
          setCategories(MASTER_CATEGORIES);
        }
      } catch (err) {
        setCategories(MASTER_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  const catList = categories.length > 0 ? categories : MASTER_CATEGORIES;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold text-brand-caramel tracking-widest block">
          Patisserie Repertoire
        </span>
        <h1 className="hero-title font-heading text-brand-chocolate">
          Artisan Cake Collections
        </h1>
        <p className="text-sm sm:text-base text-brand-chocolate/80 leading-relaxed font-body">
          Explore our signature cake categories, prepared fresh using premium ingredients and baked with passion.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
        {catList.map((cat) => (
          <Link
            key={cat.slug}
            href={`/cakes?category=${cat.slug}`}
            className="group flex flex-col items-center bg-white rounded-2xl p-3 sm:p-4 border border-brand-chocolate/8 hover:border-brand-caramel/40 shadow-2xs hover:shadow-md transition-all text-center"
          >
            <div className="relative w-20 h-20 sm:w-26 sm:h-26 rounded-full p-1 border-2 border-brand-chocolate/10 group-hover:border-brand-caramel transition-all duration-300 shadow-2xs bg-white">
              <div className="w-full h-full rounded-full overflow-hidden bg-brand-cream/30">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
            <h3 className="font-heading font-bold text-xs sm:text-sm text-brand-chocolate group-hover:text-brand-caramel transition-colors mt-3 leading-tight truncate w-full px-1">
              {cat.name}
            </h3>
            <span className="text-[10px] sm:text-[11px] text-brand-caramel font-semibold mt-1 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              <span>View Bakes</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

