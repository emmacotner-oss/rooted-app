import { NextResponse } from 'next/server';

export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  biblicalLesson: string;
  verse: string;
  category: string;
}

// Curated pop culture articles with biblical perspectives
const articles: Article[] = [
  {
    id: '1',
    title: 'Celebrities Speaking Out on Mental Health',
    summary: 'Stars like Selena Gomez and Billie Eilish are opening up about their mental health struggles, encouraging fans to seek help.',
    source: 'Teen Vogue',
    url: '#',
    biblicalLesson: 'Just as these celebrities show courage in vulnerability, God calls us to cast our anxieties on Him. Mental health matters, and seeking help shows strength, not weakness.',
    verse: '1 Peter 5:7 - "Cast all your anxiety on him because he cares for you."',
    category: 'Mental Health'
  },
  {
    id: '2',
    title: 'Social Media Influencers Promote Body Positivity',
    summary: 'Popular influencers are challenging unrealistic beauty standards and promoting self-acceptance.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    biblicalLesson: 'God created each of us uniquely and wonderfully. True beauty comes from our character and heart, not from meeting worldly standards.',
    verse: 'Psalm 139:14 - "I praise you because I am fearfully and wonderfully made."',
    category: 'Self-Worth'
  },
  {
    id: '3',
    title: 'Young Stars Using Fame for Charity Work',
    summary: 'Teen celebrities are leveraging their platforms to raise awareness and funds for important causes.',
    source: 'Teen Vogue',
    url: '#',
    biblicalLesson: 'Using our gifts and influence to serve others reflects God\'s love. Whatever talents we have, we can use them to make a positive difference.',
    verse: 'Matthew 5:16 - "Let your light shine before others, that they may see your good deeds."',
    category: 'Service'
  },
  {
    id: '4',
    title: 'Music Artists Address Toxic Relationships in New Songs',
    summary: 'Chart-topping artists are writing songs about recognizing and leaving unhealthy relationships.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    biblicalLesson: 'God wants relationships built on respect, love, and mutual support. Recognizing toxic patterns and setting boundaries shows self-respect and wisdom.',
    verse: 'Proverbs 4:23 - "Above all else, guard your heart, for everything you do flows from it."',
    category: 'Relationships'
  },
  {
    id: '5',
    title: 'Teen Activists Leading Climate Change Movement',
    summary: 'Young voices are at the forefront of environmental activism, inspiring global action.',
    source: 'Teen Vogue',
    url: '#',
    biblicalLesson: 'God entrusted us with caring for His creation. Taking action to protect our environment is living out our role as faithful stewards.',
    verse: 'Genesis 2:15 - "The Lord God took the man and put him in the Garden of Eden to work it and take care of it."',
    category: 'Stewardship'
  },
  {
    id: '6',
    title: 'Celebrities Cancel Culture: When Does Accountability Go Too Far?',
    summary: 'The internet debates whether "cancel culture" promotes accountability or prevents growth and forgiveness.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    biblicalLesson: 'While accountability matters, God calls us to forgive and allow room for growth. We can hold people responsible while still offering grace.',
    verse: 'Colossians 3:13 - "Bear with each other and forgive one another... Forgive as the Lord forgave you."',
    category: 'Forgiveness'
  },
  {
    id: '7',
    title: 'Social Media Stars Speak on Comparison and Jealousy',
    summary: 'Influencers are getting real about how social media comparison affects their mental health.',
    source: 'Teen Vogue',
    url: '#',
    biblicalLesson: 'Comparison steals joy. God has a unique plan for each of us, and contentment comes from gratitude for what we have, not envy of others.',
    verse: 'Galatians 6:4 - "Each one should test their own actions... without comparing themselves to someone else."',
    category: 'Contentment'
  },
  {
    id: '8',
    title: 'Young Entrepreneurs Share Their Success Stories',
    summary: 'Teen business owners are inspiring others by turning passion into profit.',
    source: 'BuzzFeed Celebrity',
    url: '#',
    biblicalLesson: 'God gives us talents and passions for a purpose. Working hard, using our gifts wisely, and honoring God in our work brings fulfillment.',
    verse: 'Colossians 3:23 - "Whatever you do, work at it with all your heart, as working for the Lord."',
    category: 'Work Ethic'
  }
];

export async function GET() {
  return NextResponse.json(articles);
}
