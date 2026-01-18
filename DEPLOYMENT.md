# Deployment Guide

## Quick Start (After Node 20+ is installed)

```bash
# 1. Install dependencies
npm install

# 2. Create D1 database
npx wrangler d1 create feedback-db

# 3. Update wrangler.toml with database_id from step 2

# 4. Run migrations
npx wrangler d1 execute feedback-db --file=schema.sql

# 5. Seed data
npx wrangler d1 execute feedback-db --file=seed.sql

# 6. Deploy Worker
npx wrangler deploy

# 7. Update public/app.js with your Worker URL

# 8. Deploy Pages
npx wrangler pages deploy public --project-name=feedback-intelligence
```

## Detailed Step-by-Step

### Prerequisites

1. **Node.js 20+** (REQUIRED)
   ```bash
   node --version  # Must show v20.0.0 or higher
   ```

2. **Cloudflare Account**
   - Sign up at https://dash.cloudflare.com/sign-up

3. **Wrangler Authentication**
   ```bash
   npx wrangler login
   ```

### Step 1: Create D1 Database

Run the following command:

```bash
npx wrangler d1 create feedback-db
```

You'll see output like:

```
✅ Successfully created DB 'feedback-db'

[[d1_databases]]
binding = "DB"
database_name = "feedback-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Copy the `database_id`** and update it in `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "feedback-db"
database_id = "YOUR-ACTUAL-DATABASE-ID-HERE"  # Replace this
```

### Step 2: Initialize Database Schema

```bash
npx wrangler d1 execute feedback-db --file=schema.sql
```

Expected output:
```
🌀 Executing on feedback-db (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx):
🌀 To execute on your remote database, add a --remote flag to your wrangler command.
✅ Executed successfully!
```

Verify tables were created:

```bash
npx wrangler d1 execute feedback-db --command "SELECT name FROM sqlite_master WHERE type='table'"
```

You should see: `feedback`, `daily_summaries`, `chat_history`

### Step 3: Seed Mock Data

```bash
npx wrangler d1 execute feedback-db --file=seed.sql
```

Verify data was inserted:

```bash
npx wrangler d1 execute feedback-db --command "SELECT COUNT(*) as count FROM feedback"
```

Should show ~75 items.

### Step 4: Deploy the Worker

```bash
npx wrangler deploy
```

Expected output:
```
Total Upload: XX.XX KiB / gzip: XX.XX KiB
Uploaded feedback-intelligence (X.XX sec)
Published feedback-intelligence (X.XX sec)
  https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev
```

**Save this URL!** You'll need it for the frontend.

### Step 5: Test the Worker API

Test the stats endpoint:

```bash
curl https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev/api/stats
```

You should see JSON with statistics about the feedback.

Test the chat endpoint:

```bash
curl -X POST https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the top issues this week?"}'
```

### Step 6: Configure Frontend

Edit `public/app.js` and update the API endpoint:

```javascript
const API_BASE = 'https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev';
```

Replace `YOUR-SUBDOMAIN` with your actual Worker URL.

### Step 7: Deploy to Pages

```bash
npx wrangler pages deploy public --project-name=feedback-intelligence
```

Expected output:
```
✨ Success! Uploaded X files (X.XX sec)

✨ Deployment complete! Take a peek over at
   https://xxxxxxxx.feedback-intelligence.pages.dev
```

On subsequent deployments, you can omit the `--project-name`:

```bash
npx wrangler pages deploy public
```

### Step 8: Verify Everything Works

1. **Visit your Pages URL**
   - Check that dashboard loads
   - Verify stats are displayed
   - Ensure charts render

2. **Test the AI Chat**
   - Ask: "What are the top 3 issues?"
   - Ask: "Show me critical bugs"
   - Verify responses are contextual

3. **Generate a Summary**
   - Click "Generate New Summary"
   - Wait for completion
   - Check that summary appears

4. **Check Daily Summary (Optional)**
   ```bash
   curl https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev/api/summary/latest
   ```

## Troubleshooting

### "Module not found" errors

Make sure all files are in the correct locations:
```
src/index.js          ✓
public/index.html     ✓
public/app.js         ✓
public/styles.css     ✓
```

### "Database not found"

1. Verify D1 database exists:
   ```bash
   npx wrangler d1 list
   ```

2. Check that `database_id` in `wrangler.toml` matches

3. Make sure you're not using `--local` flag (unless testing locally)

### "Workers AI not available"

Workers AI is available on:
- Free plan (limited)
- Paid Workers plans (higher limits)

Check your plan at https://dash.cloudflare.com

### CORS errors in frontend

If you see CORS errors in browser console:

1. Verify the Worker is deployed (not just running locally)
2. Check that `API_BASE` in `app.js` is correct
3. Ensure Worker includes CORS headers (already configured in `src/index.js`)

### Slow initial load

First visit after deployment may be slow due to:
- D1 cold start
- Workers cold start
- Workers AI model loading

Subsequent requests should be fast (<100ms for most endpoints).

## Production Checklist

Before submitting or going live:

- [ ] Worker deployed successfully
- [ ] Pages deployed successfully
- [ ] API_BASE updated in frontend
- [ ] All API endpoints tested
- [ ] AI chat returns valid responses
- [ ] Dashboard displays correct stats
- [ ] Charts render properly
- [ ] Daily summary can be generated
- [ ] No console errors in browser
- [ ] Mobile responsive (test on phone)

## URLs to Submit

After deployment, you'll have:

1. **Worker API**: `https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev`
2. **Pages Dashboard**: `https://feedback-intelligence.pages.dev` or `https://HASH.feedback-intelligence.pages.dev`
3. **GitHub Repository**: Your repo URL

Include all three in your assignment submission.

## Updating After Deployment

To update the Worker:
```bash
npx wrangler deploy
```

To update the frontend:
```bash
npx wrangler pages deploy public
```

To update database schema (be careful - may lose data):
```bash
npx wrangler d1 execute feedback-db --file=schema.sql
```

## Cost Estimate

On Cloudflare Free Plan:
- Workers: Free (up to 100k requests/day)
- Pages: Free (unlimited requests)
- D1: Free (5GB storage, 5M reads/day)
- Workers AI: Free (limited requests/day)

This project should run entirely within free tier limits for demo purposes.

## Local Development

To run locally:

```bash
npx wrangler dev
```

Note: You'll need to update `public/app.js` to use `http://localhost:8787` as API_BASE for local testing.

## Support

If you encounter issues:

1. Check Wrangler logs:
   ```bash
   npx wrangler tail
   ```

2. Check Pages deployment logs in dashboard

3. Review browser console for frontend errors

4. Refer to Cloudflare Docs: https://developers.cloudflare.com
