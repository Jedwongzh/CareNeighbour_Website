"use client"

import { useState } from "react"
import { UnifiedFooter } from "@/components/unified-footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../contexts/LanguageContext" // Import useLanguage hook
import Head from "next/head"
import { meet } from "googleapis/build/src/apis/meet"


// 1. Define translations for the About page
const aboutPageTranslations = {
  en: {
    companyName: "CareNeighbour",
    backToHome: "Back to Home",
    back: "Back",
    pageTitle: "About Us",
    meetTheTeam: "Meet The Team",
    paragraph1:
      "CareNeighbour was born from our own struggles of being far from our aging grandparents when they needed us the most. Like many expats and busy professionals, we've experienced the helplessness of knowing a loved one needs care but being unable to drop everything and fly home. ",
    paragraph2:
      "We knew there had to be a better way. That's why we built CareNeighbour, a platform that connects families with trusted, local caregivers in minutes. Whether it's a quick check-in, companionship, or urgent assistance, we make sure help is always within reach.",
    backedBy: "Backed by",
    meetTheTeamDescription: "Get to know the passionate team behind CareNeighbour",
    joinWaitlist: "Join Our Waitlist",
    joinTeamTitle: "Join our team",
    joinTeamText: "Interested in becoming part of the CareNeighbour story? Explore career opportunities with us, or find out how you can partner with us to achieve mutual success. We're always looking for passionate carers who share our mission to make care accessible and culturally compatible for everyone.",
    careersButton: "Become a Carer",
    contactButton: "Contact Us",
    footerCopyright: "CareNeighbour, Inc. All rights reserved.",
  },
  zh: {
    companyName: "零距",
    backToHome: "返回首页",
    back: "返回",
    pageTitle: "关于我们",
    meetTheTeam: "团队成员",
    paragraph1:
      "零距(CareNeighbour)的诞生，源于我们在海外求学、工作时，无法陪伴年迈祖父母的无力感。像许多在外生活的游子和忙碌的职场人士一样，我们深知亲人需要照护却无法立刻赶回身边的痛苦。",
    paragraph2:
      "我们相信，一定有更好的方式。于是，我们打造了零距： 一个能在数分钟内，将家庭与本地值得信赖的照护者连接起来的平台。无论是简单的问候、陪伴，还是紧急协助，我们都致力于让'帮助'触手可及。",
    backedBy: "合作伙伴",
    meetTheTeamDescription: "认识一下零距离背后充满热情的团队",
    joinWaitlist: "加入候补名单",
    joinTeamTitle: "加入我们的团队",
    joinTeamText: "有兴趣成为零距团队的一员吗？与我们一同探索职业机会，了解如何与我们合作实现互利共赢。我们始终在寻找有激情的护理人员，他们与我们共同致力于让护理服务变得便民且文化相容。",
    careersButton: "成为护理人员",
    contactButton: "联系我们",
    footerCopyright: "零距公司 版权所有。",
  },
}

