"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedFooter } from '@/components/unified-footer';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, ShieldCheck, Clock, Percent, ArrowRight, CreditCard, TrendingUp } from 'lucide-react';

const PaymentsPageContent = () => {
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

      title: 'Transparent & Secure Payments',
      subtitle: 'Our platform handles all client payments securely, so you can focus on providing great care. We believe in transparent pricing and timely payments.',

      howItWorksTitle: 'How Payment Works',
      howItWorksDesc: 'Understanding our payment system helps you plan your earnings and manage your support work business effectively.',

      paymentFeatures: [
        { 
          title: 'Set Your Own Rates', 
          description: 'You have the freedom to set hourly rates that reflect your skills and experience. Rates can be negotiated with individual clients.',
          icon: 'DollarSign' 
        },
        { 
          title: 'Secure In-App Payments', 
          description: 'Clients pay for sessions directly through the platform. No need to handle cash or chase invoices - everything is automated.',
          icon: 'ShieldCheck' 
        },
        { 
          title: 'Timely Payouts', 
          description: 'Receive your earnings directly to your bank account on a regular schedule after each session is completed and approved.',
          icon: 'Clock' 
        },
        { 
          title: 'Low Platform Fees', 
          description: 'We charge a small, transparent platform fee, which helps us maintain and improve the platform for everyone.',
          icon: 'Percent' 
        }
      ],

      paymentProcessTitle: 'The Payment Process',
      paymentSteps: [
        {
          step: '1',
          title: 'Complete Session',
          description: 'Provide your support service to the client as agreed.',
          icon: <CreditCard className="w-6 h-6 text-purple-600" />
        },
        {
          step: '2',
          title: 'Submit Hours',
          description: 'Log your hours through the app after each session.',
          icon: <Clock className="w-6 h-6 text-purple-600" />
        },
        {
          step: '3',
          title: 'Client Approval',
          description: 'Client reviews and approves the submitted hours.',
          icon: <ShieldCheck className="w-6 h-6 text-purple-600" />
        },
        {
          step: '4',
          title: 'Payment Processing',
          description: 'Payment is automatically processed and transferred to your account.',
          icon: <DollarSign className="w-6 h-6 text-purple-600" />
        }
      ],

      ratesTitle: 'Setting Your Rates',
      ratesDesc: 'Your rates should reflect your qualifications, experience, and the value you provide. Here\'s what to consider:',
      rateFactors: [
        'Your qualifications and certifications',
        'Years of experience in support work',
        'Specialised skills (e.g., dementia care, languages)',
        'Type of support service provided',
        'Client funding source (NDIS, private, etc.)',
        'Location and travel requirements'
      ],

      averageRatesTitle: 'Average Hourly Rates',
      averageRates: [
        { service: 'Companionship & Social Support', range: '$25 - $35' },
        { service: 'Personal Care', range: '$35 - $45' },
        { service: 'Domestic Assistance', range: '$25 - $35' },
        { service: 'Transport & Errands', range: '$30 - $40' },
        { service: 'Nursing Services', range: '$45 - $65' },
        { service: 'Allied Health', range: '$55 - $85' }
      ],

      businessTipsTitle: 'Managing Your Earnings',
      businessTips: [
        'Set aside 25-30% for tax obligations',
        'Consider superannuation contributions',
        'Track all business-related expenses',
        'Keep detailed records for tax purposes',
        'Plan for variable income between clients',
        'Consider professional insurance'
      ],

      ctaTitle: 'Ready to Get Started?',
      ctaSubtitle: 'Learn the final steps to join CareNeighbour and start your support work journey.',
      nextStep: 'Next: Getting Started'
    },
    zh: {
      heroLogo: "零距",
      howItWorks: "运作方式",
      aboutUs: "关于我们",
      joinWaitlist: "加入等候名单",
      SourceforCare: "护理服务",
      BecomeACarer: "成为护理员",
      footerCopyright: "© 2024 零距. 版权所有。",

      title: '透明安全的支付',
      subtitle: '我们的平台安全地处理所有客户付款，让您可以专注于提供优质的护理服务。我们致力于透明的定价和及时的付款。',

      howItWorksTitle: '支付如何运作',
      howItWorksDesc: '了解我们的支付系统有助于您规划收入并有效管理您的支持工作业务。',

      paymentFeatures: [
        { 
          title: '自行设定费率', 
          description: '您有权根据您的技能和经验自由设定小时费率。费率可以与个别客户协商。',
          icon: 'DollarSign' 
        },
        { 
          title: '应用内安全支付', 
          description: '客户通过平台直接支付服务费用。无需处理现金或追讨发票 - 一切都是自动化的。',
          icon: 'ShieldCheck' 
        },
        { 
          title: '及时放款', 
          description: '每次服务完成并获得批准后，您的收入将按定期计划直接存入您的银行账户。',
          icon: 'Clock' 
        },
        { 
          title: '低平台费用', 
          description: '我们只收取少量透明的平台费用，这有助于我们为每个人维护和改进平台。',
          icon: 'Percent' 
        }
      ],

      paymentProcessTitle: '支付流程',
      paymentSteps: [
        {
          step: '1',
          title: '完成服务',
          description: '按约定向客户提供您的支持服务。',
          icon: <CreditCard className="w-6 h-6 text-purple-600" />
        },
        {
          step: '2',
          title: '提交工时',
          description: '每次服务后通过应用程序记录您的工时。',
          icon: <Clock className="w-6 h-6 text-purple-600" />
        },
        {
          step: '3',
          title: '客户批准',
          description: '客户审查并批准提交的工时。',
          icon: <ShieldCheck className="w-6 h-6 text-purple-600" />
        },
        {
          step: '4',
          title: '付款处理',
          description: '付款自动处理并转入您的账户。',
          icon: <DollarSign className="w-6 h-6 text-purple-600" />
        }
      ],

      ratesTitle: '设定您的费率',
      ratesDesc: '您的费率应反映您的资格、经验和您提供的价值。以下是需要考虑的因素：',
      rateFactors: [
        '您的资格和认证',
        '支持工作的经验年数',
        '专业技能（如失智症护理、语言）',
        '提供的支持服务类型',
        '客户资金来源（NDIS、私人等）',
        '位置和旅行要求'
      ],

      averageRatesTitle: '平均时薪',
      averageRates: [
        { service: '陪伴和社交支持', range: '$25 - $35' },
        { service: '个人护理', range: '$35 - $45' },
        { service: '家务协助', range: '$25 - $35' },
        { service: '交通和差事', range: '$30 - $40' },
        { service: '护理服务', range: '$45 - $65' },
        { service: '联合健康', range: '$55 - $85' }
      ],

      businessTipsTitle: '管理您的收入',
      businessTips: [
        '留出25-30%用于税务义务',
        '考虑养老金缴费',
        '跟踪所有业务相关费用',
        '为税务目的保持详细记录',
        '规划客户之间的可变收入',
        '考虑专业保险'
      ],

      ctaTitle: '准备好开始了吗？',
      ctaSubtitle: '了解加入零距并开始您的支持工作旅程的最后步骤。',
      nextStep: '下一步：开始行动'
    }
  };

  const currentContent = content[language as keyof typeof content];
  const footerTranslations = {
    aboutUs: currentContent.aboutUs,
    mainPage: currentContent.heroLogo,
    footerCopyright: currentContent.footerCopyright,
  };

  const icons: { [key: string]: React.ElementType } = {
    DollarSign,
    ShieldCheck,
    Clock,
    Percent,
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
              alt="Secure payment processing"
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

        {/* How Payment Works */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.howItWorksTitle}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.howItWorksDesc}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentContent.paymentFeatures.map((feature, index) => {
                const Icon = icons[feature.icon];
                return (
                  <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex justify-center mb-4">
                      {Icon && <Icon className="w-10 h-10 text-purple-600" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Payment Process */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.paymentProcessTitle}</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {currentContent.paymentSteps.map((step, index) => (
                  <Card key={index} className="p-6 shadow-lg">
                    <CardContent className="pt-0">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {step.icon}
                            <h3 className="text-lg font-semibold text-gray-800 ml-2">{step.title}</h3>
                          </div>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Setting Your Rates */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.ratesTitle}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.ratesDesc}</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {currentContent.rateFactors.map((factor, index) => (
                  <div key={index} className="flex items-center p-4 bg-purple-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-800">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Average Hourly Rates */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.averageRatesTitle}</h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {currentContent.averageRates.map((rate, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-gray-800 font-medium">{rate.service}</span>
                    <span className="text-green-600 font-bold">{rate.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Managing Your Earnings */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.businessTipsTitle}</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {currentContent.businessTips.map((tip, index) => (
                  <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-800">{tip}</span>
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
            <Link href="/become-a-carer/getting-started" passHref>
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

export default PaymentsPageContent;
