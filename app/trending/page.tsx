'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { ArticleGridSkeleton } from '../components/LoadingSkeletons';
import { useApp } from '../context/AppContext';
import { Article } from '../api/articles/route';

export default function TrendingPage() {
  const { getViewCount } = useApp();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then((data: Article[]) => {
        // Sort by view count (most popular first)
        const sorted = data.sort((a, b) => {
          const viewsA = getViewCount(a.id);
          const viewsB = getViewCount(b.id);
          if (viewsB !== viewsA) return viewsB - viewsA;
          
          // If views are equal, sort by recency
          const dateA = new Date(a.lastUpdated || a.id).getTime();
          const dateB = new Date(b.lastUpdated || b.id).getTime();
          return dateB - dateA;
        });
        
        setArticles(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [getViewCount]);

  const topArticles = articles.slice(0, 3);
  const otherArticles = articles.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl mb-4 block" role="img" aria-label="Fire emoji">🔥</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trending Now</h1>
          <p className="text-xl opacity-95 max-w-2xl mx-auto">
            The most-read articles and hottest topics in the Rooted community
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        {loading ? (
          <ArticleGridSkeleton count={9} />
        ) : (
          <>
            {/* Top 3 */}
            {topArticles.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span role="img" aria-label="Trophy emoji">🏆</span>
                  Top 3 Most Popular
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {topArticles.map((article, index) => (
                    <div key={article.id} className="relative">
                      <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                        {index + 1}
                      </div>
                      <ArticleCard article={article} featured={index === 0} />
                      <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        {getViewCount(article.id)} views
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Rest of Articles */}
            {otherArticles.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">More Trending Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherArticles.map(article => (
                    <div key={article.id}>
                      <ArticleCard article={article} />
                      <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        {getViewCount(article.id)} views
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Stats Section */}
            <section className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Trending Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Array.from(new Set(articles.map(a => a.category))).map(category => {
                  const count = articles.filter(a => a.category === category).length;
                  return (
                    <div key={category} className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{count}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{category}</div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
