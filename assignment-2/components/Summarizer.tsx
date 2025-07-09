"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Summarizer() {
    const [url, setUrl] = useState("");
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
                body: JSON.stringify({ url }),
            });
            const scraped = await scrapeRes.json();
            setContent(scraped.content);

            // Step 2: Summarize
            const summaryRes = await fetch("/api/summarize", {
                method: "POST",
                body: JSON.stringify({ content: scraped.content }),
            });
            const summarized = await summaryRes.json();
            setSummary(summarized.summary);

            // Step 3: Translate
            const urduRes = await fetch("/api/translate", {
                method: "POST",
                body: JSON.stringify({ summary: summarized.summary }),
            });
            const translated = await urduRes.json();
            setUrdu(translated.urdu);
        } catch (err) {
            console.error("Error:", err);
        }

        setLoading(false);
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
        </div>
    );
}
