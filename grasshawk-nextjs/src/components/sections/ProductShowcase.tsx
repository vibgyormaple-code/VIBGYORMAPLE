'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, X, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const specs = [
  { label: 'Price', value: '$29.00 CAD' },
  { label: 'Weight', value: '2.8 lbs' },
  { label: 'Dimensions', value: '5.91" × 5.12" × 11.81"' },
  { label: 'Material', value: 'Heavy-duty galvanized steel' },
  { label: 'Origin', value: 'India' },
  { label: 'Warranty', value: '1 Year Limited (Home Use)' },
  { label: 'Marketed by', value: 'VIBGYOR Maple Inc., AB, CA' },
];

const featureIcons = [
  { src: '/assets/petfriendly.png', label: 'Pet Friendly' },
  { src: '/assets/reusableandecofriendly.png', label: 'Eco-Friendly' },
  { src: '/assets/weatherresistance.png', label: 'Weather Resistant' },
  { src: '/assets/durableandheavyduty.png', label: 'Heavy-Duty' },
];

// Gallery images for the product
const galleryImages = [
  { src: '/assets/new_moletrap.jpg', alt: 'Grasshawk KLAW Mole Trap - Front View' },
  { src: '/assets/moletrap.png', alt: 'Grasshawk KLAW Mole Trap - Diagram' },
  { src: '/assets/trap.png', alt: 'Grasshawk KLAW - Step to Set' },
];

const hotspots = [
  {
    id: 'trigger',
    x: '53%',
    y: '30%',
    title: 'Precision Spring Trigger',
    desc: 'Dual-tension springs snap closed instantly upon direct contact with the target.',
  },
  {
    id: 'steel',
    x: '38%',
    y: '56%',
    title: 'Solid Steel Claws',
    desc: 'Heavy-gauge galvanized steel teeth pierce soil instantly and resist heavy rust.',
  },
  {
    id: 'base',
    x: '55%',
    y: '78%',
    title: 'Wide Anchor Base',
    desc: 'Ground plates prevent shifting or wobble during trap activation.',
  },
];

