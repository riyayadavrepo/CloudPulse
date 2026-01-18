-- Seed data for Feedback Intelligence Database
-- 75+ realistic feedback items about Cloudflare products

INSERT INTO feedback (source, content, user_type, sentiment, category, priority, created_at) VALUES
('github', 'Workers deployment takes 30+ seconds in our CI/CD pipeline. This is too slow for rapid iteration.', 'enterprise', 'negative', 'performance', 'high', '2026-01-15 10:23:00'),
('discord', 'Just deployed my first Worker! The DX is incredible - from code to production in seconds. Love it!', 'free', 'positive', 'ux', 'low', '2026-01-16 14:30:00'),
('support', 'Getting intermittent 500 errors when Workers tries to access D1 with queries returning >1000 rows', 'pro', 'negative', 'bug', 'critical', '2026-01-17 09:15:00'),
('twitter', 'The Workers AI integration is a game changer. Built an AI chatbot in under an hour without managing any infrastructure.', 'pro', 'positive', 'feature-request', 'low', '2026-01-16 16:45:00'),
('email', 'Need better documentation on Workers environment variables. The docs are scattered across multiple pages.', 'free', 'neutral', 'docs', 'medium', '2026-01-14 11:20:00'),
('github', 'D1 cold starts are killing our application performance. 2-3 second delays on first query.', 'enterprise', 'negative', 'performance', 'critical', '2026-01-15 08:30:00'),
('discord', 'D1 makes it so easy to add SQL to Workers! No connection pooling headaches, just works.', 'pro', 'positive', 'ux', 'low', '2026-01-13 15:22:00'),
('support', 'Would love to see D1 support for full-text search. Currently having to use KV as a workaround.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-12 10:45:00'),
('github', 'D1 Studio UI is confusing - took me 20 minutes to figure out how to view table data.', 'free', 'negative', 'ux', 'medium', '2026-01-11 14:10:00'),
('twitter', 'Cloudflare Pages deployment is lightning fast! GitHub push to live site in under a minute.', 'free', 'positive', 'performance', 'low', '2026-01-16 12:00:00'),
('support', 'Pages build failing with "Module not found" but builds fine locally. Need better error messages.', 'pro', 'negative', 'bug', 'high', '2026-01-17 08:00:00'),
('discord', 'Can we get support for monorepo builds in Pages? Currently have to use workarounds.', 'enterprise', 'neutral', 'feature-request', 'medium', '2026-01-14 16:30:00'),
('email', 'Pages + Functions is the perfect combo. Built a full-stack app without managing servers!', 'pro', 'positive', 'ux', 'low', '2026-01-13 09:15:00'),
('github', 'KV eventual consistency bit us in production. Cache invalidation led to stale data for 60+ seconds.', 'enterprise', 'negative', 'bug', 'critical', '2026-01-15 13:45:00'),
('discord', 'KV is perfect for edge caching! Our API response times dropped from 200ms to 20ms.', 'pro', 'positive', 'performance', 'low', '2026-01-12 11:30:00'),
('support', 'Need a way to bulk delete KV keys. Currently have to loop through one by one.', 'enterprise', 'neutral', 'feature-request', 'medium', '2026-01-10 14:20:00'),
('twitter', 'Migrated from S3 to R2 and saved $5k/month on egress fees. Same API, way cheaper!', 'enterprise', 'positive', 'ux', 'low', '2026-01-14 10:00:00'),
('github', 'R2 upload speed is slower than S3 for large files (>100MB). Takes 2x longer.', 'pro', 'negative', 'performance', 'high', '2026-01-16 15:30:00'),
('support', 'R2 needs better integration with Images - currently requires manual copying.', 'enterprise', 'neutral', 'feature-request', 'medium', '2026-01-11 09:45:00'),
('discord', 'Durable Objects made building a real-time collab app trivial. WebSocket support is chef''s kiss!', 'pro', 'positive', 'ux', 'low', '2026-01-15 11:00:00'),
('github', 'Durable Objects pricing is confusing. Hard to estimate costs before deploying.', 'enterprise', 'negative', 'docs', 'high', '2026-01-13 14:15:00'),
('support', 'Durable Objects hibernation causes 500ms+ cold starts. This breaks our real-time features.', 'enterprise', 'negative', 'performance', 'critical', '2026-01-17 07:30:00'),
('email', 'Cache purge takes 30 seconds to propagate globally. Need near-instant purging for dynamic content.', 'enterprise', 'negative', 'performance', 'high', '2026-01-16 10:20:00'),
('twitter', 'Cloudflare CDN reduced our TTFB by 70%. Page Speed score jumped from 65 to 95!', 'pro', 'positive', 'performance', 'low', '2026-01-12 13:45:00'),
('discord', 'Cache rules UI is overwhelming for beginners. Too many options, not enough guidance.', 'free', 'negative', 'ux', 'medium', '2026-01-10 16:00:00'),
('support', 'Web Analytics dashboard shows different numbers than Google Analytics. Which one is correct?', 'pro', 'neutral', 'bug', 'medium', '2026-01-15 12:30:00'),
('github', 'Workers Analytics Engine is powerful but the query syntax is hard to learn. More examples needed.', 'enterprise', 'neutral', 'docs', 'medium', '2026-01-14 09:00:00'),
('twitter', 'Finally, privacy-friendly analytics that don''t require cookie banners. Thank you Cloudflare!', 'free', 'positive', 'ux', 'low', '2026-01-11 15:20:00'),
('discord', 'Cloudflare Images automatic optimization saved us 60% on bandwidth. Set it and forget it!', 'pro', 'positive', 'performance', 'low', '2026-01-13 10:45:00'),
('support', 'Images dashboard is slow when you have 10k+ images. Takes 10 seconds to load.', 'enterprise', 'negative', 'performance', 'high', '2026-01-16 14:00:00'),
('github', 'Stream needs better API documentation. Took hours to figure out how to use signed URLs.', 'pro', 'negative', 'docs', 'medium', '2026-01-12 08:30:00'),
('twitter', 'Cloudflare DNS is the fastest resolver I''ve tested. 10ms average query time!', 'free', 'positive', 'performance', 'low', '2026-01-10 12:00:00'),
('support', 'DNS record propagation took 5 minutes. Expected it to be instant with Cloudflare.', 'pro', 'negative', 'performance', 'medium', '2026-01-15 16:45:00'),
('github', 'Wrangler requires Node 20+ but our CI/CD is on Node 18. Breaking change with no migration guide.', 'enterprise', 'negative', 'bug', 'critical', '2026-01-17 10:00:00'),
('discord', 'Wrangler dev mode with live reload is amazing! Changed my whole development workflow.', 'free', 'positive', 'ux', 'low', '2026-01-14 13:30:00'),
('support', 'wrangler tail command times out after 30 seconds. Need longer session for debugging.', 'pro', 'negative', 'bug', 'medium', '2026-01-13 11:15:00'),
('email', 'New dashboard design is cleaner but I can''t find the SSL settings anymore. Navigation is confusing.', 'pro', 'negative', 'ux', 'high', '2026-01-16 09:30:00'),
('twitter', 'The Workers dashboard showing real-time metrics is so cool. Love watching requests fly by!', 'free', 'positive', 'ux', 'low', '2026-01-12 14:45:00'),
('github', 'Dashboard mobile experience is terrible. Can''t manage DNS records properly on phone.', 'enterprise', 'negative', 'ux', 'medium', '2026-01-11 10:20:00'),
('support', 'WAF blocking legitimate traffic from our mobile app. False positive rate too high.', 'enterprise', 'negative', 'bug', 'critical', '2026-01-17 08:45:00'),
('discord', 'Bot Fight Mode stopped our credential stuffing attacks immediately. Impressive!', 'pro', 'positive', 'ux', 'low', '2026-01-13 16:00:00'),
('email', 'Unexpected $800 bill for Workers CPU time. Need better cost estimates before deploying.', 'enterprise', 'negative', 'bug', 'critical', '2026-01-15 07:30:00'),
('twitter', 'Free tier is incredibly generous. Running my personal projects on Cloudflare at zero cost!', 'free', 'positive', 'ux', 'low', '2026-01-10 11:45:00'),
('github', 'Cloudflare API rate limits are too restrictive for our automation. Need higher limits.', 'enterprise', 'negative', 'bug', 'high', '2026-01-14 15:20:00'),
('discord', 'API documentation is excellent. Clear examples, good error messages. A+ developer experience.', 'pro', 'positive', 'docs', 'low', '2026-01-12 09:30:00'),
('discord', 'Vectorize + Workers AI = magic. Built semantic search in an afternoon!', 'pro', 'positive', 'ux', 'low', '2026-01-16 11:15:00'),
('github', 'Vectorize index size limits are too small for our use case. Need to store 1M+ vectors.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-15 14:30:00'),
('support', 'Queues documentation doesn''t explain retry logic clearly. Had to test to figure it out.', 'pro', 'negative', 'docs', 'medium', '2026-01-13 12:45:00'),
('twitter', 'Cloudflare Queues solved our background job processing perfectly. Simple and reliable!', 'enterprise', 'positive', 'ux', 'low', '2026-01-11 13:20:00'),
('discord', 'Email Routing is a hidden gem! Free email forwarding with workers integration is brilliant.', 'free', 'positive', 'ux', 'low', '2026-01-14 10:30:00'),
('github', 'Turnstile is way better than reCAPTCHA. Privacy-friendly and actually works on mobile!', 'pro', 'positive', 'ux', 'low', '2026-01-12 15:45:00'),
('support', 'Turnstile widget failing in Safari private mode. Getting constant CAPTCHA loops.', 'free', 'negative', 'bug', 'high', '2026-01-16 13:15:00'),
('email', 'Getting started guide was confusing. Jumped between too many docs pages to deploy my first Worker.', 'free', 'negative', 'docs', 'medium', '2026-01-10 14:00:00'),
('twitter', 'From zero to deployed Worker in 10 minutes following the quickstart. Impressed!', 'free', 'positive', 'ux', 'low', '2026-01-13 08:45:00'),
('support', 'Enterprise support response time is great but need more examples of D1 best practices.', 'enterprise', 'neutral', 'docs', 'medium', '2026-01-15 09:00:00'),
('github', 'Workers CPU limits are too restrictive for ML inference. Getting timeout errors on every request.', 'enterprise', 'negative', 'bug', 'critical', '2026-01-17 11:30:00'),
('discord', 'Just discovered Pages Functions. This is what I''ve been looking for! SSR made easy.', 'free', 'positive', 'ux', 'low', '2026-01-17 09:45:00'),
('twitter', 'D1 import from SQLite is buggy. Lost some data during migration. Had to restore from backup.', 'pro', 'negative', 'bug', 'critical', '2026-01-16 17:20:00'),
('support', 'Need a staging environment feature for Workers. Currently duplicating everything manually.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-17 06:45:00'),
('email', 'Cloudflare Images resize API is incredibly fast. 50ms average response time globally!', 'pro', 'positive', 'performance', 'low', '2026-01-15 15:30:00'),
('github', 'Workers AI model selection is limited. Need access to GPT-4 or Claude for production use.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-14 12:00:00'),
('discord', 'The new Wrangler playground feature is awesome for quick testing!', 'free', 'positive', 'ux', 'low', '2026-01-13 14:45:00'),
('support', 'KV write performance degrades significantly above 1000 writes/second.', 'enterprise', 'negative', 'performance', 'critical', '2026-01-17 10:15:00'),
('twitter', 'R2 multipart upload API is well-designed. Migration from S3 was painless.', 'pro', 'positive', 'ux', 'low', '2026-01-11 16:30:00'),
('email', 'Dashboard analytics graphs don''t load on Firefox. Works fine in Chrome.', 'free', 'negative', 'bug', 'medium', '2026-01-10 13:45:00'),
('github', 'Workers deployment rollback feature would be amazing. Currently have to redeploy old code manually.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-15 11:30:00'),
('discord', 'Love the Workers for Platforms product. Makes multi-tenancy so much easier!', 'enterprise', 'positive', 'ux', 'low', '2026-01-14 08:15:00'),
('support', 'D1 backup and restore documentation is missing. How do we handle disaster recovery?', 'enterprise', 'negative', 'docs', 'high', '2026-01-16 07:45:00'),
('twitter', 'Cloudflare Radar API is incredible for network intelligence. Free tier is very generous!', 'pro', 'positive', 'ux', 'low', '2026-01-13 17:20:00'),
('github', 'Workers Trace Events would help debug production issues. Need better observability.', 'enterprise', 'neutral', 'feature-request', 'medium', '2026-01-12 16:00:00'),
('email', 'Pages collaboration features are lacking. Can''t easily share preview deployments with team.', 'pro', 'neutral', 'feature-request', 'medium', '2026-01-11 12:30:00'),
('discord', 'The developer community on Discord is incredibly helpful. Got my issue solved in minutes!', 'free', 'positive', 'ux', 'low', '2026-01-10 15:45:00'),
('support', 'Need CloudFormation/Terraform support for all new products. IaC is critical for enterprise.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-14 11:00:00'),
('github', 'Workers logging could be better. Hard to correlate logs across distributed executions.', 'pro', 'negative', 'ux', 'medium', '2026-01-13 10:15:00');

