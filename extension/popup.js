/**
 * PatternPulse Popup Script
 * Displays user statistics and pattern mastery
 */

// Initialize popup when DOM loads
document.addEventListener('DOMContentLoaded', async () => {
  await loadStats();
});

/**
 * Load and display user statistics
 */
async function loadStats() {
  try {
    const stats = await storage.getStats();
    const strength = await storage.getPatternStrength();
    displayStats(stats, strength);
  } catch (error) {
    console.error('[Popup] Error loading stats:', error);
    showError();
  }
}

/**
 * Display statistics in popup
 */
function displayStats(stats, strength) {
  const content = document.getElementById('content');

  if (stats.total === 0) {
    // Show empty state
    content.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎯</div>
        <div class="empty-state-text">
          <strong>No patterns tracked yet</strong>
          Visit a LeetCode problem to start identifying patterns.
        </div>
      </div>
      ${renderFooter()}
    `;
    return;
  }

  // Calculate accuracy
  const accuracy = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  // Sort patterns by count
  const sortedPatterns = Object.entries(stats.patterns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 patterns

  content.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${stats.completed}</div>
        <div class="stat-label">Completed</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.streak}<span class="streak-icon">🔥</span></div>
        <div class="stat-label">Streak</div>
      </div>
    </div>

    ${renderPatternStrength(strength)}

    ${sortedPatterns.length > 0 ? `
      <div class="patterns-section">
        <div class="section-title">Pattern Mastery</div>
        <div class="pattern-list">
          ${sortedPatterns.map(([pattern, count]) => `
            <div class="pattern-item">
              <div class="pattern-name">${pattern}</div>
              <div class="pattern-count">${count}</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <div class="actions">
      <button class="btn btn-primary" id="export-btn">
        Export Data
      </button>
      <button class="btn btn-secondary" id="reset-btn">
        Reset
      </button>
    </div>

    <button class="btn btn-feedback" id="feedback-btn">
      💬 Send Feedback
    </button>

    ${renderFooter()}
  `;

  // Add event listeners
  document.getElementById('export-btn').addEventListener('click', exportData);
  document.getElementById('reset-btn').addEventListener('click', resetData);
  document.getElementById('feedback-btn').addEventListener('click', openFeedback);
}

/**
 * Render pattern strength section (strongest vs weakest)
 */
function renderPatternStrength(strength) {
  if (!strength || strength.all.length === 0) {
    return ''; // No patterns completed yet
  }

  const { strongest } = strength;

  // Don't show section if nothing to display
  if (strongest.length === 0) {
    return '';
  }

  return `
    <div class="strength-section-single">
      <div class="strength-card strongest">
        <div class="strength-header">
          <span class="strength-icon">✓</span>
          <span class="strength-title">Mastered (no hints)</span>
        </div>
        <div class="strength-list">
          ${strongest.slice(0, 3).map(p => `
            <div class="strength-item">
              <span class="strength-name">${p.pattern}</span>
              <span class="strength-rate">${p.rate}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render footer
 */
function renderFooter() {
  return `
    <div class="footer">
      <div class="footer-beta">This app is evolving — your feedback shapes it!</div>
      <div class="footer-brand">PatternPulse Beta</div>
    </div>
  `;
}

/**
 * Export user data
 */
async function exportData() {
  try {
    const jsonData = await storage.exportData();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `patternpulse-backup-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);

    showNotification('Data exported successfully!');
  } catch (error) {
    console.error('[Popup] Error exporting data:', error);
    showNotification('Failed to export data', 'error');
  }
}

/**
 * Reset all data
 */
async function resetData() {
  const confirmed = confirm(
    'Are you sure you want to reset all progress?\n\n' +
    'This will delete all your completed problems and statistics.\n' +
    'This action cannot be undone.'
  );

  if (!confirmed) return;

  try {
    await storage.clearAll();
    await loadStats();
    showNotification('All data has been reset');
  } catch (error) {
    console.error('[Popup] Error resetting data:', error);
    showNotification('Failed to reset data', 'error');
  }
}

/**
 * Open feedback form
 */
function openFeedback() {
  // Opens GitHub issues page for feedback
  // TODO: Update this URL to your GitHub repo's issues page
  const feedbackUrl = 'https://github.com/vishshukla/patternpulse/issues';
  chrome.tabs.create({ url: feedbackUrl });
}

/**
 * Show error state
 */
function showError() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">⚠️</div>
      <div class="empty-state-text">
        <p><strong>Error loading data</strong></p>
        <p>Please try refreshing the popup.</p>
      </div>
    </div>
    ${renderFooter()}
  `;
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'error' ? '#ef4444' : '#10b981'};
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideDown 0.3s ease;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
