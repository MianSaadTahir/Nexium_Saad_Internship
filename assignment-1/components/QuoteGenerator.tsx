"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { allQuotes } from "@/lib/quotes";
import { motion } from "framer-motion";
import { ClipboardCopy, Check } from "lucide-react";

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
    <main className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Quotivate</h1>
          <p className="text-sm text-gray-500">
            Let your mind spark inspiration
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-center text-gray-700">
            What kind of boost do you need today?
          </p>

          <div className="flex flex-wrap justify-center gap-2">
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
        </div>

        <div className="space-y-2">
          <label htmlFor="topic" className="text-sm font-medium text-gray-700">
            Enter a topic or select from above
          </label>
          <Input
            id="topic"
            placeholder="e.g, Wisdom, Growth, Joy"
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
      </div>
      <div className="mt-6 w-full max-w-3xl space-y-4 mb-6">
        {quotes.length === 0 && (
          <p className="text-center text-gray-400 text-sm italic">
            💡 A few words can change your day{" "}
          </p>
        )}
        {quotes.map((quote, idx) => (
          <motion.div
            key={`${generationId}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.5,
              ease: "easeOut",
            }}
            className=" card-hover relative bg-white rounded-lg shadow-md p-6 border-l-4"
          >
            <p className="text-lg font-medium text-gray-800 italic pr-7">
              “{quote}”
            </p>

            <div className="absolute top-4 right-4 group">
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(quote);
                  setCopiedIndex(idx);
                  setTimeout(() => setCopiedIndex(null), 3000);
                }}
                className="p-2 cursor-pointer rounded-full hover:bg-gray-100 transition"
                aria-label="Copy quote"
              >
                {copiedIndex === idx ? (
                  <Check className="w-5 h-5 text-green-600 transition-transform duration-200 scale-110" />
                ) : (
                  <ClipboardCopy className="w-5 h-5 text-gray-500" />
                )}
              </button>

              <span className="absolute -top-8 right-1/2 translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-80 transition-opacity duration-200 delay-500 pointer-events-none z-10 whitespace-nowrap">
                {copiedIndex === idx ? "Copied" : "Copy"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
