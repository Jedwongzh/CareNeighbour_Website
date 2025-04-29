"use client"

import { useState, useEffect, useRef, type JSX } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  Mic,
  MicOff,
  Globe,
  MessageSquare,
  MapPin,
  Clock,
  Check,
  Edit,
  Search,
  User,
  Home,
  Loader2,
  Star,
  X,
  RefreshCw,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Reduced to just 3 caregivers to minimize bundle size
const caregiverProfiles = [
  {
    id: 1,
    name: "Sarah Thompson",
    photo: "/images/caregivers/sarah.jpg",
    rating: 4.9,
    experience: "7+ years in aged care",
    distance: "1.2 miles away",
    hourlyRate: 28,
    bio: "Certified nurse assistant specializing in medication management and personal care. I'm passionate about helping seniors maintain their independence.",
    languages: ["English", "Spanish"],
    skills: ["Medication Management", "Personal Care", "Meal Preparation", "Mobility Assistance"],
    translations: {
      es: {
        bio: "Asistente de enfermería certificada especializada en manejo de medicamentos y cuidado personal. Me apasiona ayudar a las personas mayores a mantener su independencia.",
        skills: ["Manejo de Medicamentos", "Cuidado Personal", "Preparación de Comidas", "Asistencia de Movilidad"],
        experience: "Más de 7 años en cuidado de ancianos",
      },
      fr: {
        bio: "Aide-soignante certifiée spécialisée dans la gestion des médicaments et les soins personnels. Je suis passionnée par l'aide aux seniors pour maintenir leur indépendance.",
        skills: ["Gestion Médicaments", "Soins Personnels", "Préparation Repas", "Aide Mobilité"],
        experience: "7+ ans en soins aux personnes âgées",
      },
    },
  },
  {
    id: 2,
    name: "Michael Reed",
    photo: "/images/caregivers/michael.jpg",
    rating: 4.7,
    experience: "5+ years as a registered nurse",
    distance: "2.5 miles away",
    hourlyRate: 35,
    bio: "Registered nurse with experience in post-surgery care and chronic condition management. I provide compassionate care with a focus on health education.",
    languages: ["English"],
    skills: ["Medical Care", "Wound Care", "Vital Monitoring", "Injections"],
    translations: {
      es: {
        bio: "Enfermero registrado con experiencia en cuidados postquirúrgicos y manejo de condiciones crónicas. Brindo atención compasiva con enfoque en la educación para la salud.",
        skills: ["Atención Médica", "Cuidado de Heridas", "Monitoreo Vital", "Inyecciones"],
        experience: "Más de 5 años como enfermero registrado",
      },
      fr: {
        bio: "Infirmier diplômé avec expérience en soins post-chirurgicaux et gestion des maladies chroniques. Je fournis des soins compatissants axés sur l'éducation à la santé.",
        skills: ["Soins Médicaux", "Soins Plaies", "Surveillance Vitals", "Injections"],
        experience: "5+ ans comme infirmier diplômé",
      },
    },
  },
  {
    id: 3,
    name: "Emily Johnson",
    photo: "/images/caregivers/emily.jpg",
    rating: 4.8,
    experience: "6+ years in home care",
    distance: "1.8 miles away",
    hourlyRate: 30,
    bio: "Home care specialist with expertise in dementia care and companionship. I strive to create a safe and nurturing environment for my clients.",
    languages: ["English", "French"],
    skills: ["Dementia Care", "Companionship", "Light Housekeeping", "Meal Preparation"],
    translations: {
      es: {
        bio: "Especialista en cuidado en el hogar con experiencia en cuidado de la demencia y compañía. Me esfuerzo por crear un entorno seguro y acogedor para mis clientes.",
        skills: ["Cuidado de Demencia", "Compañía", "Limpieza Ligera", "Preparación de Comidas"],
        experience: "Más de 6 años en cuidado en el hogar",
      },
      fr: {
        bio: "Spécialiste des soins à domicile avec expertise en soins de la démence et compagnie. Je m'efforce de créer un environnement sûr et chaleureux pour mes clients.",
        skills: ["Soins Démence", "Compagnie", "Entretien Léger", "Préparation Repas"],
        experience: "6+ ans en soins à domicile",
      },
    },
  },
]

