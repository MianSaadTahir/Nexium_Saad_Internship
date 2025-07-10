// app/api/save-mongo/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function POST(req: Request) {
    try {
        const { url, title, content } = await req.json();

        if (!url || !title || !content) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('assignment-2');

        await db.collection('blogs').insertOne({
            url,
            title,
            content,
            createdAt: new Date(),
        });

        return NextResponse.json({ message: 'Blog saved to MongoDB' });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }

}
