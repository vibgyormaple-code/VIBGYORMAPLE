'use client';

import Image from 'next/image';
import Link from 'next/link';

const steps = [
  {
    step: 1,
    image: '/assets/instruction-1.png',
    title: 'Locate the Active Tunnel',
    description:
      'Press down on the soil to find an active mole tunnel. Check after 24 hours — if it pops back up, the tunnel is active and ready for the trap.',
  },
  {
    step: 2,
    image: '/assets/instruction-2.png',
    title: 'Prepare & Insert Trap',
    description:
      'Dig a small opening in the mole tunnel. Insert the KLAW trap into the opening, ensuring it sits flush with the tunnel walls.',
  },
  {
    step: 3,
    image: '/assets/instruction-3.png',
    title: 'Set the Mechanism',
    description:
      'Press down firmly on the trigger to set the spring mechanism. Ensure it is properly engaged and locked in place before stepping away.',
  },
  {
    step: 4,
    image: '/assets/instruction-4.png',
    title: 'Monitor & Remove',
    description:
      'Check the trap daily. Once a mole is captured, remove it safely and reset or relocate the KLAW trap as needed.',
  },
];

export default function SetupGuide() {
  return (
    <section id="setup-guide" className="py-20 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Easy Setup
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4">
            4 Simple Steps to<br className="hidden md:block" /> a Mole-Free Lawn
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            No expertise needed. Set up your Grasshawk KLAW in minutes and let it do the work.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div key={step.step} className="relative flex flex-col items-center text-center group">
              {/* Connector arrow between steps (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-[72px] left-[calc(50%+80px)] right-[calc(-50%+80px)] items-center justify-center z-10 pointer-events-none">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-[#C8102E]/40 to-[#C8102E]/10" />
                  <span className="text-[#C8102E]/40 text-xs ml-1">›</span>
                </div>
              )}

              {/* Step number badge */}
              <div className="w-8 h-8 bg-[#C8102E] text-white rounded-full flex items-center justify-center text-sm font-black mb-4 shadow-md shadow-[#C8102E]/30">
                {step.step}
              </div>

              {/* Instruction image in card */}
              <div className="w-full bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden mb-4 group-hover:shadow-[0_8px_30px_rgba(200,16,46,0.12)] transition-all duration-300 group-hover:-translate-y-1">
                <div className="relative h-44 bg-white flex items-center justify-center p-4">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain p-5"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                {/* Step label bar */}
                <div className="bg-[#C8102E]/5 border-t border-[#C8102E]/10 px-4 py-3">
                  <h3 className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#C8102E] transition-colors">
                    {step.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed px-2">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">Ready to get started?</p>
          <Link
            href="/shop"
            className="inline-flex bg-[#C8102E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#a50d26] transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Order Grasshawk KLAW — $29.00 CAD
          </Link>
        </div>
      </div>
    </section>
  );
}
