'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

interface Resource {
  title: string;
  description: string;
  link?: string;
  phone?: string;
  category: 'crisis' | 'book' | 'website' | 'app' | 'guide';
}

interface FAQ {
  question: string;
  answer: string;
}

const resources: Resource[] = [
  {
    title: 'National Suicide Prevention Lifeline',
    description: '24/7 free and confidential support for people in distress',
    phone: '988',
    category: 'crisis'
  },
  {
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741 for 24/7 crisis support',
    phone: '741741',
    category: 'crisis'
  },
  {
    title: 'Teen Line',
    description: 'Peer-to-peer support for teens. Call or text 6-10pm PST',
    phone: '1-800-852-8336',
    category: 'crisis'
  },
  {
    title: 'YouVersion Bible App',
    description: 'Free Bible app with reading plans, devotionals, and community features',
    link: 'https://www.bible.com',
    category: 'app'
  },
  {
    title: 'The Case for Christ (Lee Strobel)',
    description: 'Journalist investigates evidence for Christianity',
    category: 'book'
  },
  {
    title: 'Mere Christianity (C.S. Lewis)',
    description: 'Classic exploration of Christian faith and reasoning',
    category: 'book'
  },
  {
    title: 'The Purpose Driven Life (Rick Warren)',
    description: 'Discover God\'s purpose for your life in 40 days',
    category: 'book'
  },
  {
    title: 'Desiring God',
    description: 'Articles, sermons, and resources for Christian living',
    link: 'https://www.desiringgod.org',
    category: 'website'
  },
  {
    title: 'The Gospel Coalition',
    description: 'Biblical wisdom on faith, culture, and current events',
    link: 'https://www.thegospelcoalition.org',
    category: 'website'
  }
];

const faqs: FAQ[] = [
  {
    question: 'What is Rooted?',
    answer: 'Rooted is a platform that explores trending pop culture topics through a biblical lens. We help teens understand how faith intersects with the celebrities, music, trends, and conversations shaping today\'s world.'
  },
  {
    question: 'How do I use this platform?',
    answer: 'Browse articles by category, search for topics you\'re interested in, save articles to your bookmarks, and explore daily insights. Each article offers biblical perspective, practical application, and reflection questions.'
  },
  {
    question: 'Why does pop culture matter to my faith?',
    answer: 'Pop culture shapes how we think, what we value, and who we become. As Christians, we\'re called to engage thoughtfully with culture—not to conform to it or completely reject it, but to understand it through God\'s truth and be a light in it.'
  },
  {
    question: 'What if I disagree with an article?',
    answer: 'That\'s okay! We encourage critical thinking and respectful dialogue. Use the reflection questions to process your thoughts, discuss with trusted friends or mentors, and always test everything against Scripture.'
  },
  {
    question: 'How can I grow in my faith through this platform?',
    answer: 'Read regularly, engage with the reflection questions, study the Scripture references provided, talk about what you\'re learning with others, and apply the practical steps in your daily life.'
  },
  {
    question: 'Can I suggest topics to cover?',
    answer: 'Absolutely! Use our Submit a Story form to suggest trending topics you\'d like to see explored from a biblical perspective. We love hearing what matters to you.'
  },
  {
    question: 'Is Rooted associated with a specific church or denomination?',
    answer: 'Rooted is built on orthodox Christian beliefs and biblical truth. We aim to serve teens from all Christian backgrounds with grace, humility, and a commitment to Scripture.'
  },
  {
    question: 'What Bible translation do you use?',
    answer: 'We primarily use NIV (New International Version) for readability, but we encourage you to study multiple translations and dig deeper into God\'s Word.'
  }
];

export default function ResourcesPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedResourceType, setSelectedResourceType] = useState<string>('all');

  const resourceCategories = [
    { value: 'all', label: 'All Resources', icon: '📚' },
    { value: 'crisis', label: 'Crisis Support', icon: '🆘' },
    { value: 'book', label: 'Books', icon: '📖' },
    { value: 'website', label: 'Websites', icon: '🌐' },
    { value: 'app', label: 'Apps', icon: '📱' }
  ];

  const filteredResources = selectedResourceType === 'all' 
    ? resources 
    : resources.filter(r => r.category === selectedResourceType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl mb-4 block" role="img" aria-label="Resources emoji">🎒</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources & FAQ</h1>
          <p className="text-xl opacity-95 max-w-2xl mx-auto">
            Helpful tools, crisis support, recommended reading, and answers to common questions
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        {/* Crisis Support Banner */}
        <div className="mb-12 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl" role="img" aria-label="Emergency">🆘</span>
            <div>
              <h2 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
                Need Help Right Now?
              </h2>
              <p className="text-red-800 dark:text-red-200 mb-3">
                If you're in crisis or experiencing thoughts of suicide, please reach out immediately:
              </p>
              <div className="space-y-2">
                <p className="text-red-900 dark:text-red-100 font-semibold">
                  📞 Call/Text 988 - National Suicide Prevention Lifeline (24/7)
                </p>
                <p className="text-red-900 dark:text-red-100 font-semibold">
                  💬 Text HOME to 741741 - Crisis Text Line (24/7)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Helpful Resources</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {resourceCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedResourceType(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedResourceType === cat.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                <span className="mr-2" role="img" aria-label={cat.label}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((resource, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-3xl" role="img" aria-label={resource.category}>
                    {resource.category === 'crisis' ? '🆘' : 
                     resource.category === 'book' ? '📖' : 
                     resource.category === 'website' ? '🌐' : 
                     resource.category === 'app' ? '📱' : '📚'}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {resource.description}
                    </p>
                    {resource.phone && (
                      <a
                        href={`tel:${resource.phone}`}
                        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline"
                      >
                        <span>📞</span> {resource.phone}
                      </a>
                    )}
                    {resource.link && (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline"
                      >
                        Visit Website <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  aria-expanded={expandedFAQ === index}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* What the Bible Says */}
        <section className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span role="img" aria-label="Bible">📖</span>
            What the Bible Says...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                topic: 'About Anxiety',
                verse: 'Philippians 4:6-7',
                text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'
              },
              {
                topic: 'About Your Worth',
                verse: 'Psalm 139:14',
                text: 'I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.'
              },
              {
                topic: 'About God\'s Plan',
                verse: 'Jeremiah 29:11',
                text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.'
              },
              {
                topic: 'About Love',
                verse: '1 John 4:19',
                text: 'We love because he first loved us.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-purple-500">
                <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-2">{item.topic}</h3>
                <p className="text-gray-700 dark:text-gray-300 italic mb-2">"{item.text}"</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{item.verse}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
