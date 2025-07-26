"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { allQuotes } from "@/lib/quotes";
import { motion } from "framer-motion";

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [, setSubmittedTopic] = useState("");
  const [generationId, setGenerationId] = useState(0);
  const topics = Object.keys(allQuotes);

  // Store shown quotes separately using useRef so it persists across renders
  const shownQuotesRef = useRef<{ [key: string]: Set<string> }>({});

  const handleSubmit = () => {
    const trimmed = topic.trim();
    const topicKey =
      trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    setGenerationId((prev) => prev + 1);

    const quotesForTopic = allQuotes[topicKey];
    if (!quotesForTopic) {
      setQuotes(["No quotes found for this topic."]);
      return;
    }

    // Initialize shown set for this topic if needed
    if (!shownQuotesRef.current[topicKey]) {
      shownQuotesRef.current[topicKey] = new Set();
    }

    const shownSet = shownQuotesRef.current[topicKey];
    const remaining = quotesForTopic.filter((q) => !shownSet.has(q));

    // If all quotes have been shown, reset
    if (remaining.length === 0) {
      shownSet.clear();
      remaining.push(...quotesForTopic);
    }

    const shuffled = [...remaining].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach((q) => shownSet.add(q));

    setQuotes(selected);
    setSubmittedTopic(topicKey);
  };

  const handleSubmitFromButton = (selectedTopic: string) => {
    setTopic(selectedTopic);
    const topicKey =
      selectedTopic.charAt(0).toUpperCase() +
      selectedTopic.slice(1).toLowerCase();
    setGenerationId((prev) => prev + 1);

    const quotesForTopic = allQuotes[topicKey];
    if (!quotesForTopic) {
      setQuotes(["No quotes found for this topic."]);
      return;
    }

    if (!shownQuotesRef.current[topicKey]) {
      shownQuotesRef.current[topicKey] = new Set();
    }

    const shownSet = shownQuotesRef.current[topicKey];
    const remaining = quotesForTopic.filter((q) => !shownSet.has(q));

    if (remaining.length === 0) {
      shownSet.clear();
      remaining.push(...quotesForTopic);
    }

    const shuffled = [...remaining].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach((q) => shownSet.add(q));

    setQuotes(selected);
    setSubmittedTopic(topicKey);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Quote Generator</h1>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTopic(t);
                handleSubmitFromButton(t);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium py-1 px-3 rounded transition"
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="topic" className="text-sm font-medium">
            What’s on your mind today?
          </label>
          <Input
            id="topic"
            placeholder="Enter a topic or select one from above"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!topic.trim()}
        >
          Generate
        </Button>

        <ul key={generationId} className="pt-4 space-y-2">
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
