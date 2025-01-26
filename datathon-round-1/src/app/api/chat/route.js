import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid or missing message input." },
        { status: 400 }
      );
    }

    console.log("Received message:", message);
    console.log("Received history:", history);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Ensure history is an array of valid chat messages
    const validHistory = Array.isArray(history) ? history : [];
    const chat = model.startChat({ parts: validHistory });

    const prompt = `You are an insurance expert specializing in Indian insurance policies and government schemes. ${message}`;

    const result = await chat.sendMessage(prompt);

    if (
      !result ||
      !result.response ||
      typeof result.response.text !== "function"
    ) {
      throw new Error("Invalid response format from Generative AI.");
    }

    const responseText = await result.response.text();

    console.log("Generated response:", responseText);

    return NextResponse.json({
      success: true,
      response: responseText,
    });
  } catch (error) {
    console.error("Error processing request:", error.message || error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
