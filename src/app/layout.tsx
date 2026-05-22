import type { Metadata } from "next";
import { Be_Vietnam_Pro, Source_Serif_4 } from "next/font/google";
import { cv } from "@/data/cv";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: cv.meta.siteTitle,
  description: cv.meta.description,
  openGraph: {
    title: cv.meta.siteTitle,
    description: cv.meta.description,
    type: "website",
    url: cv.meta.siteUrl,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={cv.personal.locale} className={`${beVietnam.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
