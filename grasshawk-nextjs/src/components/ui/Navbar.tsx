'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Phone, Mail } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#C8102E] text-white text-xs py-1.5 px-4 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Phone size={11} /> +1 639 590 9729</span>
          <span className="flex items-center gap-1"><Mail size={11} /> contact.grasshawk@gmail.com</span>
        </div>
        <span className="font-medium">🍁 Made for Canada · VIBGYOR Maple Inc.</span>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/assets/logo.png"
                  alt="Grasshawk Logo"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  sizes="40px"
                />
              </div>
              <div>
                <div className="font-black text-[#1A1A1A] leading-tight text-lg tracking-tight">
                  Grasshawk
                </div>
                <div className="text-[#C8102E] text-xs font-semibold tracking-widest uppercase leading-tight">
                  KLAW
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-[#1A1A1A] hover:text-[#C8102E] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C8102E] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/cart"
                id="nav-cart-btn"
                className="relative p-2 rounded-lg hover:bg-[#f8f8f8] transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={22} className="text-[#1A1A1A]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8102E] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>



              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-[#f8f8f8] transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                id="mobile-menu-btn"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? 'max-h-80 border-t border-gray-100' : 'max-h-0'
          }`}
        >
          <div className="bg-white px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-4 text-[#1A1A1A] font-semibold hover:bg-[#f8f8f8] hover:text-[#C8102E] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}

          </div>
        </div>
      </nav>
    </>
  );
}
