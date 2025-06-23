import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Care Services | AI-Powered Instant Care Sourcing | CareNeighbour",
  description: "Discover our AI-powered, instant care sourcing platform. Comprehensive, culturally-sensitive care services including social support, personal care, professional nursing, and allied health services. Available in English, Mandarin, and Cantonese.",
  keywords: "CareNeighbour services, Care Neighbour, AI-powered care, instant care, instant care platform, Care a neighbour services, Care neighbour services, care for neighbour, neighbour care services, care services, cultural care, multilingual care, NDIS, aged care, nursing, allied health, Chinese care services, Mandarin care, Cantonese care, new care sourcing platform, AI care platform, AI caregiver, AI matching",
  openGraph: {
    title: "Our Care Services | AI-Powered Instant Care Sourcing | CareNeighbour",
    description: "Explore our new, AI-powered care sourcing platform for instant, culturally-sensitive care services designed for you.",
    type: "website",
  }
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
