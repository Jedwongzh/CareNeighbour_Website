"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home, Mail } from 'lucide-react';
import Link from 'next/link';
import { UnifiedHeader } from '@/components/unified-header';
import { LanguageProvider, useLanguage } from '@/app/contexts/LanguageContext';
import GradientBackground from '@/components/GradientBackground';

const OnboardingThankYouContent = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    en: {
      title: 'Application Submitted Successfully!',
      subtitle: 'Thank you for your interest in joining our care team.',
      message: 'We have received your application and will review it carefully. Our team will get back to you within 2-3 business days.',
      nextSteps: 'What happens next?',
      step1: {
        title: 'Application Review',
        description: 'Our team will review your application and qualifications.'
      },
      step2: {
        title: 'Interview Process',
        description: 'If selected, we\'ll contact you for an interview and background check.'
      },
      step3: {
        title: 'Welcome to the Team',
        description: 'Once approved, you\'ll receive onboarding materials and can start helping families.'
      },
      backToHome: 'Back to Home',
      contactUs: 'Contact Us',
      contactText: 'Have questions? We\'re here to help!',
      email: 'support@careneighbour.com'
    },
    zh: {
      title: '申请提交成功！',
      subtitle: '感谢您有兴趣加入我们的护理团队。',
      message: '我们已收到您的申请并将仔细审查。我们的团队将在2-3个工作日内回复您。',
      nextSteps: '接下来会发生什么？',
      step1: {
        title: '申请审查',
        description: '我们的团队将审查您的申请和资格。'
      },
      step2: {
        title: '面试流程',
        description: '如果被选中，我们将联系您进行面试和背景调查。'
      },
      step3: {
        title: '欢迎加入团队',
        description: '一旦获得批准，您将收到入职材料并可以开始帮助家庭。'
      },
      backToHome: '返回主页',
      contactUs: '联系我们',
      contactText: '有问题吗？我们来帮助您！',
      email: 'support@careneighbour.com'
    },
  };

  const currentContent = content[language as keyof typeof content];

  // Header translations
  const headerTranslations = {
    heroLogo: language === 'zh' ? '零距' : 'CareNeighbour',
    howItWorks: language === 'zh' ? '如何运作' : 'How It Works',
    aboutUs: language === 'zh' ? '关于我们' : 'About Us',
    joinWaitlist: language === 'zh' ? '加入等候名单' : 'Join Waitlist',
    SourceforCare: language === 'zh' ? '护理服务' : 'Source for Care',
    mainPage: language === 'zh' ? '主页' : 'Home',
    BecomeACarer: language === 'zh' ? '成为护理员' : 'Become a Carer'
  };

  return (
    <div className="flex min-h-screen flex-col">
      <GradientBackground />
      <UnifiedHeader
        language={language}
        setLanguage={setLanguage}
        translations={headerTranslations}
      />
      
      <main className="flex-1">
        <section className="w-full py-10 md:py-20 lg:py-16 relative overflow-hidden flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center justify-center">
            <div className="max-w-4xl mx-auto">
              
              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
              >
                <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-6" />
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                >
                  <span className="gradient-text-fill">{currentContent.title}</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg md:text-xl text max-w-2xl mx-auto mb-6"
                >
                  {currentContent.subtitle}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-base text-gray-600 max-w-2xl mx-auto"
                >
                  {currentContent.message}
                </motion.p>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-md bg-gray-200/10 bg-clip-padding mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {currentContent.nextSteps}
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-purple-600 font-bold text-lg">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {currentContent.step1.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {currentContent.step1.description}
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-purple-600 font-bold text-lg">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {currentContent.step2.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {currentContent.step2.description}
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-purple-600 font-bold text-lg">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {currentContent.step3.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {currentContent.step3.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              >
                <Link 
                  href="/"
                  className="flex items-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition-colors font-medium text-lg shadow-lg"
                >
                  <Home className="h-5 w-5" />
                  <span>{currentContent.backToHome}</span>
                </Link>
                
                <a 
                  href={`mailto:${currentContent.email}`}
                  className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-purple-600 border-2 border-purple-200 px-8 py-4 rounded-full hover:bg-purple-50 transition-colors font-medium text-lg shadow-lg"
                >
                  <Mail className="h-5 w-5" />
                  <span>{currentContent.contactUs}</span>
                </a>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <p className="text-gray-600 mb-2">
                  {currentContent.contactText}
                </p>
                <p className="text-purple-600 font-medium">
                  {currentContent.email}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const OnboardingThankYouPage = () => (
  <LanguageProvider>
    <OnboardingThankYouContent />
  </LanguageProvider>
);

export default OnboardingThankYouPage;