export default function AboutPage() {
  // 2. Add language state
  const { language, setLanguage } = useLanguage();
  // Helper to get current translations
  const t = aboutPageTranslations[language as keyof typeof aboutPageTranslations] || aboutPageTranslations.en


  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Head>
        <title>About CareNeighbour | AI-Powered Instant Care Sourcing Platform</title>
        <meta name="description" content="Learn about CareNeighbour, the new AI-powered instant care sourcing platform. Meet the team and discover our mission to make care accessible instantly for everyone." />
        <meta name="keywords" content="CareNeighbour, Care Neighbour, AI-powered care, instant care, care sourcing platform, new care platform, Monash, trusted caregivers, about, team, mission" />
        <meta property="og:title" content="About CareNeighbour | AI-Powered Instant Care Sourcing Platform" />
        <meta property="og:description" content="Learn about CareNeighbour, the new AI-powered instant care sourcing platform. Meet the team and discover our mission to make care accessible instantly for everyone." />
        <meta property="og:image" content="/CN_Brandmark_Black.png" />
        <meta name="robots" content="index, follow" />
      </Head>
      {/* Global header rendered via app/layout.tsx */}

      {/* Main Content */}
      <main className="flex-1">
        {/* About Content Section */}
        <section className="w-full py-12 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="space-y-6 text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter title-shadow px-2">
                <span className="gradient-text-fill">{t.pageTitle}</span>
              </h1>
                <p className="sr-only">CareNeighbour is a new, AI-powered care sourcing platform that connects you instantly with trusted caregivers. Learn more about our mission and team.</p>
              </div>
            </div>
          <div className="container px-4 md:px-6">
            {/* Meet the Team Section */}
            <div className="w-full mt-12 md:mt-16">              
              {/* Team Description with Image */}
              <div className="max-w-7xl mx-auto mb-16 md:mb-20">
                {/* First Section - Text Left, Image Right */}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-24">
                  <div className="order-2 lg:order-1">
                    <div className="px-2 sm:px-4 lg:px-8 lg:pr-12">
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        {t.paragraph1}
                      </p>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="w-full px-2 sm:px-0">
                      <div className="w-full overflow-hidden rounded-xl md:rounded-2xl shadow-xl">
                        <Image
                          src="/images/Aboutus_img1.png"
                          alt="Founding Story of CareNeighbour"
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Section - Image Left, Text Right */}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                  <div className="order-1 lg:order-1">
                    <div className="w-full px-2 sm:px-0">
                      <div className="w-full overflow-hidden rounded-xl md:rounded-2xl shadow-xl">
                        <Image
                          src="/images/Aboutus_img2.png"
                          alt="CareNeighbour Mission and Vision"
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  <div className="order-2 lg:order-2">
                    <div className="px-2 sm:px-4 lg:px-8 lg:pl-12">
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        {t.paragraph2}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

                {/* Backed by Section */}
              <div className="w-full mt-12 md:mt-16 mb-12 md:mb-16">
                <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">
                  <span className="gradient-text-fill">{t.backedBy}</span>
                </h2>
                <div className="flex items-center justify-center min-h-[80px] md:min-h-[100px]">
                    <ul className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-20">
                  <li className="flex items-center justify-center">
                    <a href="https://www.monash.edu/business" target="_blank" rel="noopener noreferrer" className="block">
                    <Image
                      src="/images/monashlogo.png"
                      alt="Monash Business School"
                      width={400}
                      height={200}
                      className="h-16 md:h-20 lg:h-24 w-auto object-contain hover:grayscale-0 transition-all duration-300"
                    />
                    </a>
                  </li>
                  <li className="flex items-center justify-center">
                    <a href="https://www.monash.edu/business/future-students/entrepreneurship/fastrack" target="_blank" rel="noopener noreferrer" className="block">
                    <Image
                      src="/images/fasttrack_logo.png"
                      alt="Monash FastTrack"
                      width={400}
                      height={200}
                      className="h-16 md:h-20 lg:h-24 w-auto object-contain hover:grayscale-0 transition-all duration-300"
                    />
                    </a>
                  </li>
                  </ul>
                </div>
                </div>
              </div>

              {/* Team Cards Title */}
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  <span className="gradient-text-fill">{t.meetTheTeam}</span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                  {t.meetTheTeamDescription}
                </p>
              </div>
                <div className="container px-4 md:px-6">
              <div className="max-w-7xl mx-auto">
                <div className="w-full">
                <style jsx>{`
                  .team-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                  gap: 30px;
                  max-width: 1400px;
                  margin: 0 auto;
                  }

                  @media (min-width: 1024px) {
                  .team-grid {
                    grid-template-columns: repeat(4, 1fr);
                  }
                  }

                  @media (min-width: 768px) and (max-width: 1023px) {
                  .team-grid {
                    grid-template-columns: repeat(2, 1fr);
                  }
                  }

                  @media (max-width: 767px) {
                  .team-grid {
                    grid-template-columns: repeat(2, 1fr);
                    max-width: 100%;
                    gap: 16px;
                  }
                  }

                  .team-card {
                  background: rgba(255, 255, 255, 0.15);
                  border-radius: 16px;
                  padding: 0;
                  text-align: left;
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                  backdrop-filter: blur(10px);
                  -webkit-backdrop-filter: blur(10px);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  overflow: hidden;
                  transition: all 0.3s ease;
                  display: flex;
                  flex-direction: column;
                  }

                  @media (max-width: 767px) {
                    .team-card {
                      border-radius: 12px;
                    }
                  }

                  .team-card:hover {
                  transform: translateY(-8px);
                  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
                  }

                  @media (max-width: 767px) {
                    .team-card:hover {
                      transform: translateY(-4px);
                    }
                  }

                  .team-img {
                  width: 100%;
                  height: 200px;
                  object-fit: cover;
                  object-position: center;
                  display: block;
                  }

                  @media (min-width: 768px) {
                    .team-img {
                      height: 220px;
                    }
                  }

                  .team-card-body {
                  padding: 16px;
                  display: flex;
                  flex-direction: column;
                  flex-grow: 1;
                  background: rgba(255, 255, 255, 0.1);
                  }

                  @media (min-width: 768px) {
                    .team-card-body {
                      padding: 20px;
                    }
                  }

                  @media (min-width: 1024px) {
                    .team-card-body {
                      padding: 24px;
                    }
                  }

                  .team-name {
                  font-weight: 700;
                  font-size: 18px;
                  margin-bottom: 6px;
                  color: #1a1a1a;
                  font-family: inherit;
                  }

                  @media (min-width: 768px) {
                    .team-name {
                      font-size: 20px;
                      margin-bottom: 8px;
                    }
                  }

                  .team-position {
                  font-size: 14px;
                  color: #4a5568;
                  margin-bottom: 12px;
                  font-weight: 600;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  background-clip: text;
                  -webkit-background-clip: text;
                  color: transparent;
                  line-height: 1.3;
                  }

                  @media (min-width: 768px) {
                    .team-position {
                      font-size: 16px;
                      margin-bottom: 16px;
                    }
                  }

                  .linkedin-btn {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  gap: 6px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  text-decoration: none;
                  padding: 10px 16px;
                  border-radius: 10px;
                  font-size: 13px;
                  font-weight: 600;
                  margin-top: auto;
                  transition: all 0.3s ease;
                  border: none;
                  cursor: pointer;
                  font-family: inherit;
                  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                  }

                  @media (min-width: 768px) {
                    .linkedin-btn {
                      gap: 8px;
                      padding: 12px 20px;
                      border-radius: 12px;
                      font-size: 14px;
                    }
                  }

                  .linkedin-btn:hover {
                  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
                  transform: translateY(-2px);
                  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                  }

                  .linkedin-btn:active {
                  transform: translateY(0);
                  }

                  .linkedin-icon {
                  width: 18px;
                  height: 18px;
                  fill: currentColor;
                  }
                `}</style>

                <div className="team-grid">
                  <div className="team-card">
                  <Image
                    src="/images/jed_img.jpeg"
                    alt="Jed Wong"
                    width={400}
                    height={220}
                    className="team-img"
                    priority
                    />
                  <div className="team-card-body">
                    <div className="team-name">Jed Wong</div>
                    <div className="team-position">Chief Executive Officer (CEO)</div>
                    <a 
                    href="https://www.linkedin.com/in/jed-wong/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="linkedin-btn"
                    >
                    <svg className="linkedin-icon" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                    LinkedIn
                    </a>
                  </div>
                  </div>

                  <div className="team-card">
                  <Image
                    src="/images/yufei_img.jpeg"
                    alt="Yufei"
                    width={400}
                    height={220}
                    className="team-img"
                    />
                  <div className="team-card-body">
                    <div className="team-name">Yufei</div>
                    <div className="team-position">Chief Customer Officer (CCO)</div>
                    <a 
                    href="https://au.linkedin.com/in/yufei-tao-605516262" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="linkedin-btn"
                    >
                    <svg className="linkedin-icon" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                    LinkedIn
                    </a>
                  </div>
                  </div>

                    <div className="team-card">
                    <Image
                    src="/images/maha_img.jpeg"
                    alt="Mahathir"
                    width={400}
                    height={220}
                    className="team-img"
                    />
                    <div className="team-card-body">
                    <div className="team-name">Mahathir</div>
                    <div className="team-position">Chief Operations Officer (COO)</div>
                    <a 
                    href="https://au.linkedin.com/in/mahathirml" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="linkedin-btn"
                    >
                    <svg className="linkedin-icon" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                    LinkedIn
                    </a>
                    </div>
                    </div>

                  <div className="team-card">
                  <Image
                    src="/images/matt_img.jpeg"
                    alt="Matthew"
                    width={400}
                    height={220}
                    className="team-img"
                    />
                  <div className="team-card-body">
                    <div className="team-name">Matthew</div>
                    <div className="team-position">Chief Technical Officer (CTO)</div>
                    <a 
                    href="https://www.linkedin.com/in/jiayi-matthew-gu/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="linkedin-btn"
                    >
                    <svg className="linkedin-icon" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                    LinkedIn
                    </a>
                  </div>
                  </div>
                </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Team Section */}
        <section className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    <span className="gradient-text-fill">{t.joinTeamTitle}</span>
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {t.joinTeamText}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                    <Link href="\signup">
                      <Button size="lg" className="w-full sm:w-auto glassmorphism text-gray bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0">
                        {t.careersButton}
                      </Button>
                    </Link>
                    <Link href="\#feedback">
                      <Button size="lg" className="w-full sm:w-auto glassmorphism text-gray bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0">
                        {t.contactButton}
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative order-first md:order-last">
                  <div className="rounded-xl md:rounded-2xl overflow-hidden glassmorphism">
                    <Image
                      src="/images/Founding-team-image.jpg"
                      alt="Join CareNeighbour Team"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Unified Footer */}
      <UnifiedFooter 
        language={language}
        translations={{
          aboutUs: language === 'zh' ? '关于我们' : 'About Us',
          mainPage: language === 'zh' ? '主页' : 'Home',
          footerCopyright: t.footerCopyright
        }}
      />
    </div>
  )
}