// Placeholder images
const placeholderImages = {
  "/images/caregivers/sarah.jpg": "/placeholder.svg?height=400&width=300&text=Sarah",
  "/images/caregivers/michael.jpg": "/placeholder.svg?height=400&width=300&text=Michael",
  "/images/caregivers/emily.jpg": "/placeholder.svg?height=400&width=300&text=Emily",
}

// Simplified translations object
const translations = {
  en: {
    title: "App Demo",
    subtitle: "Experience CareNeighbour",
    description: "See how our app works to connect you with qualified caregivers in your neighborhood",
    voicePrompt: "How can we help you today?",
    recordingStatus: "Listening...",
    processingStatus: "Processing your request...",
    sampleTranscript:
      "I need someone to help my mother with medication management and light housekeeping twice a week.",
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
  },
  es: {
    title: "Demostración de la Aplicación",
    subtitle: "Experimenta CareNeighbour",
    description: "Vea cómo funciona nuestra aplicación para conectarlo con cuidadores calificados en su vecindario",
    voicePrompt: "¿Cómo podemos ayudarte hoy?",
    recordingStatus: "Escuchando...",
    processingStatus: "Procesando tu solicitud...",
    sampleTranscript:
      "Necesito a alguien que ayude a mi madre con la gestión de medicamentos y la limpieza ligera dos veces por semana.",
    aiSummary: "Según tu solicitud, necesitas:",
    careType: "Cuidado Personal y Asistencia",
    details: [
      "Gestión y recordatorios de medicamentos",
      "Limpieza ligera y organización del hogar",
      "Horario de cuidado dos veces por semana",
    ],
    editRequest: "Editar detalles de la solicitud",
    findCaregivers: "Encontrar Cuidadores",
    searchingCaregivers: "Buscando cuidadores cerca de ti...",
    caregiverFound: "¡Encontramos cuidadores disponibles ahora!",
    swipeInstructions: "Desliza a la derecha para seleccionar, a la izquierda para omitir",
    regenerate: "Mostrar más cuidadores",
    bookNow: "Reservar Ahora",
    trackingTitle: "Rastreando a Tu Cuidador",
    trackingStatus: "Sarah está en camino - ETA: 10 minutos",
    caregiverArrived: "¡Sarah ha llegado!",
    completeBooking: "Completar Reserva",
    tryAgain: "Intentar de Nuevo",
    exitDemo: "Salir demo",
  },
  // Only keep English and Spanish to reduce bundle size
}

