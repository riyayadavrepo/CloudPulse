-- Feedback items table
CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,           -- 'github', 'discord', 'support', 'twitter', 'email'
  content TEXT NOT NULL,
  user_type TEXT,                 -- 'enterprise', 'free', 'pro'
  sentiment TEXT,                 -- 'positive', 'negative', 'neutral'
  category TEXT,                  -- 'bug', 'feature-request', 'performance', 'ux', 'docs'
  priority TEXT,                  -- 'critical', 'high', 'medium', 'low'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT                   -- JSON for flexible additional data
);

-- Daily summaries table
CREATE TABLE IF NOT EXISTS daily_summaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  summary_date DATE NOT NULL UNIQUE,
  content TEXT NOT NULL,          -- AI-generated summary
  slack_message TEXT,             -- Formatted Slack payload
  stats TEXT,                     -- JSON stats for the day
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat conversation history (optional, for maintaining context)
CREATE TABLE IF NOT EXISTS chat_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,             -- 'user' or 'assistant'
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);
CREATE INDEX IF NOT EXISTS idx_feedback_category ON feedback(category);
CREATE INDEX IF NOT EXISTS idx_feedback_sentiment ON feedback(sentiment);
CREATE INDEX IF NOT EXISTS idx_feedback_source ON feedback(source);
CREATE INDEX IF NOT EXISTS idx_feedback_priority ON feedback(priority);
CREATE INDEX IF NOT EXISTS idx_daily_summaries_date ON daily_summaries(summary_date);
CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_history(session_id);
