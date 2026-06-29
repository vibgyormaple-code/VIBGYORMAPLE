import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ProductShowcase from '@/components/sections/ProductShowcase';
import SetupGuide from '@/components/sections/SetupGuide';
import UseCases from '@/components/sections/UseCases';
import Benefits from '@/components/sections/Benefits';
import Testimonials from '@/components/sections/Testimonials';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vibgyor Maple — #1 Mole Claws in Canada | Grasshawk KLAW',
  description:
    'Looking for the best mole claws in Canada? The Grasshawk KLAW features heavy-duty steel claws for fast, chemical-free mole control. Ships across Canada.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductShowcase />
      <SetupGuide />
      <UseCases />
      <Benefits />
      <Testimonials />

      {/* CTA Footer Banner */}
      <section className="py-10 bg-gradient-to-br from-[#1A1A1A] to-[#2d0a12] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-[#C8102E]/20 border border-[#C8102E]/30 rounded-full px-4 py-1.5 text-sm font-semibold text-[#ff8099] mb-6">
            <span className="flex items-center gap-1 justify-center"><MapPin size={14} className="text-[#ff8099]" /> Made for Canadian Conditions</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Ready to Protect<br />Your Lawn?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join thousands of Canadian homeowners and farmers who trust Grasshawk KLAW for chemical-free mole control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              href="/contact"
              id="cta-banner-contact"
              className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
