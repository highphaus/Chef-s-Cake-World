'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cake, Sparkles, CheckCircle2, AlertCircle, Clock, IndianRupee, Image, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';

export default function AdminCustomCakesPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await fetchApi<{ success: boolean; requests: any[] }>('/custom-cakes');
      if (res.success && res.requests) {
        setRequests(res.requests);
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
      loadRequests();
    }
  }, [isAdmin, authLoading, router]);

  const handleSendQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !quoteAmount) return;

    setSubmitting(true);
    setFeedback('');

    try {
      const res = await fetchApi<any>(`/custom-cakes/${selectedRequest._id}/quote`, {
        method: 'POST',
        body: JSON.stringify({
          quotationAmount: Number(quoteAmount),
          quotationNotes: quoteNotes,
        }),
      });

      if (res.success) {
        setFeedback(`Quotation of ₹${quoteAmount} provided for Inquiry #${selectedRequest.requestNumber}!`);
        setSelectedRequest(null);
        setQuoteAmount('');
        setQuoteNotes('');
        await loadRequests();
      }
    } catch (err: any) {
      setFeedback(err.message || 'Error providing quotation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-chocolate/10">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-brand-chocolate">
            Custom Cake Studio Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-brand-chocolate/70">
            Review design briefs, inspect reference images, and provide pricing quotations to customers.
          </p>
        </div>
        <Link
          href="/admin"
          className="px-4 py-2 rounded-xl bg-brand-cream border border-brand-chocolate/20 text-xs font-bold text-brand-chocolate hover:bg-brand-peach"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-brand-peach text-brand-chocolate border border-brand-chocolate/10 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-brand-caramel" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Requests Table */}
      <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs font-semibold text-brand-chocolate">
            Loading design inquiries...
          </div>
        ) : requests.length === 0 ? (
          <div className="py-12 text-center text-xs text-brand-chocolate/60">
            No custom cake inquiries submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-cream/50 text-brand-chocolate uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Customer Contact</th>
                  <th className="p-3">Occasion &amp; Theme</th>
                  <th className="p-3">Flavour &amp; Weight</th>
                  <th className="p-3">Delivery Date &amp; Pincode</th>
                  <th className="p-3">Design Brief</th>
                  <th className="p-3">Quoted Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-chocolate/10 text-brand-chocolate/80">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-brand-cream/20 transition-colors">
                    <td className="p-3 font-bold text-brand-chocolate">{req.requestNumber}</td>
                    <td className="p-3">
                      <span className="font-semibold block text-brand-chocolate">{req.customerName}</span>
                      <span className="text-[10px] text-brand-chocolate/60">{req.mobile} &bull; {req.email}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold">{req.occasion}</span>
                      {req.theme && <span className="text-[10px] text-brand-caramel block">{req.theme}</span>}
                    </td>
                    <td className="p-3">
                      {req.flavour} &bull; {req.weight}
                      <span className="text-[10px] text-brand-caramel block">{req.isEggless ? 'Eggless' : 'With Egg'}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold">{req.deliveryDate}</span>
                      <span className="text-[10px] text-brand-chocolate/60 block">{req.pincode} ({req.deliveryLocation})</span>
                    </td>
                    <td className="p-3 max-w-xs truncate" title={req.cakeDesignDescription}>
                      {req.cakeDesignDescription}
                    </td>
                    <td className="p-3 font-bold text-brand-chocolate">
                      {req.quotationAmount ? `₹${req.quotationAmount}` : '—'}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-peach text-brand-chocolate uppercase">
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedRequest(req);
                          setQuoteAmount(req.quotationAmount ? String(req.quotationAmount) : '');
                          setQuoteNotes(req.quotationNotes || '');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-brand-chocolate text-brand-gold font-bold text-xs hover:bg-brand-caramel hover:text-white transition-colors"
                      >
                        {req.quotationAmount ? 'Update Quote' : 'Provide Quote'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quotation Dialog */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-chocolate/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 border border-brand-chocolate/10">
            <h3 className="font-heading text-xl text-brand-chocolate">
              Provide Quotation for {selectedRequest.requestNumber}
            </h3>

            <div className="p-3 rounded-xl bg-brand-cream/40 text-xs space-y-1 text-brand-chocolate">
              <p><strong>Customer:</strong> {selectedRequest.customerName} ({selectedRequest.mobile})</p>
              <p><strong>Occasion:</strong> {selectedRequest.occasion} &bull; <strong>Shape:</strong> {selectedRequest.shape}</p>
              <p><strong>Specs:</strong> {selectedRequest.flavour} &bull; {selectedRequest.weight}</p>
              <p><strong>Description:</strong> {selectedRequest.cakeDesignDescription}</p>
              {selectedRequest.referenceImages?.[0] && (
                <div className="pt-2">
                  <a
                    href={selectedRequest.referenceImages[0]}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-caramel font-semibold underline flex items-center gap-1"
                  >
                    <span>View Customer Reference Image &rarr;</span>
                  </a>
                </div>
              )}
            </div>

            <form onSubmit={handleSendQuote} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Quotation Amount (in INR ₹) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={499}
                    step={50}
                    placeholder="e.g. 3500"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-brand-chocolate/20 text-sm font-bold text-brand-chocolate"
                  />
                  <IndianRupee className="w-4 h-4 text-brand-chocolate/50 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Quotation Notes / Ingredients Inclusion
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Includes custom 3D fondant characters, metallic silver edible leafing, and delivery in temperature-controlled vehicle."
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-brand-chocolate/20 text-xs text-brand-chocolate"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 py-2.5 rounded-xl border border-brand-chocolate/20 text-brand-chocolate font-bold text-xs hover:bg-brand-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-brand-chocolate text-brand-gold font-bold text-xs hover:bg-brand-caramel hover:text-white transition-all disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send Quotation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

