export const metadata = {
  title: "Thank You - CareNeighbor",
  description: "Thank you for your interest in CareNeighbor.",
  icons: {
    icon: [{ url: "/favicon.png" }],
    apple: [{ url: "/favicon.png" }],
  },
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-[100dvh] flex-col">{children}</div>
}
