"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, User, Mail, Phone, ArrowRight } from 'lucide-react';
import { UnifiedHeader } from '@/components/unified-header';
import { LanguageProvider, useLanguage } from '@/app/contexts/LanguageContext';
import GradientBackground from '@/components/GradientBackground';

const OnboardingPageContent = () => {
  const { language, setLanguage } = useLanguage();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = language === 'en' ? 'First name is required' : '名字是必需的';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = language === 'en' ? 'First name must be at least 2 characters' : '名字至少需要2个字符';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = language === 'en' ? 'Last name is required' : '姓氏是必需的';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = language === 'en' ? 'Last name must be at least 2 characters' : '姓氏至少需要2个字符';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? 'Email is required' : '电子邮件是必需的';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Please enter a valid email address' : '请输入有效的电子邮件地址';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'en' ? 'Phone number is required' : '电话号码是必需的';
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = language === 'en' ? 'Please enter a valid phone number' : '请输入有效的电话号码';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to thank you page if provided
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl;
        } else {
          setSubmitMessage(language === 'en' ? 'Thank you for submitting!' : '感谢您的提交！');
          setIsSuccess(true);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
          });
        }
      } else {
        setSubmitMessage(result.message || (language === 'en' ? 'An error occurred. Please try again.' : '发生错误，请重试。'));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage(language === 'en' ? 'An error occurred. Please try again.' : '发生错误，请重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = {
    en: {
      title: 'Join Our Care Team',
      subtitle: 'Help make a difference in people\'s lives. Complete your application below.',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      submit: 'Join Care Team',
      submitting: 'Submitting...',
      successTitle: 'Application Submitted!',
      successMessage: 'Thank you for your interest in joining our care team. We\'ll review your application and get back to you soon.',
      helpText: 'Need help? Contact us at support@careneighbour.com'
    },
    zh: {
      title: '加入我们的护理团队',
      subtitle: '帮助改变人们的生活。请在下方完成申请。',
      firstName: '名',
      lastName: '姓',
      email: '电子邮件地址',
      phone: '电话号码',
      submit: '加入护理团队',
      submitting: '提交中...',
      successTitle: '申请已提交！',
      successMessage: '感谢您有兴趣加入我们的护理团队。我们将审查您的申请并尽快回复您。',
      helpText: '需要帮助吗？请联系 support@careneighbour.com'
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
        {/* Hero Section */}
        <section className="w-full py-10 md:py-20 lg:py-16 relative overflow-hidden flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center justify-center">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
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
                  className="text-lg md:text-xl text max-w-2xl mx-auto"
                >
                  {currentContent.subtitle}
                </motion.p>
              </div>

              {/* Form Container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-md bg-gray-200/10 bg-clip-padding"
              >
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.successTitle}</h3>
                    <p className="text-gray-700 mb-8">{currentContent.successMessage}</p>
                    <button
                      onClick={() => window.location.href = '/'}
                      className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors font-medium"
                    >
                      Return to Home
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center mb-8">
                      <User className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                      <p className="text-gray-600">Tell us a bit about yourself</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          {currentContent.firstName} *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/80 backdrop-blur-sm ${
                            errors.firstName ? 'border-red-500' : 'border-purple-200'
                          }`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          {currentContent.lastName} *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/80 backdrop-blur-sm ${
                            errors.lastName ? 'border-red-500' : 'border-purple-200'
                          }`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline h-4 w-4 mr-1" />
                        {currentContent.email} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/80 backdrop-blur-sm ${
                          errors.email ? 'border-red-500' : 'border-purple-200'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline h-4 w-4 mr-1" />
                        {currentContent.phone} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/80 backdrop-blur-sm ${
                          errors.phone ? 'border-red-500' : 'border-purple-200'
                        }`}
                        placeholder="+61 4XX XXX XXX"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-lg shadow-lg transform hover:scale-105 active:scale-95"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                            <span>{currentContent.submitting}</span>
                          </>
                        ) : (
                          <>
                            <span>{currentContent.submit}</span>
                            <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>

                    {submitMessage && !isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg"
                      >
                        <p className="text-red-700">{submitMessage}</p>
                      </motion.div>
                    )}
                  </form>
                )}
              </motion.div>

              {/* Help Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-8"
              >
                <p className="text-gray-600">
                  {currentContent.helpText}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const OnboardingPage = () => (
  <LanguageProvider>
    <OnboardingPageContent />
  </LanguageProvider>
);

export default OnboardingPage;
