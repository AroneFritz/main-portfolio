import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LoadingProvider } from "@/components/providers/loading-provider";
import { Analytics } from "@vercel/analytics/react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-progress";
import { CursorFollower } from "@/components/ui/cursor-follower";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'),
  title: "Arone Fritz - Web Stack Developer",
  description: "Professional portfolio showcasing modern web development projects and expertise in React, Next.js, TypeScript, and more.",
  keywords: ["developer", "portfolio", "react", "nextjs", "typescript", "web stack"],
  authors: [{ name: "Arone Fritz" }],
  creator: "Arone Fritz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Arone Fritz - Web Stack Developer",
    description: "Professional portfolio showcasing modern web development projects and expertise.",
    siteName: "Arone Fritz Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arone Fritz - Web Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arone Fritz - Web Stack Developer",
    description: "Professional portfolio showcasing modern web development projects and expertise.",
    images: ["/og-image.jpg"],
    creator: "@yourusername",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent flash of content before React loads
              (function() {
                document.documentElement.style.visibility = 'hidden';
                document.addEventListener('DOMContentLoaded', function() {
                  // Add a small delay to ensure React has time to mount
                  setTimeout(function() {
                    if (!document.body.classList.contains('hydrated')) {
                      document.documentElement.style.visibility = 'visible';
                    }
                  }, 100);
                });
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <ScrollProgress />
            <CursorFollower />
            {children}
            <ScrollToTop />
            <Analytics />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
