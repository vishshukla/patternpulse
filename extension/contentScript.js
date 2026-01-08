/**
 * PatternPulse Content Script
 * Runs on LeetCode problem pages to:
 * 1. Show pattern quiz before revealing metadata
 * 2. Apply shields to hide tags/hints/similar problems
 * 3. Track user progress with pattern identification
 */

// IMMEDIATELY inject preemptive shields (runs at document_start, before DOM loads)
// This prevents flash of unshielded content
(function injectPreemptiveShields() {
  // Only run on problem pages
  if (!window.location.pathname.includes('/problems/')) return;

  const style = document.createElement('style');
  style.id = 'pattern-pulse-preemptive';
  style.textContent = `
    /* ========================================
       PREEMPTIVE SHIELDS - Injected at document_start
       Hide spoilers BEFORE content renders
       IMPORTANT: Never blur PatternPulse's own elements!
       ======================================== */

    /* Pre-blur tag and company links (but not in our UI) */
    html:not([data-pp-ready]) a[href*="/tag/"]:not(.pattern-pulse-sidebar *),
    html:not([data-pp-ready]) a[href*="/company/"]:not(.pattern-pulse-sidebar *) {
      filter: blur(8px) !important;
      pointer-events: none !important;
    }

    /* Pre-blur LeetCode's tab bar (Editorial, Solutions, etc) */
    html:not([data-pp-ready]) [data-cy="tabs-navigation"] > *:not(:first-child),
    html:not([data-pp-ready]) [role="tablist"]:not(.pattern-pulse-sidebar *) > *:not(:first-child) {
      filter: blur(6px) !important;
      pointer-events: none !important;
    }
  `;

  // Inject into documentElement immediately (exists even at document_start)
  document.documentElement.appendChild(style);

  // Failsafe: reveal page after 3 seconds if init hasn't run
  setTimeout(() => {
    if (!document.documentElement.hasAttribute('data-pp-ready')) {
      console.log('[PatternPulse] Failsafe: revealing page');
      document.documentElement.setAttribute('data-pp-ready', 'true');
    }
  }, 3000);
})();

// Core Patterns - all patterns that can appear in the quiz
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
  'Topological Sort',
  'Math',
  'Bit Manipulation',
  'Graph'
];

// Map variant pattern names to canonical names
const PATTERN_ALIASES = {
  'Heap/Priority Queue': 'Heap',
  'Tree Traversal': 'DFS',
  'Queue': 'BFS',
  'Sorting': 'Two Pointers',
  'Prefix Sum': 'Hash Map',
  'Prefix/Suffix': 'Hash Map',
  'Design': 'Hash Map'
};

// State
let currentProblem = null;
let currentProgress = null;
let quizShown = false;
let hintsGiven = 0;
let wrongAttempts = 0;
let shieldsActive = false;
let currentSlug = null;
let isPracticeMode = false;

/**
 * Initialize extension on page load
 */
async function init() {
  try {
    // Extract problem slug from URL
    const slug = extractSlugFromURL();
    if (!slug) {
      console.log('[PatternPulse] Not a problem page');
      // Reveal page content (no shields needed)
      document.documentElement.setAttribute('data-pp-ready', 'true');
      // Clear problem status - not on a problem page
      saveCurrentProblemStatus({ slug: null, inDatabase: false });
      return;
    }

    // Skip if we're already showing for this slug
    if (currentSlug === slug && document.querySelector('.pattern-pulse-sidebar')) {
      console.log('[PatternPulse] Already initialized for this problem');
      document.documentElement.setAttribute('data-pp-ready', 'true');
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
      // Already solved - show practice mode (green quiz, no shields)
      console.log('[PatternPulse] Problem already completed - practice mode');
      saveCurrentProblemStatus({
        slug: currentSlug,
        inDatabase: true,
        completed: true,
        pattern: currentProgress.pattern
      });
      isPracticeMode = true;
      showQuiz();
      document.documentElement.setAttribute('data-pp-ready', 'true');
      return;
    }

    // Not solved yet - apply shields and show quiz
    shieldsActive = true;
    applyShields();
    showQuiz();

    // Save status for popup
    saveCurrentProblemStatus({
      slug: currentSlug,
      inDatabase: true,
      completed: false
    });

    // Mark page as ready (reveals content with shields in place)
    document.documentElement.setAttribute('data-pp-ready', 'true');

  } catch (error) {
    console.error('[PatternPulse] Initialization error:', error);
    // Reveal page on error (don't leave it hidden)
    document.documentElement.setAttribute('data-pp-ready', 'true');
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
 * Save current problem status to storage (for popup to read)
 */
async function saveCurrentProblemStatus(status) {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      await chrome.storage.local.set({ currentProblemStatus: status });
    }
  } catch (error) {
    console.error('[PatternPulse] Error saving problem status:', error);
  }
}

