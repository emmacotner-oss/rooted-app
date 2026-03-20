'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ShareButtons from '../../components/ShareButtons';
import ArticleCard from '../../components/ArticleCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useApp } from '../../context/AppContext';
import { Article } from '../../api/articles/route';
import { getArticleContentLength, formatReadTime } from '../../utils/readTime';
import { getExpandedContent, getAdditionalScriptures, getPracticalSteps } from './articleContent';

export default function ArticleDetail() {
  const params = useParams();
  const router = useRouter();
  const { isBookmarked, addBookmark, removeBookmark, incrementViewCount, addToHistory, showToast } = useApp();
  const [article, setArticle] = useState<Article | null>(null);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all articles and find the matching one
    fetch('/api/articles')
      .then((res) => res.json())
      .then((articles: Article[]) => {
        const found = articles.find((a) => a.id === params.id);
        setArticle(found || null);
        setAllArticles(articles);
        
        // Track reading history and view count
        if (found) {
          incrementViewCount(found.id);
          addToHistory(found.id);

          // Find related articles (same category, excluding current)
          const related = articles
            .filter((a) => a.category === found.category && a.id !== found.id)
            .slice(0, 3);
          setRelatedArticles(related);
        }
        
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching article:', error);
        setLoading(false);
      });
  }, [params.id, incrementViewCount, addToHistory]);

  const handlePrint = () => {
    window.print();
    showToast('Preparing to print...', 'info');
  };

  const handleBookmark = () => {
    if (!article) return;
    if (isBookmarked(article.id)) {
      removeBookmark(article.id);
    } else {
      addBookmark(article.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🌱</div>
            <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400 animate-pulse">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <div className="flex flex-col items-center justify-center py-32 px-4">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🤔</span>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Article Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Sorry, we couldn't find that article.</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              ← Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const expandedContent = getExpandedContent(article.id);
  const additionalScriptures = getAdditionalScriptures(article.id);
  const practicalSteps = getPracticalSteps(article.id);
  const readTime = getArticleContentLength(article);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const bookmarked = isBookmarked(article.id);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: article.title, href: `/article/${article.id}` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Back Button & Actions Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fadeIn no-print">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg shadow transition-colors"
              title={bookmarked ? 'Remove bookmark' : 'Save for later'}
            >
              {bookmarked ? (
                <>
                  <svg className="w-5 h-5 text-purple-600 fill-current" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:inline">Saved</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:inline">Save</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg shadow transition-colors"
              title="Print or save as PDF"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 print-friendly">
        <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
          {/* Category Badge */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 flex items-center justify-between no-print">
            <span className="text-sm font-semibold uppercase tracking-wide">
              {article.category}
            </span>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
              {formatReadTime(readTime)}
            </span>
          </div>

          <div className="p-6 md:p-10">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Source & Date */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
              <p className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
                Source: {article.source}
              </p>
              {article.lastUpdated && (
                <p className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-pink-400 rounded-full"></span>
                  {new Date(article.lastUpdated).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Share Buttons */}
            <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-700 no-print">
              <ShareButtons url={currentUrl} title={article.title} />
            </div>

            {/* What's Happening - Expanded Summary */}
            <div className="mb-10">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-4xl" role="img" aria-label="Newspaper">📰</span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What's Happening</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                <p className="font-medium text-gray-900 dark:text-white">
                  {article.summary}
                </p>
                <p>
                  {expandedContent.detailedSummary}
                </p>
              </div>
            </div>

            {/* Why This Matters */}
            <div className="mb-10 bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 md:p-8 border-l-4 border-purple-400">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl" role="img" aria-label="Lightbulb">💡</span>
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100">Why This Matters</h2>
              </div>
              <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                {expandedContent.significance}
              </p>
            </div>

            {/* Biblical Perspective - Expanded */}
            <div className="border-t-2 border-purple-100 dark:border-purple-900/50 pt-10 mb-10">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-5xl" role="img" aria-label="Sparkles">✨</span>
                <h2 className="text-4xl font-bold text-purple-900 dark:text-purple-100">
                  Biblical Perspective
                </h2>
              </div>

              <div className="space-y-8">
                {/* Main Biblical Lesson */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">The Big Picture</h3>
                  <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                    {article.biblicalLesson}
                  </p>
                </div>

                {/* Primary Scripture */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 md:p-8 border-l-4 border-purple-600">
                  <p className="text-lg font-medium text-purple-900 dark:text-purple-100 italic leading-relaxed">
                    {article.verse}
                  </p>
                </div>

                {/* Deeper Biblical Analysis */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Digging Deeper</h3>
                  <div className="space-y-4 text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                    <p>{expandedContent.biblicalContext}</p>
                    <p>{expandedContent.biblicalApplication}</p>
                  </div>
                </div>

                {/* Additional Scripture Connections */}
                {additionalScriptures.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">More Scripture Connections</h3>
                    <div className="space-y-3">
                      {additionalScriptures.map((scripture, index) => (
                        <div key={index} className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 border-l-2 border-purple-400">
                          <p className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2">{scripture.reference}</p>
                          <p className="text-base text-gray-800 dark:text-gray-200 italic mb-2">&quot;{scripture.text}&quot;</p>
                          {scripture.context && (
                            <p className="text-sm text-gray-700 dark:text-gray-300">{scripture.context}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Practical Application - Expanded */}
            <div className="border-t-2 border-pink-100 dark:border-pink-900/50 pt-10 mb-10">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-5xl" role="img" aria-label="Target">🎯</span>
                <h2 className="text-4xl font-bold text-pink-900 dark:text-pink-100">
                  Living It Out
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                  {expandedContent.practicalIntro}
                </p>

                <div className="space-y-4">
                  {practicalSteps.map((step, index) => (
                    <div key={index} className="flex gap-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6 border-l-4 border-pink-400">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-600 text-white font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">{step.title}</h4>
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reflection Questions */}
            <div className="mb-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl" role="img" aria-label="Thinking">🤔</span>
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">Questions to Consider</h3>
              </div>
              <ul className="space-y-3 text-gray-800 dark:text-gray-200 text-lg">
                {expandedContent.reflectionQuestions.map((question, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="text-center border-t-2 border-gray-200 dark:border-gray-700 pt-8 mb-10 no-print">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Want to Learn More?
              </h3>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <span>Read Original Article</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">
                Opens in new tab
              </p>
            </div>

            {/* Share Again */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 no-print">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Share this article with friends</h3>
              <ShareButtons url={currentUrl} title={article.title} />
            </div>
          </div>
        </article>

        {/* Discussion Prompt */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-purple-600 animate-slideUp no-print" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-3">
            <span className="text-3xl" role="img" aria-label="Chat">💬</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Start a Conversation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Talk about this article with your friends, small group, or family. Share how God is speaking to you through this topic and listen to others' perspectives. Faith grows deeper in community.
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 animate-slideUp no-print" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-3xl" role="img" aria-label="Link">🔗</span>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
