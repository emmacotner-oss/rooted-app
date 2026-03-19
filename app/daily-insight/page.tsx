'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Article } from '../api/articles/route';
import { getArticleContentLength, formatReadTime } from '../utils/readTime';

export default function DailyInsightPage() {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all articles and select today's featured article
    fetch('/api/articles')
      .then((res) => res.json())
      .then((articles: Article[]) => {
        // Use date to select a "daily" article (rotates daily)
        const today = new Date();
        const dayOfYear = Math.floor(
          (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
        );
        const index = dayOfYear % articles.length;
        setArticle(articles[index]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-2xl font-semibold text-purple-600 animate-pulse">Loading today's insight...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🤔</span>
            <p className="text-xl text-gray-600">No insight available today. Check back tomorrow!</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const readTime = getArticleContentLength(article);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <span className="text-6xl mb-4 block">💡</span>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Daily Insight
          </h1>
          <p className="text-lg text-gray-600 mb-2">{today}</p>
          <p className="text-sm text-gray-500">Your daily dose of faith meets culture</p>
        </div>

        {/* Featured Article Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 animate-slideUp">
          {/* Category Badge */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Today's Category: {article.category}
            </span>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
              {formatReadTime(readTime)}
            </span>
          </div>

          <div className="p-8 md:p-12">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h2>

            {/* Source */}
            <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
              Source: {article.source}
            </p>

            {/* Summary */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What's Happening</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {article.summary}
              </p>
            </div>

            {/* Biblical Lesson Preview */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-l-4 border-purple-600 mb-8">
              <h3 className="text-xl font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Today's Biblical Insight
              </h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                {article.biblicalLesson}
              </p>
              <p className="text-purple-900 italic font-medium border-l-2 border-purple-400 pl-4">
                {article.verse}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push(`/article/${article.id}`)}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Read Full Article
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
              >
                View Original Source
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <span className="text-4xl mb-3 block">🌱</span>
          <h3 className="text-xl font-bold text-gray-900 mb-2">New Insight Daily</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Come back tomorrow for a fresh perspective on faith and culture. Each day brings a new opportunity to grow deeper in your walk with God.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
