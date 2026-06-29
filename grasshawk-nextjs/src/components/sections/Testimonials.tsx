'use client';

import TestimonialCard from '@/components/ui/TestimonialCard';

const testimonials = [
  {
    name: 'Mike Henderson',
    location: 'Vancouver, BC',
    role: 'Homeowner',
    rating: 5,
    review:
      'Incredible product! We had a serious mole problem destroying our backyard for two seasons. Set up the KLAW in 5 minutes and caught two moles in the first week. Finally a solution that actually works!',
    verified: true,
  },
  {
    name: 'Sarah Kowalski',
    location: 'Langley, BC',
    role: 'Market Gardener',
    rating: 5,
    review:
      'I was skeptical at first, but after losing half my carrot crop to moles, I tried KLAW. Night and day difference. The build quality is exceptional and it\'s so easy to reset. Ordered 3 more units.',
    verified: true,
  },
  {
    name: 'David Tremblay',
    location: 'Calgary, AB',
    role: 'Landscaper',
    rating: 5,
    review:
      'As a professional landscaper, I recommend Grasshawk KLAW to all my clients. It\'s humane, reliable, and completely chemical-free. My clients love that it\'s safe for their kids and pets.',
    verified: true,
  },
  {
    name: 'Priya Sharma',
    location: 'Mississauga, ON',
    role: 'Golf Course Manager',
    rating: 5,
    review:
      'We use KLAW traps across our 18-hole course. The durability in Canadian winters is remarkable. VIBGYOR Maple\'s support team was also incredibly helpful during our bulk order process.',
    verified: true,
  },
  {
    name: 'Tom Buchanan',
    location: 'Toronto, ON',
    role: 'Farmer',
    rating: 4,
    review:
      'Very solid trap. Moles were devastating my alfalfa fields and KLAW has cut the damage by about 80%. Weather-resistant — been through rain, frost, everything. Worth every penny.',
    verified: true,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Customer Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4">
            Loved Across Canada
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Real results from real customers. Join thousands of Canadians protecting their land with KLAW.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        {/* Second row - centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
          {testimonials.slice(3).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>


      </div>
    </section>
  );
}
