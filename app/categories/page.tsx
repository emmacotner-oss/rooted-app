'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { CategoryCardSkeleton } from '../components/LoadingSkeletons';
import { categoryInfo, getAllCategories } from '../utils/categories';

export default function CategoriesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [articleCounts, setArticleCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch articles to count by category
    fetch('/api/articles')
      .then(res => res.json())
      .then(articles => {
        const counts: Record<string, number> = {};
        articles.forEach((article: any) => {
          const cat = article.category.toLowerCase();
          counts[cat] = (counts[cat] || 0) + 1;
        });
        setArticleCounts(counts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl mb-4 block" role="img" aria-label="Category emoji">📚</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore by Category</h1>
          <p className="text-xl opacity-95 max-w-2xl mx-auto">
            Dive deep into topics that matter to you. Each category offers biblical wisdom for real-life situations.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => {
              const info = categoryInfo[category];
              const count = articleCounts[category] || 0;

              return (
                <button
                  key={category}
                  onClick={() => router.push(`/categories/${category.replace(/\s+/g, '-')}`)}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl p-8 transition-all hover:-translate-y-2 text-left"
                >
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl" role="img" aria-label={`${info.name} icon`}>{info.icon}</span>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {info.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {count} article{count !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {info.description}
                  </p>

                  {/* Featured Verse */}
                  <div className={`bg-gradient-to-r ${info.color} bg-opacity-10 dark:bg-opacity-20 rounded-lg p-4 border-l-4 border-purple-500`}>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      "{info.verses[0].split(' - ')[1]}"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-semibold">
                      {info.verses[0].split(' - ')[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Submit a trending topic you'd like to see explored through a biblical lens.
          </p>
          <button
            onClick={() => router.push('/submit-story')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            Submit a Topic
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
