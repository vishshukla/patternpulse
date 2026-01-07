/**
 * PatternPulse Content Script
 * Runs on LeetCode problem pages to:
 * 1. Show pattern quiz before revealing metadata
 * 2. Apply shields to hide tags/hints/similar problems
 * 3. Track user progress with pattern identification
 */

// 15 Core Patterns
const CORE_PATTERNS = [
  'Hash Map',
  'Two Pointers',
  'Sliding Window',
  'Binary Search',
  'Dynamic Programming',
  'Greedy',
  'Backtracking',
  'DFS',
  'BFS',
  'Stack',
  'Linked List',
  'Heap',
  'Trie',
  'Union Find',
  'Topological Sort'
];

// State
let currentProblem = null;
let currentProgress = null;
let quizShown = false;
let hintsGiven = 0;
let wrongAttempts = 0;
let shieldsActive = false;
let currentSlug = null;

/**
 * Initialize extension on page load
 */
async function init() {
  try {
    // Extract problem slug from URL
    const slug = extractSlugFromURL();
    if (!slug) {
      console.log('[PatternPulse] Not a problem page');
      return;
    }

    // Skip if we're already showing for this slug
    if (currentSlug === slug && document.querySelector('.pattern-pulse-sidebar')) {
      console.log('[PatternPulse] Already initialized for this problem');
      return;
    }

    console.log('[PatternPulse] Detected problem:', slug);
    currentSlug = slug;

    // Reset state for new problem
    hintsGiven = 0;
    wrongAttempts = 0;
    quizShown = false;

    // Load problem from database
    currentProblem = await loadProblem(slug);
    if (!currentProblem) {
      console.log('[PatternPulse] Problem not in database:', slug);
      showNotInDatabase();
      return;
    }

    console.log('[PatternPulse] Loaded problem:', currentProblem.title);

    // Check if user has already solved this problem
    currentProgress = await storage.getProgress(slug);

    if (currentProgress && currentProgress.completed) {
      // Already solved - show completed state (no shields)
      console.log('[PatternPulse] Problem already completed');
      showCompletedState();
      return;
    }

    // Not solved yet - apply shields and show quiz
    shieldsActive = true;
    applyShields();

    // Show quiz after a short delay to let page load
    setTimeout(() => {
      showQuiz();
    }, 500);

  } catch (error) {
    console.error('[PatternPulse] Initialization error:', error);
  }
}

/**
 * Extract problem slug from URL
 * Example: https://leetcode.com/problems/two-sum/ -> "two-sum"
 */
function extractSlugFromURL() {
  const match = window.location.pathname.match(/\/problems\/([^\/]+)/);
  return match ? match[1] : null;
}

/**
 * Load problem from database by slug
 * Database format: { leetcodeId: { slug, title, ... } }
 */
async function loadProblem(slug) {
  if (typeof PROBLEM_DATABASE === 'undefined') {
    console.log('[PatternPulse] Database not loaded');
    return null;
  }

  // Search database by slug
  for (const leetcodeId in PROBLEM_DATABASE) {
    const problem = PROBLEM_DATABASE[leetcodeId];
    if (problem.slug === slug) {
      console.log('[PatternPulse] Found problem:', problem.title);
      return { leetcodeId: parseInt(leetcodeId), ...problem };
    }
  }

  return null;
}

/**
 * Apply shields (blur) to metadata sections
 * Keep visible: Description, Problem title, Difficulty
 * Blur: Editorial, Solutions, Submissions, Discussion, Topics, Companies, Similar Questions
 */
