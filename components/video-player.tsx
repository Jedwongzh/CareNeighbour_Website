"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoPlayerProps {
  src: string
  title: string
  height?: number
  width?: number
}

export function VideoPlayer({ src, title, height = 500, width = 350 }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
      console.log(`Video ${src} can play`)
    }

    const handleError = (e: Event) => {
      console.error(`Error loading video ${src}:`, e)
      setError(`Could not load video: ${src}`)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
    }
  }, [src])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch((err) => {
        console.error("Error playing video:", err)
        setError(`Could not play video: ${err.message}`)
      })
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div
      style={{
        width: `${width}px`,
        maxWidth: "100%",
        height: `${height}px`,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "2rem",
        background: "#f5f5f5",
        position: "relative",
      }}
    >
      {error ? (
        <div className="p-4 text-center">
          <p className="text-red-500">{error}</p>
          <p className="mt-2">Placeholder for: {title}</p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "2rem",
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Loading state or fallback */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Loading {title}...</p>
              </div>
            </div>
          )}

          {/* Controls overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/60 to-transparent">
            <button
              onClick={togglePlay}
              className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleMute}
              className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
