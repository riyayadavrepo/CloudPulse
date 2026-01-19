-- Seed data for Feedback Intelligence Database
-- 74 realistic feedback items about Cloudflare Workers

INSERT INTO feedback (source, content, user_type, sentiment, category, priority, created_at) VALUES
('github', 'Workers deployment takes 30+ seconds in our CI/CD pipeline. This is too slow for rapid iteration.', 'enterprise', 'negative', 'performance', 'high', '2026-01-15 10:23:00'),
('discord', 'Just deployed my first Worker! The DX is incredible - from code to production in seconds. Love it!', 'free', 'positive', 'ux', 'low', '2026-01-16 14:30:00'),
('support', 'Getting intermittent 500 errors when Workers hit CPU time limit at exactly 50ms. Need better error messages.', 'pro', 'negative', 'bug', 'critical', '2026-01-17 09:15:00'),
('twitter', 'The Workers AI integration is a game changer. Built an AI chatbot in under an hour without managing any infrastructure.', 'pro', 'positive', 'feature-request', 'low', '2026-01-16 16:45:00'),
('email', 'Need better documentation on Workers environment variables and secrets. The difference between them is unclear.', 'free', 'neutral', 'docs', 'medium', '2026-01-14 11:20:00'),
('github', 'Workers cold starts are killing our application performance. 200-300ms delays on first request after idle.', 'enterprise', 'negative', 'performance', 'critical', '2026-01-15 08:30:00'),
('discord', 'Service bindings make microservices architecture so easy! No HTTP overhead, just function calls.', 'pro', 'positive', 'ux', 'low', '2026-01-13 15:22:00'),
('support', 'Would love to see Workers support for WebSockets with longer connection times. 15 minutes is too short.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-12 10:45:00'),
('github', 'Wrangler dev mode is laggy - 2-3 second delay between code change and reload. Frustrating for development.', 'free', 'negative', 'ux', 'medium', '2026-01-11 14:10:00'),
('twitter', 'Workers bundling is lightning fast! TypeScript to deployed Worker in under 2 seconds.', 'free', 'positive', 'performance', 'low', '2026-01-16 12:00:00'),
('support', 'Workers build failing with "Module not found" but builds fine locally. Need better error messages.', 'pro', 'negative', 'bug', 'high', '2026-01-17 08:00:00'),
('discord', 'Can we get support for multiple environments (dev/staging/prod) in wrangler.toml? Currently duplicating config.', 'enterprise', 'neutral', 'feature-request', 'medium', '2026-01-14 16:30:00'),
('email', 'Workers + KV binding is the perfect combo. Built a global edge cache without managing servers!', 'pro', 'positive', 'ux', 'low', '2026-01-13 09:15:00'),
('github', 'Workers KV eventual consistency bit us in production. Cache invalidation led to stale data for 60+ seconds.', 'enterprise', 'negative', 'bug', 'critical', '2026-01-15 13:45:00'),
('discord', 'Workers request handling is blazing fast! Our API response times dropped from 200ms to 20ms at the edge.', 'pro', 'positive', 'performance', 'low', '2026-01-12 11:30:00'),
('support', 'Need a way to bulk update Workers routes. Currently have to configure one by one in the dashboard.', 'enterprise', 'neutral', 'feature-request', 'medium', '2026-01-10 14:20:00'),
('twitter', 'Migrated from Lambda to Workers and our cold start issues disappeared completely. Game changer!', 'enterprise', 'positive', 'ux', 'low', '2026-01-14 10:00:00'),
('github', 'Workers CPU time limit of 50ms is too restrictive for image processing. Getting timeouts on every request.', 'pro', 'negative', 'performance', 'high', '2026-01-16 15:30:00'),
('support', 'Workers needs better integration with observability tools - native OpenTelemetry support would be amazing.', 'enterprise', 'neutral', 'feature-request', 'medium', '2026-01-11 09:45:00'),
('discord', 'Durable Objects binding from Workers made building real-time features trivial. WebSocket support is perfect!', 'pro', 'positive', 'ux', 'low', '2026-01-15 11:00:00'),
('github', 'Workers pricing is confusing. Hard to estimate costs before deploying with varying request volumes.', 'enterprise', 'negative', 'docs', 'high', '2026-01-13 14:15:00'),
('support', 'Workers experiencing random 500ms+ latency spikes during peak hours. Affecting our SLA.', 'enterprise', 'negative', 'performance', 'critical', '2026-01-17 07:30:00'),
('email', 'Workers cron triggers missing last scheduled run. No way to debug why it didn''t execute.', 'enterprise', 'negative', 'bug', 'high', '2026-01-16 10:20:00'),
('twitter', 'Workers reduced our infrastructure costs by 80%. No servers to manage, just code!', 'pro', 'positive', 'performance', 'low', '2026-01-12 13:45:00'),
('discord', 'Wrangler CLI is overwhelming for beginners. Too many commands, not enough guidance on which to use.', 'free', 'negative', 'ux', 'medium', '2026-01-10 16:00:00'),
('support', 'Workers Analytics Engine shows different request counts than the dashboard. Which one is correct?', 'pro', 'neutral', 'bug', 'medium', '2026-01-15 12:30:00'),
('github', 'Workers tail command is powerful but the log format is hard to parse. Need structured JSON output option.', 'enterprise', 'neutral', 'feature-request', 'medium', '2026-01-14 09:00:00'),
('twitter', 'Finally, a serverless platform that actually scales globally without configuration. Workers just work!', 'free', 'positive', 'ux', 'low', '2026-01-11 15:20:00'),
('discord', 'Workers automatic global deployment saved us weeks of infrastructure work. Deploy once, run everywhere!', 'pro', 'positive', 'performance', 'low', '2026-01-13 10:45:00'),
('support', 'Workers dashboard is slow to load when you have 100+ Workers. Takes 10 seconds to render the list.', 'enterprise', 'negative', 'performance', 'high', '2026-01-16 14:00:00'),
('github', 'Workers needs better TypeScript types for bindings. Currently getting lots of "any" types that break IntelliSense.', 'pro', 'negative', 'docs', 'medium', '2026-01-12 08:30:00'),
('twitter', 'Workers Smart Placement is incredible! 30% latency reduction by automatically routing to optimal location.', 'free', 'positive', 'performance', 'low', '2026-01-10 12:00:00'),
('support', 'Workers bundle size limit of 1MB is too small for our use case. Need to support larger dependencies.', 'pro', 'negative', 'bug', 'medium', '2026-01-15 16:45:00'),
('github', 'Wrangler requires Node 20+ but our CI/CD is on Node 18. Breaking change with no migration guide.', 'enterprise', 'negative', 'bug', 'critical', '2026-01-17 10:00:00'),
('discord', 'Wrangler dev mode with live reload is amazing! Changed my whole development workflow.', 'free', 'positive', 'ux', 'low', '2026-01-14 13:30:00'),
('support', 'wrangler tail command times out after 30 seconds. Need longer session for debugging production issues.', 'pro', 'negative', 'bug', 'medium', '2026-01-13 11:15:00'),
('email', 'Workers secret management is confusing. Not clear when to use environment variables vs secrets.', 'pro', 'negative', 'docs', 'high', '2026-01-16 09:30:00'),
('twitter', 'The Workers playground is perfect for quick testing and sharing examples. Love the instant preview!', 'free', 'positive', 'ux', 'low', '2026-01-12 14:45:00'),
('github', 'Workers mobile debugging is impossible. No way to see logs or errors from mobile devices.', 'enterprise', 'negative', 'ux', 'medium', '2026-01-11 10:20:00'),
('support', 'Workers blocking legitimate bot traffic. User-Agent filtering is too aggressive.', 'enterprise', 'negative', 'bug', 'critical', '2026-01-17 08:45:00'),
('discord', 'Workers handled our Black Friday traffic spike (10x normal) without any configuration. Impressed!', 'pro', 'positive', 'ux', 'low', '2026-01-13 16:00:00'),
('email', 'Unexpected $2000 bill for Workers CPU time. Need better cost estimates and alerts before deploying.', 'enterprise', 'negative', 'bug', 'critical', '2026-01-15 07:30:00'),
('twitter', 'Workers free tier is incredibly generous. Running my personal projects at zero cost!', 'free', 'positive', 'ux', 'low', '2026-01-10 11:45:00'),
('github', 'Workers API rate limits are too restrictive for our CI/CD pipeline. Need higher limits for automation.', 'enterprise', 'negative', 'bug', 'high', '2026-01-14 15:20:00'),
('discord', 'Workers API documentation is excellent. Clear examples, good error messages. A+ developer experience.', 'pro', 'positive', 'docs', 'low', '2026-01-12 09:30:00'),
('discord', 'Workers AI binding makes adding AI to apps trivial. Built semantic search in an afternoon!', 'pro', 'positive', 'ux', 'low', '2026-01-16 11:15:00'),
('github', 'Workers need support for larger response bodies. 100MB limit is too small for our file download use case.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-15 14:30:00'),
('support', 'Workers Queue binding documentation doesn''t explain retry logic clearly. Had to test to figure it out.', 'pro', 'negative', 'docs', 'medium', '2026-01-13 12:45:00'),
('twitter', 'Workers Queue consumer pattern solved our background job processing perfectly. Simple and reliable!', 'enterprise', 'positive', 'ux', 'low', '2026-01-11 13:20:00'),
('discord', 'Workers for Platforms is a hidden gem! Multi-tenant architecture made incredibly simple.', 'free', 'positive', 'ux', 'low', '2026-01-14 10:30:00'),
('github', 'Workers custom domain setup is way easier than Lambda + API Gateway. Just works!', 'pro', 'positive', 'ux', 'low', '2026-01-12 15:45:00'),
('support', 'Workers returning 524 timeout errors in Safari. Works fine in Chrome and Firefox.', 'free', 'negative', 'bug', 'high', '2026-01-16 13:15:00'),
('email', 'Workers getting started guide was confusing. Jumped between too many docs pages to deploy first Worker.', 'free', 'negative', 'docs', 'medium', '2026-01-10 14:00:00'),
('twitter', 'From zero to deployed Worker in 10 minutes following the quickstart. Incredibly smooth experience!', 'free', 'positive', 'ux', 'low', '2026-01-13 08:45:00'),
('support', 'Workers enterprise support is great but need more examples of production best practices and patterns.', 'enterprise', 'neutral', 'docs', 'medium', '2026-01-15 09:00:00'),
('github', 'Workers hitting CPU limits with simple JSON parsing on large payloads (>1MB). Need higher limits.', 'enterprise', 'negative', 'bug', 'critical', '2026-01-17 11:30:00'),
('discord', 'Just discovered Workers streaming responses. This is exactly what we needed for SSE!', 'free', 'positive', 'ux', 'low', '2026-01-17 09:45:00'),
('twitter', 'Workers D1 binding integration is seamless. SQL at the edge with zero connection overhead!', 'pro', 'positive', 'performance', 'low', '2026-01-16 17:20:00'),
('support', 'Need a staging environment feature for Workers. Currently duplicating everything manually across accounts.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-17 06:45:00'),
('email', 'Workers R2 binding makes object storage trivial. No connection pooling or credential rotation needed!', 'pro', 'positive', 'performance', 'low', '2026-01-15 15:30:00'),
('github', 'Workers need access to more AI models. Current selection is too limited for production use cases.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-14 12:00:00'),
('discord', 'The new wrangler --experimental-local mode is awesome for quick local testing!', 'free', 'positive', 'ux', 'low', '2026-01-13 14:45:00'),
('support', 'Workers experiencing memory pressure at just 128MB usage. Getting killed before hitting the limit.', 'enterprise', 'negative', 'performance', 'critical', '2026-01-17 10:15:00'),
('twitter', 'Workers simplified our architecture. Replaced 5 different services with a single Worker script.', 'pro', 'positive', 'ux', 'low', '2026-01-11 16:30:00'),
('email', 'Workers dashboard analytics graphs don''t load on older Safari versions. Blank screen.', 'free', 'negative', 'bug', 'medium', '2026-01-10 13:45:00'),
('github', 'Workers deployment rollback feature would be amazing. Currently have to redeploy old code manually.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-15 11:30:00'),
('discord', 'Workers for Platforms makes building multi-tenant SaaS so much easier! Customer isolation built-in.', 'enterprise', 'positive', 'ux', 'low', '2026-01-14 08:15:00'),
('support', 'Workers testing documentation is missing. How do we write unit tests for Workers with bindings?', 'enterprise', 'negative', 'docs', 'high', '2026-01-16 07:45:00'),
('twitter', 'Workers request context object is well-designed. Easy to access headers, params, and bindings!', 'pro', 'positive', 'ux', 'low', '2026-01-13 17:20:00'),
('github', 'Workers Trace Events would help debug production issues. Need better observability and tracing.', 'enterprise', 'neutral', 'feature-request', 'medium', '2026-01-12 16:00:00'),
('email', 'Workers version management is lacking. Can''t easily rollback or compare deployed versions.', 'pro', 'neutral', 'feature-request', 'medium', '2026-01-11 12:30:00'),
('discord', 'The Workers developer community on Discord is incredibly helpful. Got my issue solved in minutes!', 'free', 'positive', 'ux', 'low', '2026-01-10 15:45:00'),
('support', 'Need Terraform provider updates for Workers. Current version missing new binding types.', 'enterprise', 'neutral', 'feature-request', 'high', '2026-01-14 11:00:00'),
('github', 'Workers logging could be better. Hard to correlate logs across distributed executions globally.', 'pro', 'negative', 'ux', 'medium', '2026-01-13 10:15:00');

