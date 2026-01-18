// Mock feedback data relevant to Cloudflare products
export const mockFeedback = [
  // Workers feedback
  {
    source: 'github',
    content: 'Workers deployment takes 30+ seconds in our CI/CD pipeline. This is too slow for rapid iteration.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'performance',
    priority: 'high',
    created_at: '2026-01-15 10:23:00'
  },
  {
    source: 'discord',
    content: 'Just deployed my first Worker! The DX is incredible - from code to production in seconds. Love it!',
    user_type: 'free',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-16 14:30:00'
  },
  {
    source: 'support',
    content: 'Getting intermittent 500 errors when Workers tries to access D1 with queries returning >1000 rows',
    user_type: 'pro',
    sentiment: 'negative',
    category: 'bug',
    priority: 'critical',
    created_at: '2026-01-17 09:15:00'
  },
  {
    source: 'twitter',
    content: 'The Workers AI integration is a game changer. Built an AI chatbot in under an hour without managing any infrastructure.',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'feature-request',
    priority: 'low',
    created_at: '2026-01-16 16:45:00'
  },
  {
    source: 'email',
    content: 'Need better documentation on Workers environment variables. The docs are scattered across multiple pages.',
    user_type: 'free',
    sentiment: 'neutral',
    category: 'docs',
    priority: 'medium',
    created_at: '2026-01-14 11:20:00'
  },

  // D1 Database feedback
  {
    source: 'github',
    content: 'D1 cold starts are killing our application performance. 2-3 second delays on first query.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'performance',
    priority: 'critical',
    created_at: '2026-01-15 08:30:00'
  },
  {
    source: 'discord',
    content: 'D1 makes it so easy to add SQL to Workers! No connection pooling headaches, just works.',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-13 15:22:00'
  },
  {
    source: 'support',
    content: 'Would love to see D1 support for full-text search. Currently having to use KV as a workaround.',
    user_type: 'enterprise',
    sentiment: 'neutral',
    category: 'feature-request',
    priority: 'high',
    created_at: '2026-01-12 10:45:00'
  },
  {
    source: 'github',
    content: 'D1 Studio UI is confusing - took me 20 minutes to figure out how to view table data.',
    user_type: 'free',
    sentiment: 'negative',
    category: 'ux',
    priority: 'medium',
    created_at: '2026-01-11 14:10:00'
  },

  // Pages feedback
  {
    source: 'twitter',
    content: 'Cloudflare Pages deployment is lightning fast! GitHub push to live site in under a minute.',
    user_type: 'free',
    sentiment: 'positive',
    category: 'performance',
    priority: 'low',
    created_at: '2026-01-16 12:00:00'
  },
  {
    source: 'support',
    content: 'Pages build failing with "Module not found" but builds fine locally. Need better error messages.',
    user_type: 'pro',
    sentiment: 'negative',
    category: 'bug',
    priority: 'high',
    created_at: '2026-01-17 08:00:00'
  },
  {
    source: 'discord',
    content: 'Can we get support for monorepo builds in Pages? Currently have to use workarounds.',
    user_type: 'enterprise',
    sentiment: 'neutral',
    category: 'feature-request',
    priority: 'medium',
    created_at: '2026-01-14 16:30:00'
  },
  {
    source: 'email',
    content: 'Pages + Functions is the perfect combo. Built a full-stack app without managing servers!',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-13 09:15:00'
  },

  // KV feedback
  {
    source: 'github',
    content: 'KV eventual consistency bit us in production. Cache invalidation led to stale data for 60+ seconds.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'bug',
    priority: 'critical',
    created_at: '2026-01-15 13:45:00'
  },
  {
    source: 'discord',
    content: 'KV is perfect for edge caching! Our API response times dropped from 200ms to 20ms.',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'performance',
    priority: 'low',
    created_at: '2026-01-12 11:30:00'
  },
  {
    source: 'support',
    content: 'Need a way to bulk delete KV keys. Currently have to loop through one by one.',
    user_type: 'enterprise',
    sentiment: 'neutral',
    category: 'feature-request',
    priority: 'medium',
    created_at: '2026-01-10 14:20:00'
  },

  // R2 Storage feedback
  {
    source: 'twitter',
    content: 'Migrated from S3 to R2 and saved $5k/month on egress fees. Same API, way cheaper!',
    user_type: 'enterprise',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-14 10:00:00'
  },
  {
    source: 'github',
    content: 'R2 upload speed is slower than S3 for large files (>100MB). Takes 2x longer.',
    user_type: 'pro',
    sentiment: 'negative',
    category: 'performance',
    priority: 'high',
    created_at: '2026-01-16 15:30:00'
  },
  {
    source: 'support',
    content: 'R2 needs better integration with Images - currently requires manual copying.',
    user_type: 'enterprise',
    sentiment: 'neutral',
    category: 'feature-request',
    priority: 'medium',
    created_at: '2026-01-11 09:45:00'
  },

  // Durable Objects feedback
  {
    source: 'discord',
    content: 'Durable Objects made building a real-time collab app trivial. WebSocket support is chef\'s kiss!',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-15 11:00:00'
  },
  {
    source: 'github',
    content: 'Durable Objects pricing is confusing. Hard to estimate costs before deploying.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'docs',
    priority: 'high',
    created_at: '2026-01-13 14:15:00'
  },
  {
    source: 'support',
    content: 'Durable Objects hibernation causes 500ms+ cold starts. This breaks our real-time features.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'performance',
    priority: 'critical',
    created_at: '2026-01-17 07:30:00'
  },

  // CDN/Caching feedback
  {
    source: 'email',
    content: 'Cache purge takes 30 seconds to propagate globally. Need near-instant purging for dynamic content.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'performance',
    priority: 'high',
    created_at: '2026-01-16 10:20:00'
  },
  {
    source: 'twitter',
    content: 'Cloudflare CDN reduced our TTFB by 70%. Page Speed score jumped from 65 to 95!',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'performance',
    priority: 'low',
    created_at: '2026-01-12 13:45:00'
  },
  {
    source: 'discord',
    content: 'Cache rules UI is overwhelming for beginners. Too many options, not enough guidance.',
    user_type: 'free',
    sentiment: 'negative',
    category: 'ux',
    priority: 'medium',
    created_at: '2026-01-10 16:00:00'
  },

  // Analytics feedback
  {
    source: 'support',
    content: 'Web Analytics dashboard shows different numbers than Google Analytics. Which one is correct?',
    user_type: 'pro',
    sentiment: 'neutral',
    category: 'bug',
    priority: 'medium',
    created_at: '2026-01-15 12:30:00'
  },
  {
    source: 'github',
    content: 'Workers Analytics Engine is powerful but the query syntax is hard to learn. More examples needed.',
    user_type: 'enterprise',
    sentiment: 'neutral',
    category: 'docs',
    priority: 'medium',
    created_at: '2026-01-14 09:00:00'
  },
  {
    source: 'twitter',
    content: 'Finally, privacy-friendly analytics that don\'t require cookie banners. Thank you Cloudflare!',
    user_type: 'free',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-11 15:20:00'
  },

  // Images/Stream feedback
  {
    source: 'discord',
    content: 'Cloudflare Images automatic optimization saved us 60% on bandwidth. Set it and forget it!',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'performance',
    priority: 'low',
    created_at: '2026-01-13 10:45:00'
  },
  {
    source: 'support',
    content: 'Images dashboard is slow when you have 10k+ images. Takes 10 seconds to load.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'performance',
    priority: 'high',
    created_at: '2026-01-16 14:00:00'
  },
  {
    source: 'github',
    content: 'Stream needs better API documentation. Took hours to figure out how to use signed URLs.',
    user_type: 'pro',
    sentiment: 'negative',
    category: 'docs',
    priority: 'medium',
    created_at: '2026-01-12 08:30:00'
  },

  // DNS feedback
  {
    source: 'twitter',
    content: 'Cloudflare DNS is the fastest resolver I\'ve tested. 10ms average query time!',
    user_type: 'free',
    sentiment: 'positive',
    category: 'performance',
    priority: 'low',
    created_at: '2026-01-10 12:00:00'
  },
  {
    source: 'support',
    content: 'DNS record propagation took 5 minutes. Expected it to be instant with Cloudflare.',
    user_type: 'pro',
    sentiment: 'negative',
    category: 'performance',
    priority: 'medium',
    created_at: '2026-01-15 16:45:00'
  },

  // Wrangler CLI feedback
  {
    source: 'github',
    content: 'Wrangler requires Node 20+ but our CI/CD is on Node 18. Breaking change with no migration guide.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'bug',
    priority: 'critical',
    created_at: '2026-01-17 10:00:00'
  },
  {
    source: 'discord',
    content: 'Wrangler dev mode with live reload is amazing! Changed my whole development workflow.',
    user_type: 'free',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-14 13:30:00'
  },
  {
    source: 'support',
    content: 'wrangler tail command times out after 30 seconds. Need longer session for debugging.',
    user_type: 'pro',
    sentiment: 'negative',
    category: 'bug',
    priority: 'medium',
    created_at: '2026-01-13 11:15:00'
  },

  // Dashboard/UI feedback
  {
    source: 'email',
    content: 'New dashboard design is cleaner but I can\'t find the SSL settings anymore. Navigation is confusing.',
    user_type: 'pro',
    sentiment: 'negative',
    category: 'ux',
    priority: 'high',
    created_at: '2026-01-16 09:30:00'
  },
  {
    source: 'twitter',
    content: 'The Workers dashboard showing real-time metrics is so cool. Love watching requests fly by!',
    user_type: 'free',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-12 14:45:00'
  },
  {
    source: 'github',
    content: 'Dashboard mobile experience is terrible. Can\'t manage DNS records properly on phone.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'ux',
    priority: 'medium',
    created_at: '2026-01-11 10:20:00'
  },

  // Security/WAF feedback
  {
    source: 'support',
    content: 'WAF blocking legitimate traffic from our mobile app. False positive rate too high.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'bug',
    priority: 'critical',
    created_at: '2026-01-17 08:45:00'
  },
  {
    source: 'discord',
    content: 'Bot Fight Mode stopped our credential stuffing attacks immediately. Impressive!',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-13 16:00:00'
  },

  // Pricing/Billing feedback
  {
    source: 'email',
    content: 'Unexpected $800 bill for Workers CPU time. Need better cost estimates before deploying.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'bug',
    priority: 'critical',
    created_at: '2026-01-15 07:30:00'
  },
  {
    source: 'twitter',
    content: 'Free tier is incredibly generous. Running my personal projects on Cloudflare at zero cost!',
    user_type: 'free',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-10 11:45:00'
  },

  // API feedback
  {
    source: 'github',
    content: 'Cloudflare API rate limits are too restrictive for our automation. Need higher limits.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'bug',
    priority: 'high',
    created_at: '2026-01-14 15:20:00'
  },
  {
    source: 'discord',
    content: 'API documentation is excellent. Clear examples, good error messages. A+ developer experience.',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'docs',
    priority: 'low',
    created_at: '2026-01-12 09:30:00'
  },

  // Vectorize feedback
  {
    source: 'discord',
    content: 'Vectorize + Workers AI = magic. Built semantic search in an afternoon!',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-16 11:15:00'
  },
  {
    source: 'github',
    content: 'Vectorize index size limits are too small for our use case. Need to store 1M+ vectors.',
    user_type: 'enterprise',
    sentiment: 'neutral',
    category: 'feature-request',
    priority: 'high',
    created_at: '2026-01-15 14:30:00'
  },

  // Queues feedback
  {
    source: 'support',
    content: 'Queues documentation doesn\'t explain retry logic clearly. Had to test to figure it out.',
    user_type: 'pro',
    sentiment: 'negative',
    category: 'docs',
    priority: 'medium',
    created_at: '2026-01-13 12:45:00'
  },
  {
    source: 'twitter',
    content: 'Cloudflare Queues solved our background job processing perfectly. Simple and reliable!',
    user_type: 'enterprise',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-11 13:20:00'
  },

  // Email Routing feedback
  {
    source: 'discord',
    content: 'Email Routing is a hidden gem! Free email forwarding with workers integration is brilliant.',
    user_type: 'free',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-14 10:30:00'
  },

  // Turnstile feedback
  {
    source: 'github',
    content: 'Turnstile is way better than reCAPTCHA. Privacy-friendly and actually works on mobile!',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-12 15:45:00'
  },
  {
    source: 'support',
    content: 'Turnstile widget failing in Safari private mode. Getting constant CAPTCHA loops.',
    user_type: 'free',
    sentiment: 'negative',
    category: 'bug',
    priority: 'high',
    created_at: '2026-01-16 13:15:00'
  },

  // Onboarding feedback
  {
    source: 'email',
    content: 'Getting started guide was confusing. Jumped between too many docs pages to deploy my first Worker.',
    user_type: 'free',
    sentiment: 'negative',
    category: 'docs',
    priority: 'medium',
    created_at: '2026-01-10 14:00:00'
  },
  {
    source: 'twitter',
    content: 'From zero to deployed Worker in 10 minutes following the quickstart. Impressed!',
    user_type: 'free',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-13 08:45:00'
  },

  // Support feedback
  {
    source: 'support',
    content: 'Enterprise support response time is great but need more examples of D1 best practices.',
    user_type: 'enterprise',
    sentiment: 'neutral',
    category: 'docs',
    priority: 'medium',
    created_at: '2026-01-15 09:00:00'
  },

  // More varied recent feedback
  {
    source: 'github',
    content: 'Workers CPU limits are too restrictive for ML inference. Getting timeout errors on every request.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'bug',
    priority: 'critical',
    created_at: '2026-01-17 11:30:00'
  },
  {
    source: 'discord',
    content: 'Just discovered Pages Functions. This is what I\'ve been looking for! SSR made easy.',
    user_type: 'free',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-17 09:45:00'
  },
  {
    source: 'twitter',
    content: 'D1 import from SQLite is buggy. Lost some data during migration. Had to restore from backup.',
    user_type: 'pro',
    sentiment: 'negative',
    category: 'bug',
    priority: 'critical',
    created_at: '2026-01-16 17:20:00'
  },
  {
    source: 'support',
    content: 'Need a staging environment feature for Workers. Currently duplicating everything manually.',
    user_type: 'enterprise',
    sentiment: 'neutral',
    category: 'feature-request',
    priority: 'high',
    created_at: '2026-01-17 06:45:00'
  },
  {
    source: 'email',
    content: 'Cloudflare Images resize API is incredibly fast. 50ms average response time globally!',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'performance',
    priority: 'low',
    created_at: '2026-01-15 15:30:00'
  },
  {
    source: 'github',
    content: 'Workers AI model selection is limited. Need access to GPT-4 or Claude for production use.',
    user_type: 'enterprise',
    sentiment: 'neutral',
    category: 'feature-request',
    priority: 'high',
    created_at: '2026-01-14 12:00:00'
  },
  {
    source: 'discord',
    content: 'The new Wrangler playground feature is awesome for quick testing!',
    user_type: 'free',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-13 14:45:00'
  },
  {
    source: 'support',
    content: 'KV write performance degrades significantly above 1000 writes/second.',
    user_type: 'enterprise',
    sentiment: 'negative',
    category: 'performance',
    priority: 'critical',
    created_at: '2026-01-17 10:15:00'
  },
  {
    source: 'twitter',
    content: 'R2 multipart upload API is well-designed. Migration from S3 was painless.',
    user_type: 'pro',
    sentiment: 'positive',
    category: 'ux',
    priority: 'low',
    created_at: '2026-01-11 16:30:00'
  },
  {
    source: 'email',
    content: 'Dashboard analytics graphs don\'t load on Firefox. Works fine in Chrome.',
    user_type: 'free',
    sentiment: 'negative',
    category: 'bug',
    priority: 'medium',
    created_at: '2026-01-10 13:45:00'
  }
];

// Function to generate SQL INSERT statements
export function generateInsertSQL() {
  const values = mockFeedback.map(item => {
    const source = item.source.replace(/'/g, "''");
    const content = item.content.replace(/'/g, "''");
    const userType = item.user_type || 'NULL';
    const sentiment = item.sentiment || 'NULL';
    const category = item.category || 'NULL';
    const priority = item.priority || 'NULL';

    return `('${source}', '${content}', '${userType}', '${sentiment}', '${category}', '${priority}', '${item.created_at}')`;
  }).join(',\n');

  return `INSERT INTO feedback (source, content, user_type, sentiment, category, priority, created_at) VALUES\n${values};`;
}
