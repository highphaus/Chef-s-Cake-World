'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Cake,
  Truck,
  Package,
  Calendar,
  Printer,
  ShoppingBag,
  Store,
  ChevronRight
} from 'lucide-react';
import { api } from '@/lib/api';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await api.getOrderById(String(id));
        if (res.success && res.order) {
          setOrder(res.order);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-caramel border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-heading text-lg text-brand-chocolate">Retrieving order confirmation &amp; live timeline...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4 space-y-4">
        <h2 className="font-heading text-2xl text-brand-chocolate">Order Not Found</h2>
        <p className="text-sm text-brand-chocolate/70">
          We could not locate this order reference. Please check your order number or account history.
        </p>
        <Link href="/" className="inline-block px-6 py-2.5 rounded-full bg-brand-chocolate text-brand-gold font-bold text-sm">
          Return Home
        </Link>
      </div>
    );
  }

  // Ordered timeline phases
  const stages = [
    { title: 'Confirmed', desc: 'Order received and verified' },
    { title: 'Preparing', desc: 'Baking and decorating by pastry chef' },
    { title: 'Ready for Dispatch', desc: 'Chilled packaging & quality checked' },
    { title: 'Out for Delivery', desc: 'On the way to your celebration' },
    { title: 'Delivered', desc: 'Safely handed over to you' },
  ];

  const currentStatusIndex = stages.findIndex((s) => s.title.toLowerCase() === order.orderStatus.toLowerCase());

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Success Hero Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-chocolate/10 shadow-cake-soft text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-peach text-brand-chocolate flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-brand-caramel" />
        </div>

        <span className="text-xs uppercase font-bold text-brand-caramel tracking-wider block">
          Order Placed Successfully
        </span>

        <h1 className="font-heading text-3xl sm:text-4xl text-brand-chocolate">
          Thank You, {order.customer.name.split(' ')[0]}!
        </h1>

        <p className="text-sm text-brand-chocolate/80 max-w-md mx-auto leading-relaxed">
          Your order has been allocated to our <strong>{order.branch.branchName}</strong> kitchen.
          We will bake and decorate your cakes with the highest artisan precision.
        </p>

        <div className="inline-block px-4 py-2 rounded-xl bg-brand-peach/40 border border-brand-chocolate/10 font-bold text-sm text-brand-chocolate">
          Order Number: <span className="text-brand-caramel font-heading tracking-wide">{order.orderNumber}</span>
        </div>
      </div>

      {/* Live Order Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-chocolate/10 shadow-cake-soft space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-brand-chocolate/10">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-caramel" />
            <h2 className="font-heading text-xl text-brand-chocolate">Live Order Progress</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-brand-caramel text-white font-bold text-xs uppercase tracking-wider">
            {order.orderStatus}
          </span>
        </div>

        <div className="relative pl-6 border-l-2 border-brand-chocolate/20 space-y-8 my-4">
          {stages.map((stage, idx) => {
            const isCompleted = currentStatusIndex >= idx;
            const isCurrent = currentStatusIndex === idx;

            return (
              <div key={idx} className="relative group">
                <div
                  className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-brand-chocolate text-brand-gold'
                      : 'bg-brand-cream text-brand-chocolate/40 border border-brand-chocolate/20'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isCurrent ? 'text-brand-caramel font-heading text-base' : 'text-brand-chocolate'}`}>
                    {stage.title}
                  </h4>
                  <p className="text-xs text-brand-chocolate/60 mt-0.5">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary & Fulfillment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cakes Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-4">
          <h3 className="font-heading text-lg text-brand-chocolate pb-2 border-b border-brand-chocolate/10 flex items-center gap-2">
            <Cake className="w-4 h-4 text-brand-caramel" />
            <span>Items Ordered</span>
          </h3>

          <div className="space-y-3">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-3 text-xs pb-3 border-b border-brand-chocolate/5">
                <img
                  src={item.productImage || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=200'}
                  alt={item.productName}
                  className="w-12 h-12 rounded-lg object-cover bg-brand-cream/40 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-brand-chocolate truncate">{item.productName}</h4>
                  <p className="text-brand-chocolate/70">
                    {item.selectedWeight} &bull; {item.isEggless ? 'Eggless' : 'With Egg'} &bull; Qty: {item.quantity}
                  </p>
                  {item.customMessage && (
                    <p className="text-[10px] text-brand-caramel italic">
                      Inscription: &ldquo;{item.customMessage}&rdquo;
                    </p>
                  )}
                </div>
                <span className="font-bold text-brand-chocolate">₹{item.totalPrice}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 space-y-1.5 text-xs text-brand-chocolate/80">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold">₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-brand-caramel font-bold">
                <span>Discount:</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-bold">{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Bakery GST (5%):</span>
              <span className="font-bold">₹{order.tax}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-brand-chocolate pt-2 border-t border-brand-chocolate/10">
              <span>Total Paid / Payable:</span>
              <span className="font-heading text-lg text-brand-caramel">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Fulfillment & Delivery Details */}
        <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-4">
          <h3 className="font-heading text-lg text-brand-chocolate pb-2 border-b border-brand-chocolate/10 flex items-center gap-2">
            <Truck className="w-4 h-4 text-brand-caramel" />
            <span>Delivery &amp; Branch Hub</span>
          </h3>

          <div className="space-y-3 text-xs text-brand-chocolate/80">
            <div>
              <span className="font-bold text-brand-chocolate block">Scheduled Slot:</span>
              <p className="mt-0.5 text-brand-caramel font-semibold">
                {order.deliveryDate} &bull; {order.deliverySlot}
              </p>
            </div>

            <div>
              <span className="font-bold text-brand-chocolate block">Fulfillment Kitchen:</span>
              <p className="mt-0.5">{order.branch.branchName}</p>
              <p className="text-[11px] text-brand-chocolate/60">{order.branch.address}</p>
            </div>

            <div>
              <span className="font-bold text-brand-chocolate block">Destination Address:</span>
              <p className="mt-0.5">
                {order.deliveryAddress.house}, {order.deliveryAddress.street}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
              </p>
            </div>

            <div>
              <span className="font-bold text-brand-chocolate block">Payment Details:</span>
              <p className="mt-0.5">
                Method: <strong>{order.paymentMethod}</strong> &bull; Status: <strong className="text-brand-caramel">{order.paymentStatus}</strong>
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-chocolate/10 flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2 rounded-xl border border-brand-chocolate/20 text-brand-chocolate font-bold text-xs hover:bg-brand-peach/40 flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <Link
              href="/"
              className="flex-1 py-2 rounded-xl bg-brand-chocolate text-brand-gold font-bold text-xs hover:bg-brand-caramel hover:text-white text-center flex items-center justify-center"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

