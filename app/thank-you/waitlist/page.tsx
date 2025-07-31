"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { LanguageAlternates } from "@/components/LanguageAlternates"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"

// Define translations
const translations = {
  en: {
    pageTitle: "Thank You for Joining!",
    message: "We're excited to have you on our waitlist. We'll be in touch as we get closer to launch with exclusive updates and early access information.",
    sharing: "In the meantime, feel free to share CareNeighbour with friends and family who might benefit from our service.",
    returnToHome: "Return to Home",
    copyright: "CareNeighbour, Inc. All rights reserved.",
    bottomHeader: "CareNeighbour",
  },
  zh: {
    pageTitle: "感谢您的加入！",
    message: "我们很高兴您加入我们的候补名单。随着我们越来越接近发布日期，我们会及时向您提供独家更新和早期访问信息。",
    sharing: "同时，请随时与可能受益于我们服务的朋友和家人分享CareNeighbour。",
    returnToHome: "返回首页",
    copyright: "零距 . 版权所有。",
    bottomHeader: "零距",
  }
};

export default function WaitlistThankYouPage() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <LanguageAlternates />
        {/* Unified Header */}
      <UnifiedHeader 
        language={language}
        setLanguage={setLanguage}
        translations={{
          heroLogo: t.bottomHeader,
          howItWorks: "How It Works",
          aboutUs: "About Us",
          joinWaitlist: "Join Waitlist",
          SourceforCare: "Services",
          mainPage: "Home"
        }}
      />

      <main className="flex-1 flex items-center justify-center"
>
        <div className="container px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 flex items-center justify-center bg-white rounded-full shadow-lg">
                <Image src="/images/logo.png" alt="CareNeighbour Logo" width={50} height={50} />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t.pageTitle}</h1>

            <p className="text-xl text-gray-700">
              {t.message}
            </p>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-purple-200">
              <p className="text-gray-700">
                {t.sharing}
              </p>
            </div>

            <div className="pt-4">
              <Link href="/">
                <Button variant="outline" size="lg" className="border-purple-300 hover:bg-purple-50">
                  {t.returnToHome}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>      {/* Unified Footer */}
      <UnifiedFooter 
        language={language}
        translations={{
          heroLogo: t.bottomHeader,
          aboutUs: "About Us",
          mainPage: "Home",
          footerCopyright: t.copyright
        }}
      />
    </div>
  )
}
