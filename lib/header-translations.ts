// Universal header translations for consistent navigation across all pages

export const getHeaderTranslations = (language: string, currentPageTitle?: string) => {
  const baseTranslations = {
    en: {
      heroLogo: "CareNeighbour",
      howItWorks: "How It Works", 
      aboutUs: "About Us",
      joinWaitlist: "Join Waitlist",
      becomeACarer: "Become a Carer",
      SourceforCare: "Source for Care",
      mainPage: "Home"
    },
    zh: {
      heroLogo: "零距",
      howItWorks: "工作原理",
      aboutUs: "关于我们", 
      joinWaitlist: "加入等候名单",
      becomeACarer: "成为护理员",
      SourceforCare: "寻找护理",
      mainPage: "主页"
    },
    yue: {
      heroLogo: "零距",
      howItWorks: "點樣運作",
      aboutUs: "關於我們",
      joinWaitlist: "加入等候名單", 
      becomeACarer: "成為護理員",
      SourceforCare: "護理服務",
      mainPage: "主頁"
    }
  }

  const translations = baseTranslations[language as keyof typeof baseTranslations] || baseTranslations.en
  
  return {
    ...translations,
    mainPage: currentPageTitle || translations.mainPage
  }
}

export default getHeaderTranslations
