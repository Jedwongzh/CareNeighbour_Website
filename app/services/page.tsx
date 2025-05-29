"use client"

import { useLanguage } from "../contexts/LanguageContext"
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"

// Services Page Content Component
function ServicesPageContent() {
  const { language, setLanguage } = useLanguage()

  // Translations object
  const translations = {
    en: {
      title: "Our Care Services",
      subtitle: "Comprehensive culturally-sensitive care services designed for you",
      mainPage: "Main",
      fundingOptions: "Funding Options",
      steps: [
        {
          title: "Define Your Needs",
          description: "Simply voice or text your care requirements, preferred language, cultural preferences, and location—we make it that easy",
          icon: "💬",
        },
        {
          title: "Match & Connect",
          description: "We instantly connect you with verified caregivers who perfectly match your criteria. Chat with our AI care concierge for any questions or additional needs",
          icon: "🤝",
        },
        {
          title: "Book & Relax",
          description: "Review your matched caregivers, schedule care effortlessly, manage payments securely, and enjoy peace of mind knowing your loved one is in exceptional hands",
          icon: "✨",
        },
      ],
      serviceCategories: [
        {
          title: "Social Support & Domestic Assistance",
          image: "/images/seniors-social.jpg",
          description: "Connect with support workers who can accompany you or your loved one to social outings, community events, or personal activities, offering friendly companionship and help along the way.",
          services: [
            {
              name: "Community Outings & Activities",
              description: "Stay active and engaged with someone who can join you for community events, local activities, or simply getting out and about.",
              icon: "🚶‍♀️"
            },
            {
              name: "Gardening",
              description: "Keep your garden looking great with help for tasks like planting, weeding, and pruning—so you can enjoy your outdoor space without the hassle.",
              icon: "🌱"
            },
            {
              name: "Housework",
              description: "Maintain a clean and comfortable home with support for everyday chores like vacuuming, mopping, and dusting.",
              icon: "🧹"
            },
            {
              name: "House Maintenance",
              description: "Get help with small repairs and general upkeep to keep your home safe, functional, and well-maintained.",
              icon: "🔧"
            },
            {
              name: "Meal Delivery",
              description: "Enjoy healthy, ready-to-eat meals delivered to your door—perfect for those who want nutritious options without the need to shop or cook.",
              icon: "🍽️"
            },
            {
              name: "Meal Preparation",
              description: "Receive support with cooking or following your meal plan, so you can enjoy food that suits your taste and dietary needs.",
              icon: "👨‍🍳"
            },
            {
              name: "Personal Admin",
              description: "Stay organised with help managing paperwork, appointments, bills, and other day-to-day tasks.",
              icon: "📋"
            },
            {
              name: "Shopping",
              description: "Get assistance with grocery shopping, carrying, and unpacking—making errands easier and less stressful.",
              icon: "🛒"
            },
            {
              name: "Social Support",
              description: "Find a friendly companion to chat with, share hobbies, or stay connected to loved ones and your wider community.",
              icon: "👥"
            },
            {
              name: "Sport & Exercise",
              description: "Stay active with personalised support—whether it's a walk in the park or help following an exercise routine.",
              icon: "🏃‍♀️"
            },
            {
              name: "Transport",
              description: "Access reliable transport for appointments, errands, or social outings, helping you get where you need to go with ease.",
              icon: "🚗"
            },
          ],
        },
        {
          title: "Personal Care Services",
          image: "/images/senior-couple.jpg",
          description: "Connect with qualified support workers who can assist with showering, dressing, grooming, toileting, and other personal hygiene needs—ensuring comfort, dignity, and independence every day.",
          services: [
            {
              name: "Personal Hygiene & Daily Support",
              description: "Assistance with showering, dressing, grooming, toileting, and other personal hygiene needs—ensuring comfort, dignity, and independence every day.",
              icon: "🛁"
            },
            {
              name: "Medication Assistance",
              description: "Receive timely reminders and help with taking prescribed medication to support your ongoing health and wellbeing.",
              icon: "💊"
            },
            {
              name: "Hoist & Transfer Support",
              description: "Get safe and professional assistance when moving between positions or locations using hoists or transfer aids, minimising physical strain and risk.",
              icon: "🏗️"
            },
            {
              name: "Manual Handling & Mobility",
              description: "Stay mobile and independent at home with support for safe movement, reducing the risk of falls and promoting confidence.",
              icon: "🚶‍♂️"
            },
            {
              name: "Light Massage Therapy",
              description: "Relax with gentle massage designed to ease muscle tension, boost circulation, and encourage a sense of calm and wellbeing.",
              icon: "💆‍♀️"
            },
            {
              name: "Exercise Support",
              description: "Stay active with guided exercises tailored to your abilities, helping maintain strength, mobility, and overall health.",
              icon: "🏃‍♂️"
            },
            {
              name: "Toileting Support",
              description: "Access respectful and discreet toileting assistance focused on preserving dignity and comfort.",
              icon: "🚿"
            },
            {
              name: "Palliative Care Support",
              description: "Compassionate care focused on easing discomfort and enhancing quality of life for those with serious or terminal illness.",
              icon: "🕊️"
            },
            {
              name: "Care Planning & Coordination",
              description: "Work with verified professionals to assess your needs, develop a personalised care plan, and coordinate services that support your goals.",
              icon: "📝"
            },
          ],
        },
        {
          title: "Professional Nursing",
          image: "/images/featureshowcase1.jpg",
          description: "Connect with qualified registered nurses who provide clinical care and health management services in the comfort of your home.",
          services: [
            {
              name: "Wound Care",
              description: "Professional wound assessment, cleaning, dressing, and monitoring to promote healing and prevent infection.",
              icon: "🩹"
            },
            {
              name: "Continence Assessment",
              description: "Comprehensive assessment and management of continence issues with dignity and professional care.",
              icon: "📊"
            },
            {
              name: "Catheter Care",
              description: "Safe and hygienic catheter insertion, maintenance, and removal by qualified nursing professionals.",
              icon: "🏥"
            },
            {
              name: "Respiratory Care",
              description: "Monitoring and support for breathing difficulties, oxygen therapy, and respiratory health management.",
              icon: "🫁"
            },
            {
              name: "Palliative Nursing Care",
              description: "Specialized nursing care focused on comfort, pain management, and quality of life for serious illness.",
              icon: "❤️"
            },
          ],
        },
        {
          title: "Allied Health Services",
          icon: "🏃‍♂️",
          image: "/images/featureshowcase2.jpg",
          description: "Connect with qualified allied health professionals who provide specialised care to enhance your health and wellbeing.",
          services: [
            {
              name: "Occupational Therapy",
              description: "Adaptation of therapy to cultural daily living practices",
              icon: "🛠️"
            },
            {
              name: "Physiotherapy",
              description: "Explanation of exercises in your preferred language",
              icon: "🏃‍♂️"
            },
            {
              name: "Psychology",
              description: "Culturally appropriate mental health support",
              icon: "🧠"
            },
            {
              name: "Speech Pathology",
              description: "Support for multilingual communication needs",
              icon: "🗣️"
            },
          ],
        },
      ],
      funding: [
        {
          title: "NDIS Funding",
          description: "Support through National Disability Insurance Scheme",
          icon: "🛡️"
        },
        {
          title: "Aged Care Funding",
          description: "Home Care Packages for elderly care",
          icon: "🏡"
        },
        {
          title: "Self-Managed Funding",
          description: "Flexible payment options for your care needs",
          icon: "💳"
        },
      ]
    },
    zh: {
      title: "我們的護理服務",
      subtitle: "為您設計的全面文化敏感護理服務",
      mainPage: "主页",
      fundingOptions: "資助選項",
      steps: [
        {
          title: "定義您的需求",
          description: "簡單地說出或輸入您的護理要求、偏好語言、文化偏好和位置—我們讓一切變得如此簡單",
          icon: "💬",
        },
        {
          title: "配對和聯繫",
          description: "我們即時為您聯繫完全符合您標準的經過驗證的護理員。與我們的AI護理禮賓員聊天，解答任何問題或額外需求",
          icon: "🤝",
        },
        {
          title: "預訂和放鬆",
          description: "查看您配對的護理員，輕鬆安排護理，安全管理付款，享受安心，知道您的親人得到卓越的照顧",
          icon: "✨",
        },
      ],
      serviceCategories: [
        {
          title: "社會支援和家務協助",
          icon: "🏠",
          image: "/images/seniors-social.jpg",
          description: "與支援工作者聯繫，他們可以陪伴您或您的親人參加社交外出、社區活動或個人活動，提供友好的陪伴和協助。",
          services: [
            {
              name: "社區外出和活動",
              description: "與可以陪伴您參加社區活動、當地活動或簡單外出的人保持活躍和參與。",
              icon: "🚶‍♀️"
            },
            {
              name: "園藝",
              description: "通過種植、除草和修剪等任務的協助，讓您的花園保持美觀，讓您可以享受戶外空間而無需麻煩。",
              icon: "🌱"
            },
            {
              name: "家務工作",
              description: "通過吸塵、拖地和除塵等日常家務的支援，維持清潔舒適的家居環境。",
              icon: "🧹"
            },
            {
              name: "房屋維護",
              description: "獲得小型維修和一般保養的幫助，讓您的家保持安全、功能良好和維護良好。",
              icon: "🔧"
            },
            {
              name: "送餐服務",
              description: "享受送到府上的健康即食餐點—非常適合想要營養選擇而無需購物或烹飪的人。",
              icon: "🍽️"
            },
            {
              name: "膳食準備",
              description: "獲得烹飪或遵循膳食計劃的支援，讓您可以享受符合您口味和飲食需求的食物。",
              icon: "👨‍🍳"
            },
            {
              name: "個人行政事務",
              description: "通過管理文書工作、預約、帳單和其他日常任務的幫助保持井然有序。",
              icon: "📋"
            },
            {
              name: "購物",
              description: "獲得雜貨購物、搬運和拆包的協助—讓跑腿變得更容易、壓力更小。",
              icon: "🛒"
            },
            {
              name: "社會支援",
              description: "找到友好的陪伴者聊天、分享愛好，或與親人和更廣泛的社區保持聯繫。",
              icon: "👥"
            },
            {
              name: "運動和鍛煉",
              description: "通過個人化支援保持活躍—無論是在公園散步還是幫助遵循鍛煉例程。",
              icon: "🏃‍♀️"
            },
            {
              name: "交通",
              description: "獲得可靠的交通服務，用於預約、跑腿或社交外出，幫助您輕鬆到達需要去的地方。",
              icon: "🚗"
            },
          ],
        },
        {
          title: "個人護理服務",
          icon: "💊",
          image: "/images/senior-couple.jpg",
          description: "與合格的支援工作者聯繫，他們可以協助洗澡、穿衣、梳理、如廁和其他個人衛生需求—每天確保舒適、尊嚴和獨立。",
          services: [
            {
              name: "個人衛生和日常支援",
              description: "協助洗澡、穿衣、梳理、如廁和其他個人衛生需求—每天確保舒適、尊嚴和獨立。",
              icon: "🛁"
            },
            {
              name: "藥物協助",
              description: "獲得及時提醒和幫助服用處方藥物，以支持您持續的健康和福祉。",
              icon: "💊"
            },
            {
              name: "升降機和轉移支援",
              description: "使用升降機或轉移輔助設備在位置或地點之間移動時，獲得安全和專業的協助，最大限度地減少身體壓力和風險。",
              icon: "🏗️"
            },
            {
              name: "手動搬運和行動力",
              description: "通過安全移動的支援在家中保持行動和獨立，降低跌倒風險並增強信心。",
              icon: "🚶‍♂️"
            },
            {
              name: "輕度按摩治療",
              description: "享受旨在緩解肌肉緊張、促進血液循環和鼓勵平靜和福祉感的輕柔按摩。",
              icon: "💆‍♀️"
            },
            {
              name: "運動支援",
              description: "通過針對您能力量身定制的指導性運動保持活躍，幫助維持力量、行動力和整體健康。",
              icon: "🏃‍♂️"
            },
            {
              name: "如廁支援",
              description: "獲得專注於保持尊嚴和舒適的尊重和謹慎的如廁協助。",
              icon: "🚿"
            },
            {
              name: "緩和護理支援",
              description: "專注於緩解不適和提高患有嚴重或終末疾病者生活質量的富有同情心的護理。",
              icon: "🕊️"
            },
            {
              name: "護理規劃和協調",
              description: "與經過驗證的專業人員合作，評估您的需求，制定個人化護理計劃，並協調支持您目標的服務。",
              icon: "📝"
            },
          ],
        },
        {
          title: "專業護理",
          icon: "🏥",
          image: "/images/featureshowcase1.jpg",
          description: "與合格的註冊護士聯繫，他們在您舒適的家中提供臨床護理和健康管理服務。",
          services: [
            {
              name: "傷口護理",
              description: "專業傷口評估、清潔、敷料和監測，促進癒合並預防感染。",
              icon: "🩹"
            },
            {
              name: "大小便失禁評估",
              description: "以尊嚴和專業護理進行大小便失禁問題的綜合評估和管理。",
              icon: "📊"
            },
            {
              name: "導尿管護理",
              description: "由合格護理專業人員進行安全衛生的導尿管插入、維護和移除。",
              icon: "🏥"
            },
            {
              name: "呼吸護理",
              description: "監測和支持呼吸困難、氧氣治療和呼吸健康管理。",
              icon: "🫁"
            },
            {
              name: "緩和護理",
              description: "專注於舒適、疼痛管理和嚴重疾病生活質量的專業護理。",
              icon: "❤️"
            },
          ],
        },
        {
          title: "專職醫療服務",
          icon: "🏃‍♂️",
          image: "/images/featureshowcase2.jpg",
          description: "與合格的專職醫療專業人員聯繫，他們提供專門的護理以增強您的健康和福祉。",
          services: [
            {
              name: "職業治療",
              description: "根據文化日常生活實踐調整治療",
              icon: "🛠️"
            },
            {
              name: "物理治療",
              description: "用您偏好的語言解釋運動",
              icon: "🏃‍♂️"
            },
            {
              name: "心理學",
              description: "文化適當的心理健康支援",
              icon: "🧠"
            },
            {
              name: "言語病理學",
              description: "支援多語言溝通需求",
              icon: "🗣️"
            },
          ],
        },
      ],
      funding: [
        {
          title: "NDIS 資助",
          description: "通過國家殘疾保險計劃提供支援",
          icon: "🛡️"
        },
        {
          title: "老年護理資助",
          description: "老年護理的居家護理套餐",
          icon: "🏡"
        },
        {
          title: "自我管理資助",
          description: "滿足您護理需求的靈活付款選項",
          icon: "💳"
        },
      ]
    },
    yue: {
      title: "我哋嘅護理服務",
      subtitle: "為你設計嘅全面文化敏感護理服務",
      mainPage: "主頁",
      fundingOptions: "資助選項",
      steps: [
        {
          title: "定義你嘅需求",
          description: "簡單講出或者打字你嘅護理要求、偏好語言、文化偏好同位置—我哋令一切變得咁簡單",
          icon: "💬",
        },
        {
          title: "配對同聯繫",
          description: "我哋即時為你聯繫完全符合你標準嘅經過驗證嘅護理員。同我哋嘅AI護理禮賓員傾計，解答任何問題或者額外需求",
          icon: "🤝",
        },
        {
          title: "預訂同放鬆",
          description: "查看你配對嘅護理員，輕鬆安排護理，安全管理付款，享受安心，知道你嘅親人得到卓越嘅照顧",
          icon: "✨",
        },
      ],
      serviceCategories: [
        {
          title: "社會支援同家務協助",
          icon: "🏠",
          image: "/images/seniors-social.jpg",
          description: "與支援工作者聯繫，佢哋可以陪伴你或者你嘅親人參加社交外出、社區活動或者個人活動，提供友好嘅陪伴同協助。",
          services: [
            {
              name: "社區外出同活動",
              description: "與可以陪伴你參加社區活動、當地活動或者簡單外出嘅人保持活躍同參與。",
              icon: "🚶‍♀️"
            },
            {
              name: "園藝",
              description: "透過種植、除草同修剪等任務嘅協助，令你嘅花園保持靚仔，令你可以享受戶外空間而唔洗麻煩。",
              icon: "🌱"
            },
            {
              name: "家務工作",
              description: "透過吸塵、拖地同除塵等日常家務嘅支援，維持清潔舒適嘅家居環境。",
              icon: "🧹"
            },
            {
              name: "房屋維護",
              description: "獲得小型維修同一般保養嘅幫助，令你嘅屋企保持安全、功能良好同維護良好。",
              icon: "🔧"
            },
            {
              name: "送餐服務",
              description: "享受送到屋企嘅健康即食餐點—非常適合想要營養選擇而唔洗購物或者煮嘢食嘅人。",
              icon: "🍽️"
            },
            {
              name: "膳食準備",
              description: "獲得煮嘢食或者遵循膳食計劃嘅支援，令你可以享受符合你口味同飲食需求嘅食物。",
              icon: "👨‍🍳"
            },
            {
              name: "個人行政事務",
              description: "透過管理文件工作、預約、帳單同其他日常任務嘅幫助保持井然有序。",
              icon: "📋"
            },
            {
              name: "購物",
              description: "獲得雜貨購物、搬運同拆包嘅協助—令跑腿變得更容易、壓力更少。",
              icon: "🛒"
            },
            {
              name: "社會支援",
              description: "搵到友好嘅陪伴者傾計、分享愛好，或者與親人同更廣泛嘅社區保持聯繫。",
              icon: "👥"
            },
            {
              name: "運動同鍛煉",
              description: "透過個人化支援保持活躍—無論係喺公園散步定係幫助遵循鍛煉例程。",
              icon: "🏃‍♀️"
            },
            {
              name: "交通",
              description: "獲得可靠嘅交通服務，用於預約、跑腿或者社交外出，幫助你輕鬆到達需要去嘅地方。",
              icon: "🚗"
            },
          ],
        },
        {
          title: "個人護理服務",
          icon: "💊",
          image: "/images/senior-couple.jpg",
          description: "與合格嘅支援工作者聯繫，佢哋可以協助沖涼、著衫、梳理、去廁所同其他個人衛生需求—每日確保舒適、尊嚴同獨立。",
          services: [
            {
              name: "個人衛生同日常支援",
              description: "協助沖涼、著衫、梳理、去廁所同其他個人衛生需求—每日確保舒適、尊嚴同獨立。",
              icon: "🛁"
            },
            {
              name: "藥物協助",
              description: "獲得及時提醒同幫助服用處方藥物，以支持你持續嘅健康同福祉。",
              icon: "💊"
            },
            {
              name: "升降機同轉移支援",
              description: "使用升降機或者轉移輔助設備喺位置或者地點之間移動嗰陣，獲得安全同專業嘅協助，最大限度減少身體壓力同風險。",
              icon: "🏗️"
            },
            {
              name: "手動搬運同行動力",
              description: "透過安全移動嘅支援喺屋企保持行動同獨立，降低跌倒風險並增強信心。",
              icon: "🚶‍♂️"
            },
            {
              name: "輕度按摩治療",
              description: "享受旨在緩解肌肉緊張、促進血液循環同鼓勵平靜同福祉感嘅輕柔按摩。",
              icon: "💆‍♀️"
            },
            {
              name: "運動支援",
              description: "透過針對你能力量身定制嘅指導性運動保持活躍，幫助維持力量、行動力同整體健康。",
              icon: "🏃‍♂️"
            },
            {
              name: "如廁支援",
              description: "獲得專注於保持尊嚴同舒適嘅尊重同謹慎嘅如廁協助。",
              icon: "🚿"
            },
            {
              name: "紓緩護理支援",
              description: "專注於緩解不適同提高患有嚴重或者終末疾病者生活質量嘅富有同情心嘅護理。",
              icon: "🕊️"
            },
            {
              name: "護理規劃同協調",
              description: "與經過驗證嘅專業人員合作，評估你嘅需求，制定個人化護理計劃，並協調支持你目標嘅服務。",
              icon: "📝"
            },
          ],
        },
        {
          title: "專業護理",
          icon: "🏥",
          image: "/images/featureshowcase1.jpg",
          description: "與合格嘅註冊護士聯繫，佢哋喺你舒適嘅屋企提供臨床護理同健康管理服務。",
          services: [
            {
              name: "傷口護理",
              description: "專業傷口評估、清潔、敷料同監測，促進癒合並預防感染。",
              icon: "🩹"
            },
            {
              name: "大小便失禁評估",
              description: "以尊嚴同專業護理進行大小便失禁問題嘅綜合評估同管理。",
              icon: "📊"
            },
            {
              name: "導尿管護理",
              description: "由合格護理專業人員進行安全衛生嘅導尿管插入、維護同移除。",
              icon: "🏥"
            },
            {
              name: "呼吸護理",
              description: "監測同支持呼吸困難、氧氣治療同呼吸健康管理。",
              icon: "🫁"
            },
            {
              name: "紓緩護理",
              description: "專注於舒適、疼痛管理同嚴重疾病生活質量嘅專業護理。",
              icon: "❤️"
            },
          ],
        },
        {
          title: "專職醫療服務",
          icon: "🏃‍♂️",
          image: "/images/featureshowcase2.jpg",
          description: "與合格嘅專職醫療專業人員聯繫，佢哋提供專門嘅護理以增強你嘅健康同福祉。",
          services: [
            {
              name: "職業治療",
              description: "根據文化日常生活實踐調整治療",
              icon: "🛠️"
            },
            {
              name: "物理治療",
              description: "用您偏好的語言解釋運動",
              icon: "🏃‍♂️"
            },
            {
              name: "心理學",
              description: "文化適當的心理健康支援",
              icon: "🧠"
            },
            {
              name: "言語病理學",
              description: "支援多語言溝通需求",
              icon: "🗣️"
            },
          ],
        },
      ],
      funding: [
        {
          title: "NDIS 資助",
          description: "透過國家殘疾保險計劃提供支援",
          icon: "🛡️"
        },
        {
          title: "安老護理資助",
          description: "安老護理嘅居家護理套餐",
          icon: "🏡"
        },
        {
          title: "自我管理資助",
          description: "滿足你護理需求嘅靈活付款選項",
          icon: "💳"
        },
      ]
    }
  }

  // Get current language content
  const content = translations[language as keyof typeof translations] || translations.en

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out">
      <div className="container px-4 md:px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 transition-all duration-300 ease-in-out">
        <Image src="/images/logo.png" alt="CareNeighbour Logo" width={36} height={36} />
        <span className="font-semibold text-lg transition-colors duration-300 ease-in-out">{language === 'zh' ? '零距' : language === 'yue' ? '零距' : 'CareNeighbour'}</span>
        </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 items-center">
            {/* Language switcher */}
            <Button size="sm" variant={language === "en" ? "secondary" : "ghost"} onClick={() => setLanguage("en")} >EN</Button>
            <Button size="sm" variant={language === "zh" ? "secondary" : "ghost"} onClick={() => setLanguage("zh")} >中文</Button>

            <Link
              href="/"
              className="text-sm font-medium text-center text-gray-600 hover:text-primary transition-all duration-300 ease-in-out"
            >
              {content.mainPage}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-center text-gray-600 hover:text-primary transition-all duration-300 ease-in-out"
            >
              {language === 'zh' ? '关于我们' : language === 'yue' ? '關於我們' : 'About Us'}
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-center text-gray-600 hover:text-primary transition-all duration-300 ease-in-out"
            >
              {language === 'zh' ? '护理服务' : language === 'yue' ? '護理服務' : 'Source for Care'}
            </Link>
            <Button
              size="sm"
              onClick={() => window.location.href = '/#waitlist'}
              className="transition-all duration-300 ease-in-out hover:scale-105"
            >
              {language === 'zh' ? '加入等候名单' : language === 'yue' ? '加入等候名單' : 'Join Waitlist'}
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav 
            translations={{
              mainPage: content.mainPage,
              howItWorks: language === 'zh' ? '如何運作' : language === 'yue' ? '點樣運作' : 'How It Works',
              aboutUs: language === 'zh' ? '关于我们' : language === 'yue' ? '關於我們' : 'About Us',
              joinWaitlist: language === 'zh' ? '加入等候名单' : language === 'yue' ? '加入等候名單' : 'Join Waitlist',
              SourceforCare: language === 'zh' ? '护理服务' : language === 'yue' ? '護理服務' : 'Source for Care',
            }} 
            currentLang={language} 
            setLang={setLanguage} 
            availableLangs={{ en: "EN", zh: "中文"}} 
          />
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 lg:mb-12 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 text-transparent bg-clip-text leading-tight">
            {language === 'zh' ? '我们的全面护理服务' : language === 'yue' ? '我哋嘅全面護理服務' : 'Our Comprehensive Care Services'}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16 text-gray-900">
            {language === 'zh' ? '如何运作' : language === 'yue' ? '點樣運作' : 'How It Works'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {content.steps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2">
                <div className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">{step.icon}</div>
                <div className="text-sm md:text-base text-purple-600 font-semibold mb-3 md:mb-4 tracking-wide">STEP {index + 1}</div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 text-gray-900 leading-tight">{step.title}</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16 text-gray-900">
            {language === 'zh' ? '护理服务类别' : language === 'yue' ? '護理服務類別' : 'Care Service Categories'}
          </h2>
          <div className="space-y-12 md:space-y-16 lg:space-y-20">
            {content.serviceCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
                {/* Category Header */}
                <div className="p-6 md:p-8 lg:p-12 bg-gradient-to-br from-purple-50 to-blue-50">
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4 md:mb-6">
                      <span className="text-3xl md:text-4xl lg:text-5xl">{category.icon}</span>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">{category.title}</h3>
                    </div>
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl leading-relaxed">{category.description}</p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="p-6 md:p-8 lg:p-12 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 group">
                        <div className="flex flex-col space-y-3 md:space-y-4">
                          <div className="text-2xl md:text-3xl lg:text-4xl transition-transform duration-300">{service.icon}</div>
                          <div className="flex-1">
                            <h4 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3 text-gray-900 leading-tight">{service.name}</h4>
                            <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-purple-100 rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-purple-100 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 lg:mb-8">
              {language === 'zh' ? '準備開始了嗎？' : language === 'yue' ? '準備開始了嗎？' : 'Ready to Get Started?'}
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed">
              {language === 'zh' 
                ? '立即聯繫我們，了解我們如何為您提供文化敏感的護理服務。我們的專業團隊隨時為您服務。'
                : language === 'yue'
                ? '立即聯繫我們，了解我們如何為您提供文化敏感的護理服務。我們的專業團隊隨時為您服務。'
                : 'Contact us today to learn how we can provide culturally-sensitive care services for you. Our professional team is ready to serve you.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.location.href = '/#waitlist'} 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 md:px-10 lg:px-12 py-3 md:py-4 lg:py-5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl text-base md:text-lg w-full sm:w-auto">
                {language === 'zh' ? '聯繫我們' : language === 'yue' ? '聯繫我們' : 'Contact Us'}
              </button>
              <button 
                onClick={() => window.location.href = '/#waitlist'}
                className="bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 hover:border-black-700 px-8 md:px-10 lg:px-12 py-3 md:py-4 lg:py-5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-base md:text-lg w-full sm:w-auto"
              >
                {language === 'zh' ? '加入等候名单' : language === 'yue' ? '加入等候名單' : 'Join Waitlist'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-r from-purple-50 to-blue-50 mt-16 md:mt-20 lg:mt-24">
        <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between text-sm md:text-base text-gray-600">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Image src="/images/logo.png" alt="CareNeighbour Logo" width={24} height={24} className="md:w-8 md:h-8" />
            <span className="font-medium">&copy; {new Date().getFullYear()} {language === 'zh' ? '零距' : language === 'yue' ? '零距' : 'CareNeighbour'}</span>
          </div>
          <div className="flex gap-6 md:gap-8">
            <Link href="/about" className="hover:text-purple-600 transition-colors duration-300 font-medium">
              {language === 'zh' ? '关于我们' : language === 'yue' ? '關於我們' : 'About Us'}
            </Link>
            <Link href="/" className="hover:text-purple-600 transition-colors duration-300 font-medium">
              {content.mainPage}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Main component with Suspense wrapper
export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm md:text-base">Loading services...</p>
        </div>
      </div>
    }>
      <ServicesPageContent />
    </Suspense>
  )
}