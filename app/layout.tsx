import type React from "react"
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"
import { LanguageProvider } from "./contexts/LanguageContext";
import { HtmlLangUpdater } from "@/components/HtmlLangUpdater";
import { Suspense } from "react";
import GradientBackground from "@/components/GradientBackground";

const inter = Inter({ subsets: ["latin"] })

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
    'CareNeighbour', 'Care Neighbour', 'Care a neighbour', 'Care neighbour', 'Care for neighbour', 'neighbour care', 'care for a neighbour',
    'elderly care', 'caregivers', 'aged care', 'local support', 'Australia', 'Monash', 'senior care', 'AI in Care',
    'AI-powered care', 'instant care', 'on-demand care', 'find care now', 'new care sourcing platform', 'AI care platform', 'AI caregiver', 'AI matching', 'culturally sensitive care', 'multilingual care',
    // Chinese keywords
    '零距', '邻里关怀', '邻居关怀', '关怀邻居',
    '老人护理', '照顾者', '年长护理', '本地支持', '澳大利亚', '莫纳什', '长者照顾', '人工智能护理'
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
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "CareNeighbour",
                  "url": "https://www.careneighbour.com",
                  "logo": "https://www.careneighbour.com/images/CN_Figure2.png",
                  "sameAs": [],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "Customer Service",
                    "email": "careneighbour.team@gmail.com"
                  },
                  "description": "CareNeighbour is a new, AI-powered care sourcing platform for instant, trusted care matching."
                },
                {
                  "@type": "WebSite",
                  "url": "https://www.careneighbour.com/",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.careneighbour.com/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  },
                  "about": "AI-powered instant care sourcing platform."
                },
                {
                  "@type": "WebPage",
                  "name": "CareNeighbour Home",
                  "url": "https://www.careneighbour.com/",
                  "description": "CareNeighbour is a new, AI-powered care sourcing platform for instant, trusted care matching.",
                  "isPartOf": { "@id": "https://www.careneighbour.com/" }
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": ["How It Works", "Our Approach", "Care Services", "Join Waitlist", "About Us"],
                  "url": [
                    "https://www.careneighbour.com/#how-it-works",
                    "https://www.careneighbour.com/#our-approach",
                    "https://www.careneighbour.com/services",
                    "https://www.careneighbour.com/#waitlist",
                    "https://www.careneighbour.com/about"
                  ]
                }
              ]
            })
          }}
        />
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <LanguageProvider>
              <HtmlLangUpdater />
              <div className="flex min-h-[100dvh] flex-col">
              <GradientBackground />
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
