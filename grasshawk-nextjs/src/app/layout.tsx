import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Grasshawk KLAW — Fast, Safe & Eco-Friendly Mole Trap | Canada',
    template: '%s | Grasshawk KLAW',
  },
  description:
    'The Grasshawk KLAW mole trap — professional-grade, pet-friendly, chemical-free mole control for Canadian homeowners, farms, and gardens. $29 CAD. Ships across Canada.',
  keywords: [
    'mole trap', 'mole catcher', 'mole control', 'Canada mole trap',
    'Grasshawk KLAW', 'VIBGYOR Maple', 'eco-friendly mole trap',
    'pet safe mole trap', 'garden pest control Canada',
  ],
  authors: [{ name: 'VIBGYOR Maple Inc.' }],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://www.grasshawkca.com',
    siteName: 'Grasshawk KLAW',
    title: 'Grasshawk KLAW — Fast, Safe & Eco-Friendly Mole Trap',
    description: 'Professional mole trap for Canadian homeowners. Pet-friendly, chemical-free, $29 CAD.',
    images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630, alt: 'Grasshawk KLAW Mole Trap' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grasshawk KLAW — Mole Trap Canada',
    description: 'Fast, Safe & Eco-Friendly mole control. $29 CAD. Free shipping over $100.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.grasshawkca.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'Grasshawk KLAW Mole Trap',
              description: 'Professional-grade, eco-friendly mole trap. Pet-safe, chemical-free, reusable.',
              brand: { '@type': 'Brand', name: 'Grasshawk' },
              manufacturer: { '@type': 'Organization', name: 'VIBGYOR Maple Inc.' },
              offers: {
                '@type': 'Offer',
                priceCurrency: 'CAD',
                price: '29.00',
                availability: 'https://schema.org/InStock',
                url: 'https://www.grasshawkca.com/shop',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '127',
              },
            }),
          }}
        />
      </head>
      <body className="font-inter bg-[#F8F8F8] text-[#1A1A1A] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
