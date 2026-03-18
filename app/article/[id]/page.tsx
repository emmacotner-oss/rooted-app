'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article } from '../../api/articles/route';

export default function ArticleDetail() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all articles and find the matching one
    fetch('/api/articles')
      .then((res) => res.json())
      .then((articles: Article[]) => {
        const found = articles.find((a) => a.id === params.id);
        setArticle(found || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching article:', error);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-2xl font-semibold text-purple-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find that article.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const expandedContent = getExpandedContent(article.id);
  const additionalScriptures = getAdditionalScriptures(article.id);
  const practicalSteps = getPracticalSteps(article.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Rooted
            </h1>
            <p className="text-gray-600 text-sm">
              Pop Culture Through a Biblical Lens 🌱
            </p>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>
      </div>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Category Badge */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3">
            <span className="text-sm font-semibold uppercase tracking-wide">
              {article.category}
            </span>
          </div>

          <div className="p-6 md:p-10">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Source & Date */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
              <p className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
                Source: {article.source}
              </p>
              {article.lastUpdated && (
                <p className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-pink-400 rounded-full"></span>
                  {article.lastUpdated}
                </p>
              )}
            </div>

            {/* What's Happening - Expanded Summary */}
            <div className="mb-10">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">📰</span>
                <h2 className="text-2xl font-bold text-gray-900">What's Happening</h2>
              </div>
              <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                <p className="text-lg font-medium text-gray-800">
                  {article.summary}
                </p>
                <p>
                  {expandedContent.detailedSummary}
                </p>
              </div>
            </div>

            {/* Why This Matters */}
            <div className="mb-10 bg-purple-50 rounded-xl p-6 border-l-4 border-purple-400">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">💡</span>
                <h2 className="text-xl font-bold text-purple-900">Why This Matters</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {expandedContent.significance}
              </p>
            </div>

            {/* Biblical Perspective - Expanded */}
            <div className="border-t-2 border-purple-100 pt-10 mb-10">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-4xl">✨</span>
                <h2 className="text-3xl font-bold text-purple-900">
                  Biblical Perspective
                </h2>
              </div>

              <div className="space-y-6">
                {/* Main Biblical Lesson */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">The Big Picture</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {article.biblicalLesson}
                  </p>
                </div>

                {/* Primary Scripture */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-600">
                  <p className="text-base font-medium text-purple-900 italic leading-relaxed mb-2">
                    {article.verse}
                  </p>
                </div>

                {/* Deeper Biblical Analysis */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Digging Deeper</h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>{expandedContent.biblicalContext}</p>
                    <p>{expandedContent.biblicalApplication}</p>
                  </div>
                </div>

                {/* Additional Scripture Connections */}
                {additionalScriptures.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">More Scripture Connections</h3>
                    <div className="space-y-3">
                      {additionalScriptures.map((scripture, index) => (
                        <div key={index} className="bg-purple-50 rounded-lg p-4 border-l-2 border-purple-400">
                          <p className="text-sm font-semibold text-purple-900 mb-1">{scripture.reference}</p>
                          <p className="text-sm text-gray-700 italic">&quot;{scripture.text}&quot;</p>
                          {scripture.context && (
                            <p className="text-sm text-gray-600 mt-2">{scripture.context}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Practical Application - Expanded */}
            <div className="border-t-2 border-pink-100 pt-10 mb-10">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-4xl">🎯</span>
                <h2 className="text-3xl font-bold text-pink-900">
                  Living It Out
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {expandedContent.practicalIntro}
                </p>

                <div className="space-y-4">
                  {practicalSteps.map((step, index) => (
                    <div key={index} className="flex gap-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-5 border-l-4 border-pink-400">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-600 text-white font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reflection Questions */}
            <div className="mb-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">🤔</span>
                <h3 className="text-xl font-bold text-purple-900">Questions to Consider</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                {expandedContent.reflectionQuestions.map((question, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="text-center border-t-2 border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Want to Learn More?
              </h3>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <span>Read Original Article</span>
                <span>🔗</span>
              </a>
              <p className="text-gray-500 text-sm mt-3">
                Opens in new tab
              </p>
            </div>
          </div>
        </article>

        {/* Discussion Prompt */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Start a Conversation
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Talk about this article with your friends, small group, or family. Share how God is speaking to you through this topic and listen to others' perspectives. Faith grows deeper in community.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
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

// Enhanced content for each article
interface ExpandedContent {
  detailedSummary: string;
  significance: string;
  biblicalContext: string;
  biblicalApplication: string;
  practicalIntro: string;
  reflectionQuestions: string[];
}

function getExpandedContent(id: string): ExpandedContent {
  const content: { [key: string]: ExpandedContent } = {
    '1': {
      detailedSummary: 'In recent years, high-profile celebrities like Selena Gomez, Billie Eilish, Demi Lovato, and others have used their massive platforms to break the silence around mental health struggles. From social media posts to documentary series, these stars are sharing their battles with depression, anxiety, bipolar disorder, and more. Their vulnerability has sparked important conversations, reduced stigma, and encouraged millions of young people to seek professional help instead of suffering in silence.',
      significance: 'For Christian teens growing up in a world of curated Instagram feeds and "perfect" TikTok lives, this honest conversation about mental health is crucial. It challenges the toxic belief that struggling means you're weak or that faith should make all problems disappear. Mental health is real, it matters, and getting help is an act of courage and wisdom.',
      biblicalContext: 'The Bible is filled with honest expressions of mental and emotional struggle. David's psalms often cry out in anguish, questioning where God is in the midst of pain. Elijah experienced deep depression and wanted to die. Jesus himself felt "deeply distressed and troubled" in the Garden of Gethsemane. God doesn't expect us to pretend everything is fine—He invites us to bring our whole selves, including our struggles, to Him.',
      biblicalApplication: 'When we cast our anxieties on God, it doesn't mean we ignore practical help like therapy or medication. Just as we see a doctor for a broken bone, seeking professional help for mental health is wisdom in action. God works through counselors, doctors, and treatment. Faith and mental health care aren't opposites—they work together to bring healing and wholeness.',
      practicalIntro: 'If you're struggling with mental health, here are concrete steps you can take starting today:',
      reflectionQuestions: [
        'Have I ever felt ashamed about struggling with anxiety, depression, or other mental health challenges?',
        'Do I have a trusted adult or friend I can talk to honestly about what I'm feeling?',
        'How can I support friends who are struggling, creating space for them to be vulnerable?',
        'What would change if I truly believed that seeking help is strength, not weakness?'
      ]
    },
    '2': {
      detailedSummary: 'Across social media platforms, influencers with millions of followers are pushing back against unrealistic beauty standards. They're posting unfiltered photos, calling out harmful Photoshop practices, celebrating diverse body types, and sharing their own struggles with body image. From plus-size models to celebrities embracing natural aging, these voices are challenging the narrow definition of beauty that's dominated culture for decades and causing real harm, especially to young people.',
      significance: 'This movement matters because body image issues are at crisis levels among teens. Studies show that social media comparison leads to anxiety, depression, eating disorders, and low self-worth. When influential voices say "you don't have to look like an airbrushed magazine cover to have value," it offers freedom and a healthier way forward. For Christian teens, it's a chance to reclaim a biblical understanding of worth and beauty.',
      biblicalContext: 'From the beginning, God declared that humans—made in His image—are "very good" (Genesis 1:31). The Psalms celebrate that we are "fearfully and wonderfully made." Throughout Scripture, God consistently looks at the heart, not outward appearance. When Samuel was looking for Israel's next king and assumed it would be the tall, handsome Eliab, God corrected him: "The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart" (1 Samuel 16:7).',
      biblicalApplication: 'True beauty—the kind that matters eternally—is character, kindness, faithfulness, and love. When we internalize the truth that our worth comes from being God's beloved children, not from our appearance, it transforms how we see ourselves and others. This doesn't mean ignoring health or hygiene, but it means our value is secure regardless of how we measure up to cultural standards that constantly shift.',
      practicalIntro: 'Here's how you can fight back against toxic beauty standards and embrace your God-given worth:',
      reflectionQuestions: [
        'How much time do I spend thinking about or trying to change my appearance?',
        'Do I treat people differently based on how they look?',
        'What would it look like to celebrate and appreciate my body for what it can do, not just how it looks?',
        'How can I speak life and truth to friends who struggle with body image?'
      ]
    },
    '3': {
      detailedSummary: 'Young celebrities and influencers are increasingly leveraging their platforms for social good. Zendaya advocates for mental health awareness. Millie Bobby Brown champions anti-bullying efforts. Billie Eilish speaks on environmental issues. These stars are using their fame, wealth, and influence to raise awareness, fundraise, and mobilize their audiences around causes that matter. It's a refreshing shift from celebrity culture being solely about glamour and self-promotion.',
      significance: 'This trend shows that influence—whether you have millions of followers or a small friend group—can be used for good. It challenges the myth that charity is only for the wealthy or powerful. Every person has gifts, resources, and a sphere of influence that can make a difference. For Christian teens, this is a tangible way to live out the call to "love your neighbor" and "do justice."',
      biblicalContext: 'Jesus taught that true greatness comes from serving others. In Matthew 20:26-28, He says, "Whoever wants to become great among you must be your servant... just as the Son of Man did not come to be served, but to serve." Throughout His ministry, Jesus used His influence to heal, feed, teach, and advocate for the marginalized. The early church in Acts shared resources, cared for widows and orphans, and lived with radical generosity.',
      biblicalApplication: 'Using your gifts and influence to serve others is worship. Whether it's volunteering at a local shelter, using your art to raise awareness for a cause, organizing a fundraiser, or simply being generous with your time and kindness, you're reflecting God's heart. Serving isn't about earning God's love—it's a response to the love you've already received.',
      practicalIntro: 'You don't need a million followers to make a difference. Here's how to use your influence for good right now:',
      reflectionQuestions: [
        'What issues or causes do I care deeply about?',
        'What unique gifts, talents, or resources do I have that could serve others?',
        'Am I more focused on building my own image or using my influence to help others?',
        'Who in my community needs support, and how can I show up for them?'
      ]
    },
    '4': {
      detailedSummary: 'Chart-topping artists across genres—from pop to country to hip-hop—are releasing songs that address toxic relationships. They're singing about recognizing red flags, setting boundaries, leaving unhealthy situations, and reclaiming self-worth. Lyrics that once glorified drama and dysfunction are being replaced with messages of self-respect and healthy love. Fans are resonating with these anthems of empowerment and using them as catalysts for their own healing and growth.',
      significance: 'Toxic relationships—marked by manipulation, control, disrespect, jealousy, or abuse—cause deep emotional harm. For young people navigating their first relationships, learning to recognize these patterns early can prevent years of pain. This cultural conversation about what healthy love looks like is long overdue. For Christian teens, it's an opportunity to understand that God's design for relationships is rooted in mutual respect, trust, and genuine love.',
      biblicalContext: 'The Bible has a lot to say about relationships and the importance of wisdom in who we allow close to us. Proverbs 4:23 warns, "Above all else, guard your heart, for everything you do flows from it." Ephesians 5 describes healthy relationships as characterized by love, respect, and mutual submission. God wants relationships—romantic and otherwise—that build us up, not tear us down.',
      biblicalApplication: 'Recognizing and leaving a toxic relationship isn't selfish; it's an act of self-respect rooted in understanding your worth as God's beloved child. Healthy boundaries honor both yourself and others. God's love is patient, kind, and never manipulative or controlling (1 Corinthians 13). If a relationship doesn't reflect those values, it's okay—and wise—to walk away.',
      practicalIntro: 'Here's how to protect your heart and pursue healthy relationships:',
      reflectionQuestions: [
        'Do my relationships make me feel valued, respected, and safe?',
        'Am I comfortable setting boundaries, or do I feel guilty when I say no?',
        'What "red flags" have I ignored because I wanted the relationship to work?',
        'How can I support friends who are in unhealthy relationships without judging them?'
      ]
    },
    '5': {
      detailedSummary: 'Young activists like Greta Thunberg have become the face of the global climate movement, mobilizing millions of people—especially youth—to demand action from governments and corporations. From school strikes to international summits, teen voices are leading the charge for environmental justice. They're calling out the generations before them for inaction and insisting that the future of the planet can't wait. Their passion and urgency have shifted the conversation around climate change globally.',
      significance: 'Climate change isn't a distant, abstract issue—it's already affecting vulnerable communities and will shape the future that today's teens inherit. For Christian youth, caring for creation isn't optional or political; it's a biblical mandate. God entrusted humanity with stewardship of the earth, and how we treat the environment reflects how seriously we take that responsibility.',
      biblicalContext: 'From the very beginning, God gave humanity the task of caring for creation. Genesis 2:15 says, "The Lord God took the man and put him in the Garden of Eden to work it and take care of it." The earth is not ours to exploit and destroy—it belongs to God. Psalm 24:1 declares, "The earth is the Lord's, and everything in it." We are caretakers, not owners. Faithful stewardship means protecting what God has made.',
      biblicalApplication: 'Taking action on climate and environmental issues is living out our calling to love God and love our neighbors. Environmental harm disproportionately impacts the poor and vulnerable—communities that God repeatedly tells us to care for. Whether it's reducing waste, supporting sustainable practices, or advocating for policy change, caring for creation honors God and serves others.',
      practicalIntro: 'You can be a faithful steward of God's creation starting today. Here's how:',
      reflectionQuestions: [
        'How seriously do I take my responsibility to care for God's creation?',
        'What daily habits of mine contribute to environmental harm, and what can I change?',
        'How can I advocate for environmental justice in my school or community?',
        'Do I see caring for the planet as connected to my faith, or as a separate issue?'
      ]
    },
    '6': {
      detailedSummary: 'Cancel culture—the practice of publicly calling out and boycotting individuals for offensive or harmful behavior—has become a defining feature of internet culture. When a celebrity says something problematic, old tweets resurface, or past actions come to light, the response is often swift and severe: lost jobs, public shaming, and permanent reputational damage. Supporters say it's necessary accountability; critics argue it's a toxic cycle that doesn't allow for growth, forgiveness, or nuance.',
      significance: 'This debate touches on deep questions about justice, accountability, and redemption. How do we hold people responsible for harm without destroying them? Can someone who's made mistakes change and be forgiven? For Christian teens navigating a world where one tweet can define you forever, understanding biblical principles of justice, accountability, AND grace is essential.',
      biblicalContext: 'The Bible takes both sin and grace seriously. God hates injustice and calls His people to "do justice" (Micah 6:8). At the same time, the gospel is centered on redemption—God offers forgiveness and transformation to all who repent. Jesus confronted sin directly but also offered grace to those who turned from it. He told the woman caught in adultery, "Neither do I condemn you; go and sin no more" (John 8:11)—accountability and grace, together.',
      biblicalApplication: 'We're called to a third way that rejects both toxic enablement and merciless condemnation. Accountability matters: harmful actions should have consequences, and people need to make amends. But grace also matters: people can change, grow, and be redeemed. Colossians 3:13 says, "Forgive as the Lord forgave you." This doesn't mean excusing harm, but it does mean leaving room for genuine repentance and restoration.',
      practicalIntro: 'Here's how to pursue justice and grace in a cancel culture world:',
      reflectionQuestions: [
        'Do I rush to condemn people online, or do I pause to consider the full story?',
        'Have I ever made a mistake I wish people would forgive me for?',
        'How can I call out harmful behavior while still treating people with dignity?',
        'What would it look like to create a culture that values both accountability and redemption?'
      ]
    },
    '7': {
      detailedSummary: 'Social media influencers are getting candid about the dark side of their own industry: the constant pressure to compare themselves to others. They're sharing how scrolling through curated highlight reels triggers jealousy, inadequacy, and anxiety. Some are taking breaks from social media or being intentional about what they post and consume. Their honesty is sparking a larger conversation about the mental health costs of constant comparison and the illusion of perfection online.',
      significance: 'Comparison has always been a human struggle, but social media has supercharged it. We're bombarded with images of everyone else's "best life," leading to a sense that we're always falling short. This is particularly damaging for teens whose brains are still developing and who are forming their identities. For Christian youth, breaking free from comparison is essential to experiencing the joy, contentment, and purpose God offers.',
      biblicalContext: 'Scripture repeatedly warns against comparison. Galatians 6:4 says, "Each one should test their own actions. Then they can take pride in themselves alone, without comparing themselves to someone else." The tenth commandment—"You shall not covet"—directly addresses the heart of comparison and jealousy. God has a unique plan and purpose for each person, and comparing yourself to others derails you from your calling.',
      biblicalApplication: 'Contentment comes from gratitude and trust. When you focus on what God has given you and trust His timing and plan for your life, comparison loses its power. Philippians 4:11-12 says Paul learned to be content in all circumstances. This doesn't mean complacency—it means joy and peace rooted in God's faithfulness, not in how you measure up to others.',
      practicalIntro: 'Here's how to break free from the comparison trap and find true contentment:',
      reflectionQuestions: [
        'How much time do I spend scrolling through social media, and how does it make me feel?',
        'Who do I compare myself to most, and why?',
        'What am I grateful for in my own life that I tend to overlook?',
        'How can I celebrate others' successes without feeling jealous or inadequate?'
      ]
    },
    '8': {
      detailedSummary: 'From tech startups to fashion brands to creative ventures, young entrepreneurs are building successful businesses while still in their teens. They're using the internet to reach global audiences, learning business skills on the fly, and inspiring their peers to turn passions into profit. Their stories highlight creativity, resilience, and hard work—proving that you don't have to wait until you're older to make an impact or pursue your dreams.',
      significance: 'These young entrepreneurs challenge the narrative that success only comes through traditional paths. For Christian teens, their example shows that God-given talents and passions can be used not just in "ministry" settings, but in every area of life—including business and creativity. Work done with integrity and purpose is an act of worship, no matter what field you're in.',
      biblicalContext: 'The Bible has a high view of work. God Himself is a creator and worker, and He made humans to reflect that aspect of His character. Colossians 3:23 says, "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." Work isn't a curse—it's part of God's design for human flourishing. Proverbs repeatedly praises diligence, skill, and wise business practices.',
      biblicalApplication: 'Whatever work you do—schoolwork, a part-time job, creative projects, or future career—it can be an offering to God when done with integrity, excellence, and a desire to serve others. Success isn't just about money or fame; it's about faithfulness and using your gifts to honor God and bless others. When you work with this mindset, even ordinary tasks become meaningful.',
      practicalIntro: 'Here's how to honor God with your work and develop a strong work ethic:',
      reflectionQuestions: [
        'Do I see my work—whether school, a job, or creative projects—as something that matters to God?',
        'Am I tempted to cut corners or compromise my integrity for shortcuts to success?',
        'What talents or passions has God given me, and how can I develop them faithfully?',
        'How can my work serve others and reflect God's character?'
      ]
    },
    '9': {
      detailedSummary: 'After a groundbreaking 50-year career, Delroy Lindo received his first Oscar nomination for Best Supporting Actor for his role in "Sinners." When the winner was announced—Sean Penn—cameras captured Lindo's visible disappointment: he didn't clap, and his expression remained blank. The internet immediately divided. Some criticized him as "bitter" and "ungracious," saying he should have smiled and clapped regardless. Others defended him, arguing that his honest reaction was refreshingly real in a culture that demands performative grace even when you're hurting.',
      significance: 'This moment exposes our culture's obsession with fake reactions and emotional performance. We expect people to hide their true feelings and present a polished, palatable version of themselves at all times—even in deeply personal moments of disappointment. For Christian teens, this raises important questions: Is honesty always wrong? Does grace mean pretending you're not hurt? How do we balance authenticity with kindness?',
      biblicalContext: 'The Bible consistently values truth and integrity over pretense. Proverbs 12:22 says, "The Lord detests lying lips, but he delights in people who are trustworthy." Throughout Scripture, God's people are honest about their emotions—Job laments his suffering, David cries out in anger and confusion, and Jesus wept openly. Authenticity isn't the opposite of faith; it's often the starting point of genuine relationship with God.',
      biblicalApplication: 'You don't owe the world a fake smile when you're disappointed or hurt. Pretending to feel something you don't isn't grace—it's dishonesty. At the same time, processing emotions maturely means not lashing out or being cruel. There's a difference between being honest and being destructive. Lindo's reaction was silent and internal—he didn't attack anyone. Sometimes the most authentic thing you can do is simply be honest about what you're feeling, even if it's not what people expect.',
      practicalIntro: 'Here's how to practice authenticity without sacrificing kindness:',
      reflectionQuestions: [
        'Do I feel pressure to fake positive emotions when I'm actually disappointed or hurt?',
        'How do I respond when things don't go my way—am I honest about my feelings or do I hide them?',
        'Can I give others permission to be disappointed without judging them?',
        'How can I be both truthful and kind when processing difficult emotions?'
      ]
    },
    '10': {
      detailedSummary: 'Leonardo DiCaprio's appearance at the 2026 Oscars sparked a social media frenzy. People noticed he looked noticeably younger—leading to rampant speculation about plastic surgery, weight loss, and anti-aging treatments. Turns out it was mostly just a new mustache and good lighting, but the internet's obsession with his youthful appearance revealed something deeper: our culture's terror of aging. Looking older is treated like a failure, and massive effort is poured into appearing eternally young.',
      significance: 'We live in a culture that worships youth and treats aging like a disease to be cured. Billions of dollars are spent on anti-aging products, procedures, and strategies. For Christian teens watching adults panic over every wrinkle, this sends a clear message: your value decreases as you age. But is that true? Does God measure worth by how young or beautiful you look?',
      biblicalContext: 'The Bible has a radically different perspective on aging. Proverbs 16:31 says, "Gray hair is a crown of splendor; it is attained in the way of righteousness." Proverbs 20:29 adds, "The glory of young men is their strength, gray hair the splendor of the old." Far from being something to hide or fix, aging is presented as honorable—a sign of wisdom, experience, and a life well-lived. God values every stage of life.',
      biblicalApplication: 'Your worth isn't tied to your youth, appearance, or physical vitality. You are made in God's image, and that doesn't fade with age. Every stage of life has unique beauty, purpose, and value. When we embrace aging as a natural and good part of God's design, we're freed from the exhausting and futile attempt to stay young forever. We can focus instead on growing in character, wisdom, and love—the things that actually last.',
      practicalIntro: 'Here's how to resist the cultural obsession with youth and embrace your God-given value:',
      reflectionQuestions: [
        'Do I treat older people with less respect or attention than younger people?',
        'Am I already anxious about aging, even as a teen?',
        'What would it look like to see aging as a gift rather than a curse?',
        'How can I honor and learn from the older people in my life?'
      ]
    },
    '11': {
      detailedSummary: 'After the glitz and glamour of the 2026 Oscars ceremony, a viral photo showed the shocking aftermath: the theater was absolutely trashed. Snack packs, candy wrappers, fancy water bottles, and garbage were scattered across seats and floors. People were stunned that some of the wealthiest and most celebrated people in the world left a massive mess for someone else to clean up. The image sparked outrage and conversations about entitlement, character, and basic decency.',
      significance: 'This moment pulled back the curtain on celebrity culture and revealed something uncomfortable: wealth and fame don't equal character. The same people who preach about social causes on stage left their trash for underpaid workers to clean up. It's a reminder that true character isn't what you do when cameras are on you—it's what you do when no one's watching. For Christian teens, this is a powerful illustration of the difference between image and integrity.',
      biblicalContext: 'Jesus taught that greatness isn't about power, fame, or being served—it's about serving others. Matthew 20:26 says, "Whoever wants to become great among you must be your servant." He modeled this by washing His disciples' feet, a task reserved for the lowest servant. Throughout His ministry, Jesus consistently elevated the humble and exposed the hypocrisy of those who looked good on the outside but lacked integrity in private.',
      biblicalApplication: 'Character is what you do when no one's watching. It's picking up your own trash. It's treating service workers with respect. It's being kind even when you gain nothing from it. God doesn't measure greatness by applause or accolades—He looks at the heart. Are you the same person in public as you are in private? Do your actions match your words? Small acts of integrity matter more than grand public gestures.',
      practicalIntro: 'Here's how to build character in the small, unseen moments:',
      reflectionQuestions: [
        'Do I act differently when people are watching versus when I'm alone?',
        'Do I treat service workers, janitors, and others with the same respect I show people I want to impress?',
        'What "small" acts of laziness or entitlement do I excuse in my own life?',
        'How can I serve others in practical, everyday ways without needing recognition?'
      ]
    },
    '12': {
      detailedSummary: 'At the star-studded Vanity Fair Oscars after-party, Kris Jenner was being interviewed by two influencers when she paused mid-conversation and asked, "How did you get this gig?" The awkward moment went viral, with people loving her unintentional shade. It highlighted a growing tension in media: influencers with no formal training are increasingly replacing experienced journalists on red carpets and in entertainment coverage. Followers and likes are becoming the primary qualifications for jobs that once required years of experience and skill.',
      significance: 'In today's culture, popularity is often confused with competence. Just because someone has a million followers doesn't mean they're qualified to do a job that requires skill, training, or expertise. This trend reflects a larger cultural shift where attention and influence are valued over substance and knowledge. For Christian teens, this raises important questions about what you're building your life on: likes and followers, or real skill and character?',
      biblicalContext: 'The Bible places high value on wisdom, knowledge, and skill. Proverbs 10:14 says, "The wise store up knowledge, but the mouth of a fool invites ruin." Throughout Scripture, competence and diligence are praised. When God called people for specific tasks—like building the tabernacle or leading Israel—He equipped them with skill and wisdom, not just popularity. Excellence and preparation matter.',
      biblicalApplication: 'There's nothing wrong with having a platform or influence, but it shouldn't be a substitute for actually knowing what you're doing. Are you investing in real skills, education, and growth—or just chasing likes and attention? God has given you unique gifts, and stewarding them well means developing them with diligence and integrity. Don't confuse visibility with value, or popularity with purpose.',
      practicalIntro: 'Here's how to build something real instead of just chasing attention:',
      reflectionQuestions: [
        'Am I more focused on building a following or building real skills and character?',
        'Do I respect and learn from people with experience and expertise, even if they don't have a big platform?',
        'What talents has God given me, and am I developing them seriously?',
        'How can I use any influence I have to point people toward truth and goodness, not just myself?'
      ]
    },
    '13': {
      detailedSummary: 'Despite being Hollywood's biggest night, filled with designer gowns and multimillion-dollar jewelry, the actual food at the 2026 Oscars was shockingly basic. Attendees were given snack packs with SkinnyPop popcorn, Swedish Fish candy, and bottled water—food that people compared to "elementary school field trip lunches." The contrast between the glamorous image presented to the world and the cheap, underwhelming reality behind the scenes sparked mockery and disappointment. It was a perfect metaphor for Hollywood itself: all image, little substance.',
      significance: 'This moment exposes the emptiness of image-obsessed culture. Hollywood spends millions on creating the illusion of perfection—the dresses, the makeup, the red carpet—but behind the curtain, the actual experience is hollow. For Christian teens bombarded with curated social media feeds and "perfect" lives, this is a powerful reminder: what looks flawless on the outside is often empty on the inside.',
      biblicalContext: 'Jesus repeatedly called out religious leaders for this exact problem. In Matthew 23:25-26, He says, "You clean the outside of the cup and dish, but inside they are full of greed and self-indulgence. Blind Pharisee! First clean the inside of the cup and dish, and then the outside also will be clean." He was more concerned with internal integrity than external appearance. Throughout His ministry, Jesus valued authenticity, humility, and genuine faith over polished religious performance.',
      biblicalApplication: 'God sees past the image you present to the world. He looks at your heart. You can have a perfect Instagram feed and a rotten heart. You can look like you have it all together while being empty inside. The question isn't "Do I look good to others?" but "Am I genuine before God?" Real beauty and real worth come from internal character, not external polish. Don't spend your life cleaning the outside of the cup.',
      practicalIntro: 'Here's how to pursue authenticity over image:',
      reflectionQuestions: [
        'How much energy do I spend curating my image versus actually growing in character?',
        'What would people find if they saw behind the curtain of my life?',
        'Am I more concerned with looking good or being good?',
        'How can I invest in the things that last—character, integrity, love—instead of fleeting appearances?'
      ]
    }
  };

  return content[id] || {
    detailedSummary: 'This cultural moment invites us to think critically about the world around us and how faith intersects with everyday life.',
    significance: 'Understanding the biblical perspective on contemporary issues helps us navigate culture with wisdom and discernment.',
    biblicalContext: 'God's truth is timeless and relevant to every area of life. Scripture offers wisdom that speaks directly into the moments we're experiencing today.',
    biblicalApplication: 'Living out biblical principles means applying God's truth to real-life situations with courage, integrity, and love.',
    practicalIntro: 'Here are practical ways to live out your faith in response to this topic:',
    reflectionQuestions: [
      'How does this topic connect to my daily life?',
      'What is God teaching me through this cultural moment?',
      'How can I live differently in light of biblical truth?'
    ]
  };
}

interface Scripture {
  reference: string;
  text: string;
  context?: string;
}

function getAdditionalScriptures(id: string): Scripture[] {
  const scriptures: { [key: string]: Scripture[] } = {
    '1': [
      {
        reference: 'Psalm 34:18',
        text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.',
        context: 'God doesn't abandon us in our struggles—He draws near.'
      },
      {
        reference: 'Matthew 11:28',
        text: 'Come to me, all you who are weary and burdened, and I will give you rest.',
        context: 'Jesus invites us to bring our burdens to Him, not carry them alone.'
      },
      {
        reference: 'Romans 12:15',
        text: 'Rejoice with those who rejoice; mourn with those who mourn.',
        context: 'We're called to enter into each other's pain and support one another.'
      }
    ],
    '2': [
      {
        reference: '1 Samuel 16:7',
        text: 'The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.',
        context: 'God's perspective on beauty is radically different from culture's.'
      },
      {
        reference: '1 Peter 3:3-4',
        text: 'Your beauty should not come from outward adornment... Rather, it should be that of your inner self, the unfading beauty of a gentle and quiet spirit.',
        context: 'True beauty is internal and eternal, not external and fading.'
      },
      {
        reference: 'Genesis 1:27',
        text: 'So God created mankind in his own image, in the image of God he created them.',
        context: 'Every human reflects God's image—that's where our value comes from.'
      }
    ],
    '3': [
      {
        reference: 'Luke 12:48',
        text: 'From everyone who has been given much, much will be demanded.',
        context: 'Whatever gifts, resources, or influence we have comes with responsibility.'
      },
      {
        reference: 'Galatians 6:9-10',
        text: 'Let us not become weary in doing good... As we have opportunity, let us do good to all people.',
        context: 'Serving others is a consistent call, not a one-time act.'
      },
      {
        reference: 'James 2:14-17',
        text: 'Faith by itself, if it is not accompanied by action, is dead.',
        context: 'Real faith shows up in how we love and serve others.'
      }
    ],
    '4': [
      {
        reference: '1 Corinthians 13:4-7',
        text: 'Love is patient, love is kind. It does not envy, it does not boast... It always protects, always trusts, always hopes, always perseveres.',
        context: 'This is the standard for healthy, godly love—not manipulation or control.'
      },
      {
        reference: 'Ephesians 5:21',
        text: 'Submit to one another out of reverence for Christ.',
        context: 'Healthy relationships are characterized by mutual respect, not power dynamics.'
      },
      {
        reference: 'Proverbs 13:20',
        text: 'Walk with the wise and become wise, for a companion of fools suffers harm.',
        context: 'Who we surround ourselves with shapes who we become.'
      }
    ],
    '5': [
      {
        reference: 'Psalm 24:1',
        text: 'The earth is the Lord's, and everything in it, the world, and all who live in it.',
        context: 'We don't own the planet—it belongs to God, and we're caretakers.'
      },
      {
        reference: 'Leviticus 25:23',
        text: 'The land is mine and you reside in my land as foreigners and strangers.',
        context: 'God makes clear that creation is His, entrusted to us.'
      },
      {
        reference: 'Romans 8:19-21',
        text: 'Creation waits in eager expectation... that the creation itself will be liberated from its bondage to decay.',
        context: 'All of creation groans for redemption—caring for it matters to God.'
      }
    ],
    '6': [
      {
        reference: 'Micah 6:8',
        text: 'He has shown you, O mortal, what is good... To act justly and to love mercy and to walk humbly with your God.',
        context: 'Justice and mercy aren't opposites—they work together.'
      },
      {
        reference: 'James 2:13',
        text: 'Mercy triumphs over judgment.',
        context: 'When justice and mercy conflict, lean toward grace.'
      },
      {
        reference: 'Matthew 7:1-2',
        text: 'Do not judge, or you too will be judged. For in the same way you judge others, you will be judged.',
        context: 'We're held to the same standard we apply to others.'
      }
    ],
    '7': [
      {
        reference: 'Philippians 4:11-12',
        text: 'I have learned to be content whatever the circumstances... I have learned the secret of being content in any and every situation.',
        context: 'Contentment is learned, not automatic—and it's rooted in trusting God.'
      },
      {
        reference: 'Hebrews 13:5',
        text: 'Keep your lives free from the love of money and be content with what you have.',
        context: 'Contentment comes from gratitude, not acquiring more.'
      },
      {
        reference: 'Exodus 20:17',
        text: 'You shall not covet... anything that belongs to your neighbor.',
        context: 'Comparison and jealousy are serious enough to make the Ten Commandments.'
      }
    ],
    '8': [
      {
        reference: 'Proverbs 12:24',
        text: 'Diligent hands will rule, but laziness ends in forced labor.',
        context: 'Hard work and excellence open doors and honor God.'
      },
      {
        reference: '2 Thessalonians 3:10',
        text: 'The one who is unwilling to work shall not eat.',
        context: 'Scripture values responsibility and diligence.'
      },
      {
        reference: 'Proverbs 16:3',
        text: 'Commit to the Lord whatever you do, and he will establish your plans.',
        context: 'When we dedicate our work to God, He guides and blesses it.'
      }
    ],
    '9': [
      {
        reference: 'Psalm 62:5-6',
        text: 'Yes, my soul, find rest in God; my hope comes from him. Truly he is my rock and my salvation.',
        context: 'When we're disappointed, God is our true hope—not awards or recognition.'
      },
      {
        reference: 'Ephesians 4:15',
        text: 'Speaking the truth in love, we will grow to become in every respect the mature body of him who is the head, that is, Christ.',
        context: 'Truth and love aren't enemies—we need both.'
      },
      {
        reference: 'James 5:12',
        text: 'Let your "Yes" be yes, and your "No," no.',
        context: 'Simple honesty is what God values.'
      }
    ],
    '10': [
      {
        reference: 'Proverbs 20:29',
        text: 'The glory of young men is their strength, gray hair the splendor of the old.',
        context: 'Every stage of life has unique beauty and value.'
      },
      {
        reference: '1 Timothy 4:12',
        text: 'Don't let anyone look down on you because you are young, but set an example for the believers.',
        context: 'Youth has value, but so does maturity—both matter.'
      },
      {
        reference: '2 Corinthians 4:16',
        text: 'Though outwardly we are wasting away, yet inwardly we are being renewed day by day.',
        context: 'Spiritual growth and internal renewal matter more than physical appearance.'
      }
    ],
    '11': [
      {
        reference: 'Luke 16:10',
        text: 'Whoever can be trusted with very little can also be trusted with much.',
        context: 'Character is proven in small, everyday choices.'
      },
      {
        reference: 'Philippians 2:3-4',
        text: 'Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves.',
        context: 'True greatness is marked by humility and service.'
      },
      {
        reference: 'Mark 10:43-45',
        text: 'Whoever wants to become great among you must be your servant... For even the Son of Man did not come to be served, but to serve.',
        context: 'Jesus redefined greatness as servanthood.'
      }
    ],
    '12': [
      {
        reference: 'Proverbs 18:15',
        text: 'The heart of the discerning acquires knowledge, for the ears of the wise seek it out.',
        context: 'Wisdom and knowledge are actively pursued, not passively acquired.'
      },
      {
        reference: 'Proverbs 22:29',
        text: 'Do you see someone skilled in their work? They will serve before kings.',
        context: 'Excellence and skill are honored and create opportunities.'
      },
      {
        reference: 'Colossians 3:17',
        text: 'Whatever you do, whether in word or deed, do it all in the name of the Lord Jesus.',
        context: 'Our work should reflect Christ, not just chase clout.'
      }
    ],
    '13': [
      {
        reference: 'Proverbs 31:30',
        text: 'Charm is deceptive, and beauty is fleeting; but a woman who fears the Lord is to be praised.',
        context: 'External appearances fade—internal character lasts.'
      },
      {
        reference: 'Luke 16:15',
        text: 'What people value highly is detestable in God's sight.',
        context: 'God's values are often opposite of culture's values.'
      },
      {
        reference: 'Matthew 6:1',
        text: 'Be careful not to practice your righteousness in front of others to be seen by them.',
        context: 'God cares about who we are in private, not just public performance.'
      }
    ]
  };

  return scriptures[id] || [];
}

interface PracticalStep {
  title: string;
  description: string;
}

function getPracticalSteps(id: string): PracticalStep[] {
  const steps: { [key: string]: PracticalStep[] } = {
    '1': [
      {
        title: 'Reach out for help',
        description: 'Talk to a trusted adult, school counselor, or therapist. Mental health professionals are trained to help, and reaching out is courageous, not weak.'
      },
      {
        title: 'Be honest with God',
        description: 'Bring your struggles to God in prayer. He can handle your real emotions—anger, confusion, sadness. Don't perform for Him; just be honest.'
      },
      {
        title: 'Create safe spaces',
        description: 'Be the friend who makes it safe for others to be vulnerable. Listen without judgment and encourage them to get support.'
      },
      {
        title: 'Educate yourself',
        description: 'Learn about mental health, warning signs, and resources. Knowledge helps you support yourself and others well.'
      }
    ],
    '2': [
      {
        title: 'Audit your social media',
        description: 'Unfollow accounts that make you feel inadequate. Follow people who inspire you, celebrate diverse bodies, and promote healthy messages.'
      },
      {
        title: 'Practice gratitude for your body',
        description: 'Write down things you appreciate about your body that have nothing to do with appearance—its strength, what it allows you to do, how it serves you.'
      },
      {
        title: 'Speak life to others',
        description: 'Compliment people on character, kindness, talents—not just appearance. Your words shape culture.'
      },
      {
        title: 'Set healthy boundaries with mirrors and screens',
        description: 'Notice how much time you spend scrutinizing your appearance. Limit it. You are more than what you see in the mirror.'
      }
    ],
    '3': [
      {
        title: 'Identify a cause you care about',
        description: 'What issue breaks your heart or fires you up? That passion is often a clue to how God wants you to serve.'
      },
      {
        title: 'Start small and local',
        description: 'Volunteer at a local shelter, organize a school fundraiser, or use your talents (art, music, writing) to raise awareness.'
      },
      {
        title: 'Use your platform intentionally',
        description: 'Whether it's 10 followers or 10,000, use your voice to share about causes that matter and encourage others to get involved.'
      },
      {
        title: 'Pray for guidance',
        description: 'Ask God to show you where He wants you to serve and how to use your unique gifts for His purposes.'
      }
    ],
    '4': [
      {
        title: 'Know the red flags',
        description: 'Learn to recognize signs of unhealthy relationships: control, jealousy, disrespect, manipulation, pressure, isolation from friends/family.'
      },
      {
        title: 'Trust your gut',
        description: 'If a relationship feels wrong, it probably is. Don't ignore warning signs just because you want it to work.'
      },
      {
        title: 'Set and enforce boundaries',
        description: 'It's okay to say no. It's okay to have standards. Boundaries aren't mean—they're healthy.'
      },
      {
        title: 'Talk to someone you trust',
        description: 'If you're in an unhealthy relationship, don't navigate it alone. Talk to a parent, counselor, or mentor who can help you see clearly and stay safe.'
      }
    ],
    '5': [
      {
        title: 'Reduce waste',
        description: 'Use reusable water bottles, bags, and containers. Say no to single-use plastic when possible. Small changes add up.'
      },
      {
        title: 'Conserve resources',
        description: 'Turn off lights, save water, unplug devices. Be mindful of how much energy and resources you consume daily.'
      },
      {
        title: 'Educate yourself',
        description: 'Learn about environmental issues—climate change, pollution, endangered species. You can't care well about what you don't understand.'
      },
      {
        title: 'Advocate and speak up',
        description: 'Support policies and organizations working for environmental justice. Use your voice to encourage others to care for creation.'
      }
    ],
    '6': [
      {
        title: 'Pause before sharing',
        description: 'Before liking or sharing a post calling someone out, ask: Is this true? Kind? Necessary? Does it allow room for growth?'
      },
      {
        title: 'Own your mistakes',
        description: 'When you mess up, apologize sincerely and do better. Model the redemption you want to see.'
      },
      {
        title: 'Offer grace when others fail',
        description: 'If someone has genuinely changed and shown repentance, be willing to forgive. People can grow.'
      },
      {
        title: 'Seek justice with compassion',
        description: 'Hold people accountable for harm, but don't destroy them in the process. Balance truth and grace.'
      }
    ],
    '7': [
      {
        title: 'Set social media boundaries',
        description: 'Limit your daily screen time. Consider deleting apps that consistently make you feel bad about yourself.'
      },
      {
        title: 'Practice daily gratitude',
        description: 'Every day, write down three things you're thankful for. Train your brain to notice blessings instead of what's missing.'
      },
      {
        title: 'Celebrate others genuinely',
        description: 'When friends succeed, be happy for them. Cheer them on. Joy shared is joy multiplied; envy shared is poison.'
      },
      {
        title: 'Focus on your own growth',
        description: 'Set personal goals based on who you want to become, not on beating someone else. Run your own race.'
      }
    ],
    '8': [
      {
        title: 'Do everything with excellence',
        description: 'Whether it's homework, a part-time job, or a creative project, give your best effort. Excellence honors God.'
      },
      {
        title: 'Work with integrity',
        description: 'Don't cheat, cut corners, or compromise your values for shortcuts. Character matters more than quick success.'
      },
      {
        title: 'Develop your skills',
        description: 'Identify your talents and invest time in growing them. Read, practice, learn from mentors. Steward what God's given you.'
      },
      {
        title: 'Pray over your work',
        description: 'Ask God to guide your efforts and help you use your work to serve others and glorify Him.'
      }
    ],
    '9': [
      {
        title: 'Give yourself permission to feel',
        description: 'Disappointment, sadness, frustration—they're all valid. Don't pressure yourself to fake positivity when you're hurting.'
      },
      {
        title: 'Process emotions healthily',
        description: 'Talk to someone, journal, pray. Don't bottle it up or lash out. Find constructive ways to work through what you're feeling.'
      },
      {
        title: 'Remember your worth isn't in outcomes',
        description: 'Losing doesn't make you less valuable. Your worth is secure in God, not in awards, grades, or recognition.'
      },
      {
        title: 'Extend the same grace to others',
        description: 'When someone else is disappointed or doesn't react perfectly, give them space. Don't demand fake smiles.'
      }
    ],
    '10': [
      {
        title: 'Respect and honor older people',
        description: 'Seek wisdom from elders. Ask questions, listen to their stories, value their experience.'
      },
      {
        title: 'Reject anti-aging obsession',
        description: 'Don't buy into the lie that aging is failure. Every stage of life has beauty and purpose.'
      },
      {
        title: 'Focus on internal growth',
        description: 'Invest in character, wisdom, kindness—the things that grow more beautiful with age, not less.'
      },
      {
        title: 'See people as image-bearers',
        description: 'Value people based on their humanity and God's image in them, not their age or appearance.'
      }
    ],
    '11': [
      {
        title: 'Pick up your own trash',
        description: 'Literally. Clean up after yourself. Don't leave messes for others to handle.'
      },
      {
        title: 'Serve in small ways',
        description: 'Hold doors, say thank you, help without being asked. Character is built in tiny, unseen moments.'
      },
      {
        title: 'Treat service workers with respect',
        description: 'Be kind to waiters, janitors, cashiers. How you treat people who can't do anything for you reveals your heart.'
      },
      {
        title: 'Be the same person in private',
        description: 'Work on being someone whose private actions match their public image. Integrity is consistency.'
      }
    ],
    '12': [
      {
        title: 'Invest in real skills',
        description: 'Learn, study, practice. Build competence in areas you're passionate about, not just a follower count.'
      },
      {
        title: 'Value expertise',
        description: 'Learn from people with experience and training. Don't dismiss wisdom just because someone lacks a platform.'
      },
      {
        title: 'Use influence wisely',
        description: 'If you have a following, use it to point people toward truth, goodness, and real value—not just yourself.'
      },
      {
        title: 'Build substance, not just image',
        description: 'Focus on who you're becoming, not just how many people are watching.'
      }
    ],
    '13': [
      {
        title: 'Prioritize internal character',
        description: 'Invest more time in becoming kind, honest, and loving than in perfecting your outward appearance.'
      },
      {
        title: 'Be authentic',
        description: 'Stop curating a perfect image. Let people see the real you—flaws, struggles, and all.'
      },
      {
        title: 'Check your motives',
        description: 'Ask yourself: Am I doing this to look good or to be good? Are my actions genuine or performative?'
      },
      {
        title: 'Clean the inside of the cup',
        description: 'Work on your heart, your motives, your integrity. That's what lasts.'
      }
    ]
  };

  return steps[id] || [
    {
      title: 'Reflect and pray',
      description: 'Take time to think about how this topic applies to your life. Ask God for wisdom and guidance.'
    },
    {
      title: 'Talk about it',
      description: 'Discuss this with friends, family, or a small group. Hearing different perspectives helps you grow.'
    },
    {
      title: 'Take one small action',
      description: 'Pick one practical step and commit to it this week. Small changes lead to lasting transformation.'
    }
  ];
}
