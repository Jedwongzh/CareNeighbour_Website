"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Send, User, Bot, ArrowRight, Settings, CreditCard, Heart, Shield, FileText, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { useLanguage } from "@/app/contexts/LanguageContext"

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Add the same GradientBackground component from main page
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

function UserProfileSidebar({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (section: string) => void }) {
  const profileSections = [
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Care Preference', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'legal', label: 'Legal & Privacy', icon: Shield },
    { id: 'tnc', label: 'Terms & Conditions', icon: FileText },
  ]

  return (
    <div className="w-64 lg:w-80 bg-white/10 backdrop-blur-md rounded-2xl p-6 h-fit">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">John Doe</h3>
          <p className="text-sm text-gray-600">Premium Member</p>
        </div>
      </div>
      
      <nav className="space-y-2">
        {profileSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
              activeSection === section.id
                ? 'bg-purple-600 text-white'
                : 'text-gray-700 hover:bg-white/20'
            }`}
          >
            <section.icon className="w-5 h-5" />
            <span className="font-medium">{section.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

function ChatPageContent() {
  const [showInitialReply, setShowInitialReply] = useState(false)
  const [showSignInPrompt, setShowSignInPrompt] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [activeProfileSection, setActiveProfileSection] = useState('activity')
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || "I need help finding a carer"

  useEffect(() => {
    // Add the user's initial request
    const userMessage: Message = {
      id: '1',
      type: 'user',
      content: query,
      timestamp: new Date()
    }
    setMessages([userMessage])

    // Show assistant reply after a delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: '2',
        type: 'assistant',
        content: `Thank you for reaching out! I understand you're looking for care assistance. Based on your request "${query}", I can help you find the perfect carer who meets your specific needs. To provide you with personalized recommendations and connect you with verified caregivers in your area, please sign in or create an account to continue.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setShowInitialReply(true)
      
      // Show sign-in prompt after another delay
      setTimeout(() => {
        setShowSignInPrompt(true)
      }, 2000)
    }, 1500)
  }, [query])

  const handleSignIn = () => {
    setIsAuth(true)
    setShowSignInPrompt(false)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
    setInputValue("")
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm processing your request and will connect you with suitable caregivers shortly...",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  if (isAuth) {
    return (
      <div className="flex space-x-6 max-w-7xl mx-auto w-full h-[calc(100vh-200px)]">
        {/* Left Sidebar - User Profile */}
        <div className="hidden md:block">
          <UserProfileSidebar activeSection={activeProfileSection} setActiveSection={setActiveProfileSection} />
        </div>

        {/* Right Side - Chat Interface */}
        <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
          {/* Care Request Header */}
          <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 p-4 border-b border-white/20">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Care Request</h3>
                <p className="text-gray-700 bg-white/50 rounded-lg p-3 border border-white/30">{query}</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    {message.type === 'user' ? (
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-purple-200">
                        <Image src="/images/logo.png" alt="CareNeighbour" width={20} height={20} className="rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className={`rounded-2xl p-3 ${
                    message.type === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white/80 text-gray-900 border border-white/30'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="border-t border-white/20 p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-white/50 border-white/30"
              />
              <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex space-x-6 max-w-7xl mx-auto w-full px-4 sm:px-6">
      {/* Left Sidebar - User Profile (Hidden on mobile before auth) */}
      <div className="hidden lg:block">
        <UserProfileSidebar activeSection={activeProfileSection} setActiveSection={setActiveProfileSection} />
      </div>

      {/* Right Side - Pre-auth Chat */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto">
        {/* Care Request Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-6 border border-white/20"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Care Request</h3>
              <p className="text-gray-700 bg-white/50 rounded-lg p-3 border border-white/30">{query}</p>
            </div>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 space-y-4 mb-6">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="flex-shrink-0">
                  {message.type === 'user' ? (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center border-2 border-purple-200">
                      <Image src="/CN_Brandmark_Black.png" alt="CareNeighbour" width={24} height={24} className="rounded-full" />
                    </div>
                  )}
                </div>
                <div className={`rounded-2xl p-3 sm:p-4 ${
                  message.type === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/80 backdrop-blur-sm text-gray-900 border border-white/30'
                }`}>
                  <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sign In Prompt - Same styling as main page dialog */}
        <AnimatePresence>
          {showSignInPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Image src="/CN_Brandmark_Black.png" alt="CareNeighbour" width={32} height={32} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Continue Your Care Journey
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Sign in or create an account to get personalized carer recommendations and continue your conversation.
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={handleSignIn}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-base font-medium"
                  >
                    Sign In / Sign Up
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-white/30 bg-white/20 text-gray-700 hover:bg-white/30 py-3 rounded-xl text-base"
                  >
                    Continue as Guest
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const { language, setLanguage } = useLanguage()

  const t = {
    heroLogo: "CareNeighbour",
    howItWorks: "How It Works",
    aboutUs: "About Us",
    joinWaitlist: "Join Waitlist",
    SourceforCare: "Source for Care",
    mainPage: "CareNeighbour",
    footerCopyright: "CareNeighbour, Inc. All rights reserved.",
  }

  return (
    <div className="flex flex-col min-h-screen">
      <GradientBackground />
      {/* Same UnifiedHeader as main page */}
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
      <main className="flex-grow flex flex-col py-4 sm:py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="text-gray-600">Loading Chat...</span>
            </div>
          </div>
        }>
          <ChatPageContent />
        </Suspense>
      </main>
      <UnifiedFooter
        language={language}
        translations={{
          aboutUs: t.aboutUs,
          mainPage: t.mainPage,
          footerCopyright: t.footerCopyright,
        }}
      />
    </div>
  )
}
