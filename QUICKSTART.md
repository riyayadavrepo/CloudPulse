# Quick Start Guide

## Prerequisites

```bash
# 1. Install Node 20+
node --version  # Must be >= 20.0.0

# If needed, upgrade:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# 2. Login to Cloudflare
cd feedback-intelligence
npm install
npx wrangler login
```

## Deploy in 5 Steps

### Step 1: Create D1 Database
```bash
npx wrangler d1 create feedback-db
```

**Copy the `database_id` from output** and update `wrangler.toml`:
```toml
database_id = "YOUR-DATABASE-ID-HERE"
```

### Step 2: Setup Database
```bash
# Run migrations
npx wrangler d1 execute feedback-db --file=schema.sql

# Seed data
npx wrangler d1 execute feedback-db --file=seed.sql

# Verify (should show ~75)
npx wrangler d1 execute feedback-db --command "SELECT COUNT(*) FROM feedback"
```

### Step 3: Deploy Worker
```bash
npx wrangler deploy
```

**Copy your Worker URL** from output (e.g., `https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev`)

### Step 4: Update Frontend
Edit `public/app.js` line 2:
```javascript
const API_BASE = 'https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev';
```

### Step 5: Deploy Pages
```bash
npx wrangler pages deploy public --project-name=feedback-intelligence
```

**Copy your Pages URL** from output.

## Test Your Deployment

### 1. Test Worker API
```bash
# Test stats endpoint
curl https://YOUR-WORKER-URL.workers.dev/api/stats

# Test chat endpoint
curl -X POST https://YOUR-WORKER-URL.workers.dev/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the top issues?"}'
```

### 2. Test Dashboard
Visit your Pages URL and verify:
- [ ] Stats cards show numbers
- [ ] Charts render
- [ ] Chat responds to questions
- [ ] Daily summary section loads

### 3. Generate Summary
Click "Generate New Summary" button or:
```bash
curl -X POST https://YOUR-WORKER-URL.workers.dev/api/summary/generate
```

## Common Commands

```bash
# Local development
npx wrangler dev

# View live logs
npx wrangler tail

# List D1 databases
npx wrangler d1 list

# Query D1 directly
npx wrangler d1 execute feedback-db --command "SELECT * FROM feedback LIMIT 5"

# Redeploy Worker
npx wrangler deploy

# Redeploy Pages
npx wrangler pages deploy public
```

## URLs for Submission

After deployment, you'll have:
- **Worker API**: https://feedback-intelligence.YOUR-SUBDOMAIN.workers.dev
- **Pages Dashboard**: https://feedback-intelligence.pages.dev
- **GitHub Repo**: Your repository URL

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Node version too old" | Install Node 20+ (see Prerequisites) |
| "Database not found" | Check database_id in wrangler.toml |
| "Workers AI error" | Verify account has Workers AI enabled |
| "CORS error" | Update API_BASE in public/app.js |
| Dashboard blank | Check browser console for errors |

## Next: Document Friction

As you deploy, note any friction points in `FRICTION_LOG_TEMPLATE.md`:
- Setup issues
- Confusing docs
- Unclear errors
- UI/UX problems
- Missing features

This is equally important as the prototype!

## Help

- Full guide: `DEPLOYMENT.md`
- Architecture: `ARCHITECTURE.md`
- README: `README.md`
- Cloudflare Docs: https://developers.cloudflare.com
