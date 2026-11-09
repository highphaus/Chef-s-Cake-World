import React from 'react';
import Link from 'next/link';
import { Cake, MapPin, Phone, Mail, Instagram, Facebook, Youtube, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-chocolate text-brand-cream/90 pt-16 pb-10 border-t-4 border-brand-caramel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-cream/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-14 h-14 flex items-center justify-center shrink-0">
                <img
                  src="/logo/chefcake.png"
                  alt="Chef's Cake World Logo"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <span className="font-heading text-2xl text-brand-cream tracking-tight whitespace-nowrap">
                Chef&apos;s Cake World
              </span>
            </Link>
            <p className="text-sm text-brand-cream/70 max-w-sm leading-relaxed">
              Kerala&apos;s celebrated artisan patisserie and cake boutique. Crafting memorable celebratory centerpieces,
              sculpted custom designer cakes, and 100% pure eggless confections using premium Belgian couverture.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-caramel hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-caramel hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-caramel hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-heading text-lg text-brand-gold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-brand-cream/80">
              <li>
                <Link href="/cakes" className="hover:text-brand-caramel transition-colors">
                  Our Cake Menu
                </Link>
              </li>
              <li>
                <Link href="/custom-cakes" className="hover:text-brand-caramel transition-colors">
                  Custom Cake Design
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-brand-caramel transition-colors">
                  Find Nearest Branch
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-caramel transition-colors">
                  Our Artisan Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-caramel transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-3">
            <h3 className="font-heading text-lg text-brand-gold">Cake Collections</h3>
            <ul className="space-y-2 text-sm text-brand-cream/80">
              <li>
                <Link href="/cakes?category=birthday-cakes" className="hover:text-brand-caramel transition-colors">
                  Birthday Cakes
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=wedding-cakes" className="hover:text-brand-caramel transition-colors">
                  Wedding Masterworks
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=chocolate-cakes" className="hover:text-brand-caramel transition-colors">
                  Belgian Chocolate Truffle
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=photo-cakes" className="hover:text-brand-caramel transition-colors">
                  Edible Photo Cakes
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=eggless-cakes" className="hover:text-brand-caramel transition-colors">
                  100% Pure Eggless
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Our Branches & Contact */}
          <div className="space-y-3">
            <h3 className="font-heading text-lg text-brand-gold">Kerala Branches</h3>
            <div className="space-y-2 text-xs text-brand-cream/80">
              <p className="leading-relaxed">
                <strong className="text-brand-cream">Attingal Flagship:</strong> +91 98479 60677<br />
                <strong className="text-brand-cream">Alamcode:</strong> +91 98479 60677<br />
                <strong className="text-brand-cream">Ambalathinkara:</strong> +91 70252 17777<br />
                <strong className="text-brand-cream">Kumarapuram:</strong> +91 90722 22655<br />
                <strong className="text-brand-cream">Ulloor:</strong> +91 80866 66207<br />
                <strong className="text-brand-cream">Vattappara:</strong> +91 97458 41777<br />
                <strong className="text-brand-cream">Vetturoad:</strong> +91 89210 29932<br />
                <strong className="text-brand-cream">Kazhakootam:</strong> +91 89210 29932
              </p>
              <div className="pt-2 border-t border-brand-cream/10">
                <Link
                  href="/branches"
                  className="text-brand-gold hover:text-brand-peach font-bold inline-flex items-center gap-1 text-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-caramel" /> View All Branch Details &rarr;
                </Link>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>orders@chefscakeworld.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream/60">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Chef&apos;s Cake World. All rights reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1 text-brand-gold font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> FSSAI Lic. No: 11521000000123
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <Link href="/about" className="hover:text-brand-cream transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-brand-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-brand-cream transition-colors">
              Refund & Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

