'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Store,
  CreditCard,
  Banknote,
  ArrowRight,
  ShoppingBag,
  Clock,
  Sparkles
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, refreshCart, deliveryDate: contextDeliveryDate, deliverySlot: contextDeliverySlot } = useCart();
  const { user } = useAuth();

  const [customerDetails, setCustomerDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [deliveryType, setDeliveryType] = useState<'DELIVERY' | 'PICKUP'>('DELIVERY');

  const [address, setAddress] = useState({
    house: '',
    street: '',
    area: '',
    city: 'Attingal',
    state: 'Kerala',
    pincode: '',
    landmark: '',
    deliveryInstructions: '',
  });

  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [branches, setBranches] = useState<any[]>([]);
  const [pincodeResolution, setPincodeResolution] = useState<any>(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);

  // Delivery Scheduling
  const [deliveryDate, setDeliveryDate] = useState(() => {
    if (contextDeliveryDate) return contextDeliveryDate;
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [deliverySlot, setDeliverySlot] = useState(() => {
    if (contextDeliverySlot === 'midnight') return '11:30 PM - 12:00 AM (Midnight Surprise)';
    if (contextDeliverySlot === 'morning') return '09:00 AM - 12:00 PM (Morning Fresh)';
    if (contextDeliverySlot === 'evening') return '05:00 PM - 08:30 PM (Evening Prime)';
    return '02:00 PM - 05:00 PM (Afternoon)';
  });

  useEffect(() => {
    if (contextDeliveryDate) setDeliveryDate(contextDeliveryDate);
  }, [contextDeliveryDate]);
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await api.getBranches();
        if (res.success && res.branches) {
          setBranches(res.branches);
          if (res.branches.length > 0) {
            setSelectedBranchId(res.branches[0]._id);
          }
        }
      } catch (err) {}
    };
    fetchBranches();
  }, []);

  // Check pincode when pincode changes and reaches 6 digits
  useEffect(() => {
    if (address.pincode.length === 6 && deliveryType === 'DELIVERY') {
      const checkPin = async () => {
        setPincodeLoading(true);
        setPincodeResolution(null);
        setErrorMessage('');
        try {
          const res = await api.checkPincode(address.pincode);
          setPincodeResolution(res);
          if (res.isServiceable && res.branch) {
            setSelectedBranchId(res.branch.id);
            if (res.deliverySlots && res.deliverySlots.length > 0) {
              setDeliverySlot(res.deliverySlots[0].label);
            }
          } else {
            setErrorMessage(res.message || 'Pincode not serviceable for home delivery.');
          }
        } catch (err: any) {
          setErrorMessage(err.message || 'Error validating pincode');
        } finally {
          setPincodeLoading(false);
        }
      };
      checkPin();
    }
  }, [address.pincode, deliveryType]);

  const deliveryFee =
    deliveryType === 'PICKUP'
      ? 0
      : pincodeResolution?.isServiceable
      ? pincodeResolution.deliveryFee
      : 49;

  const finalTotal = Math.max(0, cart.subtotal - cart.discount + deliveryFee + cart.tax);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      setErrorMessage('Please fill in complete contact details.');
      return;
    }

    if (deliveryType === 'DELIVERY') {
      if (!address.pincode || address.pincode.length !== 6 || !address.house || !address.street) {
        setErrorMessage('Please enter complete delivery address and valid 6-digit PIN code.');
        return;
      }
      if (pincodeResolution && !pincodeResolution.isServiceable) {
        setErrorMessage('The delivery PIN code is outside our serviceable branch zones. Please choose self-pickup.');
        return;
      }
    }

    if (!deliveryDate || !deliverySlot) {
      setErrorMessage('Please select a delivery date and time slot.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        deliveryType,
        deliveryAddress: {
          fullName: customerDetails.name,
          phone: customerDetails.phone,
          ...address,
        },
        deliveryDate,
        deliverySlot,
        selectedBranchId,
        paymentMethod,
        items: cart.items,
        couponCode: cart.couponCode || '',
        orderNotes,
      };

      const res = await api.createOrder(payload);

      if (!res.success) {
        throw new Error(res.message || 'Failed to place cake order.');
      }

      // If Cash on Delivery, redirect immediately to order confirmation
      if (paymentMethod === 'COD') {
        await refreshCart();
        router.push(`/order-confirmation/${res.order.orderNumber}`);
        return;
      }

      // Online Razorpay Payment flow
      if (res.razorpay) {
        const options = {
          key: res.razorpay.keyId,
          amount: res.razorpay.amount,
          currency: res.razorpay.currency,
          name: "Chef's Cake World",
          description: `Order #${res.order.orderNumber}`,
          order_id: res.razorpay.orderId,
          handler: async (response: any) => {
            try {
              // Strictly verify signature on the backend!
              const verifyRes = await api.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderNumber: res.order.orderNumber,
              });

              if (verifyRes.success) {
                await refreshCart();
                router.push(`/order-confirmation/${res.order.orderNumber}`);
              } else {
                setErrorMessage('Payment verification failed. Please contact store support.');
              }
            } catch (err: any) {
              setErrorMessage(err.message || 'Error confirming payment with server.');
            }
          },
          prefill: {
            name: customerDetails.name,
            email: customerDetails.email,
            contact: customerDetails.phone,
          },
          theme: {
            color: '#420600',
          },
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', (failResponse: any) => {
            setErrorMessage(`Payment failed: ${failResponse.error?.description || 'Transaction cancelled'}`);
            setSubmitting(false);
          });
          rzp.open();
        } else {
          // In test/mock mode if script not blocked, fallback to verify
          await api.verifyPayment({
            razorpay_order_id: res.razorpay.orderId,
            razorpay_payment_id: `mock_pay_${Date.now()}`,
            razorpay_signature: `mock_sig_${Date.now()}`,
            orderNumber: res.order.orderNumber,
          });
          await refreshCart();
          router.push(`/order-confirmation/${res.order.orderNumber}`);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error processing checkout.');
      setSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-brand-peach/40 flex items-center justify-center text-brand-caramel">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-2xl text-brand-chocolate">Your Cart is Empty</h2>
        <p className="text-sm text-brand-chocolate/70">
          Please add a fresh artisanal cake to your celebration cart before proceeding to checkout.
        </p>
        <Link
          href="/cakes"
          className="inline-block px-6 py-2.5 rounded-full bg-brand-chocolate text-brand-gold font-bold text-sm"
        >
          Browse Cakes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl text-brand-chocolate">
          Complete Your Cake Order
        </h1>
        <p className="text-xs sm:text-sm text-brand-chocolate/70 mt-1">
          Safe &amp; encrypted checkout &bull; Scheduled fresh baking across Kerala
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-brand-peach/80 border border-brand-chocolate/20 text-brand-chocolate text-xs sm:text-sm flex items-center gap-2 font-medium">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-brand-caramel" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Customer & Delivery Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Customer Contact */}
          <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-4">
            <h2 className="font-heading text-xl text-brand-chocolate pb-2 border-b border-brand-chocolate/10 flex items-center gap-2">
              <span>1. Contact Details</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">Mobile (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9820012345"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery vs Pickup Toggle */}
          <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-4">
            <h2 className="font-heading text-xl text-brand-chocolate pb-2 border-b border-brand-chocolate/10 flex items-center gap-2">
              <span>2. Delivery Mode</span>
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType('DELIVERY')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  deliveryType === 'DELIVERY'
                    ? 'border-brand-chocolate bg-brand-peach/30 font-bold'
                    : 'border-brand-chocolate/15 bg-white text-brand-chocolate/70'
                }`}
              >
                <Truck className="w-5 h-5 text-brand-caramel" />
                <span className="text-xs sm:text-sm text-brand-chocolate">Home / Venue Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('PICKUP')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  deliveryType === 'PICKUP'
                    ? 'border-brand-chocolate bg-brand-peach/30 font-bold'
                    : 'border-brand-chocolate/15 bg-white text-brand-chocolate/70'
                }`}
              >
                <Store className="w-5 h-5 text-brand-caramel" />
                <span className="text-xs sm:text-sm text-brand-chocolate">Self-Pickup at Branch (Free)</span>
              </button>
            </div>

            {deliveryType === 'DELIVERY' ? (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-brand-chocolate block mb-1">
                      Delivery PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 400050"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm font-bold text-brand-chocolate"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-brand-chocolate block mb-1">
                      House / Flat / Building *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 402, Sea Green Apts"
                      value={address.house}
                      onChange={(e) => setAddress({ ...address, house: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-brand-chocolate block mb-1">
                      Street / Road *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hill Road, Near Bandra Station"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-brand-chocolate block mb-1">
                      Area / Neighborhood
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bandra West"
                      value={address.area}
                      onChange={(e) => setAddress({ ...address, area: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                    />
                  </div>
                </div>

                {pincodeResolution && (
                  <div className="p-3 rounded-xl bg-brand-peach/60 text-brand-chocolate border border-brand-chocolate/15 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-brand-caramel" />
                      Assigned Fulfilling Hub: <strong>{pincodeResolution.branch?.name}</strong>
                    </span>
                    <span className="font-bold text-brand-chocolate">Fee: ₹{pincodeResolution.deliveryFee}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-brand-chocolate block">
                  Select Branch for Pickup:
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate bg-white font-medium"
                >
                  {branches.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name} ({b.address})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* 3. Date & Slot Selection */}
          <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-4">
            <h2 className="font-heading text-xl text-brand-chocolate pb-2 border-b border-brand-chocolate/10 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-caramel" />
              <span>3. Scheduled Delivery Time</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Celebration Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm font-semibold text-brand-chocolate"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-chocolate block mb-1">
                  Preferred Time Slot *
                </label>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm font-semibold text-brand-chocolate bg-white"
                >
                  <option value="10:00 AM - 01:00 PM (Morning)">10:00 AM - 01:00 PM (Morning Slot)</option>
                  <option value="02:00 PM - 05:00 PM (Afternoon)">02:00 PM - 05:00 PM (Afternoon Slot)</option>
                  <option value="06:00 PM - 09:00 PM (Evening)">06:00 PM - 09:00 PM (Evening Slot)</option>
                  <option value="11:00 PM - 12:00 AM (Midnight Special)">11:00 PM - 12:00 AM (Midnight Surprise)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-chocolate block mb-1">
                Order Notes / Special Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Ring the bell twice; keep refrigerated immediately on delivery"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-brand-chocolate/20 text-xs text-brand-chocolate"
              />
            </div>
          </div>

          {/* 4. Payment Options */}
          <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-4">
            <h2 className="font-heading text-xl text-brand-chocolate pb-2 border-b border-brand-chocolate/10">
              4. Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all border-brand-chocolate bg-brand-peach/20">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="RAZORPAY"
                    checked={paymentMethod === 'RAZORPAY'}
                    onChange={() => setPaymentMethod('RAZORPAY')}
                    className="accent-brand-chocolate w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-brand-chocolate block">
                      Razorpay Secure (UPI, GPay, Credit/Debit Cards, NetBanking)
                    </span>
                    <span className="text-[11px] text-brand-chocolate/70">
                      Instant verification &bull; Protected by Razorpay 256-bit encryption
                    </span>
                  </div>
                </div>
                <CreditCard className="w-5 h-5 text-brand-caramel flex-shrink-0" />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all border-brand-chocolate/20 hover:border-brand-chocolate">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="accent-brand-chocolate w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-brand-chocolate block">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[11px] text-brand-chocolate/70">
                      Pay cash upon delivery at your doorstep
                    </span>
                  </div>
                </div>
                <Banknote className="w-5 h-5 text-brand-caramel flex-shrink-0" />
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-brand-chocolate/10 shadow-cake-soft space-y-5 sticky top-28">
            <h2 className="font-heading text-xl text-brand-chocolate pb-2 border-b border-brand-chocolate/10">
              Order Summary ({cart.items.length} Cakes)
            </h2>

            {/* Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.items.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs pb-3 border-b border-brand-chocolate/5">
                  <img
                    src={item.productImage || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=200'}
                    alt={item.productName}
                    className="w-12 h-12 rounded-lg object-cover bg-brand-cream/40 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-brand-chocolate truncate">{item.productName}</h4>
                    <p className="text-[11px] text-brand-chocolate/70">
                      {item.selectedWeight} &bull; {item.isEggless ? 'Eggless' : 'With Egg'} &bull; Qty: {item.quantity}
                    </p>
                    {item.customMessage && (
                      <p className="text-[10px] text-brand-caramel truncate">
                        &ldquo;{item.customMessage}&rdquo;
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-brand-chocolate">₹{item.totalPrice}</span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-brand-chocolate/80 pt-2 border-t border-brand-chocolate/10">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-brand-chocolate">₹{cart.subtotal}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-brand-caramel font-bold">
                  <span>Coupon Discount ({cart.couponCode})</span>
                  <span>-₹{cart.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-bold text-brand-chocolate">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Bakery GST (5%)</span>
                <span className="font-bold text-brand-chocolate">₹{cart.tax}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-brand-chocolate pt-3 border-t border-brand-chocolate/10">
                <span>Total Payable</span>
                <span className="font-heading text-2xl text-brand-caramel">₹{finalTotal}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 min-h-[48px] rounded-xl bg-brand-chocolate text-brand-gold font-bold text-sm hover:bg-brand-caramel hover:text-white transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              <span>{submitting ? 'Confirming Order...' : `Pay ₹${finalTotal} & Confirm Order`}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-brand-chocolate/60">
              <ShieldCheck className="w-4 h-4 text-brand-caramel" />
              <span>100% Satisfaction &amp; Freshness Guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

