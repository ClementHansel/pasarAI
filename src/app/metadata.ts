import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PasarAI - Your Local Produce Export Marketplace",
  description:
    "PasarAI is the leading marketplace for exporting local produce, connecting local sellers with global buyers. Find fresh, quality products and expand your business internationally.",
  keywords: [
    "marketplace",
    "local produce",
    "export",
    "import",
    "fresh products",
    "global trade",
    "ecommerce",
    "local sellers",
    "international trade",
  ],
  authors: [{ name: "PasarAI Team" }],
  creator: "PasarAI",
  publisher: "PasarAI",
  metadataBase: new URL("https://pasarai.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "id-ID": "/id-ID",
    },
  },
  openGraph: {
    title: "PasarAI - Connect with Global Markets",
    description:
      "Join PasarAI to export your local produce to international markets. Connect with buyers worldwide and grow your business.",
    url: "https://pasarai.com",
    siteName: "PasarAI",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "PasarAI Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PasarAI - Global Marketplace for Local Produce",
    description:
      "Connect with international buyers and sellers. Export your local produce globally with PasarAI.",
    images: ["/images/hero-bg.jpg"],
    creator: "@pasarai",
    creatorId: "1467726470533754880",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "facebook-domain-verification": "your-facebook-verification-code",
    },
  },
};
