import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        let text = "";
        $("p").each((_, el) => {
            text += $(el).text() + "\n";
        });

        return NextResponse.json({ content: text });
    } catch (error) {
        console.error("Scrape error:", error);
        return NextResponse.json({ error: "Failed to fetch or parse blog" }, { status: 500 });
    }
}