export default function ProductShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (isHovered || activeHotspot !== null) return;
    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, activeHotspot, activeImg]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12; // 12deg max tilt
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
    setActiveHotspot(null);
  };

  const product = {
    id: 'grasshawk-klaw-001',
    name: 'Grasshawk KLAW Mole Trap',
    price: 29.0,
    image: '/assets/new_moletrap.jpg',
  };

  const handleAddToCart = () => {
    addItem(product);
    setModalOpen(false);
  };

  return (
    <>
      <section id="product" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Product visual with 3D tilt & hotspots */}
            <div
              className="relative cursor-pointer group select-none"
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.01, 1.01, 1.01)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              {/* Main image with cross-fade & scale-expansion premium effects */}
              <div className="aspect-square bg-gradient-to-br from-[#f8f8f8] to-[#efefef] rounded-3xl overflow-hidden flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.10)] group-hover:shadow-[0_16px_60px_rgba(200,16,46,0.15)] transition-shadow duration-500 relative">
                {galleryImages.map((img, i) => (
                  <div
                    key={img.src}
                    className={`absolute inset-0 p-8 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                      activeImg === i
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 600px"
                      priority={i === 0}
                    />
                  </div>
                ))}

                {/* Dynamic Interactive Hotspots */}
                {activeImg === 0 && hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    className="absolute z-20 group/hotspot"
                    style={{ left: spot.x, top: spot.y }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
                    }}
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                  >
                    {/* Ring animation */}
                    <span className="absolute inline-flex h-6 w-6 rounded-full bg-[#C8102E]/40 animate-ping -left-1.5 -top-1.5" />
                    {/* Pin button */}
                    <button
                      className={`relative flex items-center justify-center h-3 w-3 rounded-full shadow-md transition-transform duration-300 group-hover/hotspot:scale-125 ${
                        activeHotspot === spot.id ? 'bg-[#C8102E] scale-125' : 'bg-[#1A1A1A] border border-white'
                      }`}
                      aria-label={`Highlight ${spot.title}`}
                    />

                    {/* Popover / Tooltip */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-2xl border border-gray-100 transition-all duration-300 pointer-events-none ${
                        activeHotspot === spot.id
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                      }`}
                    >
                      <h5 className="font-bold text-[#1A1A1A] text-xs mb-1 uppercase tracking-wider">{spot.title}</h5>
                      <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{spot.desc}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/95" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-3 mt-4 justify-center">
                {galleryImages.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition-all bg-[#f8f8f8] flex items-center justify-center ${
                      activeImg === i ? 'border-[#C8102E] scale-105' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={60}
                      height={60}
                      className="object-contain w-full h-full p-1"
                    />
                  </button>
                ))}
              </div>

              {/* Click hint */}
              <div className="absolute top-4 right-4 bg-[#C8102E] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View Details <ChevronRight size={12} />
              </div>

              {/* Rating badge */}
              <div className="absolute top-4 left-4 bg-white shadow-lg rounded-xl px-3 py-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < 5 ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                  ))}
                  <span className="text-xs font-bold text-[#1A1A1A] ml-1">4.8</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">127 reviews</p>
              </div>
            </div>

            {/* Product info */}
            <div>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                ✓ In Stock — Ships to all Canadian provinces
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-3 leading-tight">
                Grasshawk<br /><span className="text-[#C8102E]">KLAW</span> Mole Trap
              </h2>
              <p className="text-gray-500 text-base mb-6 leading-relaxed">
                The Grasshawk KLAW is a professional-grade, reusable mole trap engineered for Canadian
                conditions. Heavy-duty construction, zero chemicals, and an intuitive 4-step setup make it
                the top choice for homeowners, farmers, and landscape professionals.
              </p>

              {/* Feature icons */}
              <div className="flex flex-wrap gap-3 mb-8">
                {featureIcons.map(({ src, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-[#f8f8f8] rounded-xl px-4 py-2.5">
                    <div className="w-6 h-6 relative flex-shrink-0">
                      <Image src={src} alt={label} fill className="object-contain" />
                    </div>
                    <span className="text-sm font-semibold text-[#1A1A1A]">{label}</span>
                  </div>
                ))}
              </div>

              {/* What's in the Box checklist */}
              <div className="bg-[#f8f8f8] rounded-2xl p-6 mb-6">
                <h4 className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider mb-3">What&apos;s In The Box</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    '1× Grasshawk KLAW™ Professional Mole Trap',
                    '1× Illustrated 4-Step Setup & Placement Guide',
                    '1× VIBGYOR Maple Inc. Warranty Card (1 Year)',
                    '1× Canadian Customer Support Fast-Pass',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-[#C8102E] text-base">✦</span>
                      <span className="font-semibold text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 100% Satisfaction & Canadian Shipping Guarantee Box */}
              <div className="bg-red-50/50 border border-[#C8102E]/10 rounded-2xl p-6 mb-8 flex items-start gap-4">
                <span className="text-2xl mt-0.5">🛡️</span>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-sm mb-1">Grasshawk Canadian Guarantee</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Operated by VIBGYOR Maple Inc. in Alberta. Ships to all Canadian provinces within 2–4 business days. Free shipping on all orders over $100 CAD.
                  </p>
                </div>
              </div>

              {/* Premium single CTA button to Shop Page */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link
                  href="/shop"
                  id="showcase-view-product"
                  className="w-full sm:flex-1 bg-[#C8102E] text-white py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:bg-[#a50d26] transition-all hover:shadow-[0_8px_24px_rgba(200,16,46,0.3)] hover:-translate-y-0.5"
                >
                  Buy Now — $29.00 CAD
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto px-8 py-4 text-center rounded-xl font-bold text-sm border-2 border-gray-200 text-gray-600 hover:border-gray-800 hover:text-[#1A1A1A] transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-bold text-[#1A1A1A] text-lg">Grasshawk KLAW — Full Details</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                id="close-product-modal"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-8">
              {/* Modal image */}
              <div className="relative aspect-square bg-[#f8f8f8] rounded-2xl overflow-hidden">
                <Image
                  src="/assets/new_moletrap.jpg"
                  alt="Grasshawk KLAW Mole Trap"
                  fill
                  className="object-contain p-6"
                />
              </div>

              <div className="space-y-6">
                {/* All specs */}
                <div>
                  <h4 className="font-bold text-[#1A1A1A] mb-3">Specifications</h4>
                  <div className="bg-[#f8f8f8] rounded-xl p-4 space-y-2.5">
                    {specs.map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-semibold text-[#1A1A1A] text-right ml-2">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#1A1A1A] mb-3">Key Features</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      'Durable heavy-duty galvanized steel construction',
                      'Easy 4-step setup — no tools required',
                      'Pet-friendly and child-safe design',
                      'Weather-resistant — works in all Canadian seasons',
                      'Reusable and eco-friendly — no chemicals or poisons',
                      'One Year Home Use Limited Warranty',
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-[#C8102E] font-bold mt-0.5">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleAddToCart}
                  id="modal-add-to-cart"
                  className="w-full bg-[#C8102E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#a50d26] transition-all"
                >
                  <ShoppingCart size={18} />
                  Add to Cart — $29.00 CAD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
