import { NextResponse } from 'next/server';

const dictionary: Record<string, string> = {
    "blogs": "بلاگز",
    "posts": "تحریریں",
    "are": "ہیں",
    "online": "آن لائن",
    "journals": "جرائد",
    "typically": "عام طور پر",
    "displayed": "دکھائی جاتی ہیں",
    "chronologically": "تاریخی ترتیب سے",
    "initially": "ابتدائی طور پر",
    "authored": "لکھی جاتی تھیں",
    "by": "کی طرف سے",
    "individuals": "افراد",
    "on": "پر",
    "specific": "مخصوص",
    "topics": "موضوعات",
    "the": "یہ",
    "saw": "دیکھا گیا",
    "rise": "عروج",
    "multi-author": "متعدد مصنفین والے",
    "blogs": "بلاگز",
    "from": "سے",
    "various": "مختلف",
    "institutions": "ادارے",
    "increasing": "بڑھتی ہوئی",
    "traffic": "ٹریفک",
    "user-friendly": "آسان",
    "web": "ویب",
    "publishing": "اشاعت",
    "tools": "اوزار",
    "democratized": "عام فہم بنایا",
    "blogging": "بلاگنگ",
    "removing": "ختم کرنا",
    "technical": "تکنیکی",
    "barriers": "رکاوٹیں",
    "now": "اب",
    "frequently": "اکثر",
    "incorporate": "شامل کرتے ہیں",
    "interactive": "انٹرایکٹو",
    "features": "خصوصیات",
    "like": "جیسے",
    "comment": "تبصرہ",
    "sections": "سیکشن",
    "transforming": "تبدیل کر دیا",
    "into": "میں",
    "platforms": "پلیٹ فارمز",
    "integration": "انضمام",
    "with": "کے ساتھ",
    "microblogging": "مائیکرو بلاگنگ",
    "further": "مزید",
    "cemented": "مضبوط کیا",
    "their": "ان کا",
    "role": "کردار",
    "news": "خبریں",
    "dissemination": "پھیلاؤ",
    "AI": "مصنوعی ذہانت",
    "development": "ترقی",
    "blog": "بلاگ",
    "summary": "خلاصہ",
    "future": "مستقبل",
    "tools": "اوزار",
    "code": "کوڈ",
    "important": "اہم",
    "understand": "سمجھنا",
    "help": "مدد",
    "learn": "سیکھنا",
    "language": "زبان",
    "technology": "ٹیکنالوجی",
    "internet": "انٹرنیٹ",
    "article": "مضمون",
    "platform": "پلیٹ فارم",
    "project": "منصوبہ",
    "features": "خصوصیات",
    "content": "مواد",
    "generate": "پیدا کرنا",
    "summary.": "خلاصہ۔",
    "assist": "مدد دینا",
    "task": "کام",
    "tools.": "اوزار۔",
    "and": "اور",
    "the": "یہ",
    "is": "ہے",
    "to": "کرنا",
    "of": "کا",
    "a": "ایک",
    "in": "میں",
    "on": "پر",
    "for": "کے لیے",
    "you": "آپ",
    "with": "کے ساتھ",
};

function translateToUrdu(text: string): string {
    return text
        .split(/\b/)
        .map(word => {
            const cleaned = word.toLowerCase().replace(/[^a-z\-]/g, '');
            return dictionary[cleaned] || word;
        })
        .join('');
}

export async function POST(req: Request) {
    try {
        const { summary } = await req.json();

        if (!summary) {
            return NextResponse.json({ error: 'Summary is required' }, { status: 400 });
        }

        const urdu = translateToUrdu(summary);
        return NextResponse.json({ urdu });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
