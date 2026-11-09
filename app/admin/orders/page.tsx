'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

export default function AdminOrdersPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const statusList = [
    'Pending',
    'Confirmed',
    'Preparing',
    'Ready for Pickup',
    'Ready for Dispatch',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
    'Refund Initiated',
    'Refunded',
  ];

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await api.getDashboardStats();
      if (res.success && res.recentOrders) {
        setOrders(res.recentOrders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/login');
      return;
    }
    if (isAdmin) {
      loadOrders();
    }
  }, [isAdmin, authLoading, router]);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !newStatus) return;

    setUpdating(true);
    setFeedbackMessage('');

    try {
      const res = await api.updateOrderStatus(selectedOrder._id, newStatus, statusNote);
      if (res.success) {
        setFeedbackMessage(`Order #${selectedOrder.orderNumber} successfully updated to "${newStatus}"!`);
        setSelectedOrder(null);
        await loadOrders();
      }
    } catch (err: any) {
      setFeedbackMessage(err.message || 'Error updating order status.');
    } finally {
      setUpdating(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.phone.includes(search);
    const matchesStatus = statusFilter ? o.orderStatus === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-chocolate/10">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-brand-chocolate">
            Order Fulfillment &amp; Workflow Manager
          </h1>
          <p className="text-xs sm:text-sm text-brand-chocolate/70">
            Control order lifecycles across all Kerala flagship kitchens.
          </p>
        </div>
        <Link
          href="/admin"
          className="px-4 py-2 rounded-xl bg-brand-cream border border-brand-chocolate/20 text-xs font-bold text-brand-chocolate hover:bg-brand-peach"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {feedbackMessage && (
        <div className="p-4 rounded-xl bg-brand-peach text-brand-chocolate border border-brand-chocolate/10 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-brand-caramel" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-brand-chocolate/10 shadow-cake-soft flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by Order ID, name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm border border-brand-chocolate/20 text-brand-chocolate focus:ring-1 focus:ring-brand-caramel"
          />
          <Search className="w-4 h-4 text-brand-chocolate/50 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-brand-caramel" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm font-medium text-brand-chocolate bg-white"
          >
            <option value="">All Statuses</option>
            {statusList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs font-semibold text-brand-chocolate">
            Syncing orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-12 text-center text-xs text-brand-chocolate/60">
            No matching orders found in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-cream/50 text-brand-chocolate uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-3">Order Number</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Branch</th>
                  <th className="p-3">Delivery Slot</th>
                  <th className="p-3">Items Ordered</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-chocolate/10 text-brand-chocolate/80">
                {filteredOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-brand-cream/20 transition-colors">
                    <td className="p-3 font-bold text-brand-chocolate">{ord.orderNumber}</td>
                    <td className="p-3">
                      <span className="font-semibold block text-brand-chocolate">{ord.customer?.name}</span>
                      <span className="text-[10px] text-brand-chocolate/60">{ord.customer?.phone}</span>
                    </td>
                    <td className="p-3 font-medium">{ord.branch?.branchName}</td>
                    <td className="p-3">
                      <span className="font-semibold">{ord.deliveryDate}</span>
                      <span className="text-[10px] text-brand-chocolate/60 block">{ord.deliverySlot}</span>
                    </td>
                    <td className="p-3">
                      {ord.items?.map((it: any, i: number) => (
                        <div key={i} className="text-[11px] truncate max-w-xs">
                          &bull; {it.productName} ({it.selectedWeight})
                        </div>
                      ))}
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
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-brand-peach text-brand-chocolate uppercase">
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(ord);
                          setNewStatus(ord.orderStatus);
                          setStatusNote('');
                        }}
                        className="px-2.5 py-1 rounded bg-brand-chocolate text-brand-gold font-bold text-[11px] hover:bg-brand-caramel hover:text-white transition-colors"
                      >
                        Change Status
                      </button>
                      <Link
                        href={`/order-confirmation/${ord.orderNumber}`}
                        className="p-1 text-brand-chocolate/60 hover:text-brand-caramel inline-block"
                        title="View Public Tracking Timeline"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-chocolate/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4 border border-brand-chocolate/10">
            <h3 className="font-heading text-xl text-brand-chocolate">
              Update Order #{selectedOrder.orderNumber}
            </h3>

            <p className="text-xs text-brand-chocolate/70">
              Customer: <strong>{selectedOrder.customer.name}</strong> &bull; Assigned: <strong>{selectedOrder.branch.branchName}</strong>
            </p>

            <form onSubmit={handleStatusUpdate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Transition Status To:
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm font-semibold text-brand-chocolate bg-white"
                >
                  {statusList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Status Note (Customer visible in tracking timeline)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Master decorator has completed fondant floral drape"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-chocolate/20 text-xs text-brand-chocolate"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-2.5 rounded-xl border border-brand-chocolate/20 text-brand-chocolate font-bold text-xs hover:bg-brand-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-2.5 rounded-xl bg-brand-chocolate text-brand-gold font-bold text-xs hover:bg-brand-caramel hover:text-white transition-all disabled:opacity-50"
                >
                  {updating ? 'Saving...' : 'Update Status & Notify'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

