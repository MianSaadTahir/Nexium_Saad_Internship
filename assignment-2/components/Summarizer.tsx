"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Summarizer() {
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [summary, setSummary] = useState("");
    const [urdu, setUrdu] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState<"success" | "error" | "">("");


    const handleSummarize = async () => {
        setLoading(true);

        try {
            // Step 1: Scrape
            const scrapeRes = await fetch("/api/scrape", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });
            const scraped = await scrapeRes.json();
            setContent(scraped.content);
            setTitle(scraped.title);
            // Step 2: Summarize
            const summaryRes = await fetch("/api/summarize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: scraped.content }),
            });
            const summarized = await summaryRes.json();
            setSummary(summarized.summary);

            // Step 3: Translate
            const urduRes = await fetch("/api/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ summary: summarized.summary }),
            });
            const translated = await urduRes.json();
            setUrdu(translated.urdu);
        } catch (err) {
            console.error("Error:", err);
        }

        setLoading(false);
    };
    const handleSaveToMongo = async () => {
        try {
            const res = await fetch("/api/save-mongo", {
                method: "POST",
                body: JSON.stringify({ url, title, content }),
            });

            const result = await res.json();
            if (res.ok) {
                console.log("Mongo save success:", result.message);
                setStatusMessage("✅ Content saved to MongoDB");
                setStatusType("success");
            } else {
                console.error("Mongo save failed:", result.error);
                setStatusMessage("❌ Failed to save");
                setStatusType("error");
            }
        } catch (err) {
            console.error("Error saving to MongoDB:", err);
            setStatusMessage("❌ MongoDB error");
            setStatusType("error");
        }
    };

    const handleSaveToSupabase = async () => {
        try {
            const res = await fetch("/api/save-supabase", {
                method: "POST",
                body: JSON.stringify({ url, title, summary }),
            });

            const result = await res.json();
            if (res.ok) {
                console.log("Supabase save success:", result.message);
                setStatusMessage("✅ Summary saved to Supabase");
                setStatusType("success");
            } else {
                console.error("Supabase save failed:", result.error);
                setStatusMessage("❌ Failed to save");
                setStatusType("error");
            }
        } catch (err) {
            console.error("Error saving to Supabase:", err);
            setStatusMessage("❌ Supabase error");
            setStatusType("error");
        }
    };



    return (
        <div className="max-w-3xl p-4 mx-auto space-y-6">
            <Card>
                <CardContent className="p-4 space-y-2">
                    <h1 className="heading-title">Blog Summarizer</h1>
                    <Input
                        placeholder="Enter blog URL..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="!text-base mb-4"
                    />
                    <div className="flex justify-center">
                        <Button onClick={handleSummarize} disabled={loading} className="btn-primary ">
                            {loading ? "Processing..." : "Summarize"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {content && (
                <Card>
                    <CardContent className="p-4">
                        <h2 className="sub-heading">Content</h2>
                        <Textarea readOnly value={content} className="h-48 overflow-y-auto !text-base resize-none" />
                    </CardContent>
                </Card>
            )}

            {summary && (
                <Card>
                    <CardContent className="p-4">
                        <h2 className="sub-heading">Summary</h2>
                        <Textarea readOnly value={summary} className="h-40 overflow-y-auto resize-none !text-base" />
                    </CardContent>
                </Card>
            )}

            {urdu && (
                <Card>
                    <CardContent className="p-4">
                        <h2 className="sub-heading">Translation</h2>
                        <Textarea readOnly value={urdu} className="h-40 overflow-y-auto resize-none !text-base" />
                    </CardContent>
                </Card>
            )}
            {summary && (
                <div className="flex flex-col items-center gap-2">
                    {statusMessage && (
                        <p
                            className={`text-sm ${statusType === "success" ? "text-green-600" : "text-red-500 "
                                }`}
                        >
                            {statusMessage}
                        </p>
                    )}

                    <div className="flex justify-center gap-4">
                        <Button onClick={handleSaveToMongo} className="btn-primary">
                            Save Blog
                        </Button>
                        <Button onClick={handleSaveToSupabase} className="btn-primary">
                            Save Summary
                        </Button>
                    </div>
                </div>
            )}

        </div>
    );
}
