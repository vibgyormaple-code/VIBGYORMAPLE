'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  weight?: string;
}

export default function CartItem({ id, name, price, qty, image, weight }: CartItemProps) {
  const { updateQty, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      {/* Image */}
      <div className="w-20 h-20 bg-[#f8f8f8] rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className="object-contain w-full h-full p-2"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[#1A1A1A] text-sm truncate">{name}</h3>
        {weight && <p className="text-gray-400 text-xs mt-0.5">{weight}</p>}
        <p className="text-[#C8102E] font-bold text-sm mt-1">
          ${(price * qty).toFixed(2)} CAD
          {qty > 1 && (
            <span className="text-gray-400 font-normal text-xs ml-1">
              (${price.toFixed(2)} each)
            </span>
          )}
        </p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQty(id, qty - 1)}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors active:scale-95"
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center font-bold text-sm">{qty}</span>
        <button
          onClick={() => updateQty(id, qty + 1)}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors active:scale-95"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(id)}
        className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
        aria-label="Remove item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
