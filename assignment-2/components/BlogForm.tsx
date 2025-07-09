// components/BlogForm.tsx
'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BlogForm({ onSubmit }: { onSubmit: (url: string) => void }) {
    const [url, setUrl] = useState("");

    const handleSubmit = () => {
        if (url.trim()) {
            onSubmit(url);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto p-6">
            <Input
                placeholder="Enter blog URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={handleSubmit}>Summarize Blog</Button>
        </div>
    );
}
