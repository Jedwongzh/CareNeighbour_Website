"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedFooter } from '@/components/unified-footer';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, Users, Clock, Briefcase } from 'lucide-react';

const WhyJoinPageContent = () => {
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

      title: 'Why Choose CareNeighbour?',
      subtitle: 'Discover the benefits of becoming an independent support worker with CareNeighbour and why we\'re different from traditional care agencies.',
      
      section1Title: 'More Than Just a Job - It\'s a Calling',
      section1P1: 'Being a support worker is more than a job; it\'s a calling. It\'s about providing compassionate care that empowers people to live with dignity and independence. At CareNeighbour, we connect you with clients who value your skills and cultural understanding.',
      section1P2: 'We believe in building genuine connections between carers and clients, creating meaningful relationships that benefit everyone involved.',

      differenceTitle: 'The CareNeighbour Difference',
      differences: [
        {
          title: 'Cultural Understanding',
          description: 'We specialize in connecting carers and clients who share cultural backgrounds and languages, creating deeper, more meaningful relationships.',
          icon: <Users className="w-8 h-8 text-purple-600" />
        },
        {
          title: 'Flexible Working',
          description: 'Work on your terms. Choose your hours, select your clients, and build the career that fits your lifestyle.',
          icon: <Clock className="w-8 h-8 text-purple-600" />
        },
        {
          title: 'Meaningful Impact',
          description: 'Make a real difference in people\'s lives while building your own successful support work business.',
          icon: <Heart className="w-8 h-8 text-purple-600" />
        },
        {
          title: 'Business Support',
          description: 'We provide the tools and platform to help you succeed as an independent support worker, from finding clients to managing payments.',
          icon: <Briefcase className="w-8 h-8 text-purple-600" />
        }
      ],

      testimonialsTitle: 'What Our Carers Say',
      testimonials: [
        {
          quote: "Working with CareNeighbour has given me the flexibility to care for my family while helping others in my community. The cultural connections make all the difference.",
          author: "Sarah L.",
          role: "Personal Care Worker"
        },
        {
          quote: "I love being able to choose my clients and build long-term relationships. It's so much more rewarding than agency work.",
          author: "Michael C.",
          role: "Support Worker"
        }
      ],

      ctaTitle: 'Ready to Start Your Journey?',
      ctaSubtitle: 'Join our community of dedicated support workers making a difference.',
      getStarted: 'Learn How It Works',
      nextStep: 'Next: How It Works'
    },
    zh: {
      heroLogo: "零距",
      howItWorks: "运作方式",
      aboutUs: "关于我们",
      joinWaitlist: "加入等候名单",
      SourceforCare: "护理服务",
      BecomeACarer: "成为护理员",
      footerCopyright: "© 2024 零距. 版权所有。",

      title: '为何选择零距？',
      subtitle: '发现成为零距独立支持工作者的优势，了解我们与传统护理机构的不同之处。',
      
      section1Title: '不仅仅是工作 - 更是使命',
      section1P1: '支持工作者不仅仅是一份工作，更是一种使命。它是关于提供富有同情心的关怀，使人们能够有尊严和独立地生活。在零距，我们将您与重视您技能和文化理解的客户联系起来。',
      section1P2: '我们相信在护理员和客户之间建立真正的联系，创造对每个人都有益的有意义关系。',

      differenceTitle: '零距的差异',
      differences: [
        {
          title: '文化理解',
          description: '我们专注于连接具有相同文化背景和语言的护理员和客户，创造更深层、更有意义的关系。',
          icon: <Users className="w-8 h-8 text-purple-600" />
        },
        {
          title: '灵活工作',
          description: '按您的条件工作。选择您的时间，选择您的客户，建立适合您生活方式的职业。',
          icon: <Clock className="w-8 h-8 text-purple-600" />
        },
        {
          title: '有意义的影响',
          description: '在建立自己成功的支持工作业务的同时，对人们的生活产生真正的影响。',
          icon: <Heart className="w-8 h-8 text-purple-600" />
        },
        {
          title: '业务支持',
          description: '我们提供工具和平台，帮助您作为独立支持工作者取得成功，从寻找客户到管理付款。',
          icon: <Briefcase className="w-8 h-8 text-purple-600" />
        }
      ],

      testimonialsTitle: '我们的护理员说什么',
      testimonials: [
        {
          quote: "与零距合作让我能够在照顾家人的同时帮助社区中的其他人。文化联系产生了很大的不同。",
          author: "Sarah L.",
          role: "个人护理工作者"
        },
        {
          quote: "我喜欢能够选择我的客户并建立长期关系。这比机构工作更有回报。",
          author: "Michael C.",
          role: "支持工作者"
        }
      ],

      ctaTitle: '准备好开始您的旅程了吗？',
      ctaSubtitle: '加入我们致力于创造改变的支持工作者社区。',
      getStarted: '了解运作方式',
      nextStep: '下一步：运作方式'
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
              alt="A compassionate carer assisting a senior"
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

        {/* Section 1: More Than Just a Job */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{currentContent.section1Title}</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-4">{currentContent.section1P1}</p>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.section1P2}</p>
          </div>
        </section>

        {/* The CareNeighbour Difference */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.differenceTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentContent.differences.map((difference, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-4">
                    {difference.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{difference.title}</h3>
                  <p className="text-gray-600">{difference.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.testimonialsTitle}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {currentContent.testimonials.map((testimonial, index) => (
                <Card key={index} className="p-8 shadow-lg">
                  <CardContent className="pt-0">
                    <p className="text-lg text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-800">{testimonial.author}</p>
                      <p className="text-purple-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-purple-700 text-white">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentContent.ctaTitle}</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-purple-200">{currentContent.ctaSubtitle}</p>
            <Link href="/become-a-carer/how-it-works" passHref>
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

export default WhyJoinPageContent;
