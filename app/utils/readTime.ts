/**
 * Calculate estimated reading time for text content
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadTime(text: string, wordsPerMinute: number = 225): number {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Format read time into a readable string
 */
export function formatReadTime(minutes: number): string {
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}

/**
 * Get total content length for an article (for read time calculation)
 */
export function getArticleContentLength(article: {
  title: string;
  summary: string;
  biblicalLesson: string;
  verse: string;
}): number {
  const allText = [
    article.title,
    article.summary,
    article.biblicalLesson,
    article.verse,
  ].join(' ');
  
  return calculateReadTime(allText);
}
