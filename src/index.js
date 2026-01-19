/**
 * Feedback Intelligence API Worker
 * Handles dashboard stats, AI chat agent, and feedback queries
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS headers for cross-origin requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route requests
      if (url.pathname === '/api/stats') {
        return handleStats(env, corsHeaders, url);
      }

      if (url.pathname === '/api/chat' && request.method === 'POST') {
        return handleChat(request, env, corsHeaders);
      }

      if (url.pathname === '/api/feedback') {
        return handleFeedback(env, corsHeaders, url);
      }

      if (url.pathname === '/api/summary/latest') {
        return handleLatestSummary(env, corsHeaders);
      }

      if (url.pathname === '/api/summary/generate') {
        return handleGenerateSummary(env, corsHeaders);
      }

      // Default response
      return new Response(JSON.stringify({
        message: 'Feedback Intelligence API',
        endpoints: [
          'GET /api/stats',
          'POST /api/chat',
          'GET /api/feedback',
          'GET /api/summary/latest',
          'POST /api/summary/generate'
        ]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: error.message,
        stack: error.stack
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  // Scheduled worker for daily summaries
  async scheduled(event, env, ctx) {
    try {
      await generateDailySummary(env);
      console.log('Daily summary generated successfully');
    } catch (error) {
      console.error('Failed to generate daily summary:', error);
    }
  }
};

/**
 * GET /api/stats
 * Returns dashboard statistics
 */
