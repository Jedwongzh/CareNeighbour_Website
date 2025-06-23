"use client"

import { useState } from "react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../contexts/LanguageContext" // Import useLanguage hook
import Head from "next/head"


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
      "如果您有意合作、提供指导，或愿意分s享宝贵见解，请随时与我们取得联系。让我们一起努力，创造一个亲人需要照护时，再也不会让人感到无助的未来。",
    joinWaitlist: "加入候补名单",
    footerCopyright: "零距 . 版权所有。",
  },
}

export default function AboutPage() {
  // 2. Add language state
  const { language, setLanguage } = useLanguage();
  // Helper to get current translations
  const t = aboutPageTranslations[language as keyof typeof aboutPageTranslations] || aboutPageTranslations.en

  // Header translations
  const headerTranslations = {
    heroLogo: language === 'zh' ? '零距' : 'CareNeighbour',
    howItWorks: language === 'zh' ? '如何运作' : 'How It Works',
    aboutUs: language === 'zh' ? '关于我们' : 'About Us',
    joinWaitlist: language === 'zh' ? '加入等候名单' : 'Join Waitlist',
    SourceforCare: language === 'zh' ? '护理服务' : 'Source for Care',
    mainPage: language === 'zh' ? '主页' : 'Home'
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Head>
        <title>About CareNeighbour | AI-Powered Instant Care Sourcing Platform</title>
        <meta name="description" content="Learn about CareNeighbour, the new AI-powered instant care sourcing platform. Meet the team and discover our mission to make care accessible instantly for everyone." />
        <meta name="keywords" content="CareNeighbour, Care Neighbour, AI-powered care, instant care, care sourcing platform, new care platform, Monash, trusted caregivers, about, team, mission" />
        <meta property="og:title" content="About CareNeighbour | AI-Powered Instant Care Sourcing Platform" />
        <meta property="og:description" content="Learn about CareNeighbour, the new AI-powered instant care sourcing platform. Meet the team and discover our mission to make care accessible instantly for everyone." />
        <meta property="og:image" content="/images/CN_Figure2.png" />
        <meta name="robots" content="index, follow" />
      </Head>
      {/* Unified Header */}
      <UnifiedHeader 
        language={language}
        setLanguage={setLanguage}
        translations={headerTranslations}
      />

      {/* Main Content */}
      <main className="flex-1">
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter title-shadow">
                  <span className="gradient-text-fill">{t.pageTitle}</span>
                </h1>
                <p className="sr-only">CareNeighbour is a new, AI-powered care sourcing platform that connects you instantly with trusted caregivers. Learn more about our mission and team.</p>
              </div>
            </div>

            {/* Founding Team Image */}
            <div className="w-full flex justify-center mt-8">
              <div className="max-w-4xl w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/Founding-team-image.jpg"
                  alt="Founding Team of CareNeighbour – AI-powered instant care platform"
                  width={800}
                  height={150}
                  className="w-full h-auto object-cover rounded-3xl"
                  priority
                />
              </div>
            </div>

            <div className="my-12" />
            <div className="max-w-4xl mx-auto prose prose-sm md:prose-base lg:prose-lg text-center md:text-justify text-black">
              <p>{t.paragraph1}</p>

              <div className="my-8" />
              <p>{t.paragraph2}</p>

              <div className="mt-8 flex justify-center">
                <Link href="/#waitlist">
                  <Button size="lg" className="font-medium glassmorphism text-gray">
                    {t.joinWaitlist}
                  </Button>
                </Link>
              </div>            </div>
          </div>
        </section>
      </main>

      {/* Unified Footer */}
      <UnifiedFooter 
        language={language}
        translations={{
          aboutUs: language === 'zh' ? '关于我们' : 'About Us',
          mainPage: language === 'zh' ? '主页' : 'Home',
          footerCopyright: t.footerCopyright
        }}
      />
    </div>
  )
}