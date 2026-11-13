import type { Metadata, Viewport } from "next";
import { Caprasimo, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Caprasimo({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Sugar & Crumb | Cut the first slice",
  description: "Baked to order, small batches, fresh across the city. Pick a flavour and cut the first slice.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
