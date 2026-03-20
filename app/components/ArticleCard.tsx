'use client';

import Link from 'next/link';
import { Article } from '../api/articles/route';
import { getArticleContentLength, formatReadTime } from '../utils/readTime';
import { useApp } from '../context/AppContext';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

function getTimeAgo(dateString?: string): string {
  if (!dateString) return 'Recently added';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const readTime = getArticleContentLength(article);
  const { isBookmarked, addBookmark, removeBookmark } = useApp();
  const bookmarked = isBookmarked(article.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article.id);
    }
  };

  if (featured) {
    return (
      <Link href={`/article/${article.id}`}>
        <article className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative p-8 md:p-10">
            {/* Category Badge & Bookmark */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full">
                {article.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBookmarkClick}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors no-print"
                  title={bookmarked ? 'Remove bookmark' : 'Save for later'}
                  aria-label={bookmarked ? 'Remove bookmark' : 'Save for later'}
                >
                  {bookmarked ? (
                    <svg className="w-6 h-6 text-purple-600 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  )}
                </button>
                <span className="text-2xl" role="img" aria-label="Star">⭐</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {article.title}
            </h2>

            {/* Summary */}
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 line-clamp-3">
              {article.summary}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {formatReadTime(readTime)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {getTimeAgo(article.lastUpdated)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Read Article
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.id}`}>
      <article className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
        {/* Category Badge */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between">
          <span>{article.category}</span>
          <button
            onClick={handleBookmarkClick}
            className="p-1 rounded hover:bg-white/20 transition-colors no-print"
            title={bookmarked ? 'Remove bookmark' : 'Save for later'}
            aria-label={bookmarked ? 'Remove bookmark' : 'Save for later'}
          >
            {bookmarked ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {article.title}
          </h2>

          {/* Source */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
            {article.source}
          </p>

          {/* Summary */}
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
            {article.summary}
          </p>

          {/* Footer */}
          <div className="border-t border-purple-100 dark:border-purple-900/50 pt-4 mt-auto">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {formatReadTime(readTime)}
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {getTimeAgo(article.lastUpdated)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
