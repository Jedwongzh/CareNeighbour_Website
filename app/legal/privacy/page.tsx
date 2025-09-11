"use client"

import Head from "next/head"
import { UnifiedFooter } from "@/components/unified-footer"
import { useLanguage } from "../../contexts/LanguageContext"

export default function PrivacyPolicyPage() {
  const { language } = useLanguage()

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Head>
        <title>Privacy Policy | CareNeighbour</title>
        <meta name="description" content="CareNeighbour Privacy Policy for LinkedIn lead generation activities, in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles." />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="CareNeighbour Privacy Policy" />
        <meta property="og:description" content="How we collect, use, and protect your personal information in line with Australian privacy laws." />
        <meta property="og:image" content="/CN_Brandmark_Black.png" />
      </Head>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">CareNeighbour Privacy Policy</h1>
              <p className="mt-2 text-muted-foreground">Last Updated: Aug 25, 2025</p>
            </div>

            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-3xl mx-auto text-black space-y-6 leading-relaxed">
              <p>
                CareNeighbour (“we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
              </p>
              <p>
                This Privacy Policy explains how we collect, use, and protect your personal information through our LinkedIn lead generation activities, including LinkedIn Lead Gen Forms, sponsored content, and other interactions on the LinkedIn platform.
              </p>

              <h2 className="font-bold">1. Information We Collect</h2>
              <p>When you engage with our LinkedIn campaigns, we may collect:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Job title and company name</li>
                <li>Any other information you voluntarily submit through LinkedIn Lead Gen Forms</li>
              </ul>
              <p>
                We may also collect non-identifiable data about campaign performance through LinkedIn Analytics.
              </p>

              <h2 className="font-bold">2. How We Use Your Information</h2>
              <p>We collect and use your information for purposes including:</p>
              <ul>
                <li>Contacting you about CareNeighbour’s services, platform updates, and pilot programs</li>
                <li>Responding to your enquiries and requests</li>
                <li>Providing relevant information tailored to your interests</li>
                <li>Improving our services, marketing, and outreach</li>
              </ul>
              <p>We do not sell or rent your personal information to third parties.</p>

              <h2 className="font-bold">3. AI Training and Consent</h2>
              <p>
                CareNeighbour may use de-identified and anonymised data to improve our technology, including AI systems that help match carers with families. Personal information used for AI training will be de-identified so that you cannot be reasonably identified.
              </p>
              <p>
                We will only use your data for AI training where you have provided express consent. You can withdraw your consent at any time by contacting us (see Section 8).
              </p>

              <h2 className="font-bold">4. How We Share Your Information</h2>
              <p>We may share your personal information with:</p>
              <ul>
                <li>Service providers (e.g., CRM, email platforms) for purposes directly related to providing our services</li>
                <li>Regulatory authorities if required by law or to protect our legal rights</li>
              </ul>
              <p>We will not disclose your personal information for unrelated third-party marketing purposes.</p>

              <h2 className="font-bold">5. Data Storage, Security &amp; Retention</h2>
              <p>
                We take appropriate technical and organisational measures to protect your personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. Your data is stored securely in Australia or with trusted providers that comply with Australian privacy laws. We retain personal information only as long as necessary to fulfil the purposes outlined in this policy.
              </p>

              <h2 className="font-bold">6. Your Rights Under the APPs</h2>
              <p>Under the Australian Privacy Principles, you have the right to:</p>
              <ul>
                <li>Request access to the personal information we hold about you</li>
                <li>Request corrections if the information is inaccurate or incomplete</li>
                <li>Withdraw consent to receive marketing communications at any time</li>
                <li>Withdraw consent for AI training use at any time</li>
              </ul>
              <p>
                You can exercise these rights by contacting us at: <a href="mailto:careneighbour.team@gmail.com">careneighbour.team@gmail.com</a>
              </p>

              <h2 className="font-bold">7. Third-Party Links</h2>
              <p>
                Our LinkedIn campaigns may link to our website or other resources. Please note that this Privacy Policy applies only to CareNeighbour’s activities and not to third-party websites, which have their own privacy policies.
              </p>

              <h2 className="font-bold">8. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy to reflect changes in our practices, legal obligations, or operational needs. The most recent version will always be available on our website.
              </p>

              <h2 className="font-bold">9. Contact Us</h2>
              <p>
                If you have any questions, concerns, or would like to exercise your rights, please contact us:
              </p>
              <p>
                <strong>CareNeighbour</strong><br />
                Email: <a href="mailto:careneighbour.team@gmail.com">careneighbour.team@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <UnifiedFooter
        language={language}
        translations={{
          aboutUs: language === 'zh' ? '关于我们' : 'About Us',
          mainPage: language === 'zh' ? '主页' : 'Home',
          footerCopyright: language === 'zh' ? '零距 . 版权所有。' : 'CareNeighbour, Inc. All rights reserved.'
        }}
      />
    </div>
  )
}
