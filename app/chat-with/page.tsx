"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Send,
  User,
  Menu,
  X,
  Star,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  FileText,
  MessageSquare,
  History,
  Users,
  Home,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { CarerProfile, getCarerById } from "@/lib/mock-data/carers";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  jobRequest?: JobRequest;
}

interface JobRequest {
  startTime: string;
  endTime: string;
  rate: string;
  location: string;
  details: string;
  status: "pending" | "accepted" | "declined";
}

// Sidebar component for desktop layout
function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: MessageSquare, label: "Chat", href: "/chat" },
    { icon: History, label: "Chat History", href: "/chat/history" },
    { icon: Users, label: "My Carers", href: "/carers" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen w-64 bg-white/90 backdrop-blur-md border-r border-purple-200/30 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto lg:h-screen
      `}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 pr-12">
            <Image
              src="/images/Logo-no-bck.png"
              alt="CareNeighbour"
              width={32}
              height={32}
            />
            <span className="font-bold text-xl text-gray-900">
              CareNeighbour
            </span>
          </div>

          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-2 lg:hidden w-10 h-10 p-0"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="mt-auto">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-600">Premium Member</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function JobRequestCard({ jobRequest }: { jobRequest: JobRequest }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "declined":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mt-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">Job Request</h4>
        <Badge
          variant="secondary"
          className={`${getStatusColor(jobRequest.status)} text-xs px-2 py-1`}
        >
          {jobRequest.status.charAt(0).toUpperCase() + jobRequest.status.slice(1)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-purple-600" />
          <span className="text-gray-600">Start:</span>
          <span className="font-medium">{jobRequest.startTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-purple-600" />
          <span className="text-gray-600">End:</span>
          <span className="font-medium">{jobRequest.endTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-purple-600" />
          <span className="text-gray-600">Rate:</span>
          <span className="font-medium">${jobRequest.rate}/hr</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-purple-600" />
          <span className="text-gray-600">Location:</span>
          <span className="font-medium">{jobRequest.location}</span>
        </div>
      </div>
      
      {jobRequest.details && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-start space-x-2">
            <FileText className="w-4 h-4 text-purple-600 mt-0.5" />
            <div>
              <span className="text-gray-600 text-sm">Details:</span>
              <p className="text-sm text-gray-900 mt-1">{jobRequest.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function JobRequestDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobRequest: JobRequest) => void;
}) {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    rate: "",
    location: "",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: "pending",
    });
    setFormData({
      startTime: "",
      endTime: "",
      rate: "",
      location: "",
      details: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Job Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rate">Hourly Rate ($)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="25"
                value={formData.rate}
                onChange={(e) =>
                  setFormData({ ...formData, rate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="123 Main St, City"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="details">Additional Details</Label>
            <Textarea
              id="details"
              placeholder="Any specific requirements or notes..."
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Job Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ChatWithPageContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [carer, setCarer] = useState<CarerProfile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchParams = useSearchParams();
  
  const carerId = searchParams.get("carerId");
  const careDetails = searchParams.get("careDetails") || "";

  useEffect(() => {
    if (carerId) {
      const carerProfile = getCarerById(parseInt(carerId));
      setCarer(carerProfile!);
    }
  }, [carerId]);

  useEffect(() => {
    if (careDetails && carer) {
      // Send initial care details message automatically
      const initialMessage: Message = {
        id: "1",
        type: "user",
        content: careDetails,
        timestamp: new Date(),
      };
      setMessages([initialMessage]);

      // Add assistant response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: "2",
          type: "assistant",
          content: `Hello! I'm ${carer.name}, and I've received your care request: "${careDetails}". I'd be happy to help you with your care needs. Feel free to ask me any questions or create a job request when you're ready.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }, 1000);
    }
  }, [careDetails, carer]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [inputValue]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Thank you for your message. I understand your request and I'm here to help. Would you like to create a formal job request for this?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleJobRequest = (jobRequest: JobRequest) => {
    const jobMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: "I've created a job request with the following details:",
      timestamp: new Date(),
      jobRequest,
    };

    setMessages((prev) => [...prev, jobMessage]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I've received your job request and will review it shortly. I'll get back to you with my availability and confirmation. Thank you for choosing my services!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  if (!carer) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-0">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-40 backdrop-blur-md bg-white/80 border-b border-purple-200/30 px-3 md:px-6 py-3 md:py-4">
          <div className="w-full max-w-none px-2 md:px-4 flex items-center justify-between">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden mr-2 md:mr-4 h-9 w-9 p-0"
            >
              <Menu className="w-5 h-5 md:w-4 md:h-4" />
            </Button>

            <div className="flex items-center space-x-2 md:space-x-4 flex-1">
              <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
                <Image
                  src={carer.photo}
                  alt={carer.name}
                  fill
                  className="rounded-full object-cover shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      carer.name
                    )}&background=8b5cf6&color=fff&size=64`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  Chat with {carer.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 truncate">
                  {carer.experience}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="fixed top-0 left-0 right-0 bottom-0 pt-20 lg:left-64">
          <div className="w-full h-full">
            <div className="h-full flex flex-col">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 md:py-8 space-y-4 md:space-y-6 pb-32 md:pb-40">
                {messages.map((message) => (
                  <div key={message.id}>
                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[90%] md:max-w-[85%] ${
                          message.type === "user"
                            ? "flex-row-reverse space-x-reverse"
                            : ""
                        }`}
                      >
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          {message.type === "user" ? (
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <div className="relative w-8 h-8">
                              <Image
                                src={carer.photo}
                                alt={carer.name}
                                fill
                                className="rounded-full object-cover shadow-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    carer.name
                                  )}&background=8b5cf6&color=fff&size=32`;
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Message Content */}
                        <div
                          className={`rounded-2xl px-4 py-3 shadow-lg ${
                            message.type === "user"
                              ? "bg-white border border-gray-200/50 text-gray-900"
                              : "backdrop-blur-md bg-white/70 border border-gray-200/50 text-gray-900"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {message.content}
                          </p>
                          <p className="text-xs mt-2 text-gray-500">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Job Request Card */}
                    {message.jobRequest && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-end"
                      >
                        <div className="max-w-[90%] md:max-w-[85%]">
                          <JobRequestCard jobRequest={message.jobRequest} />
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Fixed to bottom */}
              <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 border-t border-purple-200/30 p-3 md:p-6 z-50 lg:left-64">
                <div className="flex items-end space-x-2 md:space-x-3">
                  <div className="flex-1 relative">
                    <Textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        autoResizeTextarea();
                      }}
                      placeholder="Type your message..."
                      className="w-full backdrop-blur-md bg-white/70 border-purple-200/50 focus:border-purple-400 focus:ring-purple-300 rounded-xl pl-3 md:pl-4 pr-3 md:pr-4 py-3 md:py-2 shadow-sm resize-none min-h-[48px] md:min-h-[44px] max-h-48 overflow-hidden text-sm md:text-base"
                      onKeyDown={(e) =>
                        e.key === "Enter" && !e.shiftKey && handleSendMessage()
                      }
                    />
                  </div>
                  <Button
                    onClick={() => setIsJobDialogOpen(true)}
                    variant="outline"
                    className="backdrop-blur-md bg-white/70 border-purple-200/50 text-purple-600 hover:bg-purple-50 h-12 px-4"
                  >
                    Job Request
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg h-12 px-4 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Request Dialog */}
        <JobRequestDialog
          isOpen={isJobDialogOpen}
          onClose={() => setIsJobDialogOpen(false)}
          onSubmit={handleJobRequest}
        />
      </div>
    </div>
  );
}

export default function ChatWithPage() {
  return (
    <div className="min-h-screen relative">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="text-gray-600">Loading Chat...</span>
            </div>
          </div>
        }
      >
        <ChatWithPageContent />
      </Suspense>
    </div>
  );
}