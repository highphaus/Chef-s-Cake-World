'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Trash2,
  Plus,
  Minus,
  CakeSlice,
  ShoppingBag,
  ArrowRight,
  Tag,
  Calendar,
  Clock,
  Sparkles,
  Gift,
  Check,
  Moon,
  Sun
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CELEBRATION_ADDONS = [
  {
    id: 'addon-candles',
    name: 'Metallic 24K Gold Number Candles',
    price: 79,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=400&auto=format&fit=crop',
    tag: 'Celebration Essential',
  },
  {
    id: 'addon-macarons',
    name: 'Artisan French Macarons Box (4 pcs)',
    price: 199,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=400&auto=format&fit=crop',
    tag: 'Chef Favorite',
  },
  {
    id: 'addon-sparkler',
    name: 'Golden Celebration Birthday Sparkler',
    price: 99,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
    tag: 'Party Wow',
  },
  {
    id: 'addon-card',
    name: 'Handcrafted Calligraphy Greeting Card',
    price: 49,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=400&auto=format&fit=crop',
    tag: 'Bespoke Note',
  },
];

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    applyCoupon,
    addToCart,
    deliveryDate,
    setDeliveryDate,
    deliverySlot,
    setDeliverySlot,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [addingAddonId, setAddingAddonId] = useState<string | null>(null);

  // Today in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Lock body scroll and handle Escape key for cart drawer
  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      if (!deliveryDate) {
        setDeliveryDate(todayStr);
      }
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen, deliveryDate, setDeliveryDate, todayStr]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = await applyCoupon(couponCode.trim());
    setCouponMessage({ text: res.message, success: res.success });
  };

  const handleAddAddon = async (addon: typeof CELEBRATION_ADDONS[0]) => {
    try {
      setAddingAddonId(addon.id);
      await addToCart({
        productId: addon.id,
        productName: addon.name,
        productImage: addon.image,
        productSlug: 'accessories',
        selectedWeight: 'Standard',
        selectedFlavour: 'Gourmet Accent',
        isEggless: true,
        unitPrice: addon.price,
        quantity: 1,
        totalPrice: addon.price,
      });
    } finally {
      setAddingAddonId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-chocolate/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-lg bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-brand-chocolate/10 flex items-center justify-between bg-brand-cream/50">
            <div className="flex items-center gap-2">
              <CakeSlice className="w-5 h-5 text-brand-caramel" />
              <h2 className="font-heading text-lg sm:text-xl text-brand-chocolate">Your Celebration Cake Box</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-brand-chocolate hover:bg-brand-peach/50 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {cart.items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-brand-peach/40 flex items-center justify-center text-brand-chocolate">
                  <CakeSlice className="w-8 h-8 text-brand-caramel" />
                </div>
                <h3 className="font-heading text-lg text-brand-chocolate">Your cake box is empty!</h3>
                <p className="text-xs sm:text-sm text-brand-chocolate/70 max-w-xs mx-auto font-body">
                  Explore our handcrafted artisan cakes and add a delicious centerpiece to your celebration.
                </p>
                <Link
                  href="/cakes"
                  onClick={() => setIsCartOpen(false)}
                  className="btn font-body font-semibold inline-block px-6 py-2.5 rounded-full bg-brand-chocolate text-white text-xs sm:text-sm hover:bg-brand-caramel transition-colors"
                >
                  Explore Cakes
                </Link>
              </div>
            ) : (
              <>
                {/* 1. Cake Items */}
                <div className="space-y-3">
                  <h4 className="text-[11px] uppercase font-bold tracking-wider text-brand-chocolate/60">
                    Artisan Creations ({cart.items.length})
                  </h4>
                  {cart.items.map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className="p-3 rounded-2xl border border-brand-chocolate/10 bg-brand-cream/20 flex gap-3 relative shadow-2xs"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-brand-cream/60 relative flex-shrink-0">
                        <img
                          src={item.productImage || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop'}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="font-heading font-semibold text-xs sm:text-sm text-brand-chocolate truncate">
                          {item.productName}
                        </h4>
                        <p className="text-[11px] text-brand-caramel font-semibold mt-0.5 font-body">
                          {item.selectedWeight} &bull; {item.selectedFlavour}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 font-body">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand-cream text-brand-chocolate font-bold uppercase">
                            {item.isEggless ? 'Eggless' : 'With Egg'}
                          </span>
                          {item.customMessage && (
                            <span className="text-[10px] text-brand-chocolate/70 truncate max-w-[140px] italic">
                              &ldquo;{item.customMessage}&rdquo;
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2.5">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-brand-chocolate/20 rounded-lg bg-white">
                            <button
                              onClick={() => updateQuantity(item._id || '', Math.max(0, item.quantity - 1))}
                              className="p-1 text-brand-chocolate hover:text-brand-caramel"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-brand-chocolate">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id || '', item.quantity + 1)}
                              className="p-1 text-brand-chocolate hover:text-brand-caramel"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-heading font-bold text-xs sm:text-sm text-brand-chocolate">
                            ₹{item.totalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item._id || '')}
                        className="absolute top-3 right-3 text-brand-chocolate/40 hover:text-red-700 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* 2. Precision Celebration Delivery Scheduler (Feature 1) */}
                <div className="p-4 rounded-2xl bg-brand-peach/40 border border-brand-chocolate/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-brand-chocolate">
                      <Calendar className="w-4 h-4 text-brand-caramel" />
                      <span>Select Celebration Delivery Date &amp; Slot</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-body">
                    {/* Date Input */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-brand-chocolate/70 block mb-1">
                        Delivery Date:
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={deliveryDate || todayStr}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-brand-chocolate/20 text-xs text-brand-chocolate bg-white font-semibold focus:outline-none"
                      />
                    </div>

                    {/* Quick helper badge */}
                    <div className="flex flex-col justify-end">
                      <span className="text-[10px] text-brand-chocolate/65 leading-tight">
                        Baked fresh on celebration morning in nearest local boutique.
                      </span>
                    </div>
                  </div>

                  {/* Slot Pills */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-brand-chocolate/70 block mb-1.5">
                      Delivery Window:
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-body">
                      {[
                        { id: 'midnight', label: 'Midnight Surprise', time: '11:30 PM - 12:00 AM', icon: Moon, badge: 'Popular' },
                        { id: 'morning', label: 'Morning Fresh', time: '09:00 AM - 12:00 PM', icon: Sun },
                        { id: 'afternoon', label: 'Standard Afternoon', time: '01:00 PM - 05:00 PM', icon: Clock },
                        { id: 'evening', label: 'Evening Prime', time: '05:00 PM - 08:30 PM', icon: Sparkles },
                      ].map((slot) => {
                        const Icon = slot.icon;
                        const isSelected = deliverySlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setDeliverySlot(slot.id)}
                            className={`p-2 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'bg-brand-chocolate text-brand-gold border-brand-chocolate shadow-xs'
                                : 'bg-white border-brand-chocolate/15 text-brand-chocolate hover:bg-brand-peach/30'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="font-bold flex items-center gap-1 truncate">
                                <Icon className="w-3 h-3 text-brand-caramel shrink-0" />
                                <span>{slot.label}</span>
                              </span>
                              {slot.badge && (
                                <span className={`text-[8.5px] px-1 py-0.2 rounded font-extrabold ${isSelected ? 'bg-brand-caramel text-white' : 'bg-brand-caramel/20 text-brand-caramel'}`}>
                                  {slot.badge}
                                </span>
                              )}
                            </div>
                            <span className={`text-[9.5px] block truncate ${isSelected ? 'text-white/80' : 'text-brand-chocolate/60'}`}>
                              {slot.time}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. Celebration Add-On Carousel (Feature 2 - One-Click Upsells) */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-brand-chocolate/70 flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-brand-caramel" />
                      <span>Party &amp; Celebration Add-Ons</span>
                    </span>
                    <span className="text-[10px] text-brand-chocolate/50 font-body">1-Click Add</span>
                  </div>

                  <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    {CELEBRATION_ADDONS.map((addon) => (
                      <div
                        key={addon.id}
                        className="w-[140px] shrink-0 p-2 rounded-xl border border-brand-chocolate/10 bg-white shadow-2xs flex flex-col justify-between"
                      >
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-brand-cream/40 mb-1.5">
                          <img src={addon.image} alt={addon.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[10.5px] font-semibold text-brand-chocolate leading-tight line-clamp-2">
                            {addon.name}
                          </p>
                          <p className="text-xs font-bold text-brand-caramel">₹{addon.price}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddAddon(addon)}
                          disabled={addingAddonId === addon.id}
                          className="mt-2 w-full py-1 rounded-lg bg-brand-cream/80 hover:bg-brand-chocolate hover:text-brand-gold text-brand-chocolate text-[10px] font-bold transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{addingAddonId === addon.id ? 'Adding...' : 'Add'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-brand-chocolate/10 bg-brand-cream/30 space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter coupon (e.g. CHEF10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border border-brand-chocolate/20 uppercase font-semibold text-brand-chocolate focus:ring-1 focus:ring-brand-caramel bg-white"
                  />
                  <Tag className="w-3.5 h-3.5 text-brand-caramel absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="btn font-body font-semibold px-4 py-1.5 rounded-xl bg-brand-caramel text-white text-xs hover:bg-brand-chocolate transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponMessage && (
                <p className={`text-xs ${couponMessage.success ? 'text-brand-caramel font-semibold' : 'text-brand-chocolate font-semibold'}`}>
                  {couponMessage.text}
                </p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1 text-xs text-brand-chocolate/80 pt-1 border-t border-brand-chocolate/10 font-body">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-chocolate">₹{cart.subtotal}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-brand-caramel font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{cart.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Bakery GST (5%)</span>
                  <span>₹{cart.tax}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-chocolate pt-1.5 border-t border-brand-chocolate/10 font-heading">
                  <span>Estimated Total</span>
                  <span className="text-brand-caramel">₹{cart.totalAmount}</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="btn font-body font-semibold w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-chocolate text-brand-gold text-sm hover:bg-brand-caramel hover:text-white transition-all shadow-md group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
