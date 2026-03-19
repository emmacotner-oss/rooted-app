'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import { Article } from '../api/articles/route';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data: Article[]) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!query || articles.length === 0) {
      setFilteredArticles([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(lowerQuery) ||
        article.summary.toLowerCase().includes(lowerQuery) ||
        article.category.toLowerCase().includes(lowerQuery) ||
        article.biblicalLesson.toLowerCase().includes(lowerQuery) ||
        article.source.toLowerCase().includes(lowerQuery)
      );
    });

    setFilteredArticles(results);
  }, [query, articles]);

  const handleSearch = (newQuery: string) => {
    window.location.href = `/search?q=${encodeURIComponent(newQuery)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-2xl font-semibold text-purple-600 animate-pulse">Searching...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Search Articles
          </h1>
          <SearchBar onSearch={handleSearch} placeholder="Search by title, category, topic..." />
        </div>

        {/* Results */}
        {query && (
          <div className="mb-8 animate-slideUp">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredArticles.length > 0
                ? `Found ${filteredArticles.length} result${filteredArticles.length === 1 ? '' : 's'} for "${query}"`
                : `No results found for "${query}"`}
            </h2>
            {filteredArticles.length > 0 && (
              <p className="text-gray-600">
                Showing all articles matching your search
              </p>
            )}
          </div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16 animate-slideUp">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try searching with different keywords or browse all articles on the homepage.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              Browse All Articles
            </a>
          </div>
        ) : (
          <div className="text-center py-16 animate-slideUp">
            <span className="text-6xl mb-4 block">✨</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Search</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Search for articles by topic, category, celebrity name, or biblical theme.
            </p>
            
            {/* Popular Searches */}
            <div className="max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-gray-700 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Mental Health', 'Self-Worth', 'Relationships', 'Contentment', 'Service', 'Family'].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleSearch(topic)}
                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-all shadow hover:shadow-md"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-purple-600 animate-pulse">Loading...</div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
