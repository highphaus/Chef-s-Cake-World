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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {catList.map((cat) => (
          <Link
            key={cat.slug}
            href={`/cakes?category=${cat.slug}`}
            className="group bg-white rounded-3xl overflow-hidden border border-brand-chocolate/10 shadow-cake-soft hover:shadow-cake-hover transition-all flex flex-col justify-between"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-brand-cream/30 relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-xl text-brand-chocolate group-hover:text-brand-caramel transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-brand-chocolate/70 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-brand-chocolate/10 flex items-center justify-between text-xs font-bold text-brand-caramel">
                <span>Explore Designs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

