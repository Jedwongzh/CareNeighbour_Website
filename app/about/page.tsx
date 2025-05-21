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
    companyName: "零距", // Or "零距" if you prefer to translate the name
    backToHome: "返回首页",
    back: "返回",
    pageTitle: "关于我们",
    paragraph1:
      "我们是一支来自莫纳士大学的学生团队,怀抱着解决现实问题的热情。而这一切，始于我们亲身经历的困扰。零距(CareNeighbour)的诞生，源于我们在海外求学、工作时，无法陪伴年迈祖父母的无力感。像许多在外生活的游子和忙碌的职场人士一样，我们深知亲人需要照护却无法立刻赶回身边的痛苦。我们相信，一定有更好的方式。于是，我们打造了零距： 一个能在数分钟内，将家庭与本地值得信赖的照护者连接起来的平台。无论是简单的问候、陪伴，还是紧急协助，我们都致力于让“帮助”触手可及。但我们也深知，单靠技术还不够。我们渴望倾听那些真正了解老年照护的人士的声音。如果您在老年护理、医疗健康或社区支持领域有经验，我们诚挚邀请您与我们联系。您的反馈与建议，将帮助我们不断完善，真正为社会带来改变。如果您有意合作、提供指导，或愿意分享宝贵见解，请随时与我们取得联系。让我们一起努力，创造一个亲人需要照护时，再也不会让人感到无助的未来。",
    paragraph2:
      "如果您有意合作、提供指导，或愿意分享宝贵见解，请随时与我们取得联系。让我们一起努力，创造一个亲人需要照护时，再也不会让人感到无助的未来。",
    joinWaitlist: "加入候补名单",
    footerCopyright: "零距 . 版权所有。",
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