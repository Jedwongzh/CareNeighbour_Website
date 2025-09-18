import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

interface CarerRecommendation {
  id: number;
  name: string;
  photo: string;
  rating: number;
  experience: string;
  distance: string;
  hourlyRate: number;
  bio: string;
  languages: string[];
  skills: string[];
  availability: string;
}
interface GeminiRecommendation {
  id: number;
  matchScore: number;
  reasonings: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    const response = await getAIResponse(message, conversationHistory);
    const rawText = response.text;
    console.log("Raw AI response:", rawText);
    const parsed: { candidates: GeminiRecommendation[] } = JSON.parse(rawText!);
    console.log("Parsed AI response:", parsed);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Chat API is running" });
}

const get_prompt = (message: string, candidates: CarerRecommendation[]) => {
  return `You are a professional healthcare and aged care agent. Your task is to recommend at MOST 3 caregivers based on a specific care request.
Follow these strict rules for your response:
Use information VERBATIM from the provided candidate data, do not fabricate details, giving fewer than 3 caregivers are ok.
Be concise: Only provide the requested information. Do not add any conversational text, greetings, or explanations before or after the JSON.
Format: Return your response as a single, valid JSON array. Do not add any extra characters, formatting, or text outside of the JSON.
Structure: Each object in the array must have the following keys and data types:
id: number (the unique identifier of the Provided Carer (FROM 1 to 5))
matchScore: number (from 1 to 100)
reasoning: string[] (an array of strings, with each string being a concise bullet point)
Care Request:
${message}
Candidate Data:
${candidates.map((carer) => JSON.stringify(carer)).join("\n")}`;
};

async function getAIResponse(message: string, conversationHistory: any[]) {
  const prompt = get_prompt(message, sampleCarers);
  console.log("Generated prompt:", prompt);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: get_prompt(message, sampleCarers),
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        candidates: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: {
                type: Type.NUMBER,
                enum: sampleCarers.map((carer) => carer.id),
              },
              matchScore: { type: Type.NUMBER },
              reasoning: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
          },
        },
      },
    },
  });
  console.log(response.text);
  return response;
}

// Sample carer data
const sampleCarers: CarerRecommendation[] = [
  {
    id: 1,
    name: "Sarah Thompson",
    photo: "/images/caregivers/sarah.jpg",
    rating: 4.9,
    experience: "7+ years in aged care",
    distance: "1.2 miles away",
    hourlyRate: 28,
    bio: "Certified nurse assistant specializing in medication management and personal care.",
    languages: ["English", "Spanish"],
    skills: [
      "Medication Management",
      "Personal Care",
      "Meal Preparation",
      "Mobility Assistance",
    ],
    availability: "Available immediately",
  },
  {
    id: 2,
    name: "Michael Reed",
    photo: "/images/caregivers/michael.jpg",
    rating: 4.7,
    experience: "5+ years specializing in medical care",
    distance: "2.1 miles away",
    hourlyRate: 32,
    bio: "Licensed practical nurse with expertise in post-surgical care and rehabilitation.",
    languages: ["English", "French"],
    skills: [
      "Medical Care",
      "Physical Therapy",
      "Wound Care",
      "Rehabilitation Support",
    ],
    availability: "Available weekdays",
  },
  {
    id: 3,
    name: "Emily Johnson",
    photo: "/images/caregivers/emily.jpg",
    rating: 4.8,
    experience: "6+ years in dementia care",
    distance: "1.8 miles away",
    hourlyRate: 30,
    bio: "Specialized in dementia and Alzheimer's care with patience and compassion.",
    languages: ["English"],
    skills: [
      "Dementia Care",
      "Behavioral Support",
      "Memory Activities",
      "Family Communication",
    ],
    availability: "Flexible schedule",
  },
  {
    id: 4,
    name: "David Chen",
    photo: "/images/caregivers/david.jpg",
    rating: 4.6,
    experience: "4+ years in disability support",
    distance: "2.8 miles away",
    hourlyRate: 26,
    bio: "Compassionate caregiver specializing in disability support and independent living assistance.",
    languages: ["English", "Mandarin"],
    skills: [
      "Disability Support",
      "Independent Living",
      "Transportation",
      "Social Activities",
    ],
    availability: "Monday to Friday",
  },
  {
    id: 5,
    name: "Priya Patel",
    photo: "/images/caregivers/priya.jpg",
    rating: 4.8,
    experience: "6+ years in palliative care",
    distance: "2.2 miles away",
    hourlyRate: 29,
    bio: "Compassionate palliative care specialist with expertise in end-of-life support and family counseling.",
    languages: ["English", "Hindi", "Gujarati"],
    skills: [
      "Palliative Care",
      "Pain Management",
      "Family Support",
      "Spiritual Care",
    ],
    availability: "Available 6 days a week",
  },
];
