import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <span className="text-6xl mb-4 block">🌱</span>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            About Rooted
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting faith with the world around us through pop culture conversations
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 animate-slideUp">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl">💜</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Rooted exists to help teens discover biblical truth in everyday culture. We believe that God speaks through all of life—including the movies you watch, the music you listen to, and the trends you follow.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Instead of rejecting pop culture or consuming it uncritically, we want to equip you to engage thoughtfully, discern wisely, and grow deeper in your faith through relevant conversations.
              </p>
            </div>
          </div>
        </div>

        {/* Emma's Vision */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 md:p-12 mb-8 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-4">
            <span className="text-4xl">✨</span>
            <div>
              <h2 className="text-3xl font-bold text-purple-900 mb-4">Teen Discipleship Through Pop Culture</h2>
              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                Too often, faith and culture are presented as opposites—you're either "worldly" or "spiritual." But that's not how Jesus lived. He engaged the culture around Him, told stories people understood, and met people where they were.
              </p>
              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                At Rooted, we use <strong>pop culture as the primary communication language</strong> for discipleship. We talk about the things you're already talking about—celebrities, trends, social media, music, movies—and ask: What does God's Word say about this? How does this connect to faith? What truth can we find here?
              </p>
              <p className="text-gray-800 text-lg leading-relaxed">
                Our goal isn't to make you reject culture. It's to help you navigate it with biblical wisdom, discernment, and a deeper love for Jesus.
              </p>
            </div>
          </div>
        </div>

        {/* What We Believe */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">📖</span>
            What We Believe
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-purple-600 font-bold text-xl flex-shrink-0">•</span>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>The Bible is our foundation.</strong> Everything we say is rooted in Scripture, not just opinions or feelings.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="text-purple-600 font-bold text-xl flex-shrink-0">•</span>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>Culture isn't the enemy.</strong> God created beauty, creativity, and storytelling—and He can use all of it to point us to truth.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="text-purple-600 font-bold text-xl flex-shrink-0">•</span>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>You can think critically.</strong> We don't tell you what to think—we equip you to discern truth and apply it to your life.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="text-purple-600 font-bold text-xl flex-shrink-0">•</span>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>Faith is for everyday life.</strong> Following Jesus isn't just about church on Sunday—it's about how you live Monday through Saturday.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="text-purple-600 font-bold text-xl flex-shrink-0">•</span>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>You are loved exactly as you are.</strong> You don't have to have it all together to belong here. God meets you where you are and invites you to grow.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            How Rooted Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">We curate relevant pop culture topics</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our team finds the trending stories, celebrity moments, and cultural conversations that teens are already talking about.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">We connect it to biblical truth</h3>
                <p className="text-gray-700 leading-relaxed">
                  Every article includes Scripture, biblical lessons, and practical applications that help you see God's truth in everyday life.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">You engage, reflect, and grow</h3>
                <p className="text-gray-700 leading-relaxed">
                  Read the articles, think about the questions, share with friends, and let the Holy Spirit use these conversations to deepen your faith.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-lg mb-6 opacity-95">
            Ready to explore faith through the lens of pop culture? Start reading and discover how God is speaking through the world around you.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Explore Articles →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
