'use client';

import BenefitCard from '@/components/ui/BenefitCard';
import Image from 'next/image';

const benefits = [
  {
    iconImage: '/assets/durableandheavyduty.png',
    title: 'Durable & Heavy-Duty',
    description: 'Built from heavy-gauge galvanized steel to last season after season in any Canadian weather.',
  },
  {
    iconImage: '/assets/easytosetup.png',
    title: 'Easy to Set Up',
    description: "Our intuitive 4-step setup means you're ready to go in minutes — no tools, no expertise needed.",
  },

  {
    iconImage: '/assets/petfriendly.png',
    title: 'Pet & Child Friendly',
    description: 'No chemicals, no poisons. The KLAW is 100% safe for your pets, children, and the environment.',
  },
  {
    iconImage: '/assets/weatherresistance.png',
    title: 'Weather Resistant',
    description: 'Designed for Canada — performs equally well in summer heat and winter cold.',
  },
  {
    iconImage: '/assets/reusableandecofriendly.png',
    title: 'Reusable & Eco-Friendly',
    description: 'One trap, unlimited uses. A sustainable alternative that reduces waste and carbon footprint.',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — product image display */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.12)] aspect-[4/3] group">
            <Image
              src="/assets/new_moletrap.jpg"
              alt="Grasshawk KLAW Mole Trap"
              fill
              className="object-contain bg-gradient-to-br from-[#f8f8f8] to-[#efefef] p-8 group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>

          {/* Right — Benefits grid */}
          <div>
            <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Why KLAW?
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-3 leading-tight">
              Built for Canadian<br />Conditions
            </h2>
            <p className="text-gray-500 text-base mb-8 leading-relaxed">
              Every feature of the Grasshawk KLAW was designed to make mole control simple, safe, and sustainable — no matter where in Canada you are.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <BenefitCard
                  key={b.title}
                  iconImage={b.iconImage}
                  title={b.title}
                  description={b.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
