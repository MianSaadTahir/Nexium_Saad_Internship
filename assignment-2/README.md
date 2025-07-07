# 🤖 Blog Summariser

An intelligent blog summarization application built with Next.js 15 that transforms any blog post into concise summaries with AI-powered analysis, Urdu translation, and intelligent data storage.

![Blog Summariser Preview](https://img.shields.io/badge/Status-Complete-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.3.5-blueviolet)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC)

## ✨ Features

- 🌐 **Web Scraping**: Extract content from any blog URL using Cheerio
- 🤖 **AI Summarization**: Generate intelligent summaries using advanced algorithms
- 🔤 **Urdu Translation**: Automatic English to Urdu translation
- 📊 **Dual Database Storage**: Supabase for summaries, MongoDB for full content
- 😊 **Sentiment Analysis**: Analyze the emotional tone of content
- ⏱️ **Reading Time Calculation**: Estimate reading duration
- 🎨 **Modern UI**: Beautiful interface built with ShadCN UI components
- 📱 **Responsive Design**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier available)
- MongoDB database (MongoDB Atlas recommended)

### Installation

1. **Install Dependencies**
   ```bash
   cd assignment-2
   npm install
   ```

2. **Environment Setup**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   MONGODB_URI=your_mongodb_connection_string
   ```

3. **Database Setup**
   - **Supabase**: Create `blog_summaries` table (see SETUP.md)
   - **MongoDB**: Connection handled automatically by Mongoose

4. **Run Development Server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
assignment-2/
├── app/
│   ├── api/
│   │   ├── summarize/          # Main summarization endpoint
│   │   └── summaries/          # Fetch saved summaries
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                     # ShadCN UI components
│   └── BlogSummariser.tsx      # Main application component
├── lib/
│   ├── scraper.ts             # Web scraping logic
│   ├── aiSummary.ts           # AI summarization algorithms
│   ├── translator.ts          # English to Urdu translation
│   ├── supabase.ts            # Supabase client configuration
│   ├── mongodb.ts             # MongoDB connection & models
│   └── utils.ts               # Utility functions
└── SETUP.md                   # Detailed setup instructions
```

## 🔧 How It Works

1. **Input**: User enters a blog URL
2. **Scraping**: Cheerio extracts article content and metadata
3. **AI Analysis**: Custom algorithms generate key insights and summaries
4. **Translation**: Dictionary-based English to Urdu translation
5. **Storage**: 
   - Summaries saved to Supabase
   - Full content stored in MongoDB
6. **Display**: Beautiful UI shows results with sentiment analysis

## 🎯 API Endpoints

### `POST /api/summarize`
Process a blog URL and return comprehensive analysis.

**Request:**
```json
{
  "url": "https://example.com/blog-post"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Blog Post Title",
    "summary": {
      "english": "AI generated summary...",
      "urdu": "اردو میں خلاصہ...",
      "sentiment": "positive",
      "readingTime": 5
    },
    "originalContent": "Full blog content...",
    "metadata": { ... }
  }
}
```

### `GET /api/summaries`
Retrieve all saved summaries from Supabase.

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4, ShadCN UI
- **Database**: Supabase (PostgreSQL), MongoDB
- **Web Scraping**: Cheerio
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📚 Documentation

- [SETUP.md](SETUP.md) - Comprehensive setup guide
- [API Documentation](#-api-endpoints) - API endpoint details
- [Architecture Overview](#-project-structure) - Project structure

## 🎨 UI Components

Built with ShadCN UI for a modern, accessible interface:
- Cards for content organization
- Buttons with loading states
- Badges for status indicators
- Responsive input forms
- Gradient backgrounds

## 🔍 Demo Features

If a URL fails to load, the application gracefully falls back to demo content showcasing:
- AI-powered summarization
- Urdu translation capabilities
- Sentiment analysis
- Reading time calculation
- Database storage simulation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is for educational purposes. Feel free to modify and use as needed.

## 🆘 Support

- Check [SETUP.md](SETUP.md) for detailed instructions
- Review code comments for implementation details
- Create issues for bugs or feature requests

## 🎉 Future Enhancements

- [ ] Integration with real AI APIs (OpenAI, Claude)
- [ ] User authentication and personal dashboards
- [ ] Multiple language support
- [ ] Export summaries to PDF/Word
- [ ] Browser extension for one-click summarization
- [ ] Bulk URL processing
- [ ] Advanced analytics and insights

---

**Built with ❤️ using Next.js 15 and modern web technologies**
