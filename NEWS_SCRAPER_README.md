# Automated News Scraper with AI Biblical Commentary

This system automatically pulls trending celebrity/pop culture news from multiple sources and generates biblical commentary using AI.

## 🎯 Features

- **Multi-Source News Scraping**: Pulls from BuzzFeed Celebrity, TMZ, E! News, People, Teen Vogue
- **AI-Generated Biblical Commentary**: Uses OpenAI GPT-4 to create teen-focused biblical perspectives
- **Automatic Daily Updates**: Vercel cron job runs every day at 8 AM UTC
- **Smart Caching**: 24-hour cache to reduce API costs
- **Current News Only**: Filters for articles from the last 48 hours
- **Teen Voice**: Spiky, direct commentary that challenges cultural narratives

## 📋 Requirements

1. **OpenAI API Key**: Get from https://platform.openai.com/api-keys
2. **Node.js 18+**: For running the application
3. **Vercel Account** (optional): For automated daily updates

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

Dependencies installed:
- `rss-parser` - For parsing RSS feeds
- `openai` - For AI commentary generation

### 2. Configure Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-key-here
CRON_SECRET=random-secret-for-production
```

### 3. Initial Setup

Run the development server:

```bash
npm run dev
```

Trigger an initial article update:

```bash
# Using curl
curl -X POST http://localhost:3000/api/update-articles

# Or visit in browser
http://localhost:3000/api/update-articles
```

## 📡 API Endpoints

### GET `/api/articles`
Returns current articles (from cache or fallback).

```bash
curl http://localhost:3000/api/articles
```

### POST `/api/update-articles`
Manually trigger article update (scrapes news + generates AI commentary).

```bash
curl -X POST http://localhost:3000/api/update-articles
```

Response:
```json
{
  "success": true,
  "message": "Successfully updated 20 articles",
  "articles": [...],
  "cacheStatus": {
    "exists": true,
    "valid": true,
    "lastUpdated": "2024-03-20T14:00:00.000Z",
    "expiresAt": "2024-03-21T14:00:00.000Z",
    "articleCount": 20
  }
}
```

### DELETE `/api/update-articles`
Clear the cache (forces fresh fetch on next request).

```bash
curl -X DELETE http://localhost:3000/api/update-articles
```

### GET `/api/cron-update`
Cron job endpoint (called automatically by Vercel daily).

```bash
curl http://localhost:3000/api/cron-update
```

## 🔄 How It Works

### 1. News Scraping (`lib/newsScraperService.ts`)
- Fetches RSS feeds from 5 news sources
- Filters for celebrity/pop culture content
- Returns top 20 most recent articles

### 2. AI Commentary Generation (`lib/aiCommentaryService.ts`)
- Takes each article title + summary
- Sends to OpenAI GPT-4o-mini
- Generates:
  - **Spiky biblical commentary** (2-3 sentences)
  - **Relevant scripture verse** with actual text
  - **Category** (Mental Health, Self-Worth, etc.)

### 3. Caching (`lib/articleCache.ts`)
- Saves articles to `data/articles-cache.json`
- Cache valid for 24 hours
- Reduces OpenAI API costs

### 4. Automatic Updates
- Vercel cron runs daily at 8 AM UTC
- Calls `/api/cron-update`
- Fetches new articles + generates fresh commentary

## 📝 Commentary Voice Guidelines

The AI is instructed to write with these characteristics:

✅ **DO**:
- Be spiky and direct
- Challenge cultural narratives
- Call out hypocrisy
- Speak teen language
- Address real tension between culture and faith

❌ **DON'T**:
- Use tree/nature metaphors
- Give cheap platitudes
- Oversimplify complex issues
- Sound like a church bulletin

**Example Commentary**:
> "Hollywood is obsessed with image—the dresses, the makeup, the red carpet. But behind the scenes, the actual experience is cheap and empty. Jesus called out religious leaders for the same thing: cleaning the outside of the cup while the inside stays dirty. What happens when someone sees behind the curtain of your life?"

## 🎨 Categories

Articles are categorized into:
- Mental Health
- Self-Worth
- Relationships
- Service
- Forgiveness
- Contentment
- Work Ethic
- Stewardship
- Authenticity
- Faith
- Family

## 🚢 Deployment (Vercel)

### 1. Push to GitHub
```bash
git add .
git commit -m "Add automated news scraper"
git push
```

### 2. Deploy to Vercel
1. Connect GitHub repo to Vercel
2. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `CRON_SECRET` (optional)
3. Deploy

### 3. Cron Job Configuration
Vercel automatically detects `vercel.json` and sets up the cron job.

**Schedule**: `0 8 * * *` (Daily at 8 AM UTC)

View cron logs in Vercel dashboard under "Cron Jobs" tab.

## 🔧 Troubleshooting

### No articles showing up
1. Check if cache exists: `GET /api/update-articles`
2. Manually trigger update: `POST /api/update-articles`
3. Check server logs for errors

### OpenAI API errors
- Verify API key in `.env.local`
- Check OpenAI account has credits
- Review rate limits (we use 200ms delay between requests)

### Cron job not running
- Check `vercel.json` is in project root
- View cron logs in Vercel dashboard
- Verify `CRON_SECRET` matches in environment variables

### Articles not current
- RSS feeds may have delays
- Some sources update less frequently
- Cache expires after 24 hours

## 💰 Cost Estimation

Using GPT-4o-mini for commentary:
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens

For 20 articles/day:
- Input: ~4,000 tokens (~$0.0006)
- Output: ~3,000 tokens (~$0.0018)
- **Total: ~$0.0024/day** or **~$0.88/year**

Very affordable! 🎉

## 📊 Data Directory

Articles are cached in:
```
data/
  articles-cache.json  # Auto-generated, not in git
