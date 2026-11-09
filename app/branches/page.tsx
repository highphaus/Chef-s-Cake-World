'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Navigation, Sparkles, Store } from 'lucide-react';
import { OFFICIAL_BRANCHES, BranchItem } from '@/lib/branchesData';
import PincodeCheckerModal from '@/components/common/PincodeCheckerModal';

export default function BranchesPage() {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  const handleBranchFound = (branchCode: string) => {
    setHighlightedCode(branchCode);
    // Smooth scroll to branch card
    const element = document.getElementById(`branch-${branchCode}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-peach/50 border border-brand-chocolate/15 text-xs font-bold text-brand-chocolate">
          <Sparkles className="w-4 h-4 text-brand-caramel" />
          <span className="tracking-widest uppercase text-[11px] sm:text-xs">
            Kerala Physical Stores &amp; Fulfillment Kitchens
          </span>
        </div>
        <h1 className="hero-title font-heading text-brand-chocolate text-3xl sm:text-5xl">
          Our Kerala Artisan Branches
        </h1>
        <p className="text-sm sm:text-base text-brand-chocolate/80 leading-relaxed font-body">
          Chef&apos;s Cake World operates artisan bakery boutiques and fulfillment hubs across Kerala. Every single kitchen houses master pastry ovens, segregated 100% pure eggless baking stations, cake artists for bespoke inscriptions, and 2-hour doorstep dispatch.
        </p>
      </div>

      {/* Pincode Nearest Store Finder Section */}
      <div className="max-w-3xl mx-auto">
        <PincodeCheckerModal onBranchFound={handleBranchFound} />
      </div>

      {/* Branches Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-brand-chocolate/10 pb-4">
          <div>
            <h2 className="font-heading text-2xl text-brand-chocolate">
              All Kerala Kitchen Hubs ({OFFICIAL_BRANCHES.length})
            </h2>
            <p className="text-xs sm:text-sm text-brand-chocolate/70 mt-0.5">
              Click any phone number to connect directly with your local branch kitchen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {OFFICIAL_BRANCHES.map((branch: BranchItem) => {
            const isHighlighted = highlightedCode === branch.branchCode;

            return (
              <div
                id={`branch-${branch.branchCode}`}
                key={branch.branchCode}
                className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between relative ${
                  isHighlighted
                    ? 'border-brand-caramel ring-4 ring-brand-peach/60 shadow-xl scale-[1.02]'
                    : 'border-brand-chocolate/10 shadow-cake-soft hover:shadow-cake-hover'
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-chocolate text-brand-gold text-[11px] font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Store className="w-3.5 h-3.5" />
                    <span>Your Nearest Matched Shop</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-brand-peach text-brand-chocolate font-bold text-xs">
                      {branch.branchCode}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[11px] text-brand-chocolate/80 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                        Eggless
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-brand-caramel font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-caramel" /> Kitchen Active
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl text-brand-chocolate leading-snug">
                      {branch.name}
                    </h3>
                    <span className="text-[11px] font-medium text-brand-caramel block mt-0.5">
                      {branch.landmark}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-brand-chocolate/85 pt-1">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-brand-caramel shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-brand-caramel shrink-0" />
                      <a
                        href={`tel:${branch.rawPhone}`}
                        className="font-bold text-sm text-brand-chocolate hover:text-brand-caramel underline decoration-brand-caramel/40 transition-colors"
                      >
                        {branch.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-brand-caramel shrink-0" />
                      <span>{branch.email}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-brand-caramel shrink-0" />
                      <span>{branch.openingHours}</span>
                    </div>
                  </div>

                  {/* Serviceable Pincodes */}
                  <div className="pt-3 border-t border-brand-chocolate/10 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-brand-chocolate/60 tracking-wider block">
                      Express Delivery PIN Codes:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {branch.serviceablePincodes.map((pin: string) => (
                        <span
                          key={pin}
                          className="px-2 py-0.5 rounded bg-brand-cream text-brand-chocolate text-[11px] font-medium"
                        >
                          {pin}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-chocolate/10 flex items-center justify-between gap-2 text-xs">
                  <a
                    href={`tel:${branch.rawPhone}`}
                    className="py-2 px-3 rounded-xl bg-brand-chocolate hover:bg-brand-caramel text-brand-gold hover:text-white font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Shop</span>
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 font-bold text-brand-chocolate hover:text-brand-caramel transition-colors py-2 px-2"
                  >
                    <Navigation className="w-3.5 h-3.5 text-brand-caramel" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