function applyShields() {
  let shieldedCount = 0;

  // Helper to shield an element
  const shield = (el) => {
    if (el && !el.classList.contains('pattern-pulse-shield')) {
      el.classList.add('pattern-pulse-shield');
      shieldedCount++;
    }
  };

  // 1. Blur tabs by text content (Editorial, Solutions, Submissions, Discussion)
  document.querySelectorAll('button, div[role="tab"], a, [role="tablist"] > *').forEach(el => {
    const text = el.textContent?.trim().toLowerCase() || '';
    if (['editorial', 'solutions', 'submissions', 'discussion'].some(t => text === t)) {
      shield(el);
    }
  });

  // 2. Blur tag/topic links
  document.querySelectorAll('a[href*="/tag/"], a[href*="/company/"]').forEach(shield);

  // 3. Blur sections by their heading text
  const sectionsToBlur = ['similar questions', 'similar', 'topics', 'companies', 'hints'];

  document.querySelectorAll('div, section').forEach(el => {
    // Check if this element has a heading that matches our blur list
    const headings = el.querySelectorAll(':scope > div, :scope > span, :scope > h2, :scope > h3, :scope > h4');

    headings.forEach(heading => {
      const text = heading.textContent?.trim().toLowerCase() || '';
      if (sectionsToBlur.includes(text)) {
        // Blur the parent section containing this heading
        shield(el);
      }
    });
  });

  // 4. Blur any remaining similar question links (links to other problems in sidebar)
  document.querySelectorAll('a[href*="/problems/"]').forEach(el => {
    // Only blur if it's in a sidebar/panel area, not the main content
    const isInDescription = el.closest('[class*="description"]') ||
                            el.closest('[class*="content"]') ||
                            el.closest('[class*="markdown"]') ||
                            el.closest('[data-track-load="description_content"]');

    // Check if it looks like a similar question link (has problem title styling)
    const isInSidebar = el.closest('[class*="side"]') ||
                        el.closest('[class*="panel"]') ||
                        el.closest('[class*="similar"]');

    if (!isInDescription && isInSidebar) {
      shield(el);
    }
  });

  if (shieldedCount > 0) {
    console.log('[PatternPulse] Shielded', shieldedCount, 'elements');
  }

  // Track for MutationObserver
  lastShieldCount = document.querySelectorAll('.pattern-pulse-shield').length;
}

/**
 * Show "not in database" message
 */
function showNotInDatabase() {
  const sidebar = document.createElement('div');
  sidebar.className = 'pattern-pulse-sidebar';
  sidebar.innerHTML = `
    <div class="pattern-pulse-tab">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2.5" fill="#6366f1"/>
        <circle cx="18" cy="6" r="2.5" fill="#8b5cf6"/>
        <circle cx="6" cy="18" r="2.5" fill="#8b5cf6"/>
        <circle cx="18" cy="18" r="2.5" fill="#6366f1"/>
        <circle cx="12" cy="12" r="2.5" fill="#a78bfa"/>
        <path d="M8 7L10.5 10M13.5 14L16 17M8 17L10.5 14M13.5 10L16 7" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </svg>
    </div>
    <div class="pattern-pulse-panel">
      <div class="pattern-pulse-quiz">
        <div class="quiz-header">
          <div class="quiz-header-brand">
            <div class="quiz-logo">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="2.5" fill="#6366f1"/>
                <circle cx="18" cy="6" r="2.5" fill="#8b5cf6"/>
                <circle cx="6" cy="18" r="2.5" fill="#8b5cf6"/>
                <circle cx="18" cy="18" r="2.5" fill="#6366f1"/>
                <circle cx="12" cy="12" r="2.5" fill="#a78bfa"/>
                <path d="M8 7L10.5 10M13.5 14L16 17M8 17L10.5 14M13.5 10L16 7" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
              </svg>
            </div>
            <h2>PatternPulse</h2>
          </div>
        </div>
        <div class="not-found-message">
          <div class="not-found-icon">☕</div>
          <p>This question isn't on PatternPulse yet — we're working on it!</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(sidebar);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (sidebar.parentNode) {
      sidebar.remove();
    }
  }, 5000);
}

/**
 * Show completed state (problem already solved)
 */
function showCompletedState() {
  // Remove any existing sidebar first
  const existing = document.querySelector('.pattern-pulse-sidebar');
  if (existing) existing.remove();

  const sidebar = document.createElement('div');
  sidebar.className = 'pattern-pulse-sidebar';
  sidebar.innerHTML = `
    <div class="pattern-pulse-tab" title="PatternPulse - Already solved!">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2.5" fill="#22c55e"/>
        <circle cx="18" cy="6" r="2.5" fill="#22c55e"/>
        <circle cx="6" cy="18" r="2.5" fill="#22c55e"/>
        <circle cx="18" cy="18" r="2.5" fill="#22c55e"/>
        <circle cx="12" cy="12" r="2.5" fill="#22c55e"/>
        <path d="M8 7L10.5 10M13.5 14L16 17M8 17L10.5 14M13.5 10L16 7" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </svg>
    </div>
    <div class="pattern-pulse-panel">
      <div class="pattern-pulse-quiz">
        <div class="quiz-header">
          <div class="quiz-header-brand">
            <div class="quiz-logo completed">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13l4 4L19 7" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h2>Solved!</h2>
          </div>
        </div>
        <div class="completed-info">
          <h3>${currentProblem.title}</h3>
          <p class="completed-pattern">Pattern: <strong>${currentProgress.pattern}</strong></p>
          ${currentProgress.hintsUsed > 0 || currentProgress.wrongAttempts > 0 ?
            `<p class="completed-stats">Hints: ${currentProgress.hintsUsed || 0} | Wrong tries: ${currentProgress.wrongAttempts || 0}</p>` :
            `<p class="completed-stats perfect">Perfect solve!</p>`
          }
        </div>
        <div class="completed-actions">
          <button class="btn-reset" id="reset-progress">
            Reset & Try Again
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(sidebar);

  // Reset button handler
  sidebar.querySelector('#reset-progress').addEventListener('click', async () => {
    await storage.saveProgress(currentProblem.slug, null);
    currentProgress = null;
    sidebar.remove();

    // Reinitialize as unsolved
    shieldsActive = true;
    applyShields();
    showQuiz();
  });
}

