'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Shield, Leaf, Droplets, Weight, Star, MapPin, Check, Rocket } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const product = {
  id: 'grasshawk-klaw-001',
  name: 'Grasshawk KLAW Mole Trap',
  price: 29.0,
  image: '/assets/new_moletrap.jpg',
  rating: 4.8,
  reviews: 127,
  badge: 'Best Seller',
  description: 'Professional-grade, reusable mole trap for Canadian homeowners, farms, and gardens. Chemical-free and pet-safe.',
};

const specs = [
  { label: 'Price', value: '$29.00 CAD' },
  { label: 'Weight', value: '2.8 lbs (1.27 kg)' },
  { label: 'Dimensions', value: '5.91" × 5.12" × 11.81"' },
  { label: 'Material', value: 'Heavy-duty galvanized steel' },
  { label: 'Country of Origin', value: 'India' },
  { label: 'Marketed by', value: 'VIBGYOR Maple Inc., AB, CA' },
  { label: 'Warranty', value: 'One Year Home Use Limited' },
  { label: 'Chemicals Required', value: 'None — 100% chemical-free' },
];

const featureIcons = [
  { src: '/assets/petfriendly.png', icon: Shield, text: 'Pet Friendly & Child Safe' },
  { src: '/assets/reusableandecofriendly.png', icon: Leaf, text: 'Eco-Friendly & Reusable' },
  { src: '/assets/weatherresistance.png', icon: Droplets, text: 'All-Season Weather Resistant' },
  { src: '/assets/durableandheavyduty.png', icon: Weight, text: 'Heavy-Duty Construction' },
];

