"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { LanguageAlternates } from "@/components/LanguageAlternates"

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
      
      {/* Add language switcher in header */}
      <header className="w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="container px-4 md:px-6 flex h-16 items-center justify-end">
          <div className="flex items-center gap-2">
            <Button size="sm" variant={language === "en" ? "secondary" : "ghost"} onClick={() => setLanguage("en")}>
              EN
            </Button>
            <Button size="sm" variant={language === "zh" ? "secondary" : "ghost"} onClick={() => setLanguage("zh")}>
              中文
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 flex items-center justify-center">
                <Image src="/images/logo.png" alt="CareNeighbour Logo" width={80} height={80} />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
              {t.pageTitle}
            </h1>

            <p className="text-xl text-gray-700">
              {t.message}
            </p>

            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-700">
                {t.followup}
              </p>
            </div>

            <div className="pt-4">
              <Link href="/">
                <Button variant="outline" size="lg">
                  {t.returnToHome}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <div className="w-full py-6 bg-white border-t">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image src="/images/logo.png" alt="CareNeighbour Logo" width={30} height={30} />
            <span className="font-bold text-xl">{t.bottomHeader}</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {t.copyright}
          </p>
        </div>
      </div>
    </div>
  )
}
