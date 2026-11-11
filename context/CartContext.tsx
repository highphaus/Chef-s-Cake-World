'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  productSlug: string;
  selectedWeight: string;
  selectedFlavour: string;
  isEggless: boolean;
  customMessage?: string;
  candlesCount?: number;
  accessories?: string[];
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  _id?: string;
}

interface CartContextType {
  cart: {
    items: CartItem[];
    subtotal: number;
    discount: number;
    deliveryFee: number;
    tax: number;
    couponCode?: string;
    totalAmount: number;
  };
  itemCount: number;
  loading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  deliveryDate: string;
  setDeliveryDate: (date: string) => void;
  deliverySlot: string;
  setDeliverySlot: (slot: string) => void;
  addToCart: (itemData: any) => Promise<void>;
  updateQuantity: (itemId: string, qty: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<{
    items: CartItem[];
    subtotal: number;
    discount: number;
    deliveryFee: number;
    tax: number;
    couponCode?: string;
    totalAmount: number;
  }>({
    items: [],
    subtotal: 0,
    discount: 0,
    deliveryFee: 0,
    tax: 0,
    totalAmount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryDate, setDeliveryDateState] = useState<string>('');
  const [deliverySlot, setDeliverySlotState] = useState<string>('evening');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDate = localStorage.getItem('ccw_delivery_date');
      const savedSlot = localStorage.getItem('ccw_delivery_slot');
      if (savedDate) setDeliveryDateState(savedDate);
      if (savedSlot) setDeliverySlotState(savedSlot);
    }
  }, []);

  const setDeliveryDate = (date: string) => {
    setDeliveryDateState(date);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ccw_delivery_date', date);
    }
  };

  const setDeliverySlot = (slot: string) => {
    setDeliverySlotState(slot);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ccw_delivery_slot', slot);
    }
  };

  const refreshCart = async () => {
    try {
      setLoading(true);
      const res = await api.getCart();
      if (res.success && res.cart) {
        setCart(res.cart);
      }
    } catch (err) {
      // In offline/initial phase, fallback to empty or local cart
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (itemData: any) => {
    try {
      setLoading(true);
      const res = await api.addToCart(itemData);
      if (res.success && res.cart) {
        setCart(res.cart);
        setIsCartOpen(true);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to add cake to cart.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, qty: number) => {
    try {
      const res = await api.updateCartItem(itemId, qty);
      if (res.success && res.cart) {
        setCart(res.cart);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await api.removeCartItem(itemId);
      if (res.success && res.cart) {
        setCart(res.cart);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const applyCoupon = async (code: string) => {
    try {
      const res = await api.applyCoupon(code);
      if (res.success && res.cart) {
        setCart(res.cart);
        return { success: true, message: res.message };
      }
      return { success: false, message: 'Invalid coupon' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Could not apply coupon' };
    }
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        loading,
        isCartOpen,
        setIsCartOpen,
        deliveryDate,
        setDeliveryDate,
        deliverySlot,
        setDeliverySlot,
        addToCart,
        updateQuantity,
        removeItem,
        applyCoupon,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

