"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../contexts/LanguageContext" // Import useLanguage hook


// 1. Define translations for the About page
const aboutPageTranslations = {
  en: {
    companyName: "CareNeighbour",
    backToHome: "Back to Home",
    back: "Back",
    pageTitle: "About Us",
    paragraph1:
      "We're a team of Monash University students passionate about solving real-world problems—starting with one that has deeply affected us. CareNeighbour was born from our own struggles of being far from our aging grandparents when they needed us the most. Like many expats and busy professionals, we've experienced the helplessness of knowing a loved one needs care but being unable to drop everything and fly home. We knew there had to be a better way. That's why we built CareNeighbour, a platform that connects families with trusted, local caregivers in minutes. Whether it's a quick check-in, companionship, or urgent assistance, we make sure help is always within reach. But we know technology alone isn't enough—we need insights from those who truly understand aged care. If you're an expert in elder care, healthcare, or community support, we'd love to hear from you. Your feedback and guidance can help us refine CareNeighbour into something that truly makes a difference.",
    paragraph2:
      "If you're interested in collaborating, advising, or simply sharing your thoughts, please reach out. Let's work together to create a future where no one feels helpless when their loved ones need care.",
    joinWaitlist: "Join Our Waitlist",
    footerCopyright: "CareNeighbour, Inc. All rights reserved.",
  },
  zh: {
    companyName: "CareNeighbour", // Or "零距" if you prefer to translate the name
    backToHome: "返回首页",
    back: "返回",
    pageTitle: "关于我们",
    paragraph1:
      "我们是一群来自莫纳什大学的学生，热衷于解决现实世界的问题——从一个深深影响了我们的问题开始。CareNeighbour 源于我们自身的困境：当我们的祖父母最需要我们时，我们却远在他乡。像许多外籍人士和忙碌的专业人士一样，我们都经历过那种无助感——知道亲人需要照顾，却无法放下一切飞回家。我们知道一定有更好的方法。这就是我们创建 CareNeighbour 的原因，这是一个能在几分钟内将家庭与值得信赖的本地护理人员联系起来的平台。无论是快速探访、陪伴还是紧急援助，我们都能确保帮助近在咫尺。但我们知道仅有技术是不够的——我们需要那些真正了解老年护理的人士的见解。如果您是老年护理、医疗保健或社区支持方面的专家，我们非常希望能听到您的声音。您的反馈和指导可以帮助我们将 CareNeighbour 完善成一个真正能带来改变的产品。",
    paragraph2:
      "如果您有兴趣合作、提供建议或只是分享您的想法，请联系我们。让我们共同努力，创造一个未来，让任何人在亲人需要照顾时都不会感到无助。",
    joinWaitlist: "加入等候名单",
    footerCopyright: "CareNeighbour, Inc. 版权所有。",
  },
}

export default function AboutPage() {
  // 2. Add language state
  const { language, setLanguage } = useLanguage();
  
  // Helper to get current translations
  const t = aboutPageTranslations[language as keyof typeof aboutPageTranslations] || aboutPageTranslations.en

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="container px-4 md:px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt={`${t.companyName} Logo`} width={36} height={36} />
            <span className="font-semibold text-lg">{t.companyName}</span>
          </Link>
          <div className="flex items-center gap-2">
            {/* 3. Language Switcher */}
            <Button size="sm" variant={language === "en" ? "secondary" : "ghost"} onClick={() => setLanguage("en")}>
              EN
            </Button>
            <Button size="sm" variant={language === "zh" ? "secondary" : "ghost"} onClick={() => setLanguage("zh")}>
              中文
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t.backToHome}</span>
                <span className="sm:hidden">{t.back}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">{t.pageTitle}</h1>
              </div>
            </div>

            {/* Founding Team Image */}
            <div className="w-full flex justify-center mt-8">
              <div className="max-w-4xl w-full overflow-hidden rounded-3xl shadow-lg border border-gray-200 bg-white">
                <Image
                  src="/images/Founding-team-image.jpg"
                  alt="Founding Team" // Consider if this alt text needs translation
                  width={800}
                  height={150}
                  className="w-full h-auto object-cover rounded-3xl"
                  priority
                />
              </div>
            </div>

            <div className="my-12" />
            <div className="max-w-4xl mx-auto prose prose-sm md:prose-base lg:prose-lg text-center md:text-justify">
              <p>{t.paragraph1}</p>

              <div className="my-8" />
              <p>{t.paragraph2}</p>

              <div className="mt-8 flex justify-center">
                <Link href="/#waitlist">
                  <Button size="lg" className="font-medium">
                    {t.joinWaitlist}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal copyright notice */}
      <div className="w-full py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {t.footerCopyright}
      </div>
    </div>
  )
}