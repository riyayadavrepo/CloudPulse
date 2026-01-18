// Configuration
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:8787'
  : 'https://feedback-intelligence.riya-yadav-th.workers.dev';

// State
let chatHistory = [];
let trendsChart = null;
let sentimentChart = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadDashboardStats();
  loadTopIssues();
  loadLatestSummary();
  setupChatHandlers();
  setupSummaryGenerator();
});

/**
 * Load dashboard statistics
 */
async function loadDashboardStats() {
  try {
    const response = await fetch(`${API_BASE}/api/stats`);
    const data = await response.json();

    // Update stat cards
    document.getElementById('total-7days').textContent = data.overview.total_7days;

    const totalSentiment = (data.sentiment.positive || 0) + (data.sentiment.negative || 0) + (data.sentiment.neutral || 0);
    const positivePercent = totalSentiment > 0
      ? Math.round((data.sentiment.positive || 0) / totalSentiment * 100)
      : 0;
    document.getElementById('positive-sentiment').textContent = `${positivePercent}%`;

    const criticalCount = data.priorities.find(p => p.priority === 'critical')?.count || 0;
    document.getElementById('critical-issues').textContent = criticalCount;

    // Calculate trend
    if (data.trends.length >= 2) {
      const recent = data.trends[data.trends.length - 1].count;
      const previous = data.trends[data.trends.length - 2].count;
      const change = recent - previous;
      const trendText = change > 0 ? `+${change}` : change.toString();
      const trendColor = change > 0 ? '#f57c00' : '#2e7d32';
      const trendEl = document.getElementById('trend');
      trendEl.textContent = trendText;
      trendEl.style.color = 'white';
    }

    // Render charts
    renderTrendsChart(data.trends);
    renderSentimentChart(data.sentiment);

  } catch (error) {
    console.error('Failed to load stats:', error);
    showError('Failed to load dashboard statistics');
  }
}

/**
 * Render trends chart
 */
function renderTrendsChart(trends) {
  const ctx = document.getElementById('trendsChart');

  if (trendsChart) {
    trendsChart.destroy();
  }

  trendsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: trends.map(t => new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [{
        label: 'Feedback Items',
        data: trends.map(t => t.count),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  });
}

/**
 * Render sentiment chart
 */
function renderSentimentChart(sentiment) {
  const ctx = document.getElementById('sentimentChart');

  if (sentimentChart) {
    sentimentChart.destroy();
  }

  sentimentChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [{
        data: [
          sentiment.positive || 0,
          sentiment.neutral || 0,
          sentiment.negative || 0
        ],
        backgroundColor: [
          '#2e7d32',
          '#757575',
          '#c62828'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

/**
 * Load top issues
 */
async function loadTopIssues() {
  try {
    const response = await fetch(`${API_BASE}/api/stats`);
    const data = await response.json();

    const issuesList = document.getElementById('issues-list');

    if (!data.topIssues || data.topIssues.length === 0) {
      issuesList.innerHTML = '<p class="loading">No critical or high priority issues found this week!</p>';
      return;
    }

    issuesList.innerHTML = data.topIssues.map(issue => `
      <div class="issue-item ${issue.priority}">
        <div class="issue-header">
          <span class="issue-title">${issue.category} - ${issue.priority} priority</span>
          <span class="issue-count">${issue.count} reports</span>
        </div>
        <div class="issue-examples">
          ${issue.examples ? issue.examples.split(' | ').slice(0, 2).join('. ') + '...' : 'No examples available'}
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error('Failed to load top issues:', error);
    document.getElementById('issues-list').innerHTML = '<p class="loading">Failed to load issues</p>';
  }
}

/**
 * Setup chat handlers
 */
function setupChatHandlers() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  sendBtn.addEventListener('click', () => sendMessage());

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

/**
 * Send chat message
 */
async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (!message) return;

  // Add user message to chat
  addMessageToChat('user', message);
  input.value = '';

  // Show typing indicator
  const typingId = showTypingIndicator();

  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        history: chatHistory
      })
    });

    const data = await response.json();

    // Remove typing indicator
    removeTypingIndicator(typingId);

    // Add assistant response
    addMessageToChat('assistant', data.response);

    // Update history
    chatHistory.push(
      { role: 'user', content: message },
      { role: 'assistant', content: data.response }
    );

    // Keep only last 10 messages in history
    if (chatHistory.length > 10) {
      chatHistory = chatHistory.slice(-10);
    }

  } catch (error) {
    console.error('Chat error:', error);
    removeTypingIndicator(typingId);
    addMessageToChat('assistant', 'Sorry, I encountered an error processing your question. Please try again.');
  }
}

/**
 * Add message to chat UI
 */
function addMessageToChat(role, content) {
  const messagesContainer = document.getElementById('chat-messages');

  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = content;

  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
  const messagesContainer = document.getElementById('chat-messages');

  const typingDiv = document.createElement('div');
  typingDiv.className = 'message assistant';
  typingDiv.id = 'typing-indicator';

  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  indicator.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;

  typingDiv.appendChild(indicator);
  messagesContainer.appendChild(typingDiv);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  return 'typing-indicator';
}

/**
 * Remove typing indicator
 */
function removeTypingIndicator(id) {
  const indicator = document.getElementById(id);
  if (indicator) {
    indicator.remove();
  }
}

/**
 * Load latest daily summary
 */
async function loadLatestSummary() {
  try {
    const response = await fetch(`${API_BASE}/api/summary/latest`);
    const data = await response.json();

    const summaryContent = document.getElementById('summary-content');

    if (data.message) {
      // No summary available
      summaryContent.innerHTML = `<p class="loading">${data.message}</p>`;
      return;
    }

    // Display summary with Slack-style formatting
    summaryContent.innerHTML = `
      <div class="summary-slack">
        <h3>Daily Feedback Summary - ${data.date}</h3>
        ${data.stats ? `
          <div class="summary-fields">
            <div class="summary-field">
              <strong>Total Feedback:</strong><br>
              ${data.stats.total} items
            </div>
            <div class="summary-field">
              <strong>Critical Issues:</strong><br>
              ${data.stats.critical} items
            </div>
            <div class="summary-field">
              <strong>Sentiment:</strong><br>
              ${data.stats.positive} positive, ${data.stats.negative} negative
            </div>
            <div class="summary-field">
              <strong>High Priority:</strong><br>
              ${data.stats.high} items
            </div>
          </div>
        ` : ''}
        <div style="white-space: pre-wrap; margin-top: 16px;">${data.summary}</div>
      </div>
    `;

  } catch (error) {
    console.error('Failed to load summary:', error);
    document.getElementById('summary-content').innerHTML = '<p class="loading">Failed to load summary</p>';
  }
}

/**
 * Setup summary generator
 */
function setupSummaryGenerator() {
  const btn = document.getElementById('generate-summary-btn');

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = 'Generating...';

    try {
      const response = await fetch(`${API_BASE}/api/summary/generate`, {
        method: 'POST'
      });

      if (response.ok) {
        // Reload the summary
        await loadLatestSummary();
        showSuccess('Summary generated successfully!');
      } else {
        showError('Failed to generate summary');
      }
    } catch (error) {
      console.error('Failed to generate summary:', error);
      showError('Failed to generate summary');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Generate New Summary';
    }
  });
}

/**
 * Show error message
 */
function showError(message) {
  // Simple alert for now
  alert('Error: ' + message);
}

/**
 * Show success message
 */
function showSuccess(message) {
  // Simple alert for now
  alert(message);
}
