"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedHeader } from '@/components/unified-header';
import { UnifiedFooter } from '@/components/unified-footer';
import { LanguageProvider, useLanguage } from '@/app/contexts/LanguageContext';
import GradientBackground from '@/components/GradientBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Briefcase, FileText, Heart, Shield, Users, ArrowRight, DollarSign, ShieldCheck, Clock, Percent } from 'lucide-react';

const BecomeACarerPageContent = () => {
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

      title: 'Join CareNeighbour and Make a Difference',
      subtitle: 'Connect with individuals and families in your community who need your support. Start your journey as an independent support worker today.',
      getStarted: 'Get Started Now',

      section1Title: 'Why Become a Carer with Us?',
      section1P1: 'Being a support worker is more than a job; it’s a calling. It’s about providing compassionate care that empowers people to live with dignity and independence. At CareNeighbour, we connect you with clients who value your skills and cultural understanding.',

      section2Title: 'The Freedom of Independent Support Work',
      section2P1: 'Working for yourself on the CareNeighbour platform offers flexibility and control over your career. Here’s what you can expect:',
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

      paymentSectionTitle: 'Transparent & Secure Payments',
      paymentSectionP1: 'Our platform handles all client payments securely, so you can focus on providing great care. We believe in transparent pricing and timely payments.',
      paymentFeatures: [
        { title: 'Set Your Own Rates', description: 'You have the freedom to set hourly rates that reflect your skills and experience.', icon: 'DollarSign' },
        { title: 'Secure In-App Payments', description: 'Clients pay for sessions directly through the platform. No need to handle cash or chase invoices.', icon: 'ShieldCheck' },
        { title: 'Timely Payouts', description: 'Receive your earnings directly to your bank account on a regular schedule after each session.', icon: 'Clock' },
        { title: 'Low Platform Fees', description: 'We charge a small, transparent platform fee, which helps us maintain and improve the platform.', icon: 'Percent' }
      ],

      section3Title: 'Types of Support You Can Provide',
      section3P1: 'Your qualifications and experience determine the services you can offer. We welcome a wide range of skills to meet diverse community needs.',
      qualifiedTitle: 'Qualified & Specialised Care',
      qualifiedPoints: [
        'Registered or Enrolled Nursing',
        'Allied Health (e.g., Physiotherapy, OT)',
        'Personal Care and Assistance',
        'Dementia and Palliative Care',
      ],
      notQualifiedTitle: 'Companionship & Daily Living',
      notQualifiedPoints: [
        'Social support and community access',
        'Transportation and errands',
        'Meal preparation and housekeeping',
        'Gardening and home maintenance',
      ],

      section4Title: 'Your Pathway to Approval',
      section4P1: 'Our verification process ensures a safe and trusted community for everyone. All support workers must be 18 or older and meet the following requirements:',
      requirements: [
        { title: 'Mandatory for All', items: ['Australian Business Number (ABN)', 'National Police Check', 'Infection Control Training', 'Two Professional References'], icon: <FileText className="w-8 h-8 text-purple-600" /> },
        { title: 'Working with Children', items: ['Valid Working with Children Check (if applicable)'], icon: <Users className="w-8 h-8 text-purple-600" /> },
        { title: 'Driving & Transport', items: ['Valid Australian Driver\'s Licence', 'Vehicle Registration & Insurance'], icon: <Heart className="w-8 h-8 text-purple-600" /> },
        { title: 'Specific States', items: ['Working with Vulnerable People Card (TAS/ACT)'], icon: <Shield className="w-8 h-8 text-purple-600" /> },
      ],

      ctaTitle: 'Ready to Start Your Journey?',
      ctaSubtitle: 'Join a community dedicated to providing exceptional care.',
    },
    zh: {
      heroLogo: "零距",
      howItWorks: "运作方式",
      aboutUs: "关于我们",
      joinWaitlist: "加入等候名单",
      SourceforCare: "护理服务",
      BecomeACarer: "成为护理员",
      footerCopyright: "© 2024 零距. 版权所有。",

      title: '加入零距，创造不同',
      subtitle: '与您社区中需要支持的个人和家庭建立联系。立即开始您作为独立支持工作者的旅程。',
      getStarted: '立即开始',

      section1Title: '为何选择成为我们的护理员？',
      section1P1: '支持工作者不仅仅是一份工作，更是一种使命。它是关于提供富有同情心的关怀，使人们能够有尊严和独立地生活。在零距，我们将您与重视您技能和文化理解的客户联系起来。',

      section2Title: '独立支持工作的自由',
      section2P1: '在零距平台上为自己工作，为您的职业生涯提供了灵活性和控制力。您可以期待：',
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

      paymentSectionTitle: '透明安全的支付',
      paymentSectionP1: '我们的平台安全地处理所有客户付款，让您可以专注于提供优质的护理服务。我们致力于为所有支持工作者提供透明的定价和及时的付款。',
      paymentFeatures: [
        { title: '自行设定费率', description: '您有权根据您的技能和经验自由设定小时费率。', icon: 'DollarSign' },
        { title: '应用内安全支付', description: '客户通过平台直接支付服务费用，无需处理现金或追讨发票。', icon: 'ShieldCheck' },
        { title: '及时放款', description: '每次服务完成后，您的收入将按时直接存入您的银行账户。', icon: 'Clock' },
        { title: '低平台费用', description: '我们只收取少量透明的平台费用，用于维护和改进平台。', icon: 'Percent' }
      ],

      section3Title: '您可以提供的支持类型',
      section3P1: '您的资格和经验决定了您可以提供的服务。我们欢迎各种技能，以满足多样化的社区需求。',
      qualifiedTitle: '专业及特殊护理',
      qualifiedPoints: [
        '注册护士或登记护士护理',
        '联合健康（如物理治疗、职业治疗）',
        '个人护理和协助',
        '失智症和安宁疗护',
      ],
      notQualifiedTitle: '陪伴与日常生活',
      notQualifiedPoints: [
        '社交支持和社区活动参与',
        '交通和差事',
        '备餐和家政',
        '园艺和家庭维护',
      ],

      section4Title: '您的认证途径',
      section4P1: '我们的验证流程确保为每个人提供一个安全可信的社区。所有支持工作者必须年满18岁并满足以下要求：',
      requirements: [
        { title: '所有护理员必备', items: ['澳大利亚商业号码 (ABN)', '无犯罪记录检查', '感染控制培训', '两份专业推荐信'], icon: <FileText className="w-8 h-8 text-purple-600" /> },
        { title: '与儿童工作', items: ['有效的与儿童工作检查（如适用）'], icon: <Users className="w-8 h-8 text-purple-600" /> },
        { title: '驾驶与交通', items: ['有效的澳大利亚驾照', '车辆注册和保险'], icon: <Heart className="w-8 h-8 text-purple-600" /> },
        { title: '特定州要求', items: ['与弱势群体工作卡 (TAS/ACT)'], icon: <Shield className="w-8 h-8 text-purple-600" /> },
      ],

      ctaTitle: '准备好开始您的旅程了吗？',
      ctaSubtitle: '加入一个致力于提供卓越护理的社区。',
    },
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

  const icons: { [key: string]: React.ElementType } = {
    DollarSign,
    ShieldCheck,
    Clock,
    Percent,
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
            <Link href="/onboarding" passHref>
              <Button size="lg" className="mt-8 font-semibold text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-4 h-auto transition-transform duration-200 hover:scale-105">
                {currentContent.getStarted}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Section 1: Why Become a Carer */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{currentContent.section1Title}</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.section1P1}</p>
          </div>
        </section>

        {/* Section 2: Freedom and Responsibilities */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.section2Title}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.section2P1}</p>
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

        {/* Payment Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.paymentSectionTitle}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.paymentSectionP1}</p>
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

        {/* Section 3: Types of Support */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.section3Title}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.section3P1}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-purple-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-purple-800 mb-4">{currentContent.qualifiedTitle}</h3>
                <ul className="space-y-2">
                  {currentContent.qualifiedPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-purple-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-purple-800 mb-4">{currentContent.notQualifiedTitle}</h3>
                <ul className="space-y-2">
                  {currentContent.notQualifiedPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Approval Pathway */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.section4Title}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.section4P1}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentContent.requirements.map((req, index) => (
                <Card key={index} className="text-center p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-4">{req.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{req.title}</h3>
                  <ul className="space-y-1 text-gray-600">
                    {req.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
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
            <Link href="/onboarding" passHref>
              <Button size="lg" variant="secondary" className="font-semibold text-lg bg-white text-purple-700 hover:bg-gray-100 rounded-full px-8 py-4 h-auto transition-transform duration-200 hover:scale-105">
                {currentContent.getStarted}
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

const BecomeACarerPage = () => (
  <LanguageProvider>
    <BecomeACarerPageContent />
  </LanguageProvider>
);

export default BecomeACarerPage;
