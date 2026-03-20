'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleCard from './components/ArticleCard';
import SearchBar from './components/SearchBar';
import { Article } from './api/articles/route';

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [stats, setStats] = useState({ total: 0, categories: 0 });

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

  useEffect(() => {
    // Calculate stats
    if (articles.length > 0) {
      const categories = new Set(articles.map(a => a.category));
      setStats({
        total: articles.length,
        categories: categories.size,
      });
    }
  }, [articles]);

  const categories = ['all', ...new Set(articles.map(a => a.category))];
  
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  // Get featured article (most recent with lastUpdated)
  const featuredArticle = articles
    .filter(a => a.lastUpdated)
    .sort((a, b) => {
      const dateA = new Date(a.lastUpdated || 0).getTime();
      const dateB = new Date(b.lastUpdated || 0).getTime();
      return dateB - dateA;
    })[0];

  const regularArticles = featuredArticle 
    ? filteredArticles.filter(a => a.id !== featuredArticle.id)
    : filteredArticles;

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">✨</div>
          <div className="text-2xl font-semibold text-purple-600 animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-6xl mb-4 block">✝️</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Rooted
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              Pop Culture Meets Biblical Truth
            </p>
            <p className="text-lg mb-8 opacity-90">
              Stay rooted in your faith while engaging with the trends, celebrities, and conversations teens are actually talking about
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-sm opacity-90">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.categories}</div>
                <div className="text-sm opacity-90">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm opacity-90">Insights</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 animate-slideUp">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/daily-insight')}
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl p-6 transition-all hover:-translate-y-1 text-left"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">💡</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Daily Insight
                </h3>
                <p className="text-gray-600 text-sm">Fresh perspective every day</p>
              </div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => router.push('/about')}
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl p-6 transition-all hover:-translate-y-1 text-left"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">✨</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  About Rooted
                </h3>
                <p className="text-gray-600 text-sm">Learn our mission & vision</p>
              </div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Featured Article */}
      {featuredArticle && selectedCategory === 'all' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">⭐</span>
            Featured Article
          </h2>
          <ArticleCard article={featuredArticle} featured={true} />
        </div>
      )}

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-slideUp" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow hover:shadow-md'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        {regularArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp" style={{ animationDelay: '0.4s' }}>
            {regularArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-slideUp">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-gray-500 text-lg">No articles found in this category.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              View All Articles
            </button>
          </div>
        )}

        {/* Last Updated */}
        {lastUpdated && (
          <div className="text-center mt-12 text-sm text-gray-400">
            Last updated: {lastUpdated}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
