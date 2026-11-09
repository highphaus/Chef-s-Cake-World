'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  LogOut,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Cake
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, loading: authLoading, isAdmin } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);
        const res = await api.getMyOrders();
        if (res.success && res.orders) {
          setOrders(res.orders);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-brand-caramel border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-chocolate/10 shadow-cake-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-brand-peach flex items-center justify-center text-brand-chocolate font-bold text-2xl font-heading">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="font-heading text-2xl text-brand-chocolate">{user.name}</h1>
              {isAdmin && (
                <span className="px-2 py-0.5 rounded bg-brand-chocolate text-brand-gold text-[10px] font-bold uppercase">
                  {user.role}
                </span>
              )}
            </div>
            <p className="text-xs text-brand-chocolate/70 mt-0.5">
              {user.email} &bull; {user.phone}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold hover:bg-brand-caramel hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>
          )}

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl border border-brand-chocolate/20 text-brand-chocolate text-xs font-bold hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Orders List Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-caramel" />
            <h2 className="font-heading text-2xl text-brand-chocolate">Your Celebration Orders</h2>
          </div>
          <Link href="/cakes" className="text-xs font-bold text-brand-caramel hover:underline">
            Order More Cakes &rarr;
          </Link>
        </div>

        {loadingOrders ? (
          <div className="py-12 text-center text-xs text-brand-chocolate/60">
            Loading order history...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-brand-chocolate/10 text-center space-y-3">
            <Cake className="w-10 h-10 text-brand-caramel/50 mx-auto" />
            <h3 className="font-heading text-lg text-brand-chocolate">No Past Orders Found</h3>
            <p className="text-xs text-brand-chocolate/70 max-w-sm mx-auto">
              You haven&apos;t ordered any celebration cakes yet. Explore our freshly baked creations today!
            </p>
            <Link
              href="/cakes"
              className="inline-block mt-2 px-6 py-2 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold"
            >
              Explore Cakes
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord._id}
                className="bg-white rounded-2xl p-5 border border-brand-chocolate/10 shadow-cake-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-base text-brand-chocolate">{ord.orderNumber}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-brand-peach text-brand-chocolate border border-brand-gold/40'
                          : ord.orderStatus === 'Cancelled'
                          ? 'bg-brand-cream text-brand-chocolate/70 border border-brand-chocolate/20'
                          : 'bg-brand-caramel/15 text-brand-caramel border border-brand-caramel/30'
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-brand-chocolate/70">
                    Scheduled for: <strong>{ord.deliveryDate} ({ord.deliverySlot})</strong>
                  </p>
                  <p className="text-xs text-brand-chocolate/60">
                    Fulfilling Kitchen: {ord.branch?.branchName} &bull; {ord.items?.length || 0} items
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                  <span className="font-heading text-lg text-brand-caramel">
                    ₹{ord.totalAmount}
                  </span>
                  <Link
                    href={`/order-confirmation/${ord.orderNumber}`}
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-brand-cream hover:bg-brand-peach text-brand-chocolate transition-colors"
                  >
                    <span>Track Timeline</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