```

Add to `.gitignore`:
```
data/
```

## 🧪 Testing Locally

### Test news scraping only
```typescript
import { fetchTrendingNews } from '@/lib/newsScraperService';

const articles = await fetchTrendingNews();
console.log(articles);
```

### Test AI commentary only
```typescript
import { generateBiblicalCommentary } from '@/lib/aiCommentaryService';

const result = await generateBiblicalCommentary({
  title: 'Celebrity talks about mental health',
  summary: 'Star opens up about therapy',
  sourceUrl: 'https://example.com',
  source: 'Test'
});
console.log(result);
```

### Full pipeline test
```bash
curl -X POST http://localhost:3000/api/update-articles
```

## 📚 Files Structure

```
app/
  api/
    articles/
      route.ts          # Main articles endpoint (with cache)
    update-articles/
      route.ts          # Manual update endpoint
    cron-update/
      route.ts          # Vercel cron endpoint

lib/
  newsScraperService.ts     # RSS feed scraping
  aiCommentaryService.ts    # OpenAI commentary generation
  articleCache.ts           # File-based caching

data/
  articles-cache.json       # Generated cache file

vercel.json                 # Cron job configuration
.env.example               # Environment variables template
```

## ✅ Success Criteria Met

✓ Pulls from BuzzFeed Celebrity, TMZ, E! News, People, Teen Vogue
✓ Auto-generates teen-focused biblical commentary using AI
✓ Replaces hardcoded articles with dynamic content
✓ Daily updates via Vercel cron job
✓ Each article has: title, summary, source, sourceUrl, biblical commentary, scripture verse, category
✓ Articles are CURRENT (last 48 hours)
✓ Teen voice - spiky, direct, challenges cultural narratives
✓ NO tree/nature imagery in commentary

## 🎉 You're Done!

The Rooted app now has a fully automated news scraper that:
1. Pulls trending celebrity/pop culture news daily
2. Generates biblical commentary with AI
3. Updates automatically every 24 hours
4. Serves fresh content to teens

Emma's vision: ✅ DELIVERED