/**
 * Handle problem not in database - show gray tab with info panel
 */
function showNotInDatabase() {
  // Mark page as ready (removes preemptive shields) - problem not in DB, so don't blur
  document.documentElement.setAttribute('data-pp-ready', 'true');

  // Remove any existing sidebar first
  const existing = document.querySelector('.pattern-pulse-sidebar');
  if (existing) existing.remove();

  // Make absolutely sure no shields remain from previous problem
  document.querySelectorAll('.pattern-pulse-shield').forEach(el => {
    el.classList.remove('pattern-pulse-shield', 'unlocked');
  });

  // Save status for popup
  saveCurrentProblemStatus({
    slug: currentSlug,
    inDatabase: false
  });

  // Show sidebar with not-in-database state
  const sidebar = createNotInDbSidebar();
  document.body.appendChild(sidebar);
}

/**
 * Create not-in-database sidebar (gray tab, info panel)
 */
function createNotInDbSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'pattern-pulse-sidebar not-in-db';

  sidebar.innerHTML = `
    <div class="pattern-pulse-tab" title="PatternPulse - Problem not in database">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2.5" fill="#6b7280"/>
        <circle cx="18" cy="6" r="2.5" fill="#9ca3af"/>
        <circle cx="6" cy="18" r="2.5" fill="#9ca3af"/>
        <circle cx="18" cy="18" r="2.5" fill="#6b7280"/>
        <circle cx="12" cy="12" r="2.5" fill="#d1d5db"/>
        <path d="M8 7L10.5 10M13.5 14L16 17M8 17L10.5 14M13.5 10L16 7" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </svg>
    </div>
    <div class="pattern-pulse-panel">
      <div class="pattern-pulse-content not-in-db-content">
        <div class="not-in-db-icon">☕</div>
        <p class="not-in-db-message">This problem isn't in PatternPulse yet — we're working on it!</p>
      </div>
    </div>
  `;

  return sidebar;
}

/**
 * Show completed state (problem already solved)
 */
function showCompletedState() {
  // Mark page as ready (removes preemptive shields)
  document.documentElement.setAttribute('data-pp-ready', 'true');

  // Remove any existing sidebar first
  const existing = document.querySelector('.pattern-pulse-sidebar');
  if (existing) existing.remove();

  // Make absolutely sure no shields remain
  document.querySelectorAll('.pattern-pulse-shield').forEach(el => {
    el.classList.remove('pattern-pulse-shield', 'unlocked');
  });

  // Show sidebar with completed state
  const sidebar = createCompletedSidebar();
  document.body.appendChild(sidebar);
}

/**
 * Create completed state sidebar (green tab, summary panel)
 */
function createCompletedSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'pattern-pulse-sidebar completed';

  sidebar.innerHTML = `
    <div class="pattern-pulse-tab" title="PatternPulse - Completed">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2.5" fill="#22c55e"/>
        <circle cx="18" cy="6" r="2.5" fill="#16a34a"/>
        <circle cx="6" cy="18" r="2.5" fill="#16a34a"/>
        <circle cx="18" cy="18" r="2.5" fill="#22c55e"/>
        <circle cx="12" cy="12" r="2.5" fill="#4ade80"/>
        <path d="M8 7L10.5 10M13.5 14L16 17M8 17L10.5 14M13.5 10L16 7" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </svg>
    </div>
    <div class="pattern-pulse-panel">
      <div class="pattern-pulse-content completed-content">
        <div class="completed-header">
          <div class="completed-icon">✓</div>
          <h3>Completed</h3>
        </div>
        <div class="completed-pattern">
          <span class="value">${currentProgress.pattern}</span>
        </div>
      </div>
    </div>
  `;

  return sidebar;
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

  // Remove attention animation class after it completes (prevents re-triggering on hover)
  if (!isPracticeMode) {
    setTimeout(() => {
      const tab = sidebar.querySelector('.pattern-pulse-tab');
      if (tab) tab.classList.remove('attention');
    }, 2000); // Animation is 1.8s, give a bit of buffer
  }
}

