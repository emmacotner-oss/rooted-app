'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { Article } from '../api/articles/route';

interface ScriptureReference {
  reference: string;
  text: string;
  articleIds: string[];
  articleTitles: string[];
}

export default function ScriptureLibraryPage() {
  const router = useRouter();
  const [scriptures, setScriptures] = useState<ScriptureReference[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Build scripture index from articles
    fetch('/api/articles')
      .then(res => res.json())
      .then((articles: Article[]) => {
        const scriptureMap = new Map<string, ScriptureReference>();

        articles.forEach(article => {
          if (article.scripture) {
            const ref = article.scripture.reference;
            if (!scriptureMap.has(ref)) {
              scriptureMap.set(ref, {
                reference: ref,
                text: article.scripture.text,
                articleIds: [],
                articleTitles: []
              });
            }
            const scripture = scriptureMap.get(ref)!;
            scripture.articleIds.push(article.id);
            scripture.articleTitles.push(article.title);
          }
        });

        const scriptureList = Array.from(scriptureMap.values())
          .sort((a, b) => sortBibleReferences(a.reference, b.reference));
        
        setScriptures(scriptureList);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredScriptures = searchQuery
    ? scriptures.filter(s =>
        s.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : scriptures;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl mb-4 block" role="img" aria-label="Bible emoji">📖</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Scripture Library</h1>
          <p className="text-xl opacity-95 max-w-2xl mx-auto">
            Explore all Bible verses referenced across our articles. God's Word is living and active.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        {/* Search */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by reference or text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              aria-label="Search scriptures"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {!loading && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-purple-600 dark:text-purple-400">{filteredScriptures.length}</span> of <span className="font-semibold">{scriptures.length}</span> scripture references
            </p>
          )}
        </div>

        {/* Scripture List */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-3">
                <div className="h-6 skeleton w-1/3 rounded"></div>
                <div className="h-4 skeleton w-full rounded"></div>
                <div className="h-4 skeleton w-2/3 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredScriptures.length > 0 ? (
          <div className="space-y-4">
            {filteredScriptures.map((scripture, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                    {scripture.reference}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">
                    "{scripture.text}"
                  </p>
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Referenced in {scripture.articleIds.length} article{scripture.articleIds.length !== 1 ? 's' : ''}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {scripture.articleIds.map((id, i) => (
                        <button
                          key={id}
                          onClick={() => router.push(`/article/${id}`)}
                          className="text-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                          title={scripture.articleTitles[i]}
                        >
                          {truncateTitle(scripture.articleTitles[i], 40)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <span className="text-6xl mb-4 block" role="img" aria-label="Search emoji">🔍</span>
            <p className="text-gray-600 dark:text-gray-300 text-lg">No scriptures found</p>
          </div>
        )}

        {/* Explore More */}
        <div className="mt-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want to explore God's Word further?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Check out our recommended Bible apps and study resources
          </p>
          <button
            onClick={() => router.push('/resources')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            View Resources
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function sortBibleReferences(a: string, b: string): number {
  // Simple sorting - could be enhanced with proper biblical book order
  const bookOrder = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
    '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther',
    'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
    'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel',
    'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
    'Matthew', 'Mark', 'Luke', 'John',
    'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians',
    '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
    'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
  ];

  const bookA = a.split(' ')[0];
  const bookB = b.split(' ')[0];
  const indexA = bookOrder.indexOf(bookA);
  const indexB = bookOrder.indexOf(bookB);

  if (indexA !== indexB) return indexA - indexB;
  return a.localeCompare(b);
}

function truncateTitle(title: string, maxLength: number): string {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength) + '...';
}
