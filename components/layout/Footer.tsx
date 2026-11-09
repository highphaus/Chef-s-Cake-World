import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, Instagram, Facebook, Youtube, ShieldCheck, Phone } from 'lucide-react';

export default function Footer() {
  const branches = [
    { name: 'Attingal Flagship', phone: '+91 98479 60677' },
    { name: 'Alamcode', phone: '+91 98479 60677' },
    { name: 'Ambalathinkara', phone: '+91 70252 17777' },
    { name: 'Kumarapuram', phone: '+91 90722 22655' },
    { name: 'Ulloor', phone: '+91 80866 66207' },
    { name: 'Vattappara', phone: '+91 97458 41777' },
    { name: 'Vetturoad', phone: '+91 89210 29932' },
    { name: 'Kazhakootam', phone: '+91 89210 29932' },
  ];

  return (
    <footer className="bg-brand-chocolate text-brand-cream/90 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 border-t-4 border-brand-caramel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Responsive horizontal 2-column layout on mobile, 4-column on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-5 sm:gap-x-6 gap-y-7 sm:gap-y-8 lg:gap-8 pb-8 sm:pb-12 border-b border-brand-cream/10">
          
          {/* Col 1: Brand Info (Full width on mobile, 4 columns on desktop) */}
          <div className="col-span-2 lg:col-span-4 space-y-3 sm:space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                <img
                  src="/logo/chefcake.png"
                  alt="Chef's Cake World Logo"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <span className="font-heading text-lg sm:text-2xl text-brand-cream tracking-tight whitespace-nowrap">
                Chef&apos;s Cake World
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-brand-cream/70 max-w-sm sm:max-w-md leading-relaxed">
              Kerala&apos;s celebrated artisan patisserie and cake boutique. Handcrafted custom designer cakes,
              tiered wedding centerpieces, and 100% pure eggless confections.
            </p>
            {/* Social Links (Horizontal row) */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-caramel hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-caramel hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-caramel hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (Side-by-side with Cake Menu horizontally on mobile) */}
          <div className="col-span-1 lg:col-span-2 space-y-2 sm:space-y-3">
            <h3 className="font-heading text-sm sm:text-base lg:text-lg text-brand-gold">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-brand-cream/80">
              <li>
                <Link href="/cakes" className="hover:text-brand-caramel transition-colors block py-0.5">
                  Our Cake Menu
                </Link>
              </li>
              <li>
                <Link href="/custom-cakes" className="hover:text-brand-caramel transition-colors block py-0.5">
                  Custom Cakes
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-brand-caramel transition-colors block py-0.5">
                  Nearest Branch
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-caramel transition-colors block py-0.5">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-caramel transition-colors block py-0.5">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories (Side-by-side with Quick Links horizontally on mobile) */}
          <div className="col-span-1 lg:col-span-2 space-y-2 sm:space-y-3">
            <h3 className="font-heading text-sm sm:text-base lg:text-lg text-brand-gold">Cake Menu</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-brand-cream/80">
              <li>
                <Link href="/cakes?category=birthday-cakes" className="hover:text-brand-caramel transition-colors block py-0.5">
                  Birthday Cakes
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=wedding-cakes" className="hover:text-brand-caramel transition-colors block py-0.5">
                  Wedding Tiers
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=chocolate-cakes" className="hover:text-brand-caramel transition-colors block py-0.5">
                  Belgian Truffle
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=photo-cakes" className="hover:text-brand-caramel transition-colors block py-0.5">
                  Photo Cakes
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=eggless-cakes" className="hover:text-brand-caramel transition-colors block py-0.5">
                  100% Eggless
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kerala Branches (Horizontal 2-column layout on mobile, 4-col span on desktop) */}
          <div className="col-span-2 lg:col-span-4 space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm sm:text-base lg:text-lg text-brand-gold">Kerala Hubs</h3>
              <Link
                href="/branches"
                className="text-[11px] sm:text-xs text-brand-gold hover:text-brand-peach font-bold inline-flex items-center gap-1"
              >
                <span>All Locations</span> &rarr;
              </Link>
            </div>
            
            {/* Horizontal 2-column grid for branches on mobile devices */}
            <div className="grid grid-cols-2 gap-x-2.5 sm:gap-x-3 gap-y-1.5 text-[11px] sm:text-xs text-brand-cream/80">
              {branches.map((b, idx) => (
                <div key={idx} className="truncate">
                  <span className="text-brand-cream font-medium">{b.name}: </span>
                  <a href={`tel:${b.phone.replace(/\s+/g, '')}`} className="hover:text-brand-gold transition-colors">
                    {b.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs border-t border-brand-cream/10">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>orders@chefscakeworld.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>+91 98479 60677</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Horizontal layout across all devices */}
        <div className="pt-5 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-brand-cream/60 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
            <span>&copy; {new Date().getFullYear()} Chef&apos;s Cake World.</span>
            <span className="hidden xs:inline">&bull;</span>
            <span className="flex items-center gap-1 text-brand-gold font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> FSSAI Lic. No: 11521000000123
            </span>
          </div>

          {/* Horizontal policies list */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1">
            <Link href="/about" className="hover:text-brand-cream transition-colors">
              Terms
            </Link>
            <span className="text-brand-cream/30">&bull;</span>
            <Link href="/about" className="hover:text-brand-cream transition-colors">
              Privacy
            </Link>
            <span className="text-brand-cream/30">&bull;</span>
            <Link href="/about" className="hover:text-brand-cream transition-colors">
              Refunds
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
