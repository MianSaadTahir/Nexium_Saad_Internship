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
                alert("Saved full blog content to MongoDB");
            } else {
                console.error("Mongo save failed:", result.error);
                alert("Failed to save to MongoDB");
            }
        } catch (err) {
            console.error("Error saving to MongoDB:", err);
            alert("Mongo save error");
        }
    };

    const handleSaveToSupabase = async () => {
        try {
            const res = await fetch("/api/save-supabase", {
                method: "POST",
                body: JSON.stringify({ url, title, summary }), // Urdu NOT included
            });

            const result = await res.json();
            if (res.ok) {
                console.log("Supabase save success:", result.message);
                alert("Saved summary to Supabase");
            } else {
                console.error("Supabase save failed:", result.error);
                alert("Failed to save to Supabase");
            }
        } catch (err) {
            console.error("Error saving to Supabase:", err);
            alert("Supabase save error");
        }
    };


    return (
        <div className="max-w-3xl mx-auto space-y-6 p-4">
            <Card>
                <CardContent className="p-4 space-y-2">
                    <Input
                        placeholder="Enter blog URL..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button onClick={handleSummarize} disabled={loading}>
                        {loading ? "Processing..." : "Summarize"}
                    </Button>
                </CardContent>
            </Card>

            {content && (
                <Card>
                    <CardContent className="p-4">
                        <h2 className="font-bold mb-2">Scraped Content</h2>
                        <Textarea readOnly value={content} className="h-48" />
                    </CardContent>
                </Card>
            )}

            {summary && (
                <Card>
                    <CardContent className="p-4">
                        <h2 className="font-bold mb-2">AI Summary</h2>
                        <Textarea readOnly value={summary} className="h-32" />
                    </CardContent>
                </Card>
            )}

            {urdu && (
                <Card>
                    <CardContent className="p-4">
                        <h2 className="font-bold mb-2">Urdu Translation</h2>
                        <Textarea readOnly value={urdu} className="h-32" />
                    </CardContent>
                </Card>
            )}
            {summary && (
                <div className="flex gap-4 justify-center">
                    <Button onClick={handleSaveToMongo}>Save Blog to MongoDB</Button>
                    <Button onClick={handleSaveToSupabase}>Save Summary to Supabase</Button>
                </div>
            )}
        </div>
    );
}
