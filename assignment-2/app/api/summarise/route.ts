import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        if (!content) {
            return NextResponse.json({ error: 'Content is required' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

        const result = await model.generateContent(
            `Summarize the following blog in 4-5 lines:\n\n${content}`
        );

        const response = await result.response;
        const summary = response.text();

        return NextResponse.json({ summary });
    } catch (error: any) {
        console.error('Error in Gemini summariser:', error.message || error);
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
