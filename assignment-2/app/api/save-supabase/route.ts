// app/api/save/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { url, title, summary } = await req.json();

        if (!url || !title || !summary) {
            return NextResponse.json({ error: 'URL, title, and summary are required' }, { status: 400 });
        }

        const { error } = await supabase.from('summaries').insert([{ url, title, summary }]);

        if (error) {
            console.error(error);
            return NextResponse.json({ error: 'Failed to save summary' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Summary saved successfully' });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }

}
