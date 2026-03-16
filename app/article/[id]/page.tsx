'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article } from '../../api/articles/route';

export default function ArticleDetail() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all articles and find the matching one
    fetch('/api/articles')
      .then((res) => res.json())
      .then((articles: Article[]) => {
        const found = articles.find((a) => a.id === params.id);
        setArticle(found || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching article:', error);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-2xl font-semibold text-purple-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find that article.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Rooted
            </h1>
            <p className="text-gray-600 text-sm">
              Pop Culture Through a Biblical Lens 🌱
            </p>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>
      </div>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Category Badge */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3">
            <span className="text-sm font-semibold uppercase tracking-wide">
              {article.category}
            </span>
          </div>

          <div className="p-6 md:p-10">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Source */}
            <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
              Source: {article.source}
            </p>

            {/* Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">What's Happening</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {article.summary}
              </p>
            </div>

            {/* Expanded Biblical Insights */}
            <div className="border-t border-purple-100 pt-8 mb-8">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">✨</span>
                <h2 className="text-2xl font-bold text-purple-900">
                  Biblical Perspective
                </h2>
              </div>

              <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                {/* Expanded biblical lesson - we'll generate richer content based on the short version */}
                <p className="text-lg">
                  {article.biblicalLesson}
                </p>
                
                {/* Additional context and application */}
                <p>
                  {getExpandedInsight(article.category, article.id)}
                </p>

                <p>
                  {getApplicationExample(article.category, article.id)}
                </p>
              </div>
            </div>

            {/* Bible Verse */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border-l-4 border-purple-600">
              <h3 className="font-semibold text-purple-900 mb-2 text-sm uppercase tracking-wide">
                Scripture
              </h3>
              <p className="text-base font-medium text-purple-900 italic leading-relaxed">
                {article.verse}
              </p>
            </div>

            {/* Read Original Article Button */}
            <div className="text-center">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <span>Read Original Article</span>
                <span>🔗</span>
              </a>
              <p className="text-gray-500 text-sm mt-3">
                Opens in new tab
              </p>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-600 text-sm">
            Rooted: Connecting faith with the world around us 💜
          </p>
          <p className="text-gray-400 text-xs mt-2">
            © {new Date().getFullYear()} Rooted. Made with faith and purpose.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper function to generate expanded biblical insights
function getExpandedInsight(category: string, id: string): string {
  const insights: { [key: string]: string } = {
    '1': 'In our modern world, mental health struggles are often hidden behind perfect Instagram feeds and curated social media personas. When celebrities speak openly about their battles with anxiety, depression, or other challenges, they break down walls of shame and isolation. This vulnerability mirrors the authenticity God calls us to in our relationships with Him and others. The Bible is full of honest prayers and raw emotions—David's psalms often express deep anguish, and Jesus himself wept and felt troubled. God doesn't expect us to have it all together; He invites us to bring our brokenness to Him.',
    '2': 'The pressure to conform to society's beauty standards has never been more intense, with social media creating constant opportunities for comparison. But God's perspective is radically different. He doesn't measure worth by appearance, followers, or popularity. When we internalize the truth that we are created in God's image and loved unconditionally, it transforms how we see ourselves and others. This doesn't mean we ignore physical health, but rather that we recognize our deepest value comes from being God's beloved children, not from meeting arbitrary cultural standards.',
    '3': 'Influence is a powerful tool that can be used for good or harm. When young celebrities use their platforms to serve others and raise awareness for important causes, they're modeling servant leadership—the kind Jesus demonstrated when he washed his disciples' feet. We all have spheres of influence, whether it's a million followers or a circle of friends. The question isn't how large our platform is, but how faithfully we use what we've been given to love and serve others, reflecting God's heart for justice, compassion, and care for the vulnerable.',
    '4': 'Toxic relationships damage our emotional, mental, and sometimes physical well-being. They can involve manipulation, control, disrespect, or abuse. Recognizing these patterns and having the courage to set boundaries or walk away isn't selfish—it's an act of self-respect rooted in understanding that God values you deeply. Healthy relationships are characterized by mutual respect, trust, kindness, and support. When we accept less than this, we're settling for something that doesn't align with God's design for how we should love and be loved.',
    '5': 'Climate change and environmental degradation are pressing issues of our time. From a biblical perspective, caring for creation isn't just about environmentalism—it's about stewardship. God created the earth and declared it "good," then entrusted humanity with the responsibility to care for it. When we waste resources, pollute ecosystems, or ignore environmental harm, we're failing in our role as caretakers. Taking action to protect the environment—whether through personal choices or advocacy—is a way of honoring God and loving our neighbors, especially future generations who will inherit the world we leave behind.',
    '6': 'Cancel culture reflects a tension between two important values: accountability and grace. On one hand, it's right to call out harmful behavior and hold people responsible for their actions. On the other hand, the internet's tendency to permanently condemn someone for past mistakes leaves no room for redemption or growth. The gospel offers a better way: truth and grace together. We can acknowledge wrong, seek justice, and still offer forgiveness and the opportunity for change. This doesn't mean ignoring harm, but it does mean believing that people can grow, learn, and be transformed—just as God has offered that same grace to each of us.',
    '7': 'Social media shows us everyone's highlight reel while we're living our behind-the-scenes reality. This constant comparison breeds envy, inadequacy, and dissatisfaction. But God's plan for your life is unique to you—comparing yourself to others is like comparing apples to oranges. Contentment comes from gratitude for what God has given you and trust in His timing and purposes. When we shift our focus from what others have to what God has provided and who He's called us to be, we find freedom from the exhausting cycle of comparison and the joy of walking in our own calling.',
    '8': 'Hard work, creativity, and entrepreneurship are all ways we can honor God with our talents and passions. When young people turn their ideas into businesses, they're exercising the creativity and resourcefulness God built into humanity. But success isn't just about profit—it's about purpose. Working with integrity, treating people fairly, and using our work to serve others and glorify God gives our efforts eternal significance. Whatever our job or career path, when we approach it as an act of worship and service to God, our work becomes meaningful beyond the paycheck.'
  };

  return insights[id] || 'This topic invites us to consider how biblical principles apply to the cultural moments we're experiencing. God's truth is timeless and speaks into every area of our lives, offering wisdom, perspective, and hope.';
}

// Helper function to generate practical application examples
function getApplicationExample(category: string, id: string): string {
  const applications: { [key: string]: string } = {
    '1': 'Practical Application: If you're struggling with your mental health, reach out to a trusted adult, counselor, or therapist. Talk to God honestly in prayer about what you're feeling. Remember that seeking help is a sign of courage, and there's no shame in needing support. Also, be the kind of friend who creates safe space for others to be vulnerable about their struggles.',
    '2': 'Practical Application: Challenge yourself to take breaks from social media when you notice it affecting your self-image. Practice gratitude by listing things you appreciate about yourself that have nothing to do with appearance. Surround yourself with people who value you for who you are, not what you look like. Speak life into others by complimenting character, kindness, and talents instead of just physical appearance.',
    '3': 'Practical Application: Look for ways to use your own influence—whether it's starting a fundraiser, volunteering with a local organization, using your creative talents to raise awareness, or simply being kind and generous in your everyday interactions. Ask God to show you where He wants you to serve and how you can make a difference in your community.',
    '4': 'Practical Application: Evaluate your relationships honestly. Do they build you up or tear you down? Do they encourage you to be your best self or pressure you to compromise your values? If a relationship feels unhealthy, talk to a trusted adult or counselor. Setting boundaries is healthy, and it's okay to distance yourself from relationships that are harmful. Pray for wisdom and courage to pursue relationships that honor God and reflect His love.',
    '5': 'Practical Application: Start with small, practical steps: reduce waste, recycle, conserve energy, choose reusable products, support sustainable brands, and educate yourself about environmental issues. Consider how your daily choices impact the planet. Advocate for environmental responsibility in your school or community. Recognize that caring for creation is an act of worship and obedience to God.',
    '6': 'Practical Application: Before sharing or liking a post that calls someone out, pause and consider: Is this true? Is it kind? Is it necessary? Does it allow room for growth and redemption? When you make a mistake (and we all do), own it, apologize sincerely, and commit to doing better. When someone hurts you, seek justice and healing, but also be willing to forgive when there's genuine repentance. Balance accountability with grace in all your relationships.',
    '7': 'Practical Application: Practice gratitude daily by writing down three things you're thankful for. Limit your social media time and curate your feed to include content that encourages and inspires you rather than triggers comparison. Celebrate others' successes genuinely instead of letting envy take root. Focus on your own growth and goals rather than measuring yourself against others. Remember that God has a unique plan for you, and someone else's success doesn't diminish your own value or potential.',
    '8': 'Practical Application: Whatever work you do—whether it's schoolwork, a part-time job, a creative project, or a future career—approach it with excellence and integrity. Ask yourself: How can I honor God in this work? How can I serve others through what I do? Don't cut corners or compromise your values for shortcuts to success. Work hard, stay humble, and trust that God will guide your path when you seek to honor Him in all you do.'
  };

  return applications[id] || 'Take time to reflect on how this biblical truth applies to your own life. Ask God for wisdom and courage to live out these principles in practical, meaningful ways. Remember that faith isn't just about what we believe—it's about how we live.';
}
