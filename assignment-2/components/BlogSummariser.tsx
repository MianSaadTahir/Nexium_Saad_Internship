"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BlogSummariser() {
    const [url, setUrl] = useState("");

    const handleSummarise = () => {
        console.log("Submitted URL:", url);
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
            </div>
        </main>
    );
}
