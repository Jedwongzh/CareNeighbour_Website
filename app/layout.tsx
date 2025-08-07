import type React from "react"
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"
import { LanguageProvider } from "./contexts/LanguageContext";
import { HtmlLangUpdater } from "@/components/HtmlLangUpdater";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

// Lazy load GradientBackground for better performance
const GradientBackground = dynamic(() => import("@/components/GradientBackground"), {
  ssr: false, // Client-side only for performance
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-purple-50 to-violet-100 -z-10" />
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.careneighbour.com'), // Update with your actual domain
  title: {
    default: 'CareNeighbour | AI-Powered Instant Care Sourcing Platform',
    template: '%s | CareNeighbour'
  },
  alternates: {
    languages: {
      'en': '/',
      'zh': '/?lang=zh',
    },
  },

  keywords: [
    // Primary English keywords
    'CareNeighbour', 'Care Neighbour', 'care platform', 'AI care', 'instant care matching',
    'caregivers Australia', 'elderly care', 'aged care', 'senior care', 'home care',
    'local caregivers', 'trusted care', 'on-demand care', 'care services',
    // Location-specific
    'care Melbourne', 'care Sydney', 'care Brisbane', 'care Perth', 'care Adelaide',
    'Australian care platform', 'Monash care research',
    // Technology keywords
    'AI-powered care', 'instant care', 'care matching', 'multilingual care',
    // Chinese keywords
    '零距', '邻里关怀', '澳洲护理', '人工智能护理', '即时护理', '长者照顾'
  ],
  description: 'CareNeighbour is a new, AI-powered care sourcing platform that instantly connects you with trusted, local caregivers. Find care for your neighbour or family member in seconds, with instant matching and multilingual support.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'CareNeighbour',
    title: 'CareNeighbour | AI-Powered Instant Care Sourcing Platform',
    description: 'Discover CareNeighbour, the new AI-powered platform for instant care matching. Find trusted, local caregivers in seconds.',
    images: [
      {
        url: '/images/CN_Figure2.png', // Create a specific image for social sharing
        width: 1200,
        height: 630,
        alt: 'CareNeighbour - AI-Powered Instant Care Sourcing Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareNeighbour | AI-Powered Instant Care Sourcing',
    description: 'Find care instantly with CareNeighbour, the new AI-powered care sourcing platform.',
    site: '@careneighbour',
    images: ['/images/CN_Figure2.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/CN_Figure2.png',
        type: 'image/png',
      }
    ],
    apple: '/apple-touch-icon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/CN_Figure2.png" type="image/png" sizes="64x64" />
        <link rel="icon" href="/images/CN_Figure2.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/images/CN_Figure2.png" sizes="180x180" />
      </head>
      <GoogleAnalytics gaId={process.env.GA4_ID} />
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Optimized JSON-LD with essential data only */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CareNeighbour",
              "url": "https://www.careneighbour.com",
              "logo": "https://www.careneighbour.com/images/CN_Figure2.png",
              "description": "AI-powered instant care sourcing platform for trusted, local care matching.",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "careneighbour.team@gmail.com"
              }
            })
          }}
        />
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <LanguageProvider>
              <Suspense fallback={null}>
                <HtmlLangUpdater />
              </Suspense>
              <div className="flex min-h-[100dvh] flex-col relative">
                <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-br from-purple-50 to-violet-100 -z-10" />}>
                  <GradientBackground />
                </Suspense>
                {children}
              </div>
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