export default function AppDemoPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [language, setLanguage] = useState("en")
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [caregiverSearching, setCaregiverSearching] = useState(false)
  const [caregiverFound, setCaregiverFound] = useState(false)
  const [trackingStarted, setTrackingStarted] = useState(false)
  const [caregiverArrived, setCaregiverArrived] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; scale: number }[]>([])
  const rippleIdRef = useRef(0)
  const [floatingItems, setFloatingItems] = useState<
    { id: number; x: number; y: number; content: string | JSX.Element; speed: number; opacity: number; size: number }[]
  >([])
  const floatingItemIdRef = useRef(0)
  const animationFrameIdRef = useRef<number | null>(null)
  const [currentCaregiverIndex, setCurrentCaregiverIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<null | "left" | "right">(null)
  const [selectedCaregiver, setSelectedCaregiver] = useState<(typeof caregiverProfiles)[0] | null>(null)
  const [transcriptWords, setTranscriptWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ]

  const t = translations[language as keyof typeof translations] || translations.en

  // Function to start the recording simulation
  const startRecording = () => {
    if (isProcessing || isTyping) return
    setIsRecording(true)
    const currentSampleTranscript = t.sampleTranscript || translations.en.sampleTranscript
    const splitBy = " "
    setTranscriptWords(currentSampleTranscript.split(splitBy))
    setCurrentWordIndex(0)
    setTranscript("")
  }

  // Simplified floating items effect
  useEffect(() => {
    if (currentStep === 0) {
      const initialItems = Array.from({ length: 10 }, () => ({
        id: floatingItemIdRef.current++,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        content: "CareNeighbor",
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.3 + 0.15,
        size: Math.random() * 5 + 11,
      }))
      setFloatingItems(initialItems)

      const interval = setInterval(() => {
        const newItem = {
          id: floatingItemIdRef.current++,
          x: Math.random() * 90 + 5,
          y: 110,
          content: "CareNeighbor",
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.3 + 0.15,
          size: Math.random() * 5 + 11,
        }
        setFloatingItems((prev) => {
          const updated = [...prev, newItem]
          return updated.length > 15 ? updated.slice(updated.length - 15) : updated
        })
      }, 3000)

      function animateItems() {
        setFloatingItems((prev) =>
          prev.map((item) => {
            const newY = item.y - item.speed * 0.1
            return {
              ...item,
              y: newY < -10 ? 110 : newY,
              ...(newY < -10 ? { x: Math.random() * 90 + 5 } : {}),
            }
          }),
        )
        animationFrameIdRef.current = requestAnimationFrame(animateItems)
      }
      animationFrameIdRef.current = requestAnimationFrame(animateItems)

      return () => {
        clearInterval(interval)
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current)
        }
      }
    } else {
      setFloatingItems([])
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [currentStep])

  // Recording ripple effect
  useEffect(() => {
    if (isRecording) {
      const rippleInterval = setInterval(() => {
        const newRipple = { id: rippleIdRef.current++, scale: 1 }
        setRipples((prev) => [...prev, newRipple])
      }, 1200)

      setIsTyping(true)

      return () => clearInterval(rippleInterval)
    }
  }, [isRecording])

  // Typing effect
  useEffect(() => {
    if (isTyping && currentWordIndex < transcriptWords.length) {
      const typingInterval = setInterval(() => {
        setCurrentWordIndex((prev) => {
          const newIndex = prev + 1
          const joinBy = " "
          setTranscript(transcriptWords.slice(0, newIndex).join(joinBy))
          if (newIndex >= transcriptWords.length) {
            setIsTyping(false)
            setIsRecording(false)
            clearInterval(typingInterval)
            setTimeout(() => {
              if (currentStep === 0 && !isProcessing) {
                processRequest()
              }
            }, 800)
          }
          return newIndex
        })
      }, 150)

      return () => clearInterval(typingInterval)
    } else if (!isTyping) {
      if (isRecording) setIsRecording(false)
    }
  }, [isTyping, currentWordIndex, transcriptWords, currentStep, isProcessing])

  // Remove ripples
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples((prev) => prev.slice(1))
      }
    }, 2500)
    return () => clearTimeout(timeout)
  }, [ripples])

  // Process request
  const processRequest = () => {
    if (isProcessing) return
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep(1)
    }, 2000)
  }

  // Find caregivers
  const findCaregivers = () => {
    setCaregiverSearching(true)
    setTimeout(() => {
      setCaregiverSearching(false)
      setCaregiverFound(true)
      setCurrentStep(2)
      setCurrentCaregiverIndex(0)
    }, 2500)
  }

  // Handle swipe
  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction)
    setTimeout(() => {
      if (direction === "right") {
        setSelectedCaregiver(caregiverProfiles[currentCaregiverIndex])
        bookNow()
      } else {
        setCurrentCaregiverIndex((prev) => (prev < caregiverProfiles.length - 1 ? prev + 1 : 0))
      }
      setSwipeDirection(null)
    }, 300)
  }

  // Regenerate caregivers
  const regenerateCaregivers = () => {
    setCurrentCaregiverIndex(0)
    setCaregiverFound(false)
    setTimeout(() => setCaregiverFound(true), 300)
  }

  // Book now / start tracking
  const bookNow = () => {
    setTrackingStarted(true)
    setCurrentStep(3)

    setTimeout(() => {
      setCaregiverArrived(true)
    }, 6000)
  }

  // Reset demo
  const resetDemo = () => {
    setCurrentStep(0)
    setIsRecording(false)
    setTranscript("")
    setIsProcessing(false)
    setCaregiverSearching(false)
    setCaregiverFound(false)
    setTrackingStarted(false)
    setCaregiverArrived(false)
    setRipples([])
    setCurrentCaregiverIndex(0)
    setSwipeDirection(null)
    setSelectedCaregiver(null)
    setTranscriptWords([])
    setCurrentWordIndex(0)
    setIsTyping(false)
    setFloatingItems([])
  }

  const exitDemo = () => {
    router.push("/")
  }

  // Helper to get translated profile data
  const getTranslatedProfileData = (caregiver: (typeof caregiverProfiles)[0]) => {
    const langCode = language as keyof typeof caregiver.translations
    const fallbackLang = "en"

    const translated = caregiver.translations?.[langCode]
    const fallback = caregiver

    return {
      bio: translated?.bio || fallback.bio,
      skills: translated?.skills || fallback.skills,
      experience: translated?.experience || fallback.experience,
      name: fallback.name,
      photo: fallback.photo,
      rating: fallback.rating,
      distance: fallback.distance,
      hourlyRate: fallback.hourlyRate,
      languages: fallback.languages,
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-violet-100 relative overflow-hidden font-sans">
      {/* Floating items background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            className="absolute text-slate-500 flex items-center justify-center text-center whitespace-nowrap select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: item.opacity }}
            exit={{ opacity: 0 }}
            style={{
              top: `${item.y}%`,
              left: `${item.x}%`,
              transform: `translate(-50%, -50%)`,
              fontSize: `${item.size}px`,
              padding: "3px 8px",
              borderRadius: "14px",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(3px)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              color: "inherit",
            }}
            transition={{ duration: 0.8, ease: "linear" }}
          >
            {item.content}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md fixed top-0 z-20 border-b border-slate-200/70">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={resetDemo} className="mr-2 text-slate-600 hover:bg-slate-100">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-lg text-slate-800">{t.title}</h1>

          <div className="ml-auto flex items-center space-x-3">
            <Globe className="h-5 w-5 text-slate-500" />
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[130px] border-slate-300 text-slate-700 text-sm h-9 focus:ring-purple-400">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="text-sm">
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={exitDemo}
              className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:text-purple-800 h-9"
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              {t.exitDemo}
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto max-w-md px-4 pt-24 pb-16 relative z-10">
        {/* Step 0: Voice Input */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-180px)]"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-3">{t.subtitle}</h2>
            <p className="text-slate-500 mb-10 font-bold">{t.voicePrompt}</p>

            {/* Recording Button Area */}
            <div className="relative mb-6 flex flex-col items-center">
              <AnimatePresence>
                {ripples.map((ripple) => (
                  <motion.div
                    key={ripple.id}
                    initial={{ scale: 0.5, opacity: 0.6 }}
                    animate={{ scale: 4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-purple-200/70 z-0"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "128px",
                      height: "128px",
                    }}
                  />
                ))}
              </AnimatePresence>

              {/* Recording Button */}
              <motion.button
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ease-out text-white shadow-md hover:shadow-lg ${
                  isRecording
                    ? "bg-gradient-to-br from-red-500 to-red-600"
                    : "bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                } z-10 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2`}
                onClick={startRecording}
                whileTap={{ scale: isProcessing ? 1 : 0.92 }}
                disabled={isProcessing || isTyping}
              >
                {isRecording || isTyping ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
              </motion.button>
            </div>

            {/* Transcript Display */}
            <AnimatePresence>
              {transcript && (
                <motion.div
                  key="transcript"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mt-8 w-full max-w-sm shadow-sm border border-slate-200/70"
                >
                  <p className="text-slate-700 text-center min-h-[40px]">
                    {transcript}
                    {isTyping && <span className="animate-pulse ml-1 text-purple-600">|</span>}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Processing Indicator */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center mt-6 text-purple-700"
                >
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>{t.processingStatus}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Step 1: AI Summary */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-slate-200/70 mb-6 overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">{t.aiSummary}</h3>

                <div className="bg-purple-50/50 rounded-lg p-4 mb-6 border border-purple-100">
                  <p className="text-purple-900 font-medium mb-4">{t.careType}</p>
                  <div className="mt-4 pt-4 border-t border-purple-100/80">
                    <h4 className="text-xs font-medium text-slate-500 uppercase mb-3 tracking-wider">Details:</h4>
                    <ul className="space-y-2">
                      {t.details.map((detail, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mb-3 border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {t.editRequest}
                </Button>

                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={findCaregivers}
                  disabled={caregiverSearching}
                >
                  {caregiverSearching ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {t.searchingCaregivers}
                    </>
                  ) : (
                    <>
                      {t.findCaregivers}
                      <Search className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Caregiver Selection */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-5">
              <h3 className="text-xl font-semibold text-slate-800">{t.caregiverFound}</h3>
              <p className="text-sm text-slate-500 mt-1">{t.swipeInstructions}</p>
            </div>

            {/* Caregiver Cards */}
            <div className="relative h-[550px] w-full mb-6">
              {caregiverProfiles.map((caregiver, index) => {
                const displayData = getTranslatedProfileData(caregiver)

                return (
                  <AnimatePresence key={caregiver.id}>
                    {index === currentCaregiverIndex && (
                      <motion.div
                        className="absolute inset-0 bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-lg cursor-grab active:cursor-grabbing flex flex-col"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          x: swipeDirection === "left" ? -300 : swipeDirection === "right" ? 300 : 0,
                          rotate: swipeDirection === "left" ? -5 : swipeDirection === "right" ? 5 : 0,
                        }}
                        exit={{
                          scale: 0.95,
                          opacity: 0,
                          x: swipeDirection === "left" ? -300 : swipeDirection === "right" ? 300 : 0,
                          rotate: swipeDirection === "left" ? -10 : swipeDirection === "right" ? 10 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.5}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipePower = Math.abs(offset.x) * velocity.x
                          if (swipePower < -10000) {
                            handleSwipe("left")
                          } else if (swipePower > 10000) {
                            handleSwipe("right")
                          }
                        }}
                      >
                        {/* Card Content */}
                        <div className="relative w-full aspect-[4/3] bg-slate-100 flex-shrink-0">
                          <Image
                            src={
                              placeholderImages[displayData.photo as keyof typeof placeholderImages] ||
                              displayData.photo
                            }
                            alt={displayData.name}
                            fill
                            className="object-cover"
                            priority={index === currentCaregiverIndex}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h4 className="text-white font-bold text-xl mb-0.5">{displayData.name}</h4>
                            <div className="flex items-center text-white/90 text-sm">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1.5" />
                              <span>{displayData.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 space-y-4 flex-grow">
                          <div className="flex justify-between items-center">
                            <span className="text-purple-700 font-medium text-sm">{displayData.experience}</span>
                            <span className="font-bold text-slate-900 text-lg">
                              ${displayData.hourlyRate}
                              <span className="text-sm font-normal text-slate-500">/hr</span>
                            </span>
                          </div>

                          <p className="text-slate-600 text-sm leading-relaxed">{displayData.bio}</p>

                          <div className="flex items-center text-sm text-slate-500">
                            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                            <span>{displayData.distance}</span>
                          </div>

                          <div>
                            <h5 className="text-xs font-medium text-slate-500 uppercase mb-2 tracking-wider">Skills</h5>
                            <div className="flex flex-wrap gap-2">
                              {displayData.skills.slice(0, 4).map((skill, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Swipe indicators */}
                        <motion.div
                          className="absolute top-16 left-4 bg-red-500/90 text-white p-3 rounded-full shadow-lg"
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{
                            scale: swipeDirection === "left" ? 1 : 0,
                            rotate: swipeDirection === "left" ? 0 : -30,
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          {" "}
                          <X className="h-6 w-6" />{" "}
                        </motion.div>
                        <motion.div
                          className="absolute top-16 right-4 bg-green-500/90 text-white p-3 rounded-full shadow-lg"
                          initial={{ scale: 0, rotate: 30 }}
                          animate={{
                            scale: swipeDirection === "right" ? 1 : 0,
                            rotate: swipeDirection === "right" ? 0 : 30,
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          {" "}
                          <Check className="h-6 w-6" />{" "}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )
              })}
            </div>

            {/* Swipe Buttons */}
            <div className="flex justify-center gap-6 mb-4 mt-2">
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300"
                onClick={() => handleSwipe("left")}
              >
                {" "}
                <X className="h-7 w-7" />{" "}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
                onClick={() => handleSwipe("right")}
              >
                {" "}
                <Check className="h-7 w-7" />{" "}
              </Button>
            </div>

            {/* Regenerate Button */}
            <div className="text-center">
              <Button
                variant="ghost"
                className="text-slate-500 hover:text-purple-700 hover:bg-purple-50 text-sm"
                onClick={regenerateCaregivers}
              >
                <RefreshCw className="h-4 w-4 mr-1.5" /> {t.regenerate}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Tracking */}
        {currentStep === 3 && selectedCaregiver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {(() => {
              const displayData = getTranslatedProfileData(selectedCaregiver)
              return (
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-slate-200/70 mb-6 overflow-hidden">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">{t.trackingTitle}</h3>

                    {/* Map Visualization */}
                    <div className="relative w-full h-64 bg-slate-200 rounded-lg mb-6 overflow-hidden border border-slate-300">
                      <div className="absolute inset-0">
                        <Image
                          src="/placeholder.svg?height=400&width=600&text=Map+Area&color=e2e8f0"
                          alt="Map"
                          fill
                          className="object-cover opacity-60"
                        />

                        {/* Destination Pin (Home) */}
                        <motion.div
                          className="absolute"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          style={{ top: "25%", right: "25%" }}
                        >
                          <Home className="h-8 w-8 text-purple-600 drop-shadow-md" />
                        </motion.div>

                        {/* Moving Caregiver Pin */}
                        <motion.div
                          className="absolute"
                          initial={{ bottom: "15%", left: "15%" }}
                          animate={
                            caregiverArrived
                              ? { top: "28%", right: "30%", scale: 1.1 }
                              : { bottom: "auto", left: "auto", top: "50%", right: "50%", scale: 1 }
                          }
                          transition={{ duration: caregiverArrived ? 1.5 : 6, ease: "easeInOut" }}
                        >
                          <div className="relative flex flex-col items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                              {" "}
                              <User className="h-4 w-4 text-white" />{" "}
                            </div>
                            {!caregiverArrived && (
                              <div className="absolute -bottom-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Status Information */}
                    <div className="bg-slate-50/70 p-4 rounded-lg mb-6 border border-slate-200">
                      <div className="flex items-center mb-3">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white mr-3 shadow-sm">
                          <Image
                            src={
                              placeholderImages[displayData.photo as keyof typeof placeholderImages] ||
                              displayData.photo
                            }
                            alt={displayData.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{displayData.name}</h4>
                          <p className="text-sm text-slate-600">{displayData.skills[0]} Specialist</p>
                        </div>
                      </div>

                      <div className="border-t border-slate-200/80 pt-3">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={caregiverArrived ? "arrived" : "enroute"}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-purple-600 mr-2" />
                              <span className="text-slate-800 text-sm">
                                {" "}
                                {caregiverArrived ? t.caregiverArrived : t.trackingStatus}{" "}
                              </span>
                            </div>
                            {caregiverArrived && (
                              <div className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-green-200">
                                {" "}
                                Arrived{" "}
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Buttons */}
                    <AnimatePresence mode="wait">
                      {caregiverArrived ? (
                        <motion.div
                          key="complete-btn"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                            {t.completeBooking}
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="message-btn"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" /> Message {displayData.name.split(" ")[0]}
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              )
            })()}
          </motion.div>
        )}

        {/* Try Again Button */}
        {currentStep > 0 && (
          <div className="mt-6 text-center">
            <Button variant="link" className="text-slate-500 hover:text-purple-600" onClick={resetDemo}>
              {t.tryAgain}
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
