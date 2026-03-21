import { NextResponse } from 'next/server';

/**
 * Vercel Cron Job endpoint - runs daily to update articles
 * 
 * To set up in Vercel:
 * 1. Add vercel.json with cron configuration
 * 2. Deploy to Vercel
 * 3. Cron will trigger this endpoint automatically
 */
export async function GET(request: Request) {
  try {
    // Verify request is from Vercel Cron (optional but recommended for production)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.warn('Unauthorized cron request attempt');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('=== CRON JOB TRIGGERED ===');
    console.log('Time:', new Date().toISOString());
    
    // Determine base URL
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    console.log('Calling update-articles endpoint...');
    
    // Call the update-articles endpoint
    const response = await fetch(`${baseUrl}/api/update-articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Cron'
      }
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Cron update successful');
      console.log(`Updated ${data.cacheStatus?.articleCount || 0} articles`);
      
      return NextResponse.json({
        success: true,
        message: 'Articles updated successfully',
        articlesUpdated: data.cacheStatus?.articleCount || 0,
        timestamp: new Date().toISOString(),
        nextUpdate: data.cacheStatus?.expiresAt
      });
    } else {
      console.error('❌ Cron update failed:', data.error);
      
      return NextResponse.json({
        success: false,
        error: data.error || 'Update failed',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Cron job error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Also support POST for manual testing
export async function POST(request: Request) {
  return GET(request);
}
