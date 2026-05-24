import type { Metadata } from "next";
import { Be_Vietnam_Pro, Source_Serif_4 } from "next/font/google";
import { getThemeCssBlock } from "@/color/theme";
import { getFontCssBlock } from "@/font/config";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cv } from "@/data/cv";
import { buildPersonJsonLd } from "@/lib/seo";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-dm-sans", // khớp fonts.sans.variable trong src/font/config.ts
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif", // khớp fonts.serif.variable trong src/font/config.ts
  display: "swap",
});

export const metadata: Metadata = {
  title: cv.meta.siteTitle,
  description: cv.meta.description,
  metadataBase: cv.meta.siteUrl ? new URL(cv.meta.siteUrl) : undefined,
  openGraph: {
    title: cv.meta.siteTitle,
    description: cv.meta.description,
    type: "website",
    url: cv.meta.siteUrl,
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: cv.meta.siteTitle,
    description: cv.meta.description,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = buildPersonJsonLd({
  name: cv.personal.fullName,
  jobTitle: cv.personal.title,
  email: cv.contact.find((c) => c.icon === "email")?.label,
  url: cv.meta.siteUrl,
  address: cv.personal.location,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${getThemeCssBlock()}\n${getFontCssBlock()}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
