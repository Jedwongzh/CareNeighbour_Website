import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Care Services | CareNeighbour",
  description: "Comprehensive culturally-sensitive care services including social support, personal care, professional nursing, and allied health services. Available in English, Mandarin, and Cantonese.",
  keywords: "CareNeighbour services, Care a neighbour services, Care neighbour services, care for neighbour, neighbour care services, care services, cultural care, multilingual care, NDIS, aged care, nursing, allied health, Chinese care services, Mandarin care, Cantonese care",
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
