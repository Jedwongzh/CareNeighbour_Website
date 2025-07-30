"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedHeader } from '@/components/unified-header';
import { LanguageProvider, useLanguage } from '@/app/contexts/LanguageContext';

const BecomeACarerPageContent = () => {
  const { language, setLanguage, translations } = useLanguage();

  const content = {
    en: {
      title: 'Provide independent support work on CareNeighbour',
      subtitle: 'Support workers make a huge difference in people’s lives. It’s a role filled with purpose, which means it also comes with a lot of responsibility. Learn what independent support work means for you.',
      getStarted: 'Get Started',
      section1Title: 'Support work requires empathy, dedication and responsibility',
      section1P1: 'As a support worker you play a key role in making sure people receive the support they need.',
      section1P2: 'People living with disability or older Australians often need support to live life their way. Your work can make a significant difference to the quality of someone’s life.',
      section1P3: 'This is why reliability and a willingness to work hard are essential to support work.',
      section2Title: 'Is providing support work on CareNeighbour right for you?',
      section2P1: 'On CareNeighbour, independent support workers run their own business, finding and connecting with clients in their local area. Our low fees could mean better earnings for your support sessions. Becoming an independent support worker and working for yourself in this way has many advantages, but there are things to consider:',
      youCan: 'As a support worker on the CareNeighbour platform, you:',
      youCanPoints: [
        'Choose your own hours',
        'Apply for your preferred support worker jobs',
        'Set your own rates',
        'Decide who you want to work with',
        'Build your own business',
      ],
      youNeed: "You'll also need to think about how you'll run your own support work business:",
      youNeedPoints: [
        "You'll need to have your own ABN",
        "You'll find your own clients on CareNeighbour",
        'We recommend you set aside money for tax and super',
        'We also suggest you manage and budget for earnings that vary depending on funding sources and payment types',
      ],
      section3Title: 'What kind of support work can you offer on CareNeighbour?',
      section3P1: 'The services you can provide to clients on CareNeighbour depend on your qualifications and experience.',
      qualifiedTitle: 'Are you a qualified support worker?',
      qualifiedP1: 'This means you are either:',
      qualifiedPoints: [
        'A Registered or Enrolled Nurse',
        'An allied health professional',
        'A qualified personal care worker',
      ],
      qualifiedP2: 'In-demand services on CareNeighbour include nursing, personal care, psychology, occupational therapy, speech therapy, and physiotherapy. If you are qualified to provide any of these services and can supply the necessary documentation, you may be able to find work fast on the CareNeighbour platform.',
      notQualifiedTitle: 'Are you a support worker without any formal qualifications?',
      notQualifiedP1: 'Without qualifications you can still provide support work on CareNeighbour, but you are limited to providing support work for daily living, social and community activities. This includes tasks such as housework, transportation, gardening and meal preparation.',
      enhanceSkillsTitle: 'Enhance skills for support work job opportunities',
      enhanceSkillsP1: 'You could benefit from completing accredited training to increase your skills and provide additional services to your clients.',
      ctaTitle: 'Sign up as an independent support worker on CareNeighbour today',
      section4Title: 'How to get approved to provide support on CareNeighbour',
      section4P1: 'Every support worker must complete a sign-up and verification process before they can offer their services on CareNeighbour. This contributes to the safety of our community and helps support workers meet clients who are the best fit for them. To provide support on CareNeighbour, you must be 18 years of age or older.',
      mandatoryAll: 'Mandatory for all services',
      mandatoryAllPoints: [
        'An Australian Business Number (ABN)',
        'A police check – cost $44',
        'Completed infection control training',
        'At least 2 references',
        'A profile photo and bio',
      ],
      mandatoryTasAct: 'Mandatory in Tasmania or ACT',
      mandatoryTasActPoints: [
        'A valid Working with Vulnerable People card – cost from $131',
      ],
      ifYouWantToProvide: 'If you want to provide nursing, allied health or personal care services',
      nursing: 'Nursing',
      alliedHealth: 'Allied Health',
      personalCare: 'Personal Care',
      ifWorkingWithChildren: 'If you want to work with children and teenagers (under 18 years old)',
      childrenCheck: 'Working with Children Check – cost from $80',
      ifProvidingTransport: 'If you want to provide transport',
      driverLicence: 'A valid Australian driver licence',
      readyTitle: 'I’m ready to become an independent support worker on CareNeighbour',
      readyP1: 'If you have all your documentation ready and you understand what’s required of you as a support worker on CareNeighbour, sign up below.',
      learnMoreTitle: 'I want to learn more:',
      learnMoreLinks: [
        'Becoming a support worker',
        'A support worker’s guide to CareNeighbour',
        'Explore accredited training',
      ],
    },
    zh: {
      title: '在 CareNeighbour 上提供独立支持工作',
      subtitle: '支持工作者在人们的生活中发挥着巨大的作用。这是一个充满使命感的角色，但同时也伴随着巨大的责任。了解独立支持工作对您意味着什么。',
      getStarted: '开始',
      section1Title: '支持工作需要同理心、奉献精神和责任感',
      section1P1: '作为一名支持工作者，您在确保人们获得所需支持方面发挥着关键作用。',
      section1P2: '残疾人或年长的澳大利亚人通常需要支持才能以自己的方式生活。您的工作可以极大地提高某人的生活质量。',
      section1P3: '因此，可靠性和努力工作的意愿对于支持工作至关重要。',
      section2Title: '在 CareNeighbour 上提供支持工作适合您吗？',
      section2P1: '在 CareNeighbour 上，独立支持工作者经营自己的业务，在当地寻找并联系客户。我们的低费用可能意味着您可以通过支持服务获得更高的收入。以这种方式成为独立支持工作者并为自己工作有很多优势，但也有一些需要考虑的事项：',
      youCan: '作为 CareNeighbour 平台上的支持工作者，您可以：',
      youCanPoints: [
        '选择自己的工作时间',
        '申请您喜欢的支持工作者职位',
        '设定自己的费率',
        '决定与谁合作',
        '建立自己的业务',
      ],
      youNeed: '您还需要考虑如何经营自己的支持工作业务：',
      youNeedPoints: [
        '您需要拥有自己的 ABN',
        '您将在 CareNeighbour 上找到自己的客户',
        '我们建议您为税务和养老金留出资金',
        '我们还建议您根据资金来源和付款类型管理和预算收入',
      ],
      section3Title: '您可以在 CareNeighbour 上提供什么样的支持工作？',
      section3P1: '您可以在 CareNeighbour 上为客户提供的服务取决于您的资格和经验。',
      qualifiedTitle: '您是合格的支持工作者吗？',
      qualifiedP1: '这意味着您是以下之一：',
      qualifiedPoints: [
        '注册护士或登记护士',
        '专职医疗人员',
        '合格的个人护理工作者',
      ],
      qualifiedP2: 'CareNeighbour 上需求量大的服务包括护理、个人护理、心理学、职业治疗、言语治疗和物理治疗。如果您有资格提供这些服务并能提供必要的证明文件，您可能很快就能在 CareNeighbour 平台上找到工作。',
      notQualifiedTitle: '您是没有正式资格的支持工作者吗？',
      notQualifiedP1: '没有资格证书，您仍然可以在 CareNeighbour 上提供支持工作，但仅限于提供日常生活、社交和社区活动的支持工作。这包括家务、交通、园艺和备餐等任务。',
      enhanceSkillsTitle: '提升技能以获得支持工作机会',
      enhanceSkillsP1: '您可以从完成认证培训中受益，以提高您的技能并为您的客户提供额外的服务。',
      ctaTitle: '立即注册成为 CareNeighbour 的独立支持工作者',
      section4Title: '如何在 CareNeighbour 上获得提供支持的批准',
      section4P1: '每位支持工作者都必须完成注册和验证过程，然后才能在 CareNeighbour 上提供服务。这有助于我们社区的安全，并帮助支持工作者找到最适合他们的客户。要在 CareNeighbour 上提供支持，您必须年满 18 岁。',
      mandatoryAll: '所有服务强制要求',
      mandatoryAllPoints: [
        '澳大利亚商业号码 (ABN)',
        '无犯罪记录检查 – 费用 $44',
        '完成感染控制培训',
        '至少 2 份推荐信',
        '个人资料照片和简介',
      ],
      mandatoryTasAct: '在塔斯马尼亚州或首都领地强制要求',
      mandatoryTasActPoints: [
        '有效的与弱势群体工作卡 – 费用从 $131 起',
      ],
      ifYouWantToProvide: '如果您想提供护理、专职医疗或个人护理服务',
      nursing: '护理',
      alliedHealth: '专职医疗',
      personalCare: '个人护理',
      ifWorkingWithChildren: '如果您想与儿童和青少年（18 岁以下）一起工作',
      childrenCheck: '与儿童工作检查 – 费用从 $80 起',
      ifProvidingTransport: '如果您想提供交通服务',
      driverLicence: '有效的澳大利亚驾照',
      readyTitle: '我准备好成为 CareNeighbour 的独立支持工作者了',
      readyP1: '如果您已准备好所有文件并了解作为 CareNeighbour 支持工作者的要求，请在下方注册。',
      learnMoreTitle: '我想了解更多：',
      learnMoreLinks: [
        '成为支持工作者',
        'CareNeighbour 支持工作者指南',
        '探索认证培训',
      ],
    },
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div className="bg-gradient-to-r from-purple-200 via-purple-100 to-white text-gray-800 font-sans">
        <UnifiedHeader
          language={language}
          setLanguage={setLanguage}
          translations={translations}
        />
      <div className="container mx-auto px-4 py-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">{currentContent.title}</h1>
          <p className="text-lg max-w-3xl mx-auto">{currentContent.subtitle}</p>
          <Link href="/onboarding">
            <button className="mt-6 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors">
              {currentContent.getStarted}
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-purple-800 mb-4">{currentContent.section1Title}</h2>
            <p className="mb-4">{currentContent.section1P1}</p>
            <p className="mb-4">{currentContent.section1P2}</p>
            <p>{currentContent.section1P3}</p>
          </div>
          <div>
            <Image
              src="/images/become-a-carer.png"
              alt="Caregiver assisting an elderly person"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-purple-800 mb-4 text-center">{currentContent.section2Title}</h2>
          <p className="text-center mb-8">{currentContent.section2P1}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">{currentContent.youCan}</h3>
              <ul className="list-disc list-inside space-y-2">
                {currentContent.youCanPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">{currentContent.youNeed}</h3>
              <ul className="list-disc list-inside space-y-2">
                {currentContent.youNeedPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-purple-800 mb-4 text-center">{currentContent.section3Title}</h2>
          <p className="text-center mb-8">{currentContent.section3P1}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">{currentContent.qualifiedTitle}</h3>
              <p className="mb-4">{currentContent.qualifiedP1}</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                {currentContent.qualifiedPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              <p>{currentContent.qualifiedP2}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">{currentContent.notQualifiedTitle}</h3>
              <p>{currentContent.notQualifiedP1}</p>
              <h3 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">{currentContent.enhanceSkillsTitle}</h3>
              <p>{currentContent.enhanceSkillsP1}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-100 p-8 rounded-lg shadow-lg text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">{currentContent.ctaTitle}</h2>
          <Link href="/onboarding">
            <button className="mt-4 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors">
              {currentContent.getStarted}
            </button>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-purple-800 mb-4 text-center">{currentContent.section4Title}</h2>
          <p className="text-center mb-8">{currentContent.section4P1}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">{currentContent.mandatoryAll}</h3>
              <ul className="list-disc list-inside space-y-2">
                {currentContent.mandatoryAllPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">{currentContent.mandatoryTasAct}</h3>
              <ul className="list-disc list-inside space-y-2">
                {currentContent.mandatoryTasActPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">{currentContent.ifYouWantToProvide}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>{currentContent.nursing}</li>
                <li>{currentContent.alliedHealth}</li>
                <li>{currentContent.personalCare}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">{currentContent.ifWorkingWithChildren}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>{currentContent.childrenCheck}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">{currentContent.ifProvidingTransport}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>{currentContent.driverLicence}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-100 p-8 rounded-lg shadow-lg text-center mt-12">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">{currentContent.readyTitle}</h2>
          <p className="mb-6">{currentContent.readyP1}</p>
          <Link href="/onboarding">
            <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors">
              {currentContent.getStarted}
            </button>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">{currentContent.learnMoreTitle}</h2>
          <ul className="space-y-2">
            {currentContent.learnMoreLinks.map((link, index) => (
              <li key={index}>
                <a href="#" className="text-purple-600 hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const BecomeACarerPage = () => (
  <LanguageProvider>
    <BecomeACarerPageContent />
  </LanguageProvider>
);

export default BecomeACarerPage;
