'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Sparkles, ChefHat } from 'lucide-react';

export default function WhatsAppConcierge() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Default greeting based on page
  const getWhatsAppUrl = () => {
    let message = "Hello Chef's Cake World! I would like assistance with selecting a celebration cake for my upcoming event.";
    if (pathname.includes('/cakes/')) {
      message = "Hello Chef's Cake World! I am browsing your artisan cakes and would like concierge advice on sizing and custom celebration options.";
    } else if (pathname.includes('/custom-cakes')) {
      message = "Hello Chef's Cake World! I am interested in designing a bespoke couture wedding/milestone cake.";
    }
    return `https://wa.me/919847960677?text=${encodeURIComponent(message)}`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-5 sm:right-7 z-40 flex flex-col items-end select-none">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 rounded-2xl bg-white/95 backdrop-blur-md p-4 border border-brand-chocolate/15 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-brand-chocolate/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-chocolate text-brand-gold flex items-center justify-center font-bold text-xs">
                <ChefHat className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-chocolate font-heading">Cake Sommelier</p>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Concierge &bull; Kerala Ateliers
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-brand-chocolate/50 hover:text-brand-chocolate hover:bg-brand-peach/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-brand-chocolate/80 leading-relaxed font-body">
            Need guidance on guest serving sizes, bespoke flavor pairings, or midnight delivery coordination?
          </p>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-brand-chocolate/10 shadow-md text-[11px] font-semibold text-brand-chocolate">
            <Sparkles className="w-3 h-3 text-brand-caramel" />
            <span>Need Cake Advice?</span>
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Cake Concierge"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-chocolate text-brand-gold hover:bg-brand-caramel hover:text-white shadow-xl border-2 border-brand-gold/40 flex items-center justify-center transition-all duration-300 active:scale-95 group relative"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-white" />
        </button>
      </div>
    </div>
  );
}

