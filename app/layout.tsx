import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#420600',
};

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Chef's Cake World | Handcrafted Luxury Cakes & Celebration Desserts",
  description:
    "Chef's Cake World delivers artisan handcrafted celebration cakes across Kerala (Attingal, Kazhakootam). Order custom designer birthday cakes, tiered wedding masterworks, and 100% eggless delights.",
  keywords: "cake shop Kerala, bakery Attingal, cake delivery Kazhakootam, custom cakes Kerala, birthday cake, wedding cake, eggless cakes, Chef's Cake World",
  metadataBase: new URL('https://www.chefscakeworld.com'),
  icons: {
    icon: '/logo/chefcake.png',
    apple: '/logo/chefcake.png',
  },
  openGraph: {
    title: "Chef's Cake World | Handcrafted Luxury Celebration Cakes",
    description: "Premium handcrafted cakes baked with pure Belgian couverture chocolate and fresh artisan ingredients.",
    url: 'https://www.chefscakeworld.com',
    siteName: "Chef's Cake World",
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable} overflow-x-hidden max-w-full font-sans`}>
      <body className="min-h-screen flex flex-col bg-brand-cream text-brand-chocolate antialiased selection:bg-brand-caramel selection:text-white overflow-x-hidden max-w-full relative">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow overflow-x-hidden max-w-full">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

