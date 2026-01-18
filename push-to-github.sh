#!/bin/bash

# Script to push Feedback Intelligence project to GitHub
# Repository: https://github.com/riyayadavrepo/CloudPulse.git

echo "🚀 Pushing CloudPulse to GitHub..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "Adding files..."
git add .

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "Creating .gitignore..."
    cat > .gitignore << 'EOF'
node_modules/
.wrangler/
.dev.vars
.env
dist/
*.log
.DS_Store
EOF
    git add .gitignore
fi

# Commit
echo "Creating commit..."
git commit -m "Initial commit: CloudPulse - AI-powered Feedback Intelligence Agent

- Built with Cloudflare Workers, Pages, D1, and Workers AI
- Hybrid dashboard with conversational AI chat agent
- 75+ realistic Cloudflare product feedback items
- Automated daily summaries with Slack integration
- Complete documentation and deployment guides

Cloudflare Products Used:
✅ Workers (API + Scheduled Tasks)
✅ Pages (Frontend Hosting)
✅ D1 (SQL Database)
✅ Workers AI (LLM Agent)
✅ Cron Triggers (Automation)"

# Add remote if not already added
if ! git remote | grep -q "origin"; then
    echo "Adding remote origin..."
    git remote add origin https://github.com/riyayadavrepo/CloudPulse.git
fi

# Push to GitHub
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo "Repository: https://github.com/riyayadavrepo/CloudPulse"
