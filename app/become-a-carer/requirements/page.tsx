"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedHeader } from '@/components/unified-header';
import { UnifiedFooter } from '@/components/unified-footer';
import { LanguageProvider, useLanguage } from '@/app/contexts/LanguageContext';
import GradientBackground from '@/components/GradientBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Users, Heart, Shield, ArrowRight, AlertCircle } from 'lucide-react';

const RequirementsPageContent = () => {
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

      title: 'Requirements & Approval Process',
      subtitle: 'Our verification process ensures a safe and trusted community for everyone. All support workers must be 18 or older and meet the following requirements.',

      safetyTitle: 'Safety First',
      safetyDesc: 'Your safety and that of our clients is our top priority. Our comprehensive verification process helps create a trusted community where everyone feels secure.',

      requirementsTitle: 'What You\'ll Need',
      requirements: [
        { 
          title: 'Mandatory for All', 
          items: [
            'Australian Business Number (ABN)',
            'National Police Check',
            'Infection Control Training',
            'Two Professional References'
          ], 
          icon: <FileText className="w-8 h-8 text-purple-600" />,
          note: 'Required for all support workers regardless of services offered'
        },
        { 
          title: 'Working with Children', 
          items: [
            'Valid Working with Children Check (if applicable)'
          ], 
          icon: <Users className="w-8 h-8 text-purple-600" />,
          note: 'Only required if you plan to work with clients under 18'
        },
        { 
          title: 'Driving & Transport', 
          items: [
            'Valid Australian Driver\'s Licence',
            'Vehicle Registration & Insurance'
          ], 
          icon: <Heart className="w-8 h-8 text-purple-600" />,
          note: 'Only required if offering transportation services'
        },
        { 
          title: 'Specific States', 
          items: [
            'Working with Vulnerable People Card (TAS/ACT)'
          ], 
          icon: <Shield className="w-8 h-8 text-purple-600" />,
          note: 'State-specific requirements for Tasmania and ACT residents'
        },
      ],

      processTitle: 'The Approval Process',
      processSteps: [
        {
          step: '1',
          title: 'Submit Application',
          description: 'Complete your profile and upload all required documents through our secure portal.',
          timeframe: '15-30 minutes'
        },
        {
          step: '2',
          title: 'Document Verification',
          description: 'Our team reviews all your documents to ensure they meet our standards.',
          timeframe: '2-3 business days'
        },
        {
          step: '3',
          title: 'Reference Checks',
          description: 'We contact your professional references to verify your experience and character.',
          timeframe: '3-5 business days'
        },
        {
          step: '4',
          title: 'Final Review',
          description: 'Complete assessment of your application and background checks.',
          timeframe: '1-2 business days'
        },
        {
          step: '5',
          title: 'Approval & Onboarding',
          description: 'Welcome to CareNeighbour! Complete your profile and start connecting with clients.',
          timeframe: 'Immediate'
        }
      ],

      costsTitle: 'Associated Costs',
      costsDesc: 'While joining CareNeighbour is free, there are some external costs for required documents:',
      costs: [
        { item: 'National Police Check', cost: '$44' },
        { item: 'Working with Children Check', cost: 'From $80' },
        { item: 'Working with Vulnerable People Card', cost: 'From $131' },
        { item: 'Infection Control Training', cost: 'From $50' }
      ],

      tipsTitle: 'Tips for Faster Approval',
      tips: [
        'Ensure all documents are current and clearly legible',
        'Provide complete contact details for your references',
        'Double-check that your ABN is active and valid',
        'Upload documents in the correct format (PDF preferred)',
        'Respond promptly to any requests for additional information'
      ],

      ctaTitle: 'Ready to Learn About Payments?',
      ctaSubtitle: 'Discover how our transparent payment system works and how you\'ll earn money.',
      nextStep: 'Next: Payments & Rates'
    },
    zh: {
      heroLogo: "零距",
      howItWorks: "运作方式",
      aboutUs: "关于我们",
      joinWaitlist: "加入等候名单",
      SourceforCare: "护理服务",
      BecomeACarer: "成为护理员",
      footerCopyright: "© 2024 零距. 版权所有。",

      title: '要求和批准流程',
      subtitle: '我们的验证流程确保为每个人提供一个安全可信的社区。所有支持工作者必须年满18岁并满足以下要求。',

      safetyTitle: '安全第一',
      safetyDesc: '您的安全和我们客户的安全是我们的首要任务。我们全面的验证流程有助于创建一个每个人都感到安全的可信社区。',

      requirementsTitle: '您需要什么',
      requirements: [
        { 
          title: '所有护理员必备', 
          items: [
            '澳大利亚商业号码 (ABN)',
            '无犯罪记录检查',
            '感染控制培训',
            '两份专业推荐信'
          ], 
          icon: <FileText className="w-8 h-8 text-purple-600" />,
          note: '无论提供何种服务，所有支持工作者都必需'
        },
        { 
          title: '与儿童工作', 
          items: [
            '有效的与儿童工作检查（如适用）'
          ], 
          icon: <Users className="w-8 h-8 text-purple-600" />,
          note: '仅在您计划与18岁以下客户工作时需要'
        },
        { 
          title: '驾驶与交通', 
          items: [
            '有效的澳大利亚驾照',
            '车辆注册和保险'
          ], 
          icon: <Heart className="w-8 h-8 text-purple-600" />,
          note: '仅在提供交通服务时需要'
        },
        { 
          title: '特定州要求', 
          items: [
            '与弱势群体工作卡 (TAS/ACT)'
          ], 
          icon: <Shield className="w-8 h-8 text-purple-600" />,
          note: '塔斯马尼亚州和首都领地居民的特定州要求'
        },
      ],

      processTitle: '批准流程',
      processSteps: [
        {
          step: '1',
          title: '提交申请',
          description: '通过我们的安全门户完成您的档案并上传所有必需文件。',
          timeframe: '15-30分钟'
        },
        {
          step: '2',
          title: '文件验证',
          description: '我们的团队审查您的所有文件以确保它们符合我们的标准。',
          timeframe: '2-3个工作日'
        },
        {
          step: '3',
          title: '推荐信检查',
          description: '我们联系您的专业推荐人以验证您的经验和品格。',
          timeframe: '3-5个工作日'
        },
        {
          step: '4',
          title: '最终审查',
          description: '对您的申请和背景检查进行完整评估。',
          timeframe: '1-2个工作日'
        },
        {
          step: '5',
          title: '批准和入职',
          description: '欢迎来到零距！完成您的档案并开始与客户联系。',
          timeframe: '立即'
        }
      ],

      costsTitle: '相关费用',
      costsDesc: '虽然加入零距是免费的，但必需文件有一些外部费用：',
      costs: [
        { item: '无犯罪记录检查', cost: '$44' },
        { item: '与儿童工作检查', cost: '从$80起' },
        { item: '与弱势群体工作卡', cost: '从$131起' },
        { item: '感染控制培训', cost: '从$50起' }
      ],

      tipsTitle: '更快批准的提示',
      tips: [
        '确保所有文件都是最新的且清晰易读',
        '为您的推荐人提供完整的联系方式',
        '仔细检查您的ABN是否有效和活跃',
        '以正确格式上传文件（首选PDF）',
        '及时回应任何额外信息请求'
      ],

      ctaTitle: '准备了解付款了吗？',
      ctaSubtitle: '发现我们透明的付款系统如何运作以及您如何赚钱。',
      nextStep: '下一步：付款和费率'
    }
  };

  const currentContent = content[language as keyof typeof content];
  const headerTranslations = {
    heroLogo: currentContent.heroLogo,
    howItWorks: currentContent.howItWorks,
    aboutUs: currentContent.aboutUs,
    joinWaitlist: currentContent.joinWaitlist,
    SourceforCare: currentContent.SourceforCare,
    mainPage: currentContent.heroLogo,
    BecomeACarer: currentContent.BecomeACarer,
  };
  const footerTranslations = {
    aboutUs: currentContent.aboutUs,
    mainPage: currentContent.heroLogo,
    footerCopyright: currentContent.footerCopyright,
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-800">
      <GradientBackground />
      <UnifiedHeader
        language={language}
        setLanguage={setLanguage}
        translations={headerTranslations}
      />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/become-a-carer.png"
              alt="Professional documentation and approval"
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

        {/* Safety First */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{currentContent.safetyTitle}</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.safetyDesc}</p>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.requirementsTitle}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentContent.requirements.map((req, index) => (
                <Card key={index} className="text-center p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-4">{req.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{req.title}</h3>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    {req.items.map((item, i) => <li key={i} className="text-sm">{item}</li>)}
                  </ul>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-800">{req.note}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* The Approval Process */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.processTitle}</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {currentContent.processSteps.map((step, index) => (
                  <Card key={index} className="p-6 shadow-lg">
                    <CardContent className="pt-0">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                            <span className="text-sm text-purple-600 font-medium">{step.timeframe}</span>
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

        {/* Associated Costs */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.costsTitle}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.costsDesc}</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {currentContent.costs.map((cost, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-gray-800 font-medium">{cost.item}</span>
                    <span className="text-purple-600 font-bold">{cost.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tips for Faster Approval */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.tipsTitle}</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {currentContent.tips.map((tip, index) => (
                  <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                    <AlertCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
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
            <Link href="/become-a-carer/payments-and-rates" passHref>
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

const RequirementsPage = () => (
  <LanguageProvider>
    <RequirementsPageContent />
  </LanguageProvider>
);

export default RequirementsPage;