/**
 * Create quiz sidebar HTML
 */
function createQuizSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = isPracticeMode ? 'pattern-pulse-sidebar completed' : 'pattern-pulse-sidebar';

  // Green icons for practice mode, purple for new
  const iconColor1 = isPracticeMode ? '#22c55e' : '#6366f1';
  const iconColor2 = isPracticeMode ? '#16a34a' : '#8b5cf6';
  const iconColor3 = isPracticeMode ? '#4ade80' : '#a78bfa';

  const explainerText = isPracticeMode
    ? '✓ Solved before - practicing'
    : '🔒 Hints & solutions blurred until you identify the pattern.';

  const explainerClass = isPracticeMode ? 'quiz-explainer practice-mode' : 'quiz-explainer';

  // Add attention animation only for new problems (not practice mode)
  const tabClass = isPracticeMode ? 'pattern-pulse-tab' : 'pattern-pulse-tab attention';

  sidebar.innerHTML = `
    <div class="${tabClass}" title="PatternPulse">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2.5" fill="${iconColor1}"/>
        <circle cx="18" cy="6" r="2.5" fill="${iconColor2}"/>
        <circle cx="6" cy="18" r="2.5" fill="${iconColor2}"/>
        <circle cx="18" cy="18" r="2.5" fill="${iconColor1}"/>
        <circle cx="12" cy="12" r="2.5" fill="${iconColor3}"/>
        <path d="M8 7L10.5 10M13.5 14L16 17M8 17L10.5 14M13.5 10L16 7" stroke="${iconColor1}" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </svg>
    </div>
    <div class="pattern-pulse-panel">
      <div class="pattern-pulse-quiz">
        <div class="quiz-header">
          <div class="quiz-header-brand">
            <div class="quiz-logo">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="2.5" fill="${iconColor1}"/>
                <circle cx="18" cy="6" r="2.5" fill="${iconColor2}"/>
                <circle cx="6" cy="18" r="2.5" fill="${iconColor2}"/>
                <circle cx="18" cy="18" r="2.5" fill="${iconColor1}"/>
                <circle cx="12" cy="12" r="2.5" fill="${iconColor3}"/>
                <path d="M8 7L10.5 10M13.5 14L16 17M8 17L10.5 14M13.5 10L16 7" stroke="${iconColor1}" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
              </svg>
            </div>
            <h2>PatternPulse</h2>
          </div>
        </div>

        <div class="${explainerClass}">
          <p>${explainerText}</p>
        </div>

        <div class="quiz-problem">
          <h3>${currentProblem.title}</h3>
          <p class="quiz-hint">What pattern would you use?</p>
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
          <button class="${isPracticeMode ? 'reset-button' : 'skip-button'}" id="footer-button">
            ${isPracticeMode ? 'Reset Problem' : 'Skip for now'}
          </button>
          <a class="disagree-link" id="disagree-link" style="display: none;">Disagree with answer?</a>
        </div>
      </div>
    </div>
  `;

  // Add event listeners
  sidebar.querySelectorAll('.pattern-button').forEach(btn => {
    btn.addEventListener('click', (e) => handlePatternSelection(e.target.dataset.pattern, e.target));
  });

  sidebar.querySelector('#hint-button').addEventListener('click', showHint);

  if (isPracticeMode) {
    sidebar.querySelector('#footer-button').addEventListener('click', async () => {
      const confirmed = confirm('Reset this problem? You will need to identify the pattern again.');
      if (!confirmed) return;
      await storage.saveProgress(currentProblem.slug, { completed: false, skipped: false });
      closeSidebar();
      isPracticeMode = false;
      quizShown = false;
      hintsGiven = 0;
      wrongAttempts = 0;
      init();
    });
  } else {
    sidebar.querySelector('#footer-button').addEventListener('click', skipQuiz);
  }

  return sidebar;
}

/**
 * Normalize pattern name using aliases
 */
function normalizePattern(pattern) {
  return PATTERN_ALIASES[pattern] || pattern;
}

/**
 * Handle pattern selection
 */