/**
 * Show pattern quiz sidebar
 */
function showQuiz() {
  if (quizShown) return;
  quizShown = true;

  // Remove any existing sidebar first
  const existing = document.querySelector('.pattern-pulse-sidebar');
  if (existing) existing.remove();

  const sidebar = createQuizSidebar();
  document.body.appendChild(sidebar);
}

/**
 * Create quiz sidebar HTML
 */
function createQuizSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'pattern-pulse-sidebar';
  sidebar.innerHTML = `
    <div class="pattern-pulse-tab" title="PatternPulse - Identify the pattern">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2.5" fill="#6366f1"/>
        <circle cx="18" cy="6" r="2.5" fill="#8b5cf6"/>
        <circle cx="6" cy="18" r="2.5" fill="#8b5cf6"/>
        <circle cx="18" cy="18" r="2.5" fill="#6366f1"/>
        <circle cx="12" cy="12" r="2.5" fill="#a78bfa"/>
        <path d="M8 7L10.5 10M13.5 14L16 17M8 17L10.5 14M13.5 10L16 7" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </svg>
    </div>
    <div class="pattern-pulse-panel">
      <div class="pattern-pulse-quiz">
        <div class="quiz-header">
          <div class="quiz-header-brand">
            <div class="quiz-logo">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="2.5" fill="#6366f1"/>
                <circle cx="18" cy="6" r="2.5" fill="#8b5cf6"/>
                <circle cx="6" cy="18" r="2.5" fill="#8b5cf6"/>
                <circle cx="18" cy="18" r="2.5" fill="#6366f1"/>
                <circle cx="12" cy="12" r="2.5" fill="#a78bfa"/>
                <path d="M8 7L10.5 10M13.5 14L16 17M8 17L10.5 14M13.5 10L16 7" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
              </svg>
            </div>
            <h2>PatternPulse</h2>
          </div>
          <p class="quiz-subtitle">Identify the pattern</p>
        </div>

        <div class="quiz-problem">
          <h3>${currentProblem.title}</h3>
          <p class="quiz-hint">What algorithmic pattern would you use?</p>
        </div>

        <div class="quiz-patterns">
          ${CORE_PATTERNS.map(pattern => `
            <button class="pattern-button" data-pattern="${pattern}">
              ${pattern}
            </button>
          `).join('')}
        </div>

        <div class="quiz-hints" id="quiz-hints">
          <button class="hint-button" id="hint-button">
            Need a hint?
          </button>
          <div class="hints-list" id="hints-list"></div>
        </div>

        <div class="quiz-footer">
          <button class="skip-button" id="skip-button">
            Skip for now
          </button>
        </div>
      </div>
    </div>
  `;

  // Add event listeners
  sidebar.querySelectorAll('.pattern-button').forEach(btn => {
    btn.addEventListener('click', (e) => handlePatternSelection(e.target.dataset.pattern));
  });

  sidebar.querySelector('#hint-button').addEventListener('click', showHint);
  sidebar.querySelector('#skip-button').addEventListener('click', skipQuiz);

  return sidebar;
}

/**
 * Handle pattern selection
 */
async function handlePatternSelection(selectedPattern) {
  const primaryPattern = currentProblem.primaryPattern;
  const acceptablePatterns = currentProblem.acceptablePatterns ||
                            currentProblem.alternativePatterns ||
                            [];

  const isCorrect = selectedPattern === primaryPattern ||
                    acceptablePatterns.includes(selectedPattern);

  if (isCorrect) {
    // Correct answer!
    await handleCorrectAnswer(selectedPattern);
  } else {
    // Wrong answer
    handleWrongAnswer(selectedPattern);
  }
}

/**
 * Close sidebar
 */
function closeSidebar() {
  const sidebar = document.querySelector('.pattern-pulse-sidebar');
  if (sidebar) {
    sidebar.remove();
  }
}

