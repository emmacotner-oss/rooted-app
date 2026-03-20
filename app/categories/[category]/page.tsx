'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ArticleCard from '../../components/ArticleCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import { ArticleGridSkeleton } from '../../components/LoadingSkeletons';
import { getCategoryInfo } from '../../utils/categories';
import { Article } from '../../api/articles/route';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.category as string;
  const categoryName = categorySlug.replace(/-/g, ' ');
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryInfo = getCategoryInfo(categoryName);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then((data: Article[]) => {
        const filtered = data.filter(a => 
          a.category.toLowerCase() === categoryName.toLowerCase()
        );
        setArticles(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryName]);

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <span className="text-6xl mb-4 block">🤔</span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Category Not Found</h1>
          <button
            onClick={() => router.push('/categories')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            Browse All Categories
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: categoryInfo.name, href: `/categories/${categorySlug}` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero */}
      <div className={`bg-gradient-to-r ${categoryInfo.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-6xl mb-4 block" role="img" aria-label={`${categoryInfo.name} icon`}>
              {categoryInfo.icon}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryInfo.name}</h1>
            <p className="text-xl opacity-95 mb-6">{categoryInfo.description}</p>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm italic mb-1">"{categoryInfo.verses[0].split(' - ')[1]}"</p>
              <p className="text-xs font-semibold">{categoryInfo.verses[0].split(' - ')[0]}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Key Verses Section */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span role="img" aria-label="Bible emoji">📖</span>
            Key Scripture Passages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryInfo.verses.map((verse, index) => {
              const [ref, text] = verse.split(' - ');
              return (
                <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="text-gray-700 dark:text-gray-300 italic mb-2">"{text}"</p>
                  <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">{ref}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Articles */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Articles in {categoryInfo.name}
            {!loading && <span className="text-gray-500 dark:text-gray-400 text-xl ml-2">({articles.length})</span>}
          </h2>

          {loading ? (
            <ArticleGridSkeleton />
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <span className="text-6xl mb-4 block" role="img" aria-label="Empty box emoji">📭</span>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                No articles yet in this category, but we're working on it!
              </p>
              <button
                onClick={() => router.push('/submit-story')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
              >
                Suggest a Topic
              </button>
            </div>
          )}
        </div>

        {/* Related Categories */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Explore More Categories</h3>
          <button
            onClick={() => router.push('/categories')}
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            View All Categories
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
