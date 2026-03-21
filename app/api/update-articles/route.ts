import { NextResponse } from 'next/server';
import { fetchTrendingNews } from '@/lib/newsScraperService';
import { batchGenerateCommentary } from '@/lib/aiCommentaryService';
import { saveCachedArticles, getCacheStatus } from '@/lib/articleCache';

// Rate limit tracking
let lastUpdateTime = 0;
const UPDATE_COOLDOWN = 60 * 1000; // 1 minute cooldown between updates

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to trigger article update',
    status: await getCacheStatus()
  });
}

export async function POST(request: Request) {
  try {
    // Check rate limit
    const now = Date.now();
    if (now - lastUpdateTime < UPDATE_COOLDOWN) {
      const waitTime = Math.ceil((UPDATE_COOLDOWN - (now - lastUpdateTime)) / 1000);
      return NextResponse.json({
        success: false,
        error: `Rate limit: Please wait ${waitTime} seconds before updating again`,
        cacheStatus: await getCacheStatus()
      }, { status: 429 });
    }

    console.log('Starting article update process...');
    lastUpdateTime = now;

    // Step 1: Fetch trending news from all sources
    console.log('Step 1: Fetching trending news...');
    const rawArticles = await fetchTrendingNews();
    
    if (rawArticles.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No articles fetched from news sources',
        cacheStatus: await getCacheStatus()
      }, { status: 500 });
    }

    console.log(`Fetched ${rawArticles.length} articles`);

    // Step 2: Generate biblical commentary using AI
    console.log('Step 2: Generating AI biblical commentary...');
    const articlesWithCommentary = await batchGenerateCommentary(rawArticles);
    
    if (articlesWithCommentary.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Failed to generate commentary for articles',
        cacheStatus: await getCacheStatus()
      }, { status: 500 });
    }

    console.log(`Generated commentary for ${articlesWithCommentary.length} articles`);

    // Step 3: Save to cache
    console.log('Step 3: Saving to cache...');
    await saveCachedArticles(articlesWithCommentary);

    // Step 4: Return success response
    const cacheStatus = await getCacheStatus();
    
    return NextResponse.json({
      success: true,
      message: `Successfully updated ${articlesWithCommentary.length} articles`,
      articles: articlesWithCommentary,
      cacheStatus,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Article update error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      cacheStatus: await getCacheStatus()
    }, { status: 500 });
  }
}

// DELETE endpoint to manually clear cache
export async function DELETE() {
  try {
    const { clearCache } = await import('@/lib/articleCache');
    await clearCache();
    
    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully'
    });
  } catch (error) {
    console.error('Cache clear error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to clear cache'
    }, { status: 500 });
  }
}
