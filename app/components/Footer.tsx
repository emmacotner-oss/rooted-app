import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌱</span>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Rooted
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Connecting faith with the world around us. Exploring pop culture through a biblical lens.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/daily-insight" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  Daily Insight
                </Link>
              </li>
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Our Mission</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Helping teens discover biblical truth in everyday culture and grow deeper in their faith through relevant conversations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 text-sm mb-2">
            Rooted: Made with faith and purpose 💜
          </p>
          <p className="text-gray-400 text-xs">
            © {currentYear} Rooted. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
