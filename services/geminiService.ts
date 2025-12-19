
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const improveArticleContent = async (title: string, content: string) => {
  if (!API_KEY) throw new Error("API Key is missing");

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional IT editor. Improve the following article. 
                 Make the title more catchy and professional. 
                 Fix grammar, improve style and flow of the content while keeping the original meaning.
                 
                 Input Title: ${title}
                 Input Content: ${content}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedTitle: { type: Type.STRING },
            improvedContent: { type: Type.STRING },
            suggestedSummary: { type: Type.STRING },
            suggestedTags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["improvedTitle", "improvedContent", "suggestedSummary", "suggestedTags"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Improvement Error:", error);
    throw error;
  }
};
