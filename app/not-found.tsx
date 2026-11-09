import React from 'react';
import Link from 'next/link';
import { Cake, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-brand-chocolate/10 shadow-cake-soft text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-brand-peach/60 flex items-center justify-center mx-auto text-brand-caramel">
          <Cake className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold text-brand-caramel tracking-widest block">
            404 &bull; Page Not Found
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-brand-chocolate">
            This Slice is Missing!
          </h1>
          <p className="text-xs sm:text-sm text-brand-chocolate/70 leading-relaxed font-body">
            The celebration cake or page you are looking for has either been enjoyed, moved to a new menu, or does not exist.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 min-h-[44px] rounded-xl bg-brand-chocolate text-brand-gold font-bold text-xs hover:bg-brand-caramel hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/cakes"
            className="px-6 py-3 min-h-[44px] rounded-xl bg-brand-cream border border-brand-chocolate/20 text-brand-chocolate font-bold text-xs hover:bg-brand-peach transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Cake Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

