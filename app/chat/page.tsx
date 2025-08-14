"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import ChatInterface from "@/app/components/chat-interface"
import SignInDialog from "@/app/components/signin-dialog"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { useLanguage } from "@/app/contexts/LanguageContext"

function ChatPageContent() {
  const [isAuth, setIsAuth] = useState(false)
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""

  const handleSignIn = () => {
    setIsAuth(true)
  }

  return (
    <>
      {isAuth ? (
        <ChatInterface careSummary={query} />
      ) : (
        <SignInDialog onSignIn={handleSignIn} />
      )}
    </>
  )
}

export default function ChatPage() {
  const { language, setLanguage } = useLanguage()

  // Dummy translations for header/footer
  const t = {
    heroLogo: "CareNeighbour",
    howItWorks: "How It Works",
    aboutUs: "About Us",
    joinWaitlist: "Join Waitlist",
    SourceforCare: "Source for Care",
    mainPage: "CareNeighbour",
    footerCopyright: "CareNeighbour, Inc. All rights reserved.",
  }

  return (
    <div className="flex flex-col min-h-screen">
      <UnifiedHeader
        language={language}
        setLanguage={setLanguage}
        translations={{
          heroLogo: t.heroLogo,
          howItWorks: t.howItWorks,
          aboutUs: t.aboutUs,
          joinWaitlist: t.joinWaitlist,
          SourceforCare: t.SourceforCare,
          mainPage: t.mainPage,
        }}
      />
      <main className="flex-grow flex items-center justify-center">
        <Suspense fallback={<div className="text-white">Loading Chat...</div>}>
          <ChatPageContent />
        </Suspense>
      </main>
      <UnifiedFooter
        language={language}
        translations={{
          aboutUs: t.aboutUs,
          mainPage: t.mainPage,
          footerCopyright: t.footerCopyright,
        }}
      />
    </div>
  )
}
