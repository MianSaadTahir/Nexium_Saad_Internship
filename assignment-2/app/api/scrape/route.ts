import { NextResponse } from 'next/server';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import clientPromise from '@/lib/mongo';

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        const response = await fetch(url);
        if (!response.ok) {
            return NextResponse.json({ error: `Failed to fetch URL. Status: ${response.status}` }, { status: response.status });
        }

        const html = await response.text();
        const dom = new JSDOM(html, { url });
        const reader = new Readability(dom.window.document);
        const article = reader.parse();

        if (!article) {
            return NextResponse.json({ error: 'Could not parse article' }, { status: 500 });
        }

        // Save to MongoDB
        const client = await clientPromise;
        const db = client.db('assignment-2');
        await db.collection('blogs').insertOne({
            url,
            title: article.title,
            content: article.textContent,
            createdAt: new Date(),
        });

        return NextResponse.json({
            title: article.title,
            content: article.textContent,
            message: 'Blog saved to MongoDB',
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
    }
}
