'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl mb-4 block" role="img" aria-label="Handshake emoji">🤝</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Guidelines</h1>
          <p className="text-xl opacity-95 max-w-2xl mx-auto">
            What Rooted stands for and how we engage respectfully
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        {/* Mission Statement */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span role="img" aria-label="Target emoji">🎯</span>
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Rooted exists to help teens explore pop culture through a biblical lens. We believe God's truth is 
            relevant to every area of life—including the celebrities, trends, music, and conversations shaping 
            your world. Our goal is to equip you to think critically, engage culture thoughtfully, and live out 
            your faith authentically in everyday moments.
          </p>
        </section>

        {/* Core Values */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '📖',
                title: 'Scripture-Centered',
                description: 'The Bible is our foundation. Every insight, perspective, and principle we share is rooted in God\'s Word.'
              },
              {
                icon: '❤️',
                title: 'Grace-Filled',
                description: 'We approach culture—and each other—with compassion, humility, and the same grace God extends to us.'
              },
              {
                icon: '🧠',
                title: 'Thoughtful Engagement',
                description: 'We encourage critical thinking, asking questions, and wrestling with hard topics in light of biblical truth.'
              },
              {
                icon: '🌍',
                title: 'Culturally Relevant',
                description: 'Faith isn\'t isolated from the world. We engage the trends and conversations that matter to you.'
              },
              {
                icon: '🤝',
                title: 'Community-Oriented',
                description: 'We\'re better together. This platform thrives when we learn from and encourage one another.'
              },
              {
                icon: '✨',
                title: 'Hopeful & Redemptive',
                description: 'God is at work in all things. We look for His truth, beauty, and redemption even in broken culture.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <span className="text-4xl mb-3 block" role="img" aria-label={value.title}>{value.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Believe */}
        <section className="mb-12 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What We Believe</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✓</span>
              <span>The Bible is God's inspired, authoritative Word and our ultimate source of truth.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✓</span>
              <span>Jesus Christ is the Son of God, our Savior, and the center of our faith.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✓</span>
              <span>Every person is created in God's image with infinite worth and value.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✓</span>
              <span>Faith and culture intersect—we're called to be IN the world but not OF the world.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✓</span>
              <span>God's grace is sufficient. We don't have to be perfect; we're being transformed.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✓</span>
              <span>Following Jesus means loving God and loving others—including those who disagree with us.</span>
            </p>
          </div>
        </section>

        {/* Engagement Guidelines */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How We Engage</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">✓ Speak Truth with Love</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Truth without love is harsh. Love without truth is shallow. We aim to hold both—speaking God's 
                truth clearly while extending grace and compassion.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">✓ Listen First, Respond Second</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We seek to understand before being understood. Good conversation starts with listening well, 
                asking questions, and valuing different perspectives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">✓ Disagree Respectfully</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Not everyone will agree on every topic—and that's okay. We can disagree without being 
                disrespectful, dismissive, or divisive.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">✓ Ask Questions</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Wrestling with hard topics is part of faith. Don't be afraid to ask questions, explore doubts, 
                and seek deeper understanding.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">✓ Assume the Best</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Give people the benefit of the doubt. We're all learning and growing. Extend the same patience 
                and grace you'd want to receive.
              </p>
            </div>
          </div>
        </section>

        {/* What We Don't Do */}
        <section className="mb-12 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">What We Don't Do</h2>
          <div className="space-y-3 text-red-800 dark:text-red-200">
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✕</span>
              <span><strong>Cancel Culture:</strong> We don't tear down people. Everyone is loved by God and capable of growth.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✕</span>
              <span><strong>Judgment:</strong> Only God knows the heart. We speak truth, but we don't condemn.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✕</span>
              <span><strong>Legalism:</strong> Following Jesus is about relationship, not rule-keeping. Grace leads to transformation.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✕</span>
              <span><strong>Compromise Truth:</strong> Love doesn't mean watering down God's Word. Truth and love coexist.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl mt-1">✕</span>
              <span><strong>Isolation:</strong> We don't withdraw from culture—we engage it thoughtfully with biblical wisdom.</span>
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Rooted Community</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            We're building a community of teens who love Jesus, think critically, and engage culture with wisdom and grace. 
            Will you join us?
          </p>
          <p className="italic opacity-90">
            "Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone." 
            <br />
            <span className="text-sm">— Colossians 4:6</span>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
