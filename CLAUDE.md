# PatternPulse - LLM Context

## What is this?

A Chrome extension that helps users learn algorithmic patterns instead of memorizing LeetCode solutions. When users visit a LeetCode problem, a sidebar quiz appears asking them to identify the pattern before revealing hints/solutions.

## Project Structure

```
patternpulse/
├── extension/                    # Chrome extension (main product)
│   ├── manifest.json             # Extension config, VERSION LIVES HERE
│   ├── contentScript.js          # Main logic (~1020 lines) - quiz, shields, state
│   ├── shield.css                # All styling - sidebar, quiz, animations
│   ├── popup.js                  # Extension popup (~430 lines) - stats, settings
│   ├── popup.html                # Popup markup
│   ├── storage.js                # Chrome storage wrapper (~270 lines)
│   ├── config.js                 # URLs: GitHub repo, feedback form
│   └── data/
│       ├── problemDatabase.js    # THE BIG FILE (~6700 lines) - 250+ problems
│       └── curatedLists.js       # NeetCode 150, LeetCode 75 lists
├── landing_page/                 # Next.js marketing site (Vercel)
│   ├── app/
│   │   ├── page.tsx              # Main landing page
│   │   ├── layout.tsx            # Root layout + Vercel Analytics
│   │   └── globals.css           # Tailwind styles
│   └── components/               # React components
│       ├── BrowserExtensionHero.tsx
│       ├── ValuePropCard.tsx
│       ├── PatternTest.tsx
│       └── BeforeAfter.tsx
├── tests/                        # Jest tests
│   ├── database.test.js          # Problem database validation
│   ├── storage.test.js           # Storage module tests
│   └── patterns.test.js          # Pattern validation
├── scripts/                      # Dev utilities (not all committed)
│   ├── auditHints.js             # Validate hint quality
│   ├── auditPatterns.js          # Check pattern assignments
│   └── validateDb.js             # Database integrity checks
└── .github/workflows/
    ├── ci.yml                    # PR checks: branch name + tests
    └── publish-extension.yml     # Auto-publish on version bump
```

---

## Key Files Deep Dive

### `contentScript.js` - The Brain (~1020 lines)

**Key Functions:**
| Function | Line | Purpose |
|----------|------|---------|
| `init()` | 97 | Entry point - loads problem, shows quiz |
| `applyShields()` | 211 | Blurs LeetCode hints/tags/solutions |
| `showQuiz()` | 402 | Renders quiz sidebar |
| `createQuizSidebar()` | 425 | Builds quiz HTML (pattern buttons, hints) |
| `handlePatternSelection()` | 542 | Processes answer - correct/wrong flow |
| `handleCorrectAnswer()` | 574 | Success state, reveals content |
| `handleWrongAnswer()` | 674 | Shake animation, show disagree link |
| `showHint()` | 785 | Progressive hint reveal |
| `removeShields()` | 896 | Unblurs all content |

**State Variables (line ~84-92):**
```javascript
let currentProblem = null;    // Problem data from database
let currentProgress = null;   // User's saved progress
let quizShown = false;        // Has quiz been displayed
let hintsGiven = 0;           // Hints revealed (0-3)
let wrongAttempts = 0;        // Wrong guesses count
let shieldsActive = false;    // Are spoilers blurred
let currentSlug = null;       // e.g., "two-sum"
let isPracticeMode = false;   // Already completed, reviewing
```

**Pattern System (line ~52-82):**
```javascript
// Core patterns shown in quiz (17 patterns)
const CORE_PATTERNS = ['Hash Map', 'Two Pointers', 'Sliding Window', ...];

// Aliases map variant names to canonical
const PATTERN_ALIASES = {
  'Heap/Priority Queue': 'Heap',
  'Tree Traversal': 'DFS',
  'Prefix Sum': 'Hash Map',
  ...
};
```

### `shield.css` - The Look

