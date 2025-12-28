
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// --- Text Consultation ---
export const getStudyGuideResponse = async (messages: {role: string, text: string}[], systemInstruction: string) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
  });

  const result = await chat.sendMessage({ message: messages[messages.length - 1].text });
  return result.text || "I'm sorry, I couldn't process that.";
};

// --- Scholarship Search with Grounding ---
export const searchScholarships = async (filters: { country: string, course: string, eligibility: string }): Promise<{ text: string, urls: string[] }> => {
  const ai = getAIClient();
  const prompt = `Find 5 active scholarships for Indian students with these criteria:
    Country: ${filters.country || 'Any'}
    Course/Field: ${filters.course || 'Any'}
    Other Criteria: ${filters.eligibility || 'None'}

    Provide the following for each in a list:
    1. Name of Scholarship
    2. Provider/Organization
    3. Award Amount (in local currency or INR)
    4. Application Deadline (if available, else 'Check website')
    5. Brief eligibility summary

    Ensure you use Google Search to find real, currently active opportunities for the 2024-2025 or 2025-2026 academic years.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text || "No scholarship details were found for your query.";
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  const urls: string[] = (groundingChunks as any[])
    .map((chunk: any) => chunk.web?.uri)
    .filter((uri: any): uri is string => !!uri && typeof uri === 'string');

  return { text, urls: Array.from(new Set(urls)) };
};

// --- SOP & LOR Deep Analysis ---
export const analyzeSOPLOR = async (text: string, type: 'SOP' | 'LOR') => {
  const ai = getAIClient();
  const prompt = `Act as an expert Admissions Officer for top global universities. 
  Analyze the following ${type} written by an Indian student.
  
  Student's Draft:
  """
  ${text}
  """
  
  Please provide:
  1. A structure review (Check for logical flow).
  2. Line-by-line improvements for 3-5 key sections.
  3. Guidance on tone (Is it too humble? Too flowery? Too formal?).
  4. Specific tips for Indian students (e.g., avoid over-explaining family background, focus on quantifiable achievements).
  
  Provide your response in clear Markdown with headers.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', // Using Pro for deeper reasoning on writing
    contents: prompt,
  });

  return response.text || "Failed to analyze document.";
};
