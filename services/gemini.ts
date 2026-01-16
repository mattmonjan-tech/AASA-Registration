
import { GoogleGenAI } from "@google/genai";

export const editImageWithGemini = async (base64Image: string, prompt: string): Promise<string> => {
  // Initialize SDK directly in the browser using injected API_KEY
  const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
  
  // Strip base64 prefix if present
  const base64Data = base64Image.includes('base64,') ? base64Image.split('base64,')[1] : base64Image;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/png',
            },
          },
          {
            text: `Professionally enhance this Nashville-themed photo to have a high-end leadership breakfast aesthetic: ${prompt}`,
          },
        ],
      },
    });

    let imageUrl = '';
    const candidates = response.candidates || [];
    if (candidates.length > 0 && candidates[0].content && candidates[0].content.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("The AI didn't return an image part. It might have responded with text instead.");
    }

    return imageUrl;
  } catch (error: any) {
    console.error('Gemini SDK Error:', error);
    throw new Error(error.message || 'Failed to process image with AI');
  }
};
