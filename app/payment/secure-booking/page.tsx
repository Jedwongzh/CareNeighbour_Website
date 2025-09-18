"use client"

import { useMemo, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react"
import Link from "next/link"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { UnifiedFooter } from "@/components/unified-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import {
  ShieldCheck,
  CreditCard,
  CheckCircle,
  ArrowRight
} from "lucide-react"

const translations = {
  en: {
    hero: {
      title: "Secure your care booking",
      subtitle:
        "Complete the steps below to reserve your session and safely share payment details with our team.",
      backToPayment: "Back to payment overview"
    },
    plansSection: {
      title: "Choose a care support bundle",
      description:
        "Pick the option that best matches your care needs. You will only be charged once the session is confirmed.",
      planSelectLabel: "Select plan",
      planSelectedLabel: "Selected",
      billingOptions: [
        {
          key: "oneTime",
          label: "One-off booking",
          description: "Perfect for trial sessions or immediate support needs."
        },
        {
          key: "weekly",
          label: "Weekly plan",
          description: "Lock in predictable visits with the same trusted carer."
        }
      ],
      plans: [
        {
          name: "Starter Support",
          badge: "Most popular",
          description: "Ideal for companionship, light domestic help or wellness check-ins.",
          billing: {
            oneTime: {
              amount: 150,
              label: "2-hour visit",
              helper: "Includes instant matching, travel and booking support"
            },
            weekly: {
              amount: 420,
              label: "3 visits each week",
              helper: "Adjust or cancel free of charge with 12 hours notice"
            }
          },
          features: [
            "Matched to language and cultural preferences",
            "Flexible rescheduling up to 12 hours before the visit",
            "Session reminders and concierge chat support"
          ]
        },
        {
          name: "Daily Essentials",
          badge: "Routine care",
          description: "Great for personal care, meal preparation or medication prompts.",
          billing: {
            oneTime: {
              amount: 190,
              label: "3-hour visit",
              helper: "Perfect for morning routines or evening check-ins"
            },
            weekly: {
              amount: 540,
              label: "4 visits each week",
              helper: "Keep the same carer across the week for continuity"
            }
          },
          features: [
            "Qualified carers with personal care experience",
            "Flexible start times and travel coordination",
            "Invoices ready for NDIS, Home Care Packages or private claims"
          ]
        },
        {
          name: "Comprehensive Care",
          badge: "High needs",
          description: "Support for complex care needs or combined day and evening assistance.",
          billing: {
            oneTime: {
              amount: 260,
              label: "4-hour intensive support",
              helper: "Includes complex care coordination and reporting"
            },
            weekly: {
              amount: 780,
              label: "6 visits each week",
              helper: "Priority scheduling with a dedicated care concierge"
            }
          },
          features: [
            "Coordinated with registered nurses for clinical tasks",
            "Specialised support for dementia, mobility and wound care",
            "Priority concierge monitoring with real-time updates"
          ]
        }
      ]
    },
    summary: {
      title: "Order summary",
      carePlanLabel: "Selected plan",
      billingLabel: "Billing preference",
      totalLabel: "Estimated total",
      featuresTitle: "This plan includes",
      nextStepsTitle: "Next steps",
      nextSteps: [
        "A CareNeighbour concierge will confirm carer availability and finalise the schedule.",
        "No payment is captured until you approve the completed session."
      ],
      securityTitle: "Secure checkout",
      securityPoints: [
        "256-bit encrypted payment processing",
        "Receipts provided in English and Chinese",
        "Dedicated concierge support for any adjustments"
      ]
    },
    form: {
      title: "Contact & payment details",
      subtitle:
        "Enter your details to reserve the time slot. Our care concierge will confirm within 2 business hours.",
      fields: {
        fullName: {
          label: "Full name",
          placeholder: "e.g. Emily Zhang"
        },
        email: {
          label: "Email address",
          placeholder: "you@example.com"
        },
        phone: {
          label: "Phone number",
          placeholder: "+61 400 000 000"
        },
        postcode: {
          label: "Postcode",
          placeholder: "e.g. 3000"
        },
        notes: {
          label: "Care notes (optional)",
          placeholder: "Share schedule preferences, funding details or other context"
        },
        cardNumber: {
          label: "Card number",
          placeholder: "1234 5678 9012 3456"
        },
        cardExpiry: {
          label: "Expiry",
          placeholder: "MM/YY"
        },
        cardCvc: {
          label: "CVC",
          placeholder: "123"
        }
      },
      submitWithTotal: "Complete booking securely · {total}",
      submitting: "Processing...",
      successTitle: "Payment details received",
      successMessage:
        "Thank you! Our care concierge will verify the schedule and send a confirmation shortly.",
      errorMessage: "Please fill in the required fields before continuing.",
      disclaimer:
        "By submitting, you authorise CareNeighbour to securely store your payment method. We only finalise payment once you approve the completed session."
    }
  },
  zh: {
    hero: {
      title: "安全预订护理服务",
      subtitle: "完成以下步骤，安全提交付款信息并预留合适的护理时间。",
      backToPayment: "返回付款概览"
    },
    plansSection: {
      title: "选择适合的护理方案",
      description: "挑选符合需求的付款选项。只有在您确认服务后才会扣款。",
      planSelectLabel: "选择方案",
      planSelectedLabel: "已选择",
      billingOptions: [
        {
          key: "oneTime",
          label: "一次性预约",
          description: "适合试用、临时或短期护理需求。"
        },
        {
          key: "weekly",
          label: "每周计划",
          description: "与信任的护理员维持固定的探访频率。"
        }
      ],
      plans: [
        {
          name: "起步关怀",
          badge: "最受欢迎",
          description: "适合陪伴、轻度家务或健康关怀探访。",
          billing: {
            oneTime: {
              amount: 150,
              label: "2 小时到访",
              helper: "含即时匹配、差旅与预订支持"
            },
            weekly: {
              amount: 420,
              label: "每周 3 次到访",
              helper: "服务前 12 小时内免费调整或取消"
            }
          },
          features: [
            "根据语言与文化偏好匹配护理员",
            "服务前 12 小时内可免费改期",
            "包含提醒与即时客服支援"
          ]
        },
        {
          name: "日常照护",
          badge: "常规护理",
          description: "适合个人护理、备餐或服药提醒等持续需求。",
          billing: {
            oneTime: {
              amount: 190,
              label: "3 小时到访",
              helper: "适合早晨或晚间的日常协助"
            },
            weekly: {
              amount: 540,
              label: "每周 4 次到访",
              helper: "同一位护理员服务，维持熟悉感"
            }
          },
          features: [
            "具备个人护理经验的认证护理员",
            "弹性安排上门时间与交通协调",
            "发票可用于 NDIS、居家护理配套或私人报销"
          ]
        },
        {
          name: "全方位护理",
          badge: "高需求",
          description: "适合复杂照护、日夜结合或需要临床支援的家庭。",
          billing: {
            oneTime: {
              amount: 260,
              label: "4 小时强化照护",
              helper: "包含复杂护理协调与记录"
            },
            weekly: {
              amount: 780,
              label: "每周 6 次支援",
              helper: "优先排班并由专属客服跟进"
            }
          },
          features: [
            "与注册护士协作处理临床项目",
            "适用于失智、行动或伤口照护等需求",
            "专属客服实时追踪与汇报"
          ]
        }
      ]
    },
    summary: {
      title: "订单摘要",
      carePlanLabel: "已选方案",
      billingLabel: "付款方式",
      totalLabel: "预计费用",
      featuresTitle: "包含内容",
      nextStepsTitle: "接下来会做什么",
      nextSteps: [
        "零距团队将确认护理员档期并敲定服务时间。",
        "只有在您批准服务完成后才会正式扣款。"
      ],
      securityTitle: "安全结帐",
      securityPoints: [
        "256 位加密付款流程",
        "提供中英双语电子收据",
        "专属客服协助任何调整与疑问"
      ]
    },
    form: {
      title: "联络人与付款资料",
      subtitle: "填写资料以预留时段，我们会在 2 个工作小时内与您确认。",
      fields: {
        fullName: {
          label: "姓名",
          placeholder: "例如：陈美玲"
        },
        email: {
          label: "电子邮箱",
          placeholder: "you@example.com"
        },
        phone: {
          label: "电话号码",
          placeholder: "+61 400 000 000"
        },
        postcode: {
          label: "邮递区号",
          placeholder: "例如：3000"
        },
        notes: {
          label: "护理需求（选填）",
          placeholder: "可填写时间偏好、资金来源或其他说明"
        },
        cardNumber: {
          label: "信用卡卡号",
          placeholder: "1234 5678 9012 3456"
        },
        cardExpiry: {
          label: "到期日",
          placeholder: "MM/YY"
        },
        cardCvc: {
          label: "安全码",
          placeholder: "123"
        }
      },
      submitWithTotal: "安全完成预约 · {total}",
      submitting: "处理中...",
      successTitle: "已收到付款信息",
      successMessage: "感谢您！客服将尽快确认护理员行程并与您联系。",
      errorMessage: "请先填写必填字段再继续。",
      disclaimer:
        "提交即表示您授权零距安全保存付款方式。只有在您确认服务完成后才会正式扣款。"
    }
  }
}

