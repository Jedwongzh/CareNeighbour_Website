"use client"

import { createContext, useContext, useEffect, useState } from 'react'

interface LanguageContextType {
  currentLang: string
  setLang: (lang: string) => void
  translations: any // Using any for now since we have a large translation object
  availableLangs: { [key: string]: string }
}

// Import the translations from app-demo/page.tsx
const translations = {
  en: {
    ourMission: "Our Mission",
    ourApproach: "Our Approach",
    howItWorks: "How It Works",
    aboutUs: "About Us",
    joinWaitlist: "Join Waitlist",
    // App demo translations
    title: "App Demo",
    subtitle: "Experience CareNeighbour",
    description: "See how our app works to connect you with qualified caregivers in your neighborhood",
    voicePrompt: "How can we help you today?",
    recordingStatus: "Listening...",
    processingStatus: "Processing your request...",
    sampleTranscript: "I need someone to help my mother with medication management and light housekeeping twice a week.",
    aiSummary: "Based on your request, you need:",
    careType: "Personal Care & Assistance",
    details: [
      "Medication management and reminders",
      "Light housekeeping and home organization",
      "Twice weekly care schedule",
    ],
    editRequest: "Edit request details",
    findCaregivers: "Find Caregivers",
    searchingCaregivers: "Searching for caregivers near you...",
    caregiverFound: "We found caregivers available now!",
    swipeInstructions: "Swipe right to select, left to skip",
    regenerate: "Show more caregivers",
    bookNow: "Book Now",
    trackingTitle: "Tracking Your Caregiver",
    trackingStatus: "Sarah is on the way - ETA: 10 minutes",
    caregiverArrived: "Sarah has arrived!",
    completeBooking: "Complete Booking",
    tryAgain: "Try Again",
    exitDemo: "Exit demo",
    backgroundCommands: [
      "Book a caregiver",
      "Medication reminder",
      "Find help nearby",
      "Schedule appointment",
      "Personal care needed",
      "Companionship",
      "Check availability",
      "Light housekeeping",
      "Mobility assistance",
      "Transport to doctor",
      "Meal preparation",
      "Post-surgery care",
      "Elderly care",
      "Disability support",
      "Check my schedule",
      "Grocery shopping",
      "Respite care",
      "Check vitals",
      "Wound dressing",
      "Physical therapy exercise",
      "Emergency contact",
    ],
  },
  zh: {
    ourMission: "我们的使命",
    ourApproach: "我们的方法",
    howItWorks: "运作方式",
    aboutUs: "关于我们",
    joinWaitlist: "加入候补名单",
    // App demo translations
    title: "应用演示",
    subtitle: "体验 CareNeighbour",
    description: "了解我们的应用程序如何将您与您附近的合格护理人员联系起来",
    voicePrompt: "今天我们能帮您什么？",
    recordingStatus: "正在听...",
    processingStatus: "正在处理您的请求...",
    sampleTranscript: "我需要有人每周两次帮助我母亲进行药物管理和轻度家政服务。",
    aiSummary: "根据您的要求，您需要：",
    careType: "个人护理与协助",
    details: ["药物管理和提醒", "轻度家政和家庭整理", "每周两次护理安排"],
    editRequest: "编辑请求详情",
    findCaregivers: "寻找护理员",
    searchingCaregivers: "正在搜索您附近的护理员...",
    caregiverFound: "我们找到了现在可用的护理员！",
    swipeInstructions: "向右滑动选择，向左滑动跳过",
    regenerate: "显示更多护理员",
    bookNow: "立即预订",
    trackingTitle: "追踪您的护理员",
    trackingStatus: "Sarah 正在路上 - 预计到达时间: 10 分钟",
    caregiverArrived: "Sarah 已到达！",
    completeBooking: "完成预订",
    tryAgain: "再试一次",
    exitDemo: "退出演示",
    backgroundCommands: [
      "预订护理员",
      "用药提醒",
      "查找附近帮助",
      "安排预约",
      "需要个人护理",
      "陪伴",
      "检查可用性",
      "轻度家政",
      "行动协助",
      "送医",
      "膳食准备",
      "术后护理",
      "老年护理",
      "残疾支持",
      "检查我的日程",
      "购买食品",
      "临时护理",
      "检查生命体征",
      "伤口敷料",
      "物理治疗运动",
      "紧急联系人",
    ],
  },
  // Add other languages as needed
}

const availableLangs = {
  en: "English",
  zh: "中文",
  yue: "粵語",
  vi: "Tiếng Việt",
  es: "Español",
  fr: "Français",
  de: "Deutsch"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    // Load language preference from localStorage on mount
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang && Object.keys(availableLangs).includes(savedLang)) {
      setCurrentLang(savedLang)
    }
  }, [])

  const setLang = (lang: string) => {
    if (Object.keys(availableLangs).includes(lang)) {
      setCurrentLang(lang)
      localStorage.setItem('preferredLanguage', lang)
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLang,
        translations: translations[currentLang as keyof typeof translations] || translations.en,
        availableLangs
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 