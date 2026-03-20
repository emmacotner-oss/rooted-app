'use client';

import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12">
          <span className="text-9xl mb-6 block animate-bounce" role="img" aria-label="Confused emoji">🤔</span>
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Looks like this page wandered off. Maybe it's exploring pop culture somewhere else? 
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              Go to Homepage
            </button>
            <button
              onClick={() => router.back()}
              className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Try these instead:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => router.push('/articles')}
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                Browse All Articles
              </button>
              <button
                onClick={() => router.push('/categories')}
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                Explore Categories
              </button>
              <button
                onClick={() => router.push('/daily-insight')}
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                Daily Insight
              </button>
              <button
                onClick={() => router.push('/resources')}
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                Resources & FAQ
              </button>
            </div>
          </div>

          {/* Encouraging Quote */}
          <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <p className="text-gray-700 dark:text-gray-300 italic mb-2">
              "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, 
              plans to give you hope and a future."
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
              Jeremiah 29:11
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