type BillingCycle = "oneTime" | "weekly"

const defaultBilling = { amount: 0, label: "", helper: "" }

const SecureBookingPageContent = () => {
  const { language } = useLanguage()
  const current = translations[language as keyof typeof translations] || translations.en
  const { toast } = useToast()
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("oneTime")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    postcode: "",
    notes: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const planList = current.plansSection.plans
  const safeIndex = Math.min(selectedPlanIndex, planList.length - 1)
  const selectedPlan = planList[safeIndex] ?? planList[0]

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-AU", {
        style: "currency",
        currency: "AUD"
      }),
    [language]
  )

  const billingOptions = selectedPlan?.billing ?? {}
  const billingKeys = Object.keys(billingOptions)
  const fallbackBillingKey = (billingKeys[0] ?? "oneTime") as keyof typeof billingOptions
  const activeBilling =
    billingOptions[
      (billingCycle in billingOptions ? billingCycle : fallbackBillingKey) as keyof typeof billingOptions
    ] ?? defaultBilling

  const formattedTotal = currencyFormatter.format(activeBilling.amount || 0)
  const selectedBillingOption =
    current.plansSection.billingOptions.find((option) => option.key === billingCycle) ??
    current.plansSection.billingOptions[0]

  const handleBillingChange = (key: BillingCycle) => {
    setBillingCycle(key)
  }

  const handlePlanSelect = (index: number) => {
    setSelectedPlanIndex(index)
  }

  const handlePlanKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setSelectedPlanIndex(index)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitLabel = current.form.submitWithTotal.replace("{total}", formattedTotal)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const requiredFields: Array<keyof typeof formData> = [
      "fullName",
      "email",
      "cardNumber",
      "cardExpiry",
      "cardCvc"
    ]

    const hasMissing = requiredFields.some((field) => {
      const rawValue = formData[field]
      if (field === "cardNumber") {
        return rawValue.replace(/\s+/g, "").length === 0
      }
      return rawValue.trim().length === 0
    })

    if (hasMissing) {
      toast({
        title: current.form.errorMessage,
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: current.form.successTitle,
        description: current.form.successMessage
      })
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        postcode: "",
        notes: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: ""
      })
    }, 900)
  }

  return (
    <div className="flex-1">
      <main className="flex-1">
        <section className="relative overflow-hidden bg-white/60 py-16 md:py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-100/60 via-white to-sky-100/40" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-purple-700">
                <Link href="/payment" className="inline-flex items-center gap-1 text-purple-700 hover:text-purple-800">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  {current.hero.backToPayment}
                </Link>
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                {current.hero.title}
              </h1>
              <p className="mt-4 text-lg text-gray-700 md:text-xl">
                {current.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div className="space-y-8">
                <div className="space-y-6 rounded-3xl border border-purple-100 bg-white/80 p-6 shadow-sm">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {current.plansSection.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">{current.plansSection.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {current.plansSection.billingOptions.map((option) => {
                      const isActive = option.key === (selectedBillingOption?.key ?? "oneTime")
                      return (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => handleBillingChange(option.key as BillingCycle)}
                          className={cn(
                            "flex min-w-[180px] flex-1 flex-col rounded-2xl border border-purple-100 px-4 py-3 text-left transition-all hover:border-purple-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60",
                            isActive && "border-purple-500 bg-purple-50 shadow-md"
                          )}
                        >
                          <span className="text-sm font-semibold text-gray-900">{option.label}</span>
                          <span className="mt-1 text-xs text-gray-600">{option.description}</span>
                        </button>
                      )
                    })}
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {planList.map((plan, index) => {
                      const planBillingOptions = plan.billing
                      const planBillingKey = (billingCycle in planBillingOptions
                        ? billingCycle
                        : Object.keys(planBillingOptions)[0]) as keyof typeof planBillingOptions
                      const planBilling = planBillingOptions[planBillingKey]
                      const planPrice = currencyFormatter.format(planBilling?.amount ?? 0)
                      const isSelected = index === safeIndex
                      return (
                        <Card
                          key={`${plan.name}-${index}`}
                          role="button"
                          tabIndex={0}
                          onClick={() => handlePlanSelect(index)}
                          onKeyDown={(event) => handlePlanKeyDown(event, index)}
                          aria-pressed={isSelected}
                          className={cn(
                            "group h-full cursor-pointer border border-purple-100/60 bg-white/80 transition-all hover:border-purple-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60",
                            isSelected && "border-purple-500 shadow-lg ring-2 ring-purple-200"
                          )}
                        >
                          <CardContent className="flex h-full flex-col gap-4 p-5">
                            {plan.badge && (
                              <span className="self-start rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                                {plan.badge}
                              </span>
                            )}
                            <div className="space-y-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                                <p className="mt-1 text-sm text-gray-600">{plan.description}</p>
                              </div>
                              <div>
                                <div className="text-2xl font-semibold text-purple-600">{planPrice}</div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                  {planBilling?.label}
                                </p>
                                {planBilling?.helper && (
                                  <p className="mt-1 text-xs text-gray-500">{planBilling.helper}</p>
                                )}
                              </div>
                              <ul className="space-y-2 text-sm text-gray-600">
                                {plan.features.map((feature, featureIndex) => (
                                  <li
                                    key={`${plan.name}-feature-${featureIndex}`}
                                    className="flex items-start gap-2"
                                  >
                                    <CheckCircle className="mt-0.5 h-4 w-4 text-purple-500" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <span className="text-xs font-semibold text-purple-600">
                              {isSelected
                                ? current.plansSection.planSelectedLabel
                                : current.plansSection.planSelectLabel}
                            </span>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                <form
                  className="space-y-6 rounded-3xl border border-purple-100 bg-white/90 p-6 shadow-sm"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {current.form.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">{current.form.subtitle}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{current.form.fields.fullName.label}</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={current.form.fields.fullName.placeholder}
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{current.form.fields.email.label}</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={current.form.fields.email.placeholder}
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{current.form.fields.phone.label}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={current.form.fields.phone.placeholder}
                        autoComplete="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">{current.form.fields.postcode.label}</Label>
                      <Input
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        placeholder={current.form.fields.postcode.placeholder}
                        inputMode="numeric"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">{current.form.fields.notes.label}</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder={current.form.fields.notes.placeholder}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cardNumber">{current.form.fields.cardNumber.label}</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder={current.form.fields.cardNumber.placeholder}
                        inputMode="numeric"
                        autoComplete="cc-number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">{current.form.fields.cardExpiry.label}</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder={current.form.fields.cardExpiry.placeholder}
                        autoComplete="cc-exp"
                        inputMode="numeric"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardCvc">{current.form.fields.cardCvc.label}</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder={current.form.fields.cardCvc.placeholder}
                        autoComplete="cc-csc"
                        inputMode="numeric"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? current.form.submitting : submitLabel}
                  </Button>
                  <p className="text-xs text-gray-500">{current.form.disclaimer}</p>
                </form>
              </div>

              <Card className="h-full border border-purple-100 bg-gradient-to-br from-white via-purple-50/70 to-sky-50 shadow-md">
                <CardContent className="flex h-full flex-col gap-6 p-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {current.summary.title}
                    </h3>
                    {selectedPlan?.badge && (
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                        {selectedPlan.badge}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>{current.summary.carePlanLabel}</span>
                      <span className="font-medium text-gray-900">
                        {selectedPlan?.name ?? current.plansSection.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{current.summary.billingLabel}</span>
                      <span className="font-medium text-gray-900">
                        {selectedBillingOption?.label ?? ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-purple-100 pt-3 text-base font-semibold text-purple-600">
                      <span>{current.summary.totalLabel}</span>
                      <span>{formattedTotal}</span>
                    </div>
                    {activeBilling?.helper && (
                      <p className="text-xs text-gray-500">{activeBilling.helper}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {current.summary.featuresTitle}
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {(selectedPlan?.features ?? []).map((feature, index) => (
                        <li key={`summary-feature-${index}`} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-purple-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {current.summary.nextStepsTitle}
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {current.summary.nextSteps.map((step, index) => (
                        <li key={`next-step-${index}`} className="flex items-start gap-2">
                          <ArrowRight className="mt-0.5 h-4 w-4 text-purple-500" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {current.summary.securityTitle}
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {current.summary.securityPoints.map((point, index) => (
                        <li key={`security-point-${index}`} className="flex items-start gap-2">
                          <ShieldCheck className="mt-0.5 h-4 w-4 text-purple-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <UnifiedFooter
        language={language}
        translations={{
          aboutUs: language === "zh" ? "关于我们" : "About Us",
          footerCopyright:
            language === "zh" ? "零距. 版权所有。" : "CareNeighbour, Inc. All rights reserved.",
          mainPage: language === "zh" ? "主页" : "Home"
        }}
      />
    </div>
  )
}

export default function SecureBookingPage() {
  return <SecureBookingPageContent />
}
