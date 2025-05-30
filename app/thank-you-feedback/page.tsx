import Link from "next/link"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UnifiedFooter } from "@/components/unified-footer"

export default function ThankYouFeedbackPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageSquare className="h-10 w-10 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
              Thank You for Your Feedback!
            </h1>

            <p className="text-xl text-gray-700">
              We greatly appreciate you taking the time to share your thoughts with us. Your input is invaluable as we
              continue to develop CareNeighbor.
            </p>

            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-700">
                Our team will review your feedback carefully. If we need any clarification or would like to discuss your
                ideas further, we'll be in touch via the email you provided.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/">
                <Button variant="outline" size="lg">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Unified Footer */}
      <UnifiedFooter 
        language="en"
        translations={{
          aboutUs: "About Us",
          mainPage: "Home",
          footerCopyright: "CareNeighbour"
        }}
      />
    </div>
  )
}
