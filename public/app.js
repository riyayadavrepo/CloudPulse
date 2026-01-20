// Configuration
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:8787'
  : 'https://feedback-intelligence.riya-yadav-th.workers.dev';

// State
let chatHistory = [];
let trendsChart = null;
let sentimentChart = null;
let categoryChart = null;
let sourceChart = null;
let priorityChart = null;
let userTypeChart = null;
let currentDateRange = {
  startDate: null,
  endDate: null
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupFloatingBubble();
  setupDateFilters();
  loadDashboardStats();
  loadTopIssues();
  loadLatestSummary();
  setupChatHandlers();
  setupSummaryGenerator();
});

/**
 * Setup tab navigation
 */
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      const targetContent = document.getElementById(`tab-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/**
 * Setup floating AI chat bubble
 */
function setupFloatingBubble() {
  const bubbleTrigger = document.getElementById('bubble-trigger');
  const bubbleWindow = document.getElementById('bubble-window');
  const bubbleClose = document.getElementById('bubble-close');

  // Toggle bubble window
  bubbleTrigger.addEventListener('click', () => {
    bubbleWindow.classList.toggle('hidden');
  });

  // Close bubble window
  bubbleClose.addEventListener('click', () => {
    bubbleWindow.classList.add('hidden');
  });
}

/**
 * Update sticky header metrics
 */
function updateStickyHeader(stats) {
  const headerTotal = document.getElementById('header-total');
  const headerSentiment = document.getElementById('header-sentiment');
  const headerCritical = document.getElementById('header-critical');

  if (headerTotal && stats.overview) {
    headerTotal.textContent = stats.overview.total_7days || 0;
  }

  if (headerSentiment && stats.sentiment) {
    const totalSentiment = (stats.sentiment.positive || 0) + (stats.sentiment.negative || 0) + (stats.sentiment.neutral || 0);
    const positivePercent = totalSentiment > 0
      ? Math.round((stats.sentiment.positive || 0) / totalSentiment * 100)
      : 0;
    headerSentiment.textContent = `${positivePercent}%`;
  }

  if (headerCritical && stats.priorities) {
    const criticalCount = stats.priorities.find(p => p.priority === 'critical')?.count || 0;
    headerCritical.textContent = criticalCount;
  }
}

/**
 * Load dashboard statistics
 */
async function loadDashboardStats() {
  try {
    // Build URL with date parameters if set
    let url = `${API_BASE}/api/stats`;
    const params = new URLSearchParams();

    if (currentDateRange.startDate) {
      params.append('startDate', currentDateRange.startDate);
    }
    if (currentDateRange.endDate) {
      params.append('endDate', currentDateRange.endDate);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    // Update sticky header with latest stats
    updateStickyHeader(data);

    // Update date range label (if element exists in old layout)
    const labelEl = document.getElementById('stat-label-total');
    if (labelEl) {
      if (currentDateRange.startDate && currentDateRange.endDate) {
        const start = new Date(currentDateRange.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const end = new Date(currentDateRange.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        labelEl.textContent = `Total Feedback (${start} - ${end})`;
      } else {
        labelEl.textContent = 'Total Feedback (Last 7 days)';
      }
    }

    // Update stat cards (if elements exist in old layout)
    const total7daysEl = document.getElementById('total-7days');
    if (total7daysEl) {
      total7daysEl.textContent = data.overview.total_7days;
    }

    const totalSentiment = (data.sentiment.positive || 0) + (data.sentiment.negative || 0) + (data.sentiment.neutral || 0);
    const positivePercent = totalSentiment > 0
      ? Math.round((data.sentiment.positive || 0) / totalSentiment * 100)
      : 0;

    const positiveSentimentEl = document.getElementById('positive-sentiment');
    if (positiveSentimentEl) {
      positiveSentimentEl.textContent = `${positivePercent}%`;
    }

    const criticalCount = data.priorities.find(p => p.priority === 'critical')?.count || 0;
    const criticalIssuesEl = document.getElementById('critical-issues');
    if (criticalIssuesEl) {
      criticalIssuesEl.textContent = criticalCount;
    }

    // Calculate trend (for trend display if it exists)
    if (data.trends.length >= 2) {
      const recent = data.trends[data.trends.length - 1].count;
      const previous = data.trends[data.trends.length - 2].count;
      const change = recent - previous;
      const trendText = change > 0 ? `+${change}` : change.toString();

      const trendEl = document.getElementById('trend-display');
      if (trendEl) {
        trendEl.textContent = trendText;
        trendEl.style.color = change > 0 ? '#f57c00' : '#2e7d32';
      }
    }

    // Render charts
    renderTrendsChart(data.trends);
    renderSentimentChart(data.sentiment);
    renderCategoryChart(data.categories || []);
    renderSourceChart(data.sources || []);
    renderPriorityChart(data.priorities || []);
    renderUserTypeChart(data.userTypes || []);

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
  if (!ctx) return;

  if (trendsChart) {
    trendsChart.destroy();
  }

  // Update chart title based on actual date range
  const titleEl = document.getElementById('trends-chart-title');
  if (titleEl && trends.length > 0) {
    const startDate = new Date(trends[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endDate = new Date(trends[trends.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    titleEl.textContent = `Feedback Trends (${startDate} - ${endDate})`;
  }

  trendsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: trends.map(t => new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [{
        label: 'Feedback Items',
        data: trends.map(t => t.count),
        borderColor: '#F38020',
        backgroundColor: 'rgba(243, 128, 32, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#F38020',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#F38020',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            title: (context) => {
              return context[0].label;
            },
            label: (context) => {
              return `${context.parsed.y} feedback items`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
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
  if (!ctx) return;

  if (sentimentChart) {
    sentimentChart.destroy();
  }

  const total = (sentiment.positive || 0) + (sentiment.neutral || 0) + (sentiment.negative || 0);

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
          '#10b981',  // Green for positive
          '#6b7280',  // Gray for neutral
          '#ef4444'   // Red for negative
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#F38020',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

/**
 * Render category chart
 */
function renderCategoryChart(categories) {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;

  if (categoryChart) {
    categoryChart.destroy();
  }

  categoryChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories.map(c => c.category.charAt(0).toUpperCase() + c.category.slice(1)),
      datasets: [{
        label: 'Count',
        data: categories.map(c => c.count),
        backgroundColor: [
          '#F38020',  // Primary orange
          '#FF8833',  // Light orange
          '#D16D1A',  // Dark orange
          '#FFA85C',  // Lighter orange
          '#C25A0F',  // Darker orange
          '#FFB976'   // Lightest orange
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#F38020',
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            precision: 0
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

/**
 * Render source chart
 */
function renderSourceChart(sources) {
  const ctx = document.getElementById('sourceChart');
  if (!ctx) return;

  if (sourceChart) {
    sourceChart.destroy();
  }

  sourceChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sources.map(s => s.source.charAt(0).toUpperCase() + s.source.slice(1)),
      datasets: [{
        data: sources.map(s => s.count),
        backgroundColor: [
          '#F38020',  // Primary orange
          '#FF8833',  // Light orange
          '#D16D1A',  // Dark orange
          '#FFA85C',  // Lighter orange
          '#C25A0F'   // Darker orange
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#F38020',
          borderWidth: 1,
          padding: 12
        }
      }
    }
  });
}

/**
 * Render priority chart
 */
function renderPriorityChart(priorities) {
  const ctx = document.getElementById('priorityChart');
  if (!ctx) return;

  if (priorityChart) {
    priorityChart.destroy();
  }

  // Order priorities: critical, high, medium, low
  const priorityOrder = ['critical', 'high', 'medium', 'low'];
  const orderedPriorities = priorityOrder.map(p =>
    priorities.find(pr => pr.priority === p) || { priority: p, count: 0 }
  );

  priorityChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: orderedPriorities.map(p => p.priority.charAt(0).toUpperCase() + p.priority.slice(1)),
      datasets: [{
        label: 'Count',
        data: orderedPriorities.map(p => p.count),
        backgroundColor: [
          '#c62828',  // Critical - red
          '#f57c00',  // High - orange
          '#0051C3',  // Medium - blue
          '#757575'   // Low - gray
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#F38020',
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

/**
 * Render user type chart
 */
function renderUserTypeChart(userTypes) {
  const ctx = document.getElementById('userTypeChart');
  if (!ctx) return;

  if (userTypeChart) {
    userTypeChart.destroy();
  }

  userTypeChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: userTypes.map(u => u.user_type.charAt(0).toUpperCase() + u.user_type.slice(1)),
      datasets: [{
        data: userTypes.map(u => u.count),
        backgroundColor: [
          '#F38020',  // Enterprise - orange
          '#0051C3',  // Pro - blue
          '#2e7d32'   // Free - green
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#F38020',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = userTypes.reduce((sum, u) => sum + u.count, 0);
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          }
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
    // Build URL with date parameters if set
    let url = `${API_BASE}/api/stats`;
    const params = new URLSearchParams();

    if (currentDateRange.startDate) {
      params.append('startDate', currentDateRange.startDate);
    }
    if (currentDateRange.endDate) {
      params.append('endDate', currentDateRange.endDate);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    const issuesList = document.getElementById('issues-list');
    if (!issuesList) return;

    if (!data.topIssues || data.topIssues.length === 0) {
      issuesList.innerHTML = '<p class="loading">No critical or high priority issues found in this period!</p>';
      return;
    }

    issuesList.innerHTML = data.topIssues.map((issue, index) => {
      const examples = issue.examples ? issue.examples.split(' | ') : [];
      const examplesHtml = examples.map(ex => `<p class="example-item">• ${ex}</p>`).join('');

      return `
        <div class="issue-item ${issue.priority}">
          <div class="issue-header">
            <div>
              <span class="issue-title">${issue.category.charAt(0).toUpperCase() + issue.category.slice(1)} Issue</span>
              <span class="issue-priority-badge ${issue.priority}">${issue.priority.toUpperCase()}</span>
            </div>
            <span class="issue-count">${issue.count} reports</span>
          </div>
          <div class="issue-examples hidden" id="issue-examples-${index}">
            ${examplesHtml || '<p class="example-item">No examples available</p>'}
          </div>
          <button class="view-examples-btn" onclick="toggleIssueExamples(${index})">
            <span id="view-examples-text-${index}">View Examples</span>
          </button>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.error('Failed to load top issues:', error);
    document.getElementById('issues-list').innerHTML = '<p class="loading">Failed to load issues</p>';
  }
}

