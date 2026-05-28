import type { Metadata } from "next";
import { Be_Vietnam_Pro, Source_Serif_4 } from "next/font/google";
import { getThemeCssBlock } from "@/color";
import { getFontCssBlock } from "@/font";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cv } from "@/resume";
import { DEFAULT_AVATAR_SRC } from "@/avatar";
import { isSearchIndexingAllowed } from "@/config";
import { buildPersonJsonLd } from "@/lib/seo";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  weight: ["400", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-dm-sans", // khớp fonts.sans.variable trong src/font.ts
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const sourceSerif = Source_Serif_4({
  weight: ["400", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif", // khớp fonts.serif.variable trong src/font.ts
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const siteBaseUrl = cv.meta.siteUrl ? (() => {
  try {
    return new URL(cv.meta.siteUrl);
  } catch {
    return undefined;
  }
})() : undefined;

export const metadata: Metadata = {
  title: cv.meta.siteTitle,
  description: cv.meta.description,
  metadataBase: siteBaseUrl,
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
  robots: isSearchIndexingAllowed()
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true,
        nosnippet: true,
        noimageindex: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          noarchive: true,
          nosnippet: true,
          "max-image-preview": "none",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
  icons: {
    icon: DEFAULT_AVATAR_SRC,
    shortcut: DEFAULT_AVATAR_SRC,
    apple: DEFAULT_AVATAR_SRC,
  },
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
        {isSearchIndexingAllowed() && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        )}
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
