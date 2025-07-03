"use client";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);

  const allQuotes: { [key: string]: string[] } = {
    motivation: [
      "Push yourself, because no one else is going to do it for you.",
      "Don’t watch the clock; do what it does. Keep going.",
      "Great things never come from comfort zones.",
    ],
    success: [
      "Success is not in what you have, but who you are.",
      "The road to success is always under construction.",
      "Success is walking from failure to failure with no loss of enthusiasm.",
    ],
  };

  const handleSubmit = () => {
    const q = allQuotes[topic.toLowerCase()] || ["No quotes found for this topic."];
    setQuotes(q);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">Quote Generator</h1>

      <Input
        placeholder="Enter a topic like motivation or success"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <Button onClick={handleSubmit}>Generate Quotes</Button>

      <ul className="mt-6 space-y-2">
        {quotes.map((quote, idx) => (
          <li key={idx} className="text-center text-lg text-muted-foreground">
            “{quote}”
          </li>
        ))}
      </ul>
    </main>
  );
}