**CSS Class States:**
| Class | Applied To | Meaning |
|-------|-----------|---------|
| `.pattern-pulse-shield` | LeetCode elements | Blurred/hidden |
| `.pattern-pulse-shield.unlocked` | Same | Revealed |
| `.pattern-pulse-sidebar` | Our sidebar | Main container |
| `.pattern-pulse-sidebar.pinned` | Sidebar | Stays open (during quiz) |
| `.pattern-pulse-sidebar.confirmed` | Sidebar | Answered correctly, can hover away |
| `.pattern-pulse-tab` | Tab element | The hoverable edge tab |
| `.pattern-pulse-panel` | Content area | Expanded sidebar content |
| `.pattern-pulse-quiz` | Quiz content | Scrollable area inside panel |

**Key Measurements:**
- Tab width: 8px (collapsed), 36px (hovered)
- Panel max-width: 340px
- Panel max-height: 80vh
- Quiz max-height: calc(80vh - 4px)
- Z-index: 999999

### `problemDatabase.js` - The Data (~6700 lines)

**Structure:**
```javascript
const PROBLEM_DATABASE = {
  "1": {                           // LeetCode problem ID
    title: "Two Sum",
    slug: "two-sum",               // URL slug
    difficulty: "easy",            // easy | medium | hard
    primaryPattern: "Hash Map",    // THE correct answer
    acceptablePatterns: [],        // Also-correct alternatives
    hints: [                       // Progressive hints (always 3)
      "Think about lookup time...",
      "What data structure gives O(1) lookup?",
      "Store complements as you iterate"
    ],
    patternExplanations: {         // Why each pattern works/doesn't
      "Hash Map": "Optimal O(n) solution using complement lookup",
      "Two Pointers": "Would require sorting, changing indices"
    },
    solution: {
      approach: "Single pass with hash map...",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      keyInsight: "Store complement, not the number itself"
    }
  },
  // ... 250+ more problems
};
```

---

## Git Workflow

### Branch Rules

- **NEVER push directly to `main`** - always use feature branches
- **NEVER add AI attribution** - no "Generated with Claude" or "Co-Authored-By"
- Branch prefixes:
  - `release/X.Y.Z` - version releases
  - `fix/description` - bug fixes
  - `hotfix/description` - urgent production fixes
  - `feature/description` - new features (merge to release branch first)

### For LLMs

```bash
# 1. Always start on latest main
git checkout main && git pull

# 2. Create branch BEFORE making changes
git checkout -b fix/description-of-change

# 3. Make changes, commit (no AI attribution!)
git add . && git commit -m "Fix the thing"

# 4. Push to feature branch
git push -u origin fix/description-of-change

# 5. Create PR (if gh cli available)
gh pr create --title "Fix the thing" --body "Description"
```

### CI/CD Pipeline

```
PR opened to main
      ↓
┌─────────────────────────────┐
│ ci.yml runs:                │
│  • check-branch-name        │
│  • run-tests (npm test)     │
└─────────────────────────────┘
      ↓
PR merged to main
      ↓
┌─────────────────────────────┐
│ publish-extension.yml:      │
│  • Detect version bump      │
│  • Create GitHub Release    │
│  • Run tests                │
│  • Build zip                │
│  • Upload to Chrome Store   │
└─────────────────────────────┘
```

**To release:** Bump version in `manifest.json`, commit message becomes release notes.

---

## Architecture Principles

### DOM Injection Strategy
1. **Preemptive shields** - Injected at `document_start` before DOM loads
2. **Prevents flash** - User never sees unblurred spoilers
3. **Failsafe timeout** - Reveals page after 3s if init fails

### Quiz State Machine
```
┌─────────┐    wrong     ┌─────────┐
│ INITIAL │─────────────→│  WRONG  │──┐
│  (quiz) │              │ (shake) │  │ retry
└────┬────┘              └─────────┘←─┘
     │ correct
     ↓
┌─────────┐   hover away  ┌─────────┐
│ SUCCESS │──────────────→│COLLAPSED│
│ (Nice!) │←──────────────│  (tab)  │
└────┬────┘   hover back  └─────────┘
     │ Continue
     ↓
┌─────────┐
│PRACTICE │  (green tab, all content revealed)
└─────────┘
```

