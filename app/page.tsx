"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageSquare, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Autoplay from "embla-carousel-autoplay"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { MobileNav } from "@/components/mobile-nav"
import { joinWaitlist, submitFeedback } from "./actions"

// Import the debug function at the top of the file
import { debugVideos } from "./debug-videos"

// Import the VideoPlayer component at the top of the file
import { VideoPlayer } from "@/components/video-player"

export default function LandingPage() {
  const router = useRouter()
  const [waitlistStatus, setWaitlistStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(
    null,
  )
  const [feedbackStatus, setFeedbackStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(
    null,
  )
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false)
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
  const [topWaitlistEmail, setTopWaitlistEmail] = useState("")

  // Add this line inside the LandingPage component, near the top after the state declarations
  useEffect(() => {
    debugVideos()
  }, [])

  // Refs for scroll animations
  const problemRef = useRef(null)
  const approachRef = useRef(null)
  const howItWorksRef = useRef(null)

  // Testimonial carousel autoplay
  const testimonialPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

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

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="container px-4 md:px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/CNlogo.png" alt="CareNeighbour Logo" width={36} height={36} />
            <span className="font-semibold text-lg">CareNeighbour</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              href="#problem-statement"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Our Mission
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#our-approach"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Our Approach
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              About Us
            </Link>
            <Button
              size="sm"
              variant="outline"
              onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            >
              Join Waitlist
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Apple-inspired with large typography and clean layout */}
        <section className="w-full py-12 md:py-20 lg:py-28 relative overflow-hidden">
          {/* Subtle Background Gradient */}
          <div className="absolute inset-0 bg-white z-0"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-6 md:space-y-8">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Culturally Considerate Care,{" "}
                    <span className="bg-gradient-to-r from-purple-700 to-gray-900 text-transparent bg-clip-text">
                      Simplified.
                    </span>
                  </motion.h1>

                  <div className="hidden md:block flex-shrink-0 md:-ml-6">
                    <Image
                      src="/images/CN_Figure2.png"
                      alt="CareNeighbour Guide"
                      width={220}
                      height={220}
                      className="object-contain"
                    />
                  </div>
                </div>

                <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  CareNeighbour connects you with verified caregivers who understand your language and culture, making
                  finding the right support effortless.
                </motion.p>

                {/* CTAs: Join Waitlist - Apple-style buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg h-auto w-full sm:w-auto"
                      onClick={() => document.getElementById("our-approach")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Watch App Demo
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg h-auto border-gray-300 hover:bg-gray-50 w-full sm:w-auto"
                      onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Join Waitlist
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section - Apple-inspired with large typography and clean layout */}
        <section id="problem-statement" className="w-full py-16 md:py-20 relative overflow-hidden" ref={problemRef}>
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0"></div>

          <div className="container px-4 md:px-6 relative z-10">
            {/* Text content - takes 60% width on desktop, full width on mobile */}
            <div className="flex flex-col mb-10 md:mb-16 md:max-w mx-auto">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
                <div className="hidden md:block">
                  <Image
                    src="/images/CN_Figure1.png"
                    alt="CareNeighbour Guide"
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                </div>
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Finding the Right Care Shouldn't Be a Struggle
                </motion.h2>
              </div>

              <motion.div
                className="space-y-4 md:space-y-6 text-base sm:text-lg md:text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p>
                  Every year, thousands of people who don't speak English as their first language struggle to access the
                  care they need. Language barriers, lack of time, and unfamiliarity with the system leave many feeling
                  isolated and overlooked. It's not just about translation — it's about dignity, understanding, and
                  culturally respectful support. Right now, too many are suffering in silence simply because the system
                  wasn't built for them.
                </p>
                <p className="text-gray-800 font-medium">
                  We believe finding compassionate care that resonates with your cultural background should be simple
                  and stress-free. <span className="text-purple-700">CareNeighbour is here to make that possible.</span>
                </p>
              </motion.div>
            </div>

            {/* Images appear at the bottom on all screen sizes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {/* First Image */}
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
                  className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px]"
                />
              </motion.div>

              {/* Second Image - Hide on smallest screens */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-xl hidden sm:block"
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
                  className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px]"
                />
              </motion.div>

              {/* Third Image - Hide on smaller screens */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-xl hidden md:block"
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
                  className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px]"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experiences Carousel Section - Continuously sliding */}
        <section id="experiences" className="w-full py-20 md:py-5 bg-gray-50 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-4 mb-12 md:mb-16">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 text-left">
                  Shared Experiences, Common Challenges
                </h2>
                <p className="max-w-[900px] text-gray-600 text-lg md:text-xl lg:text-2xl text-left">
                  Hear from families navigating the complexities of caregiving.
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
                      <p className="text-sm font-medium">Maria, 48 (Spanish Speaking)</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      Finding someone who speaks Spanish and understands our traditions for my father was so hard. We
                      needed more than just basic help—we needed someone who could connect with him.
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 2 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">Chen, 41 (Mandarin Speaking)</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      My work hours are unpredictable. Trying to coordinate care for my mother, who prefers speaking
                      Mandarin, felt like a second job.
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 3 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">Ahmed, 55 (Arabic Speaking)</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      We needed someone urgently when my wife had surgery. Explaining the specific cultural needs and
                      dietary restrictions quickly was stressful. Finding the right caregiver felt impossible.
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 4 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">Sarah, 42</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      Living hours away from my mom needing daily assistance felt impossible. Finding reliable,
                      trustworthy help was a constant worry. I needed someone I could trust completely.
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 5 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">Elena, 52 (Russian Speaking)</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      When my father began showing signs of dementia, we struggled to find someone who could speak
                      Russian and understand him. The language barrier made his confusion worse.
                    </blockquote>
                  </div>
                </CarouselItem>
                {/* Item 6 */}
                <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 text-gray-500">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                      <p className="text-sm font-medium">Raj, 45 (Hindi Speaking)</p>
                    </div>
                    <blockquote className="text-gray-700 justify-left flex-grow">
                      My parents moved here to help raise our children, but now they need care themselves. Finding
                      someone who respects their vegetarian diet and understands Hindu customs has been incredibly
                      challenging.
                    </blockquote>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* How It Works Section - Apple-inspired with large numbers and clean layout */}
        <section id="how-it-works" className="w-full py-20 md:py-28 bg-white relative" ref={howItWorksRef}>
          {/* CN Figure - Positioned as a guide */}
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-left justify-center space-y-4 text-center mb-16 md:mb-24">
              <motion.div
                className="space-y-3 flex flex-col md:flex-row items-center justify-between w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="md:text-left flex-grow">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-left text-gray-900">
                    Care, Simplified in 3 Steps
                  </h2>
                  <p className="max-w-[1800px] text-gray-600 text-lg md:text-xl lg:text-2xl text-left md:text-left mt-3">
                    Our intuitive platform makes finding the perfect culturally-matched caregiver effortless.
                  </p>
                </div>
                <div className="hidden md:block flex-shrink-0 ml-auto">
                  <Image
                    src="/images/CN_Figure3.png"
                    alt="CareNeighbour Guide"
                    width={220}
                    height={220}
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {/* Step 1 */}
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <span className="text-4xl font-bold text-purple-700">1</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Define Needs</h3>
                <p className="text-gray-600 text-lg">
                  Tell us about the required care, preferred language, cultural nuances, and location.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <span className="text-4xl font-bold text-purple-700">2</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Match & Connect</h3>
                <p className="text-gray-600 text-lg">
                  We instantly match you with verified caregivers who meet your specific criteria. Review profiles and
                  connect.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <span className="text-4xl font-bold text-purple-700">3</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Book & Relax</h3>
                <p className="text-gray-600 text-lg">
                  Schedule care easily, manage payments securely, and gain peace of mind knowing your loved one is in
                  good hands.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Approach Section - REPLACED WITH NEW IMPLEMENTATION */}
        <section id="our-approach" className="w-full py-20 md:py-28 bg-white" ref={approachRef}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                  When{" "}
                  <span className="bg-gradient-to-r from-purple-700 to-gray-900 text-transparent bg-clip-text">
                    Technology
                  </span>{" "}
                  Meets{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-gray-800 text-transparent bg-clip-text">
                    Compassion
                  </span>
                </h2>
                <p className="max-w-[900px] text-gray-600 text-lg md:text-xl lg:text-2xl text-center">
                  Explore the features designed to make finding and managing care seamless and effective.
                </p>
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
                  Instant Care Requests
                </h2>
                <p className="text-lg text-gray-700 justify-left">
                  Simply speak or type your needs and watch as our AI transcribes and processes your requests in
                  real-time.
                </p>
              </div>
              {/* Video */}
              <div className="flex-shrink-0 w-full md:w-[350px] flex justify-center order-1 md:order-2">
                <VideoPlayer src="/videos/Care-request-demo.mp4" title="Care Request Demo" />
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
                <VideoPlayer src="/videos/AI-Chat-demo.mp4" title="AI Chat Demo" />
              </div>
              {/* Text */}
              <div className="w-full md:w-[320px] text-center md:text-left flex flex-col justify-center items-center md:items-start">
                <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-gray-800 text-transparent bg-clip-text">
                  Your Personal Care Concierge
                </h2>
                <p className="text-lg text-gray-700">
                  Voice your unique needs through our intelligent AI chat and receive personalized recommendations for
                  nearby, available carers and services within moments.
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
                  Clarity at Your Fingertips
                </h2>
                <p className="text-lg text-gray-700">
                  Instantly access comprehensive carer profiles, neatly summarized on a single page. Save your preferred
                  choices or book with seamless, one-click convenience.
                </p>
              </div>
              {/* Video */}
              <div className="flex-shrink-0 w-full md:w-[350px] flex justify-center order-1 md:order-2">
                <VideoPlayer src="/videos/Carer-Review-demo.mp4" title="Carer Review Demo" />
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
                <VideoPlayer src="/videos/Explore-Page-demo.mp4" title="Explore Page Demo" />
              </div>
              {/* Text */}
              <div className="w-full md:w-[320px] text-center md:text-left flex flex-col justify-center items-center md:items-start">
                <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-gray-800 text-transparent bg-clip-text">
                  Explore with Ease
                </h2>
                <p className="text-lg text-gray-700">
                  Effortlessly browse a comprehensive map of all available care services within your chosen regions,
                  putting expert help right on your doorstep.
                </p>
              </div>
            </motion.section>
          </div>
        </section>

        {/* About Our Team Section */}
        <section id="our-team" className="w-full py-20 md:py-28 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">Meet Our Team</h2>
                <p className="max-w-[900px] text-gray-600 text-lg md:text-xl lg:text-2xl text-center mx-auto">
                  We're passionate about making care accessible to everyone, regardless of language or cultural
                  background.
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/images/founding-team.jpeg"
                  alt="CareNeighbour Founding Team"
                  width={1200}
                  height={800}
                  className="object-cover w-full"
                />
              </motion.div>

              <div className="max-w-3xl text-center">
                <p className="text-gray-600 text-lg">
                  We're a team of Monash University students passionate about solving real-world problems—starting with
                  one that has deeply affected us. CareNeighbour was born from our own struggles of being far from our
                  aging grandparents when they needed us the most.
                </p>
                <div className="mt-8">
                  <Link href="/about">
                    <Button variant="outline" size="lg" className="rounded-full">
                      Learn More About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access Signup & Feedback - Apple-inspired with clean forms */}
        <section id="waitlist" className="w-full py-16 md:py-20 bg-purple-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
              {/* Waitlist Column */}
              <div className="flex flex-col justify-center space-y-6">
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                    Be the First to Know
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600">
                    Join our waitlist for early access, priority matching, and exclusive launch updates.
                  </p>
                </motion.div>

                <motion.div
                  className="w-full space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="h-12 sm:h-14 text-base rounded-xl border-gray-300"
                      required
                      disabled={isSubmittingWaitlist}
                    />
                    <Button
                      type="submit"
                      className="w-full h-12 sm:h-14 text-base rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={isSubmittingWaitlist}
                    >
                      {isSubmittingWaitlist ? "Submitting..." : "Join Waitlist"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                  {waitlistStatus && (
                    <div className={`mt-2 text-sm ${waitlistStatus.success ? "text-green-600" : "text-red-600"}`}>
                      {waitlistStatus.message}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe anytime.</p>
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                    Share Your Thoughts
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600">
                    Have ideas or feedback? Help us shape the future of culturally sensitive caregiving.
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
                      placeholder="Enter your email"
                      className="h-12 sm:h-14 text-base rounded-xl border-gray-300"
                      required
                      disabled={isSubmittingFeedback}
                    />
                    <textarea
                      name="feedback"
                      placeholder="Your feedback or ideas..."
                      className="w-full p-4 border rounded-xl min-h-[100px] sm:min-h-[120px] bg-white border-gray-300 text-base"
                      required
                      disabled={isSubmittingFeedback}
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full h-12 sm:h-14 text-base rounded-xl border-purple-300 text-purple-700 hover:bg-purple-50"
                      disabled={isSubmittingFeedback}
                    >
                      {isSubmittingFeedback ? "Submitting..." : "Send Feedback"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                  {feedbackStatus && (
                    <div className={`mt-2 text-sm ${feedbackStatus.success ? "text-green-600" : "text-red-600"}`}>
                      {feedbackStatus.message}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">Your input is valuable. Responses are saved securely.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-purple-50">
        <div className="container px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image src="/CNlogo.png" alt="CareNeighbour Logo" width={24} height={24} />
            <span>&copy; {new Date().getFullYear()} CareNeighbour, Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
