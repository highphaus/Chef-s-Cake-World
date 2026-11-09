import React from 'react';
import Link from 'next/link';
import { Sparkles, Phone, MapPin, Tag } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-brand-chocolate text-brand-cream border-b border-brand-chocolate/30 text-[11px] py-1 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col sm:flex-row items-center justify-between gap-1.5">
        {/* Left: Special Celebration Code with interactive badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-caramel/90 text-white font-bold text-[9px] tracking-wider uppercase shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-brand-gold animate-spin-slow" />
            Offer
          </span>
          <span className="font-medium text-brand-cream/90 text-[10px] sm:text-[11px]">
            Flat 10% OFF on all Birthday &amp; Custom Cakes with code:
          </span>
          <span className="font-heading tracking-wider px-1.5 py-0.2 rounded bg-brand-gold text-brand-chocolate font-bold text-[11px] shadow-xs">
            CHEF10
          </span>
          <Link
            href="/cakes"
            className="hidden md:inline underline hover:text-brand-peach ml-1 font-semibold transition-colors text-[11px]"
          >
            Order Now &rarr;
          </Link>
        </div>

        {/* Right: Operational Hub Information */}
        <div className="hidden lg:flex items-center gap-4 text-brand-cream/80 text-[11px]">
          <Link
            href="/branches"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <MapPin className="w-3 h-3 text-brand-gold" />
            <span className="font-medium">Branches: Attingal &bull; Kazhakootam</span>
          </Link>

          <a
            href="tel:+919847960677"
            className="flex items-center gap-1.5 hover:text-white transition-colors border-l border-brand-cream/20 pl-3"
          >
            <Phone className="w-3 h-3 text-brand-gold" />
            <span className="font-semibold">+91 98479 60677</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
