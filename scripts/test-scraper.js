/**
 * Quick test script for the news scraper
 * 
 * Usage:
 *   node scripts/test-scraper.js
 * 
 * This will:
 * 1. Trigger an article update
 * 2. Show the results
 * 3. Display cache status
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function testScraper() {
  console.log('🚀 Testing Rooted News Scraper\n');
  console.log('=' .repeat(60));
  
  try {
    console.log('\n📰 Fetching articles from news sources...');
    console.log('   Sources: BuzzFeed, TMZ, E! News, People, Teen Vogue\n');
    
    const response = await fetch(`${BASE_URL}/api/update-articles`, {
      method: 'POST'
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ SUCCESS!\n');
      console.log(`📊 Articles updated: ${data.articles?.length || 0}`);
      console.log(`⏰ Timestamp: ${data.timestamp}`);
      
      if (data.cacheStatus) {
        console.log('\n📦 Cache Status:');
        console.log(`   - Valid: ${data.cacheStatus.valid ? '✅' : '❌'}`);
        console.log(`   - Articles: ${data.cacheStatus.articleCount}`);
        console.log(`   - Last Updated: ${data.cacheStatus.lastUpdated}`);
        console.log(`   - Expires: ${data.cacheStatus.expiresAt}`);
      }
      
      if (data.articles && data.articles.length > 0) {
        console.log('\n📰 Sample Articles:\n');
        
        data.articles.slice(0, 3).forEach((article, i) => {
          console.log(`${i + 1}. ${article.title}`);
          console.log(`   Source: ${article.source}`);
          console.log(`   Category: ${article.category}`);
          console.log(`   Biblical Lesson: ${article.biblicalLesson.substring(0, 100)}...`);
          console.log(`   Verse: ${article.verse}`);
          console.log();
        });
      }
      
      console.log('=' .repeat(60));
      console.log('✅ Test completed successfully!\n');
      console.log('Next steps:');
      console.log('1. View articles at: http://localhost:3000/articles');
      console.log('2. Check cache: GET http://localhost:3000/api/update-articles');
      console.log('3. Deploy to Vercel for automatic daily updates\n');
      
    } else {
      console.error('❌ FAILED:', data.error);
      
      if (data.error?.includes('Rate limit')) {
        console.log('\n⏳ Rate limited. Wait a minute and try again.');
      }
      
      if (data.cacheStatus) {
        console.log('\n📦 Current Cache Status:');
        console.log(`   - Valid: ${data.cacheStatus.valid ? '✅' : '❌'}`);
        console.log(`   - Articles: ${data.cacheStatus.articleCount || 0}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error running test:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. Dev server is running (npm run dev)');
    console.log('2. OPENAI_API_KEY is set in .env.local');
    console.log('3. You have internet connection\n');
  }
}

// Run the test
testScraper();
