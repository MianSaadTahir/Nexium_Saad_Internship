# Blog Summariser - Setup Guide

This is a comprehensive setup guide for the Blog Summariser application built with Next.js 15, featuring web scraping, AI summarization, Urdu translation, and dual database storage.

## 🚀 Features

- **Web Scraping**: Extract content from any blog URL
- **AI Summary**: Generate intelligent summaries using static algorithms
- **Urdu Translation**: Translate summaries from English to Urdu
- **Dual Storage**: Save summaries in Supabase and full content in MongoDB
- **Modern UI**: Beautiful interface built with ShadCN UI
- **Sentiment Analysis**: Analyze the sentiment of blog content
- **Reading Time**: Calculate estimated reading time

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)
- MongoDB database (MongoDB Atlas recommended)

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
cd assignment-2
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# MongoDB Configuration  
MONGODB_URI=your_mongodb_connection_string

# Optional: Web Scraping Service (for enhanced scraping)
SCRAPFLY_API_KEY=your_scrapfly_api_key
```

### 3. Database Setup

#### Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to the SQL Editor and create the blog_summaries table:

```sql
CREATE TABLE blog_summaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  summary_urdu TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policy (optional, for security)
ALTER TABLE blog_summaries ENABLE ROW LEVEL SECURITY;

-- Allow public access for demo (adjust as needed)
CREATE POLICY "Allow public access" ON blog_summaries
  FOR ALL USING (true);
```

3. Get your project URL and anon key from Project Settings > API

#### MongoDB Setup
1. Create a MongoDB Atlas account at [mongodb.com](https://mongodb.com)
2. Create a new cluster (free tier available)
3. Create a database user and get the connection string
4. Replace the connection string in your `.env.local` file

The MongoDB schema is automatically handled by Mongoose.

### 4. Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🎯 Usage

1. **Enter Blog URL**: Paste any blog post URL in the input field
2. **Process**: Click "Summarise Blog" to start the AI analysis
3. **View Results**: See the summary in both English and Urdu
4. **Data Storage**: Content is automatically saved to both databases

## 🏗️ Architecture

```
assignment-2/
├── app/
│   ├── api/
│   │   ├── summarize/route.ts    # Main API endpoint
│   │   └── summaries/route.ts    # Fetch saved summaries
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                       # ShadCN UI components
│   └── BlogSummariser.tsx        # Main component
├── lib/
│   ├── scraper.ts               # Web scraping logic
│   ├── aiSummary.ts             # AI summary algorithms
│   ├── translator.ts            # English to Urdu translation
│   ├── supabase.ts              # Supabase client
│   ├── mongodb.ts               # MongoDB connection
│   └── utils.ts                 # Utility functions
└── .env.local                   # Environment variables
```

## 🔧 API Endpoints

### POST /api/summarize
Processes a blog URL and returns comprehensive analysis.

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
    "url": "https://example.com/blog-post",
    "title": "Blog Post Title",
    "author": "Author Name",
    "originalContent": "Full blog content...",
    "summary": {
      "english": "AI generated summary...",
      "urdu": "اردو میں خلاصہ...",
      "keyPoints": ["Point 1", "Point 2", "Point 3"],
      "readingTime": 5,
      "sentiment": "positive"
    },
    "metadata": {
      "domain": "example.com",
      "wordCount": 1200,
      "description": "Blog description..."
    }
  }
}
```

### GET /api/summaries
Retrieves all saved summaries from Supabase.

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `assignment-2` folder as the root directory

3. **Environment Variables**:
   Add all environment variables from your `.env.local` file to Vercel:
   - Go to Project Settings > Environment Variables
   - Add each variable individually

4. **Deploy**: Vercel will automatically deploy your application

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎨 Customization

### Adding New Languages
Edit `lib/translator.ts` to add more translation dictionaries:

```typescript
const englishToUrduDict = {
  // Add more translations
  "new_word": "نیا لفظ"
};
```

### Enhancing AI Summary
Modify `lib/aiSummary.ts` to improve the summarization algorithm:

```typescript
// Add more sophisticated algorithms
// Integrate with real AI APIs (OpenAI, etc.)
```

### Custom UI Themes
Modify `app/globals.css` and Tailwind configuration for custom styling.

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify environment variables are correct
   - Check database server status
   - Ensure IP whitelist includes your deployment server

2. **Web Scraping Errors**
   - Some websites block scraping - this is expected
   - Demo content will be used as fallback
   - Consider using proxy services for production

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

### Performance Optimization

1. **Caching**: Implement Redis for frequently accessed content
2. **CDN**: Use Vercel's CDN for static assets
3. **Database Indexing**: Add indexes to frequently queried fields

## 📝 License

This project is for educational purposes. Feel free to modify and use as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section above
- Review the code comments for detailed explanations
- Create an issue in the repository

## 🎉 Next Steps

- Deploy to Vercel
- Set up monitoring and analytics
- Add user authentication
- Implement real AI APIs for enhanced summaries
- Add more languages for translation
- Create a dashboard for managing saved summaries