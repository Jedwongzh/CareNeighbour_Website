"use client"

import Link from "next/link"
import { UnifiedFooter } from "@/components/unified-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "../contexts/LanguageContext"
import {
  ShieldCheck,
  CreditCard,
  Wallet,
  Sparkles,
  Home,
  PiggyBank,
  FileText,
  CalendarCheck,
  CheckCircle,
  BadgeCheck,
  ArrowRight
} from "lucide-react"

const iconMap = {
  shield: ShieldCheck,
  creditCard: CreditCard,
  wallet: Wallet,
  sparkles: Sparkles,
  home: Home,
  piggyBank: PiggyBank,
  fileText: FileText,
  calendarCheck: CalendarCheck,
  checkCircle: CheckCircle,
  badgeCheck: BadgeCheck
}

const translations = {
  en: {
    heroLogo: "CareNeighbour",
    mainPage: "Home",
    aboutUs: "About Us",
    joinWaitlist: "Join Waitlist",
    SourceforCare: "Our Services",
    BecomeACarer: "Become a Carer",
    howItWorks: "How It Works",
    footerCopyright: "CareNeighbour, Inc. All rights reserved.",
    hero: {
      tag: "Payments",
      title: "Flexible payment options for peace of mind",
      subtitle:
        "Book care with transparent pricing, funding guidance, and secure transactions all in one place.",
      primaryCta: {
        label: "Secure your booking",
        href: "/payment/secure-booking"
      },
      secondaryCta: {
        label: "Explore care services",
        href: "/services"
      },
    },
    bookingPreview: {
      title: "Ready to confirm a session?",
      subtitle:
        "Choose a support bundle, share payment details securely, and reserve time with a trusted carer in under two minutes.",
      features: [
        "Bilingual checkout experience in English and Chinese",
        "Transparent pricing with live plan totals",
        "Secure card authorisation with concierge follow-up"
      ],
      primaryCta: {
        label: "Go to secure checkout",
        href: "/payment/secure-booking"
      },
    },
    highlightsTitle: "Why families trust our payments",
    highlights: [
      {
        title: "Transparent pricing",
        description:
          "See clear session rates before you confirm a carer, with no hidden platform or surprise weekend fees.",
        icon: "badgeCheck"
      },
      {
        title: "Secure transactions",
        description:
          "All card payments are processed through encrypted gateways with real-time fraud monitoring.",
        icon: "shield"
      },
      {
        title: "Funding support",
        description:
          "We guide you through NDIS, Home Care Package and private payment pathways in English or Mandarin.",
        icon: "sparkles"
      },
      {
        title: "Receipts & tracking",
        description:
          "Download invoices instantly, share with plan managers and keep every booking organised in one dashboard.",
        icon: "fileText"
      }
    ],
    funding: {
      title: "Support for every funding pathway",
      subtitle:
        "CareNeighbour helps you match payments with the right funding source so budgeting stays simple.",
      options: [
        {
          title: "NDIS & self-managed plans",
          description:
            "Upload plan details once, then let our bilingual team help you submit sessions correctly every time.",
          points: [
            "Guidance on support categories and hourly caps",
            "Automated statements for easy plan reviews",
            "Works with self, plan-managed and agency-managed setups"
          ],
          icon: "sparkles"
        },
        {
          title: "Home Care Packages",
          description:
            "Sync CareNeighbour bookings with your provider so approved care budgets are used exactly as intended.",
          points: [
            "Share invoices directly with your package manager",
            "Track remaining allocations for respite or transport",
            "Adjust services quickly when care plans change"
          ],
          icon: "home"
        },
        {
          title: "Private & out-of-pocket",
          description:
            "Set your own spending limits, save payment methods securely and receive receipts for tax time.",
          points: [
            "Store multiple cards for different family members",
            "Schedule recurring bookings with predictable costs",
            "Export annual summaries in one click"
          ],
          icon: "wallet"
        }
      ]
    },
    process: {
      title: "How payment works",
      description:
        "From matching to completed session, every step is transparent so you always know what happens next.",
      steps: [
        {
          step: "01",
          title: "Confirm your carer",
          description:
            "Select the carer that fits your needs and review their rate, travel fee (if any) and session duration before booking.",
          icon: "checkCircle"
        },
        {
          step: "02",
          title: "Secure authorisation",
          description:
            "Add your preferred payment method once. We place a pre-authorisation only after the booking is confirmed.",
          icon: "creditCard"
        },
        {
          step: "03",
          title: "Session completed",
          description:
            "When care is delivered, the carer logs the hours. You receive an instant notification to review and approve.",
          icon: "calendarCheck"
        },
        {
          step: "04",
          title: "Receipt & follow up",
          description:
            "Payments are captured securely. Download receipts, share with plan managers or request adjustments with one tap.",
          icon: "fileText"
        }
      ]
    },
    pricing: {
      title: "What shapes your final price",
      description:
        "CareNeighbour matches you with carers who are transparent about their rates. These are the factors we help you review together.",
      factors: [
        "Care type and qualifications required",
        "Session length, frequency and travel distance",
        "Weekend, evening or public holiday loadings",
        "Languages, cultural preferences or specialised skills",
        "Funding rules, caps or plan-specific requirements"
      ]
    },
    faqs: {
      title: "Common payment questions",
      items: [
        {
          question: "Can I split payments across different funding sources?",
          answer:
            "Yes. Our support team can help allocate part of a session to NDIS budgets and the remainder to private payment or Home Care Packages. You will see the split before confirming."
        },
        {
          question: "When is my card charged?",
          answer:
            "We place a temporary hold only after a booking is confirmed. The final charge occurs once you approve the completed session. You'll receive an email receipt immediately."
        },
        {
          question: "Do you support invoices for plan managers?",
          answer:
            "Absolutely. All invoices include line items, support categories and GST (if applicable). You can download them in English or Chinese and forward directly to your plan manager."
        },
        {
          question: "How do refunds or adjustments work?",
          answer:
            "If a session changes, contact us through the chat. We can adjust logs before they are charged, or issue partial/full refunds within 3-5 business days after review."
        }
      ]
    },
    supportBanner: {
      title: "Need tailored payment advice?",
      description:
        "Book a quick call with our bilingual care concierge team to structure the best payment approach for your family.",
      primaryCta: {
        label: "Book a consultation",
        href: "mailto:careneighbour.team@gmail.com"
      },
    }
  },
  zh: {
    heroLogo: "零距",
    mainPage: "主页",
    aboutUs: "关于我们",
    joinWaitlist: "加入等候名单",
    SourceforCare: "寻找护理",
    BecomeACarer: "成为护理员",
    howItWorks: "工作原理",
    footerCopyright: "零距. 版权所有。",
    hero: {
      tag: "支付",
      title: "灵活的付款方式，让家人更安心",
      subtitle:
        "在同一个平台完成透明定价、资金指引与安全支付，轻松预约合适的护理服务。",
      primaryCta: {
        label: "前往安全结帐",
        href: "/payment/secure-booking"
      },
      secondaryCta: {
        label: "浏览护理服务",
        href: "/services"
      },
    },
    bookingPreview: {
      title: "准备确认护理服务了吗？",
      subtitle:
        "选择适合的护理方案，安全提交付款信息，并在两分钟内预留可信赖的护理员时段。",
      features: [
        "提供中英双语结帐流程",
        "实时显示方案价格与费用说明",
        "安全的信用卡授权与专属客服跟进"
      ],
      primaryCta: {
        label: "进入安全结帐",
        href: "/payment/secure-booking"
      },
    },
    highlightsTitle: "为何家庭信任我们的支付系统",
    highlights: [
      {
        title: "清晰透明的价格",
        description: "确认护理员之前即可看到时薪、差旅费及其他费用，没有隐藏收费。",
        icon: "badgeCheck"
      },
      {
        title: "安全的交易流程",
        description: "所有银行卡交易均通过加密通道处理，并实时监控潜在风险。",
        icon: "shield"
      },
      {
        title: "多种资金方案支持",
        description: "我们以中英文协助您匹配 NDIS、居家护理配套及自费等不同资金渠道。",
        icon: "sparkles"
      },
      {
        title: "发票与记录随时下载",
        description: "每次预订都会自动生成发票，可与计划经理共享，轻松管理。",
        icon: "fileText"
      }
    ],
    funding: {
      title: "适配每一种资金渠道",
      subtitle: "零距帮助您把护理费用与正确的资金来源对应，预算管理更简单。",
      options: [
        {
          title: "NDIS 与自管计划",
          description: "一次上传计划详情，我们的双语团队将协助您准确提交每一次护理记录。",
          points: [
            "提供支持类别与价格上限的指引",
            "自动生成报表，方便回顾计划使用情况",
            "适用于自管、计划管理或机构管理的设置"
          ],
          icon: "sparkles"
        },
        {
          title: "居家护理配套",
          description: "让零距预订与护理服务提供方同步，确保获批的预算被正确使用。",
          points: [
            "可直接与护理配套经理共享发票",
            "追踪剩余额度，可预留给喘息或交通需求",
            "护理计划调整时，可快速更新服务设置"
          ],
          icon: "home"
        },
        {
          title: "私人及自费支付",
          description: "自行设定消费上限，安全保存支付方式，并随时取得报税所需的收据。",
          points: [
            "为不同家庭成员保存多张银行卡",
            "设定周期性预订，费用一目了然",
            "一键导出年度汇总"
          ],
          icon: "wallet"
        }
      ]
    },
    process: {
      title: "支付流程一目了然",
      description: "从匹配到服务完成，每个步骤都清楚透明，让您随时掌握进度。",
      steps: [
        {
          step: "01",
          title: "确认护理员",
          description: "选择最合适的护理员，预订前可查看时薪、差旅费用（如有）及服务时长。",
          icon: "checkCircle"
        },
        {
          step: "02",
          title: "安全授权",
          description: "只需添加一次首选支付方式。预订确认后才会进行预授权。",
          icon: "creditCard"
        },
        {
          step: "03",
          title: "完成护理服务",
          description: "护理员记录实际工时后，您会收到提醒进行审核与确认。",
          icon: "calendarCheck"
        },
        {
          step: "04",
          title: "收据与跟进",
          description: "付款安全完成后，可立即下载收据、发送给计划经理或提出调整。",
          icon: "fileText"
        }
      ]
    },
    pricing: {
      title: "影响总费用的因素",
      description: "零距让护理员清楚展示费率，我们也协助您提前了解以下成本因素。",
      factors: [
        "所需的护理类型与资格",
        "服务时长、频率及行程距离",
        "周末、夜间或公共假期的附加费",
        "语言、文化偏好或专业技能需求",
        "各类资金计划的规则、上限或核准要求"
      ]
    },
    faqs: {
      title: "常见支付问题",
      items: [
        {
          question: "可以分开使用不同的资金来源吗？",
          answer:
            "可以。我们的团队可协助您把一次服务拆分为 NDIS 预算与自费或居家护理配套部分，确认前您会看到详细比例。"
        },
        {
          question: "何时会扣款？",
          answer:
            "预订确认后，我们才会进行临时预授权。服务完成并经您批准后才会正式扣款，并立即发送电子收据。"
        },
        {
          question: "是否提供给计划经理的专用发票？",
          answer:
            "完全可以。发票包含项目、支持类别及 GST（金税）信息，可提供英文或中文版本，直接转发给计划经理。"
        },
        {
          question: "如何处理退款或调整？",
          answer:
            "若服务有变更，请透过对话功能联系我们。我们可在扣款前调整记录，或在审核后于 3-5 个工作天内处理部分或全额退款。"
        }
      ]
    },
    supportBanner: {
      title: "需要个性化的付款建议吗？",
      description: "预约与我们的双语护理顾问简短通话，为您的家庭设计最佳的付款方案。",
      primaryCta: {
        label: "预约咨询",
        href: "mailto:careneighbour.team@gmail.com"
      },
    }
  }
}

