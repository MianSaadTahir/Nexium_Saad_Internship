"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BlogSummariser() {
    const [url, setUrl] = useState("");
    const [originalBlog, setOriginalBlog] = useState("");
    const [summary, setSummary] = useState("");



    const handleSummarise = () => {
        console.log("Submitted URL:", url);

        // Simulated blog content
        const fakeBlog = `
          Artificial Intelligence (AI) is transforming industries worldwide.
          From healthcare to finance, AI is enabling faster, smarter decisions.
          With machine learning and deep learning, systems can now learn patterns,
          predict outcomes, and automate tasks with high efficiency.
        `;

        setOriginalBlog(fakeBlog);
        // Simulate summary logic (3 key points)
        const fakeSummary = [
            "✅ AI is revolutionizing many industries.",
            "✅ It helps in making smarter, faster decisions.",
            "✅ Machine learning allows systems to automate and learn patterns."
        ].join("\n");

        setSummary(fakeSummary);
    };


    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4">
                <h1 className="text-2xl font-semibold text-center">Blog Summariser</h1>
                <Input
                    placeholder="Enter blog URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button onClick={handleSummarise} disabled={!url.trim()}>
                    Summarise Blog
                </Button>
                {originalBlog && (
                    <div className="mt-6 bg-gray-100 p-4 rounded-md text-sm">
                        <h2 className="text-lg font-medium mb-2">Original Blog Content</h2>
                        <p className="text-gray-700 whitespace-pre-line">{originalBlog}</p>
                    </div>
                )}
                {summary && (
                    <div className="mt-6 bg-green-50 p-4 rounded-md text-sm border border-green-200">
                        <h2 className="text-lg font-semibold text-green-800 mb-2">AI Summary</h2>
                        <p className="text-green-900 whitespace-pre-line">{summary}</p>
                    </div>
                )}


            </div>
        </main>
    );
}
