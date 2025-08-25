"use client"

import { useState, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Mic } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function ChatInterface({ careSummary }: { careSummary: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), text: input, sender: "user" }])
      setInput("")
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), text: "I'm sorry, I'm just a demo. I can't really help you.", sender: "bot" },
        ])
      }, 1000)
    }
  }

  const handleToggleRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorderRef.current = new MediaRecorder(stream)
          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data)
          }
          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
            const audioUrl = URL.createObjectURL(audioBlob)
            setMessages((prev) => [
              ...prev,
              { id: Date.now(), text: `Voice message: ${audioUrl}`, sender: "user" },
            ])
            audioChunksRef.current = []
          }
          mediaRecorderRef.current.start()
          setIsRecording(true)
        })
        .catch((err) => console.error("Error accessing microphone:", err))
    }
  }

  return (
    <Card className="w-full max-w-2xl h-[80vh] flex flex-col bg-white/60 dark:bg-black/60 backdrop-blur-lg border-gray-200/50 dark:border-gray-800/50">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Chat with CareNeighbour</CardTitle>
        {careSummary && (
          <div className="p-3 mt-2 bg-white/50 dark:bg-black/50 rounded-lg border border-gray-200/50 dark:border-gray-800/50">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Your Care Request:</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{careSummary}"</p>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/CN_Brandmark_Black.png" alt="Bot" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-white/80 dark:bg-zinc-800/80 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="relative w-full flex items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="pr-20"
          />
          <div className="absolute right-2 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleRecording}
              className={isRecording ? "text-red-500" : ""}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSend}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
