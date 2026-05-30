'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* ── Desktop: Full-width background video ─────────────────────────────── */}
      <div className="hidden md:block absolute inset-0">
        <video
          ref={videoRef}
          src="/assets/HEROVIDEO.MP4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* ── Mobile: Content first, video below ───────────────────────────────── */}
      <div className="md:hidden">
        {/* Mobile hero text */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2d0a12] px-6 py-16 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-[#C8102E]/20 border border-[#C8102E]/30 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold text-[#ff8099]">
            🍁 Trusted by Canadian Homeowners
          </div>
          <h1 className="text-4xl font-black mb-3 leading-tight">
            Grasshawk<br />
            <span className="text-[#C8102E]">KLAW</span>
          </h1>
          <p className="text-xl font-semibold text-gray-300 mb-2">Fast, Safe &amp; Eco-Friendly</p>
          <p className="text-gray-400 text-sm mb-8">You grow it, we protect it.</p>

          <div className="flex flex-col gap-3">
            <Link
              href="/shop"
              id="hero-buy-now-mobile"
              className="bg-[#C8102E] text-white py-4 rounded-xl font-bold text-base text-center hover:bg-[#a50d26] transition-all active:scale-95"
            >
              Buy Now — $29.00 CAD
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 border border-white/20 text-white py-4 rounded-xl font-semibold text-sm text-center hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile video as block player */}
        <div className="relative bg-black">
          <video
            src="/assets/HEROVIDEO.MP4"
            controls
            playsInline
            className="w-full"
            poster="/assets/hero-poster.jpg"
          />
        </div>
      </div>

      {/* ── Desktop: Overlay content ──────────────────────────────────────────── */}
      <div className="hidden md:flex relative z-10 flex-col justify-center px-8 lg:px-16 xl:px-24" style={{ minHeight: '100svh' }}>
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-8 text-sm font-semibold text-white">
            🍁 Trusted by Canadian Homeowners &amp; Farmers
          </div>

          {/* Headline */}
          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 leading-none tracking-tight">
            Grass<span className="text-[#C8102E]">hawk</span>
            <br />
            <span className="text-[#C8102E]">KLAW</span>
          </h1>

          <p className="text-2xl font-semibold text-gray-200 mb-3">
            Fast, Safe &amp; Eco-Friendly
          </p>
          <p className="text-lg text-gray-400 mb-10">
            You grow it, we protect it. The professional mole trap for<br className="hidden xl:block" /> Canadian homes, farms, and gardens.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              id="hero-buy-now-desktop"
              className="bg-[#C8102E] text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-[#a50d26] transition-all hover:shadow-[0_8px_24px_rgba(200,16,46,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Buy Now — $29.00 CAD
            </Link>
            <a
              href="#setup-guide"
              id="hero-learn-more"
              className="bg-white/15 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/25 transition-all"
            >
              Learn More
            </a>
            <Link
              href="/contact"
              id="hero-contact-us"
              className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base hover:border-white/60 transition-all"
            >
              Contact Us
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 pt-10 border-t border-white/15">
            {[
              { value: '10,000+', label: 'Moles Caught' },
              { value: '4.8★', label: 'Average Rating' },
              { value: '100%', label: 'Chemical-Free' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs text-gray-400 mt-0.5 font-medium uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
