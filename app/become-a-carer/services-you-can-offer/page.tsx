"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedHeader } from '@/components/unified-header';
import { UnifiedFooter } from '@/components/unified-footer';
import { LanguageProvider, useLanguage } from '@/app/contexts/LanguageContext';
import GradientBackground from '@/components/GradientBackground';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const ServicesPageContent = () => {
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

      title: 'Services You Can Offer',
      subtitle: 'Your qualifications and experience determine the services you can provide. We welcome a wide range of skills to meet diverse community needs.',

      introTitle: 'Match Your Skills to Client Needs',
      introP1: 'CareNeighbour connects support workers with clients based on their specific needs and your qualifications. Whether you\'re a qualified healthcare professional or someone passionate about helping others, there\'s a place for you on our platform.',

      qualifiedTitle: 'Qualified & Specialised Care',
      qualifiedDesc: 'If you have formal qualifications in healthcare or support work, you can provide specialised services:',
      qualifiedPoints: [
        'Registered or Enrolled Nursing',
        'Allied Health (e.g., Physiotherapy, OT)',
        'Personal Care and Assistance',
        'Dementia and Palliative Care',
        'Mental Health Support',
        'Medication Management',
        'Wound Care and Clinical Tasks',
        'Disability Support (NDIS funded)'
      ],

      notQualifiedTitle: 'Companionship & Daily Living Support',
      notQualifiedDesc: 'You don\'t need formal qualifications to make a difference. Many valuable services focus on companionship and daily living:',
      notQualifiedPoints: [
        'Social support and community access',
        'Transportation and errands',
        'Meal preparation and housekeeping',
        'Gardening and home maintenance',
        'Pet care and companionship',
        'Technology assistance',
        'Shopping and appointments',
        'Cultural and language support'
      ],

      specialServicesTitle: 'Specialised Cultural Services',
      specialServicesDesc: 'CareNeighbour values cultural diversity and offers unique opportunities for culturally-specific support:',
      specialServices: [
        'Cantonese-speaking support workers',
        'Mandarin-speaking support workers',
        'Cultural meal preparation',
        'Traditional medicine understanding',
        'Religious and cultural practices support',
        'Family-oriented care approaches'
      ],

      enhanceTitle: 'Enhance Your Skills',
      enhanceDesc: 'Want to expand the services you can offer? Consider these training opportunities:',
      trainingOptions: [
        'Certificate III in Individual Support',
        'First Aid and CPR certification',
        'Medication handling training',
        'Dementia care specialisation',
        'Mental health first aid',
        'Cultural competency training'
      ],

      ctaTitle: 'Ready to Learn About Requirements?',
      ctaSubtitle: 'Discover what you need to get approved and start providing support.',
      nextStep: 'Next: Requirements & Approval'
    },
    zh: {
      heroLogo: "零距",
      howItWorks: "运作方式",
      aboutUs: "关于我们",
      joinWaitlist: "加入等候名单",
      SourceforCare: "护理服务",
      BecomeACarer: "成为护理员",
      footerCopyright: "© 2024 零距. 版权所有。",

      title: '您可以提供的服务',
      subtitle: '您的资格和经验决定了您可以提供的服务。我们欢迎各种技能，以满足多样化的社区需求。',

      introTitle: '将您的技能与客户需求匹配',
      introP1: '零距根据客户的具体需求和您的资格将支持工作者与客户联系起来。无论您是合格的医疗保健专业人员还是热衷于帮助他人的人，我们的平台都有您的位置。',

      qualifiedTitle: '专业及特殊护理',
      qualifiedDesc: '如果您在医疗保健或支持工作方面具有正式资格，您可以提供专业服务：',
      qualifiedPoints: [
        '注册护士或登记护士护理',
        '联合健康（如物理治疗、职业治疗）',
        '个人护理和协助',
        '失智症和安宁疗护',
        '心理健康支持',
        '药物管理',
        '伤口护理和临床任务',
        '残疾支持（NDIS资助）'
      ],

      notQualifiedTitle: '陪伴与日常生活支持',
      notQualifiedDesc: '您不需要正式资格就能产生影响。许多有价值的服务专注于陪伴和日常生活：',
      notQualifiedPoints: [
        '社交支持和社区活动参与',
        '交通和差事',
        '备餐和家政',
        '园艺和家庭维护',
        '宠物护理和陪伴',
        '技术协助',
        '购物和预约',
        '文化和语言支持'
      ],

      specialServicesTitle: '专业文化服务',
      specialServicesDesc: '零距重视文化多样性，为特定文化支持提供独特机会：',
      specialServices: [
        '说粤语的支持工作者',
        '说普通话的支持工作者',
        '文化餐食准备',
        '传统医学理解',
        '宗教和文化实践支持',
        '以家庭为导向的护理方法'
      ],

      enhanceTitle: '提升您的技能',
      enhanceDesc: '想要扩展您可以提供的服务吗？考虑这些培训机会：',
      trainingOptions: [
        '个人支持三级证书',
        '急救和心肺复苏认证',
        '药物处理培训',
        '失智症护理专业',
        '心理健康急救',
        '文化能力培训'
      ],

      ctaTitle: '准备了解要求了吗？',
      ctaSubtitle: '发现您需要什么才能获得批准并开始提供支持。',
      nextStep: '下一步：要求和批准'
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
              alt="Support worker providing care"
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

        {/* Introduction */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{currentContent.introTitle}</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.introP1}</p>
          </div>
        </section>

        {/* Qualified and Non-qualified Services */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-purple-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-purple-800 mb-4">{currentContent.qualifiedTitle}</h3>
                <p className="text-gray-600 mb-6">{currentContent.qualifiedDesc}</p>
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
                <p className="text-gray-600 mb-6">{currentContent.notQualifiedDesc}</p>
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

        {/* Specialised Cultural Services */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.specialServicesTitle}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.specialServicesDesc}</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {currentContent.specialServices.map((service, index) => (
                  <div key={index} className="flex items-center p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-800">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhance Your Skills */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.enhanceTitle}</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">{currentContent.enhanceDesc}</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {currentContent.trainingOptions.map((option, index) => (
                  <div key={index} className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-800">{option}</span>
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
            <Link href="/become-a-carer/requirements" passHref>
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

const ServicesPage = () => (
  <LanguageProvider>
    <ServicesPageContent />
  </LanguageProvider>
);

export default ServicesPage;
