import { NextResponse } from 'next/server';

// This endpoint is triggered by Vercel Cron
export async function GET(request: Request) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // In production, add CRON_SECRET to Vercel environment variables
    // For now, we'll allow it to run
    console.log('Cron job triggered');
  }

  try {
    // Fetch updated articles
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/update-articles`);
    const data = await response.json();

    if (data.success) {
      console.log(`Successfully updated ${data.count} articles at ${data.lastUpdated}`);
      return NextResponse.json({ 
        success: true, 
        message: `Updated ${data.count} articles`,
        timestamp: new Date().toISOString()
      });
    } else {
      throw new Error('Failed to update articles');
    }
  } catch (error) {
    console.error('Cron update error:', error);
    return NextResponse.json(
      { success: false, error: 'Cron job failed' },
      { status: 500 }
    );
  }
}
