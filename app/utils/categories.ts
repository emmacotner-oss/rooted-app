// Category metadata and utilities

export interface CategoryInfo {
  name: string;
  description: string;
  icon: string;
  color: string;
  verses: string[];
}

export const categoryInfo: Record<string, CategoryInfo> = {
  'mental health': {
    name: 'Mental Health',
    description: 'Exploring emotional wellness, anxiety, depression, and self-care through a biblical lens. God cares about your mental health and offers peace, hope, and healing.',
    icon: '🧠',
    color: 'from-blue-500 to-cyan-500',
    verses: [
      'Philippians 4:6-7 - Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
      'Isaiah 41:10 - Fear not, for I am with you; be not dismayed, for I am your God.',
      'Matthew 11:28 - Come to me, all you who are weary and burdened, and I will give you rest.'
    ]
  },
  'self-worth': {
    name: 'Self-Worth',
    description: 'Understanding your identity and value in Christ. You are fearfully and wonderfully made, loved unconditionally, and have infinite worth in God\'s eyes.',
    icon: '💎',
    color: 'from-purple-500 to-pink-500',
    verses: [
      'Psalm 139:14 - I praise you because I am fearfully and wonderfully made.',
      'Ephesians 2:10 - For we are God\'s handiwork, created in Christ Jesus to do good works.',
      '1 John 3:1 - See what great love the Father has lavished on us, that we should be called children of God!'
    ]
  },
  'relationships': {
    name: 'Relationships',
    description: 'Navigating friendships, dating, family dynamics, and conflict through biblical wisdom. God designed us for meaningful connection and healthy relationships.',
    icon: '💕',
    color: 'from-pink-500 to-rose-500',
    verses: [
      'Proverbs 17:17 - A friend loves at all times, and a brother is born for a time of adversity.',
      '1 Corinthians 13:4-7 - Love is patient, love is kind...',
      'Ephesians 4:32 - Be kind and compassionate to one another, forgiving each other.'
    ]
  },
  'social media': {
    name: 'Social Media',
    description: 'Examining digital culture, comparison, online identity, and healthy tech habits. Learn to use social media wisely without letting it define you.',
    icon: '📱',
    color: 'from-indigo-500 to-purple-500',
    verses: [
      'Proverbs 4:23 - Above all else, guard your heart, for everything you do flows from it.',
      'Romans 12:2 - Do not conform to the pattern of this world, but be transformed by the renewing of your mind.',
      'Colossians 3:23 - Whatever you do, work at it with all your heart, as working for the Lord.'
    ]
  },
  'decision-making': {
    name: 'Decision Making',
    description: 'Finding wisdom for life\'s choices, big and small. God promises to guide you when you seek His wisdom and trust His plan.',
    icon: '🧭',
    color: 'from-emerald-500 to-teal-500',
    verses: [
      'Proverbs 3:5-6 - Trust in the Lord with all your heart and lean not on your own understanding.',
      'James 1:5 - If any of you lacks wisdom, you should ask God, who gives generously to all.',
      'Psalm 32:8 - I will instruct you and teach you in the way you should go.'
    ]
  },
  'purpose': {
    name: 'Purpose',
    description: 'Discovering your calling, passions, and God\'s unique plan for your life. You were created for a purpose, and God has good works prepared for you.',
    icon: '🎯',
    color: 'from-orange-500 to-amber-500',
    verses: [
      'Jeremiah 29:11 - For I know the plans I have for you, declares the Lord, plans to prosper you.',
      'Romans 8:28 - And we know that in all things God works for the good of those who love him.',
      'Ephesians 2:10 - For we are God\'s handiwork, created in Christ Jesus to do good works.'
    ]
  }
};

export function getCategoryInfo(category: string): CategoryInfo | undefined {
  return categoryInfo[category.toLowerCase()];
}

export function getAllCategories(): string[] {
  return Object.keys(categoryInfo);
}
