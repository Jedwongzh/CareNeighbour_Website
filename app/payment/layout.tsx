import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Payments & Funding Support | CareNeighbour",
  description:
    "Understand CareNeighbour payment options including secure online payments, NDIS support, Home Care Packages and private billing. Get transparent pricing guidance in English and Mandarin.",
  keywords: [
    "CareNeighbour payments",
    "NDIS payments",
    "Home Care Package payment",
    "caregiver pricing",
    "secure care payments",
    "bilingual payment support",
    "CareNeighbour funding",
    "care services cost"
  ],
  openGraph: {
    title: "Payments & Funding Support | CareNeighbour",
    description:
      "Discover flexible and transparent payment options for CareNeighbour services including NDIS, Home Care Packages and private pay.",
    type: "website"
  }
}

export default function PaymentLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
