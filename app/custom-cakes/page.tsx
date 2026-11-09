'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cake, Sparkles, Upload, CheckCircle2, AlertCircle, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

export default function CustomCakesPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    email: '',
    occasion: 'Birthday',
    flavour: 'Belgian Chocolate Truffle',
    weight: '2 kg',
    shape: 'Round',
    theme: '',
    isEggless: true,
    cakeDesignDescription: '',
    referenceImageUrl: '',
    deliveryDate: '',
    deliveryLocation: '',
    pincode: '',
    preferredBranchId: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<any>(null);
  const [error, setError] = useState('');

  const occasions = [
    'Birthday Celebration',
    'Wedding Reception',
    'Anniversary Milestone',
    'Baby Shower / Gender Reveal',
    'Engagement / Ring Ceremony',
    'Kids Fantasy Theme',
    'Corporate Milestone',
    'Bespoke Sculpted Art',
  ];

  const flavours = [
    'Belgian Chocolate Truffle',
    'Dutch Dark Couverture Ganache',
    'Fresh Red Velvet Cream Cheese',
    'Lotus Biscoff Speculoos',
    'Tahitian Vanilla & Fresh Fruit',
    'Ferrero Hazelnut Praline',
    'Kesar Pista Royal Heritage',
    'Espresso Mocha Caramel',
  ];

  const shapes = ['Classic Round', 'Square Tier', 'Romantic Heart', 'Multi-Tier Grand Luxe', 'Sculpted 3D Fondant'];
  const weights = ['1.5 kg (Serves 10-12)', '2 kg (Serves 15-18)', '3 kg (Serves 25-30)', '4 kg (Serves 35-40)', '5+ kg (Grand Event)'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (
      !formData.customerName ||
      !formData.mobile ||
      !formData.email ||
      !formData.cakeDesignDescription ||
      !formData.deliveryDate ||
      !formData.pincode
    ) {
      setError('Please complete all essential fields indicated with an asterisk (*).');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        referenceImages: formData.referenceImageUrl ? [formData.referenceImageUrl] : [],
      };
      const res = await api.submitCustomCake(payload);
      if (res.success && res.customRequest) {
        setSubmittedRequest(res.customRequest);
      }
    } catch (err: any) {
      setError(err.message || 'Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-peach text-brand-chocolate text-xs font-bold uppercase tracking-wider border border-brand-chocolate/10">
          <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
          <span>Bespoke Artisan Studio</span>
        </div>
        <h1 className="hero-title font-heading text-brand-chocolate">
          Design Your Dream Custom Cake
        </h1>
        <p className="text-sm sm:text-base text-brand-chocolate/80 leading-relaxed font-body">
          Every celebration has a unique story. Share your theme, flavors, guest size, and reference photos.
          Our master pastry chefs will review your concept and craft a personalized quotation within 3 hours.
        </p>
      </div>

      {/* Workflow Steps Visual */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-brand-chocolate/10 shadow-cake-soft text-center text-xs">
        <div className="p-3 space-y-1.5">
          <div className="w-8 h-8 rounded-full bg-brand-chocolate text-brand-gold font-bold flex items-center justify-center mx-auto text-sm">
            1
          </div>
          <h4 className="font-bold text-brand-chocolate">Submit Vision</h4>
          <p className="text-brand-chocolate/70">Share theme, flavor preferences, and date</p>
        </div>

        <div className="p-3 space-y-1.5">
          <div className="w-8 h-8 rounded-full bg-brand-caramel text-white font-bold flex items-center justify-center mx-auto text-sm">
            2
          </div>
          <h4 className="font-bold text-brand-chocolate">Chef Review &amp; Quote</h4>
          <p className="text-brand-chocolate/70">Our head decorator calculates custom quotation</p>
        </div>

        <div className="p-3 space-y-1.5">
          <div className="w-8 h-8 rounded-full bg-brand-peach text-brand-chocolate font-bold flex items-center justify-center mx-auto text-sm">
            3
          </div>
          <h4 className="font-bold text-brand-chocolate">Approve &amp; Confirm</h4>
          <p className="text-brand-chocolate/70">Review custom quote and confirm order</p>
        </div>

        <div className="p-3 space-y-1.5">
          <div className="w-8 h-8 rounded-full bg-brand-caramel text-white font-bold flex items-center justify-center mx-auto text-sm">
            4
          </div>
          <h4 className="font-bold text-brand-chocolate">Fresh Handcrafting</h4>
          <p className="text-brand-chocolate/70">Baked fresh and delivered at scheduled time</p>
        </div>
      </div>

      {/* Form or Success State */}
      {submittedRequest ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-brand-chocolate/15 shadow-cake-hover text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-brand-peach text-brand-chocolate flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-brand-caramel" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-brand-caramel tracking-wider">
              Request Received Successfully
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-brand-chocolate">
              Inquiry Ref: {submittedRequest.requestNumber}
            </h2>
            <p className="text-sm text-brand-chocolate/80">
              Thank you, <strong>{submittedRequest.customerName}</strong>! Our head cake designer is evaluating your
              design specifications for your {submittedRequest.occasion} cake.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-cream/50 border border-brand-chocolate/10 text-xs text-left space-y-2 text-brand-chocolate">
            <div className="flex justify-between">
              <span className="font-semibold text-brand-chocolate/70">Occasion:</span>
              <span className="font-bold">{submittedRequest.occasion}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-brand-chocolate/70">Flavour &amp; Weight:</span>
              <span className="font-bold">{submittedRequest.flavour} &bull; {submittedRequest.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-brand-chocolate/70">Required Delivery Date:</span>
              <span className="font-bold">{submittedRequest.deliveryDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-brand-chocolate/70">Status:</span>
              <span className="px-2 py-0.5 rounded bg-brand-peach text-brand-chocolate font-bold uppercase text-[10px] border border-brand-chocolate/15">
                Under Chef Review
              </span>
            </div>
          </div>

          <p className="text-xs text-brand-chocolate/60">
            A notification with quotation details will be sent to <strong>{submittedRequest.email}</strong> and via WhatsApp to <strong>{submittedRequest.mobile}</strong>.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl bg-brand-chocolate text-brand-gold font-bold text-sm hover:bg-brand-caramel hover:text-white"
            >
              Return to Homepage
            </Link>
            <Link
              href="/cakes"
              className="px-6 py-2.5 rounded-xl bg-brand-cream text-brand-chocolate font-bold text-sm hover:bg-brand-peach"
            >
              Browse Standard Cakes
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-chocolate/10 shadow-cake-soft space-y-8"
        >
          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section A: Customer Details */}
          <div>
            <h3 className="font-heading text-xl text-brand-chocolate mb-4 pb-2 border-b border-brand-chocolate/10">
              1. Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarti Mehta"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-1 focus:ring-brand-caramel"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  WhatsApp Contact Mobile *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9820012345"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-1 focus:ring-brand-caramel"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aarti@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-1 focus:ring-brand-caramel"
                />
              </div>
            </div>
          </div>

          {/* Section B: Cake Details */}
          <div>
            <h3 className="font-heading text-xl text-brand-chocolate mb-4 pb-2 border-b border-brand-chocolate/10">
              2. Custom Cake Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Occasion *
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate bg-white"
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Primary Cake Flavour
                </label>
                <select
                  value={formData.flavour}
                  onChange={(e) => setFormData({ ...formData, flavour: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate bg-white"
                >
                  {flavours.map((fl) => (
                    <option key={fl} value={fl}>
                      {fl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Estimated Weight / Guest Count
                </label>
                <select
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate bg-white"
                >
                  {weights.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Cake Architecture / Shape
                </label>
                <select
                  value={formData.shape}
                  onChange={(e) => setFormData({ ...formData, shape: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate bg-white"
                >
                  {shapes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Theme / Concept (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Floral Pastels, Superhero, Vintage Gold"
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Dietary Preference
                </label>
                <div className="flex gap-2 pt-1">
                  <label className="flex items-center gap-1.5 text-xs text-brand-chocolate cursor-pointer">
                    <input
                      type="radio"
                      name="eggless"
                      checked={formData.isEggless}
                      onChange={() => setFormData({ ...formData, isEggless: true })}
                      className="accent-brand-chocolate"
                    />
                    <span>100% Eggless</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-brand-chocolate cursor-pointer ml-3">
                    <input
                      type="radio"
                      name="eggless"
                      checked={!formData.isEggless}
                      onChange={() => setFormData({ ...formData, isEggless: false })}
                      className="accent-brand-chocolate"
                    />
                    <span>With Egg</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Design Description */}
            <div className="mt-4">
              <label className="text-xs font-bold text-brand-chocolate block mb-1">
                Detailed Cake Design Description *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe colors, inscription, tier designs, edible flowers, characters, textures, or specific fondant elements..."
                value={formData.cakeDesignDescription}
                onChange={(e) => setFormData({ ...formData, cakeDesignDescription: e.target.value })}
                className="w-full p-3.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-1 focus:ring-brand-caramel"
              />
            </div>

            {/* Reference Image Link */}
            <div className="mt-4">
              <label className="text-xs font-bold text-brand-chocolate block mb-1">
                Reference Image URL (Pinterest / Instagram / Cloudinary link)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or paste image link"
                value={formData.referenceImageUrl}
                onChange={(e) => setFormData({ ...formData, referenceImageUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
              />
            </div>
          </div>

          {/* Section C: Delivery & Timing */}
          <div>
            <h3 className="font-heading text-xl text-brand-chocolate mb-4 pb-2 border-b border-brand-chocolate/10">
              3. Event Date &amp; Location
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Required Celebration Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Delivery PIN Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="e.g. 695101"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Venue / Area Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near KSRTC Stand, Attingal"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-chocolate/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-brand-chocolate/70">
              ⚡ Custom quotations are reviewed by our executive pastry chef and sent to your email &amp; WhatsApp within 3 hours.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 min-h-[48px] rounded-xl bg-brand-chocolate text-brand-gold font-bold text-sm hover:bg-brand-caramel hover:text-white transition-all shadow-md disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? 'Submitting Design Request...' : 'Submit Custom Cake Request'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

