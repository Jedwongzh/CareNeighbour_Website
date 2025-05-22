import type React from "react"
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"
import { LanguageProvider } from "./contexts/LanguageContext";
import { HtmlLangUpdater } from "@/components/HtmlLangUpdater";
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.careneighbour.com'), // Update with your actual domain
  title: {
    default: 'CareNeighbour | Connecting Families with Trusted Local Caregivers',
    template: '%s | CareNeighbour'
  },
  alternates: {
    languages: {
      'en': '/',
      'zh': '/?lang=zh',
    },
  },
  
  keywords: [
    'elderly care', 'caregivers', 'aged care', 'local support', 'Australia', 
    'Monash', 'senior care', 'AI in Care',
    // Chinese keywords
    '老人护理', '照顾者', '年长护理', '本地支持', '澳大利亚', '莫纳什', '长者照顾', '人工智能护理'
  ],
  description: 'CareNeighbour connects you with verified caregivers who understand your language and culture, making finding the right support effortless.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'CareNeighbour',
    title: 'CareNeighbour | Trusted Local Caregivers for Elderly Care',
    description: 'Connect with verified local caregivers who understand your language and culture. Find trusted support for your loved ones.',
    images: [
      {
        url: '/images/CN_Figure2.png', // Create a specific image for social sharing
        width: 1200,
        height: 630,
        alt: 'CareNeighbour - Elderly Care Support Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareNeighbour | Trusted Local Caregivers',
    description: 'Connect with verified local caregivers who understand your language and culture.',
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
        url: '/favicon.png',
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
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <LanguageProvider>
              <HtmlLangUpdater />
              <div className="flex min-h-[100dvh] flex-col bg-white">
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
