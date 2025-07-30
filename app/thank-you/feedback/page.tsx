"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { LanguageAlternates } from "@/components/LanguageAlternates"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"

// Define translations
const translations = {
  en: {
    pageTitle: "Thank You for Your Feedback!",
    message: "We greatly appreciate you taking the time to share your thoughts with us. Your input is invaluable as we continue to develop CareNeighbour.",
    followup: "Our team will review your feedback carefully. If we need any clarification or would like to discuss your ideas further, we'll be in touch via the email you provided.",
    returnToHome: "Return to Home",
    copyright: "CareNeighbour, Inc. All rights reserved.",
    bottomHeader: "CareNeighbour",
  },
  zh: {
    pageTitle: "感谢您的反馈！",
    message: "我们非常感谢您抽出时间与我们分享您的想法。您的意见对我们继续开发CareNeighbour非常宝贵。",
    followup: "我们的团队会仔细审阅您的反馈。如果我们需要任何澄清或想进一步讨论您的想法，我们会通过您提供的邮箱与您联系。",
    returnToHome: "返回首页",
    copyright: "零距 . 版权所有。",
    bottomHeader: "零距",
  }
};

export default function FeedbackThankYouPage() {
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
          mainPage: "Home",
          BecomeACarer: "Become a Carer"
        }}
      />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 flex items-center justify-center bg-white rounded-full shadow-lg">
                <Image src="/images/logo.png" alt="CareNeighbour Logo" width={50} height={50} />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t.pageTitle}
            </h1>

            <p className="text-xl text-gray-700">
              {t.message}
            </p>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-purple-200">
              <p className="text-gray-700">
                {t.followup}
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
      </main>

      {/* Unified Footer */}
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
