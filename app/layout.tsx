import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdSenseLoader from './components/AdSenseLoader';
import CookieConsentBanner from './components/CookieConsentBanner';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Arrow Out - Free Online Browser Game",
    template: "%s | Arrow Out",
  },
  description:
    "Play Arrow Out free online in your browser. No download, no account, and simple controls.",
  keywords: [
    "Arrow Out",
    "Arrow Out online",
    "Arrow Out free",
    "free online game",
    "browser game",
    "casual game",
  ],
  authors: [{ name: "Arrow Out Team" }],
  creator: "Arrow Out",
  publisher: "Arrow Out",
  metadataBase: new URL("https://arrowout.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Arrow Out",
    title: "Arrow Out - Free Online Browser Game",
    description:
      "Play Arrow Out free in your browser with no download or account required.",
    url: "https://arrowout.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arrow Out - Free Online Browser Game",
    description:
      "Play Arrow Out free online with no download or account required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function getPublisherId() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!raw) return '';
  return raw.startsWith('ca-pub-') ? raw : `ca-pub-${raw}`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publisherId = getPublisherId();

  return (
    <html lang="en">
        <head>
        <AdSenseLoader publisherId={publisherId} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Arrow Out",
              url: "https://arrowout.org",
              description:
                "Play Arrow Out free online with no download or account required.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://arrowout.org/blog?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arrow Out",
              url: "https://arrowout.org",
              logo: {
                "@type": "ImageObject",
                url: "https://arrowout.org/og-image.png",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: "https://arrowout.org/contact",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
