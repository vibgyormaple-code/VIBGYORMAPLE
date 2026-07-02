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
    default: 'Vibgyor Maple — #1 Mole Claws in Canada | Grasshawk KLAW',
    template: '%s | Vibgyor Maple',
  },
  description:
    'Looking for the best mole claws in Canada? The Grasshawk KLAW mole trap features heavy-duty steel claws for fast, chemical-free mole control. Ships across Canada.',
  keywords: [
    'claws in Canada', 'mole claws in Canada', 'best mole claws Canada',
    'steel mole claws', 'Grasshawk KLAW', 'VIBGYOR Maple', 'mole trap Canada',
    'eco-friendly mole trap', 'pet safe mole trap', 'heavy duty claws',
  ],
  authors: [{ name: 'VIBGYOR Maple Inc.' }],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://www.vibgyormaple.com',
    siteName: 'Vibgyor Maple',
    title: 'Vibgyor Maple — #1 Mole Claws in Canada',
    description: 'Looking for the best mole claws in Canada? Heavy-duty steel claws for fast, pet-friendly mole control. $35.35 CAD.',
    images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630, alt: 'Grasshawk KLAW Mole Claws' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibgyor Maple — Mole Claws Canada',
    description: 'Heavy-duty steel claws for fast, chemical-free mole control in Canada. $35.35 CAD.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.vibgyormaple.com' },
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
                price: '35.35',
                availability: 'https://schema.org/InStock',
                url: 'https://www.vibgyormaple.com/shop',
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
