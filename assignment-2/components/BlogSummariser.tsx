"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { dummyBlogs, summarizeBlog } from "@/lib/blog";

export default function BlogSummariser() {
    const [url, setUrl] = useState("");
    const [originalBlog, setOriginalBlog] = useState("");
    const [summary, setSummary] = useState("");


    const handleSummarise = async () => {
        console.log("Submitted URL:", url);

        try {
            const res = await fetch(url);
            const html = await res.text(); // ✅ Don't use .json()

            // Simulate content scraping
            const text = html
                .match(/<p[^>]*>(.*?)<\/p>/g)
                ?.map((tag) => tag.replace(/<[^>]+>/g, "").trim())
                .slice(0, 5)
                .join(" ") || "No content found.";

            setOriginalBlog(text);

            // Simulate summary logic
            const fakeSummary = [
                "✅ AI is transforming the cloud with agents.",
                "✅ Agentic workflows simplify automation.",
                "✅ The blog explains real-world examples."
            ].join("\n");

            setSummary(fakeSummary);
        } catch (error) {
            console.error("❌ Failed to fetch blog:", error);
            setOriginalBlog("⚠️ Error fetching the blog.");
            setSummary("");
        }
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
