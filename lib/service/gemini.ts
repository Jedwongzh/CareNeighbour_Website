import { Type } from "@google/genai";
import { getAllCarerIds } from "../mock-data/carers";

export type GeminiResponse = GeminiRecommendation[];

export interface GeminiRecommendation {
  id: number;
  matchScore: number;
  reasoning: string[];
}

export const responseSchema = {
  candidates: {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: {
          type: Type.NUMBER,
          enum: getAllCarerIds(),
        },
        matchScore: { type: Type.NUMBER },
        reasoning: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    },
  },
};
