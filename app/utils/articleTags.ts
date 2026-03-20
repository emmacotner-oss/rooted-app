// Article tags system for more granular categorization

export const articleTags: Record<string, string[]> = {
  // Map article IDs to tags
  'sabrina-please-please': ['relationships', 'music', 'communication', 'emotional-health'],
  'dua-training-season': ['personal-growth', 'resilience', 'music', 'self-improvement'],
  'selena-gomez-amas': ['awards', 'music', 'emotional-health', 'vulnerability'],
  'ariana-breakup': ['relationships', 'breakups', 'healing', 'self-care'],
  'kim-k-fashion': ['fashion', 'identity', 'culture', 'self-expression'],
};

export const allTags = [
  'relationships',
  'music',
  'communication',
  'emotional-health',
  'personal-growth',
  'resilience',
  'self-improvement',
  'awards',
  'vulnerability',
  'breakups',
  'healing',
  'self-care',
  'fashion',
  'identity',
  'culture',
  'self-expression',
  'mental-health',
  'self-worth',
  'faith',
  'social-media',
  'decision-making',
  'purpose',
  'community',
  'boundaries',
];

export function getTagsForArticle(articleId: string): string[] {
  return articleTags[articleId] || [];
}

export function getArticlesByTag(articles: any[], tag: string): any[] {
  return articles.filter(article => {
    const tags = getTagsForArticle(article.id);
    return tags.includes(tag);
  });
}

export function formatTag(tag: string): string {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