-- Insert a sample daily summary
INSERT INTO daily_summaries (summary_date, content, slack_message, stats) VALUES
('2026-01-16',
'Daily Feedback Analysis:

📊 Volume: 15 items (up 20% from previous day)

🔴 Top Critical Issues:
1. D1 Database Performance - Multiple reports of cold start delays (2-3s)
2. Workers CPU Timeouts - Enterprise customers hitting limits during ML inference
3. Billing Surprises - Unexpected charges causing friction

⚠️ High Priority Themes:
- Performance concerns across D1, R2 uploads, and KV writes
- Documentation gaps (D1 backup/restore, Workers env vars)
- Wrangler Node 20 requirement breaking CI/CD pipelines

😊 Positive Sentiment (65%):
- Workers AI integration receiving praise
- Pages deployment speed highly appreciated
- R2 cost savings vs S3 compelling for enterprises

📌 Recommended Actions:
1. Investigate D1 cold start performance - appears systemic
2. Create migration guide for Wrangler Node 20 upgrade
3. Add cost estimation tool before Worker deployment
4. Improve D1 backup/restore documentation',
'{"blocks":[{"type":"header","text":{"type":"plain_text","text":"Daily Feedback Summary - 2026-01-16"}},{"type":"section","fields":[{"type":"mrkdwn","text":"*Total Feedback:*\n15 items"},{"type":"mrkdwn","text":"*Critical Issues:*\n3 items"},{"type":"mrkdwn","text":"*Sentiment:*\n10 positive, 5 negative"},{"type":"mrkdwn","text":"*High Priority:*\n8 items"}]}]}',
'{"total":15,"positive":10,"negative":5,"critical":3,"high":8}'
);
