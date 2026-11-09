'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.getCategories();
        if (res.success && res.categories) setCategories(res.categories);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  const defaultCategories = [
    {
      name: 'Birthday Cakes',
      slug: 'birthday-cakes',
      description: 'Vibrant celebratory cakes handcrafted with joy to turn birthdays into cherished memories.',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Wedding Cakes',
      slug: 'wedding-cakes',
      description: 'Multi-tiered royal masterworks designed with artistic elegance for your grandest day.',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Anniversary Cakes',
      slug: 'anniversary-cakes',
      description: 'Romantic decadent creations to celebrate enduring love and cherished milestones.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Chocolate Cakes',
      slug: 'chocolate-cakes',
      description: 'Rich, velvety pure Belgian and Dutch couverture chocolate indulgences.',
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Photo Cakes',
      slug: 'photo-cakes',
      description: 'High-definition edible sugar-sheet printed cakes bringing your favourite memories to life.',
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Designer Cakes',
      slug: 'designer-cakes',
      description: 'Sculpted fondant, bespoke floral themes, and custom artisan concepts.',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: "Kids' Cakes",
      slug: 'kids-cakes',
      description: 'Playful cartoon, superhero, fairytale, and magical fantasy cakes for little dreamers.',
      image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Eggless Delights',
      slug: 'eggless-cakes',
      description: '100% vegetarian, ultra-moist sponge cakes made without any egg compromise on taste.',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const catList = categories.length > 0 ? categories : defaultCategories;

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

