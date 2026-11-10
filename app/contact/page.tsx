'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Navigation, Sparkles, Store } from 'lucide-react';
import { OFFICIAL_BRANCHES, BranchItem } from '@/lib/branchesData';
import PincodeCheckerModal from '@/components/common/PincodeCheckerModal';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: 'Attingal',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.message) {
      setSubmitted(true);
    }
  };

  const handleBranchFound = (branchCode: string) => {
    setHighlightedCode(branchCode);
    const element = document.getElementById(`contact-branch-${branchCode}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-peach/50 border border-brand-chocolate/15 text-xs font-bold text-brand-chocolate">
          <Sparkles className="w-4 h-4 text-brand-caramel" />
          <span className="tracking-widest uppercase text-[11px] sm:text-xs">
            Direct Kitchen Support &bull; Kerala Wide
          </span>
        </div>
        <h1 className="hero-title font-heading text-brand-chocolate text-3xl sm:text-5xl">
          Get in Touch With Us
        </h1>
        <p className="text-sm sm:text-base text-brand-chocolate/80 leading-relaxed font-body">
          Have an inquiry regarding wedding cake consultations, custom designer tiers, or direct store pickup? Call our local kitchens directly or message our central customer concierge.
        </p>
      </div>

      {/* Pincode Store Finder Feature */}
      <div className="max-w-3xl mx-auto">
        <PincodeCheckerModal onBranchFound={handleBranchFound} />
      </div>

      {/* Contact Form & Main Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-brand-chocolate/10 shadow-cake-soft space-y-6">
          <h2 className="font-heading text-xl sm:text-2xl text-brand-chocolate pb-3 border-b border-brand-chocolate/10">
            Headquarters &amp; Direct Support
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-brand-chocolate/80">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand-caramel shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-chocolate block">Central Helpline:</span>
                <p className="font-semibold text-brand-caramel text-sm">
                  <a href="tel:9847960677" className="hover:underline">+91 98479 60677</a> / <a href="tel:8921029932" className="hover:underline">+91 89210 29932</a>
                </p>
                <span className="text-[11px] text-brand-chocolate/60">Available 9:00 AM - 11:00 PM Daily across Kerala</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-brand-caramel shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-chocolate block">Email Inquiries:</span>
                <p className="font-medium text-brand-chocolate">orders@chefscakeworld.com</p>
                <p className="text-[11px] text-brand-chocolate/60">customcakes@chefscakeworld.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-caramel shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-chocolate block">Operational Hours:</span>
                <p className="font-medium text-brand-chocolate">Monday - Sunday &bull; 09:00 AM - 11:30 PM</p>
                <span className="text-[11px] text-brand-chocolate/60">Includes 2-Hour Express &amp; Midnight Delivery (11PM - 12AM)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-caramel shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-chocolate block">Central Location:</span>
                <p className="font-medium text-brand-chocolate">Near KSRTC Bus Stand, Main Road, Attingal, Kerala 695101</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-chocolate/10 shadow-cake-soft">
          {submitted ? (
            <div className="py-16 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-brand-caramel mx-auto" />
              <h3 className="font-heading text-2xl text-brand-chocolate">Thank You for Reaching Out!</h3>
              <p className="text-xs sm:text-sm text-brand-chocolate/70 max-w-sm mx-auto">
                Our customer relationship concierge will contact you within 30 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-heading text-xl sm:text-2xl text-brand-chocolate pb-2 border-b border-brand-chocolate/10">
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-brand-chocolate block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-2 focus:ring-brand-caramel focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-chocolate block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9847960677"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-2 focus:ring-brand-caramel focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-2 focus:ring-brand-caramel focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">Select Branch to Contact</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate bg-white focus:ring-2 focus:ring-brand-caramel focus:outline-none"
                >
                  {OFFICIAL_BRANCHES.map((b) => (
                    <option key={b.branchCode} value={b.shortName}>
                      {b.shortName} ({b.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your celebration, flavor requests, or preferred delivery timing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-2 focus:ring-brand-caramel focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 min-h-[48px] rounded-xl bg-brand-chocolate text-brand-gold font-bold text-sm hover:bg-brand-caramel hover:text-white transition-all shadow-md flex items-center justify-center"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ALL BRANCHES DIRECTORY IN CONTACT PAGE */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold text-brand-caramel tracking-widest block">
            Direct Branch Kitchen Numbers
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl text-brand-chocolate">
            Connect Directly With Your Local Kitchen
          </h2>
          <p className="text-xs sm:text-sm text-brand-chocolate/70">
            For urgent orders, custom icing inscriptions, or curbside pickups, call our local pastry chefs directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFICIAL_BRANCHES.map((b: BranchItem) => {
            const isHighlighted = highlightedCode === b.branchCode;

            return (
              <div
                id={`contact-branch-${b.branchCode}`}
                key={b.branchCode}
                className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between relative ${
                  isHighlighted
                    ? 'border-brand-caramel ring-4 ring-brand-peach/60 shadow-xl scale-[1.02]'
                    : 'border-brand-chocolate/10 shadow-cake-soft hover:shadow-cake-hover'
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-chocolate text-brand-gold text-[11px] font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Store className="w-3.5 h-3.5" />
                    <span>Your Nearest Matched Store</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-brand-peach text-brand-chocolate font-bold text-xs">
                      {b.shortName}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-brand-chocolate/80 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                        Eggless Ready
                      </span>
                      <span className="text-[11px] text-green-700 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Open Now
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-lg text-brand-chocolate">
                    {b.name}
                  </h3>

                  <div className="space-y-2 text-xs text-brand-chocolate/80">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-brand-caramel shrink-0 mt-0.5" />
                      <span>{b.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-brand-caramel shrink-0" />
                      <a
                        href={`tel:${b.rawPhone}`}
                        className="font-bold text-sm text-brand-chocolate hover:text-brand-caramel underline decoration-brand-caramel/40"
                      >
                        {b.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-caramel shrink-0" />
                      <span>{b.openingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-brand-chocolate/10 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${b.rawPhone}`}
                    className="py-2.5 px-4 rounded-xl bg-brand-chocolate hover:bg-brand-caramel text-brand-gold hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call ({b.phone})</span>
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-brand-peach/40 text-brand-chocolate font-semibold text-xs border border-brand-chocolate/15 transition-colors flex items-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5 text-brand-caramel" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
