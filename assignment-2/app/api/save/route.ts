// app/api/save/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { url, title, summary, urdu } = await req.json();

        if (!url || !title || !summary || !urdu) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const { error } = await supabase.from('summaries').insert([{ url, title, summary, urdu }]);

        if (error) {
            console.error(error);
            return NextResponse.json({ error: 'Failed to save summary' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Summary saved successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
    }
}
