'use client';

import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  description?: string;
  onClick?: () => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  rating = 4.8,
  reviews = 127,
  badge,
  description,
  onClick,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id, name, price, image });
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden group cursor-pointer hover:shadow-[0_8px_30px_rgba(200,16,46,0.15)] transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Image container */}
      <div className="relative aspect-square bg-[#f8f8f8] overflow-hidden">
        {badge && (
          <span className="absolute top-3 left-3 z-10 bg-[#C8102E] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({reviews})</span>
        </div>

        <h3 className="font-bold text-[#1A1A1A] text-base leading-tight mb-1">{name}</h3>
        {description && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">{description}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <div>
              <span className="text-2xl font-black text-[#C8102E]">
                ${price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400 ml-1">CAD</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-0.5">+ GST (Varies by City)</span>
          </div>

          <button
            id={`add-to-cart-${id}`}
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-[#C8102E] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#a50d26] transition-all active:scale-95 hover:shadow-md"
          >
            <ShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
