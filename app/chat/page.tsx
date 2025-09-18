"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Send,
  User,
  Bot,
  ArrowRight,
  Settings,
  CreditCard,
  Heart,
  Shield,
  FileText,
  Activity,
  Menu,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  MessageSquare,
  History,
  Users,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { UnifiedFooter } from "@/components/unified-footer";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { CarerProfile, getCarerById, mockCarers } from "@/lib/mock-data/carers";
import { GeminiResponse } from "@/lib/service/gemini";
// header translations handled globally via GlobalHeader

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  recommendations?: CarerRecommendation[];
}

interface CarerRecommendation {
  profile: CarerProfile;
  matchScore: number;
  reasoning: string[];
}

function CarerRecommendationCard({
  carer,
  onMoreInfo,
}: {
  carer: CarerRecommendation;
  onMoreInfo: (carer: CarerRecommendation) => void;
}) {
  return (
    <Card
      className="bg-white border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl min-h-[400px] flex flex-col cursor-pointer relative"
      onClick={() => onMoreInfo(carer)}
    >
      <CardHeader className="pb-3 md:pb-4 flex-shrink-0 text-center">
        <div className="flex flex-col items-center space-y-2 md:space-y-3">
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image
              src={carer.profile.photo}
              alt={carer.profile.name}
              fill
              className="rounded-full object-cover shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  carer.profile.name
                )}&background=8b5cf6&color=fff&size=64`;
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-base md:text-lg">
              {carer.profile.name}
            </h3>
            <p className="text-xs md:text-sm text-purple-600 font-medium">
              {carer.profile.experience}
            </p>
            <div className="flex items-center justify-center space-x-2 mt-1 md:mt-2">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs md:text-sm font-medium">
                  {carer.profile.rating}
                </span>
              </div>
              <span className="text-purple-600 font-bold text-xs md:text-sm">
                {carer.matchScore}% match
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col relative">
        <div className="bg-purple-50 rounded-lg p-3 md:p-4 border border-purple-200 shadow-sm">
          {/* <p className="text-xs md:text-sm font-semibold text-purple-800 mb-2 md:mb-3">
            Why {carer.profile.name} is perfect for you:
          </p> */}
          <ul className="space-y-1 md:space-y-2">
            {carer.reasoning.slice(0, 2).map((reason, index) => (
              <li
                key={index}
                className="text-xs md:text-sm text-gray-700 flex items-start leading-relaxed"
              >
                <span className="text-purple-600 pr-1 text-center items-center text-sm md:text-base">
                  •
                </span>
                <span className="mt-1 text-center items-center">{reason}</span>
              </li>
            ))}
          </ul>
          {/* 
          <div className="mt-3 pt-3 border-t border-purple-200">
            <p className="text-xs text-gray-600 mb-1">
              <span className="font-medium">Specializes in:</span>{" "}
              {carer.profile.skills.slice(0, 2).join(", ")}
              {carer.profile.skills.length > 2 &&
                ` +${carer.profile.skills.length - 2} more`}
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-medium">Languages:</span>{" "}
              {carer.profile.languages.join(", ")}
            </p>
          </div> */}
        </div>

        {/* Blur overlay at bottom of card - positioned at bottom of set height
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent backdrop-blur-sm pointer-events-none"></div> */}

        {/* Click to view more indicator */}
        {/* <div className="absolute bottom-1 md:bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-purple-600 font-medium bg-white/95 px-2 md:px-3 py-1 rounded-full border border-purple-200 shadow-sm">
          Click to view more
        </div> */}
      </CardContent>
    </Card>
  );
}

// Sidebar component for desktop layout
function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: MessageSquare, label: "Chat", href: "/chat", active: true },
    { icon: History, label: "Chat History", href: "/chat/history" },
    { icon: Users, label: "My Carers", href: "/carers" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen w-64 bg-white/90 backdrop-blur-md border-r border-purple-200/30 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto lg:h-screen
      `}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 pr-12">
            <Image
              src="/images/Logo-no-bck.png"
              alt="CareNeighbour"
              width={32}
              height={32}
            />
            <span className="font-bold text-xl text-gray-900">
              CareNeighbour
            </span>
          </div>

          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-2 lg:hidden w-10 h-10 p-0"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-colors
                  ${
                    item.active
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="mt-auto">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-600">Premium Member</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function UserProfileSidebar({
  activeSection,
  setActiveSection,
  isExpanded,
  setIsExpanded,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}) {
  const profileSections = [
    { id: "activity", label: "Activity", icon: Activity },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "preferences", label: "Care Preference", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "legal", label: "Legal & Privacy", icon: Shield },
    { id: "tnc", label: "Terms & Conditions", icon: FileText },
  ];

  // If collapsed, show only icon in header
  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-gray-800"
      >
        <User className="w-5 h-5" />
      </Button>
    );
  }

  // Expanded profile dropdown below header
  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <Button
            onClick={() => setIsExpanded(false)}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-600">Premium Member</p>
          </div>
        </div>

        <nav className="space-y-1">
          {profileSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeSection === section.id
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function ChatPageContent() {
  const [showInitialReply, setShowInitialReply] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [activeProfileSection, setActiveProfileSection] = useState("activity");
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [mobileCardIndex, setMobileCardIndex] = useState(0); // Simple index for mobile card navigation
  const [visibleCardsCount, setVisibleCardsCount] = useState(1); // Track current visible cards count
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [selectedCarer, setSelectedCarer] =
    useState<CarerRecommendation | null>(null);
  const [isCarerDetailOpen, setIsCarerDetailOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initializationRef = useRef(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "I need help finding a carer";

  // Check if screen can fit all 3 cards side by side
  const canFitAllCards = () => {
    if (typeof window === "undefined") return false;

    // Calculate available width considering sidebar and padding
    const availableWidth =
      window.innerWidth >= 1024
        ? window.innerWidth - 256 - 48 // Desktop with sidebar
        : window.innerWidth - 48; // Mobile/tablet without sidebar

    // Each card needs minimum 280px + gap (16px)
    const requiredWidth = 3 * (280 + 16) - 16; // 3 cards + 2 gaps

    return availableWidth >= requiredWidth;
  };

  // Update whether we need scrolling based on screen size
  const updateScrollingNeeded = () => {
    const needsScrolling = !canFitAllCards();
    setVisibleCardsCount(needsScrolling ? 1 : 3); // Show 1 card when scrolling, 3 when all fit
    return needsScrolling;
  };

  // Shuffle function to randomize carer order
  const shuffleCarers = (carers: CarerProfile[]) => {
    const shuffled = [...carers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper function to safely set mobile card index with bounds checking
  const setMobileCardIndexSafe = (index: number) => {
    const safeIndex = Math.max(0, Math.min(2, index));
    setMobileCardIndex(safeIndex); // Always between 0 and 2
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Voice recognition setup
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = "en-US";

      speechRecognition.onstart = () => {
        setIsListening(true);
      };

      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      speechRecognition.onend = () => {
        setIsListening(false);
      };

      speechRecognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    }
  }, []);

  // Initialize and handle window resize for responsive carousel
  useEffect(() => {
    // Initialize on mount
    updateScrollingNeeded();

    const handleResize = () => {
      updateScrollingNeeded();
      setMobileCardIndexSafe(0); // Reset card index when layout changes
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset mobile card index when screen size changes (e.g., orientation change)
  useEffect(() => {
    const handleResize = () => {
      setMobileCardIndex(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleVoiceRecording = () => {
    if (!recognition) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  useEffect(() => {
    if (initializationRef.current || hasInitialized || messages.length > 0)
      return; // Multiple guards against duplication

    initializationRef.current = true;

    // Add the user's initial request
    const userMessage: Message = {
      id: "1",
      type: "user",
      content: query,
      timestamp: new Date(),
    };
    setMessages([userMessage]);
    setHasInitialized(true);

    // Show assistant reply after a delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: "2",
        type: "assistant",
        content: `Thank you for reaching out! I understand you're looking for care assistance. Based on your request "${query}", I can help you find the perfect carer who meets your specific needs. To provide you with personalized recommendations and connect you with verified caregivers in your area, please sign in or create an account to continue.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setShowInitialReply(true);

      // Show sign-in prompt after another delay
      setTimeout(() => {
        setShowSignInPrompt(true);
      }, 2000);
    }, 1500);
  }, [query]); // Only depend on query

  // Auto-resize textarea
  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [inputValue]);

  const handleSignIn = () => {
    setIsAuth(true);
    setShowSignInPrompt(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content:
        "I'm analyzing your request and finding the best carers for your needs. Let me provide you with some updated recommendations...",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setMobileCardIndexSafe(0); // Reset mobile card index for new recommendations
    setIsLoading(true);

    // wait for result
    const result = await sendCareRequest(newMessage.content);
    if (!result.ok) {
      // Handle error
      const errorMessage: Message = {
        id: (Date.now() + 10).toString(),
        type: "assistant",
        content:
          "Sorry, there was an error processing your request. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
      return;
    }
    const resultText = await result.text();
    console.log("Raw Gemini response:", resultText);
    const parsed: GeminiResponse = JSON.parse(resultText);
    console.log("Gemini response json:", parsed);
    // Map Gemini response to CarerRecommendation with profile data
    const convertedCarers: CarerRecommendation[] = parsed
      .map((rec) => {
        // Find matching profile from sample data
        const profile = getCarerById(rec.id);
        if (!profile) return undefined;
        return {
          profile: profile,
          matchScore: rec.matchScore,
          reasoning: rec.reasoning,
        };
      })
      .filter((carer): carer is CarerRecommendation => carer !== undefined);
    console.log("Converted carers:", convertedCarers);
    if (convertedCarers.length === 0) {
      const noMatchMessage: Message = {
        id: (Date.now() + 10).toString(),
        type: "assistant",
        content:
          "Sorry, I couldn't find any carers that match your request. Please try refining your request or check back later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, noMatchMessage]);
      setIsLoading(false);
      return;
    }
    const response: Message = {
      id: (Date.now() + 11).toString(),
      type: "assistant",
      content: "Here are some carer recommendations based on your request:",
      timestamp: new Date(),
      recommendations: convertedCarers,
    };

    setMessages((prev) => [...prev, response]);
    setMobileCardIndexSafe(0); // Reset mobile card index for new recommendations
    setIsLoading(false);
  };

  if (isAuth) {
    return (
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-0">
          {/* Fixed Header with Profile */}
          <div className="fixed top-0 left-0 right-0 lg:left-64 z-40 backdrop-blur-md bg-white/80 border-b border-purple-200/30 px-3 md:px-6 py-3 md:py-4">
            <div className="w-full max-w-none px-2 md:px-4 flex items-center justify-between">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden mr-2 md:mr-4 h-9 w-9 p-0"
              >
                <Menu className="w-5 h-5 md:w-4 md:h-4" />
              </Button>

              <div className="flex items-start space-x-2 md:space-x-4 flex-1">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                    Your Care Request
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 truncate">
                    {query}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4 ml-2 md:ml-4">
                {/* Profile Dropdown */}
                <div className="relative">
                  <UserProfileSidebar
                    activeSection={activeProfileSection}
                    setActiveSection={setActiveProfileSection}
                    isExpanded={isProfileExpanded}
                    setIsExpanded={setIsProfileExpanded}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Container with Sidebar Layout */}
          <div className="fixed top-0 left-0 right-0 bottom-0 pt-20 lg:left-64">
            <div className="w-full h-full">
              <div className="h-full flex flex-col">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 md:py-8 space-y-4 md:space-y-6 pb-32 md:pb-40">
                  {messages.map((message) => (
                    <div key={message.id}>
                      {/* Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.type === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {/* Glassmorphism Style Messages */}
                        <div
                          className={`flex items-start space-x-3 max-w-[90%] md:max-w-[85%] ${
                            message.type === "user"
                              ? "flex-row-reverse space-x-reverse"
                              : ""
                          }`}
                        >
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            {message.type === "user" ? (
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <User className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-purple-200/50 shadow-lg">
                                <Image
                                  src="/images/Logo-no-bck.png"
                                  alt="CareNeighbour"
                                  width={16}
                                  height={16}
                                />
                              </div>
                            )}
                          </div>

                          {/* Message Content with Glassmorphism */}
                          <div
                            className={`rounded-2xl px-4 py-3 shadow-lg ${
                              message.type === "user"
                                ? "bg-white border border-gray-200/50 text-gray-900"
                                : "backdrop-blur-md bg-white/70 border border-gray-200/50 text-gray-900"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">
                              {message.content}
                            </p>
                            <p
                              className={`text-xs mt-2 ${
                                message.type === "user"
                                  ? "text-gray-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Carer Recommendations - Show immediately after the associated message */}
                      {message.recommendations &&
                        message.recommendations.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full mt-6"
                          >
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-3 md:mb-4">
                                <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                                  Recommended Carers (
                                  {message.recommendations?.length || 0})
                                </h3>
                                {/* Show navigation when screen can't fit all 3 cards */}
                                {visibleCardsCount === 1 && (
                                  <div className="flex items-center space-x-1 md:space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        setMobileCardIndexSafe(
                                          mobileCardIndex - 1
                                        )
                                      }
                                      disabled={mobileCardIndex === 0}
                                      className="text-purple-600 hover:bg-purple-50 h-8 w-8 md:h-9 md:w-9 p-0"
                                    >
                                      <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        setMobileCardIndexSafe(
                                          mobileCardIndex + 1
                                        )
                                      }
                                      disabled={mobileCardIndex >= 2} // Disable when at third card
                                      className="text-purple-600 hover:bg-purple-50 h-8 w-8 md:h-9 md:w-9 p-0"
                                    >
                                      <ChevronRight className="w-4 h-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>

                              <div className="relative overflow-hidden px-1 md:px-2">
                                <div
                                  className="flex transition-transform duration-300 ease-in-out gap-2 md:gap-4"
                                  style={{
                                    transform:
                                      visibleCardsCount === 1
                                        ? `translateX(-${
                                            (mobileCardIndex * 100) / 3
                                          }%)`
                                        : "none",
                                    width:
                                      visibleCardsCount === 1 ? "300%" : "100%", // Exactly 3 cards width
                                  }}
                                >
                                  {message.recommendations.map(
                                    (carer, index) => (
                                      <motion.div
                                        key={carer.profile.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex-shrink-0"
                                        style={{
                                          width:
                                            visibleCardsCount === 1
                                              ? "calc(100% / 3)" // Each card takes exactly 1/3 of container
                                              : `calc(${100 / 3}% - 1rem)`, // No scrolling: 3 cards side by side
                                          minWidth:
                                            visibleCardsCount === 1
                                              ? "auto"
                                              : "280px",
                                          maxWidth:
                                            visibleCardsCount === 1
                                              ? "none"
                                              : "350px",
                                          flexShrink: 0,
                                        }}
                                      >
                                        <CarerRecommendationCard
                                          carer={carer}
                                          onMoreInfo={(selectedCarer) => {
                                            setSelectedCarer(selectedCarer);
                                            setIsCarerDetailOpen(true);
                                          }}
                                        />
                                      </motion.div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                    </div>
                  ))}

                  {/* Loading indicator with Glassmorphism */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-purple-200/50 shadow-lg">
                          <Image
                            src="/images/Logo-no-bck.png"
                            alt="CareNeighbour"
                            width={16}
                            height={16}
                          />
                        </div>
                        <div className="backdrop-blur-md bg-white/70 border border-gray-200/50 rounded-2xl px-4 py-3 shadow-lg">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-700">
                              Analyzing your request...
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area with Glassmorphism - Fixed to bottom */}
                <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 border-t border-purple-200/30 p-3 md:p-6 z-50 lg:left-64">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="flex-1 relative">
                      <Textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value);
                          autoResizeTextarea();
                        }}
                        placeholder="Ask about carers, availability, or your care needs..."
                        className="w-full backdrop-blur-md bg-white/70 border-purple-200/50 focus:border-purple-400 focus:ring-purple-300 rounded-xl pl-3 md:pl-4 pr-16 md:pr-20 py-3 md:py-2 shadow-sm resize-none min-h-[48px] md:min-h-[44px] max-h-48 overflow-hidden text-sm md:text-base"
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          !e.shiftKey &&
                          handleSendMessage()
                        }
                        disabled={isLoading}
                      />
                      <div className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                        <Button
                          onClick={toggleVoiceRecording}
                          size="sm"
                          variant="ghost"
                          className={`h-9 w-9 md:h-8 md:w-8 p-0 rounded-lg transition-all duration-300 ${
                            isListening
                              ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                          }`}
                        >
                          {isListening ? (
                            <MicOff className="w-5 h-5 md:w-4 md:h-4" />
                          ) : (
                            <Mic className="w-5 h-5 md:w-4 md:h-4" />
                          )}
                        </Button>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isLoading}
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg h-9 w-9 md:h-8 md:w-8 p-0 shadow-lg"
                        >
                          <Send className="w-5 h-5 md:w-4 md:h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carer Details Dialog */}
          <Dialog open={isCarerDetailOpen} onOpenChange={setIsCarerDetailOpen}>
            <DialogContent className="max-w-md sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto mx-auto p-4 sm:p-6 w-[calc(100vw-2rem)] sm:w-auto">
              <DialogHeader>
                {/* Show video when there */}
                {selectedCarer && selectedCarer.profile.video && (
                  <div className="mb-4 sm:mb-6">
                    <video
                      className="w-full aspect-auto max-h-[40vh] sm:max-h-[50vh] object-contain rounded-lg shadow-lg"
                      controls
                      autoPlay
                      muted
                      playsInline
                    >
                      <source src={selectedCarer.profile.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                
                <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-start space-y-3 sm:space-y-0 sm:space-x-3 text-left">
                  {selectedCarer && (
                    <>
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0">
                        <Image
                          src={selectedCarer.profile.photo}
                          alt={selectedCarer.profile.name}
                          fill
                          className="rounded-full object-cover shadow-md"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              selectedCarer.profile.name
                            )}&background=8b5cf6&color=fff&size=64`;
                          }}
                        />
                      </div>
                      <div className="min-w-0 text-left">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-left">
                          {selectedCarer.profile.name}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 text-left">
                          {selectedCarer.profile.experience}
                        </p>
                        <div className="flex items-center space-x-2 sm:space-x-4 mt-1 justify-start">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm sm:text-base font-medium">
                              {selectedCarer.profile.rating}
                            </span>
                          </div>
                          <span className="text-sm sm:text-base text-purple-600 font-bold">
                            {selectedCarer.matchScore}% match
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </DialogTitle>
              </DialogHeader>

              {selectedCarer && (
                <div className="space-y-4 sm:space-y-6 mt-3 sm:mt-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                        Rate & Distance
                      </h3>
                      <p className="text-xl sm:text-2xl font-bold text-purple-600">
                        ${selectedCarer.profile.hourlyRate}/hr
                      </p>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">
                        {selectedCarer.profile.distance} away
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                        Availability
                      </h3>
                      <p className="text-green-600 font-medium text-sm sm:text-base">
                        {selectedCarer.profile.availability}
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                      Skills & Specializations
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedCarer.profile.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-purple-100 text-purple-700 border-purple-200 text-xs sm:text-sm px-2 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Why Recommended */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                      Why We Recommend {selectedCarer.profile.name}
                    </h3>
                    <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-200">
                      <ul className="space-y-1.5 sm:space-y-2">
                        {selectedCarer.reasoning.map((reason, index) => (
                          <li
                            key={index}
                            className="text-gray-700 flex items-start text-sm sm:text-base"
                          >
                            <span className="text-purple-600 mr-2 mt-0.5 sm:mt-1">
                              •
                            </span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-14"
                      size="lg"
                    >
                      Book {selectedCarer.profile.name} Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 h-14"
                      size="lg"
                    >
                      Contact First
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setIsCarerDetailOpen(false)}
                      className="flex-1 sm:flex-none h-14"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-0">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-40 backdrop-blur-md bg-white/80 border-b border-purple-200/30 px-6 py-4">
          <div className="w-full max-w-none px-4 flex items-center justify-between">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden mr-4"
            >
              <Menu className="w-4 h-4" />
            </Button>

            <div className="flex items-start space-x-4 flex-1">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Your Care Request
                </h3>
                <p className="text-sm text-gray-600 truncate">{query}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {/* Remove unnecessary logo from header */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="fixed top-0 left-0 right-0 bottom-0 pt-20 lg:left-64">
          <div className="w-full h-full">
            {/* Chat Container */}
            <div className="h-full flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 pb-40">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start space-x-3 max-w-[85%] ${
                        message.type === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {message.type === "user" ? (
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-purple-200/50 shadow-lg">
                            <Image
                              src="/images/Logo-no-bck.png"
                              alt="CareNeighbour"
                              width={16}
                              height={16}
                            />
                          </div>
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-lg ${
                          message.type === "user"
                            ? "bg-white border border-gray-200/50 text-gray-900"
                            : "backdrop-blur-md bg-white/70 border border-gray-200/50 text-gray-900"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <p
                          className={`text-xs mt-2 ${
                            message.type === "user"
                              ? "text-gray-500"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Sign In Prompt */}
              <div className="backdrop-blur-md bg-white/60 border-t border-purple-200/30 p-8">
                <AnimatePresence>
                  {showSignInPrompt && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-purple-200/50">
                        <Image
                          src="/images/Logo-no-bck.png"
                          alt="CareNeighbour"
                          width={32}
                          height={32}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Continue Your Care Journey
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Sign in or create an account to get personalized carer
                        recommendations and continue your conversation.
                      </p>
                      <div className="space-y-3">
                        <Button
                          onClick={handleSignIn}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl text-base font-medium shadow-lg"
                        >
                          Sign In / Sign Up
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        {/* <Button 
                        variant="outline"
                        className="w-full backdrop-blur-sm bg-white/50 border-purple-200/50 text-gray-700 hover:bg-white/70 py-3 rounded-xl text-base shadow-sm"
                      >
                        Continue as Guest
                      </Button> */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen relative">
      {/* Global header rendered via app/layout.tsx */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="text-gray-600">Loading Chat...</span>
            </div>
          </div>
        }
      >
        <ChatPageContent />
      </Suspense>
    </div>
  );
}

const sendCareRequest = (message: string) => {
  return fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      conversationHistory: [],
    }),
  });
};
