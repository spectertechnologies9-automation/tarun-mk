import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { site } from "@/config/site";
import { ventures } from "@/data/ventures";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#07080b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sameAs = [site.socials.linkedin, site.socials.github, site.socials.instagram].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Technology Entrepreneur",
    description: site.description,
    telephone: site.contact.phoneE164,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    worksFor: ventures.map((v) => ({
      "@type": "Organization",
      name: v.name,
      ...(v.website ? { url: v.website } : {}),
    })),
  };

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-white px-4 py-2 text-sm font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Cursor />
          <Loader />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
