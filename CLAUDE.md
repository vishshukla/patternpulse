# PatternPulse - LLM Context

## What is this?

A Chrome extension that helps users learn algorithmic patterns instead of memorizing LeetCode solutions. When users visit a LeetCode problem, a sidebar quiz appears asking them to identify the pattern before revealing hints/solutions.

## Project Structure

```
patternpulse/
├── extension/                 # Chrome extension (main product)
│   ├── manifest.json          # Extension config, version lives here
│   ├── contentScript.js       # Main logic - injects quiz sidebar into LeetCode
│   ├── shield.css             # All styling for the sidebar/quiz
│   ├── popup.js               # Extension popup (stats, settings)
│   ├── popup.html
│   ├── storage.js             # Chrome storage wrapper for progress/settings
│   ├── config.js              # GitHub repo URL, feedback form links
│   └── data/
│       ├── problemDatabase.js # 250+ problems with patterns, hints, explanations
│       └── curatedLists.js    # NeetCode 150, LeetCode 75 problem lists
├── landing_page/              # Next.js marketing site (Vercel)
│   └── app/
│       ├── page.tsx           # Main landing page
│       └── layout.tsx         # Root layout with Vercel Analytics
├── tests/                     # Jest tests
│   ├── database.test.js       # Problem database validation
│   ├── storage.test.js        # Storage module tests
│   └── patterns.test.js       # Pattern validation
├── scripts/                   # Development utilities (not committed)
└── .github/workflows/
    └── publish-extension.yml  # Auto-publish on version bump
```

## Key Files

| File | Purpose |
|------|---------|
| `extension/manifest.json` | Version number - bump this to trigger release |
| `extension/contentScript.js` | Core quiz logic, DOM injection, event handlers |
| `extension/shield.css` | All UI styling (sidebar, quiz, buttons, animations) |
| `extension/data/problemDatabase.js` | Problem data - patterns, hints, explanations |

## Commit Conventions

- **No AI attribution lines** - don't add "Generated with Claude" or "Co-Authored-By"
- Keep commit messages concise and descriptive
- For releases: bump version in manifest.json, commit message becomes release notes

## Release Process (Fully Automated)

1. Bump `extension/manifest.json` version (e.g., `0.9.1` → `0.9.2`)
2. Commit with descriptive message (this becomes the release notes)
3. Push to main
4. GitHub Actions automatically:
   - Detects version bump
   - Creates GitHub Release
   - Runs tests
   - Builds zip
   - Publishes to Chrome Web Store

## Architecture Notes

### Content Script Injection
- Runs at `document_start` on leetcode.com/problems/*
- Creates a sidebar that overlays the problem page
- Uses CSS `:hover` for show/hide behavior
- `pinned` class = stays open (during quiz)
- `confirmed` class = answered correctly, can hover away

### Quiz States
1. **Initial**: Quiz visible, user selects a pattern
2. **Wrong**: Button shakes, "Disagree?" link appears
3. **Correct**: Success screen, `confirmed` class allows hover collapse
4. **Practice Mode**: Green tab, hints/solutions revealed

### Problem Database Structure
```javascript
{
  "1": {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "easy",
    primaryPattern: "Hash Map",
    acceptablePatterns: [],  // Other valid answers
    hints: ["hint1", "hint2", "hint3"],
    patternExplanations: { "Hash Map": "why this pattern..." },
    solution: {
      approach: "...",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      keyInsight: "..."
    }
  }
}
```

## Testing

```bash
npm test           # Run all tests
npm test -- --coverage  # With coverage report
```

Tests validate:
- Database structure and required fields
- Pattern validity
- Hint quality (3 hints per curated problem)
- No duplicate slugs

## Common Tasks

### Add a new problem
Edit `extension/data/problemDatabase.js`, follow existing structure.

### Fix a hint
Find problem in `problemDatabase.js` by ID, edit hints array.

### Change UI styling
Edit `extension/shield.css`. Key classes:
- `.pattern-pulse-sidebar` - main container
- `.pattern-pulse-tab` - the hoverable tab
- `.pattern-pulse-panel` - expanded content area
- `.pattern-pulse-quiz` - quiz content (scrollable)

### Debug the extension
1. Go to `chrome://extensions`
2. Enable Developer Mode
3. Load unpacked → select `extension/` folder
4. Open LeetCode problem, right-click sidebar → Inspect

## External Services

- **Chrome Web Store**: Extension distribution
- **Vercel**: Landing page hosting
- **GitHub Issues**: User feedback (opened via "Disagree?" link)

## Gotchas

- Only `.pattern-pulse-quiz` should scroll, not `.pattern-pulse-panel`
- Tab width is 8px for visibility
- Success screen uses `confirmed` class (not `pinned`) so users can hover away
- Two Sum does NOT accept Two Pointers (requires sorting, worse complexity)