### CSS Hover Architecture
- Sidebar visibility controlled by CSS `:hover`
- `pinned` class overrides hover (keeps open during quiz)
- `confirmed` class allows hover collapse after success
- Only `.pattern-pulse-quiz` scrolls, not `.pattern-pulse-panel`

---

## Common Tasks

### Add a new problem
1. Edit `extension/data/problemDatabase.js`
2. Add entry with all required fields
3. Run `npm test` to validate

### Fix/improve a hint
1. Find problem by ID in `problemDatabase.js`
2. Edit `hints` array (keep exactly 3 hints)
3. Hints should be progressive: vague → specific

### Change UI styling
1. Edit `extension/shield.css`
2. Key areas:
   - Lines 30-70: Tab appearance
   - Lines 100-150: Panel layout
   - Lines 200-300: Quiz content
   - Lines 400+: Animations

### Debug the extension
1. `chrome://extensions` → Enable Developer Mode
2. Load unpacked → select `extension/` folder
3. Open LeetCode problem
4. Right-click sidebar → Inspect
5. Check Console for `[PatternPulse]` logs

### Run tests
```bash
npm test                    # All tests
npm test -- --coverage      # With coverage
npm test -- --watch         # Watch mode
```

---

## Gotchas & Lessons Learned

### UI/UX
- **Only quiz scrolls** - Panel has `overflow: hidden`, quiz has `overflow-y: auto`
- **Tab width is 8px** - Smaller was invisible to users
- **Success uses `confirmed` not `pinned`** - Allows hover-away behavior
- **Disagree link opens GitHub issue** - Don't use inline forms (breaks layout)

### Patterns
- **Two Sum does NOT accept Two Pointers** - TP requires sorting (O(n log n)), Hash Map is O(n)
- **Pattern aliases exist** - "Heap/Priority Queue" → "Heap", "Tree Traversal" → "DFS"
- **Always validate complexity** - Pattern should match optimal solution complexity

### Chrome Extension
- **`document_start` timing** - Shields must inject before DOM renders
- **Z-index: 999999** - Must be above LeetCode's UI
- **Storage is async** - Always use await with storage operations

### CI/CD
- **`npm ci` requires `package-lock.json`** - Must be committed
- **Re-runs use original commit code** - Push fix to new branch, don't just re-run
- **Release creation is idempotent** - Skips if tag already exists
- **Chrome Store review** - First public publish needs manual approval

---

## External Services

| Service | Purpose | Config Location |
|---------|---------|-----------------|
| Chrome Web Store | Extension distribution | GitHub Secrets |
| Vercel | Landing page hosting | Auto-deploys from main |
| GitHub Actions | CI/CD pipelines | `.github/workflows/` |
| GitHub Issues | User feedback | Opened via "Disagree?" link |
| Google Forms | General feedback | URL in `config.js` |

---

## Testing Coverage

**What's tested:**
- Database structure and required fields
- All patterns are valid (from known list)
- 3 hints per curated problem
- No duplicate slugs
- Storage operations

**What's NOT tested (DOM-dependent):**
- contentScript.js UI logic
- popup.js interactions
- CSS rendering

---

## For Major Redesigns

If restructuring the codebase:

1. **State is in contentScript.js globals** - Consider a proper state manager
2. **Quiz HTML is string templates** - Could move to separate template files
3. **Patterns hardcoded in multiple places** - CORE_PATTERNS, PATTERN_ALIASES, tests
4. **No TypeScript** - Consider adding for type safety
5. **CSS is one big file** - Could split by component
6. **problemDatabase.js is huge** - Could split by difficulty or pattern

**Key files to understand first:**
1. `contentScript.js` lines 1-100 (setup, state, patterns)
2. `contentScript.js` lines 400-600 (quiz creation and handling)
3. `shield.css` lines 1-150 (core layout)
4. `problemDatabase.js` structure (first entry as template)
