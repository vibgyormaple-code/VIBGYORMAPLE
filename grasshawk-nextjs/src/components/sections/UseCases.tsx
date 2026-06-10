'use client';

import { Home, Building2, Wheat, Flower2 } from 'lucide-react';

const useCases = [
  {
    icon: Home,
    title: 'Residential',
    description: 'Protect your backyard, garden, and lawn from destructive mole tunnels. Safe for families, kids, and pets.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: Building2,
    title: 'Commercial',
    description: 'Maintain pristine landscapes for hotels, golf courses, commercial properties, and parks.',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    icon: Wheat,
    title: 'Agricultural',
    description: 'Shield crops, root systems, and farmland from mole damage. Ideal for large-scale agricultural use.',
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    icon: Flower2,
    title: 'Gardens & Lawns',
    description: 'Keep your flower beds, vegetable gardens, and manicured lawns mole-free all season long.',
    color: 'from-green-500 to-green-600',
    bg: 'bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Versatile Application
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4">
            Works Everywhere
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From suburban gardens to commercial farms, Grasshawk KLAW handles mole control in any environment.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((item) => (
            <div
              key={item.title}
              className={`${item.bg} rounded-2xl p-6 group hover:-translate-y-2 hover:shadow-xl transition-all duration-300`}
            >
              <div className={`${item.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={26} className={item.iconColor} />
              </div>
              <h3 className="font-bold text-[#1A1A1A] text-xl mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
