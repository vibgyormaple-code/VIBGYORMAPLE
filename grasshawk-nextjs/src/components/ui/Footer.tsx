'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Globe, MapPin, ExternalLink, Share2, MessageCircle } from 'lucide-react';


const footerLinks = {
  Company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Shop', href: '/shop' },
    { label: 'Contact', href: '/contact' },
  ],
  Products: [
    { label: 'Grasshawk KLAW', href: '/shop' },
    { label: 'Add to Cart', href: '/cart' },
    { label: 'Checkout', href: '/checkout' },
  ],
  Support: [
    { label: 'How to Use', href: '/#setup-guide' },
    { label: 'Warranty Info', href: '/about#warranty' },
    { label: 'Distributor Inquiry', href: '/contact' },
    { label: 'Bulk Orders', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/assets/logo.png"
                  alt="Grasshawk Logo"
                  fill
                  className="object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                  sizes="40px"
                />
              </div>
              <div>
                <div className="font-black text-white leading-tight text-lg">Grasshawk</div>
                <div className="text-[#C8102E] text-xs font-semibold tracking-widest uppercase">KLAW</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Fast, Safe &amp; Eco-Friendly mole control for Canadian homeowners, farmers,
              and landscapers. No chemicals. No poisons. Just results.
            </p>
            <p className="text-xs text-gray-500 mb-4 italic">
              &quot;You grow it, we protect it.&quot;
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm">
              <a href="tel:+16395909729" className="flex items-center gap-2 text-gray-400 hover:text-[#C8102E] transition-colors">
                <Phone size={14} /> +1 639 590 9729
              </a>
              <a href="mailto:contact.grasshawk@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-[#C8102E] transition-colors">
                <Mail size={14} /> contact.grasshawk@gmail.com
              </a>
              <a href="https://www.grasshawkca.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#C8102E] transition-colors">
                <Globe size={14} /> www.grasshawkca.com
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>Vibgyor Maple Inc., Calgary, AB, Canada<br />GST: 767786213RT0001</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Share2, label: 'Instagram', href: '#' },
                { icon: ExternalLink, label: 'Facebook', href: '#' },
                { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/16395909729' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#C8102E] transition-all duration-200 hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#C8102E] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Vibgyor Maple Inc. All rights reserved. Grasshawk™ &amp; Grasshawk KLAW™</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">Made in India | Marketed in Canada <MapPin size={14} className="text-[#C8102E]" /></span>
            <span>·</span>
            <Link href="/about" className="hover:text-[#C8102E] transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
