'use client';

import { useState, useEffect } from 'react';
import { Article } from './api/articles/route';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Try to fetch fresh articles first
    fetch('/api/update-articles')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          setLastUpdated(new Date(data.lastUpdated).toLocaleString());
        } else {
          // Fallback to static articles
          return fetch('/api/articles').then(res => res.json());
        }
      })
      .then((fallbackData) => {
        if (fallbackData) {
          setArticles(fallbackData);
          setLastUpdated(new Date().toLocaleString());
        }
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        // Last resort: try static articles
        fetch('/api/articles')
          .then((res) => res.json())
          .then((data) => {
            setArticles(data);
            setLastUpdated(new Date().toLocaleString());
          })
          .finally(() => setLoading(false));
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(articles.map(a => a.category))];
  
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-2xl font-semibold text-purple-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Rooted
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Pop Culture Through a Biblical Lens 🌱
            </p>
            {lastUpdated && (
              <p className="text-gray-400 text-xs mt-2">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Category Badge */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between">
                  <span>{article.category}</span>
                  <span className="text-xs">🔗</span>
                </div>

                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Source */}
                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
                    {article.source}
                  </p>

                  {/* Summary */}
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Biblical Lesson Section */}
                  <div className="border-t border-purple-100 pt-4 mt-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-2xl mt-1">✨</span>
                      <div>
                        <h3 className="font-semibold text-purple-900 text-sm mb-1">
                          Biblical Perspective
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {article.biblicalLesson}
                        </p>
                      </div>
                    </div>

                    {/* Bible Verse */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-purple-900 italic">
                        {article.verse}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found in this category.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
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
