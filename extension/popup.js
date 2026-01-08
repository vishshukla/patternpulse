/**
 * PatternPulse Popup Script
 * Displays user statistics and pattern mastery
 */

// Initialize popup when DOM loads
document.addEventListener('DOMContentLoaded', async () => {
  await loadStats();
});

/**
 * Get current problem status from storage
 */
async function getCurrentProblemStatus() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['currentProblemStatus'], (result) => {
      resolve(result.currentProblemStatus || null);
    });
  });
}

/**
 * Load and display user statistics with timeout
 */
async function loadStats() {
  try {
    // Add timeout to prevent infinite loading
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    );

    const loadData = async () => {
      const problemStatus = await getCurrentProblemStatus();
      const stats = await storage.getStats();
      const strength = await storage.getPatternStrength();
      return { problemStatus, stats, strength };
    };

    const { problemStatus, stats, strength } = await Promise.race([loadData(), timeout]);
    displayStats(stats, strength, problemStatus);
  } catch (error) {
    console.error('[Popup] Error loading stats:', error);
    // Show empty state instead of error spinner
    displayStats({ total: 0, completed: 0, patterns: {}, streak: 0 }, { strongest: [], all: [] }, null);
  }
}

/**
 * Render "not in database" banner
 */
function renderNotInDatabaseBanner(slug) {
  return `
    <div class="not-in-db-banner">
      <div class="not-in-db-icon">☕</div>
      <div class="not-in-db-text">
        This problem isn't on PatternPulse yet — we're working on it!
      </div>
    </div>
  `;
}

/**
 * Display statistics in popup
 */
function displayStats(stats, strength, problemStatus) {
  const content = document.getElementById('content');

  // Check if current page is a problem not in database
  const showNotInDbBanner = problemStatus && problemStatus.slug && !problemStatus.inDatabase;

  if (stats.total === 0) {
    // Show empty state (with not-in-db banner if applicable)
    content.innerHTML = `
      <div class="scrollable-content">
        ${showNotInDbBanner ? renderNotInDatabaseBanner(problemStatus.slug) : ''}
        <div class="empty-state">
          <div class="empty-state-icon">🎯</div>
          <div class="empty-state-text">
            <strong>No patterns tracked yet</strong>
            Start identifying patterns on LeetCode problems.
          </div>
        </div>
      </div>

      <div class="fixed-footer">
        ${renderRandomButton(0)}

        <button class="btn btn-feedback" id="feedback-btn">
          💬 Send Feedback
        </button>

        ${renderFooter()}
      </div>
    `;

    // Add event listeners for empty state
    document.getElementById('feedback-btn').addEventListener('click', openFeedback);
    const randomBtn = document.getElementById('random-btn');
    if (randomBtn) {
      randomBtn.addEventListener('click', openRandomProblem);
    }
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
    <div class="scrollable-content">
      ${showNotInDbBanner ? renderNotInDatabaseBanner(problemStatus.slug) : ''}
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
    </div>

    <div class="fixed-footer">
      ${renderRandomButton(stats.completed)}

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
    </div>
  `;

  // Add event listeners
  document.getElementById('export-btn').addEventListener('click', exportData);
  document.getElementById('reset-btn').addEventListener('click', resetData);
  document.getElementById('feedback-btn').addEventListener('click', openFeedback);

  // Random button listener
  const randomBtn = document.getElementById('random-btn');
  if (randomBtn) {
    randomBtn.addEventListener('click', openRandomProblem);
  }
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
 * Get total problems in database
 */
function getTotalProblems() {
  if (typeof PROBLEM_DATABASE === 'undefined') return 0;
  return Object.keys(PROBLEM_DATABASE).length;
}

/**
 * Render random problem button
 */
function renderRandomButton(completedCount) {
  const totalProblems = getTotalProblems();
  const remaining = totalProblems - completedCount;

  if (totalProblems === 0) {
    return ''; // Database not loaded
  }

  const allDone = remaining <= 0;

  // Show encouraging progress message
  let progressText = '';
  if (allDone) {
    progressText = 'All solved - practice mode';
  } else if (completedCount === 0) {
    progressText = 'More problems coming soon';
  } else {
    progressText = `${completedCount} solved - more coming soon`;
  }

  return `
    <button class="btn btn-random" id="random-btn">
      <span class="dice-icon">🎲</span>
      ${allDone ? 'Random (Practice)' : 'Random Problem'}
    </button>
    <div class="random-stats">
      ${progressText}
    </div>
  `;
}

/**
 * Open a random problem (uncompleted first, or any if all done)
 */
async function openRandomProblem() {
  try {
    if (typeof PROBLEM_DATABASE === 'undefined') {
      showNotification('Database not loaded', 'error');
      return;
    }

    // Get all completed problem slugs
    const allProgress = await storage.getAllProgress();
    const completedSlugs = new Set(
      Object.values(allProgress)
        .filter(p => p.completed)
        .map(p => p.slug)
    );

    // Get all problems from database that aren't completed
    const allProblems = Object.values(PROBLEM_DATABASE);
    const uncompletedProblems = allProblems.filter(p => !completedSlugs.has(p.slug));

    // Pick from uncompleted if available, otherwise pick any (practice mode)
    const problemPool = uncompletedProblems.length > 0 ? uncompletedProblems : allProblems;

    // Pick a random one
    const randomIndex = Math.floor(Math.random() * problemPool.length);
    const randomProblem = problemPool[randomIndex];

    // Open in current tab
    const url = `https://leetcode.com/problems/${randomProblem.slug}/`;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.update(tabs[0].id, { url });
      }
    });

  } catch (error) {
    console.error('[Popup] Error opening random problem:', error);
    showNotification('Failed to open problem', 'error');
  }
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
 * Open feedback form (Google Form for general feedback)
 */
function openFeedback() {
  chrome.tabs.create({ url: CONFIG.feedbackFormUrl });
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