async function handleStats(env, corsHeaders, url) {
  // Get date range from query parameters or use defaults
  const startDateParam = url?.searchParams?.get('startDate');
  const endDateParam = url?.searchParams?.get('endDate');

  const now = new Date();
  let startDate, endDate;

  if (startDateParam && endDateParam) {
    // Use custom date range
    startDate = new Date(startDateParam).toISOString();
    endDate = new Date(endDateParam + 'T23:59:59').toISOString(); // End of day
  } else {
    // Default to last 7 days
    startDate = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
    endDate = now.toISOString();
  }

  // Get total counts for selected date range
  const totalDateRange = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM feedback WHERE created_at >= ? AND created_at <= ?'
  ).bind(startDate, endDate).first();

  // Keep 30 day total for comparison (optional)
  const last30Days = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
  const total30Days = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM feedback WHERE created_at > ?'
  ).bind(last30Days).first();

  // Sentiment breakdown
  const sentimentBreakdown = await env.DB.prepare(
    `SELECT sentiment, COUNT(*) as count
     FROM feedback
     WHERE created_at >= ? AND created_at <= ?
     GROUP BY sentiment`
  ).bind(startDate, endDate).all();

  // Top categories
  const topCategories = await env.DB.prepare(
    `SELECT category, COUNT(*) as count
     FROM feedback
     WHERE created_at >= ? AND created_at <= ?
     GROUP BY category
     ORDER BY count DESC
     LIMIT 5`
  ).bind(startDate, endDate).all();

  // Feedback by source
  const bySource = await env.DB.prepare(
    `SELECT source, COUNT(*) as count
     FROM feedback
     WHERE created_at >= ? AND created_at <= ?
     GROUP BY source
     ORDER BY count DESC`
  ).bind(startDate, endDate).all();

  // Priority breakdown
  const byPriority = await env.DB.prepare(
    `SELECT priority, COUNT(*) as count
     FROM feedback
     WHERE created_at >= ? AND created_at <= ?
     AND priority IS NOT NULL
     GROUP BY priority
     ORDER BY
       CASE priority
         WHEN 'critical' THEN 1
         WHEN 'high' THEN 2
         WHEN 'medium' THEN 3
         WHEN 'low' THEN 4
       END`
  ).bind(startDate, endDate).all();

  // Trends over time
  const trends = await env.DB.prepare(
    `SELECT DATE(created_at) as date, COUNT(*) as count
     FROM feedback
     WHERE created_at >= ? AND created_at <= ?
     GROUP BY DATE(created_at)
     ORDER BY date ASC`
  ).bind(startDate, endDate).all();

  // Top issues (high priority items with most mentions)
  const topIssues = await env.DB.prepare(
    `SELECT category, priority, COUNT(*) as count,
            GROUP_CONCAT(SUBSTR(content, 1, 100), ' | ') as examples
     FROM feedback
     WHERE created_at >= ? AND created_at <= ? AND (priority = 'critical' OR priority = 'high')
     GROUP BY category, priority
     ORDER BY count DESC
     LIMIT 5`
  ).bind(startDate, endDate).all();

  const stats = {
    overview: {
      total_7days: totalDateRange?.count || 0,
      total_30days: total30Days?.count || 0,
    },
    dateRange: {
      startDate: startDateParam || 'last 7 days',
      endDate: endDateParam || 'now'
    },
    sentiment: sentimentBreakdown.results.reduce((acc, row) => {
      acc[row.sentiment] = row.count;
      return acc;
    }, {}),
    categories: topCategories.results,
    sources: bySource.results,
    priorities: byPriority.results,
    trends: trends.results,
    topIssues: topIssues.results
  };

  return new Response(JSON.stringify(stats), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

/**
 * POST /api/chat
 * AI-powered conversational agent
 */
async function handleChat(request, env, corsHeaders) {
  const { message, history = [] } = await request.json();

  if (!message) {
    return new Response(JSON.stringify({ error: 'Message is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // System prompt that explains the available data
  const systemPrompt = `You are an AI assistant helping Product Managers analyze customer feedback for Cloudflare products.

You have access to a database of customer feedback from multiple sources (GitHub, Discord, Support Tickets, Twitter, Email) about Cloudflare products including Workers, D1, Pages, KV, R2, Durable Objects, CDN, Analytics, Images, Stream, DNS, Wrangler, Dashboard, WAF, Vectorize, Queues, Turnstile, and more.

Each feedback item contains:
- source: where it came from (github, discord, support, twitter, email)
- content: the actual feedback text
- sentiment: positive, negative, or neutral
- category: bug, feature-request, performance, ux, docs
- priority: critical, high, medium, low
- user_type: enterprise, pro, free
- created_at: timestamp

When answering questions:
1. Be specific and data-driven
2. Cite actual feedback examples when relevant
3. Identify patterns and trends
4. Prioritize critical/high priority items
5. Segment by user type when relevant (enterprise vs free tier)
6. Provide actionable insights

Available time ranges: "last 24 hours", "this week" (7 days), "this month" (30 days)

Answer questions naturally while providing concrete examples from the feedback data.`;

  try {
    // Step 1: Use AI to understand the query and determine what data to fetch
    const queryAnalysis = await analyzeQuery(env, message, systemPrompt);

    // Step 2: Fetch relevant data based on AI's understanding
    const relevantData = await fetchRelevantFeedback(env, queryAnalysis, message);

    // Step 3: Generate final response with the actual data
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-6), // Keep last 3 exchanges for context
      { role: 'user', content: message },
      {
        role: 'system',
        content: `Here is the relevant feedback data:\n\n${JSON.stringify(relevantData, null, 2)}\n\nPlease provide a helpful, insightful response based on this data. Include specific examples and statistics.`
      }
    ];

    const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: messages
    });

    return new Response(JSON.stringify({
      response: response.response,
      dataPoints: relevantData.summary
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to process chat message',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Analyze user query to determine what data to fetch
 */
async function analyzeQuery(env, message, systemPrompt) {
  const analysisPrompt = `Based on this user question: "${message}"

What data should I query from the feedback database? Respond with a JSON object containing:
{
  "timeframe": "7days" or "30days" or "24hours",
  "sentiment": null or "positive" or "negative" or "neutral",
  "category": null or "bug" or "feature-request" or "performance" or "ux" or "docs",
  "priority": null or "critical" or "high" or "medium" or "low",
  "user_type": null or "enterprise" or "pro" or "free",
  "source": null or "github" or "discord" or "support" or "twitter" or "email",
  "keywords": ["array", "of", "relevant", "keywords"],
  "needsAggregation": true or false,
  "needsExamples": true or false
}

Only respond with the JSON object, nothing else.`;

  try {
    const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: analysisPrompt }
      ]
    });

    // Parse AI response to extract JSON
    const jsonMatch = response.response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Fallback to default query
    return {
      timeframe: '7days',
      needsAggregation: true,
      needsExamples: true,
      keywords: []
    };
  } catch (error) {
    console.error('Query analysis error:', error);
    return {
      timeframe: '7days',
      needsAggregation: true,
      needsExamples: true,
      keywords: []
    };
  }
}

/**
 * Fetch relevant feedback based on query analysis
 */
async function fetchRelevantFeedback(env, analysis, originalQuery) {
  // Determine timeframe
  const now = new Date();
  let timeframeDate;
  if (analysis.timeframe === '24hours') {
    timeframeDate = new Date(now - 24 * 60 * 60 * 1000);
  } else if (analysis.timeframe === '30days') {
    timeframeDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
  } else {
    timeframeDate = new Date(now - 7 * 24 * 60 * 60 * 1000); // default 7 days
  }

  // Build SQL query
  let sql = 'SELECT * FROM feedback WHERE created_at > ?';
  const bindings = [timeframeDate.toISOString()];

  if (analysis.sentiment) {
    sql += ' AND sentiment = ?';
    bindings.push(analysis.sentiment);
  }

  if (analysis.category) {
    sql += ' AND category = ?';
    bindings.push(analysis.category);
  }

  if (analysis.priority) {
    sql += ' AND priority = ?';
    bindings.push(analysis.priority);
  }

  if (analysis.user_type) {
    sql += ' AND user_type = ?';
    bindings.push(analysis.user_type);
  }

  if (analysis.source) {
    sql += ' AND source = ?';
    bindings.push(analysis.source);
  }

  // Add keyword filtering if specified
  if (analysis.keywords && analysis.keywords.length > 0) {
    const keywordConditions = analysis.keywords.map(() => 'content LIKE ?').join(' OR ');
    sql += ` AND (${keywordConditions})`;
    analysis.keywords.forEach(keyword => {
      bindings.push(`%${keyword}%`);
    });
  }

  sql += ' ORDER BY created_at DESC LIMIT 50';

  // Execute query
  let stmt = env.DB.prepare(sql);
  for (const binding of bindings) {
    stmt = stmt.bind(binding);
  }
  const results = await stmt.all();

  // Get aggregated statistics
  let aggregations = {};
  if (analysis.needsAggregation) {
    const statsSQL = `
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN sentiment = 'positive' THEN 1 ELSE 0 END) as positive,
        SUM(CASE WHEN sentiment = 'negative' THEN 1 ELSE 0 END) as negative,
        SUM(CASE WHEN sentiment = 'neutral' THEN 1 ELSE 0 END) as neutral,
        SUM(CASE WHEN priority = 'critical' THEN 1 ELSE 0 END) as critical,
        SUM(CASE WHEN priority = 'high' THEN 1 ELSE 0 END) as high
      FROM feedback
      WHERE created_at > ?
    `;

    const statsResult = await env.DB.prepare(statsSQL).bind(timeframeDate.toISOString()).first();
    aggregations = statsResult;
  }

  return {
    items: analysis.needsExamples ? results.results.slice(0, 10) : [],
    count: results.results.length,
    summary: {
      total: results.results.length,
      ...aggregations
    }
  };
}

/**
 * GET /api/feedback
 * Returns recent feedback with optional filtering
 */
async function handleFeedback(env, corsHeaders, url) {
  const limit = url.searchParams.get('limit') || 20;
  const source = url.searchParams.get('source');
  const category = url.searchParams.get('category');
  const sentiment = url.searchParams.get('sentiment');

  let sql = 'SELECT * FROM feedback WHERE 1=1';
  const bindings = [];

  if (source) {
    sql += ' AND source = ?';
    bindings.push(source);
  }

  if (category) {
    sql += ' AND category = ?';
    bindings.push(category);
  }

  if (sentiment) {
    sql += ' AND sentiment = ?';
    bindings.push(sentiment);
  }

  sql += ' ORDER BY created_at DESC LIMIT ?';
  bindings.push(parseInt(limit));

  let stmt = env.DB.prepare(sql);
  for (const binding of bindings) {
    stmt = stmt.bind(binding);
  }

  const results = await stmt.all();

  return new Response(JSON.stringify({
    feedback: results.results,
    count: results.results.length
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

/**
 * GET /api/summary/latest
 * Returns the most recent daily summary
 */
async function handleLatestSummary(env, corsHeaders) {
  const summary = await env.DB.prepare(
    'SELECT * FROM daily_summaries ORDER BY summary_date DESC LIMIT 1'
  ).first();

  if (!summary) {
    return new Response(JSON.stringify({
      message: 'No summaries available yet. Generate one using POST /api/summary/generate'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({
    summary: summary.content,
    date: summary.summary_date,
    slackMessage: summary.slack_message ? JSON.parse(summary.slack_message) : null,
    stats: summary.stats ? JSON.parse(summary.stats) : null
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

/**
 * POST /api/summary/generate
 * Manually trigger daily summary generation
 */
async function handleGenerateSummary(env, corsHeaders) {
  try {
    await generateDailySummary(env);
    return new Response(JSON.stringify({
      message: 'Daily summary generated successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to generate summary',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Generate daily summary using AI
 */
async function generateDailySummary(env) {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // Check if summary already exists for today
  const existing = await env.DB.prepare(
    'SELECT id FROM daily_summaries WHERE summary_date = ?'
  ).bind(yesterdayStr).first();

  if (existing) {
    console.log('Summary already exists for', yesterdayStr);
    return;
  }

  // Get last 24 hours of feedback
  const feedback = await env.DB.prepare(
    'SELECT * FROM feedback WHERE created_at > ? ORDER BY created_at DESC'
  ).bind(yesterday.toISOString()).all();

  // Get statistics
  const stats = await env.DB.prepare(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN sentiment = 'positive' THEN 1 ELSE 0 END) as positive,
      SUM(CASE WHEN sentiment = 'negative' THEN 1 ELSE 0 END) as negative,
      SUM(CASE WHEN priority = 'critical' THEN 1 ELSE 0 END) as critical,
      SUM(CASE WHEN priority = 'high' THEN 1 ELSE 0 END) as high
    FROM feedback
    WHERE created_at > ?
  `).bind(yesterday.toISOString()).first();

  // Generate AI summary
  const summaryPrompt = `Analyze this customer feedback from the last 24 hours and create a concise daily summary for the Product Management team.

Feedback items (${feedback.results.length} total):
${JSON.stringify(feedback.results, null, 2)}

Statistics:
- Total feedback: ${stats.total}
- Positive: ${stats.positive}
- Negative: ${stats.negative}
- Critical priority: ${stats.critical}
- High priority: ${stats.high}

Create a summary that includes:
1. Total volume and comparison to average (estimate if needed)
2. Top 3-4 themes or issues mentioned
3. Any critical or urgent items that need immediate attention
4. Sentiment trends and notable patterns
5. 1-2 recommended actions for the PM team

Be concise but specific. Use bullet points. Mention specific products when relevant.`;

  const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
    messages: [
      { role: 'system', content: 'You are a product analytics assistant creating daily summaries for PMs.' },
      { role: 'user', content: summaryPrompt }
    ]
  });

  const summaryContent = aiResponse.response;

  // Format as Slack message
  const slackMessage = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `Daily Feedback Summary - ${yesterdayStr}`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Total Feedback:*\n${stats.total} items`
          },
          {
            type: 'mrkdwn',
            text: `*Critical Issues:*\n${stats.critical} items`
          },
          {
            type: 'mrkdwn',
            text: `*Sentiment:*\n${stats.positive} positive, ${stats.negative} negative`
          },
          {
            type: 'mrkdwn',
            text: `*High Priority:*\n${stats.high} items`
          }
        ]
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: summaryContent
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View Dashboard'
            },
            url: 'https://feedback-intelligence.pages.dev'
          }
        ]
      }
    ]
  };

  // Store summary
  await env.DB.prepare(
    'INSERT INTO daily_summaries (summary_date, content, slack_message, stats) VALUES (?, ?, ?, ?)'
  ).bind(
    yesterdayStr,
    summaryContent,
    JSON.stringify(slackMessage),
    JSON.stringify(stats)
  ).run();

  console.log('Daily summary generated for', yesterdayStr);
  console.log('Simulated Slack message:', JSON.stringify(slackMessage, null, 2));
}
