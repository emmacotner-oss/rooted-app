import { NextResponse } from 'next/server';

// Biblical lessons mapped to topics/categories
const biblicalMappings: Record<string, { lesson: string; verse: string; category: string }> = {
  'mental health': {
    lesson: 'Just as these celebrities show courage in vulnerability, God calls us to cast our anxieties on Him. Mental health matters, and seeking help shows strength, not weakness.',
    verse: '1 Peter 5:7 - "Cast all your anxiety on him because he cares for you."',
    category: 'Mental Health'
  },
  'body': {
    lesson: 'God created each of us uniquely and wonderfully. True beauty comes from our character and heart, not from meeting worldly standards.',
    verse: 'Psalm 139:14 - "I praise you because I am fearfully and wonderfully made."',
    category: 'Self-Worth'
  },
  'charity': {
    lesson: 'Using our gifts and influence to serve others reflects God\'s love. Whatever talents we have, we can use them to make a positive difference.',
    verse: 'Matthew 5:16 - "Let your light shine before others, that they may see your good deeds."',
    category: 'Service'
  },
  'relationship': {
    lesson: 'God wants relationships built on respect, love, and mutual support. Recognizing toxic patterns and setting boundaries shows self-respect and wisdom.',
    verse: 'Proverbs 4:23 - "Above all else, guard your heart, for everything you do flows from it."',
    category: 'Relationships'
  },
  'climate': {
    lesson: 'God entrusted us with caring for His creation. Taking action to protect our environment is living out our role as faithful stewards.',
    verse: 'Genesis 2:15 - "The Lord God took the man and put him in the Garden of Eden to work it and take care of it."',
    category: 'Stewardship'
  },
  'cancel': {
    lesson: 'While accountability matters, God calls us to forgive and allow room for growth. We can hold people responsible while still offering grace.',
    verse: 'Colossians 3:13 - "Bear with each other and forgive one another... Forgive as the Lord forgave you."',
    category: 'Forgiveness'
  },
  'comparison': {
    lesson: 'Comparison steals joy. God has a unique plan for each of us, and contentment comes from gratitude for what we have, not envy of others.',
    verse: 'Galatians 6:4 - "Each one should test their own actions... without comparing themselves to someone else."',
    category: 'Contentment'
  },
  'work': {
    lesson: 'God gives us talents and passions for a purpose. Working hard, using our gifts wisely, and honoring God in our work brings fulfillment.',
    verse: 'Colossians 3:23 - "Whatever you do, work at it with all your heart, as working for the Lord."',
    category: 'Work Ethic'
  },
  'default': {
    lesson: 'In every situation, we can seek God\'s perspective and find wisdom to navigate life\'s challenges with grace and purpose.',
    verse: 'James 1:5 - "If any of you lacks wisdom, you should ask God, who gives generously to all."',
    category: 'Faith'
  }
};

// Function to determine category based on article title/content
function categorizeArticle(title: string, summary: string): { lesson: string; verse: string; category: string } {
  const text = (title + ' ' + summary).toLowerCase();
  
  for (const [keyword, mapping] of Object.entries(biblicalMappings)) {
    if (text.includes(keyword)) {
      return mapping;
    }
  }
  
  return biblicalMappings.default;
}

// Fetch articles from BuzzFeed Celebrity RSS/API
async function fetchBuzzFeedArticles() {
  try {
    // BuzzFeed Celebrity RSS feed
    const response = await fetch('https://www.buzzfeed.com/celebrity.xml', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    
    if (!response.ok) {
      console.error('BuzzFeed fetch failed:', response.status);
      return [];
    }

    const text = await response.text();
    const articles = parseRSS(text, 'BuzzFeed Celebrity');
    return articles.slice(0, 4); // Get top 4 articles
  } catch (error) {
    console.error('Error fetching BuzzFeed articles:', error);
    return [];
  }
}

// Fetch articles from Teen Vogue
async function fetchTeenVogueArticles() {
  try {
    // Teen Vogue RSS feed
    const response = await fetch('https://www.teenvogue.com/feed/rss', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    
    if (!response.ok) {
      console.error('Teen Vogue fetch failed:', response.status);
      return [];
    }

    const text = await response.text();
    const articles = parseRSS(text, 'Teen Vogue');
    return articles.slice(0, 4); // Get top 4 articles
  } catch (error) {
    console.error('Error fetching Teen Vogue articles:', error);
    return [];
  }
}

// Simple RSS parser
function parseRSS(xmlText: string, source: string) {
  const articles: any[] = [];
  
  // Extract items using regex (simple approach)
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const matches = xmlText.matchAll(itemRegex);
  
  for (const match of matches) {
    const itemXml = match[1];
    
    // Extract title
    const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || 
                      itemXml.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    // Extract description/summary
    const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || 
                     itemXml.match(/<description>(.*?)<\/description>/);
    let summary = descMatch ? descMatch[1].trim() : '';
    
    // Clean HTML tags from summary
    summary = summary.replace(/<[^>]*>/g, '').substring(0, 200);
    
    // Extract link
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
    const sourceUrl = linkMatch ? linkMatch[1].trim() : '';
    
    if (title && sourceUrl) {
      const { lesson, verse, category } = categorizeArticle(title, summary);
      
      articles.push({
        id: `${source}-${Date.now()}-${Math.random()}`,
        title,
        summary: summary || 'Click to read more about this trending topic.',
        source,
        url: '#',
        sourceUrl,
        biblicalLesson: lesson,
        verse,
        category,
        lastUpdated: new Date().toISOString()
      });
    }
  }
  
  return articles;
}

export async function GET() {
  try {
    // Fetch from both sources
    const [buzzFeedArticles, teenVogueArticles] = await Promise.all([
      fetchBuzzFeedArticles(),
      fetchTeenVogueArticles()
    ]);

    // Combine and shuffle articles
    const allArticles = [...buzzFeedArticles, ...teenVogueArticles];
    const shuffled = allArticles.sort(() => Math.random() - 0.5);

    return NextResponse.json({
      success: true,
      articles: shuffled,
      lastUpdated: new Date().toISOString(),
      count: shuffled.length
    });
  } catch (error) {
    console.error('Update articles error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
