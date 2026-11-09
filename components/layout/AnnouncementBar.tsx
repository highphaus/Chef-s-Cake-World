import React from 'react';
import Link from 'next/link';
import { Sparkles, Phone, MapPin, Tag } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-brand-chocolate text-brand-cream border-b border-brand-chocolate/30 text-xs py-2 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Left: Special Celebration Code with interactive badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-caramel/90 text-white font-bold text-[10px] tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3 h-3 text-brand-gold animate-spin-slow" />
            Limited Offer
          </span>
          <span className="font-medium text-brand-cream/90 text-[11px] sm:text-xs">
            Flat 10% OFF on all Birthday &amp; Custom Designer Cakes with code:
          </span>
          <span className="font-heading tracking-wider px-2 py-0.5 rounded bg-brand-gold text-brand-chocolate font-bold text-xs shadow-xs">
            CHEF10
          </span>
          <Link
            href="/cakes"
            className="hidden md:inline underline hover:text-brand-peach ml-1 font-semibold transition-colors text-xs"
          >
            Order Now &rarr;
          </Link>
        </div>

        {/* Right: Operational Hub Information */}
        <div className="hidden lg:flex items-center gap-6 text-brand-cream/80 text-xs">
          <Link
            href="/branches"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
            <span className="font-medium">Kerala Branches: Attingal &bull; Kazhakootam</span>
          </Link>

          <a
            href="tel:+919847960677"
            className="flex items-center gap-1.5 hover:text-white transition-colors border-l border-brand-cream/20 pl-4"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span className="font-semibold">+91 98479 60677</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
