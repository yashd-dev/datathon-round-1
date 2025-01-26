import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { policyText } = await request.json();

    if (!policyText || typeof policyText !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid or missing policy text." },
        { status: 400 }
      );
    }

    console.log("Received policy text:", policyText.substring(0, 100) + "...");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Analyze the following insurance policy text and provide a comprehensive breakdown:

${policyText}

Please provide the following in your analysis:
1. Policy Overview: Summarize the key points of the policy in 2-3 sentences.
2. Coverage Details: List the main areas of coverage and any notable exclusions.
3. Deductibles and Limits: Highlight any deductibles, coverage limits, or out-of-pocket maximums.
4. Special Conditions: Identify any special conditions, waiting periods, or requirements for coverage.
5. Potential Pitfalls: Point out any clauses or conditions that could potentially lead to denied claims or reduced coverage.
6. Recommendations: Suggest areas where the policyholder might want to seek clarification or consider additional coverage.

Present this information in a clear, easy-to-understand format, using markdown for structure. Use headers, bullet points, and emphasis where appropriate. Avoid insurance jargon where possible. If there are any particularly complex or unusual terms, please explain them.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    console.log("Generated analysis:", analysisText.substring(0, 100) + "...");

    return NextResponse.json({
      success: true,
      analysis: analysisText,
    });
  } catch (error) {
    console.error("Error analyzing policy:", error.message || error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "An error occurred while analyzing the policy",
      },
      { status: 500 }
    );
  }
}
