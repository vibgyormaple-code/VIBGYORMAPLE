'use client';

import BenefitCard from '@/components/ui/BenefitCard';

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
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Why KLAW?
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-3 leading-tight">
            Built for Canadian Conditions
          </h2>
          <p className="text-gray-500 text-base mb-10 leading-relaxed max-w-2xl mx-auto">
            Every feature of the Grasshawk KLAW was designed to make mole control simple, safe, and sustainable — no matter where in Canada you are.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 text-left">
            {benefits.map((b, i) => (
              <div 
                key={b.title} 
                className={`
                  sm:col-span-1 md:col-span-2 flex h-full
                  ${i === 3 ? 'md:col-start-2' : ''}
                  ${i === 4 ? 'md:col-start-4' : ''}
                `}
              >
                <BenefitCard
                  iconImage={b.iconImage}
                  title={b.title}
                  description={b.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
