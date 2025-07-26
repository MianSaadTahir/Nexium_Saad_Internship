"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { allQuotes } from "@/lib/quotes";
import { motion } from "framer-motion";

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [submittedTopic, setSubmittedTopic] = useState("");

  const handleSubmit = () => {
    const trimmed = topic.trim().toLowerCase();
    const quotesForTopic = allQuotes[trimmed];

    if (!quotesForTopic) {
      setQuotes(["No quotes found for this topic."]);
    } else {
      const shuffled = [...quotesForTopic].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setQuotes(selected);
    }

    setSubmittedTopic(trimmed);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Quote Generator</h1>

        <div className="space-y-2">
          <label htmlFor="topic" className="text-sm font-medium">
            Topic
          </label>
          <Input
            id="topic"
            placeholder="e.g., motivation, discipline, creativity"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            What’s on your mind today?
          </p>
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!topic.trim()}
        >
          Generate
        </Button>

        <ul key={submittedTopic} className="pt-4 space-y-2">
          {quotes.map((quote, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="text-gray-600 italic text-sm border-l-4 border-gray-300 pl-3"
            >
              “{quote}”
            </motion.li>
          ))}
        </ul>
      </div>
    </main>
  );
}
