import React from 'react';
import Link from 'next/link';
import { Cake, Award, ShieldCheck, Heart, Sparkles, MapPin, Store } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-peach text-brand-chocolate text-xs font-bold uppercase tracking-wider border border-brand-chocolate/10">
          <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
          <span>Our Patisserie Heritage</span>
        </div>
        <h1 className="hero-title font-heading text-brand-chocolate">
          The Chef&apos;s Cake World Story
        </h1>
        <p className="text-base text-brand-chocolate/80 leading-relaxed font-body">
          Crafting centerpieces of joy, uncompromised culinary authenticity, and modern confectionery art across Kerala.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-brand-chocolate/10 shadow-xl border-4 border-white relative">
          <img
            src="/Cakes/cake.jpg"
            alt="Chef baking artisan cakes in kitchen"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-brand-chocolate/80 leading-relaxed">
          <h2 className="font-heading text-2xl text-brand-chocolate">
            Baking With Pure Passion &amp; Integrity
          </h2>
          <p>
            Founded by passionate culinary artists, <strong>Chef&apos;s Cake World</strong> set out with an unwavering standard:
            celebrations deserve real ingredients. We said no to cheap vegetable compounds, artificial stabilizers, and pre-frozen cake sponges.
          </p>
          <p>
            Instead, we partnered with renowned Belgian and Dutch chocolate houses, sourcing 100% pure cocoa butter and 70% dark Callebaut chocolate.
            Every morning at 6:00 AM, our ovens preheat in Attingal and Kazhakootam kitchens to bake fresh batches of sponges.
          </p>
          <p>
            Whether it is an intimate family birthday or a grand 500-guest wedding reception, our artisans approach every creation with the same
            dedication to visual poetry and unforgettable flavor.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-peach flex items-center justify-center text-brand-caramel font-bold">
            <Cake className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg text-brand-chocolate">Fresh Daily Baking</h3>
          <p className="text-xs text-brand-chocolate/70 leading-relaxed">
            Zero freezer storage. Every cake order is baked fresh on the day of delivery from the nearest branch.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-peach flex items-center justify-center text-brand-caramel font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg text-brand-chocolate">Pure Couverture</h3>
          <p className="text-xs text-brand-chocolate/70 leading-relaxed">
            Authentic Belgian couverture chocolate ganache, real Tahitian vanilla beans, and Philadelphia cream cheese.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-peach flex items-center justify-center text-brand-caramel font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg text-brand-chocolate">100% Eggless Mastery</h3>
          <p className="text-xs text-brand-chocolate/70 leading-relaxed">
            Pioneering vegetarian baking techniques ensuring ultra-moist crumb texture without sacrificing flavor.
          </p>
        </div>
      </div>
    </div>
  );
}

