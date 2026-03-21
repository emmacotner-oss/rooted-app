import { NextResponse } from 'next/server';
import { loadCachedArticles } from '@/lib/articleCache';

export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  sourceUrl: string;
  biblicalLesson: string;
  verse: string;
  category: string;
  lastUpdated?: string;
}

// Fallback articles in case cache fails
const FALLBACK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Celebrities Speaking Out on Mental Health',
    summary: 'Stars like Selena Gomez and Billie Eilish are opening up about their mental health struggles, encouraging fans to seek help.',
    source: 'Teen Vogue',
    url: '#',
    sourceUrl: 'https://www.teenvogue.com/story/celebrities-mental-health-awareness',
    biblicalLesson: 'Selena and Billie are using their platforms to break the stigma around mental health—and that takes real courage. Our culture often treats struggles as weakness, but the Bible shows us that God meets us in our brokenness. Depression, anxiety, and trauma aren\'t signs you\'re failing spiritually—they\'re part of living in a fallen world. Seeking therapy or medication isn\'t a lack of faith; it\'s stewarding the body and mind God gave you.',
    verse: '2 Corinthians 12:9 - "My grace is sufficient for you, for my power is made perfect in weakness."',
    category: 'Mental Health'
  },
  {
    id: '2',
    title: 'Social Media Influencers Promote Body Positivity',
    summary: 'Popular influencers are challenging unrealistic beauty standards and promoting self-acceptance.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/celebrity/body-positivity-influencers',
    biblicalLesson: 'The body positivity movement fights against airbrushed perfection and photoshopped lies—and that\'s good. But here\'s the deeper truth: you don\'t need to love your body to have worth. Your value isn\'t in how you look OR how you feel about how you look—it\'s in being made in God\'s image.',
    verse: 'Psalm 139:14 - "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well."',
    category: 'Self-Worth'
  }
];

export async function GET() {
  try {
    // Try to load from cache first
    const cache = await loadCachedArticles();
    
    if (cache && cache.articles.length > 0) {
      console.log(`Returning ${cache.articles.length} cached articles`);
      return NextResponse.json(cache.articles);
    }
    
    // If no cache, return fallback articles and trigger background update
    console.log('No cache available, returning fallback articles');
    
    // Trigger background update (don't await - let it run async)
    if (typeof globalThis.fetch !== 'undefined') {
      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000';
      
      fetch(`${baseUrl}/api/update-articles`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }).catch(err => console.error('Background update failed:', err));
    }
    
    return NextResponse.json(FALLBACK_ARTICLES);
    
  } catch (error) {
    console.error('Error loading articles:', error);
    return NextResponse.json(FALLBACK_ARTICLES);
  }
}

// Add POST endpoint to allow manual article updates
export async function POST() {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/update-articles`, {
      method: 'POST'
    });
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Articles update triggered',
      data
    });
  } catch (error) {
    console.error('Error triggering update:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to trigger update' },
      { status: 500 }
    );
  }
}
