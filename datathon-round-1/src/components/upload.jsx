"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://datathon-backend.mpst.me/", {
        mode: "no-cors",
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { data } = await response.json();
        localStorage.setItem("chatContext", data.text);
        router.push("/analysis");
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Upload PDF for Context
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <Button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full"
        >
          {loading ? "Uploading..." : "Upload and Set Context"}
        </Button>
      </CardContent>
    </Card>
  );
}
