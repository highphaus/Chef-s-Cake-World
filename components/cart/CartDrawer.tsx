'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, CakeSlice, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeItem, applyCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);

  // Lock body scroll and handle Escape key for cart drawer
  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
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
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = await applyCoupon(couponCode.trim());
    setCouponMessage({ text: res.message, success: res.success });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-chocolate/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-brand-chocolate/10 flex items-center justify-between bg-brand-cream/40">
            <div className="flex items-center gap-2">
              <CakeSlice className="w-5 h-5 text-brand-caramel" />
              <h2 className="font-heading text-xl text-brand-chocolate">Your Celebration Cake Box</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-brand-chocolate hover:bg-brand-peach/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-brand-peach/40 flex items-center justify-center text-brand-chocolate">
                  <CakeSlice className="w-8 h-8 text-brand-caramel" />
                </div>
                <h3 className="font-heading text-lg text-brand-chocolate">Your cake box is empty!</h3>
                <p className="text-sm text-brand-chocolate/70 max-w-xs mx-auto">
                  Explore our handcrafted artisan cakes and add a delicious centerpiece to your celebration.
                </p>
                <Link
                  href="/cakes"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block px-6 py-2.5 rounded-full bg-brand-chocolate text-white text-sm font-semibold hover:bg-brand-caramel transition-colors"
                >
                  Explore Cakes
                </Link>
              </div>
            ) : (
              cart.items.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="p-3.5 rounded-xl border border-brand-chocolate/10 bg-brand-cream/20 flex gap-3.5 relative"
                >
                  {/* Product Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-brand-cream/60 relative flex-shrink-0">
                    <img
                      src={item.productImage || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop'}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="font-semibold text-sm text-brand-chocolate truncate">
                      {item.productName}
                    </h4>
                    <p className="text-xs text-brand-caramel font-medium mt-0.5">
                      {item.selectedWeight} &bull; {item.selectedFlavour}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-cream text-brand-chocolate font-bold uppercase">
                        {item.isEggless ? '🌱 Eggless' : '🥚 With Egg'}
                      </span>
                      {item.customMessage && (
                        <span className="text-[10px] text-brand-chocolate/70 truncate max-w-[120px]">
                          Msg: &ldquo;{item.customMessage}&rdquo;
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-brand-chocolate/20 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item._id || '', Math.max(0, item.quantity - 1))}
                          className="p-1 text-brand-chocolate hover:text-brand-caramel"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-brand-chocolate">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id || '', item.quantity + 1)}
                          className="p-1 text-brand-chocolate hover:text-brand-caramel"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-sm text-brand-chocolate">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item._id || '')}
                    className="absolute top-3.5 right-3 text-brand-chocolate/40 hover:text-red-700 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.items.length > 0 && (
            <div className="p-5 border-t border-brand-chocolate/10 bg-brand-cream/30 space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter coupon (e.g. CHEF10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs border border-brand-chocolate/20 uppercase font-semibold text-brand-chocolate focus:ring-1 focus:ring-brand-caramel"
                  />
                  <Tag className="w-3.5 h-3.5 text-brand-caramel absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-brand-caramel text-white text-xs font-semibold hover:bg-brand-chocolate transition-colors"
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
              <div className="space-y-1.5 text-xs text-brand-chocolate/80 pt-2 border-t border-brand-chocolate/10">
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
                <div className="flex justify-between text-[11px] text-brand-chocolate/60">
                  <span>Delivery Fee</span>
                  <span>Calculated at checkout by pincode</span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-chocolate pt-2 border-t border-brand-chocolate/10">
                  <span>Estimated Total</span>
                  <span className="text-brand-caramel">₹{cart.totalAmount}</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-chocolate text-brand-gold font-bold text-sm hover:bg-brand-caramel hover:text-white transition-all shadow-md group"
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

