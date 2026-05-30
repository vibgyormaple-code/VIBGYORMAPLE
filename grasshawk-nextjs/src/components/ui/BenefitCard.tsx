'use client';

import Image from 'next/image';

interface BenefitCardProps {
  icon?: React.ReactNode;
  iconImage?: string;
  title: string;
  description: string;
  accent?: boolean;
}

export default function BenefitCard({ icon, iconImage, title, description, accent }: BenefitCardProps) {
  return (
    <div
      className={`group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${
        accent
          ? 'bg-[#C8102E] text-white shadow-[0_8px_24px_rgba(200,16,46,0.3)] hover:shadow-[0_12px_32px_rgba(200,16,46,0.4)]'
          : 'bg-[#f8f8f8] hover:bg-white hover:shadow-lg'
      }`}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${accent ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
        {iconImage ? (
          <div className="relative w-8 h-8">
            <Image
              src={iconImage}
              alt={title}
              fill
              className={`object-contain ${accent ? 'brightness-0 invert' : ''}`}
              sizes="32px"
            />
          </div>
        ) : (
          <div className={accent ? 'text-white' : 'text-[#C8102E]'}>{icon}</div>
        )}
      </div>
      <div>
        <h4 className={`font-bold text-base mb-1.5 ${accent ? 'text-white' : 'text-[#1A1A1A]'}`}>{title}</h4>
        <p className={`text-sm leading-relaxed ${accent ? 'text-white/80' : 'text-gray-500'}`}>{description}</p>
      </div>
    </div>
  );
}
