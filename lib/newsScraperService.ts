import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['media:content', 'media:thumbnail', 'dc:creator']
  }
});

export interface RawArticle {
  title: string;
  summary: string;
  sourceUrl: string;
  source: string;
  pubDate?: string;
}

// RSS Feed URLs for each source
const NEWS_SOURCES = {
  buzzfeed: 'https://www.buzzfeed.com/celebrity.xml',
  tmz: 'https://www.tmz.com/rss.xml',
  eonline: 'https://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml',
  people: 'https://people.com/feed/',
  teenvogue: 'https://www.teenvogue.com/feed/rss'
};

/**
 * Fetch articles from a single RSS feed
 */
async function fetchFromSource(url: string, sourceName: string): Promise<RawArticle[]> {
  try {
    const feed = await parser.parseURL(url);
    
    const articles: RawArticle[] = feed.items
      .slice(0, 5) // Get top 5 from each source
      .map(item => {
        // Clean HTML from description
        const description = item.contentSnippet || item.content || item.description || '';
        const cleanSummary = description
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .trim()
          .substring(0, 250);

        return {
          title: item.title || 'Untitled',
          summary: cleanSummary || 'Read the full article for more details.',
          sourceUrl: item.link || '',
          source: sourceName,
          pubDate: item.pubDate
        };
      })
      .filter(article => article.sourceUrl && article.title);

    return articles;
  } catch (error) {
    console.error(`Error fetching from ${sourceName}:`, error);
    return [];
  }
}

/**
 * Filter articles to focus on celebrity/pop culture content
 */
function filterRelevantArticles(articles: RawArticle[]): RawArticle[] {
  const relevantKeywords = [
    'celebrity', 'star', 'actor', 'actress', 'singer', 'musician',
    'artist', 'influencer', 'social media', 'instagram', 'tiktok',
    'relationship', 'dating', 'mental health', 'body', 'fashion',
    'awards', 'oscars', 'grammys', 'billboard', 'netflix', 'hulu',
    'movie', 'film', 'show', 'series', 'album', 'song'
  ];

  return articles.filter(article => {
    const text = (article.title + ' ' + article.summary).toLowerCase();
    return relevantKeywords.some(keyword => text.includes(keyword));
  });
}

/**
 * Fetch trending news from all configured sources
 */
export async function fetchTrendingNews(): Promise<RawArticle[]> {
  console.log('Starting news fetch from all sources...');
  
  const fetchPromises = Object.entries(NEWS_SOURCES).map(([key, url]) => {
    const sourceName = {
      buzzfeed: 'BuzzFeed Celebrity',
      tmz: 'TMZ',
      eonline: 'E! News',
      people: 'People',
      teenvogue: 'Teen Vogue'
    }[key] || key;

    return fetchFromSource(url, sourceName);
  });

  const results = await Promise.allSettled(fetchPromises);
  
  // Combine all successful results
  const allArticles = results
    .filter((result): result is PromiseFulfilledResult<RawArticle[]> => result.status === 'fulfilled')
    .flatMap(result => result.value);

  console.log(`Fetched ${allArticles.length} total articles`);

  // Filter for relevant content
  const relevantArticles = filterRelevantArticles(allArticles);
  console.log(`Filtered to ${relevantArticles.length} relevant articles`);

  // Sort by most recent and limit to 20
  const sortedArticles = relevantArticles
    .sort((a, b) => {
      const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 20);

  return sortedArticles;
}

/**
 * Check if articles are from today (for ensuring current content)
 */
export function isRecentArticle(pubDate?: string): boolean {
  if (!pubDate) return true; // If no date, assume it's current
  
  const articleDate = new Date(pubDate);
  const now = new Date();
  const hoursDiff = (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60);
  
  return hoursDiff < 48; // Articles from last 48 hours
}
