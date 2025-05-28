import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Care Services | CareNeighbour",
  description: "Comprehensive culturally-sensitive care services including social support, personal care, professional nursing, and allied health services. Available in English and Chinese.",
  keywords: "care services, cultural care, multilingual care, NDIS, aged care, nursing, allied health, Chinese care services",
  openGraph: {
    title: "Our Care Services | CareNeighbour",
    description: "Comprehensive culturally-sensitive care services designed for you",
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
