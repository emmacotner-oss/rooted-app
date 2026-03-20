import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl" role="img" aria-label="Plant emoji">🌱</span>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Rooted
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Connecting faith with the world around us. Exploring pop culture through a biblical lens.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/daily-insight" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Daily Insight
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Resources & FAQ
                </Link>
              </li>
              <li>
                <Link href="/scripture-library" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Scripture Library
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  My Bookmarks
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/submit-story" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Submit a Topic
                </Link>
              </li>
              <li>
                <Link href="/community-guidelines" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Scripture Quote */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 pb-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-700 dark:text-gray-300 italic mb-2">
              "Do not conform to the pattern of this world, but be transformed by the renewing of your mind."
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
              Romans 12:2
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            Rooted: Made with faith and purpose <span role="img" aria-label="Purple heart">💜</span>
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            © {currentYear} Rooted. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
