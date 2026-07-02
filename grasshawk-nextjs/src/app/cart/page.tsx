'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Truck, MapPin, Lock, Leaf, Rocket } from 'lucide-react';
import CartItem from '@/components/ui/CartItem';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const { items, subtotal, tax, shipping, total } = useCartStore();

  const sub = subtotal();
  const taxAmt = tax();
  const shipAmt = shipping();
  const totalAmt = total();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#f8f8f8]">
        <div className="w-20 h-20 bg-[#C8102E]/10 rounded-2xl flex items-center justify-center mb-6">
          <ShoppingBag size={36} className="text-[#C8102E]" />
        </div>
        <h1 className="text-3xl font-black text-[#1A1A1A] mb-3">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-sm">
          Add the Grasshawk KLAW mole trap to your cart and protect your lawn today.
        </p>
        <Link
          href="/shop"
          id="cart-shop-now"
          className="bg-[#C8102E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#a50d26] transition-all hover:shadow-lg"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-black text-[#1A1A1A] mb-8">
          Shopping Cart <span className="text-gray-400 font-normal text-xl">({items.reduce((s, i) => s + i.qty, 0)} item{items.length !== 1 ? 's' : ''})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}

            {/* Shipping banner removed because shipping is included */}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] sticky top-24">
              <h2 className="font-black text-[#1A1A1A] text-lg mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm border-b border-gray-100 pb-5 mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">${sub.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">GST Tax</span>
                  <span className="font-semibold text-xs text-gray-400 mt-0.5">Varies by City (TBD)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-semibold ${shipAmt === 0 ? 'text-green-600' : ''}`}>
                    {shipAmt === 0 ? 'Included' : `$${shipAmt.toFixed(2)} CAD`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-black text-[#1A1A1A] text-base">Total</span>
                <span className="font-black text-[#C8102E] text-2xl">${totalAmt.toFixed(2)} CAD</span>
              </div>

              <Link
                href="/checkout"
                id="cart-checkout-btn"
                className="w-full bg-[#C8102E] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-[#a50d26] transition-all hover:shadow-lg mb-3"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
              <Link
                href="/shop"
                className="w-full text-center text-gray-400 hover:text-[#1A1A1A] text-sm font-medium transition-colors block"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-xs text-gray-400 font-medium">
                <div className="flex flex-col items-center gap-1"><Lock size={16} /> Secure</div>
                <div className="flex flex-col items-center gap-1"><MapPin size={16} /> Canada</div>
                <div className="flex flex-col items-center gap-1"><Leaf size={16} /> Eco-Safe</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
