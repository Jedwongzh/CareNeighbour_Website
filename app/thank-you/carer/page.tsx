"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { UnifiedFooter } from "@/components/unified-footer"
import { useLanguage } from "../../contexts/LanguageContext"
import Link from "next/link"
import Image from "next/image"
import { Users, MessageCircle, Zap } from "lucide-react"

export default function ThankYouCarerPage() {
  const { language, setLanguage } = useLanguage()

  const translations = {
    en: {
      title: "Welcome to the CareNeighbour Community!",
      subtitle: "Thank you for joining us as a carer",
      communityTitle: "Join Our Exclusive Carer Community",
      communityDescription: "At CareNeighbour, we really focus on building our carer community where we will keep all chat members up to date on the development of our platform. We prioritise every voice of yours. As you join this group, you're not just part of the platform, you're helping us to build it from ground up.",
      communityBenefits: {
        title: "What You'll Get:",
        updates: "Share updates on CareNeighbour's progress",
        feedback: "Collect your feedback on tools and ideas that we will launch in the future for all of you to use",
        earlyAccess: "At times you guys will get early access to the latest tools and new paid features that we have created"
      },
      freeAccess: "Don't worry you don't have to pay a thing to be part of this community and it is completely free, however, we do have to go through a few manual verification processes and hence please ensure that all of your entered details are correct before submitting.",
      qrInstructions: "Please scan the following QR code to request access to the carer community chat. Bear in mind that we do take 1-2 business days to verify or get a response from the team. Cheers!!",
      backToHome: "Back to Home",
      heroLogo: "CareNeighbour",
      howItWorks: "How It Works",
      aboutUs: "About Us",
      becomeACarer: "Become a Carer",
      SourceforCare: "Source for Care",
      mainPage: "Home",
      joinWaitlist: "Join Waitlist"
    },
    zh: {
      title: "欢迎加入零距社区！",
      subtitle: "感谢您加入我们成为护理员",
      communityTitle: "加入我们专属的护理员社区",
      communityDescription: "在零距，我们非常专注于建设我们的护理员社区，我们将让所有聊天成员了解我们平台的最新发展。我们重视您的每一个声音。当您加入这个群组时，您不仅仅是平台的一部分，您正在帮助我们从头开始构建它。",
      communityBenefits: {
        title: "您将获得：",
        updates: "分享零距的进展更新",
        feedback: "收集您对我们未来将推出的工具和想法的反馈，供您使用",
        earlyAccess: "有时您将获得我们创建的最新工具和新付费功能的早期访问权限"
      },
      freeAccess: "不用担心，您不需要支付任何费用来成为这个社区的一部分，而且这是完全免费的，但是，我们确实需要通过一些手动验证流程，因此请确保您输入的所有详细信息在提交前都是正确的。",
      qrInstructions: "请扫描以下二维码申请加入护理员社区聊天。请注意，我们需要1-2个工作日来验证或获得团队的回复。请多多包涵！！",
      backToHome: "返回首页",
      heroLogo: "零距",
      howItWorks: "工作原理",
      aboutUs: "关于我们",
      becomeACarer: "成为护理员",
      SourceforCare: "寻找护理",
      mainPage: "主页",
      joinWaitlist: "加入等候名单"
    }
  }

  const t = translations[language as keyof typeof translations] || translations.en

  // Determine which QR code to show based on language
  // For now, use English version as fallback until Chinese version is uploaded
  //const qrCodeImage = '/images/qr_carer_eng.png' 
  // TODO: Uncomment when Chinese QR code is available
  const qrCodeImage = language === 'zh' ? '/images/qr_carer_chi.png' : '/images/qr_carer_eng.png'

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Global header rendered via app/layout.tsx */}
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-7xl mx-auto">
          {/* Glass morphism container */}
          <div className="backdrop-blur-md bg-white/20 rounded-3xl shadow-2xl border border-white/30 p-8 lg:p-12">
            
            {/* Success Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-black">
                {t.title}
              </h1>
              <p className="text-xl text-gray-700">
                {t.subtitle}
              </p>
            </div>

            {/* Main Content - Responsive Layout */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left side - Community Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-purple-700 flex items-center gap-3">
                    <Users className="h-6 w-6" />
                    {t.communityTitle}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {t.communityDescription}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="font-semibold text-xl mb-4 text-gray-800">
                    {t.communityBenefits.title}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MessageCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{t.communityBenefits.updates}</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <MessageCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{t.communityBenefits.feedback}</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <Zap className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{t.communityBenefits.earlyAccess}</p>
                    </div>
                  </div>
                </div>

                {/* Free Access Notice */}
                <div className="bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-blue-200/50">
                  <p className="text-blue-800 text-lg leading-relaxed">
                    {t.freeAccess}
                  </p>
                </div>

                {/* Back to Home Button - Mobile */}
                <div className="lg:hidden text-center pt-4">
                  <Link href="/">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 text-lg"
                    >
                      {t.backToHome}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right side - QR Code */}
              <div className="text-center lg:text-left">
                <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
                  <p className="text-gray-800 font-semibold text-lg mb-6 leading-relaxed">
                    {t.qrInstructions}
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <Image
                        src={qrCodeImage}
                        alt="QR Code for Carer Community"
                        width={250}
                        height={250}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Home Button - Desktop */}
            <div className="hidden lg:block text-center mt-12">
              <Link href="/">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 text-lg"
                >
                  {t.backToHome}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <UnifiedFooter 
        language={language} 
        translations={{
          heroLogo: t.heroLogo,
          aboutUs: t.aboutUs,
          mainPage: t.mainPage,
          footerCopyright: language === 'zh' ? '零距，版权所有。' : language === 'yue' ? '零距，版權所有。' : 'CareNeighbour, Inc. All rights reserved.'
        }}
      />
    </div>
  )
}
