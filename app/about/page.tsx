import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="container px-4 md:px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="CareNeighbor Logo" width={36} height={36} />
            <span className="font-semibold text-lg">CareNeighbour</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">About Us</h1>
              </div>
            </div>

            {/* Founding Team Image */}
            <div className="w-full flex justify-center mt-8">
              <div className="overflow-hidden rounded-3xl shadow-lg border border-gray-200 max-w-2xl w-full bg-white">
                <Image
                  src="/images/Founding-team-image.jpg"
                  alt="Founding Team"
                  width={800}
                  height={300}
                  className="w-full h-auto object-cover rounded-3xl"
                  priority
                />
              </div>
            </div>
            <div className="my-12" />
            <div className="max-w-4xl mx-auto prose prose-sm md:prose-base lg:prose-lg">
              <p className="text-justify">
                We're a team of Monash University students passionate about solving real-world problems—starting with
                one that has deeply affected us. CareNeighbour was born from our own struggles of being far from our
                aging grandparents when they needed us the most. Like many expats and busy professionals, we've
                experienced the helplessness of knowing a loved one needs care but being unable to drop everything and
                fly home. We knew there had to be a better way. That's why we built CareNeighbour—a platform that connects families with trusted, local caregivers in
                minutes. Whether it's a quick check-in, companionship, or urgent assistance, we make sure help is always
                within reach. But we know technology alone isn't enough—we need insights from those who truly understand aged care. If
                you're an expert in elder care, healthcare, or community support, we'd love to hear from you. Your
                feedback and guidance can help us refine CareNeighbor into something that truly makes a difference.
              </p>
                <div className="my-8" />
              <p className="text-justify">
                If you're interested in collaborating, advising, or simply sharing your thoughts, please reach out.
                Let's work together to create a future where no one feels helpless when their loved ones need care.
              </p>

              <div className="mt-8 flex justify-center">
                <Link href="/#waitlist">
                  <Button size="lg" className="font-medium">
                    Join Our Waitlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal copyright notice */}
      <div className="w-full py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CareNeighbour, Inc. All rights reserved.
      </div>
    </div>
  )
}
