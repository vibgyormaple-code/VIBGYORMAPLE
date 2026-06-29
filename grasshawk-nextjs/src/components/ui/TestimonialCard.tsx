'use client';

import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location?: string;
  role?: string;
  rating?: number;
  review: string;
  avatar?: string;
  verified?: boolean;
}

export default function TestimonialCard({
  name,
  location,
  role,
  rating = 5,
  review,
  verified = true,
}: TestimonialCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col gap-4 hover:shadow-[0_8px_30px_rgba(200,16,46,0.1)] transition-all duration-300 hover:-translate-y-1">
      {/* Quote icon */}
      <Quote size={28} className="text-[#C8102E] opacity-30 -mb-2" />

      {/* Review text */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1">{review}</p>

      {/* Stars */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
          />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8102E] to-[#ff4060] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-[#1A1A1A] text-sm">{name}</p>
            {verified && (
              <span className="text-[10px] text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded-full">
                <CheckCircle2 size={10} className="inline mr-0.5 mb-0.5" /> Verified
              </span>
            )}
          </div>
          {(role || location) && (
            <p className="text-gray-400 text-xs">
              {role}{role && location ? ' · ' : ''}{location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
