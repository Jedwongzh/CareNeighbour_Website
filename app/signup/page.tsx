"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { useLanguage } from "../contexts/LanguageContext"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const submitOnboarding = (firstName: string, lastName: string, email: string, phone: string, postCode: string) => {
  return fetch("/api/sheets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        postCode: postCode,
      },
      type: "onboarding",
    }),
  })
}

export default function SignupPage() {
  const { language, setLanguage } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postCode: ""
  })

  const translations = {
    en: {
      title: "Become a Carer",
      subtitle: "Join our caring community",
      description: "Register your interest to become a caregiver and help make a difference in people's lives. We'll connect you with opportunities in your local area.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      postCode: "Post Code",
      submit: "Become a Carer",
      submitting: "Submitting...",
      success: "Thank you for your interest! We'll be in touch soon with next steps.",
      error: "Something went wrong. Please try again.",
      required: "This field is required",
      heroLogo: "CareNeighbour",
      howItWorks: "How It Works",
      aboutUs: "About Us",
      joinWaitlist: "Join Waitlist",
      becomeACarer: "Become a Carer",
      SourceforCare: "Source for Care",
      mainPage: "Home"
    },
    zh: {
      title: "成为护理员",
      subtitle: "加入我们的关爱社区",
      description: "注册您的兴趣，成为护理员，帮助改变人们的生活。我们将为您连接当地的机会。",
      firstName: "名字",
      lastName: "姓氏",
      email: "电子邮箱",
      phone: "电话号码",
      postCode: "邮政编码",
      submit: "成为护理员",
      submitting: "提交中...",
      success: "感谢您的兴趣！我们很快会与您联系后续步骤。",
      error: "出了点问题，请重试。",
      required: "此字段为必填项",
      heroLogo: "零距",
      howItWorks: "工作原理",
      aboutUs: "关于我们",
      joinWaitlist: "加入等候名单",
      becomeACarer: "成为护理员",
      SourceforCare: "寻找护理",
      mainPage: "主页"
    }
  }

  const t = translations[language as keyof typeof translations] || translations.en

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.postCode) {
      toast({
        title: "Error",
        description: t.required,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await submitOnboarding(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.postCode
      )

      if (response.ok) {
        // Redirect to thank you page instead of showing toast
        router.push('/thank-you/carer')
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t.error,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <UnifiedHeader 
        language={language} 
        setLanguage={setLanguage} 
        translations={t}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/90 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              {t.title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {t.subtitle}
            </CardDescription>
            <p className="text-sm text-gray-500 mt-2">
              {t.description}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder={t.firstName}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder={t.lastName}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder={t.email}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder={t.phone}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  name="postCode"
                  placeholder={t.postCode}
                  value={formData.postCode}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.submitting}
                  </>
                ) : (
                  t.submit
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      
      <UnifiedFooter 
        language={language} 
        translations={{
          heroLogo: t.heroLogo,
          aboutUs: t.aboutUs,
          mainPage: t.mainPage,
          footerCopyright: language === 'zh' ? '零距，版权所有。' : language === 'yue' ? '零距，版權所有。' : 'CareNeighbour, Inc. All rights reserved.'
        }}
      />
      <Toaster />
    </div>
  )
}
