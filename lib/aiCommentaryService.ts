import OpenAI from 'openai';
import { RawArticle } from './newsScraperService';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

export interface ArticleWithCommentary {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  sourceUrl: string;
  biblicalLesson: string;
  verse: string;
  category: string;
  lastUpdated: string;
}

/**
 * Categories for articles
 */
const CATEGORIES = [
  'Mental Health',
  'Self-Worth',
  'Relationships',
  'Service',
  'Forgiveness',
  'Contentment',
  'Work Ethic',
  'Stewardship',
  'Authenticity',
  'Faith',
  'Family'
];

/**
 * Generate biblical commentary using AI
 */
export async function generateBiblicalCommentary(
  article: RawArticle
): Promise<{ commentary: string; verse: string; category: string }> {
  
  const prompt = `You are a teen ministry leader writing biblical commentary on pop culture news. Your voice is:
- SPIKY and DIRECT - challenge cultural narratives
- Teen-focused - speak their language
- Biblical truth over cheap inspiration
- NO tree/nature imagery anywhere
- Call out hypocrisy when you see it
- Honest about the tension between culture and faith

Article Title: "${article.title}"
Article Summary: "${article.summary}"

Write a biblical commentary (2-3 sentences) that:
1. Acknowledges the pop culture moment honestly
2. Challenges cultural assumptions with biblical truth
3. Speaks directly to teens navigating this tension
4. NO platitudes or spiritual clichés
5. Be real about complexity - not everything has a neat bow

Then provide:
- A relevant scripture verse (book chapter:verse format followed by the actual quote in quotes)
- A category from: ${CATEGORIES.join(', ')}

Format your response EXACTLY as JSON:
{
  "commentary": "Your spiky, direct biblical take here",
  "verse": "Book Chapter:Verse - \\"Actual verse text in quotes\\"",
  "category": "Choose from the list"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a youth pastor with a sharp, direct voice who challenges teens to think critically about culture through a biblical lens. No fluff, no tree metaphors, just real talk.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 400
    });

    const responseText = completion.choices[0]?.message?.content || '';
    
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      commentary: parsed.commentary || 'This cultural moment invites us to examine our values through a biblical lens.',
      verse: parsed.verse || 'James 1:5 - "If any of you lacks wisdom, you should ask God."',
      category: CATEGORIES.includes(parsed.category) ? parsed.category : 'Faith'
    };

  } catch (error) {
    console.error('AI commentary generation error:', error);
    
    // Fallback commentary
    return {
      commentary: 'Culture tells us one story, but the Bible invites us to dig deeper. What truth is God revealing in this moment that goes beyond the headlines?',
      verse: 'Romans 12:2 - "Do not conform to the pattern of this world, but be transformed by the renewing of your mind."',
      category: 'Faith'
    };
  }
}

/**
 * Process multiple articles with AI commentary
 */
export async function generateArticlesWithCommentary(
  rawArticles: RawArticle[]
): Promise<ArticleWithCommentary[]> {
  console.log(`Generating AI commentary for ${rawArticles.length} articles...`);
  
  // Process articles with rate limiting (OpenAI API limits)
  const processedArticles: ArticleWithCommentary[] = [];
  
  for (let i = 0; i < rawArticles.length; i++) {
    const article = rawArticles[i];
    
    try {
      const { commentary, verse, category } = await generateBiblicalCommentary(article);
      
      processedArticles.push({
        id: `article-${Date.now()}-${i}`,
        title: article.title,
        summary: article.summary,
        source: article.source,
        url: '#',
        sourceUrl: article.sourceUrl,
        biblicalLesson: commentary,
        verse: verse,
        category: category,
        lastUpdated: new Date().toISOString()
      });
      
      // Rate limiting: wait 200ms between requests
      if (i < rawArticles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
    } catch (error) {
      console.error(`Error processing article "${article.title}":`, error);
      // Skip failed articles
    }
  }
  
  console.log(`Successfully generated commentary for ${processedArticles.length} articles`);
  return processedArticles;
}

/**
 * Batch generate commentary with better error handling
 */
export async function batchGenerateCommentary(
  rawArticles: RawArticle[],
  batchSize: number = 5
): Promise<ArticleWithCommentary[]> {
  const results: ArticleWithCommentary[] = [];
  
  for (let i = 0; i < rawArticles.length; i += batchSize) {
    const batch = rawArticles.slice(i, i + batchSize);
    const batchResults = await generateArticlesWithCommentary(batch);
    results.push(...batchResults);
    
    console.log(`Processed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(rawArticles.length / batchSize)}`);
  }
  
  return results;
}
