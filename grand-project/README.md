# 🍳 AI-Powered Recipe Generator
A full-stack AI web app that creates unique, personalized recipes based on your ingredients and dietary needs. It uses **n8n + Google AI Agent** to generate delicious meals, and stores preferences in MongoDB and recipes in Supabase.

## 📸 Screenshots
<img src="public/1.png" alt="login" >
<img src="public/2.png" alt="dashboard">
<img src="public/3.png" alt="generate recipe">
<img src="public/4.png" alt="save to db">
<img src="public/5.png" alt="n8n workflow">


## 🔗 Live Demo  
🔗 [View on Vercel](https://nexium-saad-grand-project.vercel.app)

## 🚀 Features
- 🍅 **Ingredient & Diet Input**
- 🤖 **AI recipe generation using n8n + Google AI**
- 🔁 **Webhook-powered logic with cleaned prompts**
- 📋 **Save dietary preferences** to MongoDB
- 📦 **Save generated recipes** to Supabase
- 🔒 **Magic link login** via Supabase Auth
- 🧾 **Recipe history dashboard**
- 🌗 **UI designed with Tailwind**


## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Custom Components
- **Authentication**: Supabase (Magic Link Auth)
- **AI Platform**: Google Generative AI (Gemini via n8n)
- **AI Orchestration**: n8n (Webhook, Function Node, AI Agent)
- **Database**:
  - 📦 MongoDB (user preferences)
  - 📄 Supabase (recipes)
- **Deployment**: Vercel


## ⚙️ Usage

1. Clone the repo `git clone https://github.com/MianSaadTahir/Nexium_Saad_Internship.git`
2. Move to project directory `cd .\grand-project\`
3. Set up `.env` with your Supabase, and MongoDB credentials
4. Install dependencies `npm install`
5. Run locally `npm run dev`
