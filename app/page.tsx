"use client"

import type React from "react"

import { useState, useRef, lazy, Suspense, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageSquare, PlayCircle, ChevronRight, Search, Send, Mic, MicOff, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Autoplay from "embla-carousel-autoplay"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { useLanguage } from "./contexts/LanguageContext" // Import useLanguage hook
import VerticalCarousel from "@/components/VerticalCarousel"

// Client-side replacements for server actions (for static export)
const joinWaitlist = async (formData: FormData) => {
  // Simulate API call for static export
  return new Promise<{success: boolean, message: string}>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Thank you! You'll receive free care request credits when we launch."
      });
    }, 1000);
  });
};

const submitFeedback = async (formData: FormData) => {
  // Simulate API call for static export
  return new Promise<{success: boolean, message: string}>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Thank you for your feedback! We'll use it to improve our service."
      });
    }, 1000);
  });
};

// Lazy load non-critical components
const FeatureCarousel = lazy(() =>
  import("@/components/feature-carousel").then((mod) => ({ default: mod.FeatureCarousel })),
)

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
  </div>
)

// Add TypeScript interface for SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  interpretation: any;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// 1. Define translations for English and Chinese (Mandarin)
const pageTranslations = {
  en: {
    heroLogo: "CareNeighbour",
    heroTitleStart: "Connect with",
    heroTitleEnd: "Compatible Carer Instantly",
    ourMission: "Our Mission",
    ourApproach: "Our Approach",
    howItWorks: "How It Works",
    joinWaitlist: "Join Waitlist",
    SourceforCare: "Source for Care",
    BecomeACarer: "Become a Carer",
    aboutUs: "About Us",
    // Hero section
    heroSubtitle: "CareNeighbour connects you with verified caregivers who understand your language and culture, making finding the right support effortless.",
    heroCtaHowItWorks: "How It Works",
    heroCtaJoinWaitlist: "Join Waitlist",
    // Problem Statement Section
    problemTitle: "Finding the Right Care Shouldn't Be a Struggle",
    problemParagraph1: "Every year, thousands of people who don't speak English as their first language struggle to access the care they need. Language barriers, lack of time, and unfamiliarity with the system leave many feeling isolated and overlooked. It's not just about translation — it's about dignity, understanding, and culturally respectful support. Right now, too many are suffering in silence simply because the system wasn't built for them.",
    problemParagraph2Start: "We believe finding compassionate care that resonates with your cultural background should be simple and stress-free.",
    problemParagraph2End: "CareNeighbour is here to make that possible.",
    // Experiences Section
    experiencesTitle: "Shared Experiences, Common Challenges",
    experiencesSubtitle: "Hear from families navigating the complexities of caregiving.",
    testimonialMariaName: "Maria, 48",
    testimonialMariaQuote: "Finding someone who speaks Spanish and understands our traditions for my father was so hard. We needed more than just basic help—we needed someone who could connect with him.",
    testimonialChenName: "Chen, 41",
    testimonialChenQuote: "My work hours are unpredictable. Trying to coordinate care for my mother, who prefers speaking Mandarin, felt like a second job.",
    testimonialAhmedName: "Ahmed, 55",
    testimonialAhmedQuote: "We needed someone urgently when my wife had surgery. Explaining the specific cultural needs and dietary restrictions quickly was stressful. Finding the right caregiver felt impossible.",
    testimonialSarahName: "Sarah, 42",
    testimonialSarahQuote: "Living hours away from my mom needing daily assistance felt impossible. Finding reliable, trustworthy help was a constant worry. I needed someone I could trust completely.",
    testimonialElenaName: "Elena, 52",
    testimonialElenaQuote: "When my father began showing signs of dementia, we struggled to find someone who could speak Russian and understand him. The language barrier made his confusion worse.",
    testimonialRajName: "Raj, 45",
    testimonialRajQuote: "My parents moved here to help raise our children, but now they need care themselves. Finding someone who respects their vegetarian diet and understands Hindu customs has been incredibly challenging.",
    // How It Works Section
    howItWorksTitle: "Care, Simplified in 3 Steps",
    step1Title: "Define Needs",
    step1Description: "Simply voice or text your care requirements, preferred language, cultural preferences, and location—we make it that easy",
    step2Title: "Match & Connect",
    step2Description: "We instantly connect you with verified caregivers who perfectly match your criteria. Chat with our AI care concierge for any questions or additional needs",
    step3Title: "Book & Relax",
    step3Description: "Review your matched caregivers, schedule care effortlessly, manage payments securely, and enjoy peace of mind knowing your loved one is in exceptional hands",
    howitworksButton: "Learn more about our services",
    // Our Approach Section
    approachTitlePart1: "When",
    approachTitleTech: "Technology",
    approachTitlePart2: "Meets",
    approachTitleCompassion: "Compassion",
    feature1Title: "Instant Care Requests",
    feature1Description: "Simply speak or type your needs and watch as our AI transcribes and processes your requests in real-time.",
    feature2Title: "Your Personal Care Concierge",
    feature2Description: "Voice your unique needs through our intelligent AI chat and receive personalized recommendations for nearby, available carers and services within moments.",
    feature3Title: "Clarity at Your Fingertips",
    feature3Description: "Instantly access comprehensive carer profiles, neatly summarized on a single page. Save your preferred choices or book with seamless, one-click convenience.",
    feature4Title: "Explore with Ease",
    feature4Description: "Effortlessly browse a comprehensive map of all available care services within your chosen regions, putting expert help right on your doorstep.",
    // Waitlist & Feedback Section
    waitlistTitle: "Be the First to Know",
    waitlistSubtitle: "Join our waitlist for early access, priority matching, and exclusive launch updates.",
    waitlistEmailPlaceholder: "Enter your email",
    waitlistSubmitButton: "Join Waitlist",
    waitlistSubmittingButton: "Submitting...",
    waitlistPrivacy: "We respect your privacy. Unsubscribe anytime.",
    feedbackTitle: "Share Your Thoughts",
    feedbackSubtitle: "Have ideas or feedback? Help us shape the future of culturally sensitive caregiving.",
    feedbackEmailPlaceholder: "Enter your email",
    feedbackMessagePlaceholder: "Your feedback or ideas...",
    feedbackSubmitButton: "Send Feedback",
    feedbackSubmittingButton: "Submitting...",
    feedbackPrivacy: "Your input is valuable. Responses are saved securely.",
    // Footer
    footerCopyright: "CareNeighbour, Inc. All rights reserved.",
    // Add search-related translations
    searchPlaceholder: "Describe the care you're looking for...",
    searchTrySearching: "Try searching for:",
    searchPresetPrompts: {
      elderlyCare: "Elderly Care",
      medicalCare: "Medical Care",
      culturalCare: "Cultural Care",
      respiteCare: "Respite Care",
      dementiaCare: "Dementia Care",
      homeCare: "Home Care"
    },
    searchPresetDescriptions: {
      elderlyCare: "Find a caregiver for elderly care",
      medicalCare: "Looking for medical care assistance",
      culturalCare: "Need culturally sensitive care",
      respiteCare: "Find temporary care support",
      dementiaCare: "Looking for dementia care specialist",
      homeCare: "Need home care services"
    },
    // Care Request Popup translations
    careRequestPopup: {
      title: "Care Request Coming Soon!",
      description: "We're launching our care request feature in September 2025. Enter your email to receive free care request credits when we launch.",
      emailPlaceholder: "Enter your email address",
      submitButton: "Get Free Credits",
      submittingButton: "Submitting...",
      privacy: "We respect your privacy. Unsubscribe anytime.",
      success: "Thank you! You'll receive free care request credits when we launch.",
      error: "Please provide a valid email address.",
      yourRequest: "Your Care Request:",
      earlyAccessLabel: "Early Access Code (optional)",
      earlyAccessPlaceholder: "Enter your early access code",
      validateCodeButton: "Validate Code",
      accessChatButton: "Access Chat Page",
      invalidCodeError: "Invalid code. Please try again or contact support."
    },
    careTypes: [
      {
        title: "Elderly Care",
        description: "Professional caregivers for daily assistance, companionship, and medical support",
        image: "/images/agecareimg.jpg",
        examples: [
          "Daily living assistance",
          "Medication management",
          "Companionship",
          "Mobility support"
        ]
      },
      {
        title: "Specialized Medical Care",
        description: "Skilled nurses and caregivers for specific medical conditions",
        image: "/images/SpecialisedCare.jpg",
        examples: [
          "Dementia care",
          "Post-surgery recovery",
          "Chronic condition management",
          "Palliative care"
        ]
      },
      {
        title: "Cultural Care",
        description: "Caregivers who understand and respect cultural traditions",
        image: "/images/CulturalCareimg.jpg",
        examples: [
          "Language-specific care",
          "Cultural dietary needs",
          "Religious practices",
          "Traditional healing methods"
        ]
      },
      {
        title: "Respite Care",
        description: "Temporary care to give family caregivers a break",
        image: "/images/RespiteCareimg.jpg",
        examples: [
          "Short-term relief",
          "Emergency backup",
          "Holiday coverage",
          "Regular breaks"
        ]
      }
    ],
  },
  zh: { // Mandarin Chinese translations
    heroLogo: "零距",
    heroTitleStart: "立即连接",
    heroTitleEnd: "合适的护理人员",
    ourMission: "我们的使命",
    ourApproach: "服务特色",
    howItWorks: "运作方式",
    joinWaitlist: "加入等候名单",
    SourceforCare: "护理服务",
    BecomeACarer: "成为护理员",
    aboutUs: "关于我们",
    // Hero section
    heroSubtitle: "零距 让您轻松找到认证的照护人员——他们懂您的语言，了解您的文化，为您提供贴心、安心的支持。",
    heroCtaHowItWorks: "运作方式",
    heroCtaJoinWaitlist: "加入等候名单",
    // Problem Statement Section
    problemTitle: "找到合适的照护本该轻松无忧",
    problemParagraph1: "每年，无数英语非母语的人在寻求照护时感到无助。语言障碍、时间压力，还有对整个系统的陌生感，让他们像是被世界遗忘了一样。这不是简单的翻译问题，而是关于被理解、被尊重、被善待的问题。很多人只是希望有人听懂他们的需求，却不得不在孤独中默默撑着，因为现有的系统并不是为他们设计的。",
    problemParagraph2Start: "我们相信，寻找符合您文化背景的贴心护理应该简单无忧。",
    problemParagraph2End: "零距 致力于实现这一目标。",
    // Experiences Section
    experiencesTitle: "我们都有共同的困境",
    experiencesSubtitle: "聆听那些正在应对照护挑战的家庭分享他们的真实故事与心路历程。",
    testimonialMariaName: "玛丽亚，48岁",
    testimonialMariaQuote: "为我父亲找到一个会说西班牙语并了解我们传统的人太难了。我们需要的不仅仅是基本帮助——我们需要一个能与他沟通的人。",
    testimonialChenName: "陈先生，41岁",
    testimonialChenQuote: "我的工作时间很不稳定。为我母亲（她更喜欢说普通话）协调护理感觉就像第二份工作。",
    testimonialAhmedName: "艾哈迈德，55岁",
    testimonialAhmedQuote: "我妻子手术时我们急需人手。快速解释特定的文化需求和饮食限制压力很大。找到合适的护理员几乎是不可能的。",
    testimonialSarahName: "莎拉，42岁",
    testimonialSarahQuote: "我住在离需要日常照料的母亲几小时远的地方，这感觉几乎不可能。找到可靠、值得信赖的帮助一直让我忧心忡忡。我需要一个我能完全信任的人。",
    testimonialElenaName: "埃琳娜，52岁",
    testimonialElenaQuote: "当我父亲开始出现失智症迹象时，我们很难找到一个会说俄语并能理解他的人。语言障碍使他的困惑更加严重。",
    testimonialRajName: "拉吉，45岁",
    testimonialRajQuote: "我的父母搬来这里帮忙照顾我们的孩子，但现在他们自己也需要照顾了。找到一个尊重他们素食习惯并了解印度教习俗的人非常具有挑战性。",
    // How It Works Section
    howItWorksTitle: "关怀备至，三步到位",
    step1Title: "明确需求",
    step1Description: "简单地说出或输入您的护理要求、偏好语言、文化偏好和位置——我们让一切变得如此简单",
    step2Title: "匹配连接",
    step2Description: "我们即时为您连接完全符合您标准的认证护理员。如有疑问或额外需求，可与我们的AI护理管家聊天。",
    step3Title: "轻松预订",
    step3Description: "查看您的匹配护理员，轻松安排护理，安全管理付款，享受安心，因为您的亲人得到了卓越的照顾。",
    howitworksButton: "了解更多关于我们的服务",
    // Our Approach Section
    approachTitlePart1: "科技",
    approachTitleTech: "有情",
    approachTitlePart2: "温暖",
    approachTitleCompassion: "同行",
    feature1Title: "即时护理请求",
    feature1Description: "只需说出或输入您的需求，我们的人工智能将实时转录和处理您的请求。",
    feature2Title: "您的私人护理管家",
    feature2Description: "通过我们的智能AI聊天说出您的独特需求，即可在片刻之间获得附近可用护理员和服务的个性化推荐。",
    feature3Title: "信息一目了然",
    feature3Description: "即时访问全面的护理员资料，信息简洁明了地汇总在一页上。保存您的首选或通过无缝的一键操作进行预订。",
    feature4Title: "轻松探索",
    feature4Description: "轻松浏览您所选区域内所有可用护理服务的综合地图，让专业帮助近在咫尺。",
    // Waitlist & Feedback Section
    waitlistTitle: "抢先体验",
    waitlistSubtitle: "加入我们的等候名单，获取优先体验、优先匹配和独家发布更新。",
    waitlistEmailPlaceholder: "输入您的邮箱",
    waitlistSubmitButton: "加入等候名单",
    waitlistSubmittingButton: "提交中...",
    waitlistPrivacy: "我们尊重您的隐私。随时可以取消订阅。",
    feedbackTitle: "分享您的想法",
    feedbackSubtitle: "有想法或建议吗？欢迎与我们分享，一起共创更符合文化需求的照护服务未来。",
    feedbackEmailPlaceholder: "输入您的邮箱",
    feedbackMessagePlaceholder: "您的反馈或想法...",
    feedbackSubmitButton: "发送反馈",
    feedbackSubmittingButton: "提交中...",
    feedbackPrivacy: "您的意见对我们来说非常宝贵，所有反馈都会受到严格保护，确保您的隐私安全。",
    // Footer
    footerCopyright: "零距 . 版权所有。",
    // Add search-related translations
    searchPlaceholder: "描述您需要的护理服务...",
    searchTrySearching: "嘗試搜索:",
    searchPresetPrompts: {
      elderlyCare: "老年护理",
      medicalCare: "醫療護理",
      culturalCare: "文化護理",
      respiteCare: "臨時護理",
      dementiaCare: "失智症護理",
      homeCare: "居家護理"
    },
    searchPresetDescriptions: {
      elderlyCare: "尋找老年護理人員",
      medicalCare: "尋找醫療護理協助",
      culturalCare: "需要文化敏感的護理",
      respiteCare: "尋找臨時護理支持",
      dementiaCare: "尋找失智症護理專家",
      homeCare: "需要居家護理服務"
    },
    // Care Request Popup translations
    careRequestPopup: {
      title: "護理請求即將推出！",
      description: "我們將於2025年9月推出護理請求功能。請輸入您的郵箱，以便在我們推出時獲得免費護理請求積分。",
      emailPlaceholder: "輸入您的郵箱",
      submitButton: "獲取免費積分",
      submittingButton: "提交中...",
      privacy: "我們尊重您的隱私。隨時可以取消訂閱。",
      success: "謝謝！在我們推出時，您將獲得免費護理請求積分。",
      error: "請提供有效的郵箱地址。",
      yourRequest: "您的護理請求:",
      earlyAccessLabel: "早期訪問代碼（可選）",
      earlyAccessPlaceholder: "輸入您的早期訪問代碼",
      validateCodeButton: "驗證代碼",
      accessChatButton: "訪問聊天頁面",
      invalidCodeError: "無效代碼。請重試或聯繫支持。"
    },
    careTypes: [
      {
        title: "老年护理",
        description: "专业护理员为日常生活、陪伴和医疗支持提供帮助",
        image: "/images/agecareimg.jpg",
        examples: [
          "日常生活协助",
          "药物管理",
          "陪伴关怀",
          "行动支持"
        ]
      },
      {
        title: "专业医疗护理",
        description: "针对特定医疗状况的专业护士和护理员",
        image: "/images/SpecialisedCare.jpg",
        examples: [
          "失智症护理",
          "术后康复",
          "慢性病管理",
          "缓和医疗"
        ]
      },
      {
        title: "文化护理",
        description: "了解并尊重文化传统的护理员",
        image: "/images/CulturalCareimg.jpg",
        examples: [
          "语言专属护理",
          "文化饮食需求",
          "宗教习俗",
          "传统疗法"
        ]
      },
      {
        title: "临时护理",
        description: "为家庭护理者提供临时休息的护理服务",
        image: "/images/RespiteCareimg.jpg",
        examples: [
          "短期照护",
          "紧急支援",
          "假期替班",
          "定期休息"
        ]
      }
    ],
  },
  yue: { // Cantonese translations
    heroLogo: "零距",
    heroTitleStart: "立即連接",
    heroTitleEnd: "合適的護理人員",
    ourMission: "我們的使命",
    ourApproach: "服務特色",
    howItWorks: "運作方式",
    joinWaitlist: "加入等候名單",
    SourceforCare: "護理服務",
    BecomeACarer: "成為護理員",
    aboutUs: "關於我們",
    // Hero section
    heroSubtitle: "零距 讓您輕鬆找到認證的照護人員——他們懂您的語言，了解您的文化，為您提供貼心、安心的支持。",
    heroCtaHowItWorks: "運作方式",
    heroCtaJoinWaitlist: "加入等候名單",
    // Problem Statement Section
    problemTitle: "找到合適的照護本該輕鬆無憂",
    problemParagraph1: "每年，無數英語非母語的人在尋求照護時感到無助。語言障礙、時間壓力，還有對整個系統的陌生感，讓他們像是被世界遺忘了一樣。這不是簡單的翻譯問題，而是關於被理解、被尊重、被善待的問題。很多人只是希望有人聽懂他們的需求，卻不得不在孤獨中默默撐著，因為現有的系統並不是為他們設計的。",
    problemParagraph2Start: "我們相信，尋找符合您文化背景的貼心護理應該簡單無憂。",
    problemParagraph2End: "零距 致力於實現這一目標。",
    // Experiences Section
    experiencesTitle: "我們都有共同的困境",
    experiencesSubtitle: "聆聽那些正在應對照護挑戰的家庭分享他們的真實故事與心路歷程。",
    testimonialMariaName: "瑪麗亞，48歲",
    testimonialMariaQuote: "為我父親找到一個會說西班牙語並了解我們傳統的人太難了。我們需要的不僅僅是基本幫助——我們需要一個能與他溝通的人。",
    testimonialChenName: "陳先生，41歲",
    testimonialChenQuote: "我的工作時間很不穩定。為我母親（她更喜歡說普通話）協調護理感覺就像第二份工作。",
    testimonialAhmedName: "艾哈邁德，55歲",
    testimonialAhmedQuote: "我妻子手術時我們急需人手。快速解釋特定的文化需求和飲食限制壓力很大。找到合適的護理員幾乎是不可能的。",
    testimonialSarahName: "莎拉，42歲",
    testimonialSarahQuote: "我住在離需要日常照料的母親幾小時遠的地方，這感覺幾乎不可能。找到可靠、值得信賴的幫助一直讓我憂心忡忡。我需要一個我能完全信任的人。",
    testimonialElenaName: "埃琳娜，52歲",
    testimonialElenaQuote: "當我父親開始出現失智症跡象時，我們很難找到一個會說俄語並能理解他的人。語言障礙使他的困惑更加嚴重。",
    testimonialRajName: "拉吉，45歲",
    testimonialRajQuote: "我的父母搬來這裡幫忙照顧我們的孩子，但現在他們自己也需要照顧了。找到一個尊重他們素食習慣並了解印度教習俗的人非常具有挑戰性。",
    // How It Works Section
    howItWorksTitle: "關懷備至，三步到位",
    step1Title: "明確需求",
    step1Description: "簡單講出或者打字你嘅護理要求、偏好語言、文化偏好同位置——我哋令一切變得咁簡單",
    step2Title: "匹配連接",
    step2Description: "我哋即時為你連接完全符合你標準嘅認證護理員。如有疑問或額外需求，可同我哋嘅AI護理管家傾計。",
    step3Title: "輕鬆預訂",
    step3Description: "查看你嘅配對護理員，輕鬆安排護理，安全管理付款，享受安心，因為你嘅親人得到卓越嘅照顧。",
    howitworksButton: "了解更多關於我們的服務",
    // Our Approach Section
    approachTitlePart1: "科技",
    approachTitleTech: "有情",
    approachTitlePart2: "溫暖",
    approachTitleCompassion: "同行",
    feature1Title: "即時護理請求",
    feature1Description: "只需說出或輸入您的需求，我們的人工智能將實時轉錄和處理您的請求。",
    feature2Title: "您的私人護理管家",
    feature2Description: "通過我們的智能AI聊天說出您的獨特需求，即可在片刻之間獲得附近可用護理員和服務的個性化推薦。",
    feature3Title: "信息一目了然",
    feature3Description: "即時訪問全面的護理員資料，信息簡潔明了地匯總在一頁上。保存您的首選或通過無縫的一鍵操作進行預訂。",
    feature4Title: "輕鬆探索",
    feature4Description: "輕鬆瀏覽您所選區域內所有可用護理服務的綜合地圖，讓專業幫助近在咫尺。",
    // Waitlist & Feedback Section
    waitlistTitle: "搶先體驗",
    waitlistSubtitle: "加入我們的等候名單，獲取優先體驗、優先匹配和獨家發布更新。",
    waitlistEmailPlaceholder: "輸入您的郵箱",
    waitlistSubmitButton: "加入等候名單",
    waitlistSubmittingButton: "提交中...",
    waitlistPrivacy: "我們尊重您的隱私。隨時可以取消訂閱。",
    feedbackTitle: "分享您的想法",
    feedbackSubtitle: "有想法或建議嗎？歡迎與我們分享，一起共創更符合文化需求的照護服務未來。",
    feedbackEmailPlaceholder: "輸入您的郵箱",
    feedbackMessagePlaceholder: "您的反饋或想法...",
    feedbackSubmitButton: "發送反饋",
    feedbackSubmittingButton: "提交中...",
    feedbackPrivacy: "您的意見對我們來說非常寶貴，所有反饋都會受到嚴格保護，確保您的隱私安全。",
    // Footer
    footerCopyright: "零距 . 版權所有。",
    // Add search-related translations
    searchPlaceholder: "描述您需要的護理服務...",
    searchTrySearching: "嘗試搜索:",
    searchPresetPrompts: {
      elderlyCare: "老年護理",
      medicalCare: "醫療護理",
      culturalCare: "文化護理",
      respiteCare: "臨時護理",
      dementiaCare: "失智症護理",
      homeCare: "居家護理"
    },
    searchPresetDescriptions: {
      elderlyCare: "尋找老年護理人員",
      medicalCare: "尋找醫療護理協助",
      culturalCare: "需要文化敏感的護理",
      respiteCare: "尋找臨時護理支持",
      dementiaCare: "尋找失智症護理專家",
      homeCare: "需要居家護理服務"
    },
    careTypes: [
      {
        title: "長者護理",
        description: "專業護理員為日常生活、陪伴及醫療支援提供協助",
        image: "/images/agecareimg.jpg",
        examples: [
          "日常生活協助",
          "藥物管理",
          "陪伴關懷",
          "行動支援"
        ]
      },
      {
        title: "專科醫療護理",
        description: "針對特定醫療狀況的專業護士及護理員",
        image: "/images/SpecialisedCare.jpg",
        examples: [
          "認知障礙護理",
          "手術後康復",
          "慢性病管理",
          "紓緩治療"
        ]
      },
      {
        title: "文化護理",
        description: "了解並尊重文化傳統的護理員",
        image: "/images/CulturalCareimg.jpg",
        examples: [
          "語言專屬護理",
          "文化飲食需求",
          "宗教習俗",
          "傳統療法"
        ]
      },
      {
        title: "臨時護理",
        description: "為家庭護理者提供臨時休息的護理服務",
        image: "/images/RespiteCareimg.jpg",
        examples: [
          "短期照顧",
          "緊急支援",
          "假期替班",
          "定期休息"
        ]
      }
    ],
    // Care Request Popup translations
    careRequestPopup: {
      title: "護理請求即將推出！",
      description: "我哋將於2025年9月推出護理請求功能。請輸入您嘅郵箱，以便喺我哋推出時獲得免費護理請求積分。",
      emailPlaceholder: "輸入您嘅郵箱",
      submitButton: "獲取免費積分",
      submittingButton: "提交緊...",
      privacy: "我哋尊重您嘅隱私。隨時可以取消訂閱。",
      success: "多謝！喺我哋推出時，您將獲得免費護理請求積分。",
      error: "請提供有效嘅郵箱地址。",
      yourRequest: "您嘅護理請求:",
      earlyAccessLabel: "早期訪問代碼（可選）",
      earlyAccessPlaceholder: "輸入您嘅早期訪問代碼",
      validateCodeButton: "驗證代碼",
      accessChatButton: "訪問聊天頁面",
      invalidCodeError: "無效代碼。請重試或聯繫支援。"
    }
  },
};

