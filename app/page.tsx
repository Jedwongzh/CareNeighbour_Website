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
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { joinWaitlist, submitFeedback } from "./actions"
import { useLanguage } from "./contexts/LanguageContext" // Import useLanguage hook

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
    step1Description: "Tell us about the required care, preferred language, cultural nuances, and location.",
    step2Title: "Match & Connect",
    step2Description: "We instantly match you with verified caregivers who meet your specific criteria. Review profiles and connect.",
    step3Title: "Book & Relax",
    step3Description: "Schedule care easily, manage payments securely, and gain peace of mind knowing your loved one is in good hands.",
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
    }
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
    step1Description: "告诉我们所需的护理服务、偏好语言、文化细节和地点。",
    step2Title: "匹配连接",
    step2Description: "我们即时为您匹配符合您特定标准的认证护理员。查看资料并联系。",
    step3Title: "轻松预订",
    step3Description: "轻松安排护理，安全管理付款，让您安心无忧，因为您所爱的人得到了妥善照顾。",
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
    searchTrySearching: "尝试搜索:",
    searchPresetPrompts: {
      elderlyCare: "老年护理",
      medicalCare: "医疗护理",
      culturalCare: "文化护理",
      respiteCare: "临时护理",
      dementiaCare: "失智症护理",
      homeCare: "居家护理"
    },
    searchPresetDescriptions: {
      elderlyCare: "寻找老年护理人员",
      medicalCare: "寻找医疗护理协助",
      culturalCare: "需要文化敏感的护理",
      respiteCare: "寻找临时护理支持",
      dementiaCare: "寻找失智症护理专家",
      homeCare: "需要居家护理服务"
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
      icon: '👴',
      title: t.searchPresetPrompts.elderlyCare,
      description: t.searchPresetDescriptions.elderlyCare
    },
    {
      key: 'medicalCare',
      icon: '🏥',
      title: t.searchPresetPrompts.medicalCare,
      description: t.searchPresetDescriptions.medicalCare
    },
    {
      key: 'culturalCare',
      icon: '🌍',
      title: t.searchPresetPrompts.culturalCare,
      description: t.searchPresetDescriptions.culturalCare
    },
    {
      key: 'respiteCare',
      icon: '⏰',
      title: t.searchPresetPrompts.respiteCare,
      description: t.searchPresetDescriptions.respiteCare
    },
    {
      key: 'dementiaCare',
      icon: '🧠',
      title: t.searchPresetPrompts.dementiaCare,
      description: t.searchPresetDescriptions.dementiaCare
    },
    {
      key: 'homeCare',
      icon: '🏠',
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
            className="relative pl-6 pr-24 py-8 text-xl rounded-full border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 shadow-lg bg-white whitespace-pre-wrap break-words overflow-y-auto"
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
            <AnimatePresence mode="popLayout">
              {query.length > 0 ? (
                <motion.div
                  key="send"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Send className="w-7 h-7 text-purple-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="search"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
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
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors"
          >
            <span className="text-xl">{prompt.icon}</span>
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
          className="focus:outline-none text-purple-700 text-lg font-semibold flex flex-col items-center bg-transparent border-none p-0 hover:text-purple-900"
          style={{ background: 'none', border: 'none' }}
        >
          How It Works
          <span>
            <ChevronDown className="animate-bounce mt-1 w-7 h-7 text-purple-700" />
          </span>
        </button>
      </div>
    </div>
  )
}

// Add this component before the LandingPage component
const CareTypeCards = () => {
  const carouselPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))
  const careTypes = [
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
      image: "/images/Culturalcareimg.jpg",
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
  ]

  return (
    <div className="w-full py-12 bg-white">
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
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col overflow-hidden"
                  >
                    <div className="w-full h-40">
                      <Image src={type.image} alt={type.title} width={400} height={220} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 flex flex-col p-6">
                      <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
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
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col overflow-hidden"
            >
              <div className="w-full h-40">
                <Image src={type.image} alt={type.title} width={400} height={220} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
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
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-4 text-lg h-auto"
            >
              Learn More About Our Care Services
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
  "/images/step1.jpg", // Replace with your actual images
  "/images/step2.jpg",
  "/images/step3.jpg"
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

      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl)
      } else {
        setWaitlistStatus(result)
        setIsSubmittingWaitlist(false)
      }
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

      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl)
      } else {
        setWaitlistStatus(result)
        setIsSubmittingWaitlist(false)
      }
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

      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl)
      } else {
        setFeedbackStatus(result)
        setIsSubmittingFeedback(false)
      }
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
    <div className="flex min-h-[100dvh] flex-col bg-white">
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
        <section className="w-full py-10 md:py-20 lg:py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-white z-0"></div>

            <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-8 md:space-y-10">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center justify-between w-full">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 leading-tight md:max-w-[70%] max-w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t.heroTitleStart}{" "}
              <span className="bg-gradient-to-r from-purple-700 to-gray-900 text-transparent bg-clip-text">
                {t.heroTitleEnd}
              </span>
            </motion.h1>
            
            <div className="flex-shrink-0 md:ml-auto md:pl-8 mt-6 md:mt-0">
              <Image
                src="/images/CN_Figure2.png"
                alt="CareNeighbor Guide"
                width={220}
                height={220}
                className="object-contain md:w-[220px] md:h-[220px] w-[100px] h-[100px]"
              />
            </div>
          </div>
              </div>

                <motion.p
                  className="text-xl md:text-2xl text-gray-600 max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {t.heroSubtitle}
                </motion.p>

                {/* Search Bar */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <CareSearchBar />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CareTypeCards now comes right after Hero */}
        <CareTypeCards />

        {/* How It Works Section now comes after CareTypeCards */}
        <section className="w-full py-6 bg-white">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tight text-center bg-gradient-to-r from-gray-800 to-purple-600 text-transparent bg-clip-text pb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t.howItWorksTitle}
            </motion.h2>
          </div>
        </section>
        <section
          id="how-it-works"
          ref={howItWorksRef}
          className="flex flex-col md:flex-row"
        >
          {/* Fixed image area (desktop only) */}
          <div className="w-full md:w4/5 md:sticky md:top-0 md:h-screen flex items-center justify-center relative">
            {howItWorksImages.map((img, idx) => (
              <img
          key={img}
          src={img}
          alt={`Step ${idx + 1}`}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[900px] w-full max-h-[70vh] object-contain transition-opacity duration-500 ${activeStep === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{
            pointerEvents: activeStep === idx ? "auto" : "none",
            transition: "opacity 0.5s",
          }}
              />
            ))}
          </div>
          {/* Step content */}
          <div className="w-full md:w-1/2 md:ml-auto">
            {[0, 1, 2].map((idx) => (
              <div
          key={idx}
          ref={el => stepRefs.current[idx] = el}
          data-idx={idx}
          className="lg:min-h-screen h-[45rem] flex items-center overflow-hidden"
          style={{ scrollMarginTop: 100 }}
              >
          {/* On mobile, show image above */}
          <div className="block md:hidden w-full mb-4">
            <img src={howItWorksImages[idx]} alt={(t as any)[`step${idx + 1}Title`]} className="w-full h-48 object-cover rounded-2xl shadow-lg" />
          </div>
          <div className="px-4 md:px-8 w-full">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-purple-700">{idx + 1}</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{(t as any)[`step${idx + 1}Title`]}</h3>
            <p className="text-gray-600 text-lg">{(t as any)[`step${idx + 1}Description`]}</p>
          </div>
              </div>
            ))}
          </div>
        </section>

        {/* Problem Statement Section */}
        <section id="problem-statement" className="w-full py-20 md:py-28 relative overflow-hidden" ref={problemRef}>
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0"></div>

          <div className="container px-4 md:px-6 relative z-10">
            {/* Text content - takes 60% width on desktop, full width on mobile */}
            <div className="flex flex-col mb-12 md:mb-16 md:max-w mx-auto">
              <div className="flex items-center gap-2 mb-8">
          <div className="flex-shrink-0">
            <Image
              src="/images/CN_Figure1.png"
              alt="CareNeighbor Guide"
              width={220}
              height={220}
              className="object-contain md:w-[220px] md:h-[220px] w-[100px] h-[100px]"
            />
          </div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tight text-left bg-gradient-to-r from-gray-800 to-purple-600 text-transparent bg-clip-text pb-4 md:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.problemTitle}
          </motion.h2>
              </div>

              <motion.div
          className="space-y-6 text-lg md:text-xl text-gray-600"
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
          />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experiences Section */}
        <section id="experiences" className="w-full py-20 md:py-5 bg-white overflow-hidden">
            <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-4 mb-12 md:mb-16 max-w-full">
              <motion.div
              className="space-y-3 w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-left bg-gradient-to-r from-gray-800 to-purple-600 text-transparent bg-clip-text pb-4 w-full">
                {t.experiencesTitle}
              </h2>
              <p className="text-gray-600 text-lg md:text-xl lg:text-2xl text-left w-full">
                {t.experiencesSubtitle}
              </p>
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
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">{t.testimonialMariaName}</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      {t.testimonialMariaQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 2 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">{t.testimonialChenName}</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      {t.testimonialChenQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 3 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">{t.testimonialAhmedName}</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      {t.testimonialAhmedQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 4 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">{t.testimonialSarahName}</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      {t.testimonialSarahQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 5 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">{t.testimonialElenaName} </p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      {t.testimonialElenaQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 6 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">{t.testimonialRajName}</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      {t.testimonialRajQuote}
                    </blockquote>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            </div>
        </section>

        {/* Our Approach Section - Apple-inspired with feature carousel */}
        <section id="our-approach" className="w-full py-20 md:py-28 bg-white" ref={approachRef}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-0">
              <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
              >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            {t.approachTitlePart1}{" "}
            <span className="bg-gradient-to-r from-purple-700 to-gray-900 text-transparent bg-clip-text">
              {t.approachTitleTech}
            </span>{" "}
            {t.approachTitlePart2}{" "}
            <span className="bg-gradient-to-r from-purple-600 to-gray-800 text-transparent bg-clip-text">
              {t.approachTitleCompassion}
            </span>
          </h2>
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
          <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-gray-800 text-transparent bg-clip-text">
            {t.feature1Title}
          </h2>
          <p className="text-lg text-gray-700 justify-left">
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
              background: "#fff",
            }}
          >
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
              }}
            >
              <source src="videos/Care-request-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
              background: "#fff",
            }}
          >
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
              }}
            >
              <source src="videos/AI-Chat-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
              </div>
              {/* Text */}
              <div className="w-full md:w-[320px] text-center md:text-left flex flex-col justify-center items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-gray-800 text-transparent bg-clip-text">
            {t.feature2Title}
          </h2>
          <p className="text-lg text-gray-700">
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
          <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-gray-800 text-transparent bg-clip-text">
            {t.feature3Title}
          </h2>
          <p className="text-lg text-gray-700">
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
              background: "#fff",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "2rem",
              }}
            >
              <source src="videos/Carer-Review-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
              background: "#fff",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "2rem",
              }}
            >
              <source src="videos/Explore-Page-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
              </div>
              {/* Text */}
              <div className="w-full md:w-[320px] text-center md:text-left flex flex-col justify-center items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-gray-800 text-transparent bg-clip-text">
            {t.feature4Title}
          </h2>
          <p className="text-lg text-gray-700">
            {t.feature4Description}
          </p>
              </div>
            </motion.section>
          </div>
        </section>

        {/* Early Access Signup & Feedback - Apple-inspired with clean forms */}
        <section id="waitlist" className="w-full py-20 md:py-18 bg-purple-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                {/* Waitlist Column */}
                <div className="flex flex-col justify-start space-y-6 self-start">
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{t.waitlistTitle}</h2>
                  <p className="text-gray-600 text-lg md:text-xl">
                  {t.waitlistSubtitle}
                  </p>
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
                  <p className="text-xs text-gray-500">{t.waitlistPrivacy}</p>
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
                    hover: { type: "spring", stiffness: 400, damping: 17 },
                    tap: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                >
                </motion.div>
              </div>

              {/* Feedback Column with Image */}
              <div className="flex flex-col space-y-6">
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{t.feedbackTitle}</h2>
                  <p className="text-gray-600 text-lg md:text-xl">
                    {t.feedbackSubtitle}
                  </p>
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
                  <p className="text-xs text-gray-500">{t.feedbackPrivacy}</p>
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