const PaymentPageContent = () => {
  const { language } = useLanguage()
  const current = translations[language as keyof typeof translations] || translations.en

  return (
    <div className="flex-1">
      <main className="flex-1">
        <section className="relative overflow-hidden bg-white/60 py-16 md:py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-100/60 via-white to-sky-100/40" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                {current.hero.title}
              </h1>
              <p className="mt-4 text-lg text-gray-700 md:text-xl">
                {current.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href={current.hero.primaryCta.href}>
                    {current.hero.primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={current.hero.secondaryCta.href}>
                    {current.hero.secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/60 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                  {current.bookingPreview.title}
                </h2>
                <p className="mt-4 text-gray-600 md:text-lg">{current.bookingPreview.subtitle}</p>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {current.bookingPreview.features.map((feature, index) => (
                    <li key={`booking-feature-${index}`} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-purple-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
                    <Link href={current.bookingPreview.primaryCta.href}>
                      {current.bookingPreview.primaryCta.label}
                    </Link>
                  </Button>
                </div>
              </div>
              <Card className="border border-purple-100 bg-gradient-to-br from-white via-purple-50/70 to-sky-50 shadow-md">
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{current.process.title}</h3>
                  <p className="text-sm text-gray-600">{current.process.description}</p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {current.process.steps.map((step) => (
                      <li key={`process-preview-${step.step}`} className="flex items-start gap-2">
                        <span className="font-semibold text-purple-600">{step.step}</span>
                        <span>
                          <span className="block font-medium text-gray-900">{step.title}</span>
                          <span className="text-gray-600">{step.description}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/60 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
              {current.highlightsTitle}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {current.highlights.map((item, index) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap]
                return (
                  <Card
                    key={`${item.title}-${index}`}
                    className="h-full border-none bg-white/70 shadow-lg shadow-purple-100/60 backdrop-blur-sm"
                  >
                    <CardContent className="flex flex-col gap-4 p-6">
                      {Icon && <Icon className="h-10 w-10 text-purple-600" />}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-2 text-gray-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-white/60 py-16 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="md:flex md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                  {current.funding.title}
                </h2>
                <p className="mt-4 text-gray-600 md:text-lg">{current.funding.subtitle}</p>
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {current.funding.options.map((option, index) => {
                return (
                  <Card
                    key={`${option.title}-${index}`}
                    className="border-none bg-gradient-to-br from-[#F7F4FF] via-white to-[#F0F9FF] shadow-md shadow-purple-100/50"
                  >
                    <CardContent className="flex h-full flex-col gap-4 p-6">
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900">{option.title}</h3>
                        <p className="text-gray-600">{option.description}</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {option.points.map((point, pointIndex) => (
                            <li key={`${option.title}-point-${pointIndex}`} className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 text-purple-500" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/60 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                {current.process.title}
              </h2>
              <p className="mt-4 text-gray-600 md:text-lg">{current.process.description}</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {current.process.steps.map((step) => {
                const Icon = iconMap[step.icon as keyof typeof iconMap]
                return (
                  <div
                    key={step.step}
                    className="relative flex h-full flex-col gap-4 rounded-2xl border border-purple-100 bg-white/80 p-6 shadow-sm"
                  >
                    {Icon && <Icon className="h-8 w-8 text-purple-600" />}
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-white/60 py-16 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                  {current.pricing.title}
                </h2>
                <p className="mt-4 text-gray-600 md:text-lg">{current.pricing.description}</p>
              </div>
              <Card className="border-none bg-gradient-to-br from-purple-50 via-white to-sky-50 shadow-md shadow-purple-100/70">
                <CardContent className="space-y-3 p-6">
                  {current.pricing.factors.map((factor, index) => (
                    <div key={`factor-${index}`} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600">
                      {index + 1}
                      </span>
                      <span className="text-gray-700">{factor}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/60 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
              {current.faqs.title}
            </h2>
            <div className="mt-10 space-y-6">
              {current.faqs.items.map((faq, index) => (
                <Card key={`faq-${index}`} className="border border-purple-100 bg-white/70 shadow-sm">
                  <CardContent className="space-y-2 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <UnifiedFooter
        language={language}
        translations={{
          aboutUs: current.aboutUs,
          footerCopyright: current.footerCopyright,
          mainPage: current.mainPage
        }}
      />
    </div>
  )
}

export default function PaymentPage() {
  return <PaymentPageContent />
}