// Gallery images
const galleryImages = [
  { src: '/assets/new_moletrap.jpg', alt: 'Grasshawk KLAW - Product View' },
  { src: '/assets/moletrap.png', alt: 'Grasshawk KLAW - Technical Drawing' },
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

export default function ShopPage() {
  const [selectedTab, setSelectedTab] = useState<'description' | 'specs' | 'shipping'>('description');
  const [activeImg, setActiveImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

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

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#C8102E]">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/shop" className="hover:text-[#C8102E]">Shop</Link>
          <span className="mx-2">›</span>
          <span className="text-[#1A1A1A] font-medium">Grasshawk KLAW</span>
        </nav>
      </div>

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A]">Shop</h1>
        <p className="text-gray-500 mt-1 flex items-center gap-1">Grasshawk KLAW Mole Trap — Ships across Canada <MapPin size={16} className="text-[#C8102E]" /></p>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-3xl shadow-[0_2px_24px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image panel with interactive tilt & hotspots */}
            <div className="bg-gradient-to-br from-[#f8f8f8] to-[#efefef] p-8 lg:p-12 flex flex-col items-center justify-center min-h-[420px]">
              <span className="self-start bg-[#C8102E] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                {product.badge}
              </span>

              {/* Main image with cross-fade & scale-expansion premium effects */}
              <div 
                className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden flex items-center justify-center bg-white shadow-sm group select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.01, 1.01, 1.01)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                {galleryImages.map((img, i) => (
                  <div
                    key={img.src}
                    className={`absolute inset-0 p-6 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                      activeImg === i
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 500px"
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

              {/* Thumbnails */}
              <div className="flex gap-3 mt-5">
                {galleryImages.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-white transition-all ${
                      activeImg === i ? 'border-[#C8102E] scale-105 shadow-md' : 'border-gray-200 hover:border-gray-400'
                    }`}
                    aria-label={img.alt}
                  >
                    <div className="relative w-full h-full">
                      <Image src={img.src} alt={img.alt} fill className="object-contain p-1.5" sizes="64px" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <span className="text-sm font-bold">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
              </div>

              <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">{product.name}</h2>
              <p className="text-gray-500 mb-6 leading-relaxed">{product.description}</p>

              {/* Feature pills with actual icons */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                {featureIcons.map(({ src, text }) => (
                  <div key={text} className="flex items-center gap-2 bg-[#f8f8f8] rounded-lg px-3 py-2 text-xs font-semibold text-[#1A1A1A]">
                    <div className="relative w-5 h-5 flex-shrink-0">
                      <Image src={src} alt={text} fill className="object-contain" sizes="20px" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black text-[#C8102E]">$29.00</span>
                <span className="text-lg text-gray-400">CAD</span>
              </div>
              <p className="text-xs text-gray-400 mb-6">
                + Shipping ($9.99) · <strong className="text-green-600">Free shipping on orders over $100</strong>
              </p>

              {/* Stock badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-green-600">In Stock — Ships within 2–4 business days</span>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <button
                  id="shop-add-to-cart"
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'bg-[#C8102E] text-white hover:bg-[#a50d26] hover:shadow-[0_8px_24px_rgba(200,16,46,0.3)] hover:-translate-y-0.5'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {added ? <span className="flex items-center gap-1"><Check size={18} /> Added to Cart!</span> : 'Add to Cart'}
                </button>
                <Link
                  href="/cart"
                  className="px-6 py-4 rounded-xl font-bold text-sm border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all flex items-center"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-100 px-8 lg:px-12">
            <div className="flex gap-8 border-b border-gray-100">
              {(['description', 'specs', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  id={`shop-tab-${tab}`}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 text-sm font-bold capitalize border-b-2 transition-colors ${
                    selectedTab === tab
                      ? 'border-[#C8102E] text-[#C8102E]'
                      : 'border-transparent text-gray-400 hover:text-[#1A1A1A]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="py-8">
              {selectedTab === 'description' && (
                <div className="max-w-2xl space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>
                    The <strong>Grasshawk KLAW</strong> is a professional-grade mole trap engineered for reliability
                    and ease of use. Unlike traditional traps that require dangerous chemicals or complex setups,
                    KLAW works through a precision-engineered mechanical mechanism that safely and effectively captures moles.
                  </p>
                  <p>
                    Constructed from heavy-duty galvanized steel, KLAW is built to withstand harsh Canadian weather —
                    from summer heat to winter frost. Its compact, weather-sealed design ensures consistent performance
                    all year long.
                  </p>
                  <h4 className="font-bold text-[#1A1A1A] text-base mt-4">Key Benefits</h4>
                  <ul className="space-y-1.5">
                    {[
                      'No chemicals or poisons — completely eco-friendly',
                      'Pet-safe and child-friendly design',
                      'Reusable season after season',
                      'Easy 4-step setup with no tools required',
                      'Works in all Canadian weather conditions',
                      'Backed by a 1-year limited warranty',
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check size={16} className="text-[#C8102E] mt-0.5 flex-shrink-0" /> <span className="flex-1">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Instruction image strip inside description */}
                  <div className="grid grid-cols-4 gap-3 mt-6 pt-4 border-t border-gray-100">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="text-center">
                        <div className="relative aspect-square bg-[#f8f8f8] rounded-xl overflow-hidden mb-2">
                          <Image
                            src={`/assets/instruction-${n}.png`}
                            alt={`Step ${n}`}
                            fill
                            className="object-contain p-2"
                            sizes="100px"
                          />
                        </div>
                        <p className="text-xs text-gray-400 font-medium">Step {n}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'specs' && (
                <div className="max-w-lg">
                  <table className="w-full text-sm">
                    <tbody>
                      {specs.map(({ label, value }, i) => (
                        <tr key={label} className={i % 2 === 0 ? 'bg-[#f8f8f8]' : 'bg-white'}>
                          <td className="py-3 px-4 font-semibold text-gray-500 rounded-l-lg">{label}</td>
                          <td className="py-3 px-4 font-bold text-[#1A1A1A] rounded-r-lg">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedTab === 'shipping' && (
                <div className="space-y-4 text-sm text-gray-600 max-w-lg">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="font-bold text-green-700 mb-1 flex items-center gap-1.5"><Rocket size={16} /> Free Shipping on Orders Over $100</p>
                    <p>Order 4+ units to qualify for free shipping to any Canadian province.</p>
                  </div>
                  <div className="space-y-2">
                    {[
                      ['Standard Shipping', '$9.99 CAD · 5–8 business days'],
                      ['Expedited Shipping', '$19.99 CAD · 2–3 business days'],
                      ['Delivery Areas', 'All Canadian provinces and territories'],
                      ['Order Processing', 'Ships within 1–2 business days'],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-semibold text-gray-500">{label}</span>
                        <span className="text-[#1A1A1A] font-medium text-right max-w-[60%]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
