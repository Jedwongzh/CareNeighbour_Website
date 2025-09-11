"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedFooter } from '@/components/unified-footer';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Download, UserPlus, MessageSquare, Calendar } from 'lucide-react';

const GettingStartedPageContent = () => {
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

      title: 'Getting Started on CareNeighbour',
      subtitle: 'You\'re ready to begin your journey as an independent support worker. Here\'s how to get started and find your first clients.',

      quickStartTitle: 'Quick Start Checklist',
      quickStartDesc: 'Follow these steps to get approved and start finding clients quickly:',
      quickStartSteps: [
        'Complete your application with all required documents',
        'Pass the verification and background check process',
        'Create a compelling profile that showcases your skills',
        'Download the CareNeighbour mobile app',
        'Set up your availability and preferred services',
        'Start browsing and applying for client opportunities'
      ],

      successTitle: 'Tips for Success',
      successSteps: [
        {
          title: 'Create a Complete Profile',
          description: 'A complete profile performs better. Add photos, detailed descriptions of your experience, and highlight what makes you unique.',
          icon: <UserPlus className="w-8 h-8 text-purple-600" />
        },
        {
          title: 'Download the Mobile App',
          description: 'Stay connected and respond quickly to client requests. The faster you respond, the more likely you are to get hired.',
          icon: <Download className="w-8 h-8 text-purple-600" />
        },
        {
          title: 'Be Active and Responsive',
          description: 'Check for new opportunities daily and respond promptly to messages. Active users get more client requests.',
          icon: <MessageSquare className="w-8 h-8 text-purple-600" />
        },
        {
          title: 'Schedule Meet-and-Greets',
          description: 'Arrange video or in-person meetings with potential clients. This helps build trust and leads to more bookings.',
          icon: <Calendar className="w-8 h-8 text-purple-600" />
        }
      ],

      resourcesTitle: 'Helpful Resources',
      resources: [
        {
          title: 'Support Worker Handbook',
          description: 'Comprehensive guide covering best practices, safety protocols, and professional standards.',
          link: '#'
        },
        {
          title: 'Training Opportunities',
          description: 'Explore accredited courses to enhance your skills and qualify for more services.',
          link: '#'
        },
        {
          title: 'Community Forum',
          description: 'Connect with other support workers, share experiences, and get advice.',
          link: '#'
        },
        {
          title: '24/7 Support',
          description: 'Our customer support team is always available to help with any questions or issues.',
          link: '#'
        }
      ],

      expectationsTitle: 'What to Expect',
      expectations: [
        'Initial clients may take 1-2 weeks to find after approval',
        'Building a steady client base typically takes 2-3 months',
        'Successful workers often have 3-5 regular clients',
        'Average of 10-25 hours per week once established',
        'Earnings vary based on services, hours, and client base'
      ],

      ctaTitle: 'Ready to Join Our Community?',
      ctaSubtitle: 'Start your application today and begin making a difference in people\'s lives.',
      getStarted: 'Start Your Application',
      backToMain: 'Back to Overview'
    },
    zh: {
      heroLogo: "零距",
      howItWorks: "运作方式",
      aboutUs: "关于我们",
      joinWaitlist: "加入等候名单",
      SourceforCare: "护理服务",
      BecomeACarer: "成为护理员",
      footerCopyright: "© 2024 零距. 版权所有。",

      title: '在零距开始',
      subtitle: '您已准备好开始作为独立支持工作者的旅程。以下是如何开始并找到您的第一批客户。',

      quickStartTitle: '快速入门清单',
      quickStartDesc: '按照这些步骤快速获得批准并开始寻找客户：',
      quickStartSteps: [
        '填写申请并提供所有必需文件',
        '通过验证和背景检查流程',
        '创建展示您技能的引人注目的档案',
        '下载零距移动应用程序',
        '设置您的可用性和首选服务',
        '开始浏览并申请客户机会'
      ],

      successTitle: '成功的提示',
      successSteps: [
        {
          title: '创建完整档案',
          description: '完整的档案表现更好。添加照片、详细描述您的经验，并突出您的独特之处。',
          icon: <UserPlus className="w-8 h-8 text-purple-600" />
        },
        {
          title: '下载移动应用',
          description: '保持联系并快速回应客户请求。回应越快，被雇用的可能性越大。',
          icon: <Download className="w-8 h-8 text-purple-600" />
        },
        {
          title: '积极主动和响应迅速',
          description: '每天检查新机会并及时回复消息。活跃用户获得更多客户请求。',
          icon: <MessageSquare className="w-8 h-8 text-purple-600" />
        },
        {
          title: '安排见面会',
          description: '与潜在客户安排视频或面对面会议。这有助于建立信任并获得更多预订。',
          icon: <Calendar className="w-8 h-8 text-purple-600" />
        }
      ],

      resourcesTitle: '有用的资源',
      resources: [
        {
          title: '支持工作者手册',
          description: '涵盖最佳实践、安全协议和专业标准的综合指南。',
          link: '#'
        },
        {
          title: '培训机会',
          description: '探索认证课程以提升您的技能并获得更多服务资格。',
          link: '#'
        },
        {
          title: '社区论坛',
          description: '与其他支持工作者联系，分享经验并获得建议。',
          link: '#'
        },
        {
          title: '24/7支持',
          description: '我们的客户支持团队随时可以帮助解答任何问题或解决问题。',
          link: '#'
        }
      ],

      expectationsTitle: '期望什么',
      expectations: [
        '获得批准后，初始客户可能需要1-2周时间找到',
        '建立稳定的客户群通常需要2-3个月',
        '成功的工作者通常拥有3-5个固定客户',
        '一旦建立，平均每周10-25小时',
        '收入因服务、工时和客户群而异'
      ],

      ctaTitle: '准备加入我们的社区吗？',
      ctaSubtitle: '今天就开始您的申请，开始在人们的生活中产生影响。',
      getStarted: '开始您的申请',
      backToMain: '返回概览'
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
              alt="Getting started as a support worker"
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

        {/* Quick Start Checklist */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.quickStartTitle}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.quickStartDesc}</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {currentContent.quickStartSteps.map((step, index) => (
                  <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
                    <span className="text-gray-800">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tips for Success */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.successTitle}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {currentContent.successSteps.map((step, index) => (
                <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-0">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Helpful Resources */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.resourcesTitle}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {currentContent.resources.map((resource, index) => (
                <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="pt-0">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="text-purple-600 font-medium hover:text-purple-700">
                      Learn More →
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.expectationsTitle}</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {currentContent.expectations.map((expectation, index) => (
                  <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-800">{expectation}</span>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding" passHref>
                <Button size="lg" variant="secondary" className="font-semibold text-lg bg-white text-purple-700 hover:bg-gray-100 rounded-full px-8 py-4 h-auto transition-transform duration-200 hover:scale-105">
                  {currentContent.getStarted}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/become-a-carer" passHref>
                <Button size="lg" variant="outline" className="font-semibold text-lg border-white text-white hover:bg-white hover:text-purple-700 rounded-full px-8 py-4 h-auto transition-transform duration-200 hover:scale-105">
                  {currentContent.backToMain}
                </Button>
              </Link>
            </div>
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

export default GettingStartedPageContent;
