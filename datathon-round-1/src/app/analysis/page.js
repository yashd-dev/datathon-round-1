"use client";

import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyCA6-6kBTdNl9jxxF_dpdzxtUt9mceIKqk");

export default function AnalysisPage() {
  const [policyText, setPolicyText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedContext = localStorage.getItem("chatContext");
    if (storedContext) {
      setPolicyText(storedContext);
      analyzePolicy(storedContext);
    } else {
      setLoading(false);
    }
  }, []);

  const analyzePolicy = async (text) => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Analyze the following insurance policy text and provide a comprehensive breakdown:

${text}

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
      setAnalysis(analysisText);
    } catch (error) {
      console.error("Error analyzing policy:", error);
      setAnalysis(
        "An error occurred while analyzing the policy. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-blue-500 text-white p-6">
          <CardTitle className="text-2xl font-bold">Policy Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : policyText ? (
            <div className="prose max-w-none">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No policy text found. Please upload a policy document first.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