/**
 * Handle correct answer
 */
async function handleCorrectAnswer(selectedPattern) {
  const sidebar = document.querySelector('.pattern-pulse-sidebar');
  const quiz = sidebar.querySelector('.pattern-pulse-quiz');

  // Get pattern-specific explanation or fallback to general explanation
  let explanation = '';
  if (currentProblem.patternExplanations && currentProblem.patternExplanations[selectedPattern]) {
    explanation = currentProblem.patternExplanations[selectedPattern];
  } else if (currentProblem.solution?.keyInsight) {
    explanation = currentProblem.solution.keyInsight;
  } else if (currentProblem.explanation) {
    explanation = currentProblem.explanation;
  }

  // Show success message with pattern-specific explanation
  quiz.innerHTML = `
    <div class="quiz-success">
      <div class="success-icon">✓</div>
      <h2>Correct!</h2>
      <p class="success-message">
        <strong>${selectedPattern}</strong> is the right pattern!
      </p>
      ${explanation ? `
        <div class="solution-insight">
          <p>${explanation}</p>
        </div>
      ` : ''}
      <button class="continue-button" id="continue-button">
        Continue
      </button>
    </div>
  `;

  sidebar.querySelector('#continue-button').addEventListener('click', async () => {
    // Save progress (including wrong attempts for strength calculation)
    await storage.saveProgress(currentProblem.slug, {
      pattern: selectedPattern,
      completed: true,
      hintsUsed: hintsGiven,
      wrongAttempts: wrongAttempts,
      timestamp: Date.now()
    });

    // Remove shields and sidebar
    removeShields();
    closeSidebar();
  });
}

/**
 * Handle wrong answer
 */
function handleWrongAnswer(selectedPattern) {
  // Track wrong attempts
  wrongAttempts++;

  const quiz = document.querySelector('.pattern-pulse-quiz');

  // Add shake animation to quiz
  quiz.classList.add('shake');
  setTimeout(() => quiz.classList.remove('shake'), 500);

  // Remove existing feedback
  const existingFeedback = quiz.querySelector('.wrong-feedback');
  if (existingFeedback) {
    existingFeedback.remove();
  }

  // Show feedback with option to dispute
  const feedback = document.createElement('div');
  feedback.className = 'wrong-feedback';
  feedback.innerHTML = `
    <span>Not quite. ${selectedPattern} isn't the optimal pattern here.</span>
    <button class="feedback-dispute" title="Think this should be correct?">Disagree?</button>
  `;

  const patternsSection = quiz.querySelector('.quiz-patterns');
  if (patternsSection) {
    patternsSection.insertAdjacentElement('beforebegin', feedback);
  }

  // Handle dispute click
  feedback.querySelector('.feedback-dispute').addEventListener('click', () => {
    openFeedback(selectedPattern);
  });

  setTimeout(() => {
    if (feedback.parentNode) feedback.remove();
  }, 5000);
}

/**
 * Open feedback for disputing an answer
 */
function openFeedback(selectedPattern) {
  const problemTitle = currentProblem?.title || 'Unknown';
  const problemSlug = currentProblem?.slug || '';
  const expectedPattern = currentProblem?.primaryPattern || 'Unknown';

  // Create a simple feedback form in the quiz
  const quiz = document.querySelector('.pattern-pulse-quiz');
  const existingForm = quiz.querySelector('.feedback-form');
  if (existingForm) return; // Already showing

  const form = document.createElement('div');
  form.className = 'feedback-form';
  form.innerHTML = `
    <div class="feedback-header">
      <span>Think ${selectedPattern} works here?</span>
      <button class="feedback-close">×</button>
    </div>
    <textarea class="feedback-text" placeholder="Explain why ${selectedPattern} is optimal for this problem..." rows="3"></textarea>
    <button class="feedback-submit">Send Feedback</button>
  `;

  quiz.appendChild(form);

  // Close button
  form.querySelector('.feedback-close').addEventListener('click', () => {
    form.remove();
  });

  // Submit button
  form.querySelector('.feedback-submit').addEventListener('click', () => {
    const text = form.querySelector('.feedback-text').value.trim();
    if (!text) {
      alert('Please explain your reasoning');
      return;
    }

    // For now, copy to clipboard and show confirmation
    const feedbackData = `Problem: ${problemTitle} (${problemSlug})\nExpected: ${expectedPattern}\nSuggested: ${selectedPattern}\nReason: ${text}`;

    navigator.clipboard.writeText(feedbackData).then(() => {
      form.innerHTML = `<div class="feedback-thanks">Thanks! Feedback copied to clipboard.</div>`;
      setTimeout(() => form.remove(), 2000);
    }).catch(() => {
      // Fallback - just show thanks
      form.innerHTML = `<div class="feedback-thanks">Thanks for the feedback!</div>`;
      setTimeout(() => form.remove(), 2000);
    });
  });
}

