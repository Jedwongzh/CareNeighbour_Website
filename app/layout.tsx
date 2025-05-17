import type React from "react"
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'About CareNeighbour | Connecting Families with Local Caregivers',
  description: 'Learn about CareNeighbour, a platform founded by Monash University students to connect families with trusted local caregivers for elderly care and support.',
  openGraph: {
    title: 'About CareNeighbour | Connecting Families with Local Caregivers',
    description: 'Learn about CareNeighbour, a platform founded by Monash University students to connect families with trusted local caregivers for elderly care and support.',
    images: [
      {
        url: '/images/Founding-team-image.jpg',
        width: 800,
        height: 600,
        alt: 'CareNeighbour Founding Team',
      }
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CareNeighbour | Connecting Families with Local Caregivers',
    description: 'Learn about CareNeighbour, a platform founded by Monash University students to connect families with trusted local caregivers for elderly care and support.',
    images: ['/images/Founding-team-image.jpg'],
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
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
