import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Testimonials from '@/components/sections/Testimonials';
import { Building2, Globe, Award, Heart, Users, Target, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — VIBGYOR Maple Inc. & Grasshawk KLAW',
  description:
    'Learn about VIBGYOR Maple Inc., the company behind Grasshawk KLAW. Our story, mission, vision, and values.',
};

const values = [
  { icon: Heart, title: 'Eco-Conscious', description: 'We believe in protecting land without harming it. No chemicals, no poisons — ever.' },
  { icon: Award, title: 'Quality First', description: 'Every KLAW trap undergoes rigorous quality checks before leaving our manufacturing unit.' },
  { icon: Users, title: 'Customer Centric', description: 'From purchase to post-sale support, we\'re here for every Canadian customer.' },
  { icon: Target, title: 'Innovation Driven', description: 'We continuously improve our products based on real-world feedback from farmers and homeowners.' },
];

const ctaCards = [
  { title: 'Become a Distributor', description: 'Partner with VIBGYOR Maple to bring KLAW to more Canadians.', href: '/contact?type=distributor', cta: 'Apply Now' },
  { title: 'Contact Sales', description: 'Get pricing for bulk orders and commercial packages.', href: '/contact?type=general', cta: 'Talk to Sales' },
  { title: 'Request Demo', description: 'See KLAW in action with a live demonstration.', href: '/contact?type=product_info', cta: 'Request Demo' },
  { title: 'Get a Quote', description: 'Custom pricing for large agricultural or commercial needs.', href: '/contact?type=partnership', cta: 'Get Quote' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero — using real about_us_bg.png */}
      <section className="relative text-white py-24 px-4 overflow-hidden">
        <Image
          src="/assets/about_us_bg.png"
          alt="Grasshawk Canadian Garden Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#C8102E]/80 border border-[#C8102E] rounded-full px-4 py-1.5 text-sm font-semibold text-white mb-6">
            🍁 VIBGYOR Maple Inc.
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            About <span className="text-[#C8102E]">Grasshawk</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            We&apos;re a Canadian company passionate about protecting the land that feeds us —
            without chemicals, without compromise.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Our Story
            </span>
            <h2 className="text-4xl font-black text-[#1A1A1A] mb-6">
              From India to Canada,<br />Protecting Every Lawn
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                VIBGYOR Maple Inc. was founded with a singular vision: to bring effective, eco-friendly pest control
                solutions to Canadian homeowners and agricultural communities. Operating from Alberta, Canada,
                we bridge the gap between high-quality Indian manufacturing and the Canadian market&apos;s need for
                reliable, safe products.
              </p>
              <p>
                The Grasshawk KLAW is our flagship product — a professional-grade mole trap designed and
                manufactured in India, engineered to withstand Canadian weather conditions, and trusted by
                thousands of customers from British Columbia to Ontario.
              </p>
              <p>
                Our core belief is simple: you shouldn&apos;t have to choose between an effective pest solution and
                the safety of your children, pets, or the environment. KLAW delivers results without compromise.
              </p>
            </div>
          </div>

          {/* Stats + VIBGYOR logo */}
          <div className="space-y-6">
            {/* VIBGYOR logo */}
            <div className="bg-[#f8f8f8] rounded-2xl p-6 flex items-center gap-5">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src="/assets/logo_vibgyor.png"
                  alt="VIBGYOR Maple Inc. Logo"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
              <div>
                <p className="font-black text-[#1A1A1A] text-lg leading-tight">VIBGYOR Maple Inc.</p>
                <p className="text-sm text-gray-500 mt-1">Alberta, Canada · GST registered</p>
                <p className="text-xs text-[#C8102E] font-semibold mt-1">Grasshawk KLAW™ — Official Brand</p>
              </div>
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10,000+', label: 'Units Sold', icon: '📦' },
                { value: '4.9★', label: 'Average Rating', icon: '⭐' },
                { value: 'CA', label: 'Country of Operation', icon: '🍁' },
                { value: '1 Year', label: 'Product Warranty', icon: '🛡️' },
              ].map(({ value, label, icon }) => (
                <div key={label} className="bg-[#f8f8f8] rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">{icon}</div>
                  <div className="text-2xl font-black text-[#1A1A1A]">{value}</div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-[#f8f8f8] px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <Globe size={32} className="text-[#C8102E] mb-4" />
            <h3 className="text-xl font-black text-[#1A1A1A] mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become Canada&apos;s most trusted provider of eco-friendly pest control solutions —
              protecting every lawn, garden, and farm from coast to coast without the use of harmful chemicals.
            </p>
          </div>
          <div className="bg-[#C8102E] rounded-2xl p-8 shadow-[0_8px_24px_rgba(200,16,46,0.3)] text-white">
            <Target size={32} className="text-white mb-4" />
            <h3 className="text-xl font-black mb-3">Our Mission</h3>
            <p className="text-white/85 leading-relaxed">
              To deliver innovative, safe, and effective mole control solutions that empower homeowners,
              farmers, and landscapers to protect their property — affordably, responsibly, and sustainably.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1A1A1A] mb-4">Our Core Values</h2>
            <p className="text-gray-500 max-w-lg mx-auto">These principles guide every decision we make at VIBGYOR Maple Inc.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-[#f8f8f8] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#C8102E]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#C8102E]" />
                </div>
                <h4 className="font-bold text-[#1A1A1A] mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authenticity / Addresses */}
      <section id="warranty" className="py-16 bg-[#f8f8f8] px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Building2 size={32} className="text-[#C8102E] mx-auto mb-3" />
            <h2 className="text-3xl font-black text-[#1A1A1A]">Business Information</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Registered Office', address: 'VIBGYOR Maple Inc.\nAlberta, Canada', icon: '🍁' },
              { label: 'Support & Operations', address: 'support.grasshawk@vibgormaple.com\n+1 639 590 9729', icon: '📞' },
              { label: 'Manufacturing Unit', address: 'Manufacturing Partner\nIndia (Country of Origin)', icon: '🏭' },
            ].map(({ label, address, icon }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <div className="text-2xl mb-3">{icon}</div>
                <h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider mb-2">{label}</h4>
                <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{address}</p>
              </div>
            ))}
          </div>

          {/* Availability */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-[#C8102E]" />
              <h4 className="font-bold text-[#1A1A1A]">Product Availability</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Alberta', 'British Columbia', 'Ontario', 'Saskatchewan', 'Manitoba', 'Quebec', 'All Canadian Provinces (Online)'].map((loc) => (
                <span key={loc} className="bg-[#C8102E]/10 text-[#C8102E] px-3 py-1 rounded-full text-xs font-semibold">
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Cards */}
      <section className="py-20 px-4 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">Let&apos;s Work Together</h2>
            <p className="text-gray-500">Explore partnership and business opportunities with VIBGYOR Maple Inc.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ctaCards.map(({ title, description, href, cta }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col">
                <h4 className="font-bold text-[#1A1A1A] mb-2">{title}</h4>
                <p className="text-gray-500 text-sm flex-1 mb-4 leading-relaxed">{description}</p>
                <Link
                  href={href}
                  className="block text-center bg-[#C8102E] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#a50d26] transition-all"
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
