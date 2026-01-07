# PatternPulse 🎯

> AI-powered Chrome extension for mastering LeetCode patterns before seeing problem metadata

PatternPulse helps you identify algorithmic patterns **before** coding. Guess the pattern correctly to unlock tags, difficulty, and hints. Track your progress and improve pattern recognition skills for coding interviews.

## ✨ Features

- **🎯 Pattern Recognition Training** - Identify patterns before seeing hints
- **🤖 AI-Powered Analysis** - 15 problems solved with AI, growing to 3,053
- **🛡️ Smart Shields** - Hide tags, difficulty, and hints until you guess the pattern
- **💡 Progressive Hints** - Socratic hints that teach without giving away the solution
- **📊 Progress Tracking** - Monitor accuracy and identify weak areas
- **🔄 Auto-Updates** - GitHub Actions solves 15 new problems every 6 hours

## 🚀 Quick Start

### For Users

1. **Install Extension**
   - Download from [Chrome Web Store](https://chrome.google.com/webstore) (coming soon)
   - Or load unpacked: `chrome://extensions` → Load unpacked → Select `/extension` folder

2. **Use on LeetCode**
   - Visit any LeetCode problem
   - Quiz appears automatically
   - Guess the pattern to unlock metadata
   - Get progressive hints on wrong answers

### For Developers

```bash
# Clone repository
git clone https://github.com/vishshukla/patternpulse.git
cd patternpulse

# Install dependencies
npm install

# Run tests
npm test

# Run AI solver (requires GROQ_API_KEY)
export GROQ_API_KEY="your-key-here"
npm run solve

# Package extension for Chrome Web Store
npm run package
```

## 📁 Project Structure

```
patternpulse/
├── extension/              # Chrome extension files
│   ├── data/              # Problem databases
│   │   ├── aiProblemDatabase.js      # 15 AI-solved problems
│   │   └── problemDatabase.js        # 3,053 total problems
│   ├── icons/             # Extension icons
│   ├── contentScript.js   # Main extension logic
│   ├── storage.js         # Chrome storage wrapper
│   ├── popup.html         # Extension popup UI
│   ├── popup.js           # Popup logic
│   ├── shield.css         # Styles for shields/quiz
│   └── manifest.json      # Extension manifest
├── scripts/               # AI solver scripts
│   ├── aiSolverCron.js   # Daily cron job
│   ├── groqSolver.js     # Groq API integration
│   └── fetchFromLeetCode.js  # LeetCode API fetcher
├── tests/                 # Test files
│   ├── unit.test.js      # Unit tests (33 tests)
│   └── testAISolver.js   # AI solver test
├── docs/                  # Documentation
│   ├── DEPLOYMENT.md     # Production deployment guide
│   └── AI_SOLVER.md      # AI solver setup guide
├── .github/workflows/     # GitHub Actions
│   └── ai-solver.yml     # Automated problem solving
└── landing_page/          # Marketing website (Next.js)
```

## 🎯 15 Core Patterns

1. Hash Map
2. Two Pointers
3. Sliding Window
4. Binary Search
5. Dynamic Programming
6. Greedy
7. Backtracking
8. DFS (Depth-First Search)
9. BFS (Breadth-First Search)
10. Stack
11. Linked List
12. Heap/Priority Queue
13. Trie
14. Union Find
15. Topological Sort

## 🤖 AI Solver System

PatternPulse uses **free Groq AI** to automatically solve problems and generate intelligent hints.

### How It Works

1. **GitHub Actions** runs every 6 hours (4x daily)
2. Fetches unsolved LeetCode problems
3. AI solves 15 problems per run using Groq API
4. Determines optimal pattern(s) by actually solving
5. Generates 3 progressive Socratic hints
6. Updates database automatically

### Coverage Timeline

| Milestone | Problems | Time | Status |
|-----------|----------|------|--------|
| Current | 15 | - | ✅ Complete |
| Week 1 | 435 | 7 days | 14% coverage |
| Month 1 | 1,815 | 30 days | 59% coverage |
| Full Coverage | 3,053 | 51 days | 100% coverage |

**Rate**: 60 problems/day (15 problems × 4 runs)
**Cost**: $0 (Groq free tier)

## 🧪 Testing

```bash
# Run unit tests (33 tests, no API key needed)
npm test

# Run all tests including AI solver (requires GROQ_API_KEY)
npm run test:all

# Test AI solver only (requires GROQ_API_KEY)
npm run test:ai
```

## 🔧 Development

### Setup

```bash
# Install dependencies
npm install

# Get Groq API key (free)
# Visit: https://console.groq.com/

# Set environment variable
export GROQ_API_KEY="gsk_..."

# Run AI solver manually
npm run solve
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run unit tests (33 tests, no API key) |
| `npm run test:all` | Run all tests including AI solver |
| `npm run test:ai` | Test AI solver only (requires API key) |
| `npm run solve` | Run AI solver manually |
| `npm run fetch` | Fetch LeetCode problems |
| `npm run package` | Package extension for Chrome Web Store |

### Chrome Extension Development

1. **Load Extension**
   ```
   chrome://extensions → Enable Developer Mode → Load unpacked → Select /extension folder
   ```

2. **Test Changes**
   - Make changes to extension files
   - Click "Reload" in chrome://extensions
   - Visit any LeetCode problem to test

3. **Debug**
   - Right-click extension icon → Inspect popup
   - Open DevTools on LeetCode page
   - Check console for `[PatternPulse]` logs

## 🚢 Deployment

### GitHub Actions Setup

1. **Add API Key to Secrets**
   - Go to repository Settings → Secrets → Actions
   - Add `GROQ_API_KEY` secret

2. **Enable GitHub Actions**
   - Go to Actions tab
   - Enable workflows
   - Workflow runs automatically every 6 hours

3. **Monitor Progress**
   - Check Actions tab for run status
   - Database auto-updates via commits

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for complete deployment guide.

### Chrome Web Store

1. Create developer account ($5 one-time fee)
2. Package extension: `npm run package`
3. Upload `patternpulse.zip` to Chrome Web Store
4. Users auto-update within 24-48 hours

## 📊 Database Structure

### Problem Database (3,053 problems)

```javascript
{
  leetcodeId: 1,
  slug: "two-sum",
  title: "Two Sum",
  difficulty: "easy",
  primaryPattern: "Hash Map"
}
```

### AI Database (15+ problems, growing)

```javascript
{
  leetcodeId: 1,
  slug: "two-sum",
  title: "Two Sum",
  difficulty: "easy",
  primaryPattern: "Hash Map",
  alternativePatterns: [],
  confidence: "high",
  aiSolution: {
    approach: "Use hash map to store complements...",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    keyInsight: "Trade space for time..."
  },
  hints: [
    "Is there a way to keep track of numbers you've seen?",
    "Could you sacrifice extra memory for faster search?",
    "Think about data structures with O(1) lookup"
  ],
  solvedBy: "llama-3.3-70b-versatile",
  solvedAt: "2026-01-07T08:38:06.081Z"
}
```

## 🤝 Contributing

Contributions welcome! Areas to help:

- **Pattern Accuracy** - Report incorrect pattern mappings
- **Hint Quality** - Suggest better hints for problems
- **Bug Reports** - File issues with reproduction steps
- **Feature Requests** - Suggest new features

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **LeetCode** - For the amazing platform
- **Groq** - For free AI API access
- **GitHub Actions** - For free automation

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/vishshukla/patternpulse/issues)
- **Documentation**: [docs/](docs/)
- **AI Solver Setup**: [docs/AI_SOLVER.md](docs/AI_SOLVER.md)
- **Deployment Guide**: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

**Built with ❤️ for the coding interview community**

⭐ Star this repo if PatternPulse helps you ace your interviews!
