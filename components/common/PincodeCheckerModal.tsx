'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, Clock, Truck, Store, Phone, Navigation } from 'lucide-react';
import { findNearestBranchByPincode, NearestBranchResult } from '@/lib/branchesData';

interface PincodeCheckerProps {
  onBranchFound?: (branchCode: string) => void;
  className?: string;
}

export default function PincodeCheckerModal({ onBranchFound, className = '' }: PincodeCheckerProps) {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<NearestBranchResult | null>(null);
  const [error, setError] = useState('');

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.replace(/\D/g, '').trim();

    if (!cleanPin || cleanPin.length !== 6) {
      setError('Please enter a valid 6-digit PIN code (e.g. 695101, 695102, 695582, 695011)');
      setResult(null);
      return;
    }

    setError('');
    const matched = findNearestBranchByPincode(cleanPin);

    if (!matched) {
      setError('Could not locate a nearest store. Please check the PIN code.');
      setResult(null);
      return;
    }

    setResult(matched);
    if (onBranchFound) {
      onBranchFound(matched.branch.branchCode);
    }
  };

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-brand-chocolate/10 shadow-lg ${className}`}>
      <div className="flex items-center gap-2.5 text-brand-chocolate mb-2">
        <MapPin className="w-5 h-5 text-brand-caramel animate-bounce" />
        <h3 className="font-heading text-xl sm:text-2xl">Find Nearest Shop by PIN Code</h3>
      </div>
      <p className="text-xs sm:text-sm text-brand-chocolate/70 mb-5">
        Enter your 6-digit delivery PIN code to discover your nearest Chef&apos;s Cake World kitchen, phone number, and direct delivery time.
      </p>

      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter PIN code (e.g. 695102, 695101, 695582, 695011)"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ''));
              if (error) setError('');
            }}
            className="w-full px-4 py-3 rounded-2xl border border-brand-chocolate/20 text-sm font-semibold text-brand-chocolate focus:ring-2 focus:ring-brand-caramel focus:outline-none placeholder:text-brand-chocolate/40"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-brand-chocolate text-brand-gold font-bold text-sm hover:bg-brand-caramel hover:text-white transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Store className="w-4 h-4" />
          <span>Locate Nearest Shop</span>
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-6 p-5 sm:p-6 rounded-2xl border-2 border-brand-gold/40 bg-gradient-to-br from-brand-peach/30 via-white to-brand-cream/40 shadow-md space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Header pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-chocolate/10 pb-3">
            <div className="flex items-center gap-2 text-brand-chocolate">
              <CheckCircle2 className="w-5 h-5 text-brand-caramel shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-caramel">
                Nearest Store Found
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-brand-chocolate text-brand-gold text-xs font-bold">
              {result.distanceEstimate}
            </span>
          </div>

          {/* Branch Details */}
          <div>
            <h4 className="font-heading text-xl sm:text-2xl text-brand-chocolate">
              {result.branch.name}
            </h4>
            <p className="text-xs sm:text-sm text-brand-chocolate/80 mt-1 flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-brand-caramel shrink-0 mt-0.5" />
              <span>{result.branch.address}</span>
            </p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
            <div className="p-3 rounded-xl bg-white border border-brand-chocolate/10 shadow-xs">
              <span className="text-brand-caramel font-semibold flex items-center gap-1 block">
                <Clock className="w-3.5 h-3.5" /> Estimated Delivery
              </span>
              <span className="font-bold text-sm text-brand-chocolate block mt-0.5">
                {result.estimatedDeliveryHours} Hours Doorstep
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-brand-chocolate/10 shadow-xs">
              <span className="text-brand-caramel font-semibold flex items-center gap-1 block">
                <Truck className="w-3.5 h-3.5" /> Delivery Fee
              </span>
              <span className="font-bold text-sm text-brand-chocolate block mt-0.5">
                ₹{result.deliveryFee} Express
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-brand-chocolate/10 shadow-xs">
              <span className="text-brand-caramel font-semibold flex items-center gap-1 block">
                <Store className="w-3.5 h-3.5" /> Store Hours
              </span>
              <span className="font-bold text-sm text-brand-chocolate block mt-0.5">
                {result.branch.openingHours}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <a
              href={`tel:${result.branch.rawPhone}`}
              className="flex-1 py-3 px-4 rounded-xl bg-brand-chocolate hover:bg-brand-caramel text-brand-gold hover:text-white font-bold text-xs sm:text-sm transition-colors text-center flex items-center justify-center gap-2 shadow"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Call Nearest Shop ({result.branch.phone})</span>
            </a>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(result.branch.address)}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-white hover:bg-brand-peach/40 text-brand-chocolate font-bold text-xs sm:text-sm transition-colors border border-brand-chocolate/20 text-center flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-brand-caramel" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
