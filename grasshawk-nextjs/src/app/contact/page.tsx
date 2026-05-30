import type { Metadata } from 'next';
import LeadForm from '@/components/ui/LeadForm';
import { Phone, Mail, Globe, MessageCircle, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — Grasshawk KLAW',
  description: 'Get in touch with VIBGYOR Maple Inc. for product inquiries, distributor partnerships, and support.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#2d0a12] text-white py-20 px-4 text-center">
        <span className="inline-block bg-[#C8102E]/20 border border-[#C8102E]/30 rounded-full px-4 py-1.5 text-sm font-semibold text-[#ff8099] mb-5">
          We're here to help
        </span>
        <h1 className="text-5xl font-black mb-4">Contact Us</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Whether you have a product question, want to become a distributor, or just want to say hello —
          we'd love to hear from you.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-6">Send Us a Message</h2>
            <LeadForm />
          </div>

          {/* Contact details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Get in Touch Directly</h2>

            {/* Contact cards */}
            <div className="grid gap-4">
              {[
                {
                  icon: Phone,
                  title: 'Phone',
                  value: '+1 639 590 9729',
                  href: 'tel:+16395909729',
                  sub: 'Mon–Fri, 9am–5pm MST',
                  color: 'text-blue-600',
                  bg: 'bg-blue-50',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  value: 'contact.grasshawk@gmail.com',
                  href: 'mailto:contact.grasshawk@gmail.com',
                  sub: 'Response within 24–48 hours',
                  color: 'text-purple-600',
                  bg: 'bg-purple-50',
                },
                {
                  icon: MessageCircle,
                  title: 'WhatsApp',
                  value: '+1 639 590 9729',
                  href: 'https://wa.me/16395909729',
                  sub: 'Quick responses on WhatsApp',
                  color: 'text-green-600',
                  bg: 'bg-green-50',
                },
                {
                  icon: Globe,
                  title: 'Website',
                  value: 'www.grasshawkca.com',
                  href: 'https://www.grasshawkca.com',
                  sub: 'Official product website',
                  color: 'text-[#C8102E]',
                  bg: 'bg-[#C8102E]/5',
                },
              ].map(({ icon: Icon, title, value, href, sub, color, bg }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  id={`contact-${title.toLowerCase()}`}
                  className={`flex items-start gap-4 p-5 ${bg} rounded-2xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
                >
                  <div className={`w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <Icon size={20} className={color} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">{title}</p>
                    <p className={`font-bold ${color} text-sm`}>{value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Business info card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h3 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-[#C8102E]" />
                Business Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-0.5">Company</p>
                  <p className="font-semibold text-[#1A1A1A]">VIBGYOR Maple Inc.</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-0.5">Location</p>
                  <p className="font-semibold text-[#1A1A1A]">Alberta, Canada 🍁</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-0.5">Support Email</p>
                  <a href="mailto:support.grasshawk@vibgormaple.com" className="font-semibold text-[#C8102E] hover:underline">
                    support.grasshawk@vibgormaple.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-400 pt-2 border-t border-gray-100">
                  <Clock size={13} />
                  <span className="text-xs">Business Hours: Monday to Friday, 9:00 AM – 5:00 PM MST</span>
                </div>
              </div>
            </div>

            {/* Inquiry type hint */}
            <div className="bg-gradient-to-r from-[#C8102E] to-[#a50d26] rounded-2xl p-6 text-white">
              <h4 className="font-bold mb-3">What can we help with?</h4>
              <ul className="space-y-2 text-sm text-white/80">
                {['Distributor & reseller partnerships', 'Bulk order pricing', 'Product demonstrations', 'Technical support & warranty claims', 'General product inquiries'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-white font-bold">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
