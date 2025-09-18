import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Secure Care Booking | CareNeighbour",
  description:
    "Reserve a CareNeighbour session with transparent pricing, secure payment authorisation and bilingual concierge support.",
  openGraph: {
    title: "Secure Care Booking | CareNeighbour",
    description:
      "Complete your CareNeighbour booking with flexible plans, encrypted payments and bilingual support.",
    type: "website"
  }
}

export default function SecureBookingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
