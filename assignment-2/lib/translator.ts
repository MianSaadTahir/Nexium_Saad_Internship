// English to Urdu translation dictionary
const englishToUrduDict: Record<string, string> = {
  // Common words and phrases for blog content
  "the": "یہ",
  "and": "اور",
  "is": "ہے",
  "are": "ہیں",
  "in": "میں",
  "on": "پر",
  "at": "پر",
  "to": "کو",
  "of": "کا",
  "with": "ساتھ",
  "for": "کے لیے",
  "from": "سے",
  "by": "کے ذریعے",
  "this": "یہ",
  "that": "وہ",
  "these": "یہ",
  "those": "وہ",
  "will": "گا",
  "can": "سکتا",
  "should": "چاہیے",
  "would": "گا",
  "could": "سکتا",
  "may": "ہو سکتا",
  "might": "ہو سکتا",
  
  // Technology and AI related terms
  "artificial": "مصنوعی",
  "intelligence": "ذہانت",
  "machine": "مشین",
  "learning": "سیکھنا",
  "deep": "گہری",
  "technology": "ٹیکنالوجی",
  "computer": "کمپیوٹر",
  "software": "سافٹ ویئر",
  "data": "ڈیٹا",
  "information": "معلومات",
  "system": "نظام",
  "systems": "نظام",
  "algorithm": "الگورتھم",
  "algorithms": "الگورتھم",
  "network": "نیٹ ورک",
  "internet": "انٹرنیٹ",
  "digital": "ڈیجیٹل",
  "online": "آن لائن",
  "automation": "خودکاری",
  "automate": "خودکار",
  "efficient": "موثر",
  "efficiency": "کارکردگی",
  "performance": "کارکردگی",
  "innovation": "جدت",
  "development": "ترقی",
  "research": "تحقیق",
  
  // Business and industry terms
  "business": "کاروبار",
  "industry": "صنعت",
  "industries": "صنعتوں",
  "company": "کمپنی",
  "market": "بازار",
  "finance": "مالیات",
  "healthcare": "صحت کی دیکھ بھال",
  "education": "تعلیم",
  "management": "انتظام",
  "service": "خدمات",
  "services": "خدمات",
  "product": "پروڈکٹ",
  "products": "پروڈکٹس",
  "solution": "حل",
  "solutions": "حل",
  "strategy": "حکمت عملی",
  "project": "پروجیکٹ",
  "team": "ٹیم",
  "work": "کام",
  "job": "کام",
  "career": "کیریئر",
  
  // Action words
  "transform": "تبدیل",
  "transforming": "تبدیل کر رہا",
  "enable": "قابل بنانا",
  "enabling": "قابل بنا رہا",
  "improve": "بہتر",
  "improving": "بہتر بنانا",
  "create": "بنانا",
  "creating": "بنا رہا",
  "develop": "ترقی",
  "developing": "ترقی کر رہا",
  "implement": "لاگو",
  "implementing": "لاگو کر رہا",
  "use": "استعمال",
  "using": "استعمال کر رہا",
  "help": "مدد",
  "helping": "مدد کر رہا",
  "support": "مدد",
  "supporting": "مدد کر رہا",
  "provide": "فراہم",
  "providing": "فراہم کر رہا",
  "offer": "پیش",
  "offering": "پیش کر رہا",
  
  // Descriptive words
  "new": "نیا",
  "old": "پرانا",
  "big": "بڑا",
  "small": "چھوٹا",
  "large": "بڑا",
  "high": "اعلیٰ",
  "low": "کم",
  "fast": "تیز",
  "slow": "آہستہ",
  "quick": "جلدی",
  "easy": "آسان",
  "difficult": "مشکل",
  "simple": "آسان",
  "complex": "پیچیدہ",
  "important": "اہم",
  "significant": "اہم",
  "major": "اہم",
  "minor": "معمولی",
  "good": "اچھا",
  "bad": "برا",
  "better": "بہتر",
  "best": "بہترین",
  "great": "بہترین",
  "excellent": "عمدہ",
  "powerful": "طاقتور",
  "effective": "مؤثر",
  "successful": "کامیاب",
  
  // Numbers and quantities
  "one": "ایک",
  "two": "دو",
  "three": "تین",
  "four": "چار",
  "five": "پانچ",
  "many": "بہت",
  "much": "زیادہ",
  "more": "زیادہ",
  "most": "سب سے زیادہ",
  "all": "تمام",
  "some": "کچھ",
  "few": "کم",
  "several": "کئی",
  "various": "مختلف",
  "different": "مختلف",
  "same": "وہی",
  "similar": "ملتا جلتا",
  
  // Time related
  "today": "آج",
  "tomorrow": "کل",
  "yesterday": "کل",
  "now": "اب",
  "then": "پھر",
  "when": "جب",
  "while": "جبکہ",
  "during": "دوران",
  "before": "پہلے",
  "after": "بعد",
  "future": "مستقبل",
  "past": "ماضی",
  "present": "حال",
  "time": "وقت",
  "year": "سال",
  "years": "سال",
  "month": "مہینہ",
  "months": "مہینے",
  "day": "دن",
  "days": "دن",
  "week": "ہفتہ",
  "weeks": "ہفتے"
};

// Function to translate text from English to Urdu
export function translateToUrdu(text: string): string {
  // Convert to lowercase for matching and split into words
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  // Translate each word
  const translatedWords = words.map(word => {
    return englishToUrduDict[word] || word; // Use original word if no translation found
  });
  
  // Join translated words
  return translatedWords.join(' ');
}

// Function to translate key points/summary
export function translateSummaryToUrdu(summary: string): string {
  const lines = summary.split('\n');
  const translatedLines = lines.map(line => {
    if (line.trim().startsWith('✅')) {
      const content = line.replace('✅', '').trim();
      return '✅ ' + translateToUrdu(content);
    }
    return translateToUrdu(line);
  });
  
  return translatedLines.join('\n');
}