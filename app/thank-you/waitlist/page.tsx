import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function WaitlistThankYouPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 flex items-center justify-center">
                <Image src="/images/logo.png" alt="CareNeighbor Logo" width={80} height={80} />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">Thank You for Joining!</h1>

            <p className="text-xl text-gray-700">
              We're excited to have you on our waitlist. We'll be in touch as we get closer to launch with exclusive
              updates and early access information.
            </p>

            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-700">
                In the meantime, feel free to share CareNeighbor with friends and family who might benefit from our
                service.
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

      {/* Minimal Footer */}
      <div className="w-full py-6 bg-white border-t">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image src="/images/logo.png" alt="CareNeighbor Logo" width={30} height={30} />
            <span className="font-bold text-xl">CareNeighbor</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CareNeighbor, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
