'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, CheckCircle, CreditCard, Package, User, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import OTPModal from '@/components/ui/OTPModal';

// Steps
const STEPS = ['Customer Info', 'Verify Email', 'Payment', 'Confirmation'];

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  line1: string;
  city: string;
  province: string;
  postalCode: string;
}

const CANADIAN_PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
  'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon',
];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState<CustomerInfo>({
    name: '', email: '', phone: '',
    line1: '', city: '', province: 'Alberta', postalCode: '',
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});
  const [showOTP, setShowOTP] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('cod');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderId, setOrderId] = useState('');

  const { items, subtotal, tax, shipping, total, clearCart } = useCartStore();
  const router = useRouter();

  const sub = subtotal();
  const taxAmt = tax();
  const shipAmt = shipping();
  const totalAmt = total();

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && step < 3) {
      router.push('/shop');
    }
  }, [items, step, router]);

  const validate = () => {
    const e: Partial<CustomerInfo> = {};
    if (!info.name.trim()) e.name = 'Full name is required';
    if (!info.email.trim() || !/\S+@\S+\.\S+/.test(info.email)) e.email = 'Valid email is required';
    if (!info.phone.trim()) e.phone = 'Phone number is required';
    if (!info.line1.trim()) e.line1 = 'Address is required';
    if (!info.city.trim()) e.city = 'City is required';
    if (!info.postalCode.trim()) e.postalCode = 'Postal code is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNextStep = async () => {
    if (step === 0) {
      if (!validate()) return;
      // Send OTP
      setOtpSending(true);
      try {
        await fetch('/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: info.email }),
        });
        setShowOTP(true);
      } catch {
        alert('Failed to send verification code. Please try again.');
      } finally {
        setOtpSending(false);
      }
    }
  };

  const handleOTPVerified = () => {
    setShowOTP(false);
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setOrderLoading(true);

    try {
      const payload = {
        customerName: info.name,
        email: info.email,
        phone: info.phone,
        address: { line1: info.line1, city: info.city, state: info.province, pincode: info.postalCode, country: 'Canada' },
        items: items.map((i) => ({ productId: i.id, name: i.name, qty: i.qty, price: i.price })),
        subtotal: sub,
        tax: taxAmt,
        shipping: shipAmt,
        total: totalAmt,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.order) {
        setOrderId(data.order._id);
        clearCart();
        setStep(3);
      } else {
        alert(data.message || 'Failed to place order. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  const inputClass = (field: keyof CustomerInfo) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all bg-[#f8f8f8] focus:bg-white ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200'
    }`;

  return (
    <div className="bg-[#f8f8f8] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-[#1A1A1A] mb-8">Checkout</h1>

        {/* Progress bar */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200 -z-10" />
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-2 z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  i < step
                    ? 'bg-[#C8102E] border-[#C8102E] text-white'
                    : i === step
                    ? 'bg-white border-[#C8102E] text-[#C8102E]'
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${i === step ? 'text-[#C8102E]' : 'text-gray-400'}`}>
                {s}
              </span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Step 0: Customer Info */}
            {step === 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                  <User size={22} className="text-[#C8102E]" />
                  <h2 className="text-xl font-black text-[#1A1A1A]">Customer Information</h2>
                </div>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Full Name *</label>
                      <input
                        id="checkout-name"
                        value={info.name}
                        onChange={(e) => setInfo({ ...info, name: e.target.value })}
                        placeholder="John Smith"
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Phone *</label>
                      <input
                        id="checkout-phone"
                        value={info.phone}
                        onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className={inputClass('phone')}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Email Address *</label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={info.email}
                      onChange={(e) => setInfo({ ...info, email: e.target.value })}
                      placeholder="john@example.com"
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Street Address *</label>
                    <input
                      id="checkout-address"
                      value={info.line1}
                      onChange={(e) => setInfo({ ...info, line1: e.target.value })}
                      placeholder="123 Maple Street"
                      className={inputClass('line1')}
                    />
                    {errors.line1 && <p className="text-red-500 text-xs mt-1">{errors.line1}</p>}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">City *</label>
                      <input
                        id="checkout-city"
                        value={info.city}
                        onChange={(e) => setInfo({ ...info, city: e.target.value })}
                        placeholder="Edmonton"
                        className={inputClass('city')}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Province *</label>
                      <select
                        id="checkout-province"
                        value={info.province}
                        onChange={(e) => setInfo({ ...info, province: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] bg-[#f8f8f8] focus:bg-white"
                      >
                        {CANADIAN_PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Postal Code *</label>
                      <input
                        id="checkout-postal"
                        value={info.postalCode}
                        onChange={(e) => setInfo({ ...info, postalCode: e.target.value.toUpperCase() })}
                        placeholder="T5A 0A1"
                        className={inputClass('postalCode')}
                      />
                      {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  disabled={otpSending}
                  id="checkout-continue-btn"
                  className="mt-8 w-full bg-[#C8102E] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-[#a50d26] transition-all disabled:opacity-60"
                >
                  {otpSending && <Loader2 size={18} className="animate-spin" />}
                  {otpSending ? 'Sending Verification Code...' : 'Continue to Verify Email'}
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={22} className="text-[#C8102E]" />
                  <h2 className="text-xl font-black text-[#1A1A1A]">Payment Method</h2>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    { id: 'razorpay', label: 'Razorpay', sub: 'Credit/Debit Card, UPI, Net Banking', icon: '💳' },
                    { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when your order arrives', icon: '📦' },
                  ].map(({ id, label, sub, icon }) => (
                    <label
                      key={id}
                      htmlFor={`payment-${id}`}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === id ? 'border-[#C8102E] bg-[#C8102E]/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        id={`payment-${id}`}
                        name="paymentMethod"
                        value={id}
                        checked={paymentMethod === id as 'razorpay' | 'cod'}
                        onChange={() => setPaymentMethod(id as 'razorpay' | 'cod')}
                        className="accent-[#C8102E]"
                      />
                      <span className="text-2xl">{icon}</span>
                      <div>
                        <div className="font-bold text-[#1A1A1A]">{label}</div>
                        <div className="text-sm text-gray-500">{sub}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'razorpay' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-700">
                    <p>🔒 You&apos;ll be redirected to Razorpay&apos;s secure payment gateway to complete your payment.</p>
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={orderLoading}
                  id="checkout-place-order"
                  className="w-full bg-[#C8102E] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-[#a50d26] transition-all disabled:opacity-60"
                >
                  {orderLoading && <Loader2 size={18} className="animate-spin" />}
                  {orderLoading ? 'Placing Order...' : `Place Order — $${totalAmt.toFixed(2)} CAD`}
                </button>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                <CheckCircle size={72} className="text-green-500 mx-auto mb-5" />
                <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">Order Confirmed! 🎉</h2>
                <p className="text-gray-500 mb-2">Thank you, <strong>{info.name}</strong>!</p>
                {orderId && (
                  <p className="text-sm text-gray-400 mb-6">
                    Order ID: <span className="font-bold text-[#1A1A1A]">#{orderId}</span>
                  </p>
                )}
                <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                  A confirmation email with your order details has been sent to <strong>{info.email}</strong>.
                  Your Grasshawk KLAW will be shipped within 1–2 business days.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/" className="bg-[#C8102E] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#a50d26] transition-all">
                    Back to Home
                  </Link>
                  <Link href="/shop" className="border-2 border-gray-200 text-[#1A1A1A] px-8 py-3 rounded-xl font-bold hover:border-[#C8102E] transition-all">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary sidebar */}
          {step < 3 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] sticky top-24">
                <h3 className="font-black text-[#1A1A1A] mb-5 flex items-center gap-2">
                  <Package size={18} className="text-[#C8102E]" /> Order Summary
                </h3>
                <div className="space-y-3 text-sm mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-500 truncate pr-2">{item.name} × {item.qty}</span>
                      <span className="font-semibold whitespace-nowrap">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold">${sub.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">HST (13%)</span><span className="font-semibold">${taxAmt.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={`font-semibold ${shipAmt === 0 ? 'text-green-600' : ''}`}>{shipAmt === 0 ? 'FREE' : `$${shipAmt.toFixed(2)}`}</span></div>
                </div>
                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                  <span className="font-black text-[#1A1A1A]">Total</span>
                  <span className="font-black text-[#C8102E] text-xl">${totalAmt.toFixed(2)} CAD</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span>🔒 SSL Secured</span>
                  <span>🍁 Ships to CA</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* OTP Modal */}
      {showOTP && (
        <OTPModal
          email={info.email}
          onVerified={handleOTPVerified}
          onClose={() => setShowOTP(false)}
        />
      )}
    </div>
  );
}