async function handlePatternSelection(selectedPattern, buttonElement) {
  // Normalize the primary pattern (in case database uses variant names)
  const primaryPattern = normalizePattern(currentProblem.primaryPattern);
  const acceptablePatterns = (currentProblem.acceptablePatterns ||
                              currentProblem.alternativePatterns ||
                              []).map(normalizePattern);

  const isCorrect = selectedPattern === primaryPattern ||
                    acceptablePatterns.includes(selectedPattern);

  if (isCorrect) {
    // Correct answer!
    await handleCorrectAnswer(selectedPattern);
  } else {
    // Wrong answer
    handleWrongAnswer(selectedPattern, buttonElement);
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
 * Handle correct answer - show confirmation, then transition to green practice view
 */
async function handleCorrectAnswer(selectedPattern) {
  const sidebar = document.querySelector('.pattern-pulse-sidebar');
  const quiz = sidebar.querySelector('.pattern-pulse-quiz');

  // Save progress (only if not already in practice mode)
  if (!isPracticeMode) {
    const progressData = {
      pattern: selectedPattern,
      completed: true,
      hintsUsed: hintsGiven,
      wrongAttempts: wrongAttempts,
      timestamp: Date.now()
    };
    await storage.saveProgress(currentProblem.slug, progressData);
    currentProgress = progressData;
  }

  // Remove shields
  removeShields();

  // Add confirmed class - allows hover-away behavior immediately
  sidebar.classList.add('confirmed');

  // Determine if this is the primary pattern or an acceptable alternative
  const primaryPattern = normalizePattern(currentProblem.primaryPattern);
  const isPrimaryPattern = selectedPattern === primaryPattern;

  // Get explanations from database
  const explanations = currentProblem.patternExplanations || {};
  const selectedExplanation = explanations[selectedPattern] || '';
  const primaryExplanation = explanations[primaryPattern] || '';

  // Build success content based on whether primary or acceptable pattern was chosen
  let successContent;
  if (isPrimaryPattern) {
    // Primary pattern - simple success message with explanation
    successContent = `
      <div class="quiz-success">
        <div class="success-icon">✓</div>
        <h2>Correct!</h2>
        <div class="success-explanation">
          <strong>${selectedPattern}</strong>
          ${selectedExplanation}
        </div>
        <button class="continue-button" id="continue-button">
          Continue
        </button>
      </div>
    `;
  } else {
    // Acceptable pattern - encouraging message with both explanations
    successContent = `
      <div class="quiz-success">
        <div class="success-icon">✓</div>
        <h2>Nice!</h2>
        <div class="success-explanation">
          <strong>${selectedPattern} works here</strong>
          ${selectedExplanation}
        </div>
        <div class="success-alternative">
          <strong>${primaryPattern} is often preferred</strong>
          ${primaryExplanation}
        </div>
        <button class="continue-button" id="continue-button">
          Continue
        </button>
      </div>
    `;
  }

  // Show confirmation screen
  quiz.innerHTML = successContent;

  // Transition to green practice mode view
  const transitionToGreen = () => {
    sidebar.classList.remove('confirmed');
    sidebar.classList.add('completed');

    // Hide panel smoothly
    const panel = sidebar.querySelector('.pattern-pulse-panel');
    if (panel) {
      panel.style.opacity = '0';
      panel.style.pointerEvents = 'none';
    }

    // Replace with practice mode sidebar
    setTimeout(() => {
      closeSidebar();
      isPracticeMode = true;
      quizShown = false;
      showQuiz();
    }, 300);
  };

  document.getElementById('continue-button').addEventListener('click', transitionToGreen);
}

/**
 * Handle wrong answer - shake the button, no content shift
 */
function handleWrongAnswer(selectedPattern, buttonElement) {
  // Track wrong attempts
  wrongAttempts++;

  const tab = document.querySelector('.pattern-pulse-tab');

  // Flash the tab red briefly
  if (tab) {
    tab.classList.add('wrong-flash');
    setTimeout(() => tab.classList.remove('wrong-flash'), 600);
  }

  // Shake the clicked button
  if (buttonElement) {
    buttonElement.classList.add('wrong-shake');
    setTimeout(() => buttonElement.classList.remove('wrong-shake'), 500);
  }

  // Show disagree link after first wrong attempt
  const disagreeLink = document.getElementById('disagree-link');
  if (disagreeLink && disagreeLink.style.display === 'none') {
    disagreeLink.style.display = 'block';
    disagreeLink.onclick = () => openDisagreeIssue(selectedPattern);
  } else if (disagreeLink) {
    // Update the pattern for subsequent wrong clicks
    disagreeLink.onclick = () => openDisagreeIssue(selectedPattern);
  }
}

/**
 * Open GitHub issue for pattern disagreement (simple direct link)
 */
function openDisagreeIssue(selectedPattern) {
  const problemId = currentProblem?.leetcodeId || 'Unknown';
  const problemTitle = currentProblem?.title || 'Unknown';
  const problemSlug = currentProblem?.slug || '';
  const expectedPattern = currentProblem?.primaryPattern || 'Unknown';

  const issueTitle = encodeURIComponent(`Pattern disagreement: #${problemId} - ${selectedPattern}`);
  const issueBody = encodeURIComponent(
`**Problem**: #${problemId} - ${problemTitle}
**LeetCode**: https://leetcode.com/problems/${problemSlug}/

**Current answer**: ${expectedPattern}
**I think it should be**: ${selectedPattern}

**Why**:
<!-- Please explain your reasoning -->

`);

  const githubUrl = `https://github.com/vishshukla/patternpulse/issues/new?title=${issueTitle}&body=${issueBody}&labels=pattern-feedback`;
  window.open(githubUrl, '_blank');
}

/**
 * Open feedback form inline (right under the disagree button)
 */
function openFeedbackInline(feedbackElement, selectedPattern) {
  const problemId = currentProblem?.leetcodeId || 'Unknown';
  const problemTitle = currentProblem?.title || 'Unknown';
  const problemSlug = currentProblem?.slug || '';
  const expectedPattern = currentProblem?.primaryPattern || 'Unknown';

  // Check if form already exists
  const existingForm = feedbackElement.querySelector('.feedback-form-inline');
  if (existingForm) return;

  // Create inline form right under the disagree message
  const form = document.createElement('div');
  form.className = 'feedback-form-inline';
  form.innerHTML = `
    <textarea class="feedback-text" placeholder="Why do you think ${selectedPattern} is the right pattern?" rows="2"></textarea>
    <button class="feedback-submit-github">Submit Feedback on GitHub</button>
  `;

  feedbackElement.appendChild(form);

  // GitHub issue submission
  form.querySelector('.feedback-submit-github').addEventListener('click', () => {
    const text = form.querySelector('.feedback-text').value.trim();

    const issueTitle = encodeURIComponent(`Problem #${problemId}: Pattern disagreement - ${selectedPattern} vs ${expectedPattern}`);
    const issueBody = encodeURIComponent(
`## Problem
- **Problem #${problemId}**: ${problemTitle}
- **LeetCode URL**: https://leetcode.com/problems/${problemSlug}/

## Pattern Disagreement
- **Current pattern**: ${expectedPattern}
- **Suggested pattern**: ${selectedPattern}

## Reasoning
${text || '(No explanation provided)'}

---
*Submitted via PatternPulse extension*`
    );

    const githubUrl = `https://github.com/vishshukla/patternpulse/issues/new?title=${issueTitle}&body=${issueBody}&labels=pattern-feedback`;
    window.open(githubUrl, '_blank');

    // Show thanks
    form.innerHTML = `<div class="feedback-thanks">Thanks! Redirecting to GitHub...</div>`;
    setTimeout(() => feedbackElement.remove(), 2000);
  });
}

/**
 * Show progressive hint
 */
function showHint() {
  const hints = currentProblem.hints || [];
  const hintsList = document.getElementById('hints-list');
  const hintButton = document.getElementById('hint-button');

  // No hints available for this problem
  if (hints.length === 0) {
    const noHintsMsg = document.createElement('div');
    noHintsMsg.className = 'hint-item no-hints';
    noHintsMsg.innerHTML = `
      <p>Hints not available for this problem yet.</p>
      <p class="hint-tip">Try thinking about: What data structure would help? What's the time complexity you're aiming for?</p>
    `;
    hintsList.appendChild(noHintsMsg);
    hintButton.textContent = 'No hints available';
    hintButton.disabled = true;
    return;
  }

  if (hintsGiven >= hints.length) {
    return;
  }

  const hintElement = document.createElement('div');
  hintElement.className = 'hint-item';
  hintElement.innerHTML = `
    <span class="hint-number">Hint ${hintsGiven + 1}</span>
    <p>${hints[hintsGiven]}</p>
  `;

  hintsList.appendChild(hintElement);
  hintsGiven++;

  // Update hint button
  if (hintsGiven >= hints.length) {
    hintButton.textContent = 'No more hints';
    hintButton.disabled = true;
  } else {
    hintButton.textContent = `💡 Next hint (${hintsGiven}/${hints.length} used)`;
  }
}

/**
 * Skip quiz and go straight to problem (no confirmation)
 * Tab stays visible with skipped state panel
 */
async function skipQuiz() {
  // Save as skipped
  await storage.saveProgress(currentProblem.slug, {
    skipped: true,
    timestamp: Date.now()
  });

  // Remove shields
  removeShields();

  // Replace sidebar with skipped state
  closeSidebar();
  const sidebar = createSkippedSidebar();
  document.body.appendChild(sidebar);
}

/**
 * Create skipped state sidebar (gray tab, retry panel)
 */
function createSkippedSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'pattern-pulse-sidebar skipped';

  sidebar.innerHTML = `
    <div class="pattern-pulse-tab" title="PatternPulse - Skipped">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2.5" fill="#6b7280"/>
        <circle cx="18" cy="6" r="2.5" fill="#9ca3af"/>
        <circle cx="6" cy="18" r="2.5" fill="#9ca3af"/>
        <circle cx="18" cy="18" r="2.5" fill="#6b7280"/>
        <circle cx="12" cy="12" r="2.5" fill="#d1d5db"/>
        <path d="M8 7L10.5 10M13.5 14L16 17M8 17L10.5 14M13.5 10L16 7" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </svg>
    </div>
    <div class="pattern-pulse-panel">
      <div class="pattern-pulse-content skipped-content">
        <div class="skipped-header">
          <div class="skipped-icon">⏭</div>
          <h3>Skipped</h3>
        </div>
        <p class="skipped-message">You skipped the pattern quiz for this problem.</p>
        <button class="retry-button" id="retry-quiz-btn">
          Try Again
        </button>
      </div>
    </div>
  `;

  // Add retry button listener
  sidebar.querySelector('#retry-quiz-btn').addEventListener('click', async () => {
    await storage.saveProgress(currentProblem.slug, {
      skipped: false
    });
    // Reinitialize to show quiz
    closeSidebar();
    quizShown = false;
    init();
  });

  return sidebar;
}

/**
 * Remove shields from page (smooth unblur transition)
 */
function removeShields() {
  // Mark page as ready (removes preemptive shields)
  document.documentElement.setAttribute('data-pp-ready', 'true');

  shieldsActive = false;
  document.querySelectorAll('.pattern-pulse-shield').forEach(el => {
    el.classList.add('unlocked');
    // Remove classes after transition completes
    setTimeout(() => {
      el.classList.remove('pattern-pulse-shield', 'unlocked');
    }, 300);
  });
}

// Initialize when DOM is ready
function startExtension() {
  // Set initial slug to prevent checkUrlChange from reinitializing immediately
  lastProblemSlug = extractSlugFromURL();

  // Small delay to let LeetCode's initial render complete
  setTimeout(init, 100);
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

    // Keep data-pp-ready SET during navigation to prevent flash of blurred content
    // It will be managed by init() based on the new problem's state
    document.documentElement.setAttribute('data-pp-ready', 'true');

    // Reset state for new problem
    currentProblem = null;
    currentProgress = null;
    currentSlug = null;
    quizShown = false;
    hintsGiven = 0;
    wrongAttempts = 0;
    shieldsActive = false;
    lastShieldCount = 0;

    // Clear any pending shield re-application
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }

    // Close any existing sidebar
    closeSidebar();

    // Remove any existing shields (do it twice to catch any stragglers)
    document.querySelectorAll('.pattern-pulse-shield').forEach(el => {
      el.classList.remove('pattern-pulse-shield', 'unlocked');
    });

    // Reinitialize after a short delay to let the page load
    setTimeout(() => {
      // Remove shields again in case LeetCode re-rendered elements
      document.querySelectorAll('.pattern-pulse-shield').forEach(el => {
        el.classList.remove('pattern-pulse-shield', 'unlocked');
      });
      init();
    }, 100);
  }
}

// Check for URL changes periodically (handles pushState/replaceState)
setInterval(checkUrlChange, 1000); // Reduced frequency

// Also listen for popstate (back/forward navigation)
window.addEventListener('popstate', () => {
  setTimeout(checkUrlChange, 100);
});
