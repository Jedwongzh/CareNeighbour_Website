"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedFooter } from '@/components/unified-footer';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Briefcase, ArrowRight } from 'lucide-react';

const HowItWorksPageContent = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    en: {
      heroLogo: "CareNeighbour",
      howItWorks: "How It Works",
      aboutUs: "About Us",
      joinWaitlist: "Join Waitlist",
      SourceforCare: "Source for Care",
      BecomeACarer: "Become a Carer",
      footerCopyright: "© 2024 CareNeighbour, Inc. All rights reserved.",

      title: 'How Independent Support Work Works',
      subtitle: 'Understand what it means to work independently on the CareNeighbour platform and what you can expect.',

      section1Title: 'The Freedom of Independent Support Work',
      section1P1: 'Working for yourself on the CareNeighbour platform offers flexibility and control over your career. As an independent support worker, you\'re running your own business while being part of our supportive community.',

      youCan: 'Your Benefits:',
      youCanPoints: [
        { text: 'Choose your own hours', icon: <Star className="w-5 h-5 text-yellow-400" /> },
        { text: 'Set your own competitive rates', icon: <Star className="w-5 h-5 text-yellow-400" /> },
        { text: 'Select clients you connect with', icon: <Star className="w-5 h-5 text-yellow-400" /> },
        { text: 'Build your own support business', icon: <Star className="w-5 h-5 text-yellow-400" /> },
      ],
      youNeed: 'Your Responsibilities:',
      youNeedPoints: [
        { text: 'Manage your own ABN', icon: <Briefcase className="w-5 h-5 text-purple-500" /> },
        { text: 'Find clients through the platform', icon: <Briefcase className="w-5 h-5 text-purple-500" /> },
        { text: 'Handle your own tax and superannuation', icon: <Briefcase className="w-5 h-5 text-purple-500" /> },
        { text: 'Budget for variable income streams', icon: <Briefcase className="w-5 h-5 text-purple-500" /> },
      ],

      processTitle: 'How the Platform Works',
      steps: [
        {
          number: '1',
          title: 'Create Your Profile',
          description: 'Set up your professional profile showcasing your skills, experience, and the services you offer.'
        },
        {
          number: '2',
          title: 'Get Verified',
          description: 'Complete our verification process including police checks, references, and required certifications.'
        },
        {
          number: '3',
          title: 'Find Clients',
          description: 'Browse available opportunities or respond to client requests that match your skills and preferences.'
        },
        {
          number: '4',
          title: 'Connect & Meet',
          description: 'Arrange meet-and-greets with potential clients to ensure you\'re a good fit for each other.'
        },
        {
          number: '5',
          title: 'Provide Support',
          description: 'Deliver excellent care while building meaningful relationships with your clients.'
        },
        {
          number: '6',
          title: 'Get Paid',
          description: 'Receive secure payments through our platform for all completed sessions.'
        }
      ],

      supportTitle: 'Platform Support',
      supportDescription: 'While you work independently, you\'re never alone. We provide ongoing support to help you succeed.',
      supportFeatures: [
        'Client matching system',
        'Secure payment processing',
        '24/7 customer support',
        'Training resources',
        'Community forums',
        'Business tools and insights'
      ],

      ctaTitle: 'Ready to Learn About Services?',
      ctaSubtitle: 'Discover the different types of support you can offer through CareNeighbour.',
      nextStep: 'Next: Services You Can Offer'
    },
    zh: {
      heroLogo: "零距",
      howItWorks: "运作方式",
      aboutUs: "关于我们",
      joinWaitlist: "加入等候名单",
      SourceforCare: "护理服务",
      BecomeACarer: "成为护理员",
      footerCopyright: "© 2024 零距. 版权所有。",

      title: '独立支持工作如何运作',
      subtitle: '了解在零距平台上独立工作的意义以及您可以期待什么。',

      section1Title: '独立支持工作的自由',
      section1P1: '在零距平台上为自己工作，为您的职业生涯提供了灵活性和控制力。作为独立支持工作者，您在经营自己的业务的同时也是我们支持社区的一部分。',

      youCan: '您的优势:',
      youCanPoints: [
        { text: '自由选择工作时间', icon: <Star className="w-5 h-5 text-yellow-400" /> },
        { text: '设定有竞争力的费率', icon: <Star className="w-5 h-5 text-yellow-400" /> },
        { text: '选择您有共鸣的客户', icon: <Star className="w-5 h-5 text-yellow-400" /> },
        { text: '建立自己的支持业务', icon: <Star className="w-5 h-5 text-yellow-400" /> },
      ],
      youNeed: '您的责任:',
      youNeedPoints: [
        { text: '管理自己的ABN', icon: <Briefcase className="w-5 h-5 text-purple-500" /> },
        { text: '通过平台寻找客户', icon: <Briefcase className="w-5 h-5 text-purple-500" /> },
        { text: '处理自己的税务和养老金', icon: <Briefcase className="w-5 h-5 text-purple-500" /> },
        { text: '为可变的收入流做预算', icon: <Briefcase className="w-5 h-5 text-purple-500" /> },
      ],

      processTitle: '平台如何运作',
      steps: [
        {
          number: '1',
          title: '创建您的档案',
          description: '建立您的专业档案，展示您的技能、经验和您提供的服务。'
        },
        {
          number: '2',
          title: '获得验证',
          description: '完成我们的验证流程，包括无犯罪记录检查、推荐信和所需的认证。'
        },
        {
          number: '3',
          title: '寻找客户',
          description: '浏览可用机会或回应符合您技能和偏好的客户请求。'
        },
        {
          number: '4',
          title: '联系和会面',
          description: '与潜在客户安排见面会，确保您们彼此合适。'
        },
        {
          number: '5',
          title: '提供支持',
          description: '在与客户建立有意义关系的同时提供优质护理。'
        },
        {
          number: '6',
          title: '获得报酬',
          description: '通过我们的平台安全地接收所有完成会话的付款。'
        }
      ],

      supportTitle: '平台支持',
      supportDescription: '虽然您独立工作，但您从不孤单。我们提供持续支持以帮助您成功。',
      supportFeatures: [
        '客户匹配系统',
        '安全支付处理',
        '24/7客户支持',
        '培训资源',
        '社区论坛',
        '业务工具和见解'
      ],

      ctaTitle: '准备了解服务了吗？',
      ctaSubtitle: '发现您可以通过零距提供的不同类型的支持。',
      nextStep: '下一步：您可以提供的服务'
    }
  };

  const currentContent = content[language as keyof typeof content];
  const footerTranslations = {
    aboutUs: currentContent.aboutUs,
    mainPage: currentContent.heroLogo,
    footerCopyright: currentContent.footerCopyright,
  };

  return (
    <div className="flex min-h-screen flex-col text-gray-800">
      {/* Global header rendered via app/layout.tsx */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/become-a-carer.png"
              alt="Support worker helping a client"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent" />
          </div>
          <div className="container mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight title-shadow mb-4">
              <span className="gradient-text-fill">{currentContent.title}</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">{currentContent.subtitle}</p>
          </div>
        </section>

        {/* Section 1: Freedom and Responsibilities */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.section1Title}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.section1P1}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-purple-700">{currentContent.youCan}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentContent.youCanPoints.map((point, index) => (
                      <li key={index} className="flex items-center text-lg">
                        {point.icon}
                        <span className="ml-3">{point.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-purple-700">{currentContent.youNeed}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentContent.youNeedPoints.map((point, index) => (
                      <li key={index} className="flex items-center text-lg">
                        {point.icon}
                        <span className="ml-3">{point.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How the Platform Works */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.processTitle}</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentContent.steps.map((step, index) => (
                  <Card key={index} className="text-center p-6 shadow-lg relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div className="pt-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Platform Support */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.supportTitle}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.supportDescription}</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {currentContent.supportFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-600 rounded-full mr-3"></div>
                    <span className="text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-purple-700 text-white">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentContent.ctaTitle}</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-purple-200">{currentContent.ctaSubtitle}</p>
            <Link href="/become-a-carer/services-you-can-offer" passHref>
              <Button size="lg" variant="secondary" className="font-semibold text-lg bg-white text-purple-700 hover:bg-gray-100 rounded-full px-8 py-4 h-auto transition-transform duration-200 hover:scale-105">
                {currentContent.nextStep}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <UnifiedFooter
        language={language}
        translations={footerTranslations}
      />
    </div>
  );
};

export default HowItWorksPageContent;
