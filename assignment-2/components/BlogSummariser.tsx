"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Globe, Clock, Brain, Languages, Database } from "lucide-react";

interface SummaryData {
  url: string;
  title: string;
  author?: string;
  publishedDate?: string;
  originalContent: string;
  summary: {
    english: string;
    urdu: string;
    keyPoints: string[];
    readingTime: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  };
  metadata: {
    description?: string;
    keywords?: string;
    domain: string;
    wordCount: number;
  };
}

export default function BlogSummariser() {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showUrdu, setShowUrdu] = useState(false);

    const handleSummarise = async () => {
        if (!url.trim()) return;

        setIsLoading(true);
        setError(null);
        setSummaryData(null);

        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url.trim() }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to summarize blog');
            }

            setSummaryData(result.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return 'positive';
            case 'negative': return 'negative';
            default: return 'neutral';
        }
    };

    const getSentimentEmoji = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return '😊';
            case 'negative': return '😞';
            default: return '😐';
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🤖 Blog Summariser
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Transform any blog post into concise summaries with AI-powered analysis, 
                        Urdu translation, and intelligent data storage.
                    </p>
                </div>

                {/* Input Section */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Enter Blog URL
                        </CardTitle>
                        <CardDescription>
                            Paste the URL of any blog post to get an instant AI summary
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="https://example.com/blog-post"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="flex-1"
                                disabled={isLoading}
                            />
                            <Button 
                                onClick={handleSummarise} 
                                disabled={!url.trim() || isLoading}
                                className="whitespace-nowrap"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Brain className="h-4 w-4 mr-2" />
                                        Summarise Blog
                                    </>
                                )}
                            </Button>
                        </div>
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-800 text-sm">{error}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Results Section */}
                {summaryData && (
                    <div className="space-y-6">
                        {/* Blog Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">{summaryData.title}</CardTitle>
                                <CardDescription className="space-y-2">
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <Badge variant="outline">{summaryData.metadata.domain}</Badge>
                                        {summaryData.author && (
                                            <Badge variant="secondary">👤 {summaryData.author}</Badge>
                                        )}
                                        <Badge variant="outline" className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {summaryData.summary.readingTime} min read
                                        </Badge>
                                        <Badge variant={getSentimentColor(summaryData.summary.sentiment)}>
                                            {getSentimentEmoji(summaryData.summary.sentiment)} {summaryData.summary.sentiment}
                                        </Badge>
                                    </div>
                                    {summaryData.publishedDate && (
                                        <p className="text-sm">
                                            Published: {new Date(summaryData.publishedDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-gray-600">
                                    <p><strong>Word Count:</strong> {summaryData.metadata.wordCount}</p>
                                    {summaryData.metadata.description && (
                                        <p className="mt-2"><strong>Description:</strong> {summaryData.metadata.description}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI Summary */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Brain className="h-5 w-5" />
                                        AI Summary
                                    </CardTitle>
                                    <div className="flex gap-2">
                                        <Button
                                            variant={!showUrdu ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setShowUrdu(false)}
                                        >
                                            English
                                        </Button>
                                        <Button
                                            variant={showUrdu ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setShowUrdu(true)}
                                            className="flex items-center gap-1"
                                        >
                                            <Languages className="h-4 w-4" />
                                            اردو
                                        </Button>
                                    </div>
                                </div>
                                <CardDescription>
                                    Key insights extracted using AI analysis
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <pre className="whitespace-pre-wrap text-green-900 font-medium">
                                        {showUrdu ? summaryData.summary.urdu : summaryData.summary.english}
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Original Content */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5" />
                                    Original Content
                                </CardTitle>
                                <CardDescription>
                                    Full blog content (saved to MongoDB)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={summaryData.originalContent}
                                    readOnly
                                    className="min-h-[200px] resize-none bg-gray-50"
                                />
                            </CardContent>
                        </Card>

                        {/* Features Badge */}
                        <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                            <CardContent className="pt-6">
                                <div className="text-center space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        ✨ Features Included
                                    </h3>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <Badge variant="outline">🌐 Web Scraping</Badge>
                                        <Badge variant="outline">🤖 AI Analysis</Badge>
                                        <Badge variant="outline">🔤 Urdu Translation</Badge>
                                        <Badge variant="outline">📊 Supabase Storage</Badge>
                                        <Badge variant="outline">🗄️ MongoDB Storage</Badge>
                                        <Badge variant="outline">😊 Sentiment Analysis</Badge>
                                        <Badge variant="outline">⏱️ Reading Time</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Demo Instructions */}
                {!summaryData && !isLoading && (
                    <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-900">🚀 How to Use</CardTitle>
                        </CardHeader>
                        <CardContent className="text-blue-800">
                            <ol className="list-decimal list-inside space-y-2">
                                <li>Enter any blog URL in the input field above</li>
                                <li>Click "Summarise Blog" to start the AI analysis</li>
                                <li>View the AI-generated summary in both English and Urdu</li>
                                <li>See the original content and metadata</li>
                                <li>Data is automatically saved to Supabase (summary) and MongoDB (full content)</li>
                            </ol>
                            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
                                <p className="text-yellow-800 text-sm">
                                    <strong>Demo Mode:</strong> If the URL fails to load, a demo blog post about AI will be used to showcase all features.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}
