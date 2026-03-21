# 🚀 Quick Start: Automated News Scraper

Get the Rooted news scraper running in 5 minutes!

## Step 1: Environment Setup

Create `.env.local` file:

```bash
OPENAI_API_KEY=sk-your-key-here
```

Get your OpenAI key: https://platform.openai.com/api-keys

## Step 2: Start Development Server

```bash
npm run dev
```

## Step 3: Trigger First Update

Open a new terminal and run:

```bash
node scripts/test-scraper.js
```

OR visit in your browser:
```
http://localhost:3000/api/update-articles
```

## Step 4: View Articles

Visit:
```
http://localhost:3000/articles
```

Or get JSON:
```
http://localhost:3000/api/articles
```

## ✅ You're Done!

The app now:
- ✓ Pulls CURRENT news from 5 sources
- ✓ Generates biblical commentary with AI
- ✓ Updates automatically (when deployed to Vercel)
- ✓ Caches for 24 hours (saves API costs)

## 🚢 Deploy to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add `OPENAI_API_KEY` to environment variables
4. Deploy!

Cron job will run automatically daily at 8 AM UTC.

## 📖 Need Help?

See `NEWS_SCRAPER_README.md` for full documentation.

## 🔧 Useful Commands

```bash
# Manual update
curl -X POST http://localhost:3000/api/update-articles

# Check cache status
curl http://localhost:3000/api/update-articles

# Clear cache
curl -X DELETE http://localhost:3000/api/update-articles

# Test scraper
node scripts/test-scraper.js
```