/**
 * Toggle issue examples visibility
 */
function toggleIssueExamples(index) {
  const examplesEl = document.getElementById(`issue-examples-${index}`);
  const textEl = document.getElementById(`view-examples-text-${index}`);

  if (examplesEl.classList.contains('hidden')) {
    examplesEl.classList.remove('hidden');
    textEl.textContent = 'Hide Examples';
  } else {
    examplesEl.classList.add('hidden');
    textEl.textContent = 'View Examples';
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

  // Render markdown for assistant messages
  if (role === 'assistant' && typeof marked !== 'undefined') {
    contentDiv.innerHTML = marked.parse(content);
  } else {
    contentDiv.textContent = content;
  }

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
    if (!summaryContent) return;

    if (data.message) {
      // No summary available
      summaryContent.innerHTML = `<p class="loading">${data.message}</p>`;
      return;
    }

    // Display summary with Slack-style formatting and markdown
    const summaryHtml = typeof marked !== 'undefined'
      ? marked.parse(data.summary)
      : data.summary.replace(/\n/g, '<br>');

    const dashboardUrl = window.location.origin + window.location.pathname;

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
        <div style="margin-top: 16px;">${summaryHtml}</div>
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.2);">
          <strong>Explore in Detail:</strong><br>
          <a href="${dashboardUrl}" style="color: #F38020; text-decoration: underline;" target="_blank">
            Open CloudPulse Dashboard →
          </a>
          <p style="font-size: 0.9rem; margin-top: 8px; opacity: 0.9;">
            Use the AI agent to ask questions, filter by date range, and dive into analytics.
          </p>
        </div>
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
  if (!btn) return;

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

/**
 * Setup date filter handlers
 */
function setupDateFilters() {
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const applyBtn = document.getElementById('apply-filter-btn');
  const toggleBtn = document.getElementById('toggle-custom-date-inline');
  const closeBtn = document.getElementById('close-custom-date');
  const customPanel = document.getElementById('custom-date-panel');
  const quickFilterBtns = document.querySelectorAll('.quick-filter-btn');

  // Set default end date to today
  const today = new Date().toISOString().split('T')[0];
  endDateInput.value = today;

  // Set default start date to 7 days ago
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  startDateInput.value = sevenDaysAgo;

  // Toggle custom date panel
  toggleBtn.addEventListener('click', () => {
    customPanel.classList.toggle('hidden');
  });

  // Close custom date panel
  closeBtn.addEventListener('click', () => {
    customPanel.classList.add('hidden');
  });

  // Apply custom filter button
  applyBtn.addEventListener('click', () => {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
      showError('Please select both start and end dates');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      showError('Start date cannot be after end date');
      return;
    }

    currentDateRange.startDate = startDate;
    currentDateRange.endDate = endDate;

    // Reload dashboard with new date range
    loadDashboardStats();
    loadTopIssues();

    // Clear active quick filters
    quickFilterBtns.forEach(btn => btn.classList.remove('active'));

    // Close panel
    customPanel.classList.add('hidden');
  });

  // Quick filter buttons
  quickFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const days = parseInt(btn.dataset.days);
      const today = new Date();
      const startDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);

      startDateInput.value = startDate.toISOString().split('T')[0];
      endDateInput.value = today.toISOString().split('T')[0];

      currentDateRange.startDate = startDateInput.value;
      currentDateRange.endDate = endDateInput.value;

      // Update active state
      quickFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Hide custom panel
      customPanel.classList.add('hidden');

      // Reload dashboard
      loadDashboardStats();
      loadTopIssues();
    });
  });
}
