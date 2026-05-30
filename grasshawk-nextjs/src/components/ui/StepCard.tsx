'use client';

import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function StepCard({ step, icon: Icon, title, description, isLast }: StepCardProps) {
  return (
    <div className="relative flex flex-col items-center text-center group">
      {/* Connector line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-[calc(50%+48px)] right-[calc(-50%+48px)] h-0.5 bg-gradient-to-r from-[#C8102E]/30 to-[#C8102E]/10 z-0" />
      )}

      {/* Step badge */}
      <div className="relative z-10 mb-4">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#C8102E] to-[#ff4060] flex items-center justify-center shadow-lg group-hover:shadow-[#C8102E]/30 group-hover:scale-105 transition-all duration-300">
          <Icon size={36} className="text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center text-xs font-black shadow-sm">
          {step}
        </div>
      </div>

      <h3 className="font-bold text-[#1A1A1A] text-base mb-2 group-hover:text-[#C8102E] transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{description}</p>
    </div>
  );
}
