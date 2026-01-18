# CloudPulse - Feedback Intelligence Agent

An AI-powered feedback aggregation and analysis tool for Product Managers, built entirely on the Cloudflare Developer Platform.

> **Built for**: Cloudflare Product Manager Internship Assignment 2026
> **Repository**: https://github.com/riyayadavrepo/CloudPulse

## Overview

This tool helps PMs make sense of scattered customer feedback from multiple sources (GitHub, Discord, Support, Twitter, Email) by providing:

- **Real-time Dashboard**: Visual analytics showing feedback trends, sentiment, and top issues
- **AI Chat Agent**: Conversational interface to ask questions about feedback patterns
- **Automated Daily Summaries**: AI-generated summaries delivered to Slack (simulated)

## Architecture

```
Frontend (Cloudflare Pages)
    ↓
API Layer (Cloudflare Workers)
    ↓
├─ Workers AI (Conversational Agent + Analysis)
├─ D1 Database (Feedback Storage)
└─ Cron Triggers (Daily Summary Generation)
```

## Cloudflare Products Used

1. **Cloudflare Workers** - API backend and scheduled tasks
2. **Cloudflare Pages** - Static frontend hosting
3. **Cloudflare D1** - SQL database for feedback storage
4. **Workers AI** - LLM-powered conversational agent and insights
5. **Cron Triggers** - Automated daily summary generation

## Prerequisites

- Node.js >= 20.0.0 (required by Wrangler)
- Cloudflare account
- Wrangler CLI

## Setup Instructions

### 1. Install Dependencies

**IMPORTANT: This project requires Node.js 20 or higher.**

Check your Node version:
```bash
node --version
```

If you have an older version, upgrade using nvm:
```bash
# Install nvm if not already installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node 20
nvm install 20
nvm use 20
```

Install project dependencies:
```bash
npm install
```

### 2. Create D1 Database

```bash
npx wrangler d1 create feedback-db
```

This will output a database ID. Copy it and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "feedback-db"
database_id = "YOUR-DATABASE-ID-HERE"  # Replace with actual ID
```

### 3. Run Database Migrations

```bash
npx wrangler d1 execute feedback-db --file=schema.sql
```

### 4. Seed Mock Data

Insert the mock feedback data:

```bash
npx wrangler d1 execute feedback-db --file=seed.sql
```

Or use the command line to insert data from the seed file.

### 5. Deploy the Worker

```bash
npx wrangler deploy
```

This will output your Worker URL (e.g., `https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev`)

### 6. Update Frontend API Endpoint

Edit `public/app.js` and update the `API_BASE` constant with your Worker URL:

```javascript
const API_BASE = 'https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev';
```

### 7. Deploy Frontend to Pages

```bash
npx wrangler pages deploy public --project-name=feedback-intelligence
```

This will output your Pages URL (e.g., `https://feedback-intelligence.pages.dev`)

## Usage

### Dashboard

Visit your Pages URL to access the dashboard. You'll see:

- **Overview Stats**: Total feedback, sentiment breakdown, critical issues, trends
- **Visualizations**: Charts showing feedback trends and sentiment distribution
- **Top Issues**: Most reported high-priority problems
- **AI Chat Agent**: Ask questions about the feedback data
- **Daily Summary**: Latest AI-generated summary in Slack format

### AI Chat Examples

Try asking questions like:

- "What are the top 3 issues this week?"
- "Show me critical bugs from enterprise customers"
- "What's the sentiment around Workers AI?"
- "Are there performance complaints about D1?"
- "What feedback did we get about documentation?"
- "How many feature requests came from GitHub?"

### Generate Daily Summary

Click the "Generate New Summary" button or trigger via API:

```bash
curl -X POST https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev/api/summary/generate
```

The summary will be formatted as a Slack message and saved to the database.

### Scheduled Summaries

The worker is configured to automatically generate summaries daily at 9 AM UTC via cron trigger. Check `wrangler.toml`:

```toml
[triggers]
crons = ["0 9 * * *"]
```

## API Endpoints

- `GET /api/stats` - Dashboard statistics
- `POST /api/chat` - AI chat agent
  ```json
  {
    "message": "What are the top issues?",
    "history": []
  }
  ```
- `GET /api/feedback` - Recent feedback items
- `GET /api/summary/latest` - Latest daily summary
- `POST /api/summary/generate` - Trigger summary generation

## Development

Run locally:

```bash
npx wrangler dev
```

This starts a local development server. Note: You'll need to update the API_BASE in `app.js` to use `http://localhost:8787` for local development.

## Project Structure

```
feedback-intelligence/
├── src/
│   ├── index.js           # Main API worker with chat agent
│   └── seed-data.js       # Mock feedback data
├── public/                # Frontend files
│   ├── index.html         # Dashboard UI
│   ├── app.js             # Frontend JavaScript
│   └── styles.css         # Styling
├── schema.sql             # D1 database schema
├── wrangler.toml          # Cloudflare configuration
├── package.json           # Node dependencies
└── README.md              # This file
```

## Key Features

### 1. True Conversational AI

The chat agent doesn't use pattern matching - it actually understands natural language queries, determines what data to fetch from D1, and generates contextual responses.

### 2. Real-time Analytics

Dashboard displays live statistics aggregated from the D1 database with breakdown by:
- Sentiment (positive/negative/neutral)
- Category (bugs, features, performance, UX, docs)
- Priority (critical, high, medium, low)
- Source (GitHub, Discord, Support, Twitter, Email)
- User type (enterprise, pro, free)

### 3. Automated Insights

Daily summaries are generated using Workers AI to identify:
- Volume trends
- Top themes and issues
- Critical items needing attention
- Sentiment patterns
- Recommended PM actions

### 4. Mock Data Based on Real Cloudflare Products

The database contains 75+ realistic feedback items about:
- Workers, Pages, D1, KV, R2
- Durable Objects, Vectorize, Queues
- CDN, DNS, Analytics, Images
- Wrangler CLI, Dashboard UI
- Security, WAF, Turnstile

## Deployment Checklist

- [ ] Node 20+ installed
- [ ] D1 database created
- [ ] Database ID updated in `wrangler.toml`
- [ ] Schema migrated
- [ ] Mock data seeded
- [ ] Worker deployed
- [ ] Frontend API endpoint updated
- [ ] Pages deployed
- [ ] Test all endpoints
- [ ] Verify AI chat works
- [ ] Generate test summary

## Troubleshooting

**"Wrangler requires Node >= 20"**
- Upgrade Node using nvm (see Setup Instructions above)

**"Database not found"**
- Make sure you've created the D1 database and updated the ID in `wrangler.toml`

**"Workers AI error"**
- Ensure you're on a Cloudflare plan that supports Workers AI
- Check that the AI binding is correctly configured

**Frontend shows "Failed to load"**
- Verify the API_BASE URL in `app.js` matches your deployed Worker URL
- Check CORS headers are properly set in the Worker

**Chat doesn't respond**
- Check browser console for errors
- Verify Workers AI is available in your account
- Test the `/api/chat` endpoint directly with curl

## License

MIT

## Built For

Cloudflare Product Manager Internship Assignment - Building a feedback intelligence tool to help PMs aggregate and analyze scattered customer feedback.
