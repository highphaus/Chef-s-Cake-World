'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cake, Lock, Mail, Phone, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, register, user } = useAuth();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // If already logged in, redirect to account
  if (user) {
    router.push('/account');
    return null;
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(loginIdentifier, loginPassword);
      router.push('/account');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(regName, regEmail, regPhone, regPassword);
      router.push('/account');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Email or phone might already exist.');
    } finally {
      setLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setLoginIdentifier('admin@chefscakeworld.com');
    setLoginPassword('AdminPassword@123');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-20 h-20 flex items-center justify-center mx-auto">
          <img
            src="/logo/chefcake.png"
            alt="Chef's Cake World Logo"
            className="w-full h-full object-contain drop-shadow-md"
          />
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl text-brand-chocolate">
          {isLoginTab ? 'Welcome Back' : 'Create an Account'}
        </h1>
        <p className="text-xs sm:text-sm text-brand-chocolate/70">
          Chef&apos;s Cake World &bull; Artisan Patisserie
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-brand-cream/80 p-1 rounded-2xl border border-brand-chocolate/10">
        <button
          type="button"
          onClick={() => {
            setIsLoginTab(true);
            setError('');
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            isLoginTab ? 'bg-brand-chocolate text-brand-gold shadow' : 'text-brand-chocolate/70'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setIsLoginTab(false);
            setError('');
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            !isLoginTab ? 'bg-brand-chocolate text-brand-gold shadow' : 'text-brand-chocolate/70'
          }`}
        >
          Register New Account
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-brand-peach/80 text-brand-chocolate text-xs flex items-center gap-2 border border-brand-chocolate/20 font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-brand-caramel" />
          <span>{error}</span>
        </div>
      )}

      {/* Forms */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-chocolate/10 shadow-cake-soft space-y-5">
        {isLoginTab ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-brand-chocolate block mb-1">
                Email Address or Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. rahul@example.com or 9820012345"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-1 focus:ring-brand-caramel"
                />
                <Mail className="w-4 h-4 text-brand-chocolate/50 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-chocolate block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate focus:ring-1 focus:ring-brand-caramel"
                />
                <Lock className="w-4 h-4 text-brand-chocolate/50 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 min-h-[44px] rounded-xl bg-brand-chocolate text-brand-gold font-bold text-sm hover:bg-brand-caramel hover:text-white transition-all shadow-md disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? 'Authenticating...' : 'Sign In to Your Account'}
            </button>

            {/* Quick Demo Credentials Autofill */}
            <div className="pt-3 border-t border-brand-chocolate/10 text-center">
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="text-[11px] font-semibold text-brand-caramel hover:underline"
              >
                Autofill Administrator Demo Credentials
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-brand-chocolate block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarti Mehta"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
                <User className="w-4 h-4 text-brand-chocolate/50 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-chocolate block mb-1">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="e.g. aarti@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
                <Mail className="w-4 h-4 text-brand-chocolate/50 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-chocolate block mb-1">
                Phone Number (WhatsApp) *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9820012345"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
                <Phone className="w-4 h-4 text-brand-chocolate/50 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-chocolate block mb-1">
                Create Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Choose secure password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-brand-chocolate/20 text-xs sm:text-sm text-brand-chocolate"
                />
                <Lock className="w-4 h-4 text-brand-chocolate/50 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 min-h-[44px] rounded-xl bg-brand-chocolate text-brand-gold font-bold text-sm hover:bg-brand-caramel hover:text-white transition-all shadow-md disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