/**
 * Show progressive hint
 */
function showHint() {
  const hints = currentProblem.hints || [];

  if (hintsGiven >= hints.length) {
    alert('No more hints available!');
    return;
  }

  const hintsList = document.getElementById('hints-list');
  const hintElement = document.createElement('div');
  hintElement.className = 'hint-item';
  hintElement.innerHTML = `
    <span class="hint-number">Hint ${hintsGiven + 1}</span>
    <p>${hints[hintsGiven]}</p>
  `;

  hintsList.appendChild(hintElement);
  hintsGiven++;

  // Update hint button
  const hintButton = document.getElementById('hint-button');
  if (hintsGiven >= hints.length) {
    hintButton.textContent = 'No more hints';
    hintButton.disabled = true;
  } else {
    hintButton.textContent = `💡 Next hint (${hintsGiven}/${hints.length} used)`;
  }
}

/**
 * Skip quiz and go straight to problem
 */
async function skipQuiz() {
  const confirmed = confirm(
    'Are you sure you want to skip?\n\n' +
    'You can still identify the pattern after solving the problem.'
  );

  if (!confirmed) return;

  // Save as skipped
  await storage.saveProgress(currentProblem.slug, {
    skipped: true,
    timestamp: Date.now()
  });

  // Remove shields and sidebar
  removeShields();
  closeSidebar();
}

/**
 * Remove shields from page (smooth unblur transition)
 */
function removeShields() {
  shieldsActive = false;
  document.querySelectorAll('.pattern-pulse-shield').forEach(el => {
    el.classList.add('unlocked');
    // Remove classes after transition completes
    setTimeout(() => {
      el.classList.remove('pattern-pulse-shield', 'unlocked');
    }, 300);
  });
}

// Initialize when DOM is ready - with delay to let LeetCode's SPA settle
function startExtension() {
  // Set initial slug to prevent checkUrlChange from reinitializing immediately
  lastProblemSlug = extractSlugFromURL();

  // Delay init slightly to let LeetCode's dynamic content load
  setTimeout(init, 800);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startExtension);
} else {
  startExtension();
}

// Re-apply shields if they get removed by dynamic content
// BUT only if shields are active and we're not just detecting minor DOM changes
let observer = null;
let debounceTimer = null;
let lastShieldCount = 0;

function startObserving() {
  if (observer || !document.body) return;

  observer = new MutationObserver((mutations) => {
    // Only re-apply if shields are supposed to be active
    if (!shieldsActive || !currentProblem) return;

    // Check if any shielded elements were removed (LeetCode re-rendered them)
    const currentShields = document.querySelectorAll('.pattern-pulse-shield').length;

    // Only re-apply if shields were lost (not on every DOM change)
    if (currentShields < lastShieldCount) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        applyShields();
        lastShieldCount = document.querySelectorAll('.pattern-pulse-shield').length;
      }, 500);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Start observing after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startObserving);
} else {
  startObserving();
}

// SPA Navigation Detection - LeetCode uses client-side routing
let lastProblemSlug = null;

function checkUrlChange() {
  const newSlug = extractSlugFromURL();

  // Only reinitialize if the problem slug actually changed
  if (newSlug && newSlug !== lastProblemSlug) {
    console.log('[PatternPulse] Problem changed:', lastProblemSlug, '->', newSlug);
    lastProblemSlug = newSlug;

    // Reset state for new problem
    currentProblem = null;
    currentProgress = null;
    currentSlug = null;
    quizShown = false;
    hintsGiven = 0;
    wrongAttempts = 0;
    shieldsActive = false;

    // Close any existing sidebar
    closeSidebar();

    // Remove any existing shields
    document.querySelectorAll('.pattern-pulse-shield').forEach(el => {
      el.classList.remove('pattern-pulse-shield', 'unlocked');
    });

    // Reinitialize after a short delay to let the page load
    setTimeout(init, 500);
  }
}

// Check for URL changes periodically (handles pushState/replaceState)
setInterval(checkUrlChange, 1000); // Reduced frequency

// Also listen for popstate (back/forward navigation)
window.addEventListener('popstate', () => {
  setTimeout(checkUrlChange, 100);
});
