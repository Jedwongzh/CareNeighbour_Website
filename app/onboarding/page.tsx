"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, User, Mail, Phone, Building2, MapPin, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { UnifiedHeader } from '@/components/unified-header';
import { LanguageProvider, useLanguage } from '@/app/contexts/LanguageContext';
import GradientBackground from '@/components/GradientBackground';

const OnboardingPageContent = () => {
  const { language, setLanguage } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    abn: '',
    address: '',
    experience: '',
    qualifications: '',
    availability: '',
    terms: false,
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = language === 'en' ? 'First name is required' : '名字是必需的';
      if (!formData.lastName.trim()) newErrors.lastName = language === 'en' ? 'Last name is required' : '姓氏是必需的';
      if (!formData.email.trim()) newErrors.email = language === 'en' ? 'Email is required' : '电子邮件是必需的';
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = language === 'en' ? 'Please enter a valid email' : '请输入有效的电子邮件';
      }
      if (!formData.phone.trim()) newErrors.phone = language === 'en' ? 'Phone number is required' : '电话号码是必需的';
    }
    
    if (step === 2) {
      if (!formData.abn.trim()) newErrors.abn = language === 'en' ? 'ABN is required' : 'ABN是必需的';
      if (!formData.address.trim()) newErrors.address = language === 'en' ? 'Address is required' : '地址是必需的';
    }
    
    if (step === 3) {
      if (!formData.experience.trim()) newErrors.experience = language === 'en' ? 'Experience description is required' : '经验描述是必需的';
      if (!formData.availability.trim()) newErrors.availability = language === 'en' ? 'Availability is required' : '可用性是必需的';
      if (!formData.terms) newErrors.terms = language === 'en' ? 'Please accept the terms and conditions' : '请接受条款和条件';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
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
        setSubmitMessage(language === 'en' ? 'Thank you for submitting!' : '感谢您的提交！');
        setIsSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          abn: '',
          address: '',
          experience: '',
          qualifications: '',
          availability: '',
          terms: false,
        });
      } else {
        setSubmitMessage(language === 'en' ? 'An error occurred. Please try again.' : '发生错误，请重试。');
      }
    } catch (error) {
      setSubmitMessage(language === 'en' ? 'An error occurred. Please try again.' : '发生错误，请重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = {
    en: {
      title: 'Join Our Care Team',
      subtitle: 'Help make a difference in people\'s lives. Complete your application in just a few easy steps.',
      step1Title: 'Personal Information',
      step2Title: 'Professional Details',
      step3Title: 'Experience & Availability',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      abn: 'ABN (Australian Business Number)',
      address: 'Home Address',
      experience: 'Care Experience',
      experiencePlaceholder: 'Tell us about your experience in care, healthcare, or related fields...',
      qualifications: 'Qualifications & Certifications',
      qualificationsPlaceholder: 'List any relevant qualifications, certificates, or training...',
      availability: 'Availability',
      availabilityOptions: {
        fullTime: 'Full-time',
        partTime: 'Part-time',
        weekends: 'Weekends only',
        flexible: 'Flexible hours'
      },
      terms: 'I agree to the terms and conditions and understand that my application will be reviewed',
      nextStep: 'Next Step',
      prevStep: 'Previous',
      submit: 'Submit Application',
      submitting: 'Submitting...',
      progressText: 'Step {current} of {total}',
      successTitle: 'Application Submitted!',
      successMessage: 'Thank you for your interest in joining our care team. We\'ll review your application and get back to you soon.',
    },
    zh: {
      title: '加入我们的护理团队',
      subtitle: '帮助改变人们的生活。只需几个简单步骤即可完成申请。',
      step1Title: '个人信息',
      step2Title: '专业详情',
      step3Title: '经验与可用性',
      firstName: '名',
      lastName: '姓',
      email: '电子邮件地址',
      phone: '电话号码',
      abn: 'ABN（澳大利亚商业号码）',
      address: '家庭住址',
      experience: '护理经验',
      experiencePlaceholder: '告诉我们您在护理、医疗保健或相关领域的经验...',
      qualifications: '资格和认证',
      qualificationsPlaceholder: '列出任何相关的资格、证书或培训...',
      availability: '可用性',
      availabilityOptions: {
        fullTime: '全职',
        partTime: '兼职',
        weekends: '仅周末',
        flexible: '灵活时间'
      },
      terms: '我同意条款和条件，并理解我的申请将被审查',
      nextStep: '下一步',
      prevStep: '上一步',
      submit: '提交申请',
      submitting: '提交中...',
      progressText: '第 {current} 步，共 {total} 步',
      successTitle: '申请已提交！',
      successMessage: '感谢您有兴趣加入我们的护理团队。我们将审查您的申请并尽快回复您。',
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

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <User className="mx-auto h-12 w-12 text-purple-600 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{currentContent.step1Title}</h3>
        <p className="text-gray-600">Let's start with your basic information</p>
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
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
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
            errors.email ? 'border-red-500' : 'border-gray-300'
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
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="+61 4XX XXX XXX"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Building2 className="mx-auto h-12 w-12 text-purple-600 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{currentContent.step2Title}</h3>
        <p className="text-gray-600">Professional information and business details</p>
      </div>
      
      <div>
        <label htmlFor="abn" className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline h-4 w-4 mr-1" />
          {currentContent.abn} *
        </label>
        <input
          type="text"
          id="abn"
          name="abn"
          value={formData.abn}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
            errors.abn ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="12 345 678 901"
        />
        {errors.abn && <p className="text-red-500 text-sm mt-1">{errors.abn}</p>}
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="inline h-4 w-4 mr-1" />
          {currentContent.address} *
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          rows={3}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your full address including suburb, state, and postcode"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>
      
      <div>
        <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-2">
          {currentContent.qualifications}
        </label>
        <textarea
          id="qualifications"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder={currentContent.qualificationsPlaceholder}
        />
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto h-12 w-12 text-purple-600 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{currentContent.step3Title}</h3>
        <p className="text-gray-600">Tell us about your experience and when you're available</p>
      </div>
      
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
          {currentContent.experience} *
        </label>
        <textarea
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          rows={5}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
            errors.experience ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={currentContent.experiencePlaceholder}
        />
        {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
      </div>
      
      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
          {currentContent.availability} *
        </label>
        <select
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
            errors.availability ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select your availability</option>
          <option value="fullTime">{currentContent.availabilityOptions.fullTime}</option>
          <option value="partTime">{currentContent.availabilityOptions.partTime}</option>
          <option value="weekends">{currentContent.availabilityOptions.weekends}</option>
          <option value="flexible">{currentContent.availabilityOptions.flexible}</option>
        </select>
        {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">{currentContent.terms}</span>
        </label>
        {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <GradientBackground />
      <UnifiedHeader
        language={language}
        setLanguage={setLanguage}
        translations={headerTranslations}
      />
      
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {currentContent.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              {currentContent.subtitle}
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-white/80">
                {currentContent.progressText.replace('{current}', currentStep.toString()).replace('{total}', totalSteps.toString())}
              </span>
              <span className="text-sm text-white/80">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-white h-2 rounded-full transition-all duration-500"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.successTitle}</h3>
                <p className="text-gray-600 mb-8">{currentContent.successMessage}</p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Return to Home
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                      currentStep === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{currentContent.prevStep}</span>
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center space-x-2 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <span>{currentContent.nextStep}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          <span>{currentContent.submitting}</span>
                        </>
                      ) : (
                        <>
                          <span>{currentContent.submit}</span>
                          <CheckCircle className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {submitMessage && !isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-4 bg-red-50 border border-red-200 rounded-lg"
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
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <p className="text-white/80">
              {language === 'en' 
                ? 'Need help? Contact us at support@careneighbour.com' 
                : '需要帮助吗？请联系 support@careneighbour.com'
              }
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const OnboardingPage = () => (
  <LanguageProvider>
    <OnboardingPageContent />
  </LanguageProvider>
);

export default OnboardingPage;
