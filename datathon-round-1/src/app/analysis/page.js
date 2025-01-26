"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

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
      const response = await fetch("/api/analyze-policy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ policyText: text }),
      });

      if (!response.ok) {
        console.error(response.body);
        throw new Error("Failed to analyze policy");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
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
