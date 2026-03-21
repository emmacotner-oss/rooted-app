import { ArticleWithCommentary } from './aiCommentaryService';
import fs from 'fs/promises';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'data', 'articles-cache.json');
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface ArticleCache {
  articles: ArticleWithCommentary[];
  lastUpdated: string;
  expiresAt: string;
}

/**
 * Ensure data directory exists
 */
async function ensureDataDir(): Promise<void> {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

/**
 * Load cached articles from file
 */
export async function loadCachedArticles(): Promise<ArticleCache | null> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(CACHE_FILE, 'utf-8');
    const cache: ArticleCache = JSON.parse(data);
    
    // Check if cache is still valid
    const expiresAt = new Date(cache.expiresAt).getTime();
    const now = Date.now();
    
    if (now < expiresAt) {
      console.log('Using cached articles (still valid)');
      return cache;
    } else {
      console.log('Cache expired, need fresh articles');
      return null;
    }
  } catch (error) {
    console.log('No valid cache found');
    return null;
  }
}

/**
 * Save articles to cache
 */
export async function saveCachedArticles(articles: ArticleWithCommentary[]): Promise<void> {
  try {
    await ensureDataDir();
    
    const cache: ArticleCache = {
      articles,
      lastUpdated: new Date().toISOString(),
      expiresAt: new Date(Date.now() + CACHE_DURATION).toISOString()
    };
    
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
    console.log(`Cached ${articles.length} articles until ${cache.expiresAt}`);
  } catch (error) {
    console.error('Error saving cache:', error);
  }
}

/**
 * Force clear cache (useful for manual refresh)
 */
export async function clearCache(): Promise<void> {
  try {
    await fs.unlink(CACHE_FILE);
    console.log('Cache cleared successfully');
  } catch (error) {
    // File might not exist, which is fine
    console.log('No cache to clear');
  }
}

/**
 * Get cache status
 */
export async function getCacheStatus(): Promise<{
  exists: boolean;
  valid: boolean;
  lastUpdated?: string;
  expiresAt?: string;
  articleCount?: number;
}> {
  const cache = await loadCachedArticles();
  
  if (!cache) {
    return { exists: false, valid: false };
  }
  
  return {
    exists: true,
    valid: true,
    lastUpdated: cache.lastUpdated,
    expiresAt: cache.expiresAt,
    articleCount: cache.articles.length
  };
}
