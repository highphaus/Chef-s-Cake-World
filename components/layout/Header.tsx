'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CakeSlice,
  User,
  Search,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  MapPin,
  ArrowRight,
  LogOut,
  Package,
  CheckCircle2,
  Phone,
  Clock,
  Home,
  ShoppingBag,
  Cake
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CartDrawer from '@/components/cart/CartDrawer';

export default function Header() {
  const pathname = usePathname();
  const { cart, itemCount, setIsCartOpen } = useCart();
  const { user, isAdmin, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cakesDropdownOpen, setCakesDropdownOpen] = useState(false);
  const [branchesDropdownOpen, setBranchesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cakesRef = useRef<HTMLDivElement>(null);
  const branchesRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll detection for sticky elevated shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cakesRef.current && !cakesRef.current.contains(e.target as Node)) {
        setCakesDropdownOpen(false);
      }
      if (branchesRef.current && !branchesRef.current.contains(e.target as Node)) {
        setBranchesDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Lock body scroll and handle Escape key for mobile drawer and search
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setCakesDropdownOpen(false);
        setBranchesDropdownOpen(false);
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Automatically close mobile menu and dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setCakesDropdownOpen(false);
    setBranchesDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      window.location.href = `/cakes?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const quickSearchTags = [
    'Pastries',
    'Sweets & Desserts',
    'Belgian Truffle',
    'Red Velvet',
    '100% Eggless',
    'Lotus Biscoff',
    'Wedding Cake',
    'Fresh Fruit'
  ];

  const cakeHighlights = [
    {
      title: 'Artisan Pastries',
      href: '/cakes?category=pastries',
      desc: 'Individual truffle, red velvet & cheesecake slices',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300&auto=format&fit=crop'
    },
    {
      title: 'Sweets & Desserts',
      href: '/cakes?category=sweets-desserts',
      desc: 'Gulab jamun cups, macarons & tiramisu',
      image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=300&auto=format&fit=crop'
    },
    {
      title: 'Birthday Cakes',
      href: '/cakes?category=birthday-cakes',
      desc: 'Celebration cakes with custom inscriptions',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=300&auto=format&fit=crop'
    },
    {
      title: 'Belgian Couverture',
      href: '/cakes?category=chocolate-cakes',
      desc: 'Rich 70% Callebaut dark chocolate truffle',
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=300&auto=format&fit=crop'
    },
    {
      title: '100% Pure Eggless Cakes',
      href: '/cakes?category=eggless-cakes',
      desc: 'Certified vegetarian kitchen creations',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=300&auto=format&fit=crop'
    },
    {
      title: 'Grand Wedding Tiers',
      href: '/cakes?category=wedding-cakes',
      desc: 'Tiered floral & 24K gold masterworks',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=300&auto=format&fit=crop'
    }
  ];

  const branchLocations = [
    {
      name: 'Alamcode',
      address: 'Alamcode, Attingal, Kerala 695102',
      hours: '09:00 AM - 10:30 PM',
      phone: '+91 98479 60677',
      code: 'CCW-KL-01'
    },
    {
      name: 'Ambalathinkara',
      address: 'Ambalathinkara, Kazhakootam, Kerala 695582',
      hours: '09:00 AM - 11:00 PM',
      phone: '+91 70252 17777',
      code: 'CCW-KL-02'
    },
    {
      name: 'Kumarapuram',
      address: 'Kumarapuram, Medical College PO, Trivandrum 695011',
      hours: '09:00 AM - 10:30 PM',
      phone: '+91 90722 22655',
      code: 'CCW-KL-03'
    },
    {
      name: 'Ulloor',
      address: 'Ulloor Junction, Medical College, Trivandrum 695011',
      hours: '09:00 AM - 10:30 PM',
      phone: '+91 80866 66207',
      code: 'CCW-KL-04'
    },
    {
      name: 'Vattappara',
      address: 'Main Road, Vattappara, Trivandrum 695028',
      hours: '09:00 AM - 10:30 PM',
      phone: '+91 97458 41777',
      code: 'CCW-KL-05'
    },
    {
      name: 'Vetturoad',
      address: 'Vetturoad Junction, Kaniyapuram, Kazhakootam 695301',
      hours: '09:00 AM - 11:00 PM',
      phone: '+91 89210 29932',
      code: 'CCW-KL-06'
    },
    {
      name: 'Attingal',
      address: 'Near KSRTC Bus Stand, Attingal 695101',
      hours: '09:00 AM - 10:30 PM',
      phone: '+91 98479 60677',
      code: 'CCW-KL-07'
    },
    {
      name: 'Kazhakootam',
      address: 'Near Technopark, Kazhakootam 695582',
      hours: '09:00 AM - 11:00 PM',
      phone: '+91 89210 29932',
      code: 'CCW-KL-08'
    }
  ];

  return (
    <>
      {/* Top Announcement Bar (The Muffin House style) */}
      <div className="bg-brand-chocolate text-white text-[10px] xs:text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 font-sans font-medium border-b border-white/10 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse shrink-0" />
            <span className="truncate text-white/95">
              Baking You Happy &bull; Handcrafted Fresh Bakes Delivered in 2 Hours Across Kerala
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0 text-brand-gold/90 text-[11px]">
            <a href="tel:+919847960677" className="hover:text-white flex items-center gap-1 transition-colors">
              <Phone className="w-3 h-3 text-brand-gold" />
              <span>+91 98479 60677</span>
            </a>
            <span className="text-white/30">&bull;</span>
            <span className="text-white/85">8 Kerala Hubs Open</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 w-full max-w-full overflow-x-clip transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-cream/98 backdrop-blur-md shadow-md border-b border-brand-chocolate/15'
            : 'bg-brand-cream border-b border-brand-chocolate/10'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-[88px] xl:h-24 gap-2 xl:gap-6">
            {/* 1. Brand Identity Logo & Name (Anchored to Far Left Side - Prominently Sized) */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0" title="Chef's Cake World">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img
                    src="/logo/chefcake.png"
                    alt="Chef's Cake World Logo"
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                </div>
                <span className="font-heading text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-brand-chocolate tracking-tight whitespace-nowrap group-hover:text-brand-caramel transition-colors">
                  Chef&apos;s Cake World
                </span>
              </Link>
            </div>

            {/* 2. Primary Navigation with Dropdowns (Spacious & Perfectly Fitted) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink min-w-0">
              <Link
                href="/"
                className={`px-2.5 py-1 rounded-lg text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-all ${
                  pathname === '/'
                    ? 'text-brand-chocolate bg-brand-peach/70 font-bold shadow-2xs'
                    : 'text-brand-chocolate/85 hover:text-brand-caramel hover:bg-brand-cream/80'
                }`}
              >
                Home
              </Link>

              {/* Cakes Mega-Dropdown */}
              <div
                ref={cakesRef}
                className="relative"
                onMouseEnter={() => setCakesDropdownOpen(true)}
                onMouseLeave={() => setCakesDropdownOpen(false)}
              >
                <Link
                  href="/cakes"
                  className={`px-2.5 py-1 rounded-lg text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                    pathname.startsWith('/cakes')
                      ? 'text-brand-chocolate bg-brand-peach/70 font-bold shadow-2xs'
                      : 'text-brand-chocolate/85 hover:text-brand-caramel hover:bg-brand-cream/80'
                  }`}
                >
                  <span>Cakes</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      cakesDropdownOpen ? 'rotate-180 text-brand-caramel' : ''
                    }`}
                  />
                </Link>

                {/* Cakes Mega Menu Box */}
                {cakesDropdownOpen && (
                  <div className="absolute top-full left-0 w-[540px] pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white rounded-3xl p-5 border border-brand-chocolate/15 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-brand-chocolate/10">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-brand-caramel" />
                          <span className="font-heading text-base text-brand-chocolate">
                            Explore Artisan Cakes
                          </span>
                        </div>
                        <Link
                          href="/cakes"
                          onClick={() => setCakesDropdownOpen(false)}
                          className="text-xs font-bold text-brand-caramel hover:underline flex items-center gap-1"
                        >
                          <span>Full Cake Menu</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      {/* 2x2 Grid of Highlights */}
                      <div className="grid grid-cols-2 gap-3">
                        {cakeHighlights.map((cake, i) => (
                          <Link
                            key={i}
                            href={cake.href}
                            onClick={() => setCakesDropdownOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-brand-cream/50 transition-colors border border-transparent hover:border-brand-chocolate/10 group"
                          >
                            <img
                              src={cake.image}
                              alt={cake.title}
                              className="w-14 h-14 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-brand-chocolate group-hover:text-brand-caramel truncate">
                                {cake.title}
                              </h4>
                              <p className="text-[11px] text-brand-chocolate/60 line-clamp-1 mt-0.5">
                                {cake.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Dedicated Pure Eggless Feature Row inside Cakes */}
                      <Link
                        href="/cakes?category=eggless-cakes"
                        onClick={() => setCakesDropdownOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-2xl bg-brand-cream/80 hover:bg-brand-peach/50 border border-brand-chocolate/15 transition-all group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block shadow-xs" />
                          <div>
                            <span className="text-xs font-bold text-brand-chocolate block group-hover:text-brand-caramel">
                              Looking for 100% Pure Eggless Cakes?
                            </span>
                            <span className="text-[10px] text-brand-chocolate/70">
                              Segregated vegetarian ovens across all 8 Kerala hubs
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-brand-chocolate text-brand-gold text-[10px] font-bold group-hover:bg-brand-caramel group-hover:text-white transition-colors">
                          View Eggless &rarr;
                        </span>
                      </Link>

                      <div className="p-3 rounded-2xl bg-brand-peach/40 border border-brand-chocolate/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-brand-caramel" />
                          <span className="text-brand-chocolate font-semibold">
                            Same-Day Delivery &bull; 2-Hour Express
                          </span>
                        </div>
                        <span className="text-xs font-bold text-brand-caramel">
                          100% Fresh Daily
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Eggless Cakes Link */}
              <Link
                href="/cakes?category=eggless-cakes"
                className={`px-2.5 py-1 rounded-lg text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  pathname === '/cakes' && typeof window !== 'undefined' && window.location.search.includes('eggless')
                    ? 'text-brand-chocolate bg-brand-peach/70 font-bold shadow-2xs'
                    : 'text-brand-chocolate/85 hover:text-brand-caramel hover:bg-brand-cream/80'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block shrink-0" />
                <span>Eggless Cakes</span>
              </Link>

              {/* Branches Dropdown */}
              <div
                ref={branchesRef}
                className="relative"
                onMouseEnter={() => setBranchesDropdownOpen(true)}
                onMouseLeave={() => setBranchesDropdownOpen(false)}
              >
                <Link
                  href="/branches"
                  className={`px-2.5 py-1 rounded-lg text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                    pathname === '/branches'
                      ? 'text-brand-chocolate bg-brand-peach/70 font-bold shadow-2xs'
                      : 'text-brand-chocolate/85 hover:text-brand-caramel hover:bg-brand-cream/80'
                  }`}
                >
                  <span>Branches</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      branchesDropdownOpen ? 'rotate-180 text-brand-caramel' : ''
                    }`}
                  />
                </Link>

                {branchesDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white rounded-3xl p-4 border border-brand-chocolate/15 shadow-2xl space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-brand-chocolate/10">
                        <span className="font-heading text-sm text-brand-chocolate">
                          Kerala Branches
                        </span>
                        <Link
                          href="/branches"
                          onClick={() => setBranchesDropdownOpen(false)}
                          className="text-[11px] font-bold text-brand-caramel hover:underline"
                        >
                          View All
                        </Link>
                      </div>

                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {branchLocations.map((branch, i) => (
                          <Link
                            key={i}
                            href="/branches"
                            onClick={() => setBranchesDropdownOpen(false)}
                            className="block p-2.5 rounded-xl hover:bg-brand-cream/50 transition-colors border border-brand-chocolate/5 group"
                          >
                            <div className="flex justify-between items-start">
                              <h5 className="font-bold text-xs text-brand-chocolate group-hover:text-brand-caramel">
                                {branch.name}
                              </h5>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand-peach text-brand-chocolate font-bold">
                                {branch.code}
                              </span>
                            </div>
                            <p className="text-[11px] text-brand-chocolate/60 truncate mt-0.5">
                              {branch.address}
                            </p>
                            <p className="text-[10px] text-brand-caramel font-semibold mt-1">
                              {branch.hours}
                            </p>
                          </Link>
                        ))}
                      </div>

                      <Link
                        href="/branches"
                        onClick={() => setBranchesDropdownOpen(false)}
                        className="w-full py-2 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold text-center block hover:bg-brand-caramel hover:text-white transition-colors"
                      >
                        Check PIN Code Availability
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`px-2.5 py-1 rounded-lg text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-all ${
                  pathname === '/about'
                    ? 'text-brand-chocolate bg-brand-peach/70 font-bold shadow-2xs'
                    : 'text-brand-chocolate/85 hover:text-brand-caramel hover:bg-brand-cream/80'
                }`}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`px-2.5 py-1 rounded-lg text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-all ${
                  pathname === '/contact'
                    ? 'text-brand-chocolate bg-brand-peach/70 font-bold shadow-2xs'
                    : 'text-brand-chocolate/85 hover:text-brand-caramel hover:bg-brand-cream/80'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* 3. Action Controls: Search, Account, Cart (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 sm:p-2 rounded-lg text-brand-chocolate hover:text-brand-caramel hover:bg-brand-peach/40 transition-colors"
                title="Search celebratory cakes"
                aria-label="Open Search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              {/* User Account / Dropdown */}
              <div ref={userRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-1.5 sm:p-2 rounded-lg text-brand-chocolate hover:text-brand-caramel hover:bg-brand-peach/40 transition-colors flex items-center justify-center"
                  aria-label="User account"
                  title={user ? user.name : 'Sign In / Account'}
                >
                  <User className="w-4.5 h-4.5" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl p-3 border border-brand-chocolate/15 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-2">
                    {user ? (
                      <>
                        <div className="p-3 rounded-xl bg-brand-cream/40 border border-brand-chocolate/10">
                          <p className="font-bold text-xs text-brand-chocolate truncate">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-brand-chocolate/60 truncate">
                            {user.email}
                          </p>
                          {isAdmin && (
                            <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded bg-brand-chocolate text-brand-gold font-bold uppercase">
                              {user.role}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-xs">
                          <Link
                            href="/account"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-brand-chocolate hover:bg-brand-peach/40 font-semibold"
                          >
                            <Package className="w-4 h-4 text-brand-caramel" />
                            <span>My Orders &amp; Timeline</span>
                          </Link>

                          {isAdmin && (
                            <Link
                              href="/admin"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-brand-chocolate hover:bg-brand-peach/40 font-semibold"
                            >
                              <ShieldCheck className="w-4 h-4 text-brand-caramel" />
                              <span>Admin Operations</span>
                            </Link>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setUserDropdownOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-brand-chocolate hover:bg-brand-peach/40 font-semibold text-left"
                          >
                            <LogOut className="w-4 h-4 text-brand-caramel" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-3 text-center space-y-3">
                        <div className="space-y-1">
                          <h4 className="font-heading text-base text-brand-chocolate">Welcome!</h4>
                          <p className="text-xs text-brand-chocolate/70">
                            Sign in to track orders, save favorites, and enjoy express checkout.
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 pt-1">
                          <Link
                            href="/login"
                            onClick={() => setUserDropdownOpen(false)}
                            className="w-full py-2 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold hover:bg-brand-caramel hover:text-white transition-all shadow-xs"
                          >
                            Sign In / Register
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bakery Cake Box / Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 sm:p-2 rounded-lg text-brand-chocolate hover:text-brand-caramel hover:bg-brand-peach/40 transition-colors group focus:outline-none shrink-0"
                aria-label={`Cake box containing ${itemCount} items`}
                title="View your celebration cake box"
              >
                <CakeSlice className="w-4.5 h-4.5 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-200" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-caramel text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 5. Expanding Luxury Search Drawer */}
        {searchOpen && (
          <div className="border-t border-brand-chocolate/10 bg-white/95 backdrop-blur-md px-4 py-4 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="max-w-4xl mx-auto space-y-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search celebratory cakes by flavor, occasion, weight..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-24 py-3 rounded-2xl border border-brand-chocolate/20 text-sm font-semibold text-brand-chocolate bg-brand-cream/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-caramel"
                />
                <Search className="w-5 h-5 text-brand-chocolate/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold hover:bg-brand-caramel hover:text-white transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-brand-chocolate/60 font-semibold">Popular Searches:</span>
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      window.location.href = `/cakes?search=${encodeURIComponent(tag)}`;
                    }}
                    className="px-2.5 py-1 rounded-lg bg-brand-cream text-brand-chocolate hover:bg-brand-peach font-medium transition-colors text-[11px]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 6. Mobile Side Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-brand-chocolate/70 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over panel */}
          <div className="relative w-[85%] max-w-sm bg-brand-cream h-full shadow-2xl flex flex-col p-5 sm:p-6 space-y-5 overflow-y-auto z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-brand-chocolate/10">
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                <img
                  src="/logo/chefcake.png"
                  alt="Chef's Cake World Logo"
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] rounded-xl text-brand-chocolate hover:bg-brand-peach/60 active:scale-95 transition-all flex items-center justify-center"
                aria-label="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Quick Links */}
            <nav className="flex flex-col space-y-1.5 text-sm font-semibold">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl transition-colors min-h-[44px] flex items-center ${
                  pathname === '/' ? 'bg-brand-peach text-brand-chocolate font-bold shadow-2xs' : 'text-brand-chocolate hover:bg-white/60'
                }`}
              >
                Home
              </Link>

              <Link
                href="/cakes"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl transition-colors min-h-[44px] flex items-center ${
                  pathname === '/cakes' && (!searchQuery || !searchQuery.includes('pastries')) ? 'bg-brand-peach text-brand-chocolate font-bold shadow-2xs' : 'text-brand-chocolate hover:bg-white/60'
                }`}
              >
                Explore All Cakes
              </Link>

              <Link
                href="/cakes?category=pastries"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-3 rounded-xl transition-colors min-h-[44px] flex items-center justify-between text-brand-chocolate hover:bg-white/60"
              >
                <span>Artisan Pastries</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-peach text-brand-chocolate font-bold">
                  Slices & Packs
                </span>
              </Link>

              <Link
                href="/cakes?category=sweets-desserts"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-3 rounded-xl transition-colors min-h-[44px] flex items-center justify-between text-brand-chocolate hover:bg-white/60"
              >
                <span>Sweets & Desserts</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-peach text-brand-chocolate font-bold">
                  Gourmet
                </span>
              </Link>

              <Link
                href="/cakes?category=eggless-cakes"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-3 rounded-xl transition-colors min-h-[44px] flex items-center justify-between text-brand-chocolate hover:bg-white/60"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block shrink-0" />
                  <span>Eggless Cakes (100% Veg)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Pure Veg
                </span>
              </Link>

              <Link
                href="/custom-cakes"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl transition-colors min-h-[44px] flex items-center justify-between ${
                  pathname === '/custom-cakes' ? 'bg-brand-peach text-brand-chocolate font-bold shadow-2xs' : 'text-brand-chocolate hover:bg-white/60'
                }`}
              >
                <span>Custom Cakes</span>
                <Sparkles className="w-4 h-4 text-brand-caramel" />
              </Link>

              <Link
                href="/branches"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl transition-colors min-h-[44px] flex items-center justify-between ${
                  pathname === '/branches' ? 'bg-brand-peach text-brand-chocolate font-bold shadow-2xs' : 'text-brand-chocolate hover:bg-white/60'
                }`}
              >
                <span>Our Branches</span>
                <MapPin className="w-4 h-4 text-brand-caramel" />
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl transition-colors min-h-[44px] flex items-center ${
                  pathname === '/about' ? 'bg-brand-peach text-brand-chocolate font-bold shadow-2xs' : 'text-brand-chocolate hover:bg-white/60'
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl transition-colors min-h-[44px] flex items-center ${
                  pathname === '/contact' ? 'bg-brand-peach text-brand-chocolate font-bold shadow-2xs' : 'text-brand-chocolate hover:bg-white/60'
                }`}
              >
                Contact
              </Link>
            </nav>

              {/* Mobile Account Section */}
              <div className="pt-4 border-t border-brand-chocolate/10 space-y-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="p-3 rounded-2xl bg-white border border-brand-chocolate/10 text-xs">
                      <p className="font-bold text-brand-chocolate">{user.name}</p>
                      <p className="text-[11px] text-brand-chocolate/60">{user.email}</p>
                    </div>

                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold text-center block shadow-xs"
                    >
                      My Orders &amp; Timeline
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-2.5 rounded-xl bg-brand-caramel text-white text-xs font-bold text-center block shadow-xs"
                      >
                        Admin Portal
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="w-full py-2 text-xs font-bold text-brand-caramel hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold text-center block shadow-sm hover:bg-brand-caramel hover:text-white"
                  >
                    Sign In / Register
                  </Link>
                )}
              </div>

              {/* Quick Branch Helpline Call */}
              <div className="mt-auto pt-4 border-t border-brand-chocolate/10 text-xs space-y-1.5 text-brand-chocolate/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-caramel" />
                  <a href="tel:9847960677" className="font-bold hover:text-brand-caramel">+91 98479 60677</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-brand-caramel" />
                  <span>Open Daily &bull; 9 AM - 11:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* 7. Fixed Mobile Bottom Navigation Bar (Solid Opaque, Ultra-Responsive Across All Mobile & Tablet Screens) */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#FAF8F5] border-t border-brand-chocolate/15 shadow-[0_-4px_25px_rgba(66,6,0,0.12)] pb-[max(env(safe-area-inset-bottom),0.35rem)] max-w-full overflow-x-hidden select-none"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1 sm:px-2">
          {/* 1. Home */}
          <Link
            href="/"
            onClick={() => {
              setSearchOpen(false);
              setMobileMenuOpen(false);
            }}
            className="flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all active:scale-95 group"
          >
            <div
              className={`relative px-3 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                pathname === '/' && !searchOpen && !mobileMenuOpen
                  ? 'bg-brand-caramel/15 text-brand-caramel'
                  : 'text-brand-chocolate/70 group-hover:text-brand-caramel'
              }`}
            >
              <Home className="w-5 h-5" />
            </div>
            <span
              className={`text-[10px] sm:text-[11px] leading-tight tracking-tight mt-0.5 ${
                pathname === '/' && !searchOpen && !mobileMenuOpen
                  ? 'font-bold text-brand-caramel'
                  : 'font-medium text-brand-chocolate/70 group-hover:text-brand-caramel'
              }`}
            >
              Home
            </span>
            {pathname === '/' && !searchOpen && !mobileMenuOpen && (
              <span className="w-1 h-1 rounded-full bg-brand-caramel mt-0.5" />
            )}
          </Link>

          {/* 2. Cakes */}
          <Link
            href="/cakes"
            onClick={() => {
              setSearchOpen(false);
              setMobileMenuOpen(false);
            }}
            className="flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all active:scale-95 group"
          >
            <div
              className={`relative px-3 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                (pathname.startsWith('/cakes') || pathname === '/categories') && !searchOpen && !mobileMenuOpen
                  ? 'bg-brand-caramel/15 text-brand-caramel'
                  : 'text-brand-chocolate/70 group-hover:text-brand-caramel'
              }`}
            >
              <Cake className="w-5 h-5" />
            </div>
            <span
              className={`text-[10px] sm:text-[11px] leading-tight tracking-tight mt-0.5 ${
                (pathname.startsWith('/cakes') || pathname === '/categories') && !searchOpen && !mobileMenuOpen
                  ? 'font-bold text-brand-caramel'
                  : 'font-medium text-brand-chocolate/70 group-hover:text-brand-caramel'
              }`}
            >
              Cakes
            </span>
            {(pathname.startsWith('/cakes') || pathname === '/categories') && !searchOpen && !mobileMenuOpen && (
              <span className="w-1 h-1 rounded-full bg-brand-caramel mt-0.5" />
            )}
          </Link>

          {/* 3. Search */}
          <button
            type="button"
            onClick={() => {
              const willOpen = !searchOpen;
              setSearchOpen(willOpen);
              if (willOpen) {
                setMobileMenuOpen(false);
                setTimeout(() => {
                  searchInputRef.current?.focus();
                }, 100);
              }
            }}
            className="flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all active:scale-95 group"
            aria-label="Search celebration cakes"
          >
            <div
              className={`relative px-3 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                searchOpen
                  ? 'bg-brand-caramel/15 text-brand-caramel'
                  : 'text-brand-chocolate/70 group-hover:text-brand-caramel'
              }`}
            >
              <Search className="w-5 h-5" />
            </div>
            <span
              className={`text-[10px] sm:text-[11px] leading-tight tracking-tight mt-0.5 ${
                searchOpen
                  ? 'font-bold text-brand-caramel'
                  : 'font-medium text-brand-chocolate/70 group-hover:text-brand-caramel'
              }`}
            >
              Search
            </span>
            {searchOpen && (
              <span className="w-1 h-1 rounded-full bg-brand-caramel mt-0.5" />
            )}
          </button>

          {/* 4. Cart */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all active:scale-95 group relative"
            aria-label={`View Cart with ${itemCount} items`}
          >
            <div className="relative px-3 py-1 rounded-full flex items-center justify-center text-brand-chocolate/70 group-hover:text-brand-caramel transition-all">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-caramel text-white font-bold text-[9px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-xs border border-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] leading-tight tracking-tight mt-0.5 font-medium text-brand-chocolate/70 group-hover:text-brand-caramel">
              Cart
            </span>
          </button>

          {/* 5. Menu */}
          <button
            type="button"
            onClick={() => {
              const willOpen = !mobileMenuOpen;
              setMobileMenuOpen(willOpen);
              if (willOpen) setSearchOpen(false);
            }}
            className="flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all active:scale-95 group"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            <div
              className={`relative px-3 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                mobileMenuOpen
                  ? 'bg-brand-caramel/15 text-brand-caramel'
                  : 'text-brand-chocolate/70 group-hover:text-brand-caramel'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </div>
            <span
              className={`text-[10px] sm:text-[11px] leading-tight tracking-tight mt-0.5 ${
                mobileMenuOpen
                  ? 'font-bold text-brand-caramel'
                  : 'font-medium text-brand-chocolate/70 group-hover:text-brand-caramel'
              }`}
            >
              Menu
            </span>
            {mobileMenuOpen && (
              <span className="w-1 h-1 rounded-full bg-brand-caramel mt-0.5" />
            )}
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
