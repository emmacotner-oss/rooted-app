import { NextResponse } from 'next/server';

export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  sourceUrl: string; // Original article URL
  biblicalLesson: string;
  verse: string;
  category: string;
  lastUpdated?: string;
}

// Curated pop culture articles with biblical perspectives
const articles: Article[] = [
  {
    id: '1',
    title: 'Celebrities Speaking Out on Mental Health',
    summary: 'Stars like Selena Gomez and Billie Eilish are opening up about their mental health struggles, encouraging fans to seek help.',
    source: 'Teen Vogue',
    url: '#',
    sourceUrl: 'https://www.teenvogue.com/story/celebrities-mental-health-awareness',
    biblicalLesson: 'Selena and Billie are using their platforms to break the stigma around mental health—and that takes real courage. Our culture often treats struggles as weakness, but the Bible shows us that God meets us in our brokenness. Depression, anxiety, and trauma aren\'t signs you\'re failing spiritually—they\'re part of living in a fallen world. Seeking therapy or medication isn\'t a lack of faith; it\'s stewarding the body and mind God gave you. You don\'t have to "pray it away" alone.',
    verse: '2 Corinthians 12:9 - "My grace is sufficient for you, for my power is made perfect in weakness."',
    category: 'Mental Health'
  },
  {
    id: '2',
    title: 'Social Media Influencers Promote Body Positivity',
    summary: 'Popular influencers are challenging unrealistic beauty standards and promoting self-acceptance.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/celebrity/body-positivity-influencers',
    biblicalLesson: 'The body positivity movement fights against airbrushed perfection and photoshopped lies—and that\'s good. But here\'s the deeper truth: you don\'t need to love your body to have worth. Your value isn\'t in how you look OR how you feel about how you look—it\'s in being made in God\'s image. Self-acceptance is great, but God-acceptance is better. He already sees you as fully loved, no conditions attached.',
    verse: 'Psalm 139:14 - "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well."',
    category: 'Self-Worth'
  },
  {
    id: '3',
    title: 'Young Stars Using Fame for Charity Work',
    summary: 'Teen celebrities are leveraging their platforms to raise awareness and funds for important causes.',
    source: 'Teen Vogue',
    url: '#',
    sourceUrl: 'https://www.teenvogue.com/story/young-celebrities-charity-activism',
    biblicalLesson: 'When celebrities use their platforms for good, it\'s powerful—but let\'s be honest: it also gets them good PR. The Bible warns against doing good deeds just to be seen. Real generosity happens in secret, without the Instagram post or the press release. You don\'t need a platform to make a difference—God sees the small, hidden acts of service no one else notices. Are you serving for applause, or because you genuinely love people?',
    verse: 'Matthew 6:3-4 - "But when you give to the needy, do not let your left hand know what your right hand is doing, so that your giving may be in secret."',
    category: 'Service'
  },
  {
    id: '4',
    title: 'Music Artists Address Toxic Relationships in New Songs',
    summary: 'Chart-topping artists are writing songs about recognizing and leaving unhealthy relationships.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/celebrity/toxic-relationship-songs',
    biblicalLesson: 'Pop songs about toxic relationships tell you to leave, boss up, and never look back—and sometimes that\'s exactly right. But here\'s the harder truth: the Bible calls us to guard our hearts BEFORE we get tangled up, not just after. If you keep choosing the same kind of person, the problem isn\'t just them—it\'s the wounds or patterns you haven\'t dealt with. Freedom isn\'t just leaving toxicity; it\'s healing so you stop attracting it.',
    verse: 'Proverbs 4:23 - "Above all else, guard your heart, for everything you do flows from it."',
    category: 'Relationships'
  },
  {
    id: '5',
    title: 'Teen Activists Leading Climate Change Movement',
    summary: 'Young voices are at the forefront of environmental activism, inspiring global action.',
    source: 'Teen Vogue',
    url: '#',
    sourceUrl: 'https://www.teenvogue.com/story/teen-climate-activists',
    biblicalLesson: 'Teen climate activists are passionate, loud, and often angry—because they see a real problem being ignored. God gave humanity the job of stewarding creation, not exploiting it. But here\'s the tension: environmental activism can become an identity or even a kind of religion, replacing God with "saving the planet." You can care about the earth without worshiping it. Stewardship is biblical—but so is trusting that God holds the future, not us.',
    verse: 'Genesis 2:15 - "The Lord God took the man and put him in the Garden of Eden to work it and take care of it."',
    category: 'Stewardship'
  },
  {
    id: '6',
    title: 'Celebrities Cancel Culture: When Does Accountability Go Too Far?',
    summary: 'The internet debates whether "cancel culture" promotes accountability or prevents growth and forgiveness.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/celebrity/cancel-culture-accountability',
    biblicalLesson: 'Cancel culture says: one mistake and you\'re done. No redemption, no second chances—just public execution and permanent exile. But Jesus literally died so people could be forgiven and start over. Accountability is biblical, but so is restoration. The question isn\'t whether someone messed up—it\'s whether they\'re willing to change. Are we building a culture of justice, or just revenge with good branding?',
    verse: 'Colossians 3:13 - "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you."',
    category: 'Forgiveness'
  },
  {
    id: '7',
    title: 'Social Media Stars Speak on Comparison and Jealousy',
    summary: 'Influencers are getting real about how social media comparison affects their mental health.',
    source: 'Teen Vogue',
    url: '#',
    sourceUrl: 'https://www.teenvogue.com/story/social-media-comparison-mental-health',
    biblicalLesson: 'Influencers admit social media wrecks their mental health—then post another perfectly curated photo an hour later. The irony is loud. Comparison doesn\'t just steal joy; it rewires your brain to believe your life only matters if it looks good online. But the Bible says to run YOUR race, not someone else\'s highlight reel. Delete the app if you need to. Your worth isn\'t measured in likes.',
    verse: 'Galatians 6:4 - "Each one should test their own actions. Then they can take pride in themselves alone, without comparing themselves to someone else."',
    category: 'Contentment'
  },
  {
    id: '8',
    title: 'Young Entrepreneurs Share Their Success Stories',
    summary: 'Teen business owners are inspiring others by turning passion into profit.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/celebrity/teen-entrepreneurs-success',
    biblicalLesson: 'Teen entrepreneurs are celebrated as "hustlers" and "self-made," but let\'s be real: success stories often hide privilege, connections, or lucky timing. Hard work matters, but so does acknowledging what you were given. The Bible says every good gift comes from God—including your talents, opportunities, and yes, even your circumstances. Work hard, but stay humble. Your success isn\'t just yours.',
    verse: 'James 1:17 - "Every good and perfect gift is from above, coming down from the Father of the heavenly lights."',
    category: 'Work Ethic'
  },
  {
    id: '9',
    title: 'Delroy Lindo\'s Visible Disappointment at Oscar Loss Sparks Debate',
    summary: 'After 50 years of acting, Delroy Lindo received his first Oscar nomination for Best Supporting Actor in "Sinners." When Sean Penn won, cameras caught Lindo not clapping and remaining blank-faced. The internet is divided on whether his reaction was honest or ungracious.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/leylamohammed/delroy-lindo-oscar-loss-reaction-sean-penn-divides-fans',
    biblicalLesson: 'We live in a culture that demands fake reactions and performative grace. But the Bible values honesty and integrity. Delroy showed disappointment because he was disappointed—that\'s human. Our worth isn\'t in awards or public approval; it\'s in being truthful before God. You don\'t owe the world a performance when you\'re hurting.',
    verse: 'Proverbs 12:22 - "The Lord detests lying lips, but he delights in people who are trustworthy."',
    category: 'Authenticity',
    lastUpdated: 'March 17, 2026'
  },
  {
    id: '10',
    title: 'Leonardo DiCaprio\'s "Youthful" Look at Oscars Goes Viral',
    summary: 'Leonardo DiCaprio showed up to the 2026 Oscars looking noticeably younger, sparking internet speculation about plastic surgery and weight loss. Turns out it was mostly just a new mustache, but the obsession with his appearance went viral.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/ellendurney/leonardo-dicaprio-new-youthful-look-2026-oscars',
    biblicalLesson: 'Our culture is terrified of aging, treating it like failure instead of a natural part of life. But the Bible says gray hair is a crown of glory, earned through righteousness. Your value isn\'t in your youth or appearance—it\'s in being made in God\'s image. That doesn\'t fade.',
    verse: 'Proverbs 16:31 - "Gray hair is a crown of splendor; it is attained in the way of righteousness."',
    category: 'Self-Worth',
    lastUpdated: 'March 17, 2026'
  },
  {
    id: '11',
    title: 'Oscars Theater Left Covered in Trash After Ceremony',
    summary: 'A viral photo showed the Oscars theater covered in trash after the ceremony—snack packs, candy wrappers, and fancy water bottles scattered everywhere. People were shocked that some of the richest celebrities in the world left their mess for someone else to clean up.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/mjs538/oscars-trash-viral-photo',
    biblicalLesson: 'Character isn\'t what you do when people are watching—it\'s what you do in the small, unseen moments. Jesus taught that true greatness comes from serving others, not being served. If you won\'t pick up your own trash, what does that say about your heart?',
    verse: 'Matthew 20:26 - "Whoever wants to become great among you must be your servant."',
    category: 'Service',
    lastUpdated: 'March 17, 2026'
  },
  {
    id: '12',
    title: 'Kris Jenner\'s Shady Question to Influencers at Oscars Party',
    summary: 'At the Vanity Fair Oscars after-party, Kris Jenner paused while being interviewed by two influencers and asked: "How did you get this gig?" The internet loved her accidental shade, especially as influencers increasingly replace trained journalists on red carpets.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/ellendurney/kris-jenner-shady-question-influencers-oscar-party',
    biblicalLesson: 'Our culture has confused popularity with competence. Just because someone has followers doesn\'t mean they\'re qualified. The Bible says the wise store up knowledge—real skill matters. Are you building something real, or just chasing attention?',
    verse: 'Proverbs 10:14 - "The wise store up knowledge, but the mouth of a fool invites ruin."',
    category: 'Work Ethic',
    lastUpdated: 'March 17, 2026'
  },
  {
    id: '13',
    title: 'Oscars Served "Elementary School Lunch" Snacks, Attendees Say',
    summary: 'Despite being Hollywood\'s most glamorous night, Oscars attendees were served basic snack packs with SkinnyPop popcorn, Swedish Fish, and bottled water. People compared it to "field trip lunches" and called it embarrassing for such a high-profile event.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/leylamohammed/oscars-2026-disappointing-snacks-viral-backlash',
    biblicalLesson: 'Hollywood is obsessed with image—the dresses, the makeup, the red carpet. But behind the scenes, the actual experience is cheap and empty. Jesus called out religious leaders for the same thing: cleaning the outside of the cup while the inside stays dirty. What happens when someone sees behind the curtain of your life?',
    verse: 'Matthew 23:25 - "You clean the outside of the cup and dish, but inside they are full of greed and self-indulgence."',
    category: 'Authenticity',
    lastUpdated: 'March 17, 2026'
  },
  {
    id: '14',
    title: 'Anne Hathaway Sparks Plastic Surgery Rumors at Oscars',
    summary: 'Anne Hathaway went viral at the 2026 Oscars after showing up looking noticeably different, sparking plastic surgery speculation. She later revealed her "trick" was actually just using cold spoons under her eyes and strategic makeup to look more "awake." The internet was shocked it was that simple.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/celebrity/anne-hathaway-oscars-plastic-surgery-rumors',
    biblicalLesson: 'We live in a culture so obsessed with appearance that people assume any change means cosmetic surgery. But Anne\'s response shows something deeper: the pressure women face to look perfect all the time is exhausting. God doesn\'t care if you look "awake" or camera-ready—He cares about your heart. You were made in His image, and that image doesn\'t need editing.',
    verse: '1 Samuel 16:7 - "The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart."',
    category: 'Self-Worth',
    lastUpdated: 'March 18, 2026'
  },
  {
    id: '15',
    title: 'Zendaya Rewears 2015 Oscars Dress at Movie Premiere',
    summary: 'Zendaya showed up to the premiere of her new movie "The Drama" wearing the exact same dress she wore to the 2015 Oscars—11 years ago. In a culture obsessed with "new, new, new," people were stunned and impressed by her choice to rewear something instead of buying another designer gown.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/celebrity/zendaya-rewear-2015-oscars-dress',
    biblicalLesson: 'Our culture screams that you need the newest trend to be valuable. But Zendaya just proved contentment is more powerful than consumption. The Bible warns that the love of money and stuff never satisfies—only God does. What if we stopped chasing "more" and started being grateful for what we already have?',
    verse: 'Hebrews 13:5 - "Keep your lives free from the love of money and be content with what you have."',
    category: 'Contentment',
    lastUpdated: 'March 18, 2026'
  },
  {
    id: '16',
    title: 'Chris Pratt Says His Kids Aren\'t Allowed to Watch Movies',
    summary: 'Chris Pratt revealed that his wife Katherine Schwarzenegger is "very old-school" and doesn\'t let their kids watch movies. The internet is divided—some praised the parenting choice, while others think it\'s extreme and controlling.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/celebrity/chris-pratt-kids-no-movies',
    biblicalLesson: 'Culture says you\'re either too strict or too permissive with your kids—there\'s no winning. But the Bible calls parents to guard what enters their children\'s hearts and minds, not to control them out of fear but to protect them out of love. Every family is different, and that\'s okay. The goal isn\'t perfection—it\'s raising kids who know God and think critically.',
    verse: 'Proverbs 22:6 - "Start children off on the way they should go, and even when they are old they will not turn from it."',
    category: 'Family',
    lastUpdated: 'March 18, 2026'
  },
  {
    id: '17',
    title: 'Zendaya\'s Euphoria Comments Spark "Checked Out" Speculation',
    summary: 'Fans noticed that Zendaya didn\'t post the latest Euphoria Season 3 trailer and has barely talked about the show, despite it premiering in weeks. Combined with rumors of tension with creator Sam Levinson, people are speculating she\'s "checked out" and no longer invested in the project.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/celebrity/zendaya-euphoria-checked-out',
    biblicalLesson: 'Sometimes the job you once loved becomes toxic or draining, and staying becomes dishonest to yourself and everyone around you. The Bible values integrity—doing what\'s right even when it\'s hard. If Zendaya is genuinely checked out, pretending otherwise would be fake. God calls us to honor our commitments, but also to recognize when it\'s time to walk away with grace.',
    verse: 'Colossians 3:23 - "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."',
    category: 'Work Ethic',
    lastUpdated: 'March 18, 2026'
  },
  {
    id: '18',
    title: 'Joe Rogan Calls 2026 "The Most Unstable Year Yet"',
    summary: 'Joe Rogan went viral after admitting on his podcast that 2026 feels like "the most unstable year" yet, citing political chaos, economic uncertainty, and social division. The comment resonated with millions who feel the same anxiety about the state of the world.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    sourceUrl: 'https://www.buzzfeed.com/celebrity/joe-rogan-2026-most-unstable-year',
    biblicalLesson: 'Fear is contagious. When influential voices say "everything is falling apart," it amplifies anxiety. But Jesus told His followers not to be anxious about tomorrow—God is still in control. The world has always been broken; the difference is how much attention we give to the chaos. Where you fix your eyes matters: on the news cycle, or on the God who holds all things together?',
    verse: 'Matthew 6:34 - "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own."',
    category: 'Mental Health',
    lastUpdated: 'March 18, 2026'
  }
];

export async function GET() {
  return NextResponse.json(articles);
}
