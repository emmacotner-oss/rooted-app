'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { ArticleGridSkeleton } from '../components/LoadingSkeletons';
import { useApp } from '../context/AppContext';
import { Article } from '../api/articles/route';

export default function BookmarksPage() {
  const router = useRouter();
  const { bookmarks } = useApp();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookmarks.length === 0) {
      setLoading(false);
      return;
    }

    fetch('/api/articles')
      .then(res => res.json())
      .then((data: Article[]) => {
        const bookmarkedArticles = data.filter(a => bookmarks.includes(a.id));
        setArticles(bookmarkedArticles);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [bookmarks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl mb-4 block" role="img" aria-label="Bookmark emoji">🔖</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Bookmarks</h1>
          <p className="text-xl opacity-95 max-w-2xl mx-auto">
            Articles you've saved for later reading
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        {loading ? (
          <ArticleGridSkeleton />
        ) : articles.length > 0 ? (
          <>
            <div className="mb-6 text-gray-600 dark:text-gray-400">
              <p className="text-sm">
                You have <span className="font-semibold text-purple-600 dark:text-purple-400">{articles.length}</span> saved article{articles.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <span className="text-6xl mb-4 block" role="img" aria-label="Empty bookmark emoji">📭</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Bookmarks Yet</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Start saving articles you want to read later. Click the bookmark icon on any article card to save it.
            </p>
            <button
              onClick={() => router.push('/articles')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              Browse Articles
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
