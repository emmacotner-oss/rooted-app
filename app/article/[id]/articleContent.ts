// This file contains all the expanded content, scriptures, and practical steps for articles
// Import this to keep the main page component clean

export interface ExpandedContent {
  detailedSummary: string;
  significance: string;
  biblicalContext: string;
  biblicalApplication: string;
  practicalIntro: string;
  reflectionQuestions: string[];
}

export interface Scripture {
  reference: string;
  text: string;
  context?: string;
}

export interface PracticalStep {
  title: string;
  description: string;
}

// For now, return default content - we can expand this with all the detailed content later
export function getExpandedContent(id: string): ExpandedContent {
  // Return simplified default content that works for all articles
  return {
    detailedSummary: 'This cultural moment invites us to think critically about the world around us and how faith intersects with everyday life. The conversation happening in pop culture reveals deeper questions about values, identity, and meaning.',
    significance: "For Christian teens growing up in today's world, understanding how to engage culture through a biblical lens is essential. These conversations shape how we think, what we value, and who we become.",
    biblicalContext: "God's truth is timeless and relevant to every area of life. Scripture offers wisdom that speaks directly into the moments we're experiencing today. The Bible consistently addresses human nature, relationships, values, and purpose.",
    biblicalApplication: "Living out biblical principles means applying God's truth to real-life situations with courage, integrity, and love. Faith isn't just for Sunday—it's for every conversation, decision, and moment of your life.",
    practicalIntro: 'Here are practical ways to live out your faith in response to this topic:',
    reflectionQuestions: [
      'How does this topic connect to my daily life?',
      'What is God teaching me through this cultural moment?',
      'How can I live differently in light of biblical truth?',
      'Who can I talk to about this topic to grow in understanding?'
    ]
  };
}

export function getAdditionalScriptures(id: string): Scripture[] {
  // Return default scriptures that work for most articles
  return [
    {
      reference: 'Romans 12:2',
      text: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.',
      context: 'God calls us to think differently than culture—rooted in truth, not trends.'
    },
    {
      reference: 'Philippians 4:8',
      text: 'Whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.',
      context: 'What we dwell on shapes who we become. Choose wisely.'
    },
    {
      reference: 'Colossians 3:23',
      text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.',
      context: 'Everything we do can honor God when done with the right heart.'
    }
  ];
}

export function getPracticalSteps(id: string): PracticalStep[] {
  // Return default practical steps
  return [
    {
      title: 'Reflect and pray',
      description: 'Take time to think about how this topic applies to your life. Ask God for wisdom, discernment, and the courage to live according to His truth.'
    },
    {
      title: 'Talk about it',
      description: 'Discuss this with friends, family, or a small group. Hearing different perspectives helps you grow and strengthens your faith community.'
    },
    {
      title: 'Study Scripture',
      description: 'Look up related Bible passages and see what God says about this topic. Let His Word be your foundation, not just opinions or feelings.'
    },
    {
      title: 'Take one small action',
      description: 'Pick one practical step and commit to it this week. Small, consistent changes lead to lasting transformation.'
    }
  ];
}
