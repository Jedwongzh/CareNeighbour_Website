"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const OnboardingPage = () => {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    abn: '',
    address: '',
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          abn: '',
          address: '',
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
      title: 'Onboarding',
      subtitle: 'Welcome! Please fill out the form below to get started.',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone Number',
      abn: 'ABN',
      address: 'Address',
      terms: 'I agree to the terms and conditions',
      submit: 'Submit',
    },
    zh: {
      title: '入职培训',
      subtitle: '欢迎！请填写以下表格以开始。',
      firstName: '名',
      lastName: '姓',
      email: '电子邮件',
      phone: '电话号码',
      abn: 'ABN',
      address: '地址',
      terms: '我同意条款和条件',
      submit: '提交',
    },
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div style={{ backgroundColor: '#E6E6FA', fontFamily: 'Poppins, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button onClick={() => setLanguage('en')} style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', border: '1px solid #4B0082', borderRadius: '4px', backgroundColor: language === 'en' ? '#4B0082' : 'white', color: language === 'en' ? 'white' : '#4B0082' }}>English</button>
            <button onClick={() => setLanguage('zh')} style={{ padding: '0.5rem 1rem', border: '1px solid #4B0082', borderRadius: '4px', backgroundColor: language === 'zh' ? '#4B0082' : 'white', color: language === 'zh' ? 'white' : '#4B0082' }}>中文</button>
          </div>
          <h1 style={{ textAlign: 'center', color: '#4B0082' }}>{currentContent.title}</h1>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>{currentContent.subtitle}</p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="firstName" style={{ display: 'block', marginBottom: '0.5rem' }}>{currentContent.firstName}</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="lastName" style={{ display: 'block', marginBottom: '0.5rem' }}>{currentContent.lastName}</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>{currentContent.email}</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem' }}>{currentContent.phone}</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="abn" style={{ display: 'block', marginBottom: '0.5rem' }}>{currentContent.abn}</label>
              <input type="text" id="abn" name="abn" value={formData.abn} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="address" style={{ display: 'block', marginBottom: '0.5rem' }}>{currentContent.address}</label>
              <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleInputChange} />
              <label htmlFor="terms" style={{ marginLeft: '0.5rem' }}>{currentContent.terms}</label>
            </div>
            <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#4B0082', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {isSubmitting ? 'Submitting...' : currentContent.submit}
            </button>
            {submitMessage && <p style={{ textAlign: 'center', marginTop: '1rem', color: '#4B0082' }}>{submitMessage}</p>}
          </form>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image src="/images/onboarding-image.png" alt="Onboarding" width={300} height={400} style={{ borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