// Add this component before the LandingPage component
const CareSearchBar = () => {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [showCareRequestPopup, setShowCareRequestPopup] = useState(false)
  const [careRequestEmail, setCareRequestEmail] = useState("")
  const [isSubmittingCareRequest, setIsSubmittingCareRequest] = useState(false)
  const [careRequestStatus, setCareRequestStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(null)
  const [earlyAccessCode, setEarlyAccessCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [codeError, setCodeError] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { language } = useLanguage()
  const t = pageTranslations[language as keyof typeof pageTranslations] || pageTranslations.en

  // Common prompts for cycling placeholder (translation-compatible)
  const cyclingPrompts = [
    t.searchPresetDescriptions.elderlyCare,
    t.searchPresetDescriptions.medicalCare,
    t.searchPresetDescriptions.culturalCare,
    t.searchPresetDescriptions.respiteCare,
    t.searchPresetDescriptions.dementiaCare,
    t.searchPresetDescriptions.homeCare
  ]

  // Cycle placeholder every 2.5 seconds
  useEffect(() => {
    if (isFocused || query.length > 0) return // Don't cycle if focused or typing
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % cyclingPrompts.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [isFocused, query, cyclingPrompts.length])

  const presetPrompts = [
    {
      key: 'elderlyCare',
      icon: '➕',
      title: t.searchPresetPrompts.elderlyCare,
      description: t.searchPresetDescriptions.elderlyCare
    },
    {
      key: 'medicalCare',
      icon: '➕',
      title: t.searchPresetPrompts.medicalCare,
      description: t.searchPresetDescriptions.medicalCare
    },
    {
      key: 'culturalCare',
      icon: '➕',
      title: t.searchPresetPrompts.culturalCare,
      description: t.searchPresetDescriptions.culturalCare
    },
    {
      key: 'respiteCare',
      icon: '➕',
      title: t.searchPresetPrompts.respiteCare,
      description: t.searchPresetDescriptions.respiteCare
    },
    {
      key: 'dementiaCare',
      icon: '➕',
      title: t.searchPresetPrompts.dementiaCare,
      description: t.searchPresetDescriptions.dementiaCare
    },
    {
      key: 'homeCare',
      icon: '➕',
      title: t.searchPresetPrompts.homeCare,
      description: t.searchPresetDescriptions.homeCare
    }
  ]

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    const SpeechRecognition = window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true

    recognitionRef.current.onstart = () => {
      setIsRecording(true)
    }

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('')
      
      setQuery(transcript)
    }

    recognitionRef.current.onerror = (event: Event) => {
      console.error('Speech recognition error:', event)
      setIsRecording(false)
    }

    recognitionRef.current.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const toggleListening = () => {
    if (isRecording) {
      stopListening()
    } else {
      startListening()
    }
  }

  const handleCareRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!careRequestEmail || !careRequestEmail.includes("@")) {
      setCareRequestStatus({
        success: false,
        message: t.careRequestPopup.error,
      })
      return
    }

    setIsSubmittingCareRequest(true)
    setCareRequestStatus(null)

    try {
      const formData = new FormData()
      formData.append("email", careRequestEmail)
      formData.append("type", "care_request")
      formData.append("response", query) // Add the user's typed response

      console.log("Submitting care request form...")
      const result = await joinWaitlist(formData)
      console.log("Care request submission result:", result)

      if (result.success) {
        setCareRequestStatus({
          success: true,
          message: t.careRequestPopup.success,
        })
        setCareRequestEmail("")
        setQuery("") // Clear the search query after successful submission
        setTimeout(() => {
          setShowCareRequestPopup(false)
          setCareRequestStatus(null)
        }, 3000)
      } else {
        setCareRequestStatus(result)
      }
    } catch (error) {
      console.error("Error submitting care request form:", error)
      setCareRequestStatus({
        success: false,
        message: "An error occurred. Please try again later.",
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setIsSubmittingCareRequest(false)
    }
  }

  const handleSendClick = () => {
    if (query.trim().length > 0) {
      setShowCareRequestPopup(true)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0.1) 100%)",
              "linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0.1) 100%)",
              "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0.1) 100%)",
              "linear-gradient(180deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0.1) 100%)",
              "linear-gradient(225deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0.1) 100%)",
              "linear-gradient(270deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0.1) 100%)",
              "linear-gradient(315deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0.1) 100%)",
              "linear-gradient(360deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0.1) 100%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        />
        <motion.div 
          className="relative flex items-center"
          animate={{
            height: query.length > 100 ? "auto" : "4rem",
            minHeight: "4rem",
            maxHeight: "12rem"
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder={cyclingPrompts[placeholderIndex]}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="flex h-10 w-full px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-base md:text-xl relative pl-6 pr-24 py-8 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 shadow-lg bg-white whitespace-pre-wrap break-words overflow-y-auto"
            style={{ 
              height: '100%',
              minHeight: '4rem',
              maxHeight: '12rem'
            }}
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleListening}
              className={`p-2 rounded-full ${isRecording ? 'bg-red-100' : 'bg-purple-100'} hover:bg-purple-200 transition-colors`}
            >
              {isRecording ? (
                <MicOff className="w-6 h-6 text-red-600" />
              ) : (
                <Mic className="w-6 h-6 text-purple-600" />
              )}
            </motion.button>
            <AnimatePresence mode="wait">
              {query.length > 0 ? (
              <motion.div
                key="send"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <button
                onClick={handleSendClick}
                className="cursor-pointer hover:scale-110 transition-transform"
                >
                <Send className="w-7 h-7 text-purple-600" />
                </button>
              </motion.div>
              ) : (
              <motion.div
                key="search"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Search className="w-7 h-7 text-purple-600" />
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Preset Prompt Buttons */}
      <motion.div 
        className="mt-4 flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {presetPrompts.map((prompt) => (
          <motion.button
            key={prompt.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setQuery(prompt.description)}
            className="flex items-center gap-2 px-4 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-md bg-gray-100 bg-clip-padding text-gray transition-colors text-xs md:text-sm"
          >
            <span className="text-lg md:text-xl">{prompt.icon}</span>
            <span className="text-sm font-medium">{prompt.title}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* How It Works scroll button (now below search bar) */}
      <div className="flex flex-col items-center mt-2">
        <button
          onClick={() => {
            const el = document.getElementById('how-it-works');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="focus:outline-none text-white text-lg font-semibold flex flex-col items-center bg-transparent border-none p-0 hover:text-purple-900"
          style={{ background: 'none', border: 'none' }}
        >
          {t.howItWorks}
          <span>
            <ChevronDown className="animate-bounce mt-1 w-7 h-7 text-purple-700" />
          </span>
        </button>
      </div>

      {/* Care Request Popup */}
      <Dialog open={showCareRequestPopup} onOpenChange={setShowCareRequestPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {t.careRequestPopup.title}
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              {t.careRequestPopup.description}
            </DialogDescription>
          </DialogHeader>
          
          {/* Show the user's care request */}
          {query && (
            <div className="relative mb-4">
              <div
                className="absolute -inset-2 rounded-lg bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-600 via-indigo-600 to-rose-600 opacity-50 blur-2xl"
              ></div>
              <div className="relative rounded-lg p-4 backdrop-blur-md bg-gray-200/10 bg-clip-padding">
                <h4 className="font-semibold text-purple-800 mb-2">{t.careRequestPopup.yourRequest}</h4>
                <p className="text-gray-700 text-sm italic">"{query}"</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleCareRequestSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder={t.careRequestPopup.emailPlaceholder}
              value={careRequestEmail}
              onChange={(e) => setCareRequestEmail(e.target.value)}
              className="h-12 text-base"
              required
              disabled={isSubmittingCareRequest}
            />
            {/* Early Access Code Section */}
            <div className="space-y-2">
              <label htmlFor="early-access-code" className="block text-sm font-medium text-gray-700">{t.careRequestPopup.earlyAccessLabel}</label>
              <Input
                id="early-access-code"
                type="text"
                placeholder={t.careRequestPopup.earlyAccessPlaceholder}
                value={earlyAccessCode}
                onChange={e => {
                  setEarlyAccessCode(e.target.value);
                  setIsCodeValid(false);
                  setCodeError("");
                }}
                className="h-12 text-base"
                disabled={isSubmittingCareRequest}
              />
              {codeError && <div className="text-sm text-red-600">{codeError}</div>}
              {isCodeValid && (
                <a
                  href={`/chat?query=${encodeURIComponent(query)}`}
                  className="block w-full mt-2 bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg font-semibold transition"
                >
                  {t.careRequestPopup.accessChatButton}
                </a>
              )}
              {!isCodeValid && earlyAccessCode && (
                <Button
                  type="button"
                  className="w-full h-10 text-base bg-blue-600 hover:bg-blue-700 text-white mt-2"
                  onClick={() => {
                    if (earlyAccessCode.trim().toUpperCase() === "EARLYACCESS2024") {
                      setIsCodeValid(true);
                      setCodeError("");
                    } else {
                      setIsCodeValid(false);
                      setCodeError(t.careRequestPopup.invalidCodeError);
                    }
                  }}
                  disabled={isSubmittingCareRequest}
                >
                  {t.careRequestPopup.validateCodeButton}
                </Button>
              )}
            </div>
            
            {careRequestStatus && (
              <div className={`text-sm ${careRequestStatus.success ? "text-green-600" : "text-red-600"}`}>
                {careRequestStatus.message}
              </div>
            )}
            
            <DialogFooter className="flex flex-col space-y-2">
              <Button
                type="submit"
                className="w-full h-12 text-base bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isSubmittingCareRequest}
              >
                {isSubmittingCareRequest ? t.careRequestPopup.submittingButton : t.careRequestPopup.submitButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-xs text-gray-500 text-center">
                {t.careRequestPopup.privacy}
              </p>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Add this component before the LandingPage component
const CareTypeCards = () => {
  const carouselPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))
  const { language } = useLanguage();
  const t = pageTranslations[language as keyof typeof pageTranslations] || pageTranslations.en;
  const careTypes = t.careTypes;

  return (
    <div className="w-full py-12">
      <div className="container px-4 md:px-6">
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[carouselPlugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {careTypes.map((type, index) => (
                <CarouselItem key={index} className="pl-4 basis-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col overflow-hidden backdrop-blur-md bg-gray-200/10 bg-clip-padding"
                  >
                    <div className="w-full h-40">
                      <Image src={type.image} alt={type.title} width={400} height={220} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 flex flex-col p-6">
                      <h3 className="text-xl font-semibold mb-2 text-black">{type.title}</h3>
                      <p className="text-gray-600 mb-4">{type.description}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col overflow-hidden backdrop-blur-md bg-gray-200/10 bg-clip-padding"
            >
              <div className="w-full h-40">
                <Image src={type.image} alt={type.title} width={400} height={220} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-semibold mb-2 text-black">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Learn More button */}
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/services" passHref>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-gray rounded-full px-8 py-4 text-lg h-auto transition-transform duration-200 hover:scale-105"
              style={{
              background: 'rgba(255,255,255,0)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(9px)',
              WebkitBackdropFilter: 'blur(9px)',
              border: '1px solid rgba(255,255,255,0.38)'
              }}
            >
              {t.howitworksButton}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// How It Works step images
const howItWorksImages = [
  "/images/Step1.jpg", // Replace with your actual images
  "/images/Step2.jpg",
  "/images/Step3.jpg"
]

// Add StepBlock component after CareTypeCards
const StepBlock = ({ idx, title, description, image, setActiveStep, isMobile }: { idx: number, title: string, description: string, image: string, setActiveStep: (idx: number) => void, isMobile?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveStep(idx)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => { if (ref.current) observer.unobserve(ref.current) }
  }, [idx, setActiveStep])

  return (
    <div ref={ref} className="flex flex-col items-center md:items-start w-full">
      {isMobile && (
        <div className="w-full mb-4">
          <img src={image} alt={title} className="w-full h-48 object-cover rounded-2xl shadow-lg" />
        </div>
      )}
      <div className="w-full">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-purple-700">{idx + 1}</span>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
    </div>
  )
}

// Add this component at the top of the main page, just inside the main wrapper div
function GradientBackground() {
  return (
    <>
      <div className="gradient-bg">
        <svg>
          <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/><feBlend in="SourceGraphic" in2="goo" /></filter>
        </svg>
        <div className="gradients-container">
          <div className="g1" />
          <div className="g2" />
          <div className="g3" />
          <div className="g4" />
          <div className="g5" />
        </div>
      </div>
      <style jsx global>{`
        :root {
          --color-bg1: rgb(229, 217, 242);   /* dimmer purple */
          --color-bg2: rgb(165, 148, 249);   /* dimmer blue */
          --color1: 148, 171, 249;          /* dimmer blue */
          --color2:165, 148, 249;         /* dimmer magenta */
          --color3:148, 244, 249;          /* dimmer cyan */
          --color4: 236, 118, 140;          /* dimmer red */
          --color5: 238, 243, 105;           /* dimmer yellow */
          --color-interactive: 251, 253, 255; /* dimmer interactive */
          --circle-size: 80%;
          --blending: hard-light;
        }
        .gradient-bg {
          width: 100vw;
          height: 100vh;
          position: fixed;
          overflow: hidden;
          background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
          top: 0;
          left: 0;
          z-index: -1;
        }
        .gradient-bg svg {
          position: fixed;
          top:0;
          left:0;
          width: 0;
          height: 0;
        }
        .gradients-container {
          filter: url(#goo) blur(40px);
          width: 100vw;
          height: 100vh;
        }
        .g1 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color1), 0.4) 0, rgba(var(--color1), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
          transform-origin: center center;
          animation: moveVertical 30s ease infinite;
          opacity: 1;
        }
        .g2 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color2), 0.4) 0, rgba(var(--color2), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
          transform-origin: calc(50% - 400px);
          animation: moveInCircle 20s reverse infinite;
          opacity: 1;
        }
        .g3 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color3), 0.4) 0, rgba(var(--color3), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2 + 200px);
          left: calc(50% - var(--circle-size) / 2 - 500px);
          transform-origin: calc(50% + 400px);
          animation: moveInCircle 40s linear infinite;
          opacity: 1;
        }
        .g4 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color4), 0.3) 0, rgba(var(--color4), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
          transform-origin: calc(50% - 200px);
          animation: moveHorizontal 40s ease infinite;
          opacity: 0.7;
        }
        .g5 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color5), 0.3) 0, rgba(var(--color5), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: calc(var(--circle-size) * 2);
          height: calc(var(--circle-size) * 2);
          top: calc(50% - var(--circle-size));
          left: calc(50% - var(--circle-size));
          transform-origin: calc(50% - 800px) calc(50% + 200px);
          animation: moveInCircle 20s ease infinite;
          opacity: 1;
        }
        @keyframes moveInCircle {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes moveVertical {
          0% { transform: translateY(-50%); }
          50% { transform: translateY(50%); }
          100% { transform: translateY(-50%); }
        }
        @keyframes moveHorizontal {
          0% { transform: translateX(-50%) translateY(-10%); }
          50% { transform: translateX(50%) translateY(10%); }
          100% { transform: translateX(-50%) translateY(-10%); }
        }
      `}</style>
    </>
  );
}

// Add ClientOnly component for client-side-only rendering
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

export default function LandingPage() {
  const router = useRouter();
  const [waitlistStatus, setWaitlistStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(
    null,
  );
  const [feedbackStatus, setFeedbackStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(
    null,
  );
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [topWaitlistEmail, setTopWaitlistEmail] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3;
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 2. Replace local language state with context
  const { language, setLanguage } = useLanguage();

  // Helper to get current translations
  const t = pageTranslations[language as keyof typeof pageTranslations] || pageTranslations.en;

  // Define available languages for the switcher (used by MobileNav)
  const availableLangs = { en: "EN", zh: "中文" };

  // Refs for scroll animations
  const problemRef = useRef(null)
  const approachRef = useRef(null)
  const howItWorksScrollRef = useRef<HTMLDivElement>(null);

  // Ref for autoplay plugin
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))

  // Testimonial carousel autoplay
  const testimonialPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

  // Handler for next/prev navigation
  const goToStep = (idx: number) => {
    if (idx >= 0 && idx < totalSteps) setActiveStep(idx);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmittingWaitlist(true)
    setWaitlistStatus(null)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      console.log("Submitting waitlist form...")
      const result = await joinWaitlist(formData)
      console.log("Waitlist submission result:", result)

      setWaitlistStatus(result)
      setIsSubmittingWaitlist(false)
    } catch (error) {
      console.error("Error submitting waitlist form:", error)
      setWaitlistStatus({
        success: false,
        message: "An error occurred. Please try again later.",
        error: error instanceof Error ? error.message : String(error),
      })
      setIsSubmittingWaitlist(false)
    }
  }

  const handleTopWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!topWaitlistEmail || !topWaitlistEmail.includes("@")) {
      setWaitlistStatus({
        success: false,
        message: "Please provide a valid email address.",
      })
      return
    }

    setIsSubmittingWaitlist(true)
    setWaitlistStatus(null)

    try {
      const formData = new FormData()
      formData.append("email", topWaitlistEmail)

      console.log("Submitting top waitlist form...")
      const result = await joinWaitlist(formData)
      console.log("Top waitlist submission result:", result)

      setWaitlistStatus(result)
      setIsSubmittingWaitlist(false)
    } catch (error) {
      console.error("Error submitting top waitlist form:", error)
      setWaitlistStatus({
        success: false,
        message: "An error occurred. Please try again later.",
        error: error instanceof Error ? error.message : String(error),
      })
      setIsSubmittingWaitlist(false)
    }
  }

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmittingFeedback(true)
    setFeedbackStatus(null)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      console.log("Submitting feedback form...")
      const result = await submitFeedback(formData)
      console.log("Feedback submission result:", result)

      setFeedbackStatus(result)
      setIsSubmittingFeedback(false)
    } catch (error) {
      console.error("Error submitting feedback form:", error)
      setFeedbackStatus({
        success: false,
        message: "An error occurred. Please try again later.",
        error: error instanceof Error ? error.message : String(error),
      })
      setIsSubmittingFeedback(false)
    }
  }

  // Intersection Observer for step tracking
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setActiveStep(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <GradientBackground />
      {/* Unified Header */}
      <UnifiedHeader 
        language={language}
        setLanguage={setLanguage}
        translations={{
          heroLogo: t.heroLogo,
          howItWorks: t.howItWorks,
          aboutUs: t.aboutUs,
          joinWaitlist: t.joinWaitlist,
          SourceforCare: t.SourceforCare,
          mainPage: t.heroLogo
        }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative py-0 px-4 md:px-6 min-h-[90vh] flex items-center justify-center">
          <div className="container mx-auto max-w-7xl relative h-[90vh]">
            {/* Background Images */}
            <div className="absolute inset-0 overflow-hidden">
          {/* Left Image - Top Left */}
          <motion.div 
          className="absolute left-20 top-20 w-72 h-96 overflow-hidden rounded-2xl shadow-2xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          >
          <img 
            src="https://careneighbour.my.canva.site/_assets/media/9430f0c7baa2a133c4fb84917d601ef8.jpg" 
            alt="Carer" 
            className="w-full h-full object-cover"
          />
          </motion.div>

          {/* Right Image - Bottom Right */}
          <motion.div 
          className="absolute right-20 bottom-20 w-72 h-96 overflow-hidden rounded-2xl shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          >
          <img 
            src="https://careneighbour.my.canva.site/_assets/media/0c0b73ba778e047274f588bcffbd3b60.jpg" 
            alt="Care recipient" 
            className="w-full h-full object-cover"
          />
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
          className="absolute left-1 top-1 w-[350px] h-[350px]"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          >
          <img 
            src="https://careneighbour.my.canva.site/_assets/media/c98db77c96ad2963a69c04e453b98af5.png" 
            alt="Decorative element" 
            className="w-full h-full object-contain transform rotate-[45deg]"
          />
          </motion.div>

          <motion.div 
          className="absolute right-1 bottom-1 w-[350px] h-[350px]"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          >
          <img 
            src="https://careneighbour.my.canva.site/_assets/media/c98db77c96ad2963a69c04e453b98af5.png" 
            alt="Decorative element" 
            className="w-full h-full object-contain transform rotate-[225deg]"
          />
          </motion.div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 relative z-10 h-full">
              {/* Main Title */}
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 flex flex-col items-center justify-center"
              >
              <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-2xl">
          <motion.span 
          className="block drop-shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ textShadow: '2px 4px 8px rgba(0, 0, 0, 0.7)' }}
          >
          {language === 'en' ? 'Find a carer who' : language === 'zh' ? '找到会说你' : '尋找會說你'}
          </motion.span>
          <motion.span 
          className="block drop-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ textShadow: '2px 4px 8px rgba(0, 0, 0, 0.7)' }}
          >
          {language === 'en' ? 'speaks your language' : language === 'zh' ? '语言的护理员' : '語言的護理員'}
          </motion.span>
              </h1>
              </motion.div>

              {/* Search Bar */}
              <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-3xl mx-auto drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))' }}
              >
          <CareSearchBar />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CareTypeCards now comes right after Hero */}
        <CareTypeCards />

        {/* How It Works Section now comes after CareTypeCards */}
        <section 
          id="how-it-works"
          ref={howItWorksRef}
          style={{ scrollMarginTop: '5rem' }}
          className="w-full py-6">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tight text-center pb-4 title-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="gradient-text-fill">{t.howItWorksTitle}</span>
            </motion.h2>
            <p className="sr-only">Find care instantly with our AI-powered matching platform. Get support in seconds, tailored to your needs.</p>
          </div>
        </section>
        
        <section
          className="flex flex-col md:flex-row items-center justify-center w-full px-4"
        >
            {/* Mobile: stacked image + text for each step */}
            <div className="block md:hidden w-full px-4">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="mb-16">
              <div className="w-full mb-8">
                <Image
                src={howItWorksImages[idx]}
                alt={`Step ${idx + 1} - CareNeighbour AI-powered instant care platform`}
                width={3840}
                height={2160}
                quality={100}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
                sizes="100vw"
                />
              </div>
              <div className="px-1 text-center">
                <h3 className="text-2xl font-semibold mb-2 text-black">{(t as any)[`step${idx + 1}Title`]}</h3>
                <p className="text-gray-600 text-lg">{(t as any)[`step${idx + 1}Description`]}</p>
              </div>
              </div>
            ))}
            </div>
            {/* Desktop: sticky image + scrollable steps */}
            <div className="hidden md:flex md:w-4/5 items-start justify-center relative">
              <div
                className="sticky top-0 w-[700px] h-[50vh] flex items-center justify-center z-20 md:static md:h-screen md:sticky "
                style={{ pointerEvents: "none" }}
              >
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] rounded-2xl shadow-lg"
                  style={{
                  zIndex: 1,
                  pointerEvents: "none",
                  borderRadius: "1rem",
                  background: "rgba(255,255,255,0.18)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  }}
                >
                {howItWorksImages.map((img, idx) => (
                <Image
                key={img}
                src={img}
                alt={`Step ${idx + 1} - CareNeighbour AI-powered instant care platform`}
                width={3840}
                height={2160}
                quality={90}
                sizes="(min-width: 768px) 665px"
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-full object-contain transition-opacity duration-500 rounded-2xl ${activeStep === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                style={{
                  pointerEvents: "none",
                  transition: "opacity 0.5s",
                  paddingLeft: "1%",
                  paddingRight: "1%",
                  borderRadius: "1.5rem", // Add border radius here
                }}
                />
                ))}
                </div>
              </div>
              
              <div className="hidden md:block w-1/2 md:ml-auto">
            {[0, 1, 2].map((idx) => (
              <div
          key={idx}
          ref={(el) => { stepRefs.current[idx] = el }}
          data-idx={idx}
          className="min-h-[60vh] md:min-h-screen flex items-center overflow-hidden"
          style={{ scrollMarginTop: 100 }}
              >
          <div className="px-4 md:px-8 w-full">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-purple-700">{idx + 1}</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-black">{(t as any)[`step${idx + 1}Title`]}</h3>
            <p className="text-gray-600 text-lg">{(t as any)[`step${idx + 1}Description`]}</p>
          </div>
              </div>
            ))}
              </div>
            </div>
        </section>

        {/* Problem Statement Section */}
        <section id="problem-statement" className="w-full py-10 md:py-28 relative overflow-hidden" ref={problemRef}>
          <div className="container px-6 md:px-12 relative z-10">
            {/* Text content - takes 60% width on desktop, full width on mobile */}
            <div className="flex flex-col mb-12 md:mb-16 md:max-w mx-auto">
              <div className="flex items-center gap-2 mb-8">
          <motion.h2
            className="text-4xl md:text-6xl w-full font-bold tracking-tight text-center pb-4 md:max-w-none title-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text-fill">{t.problemTitle}</span>
          </motion.h2>
              </div>
              <p className="sr-only">CareNeighbour solves the struggle of finding care by using AI to match you instantly with trusted, culturally sensitive caregivers.</p>

              <motion.div
          className="space-y-6 text-lg md:text-xl text-gray-800 text-center md:text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
              >
          <p>
            {t.problemParagraph1}
          </p>
          <p className="text-gray-800 font-medium">
            {t.problemParagraph2Start} <span className="text-purple-700">{t.problemParagraph2End}</span>
          </p>
              </motion.div>
            </div>

            {/* Image carousel for mobile, grid for desktop */}
            <div className="block md:hidden">
              <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
              >
          <CarouselContent>
            <CarouselItem>
              <motion.div
                className="rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image
            src="/images/senior-couple.jpg"
            alt="Senior couple using technology"
            width={500}
            height={350}
            className="object-cover w-full h-[300px]"
            sizes="100vw"
                />
              </motion.div>
            </CarouselItem>
            <CarouselItem>
              <motion.div
                className="rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image
            src="/images/seniors-cards.jpg"
            alt="Seniors playing cards"
            width={500}
            height={350}
            className="object-cover w-full h-[300px]"
            sizes="100vw"
                />
              </motion.div>
            </CarouselItem>
            <CarouselItem>
              <motion.div
                className="rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image
            src="/images/seniors-social.jpg"
            alt="Seniors socializing"
            width={500}
            height={350}
            className="object-cover w-full h-[300px]"
            sizes="100vw"
                />
              </motion.div>
            </CarouselItem>
          </CarouselContent>
              </Carousel>
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              <motion.div
          className="rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
              >
          <Image
            src="/images/senior-couple.jpg"
            alt="Senior couple using technology"
            width={500}
            height={350}
            className="object-cover w-full h-[300px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
              </motion.div>

              <motion.div
          className="rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
              >
          <Image
            src="/images/seniors-cards.jpg"
            alt="Seniors playing cards"
            width={500}
            height={350}
            className="object-cover w-full h-[300px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
              </motion.div>

              <motion.div
          className="rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
              >
          <Image
            src="/images/seniors-social.jpg"
            alt="Seniors socializing"
            width={500}
            height={350}
            className="object-cover w-full h-[300px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experiences Section */}
        <section id="experiences" className="w-full py-20 md:py-5 overflow-hidden">
          <div className="container px-6 md:px-12">
            <div className="flex flex-col space-y-4 mb-12 md:mb-16 max-w-full">
              <motion.div
                className="space-y-3 w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center pb-4 w-full title-shadow" style={{ color: "#000" }}>
                  <span className="gradient-text-fill">{t.experiencesTitle}</span>
                </h2>
                <p className="sr-only">Hear how CareNeighbour's AI-powered platform delivers instant, trusted care for families like yours.</p>
              </motion.div>
            </div>

            {/* Testimonial Carousel - Continuous autoplay without controls */}
            <Carousel
              plugins={[testimonialPlugin.current]}
              className="w-full max-w-none"
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
              }}
            >
              <CarouselContent className="-ml-4">
                {/* Item 1 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3 flex">
                  <div
                    className="p-8 rounded-2xl h-full flex flex-col overflow-hidden w-full"
                    style={{
                      background: 'rgba(255,255,255,0)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(9px)',
                      WebkitBackdropFilter: 'blur(9px)',
                      border: '1px solid rgba(255,255,255,0.38)'
                    }}
                  >
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium" style={{ color: "#000", fontWeight: "bold" }}>{t.testimonialMariaName}</p>
                    </div>
                    <blockquote className="justify-left flex-grow" style={{ color: "#000" }}>
                      {t.testimonialMariaQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 2 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3 flex">
                  <div
                    className="p-8 rounded-2xl h-full flex flex-col overflow-hidden w-full"
                    style={{
                      background: 'rgba(255,255,255,0)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(9px)',
                      WebkitBackdropFilter: 'blur(9px)',
                      border: '1px solid rgba(255,255,255,0.38)'
                    }}
                  >
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium" style={{ color: "#000", fontWeight: "bold" }}>{t.testimonialChenName}</p>
                    </div>
                    <blockquote className="justify-left flex-grow" style={{ color: "#000" }}>
                      {t.testimonialChenQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 3 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3 flex">
                  <div
                    className="p-8 rounded-2xl h-full flex flex-col overflow-hidden w-full"
                    style={{
                      background: 'rgba(255,255,255,0)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(9px)',
                      WebkitBackdropFilter: 'blur(9px)',
                      border: '1px solid rgba(255,255,255,0.38)'
                    }}
                  >
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium" style={{ color: "#000", fontWeight: "bold" }}>{t.testimonialAhmedName}</p>
                    </div>
                    <blockquote className="justify-left flex-grow" style={{ color: "#000" }}>
                      {t.testimonialAhmedQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 4 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3 flex">
                  <div
                    className="p-8 rounded-2xl h-full flex flex-col overflow-hidden w-full"
                    style={{
                      background: 'rgba(255,255,255,0)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(9px)',
                      WebkitBackdropFilter: 'blur(9px)',
                      border: '1px solid rgba(255,255,255,0.38)'
                    }}
                  >
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium" style={{ color: "#000", fontWeight: "bold" }}>{t.testimonialSarahName}</p>
                    </div>
                    <blockquote className="justify-left flex-grow" style={{ color: "#000" }}>
                      {t.testimonialSarahQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 5 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3 flex">
                  <div
                    className="p-8 rounded-2xl h-full flex flex-col overflow-hidden w-full"
                    style={{
                      background: 'rgba(255,255,255,0)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(9px)',
                      WebkitBackdropFilter: 'blur(9px)',
                      border: '1px solid rgba(255,255,255,0.38)'
                    }}
                  >
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium" style={{ color: "#000", fontWeight: "bold" }}>{t.testimonialElenaName} </p>
                    </div>
                    <blockquote className="justify-left flex-grow" style={{ color: "#000" }}>
                      {t.testimonialElenaQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 6 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3 flex">
                  <div
                    className="p-8 rounded-2xl h-full flex flex-col overflow-hidden w-full"
                    style={{
                      background: 'rgba(255,255,255,0)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(9px)',
                      WebkitBackdropFilter: 'blur(9px)',
                      border: '1px solid rgba(255,255,255,0.38)'
                    }}
                  >
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium" style={{ color: "#000", fontWeight: "bold" }}>{t.testimonialRajName}</p>
                    </div>
                    <blockquote className="justify-left flex-grow" style={{ color: "#000" }}>
                      {t.testimonialRajQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Our Approach Section - Apple-inspired with feature carousel */}
        <section id="our-approach" className="w-full py-20 md:py-28" ref={approachRef}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-0">
              <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
              >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight title-shadow">
            <span className="gradient-text-fill">{t.approachTitlePart1} {t.approachTitleTech} {t.approachTitlePart2} {t.approachTitleCompassion}</span>
          </h2>
          <p className="sr-only">Our AI-driven approach means you get matched with the right care, instantly and effortlessly.</p>
          <div className="h-8" />
              </motion.div>
            </div>

            {/* Feature Section 1: Text left, video right */}
            <motion.section
              className="feature-section flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Text */}
              <div className="w-full md:w-[320px] text-center md:text-left flex flex-col justify-center items-center md:items-start order-2 md:order-1">
          <h2 className="text-2xl font-semibold mb-3 title-shadow">
            <span className="gradient-text-fill">{t.feature1Title}</span>
          </h2>
          <p className="text-lg text-gray-700 justify-left min-h-[120px]">
            {t.feature1Description}
          </p>
              </div>
              {/* Video */}
              <div className="flex-shrink-0 w-full md:w-[350px] flex justify-center order-1 md:order-2">
          <div
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "500px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2rem",
              background: 'rgba(255,255,255,0)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(9px)',
              WebkitBackdropFilter: 'blur(9px)',
              border: '1px solid rgba(255,255,255,0.38)',
              position: 'relative'
            }}
          >
            <div
              style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          borderRadius: "2.5rem",
          boxShadow: "0 0 40px 20px rgba(147,51,234,0.18)",
          filter: "blur(16px)",
              }}
            />
            <ClientOnly>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "68%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "2.5rem",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <source src="videos/Care-request-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </ClientOnly>
          </div>
              </div>
            </motion.section>

            {/* Feature Section 2: Video left, text right */}
            <motion.section
              className="feature-section flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 mt-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Video */}
              <div className="flex-shrink-0 w-full md:w-[350px] flex justify-center">
          <div
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "500px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2rem",
              background: 'rgba(255,255,255,0)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(9px)',
              WebkitBackdropFilter: 'blur(9px)',
              border: '1px solid rgba(255,255,255,0.38)',
              position: 'relative'
            }}
          >
            <div
              style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          borderRadius: "2.5rem",
          boxShadow: "0 0 40px 20px rgba(147,51,234,0.18)",
          filter: "blur(16px)",
              }}
            />
            <ClientOnly>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "68%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "2.5rem",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <source src="videos/AI-Chat-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </ClientOnly>
          </div>
              </div>
              {/* Text */}
              <div className="w-full md:w-[320px] text-center md:text-left flex flex-col justify-center items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-3 title-shadow">
            <span className="gradient-text-fill">{t.feature2Title}</span>
          </h2>
          <p className="text-lg text-gray-700 min-h-[120px]">
            {t.feature2Description}
          </p>
              </div>
            </motion.section>

            {/* Feature Section 3: Text left, video right */}
            <motion.section
              className="feature-section flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 mt-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Text */}
              <div className="w-full md:w-[320px] text-center md:text-left flex flex-col justify-center items-center md:items-start order-2 md:order-1">
          <h2 className="text-2xl font-semibold mb-3 title-shadow">
            <span className="gradient-text-fill">{t.feature3Title}</span>
          </h2>
          <p className="text-lg text-gray-700 min-h-[120px]">
            {t.feature3Description}
          </p>
              </div>
              {/* Video */}
              <div className="flex-shrink-0 w-full md:w-[350px] flex justify-center order-1 md:order-2">
          <div
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "500px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2rem",
              background: 'rgba(255,255,255,0)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(9px)',
              WebkitBackdropFilter: 'blur(9px)',
              border: '1px solid rgba(255,255,255,0.38)',
              position: 'relative'
            }}
          >
            <div
              style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          borderRadius: "2.5rem",
          boxShadow: "0 0 40px 20px rgba(147,51,234,0.18)",
          filter: "blur(16px)",
              }}
            />
            <ClientOnly>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "68%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "2.5rem",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <source src="videos/Carer-Review-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </ClientOnly>
          </div>
              </div>
            </motion.section>

            {/* Feature Section 4: Video left, text right */}
            <motion.section
              className="feature-section flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 mt-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {/* Video */}
              <div className="flex-shrink-0 w-full md:w-[350px] flex justify-center">
          <div
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "500px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2rem",
              background: 'rgba(255,255,255,0)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(9px)',
              WebkitBackdropFilter: 'blur(9px)',
              border: '1px solid rgba(255,255,255,0.38)',
              position: 'relative'
            }}
          >
            <div
              style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          borderRadius: "2.5rem",
          boxShadow: "0 0 40px 20px rgba(147,51,234,0.18)",
          filter: "blur(16px)",
              }}
            />
            <ClientOnly>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "68%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "2.5rem",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <source src="videos/Explore-Page-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </ClientOnly>
          </div>
              </div>
              {/* Text */}
              <div className="w-full md:w-[320px] text-center md:text-left flex flex-col justify-center items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-3 title-shadow">
            <span className="gradient-text-fill">{t.feature4Title}</span>
          </h2>
          <p className="text-lg text-gray-700 min-h-[120px]">
            {t.feature4Description}
          </p>
              </div>
            </motion.section>
          </div>
        </section>

        {/* Early Access Signup & Feedback - Apple-inspired with clean forms */}
        <section id="waitlist" className="w-full py-20 md:py-18" style={{
          background: 'rgba(255,255,255,0)',
          borderRadius: '0px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(9px)',
          WebkitBackdropFilter: 'blur(9px)',
          border: '1px solid rgba(255,255,255,0.38)'
        }}>
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Waitlist Column */}
          <div className="flex flex-col justify-start space-y-6 self-start">
          <motion.div
            className="space-y-3 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight title-shadow">
              <span className="gradient-text-fill">{t.waitlistTitle}</span>
            </h2>
            <p className="text-gray-700 text-base md:text-lg">{t.waitlistSubtitle}</p>
          </motion.div>

          <motion.div
            className="w-full max-w-md space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <Input
                type="email"
                name="email"
                placeholder={t.waitlistEmailPlaceholder}
                className="h-14 text-base rounded-xl border-gray-300"
                required
                disabled={isSubmittingWaitlist}
              />
              <Button
                type="submit"
                className="w-full h-14 text-base rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isSubmittingWaitlist}
              >
                {isSubmittingWaitlist ? t.waitlistSubmittingButton : t.waitlistSubmitButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            {waitlistStatus && (
              <div className={`mt-2 text-sm ${waitlistStatus.success ? "text-green-600" : "text-red-600"}`}>
                {waitlistStatus.message}
              </div>
            )}
            <p className="text-xs text-gray-500 text-center">{t.waitlistPrivacy}</p>
          </motion.div>

          {/* Demo button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
          >
          </motion.div>
              </div>

              {/* Feedback Column with Image */}
              <div className="flex flex-col space-y-6">
          <motion.div
            className="space-y-3 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight title-shadow">
              <span className="gradient-text-fill">{t.feedbackTitle}</span>
            </h2>
            <p className="text-gray-700 text-base md:text-lg">{t.feedbackSubtitle}</p>
          </motion.div>
          <motion.div
            className="w-full space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <Input
                type="email"
                name="email"
                placeholder={t.feedbackEmailPlaceholder}
                className="h-14 text-base rounded-xl border-gray-300"
                required
                disabled={isSubmittingFeedback}
              />
              <textarea
                name="feedback"
                placeholder={t.feedbackMessagePlaceholder}
                className="w-full p-4 border rounded-xl min-h-[120px] bg-white border-gray-300 text-base"
                required
                disabled={isSubmittingFeedback}
              />
              <Button
                type="submit"
                variant="outline"
                className="w-full h-14 text-base rounded-xl border-purple-300 text-purple-700 hover:bg-purple-50"
                disabled={isSubmittingFeedback}
              >
                {isSubmittingFeedback ? t.feedbackSubmittingButton : t.feedbackSubmitButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            {feedbackStatus && (
              <div className={`mt-2 text-sm ${feedbackStatus.success ? "text-green-600" : "text-red-600"}`}>
                {feedbackStatus.message}
              </div>
            )}
            <p className="text-xs text-gray-500 text-center">{t.feedbackPrivacy}</p>
          </motion.div>
              </div>
            </div>
          </div>
        </section>      </main>

      {/* Unified Footer */}
      <UnifiedFooter 
        language={language}
        translations={{
          aboutUs: t.aboutUs,
          mainPage: t.heroLogo,
          footerCopyright: t.footerCopyright
        }}
      />
    </div>
  )
}
