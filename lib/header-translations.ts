// Universal header translations for consistent navigation across all pages

export const getHeaderTranslations = (language: string, currentPageTitle?: string) => {
  const baseTranslations = {
    en: {
      heroLogo: "CareNeighbour",
      howItWorks: "How It Works", 
      aboutUs: "About Us",
      joinWaitlist: "Join Waitlist",
      becomeACarer: "Become a Carer",
      SourceforCare: "Our Services",
      payment: "Payment",
      mainPage: "Home",
      getStarted: "Get Started",
      joinCareNeighbour: "Join CareNeighbour",
      findSupport: "I want to find support",
      findSupportDesc: "For myself, a client or on behalf of a friend or family member.",
      provideSupport: "I want to provide support",
      provideSupportDesc: "As a support worker, nurse, allied health professional, gardener or cleaner."
    },
    zh: {
      heroLogo: "零距",
      howItWorks: "工作原理",
      aboutUs: "关于我们", 
      joinWaitlist: "加入等候名单",
      becomeACarer: "成为护理员",
      SourceforCare: "寻找护理",
      payment: "支付",
      mainPage: "主页",
      getStarted: "开始使用",
      joinCareNeighbour: "加入零距",
      findSupport: "我需要护理支持",
      findSupportDesc: "为自己、客户或代表朋友或家人。",
      provideSupport: "我想提供护理服务",
      provideSupportDesc: "作为护理员、护士、专业医疗人员、园艺师或清洁员。"
    },
    yue: {
      heroLogo: "零距",
      howItWorks: "點樣運作",
      aboutUs: "關於我們",
      joinWaitlist: "加入等候名單", 
      becomeACarer: "成為護理員",
      SourceforCare: "護理服務",
      payment: "付款",
      mainPage: "主頁",
      getStarted: "開始使用",
      joinCareNeighbour: "加入零距",
      findSupport: "我需要護理支援",
      findSupportDesc: "為自己、客戶或代表朋友或家人。",
      provideSupport: "我想提供護理服務",
      provideSupportDesc: "作為護理員、護士、專業醫療人員、園藝師或清潔員。"
    }
  }

  const translations = baseTranslations[language as keyof typeof baseTranslations] || baseTranslations.en
  
  return {
    ...translations,
    mainPage: currentPageTitle || translations.mainPage
  }
}

export default getHeaderTranslations
