import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Updated list based on confirmed available models in May 2026 environment
    const modelsToTry = [
      "gemini-3.1-flash-lite", // Confirmed working in test
      "gemini-3.5-flash", 
      "gemini-3.1-pro",
      "gemini-1.5-flash",
      "gemini-2.0-flash"
    ];
    let lastError: any = null;
    let text = "";

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting Gemini model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: `You are the AI Coach for "Learn to Leader", a gamified mobile app for Latin American youth. 
          Your goal is to help users with employability, digital business, CV optimization, and professional soft skills.
          Keep your tone encouraging, professional, and concise. 
          The current user language is ${language === 'es' ? 'Spanish' : language === 'pt' ? 'Portuguese' : 'English'}. 
          Always respond in that language. 
          Avoid long paragraphs; use bullet points when helpful.`
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        text = response.text();
        
        if (text) {
          console.log(`Success with model: ${modelName}`);
          break; 
        }
      } catch (err: any) {
        console.error(`Model ${modelName} failed:`, err.message || err);
        lastError = err;
        continue;
      }
    }

    if (!text && lastError) {
      console.error("All Gemini models failed. Last error:", lastError);
      return NextResponse.json(
        { error: `AI service unavailable: ${lastError.message || "Unknown error"}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI response" },
      { status: 500 }
    );
  }
}
