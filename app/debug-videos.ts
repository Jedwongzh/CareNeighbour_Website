"use client"

export function debugVideos() {
  if (typeof window !== "undefined") {
    console.log("Debugging videos...")

    // Check if video files exist
    const videoUrls = [
      "/videos/Care-request-demo.mp4",
      "/videos/AI-Chat-demo.mp4",
      "/videos/Carer-Review-demo.mp4",
      "/videos/Explore-Page-demo.mp4",
    ]

    videoUrls.forEach((url) => {
      const xhr = new XMLHttpRequest()
      xhr.open("HEAD", url, true)
      xhr.onload = () => {
        console.log(`Video ${url}: ${xhr.status === 200 ? "EXISTS" : "NOT FOUND"}`)
      }
      xhr.onerror = () => {
        console.log(`Video ${url}: ERROR checking`)
      }
      xhr.send()
    })

    // Check video elements on the page
    setTimeout(() => {
      const videoElements = document.querySelectorAll("video")
      console.log(`Found ${videoElements.length} video elements on the page`)

      videoElements.forEach((video, index) => {
        console.log(`Video ${index + 1}:`, {
          readyState: video.readyState,
          networkState: video.networkState,
          error: video.error,
          src: video.currentSrc || video.src || "No source",
          dimensions: `${video.offsetWidth}x${video.offsetHeight}`,
          visible: video.offsetWidth > 0 && video.offsetHeight > 0,
        })
      })
    }, 2000)
  }
}
