'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  IndianRupee,
  Cake,
  Store,
  Users,
  Settings,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/login');
      return;
    }

    const loadStats = async () => {
      try {
        setLoading(true);
        const res = await api.getDashboardStats();
        if (res.success) {
          setData(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      loadStats();
    }
  }, [isAdmin, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-brand-caramel border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-semibold text-brand-chocolate">Loading administrative metrics...</p>
      </div>
    );
  }

  const stats = data?.stats || {
    totalOrders: 0,
    todayOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    preparingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
    totalProducts: 8,
    totalCustomers: 0,
  };

  const branchPerformance = data?.branchPerformance || [];
  const recentOrders = data?.recentOrders || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-chocolate/10">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-caramel" />
            <h1 className="font-heading text-2xl sm:text-3xl text-brand-chocolate">
              Operational Management Portal
            </h1>
          </div>
          <p className="text-xs text-brand-chocolate/70 mt-1 font-body">
            Authenticated as <strong>{user?.name}</strong> ({user?.role}) &bull; Multi-Branch Central Control
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/orders"
            className="px-3.5 py-2 rounded-xl bg-brand-chocolate text-brand-gold text-xs font-bold hover:bg-brand-caramel hover:text-white transition-all shadow-sm"
          >
            Manage Orders
          </Link>
          <Link
            href="/admin/custom-cakes"
            className="px-3.5 py-2 rounded-xl bg-brand-caramel text-white text-xs font-bold hover:bg-brand-chocolate hover:text-brand-gold transition-all shadow-sm"
          >
            Custom Cake Inquiries
          </Link>
          <Link
            href="/branches"
            className="px-3.5 py-2 rounded-xl bg-white border border-brand-chocolate/20 text-brand-chocolate text-xs font-bold hover:bg-brand-peach/40"
          >
            Branch Hubs
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-brand-chocolate/10 shadow-cake-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-brand-chocolate/60">Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-brand-peach text-brand-chocolate flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="font-heading text-2xl sm:text-3xl text-brand-chocolate">
            ₹{stats.totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-brand-caramel font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Direct Razorpay &amp; Verified Sales
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-brand-chocolate/10 shadow-cake-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-brand-chocolate/60">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-brand-peach text-brand-chocolate flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading text-2xl sm:text-3xl text-brand-chocolate">
            {stats.totalOrders}
          </div>
          <span className="text-[11px] text-brand-chocolate/60">
            {stats.todayOrders} placed today
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-brand-chocolate/10 shadow-cake-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-brand-chocolate/60">In Preparation</span>
            <div className="w-8 h-8 rounded-lg bg-brand-peach text-brand-chocolate flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading text-2xl sm:text-3xl text-brand-caramel">
            {stats.preparingOrders + stats.confirmedOrders}
          </div>
          <span className="text-[11px] text-brand-chocolate/60">
            Active baking in branch kitchens
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-brand-chocolate/10 shadow-cake-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-brand-chocolate/60">Fulfilled Successfully</span>
            <div className="w-8 h-8 rounded-lg bg-brand-peach text-brand-chocolate flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading text-2xl sm:text-3xl text-brand-chocolate">
            {stats.deliveredOrders}
          </div>
          <span className="text-[11px] text-brand-caramel font-semibold">
            Zero customer escalations
          </span>
        </div>
      </div>

      {/* Branch Performance & Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Branch-wise Revenue Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-brand-chocolate/10">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-brand-caramel" />
              <h2 className="font-heading text-lg text-brand-chocolate">Branch Kitchen Fulfillment</h2>
            </div>
            <span className="text-xs font-semibold text-brand-chocolate/60">3 Hubs Active</span>
          </div>

          <div className="space-y-4">
            {branchPerformance.map((bp: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-brand-cream/30 border border-brand-chocolate/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-sm text-brand-chocolate">{bp.name}</span>
                  <span className="font-heading text-base text-brand-caramel">
                    ₹{bp.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-brand-chocolate/60">
                  <span>{bp.orderCount} Orders Fulfilled</span>
                  <span>Avg Ticket: ₹{bp.orderCount > 0 ? Math.round(bp.revenue / bp.orderCount) : 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Status Tally (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-brand-chocolate/10">
            <h2 className="font-heading text-lg text-brand-chocolate">Real-time Order Queues</h2>
            <Link href="/admin/orders" className="text-xs font-bold text-brand-caramel hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-brand-peach/50 text-brand-chocolate flex justify-between font-bold border border-brand-chocolate/15">
              <span>Pending Verification</span>
              <span>{stats.pendingOrders}</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-cream text-brand-chocolate flex justify-between font-bold border border-brand-chocolate/20">
              <span>Confirmed Orders</span>
              <span>{stats.confirmedOrders}</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-peach text-brand-chocolate flex justify-between font-bold border border-brand-chocolate/20">
              <span>Baking &amp; Decorating (Preparing)</span>
              <span>{stats.preparingOrders}</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-cream text-brand-chocolate flex justify-between font-bold border border-brand-gold/60">
              <span>Delivered to Customers</span>
              <span>{stats.deliveredOrders}</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-cream/60 text-brand-chocolate/70 flex justify-between font-bold border border-brand-chocolate/10">
              <span>Cancelled / Refunded</span>
              <span>{stats.cancelledOrders}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-chocolate/10 shadow-cake-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-brand-chocolate/10">
          <h2 className="font-heading text-xl text-brand-chocolate">Recent Orders (Live Sync)</h2>
          <Link href="/admin/orders" className="text-xs font-bold text-brand-caramel hover:underline">
            Manage Complete Order Book &rarr;
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-xs text-brand-chocolate/60 py-8 text-center">
            No orders placed yet. Orders submitted by customers will reflect here automatically.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-cream/50 text-brand-chocolate uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-3">Order Ref</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Branch</th>
                  <th className="p-3">Scheduled Slot</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-chocolate/10 text-brand-chocolate/80">
                {recentOrders.map((ord: any) => (
                  <tr key={ord._id} className="hover:bg-brand-cream/20 transition-colors">
                    <td className="p-3 font-bold text-brand-chocolate">{ord.orderNumber}</td>
                    <td className="p-3">
                      <span className="font-semibold block text-brand-chocolate">{ord.customer?.name}</span>
                      <span className="text-[10px] text-brand-chocolate/60">{ord.customer?.phone}</span>
                    </td>
                    <td className="p-3 font-medium">{ord.branch?.branchName}</td>
                    <td className="p-3">
                      {ord.deliveryDate} ({ord.deliverySlot?.split(' ')[0]})
                    </td>
                    <td className="p-3 font-bold text-brand-chocolate">₹{ord.totalAmount}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ord.paymentStatus === 'PAID' ? 'bg-brand-peach text-brand-chocolate' : 'bg-brand-cream text-brand-chocolate'
                        }`}
                      >
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-peach text-brand-chocolate uppercase">
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/orders`}
                        className="text-xs font-bold text-brand-caramel hover:underline"
                      >
                        Update Status
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