-- Insert a sample daily summary
INSERT INTO daily_summaries (summary_date, content, slack_message, stats) VALUES
('2026-01-16',
'Daily Feedback Analysis - Cloudflare Workers:

📊 Volume: 15 items (up 20% from previous day)

🔴 Top Critical Issues:
1. CPU Time Limits - Multiple reports of Workers hitting 50ms limit during processing
2. Cold Start Performance - 200-300ms delays affecting user experience
3. Billing Surprises - Unexpected charges causing friction with enterprise customers

⚠️ High Priority Themes:
- Performance concerns: cold starts, CPU limits, memory pressure
- Documentation gaps: testing, secrets management, environment variables
- Wrangler Node 20 requirement breaking CI/CD pipelines

😊 Positive Sentiment (65%):
- Workers AI binding integration receiving high praise
- Fast deployment and global distribution appreciated
- Service bindings and D1 integration highly valued

📌 Recommended Actions:
1. Investigate cold start performance - appears systemic across regions
2. Create migration guide for Wrangler Node 20 upgrade
3. Add cost estimation tool before Worker deployment
4. Improve Workers testing and debugging documentation',
'{"blocks":[{"type":"header","text":{"type":"plain_text","text":"Daily Feedback Summary - 2026-01-16"}},{"type":"section","fields":[{"type":"mrkdwn","text":"*Total Feedback:*\n15 items"},{"type":"mrkdwn","text":"*Critical Issues:*\n3 items"},{"type":"mrkdwn","text":"*Sentiment:*\n10 positive, 5 negative"},{"type":"mrkdwn","text":"*High Priority:*\n8 items"}]}]}',
'{"total":15,"positive":10,"negative":5,"critical":3,"high":8}'
);
