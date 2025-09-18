import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { mockCarers, CarerProfile } from "@/lib/mock-data/carers";
import { GeminiResponse, responseSchema } from "@/lib/service/gemini";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    const response = await getAIResponse(message, conversationHistory);
    const rawText = response.text;
    console.log("Raw AI response:", rawText);
    const parsed: GeminiResponse = JSON.parse(rawText!);
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

const get_prompt = (message: string, candidates: CarerProfile[]) => {
  return `You are a professional healthcare and aged care agent. Your task is to recommend at MOST 3 caregivers based on a specific care request.
Follow these strict rules for your response:
Use information VERBATIM from the provided candidate data, do not fabricate details, giving fewer than 3 caregivers are ok.
Be concise: Only provide the requested information. Do not add any conversational text, greetings, or explanations before or after the JSON.
Format: Return your response as a single, valid JSON array. Do not add any extra characters, formatting, or text outside of the JSON.
Structure: Each object in the array must have the following keys and data types:
id: number (the unique identifier of the Provided Carer (FROM 1 to 5))
matchScore: number (from 1 to 100)
reasoning: string[] (an array of strings, with each string being a concise bullet point. Each bullet point must be a direct attribute of the caregiver that matches the care request. Do not provide explanations or qualifiers. For example, instead of "- Speaks Hindi, which matches the language requirement," use "- Speaks Hindi.")
Care Request:
${message}
Candidate Data:
${candidates.map((carer) => JSON.stringify(carer)).join("\n")}`;
};

async function getAIResponse(message: string, conversationHistory: any[]) {
  const prompt = get_prompt(message, mockCarers);
  console.log("Generated prompt:", prompt);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });
  console.log(response.text);
  return response;
}
