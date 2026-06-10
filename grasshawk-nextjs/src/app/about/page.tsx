import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Testimonials from '@/components/sections/Testimonials';
import { Building2, Globe, Award, Heart, Users, Target, MapPin, FileCheck, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Vibgyor Maple Inc. & Grasshawk KLAW',
  description:
    'Learn about Vibgyor Maple Inc., the Canadian company behind Grasshawk KLAW™. Our story, mission, values, and commitment to innovative lawn and garden products.',
};

const values = [
  { icon: Heart, title: 'Eco-Conscious', description: 'Chemical-free and poison-free solutions that protect your lawn without harming the environment.' },
  { icon: Award, title: 'Quality & Reliability', description: 'Every Grasshawk product is built for durability, simplicity, and real-world performance.' },
  { icon: Users, title: 'Customer Satisfaction', description: 'From purchase to post-sale support, we\'re here for every Canadian customer.' },
  { icon: Target, title: 'Continuous Innovation', description: 'We improve our products based on real-world feedback from homeowners and gardeners.' },
];

const ctaCards = [
  { title: 'Become a Distributor', description: 'Partner with Vibgyor Maple to bring Grasshawk products to more Canadians.', href: '/contact?type=distributor', cta: 'Apply Now' },
  { title: 'Contact Sales', description: 'Get pricing for bulk orders and commercial packages.', href: '/contact?type=general', cta: 'Talk to Sales' },
  { title: 'Request Demo', description: 'See the Grasshawk KLAW™ in action with a live demonstration.', href: '/contact?type=product_info', cta: 'Request Demo' },
  { title: 'Get a Quote', description: 'Custom pricing for large agricultural or commercial needs.', href: '/contact?type=partnership', cta: 'Get Quote' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative text-white py-16 px-4 overflow-hidden">
        <Image
          src="/assets/about_us_bg.png"
          alt="Grasshawk Canadian Garden Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#C8102E]/80 border border-[#C8102E] rounded-full px-4 py-1 text-sm font-semibold text-white mb-4">
            🍁 Vibgyor Maple Inc.
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            About <span className="text-[#C8102E]">Grasshawk</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            A Canadian company dedicated to developing innovative, reliable, and environmentally responsible lawn and garden products.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Our Story
            </span>
            <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">
              Protecting Outdoor Spaces<br />Canadians Love
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
              <p>
                Vibgyor Maple Inc. is a Canadian company dedicated to developing innovative, reliable, and
                environmentally responsible lawn and garden products. We believe a healthy, well-maintained
                outdoor space is more than just a yard — it&apos;s a place where families gather, children play,
                and homeowners take pride in what they&apos;ve built.
              </p>
              <p>
                Our mission is to create practical solutions that help Canadians protect and enjoy those spaces
                with confidence. Under our flagship brand, Grasshawk™, we design products combining
                durability, simplicity, and performance for homeowners, gardeners, and property managers across Canada.
              </p>
              <p>
                Our first product, the <strong>Grasshawk KLAW™ Mole Trap</strong>, provides an effective,
                reusable, chemical-free solution for controlling moles. Built for Canadian conditions, it delivers
                dependable performance while supporting a safer, more sustainable approach to lawn care.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#f8f8f8] rounded-2xl p-5 flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image src="/assets/logo_vibgyor.png" alt="Vibgyor Maple Inc. Logo" fill className="object-contain" sizes="64px" />
              </div>
              <div>
                <p className="font-black text-[#1A1A1A] text-base leading-tight">Vibgyor Maple Inc.</p>
                <p className="text-xs text-gray-500 mt-0.5">Calgary, AB, Canada · GST: 767786213RT0001</p>
                <p className="text-xs text-[#C8102E] font-semibold mt-0.5">Grasshawk KLAW™ — Official Brand</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '10,000+', label: 'Units Sold', icon: '📦' },
                { value: '4.9★', label: 'Average Rating', icon: '⭐' },
                { value: 'CA', label: 'Country of Operation', icon: '🍁' },
                { value: '1 Year', label: 'Product Warranty', icon: '🛡️' },
              ].map(({ value, label, icon }) => (
                <div key={label} className="bg-[#f8f8f8] rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-xl font-black text-[#1A1A1A]">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-10 bg-[#f8f8f8] px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <Globe size={28} className="text-[#C8102E] mb-3" />
            <h3 className="text-lg font-black text-[#1A1A1A] mb-2">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              To expand the Grasshawk product family with new tools and solutions that help Canadians
              maintain beautiful outdoor spaces year-round — protecting every lawn, garden, and farm
              coast to coast without harmful chemicals.
            </p>
          </div>
          <div className="bg-[#C8102E] rounded-2xl p-7 shadow-[0_8px_24px_rgba(200,16,46,0.3)] text-white">
            <Target size={28} className="text-white mb-3" />
            <h3 className="text-lg font-black mb-2">Our Mission</h3>
            <p className="text-white/85 leading-relaxed text-sm">
              To create practical solutions that help Canadians protect and enjoy their outdoor spaces
              with confidence — combining quality, reliability, and environmentally responsible innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">Our Core Values</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">These principles guide every decision we make at Vibgyor Maple Inc.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-[#f8f8f8] rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 bg-[#C8102E]/10 rounded-xl flex items-center justify-center mb-3">
                  <Icon size={20} className="text-[#C8102E]" />
                </div>
                <h4 className="font-bold text-[#1A1A1A] mb-1.5 text-sm">{title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications — compact horizontal cards with image thumbnails */}
      <section className="py-10 bg-[#f8f8f8] px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <ShieldCheck size={28} className="text-[#C8102E] mx-auto mb-2" />
            <h2 className="text-2xl font-black text-[#1A1A1A]">Certifications & Registrations</h2>
            <p className="text-gray-500 mt-1.5 text-sm max-w-xl mx-auto">
              Officially registered and incorporated in Canada — backed by government-issued certificates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Industrial Design Registration */}
            <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <div className="w-9 h-9 bg-[#C8102E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileCheck size={18} className="text-[#C8102E]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-sm leading-tight">Industrial Design Registration</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Canadian IP Office · Reg. #222704 · Jul 2025</p>
                </div>
              </div>

              {/* Horizontal layout: thumbnail + info */}
              <div className="flex gap-0">
                {/* Certificate thumbnail - clickable */}
                <a
                  href="/assets/certificate/registration certi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex-shrink-0 w-36 group"
                  title="Click to open full PDF"
                  aria-label="View Industrial Design Registration Certificate"
                >
                  <div className="relative w-36 h-48">
                    <Image
                      src="/assets/certificate/registration-cert.png"
                      alt="Industrial Design Registration Certificate"
                      fill
                      className="object-cover object-top transition-opacity duration-200 group-hover:opacity-90"
                      sizes="144px"
                    />
                    <div className="absolute inset-0 bg-[#C8102E]/0 group-hover:bg-[#C8102E]/10 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#C8102E] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        View PDF
                      </div>
                    </div>
                  </div>
                </a>

                {/* Info */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                      ✓ Registered
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">
                      The Grasshawk KLAW™ Mole Trap is registered under the <em>Industrial Designs Act</em> — protecting its unique design, registered jointly with Press Stamping Industries.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] flex-shrink-0" />
                        Article: Mole Trap
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] flex-shrink-0" />
                        Registration: 21 JUL 2025
                      </div>
                    </div>
                  </div>
                  <a
                    href="/assets/certificate/registration certi.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[#C8102E] text-xs font-bold hover:underline"
                  >
                    <FileCheck size={13} /> Open Full Certificate →
                  </a>
                </div>
              </div>
            </div>

            {/* Certificate of Incorporation */}
            <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <div className="w-9 h-9 bg-[#1A1A1A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award size={18} className="text-[#1A1A1A]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-sm leading-tight">Certificate of Incorporation</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Corporations Canada · Corp. #1482033-9</p>
                </div>
              </div>

              {/* Horizontal layout: thumbnail + info */}
              <div className="flex gap-0">
                {/* Certificate thumbnail - clickable */}
                <a
                  href="/assets/certificate/certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex-shrink-0 w-36 group"
                  title="Click to open full PDF"
                  aria-label="View Certificate of Incorporation"
                >
                  <div className="relative w-36 h-48">
                    <Image
                      src="/assets/certificate/manufacturing-cert.png"
                      alt="Certificate of Incorporation — Vibgyor Maple Inc."
                      fill
                      className="object-cover object-top transition-opacity duration-200 group-hover:opacity-90"
                      sizes="144px"
                    />
                    <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/10 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A1A1A] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        View PDF
                      </div>
                    </div>
                  </div>
                </a>

                {/* Info */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                      ✓ Incorporated
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">
                      Vibgyor Maple Inc. is officially incorporated under the <em>Canada Business Corporations Act</em> — a federally registered Canadian corporation.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] flex-shrink-0" />
                        Corp. #1482033-9
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] flex-shrink-0" />
                        Incorporated: 2023-03-05
                      </div>
                    </div>
                  </div>
                  <a
                    href="/assets/certificate/certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[#1A1A1A] text-xs font-bold hover:underline"
                  >
                    <Award size={13} /> Open Full Certificate →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Information */}
      <section id="warranty" className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Building2 size={28} className="text-[#C8102E] mx-auto mb-2" />
            <h2 className="text-2xl font-black text-[#1A1A1A]">Business Information</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { label: 'Head Operations', address: 'Vibgyor Maple Inc.\nCalgary, AB, Canada\nGST: 767786213RT0001', icon: '🍁' },
              { label: 'Support & Operations', address: 'support.grasshawk@vibgormaple.com\n+1 639 590 9729', icon: '📞' },
              { label: 'Manufacturing Unit', address: 'Manufacturing Partner\nIndia (Country of Origin)', icon: '🏭' },
            ].map(({ label, address, icon }) => (
              <div key={label} className="bg-[#f8f8f8] rounded-2xl p-5">
                <div className="text-xl mb-2">{icon}</div>
                <h4 className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider mb-1.5">{label}</h4>
                <p className="text-gray-600 text-xs whitespace-pre-line leading-relaxed">{address}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-[#f8f8f8] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-[#C8102E]" />
              <h4 className="font-bold text-[#1A1A1A] text-sm">Product Availability</h4>
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
      <section className="py-12 px-4 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-2">Let&apos;s Work Together</h2>
            <p className="text-gray-500 text-sm">Explore partnership and business opportunities with Vibgyor Maple Inc.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ctaCards.map(({ title, description, href, cta }) => (
              <div key={title} className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col">
                <h4 className="font-bold text-[#1A1A1A] mb-1.5 text-sm">{title}</h4>
                <p className="text-gray-500 text-xs flex-1 mb-4 leading-relaxed">{description}</p>
                <Link
                  href={href}
                  className="block text-center bg-[#C8102E] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#a50d26] transition-all"
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
